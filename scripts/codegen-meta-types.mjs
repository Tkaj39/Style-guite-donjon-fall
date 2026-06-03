#!/usr/bin/env node
/**
 * codegen-meta-types.mjs — rewrite componentMeta.js so enum-typed `type`
 * strings reference the *_VALUES exports from src/lib/{donjon,tkajui}/enums
 * instead of being inline string unions. Adds an `enumType()` helper and
 * the necessary imports.
 *
 * Run after editing enums.js. Idempotent.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\//, '')
const META_PATH = join(ROOT, 'src/data/componentMeta.js')

// ── Slug → library map. Donjon-prefixed + game-exclusive slugs go to donjon;
// everything else is tkajui. Source-of-truth: componentMeta.subcategory, but
// hard-coded here to avoid evaluating the meta file.
const DONJON_SLUGS = new Set([
  // extends-tkajui (Donjon* components)
  'donjon-badge', 'donjon-button', 'donjon-button-group', 'donjon-card',
  'donjon-input', 'donjon-modal', 'donjon-notch-menu', 'donjon-pictogram',
  'donjon-progress-bar', 'donjon-select', 'donjon-slider', 'donjon-tabs',
  'donjon-toast', 'donjon-toggle', 'donjon-tooltip',
  // exclusive game primitives
  'action-tile', 'die-face', 'donjon-notification-center', 'erb', 'event-log',
  'float-feedback', 'game-transition', 'hex-tile', 'numeric-display',
  'phase-indicator', 'player-panel', 'resource-bar',
])

// Some prop names contain camelCase / kebab boundaries that we want to map
// to SNAKE_CASE in the export name. Build a lookup of overrides.
const PROP_NAME_SNAKE_OVERRIDES = {
  labelPosition: 'LABEL_POSITION',
  cornerType:    'CORNER_TYPE',
  thumbShape:    'THUMB_SHAPE',
  ornamentColor: 'ORNAMENT_COLOR',
}

function slugToConstBase(slug) {
  return slug.replace(/-/g, '_').toUpperCase()
}

function propToSnake(name) {
  if (PROP_NAME_SNAKE_OVERRIDES[name]) return PROP_NAME_SNAKE_OVERRIDES[name]
  // Convert camelCase to SNAKE_CASE
  return name.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
}

function enumExportName(slug, propName) {
  return `${slugToConstBase(slug)}_${propToSnake(propName)}_VALUES`
}

function libOfSlug(slug) {
  return DONJON_SLUGS.has(slug) ? 'donjon' : 'tkajui'
}

function parseUnionType(str) {
  const tokens = str.split('|').map(s => s.trim())
  const values = []
  for (const t of tokens) {
    const m = t.match(/^'([^']+)'$/)
    if (!m) return null
    values.push(m[1])
  }
  return values
}

// ── Rewrite ───────────────────────────────────────────────────────────────

let text = readFileSync(META_PATH, 'utf8')

const usedDonjonImports = new Set()
const usedTkajuiImports = new Set()

// Find each top-level slug block — same parser as audit script.
const slugRe = /^( {2})'([a-z][a-z0-9-]*)'\s*:\s*\{/gm
let lastMatchEnd = 0
const replacements = []
let m
while ((m = slugRe.exec(text)) !== null) {
  const slug = m[2]
  const start = m.index + m[0].length
  // Walk to matching closing brace
  let depth = 1
  let i = start
  let inSingle = false, inDouble = false, inTemplate = false
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
  const bodyStart = start
  const bodyEnd = i - 1
  const body = text.slice(bodyStart, bodyEnd)

  // For each prop in this slug's props array, find { name: '...', type: "..." }
  // and rewrite type if it's an enum union.
  const propRe = /(\{\s*name\s*:\s*'([^']+)'\s*,\s*type\s*:\s*)("[^"]*"|'[^']*')/g
  let pm
  let newBody = ''
  let lastIdx = 0
  while ((pm = propRe.exec(body)) !== null) {
    const prefix = pm[1]
    const propName = pm[2]
    const typeQuoted = pm[3]
    const typeInner = typeQuoted.slice(1, -1)
    const values = parseUnionType(typeInner)
    if (!values) continue // not an enum
    const exportName = enumExportName(slug, propName)
    const lib = libOfSlug(slug)
    if (lib === 'donjon') usedDonjonImports.add(exportName)
    else usedTkajuiImports.add(exportName)

    // Build replacement: type: enumType(EXPORT_NAME)
    const replacement = `${prefix}enumType(${exportName})`
    newBody += body.slice(lastIdx, pm.index) + replacement
    lastIdx = pm.index + pm[0].length
  }
  newBody += body.slice(lastIdx)

  replacements.push({ start: bodyStart, end: bodyEnd, newBody })
  lastMatchEnd = bodyEnd
}

// Apply replacements right-to-left so offsets stay valid
for (const r of replacements.sort((a, b) => b.start - a.start)) {
  text = text.slice(0, r.start) + r.newBody + text.slice(r.end)
}

// ── Add imports + enumType helper at top of file ─────────────────────────

// Strip any pre-existing auto-generated import block(s) — gm flag handles
// duplicates from broken earlier runs. Match is lazy so we stop at the
// nearest "END auto-generated" line. Optional trailing whitespace handles
// LF/CRLF differences.
text = text.replace(
  /\/\/ ── AUTO-GENERATED imports[\s\S]*?\/\/ ── END auto-generated\r?\n(\r?\n)*/g,
  ''
)

// Re-scan the (already-rewritten) text for usedImports — when there are no
// string-typed enums left to rewrite, we still need to know which *_VALUES
// the file imports so the new block lists them all.
for (const match of text.matchAll(/\benumType\(([A-Z_][A-Z_0-9]*)\)/g)) {
  const name = match[1]
  // Heuristic: enum names containing DONJON_ or matching donjon-exclusive
  // components belong to donjon; the rest to tkajui. Match the original
  // `usedDonjonImports` heuristic by prefix-checking against the same slug list.
  const isDonjonExclusive = /^(ACHIEVEMENT_TOAST|ACTION_TILE|CHOICE_PANEL|COOLDOWN|DIALOGUE|DIE_FACE|DONJON_NOTIFICATION_CENTER|ERB|EVENT_LOG|FLOAT_FEEDBACK|FRAMED_IMAGE|GAME_TRANSITION|HEX_TILE|NUMERIC_DISPLAY|PHASE_INDICATOR|PLAYER_PANEL|RESOURCE_BAR|SCOREBOARD)_/.test(name)
  if (name.startsWith('DONJON_') || isDonjonExclusive) usedDonjonImports.add(name)
  else usedTkajuiImports.add(name)
}

const donjonImports = [...usedDonjonImports].sort()
const tkajuiImports = [...usedTkajuiImports].sort()

const importBlock = [
  '// ── AUTO-GENERATED imports (codegen-meta-types.mjs) ──────────────────────',
  '// `type` strings for enum-typed props are generated from these *_VALUES',
  '// arrays. Single source of truth — edit src/lib/{donjon,tkajui}/enums.js.',
  '',
  ...(donjonImports.length ? [
    `import {`,
    ...donjonImports.map(name => `  ${name},`),
    `} from '../lib/donjon/enums'`,
    '',
  ] : []),
  ...(tkajuiImports.length ? [
    `import {`,
    ...tkajuiImports.map(name => `  ${name},`),
    `} from '../lib/tkajui/enums'`,
    '',
  ] : []),
  '/** Build a TypeScript-style union type string from an array of literals. */',
  "const enumType = (values) => values.map((v) => `'${v}'`).join('|')",
  '// ── END auto-generated',
  '',
  '',
].join('\n')

// Insert right after the existing top-of-file JSDoc comment block.
const jsdocCloseIdx = text.indexOf('   ─────────────────────────────────────────────────────────────────────── */')
const insertIdx = jsdocCloseIdx === -1
  ? 0
  : text.indexOf('\n', jsdocCloseIdx) + 1
text = text.slice(0, insertIdx) + '\n' + importBlock + text.slice(insertIdx)

writeFileSync(META_PATH, text)

console.log(`✓ Rewrote ${META_PATH}`)
console.log(`  donjon imports: ${donjonImports.length}`)
console.log(`  tkajui imports: ${tkajuiImports.length}`)
console.log(`  total enum replacements: ${donjonImports.size + tkajuiImports.size}`)
