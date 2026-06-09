/* ── DonjonAccordion (donjon-fall-ui) ────────────────────────────────
   Game variant of Accordion. Same single/multi expand behavior and
   controlled/uncontrolled API as TkajUI Accordion — only the visuals
   change: bg2/bg3 instead of cool surface2/surface3, gold accent on
   the header title and on the chevron, goldDim divider lines, a
   3-px gold left rail on the open section.
   ─────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import { bg2, bg3, bgDeep, gold, goldDim, borderDefault, textHigh, textMid } from './tokens'
import { octagon } from '../shared/octagon'
import { ChevronDownIcon } from '../tkajui/Icons'

// Octagon corner-cut size on the outer shell — matches DonjonCard / DonjonModal
// in feel. Bigger than DonjonButton (cx=12) because the accordion is a card-
// sized container.
const SHELL_CX = 12

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

  // Outer / inner border-trick + octagonal corner cut. With `bordered`
  // we paint a 1-px gold edge around the whole accordion via the outer
  // wrapper background and clip both layers with octagon(SHELL_CX) so
  // the corners pick up the donjon silhouette.
  // When bordered=false, only the inner panel is rendered — no clip,
  // no edge — so callers can drop the accordion into an existing
  // octagonal shell without doubled corners.
  const innerContent = (
    <>
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
    </>
  )

  if (!bordered) {
    return (
      <div
        className={className}
        style={{ background: bg2, ...style }}
        {...rest}
      >
        {innerContent}
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        background: gold,            // outer = border color
        clipPath: octagon(SHELL_CX),
        padding: 1,                  // border thickness
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          background: bg2,           // inner = fill
          clipPath: octagon(SHELL_CX),
          // inner-item dividers still read because the panel itself stays bg2
        }}
      >
        {innerContent}
      </div>
    </div>
  )
}
