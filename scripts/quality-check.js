#!/usr/bin/env node
/**
 * quality-check.js — automatická kontrola kvality kódu
 *
 * Spouští se přes Claude Code PostToolUse hook po každém Edit/Write.
 * Argument: cesta k upraven souboru (předaná hookem jako $CLAUDE_TOOL_INPUT_FILE_PATH)
 *
 * Kontroly:
 *   1. Hardcoded hex barvy v src/lib/  → měly by být tokeny z tokens.js
 *   2. Komponenty definované uvnitř render funkcí (anti-pattern) v src/pages/
 *   3. Smoke-build check (volitelný, pomalejší — přes npm run build)
 */

import { readFileSync, existsSync } from 'fs'
import { resolve, relative } from 'path'

const ROOT   = resolve(import.meta.dirname, '..')
const file   = process.argv[2]

if (!file) process.exit(0)

const abs    = resolve(file)
const rel    = relative(ROOT, abs).replace(/\\/g, '/')  // Windows path normalization

if (!existsSync(abs)) process.exit(0)

const src    = readFileSync(abs, 'utf8')
const lines  = src.split('\n')

let errors   = []
let warnings = []

/* ── 1. Hardcoded hex barvy v lib/ komponentách ─────────────────────────── */
if (rel.startsWith('src/lib/') && rel.endsWith('.jsx') && !rel.includes('tokens')) {
  const HEX_RE = /#([0-9A-Fa-f]{3,8})\b/g
  // Povolené výjimky: alpha-only suffix (průhlednost) a barvy hráčů (dynamické)
  const ALLOWED_COMMENTS = ['hráčská barva', 'player color', 'dynamic', 'záměrně']

  lines.forEach((line, i) => {
    // Přeskočit komentáře a řádky s výjimkami
    const trimmed = line.trim()
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) return
    if (ALLOWED_COMMENTS.some(c => line.toLowerCase().includes(c))) return
    // Přeskočit tokeny.js a SVG path data
    if (line.includes('stroke=') || line.includes('fill=') && line.includes('<svg')) return

    let m
    while ((m = HEX_RE.exec(line)) !== null) {
      const hex = m[0]
      // Ignorovat průhlednost přidanou k tokenu (např. ${gold}66) — template literals
      const before = line.slice(0, m.index)
      if (before.includes('${') && !before.includes('}')) continue
      // Ignorovat hex v komentářích
      if (before.includes('//')) continue

      errors.push(`  [HEX]  ${rel}:${i + 1}  →  ${hex}  (použij token z tokens.js)`)
    }
  })
}

/* ── 2. Komponenty (useState) definované uvnitř jiné funkce v pages/ ─────── */
if (rel.startsWith('src/pages/') && rel.endsWith('.jsx')) {
  // Heuristika: řádek se ODSAZENÍM (mezera/tab) + "function " + VELKÉ písmeno
  // = funkční komponenta vnořená v jiné funkci (špatný pattern)
  const INNER_FN_RE = /^([ \t]+)function\s+([A-Z][A-Za-z0-9]*)\s*\(/

  lines.forEach((line, i) => {
    const m = INNER_FN_RE.exec(line)
    if (!m) return

    // Přeskočit komentáře
    const trimmed = line.trimStart()
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) return

    // Lookahead 30 řádků — má tato funkce hooks?
    const body = lines.slice(i, i + 30).join('\n')
    if (body.includes('useState') || body.includes('useEffect') || body.includes('useRef')) {
      warnings.push(
        `  [ANTI-PATTERN]  ${rel}:${i + 1}  →  "function ${m[2]}"` +
        `\n                  Komponenta s hooky je vnořená v jiné funkci → přesuň ji na úroveň modulu`
      )
    }
  })
}

/* ── Výstup ──────────────────────────────────────────────────────────────── */
const hasIssues = errors.length > 0 || warnings.length > 0

if (!hasIssues) {
  // Tichý úspěch — hook nepřeruší práci
  process.exit(0)
}

console.log('')
console.log('╔══════════════════════════════════════════════════════════════╗')
console.log('║  🔍  Quality check —', rel.padEnd(38), '║')
console.log('╚══════════════════════════════════════════════════════════════╝')

if (errors.length > 0) {
  console.log('\n🔴 CHYBY (oprav před commitem):')
  errors.forEach(e => console.log(e))
}

if (warnings.length > 0) {
  console.log('\n🟡 VAROVÁNÍ:')
  warnings.forEach(w => console.log(w))
}

console.log('')

// Chyby vrátí exit 1 → hook zobrazí výsledek jako varování v UI
// (neblokuje změnu, ale Claude vidí co opravit)
process.exit(errors.length > 0 ? 1 : 0)
