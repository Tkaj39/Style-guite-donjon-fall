#!/usr/bin/env node
/**
 * quality-check.js — rychlý pre-lint check spouštěný Claude Code PostToolUse hookem.
 *
 * Záměrně JEDNODUCHÝ — plná syntaktická analýza je úloha ESLintu (viz eslint.config.js).
 * Tento skript dělá jen kontroly které ESLint neumí (nebo jsou příliš pomalé pro každý save):
 *
 *   1. Varování pokud soubor v src/lib/ neimportuje z './tokens'
 *      ale obsahuje styly (rychlý reminder, ne blocker)
 *
 * Vše ostatní (hex barvy, anti-pattern komponenty) → ESLint:
 *   npx eslint src/lib/donjon/SomeFile.jsx
 *   npx eslint src/pages/SomePage.jsx
 */

import { readFileSync, existsSync } from 'fs'
import { resolve, relative } from 'path'
import { execSync } from 'child_process'

const ROOT = resolve(import.meta.dirname, '..')
const file = process.argv[2]

if (!file) process.exit(0)

const abs = resolve(file)
const rel = relative(ROOT, abs).replace(/\\/g, '/')

if (!existsSync(abs)) process.exit(0)

// Pouze .jsx a .js soubory
if (!rel.endsWith('.jsx') && !rel.endsWith('.js')) process.exit(0)

// Ignorovat dist/, node_modules/, testy
if (rel.startsWith('dist/') || rel.startsWith('node_modules/') || rel.includes('__tests__')) {
  process.exit(0)
}

/* ── ESLint — spustí se jen na soubory pokryté configem ──────────────────── */
let eslintOutput = ''
let eslintExit   = 0

try {
  eslintOutput = execSync(
    `npx eslint "${abs}" --format compact`,
    { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  )
} catch (err) {
  eslintOutput = (err.stdout ?? '') + (err.stderr ?? '')
  eslintExit   = err.status ?? 1
}

// ESLint vrátí výstup jen pokud jsou problémy
if (eslintOutput.trim()) {
  // Zkrátit absolutní cesty na relativní pro čitelnější výstup
  const cleaned = eslintOutput
    .split('\n')
    .map(l => l.replace(abs, rel))
    .join('\n')
    .trim()

  if (cleaned) {
    console.log('\n🔍 ESLint — ' + rel)
    console.log(cleaned)
    console.log('')
  }
}

process.exit(eslintExit)
