/* ── DonjonSlider ─────────────────────────────────────────────────────────
   Herní slider — zlatý thumb, tmavá drážka, donjon paleta.
   API identické s TkajUI Slider, jiná vizuální estetika.
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, goldDim, goldMid,
  bgDeep,
  textMid, textFaint,
} from './tokens'

const SIZES = {
  sm: { trackH: 4,  thumbD: 14, radius: 2, fontSize: '0.75rem'   },
  md: { trackH: 6,  thumbD: 18, radius: 3, fontSize: '0.8125rem' },
  lg: { trackH: 10, thumbD: 24, radius: 4, fontSize: '0.875rem'  },
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
}) {
  const s    = SIZES[size] ?? SIZES.md
  const pct  = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const disp = formatValue ? formatValue(value) : value

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

        {/* Diamond thumb */}
        <div style={{
          position: 'absolute',
          left: `${pct}%`,
          transform: 'translateX(-50%) rotate(45deg)',
          width:  s.thumbD * 0.65,
          height: s.thumbD * 0.65,
          background: `linear-gradient(135deg, ${goldMid} 0%, ${gold} 100%)`,
          boxShadow: `0 0 8px ${gold}66, 0 2px 4px rgba(0,0,0,0.5)`,
          border: `1px solid ${gold}88`,
          pointerEvents: 'none',
          transition: 'left 0.05s',
        }} />

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
        <span style={{ fontSize: '0.625rem', color: textFaint, letterSpacing: '0.05em' }}>
          {formatValue ? formatValue(min) : min}
        </span>
        <span style={{ fontSize: '0.625rem', color: textFaint, letterSpacing: '0.05em' }}>
          {formatValue ? formatValue(max) : max}
        </span>
      </div>
    </div>
  )
}
