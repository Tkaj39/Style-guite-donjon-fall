/* ── Timeline (donjon-fall-ui) ───────────────────────────────────────
   Vertical sequence of events with a connecting line. Each event has
   a turn label, icon dot, title, and optional description. Use for
   turn history, quest log, autopsies.

   Renders top-to-bottom; pass items in chronological or reverse-chrono
   order yourself.
   ─────────────────────────────────────────────────────────────────── */
import { bg2, gold, goldDim, borderDefault, textHigh, textMid, textLow } from './tokens'

/**
 * @typedef {object} TimelineEvent
 * @prop {string} id
 * @prop {React.ReactNode} [time]    Left-rail label (turn #, time-of-day).
 * @prop {React.ReactNode} [icon]    Marker glyph (defaults to a dot).
 * @prop {string} [color]            Marker color override.
 * @prop {React.ReactNode} title
 * @prop {React.ReactNode} [description]
 * @prop {boolean} [current]
 */

/**
 * @param {TimelineEvent[]} items
 * @param {boolean} [bordered=true]
 */
export default function Timeline({
  items = [],
  bordered = true,
  className,
  style,
  ...rest
}) {
  return (
    <ol
      className={className}
      style={{
        margin: 0,
        padding: bordered ? 14 : 0,
        listStyle: 'none',
        background: bordered ? bg2 : 'transparent',
        border: bordered ? `1px solid ${borderDefault}` : undefined,
        borderRadius: bordered ? 6 : undefined,
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => {
        const isLast = i === items.length - 1
        const dotColor = it.color ?? gold
        return (
          <li
            key={it.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 24px 1fr',
              gap: 10,
              position: 'relative',
              minHeight: 36,
            }}
          >
            <div style={{
              color: textLow,
              fontSize: '0.75rem',
              textAlign: 'right',
              paddingTop: 2,
              fontVariantNumeric: 'tabular-nums',
              alignSelf: 'start',
            }}>
              {it.time}
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* connecting line */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 18,
                    bottom: -10,
                    width: 2,
                    background: goldDim,
                  }}
                />
              )}
              {/* dot */}
              <span
                aria-hidden="true"
                style={{
                  position: 'relative',
                  marginTop: 2,
                  width: it.current ? 14 : 10,
                  height: it.current ? 14 : 10,
                  borderRadius: '50%',
                  background: it.icon ? 'transparent' : dotColor,
                  border: `2px solid ${dotColor}`,
                  boxShadow: it.current ? `0 0 8px ${dotColor}` : 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  color: dotColor,
                  zIndex: 1,
                }}
              >
                {it.icon}
              </span>
            </div>
            <div style={{ paddingBottom: 14, color: textHigh, fontSize: '0.875rem' }}>
              <div style={{ fontWeight: it.current ? 700 : 500, color: it.current ? gold : textHigh }}>
                {it.title}
              </div>
              {it.description && (
                <div style={{ color: textMid, fontSize: '0.75rem', marginTop: 2, lineHeight: 1.5 }}>
                  {it.description}
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
