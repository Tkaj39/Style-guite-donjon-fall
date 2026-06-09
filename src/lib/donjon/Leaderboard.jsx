/* ── Leaderboard (donjon-fall-ui) ────────────────────────────────────
   Ranked list — usually post-match or all-time. Each row shows rank,
   name, score, and optional metadata. Top 3 get medal tints
   (gold/silver/bronze). Highlight the current player with `current`.

   For live in-game player state use Scoreboard.
   ─────────────────────────────────────────────────────────────────── */
import { bg2, bg3, gold, textHigh, textMid, textLow, borderDefault } from './tokens'
import { TrophyIcon } from './icons'

// Medal tint colors — gold uses the donjon palette token; silver / bronze
// are leaderboard-only colors without a broader token analog. The medal
// glyph itself is a single TrophyIcon tinted via currentColor — visually
// distinct ranks come from the row order + the color tint.
const MEDAL = {
  1: { color: gold,      sr: 'Gold medal' },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- medal silver, no token analog
  2: { color: '#C0C0CC', sr: 'Silver medal' },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- medal bronze, no token analog
  3: { color: '#B87333', sr: 'Bronze medal' },
}

/**
 * @typedef {object} LeaderboardEntry
 * @prop {string} id
 * @prop {string} name
 * @prop {number} score
 * @prop {React.ReactNode} [meta]    Right-aligned metadata (date, time, level).
 * @prop {boolean} [current]
 * @prop {string} [avatar]           Avatar URL.
 */

/**
 * @param {LeaderboardEntry[]} entries
 * @param {number} [startRank=1]
 * @param {React.ReactNode} [title]
 */
export default function Leaderboard({
  entries = [],
  startRank = 1,
  title,
  className,
  style,
  ...rest
}) {
  return (
    <div
      className={className}
      style={{
        background: bg2,
        border: `1px solid ${borderDefault}`,
        borderRadius: 6,
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {title && (
        <div style={{
          padding: '10px 14px',
          color: gold,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          fontWeight: 700,
          borderBottom: `1px solid ${borderDefault}`,
        }}>
          {title}
        </div>
      )}
      <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {entries.map((e, i) => {
          const rank = startRank + i
          const medal = MEDAL[rank]
          return (
            <li
              key={e.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                background: e.current ? bg3 : 'transparent',
                borderTop: i > 0 ? `1px solid ${borderDefault}` : undefined,
                color: textHigh,
              }}
            >
              <span
                aria-label={medal ? `Rank ${rank} — ${medal.sr}` : `Rank ${rank}`}
                style={{
                  width: 36,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: medal ? medal.color : textLow,
                }}
              >
                {medal ? <TrophyIcon width={22} height={22} /> : `#${rank}`}
              </span>
              {e.avatar && (
                <img
                  src={e.avatar}
                  alt=""
                  width={28}
                  height={28}
                  style={{ borderRadius: '50%', objectFit: 'cover', flex: '0 0 auto', border: `1px solid ${borderDefault}` }}
                />
              )}
              <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {e.name}
                {e.current && <span style={{ marginLeft: 6, fontSize: '0.7rem', color: gold }}>(you)</span>}
              </span>
              {e.meta != null && (
                <span style={{ color: textMid, fontSize: '0.75rem', fontVariantNumeric: 'tabular-nums' }}>{e.meta}</span>
              )}
              <span style={{ fontWeight: 700, color: gold, fontVariantNumeric: 'tabular-nums', minWidth: 60, textAlign: 'right' }}>
                {e.score.toLocaleString()}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
