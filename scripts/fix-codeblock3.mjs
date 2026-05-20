/**
 * fix-codeblock3.mjs
 *
 * Finds unescaped nested template literals inside CodeBlock code={`...`} strings
 * that were introduced by fix-tokens3.mjs, and escapes them.
 *
 * Example fix:
 *   code={`border: `1px solid ${token}`, ... `}
 *   →
 *   code={`border: \`1px solid \${token}\`, ... `}
 *
 * Algorithm:
 *   - Find `code={`` markers
 *   - Process the template literal character by character
 *   - Track `${...}` depth to correctly handle real interpolations
 *   - Any unescaped backtick at depth 0 that is NOT the closing backtick
 *     (detected by peeking for `}` after it) is a nested template literal
 *     that needs escaping
 *
 * FIX vs fix-codeblock2: properly skip `${` as a unit (advance by 2)
 * so the `{` isn't counted again.
 */

import fs from 'fs'
import path from 'path'

const files = [
  ...fs.readdirSync('src/pages').filter(f => f.endsWith('.jsx')).map(f => path.join('src/pages', f)),
]

let totalChanges = 0
let changedFiles = 0

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  const original = content

  let result = ''
  let i = 0
  let changes = 0

  while (i < content.length) {
    // Look for `code={`` (7 chars) to enter CodeBlock template literal mode
    if (content.slice(i, i + 7) === 'code={`') {
      result += 'code={`'
      i += 7

      // We're now inside the template literal. Process until real close.
      let braceDepth = 0   // depth of ${...} interpolations in the outer TL
      let atEnd = false

      while (i < content.length && !atEnd) {
        const ch = content[i]

        // 1. Escaped character — pass through verbatim
        if (ch === '\\') {
          result += ch + (content[i + 1] ?? '')
          i += 2
          continue
        }

        // 2. Start of ${...} interpolation: skip BOTH `$` and `{` as a unit
        if (ch === '$' && content[i + 1] === '{') {
          braceDepth++
          result += '${'
          i += 2   // ← FIX: skip both chars so `{` is not counted again
          continue
        }

        // 3. Extra `{` inside an interpolation (e.g. nested object)
        if (braceDepth > 0 && ch === '{') {
          braceDepth++
          result += ch
          i++
          continue
        }

        // 4. `}` closes one level of interpolation
        if (braceDepth > 0 && ch === '}') {
          braceDepth--
          result += ch
          i++
          continue
        }

        // 5. Backtick at depth 0 — could be closing or nested
        if (braceDepth === 0 && ch === '`') {
          // Peek ahead for `}` (the JSX expression close)
          let peek = i + 1
          while (peek < content.length &&
                 (content[peek] === ' ' || content[peek] === '\t' || content[peek] === '\n' || content[peek] === '\r')) {
            peek++
          }

          if (content[peek] === '}') {
            // Real closing backtick → terminate CodeBlock processing
            result += ch
            i++
            atEnd = true
          } else {
            // Nested template literal → escape it
            changes++
            result += '\\`'
            i++

            // Read the inner template literal, escaping ${...} and the closing backtick
            let innerDepth = 0
            while (i < content.length) {
              const ic = content[i]

              if (ic === '\\') {
                // Already escaped inside nested TL
                result += ic + (content[i + 1] ?? '')
                i += 2
                continue
              }

              if (ic === '$' && content[i + 1] === '{') {
                // Start of ${...} in nested TL — escape the ${
                result += '\\${'
                i += 2
                innerDepth++
                continue
              }

              if (innerDepth > 0 && ic === '{') {
                innerDepth++
                result += ic
                i++
                continue
              }

              if (innerDepth > 0 && ic === '}') {
                innerDepth--
                result += ic
                i++
                continue
              }

              if (ic === '`') {
                // End of nested template literal — escape it
                result += '\\`'
                i++
                break
              }

              result += ic
              i++
            }
          }
          continue
        }

        // 6. Normal character
        result += ch
        i++
      }
    } else {
      result += content[i]
      i++
    }
  }

  if (result === original) continue

  fs.writeFileSync(file, result)
  totalChanges += changes
  changedFiles++
  console.log(`✓ ${file} (${changes}×)`)
}

console.log(`\nCelkem: ${totalChanges} oprav v ${changedFiles} souborech`)
