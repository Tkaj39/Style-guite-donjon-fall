/**
 * donjon/no-hardcoded-hex
 *
 * Forbids hardcoded hex colors in src/lib/ and src/pages/ JSX.
 * All colors must come from tokens.js (donjon or tkajui).
 *
 * On a hit, it tries to suggest a concrete token name based on a static
 * scan of donjon/tokens.js and tkajui/tokens.js.
 *
 * Autofix:
 *   • When the file ALREADY imports the recommended token → the string
 *     literal is replaced directly by the identifier.
 *   • If the import is missing → only a warning, manual fix (an autofix
 *     might create a cross-lib import — better to keep it explicit).
 *
 * OK:  import { gold } from './tokens'  →  style={{ color: gold }}
 * OK:  `${gold}66`                      →  template literal with token
 * ERR: style={{ color: '#FFC183' }}     →  hardcoded hex (auto-suggest 'gold')
 */
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

/* ── Load the hex→token map from a static scan of tokens.js ────────────────
   Done once at ESLint process start — the result is cached. */
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..', '..')

function loadTokensFromFile(filePath, libName) {
  const map = new Map()  // normalizedHex → { name, lib }
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // Match: export const NAME = '#HEX' (ignoring template literals + composed values)
    const RE = /export\s+const\s+(\w+)\s*=\s*['"](#[0-9A-Fa-f]{3,8})['"]/g
    let m
    while ((m = RE.exec(content)) !== null) {
      const name = m[1]
      const hex  = m[2].toUpperCase()
      // First entry wins (deterministic in-file order)
      if (!map.has(hex)) {
        map.set(hex, { name, lib: libName })
      }
    }
  } catch {
    /* File doesn't exist — ignore (test environment) */
  }
  return map
}

const DONJON_TOKENS = loadTokensFromFile(
  path.join(PROJECT_ROOT, 'src/lib/donjon/tokens.js'),
  'donjon'
)
const TKAJUI_TOKENS = loadTokensFromFile(
  path.join(PROJECT_ROOT, 'src/lib/tkajui/tokens.js'),
  'tkajui'
)

/* For a given hex string, return the recommended token (prefer the matching lib).
   If the hex has an alpha suffix (#FFC18366), try to match the base #FFC183. */
function suggestToken(hexValue, fileLib) {
  const upper = hexValue.toUpperCase()
  // Base hex (no alpha)
  const base = upper.length === 9 ? upper.slice(0, 7)
             : upper.length === 5 ? upper.slice(0, 4)
             : upper

  const sources = fileLib === 'tkajui'
    ? [TKAJUI_TOKENS, DONJON_TOKENS]   // prefer tkajui in tkajui files
    : [DONJON_TOKENS, TKAJUI_TOKENS]   // otherwise prefer donjon

  for (const map of sources) {
    if (map.has(upper))  return { ...map.get(upper),  exact: true }
    if (map.has(base))   return { ...map.get(base),   exact: false, alpha: upper.slice(base.length) }
  }
  return null
}

/* Detect the context library from the file path */
function detectLib(filename) {
  if (filename.includes('/tkajui/') || filename.includes('\\tkajui\\')) return 'tkajui'
  if (filename.includes('/donjon/') || filename.includes('\\donjon\\')) return 'donjon'
  return null  // pages — neutral, prefers donjon (larger palette)
}

/* Check whether the given identifier is already imported in the file */
function hasImport(context, identifierName) {
  const sourceCode = context.sourceCode ?? context.getSourceCode()
  const program = sourceCode.ast
  for (const node of program.body) {
    if (node.type !== 'ImportDeclaration') continue
    for (const spec of node.specifiers) {
      if (spec.type === 'ImportSpecifier' && spec.imported.name === identifierName) {
        return true
      }
    }
  }
  return false
}

export default {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Forbids hardcoded hex colors — use a token from tokens.js',
    },
    messages: {
      hardcodedHexBase:
        "Hardcoded hex '{{ hex }}' — use the token '{{ token }}' from {{ lib }}/tokens.",
      hardcodedHexAlpha:
        "Hardcoded hex '{{ hex }}' — use `${'$'}{ {{ token }} }{{ alpha }}` (alpha tail on top of token '{{ token }}' from {{ lib }}/tokens).",
      hardcodedHexUnknown:
        "Hardcoded hex '{{ hex }}' — does not match any token. Either add it to tokens.js, or mark it `eslint-disable-next-line donjon/no-hardcoded-hex -- reason`.",
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename ?? context.getFilename()
    const fileLib = detectLib(filename)

    /* Shared report logic for both string literals and template elements */
    function report(node, hex, replaceRange = null) {
      const suggestion = suggestToken(hex, fileLib)

      if (!suggestion) {
        context.report({ node, messageId: 'hardcodedHexUnknown', data: { hex } })
        return
      }

      const importExists = hasImport(context, suggestion.name)

      // Common report fields
      const reportObj = {
        node,
        messageId: suggestion.exact ? 'hardcodedHexBase' : 'hardcodedHexAlpha',
        data: {
          hex,
          token: suggestion.name,
          lib: suggestion.lib,
          alpha: suggestion.alpha ?? '',
        },
      }

      // Autofix only when:
      //   - the token is already imported (otherwise the autofix would create an undefined symbol)
      //   - we have a replaceRange (Literal-specific — TemplateLiteral is too fragile)
      //   - it's an exact match (an alpha tail would require more complex restructuring)
      if (importExists && replaceRange && suggestion.exact) {
        reportObj.fix = (fixer) => fixer.replaceTextRange(replaceRange, suggestion.name)
      }

      context.report(reportObj)
    }

    return {
      /* String literals like '#FFC183' or '#E05C5C88' */
      Literal(node) {
        if (typeof node.value !== 'string') return
        if (!/^#[0-9A-Fa-f]{3,8}$/.test(node.value)) return
        report(node, node.value, node.range)
      },

      /* Template literals with a hex inside — `0 0 10px #FFC18366` */
      TemplateElement(node) {
        const val = node.value.raw
        const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/g
        let m
        while ((m = HEX_RE.exec(val)) !== null) {
          report(node.parent, m[0])  // no range → no autofix (fragile)
        }
      },
    }
  },
}
