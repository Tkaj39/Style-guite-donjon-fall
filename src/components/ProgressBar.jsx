/* ── ProgressBar ────────────────────────────────────────────────────────
   Lineární ukazatel průběhu. Determinate (value 0–100) nebo indeterminate
   (animovaný shimmer). Varianty, velikosti, volitelný popisek a hodnota.
   ─────────────────────────────────────────────────────────────────────── */

const VARIANTS = {
  default: {
    fill:   'linear-gradient(90deg,#FFC183 0%,#8F7458 100%)',
    glow:   '#B8956A',
    border: '#8F745440',
  },
  success: {
    fill:   'linear-gradient(90deg,#60C070 0%,#40A055 100%)',
    glow:   '#40A055',
    border: '#40A05540',
  },
  danger: {
    fill:   'linear-gradient(90deg,#E06060 0%,#C04040 100%)',
    glow:   '#C04040',
    border: '#C0404040',
  },
  warning: {
    fill:   'linear-gradient(90deg,#FFD580 0%,#C08040 100%)',
    glow:   '#C08040',
    border: '#C0804040',
  },
  info: {
    fill:   'linear-gradient(90deg,#60A0E0 0%,#4080C0 100%)',
    glow:   '#4080C0',
    border: '#4080C040',
  },
}

const SIZES = {
  sm: { h: 4,  radius: 2 },
  md: { h: 8,  radius: 4 },
  lg: { h: 14, radius: 5 },
}

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  label,
  showValue = false,
  indeterminate = false,
  className,
  style,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.default
  const s = SIZES[size] ?? SIZES.md

  const pct = indeterminate ? 100 : Math.min(100, Math.max(0, (value / max) * 100))
  const displayPct = Math.round((value / max) * 100)

  const hasHeader = label || showValue

  return (
    <div style={{ width: '100%', ...style }} className={className}>

      {/* Label row */}
      {hasHeader && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 5,
        }}>
          {label && (
            <span style={{ fontSize: '0.75rem', color: '#8F9CB3', letterSpacing: '0.04em' }}>
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#B8956A',
              marginLeft: 'auto',
            }}>
              {displayPct} %
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        style={{
          position: 'relative',
          width: '100%',
          height: s.h,
          background: '#12102A',
          borderRadius: s.radius,
          border: `1px solid ${v.border}`,
          overflow: 'hidden',
        }}
      >
        {/* Fill */}
        <div style={{
          position: 'absolute',
          inset: 0,
          width: `${pct}%`,
          background: v.fill,
          borderRadius: s.radius,
          boxShadow: pct > 0 ? `0 0 8px ${v.glow}66` : 'none',
          transition: indeterminate ? 'none' : 'width 0.35s ease',
          animation: indeterminate ? 'pbIndeterminate 1.4s ease-in-out infinite' : 'none',
          transformOrigin: 'left center',
        }} />
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes pbIndeterminate {
          0%   { transform: translateX(-100%) scaleX(0.4) }
          50%  { transform: translateX(60%)   scaleX(0.6) }
          100% { transform: translateX(200%)  scaleX(0.4) }
        }
      `}</style>
    </div>
  )
}
