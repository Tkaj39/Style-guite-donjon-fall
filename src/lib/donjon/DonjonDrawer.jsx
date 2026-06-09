/* ── DonjonDrawer (donjon-fall-ui) ───────────────────────────────────
   Game variant of Drawer. Same slide-in / focus-trap / ESC behavior
   as TkajUI Drawer — visuals adopt the parchment theme: bg2 panel
   on a gold border, gold-tinted title, CloseIcon dismiss button,
   subtle 1-px inner gold rail along the entry edge so the panel
   reads as a magical scroll being pulled in.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
import Backdrop from '../tkajui/Backdrop'
import { bg2, gold, goldDim, textHigh, textMid } from './tokens'
import { zNotification, panelShadow } from '../shared/tokens'
import { CloseIcon } from '../tkajui/Icons'

const SIDES = {
  left:   { axis: 'X', sign: -1, full: 'height', rail: 'borderRight'  },
  right:  { axis: 'X', sign:  1, full: 'height', rail: 'borderLeft'   },
  top:    { axis: 'Y', sign: -1, full: 'width',  rail: 'borderBottom' },
  bottom: { axis: 'Y', sign:  1, full: 'width',  rail: 'borderTop'    },
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
export default function DonjonDrawer({
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
    const first = focusables(panelRef.current)[0] ?? panelRef.current
    first?.focus({ preventScroll: true })
    return () => {
      const prev = previousFocusRef.current
      if (prev && typeof prev.focus === 'function') prev.focus({ preventScroll: true })
    }
  }, [open])

  // Tab / Shift+Tab loop.
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
  // Donjon shares the tkajui slide-in keyframes (already in index.css)
  const animName = `tkajuiDrawerSlideIn${side[0].toUpperCase()}${side.slice(1)}`

  return (
    <>
      <Backdrop open={open} onClick={closeOnBackdrop ? onClose : undefined} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={className}
        style={{
          position: 'fixed',
          ...sizeStyle,
          background: bg2,
          color: textHigh,
          zIndex: zNotification - 50,
          boxShadow: panelShadow(side),
          // Gold rail along the entry edge — the side the panel slides in from
          [cfg.rail]: `1px solid ${gold}`,
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
            borderBottom: `1px solid ${goldDim}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <strong style={{
              color: gold,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
            }}>{title}</strong>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: textMid,
                display: 'inline-flex', alignItems: 'center', lineHeight: 1, padding: 2,
              }}
            >
              <CloseIcon width={16} height={16} />
            </button>
          </header>
        )}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, color: textMid }}>
          {children}
        </div>
      </aside>
    </>
  )
}
