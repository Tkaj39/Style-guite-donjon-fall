/* ── Slider ─────────────────────────────────────────────────────────────
   Vlastní range input — nativní <input type="range"> překryje průhlednou
   vrstvou náš vizuál. Vizuálně navazuje na ProgressBar.
   Čistá TkajUI paleta.
   ─────────────────────────────────────────────────────────────────────── */

import {
  surface2,
  accent, accentDim,
  textMid, textLow,
  successColor, successBorder, successDim,
  dangerColor, dangerBorder, dangerDim,
  warningColor, warningBorder, warningDim,
  infoColor, infoBorder, infoDim,
} from './tokens'

const VARIANTS = {
  default: {
    fill:  `linear-gradient(90deg,${accent} 0%,${accentDim} 100%)`,
    thumb: accent,
    glow:  accent,
    border: `${accent}33`,
  },
  success: {
    fill:  `linear-gradient(90deg,${successColor} 0%,${successDim} 100%)`,
    thumb: successColor, glow: successColor, border: successBorder,
  },
  danger: {
    fill:  `linear-gradient(90deg,${dangerColor} 0%,${dangerDim} 100%)`,
    thumb: dangerColor, glow: dangerColor, border: dangerBorder,
  },
  warning: {
    fill:  `linear-gradient(90deg,${warningColor} 0%,${warningDim} 100%)`,
    thumb: warningColor, glow: warningColor, border: warningBorder,
  },
  info: {
    fill:  `linear-gradient(90deg,${infoColor} 0%,${infoDim} 100%)`,
    thumb: infoColor, glow: infoColor, border: infoBorder,
  },
}

const SIZES = {
  xs: { trackH: 3,  thumbD: 10, radius: 1, fontSize: '0.6875rem' },
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

      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          {label && (
            <span style={{ fontSize: s.fontSize, color: textMid, letterSpacing: '0.04em' }}>{label}</span>
          )}
          {showValue && (
            <span style={{
              fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em',
              color: v.thumb, marginLeft: 'auto',
            }}>
              {displayValue}
            </span>
          )}
        </div>
      )}

      <div style={{ position: 'relative', height: s.thumbD, display: 'flex', alignItems: 'center' }}>

        {/* Visual track */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          height: s.trackH,
          background: surface2,
          borderRadius: s.radius,
          border: `1px solid ${v.border}`,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
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
          background: v.thumb,
          border: `2px solid #ffffff22`, // eslint-disable-line donjon/no-hardcoded-hex -- semi-transparent white thumb border, bez ekvivalentu v tkajui tokens
          boxShadow: `0 0 6px ${v.glow}55, 0 2px 4px rgba(0,0,0,0.4)`,
          pointerEvents: 'none',
          transition: 'left 0.05s',
        }} />

        {/* Native input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={e => !disabled && onChange?.(Number(e.target.value))}
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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
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
