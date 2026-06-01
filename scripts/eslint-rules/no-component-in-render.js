/**
 * donjon/no-component-in-render
 *
 * Forbids defining React components (with hooks) inside other functions.
 * This anti-pattern causes:
 *   - state reset on every parent re-render
 *   - broken native dialog/ref APIs (the component remounts)
 *   - avoidable performance problems
 *
 * ERR:
 *   export default function Page() {
 *     function Demo() {           ← nested component
 *       const [x, setX] = useState(false)
 *       return <div />
 *     }
 *   }
 *
 * OK:
 *   function Demo({ Cmp }) {      ← at module level
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
      description: 'Forbids React components with hooks defined inside other functions',
    },
    messages: {
      nestedComponent:
        "Component '{{ name }}' with hooks is defined inside another function. " +
        'Move it to the module level and pass the component as a prop.',
    },
    schema: [],
  },

  create(context) {
    /**
     * Stack of function frames.
     * Each frame: { node, name, isComponent, hasHooks, reported }
     */
    const stack = []

    function pushFrame(node, name) {
      const isComponent = typeof name === 'string' && /^[A-Z]/.test(name)
      stack.push({ node, name, isComponent, hasHooks: false, reported: false })
    }

    function popFrame() {
      const frame = stack.pop()
      if (!frame) return

      // Are we inside another function (stack not empty) + component with hooks?
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
      // A hook is a call to a function whose name starts with "use" + capital
      if (
        node.callee.type === 'Identifier' &&
        /^use[A-Z]/.test(node.callee.name) &&
        stack.length > 0
      ) {
        stack[stack.length - 1].hasHooks = true
      }
    }

    return {
      // ── Track entering/leaving functions ─────────────────────────────────

      FunctionDeclaration(node) {
        pushFrame(node, node.id?.name)
      },
      'FunctionDeclaration:exit'() {
        popFrame()
      },

      FunctionExpression(node) {
        // const Foo = function() {} — name from VariableDeclarator
        const name =
          node.id?.name ??
          (node.parent?.type === 'VariableDeclarator' ? node.parent.id?.name : undefined)
        pushFrame(node, name)
      },
      'FunctionExpression:exit'() {
        popFrame()
      },

      ArrowFunctionExpression(node) {
        // const Foo = () => {} — name from VariableDeclarator
        const name =
          node.parent?.type === 'VariableDeclarator' ? node.parent.id?.name : undefined
        pushFrame(node, name)
      },
      'ArrowFunctionExpression:exit'() {
        popFrame()
      },

      // ── Detect hook calls ────────────────────────────────────────────────
      CallExpression: markHook,
    }
  },
}
