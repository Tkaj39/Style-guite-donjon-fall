/**
 * fix-tokens4.mjs
 *
 * Fixes token names left as string literals in:
 * A) Ternary expressions: `cond ? 'tokenName' : other` → `cond ? tokenName : other`
 * B) Function default parameters: `param = 'tokenName'` → `param = tokenName`
 * C) Icon/key fields in config objects that use token names as CSS colors
 *
 * Uses simple regex replacements. Skips content inside CodeBlock code={`...`} strings.
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

  // Process line by line, but skip lines that are inside CodeBlock strings.
  // A CodeBlock string starts at a line containing `code={`` and ends at a line with just `\`}`.
  // Simple heuristic: skip lines between `code={`` ... `\`} />` markers.

  // Split into segments: inside-CodeBlock and outside-CodeBlock
  // by processing character by character.
  let result = ''
  let i = 0

  while (i < content.length) {
    // Check for code={` pattern (CodeBlock start)
    if (content.slice(i, i + 7) === 'code={`') {
      // Find the matching closing `} — scan until we find ` at depth 0 followed by }
      let j = i + 7
      let depth = 0
      while (j < content.length) {
        if (content[j] === '\\') { j += 2; continue }
        if (content[j] === '$' && content[j + 1] === '{') { depth++; j += 2; continue }
        if (depth > 0 && content[j] === '{') { depth++; j++; continue }
        if (depth > 0 && content[j] === '}') { depth--; j++; continue }
        if (depth === 0 && content[j] === '`') {
          j++
          // Check for }
          while (j < content.length && (content[j] === ' ' || content[j] === '\t')) j++
          if (content[j] === '}') {
            j++ // include the }
            break
          }
        } else {
          j++
        }
      }
      // Copy the CodeBlock section verbatim (no token replacement inside code strings)
      result += content.slice(i, j)
      i = j
      continue
    }

    // For non-CodeBlock content, apply single-char by char copy but
    // do token replacement on line-level for specific patterns
    result += content[i]
    i++
  }

  // Now apply token replacements on the result, but only on non-CodeBlock segments.
  // Since we've copied CodeBlock sections verbatim, we can safely do global replacements
  // on `result` because CodeBlock sections don't have the patterns we're looking for
  // (they have properly escaped \${} and \` chars).

  let processed = result

  for (const token of ALL_TOKENS) {
    // A) Ternary: `? 'token' :` or `: 'token'` in JSX/JS context
    //    But NOT in CodeBlock code strings (which contain escaped \` and don't match these patterns)

    // Pattern: `? 'token' :` (middle of ternary) or `? 'token'` at end or `: 'token'`
    // We use a general pattern: quote-token-quote preceded by space/: /? and followed by space/:/, }

    // Match: (? or :) spaces 'token' or "token" (spaces ?: )
    // This covers most ternary and assignment patterns

    const re1 = new RegExp(
      `(?<=[?:,=]\\s*)['"]${token}['"](?=\\s*[?:,\\]})\\n])`,
      'g'
    )

    // B) Function defaults: `= 'token'`
    // Already covered by re1 above (after `=`)

    // C) Object property with color value: `icon: 'token'` or `resultColor: 'token'`
    // These use CSS property names that fix-tokens3 didn't catch
    const cssColorProps = ['icon','resultColor','accentColor','textColor','faintColor','reqColor','borderColor']
    for (const prop of cssColorProps) {
      const re = new RegExp(`(${prop}\\s*[=:]\\s*)['"]${token}['"]`, 'g')
      const before = processed
      processed = processed.replace(re, `$1${token}`)
      if (processed !== before) count += (before.match(re) || []).length
    }

    // Also fix patterns like: `bg = 'token'` (function defaults)
    const reDefault = new RegExp(
      `(\\b(?:bg|border|color|fill|stroke|textColor|accentColor|faintColor|bgColor)\\s*=\\s*)['"]${token}['"]`,
      'g'
    )
    const before1 = processed
    processed = processed.replace(reDefault, `$1${token}`)
    if (processed !== before1) count += (before1.match(reDefault) || []).length
  }

  // Fix specific ternary patterns for CSS color properties in style objects:
  // These are cases like:
  //   background: condition ? 'token1' : 'token2'
  //   color: condition ? otherToken : 'token2'
  //   background: condition ? '#hex' : 'token'
  for (const token of ALL_TOKENS) {
    // After ? : in any context that looks like CSS value context
    // Pattern: after ternary operator (? or :) followed by a quoted token
    const patterns = [
      // condition ? 'token' :
      [new RegExp(`(\\?\\s*)['"]${token}['"](?=\\s*:)`, 'g'), `$1${token}`],
      // : 'token' (else branch or object value)
      [new RegExp(`(:\\s*)['"]${token}['"](?=\\s*[,)\\}\n])`, 'g'), `$1${token}`],
      // = 'token' (assignment or default)
      [new RegExp(`(=\\s*)['"]${token}['"](?=\\s*[,)\\}\n])`, 'g'), `$1${token}`],
    ]

    for (const [re, replacement] of patterns) {
      const before = processed
      processed = processed.replace(re, replacement)
      if (processed !== before) {
        // Count changes
        count++
      }
    }
  }

  if (processed === original) continue

  // Count total changes
  let diffCount = 0
  for (let k = 0; k < Math.min(original.length, processed.length); k++) {
    if (original[k] !== processed[k]) diffCount++
  }

  fs.writeFileSync(file, processed)
  totalChanges += count
  changedFiles++
  console.log(`✓ ${file}`)
}

console.log(`\nCelkem: ${changedFiles} souborů upraveno`)
