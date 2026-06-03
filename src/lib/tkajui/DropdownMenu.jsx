/* ── DropdownMenu (tkajui) ───────────────────────────────────────────
   Clickable trigger that toggles a popover menu. Menu items support
   labels, icons, dangerous variant, dividers, and disabled state.

   Self-contained — pass trigger as a render prop or element. Menu
   closes on item click, outside click, or ESC.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { surface2, surface3, surface4, borderDefault, textHigh, textMid, textLow, dangerText } from './tokens'
import { zDropdown } from '../shared/tokens'

/**
 * @param {React.ReactNode | (props: {open: boolean, toggle: () => void}) => React.ReactNode} trigger
 *   Element or render-prop. Receives `open` + `toggle` when a function.
 * @param {Array<{label, icon?, onClick?, danger?, disabled?, divider?}>} items
 * @param {'left'|'right'} [align='left']   Horizontal alignment of menu vs trigger.
 * @param {number} [minWidth=180]
 */
export default function DropdownMenu({
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
          background: surface3, color: textHigh,
          border: `1px solid ${borderDefault}`,
          padding: '8px 12px', borderRadius: 4,
          cursor: 'pointer', fontSize: '0.875rem',
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
            background: surface2,
            border: `1px solid ${borderDefault}`,
            borderRadius: 4,
            boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
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
                  borderRadius: 3,
                  color,
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 80ms',
                }}
                onMouseEnter={(e) => { if (!item.disabled) e.currentTarget.style.background = surface4 }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                {item.icon != null && (
                  <span aria-hidden="true" style={{ width: 16, textAlign: 'center', color: item.danger ? dangerText : textMid }}>
                    {item.icon}
                  </span>
                )}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && (
                  <span style={{ fontSize: '0.75rem', color: textLow }}>{item.shortcut}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </span>
  )
}
