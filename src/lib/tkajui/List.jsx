/* ── List (tkajui) ───────────────────────────────────────────────────
   Vertical list of items with optional leading icon, primary text,
   secondary text, trailing element, and dividers. Items can be
   clickable (each item renders as a button).

   Bordered mode wraps the list in the TkajUI octagon shell
   (border-trick) so the container matches Button / Card / Input
   corner language.

   For grid-based item layouts use Grid + Card.
   ─────────────────────────────────────────────────────────────────── */
import { octagon, octagonInner } from '../shared/octagon'
import { surface2, surface3, surface4, borderDefault, textHigh, textMid, textLow } from './tokens'

const SHELL_CX = 8

const SIZE_PADDING = {
  sm: '6px 10px',
  md: '10px 14px',
  lg: '14px 18px',
}

/**
 * @typedef {object} ListItem
 * @prop {string|number} [id]
 * @prop {React.ReactNode} [icon]       Leading slot.
 * @prop {React.ReactNode} title        Primary text.
 * @prop {React.ReactNode} [description]  Secondary text below title.
 * @prop {React.ReactNode} [trailing]   Right slot (badge, chevron, value).
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
export default function List({
  items = [],
  size = 'md',
  dividers = true,
  bordered = true,
  className,
  style,
  ...rest
}) {
  const padding = SIZE_PADDING[size] ?? SIZE_PADDING.md

  const listEl = (
    <ul
      className={bordered ? undefined : className}
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        background: surface2,
        ...(bordered ? { clipPath: octagonInner(SHELL_CX) } : {}),
        overflow: 'hidden',
        ...(bordered ? {} : style),
      }}
      {...(bordered ? {} : rest)}
    >
      {items.map((item, i) => {
        const isInteractive = !!item.onClick && !item.disabled
        const Tag = isInteractive ? 'button' : 'div'
        return (
          <li
            key={item.id ?? i}
            style={{
              borderTop: dividers && i > 0 ? `1px solid ${borderDefault}` : undefined,
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
                background: item.selected ? surface4 : 'transparent',
                border: 'none',
                color: item.disabled ? textLow : textHigh,
                fontSize: '0.875rem',
                textAlign: 'left',
                cursor: isInteractive ? 'pointer' : 'default',
                opacity: item.disabled ? 0.6 : 1,
                transition: 'background 80ms',
                fontFamily: 'inherit',
              }}
              onMouseEnter={isInteractive ? (e) => { e.currentTarget.style.background = surface3 } : undefined}
              onMouseLeave={isInteractive ? (e) => { e.currentTarget.style.background = item.selected ? surface4 : 'transparent' } : undefined}
            >
              {item.icon != null && (
                <span aria-hidden="true" style={{ flex: '0 0 auto', color: textMid, fontSize: '1rem', display: 'inline-flex' }}>
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

  if (!bordered) return listEl

  // Octagon shell via border-trick — outer paints the 1 px border, inner
  // (the <ul> above) is clipped one px tighter so the edge shows evenly.
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
      {listEl}
    </div>
  )
}
