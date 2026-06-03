/* ── LevelUp (donjon-fall-ui) ────────────────────────────────────────
   Celebratory animation when the player gains a level. Big pop-in of
   the new level number with a gold glow ring, optional list of stat
   gains (HP +5 / MP +2 / …), optional Continue button.

   Renders inline — pair with a portal / backdrop at the call site if
   you want it as a full-screen takeover.
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../../utils/octagon'
import { bg2, bg3, gold, goldDim, textHigh, textMid, gainColor } from './tokens'

/**
 * @typedef {object} StatGain
 * @prop {string} label
 * @prop {number} value     Positive = gain.
 * @prop {string} [icon]
 */

/**
 * @param {number} level                  New level number to show big.
 * @param {React.ReactNode} [title='Level Up!']
 * @param {React.ReactNode} [subtitle]    Smaller text under the level.
 * @param {StatGain[]} [stats]
 * @param {React.ReactNode} [actions]     Slot under the panel (Continue button).
 */
export default function LevelUp({
  level,
  title = 'Level Up!',
  subtitle,
  stats = [],
  actions,
  className,
  style,
  ...rest
}) {
  const cx = 16
  return (
    <div
      role="dialog"
      aria-label="Level up"
      className={className}
      style={{
        background: gold,
        clipPath: octagon(cx),
        padding: 2,
        boxSizing: 'border-box',
        animation: 'levelUpGlow 2000ms ease-in-out infinite',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          background: bg2,
          clipPath: octagon(cx),
          padding: '28px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          minWidth: 260,
        }}
      >
        <div style={{
          color: gold,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          fontWeight: 700,
        }}>
          {title}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          color: gold,
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
          animation: 'levelUpPop 600ms ease-out',
        }}>
          <span style={{ fontSize: '1.25rem', color: goldDim, textTransform: 'uppercase' }}>Lvl</span>
          <span style={{ fontSize: '4.5rem', lineHeight: 1 }}>{level}</span>
        </div>
        {subtitle && (
          <div style={{ color: textMid, fontSize: '0.875rem', textAlign: 'center' }}>
            {subtitle}
          </div>
        )}
        {stats.length > 0 && (
          <ul style={{
            margin: '6px 0 0',
            padding: '12px 14px',
            listStyle: 'none',
            background: bg3,
            border: `1px solid ${goldDim}`,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: 200,
          }}>
            {stats.map((s, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: '0.875rem', color: textHigh }}>
                <span style={{ color: textMid }}>
                  {s.icon && <span aria-hidden="true" style={{ marginRight: 6 }}>{s.icon}</span>}
                  {s.label}
                </span>
                <span style={{ color: s.value > 0 ? gainColor : textMid, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {s.value > 0 ? `+${s.value}` : s.value}
                </span>
              </li>
            ))}
          </ul>
        )}
        {actions && (
          <div style={{ marginTop: 10 }}>{actions}</div>
        )}
      </div>
    </div>
  )
}
