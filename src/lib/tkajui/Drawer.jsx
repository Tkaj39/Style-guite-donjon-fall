/* ── Drawer (tkajui) ─────────────────────────────────────────────────
   Slide-in panel anchored to one edge of the viewport. Used for nav
   menus on mobile, settings panels, property inspectors.

   Includes its own Backdrop. Closes on backdrop click or ESC.
   Focus management:
     • when the drawer opens, focus moves to its first focusable child
       (or the panel itself if there is none, so the user lands inside);
     • Tab / Shift+Tab are wrapped inside the panel — keyboard cannot
       reach background content while the drawer is open;
     • the original focus owner is restored on close.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
import Backdrop from './Backdrop'
import { surface2, borderDefault, textHigh, textMid } from './tokens'
import { zNotification, panelShadow } from '../shared/tokens'
import { CloseIcon } from './Icons'

const SIDES = {
  left:   { axis: 'X', sign: -1, full: 'height' },
  right:  { axis: 'X', sign:  1, full: 'height' },
  top:    { axis: 'Y', sign: -1, full: 'width'  },
  bottom: { axis: 'Y', sign:  1, full: 'width'  },
}

const FOCUSABLE_SEL =
  'a[href], button:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), textarea:not([disabled]), ' +
  '[tabindex]:not([tabindex="-1"])'

function focusables(root) {
  if (!root) return []
  return Array.from(root.querySelectorAll(FOCUSABLE_SEL))
    .filter(el => !el.hasAttribute('hidden') && el.offsetParent !== null)
}

/**
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {'left'|'right'|'top'|'bottom'} [side='right']
 * @param {number|string} [size=320]   Panel dimension on the cross axis.
 * @param {string} [title]
 * @param {boolean} [closeOnBackdrop=true]
 * @param {boolean} [closeOnEscape=true]
 * @param {React.ReactNode} children
 */
export default function Drawer({
  open,
  onClose,
  side = 'right',
  size = 320,
  title,
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  className,
  style,
  ...rest
}) {
  const panelRef = useRef(null)
  const previousFocusRef = useRef(null)

  // ESC handler
  useEffect(() => {
    if (!open || !closeOnEscape) return undefined
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, closeOnEscape, onClose])

  // Focus on open + restore on close.
  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement
    // Land inside the drawer. First focusable child preferred; fall back
    // to the panel itself (tabIndex={-1} below makes that valid).
    const first = focusables(panelRef.current)[0] ?? panelRef.current
    first?.focus({ preventScroll: true })
    return () => {
      const prev = previousFocusRef.current
      if (prev && typeof prev.focus === 'function') prev.focus({ preventScroll: true })
    }
  }, [open])

  // Tab / Shift+Tab loop. We wrap focus, keeping it inside the panel
  // until the drawer closes.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const list = focusables(panelRef.current)
      if (list.length === 0) {
        e.preventDefault()
        panelRef.current?.focus({ preventScroll: true })
        return
      }
      const first = list[0]
      const last  = list[list.length - 1]
      const active = document.activeElement
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const cfg = SIDES[side] ?? SIDES.right
  const sizeStyle = cfg.full === 'height'
    ? { width: size, height: '100vh', top: 0, [side]: 0 }
    : { height: size, width: '100vw', left: 0, [side]: 0 }
  const animName = `tkajuiDrawerSlideIn${side[0].toUpperCase()}${side.slice(1)}`

  return (
    <>
      <Backdrop open={open} onClick={closeOnBackdrop ? onClose : undefined} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        // tabIndex={-1} so panelRef.current.focus() works as a fallback
        // when the drawer has no focusable children of its own yet.
        tabIndex={-1}
        className={className}
        style={{
          position: 'fixed',
          ...sizeStyle,
          background: surface2,
          color: textHigh,
          zIndex: zNotification - 50,
          boxShadow: panelShadow(side),
          display: 'flex',
          flexDirection: 'column',
          animation: `${animName} 220ms ease-out`,
          outline: 'none',
          ...style,
        }}
        {...rest}
      >
        {title && (
          <header style={{
            padding: '14px 20px',
            borderBottom: `1px solid ${borderDefault}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <strong>{title}</strong>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="tkajui-focus"
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: textMid, display: 'inline-flex', alignItems: 'center',
                lineHeight: 1, padding: 2,
              }}
            ><CloseIcon width={16} height={16} /></button>
          </header>
        )}
        <div style={{ flex: 1, overflowY: 'auto', padding: title ? 20 : '20px' }}>
          {children}
        </div>
      </aside>
    </>
  )
}
