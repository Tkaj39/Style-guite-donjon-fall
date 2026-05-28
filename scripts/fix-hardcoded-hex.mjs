#!/usr/bin/env node
/**
 * Mass-fix hardcoded hex → tokens.
 *
 * 1. Spustí ESLint v JSON režimu
 * 2. Pro každý error s exact token suggestion:
 *    - Pokud token už importován → nahraď literal identifierem
 *    - Pokud token NENÍ importován → přidej do existujícího import statement
 *      (nebo vytvoř nový) + nahraď literal
 * 3. Pro alpha tail errory (`${token}AA`):
 *    - Pokud token importován → nahraď '#XXX...AA' za `${token}AA`
 * 4. Errory bez token suggestion (`neodpovídá žádnému tokenu`) přeskočí —
 *    musí se buď přidat token, nebo eslint-disable s důvodem.
 *
 * Použití: node scripts/fix-hardcoded-hex.mjs
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'

function getLintResults() {
  const tmpFile = './_lint-results.json'
  try {
    execSync(`npx eslint src/lib src/pages --format json -o ${tmpFile}`, { encoding: 'utf-8', stdio: 'pipe' })
  } catch {
    // ESLint exits 1 when there are errors — JSON file je stejně zapsán
  }
  const data = JSON.parse(fs.readFileSync(tmpFile, 'utf-8'))
  fs.unlinkSync(tmpFile)
  return data
}

/**
 * Extrahuje token name + alpha suffix z error message.
 * Vrací { token, alpha } nebo null.
 */
function parseMessage(msg) {
  // Base: "Hardcoded hex '#XXXXXX' — použij token 'NAME' z LIB/tokens"
  let m = msg.match(/Hardcoded hex '(#[0-9A-Fa-f]+)' — použij token '(\w+)' z (\w+)\/tokens/)
  if (m) return { hex: m[1], token: m[2], lib: m[3], alpha: '' }

  // Alpha: "Hardcoded hex '#XXX44' — použij `${ NAME }44`"
  m = msg.match(/Hardcoded hex '(#[0-9A-Fa-f]+)' — použij `\$\{ (\w+) \}([0-9A-Fa-f]+)` \(alpha tail nad tokenem '(\w+)' z (\w+)\/tokens\)/)
  if (m) return { hex: m[1], token: m[2], lib: m[5], alpha: m[3] }

  return null
}

/** Najdi existující import {…} from 'TOKENS_PATH' a přidej token, nebo vytvoř nový. */
function ensureImport(content, token, lib, filePath) {
  // Resolve relativní cestu z file → lib/tokens
  const tokenPath = lib === 'donjon'
    ? (filePath.includes('lib/donjon')
        ? './tokens'
        : filePath.includes('lib/tkajui') ? '../donjon/tokens' : '../lib/donjon/tokens')
    : (filePath.includes('lib/tkajui')
        ? './tokens'
        : filePath.includes('lib/donjon') ? '../tkajui/tokens' : '../lib/tkajui/tokens')

  // Existující import z tokens path?
  const importRe = new RegExp(
    `import\\s*\\{([^}]*)\\}\\s*from\\s*['"]` + tokenPath.replace(/\./g, '\\.').replace(/\//g, '\\/') + `['"]`
  )
  const match = content.match(importRe)

  if (match) {
    const names = match[1].split(',').map(s => s.trim()).filter(Boolean)
    if (names.includes(token)) return content   // už máme
    names.push(token)
    names.sort()
    const newImport = `import {\n  ${names.join(', ')},\n} from '${tokenPath}'`
    return content.replace(importRe, newImport)
  }

  // Žádný import — přidej nový po posledním import statementu
  const lastImportMatch = content.match(/^import .* from .*$/gm)
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1]
    const insertAfter = content.indexOf(lastImport) + lastImport.length
    return content.slice(0, insertAfter) + `\nimport { ${token} } from '${tokenPath}'` + content.slice(insertAfter)
  }

  // Žádné importy v souboru — přidej na začátek (asi nikdy nenastane)
  return `import { ${token} } from '${tokenPath}'\n` + content
}

/** Nahraď '#HEX' nebo '#HEXAA' v souboru za token nebo template literal. */
function replaceHex(content, hex, token, alpha) {
  // Případ 1: exact hex (bez alpha) — nahraď '#HEX' za token (string → identifier)
  if (!alpha) {
    const stringForms = [`'${hex}'`, `"${hex}"`, `\`${hex}\``]
    for (const form of stringForms) {
      if (content.includes(form)) {
        return content.split(form).join(token)
      }
    }
  } else {
    // Případ 2: alpha tail — nahraď '#HEXAA' nebo `#HEXAA` za `${token}AA`
    const fullHex = hex
    const stringForms = [`'${fullHex}'`, `"${fullHex}"`]
    for (const form of stringForms) {
      if (content.includes(form)) {
        return content.split(form).join('`${' + token + '}' + alpha + '`')
      }
    }
    // Uvnitř existujícího template literal: #HEXAA → ${token}AA
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

/** Hlavní procesor — pro jeden soubor sloučí všechny fixy a zapíše. */
function processFile(filePath, errors) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const original = content
  const stats = { fixed: 0, skipped: 0 }

  // Sloučit per token (může být víc instancí stejného hex)
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

  // 1. Přidat imports pro všechny potřebné tokeny
  for (const { token, lib } of fixesByToken.values()) {
    content = ensureImport(content, token, lib, filePath)
  }

  // 2. Nahradit všechny hex výskyty
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
