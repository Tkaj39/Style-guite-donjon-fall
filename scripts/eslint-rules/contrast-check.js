/**
 * donjon/contrast-check
 *
 * Warns when a JSX inline style { color, background[Color] } pair has
 * a WCAG contrast ratio below the threshold (default AA-large = 3.0).
 *
 * Recognises:
 *   1. Literal hex pairs       — style={{ color: '#abc', background: '#012' }}
 *   2. Token identifier pairs  — style={{ color: textHigh, background: surface2 }}
 *      The rule resolves identifiers by scanning the file's imports
 *      against the same tokens.js cache used by no-hardcoded-hex.
 *   3. Template strings with alpha tail are stripped — `${gold}33` → gold
 *
 * Skipped (warning silenced):
 *   - One side is a variable the rule can't resolve (computed value,
 *     destructured from a map, prop reference). The rule errs on the
 *     side of fewer false positives.
 *   - The color uses an alpha that drops contrast below threshold — alpha
 *     compositing is not modeled. Trust the dev on that.
 *   - The element is decorative / aria-hidden — pragmatically we don't
 *     know that statically, so contrast still gets checked. Disable
 *     line-by-line if needed.
 *
 * Threshold can be tightened via the `level` option:
 *   { level: 'AA' } → 4.5    (body text)
 *   { level: 'AA-large' } → 3.0  (≥18pt or ≥14pt bold) — default
 *   { level: 'AAA' } → 7.0  (high-importance text)
 */
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..', '..')

const LEVELS = { 'AA-large': 3.0, AA: 4.5, AAA: 7.0 }

// ── Token cache (name → hex) ──────────────────────────────────────────────
function loadTokens(filePath) {
  const out = new Map()
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const RE = /export\s+const\s+(\w+)\s*=\s*['"](#[0-9A-Fa-f]{3,8})['"]/g
    let m
    while ((m = RE.exec(content)) !== null) {
      out.set(m[1], m[2].toUpperCase())
    }
  } catch { /* file missing — ignore */ }
  return out
}

const DONJON = loadTokens(path.join(PROJECT_ROOT, 'src/lib/donjon/tokens.js'))
const TKAJUI = loadTokens(path.join(PROJECT_ROOT, 'src/lib/tkajui/tokens.js'))

// ── Contrast math (mirrors src/lib/shared/contrast.js, kept inline for
// rule self-containment — ESLint plugin code shouldn't depend on app src) ──
function parseHex(h) {
  if (typeof h !== 'string') return null
  let s = h.trim().replace(/^#/, '')
  if (s.length === 3 || s.length === 4) s = s.slice(0, 3).split('').map(c => c + c).join('')
  else if (s.length === 8)               s = s.slice(0, 6)
  if (s.length !== 6 || !/^[0-9a-f]{6}$/i.test(s)) return null
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]
}
function relLum(hex) {
  const rgb = parseHex(hex); if (!rgb) return null
  const [r, g, b] = rgb.map(c => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrastRatio(a, b) {
  const la = relLum(a), lb = relLum(b); if (la == null || lb == null) return null
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

// ── Helpers ───────────────────────────────────────────────────────────────

function detectLib(filename) {
  if (filename.includes('/tkajui/') || filename.includes('\\tkajui\\')) return 'tkajui'
  if (filename.includes('/donjon/') || filename.includes('\\donjon\\')) return 'donjon'
  return null
}

/** Build a name→hex map from the file's ImportDeclarations. */
function buildLocalTokenMap(programAst) {
  const map = new Map()
  for (const node of programAst.body) {
    if (node.type !== 'ImportDeclaration') continue
    const src = node.source.value
    if (typeof src !== 'string') continue
    let pool = null
    if (src.endsWith('/tokens') || src.endsWith('/tokens.js')) {
      if (src.includes('donjon')) pool = DONJON
      else if (src.includes('tkajui')) pool = TKAJUI
      else pool = null   // shared/tokens — no color exports
    } else if (src === './tokens') {
      // Relative — caller passes filename, but we don't have it here.
      // Resolve by trying both pools (first hit wins).
      pool = null
    }
    for (const spec of node.specifiers) {
      if (spec.type !== 'ImportSpecifier') continue
      const local  = spec.local.name
      const remote = spec.imported.name
      if (pool && pool.has(remote)) {
        map.set(local, pool.get(remote))
      } else if (!pool) {
        if (DONJON.has(remote))      map.set(local, DONJON.get(remote))
        else if (TKAJUI.has(remote)) map.set(local, TKAJUI.get(remote))
      }
    }
  }
  return map
}

/** Try to resolve a property value to { hex, alpha }.
    Alpha is the 0–255 value of the trailing alpha pair, or 255 if opaque. */
function resolveColorValue(valueNode, localTokens) {
  if (!valueNode) return null
  // 'color: "#abc"'
  if (valueNode.type === 'Literal' && typeof valueNode.value === 'string') {
    if (!/^#[0-9a-f]{3,8}$/i.test(valueNode.value)) return null
    const v = valueNode.value.toUpperCase()
    let alpha = 255
    if (v.length === 9) alpha = parseInt(v.slice(7), 16)
    else if (v.length === 5) {
      const a = v.slice(4)
      alpha = parseInt(a + a, 16)
    }
    return { hex: v, alpha }
  }
  // 'color: textHigh'
  if (valueNode.type === 'Identifier') {
    const hex = localTokens.get(valueNode.name)
    return hex ? { hex, alpha: 255 } : null
  }
  // 'color: `${gold}33`' — track alpha
  if (valueNode.type === 'TemplateLiteral'
      && valueNode.expressions.length === 1
      && valueNode.quasis.length === 2
      && valueNode.quasis[0].value.cooked === ''
      && /^[0-9a-f]{0,2}$/i.test(valueNode.quasis[1].value.cooked)) {
    const expr = valueNode.expressions[0]
    if (expr.type !== 'Identifier') return null
    const hex = localTokens.get(expr.name)
    if (!hex) return null
    const tail = valueNode.quasis[1].value.cooked
    let alpha = 255
    if (tail.length === 2) alpha = parseInt(tail, 16)
    else if (tail.length === 1) alpha = parseInt(tail + tail, 16)
    return { hex, alpha }
  }
  return null
}

// ── Rule ──────────────────────────────────────────────────────────────────
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Warn when an inline style { color, background } pair fails WCAG contrast',
      category: 'Accessibility',
    },
    schema: [{
      type: 'object',
      properties: {
        level: { enum: Object.keys(LEVELS), default: 'AA-large' },
      },
      additionalProperties: false,
    }],
    messages: {
      lowContrast:
        'Inline style color/background pair has contrast {{ratio}}:1 — below WCAG {{level}} ({{threshold}}). ' +
        'Use tokens that pass, or eslint-disable-next-line donjon/contrast-check with a reason.',
    },
  },

  create(context) {
    const opts = context.options[0] ?? {}
    const level = opts.level ?? 'AA-large'
    const threshold = LEVELS[level] ?? LEVELS['AA-large']

    const lib = detectLib(context.filename ?? context.getFilename())
    if (!lib && !(context.filename ?? '').includes('/pages/') && !(context.filename ?? '').includes('\\pages\\')) {
      return {}   // only check lib + pages
    }

    const sourceCode = context.sourceCode ?? context.getSourceCode()
    const localTokens = buildLocalTokenMap(sourceCode.ast)

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'style') return
        if (!node.value || node.value.type !== 'JSXExpressionContainer') return
        const obj = node.value.expression
        if (!obj || obj.type !== 'ObjectExpression') return

        let fgNode = null, bgNode = null
        for (const prop of obj.properties) {
          if (prop.type !== 'Property' || prop.computed) continue
          const key = prop.key.type === 'Identifier' ? prop.key.name
                    : prop.key.type === 'Literal' ? prop.key.value : null
          if (key === 'color')                            fgNode = prop.value
          else if (key === 'background' || key === 'backgroundColor') bgNode = prop.value
        }
        if (!fgNode || !bgNode) return

        const fg = resolveColorValue(fgNode, localTokens)
        const bg = resolveColorValue(bgNode, localTokens)
        if (!fg || !bg) return   // can't statically resolve → skip

        // Skip when the background has significant transparency (< 50 %).
        // The visible background is then dominated by whatever sits behind
        // this element — a value we cannot resolve statically. Common
        // example: a close button with `background: \`${goldDim}22\`` on
        // top of a tinted panel.
        if (bg.alpha < 128) return

        const ratio = contrastRatio(fg.hex, bg.hex)
        if (ratio == null || ratio >= threshold) return
        // Skip exact 1.00:1 — same FG / BG means the element is decorative
        // (badge dot, glow ring, separator) and renders no text. Real text
        // pairs always differ; a contrast of exactly 1 is the signal.
        if (ratio >= 0.999 && ratio <= 1.001) return

        context.report({
          node: obj,
          messageId: 'lowContrast',
          data: { ratio: ratio.toFixed(2), level, threshold: String(threshold) },
        })
      },
    }
  },
}
