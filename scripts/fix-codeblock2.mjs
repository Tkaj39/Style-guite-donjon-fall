/**
 * fix-codeblock2.mjs
 *
 * Finds unescaped template literals inside CodeBlock code={`...`} strings
 * and escapes them properly:
 *   `1px solid ${failColor}` → \`1px solid \${failColor}\`
 *
 * Uses line-by-line heuristic: after entering a CodeBlock template literal,
 * any line containing unescaped `...${TOKEN}...` that is NOT an outer
 * interpolation gets escaped.
 */

import fs from 'fs'
import path from 'path'

const files = [
  ...fs.readdirSync('src/pages').filter(f => f.endsWith('.jsx')).map(f => path.join('src/pages', f)),
]

let totalChanges = 0
let changedFiles = 0

/**
 * Check if a backtick at position `pos` in `str` is preceded by an odd
 * number of backslashes (i.e., it is escaped).
 */
function isEscaped(str, pos) {
  let count = 0
  let i = pos - 1
  while (i >= 0 && str[i] === '\\') { count++; i-- }
  return count % 2 === 1
}

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  const original = content
  let changes = 0

  // Process the file character-by-character.
  // State: outsideCodeBlock / insideCodeBlock
  // When insideCodeBlock at braceDepth===0, any unescaped backtick is a
  // nested template literal start. We escape it and its contents.

  let result = ''
  let i = 0

  while (i < content.length) {
    // Look for `code={`` to enter CodeBlock mode
    if (content.slice(i, i + 7) === 'code={`') {
      result += 'code={`'
      i += 7

      // Read the template literal content until we find the REAL closing backtick.
      // The REAL closing backtick is at braceDepth===0 and is followed by `}` (closing the JSX expression).
      // Heuristic: we treat the LAST backtick at braceDepth===0 as the closer.
      // But we can't look ahead easily. Instead:
      // We know the pattern that fix-tokens3 introduced:
      //   `` `1px solid ${TOKEN}` `` or `` `${TOKEN}30` ``
      // These appear as standalone template literals embedded in the code string.
      // We need to escape them.

      // Strategy: read until we find `}` (the JSX expression close AFTER the template literal).
      // The template literal closes just before `}` that appears at depth 0 in the outer content.
      // But we're already INSIDE the template literal...

      // Simpler strategy: find the pattern  `` [^\\]` `` and for each one,
      // check if the next char is `}` (real close) or something else (nested template).
      // But with complex multiline content this is unreliable.

      // MOST PRACTICAL: detect the patterns that fix-tokens3 introduced:
      // These are always of the form: PropName: `VALUE`, or PropName: `VALUE`
      // where PropName is a CSS property name.
      // We can match these within the code block.

      // Let's collect the code block content until we find the REAL closing `` `} ``
      // by using a depth counter for all { } pairs.

      // Actually, let's just use a simple rule:
      // A backtick CLOSES the template literal if the content between `code={`` and
      // this backtick has balanced braces (from ${...} interpolations).
      // Inside a REAL codeblock that just has code examples as text, there should be
      // NO ${...} interpolations in the outer template literal.
      // So the FIRST unescaped backtick at braceDepth===0 would be the closer...
      // UNLESS we introduced nested template literals (which we did).

      // New approach: collect the code block by reading until we see a line
      // that ONLY has `` `} `` at the end (i.e., the template literal close
      // followed by the JSX expression close).

      // Actually, looking at the CodeBlock usage pattern:
      // <CodeBlock code={`
      //   ... multiline content ...
      // `} />
      // The closing is always `` `} />``.
      // So I can read until I find `` `} `` at braceDepth === 0 of the OUTER CONTEXT.

      // In JSX, `code={` opens a JS expression. The template literal starts.
      // The template literal's ${...} interpolations are tracked by braceDepth.
      // The template literal ENDS at the next unescaped backtick at braceDepth===0.
      // After that, `}` closes the JSX expression.

      // So the approach:
      // 1. Read characters, tracking braceDepth
      // 2. When we encounter an unescaped backtick at braceDepth===0, it COULD be:
      //    a. The real closing backtick (followed by `}` or whitespace+`}`)
      //    b. A nested template literal start (NOT followed by `}`)
      // 3. Peek ahead: if backtick is followed by `}` (possibly with whitespace), it's the closer.
      //    Otherwise, it's a nested template literal we need to escape.

      let braceDepth = 0  // depth of ${...} in the outer template literal
      let atEnd = false

      while (i < content.length && !atEnd) {
        const ch = content[i]

        // Handle escaped characters
        if (ch === '\\') {
          result += ch + (content[i + 1] || '')
          i += 2
          continue
        }

        // Handle ${...} interpolation depth
        if (ch === '$' && content[i + 1] === '{') {
          braceDepth++
          result += ch
          i++
          continue
        }
        if (braceDepth > 0 && ch === '{') {
          braceDepth++
          result += ch
          i++
          continue
        }
        if (braceDepth > 0 && ch === '}') {
          braceDepth--
          result += ch
          i++
          continue
        }

        // At braceDepth===0, check for backtick
        if (braceDepth === 0 && ch === '`') {
          // Is this the REAL closing backtick?
          // Peek ahead for `}` (ignoring whitespace and comments)
          let peek = i + 1
          while (peek < content.length && (content[peek] === ' ' || content[peek] === '\t')) {
            peek++
          }

          if (content[peek] === '}') {
            // This is the REAL closing backtick
            result += ch
            i++
            atEnd = true
          } else {
            // This is a NESTED template literal - needs escaping
            // Read until its closing backtick, escaping ${...} too
            result += '\\`'
            i++
            changes++

            // Read the inner template literal content
            let innerBraceDepth = 0
            while (i < content.length) {
              const ic = content[i]

              if (ic === '\\') {
                result += ic + (content[i + 1] || '')
                i += 2
                continue
              }

              if (ic === '$' && content[i + 1] === '{') {
                // This ${...} needs to be escaped in the output
                result += '\\${'
                i += 2
                innerBraceDepth++
                continue
              }

              if (innerBraceDepth > 0 && ic === '{') {
                innerBraceDepth++
                result += ic
                i++
                continue
              }

              if (innerBraceDepth > 0 && ic === '}') {
                innerBraceDepth--
                if (innerBraceDepth === 0) {
                  result += ic
                  i++
                  continue
                }
                result += ic
                i++
                continue
              }

              if (ic === '`') {
                // End of inner template literal
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

        result += ch
        i++
      }
    } else {
      result += content[i]
      i++
    }
  }

  content = result

  if (content === original) continue

  fs.writeFileSync(file, content)
  totalChanges += changes
  changedFiles++
  console.log(`✓ ${file} (${changes}×)`)
}

console.log(`\nCelkem: ${totalChanges} oprav v ${changedFiles} souborech`)
