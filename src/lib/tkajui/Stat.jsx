/* ── Stat (tkajui) ───────────────────────────────────────────────────
   Label + big number, optionally a delta indicator (▲ +12 / ▼ −3).
   Generic counterpart of donjon's NumericDisplay. Use for dashboard
   tiles, summary cards, KPI rows.

   For animated counters, increments, and flashes — use NumericDisplay
   from donjon-fall-ui.
   ─────────────────────────────────────────────────────────────────── */
import { textHigh, textMid, textLow, successColor, dangerColor } from './tokens'

const SIZES = {
  sm: { value: '1.25rem', label: '0.7rem',  delta: '0.7rem'  },
  md: { value: '1.75rem', label: '0.75rem', delta: '0.75rem' },
  lg: { value: '2.5rem',  label: '0.8rem',  delta: '0.8125rem' },
  xl: { value: '3.5rem',  label: '0.875rem', delta: '0.875rem' },
}

/**
 * @param {React.ReactNode} label
 * @param {React.ReactNode} value
 * @param {number} [delta]            Signed change. Positive = up (green), negative = down (red).
 * @param {string} [deltaLabel]       Override formatted delta (e.g. "+12 %").
 * @param {boolean} [invertDelta=false]  Treat negative as good (e.g. for "errors" stat).
 * @param {React.ReactNode} [hint]    Small text under value/delta.
 * @param {React.ReactNode} [icon]    Leading icon next to the label.
 * @param {'sm'|'md'|'lg'|'xl'} [size='md']
 * @param {'left'|'center'|'right'} [align='left']
 */
export default function Stat({
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

  let deltaColor = textMid
  let arrow = null
  if (hasDelta && delta != null) {
    const isUp = delta > 0
    const positive = invertDelta ? !isUp : isUp
    if (delta !== 0) {
      deltaColor = positive ? successColor : dangerColor
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: textMid, fontSize: s.label, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {icon != null && <span aria-hidden="true">{icon}</span>}
        <span>{label}</span>
      </div>
      <div style={{ color: textHigh, fontSize: s.value, fontWeight: 700, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
      {hasDelta && (
        <div style={{ color: deltaColor, fontSize: s.delta, display: 'flex', alignItems: 'center', gap: 3, fontVariantNumeric: 'tabular-nums' }}>
          {arrow && <span aria-hidden="true">{arrow}</span>}
          <span>{formattedDelta}</span>
        </div>
      )}
      {hint != null && (
        <div style={{ color: textLow, fontSize: '0.75rem' }}>{hint}</div>
      )}
    </div>
  )
}
