#!/usr/bin/env node
/**
 * Mass-fix hardcoded hex → tokens.
 *
 * 1. Runs ESLint in JSON mode
 * 2. For each error with an exact token suggestion:
 *    - If the token is already imported → replace the literal with the identifier
 *    - If the token is NOT imported → add it to the existing import statement
 *      (or create a new one) + replace the literal
 * 3. For alpha-tail errors (`${token}AA`):
 *    - If the token is imported → replace '#XXX...AA' with `${token}AA`
 * 4. Errors without a token suggestion (`does not match any token`) are
 *    skipped — either add a token to tokens.js, or eslint-disable with a reason.
 *
 * Usage: node scripts/fix-hardcoded-hex.mjs
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'

function getLintResults() {
  const tmpFile = './_lint-results.json'
  try {
    execSync(`npx eslint src/lib src/pages --format json -o ${tmpFile}`, { encoding: 'utf-8', stdio: 'pipe' })
  } catch {
    // ESLint exits 1 when there are errors — the JSON file is still written
  }
  const data = JSON.parse(fs.readFileSync(tmpFile, 'utf-8'))
  fs.unlinkSync(tmpFile)
  return data
}

/**
 * Extracts token name + alpha suffix from an error message.
 * Returns { token, alpha } or null.
 */
function parseMessage(msg) {
  // Base: "Hardcoded hex '#XXXXXX' — use the token 'NAME' from LIB/tokens."
  let m = msg.match(/Hardcoded hex '(#[0-9A-Fa-f]+)' — use the token '(\w+)' from (\w+)\/tokens/)
  if (m) return { hex: m[1], token: m[2], lib: m[3], alpha: '' }

  // Alpha: "Hardcoded hex '#XXX44' — use `${ NAME }44` (alpha tail on top of token 'NAME' from LIB/tokens)."
  m = msg.match(/Hardcoded hex '(#[0-9A-Fa-f]+)' — use `\$\{ (\w+) \}([0-9A-Fa-f]+)` \(alpha tail on top of token '(\w+)' from (\w+)\/tokens\)/)
  if (m) return { hex: m[1], token: m[2], lib: m[5], alpha: m[3] }

  return null
}

/** Find an existing `import {…} from 'TOKENS_PATH'` and add the token, or create one. */
function ensureImport(content, token, lib, filePath) {
  // Resolve the relative path from file → lib/tokens
  const tokenPath = lib === 'donjon'
    ? (filePath.includes('lib/donjon')
        ? './tokens'
        : filePath.includes('lib/tkajui') ? '../donjon/tokens' : '../lib/donjon/tokens')
    : (filePath.includes('lib/tkajui')
        ? './tokens'
        : filePath.includes('lib/donjon') ? '../tkajui/tokens' : '../lib/tkajui/tokens')

  // Existing import from the tokens path?
  const importRe = new RegExp(
    `import\\s*\\{([^}]*)\\}\\s*from\\s*['"]` + tokenPath.replace(/\./g, '\\.').replace(/\//g, '\\/') + `['"]`
  )
  const match = content.match(importRe)

  if (match) {
    const names = match[1].split(',').map(s => s.trim()).filter(Boolean)
    if (names.includes(token)) return content   // already present
    names.push(token)
    names.sort()
    const newImport = `import {\n  ${names.join(', ')},\n} from '${tokenPath}'`
    return content.replace(importRe, newImport)
  }

  // No import — add a new one after the last import statement
  const lastImportMatch = content.match(/^import .* from .*$/gm)
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1]
    const insertAfter = content.indexOf(lastImport) + lastImport.length
    return content.slice(0, insertAfter) + `\nimport { ${token} } from '${tokenPath}'` + content.slice(insertAfter)
  }

  // No imports in the file — prepend (rarely happens)
  return `import { ${token} } from '${tokenPath}'\n` + content
}

/** Replace '#HEX' or '#HEXAA' in the file with a token or template literal. */
function replaceHex(content, hex, token, alpha) {
  // Case 1: exact hex (no alpha) — replace '#HEX' with the token (string → identifier)
  if (!alpha) {
    const stringForms = [`'${hex}'`, `"${hex}"`, `\`${hex}\``]
    for (const form of stringForms) {
      if (content.includes(form)) {
        return content.split(form).join(token)
      }
    }
  } else {
    // Case 2: alpha tail — replace '#HEXAA' or `#HEXAA` with `${token}AA`
    const fullHex = hex
    const stringForms = [`'${fullHex}'`, `"${fullHex}"`]
    for (const form of stringForms) {
      if (content.includes(form)) {
        return content.split(form).join('`${' + token + '}' + alpha + '`')
      }
    }
    // Inside an existing template literal: #HEXAA → ${token}AA
    const inTemplateRe = new RegExp('(\\`[^\\`]*?)' + hex + '([^\\`]*?\\`)', 'g')
    if (inTemplateRe.test(content)) {
      return content.replace(
        new RegExp('(\\`[^\\`]*?)' + hex.replace(/\$/g, '\\$') + '([^\\`]*?\\`)', 'g'),
        (_, before, after) => before + '${' + token + '}' + alpha + after
      )
    }
  }
  return content
}

/** Main processor — merges all fixes for one file and writes it back. */
function processFile(filePath, errors) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const original = content
  const stats = { fixed: 0, skipped: 0 }

  // Merge per token (a single hex may appear multiple times)
  const fixesByToken = new Map()
  for (const err of errors) {
    const parsed = parseMessage(err.message)
    if (!parsed) { stats.skipped++; continue }
    if (!fixesByToken.has(parsed.token)) {
      fixesByToken.set(parsed.token, { ...parsed, count: 0 })
    }
    fixesByToken.get(parsed.token).count++
  }

  if (fixesByToken.size === 0) return { ...stats, changed: false }

  // 1. Add imports for all required tokens
  for (const { token, lib } of fixesByToken.values()) {
    content = ensureImport(content, token, lib, filePath)
  }

  // 2. Replace all hex occurrences
  for (const { hex, token, alpha, count } of fixesByToken.values()) {
    const newContent = replaceHex(content, hex, token, alpha)
    if (newContent !== content) {
      stats.fixed += count
      content = newContent
    } else {
      stats.skipped += count
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8')
    return { ...stats, changed: true }
  }
  return { ...stats, changed: false }
}

/* ── Main ── */
console.log('Running ESLint...')
const results = getLintResults()

let totalFixed = 0
let totalSkipped = 0
let filesChanged = 0

for (const result of results) {
  const hexErrors = result.messages.filter(m => m.ruleId === 'donjon/no-hardcoded-hex')
  if (hexErrors.length === 0) continue

  const { fixed, skipped, changed } = processFile(result.filePath, hexErrors)
  totalFixed += fixed
  totalSkipped += skipped
  if (changed) {
    filesChanged++
    console.log(`  ${result.filePath.split(/[/\\]/).slice(-2).join('/')}: ${fixed} fixed, ${skipped} unknown`)
  }
}

console.log(`\nTotal: ${totalFixed} fixed, ${totalSkipped} skipped (unknown hex). Files changed: ${filesChanged}`)
