/* ── DonjonDropdownMenu (donjon-fall-ui) ─────────────────────────────
   Game variant of DropdownMenu. Same trigger / items / outside-click
   / ESC behavior as TkajUI DropdownMenu — visuals swap to the donjon
   palette: gold-trimmed trigger, parchment-style menu panel (bg2 on
   gold border), gold-tinted icons, soft hover bg3 row highlight.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { bg2, bg3, gold, goldDim, borderDefault, textHigh, textLow, dangerText } from './tokens'
import { shadowMd, zDropdown } from '../shared/tokens'

/**
 * @param {React.ReactNode | (props: {open: boolean, toggle: () => void}) => React.ReactNode} trigger
 *   Element or render-prop. Receives `open` + `toggle` when a function.
 * @param {Array<{label, icon?, onClick?, danger?, disabled?, divider?, shortcut?}>} items
 * @param {'left'|'right'} [align='left']   Horizontal alignment of menu vs trigger.
 * @param {number} [minWidth=180]
 */
export default function DonjonDropdownMenu({
  trigger,
  items = [],
  align = 'left',
  minWidth = 180,
  className,
  style,
  ...rest
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const close = () => setOpen(false)
  const toggle = () => setOpen(o => !o)

  useEffect(() => {
    if (!open) return undefined
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) close()
    }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const triggerNode = typeof trigger === 'function'
    ? trigger({ open, toggle })
    : (
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          background: bg3, color: gold,
          border: `1px solid ${goldDim}`,
          padding: '8px 12px', borderRadius: 3,
          cursor: 'pointer', fontSize: '0.875rem',
          fontWeight: 600, letterSpacing: 0.4,
        }}
      >
        {trigger ?? 'Menu ▾'}
      </button>
    )

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      {...rest}
    >
      {triggerNode}
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            [align]: 0,
            minWidth,
            background: bg2,
            border: `1px solid ${gold}`,
            borderRadius: 3,
            boxShadow: shadowMd,
            padding: 4,
            zIndex: zDropdown,
            animation: 'fadeIn 120ms ease-out',
          }}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} role="separator" style={{ height: 1, background: borderDefault, margin: '4px 0' }} />
            }
            const color = item.danger ? dangerText : (item.disabled ? textLow : textHigh)
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return
                  item.onClick?.()
                  close()
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 10px',
                  borderRadius: 2,
                  color,
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 80ms',
                }}
                onMouseEnter={(e) => { if (!item.disabled) e.currentTarget.style.background = bg3 }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                {item.icon != null && (
                  <span aria-hidden="true" style={{
                    width: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.danger ? dangerText : (item.disabled ? textLow : gold),
                  }}>
                    {item.icon}
                  </span>
                )}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && (
                  <span style={{ fontSize: '0.75rem', color: goldDim, letterSpacing: 0.4 }}>{item.shortcut}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </span>
  )
}
