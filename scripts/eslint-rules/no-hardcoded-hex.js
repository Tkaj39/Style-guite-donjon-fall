/**
 * donjon/no-hardcoded-hex
 *
 * Zakazuje hardcoded hex barvy v src/lib/ komponentách.
 * Všechny barvy musí pocházet z tokens.js.
 *
 * OK:  import { gold } from './tokens'  →  style={{ color: gold }}
 * OK:  `${gold}66`                      →  template literal s tokenem
 * ERR: style={{ color: '#FFC183' }}     →  hardcoded hex
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Zakazuje hardcoded hex barvy v lib/ komponentách — použij token z tokens.js',
    },
    messages: {
      hardcodedHex:
        "Hardcoded hex '{{ hex }}' — importuj token z './tokens' a použij ho místo přímé hodnoty.",
    },
    schema: [],
  },

  create(context) {
    return {
      /**
       * Zachytí string literály jako '#FFC183', '#E05C5C88' atd.
       * AST ví přesně co je string — žádné false positives z komentářů.
       */
      Literal(node) {
        if (typeof node.value !== 'string') return
        if (!/^#[0-9A-Fa-f]{3,8}$/.test(node.value)) return

        context.report({
          node,
          messageId: 'hardcodedHex',
          data: { hex: node.value },
        })
      },

      /**
       * Zachytí template literals kde je hex přímo — např. `0 0 10px #FFC18366`
       * (případ kdy hex je ve stringu ale NENÍ složen z tokenu)
       */
      TemplateElement(node) {
        const val = node.value.raw
        const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/g
        let m
        while ((m = HEX_RE.exec(val)) !== null) {
          // Hlásíme na rodičovský TemplateLiteral (TemplateElement nemá vlastní loc)
          context.report({
            node: node.parent,
            messageId: 'hardcodedHex',
            data: { hex: m[0] },
          })
        }
      },
    }
  },
}
