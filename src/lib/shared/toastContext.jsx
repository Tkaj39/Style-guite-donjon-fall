/* ── toastContext — sdílená logika pro Toast + DonjonToast ──────────────────
   createToastContext: factory funkce vracející nezávislý Context + Provider +
   useToast hook. Každý volající (tkajui, donjon) dostane vlastní kontext.

   Vizuální rendering (ToastItem) si každá varianta definuje sama — předává ho
   přes prop renderToasts(toasts, removeToast).
   ─────────────────────────────────────────────────────────────────────── */
import { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

export const TOAST_POSITIONS = {
  'bottom-right': { bottom: 24, right: 24, alignItems: 'flex-end'   },
  'top-right':    { top: 24,    right: 24, alignItems: 'flex-end'   },
  'bottom-left':  { bottom: 24, left: 24,  alignItems: 'flex-start' },
  'top-left':     { top: 24,    left: 24,  alignItems: 'flex-start' },
}

/**
 * Vytvoří nezávislý set { ToastProvider, useToast } s vlastním React kontextem.
 *
 * @param {object} [options]
 * @param {number} [options.zIndex=2000]  - z-index portálu
 * @param {string} [options.hookName='useToast'] - název hooku pro chybovou hlášku
 * @returns {{ ToastProvider: Component, useToast: Function }}
 */
export function createToastContext({ zIndex = 2000, hookName = 'useToast' } = {}) {
  const ToastCtx = createContext(null)

  /**
   * @param {object} props
   * @param {ReactNode} props.children
   * @param {'bottom-right'|'top-right'|'bottom-left'|'top-left'} [props.position]
   * @param {Function} props.renderToasts — (toasts, removeToast) => ReactNode[]
   */
  // eslint-disable-next-line donjon/no-component-in-render -- factory pattern: createToastContext is called at module top-level (not in render), returns a fresh Provider per context. The rule's heuristic can't tell factories from render functions.
  function ToastProvider({ children, position = 'bottom-right', renderToasts }) {
    const [toasts, setToasts] = useState([])

    const removeToast = useCallback((id) => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const addToast = useCallback(({ title, message, variant = 'default', duration = 4000 }) => {
      const id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`
      setToasts(prev => [...prev.slice(-4), { id, title, message, variant, duration }])
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration)
      }
      return id
    }, [removeToast])

    const pos = TOAST_POSITIONS[position] ?? TOAST_POSITIONS['bottom-right']

    return (
      <ToastCtx.Provider value={{ addToast, removeToast }}>
        {children}
        {createPortal(
          <div style={{ position: 'fixed', zIndex, display: 'flex', flexDirection: 'column', gap: 8, ...pos }}>
            {renderToasts(toasts, removeToast)}
          </div>,
          document.body
        )}
      </ToastCtx.Provider>
    )
  }

  function useToast() {
    const ctx = useContext(ToastCtx)
    if (!ctx) throw new Error(`${hookName} musí být použito uvnitř <ToastProvider>`)
    return ctx
  }

  return { ToastProvider, useToast }
}
