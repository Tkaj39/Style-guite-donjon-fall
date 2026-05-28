#!/usr/bin/env node
// Konvertuje `// eslint-disable-next-line donjon/no-hardcoded-hex` v JSX
// child contextu na JSX expression comment formu — jediná forma kterou
// ESLint v JSX child contextu pozná.
//
// Heuristika: pokud následující řádek začíná `<` (JSX element), je to
// JSX child context. Jinak ponecháme `//` (funguje v JS expression contextu).
import fs from 'node:fs'
import path from 'node:path'

const PAGES_DIR = './src/pages'
const LIB_DIR = './src/lib'

let totalConverted = 0
let filesChanged = 0

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  // Detekuj line ending (CRLF na Windows, LF na Unix) a normalizuj na LF
  const useCRLF = content.includes('\r\n')
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  let conversions = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Match: optional whitespace + `// eslint-disable-next-line donjon/no-hardcoded-hex -- reason`
    const m = line.match(/^(\s*)\/\/ (eslint-disable-next-line donjon\/no-hardcoded-hex -- .+)$/)
    if (!m) continue

    // Look at next non-empty AND non-disable line — preskoč chained disables
    let nextIdx = i + 1
    while (nextIdx < lines.length) {
      const t = lines[nextIdx].trim()
      if (t === '') { nextIdx++; continue }
      // Skip jiný disable comment (chained disables ze stejné dávky)
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

    // JSX child context podle DVOU heuristik:
    //   1. Previous (non-disable) line ENDS s `>` nebo `}` — jsme mezi JSX sourozenci
    //   2. Next (non-disable) line starts s `<` — následuje JSX element
    // Pokud platí obě, jsme určitě v JSX child contextu.
    // Pokud platí jen #2 (např. arrow function `=> (\n  <Comp/>\n)`), nejsme
    // v JSX child contextu — `(` před nás je JS expression position.
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
    // Zachovej původní line ending
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
