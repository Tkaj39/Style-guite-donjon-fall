#!/usr/bin/env node
/**
 * Post-fix after fix-hardcoded-hex.mjs:
 *   1. JSX attribute syntax: `attr=tokenName` → `attr={tokenName}` or
 *      `attr="tokenName"` → `attr={tokenName}` (when the value is an identifier)
 *   2. Duplicate token imports (from donjon and tkajui at once) — TokensPage edge.
 */
import fs from 'node:fs'
import path from 'node:path'

const PAGES_DIR = './src/pages'

const KNOWN_TOKENS = new Set([
  // donjon
  'gold', 'goldMid', 'goldDim',
  'bg0', 'bg1', 'bg2', 'bg3', 'bg4', 'bgInactive', 'bgDeep',
  'borderSubtle', 'borderDefault', 'borderMid', 'borderStrong',
  'textHigh', 'textMid', 'textActive', 'textLow', 'textDisabled', 'textFaint', 'textDeep', 'textCool', 'textParchment', 'textHighest',
  'dangerColor', 'successColor', 'warningColor', 'failColor',
  'dangerText', 'successText', 'warningText', 'infoText',
  'infoColor', 'infoLight', 'infoMid', 'infoDark',
  'magicColor', 'magicDark', 'shieldColor', 'neutralColor', 'gainColor',
  'selBgInfo', 'selBgDanger', 'selBgGain', 'selBgMagic',
  'focusRingColor', 'borderFocus',
  'surface0', 'surface1', 'surface2', 'surface3', 'surface4',
  // tkajui
  'accent', 'accentLight', 'accentDim', 'accentBg', 'accentBorder',
  'successBg', 'successBgHover', 'successBorder', 'successHeaderBg', 'successDescColor', 'successDim',
  'dangerBg', 'dangerBgHover', 'dangerBorder', 'dangerHeaderBg', 'dangerDescColor', 'dangerDim',
  'warningBg', 'warningBgHover', 'warningBorder', 'warningHeaderBg', 'warningDescColor', 'warningDim',
  'infoBg', 'infoBorder', 'infoDim',
  'primaryText', 'primaryIcon',
])

let totalFiles = 0
let totalFixes = 0

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const original = content
  let fixes = 0

  // Fix 1: JSX attribute `attr=identifier` (no braces, no quotes)
  //   color=successColor → color={successColor}
  //   border=textMid → border={textMid}
  // Match: word=tokenName(space/>/newline)
  content = content.replace(
    /\b(\w+)=([a-zA-Z][a-zA-Z0-9]*)(\s|\/|>)/g,
    (full, attr, value, after) => {
      if (KNOWN_TOKENS.has(value)) {
        fixes++
        return `${attr}={${value}}${after}`
      }
      return full
    }
  )

  // Fix 2: JSX attribute `attr="tokenName"` (quoted but should be an identifier)
  //   accent="goldMid" → accent={goldMid}
  content = content.replace(
    /\b(\w+)="([a-zA-Z][a-zA-Z0-9]*)"/g,
    (full, attr, value) => {
      if (KNOWN_TOKENS.has(value)) {
        fixes++
        return `${attr}={${value}}`
      }
      return full
    }
  )

  // Fix 3: TokensPage — deduplicate cross-lib imports
  // Specific logic: if a file has `import { X } from './donjon/tokens'` and
  // later `import { ..., X, ... } from './tkajui/tokens'` with the same X,
  // remove X from the second one (first-come wins).
  // Only applied when the script created a duplicate — heuristically.
  if (filePath.endsWith('TokensPage.jsx')) {
    // Remove `successColor, ` and `, borderSubtle` from the tkajui import only on the line where they appear
    content = content.replace(
      /(import\s*\{[^}]*?)\b(successColor|borderSubtle)\s*,\s*([^}]*\}\s*from\s*['"][^'"]*tkajui\/tokens['"])/g,
      '$1$3'
    )
    content = content.replace(
      /(import\s*\{[^}]*?,\s*)\b(successColor|borderSubtle)\s*([,}][^}]*\}\s*from\s*['"][^'"]*tkajui\/tokens['"])/g,
      (full, before, name, after) => before + after.replace(/^,/, '')
    )
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8')
    totalFixes += fixes
    totalFiles++
    console.log(`  ${path.basename(filePath)}: ${fixes} fixes`)
  }
}

// Walk pages
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.jsx')) fixFile(full)
  }
}

walk(PAGES_DIR)
console.log(`\nTotal: ${totalFixes} fixes, ${totalFiles} files`)
