/**
 * fix-ternary.mjs
 * Fixes token names as string values in ternary expressions and assignments
 * within JSX style props. Skips content inside CodeBlock strings.
 */
import fs from 'fs'
import path from 'path'

const TOKENS = ['gold','goldMid','goldDim','bg0','bg1','bg2','bg3','bg4','bgDeep','bgInactive',
  'textHigh','textMid','textActive','textLow','textDisabled','textFaint','textDeep','textCool','textParchment',
  'borderSubtle','borderDefault','borderMid','dangerColor','successColor','warningColor','failColor','gainColor']

const files = [
  ...fs.readdirSync('src/pages').filter(f => f.endsWith('.jsx')).map(f => path.join('src/pages', f)),
  ...fs.readdirSync('src/lib/donjon').filter(f => f.endsWith('.jsx')).map(f => path.join('src/lib/donjon', f)),
]

let total = 0, changedFiles = 0

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  const orig = content

  // Process line by line, skipping lines inside CodeBlock template strings
  const lines = content.split('\n')
  let inCodeBlock = false
  let depth = 0

  const out = lines.map(line => {
    // Track CodeBlock entry/exit (simple heuristic)
    if (!inCodeBlock && line.includes('code={`')) {
      inCodeBlock = true
      return line
    }
    if (inCodeBlock) {
      // Exit when we see the closing backtick (preceded by nothing or whitespace)
      if (/^\s*`\}/.test(line) || /`\}\s*\/>/.test(line)) {
        inCodeBlock = false
      }
      return line
    }

    // Apply replacements on this non-CodeBlock line
    for (const token of TOKENS) {
      // ? 'token' or ? "token" → ? token
      line = line.replace(new RegExp("[?]\\s+['\"]" + token + "['\"]", 'g'), '? ' + token)
      // : 'token' or : "token" → : token  (followed by , ) } \n = space]
      line = line.replace(new RegExp(":\\s+['\"]" + token + "['\"](?=[\\s,\\)\\}\\]])", 'g'), ': ' + token)
      // = 'token' or = "token" → = token
      line = line.replace(new RegExp("=\\s+['\"]" + token + "['\"](?=[\\s,\\)\\}])", 'g'), '= ' + token)
    }
    return line
  })

  content = out.join('\n')
  if (content === orig) continue

  fs.writeFileSync(file, content)
  changedFiles++
  console.log(`✓ ${file}`)
}

console.log(`\n${changedFiles} souborů upraveno`)
