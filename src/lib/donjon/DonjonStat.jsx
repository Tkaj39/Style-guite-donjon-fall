/* ── DonjonStat (donjon-fall-ui) ─────────────────────────────────────
   Game variant of Stat. Same label / value / delta / hint API and
   sizes as the TkajUI Stat — visuals shift to the donjon palette:
   gold uppercase label, gold value (parchment-numeral feel), gain/
   danger delta colors from the donjon palette, goldDim hint.

   For full animated game counters (combat damage, VP gain flash)
   use NumericDisplay instead. DonjonStat is a static KPI tile.
   ─────────────────────────────────────────────────────────────────── */
import { gold, goldDim, goldMid, gainColor, dangerColor } from './tokens'

const SIZES = {
  sm: { value: '1.25rem', label: '0.7rem',  delta: '0.7rem'  },
  md: { value: '1.75rem', label: '0.75rem', delta: '0.75rem' },
  lg: { value: '2.5rem',  label: '0.8rem',  delta: '0.8125rem' },
  xl: { value: '3.5rem',  label: '0.875rem', delta: '0.875rem' },
}

/**
 * @param {React.ReactNode} label
 * @param {React.ReactNode} value
 * @param {number} [delta]            Signed change.
 * @param {string} [deltaLabel]       Override formatted delta.
 * @param {boolean} [invertDelta=false]
 * @param {React.ReactNode} [hint]
 * @param {React.ReactNode} [icon]
 * @param {'sm'|'md'|'lg'|'xl'} [size='md']
 * @param {'left'|'center'|'right'} [align='left']
 */
export default function DonjonStat({
  label,
  value,
  delta,
  deltaLabel,
  invertDelta = false,
  hint,
  icon,
  size = 'md',
  align = 'left',
  className,
  style,
  ...rest
}) {
  const s = SIZES[size] ?? SIZES.md
  const hasDelta = delta != null || deltaLabel != null

  let deltaColor = goldMid
  let arrow = null
  if (hasDelta && delta != null) {
    const isUp = delta > 0
    const positive = invertDelta ? !isUp : isUp
    if (delta !== 0) {
      deltaColor = positive ? gainColor : dangerColor
      arrow = isUp ? '▲' : '▼'
    }
  }

  const formattedDelta = deltaLabel ?? (delta > 0 ? `+${delta}` : `${delta}`)

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        gap: 4,
        textAlign: align,
        ...style,
      }}
      {...rest}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: goldMid,
        fontSize: s.label,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 700,
      }}>
        {icon != null && <span aria-hidden="true" style={{ color: gold, display: 'inline-flex' }}>{icon}</span>}
        <span>{label}</span>
      </div>
      <div style={{
        color: gold,
        fontSize: s.value,
        fontWeight: 700,
        lineHeight: 1.1,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: 0.4,
      }}>
        {value}
      </div>
      {hasDelta && (
        <div style={{
          color: deltaColor,
          fontSize: s.delta,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {arrow && <span aria-hidden="true">{arrow}</span>}
          <span>{formattedDelta}</span>
        </div>
      )}
      {hint != null && (
        <div style={{ color: goldDim, fontSize: '0.75rem' }}>{hint}</div>
      )}
    </div>
  )
}
