/* ── Slider ─────────────────────────────────────────────────────────────
   Vlastní range input — nativní <input type="range"> překryje průhlednou
   vrstvou náš vizuál, takže drag/kláves chování dostaneme zadarmo.
   Navazuje vizuálně na ProgressBar (gradient, glow, stejné varianty).
   ─────────────────────────────────────────────────────────────────────── */

const VARIANTS = {
  default: { fill: 'linear-gradient(90deg,#FFC183 0%,#8F7458 100%)', thumb: '#B8956A', glow: '#B8956A', border: '#8F745440' },
  success: { fill: 'linear-gradient(90deg,#60C070 0%,#40A055 100%)', thumb: '#40A055', glow: '#40A055', border: '#40A05540' },
  danger:  { fill: 'linear-gradient(90deg,#E06060 0%,#C04040 100%)', thumb: '#C04040', glow: '#C04040', border: '#C0404040' },
  warning: { fill: 'linear-gradient(90deg,#FFD580 0%,#C08040 100%)', thumb: '#C08040', glow: '#C08040', border: '#C0804040' },
  info:    { fill: 'linear-gradient(90deg,#60A0E0 0%,#4080C0 100%)', thumb: '#4080C0', glow: '#4080C0', border: '#4080C040' },
}

const SIZES = {
  sm: { trackH: 4,  thumbD: 14, radius: 2, fontSize: '0.75rem' },
  md: { trackH: 6,  thumbD: 18, radius: 3, fontSize: '0.8125rem' },
  lg: { trackH: 10, thumbD: 24, radius: 5, fontSize: '0.875rem' },
}

export default function Slider({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  variant = 'default',
  label,
  showValue = false,
  disabled = false,
  formatValue,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.default
  const s = SIZES[size] ?? SIZES.md

  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const displayValue = formatValue ? formatValue(value) : value

  return (
    <div style={{ width: '100%', opacity: disabled ? 0.45 : 1 }}>

      {/* Header row */}
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          {label && (
            <span style={{ fontSize: s.fontSize, color: '#8F9CB3', letterSpacing: '0.04em' }}>{label}</span>
          )}
          {showValue && (
            <span style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
              color: '#B8956A', marginLeft: 'auto',
            }}>
              {displayValue}
            </span>
          )}
        </div>
      )}

      {/* Track wrapper */}
      <div style={{ position: 'relative', height: s.thumbD, display: 'flex', alignItems: 'center' }}>

        {/* Visual track */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          height: s.trackH,
          background: '#12102A',
          borderRadius: s.radius,
          border: `1px solid ${v.border}`,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {/* Fill */}
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: v.fill,
            borderRadius: s.radius,
            transition: 'width 0.05s',
          }} />
        </div>

        {/* Visual thumb */}
        <div style={{
          position: 'absolute',
          left: `${pct}%`,
          transform: 'translateX(-50%)',
          width: s.thumbD,
          height: s.thumbD,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${v.thumb}EE, ${v.thumb}88)`,
          border: `2px solid ${v.thumb}`,
          boxShadow: `0 0 8px ${v.glow}66, 0 2px 4px rgba(0,0,0,0.4)`,
          pointerEvents: 'none',
          transition: 'left 0.05s',
        }} />

        {/* Native input — transparent, handles interaction */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={e => onChange?.(Number(e.target.value))}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
            margin: 0,
          }}
        />
      </div>

      {/* Min / max hints */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: '0.625rem', color: '#4A4870', letterSpacing: '0.05em' }}>
          {formatValue ? formatValue(min) : min}
        </span>
        <span style={{ fontSize: '0.625rem', color: '#4A4870', letterSpacing: '0.05em' }}>
          {formatValue ? formatValue(max) : max}
        </span>
      </div>
    </div>
  )
}
