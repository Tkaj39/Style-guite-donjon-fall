/* ── Scoreboard (donjon-fall-ui) ─────────────────────────────────────
   Multi-player score grid. Each player has a color, name, score, and
   optional secondary stats. Renders horizontally (compact) or as a
   table.

   For ranked leaderboards (after the match) use Leaderboard.
   Scoreboard is the live in-game state.
   ─────────────────────────────────────────────────────────────────── */
import { bg2, bg3, gold, textHigh, textMid, textLow, borderDefault } from './tokens'

/**
 * @typedef {object} ScoreboardPlayer
 * @prop {string} id
 * @prop {string} name
 * @prop {number} score
 * @prop {string} [color]            Player accent color.
 * @prop {Array<{label: string, value: React.ReactNode}>} [stats]
 * @prop {boolean} [current]         Highlight as the local player.
 * @prop {boolean} [eliminated]
 */

/**
 * @param {ScoreboardPlayer[]} players
 * @param {'compact'|'table'} [layout='compact']
 * @param {React.ReactNode} [title]
 */
export default function Scoreboard({
  players = [],
  layout = 'compact',
  title,
  className,
  style,
  ...rest
}) {
  if (layout === 'table') {
    return (
      <div
        className={className}
        style={{
          background: bg2,
          border: `1px solid ${borderDefault}`,
          borderRadius: 6,
          padding: 12,
          ...style,
        }}
        {...rest}
      >
        {title && <div style={titleStyle}>{title}</div>}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ color: textMid, textAlign: 'left' }}>
              <th style={{ padding: 6, fontWeight: 600 }}>Player</th>
              <th style={{ padding: 6, fontWeight: 600, textAlign: 'right' }}>Score</th>
              {players[0]?.stats?.map((s) => (
                <th key={s.label} style={{ padding: 6, fontWeight: 600, textAlign: 'right' }}>{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr
                key={p.id}
                style={{
                  color: p.eliminated ? textLow : textHigh,
                  background: p.current ? bg3 : 'transparent',
                  opacity: p.eliminated ? 0.6 : 1,
                }}
              >
                <td style={{ padding: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span aria-hidden="true" style={{
                      display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                      background: p.color ?? gold, border: `1px solid ${borderDefault}`,
                    }} />
                    <span style={{ textDecoration: p.eliminated ? 'line-through' : 'none' }}>{p.name}</span>
                    {p.current && <span style={{ fontSize: '0.7rem', color: gold }}>(you)</span>}
                  </span>
                </td>
                <td style={{ padding: 6, textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{p.score}</td>
                {p.stats?.map((s, i) => (
                  <td key={i} style={{ padding: 6, textAlign: 'right', color: textMid, fontVariantNumeric: 'tabular-nums' }}>{s.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // compact: horizontal player chips
  return (
    <div
      className={className}
      style={{
        background: bg2,
        border: `1px solid ${borderDefault}`,
        borderRadius: 6,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {title && <div style={titleStyle}>{title}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {players.map(p => (
          <div
            key={p.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              background: p.current ? bg3 : 'transparent',
              border: `1px solid ${p.current ? (p.color ?? gold) : borderDefault}`,
              borderLeft: `3px solid ${p.color ?? gold}`,
              borderRadius: 4,
              color: p.eliminated ? textLow : textHigh,
              opacity: p.eliminated ? 0.6 : 1,
              fontSize: '0.875rem',
              minWidth: 130,
            }}
          >
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: p.eliminated ? 'line-through' : 'none' }}>
              {p.name}
              {p.current && <span style={{ fontSize: '0.65rem', color: gold, marginLeft: 4 }}>(you)</span>}
            </span>
            <span style={{ color: p.color ?? gold, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{p.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const titleStyle = {
  color: gold,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: 0.6,
  fontWeight: 700,
  marginBottom: 4,
}
