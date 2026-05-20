import fs from 'fs'
import path from 'path'

// ── 1. Přidej nové tokeny k existujícím ───────────────────────────────────
// TOKEN_MAP: hex (6 znaků) → token name (musí existovat v donjon/tokens.js)
const TOKEN_MAP = {
  // Již existující tokeny — stále hardcoded v pages
  gold:         '#FFC183',
  goldMid:      '#B8956A',
  goldDim:      '#8F7458',
  bg0:          '#12102A',
  bg4:          '#2A2948',
  successColor: '#40A055',
  textActive:   '#F0E6D3',
  borderSubtle: '#1A1830',
  // Nové tokeny
  failColor:    '#C04040',
  bgDeep:       '#1B1A30',
}

// ── 2. Alpha typo fix: #8F7454XX → ${goldDim}XX ──────────────────────────
// #8F7454 je překlep goldDim (#8F7458) — vyskytuje se pouze s alpha suffixem
const ALPHA_TYPO = {
  '#8F7454': 'goldDim',
}

const files = [
  ...fs.readdirSync('src/pages').filter(f => f.endsWith('.jsx')).map(f => path.join('src/pages', f)),
  ...fs.readdirSync('src/lib/donjon').filter(f => f.endsWith('.jsx')).map(f => path.join('src/lib/donjon', f)),
]

let totalChanges = 0
let changedFiles = 0

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  const original = content
  let count = 0
  const usedTokens = new Set()

  // ── A) Standalone hex replacement (6 znaků, bez dalšího hex znaku) ───────
  for (const [token, hex] of Object.entries(TOKEN_MAP)) {
    const escaped = hex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped + '(?![0-9A-Fa-f])', 'g')
    const matches = content.match(regex)
    if (matches) {
      count += matches.length
      content = content.replace(regex, token)
      usedTokens.add(token)
    }
  }

  // ── B) Alpha typo fix: '#8F7454XX' → template literal s tokenem ──────────
  for (const [typoHex, token] of Object.entries(ALPHA_TYPO)) {
    const escaped = typoHex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Najde 8znakový hex (6 + 2 alpha) v string literálu
    const alphaRegex = new RegExp(escaped + '([0-9A-Fa-f]{2})', 'g')
    if (!alphaRegex.test(content)) continue
    content = content.replace(alphaRegex, `\${${token}}$1`)
    usedTokens.add(token)

    // Konvertuj single-quoted stringy obsahující ${token} na template literals
    // Vzor: 'text ${token}XX text' → `text ${token}XX text`
    // Pozor: nahrazuj jen pokud string obsahuje náš nový interpolation
    const templatePattern = new RegExp(
      `'([^'\\n]*\\$\\{${token}\\}[0-9A-Fa-f]{2}[^'\\n]*)'`,
      'g'
    )
    const dqTemplatePattern = new RegExp(
      `"([^"\\n]*\\$\\{${token}\\}[0-9A-Fa-f]{2}[^"\\n]*)"`,
      'g'
    )
    const beforeConvert = content
    content = content.replace(templatePattern, '`$1`')
    content = content.replace(dqTemplatePattern, '`$1`')
    if (content !== beforeConvert) {
      count += (beforeConvert.match(alphaRegex) || []).length
    }
  }

  if (content === original) continue

  // ── Přidej / rozšiř import z donjon tokens ────────────────────────────────
  const isLib = file.includes('/lib/')
  const importPath = isLib ? './tokens' : '../lib/donjon/tokens'
  const importRegex = new RegExp(
    `(import\\s*\\{)([^}]+)(\\}\\s*from\\s*['"]${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"])`
  )
  const tokenList = [...usedTokens]

  if (importRegex.test(content)) {
    content = content.replace(importRegex, (m, open, names, close) => {
      const existing = names.split(',').map(s => s.trim()).filter(Boolean)
      const toAdd = tokenList.filter(t => !existing.includes(t))
      return toAdd.length ? `${open} ${[...existing, ...toAdd].join(', ')} ${close}` : m
    })
  } else {
    content = content.replace(/^(import .+\n)/, `$1import { ${tokenList.join(', ')} } from '${importPath}'\n`)
  }

  fs.writeFileSync(file, content)
  totalChanges += count
  changedFiles++
  console.log(`✓ ${file} (${count}×, tokeny: ${tokenList.join(', ')})`)
}

console.log(`\nCelkem: ${totalChanges} nahrazení v ${changedFiles} souborech`)
