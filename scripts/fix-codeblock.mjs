/**
 * fix-codeblock.mjs
 *
 * The previous token-replacement scripts left unescaped template literals
 * inside CodeBlock code={`...`} strings, causing nested template literal
 * syntax errors.
 *
 * This script finds CodeBlock template literal strings and escapes any
 * unescaped `` ` `` and `${...}` interpolations that appear inside them.
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
  let count = 0

  // Find all CodeBlock code={`...`} blocks and fix nested template literals.
  // Strategy: process the string character by character to find template literal
  // spans that are inside CodeBlock code={`...`}.
  //
  // We look for `code={`` and then find the matching closing backtick,
  // then within that span escape any `` ` `` that isn't already escaped.

  // Simple approach: regex-replace border/boxShadow/outline template literals
  // that appear inside a CodeBlock template literal context.
  // We detect "inside CodeBlock" by checking if there's a preceding `code={\`` without a closing backtick.

  // Even simpler: within a `code={`...`}` block, any `` `${TOKEN}...` ``
  // sequence that is NOT preceded by `\` needs to have its backticks and ${ escaped.

  // Regex to find unescaped template literals inside code strings:
  // Pattern: code={\`[^`]*(`[^`]*${[^}]+}[^`]*`)[^`]*`\}
  // This is too complex for a single regex. Use a state machine approach.

  let result = ''
  let i = 0
  while (i < content.length) {
    // Look for `code={`` to enter CodeBlock context
    if (content.slice(i, i + 8) === 'code={`') {
      result += 'code={`'
      i += 7

      // We're now inside the template literal. Find the closing backtick.
      // Track depth of ${} to handle nested interpolations correctly.
      let depth = 0  // depth inside ${...}
      while (i < content.length) {
        const ch = content[i]
        const prev = i > 0 ? content[i - 1] : ''

        if (ch === '\\') {
          // Escaped character — copy both chars
          result += ch + (content[i + 1] || '')
          i += 2
          continue
        }

        if (depth === 0 && ch === '`') {
          // This closes the outer template literal
          result += ch
          i++
          break
        }

        if (ch === '$' && content[i + 1] === '{') {
          // Start of ${} interpolation
          depth++
          result += ch
          i++
          continue
        }

        if (depth > 0 && ch === '{') {
          depth++
          result += ch
          i++
          continue
        }

        if (depth > 0 && ch === '}') {
          depth--
          result += ch
          i++
          continue
        }

        if (depth === 0 && ch === '`') {
          // Unescaped backtick INSIDE the code string (not closing it since depth===0 is handled above)
          // This should have been caught above already...
          result += ch
          i++
          continue
        }

        // Check for unescaped nested template literal start: `` ` `` at depth===0
        // Actually let me detect the specific pattern: non-escaped backtick followed by content
        // and then ${...} pattern.
        // At this point we're at depth===0, ch is some regular char.

        // Check if this is an unescaped nested template literal open:
        // It would be a backtick that's NOT preceded by backslash
        // We already handled the closing backtick above.
        // A nested `` `...${...}...` `` would be:
        //   - backtick at depth=0 (not closing the outer, since we'd have broken above)
        // Wait, we DO break on backtick at depth=0. So nested template literals would
        // prematurely close our outer template literal.
        //
        // The fix-tokens3 script generated patterns like:
        //   border: `1px solid ${failColor}`,
        // inside code={`...`} strings, where the inner backtick closes the outer template literal.
        //
        // We need to find these patterns BEFORE parsing and fix them.
        // Since our parser already breaks on the first unescaped backtick,
        // we need a different approach.

        result += ch
        i++
      }
    } else {
      result += content[i]
      i++
    }
  }

  // Instead, use targeted regex approach:
  // Find all instances of unescaped `` `1px solid ${TOKEN}` `` etc. inside code blocks
  // by looking for the pattern that fix-tokens3 introduced.

  // Reset and use regex approach
  content = original

  // Pattern: within a code string (after code={`), find unescaped template literals
  // like `` `1px solid ${failColor}` `` and convert to escaped form.
  //
  // The tokens that could appear in border/boxShadow/outline compound values:
  const BORDER_TOKENS = ['gold','goldMid','goldDim','bg0','bg1','bg2','bg3','bg4','bgDeep',
    'textActive','failColor','successColor','warningColor','dangerColor','gainColor',
    'borderSubtle','borderDefault','borderMid']

  for (const token of BORDER_TOKENS) {
    // Match: backtick followed by non-backtick content containing ${TOKEN} then closing backtick
    // that appears to be nested inside another template literal (inside a CodeBlock).
    //
    // Heuristic: if the same line has `code={`` or is indented code content,
    // we look for `` `(anything)${TOKEN}(anything)` `` and escape them.
    //
    // Simpler: just look for any unescaped `` `...${TOKEN}...` `` that appears
    // at the line level inside a CodeBlock context.
    //
    // Practical regex: find lines that match `` ^[^`]*`[^`]*\$\{TOKEN\}[^`]*`[^`]*$ ``
    // within a code={`...`} block.
    //
    // Even simpler: look for `` `...${TOKEN}...` `` anywhere in the file
    // where it CANNOT be a JSX expression (i.e., it's not in a {} JSX context).
    // This is too ambiguous.
    //
    // Most practical approach for our specific case:
    // The pattern introduced by fix-tokens3 is always:
    //   propName: `something ${TOKEN}something`,
    // within a CodeBlock string. Outside CodeBlock strings, these appear as:
    //   propName: `something ${TOKEN}something`,
    // which is VALID JSX style code.
    //
    // The only way to distinguish is context. Let me use a simple heuristic:
    // If the template literal is inside a string that starts with "code={`",
    // then escape it. Otherwise leave it.
    //
    // I'll do multi-line regex on the file content to find CodeBlock blocks
    // and fix them within.

    // Step 1: Split into CodeBlock segments and non-CodeBlock segments
    // Step 2: In CodeBlock segments, escape unescaped `` ` `` chars

    // Actually, let me just do a targeted fix for the specific patterns that
    // fix-tokens3 introduced. The pattern is:
    //   PROP: `VALUE_WITH_TOKEN`,
    // where the backtick is NOT preceded by \

    // In a JSX style object (correct), the same pattern appears as:
    //   PROP: `VALUE_WITH_TOKEN`,
    // which is valid JS.

    // Inside a CodeBlock code={`...`} string, the same text ALSO appears as:
    //   PROP: `VALUE_WITH_TOKEN`,
    // but is now a nested template literal that breaks the outer one.

    // The key insight: if the file builds, the template literals are fine.
    // If it doesn't build, there's a syntax error.

    // Let me use a different strategy: process CodeBlock blocks specifically.
  }

  // Final approach: find CodeBlock template literal content by matching
  // code={` ... `} with proper nesting, then escape unescaped backticks inside.

  content = original

  // Regex that finds `code={\`` ... closing `\`}` and captures the inner content
  // This won't work for multiline with simple regex.
  // Let's use the character-by-character approach but fix it properly.

  let newContent = ''
  let j = 0
  let changes = 0

  while (j < content.length) {
    // Look for code={`
    if (content.slice(j, j + 7) === 'code={`') {
      const startIdx = j
      j += 7
      let codeContent = ''
      let braceDepth = 0  // depth of ${} in the OUTER template literal

      // Read until we find the closing backtick of the outer template literal
      while (j < content.length) {
        const ch = content[j]

        if (ch === '\\') {
          // Already escaped — copy verbatim
          codeContent += ch + (content[j + 1] || '')
          j += 2
          continue
        }

        if (ch === '$' && content[j + 1] === '{') {
          // Opening ${...} in outer template literal
          braceDepth++
          codeContent += ch
          j++
          continue
        }

        if (braceDepth > 0 && ch === '{') {
          braceDepth++
          codeContent += ch
          j++
          continue
        }

        if (braceDepth > 0 && ch === '}') {
          braceDepth--
          codeContent += ch
          j++
          continue
        }

        if (braceDepth === 0 && ch === '`') {
          // This is an unescaped backtick inside the code string (NOT the closing backtick)
          // We need to escape it → \`
          // Also need to escape the ${ that follows (if it's ${TOKEN})
          // Find the matching closing backtick for this inner template literal
          let inner = '\\`'
          j++
          while (j < content.length) {
            const ic = content[j]
            if (ic === '\\') {
              inner += ic + (content[j + 1] || '')
              j += 2
              continue
            }
            if (ic === '$' && content[j + 1] === '{') {
              // Escape the ${ inside the inner template literal
              inner += '\\${'
              j += 2
              // Read until closing }
              let innerBrace = 1
              while (j < content.length && innerBrace > 0) {
                const ibc = content[j]
                if (ibc === '{') innerBrace++
                else if (ibc === '}') { innerBrace--; if (innerBrace === 0) { inner += content.slice(j - 0, j + 1); j++; break } }
                inner += ibc
                j++
              }
              continue
            }
            if (ic === '`') {
              // End of inner template literal
              inner += '\\`'
              j++
              break
            }
            inner += ic
            j++
          }
          codeContent += inner
          changes++
          continue
        }

        if (braceDepth === 0 && ch === '`') {
          // This is the CLOSING backtick of the outer template literal
          // (but we already handled it in the if above... wait, this is unreachable)
          break
        }

        // Check if this is the closing backtick (outside any ${} and without braceDepth)
        if (braceDepth === 0 && ch === '`') {
          break
        }

        codeContent += ch
        j++
      }

      // Now check for the closing `}
      // The outer closing backtick
      newContent += 'code={`' + codeContent
      if (j < content.length && content[j] === '`') {
        newContent += '`'
        j++
      }
    } else {
      newContent += content[j]
      j++
    }
  }

  // The above has a logical bug - let me fix: the closing backtick detection
  // needs to happen BEFORE the "unescaped backtick inside" check.
  // Let me restart with a cleaner version.

  console.log(`${file}: would change ${changes} nested template literals`)

  // Don't write - this approach is buggy. Need cleaner version.
}

console.log('Done (dry run - no files written)')
