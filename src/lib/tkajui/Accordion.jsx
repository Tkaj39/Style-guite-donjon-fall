/* ── Accordion (tkajui) ──────────────────────────────────────────────
   Vertically stacked collapsible sections. Each item has a clickable
   header that toggles visibility of the body. Supports single-expand
   (only one open at a time) and multi-expand modes.

   Controlled: pass `value` + `onChange`.
   Uncontrolled: pass `defaultValue`, component manages state.
   ─────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { surface2, surface3, borderDefault, textHigh, textMid } from './tokens'

const SHELL_CX = 8

/**
 * @param {Array<{id: string|number, title: ReactNode, content: ReactNode, disabled?: boolean}>} items
 * @param {boolean} [multi=false]                 Allow multiple open at once.
 * @param {Array<string|number>|null} [value]     Controlled: list of open ids.
 *                                                In single mode, only the first is used.
 * @param {(next: Array) => void} [onChange]
 * @param {Array<string|number>} [defaultValue=[]]
 * @param {boolean} [bordered=true]
 */
export default function Accordion({
  items = [],
  multi = false,
  value,
  onChange,
  defaultValue = [],
  bordered = true,
  className,
  style,
  ...rest
}) {
  const [internal, setInternal] = useState(defaultValue)
  const open = value ?? internal
  const setOpen = (next) => {
    if (value == null) setInternal(next)
    onChange?.(next)
  }

  const toggle = (id) => {
    const isOpen = open.includes(id)
    let next
    if (multi) {
      next = isOpen ? open.filter(x => x !== id) : [...open, id]
    } else {
      next = isOpen ? [] : [id]
    }
    setOpen(next)
  }

  const innerEl = (
    <div
      className={bordered ? undefined : className}
      style={{
        ...(bordered ? { clipPath: octagonInner(SHELL_CX) } : {}),
        overflow: 'hidden',
        background: surface2,
        ...(bordered ? {} : style),
      }}
      {...(bordered ? {} : rest)}
    >
      {items.map((item, i) => {
        const isOpen = open.includes(item.id)
        return (
          <div
            key={item.id}
            style={{
              borderTop: i > 0 ? `1px solid ${borderDefault}` : undefined,
            }}
          >
            <button
              type="button"
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              disabled={item.disabled}
              className="tkajui-focus"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                width: '100%',
                padding: '12px 16px',
                background: isOpen ? surface3 : 'transparent',
                border: 'none',
                color: textHigh,
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                opacity: item.disabled ? 0.5 : 1,
                transition: 'background 120ms',
              }}
            >
              <span>{item.title}</span>
              <span
                aria-hidden="true"
                style={{
                  color: textMid,
                  fontSize: '0.875rem',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 180ms ease',
                  display: 'inline-block',
                }}
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: '14px 16px', color: textMid, fontSize: '0.875rem', lineHeight: 1.5 }}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  if (!bordered) return innerEl

  // Octagon shell via border-trick — matches Button / Card / List corners.
  return (
    <div
      className={className}
      style={{
        background: borderDefault,
        clipPath: octagon(SHELL_CX),
        padding: 1,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {innerEl}
    </div>
  )
}
