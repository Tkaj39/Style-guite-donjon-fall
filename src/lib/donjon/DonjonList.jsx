/* ── DonjonList (donjon-fall-ui) ─────────────────────────────────────
   Game variant of List. Same items / sizes / dividers / interactive
   API as TkajUI List — visuals shift to the parchment palette:
   octagonal gold shell (border-trick) when bordered, goldDim row
   dividers, gold-tinted leading icon, 3-px gold left rail on the
   selected row (matches DonjonAccordion).
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../shared/octagon'
import { bg2, bg3, bgDeep, gold, goldDim, textHigh, textLow, textMid } from './tokens'

const SHELL_CX = 10

const SIZE_PADDING = {
  sm: '6px 10px',
  md: '10px 14px',
  lg: '14px 18px',
}

/**
 * @typedef {object} ListItem
 * @prop {string|number} [id]
 * @prop {React.ReactNode} [icon]
 * @prop {React.ReactNode} title
 * @prop {React.ReactNode} [description]
 * @prop {React.ReactNode} [trailing]
 * @prop {() => void} [onClick]
 * @prop {boolean} [disabled]
 * @prop {boolean} [selected]
 */

/**
 * @param {ListItem[]} items
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [dividers=true]
 * @param {boolean} [bordered=true]
 */
export default function DonjonList({
  items = [],
  size = 'md',
  dividers = true,
  bordered = true,
  className,
  style,
  ...rest
}) {
  const padding = SIZE_PADDING[size] ?? SIZE_PADDING.md

  const innerList = (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, background: bg2 }}>
      {items.map((item, i) => {
        const isInteractive = !!item.onClick && !item.disabled
        const Tag = isInteractive ? 'button' : 'div'
        return (
          <li
            key={item.id ?? i}
            style={{
              borderTop: dividers && i > 0 ? `1px solid ${goldDim}55` : undefined,
              borderLeft: item.selected ? `3px solid ${gold}` : `3px solid transparent`,
              transition: 'border-color 120ms',
            }}
          >
            <Tag
              type={isInteractive ? 'button' : undefined}
              onClick={isInteractive ? item.onClick : undefined}
              aria-pressed={isInteractive && item.selected ? true : undefined}
              disabled={isInteractive && item.disabled ? true : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding,
                background: item.selected ? bgDeep : 'transparent',
                border: 'none',
                color: item.disabled ? textLow : (item.selected ? gold : textHigh),
                fontSize: '0.875rem',
                fontWeight: item.selected ? 700 : 400,
                letterSpacing: item.selected ? 0.4 : undefined,
                textAlign: 'left',
                cursor: isInteractive ? 'pointer' : 'default',
                opacity: item.disabled ? 0.6 : 1,
                transition: 'background 80ms, color 80ms',
                fontFamily: 'inherit',
              }}
              onMouseEnter={isInteractive ? (e) => { e.currentTarget.style.background = item.selected ? bgDeep : bg3 } : undefined}
              onMouseLeave={isInteractive ? (e) => { e.currentTarget.style.background = item.selected ? bgDeep : 'transparent' } : undefined}
            >
              {item.icon != null && (
                <span aria-hidden="true" style={{ flex: '0 0 auto', color: item.selected ? gold : goldDim, display: 'inline-flex' }}>
                  {item.icon}
                </span>
              )}
              <span style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </span>
                {item.description != null && (
                  <span style={{ fontSize: '0.75rem', color: textMid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.description}
                  </span>
                )}
              </span>
              {item.trailing != null && (
                <span style={{ flex: '0 0 auto', color: textMid, fontSize: '0.875rem' }}>
                  {item.trailing}
                </span>
              )}
            </Tag>
          </li>
        )
      })}
    </ul>
  )

  if (!bordered) {
    return (
      <div className={className} style={{ background: bg2, ...style }} {...rest}>
        {innerList}
      </div>
    )
  }

  // Octagon shell via border-trick
  return (
    <div
      className={className}
      style={{
        background: gold,
        clipPath: octagon(SHELL_CX),
        padding: 1,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div style={{ background: bg2, clipPath: octagon(SHELL_CX) }}>
        {innerList}
      </div>
    </div>
  )
}
