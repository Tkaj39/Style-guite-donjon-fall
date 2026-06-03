#!/usr/bin/env node
/* One-shot import rewriter for the utils/ + hooks/ → lib/shared/ move.
   Run after `git mv` of the 8 source files. Safe to run multiple times. */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const SHARED_DIR = resolve(ROOT, 'src/lib/shared')

const MODULES = ['octagon', 'polygon', 'sizes', 'toastContext', 'tooltipUtils', 'useModalPageInert', 'useBreakpoint']

const FILE_EXTS = new Set(['.js', '.jsx', '.mjs'])
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build'])

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) walk(full, out)
    } else {
      const dot = entry.lastIndexOf('.')
      if (dot >= 0 && FILE_EXTS.has(entry.slice(dot))) out.push(full)
    }
  }
  return out
}

const files = walk(resolve(ROOT, 'src'))
let changed = 0
const modAlt = MODULES.join('|')
const re = new RegExp(`from\\s+(['"])((?:\\.\\.\\/)+)(?:utils|hooks)\\/(${modAlt})(\\1)`, 'g')

for (const file of files) {
  const src = readFileSync(file, 'utf8')
  if (!re.test(src)) continue
  re.lastIndex = 0
  const fileDir = dirname(file)
  const next = src.replace(re, (_match, q, _ups, mod) => {
    // Build the new relative path from this file to SHARED_DIR/mod
    let rel = relative(fileDir, join(SHARED_DIR, mod)).replace(/\\/g, '/')
    if (!rel.startsWith('.')) rel = './' + rel
    return `from ${q}${rel}${q}`
  })
  if (next !== src) {
    writeFileSync(file, next)
    changed++
    console.log(`  ✓ ${relative(ROOT, file)}`)
  }
}

console.log(`\nRewrote ${changed} files.`)
