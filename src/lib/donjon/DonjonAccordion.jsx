/* ── DonjonAccordion (donjon-fall-ui) ────────────────────────────────
   Game variant of Accordion. Same single/multi expand behavior and
   controlled/uncontrolled API as TkajUI Accordion — only the visuals
   change: bg2/bg3 instead of cool surface2/surface3, gold accent on
   the header title and on the chevron, goldDim divider lines, a
   3-px gold left rail on the open section.
   ─────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import { bg2, bg3, bgDeep, gold, goldDim, borderDefault, textHigh, textMid } from './tokens'
import { ChevronDownIcon } from '../tkajui/Icons'

/**
 * @param {Array<{id: string|number, title: ReactNode, content: ReactNode, disabled?: boolean}>} items
 * @param {boolean} [multi=false]                 Allow multiple open at once.
 * @param {Array<string|number>|null} [value]     Controlled: list of open ids.
 *                                                In single mode, only the first is used.
 * @param {(next: Array) => void} [onChange]
 * @param {Array<string|number>} [defaultValue=[]]
 * @param {boolean} [bordered=true]
 */
export default function DonjonAccordion({
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

  return (
    <div
      className={className}
      style={{
        border: bordered ? `1px solid ${goldDim}` : undefined,
        borderRadius: 4,
        overflow: 'hidden',
        background: bg2,
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => {
        const isOpen = open.includes(item.id)
        return (
          <div
            key={item.id}
            style={{
              borderTop: i > 0 ? `1px solid ${borderDefault}` : undefined,
              borderLeft: isOpen ? `3px solid ${gold}` : `3px solid transparent`,
              transition: 'border-color 120ms',
            }}
          >
            <button
              type="button"
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              disabled={item.disabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                width: '100%',
                padding: '12px 16px',
                background: isOpen ? bg3 : 'transparent',
                border: 'none',
                color: isOpen ? gold : textHigh,
                fontSize: '0.9375rem',
                fontWeight: 700,
                letterSpacing: 0.4,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                opacity: item.disabled ? 0.5 : 1,
                transition: 'background 120ms, color 120ms',
              }}
            >
              <span>{item.title}</span>
              <span
                aria-hidden="true"
                style={{
                  color: isOpen ? gold : goldDim,
                  display: 'inline-flex',
                  alignItems: 'center',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 180ms ease, color 120ms',
                }}
              >
                <ChevronDownIcon width={14} height={14} />
              </span>
            </button>
            {isOpen && (
              <div style={{
                padding: '14px 16px',
                background: bgDeep,
                color: textMid,
                fontSize: '0.875rem',
                lineHeight: 1.55,
              }}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
