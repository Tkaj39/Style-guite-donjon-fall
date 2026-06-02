#!/usr/bin/env node
/**
 * audit-prop-enums.mjs — extract every enum-typed prop from componentMeta.js
 * and from component files, cross-reference them and print a single report.
 *
 * Produces three views:
 *   1) Per-component table of enum props found in `componentMeta.js`.
 *   2) Per-component table of local SIZES / VARIANTS objects (Object.keys).
 *   3) Diff: enums in meta that have no local map, and local maps that have
 *      no meta entry — drift candidates to fix during Fáze 3.
 *
 * Usage:
 *   node scripts/audit-prop-enums.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, basename } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\//, '')

// ── Helpers ───────────────────────────────────────────────────────────────

/** Match `'a'|'b'|'c'` (with arbitrary union arity, no whitespace inside quotes). */
function parseUnionType(str) {
  if (!str) return null
  // Must be entirely a union of single-quoted strings (allow whitespace + |)
  const tokens = str.split('|').map(s => s.trim())
  const values = []
  for (const t of tokens) {
    const m = t.match(/^'([^']+)'$/)
    if (!m) return null
    values.push(m[1])
  }
  return values
}

/** Slug ('donjon-button') → component identifier base ('DONJON_BUTTON'). */
function slugToConstBase(slug) {
  return slug.replace(/-/g, '_').toUpperCase()
}

// ── 1) Pull enum props from componentMeta.js ──────────────────────────────

function readMetaEnums() {
  const text = readFileSync(join(ROOT, 'src/data/componentMeta.js'), 'utf8')

  // Very small targeted parser: find each entry like
  //   'slug': { ... props: [ { name: '...', type: "'..'|'..'" }, ... ] ... }
  // Process props blocks one slug at a time.

  const out = {} // slug → [{ propName, values }]
  // Iterate over top-level keys `'name':` followed by `{` block.
  const slugRe = /'([a-z][a-z0-9-]*)'\s*:\s*\{/g
  let m
  while ((m = slugRe.exec(text)) !== null) {
    const slug = m[1]
    // Find matching closing brace for this slug entry
    const start = m.index + m[0].length // position right after `{`
    let depth = 1
    let i = start
    let inSingle = false
    let inDouble = false
    let inTemplate = false
    while (i < text.length && depth > 0) {
      const ch = text[i]
      const prev = text[i - 1]
      if (!inDouble && !inTemplate && ch === "'" && prev !== '\\') inSingle = !inSingle
      else if (!inSingle && !inTemplate && ch === '"' && prev !== '\\') inDouble = !inDouble
      else if (!inSingle && !inDouble && ch === '`' && prev !== '\\') inTemplate = !inTemplate
      else if (!inSingle && !inDouble && !inTemplate) {
        if (ch === '{') depth++
        else if (ch === '}') depth--
      }
      i++
    }
    const body = text.slice(start, i - 1)
    out[slug] = extractPropsFromBody(body)
  }
  return out
}

function extractPropsFromBody(body) {
  // Find `props: [...]` array
  const propsIdx = body.search(/\bprops\s*:\s*\[/)
  if (propsIdx === -1) return []
  // Walk until matching `]`
  const startBracket = body.indexOf('[', propsIdx)
  let depth = 1
  let i = startBracket + 1
  let inSingle = false
  let inDouble = false
  while (i < body.length && depth > 0) {
    const ch = body[i]
    const prev = body[i - 1]
    if (!inDouble && ch === "'" && prev !== '\\') inSingle = !inSingle
    else if (!inSingle && ch === '"' && prev !== '\\') inDouble = !inDouble
    else if (!inSingle && !inDouble) {
      if (ch === '[') depth++
      else if (ch === ']') depth--
    }
    i++
  }
  const propsStr = body.slice(startBracket + 1, i - 1)

  // Now extract each prop object — name + type
  const out = []
  const propObjRe = /\{\s*name\s*:\s*'([^']+)'\s*,\s*type\s*:\s*("[^"]*"|'[^']*')/g
  let m
  while ((m = propObjRe.exec(propsStr)) !== null) {
    const propName = m[1]
    const typeStr = m[2].slice(1, -1) // strip quotes
    const values = parseUnionType(typeStr)
    if (values) out.push({ propName, values })
  }
  return out
}

// ── 2) Pull keys from local SIZES / VARIANTS objects in component files ──

function scanLibFile(filePath) {
  const text = readFileSync(filePath, 'utf8')
  const out = {} // mapName → [keys]
  // Find every `const SIZES = {`, `const sizeMap = {`, `const VARIANTS = {`, etc.
  const re = /\bconst\s+([A-Z_a-z][A-Z_a-z0-9]*)\s*=\s*\{/g
  let m
  while ((m = re.exec(text)) !== null) {
    const name = m[1]
    if (!/SIZE|VARIANT/i.test(name)) continue
    // Walk to matching `}`
    const start = m.index + m[0].length
    let depth = 1
    let i = start
    let inSingle = false
    let inDouble = false
    let inBacktick = false
    while (i < text.length && depth > 0) {
      const ch = text[i]
      const prev = text[i - 1]
      if (!inDouble && !inBacktick && ch === "'" && prev !== '\\') inSingle = !inSingle
      else if (!inSingle && !inBacktick && ch === '"' && prev !== '\\') inDouble = !inDouble
      else if (!inSingle && !inDouble && ch === '`' && prev !== '\\') inBacktick = !inBacktick
      else if (!inSingle && !inDouble && !inBacktick) {
        if (ch === '{') depth++
        else if (ch === '}') depth--
      }
      i++
    }
    const body = text.slice(start, i - 1)
    // Extract top-level keys: identifier or 'string' followed by `:`
    const keys = []
    const keyRe = /(?:^|,|\{)\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_][A-Za-z0-9_]*))\s*:/g
    let km
    while ((km = keyRe.exec(body)) !== null) {
      keys.push(km[1] ?? km[2] ?? km[3])
    }
    // De-dup while preserving order
    out[name] = [...new Set(keys)]
  }
  return out
}

function readLibFiles(libDir) {
  const out = {} // ComponentName → { mapName: [keys], ... }
  const files = readdirSync(join(ROOT, libDir))
    .filter(f => f.endsWith('.jsx'))
  for (const file of files) {
    const componentName = basename(file, '.jsx')
    const maps = scanLibFile(join(ROOT, libDir, file))
    if (Object.keys(maps).length) out[componentName] = maps
  }
  return out
}

// ── Report ────────────────────────────────────────────────────────────────

function pad(s, n) { return (s + ' '.repeat(n)).slice(0, n) }

function printSection(title) {
  console.log('\n' + '─'.repeat(72))
  console.log(`  ${title}`)
  console.log('─'.repeat(72))
}

const meta = readMetaEnums()
const donjonMaps = readLibFiles('src/lib/donjon')
const tkajuiMaps = readLibFiles('src/lib/tkajui')

printSection('Enum props in componentMeta.js')
let totalMetaEnums = 0
for (const [slug, props] of Object.entries(meta)) {
  if (!props.length) continue
  console.log(`\n  ${slug}`)
  for (const { propName, values } of props) {
    totalMetaEnums++
    console.log(`    ${pad(propName, 16)}  [ ${values.join(' | ')} ]`)
  }
}
console.log(`\n  TOTAL: ${totalMetaEnums} enum-typed props across ${Object.keys(meta).filter(s => meta[s].length).length} components`)

printSection('Local SIZES / VARIANTS in donjon')
for (const [comp, maps] of Object.entries(donjonMaps)) {
  console.log(`\n  ${comp}.jsx`)
  for (const [mapName, keys] of Object.entries(maps)) {
    console.log(`    ${pad(mapName, 22)}  keys: [ ${keys.join(', ')} ]`)
  }
}

printSection('Local SIZES / VARIANTS in tkajui')
for (const [comp, maps] of Object.entries(tkajuiMaps)) {
  console.log(`\n  ${comp}.jsx`)
  for (const [mapName, keys] of Object.entries(maps)) {
    console.log(`    ${pad(mapName, 22)}  keys: [ ${keys.join(', ')} ]`)
  }
}

printSection('Proposed exports (naming: <COMP>_<PROP>_VALUES)')
for (const [slug, props] of Object.entries(meta)) {
  if (!props.length) continue
  const base = slugToConstBase(slug)
  for (const { propName, values } of props) {
    const exportName = `${base}_${propName.toUpperCase()}_VALUES`
    console.log(`  ${pad(exportName, 50)} = [ ${values.map(v => `'${v}'`).join(', ')} ]`)
  }
}
