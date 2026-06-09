/* ── DonjonContextMenu (donjon-fall-ui) ──────────────────────────────
   Game variant of ContextMenu. Same right-click → menu / outside-click
   / ESC / viewport-clamp behavior as TkajUI ContextMenu. Visuals adopt
   the parchment menu: bg2 panel on a gold border with an octagonal
   clip via the border-trick, gold-tinted icons, bg3 row hover.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { octagon } from '../shared/octagon'
import { bg2, bg3, gold, goldDim, borderDefault, textHigh, textLow, dangerText } from './tokens'
import { shadowMd, zDropdown } from '../shared/tokens'

const SHELL_CX = 8

/**
 * @param {React.ReactNode} children   Area that receives the right-click handler.
 * @param {Array<{label, icon?, shortcut?, onClick?, danger?, disabled?, divider?}>} items
 * @param {number} [minWidth=180]
 * @param {React.ElementType} [as='div']
 */
export default function DonjonContextMenu({
  children,
  items = [],
  minWidth = 180,
  as: As = 'div',
  className,
  style,
  ...rest
}) {
  const [pos, setPos] = useState(null) // { x, y } | null
  const menuRef = useRef(null)
  const close = () => setPos(null)

  useEffect(() => {
    if (!pos) return undefined
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) close() }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [pos])

  // Clamp menu to viewport on next paint
  useEffect(() => {
    if (!pos || !menuRef.current) return
    const el = menuRef.current
    const r = el.getBoundingClientRect()
    const dx = Math.max(0, r.right - window.innerWidth + 4)
    const dy = Math.max(0, r.bottom - window.innerHeight + 4)
    if (dx > 0 || dy > 0) {
      el.style.left = `${pos.x - dx}px`
      el.style.top  = `${pos.y - dy}px`
    }
  }, [pos])

  const onContextMenu = (e) => {
    e.preventDefault()
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <As
        onContextMenu={onContextMenu}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </As>
      {pos && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            left: pos.x,
            top:  pos.y,
            minWidth,
            // Border-trick — outer gold edge, inner bg2 fill, octagon clip
            background: gold,
            clipPath: octagon(SHELL_CX),
            padding: 1,
            boxShadow: shadowMd,
            zIndex: zDropdown,
            animation: 'fadeIn 120ms ease-out',
          }}
        >
          <div
            role="menu"
            style={{
              background: bg2,
              clipPath: octagon(SHELL_CX),
              padding: 4,
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
                  onClick={() => { if (item.disabled) return; item.onClick?.(); close() }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    background: 'transparent', border: 'none',
                    padding: '8px 10px', borderRadius: 2,
                    color, fontSize: '0.875rem', textAlign: 'left',
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
        </div>
      )}
    </>
  )
}
