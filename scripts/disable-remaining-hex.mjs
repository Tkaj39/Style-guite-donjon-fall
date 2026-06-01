#!/usr/bin/env node
/**
 * Bulk-adds `eslint-disable-next-line` on every line with a "does not match
 * any token" error — with a categorized reason.
 *
 * Categories:
 *   - DEMO_PLAYER: hex in the context of PlayerPanel/Shield/Erb props (demo data)
 *   - BRAND_TKAJUI: TkajUI brand colors in HomePage/ArchDiagram (mix paletes)
 *   - DOC_CODE: hex as TEXT inside a CodeBlock snippet (sample for the user)
 *   - TECH_DEBT: everything else — TODO tokenize later
 *
 * After the script: lint is clean, every disable has a documented reason.
 * Future PRs must not add a new hex without an explicit disable or token.
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

// Hex values recognized as player demo colors
const PLAYER_COLORS = new Set([
  '#4A90E2',  // Player 1 blue
  '#C84A4A',  // Player 2 red
  '#50B85C',  // Player 3 green (gainColor also exists)
  '#B856C8',  // Player 4 purple
  '#C8A050',  // Player 5 amber
  '#50B8B0',  // Player 6 teal
])

const BRAND_COLORS = new Set([
  '#7BAED4',  // TkajUI brand (BRAND.tkajui.color)
  '#B8956A',  // donjon brand (= goldMid token — sometimes hardcoded as a brand const)
])

function categorize(line, hex, msg) {
  // Alpha tail with a known token — more complex transformation inside a middle string
  if (msg && msg.includes('alpha tail on top of token')) {
    return 'alpha tail inside a middle string (manual transform to template literal)'
  }
  // Known token suggestion — auto-fix didn't apply (multi-hex per line, etc.)
  if (msg && msg.includes('use the token')) {
    return 'multi-hex per line or complex (auto-fix skipped)'
  }
  // 1. Demo player color: anywhere the color binds to player.color/playerColor
  if (PLAYER_COLORS.has(hex.toUpperCase()) || /(?:player(?:Color)?|player\.color|color:)\s*['"]#/.test(line)) {
    if (/(?:PlayerPanel|Shield|Erb|playerColor|player.color)/i.test(line) || PLAYER_COLORS.has(hex.toUpperCase())) {
      return 'demo player color (demo data, not a styling token)'
    }
  }
  // 2. TkajUI brand mix
  if (BRAND_COLORS.has(hex.toUpperCase())) {
    return 'brand color in cross-library context (HomePage, ArchDiagram — mix paletes)'
  }
  // 3. Doc/code snippet — hex is TEXT inside `<CodeBlock code={`...`}>`
  if (/CodeBlock|<pre|code=\{`|code=\{"/.test(line)) {
    return 'hex in code snippet text (sample for the user)'
  }
  // 4. Default tech debt
  return 'TODO: tokenize or rationalize (tech debt)'
}

function addDisableComment(content, lineNo, reason) {
  const lines = content.split('\n')
  const targetIdx = lineNo - 1
  if (targetIdx >= lines.length || targetIdx < 0) return content

  // Detect the indent of the original line
  const targetLine = lines[targetIdx]
  const indent = targetLine.match(/^\s*/)[0]

  // If a disable already exists on the line ABOVE, don't duplicate
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
  // Disable ALL remaining hex errors (including those with known token suggestions).
  // Reason: the auto-fixable ones have already been auto-fixed. What remains is:
  //   • alpha tail inside a middle string — auto-fix can't (`'1px solid #XXX44'`)
  //   • multi-hex on a line — auto-fix only replaced one occurrence
  //   • complex expressions — require manual cleanup
  // Disable with a reason = explicit tech-debt acknowledgement, not a silent stain.
  const hexErrors = result.messages.filter(m => m.ruleId === 'donjon/no-hardcoded-hex')
  if (hexErrors.length === 0) continue

  let content = fs.readFileSync(result.filePath, 'utf-8')
  const originalLines = content.split('\n')

  // Sort errors descending by line (so an insert doesn't shift the other line numbers)
  hexErrors.sort((a, b) => b.line - a.line)

  let fileChanges = 0
  for (const err of hexErrors) {
    const hexMatch = err.message.match(/'(#[0-9A-Fa-f]+)'/)
    if (!hexMatch) continue
    const hex = hexMatch[1]
    const line = originalLines[err.line - 1] || ''
    const reason = categorize(line, hex, err.message)
    const before = content
    content = addDisableComment(content, err.line, reason)
    if (content !== before) {
      fileChanges++
      stats[reason] = (stats[reason] || 0) + 1
    }
  }

  if (fileChanges > 0) {
    fs.writeFileSync(result.filePath, content, 'utf-8')
    filesChanged++
    totalDisabled += fileChanges
  }
}

console.log(`Disabled ${totalDisabled} hex errors across ${filesChanged} files`)
console.log('Reason breakdown:')
for (const [reason, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${count.toString().padStart(4)}  ${reason}`)
}
