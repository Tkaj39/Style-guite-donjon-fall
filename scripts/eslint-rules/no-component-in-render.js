/**
 * donjon/no-component-in-render
 *
 * Zakazuje definice React komponent (s hooky) uvnitř jiných funkcí.
 * Tento anti-pattern způsobuje:
 *   - reset state při každém re-renderu rodiče
 *   - rozbité native dialog/ref API (komponenta se remountuje)
 *   - zbytečné výkonnostní problémy
 *
 * ERR:
 *   export default function Page() {
 *     function Demo() {           ← vnořená komponenta
 *       const [x, setX] = useState(false)
 *       return <div />
 *     }
 *   }
 *
 * OK:
 *   function Demo({ Cmp }) {      ← na úrovni modulu
 *     const [x, setX] = useState(false)
 *     return <Cmp />
 *   }
 *   export default function Page() {
 *     return <Demo Cmp={MyComp} />
 *   }
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Zakazuje React komponenty s hooky definované uvnitř jiných funkcí',
    },
    messages: {
      nestedComponent:
        "Komponenta '{{ name }}' s hooky je definována uvnitř jiné funkce. " +
        'Přesuň ji na úroveň modulu a předej komponent jako prop.',
    },
    schema: [],
  },

  create(context) {
    /**
     * Stack funkčních rámců.
     * Každý rámec: { node, name, isComponent, hasHooks, reported }
     */
    const stack = []

    function pushFrame(node, name) {
      const isComponent = typeof name === 'string' && /^[A-Z]/.test(name)
      stack.push({ node, name, isComponent, hasHooks: false, reported: false })
    }

    function popFrame() {
      const frame = stack.pop()
      if (!frame) return

      // Jsme uvnitř jiné funkce (stack není prázdný) + komponenta s hooky?
      if (stack.length > 0 && frame.isComponent && frame.hasHooks && !frame.reported) {
        frame.reported = true
        context.report({
          node: frame.node,
          messageId: 'nestedComponent',
          data: { name: frame.name ?? '(anonymous)' },
        })
      }
    }

    function markHook(node) {
      // Hook je volání funkce jejíž název začíná "use" + velké písmeno
      if (
        node.callee.type === 'Identifier' &&
        /^use[A-Z]/.test(node.callee.name) &&
        stack.length > 0
      ) {
        stack[stack.length - 1].hasHooks = true
      }
    }

    return {
      // ── Sledujeme vstup/výstup z funkcí ──────────────────────────────────

      FunctionDeclaration(node) {
        pushFrame(node, node.id?.name)
      },
      'FunctionDeclaration:exit'() {
        popFrame()
      },

      FunctionExpression(node) {
        // const Foo = function() {} — jméno z VariableDeclarator
        const name =
          node.id?.name ??
          (node.parent?.type === 'VariableDeclarator' ? node.parent.id?.name : undefined)
        pushFrame(node, name)
      },
      'FunctionExpression:exit'() {
        popFrame()
      },

      ArrowFunctionExpression(node) {
        // const Foo = () => {} — jméno z VariableDeclarator
        const name =
          node.parent?.type === 'VariableDeclarator' ? node.parent.id?.name : undefined
        pushFrame(node, name)
      },
      'ArrowFunctionExpression:exit'() {
        popFrame()
      },

      // ── Detekujeme volání hooků ───────────────────────────────────────────
      CallExpression: markHook,
    }
  },
}
