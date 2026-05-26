/* ── DonjonSlider ─────────────────────────────────────────────────────────
   Herní slider — zlatý thumb, tmavá drážka, donjon paleta.

   Rozšíření:
     - ticks: počet nebo pole hodnot (vizuální markery na trati)
     - thumbShape: 'diamond' (default) | 'circle' | 'octagon'
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, goldDim, goldMid,
  bgDeep,
  textMid, textLow,
} from './tokens'
import { octagon } from '../../utils/octagon'

const SIZES = {
  xs: { trackH: 3,  thumbD: 10, radius: 1, fontSize: '0.6875rem' },
  sm: { trackH: 4,  thumbD: 14, radius: 2, fontSize: '0.75rem'   },
  md: { trackH: 6,  thumbD: 18, radius: 3, fontSize: '0.8125rem' },
  lg: { trackH: 10, thumbD: 24, radius: 4, fontSize: '0.875rem'  },
}

/* Resolve ticks prop: number → pole [step, step*2, ...]; array passthrough */
function resolveTicks(ticks, min, max) {
  if (ticks == null || ticks === false) return []
  if (Array.isArray(ticks)) return ticks
  if (typeof ticks === 'number' && ticks > 0) {
    const count = Math.floor(ticks)
    const step = (max - min) / count
    return Array.from({ length: count + 1 }, (_, i) => min + i * step)
  }
  return []
}

/* Thumb rendering podle shape */
function Thumb({ pct, shape, size: thumbD, disabled }) {
  const baseStyle = {
    position: 'absolute',
    left: `${pct}%`,
    pointerEvents: 'none',
    transition: 'left 0.05s',
    boxShadow: `0 0 8px ${gold}66, 0 2px 4px rgba(0,0,0,0.5)`,
    background: `linear-gradient(135deg, ${goldMid} 0%, ${gold} 100%)`,
    border: `1px solid ${gold}88`,
  }
  if (shape === 'circle') {
    return (
      <div style={{
        ...baseStyle,
        width: thumbD, height: thumbD,
        transform: 'translateX(-50%)',
        borderRadius: '50%',
      }} />
    )
  }
  if (shape === 'octagon') {
    const d = thumbD * 0.85
    return (
      <div style={{
        ...baseStyle,
        width: d, height: d,
        transform: 'translateX(-50%)',
        clipPath: octagon(d * 0.25),
      }} />
    )
  }
  // diamond (default)
  return (
    <div style={{
      ...baseStyle,
      width:  thumbD * 0.65,
      height: thumbD * 0.65,
      transform: 'translateX(-50%) rotate(45deg)',
    }} />
  )
}

export default function DonjonSlider({
  value        = 0,
  onChange,
  min          = 0,
  max          = 100,
  step         = 1,
  size         = 'md',
  label,
  showValue    = false,
  disabled     = false,
  formatValue,
  ticks,                       // number nebo pole — vizuální markery na trati
  thumbShape   = 'diamond',    // 'diamond' | 'circle' | 'octagon'
}) {
  const s    = SIZES[size] ?? SIZES.md
  const pct  = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const disp = formatValue ? formatValue(value) : value
  const tickValues = resolveTicks(ticks, min, max)

  return (
    <div style={{ width: '100%', opacity: disabled ? 0.45 : 1 }}>

      {/* Label row */}
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          {label && (
            <span style={{ fontSize: s.fontSize, color: textMid, letterSpacing: '0.06em', fontWeight: 600, textTransform: 'uppercase' }}>
              {label}
            </span>
          )}
          {showValue && (
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: gold, letterSpacing: '0.06em', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>
              {disp}
            </span>
          )}
        </div>
      )}

      {/* Track + thumb */}
      <div style={{ position: 'relative', height: s.thumbD, display: 'flex', alignItems: 'center' }}>

        {/* Background track */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          height: s.trackH, background: bgDeep,
          borderRadius: s.radius,
          border: `1px solid ${goldDim}`,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {/* Filled portion */}
          <div style={{
            height: '100%', width: `${pct}%`,
            background: `linear-gradient(90deg, ${goldDim} 0%, ${gold} 100%)`,
            boxShadow: `0 0 6px ${gold}44`,
            transition: 'width 0.05s',
          }} />
        </div>

        {/* Tick marks — pozicované nad trackem podél délky */}
        {tickValues.length > 0 && tickValues.map((tv, i) => {
          const tickPct = ((tv - min) / (max - min)) * 100
          const isFilled = tickPct <= pct
          return (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: `${tickPct}%`,
                top: '50%',
                width: 1,
                height: s.trackH + 6,
                transform: 'translate(-50%, -50%)',
                background: isFilled ? gold : goldDim,
                opacity: isFilled ? 0.9 : 0.55,
                pointerEvents: 'none',
              }}
            />
          )
        })}

        {/* Thumb */}
        <Thumb pct={pct} shape={thumbShape} size={s.thumbD} disabled={disabled} />

        {/* Native input (invisible overlay) */}
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          disabled={disabled}
          onChange={e => !disabled && onChange?.(Number(e.target.value))}
          aria-label={label}
          aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
            margin: 0,
          }}
        />
      </div>

      {/* Min/max labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.05em' }}>
          {formatValue ? formatValue(min) : min}
        </span>
        <span style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.05em' }}>
          {formatValue ? formatValue(max) : max}
        </span>
      </div>
    </div>
  )
}
