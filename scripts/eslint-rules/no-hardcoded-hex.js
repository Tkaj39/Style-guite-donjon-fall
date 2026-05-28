/**
 * donjon/no-hardcoded-hex
 *
 * Zakazuje hardcoded hex barvy v src/lib/ a src/pages/ JSX.
 * Všechny barvy musí pocházet z tokens.js (donjon nebo tkajui).
 *
 * Při nálezu zkusí navrhnout konkrétní token jméno na základě
 * statického scanu donjon/tokens.js a tkajui/tokens.js.
 *
 * Autofix:
 *   • Když soubor JIŽ importuje doporučený token → string literal
 *     se nahradí přímo identifikátorem.
 *   • Když import chybí → jen warning, manuální oprava (auto by mohl
 *     vytvořit cross-lib import — radši explicitní).
 *
 * OK:  import { gold } from './tokens'  →  style={{ color: gold }}
 * OK:  `${gold}66`                      →  template literal s tokenem
 * ERR: style={{ color: '#FFC183' }}     →  hardcoded hex (auto-suggest 'gold')
 */
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

/* ── Načtení hex→token map ze statického scanu tokens.js ──────────────────
   Jednou při startu ESLint procesu — výsledek se cachuje. */
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
      // První záznam má přednost (deterministické pořadí v souboru)
      if (!map.has(hex)) {
        map.set(hex, { name, lib: libName })
      }
    }
  } catch {
    /* Soubor neexistuje — ignoruj (test prostředí) */
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

/* Pro daný hex string vrať doporučený token (preferuj soulad s lib).
   Pokud hex obsahuje alpha suffix (#FFC18366), zkus matchnout base #FFC183. */
function suggestToken(hexValue, fileLib) {
  const upper = hexValue.toUpperCase()
  // Base hex (bez alpha)
  const base = upper.length === 9 ? upper.slice(0, 7)
             : upper.length === 5 ? upper.slice(0, 4)
             : upper

  const sources = fileLib === 'tkajui'
    ? [TKAJUI_TOKENS, DONJON_TOKENS]   // preferuj tkajui v tkajui souborech
    : [DONJON_TOKENS, TKAJUI_TOKENS]   // jinak preferuj donjon

  for (const map of sources) {
    if (map.has(upper))  return { ...map.get(upper),  exact: true }
    if (map.has(base))   return { ...map.get(base),   exact: false, alpha: upper.slice(base.length) }
  }
  return null
}

/* Detekuj knihovnu kontextu podle cesty souboru */
function detectLib(filename) {
  if (filename.includes('/tkajui/') || filename.includes('\\tkajui\\')) return 'tkajui'
  if (filename.includes('/donjon/') || filename.includes('\\donjon\\')) return 'donjon'
  return null  // pages — neutrální, preferuje donjon (větší paleta)
}

/* Zjisti zda daný identifier je už importován v souboru */
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
      description: 'Zakazuje hardcoded hex barvy — použij token z tokens.js',
    },
    messages: {
      hardcodedHexBase:
        "Hardcoded hex '{{ hex }}' — použij token '{{ token }}' z {{ lib }}/tokens.",
      hardcodedHexAlpha:
        "Hardcoded hex '{{ hex }}' — použij `${'$'}{ {{ token }} }{{ alpha }}` (alpha tail nad tokenem '{{ token }}' z {{ lib }}/tokens).",
      hardcodedHexUnknown:
        "Hardcoded hex '{{ hex }}' — neodpovídá žádnému tokenu. Buď přidej do tokens.js, nebo označ `eslint-disable-next-line donjon/no-hardcoded-hex -- důvod`.",
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename ?? context.getFilename()
    const fileLib = detectLib(filename)

    /* Společná logika reportu pro string literál i template element */
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

      // Autofix jen když:
      //   - token už je importován (jinak by autofix vytvořil nedefinovaný symbol)
      //   - máme replaceRange (specifické pro Literal — TemplateLiteral příliš křehký)
      //   - jde o exact match (alpha tail by vyžadoval složitější restrukturalizaci)
      if (importExists && replaceRange && suggestion.exact) {
        reportObj.fix = (fixer) => fixer.replaceTextRange(replaceRange, suggestion.name)
      }

      context.report(reportObj)
    }

    return {
      /* String literály jako '#FFC183' nebo '#E05C5C88' */
      Literal(node) {
        if (typeof node.value !== 'string') return
        if (!/^#[0-9A-Fa-f]{3,8}$/.test(node.value)) return
        report(node, node.value, node.range)
      },

      /* Template literals s hex uvnitř — `0 0 10px #FFC18366` */
      TemplateElement(node) {
        const val = node.value.raw
        const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/g
        let m
        while ((m = HEX_RE.exec(val)) !== null) {
          report(node.parent, m[0])  // bez range → bez autofixu (křehké)
        }
      },
    }
  },
}
