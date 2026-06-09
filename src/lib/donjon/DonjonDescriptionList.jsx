/* ── DonjonDescriptionList (donjon-fall-ui) ──────────────────────────
   Game variant of DescriptionList. Same items / layout / dividers /
   termWidth / gap API as the TkajUI version — visuals shift to the
   donjon palette: gold uppercase terms (parchment header feel),
   textHigh descriptions, goldDim row dividers when enabled.

   Used inside DonjonCard for character sheets, item details, summary
   panels. No outer shell — caller controls the container.
   ─────────────────────────────────────────────────────────────────── */
import { gold, goldDim, textHigh } from './tokens'

/**
 * @typedef {object} DLItem
 * @prop {React.ReactNode} term
 * @prop {React.ReactNode} description
 */

/**
 * @param {DLItem[]} items
 * @param {'inline'|'stacked'} [layout='inline']
 * @param {boolean} [dividers=false]    Border between rows.
 * @param {string|number} [termWidth='40%']
 * @param {string|number} [gap=12]
 */
export default function DonjonDescriptionList({
  items = [],
  layout = 'inline',
  dividers = false,
  termWidth = '40%',
  gap = 12,
  className,
  style,
  ...rest
}) {
  // Common parchment-style typography tokens
  const TERM_STYLE = {
    color: gold,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 700,
  }
  const DD_STYLE = {
    margin: 0,
    color: textHigh,
    fontSize: '0.9375rem',
  }

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
              borderTop: dividers && i > 0 ? `1px solid ${goldDim}55` : undefined,
            }}
          >
            <dt style={{ ...TERM_STYLE, marginBottom: 2 }}>
              {item.term}
            </dt>
            <dd style={DD_STYLE}>
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    )
  }

  // Inline — 2-column grid
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
              ...TERM_STYLE,
              alignSelf: 'center',
              paddingTop: dividers && i > 0 ? gap : 0,
              borderTop: dividers && i > 0 ? `1px solid ${goldDim}55` : undefined,
            }}
          >
            {item.term}
          </dt>
          <dd
            style={{
              ...DD_STYLE,
              fontSize: '0.875rem',
              paddingTop: dividers && i > 0 ? gap : 0,
              borderTop: dividers && i > 0 ? `1px solid ${goldDim}55` : undefined,
            }}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  )
}
