/* ── DonjonProgressBar ────────────────────────────────────────────────────
   Herní HP / resource bar s barevnými prahy, ticky a damage flash.
   Automatické barevné prahy: >50% zelená · 25–50% zlatá · <25% červená.
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, bg2, bg3,
  gainColor, dangerColor, warningColor, infoColor, magicColor,
  textMid, textLow, textFaint,
} from './tokens'

function thresholdColor(pct) {
  if (pct > 50) return gainColor
  if (pct > 25) return gold
  return dangerColor
}

const VARIANTS = {
  hp:      { fill: null,         label: 'HP'      },
  mana:    { fill: infoColor,    label: 'Mana'    },
  stamina: { fill: warningColor, label: 'Stamina' },
  xp:      { fill: magicColor,   label: 'XP'      },
  default: { fill: null,         label: ''        },
}

const SIZES = {
  sm: { h: 6,  radius: 2, fontSize: '0.6875rem' },
  md: { h: 10, radius: 3, fontSize: '0.75rem'   },
  lg: { h: 14, radius: 4, fontSize: '0.8125rem' },
}

export default function DonjonProgressBar({
  value        = 0,
  max          = 100,
  size         = 'md',
  variant      = 'hp',
  label,
  showValue    = false,
  ticks        = 0,
  flash        = false,
  indeterminate = false,
  style,
  className,
}) {
  const v   = VARIANTS[variant] ?? VARIANTS.hp
  const s   = SIZES[size]       ?? SIZES.md
  const pct = indeterminate ? 100 : Math.min(100, Math.max(0, (value / max) * 100))

  const fillColor    = v.fill ?? thresholdColor(pct)
  const borderColor  = `${fillColor}44`
  const displayLabel = label ?? v.label

  return (
    <div style={{ width: '100%', ...style }} className={className}>

      {/* Header */}
      {(displayLabel || showValue) && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 5,
        }}>
          {displayLabel && (
            <span style={{
              fontSize: s.fontSize, color: textMid,
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {displayLabel}
            </span>
          )}
          {showValue && (
            <span style={{
              fontSize: '0.6875rem', fontWeight: 700, color: fillColor,
              letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums', marginLeft: 'auto',
            }}>
              {value}<span style={{ color: textLow, fontWeight: 400 }}>/{max}</span>
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : max}
        aria-label={displayLabel || 'progress'}
        style={{
          position: 'relative', width: '100%', height: s.h,
          background: bg2, borderRadius: s.radius,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden',
        }}
      >
        {/* Fill — tlumený základ při indeterminate */}
        <div style={{
          position: 'absolute', inset: 0, width: `${pct}%`,
          background: indeterminate
            ? `${fillColor}22`
            : `linear-gradient(90deg, ${fillColor}99 0%, ${fillColor} 100%)`,
          borderRadius: s.radius,
          boxShadow: (!indeterminate && pct > 0) ? `0 0 8px ${fillColor}55` : 'none',
          transition: 'width 0.3s ease, background 0.4s ease, box-shadow 0.4s ease',
        }} />

        {/* Indeterminate scan */}
        {indeterminate && (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: s.radius }}>
            <div style={{
              position: 'absolute', top: 0, bottom: 0, width: '35%',
              background: `linear-gradient(90deg, transparent 0%, ${fillColor}66 30%, ${fillColor} 55%, ${fillColor}cc 65%, transparent 100%)`,
              boxShadow: `0 0 10px ${fillColor}88`,
              animation: 'donjonBarScan 1.6s ease-in-out infinite',
            }} />
          </div>
        )}

        {/* Damage flash overlay */}
        {flash && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `${dangerColor}88`,
            borderRadius: s.radius,
            animation: 'donjonDmgFlash 0.4s ease-out forwards',
            pointerEvents: 'none',
          }} />
        )}

        {/* Tick marks */}
        {ticks > 1 && Array.from({ length: ticks - 1 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${((i + 1) / ticks) * 100}%`,
            top: 0, bottom: 0, width: 1,
            background: `${bg3}bb`,
            pointerEvents: 'none',
          }} />
        ))}
      </div>

    </div>
  )
}
