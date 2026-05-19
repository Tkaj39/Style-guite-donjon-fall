/* ── ProgressBar ────────────────────────────────────────────────────────
   Lineární ukazatel průběhu. Determinate (value 0–100) nebo indeterminate
   (animovaný shimmer). Varianty, velikosti, volitelný popisek a hodnota.
   Čistá TkajUI paleta.
   ─────────────────────────────────────────────────────────────────────── */

import {
  surface2, borderDefault,
  accent, accentDim,
  textMid,
  successColor, successBorder, successDim,
  dangerColor, dangerBorder, dangerDim,
  warningColor, warningBorder, warningDim,
  infoColor, infoBorder, infoDim,
} from './tokens'

const VARIANTS = {
  default: {
    fill:   `linear-gradient(90deg,${accent} 0%,${accentDim} 100%)`,
    glow:   accent,
    border: `${accent}33`,
    valueColor: accent,
  },
  success: {
    fill:   `linear-gradient(90deg,${successColor} 0%,${successDim} 100%)`,
    glow:   successColor,
    border: successBorder,
    valueColor: successColor,
  },
  danger: {
    fill:   `linear-gradient(90deg,${dangerColor} 0%,${dangerDim} 100%)`,
    glow:   dangerColor,
    border: dangerBorder,
    valueColor: dangerColor,
  },
  warning: {
    fill:   `linear-gradient(90deg,${warningColor} 0%,${warningDim} 100%)`,
    glow:   warningColor,
    border: warningBorder,
    valueColor: warningColor,
  },
  info: {
    fill:   `linear-gradient(90deg,${infoColor} 0%,${infoDim} 100%)`,
    glow:   infoColor,
    border: infoBorder,
    valueColor: infoColor,
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

      {hasHeader && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 5,
        }}>
          {label && (
            <span style={{ fontSize: '0.75rem', color: textMid, letterSpacing: '0.04em' }}>
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: v.valueColor,
              marginLeft: 'auto',
            }}>
              {displayPct} %
            </span>
          )}
        </div>
      )}

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
          background: surface2,
          borderRadius: s.radius,
          border: `1px solid ${v.border}`,
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          width: `${pct}%`,
          background: v.fill,
          borderRadius: s.radius,
          boxShadow: pct > 0 ? `0 0 6px ${v.glow}55` : 'none',
          transition: indeterminate ? 'none' : 'width 0.35s ease',
          animation: indeterminate ? 'pbIndeterminate 1.4s ease-in-out infinite' : 'none',
          transformOrigin: 'left center',
        }} />
      </div>

    </div>
  )
}
