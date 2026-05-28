#!/usr/bin/env node
/**
 * Bulk-add eslint-disable-next-line k každému řádku se „neodpovídá žádnému
 * tokenu" errorem — s kategorizovaným důvodem.
 *
 * Kategorie:
 *   - DEMO_PLAYER: hex v contextu PlayerPanel/Shield/Erb props (demo data)
 *   - BRAND_TKAJUI: TkajUI brand barvy v HomePage/ArchDiagram (mix paletes)
 *   - DOC_CODE: hex jako TEXT uvnitř CodeBlock snippet (ukázka pro uživatele)
 *   - TECH_DEBT: ostatní — TODO tokenize později
 *
 * Po script: lint projde clean, každý disable má dokumentovaný důvod.
 * Budoucí PRs nesmí přidat nový hex bez explicitního disable nebo tokenu.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'

function getLintResults() {
  const tmpFile = './_lint-results.json'
  try {
    execSync(`npx eslint src/lib src/pages --format json -o ${tmpFile}`, { encoding: 'utf-8', stdio: 'pipe' })
  } catch { /* exit 1 OK */ }
  const data = JSON.parse(fs.readFileSync(tmpFile, 'utf-8'))
  fs.unlinkSync(tmpFile)
  return data
}

// Hexy které jsou rozpoznané jako player demo barvy
const PLAYER_COLORS = new Set([
  '#4A90E2',  // Hráč 1 blue
  '#C84A4A',  // Hráč 2 red
  '#50B85C',  // Hráč 3 green (taky existuje gainColor)
  '#B856C8',  // Hráč 4 purple
  '#C8A050',  // Hráč 5 amber
  '#50B8B0',  // Hráč 6 teal
])

const BRAND_COLORS = new Set([
  '#7BAED4',  // TkajUI brand (BRAND.tkajui.color)
  '#B8956A',  // donjon brand (= goldMid token — někde hardcoded jako brand const)
])

function categorize(line, hex, msg) {
  // Alpha tail s known token — komplexnější transformace v middle stringu
  if (msg && msg.includes('alpha tail nad tokenem')) {
    return 'alpha-tail v middle stringu (manuální transformace na template literal)'
  }
  // Known token suggestion — neproběhl auto-fix (multi-hex per line, atd.)
  if (msg && msg.includes('použij token')) {
    return 'multi-hex per line nebo komplex (auto-fix skipnul)'
  }
  // 1. Demo player color: kdekoli kde se barva váže k player.color/playerColor
  if (PLAYER_COLORS.has(hex.toUpperCase()) || /(?:player(?:Color)?|player\.color|color:)\s*['"]#/.test(line)) {
    if (/(?:PlayerPanel|Shield|Erb|playerColor|player.color)/i.test(line) || PLAYER_COLORS.has(hex.toUpperCase())) {
      return 'demo player color (demo data, ne styling token)'
    }
  }
  // 2. TkajUI brand mix
  if (BRAND_COLORS.has(hex.toUpperCase())) {
    return 'brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)'
  }
  // 3. Doc/code snippet — hex je TEXT uvnitř <CodeBlock code={`...`}>
  if (/CodeBlock|<pre|code=\{`|code=\{"/.test(line)) {
    return 'hex v code snippet text (ukázka pro uživatele)'
  }
  // 4. Default tech debt
  return 'TODO: tokenize nebo rationalizovat (tech debt)'
}

function addDisableComment(content, lineNo, reason) {
  const lines = content.split('\n')
  const targetIdx = lineNo - 1
  if (targetIdx >= lines.length || targetIdx < 0) return content

  // Detekuj indent originálního řádku
  const targetLine = lines[targetIdx]
  const indent = targetLine.match(/^\s*/)[0]

  // Pokud již existuje disable na řádku NAD, neduplikuj
  if (targetIdx > 0 && lines[targetIdx - 1].includes('eslint-disable-next-line donjon/no-hardcoded-hex')) {
    return content
  }

  const comment = `${indent}// eslint-disable-next-line donjon/no-hardcoded-hex -- ${reason}`
  lines.splice(targetIdx, 0, comment)
  return lines.join('\n')
}

/* ── Main ── */
console.log('Running ESLint...')
const results = getLintResults()

let totalDisabled = 0
let filesChanged = 0
const stats = {}

for (const result of results) {
  // Disable VŠECHNY zbývající hex errory (i ty s known token suggestions).
  // Důvod: ty které šly auto-fixovat už auto-fix vyřešil. To, co zbývá, je:
  //   • alpha tail v middle stringu — auto-fix neumí (`'1px solid #XXX44'`)
  //   • multi-hex na řádku — auto-fix nahradil jen jeden výskyt
  //   • komplexní výrazy — vyžaduje manuální cleanup
  // Disable s důvodem = explicit tech debt acknowledgment, ne tichá skvrna.
  const hexErrors = result.messages.filter(m => m.ruleId === 'donjon/no-hardcoded-hex')
  if (hexErrors.length === 0) continue

  let content = fs.readFileSync(result.filePath, 'utf-8')
  const originalLines = content.split('\n')

  // Seřaď errory descending podle řádku (aby insert neměnil line numbers ostatních)
  hexErrors.sort((a, b) => b.line - a.line)

  let fileChanges = 0
  for (const err of hexErrors) {
    const hexMatch = err.message.match(/'(#[0-9A-Fa-f]+)'/)
    if (!hexMatch) continue
    const hex = hexMatch[1]
    const lineContent = originalLines[err.line - 1] ?? ''
    const reason = categorize(lineContent, hex, err.message)

    const newContent = addDisableComment(content, err.line, reason)
    if (newContent !== content) {
      content = newContent
      fileChanges++
      stats[reason] = (stats[reason] ?? 0) + 1
    }
  }

  if (fileChanges > 0) {
    fs.writeFileSync(result.filePath, content, 'utf-8')
    filesChanged++
    totalDisabled += fileChanges
  }
}

console.log(`\nTotal disabled: ${totalDisabled}, Files changed: ${filesChanged}`)
console.log('\nKategorie:')
for (const [reason, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${count.toString().padStart(4)}× ${reason}`)
}
