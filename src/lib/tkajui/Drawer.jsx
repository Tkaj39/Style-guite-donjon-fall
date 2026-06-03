/* ── Drawer (tkajui) ─────────────────────────────────────────────────
   Slide-in panel anchored to one edge of the viewport. Used for nav
   menus on mobile, settings panels, property inspectors.

   Includes its own Backdrop. Closes on backdrop click or ESC.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect } from 'react'
import Backdrop from './Backdrop'
import { surface2, borderDefault, textHigh, textMid } from './tokens'
import { zNotification, panelShadow } from '../shared/tokens'

const SIDES = {
  left:   { axis: 'X', sign: -1, full: 'height' },
  right:  { axis: 'X', sign:  1, full: 'height' },
  top:    { axis: 'Y', sign: -1, full: 'width'  },
  bottom: { axis: 'Y', sign:  1, full: 'width'  },
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
  useEffect(() => {
    if (!open || !closeOnEscape) return undefined
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, closeOnEscape, onClose])

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
        role="dialog"
        aria-modal="true"
        aria-label={title}
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
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: textMid, fontSize: '1.25rem', lineHeight: 1, padding: 2,
              }}
            >×</button>
          </header>
        )}
        <div style={{ flex: 1, overflowY: 'auto', padding: title ? 20 : '20px' }}>
          {children}
        </div>
      </aside>
    </>
  )
}
