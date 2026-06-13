#!/usr/bin/env node
/**
 * Mass-fix unused named imports.
 *
 * 1. Runs ESLint in JSON mode
 * 2. Collects no-unused-vars warnings whose identifier lies inside an
 *    `import { … } from '…'` block (possibly multi-line)
 * 3. Removes just that specifier from the block, handling:
 *    - leading/trailing commas
 *    - the last remaining specifier (drops the whole import line)
 *    - aliased imports (`X as Y` — match on the local name Y)
 *
 * Skips non-import unused vars (local consts, useState setters, function args)
 * — those need human judgement.
 *
 * Usage: node scripts/fix-unused-imports.mjs [--dry]
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'

const DRY = process.argv.includes('--dry')

function getLintResults() {
  const tmpFile = './_lint-unused.json'
  try {
    execSync(`npx eslint src --format json -o ${tmpFile}`, { encoding: 'utf-8', stdio: 'pipe' })
  } catch {
    // ESLint exits 1 when warnings exist — the JSON file is still written
  }
  const data = JSON.parse(fs.readFileSync(tmpFile, 'utf-8'))
  fs.unlinkSync(tmpFile)
  return data
}

/**
 * Returns true if the (line,col) position is inside an `import { … }` block.
 * We scan the file content for all import blocks and check overlap.
 */
function findImportBlocks(content) {
  // Match `import [Default,] { … } from '…'` (greedy across newlines)
  const re = /import\s+(?:[\w$]+\s*,\s*)?\{([^}]*)\}\s*from\s*['"][^'"]+['"]/g
  const blocks = []
  let m
  while ((m = re.exec(content)) !== null) {
    blocks.push({
      start: m.index,
      end: m.index + m[0].length,
      bracesStart: m.index + m[0].indexOf('{'),
      bracesEnd: m.index + m[0].lastIndexOf('}') + 1,
      full: m[0],
    })
  }
  return blocks
}

function offsetForLineCol(content, line, col) {
  // ESLint reports 1-based line and column
  const lines = content.split('\n')
  let off = 0
  for (let i = 0; i < line - 1; i++) off += lines[i].length + 1
  return off + (col - 1)
}

/**
 * Remove `name` from the specifier list of the given import block.
 * Returns the new content (whole file) or null if name wasn't found/removable.
 */
function removeSpecifier(content, block, name) {
  const inner = content.slice(block.bracesStart + 1, block.bracesEnd - 1)
  // Split on commas while preserving positions
  // A specifier is `X` or `X as Y` — match the local name (Y if aliased, else X)
  const specifiers = inner.split(',').map(s => s.trim()).filter(Boolean)
  const localName = (s) => {
    const m = s.match(/(?:[\w$]+)\s+as\s+([\w$]+)/)
    return m ? m[1] : s
  }
  const idx = specifiers.findIndex(s => localName(s) === name)
  if (idx === -1) return null

  specifiers.splice(idx, 1)

  if (specifiers.length === 0) {
    // Empty `import { } from '…'` — drop the entire statement and its newline
    let dropStart = block.start
    let dropEnd = block.end
    while (content[dropEnd] === '\n' || content[dropEnd] === '\r') dropEnd++
    return content.slice(0, dropStart) + content.slice(dropEnd)
  }

  // Preserve the original multi-line / single-line shape: rebuild inner with
  // commas. If the original spanned multiple lines, keep it tidy on one line —
  // the user can re-wrap with prettier if they care.
  const newInner = ' ' + specifiers.join(', ') + ' '
  return content.slice(0, block.bracesStart + 1) + newInner + content.slice(block.bracesEnd - 1)
}

function processFile(filePath, names) {
  let content = fs.readFileSync(filePath, 'utf-8')
  let touched = 0
  // Re-find blocks after each edit since offsets shift
  for (const name of names) {
    const blocks = findImportBlocks(content)
    for (const block of blocks) {
      const newContent = removeSpecifier(content, block, name)
      if (newContent !== null) {
        content = newContent
        touched++
        break
      }
    }
  }
  if (touched > 0 && !DRY) {
    fs.writeFileSync(filePath, content, 'utf-8')
  }
  return touched
}

function main() {
  const results = getLintResults()
  let totalRemoved = 0
  let filesTouched = 0

  for (const fileResult of results) {
    const unusedNames = fileResult.messages
      .filter(m => m.ruleId === 'no-unused-vars' && /defined but never used/.test(m.message))
      .map(m => {
        const match = m.message.match(/'([\w$]+)'/)
        return match ? { name: match[1], line: m.line, column: m.column } : null
      })
      .filter(Boolean)

    if (unusedNames.length === 0) continue

    // Read the file once to filter: only keep names whose reported position
    // sits inside an import block.
    const content = fs.readFileSync(fileResult.filePath, 'utf-8')
    const blocks = findImportBlocks(content)
    const importNames = unusedNames.filter(u => {
      const off = offsetForLineCol(content, u.line, u.column)
      return blocks.some(b => off >= b.bracesStart && off <= b.bracesEnd)
    }).map(u => u.name)

    if (importNames.length === 0) continue

    const removed = processFile(fileResult.filePath, importNames)
    if (removed > 0) {
      filesTouched++
      totalRemoved += removed
      const rel = fileResult.filePath.replace(process.cwd() + '\\', '').replace(/\\/g, '/')
      console.log(`  ${rel}: removed ${removed} unused import${removed === 1 ? '' : 's'}`)
    }
  }

  console.log(`\n${DRY ? '[DRY] Would remove' : 'Removed'} ${totalRemoved} unused imports across ${filesTouched} files.`)
}

main()
