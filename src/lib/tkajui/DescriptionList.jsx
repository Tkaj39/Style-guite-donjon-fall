/* ── DescriptionList (tkajui) ────────────────────────────────────────
   Key-value pair display using semantic <dl><dt><dd>. Use for
   character sheets, item details, summary panels, settings recap.

   Two layouts: 'inline' (dt next to dd, columns), 'stacked' (dt above dd).
   ─────────────────────────────────────────────────────────────────── */
import { textHigh, textMid, borderDefault } from './tokens'

/**
 * @typedef {object} DLItem
 * @prop {React.ReactNode} term         Key (rendered as <dt>).
 * @prop {React.ReactNode} description  Value (rendered as <dd>).
 */

/**
 * @param {DLItem[]} items
 * @param {'inline'|'stacked'} [layout='inline']
 * @param {boolean} [dividers=false]    Border between rows.
 * @param {string|number} [termWidth='40%']  Width of <dt> in inline layout.
 * @param {string|number} [gap=12]      Row gap in stacked, dt↔dd gap in inline.
 */
export default function DescriptionList({
  items = [],
  layout = 'inline',
  dividers = false,
  termWidth = '40%',
  gap = 12,
  className,
  style,
  ...rest
}) {
  if (layout === 'stacked') {
    return (
      <dl
        className={className}
        style={{
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap,
          ...style,
        }}
        {...rest}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              paddingTop: dividers && i > 0 ? gap : 0,
              borderTop: dividers && i > 0 ? `1px solid ${borderDefault}` : undefined,
            }}
          >
            <dt style={{ fontSize: '0.75rem', color: textMid, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {item.term}
            </dt>
            <dd style={{ margin: 0, color: textHigh, fontSize: '0.9375rem' }}>
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    )
  }

  // inline layout — 2-column grid
  return (
    <dl
      className={className}
      style={{
        margin: 0,
        display: 'grid',
        gridTemplateColumns: `${typeof termWidth === 'number' ? `${termWidth}px` : termWidth} 1fr`,
        rowGap: gap,
        columnGap: gap,
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => (
        <div key={i} style={{ display: 'contents' }}>
          <dt
            style={{
              color: textMid,
              fontSize: '0.875rem',
              paddingTop: dividers && i > 0 ? gap : 0,
              borderTop: dividers && i > 0 ? `1px solid ${borderDefault}` : undefined,
            }}
          >
            {item.term}
          </dt>
          <dd
            style={{
              margin: 0,
              color: textHigh,
              fontSize: '0.875rem',
              paddingTop: dividers && i > 0 ? gap : 0,
              borderTop: dividers && i > 0 ? `1px solid ${borderDefault}` : undefined,
            }}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  )
}
