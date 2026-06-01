#!/usr/bin/env node
// Converts `// eslint-disable-next-line donjon/no-hardcoded-hex` in JSX
// child context to the JSX expression-comment form — the only form ESLint
// recognizes in JSX child context.
//
// Heuristic: if the next line starts with `<` (a JSX element), it's
// JSX child context. Otherwise leave `//` (works in JS expression context).
import fs from 'node:fs'
import path from 'node:path'

const PAGES_DIR = './src/pages'
const LIB_DIR = './src/lib'

let totalConverted = 0
let filesChanged = 0

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  // Detect line ending (CRLF on Windows, LF on Unix) and normalize to LF
  const useCRLF = content.includes('\r\n')
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  let conversions = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Match: optional whitespace + `// eslint-disable-next-line donjon/no-hardcoded-hex -- reason`
    const m = line.match(/^(\s*)\/\/ (eslint-disable-next-line donjon\/no-hardcoded-hex -- .+)$/)
    if (!m) continue

    // Look at next non-empty AND non-disable line — skip chained disables
    let nextIdx = i + 1
    while (nextIdx < lines.length) {
      const t = lines[nextIdx].trim()
      if (t === '') { nextIdx++; continue }
      // Skip another disable comment (chained disables from the same batch)
      if (/^(\s*)\/\/ eslint-disable-next-line donjon\/no-hardcoded-hex/.test(lines[nextIdx])) { nextIdx++; continue }
      break
    }
    if (nextIdx >= lines.length) continue
    const nextLine = lines[nextIdx].trim()

    // Look at previous non-empty AND non-disable line
    let prevIdx = i - 1
    while (prevIdx >= 0) {
      const t = lines[prevIdx].trim()
      if (t === '') { prevIdx--; continue }
      if (/^(\s*)\/\/ eslint-disable-next-line donjon\/no-hardcoded-hex/.test(lines[prevIdx])) { prevIdx--; continue }
      break
    }
    const prevLine = prevIdx >= 0 ? lines[prevIdx].trim() : ''

    // JSX child context per TWO heuristics:
    //   1. Previous (non-disable) line ENDS with `>` or `}` — we sit between JSX siblings
    //   2. Next (non-disable) line starts with `<` — a JSX element follows
    // If both hold, we are certainly in JSX child context.
    // If only #2 holds (e.g. arrow function `=> (\n  <Comp/>\n)`), we are NOT
    // in JSX child context — the `(` before us is a JS expression position.
    const prevEndsWithJsx = /[>}]\s*$/.test(prevLine)
    const nextStartsWithJsx = nextLine.startsWith('<') || nextLine.startsWith('{<')

    if (prevEndsWithJsx && nextStartsWithJsx) {
      const indent = m[1]
      const directive = m[2]
      lines[i] = `${indent}{/* ${directive} */}`
      conversions++
    }
  }

  if (conversions > 0) {
    // Preserve the original line ending
    const eol = useCRLF ? '\r\n' : '\n'
    fs.writeFileSync(filePath, lines.join(eol), 'utf-8')
    totalConverted += conversions
    filesChanged++
    console.log(`  ${path.basename(filePath)}: ${conversions} converted`)
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.jsx')) fixFile(full)
  }
}

walk(PAGES_DIR)
walk(LIB_DIR)
console.log(`\nTotal: ${totalConverted} conversions, ${filesChanged} files`)
