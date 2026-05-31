#!/usr/bin/env node
/**
 * quality-check.js — quick pre-lint check invoked by the Claude Code PostToolUse hook.
 *
 * Deliberately SIMPLE — full syntactic analysis is ESLint's job (see eslint.config.js).
 * This script only does checks ESLint can't do (or that are too slow to run per save):
 *
 *   1. Warning when a file in src/lib/ does not import from './tokens'
 *      but contains styles (a quick reminder, not a blocker)
 *
 * Everything else (hex colors, anti-pattern components) → ESLint:
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

// Only .jsx and .js files
if (!rel.endsWith('.jsx') && !rel.endsWith('.js')) process.exit(0)

// Ignore dist/, node_modules/, tests
if (rel.startsWith('dist/') || rel.startsWith('node_modules/') || rel.includes('__tests__')) {
  process.exit(0)
}

/* ── ESLint — runs only on files covered by the config ──────────────────── */
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

// ESLint returns output only when there are issues
if (eslintOutput.trim()) {
  // Shorten absolute paths to relative for more readable output
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
