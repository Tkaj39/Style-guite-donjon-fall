/**
 * fix-tokens3.mjs
 * Fixes token names that were left as string literals in JS style objects.
 *
 * Pattern A: `color: 'goldMid'` → `color: goldMid`
 *            `background: 'bg0'` → `background: bg0`
 *
 * Pattern B: `border: '1px solid bg4'` → `border: \`1px solid ${bg4}\``
 *            `border: '1px solid borderSubtle'` → same
 *
 * Also fixes compound values like `borderBottom: '1px solid goldDim'`
 */

import fs from 'fs'
import path from 'path'

const ALL_TOKENS = [
  'gold','goldMid','goldDim',
  'bg0','bg1','bg2','bg3','bg4','bgDeep','bgInactive',
  'textHigh','textMid','textActive','textLow','textDisabled',
  'textFaint','textDeep','textCool','textParchment',
  'borderSubtle','borderDefault','borderMid',
  'dangerColor','successColor','warningColor','failColor','gainColor',
]

// CSS properties that take a single color value
const COLOR_PROPS = [
  'color','background','backgroundColor','fill','stroke',
  'borderColor','borderTopColor','borderBottomColor','borderLeftColor','borderRightColor',
  'outlineColor','caretColor','accentColor','textDecorationColor',
]

// CSS properties that may contain a token name as part of a compound value
const COMPOUND_PROPS = [
  'border','borderTop','borderBottom','borderLeft','borderRight',
  'borderBlock','borderInline','outline','boxShadow','textShadow',
]

const files = [
  ...fs.readdirSync('src/pages').filter(f => f.endsWith('.jsx')).map(f => path.join('src/pages', f)),
  ...fs.readdirSync('src/lib/donjon').filter(f => f.endsWith('.jsx')).map(f => path.join('src/lib/donjon', f)),
]

const tokenSet = new Set(ALL_TOKENS)
let totalChanges = 0
let changedFiles = 0

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  const original = content
  let count = 0

  // ── A) Simple color properties: prop: 'tokenName' → prop: tokenName ─────
  for (const prop of COLOR_PROPS) {
    for (const token of ALL_TOKENS) {
      // Match: prop: 'token' or prop: "token" (exact token name only)
      const re = new RegExp(`(${prop}:\\s*)['"]${token}['"]`, 'g')
      const matches = content.match(re)
      if (matches) {
        count += matches.length
        content = content.replace(re, `$1${token}`)
      }
    }
  }

  // ── B) Compound properties with token as color: '1px solid tokenName' ──
  for (const prop of COMPOUND_PROPS) {
    for (const token of ALL_TOKENS) {
      // Match patterns like: border: '1px solid tokenName' or border: '2px dashed tokenName'
      const re = new RegExp(
        `(${prop}:\\s*)'([^'"]*\\b${token}\\b[^'"]*)'`,
        'g'
      )
      const matches = content.match(re)
      if (matches) {
        count += matches.length
        content = content.replace(re, (m, prop, inner) => {
          // Convert 'inner text with tokenName' → `inner text with ${tokenName}`
          const fixed = inner.replace(new RegExp(`\\b${token}\\b`), `\${${token}}`)
          return `${prop}\`${fixed}\``
        })
      }
    }
  }

  if (content === original) continue

  fs.writeFileSync(file, content)
  totalChanges += count
  changedFiles++
  console.log(`✓ ${file} (${count}×)`)
}

console.log(`\nCelkem: ${totalChanges} nahrazení v ${changedFiles} souborech`)
