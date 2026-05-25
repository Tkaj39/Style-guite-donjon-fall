/* ── ResourceBar ───────────────────────────────────────────────────────────
   HP/mana/stamina bar s vizuálními zónami.
   Klíčový rozdíl od DonjonProgressBar: pozadí traku VŽDY zobrazuje polohu
   danger/warning zón, i když je bar plný — hráč vidí, kam zóny začínají.
   Hranice zón jsou viditelné i přes fill (zIndex: 2).
   ─────────────────────────────────────────────────────────────────────── */
import {
  bg2, borderDefault,
  textMid, textFaint,
  gainColor, dangerColor, warningColor, infoColor, magicColor, shieldColor,
} from './tokens'

const VARIANT_FILL = {
  hp:      null,          // uses threshold logic based on pct
  mana:    infoColor,
  stamina: warningColor,
  xp:      magicColor,
  shield:  shieldColor,
  default: null,
}

const SIZES = {
  sm: { h: 8,  radius: 2, labelSize: '0.6875rem', valueSize: '0.6875rem' },
  md: { h: 12, radius: 3, labelSize: '0.75rem',   valueSize: '0.75rem'   },
  lg: { h: 18, radius: 4, labelSize: '0.8125rem', valueSize: '0.8125rem' },
}

function thresholdFill(pct) {
  if (pct <= 25) return dangerColor
  if (pct <= 50) return warningColor
  return gainColor
}

export default function ResourceBar({
  value     = 100,
  max       = 100,
  size      = 'md',
  variant   = 'hp',
  label,
  showValue = false,
  /* zones = true: zobrazí barevná pásma v pozadí traku a hranice zón */
  zones     = true,
  /*
   * flashKey: změň hodnotu pro nový damage flash (např. flashKey={Date.now()}).
   * Použij key-change pattern — element se remountuje a restartuje animaci.
   */
  flashKey,
  style,
  className,
}) {
  const s   = SIZES[size] ?? SIZES.md
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const baseColor = VARIANT_FILL[variant]
  const fillColor = baseColor ?? thresholdFill(pct)

  /* Pozadí traku — gradientní zóny, nebo tmavé pokud zones=false */
  const useZones = zones && (variant === 'hp' || variant === 'default' || !baseColor)
  const trackBg  = useZones
    ? `linear-gradient(90deg,
        ${dangerColor}26  0%  25%,
        ${warningColor}1C 25% 50%,
        ${gainColor}12    50% 100%)`
    : bg2

  return (
    <div style={{ width: '100%', ...style }} className={className}>

      {/* Header */}
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
          {label && (
            <span style={{
              fontSize: s.labelSize, color: textMid,
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {label}
            </span>
          )}
          {showValue && (
            <span style={{
              fontSize: s.valueSize, fontWeight: 700, color: fillColor,
              letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums', marginLeft: 'auto',
            }}>
              {Math.round(value)}<span style={{ color: textFaint, fontWeight: 400 }}>/{max}</span>
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}
        aria-label={label || 'resource bar'}
        style={{
          position: 'relative', width: '100%', height: s.h,
          background: trackBg,
          borderRadius: s.radius,
          border: `1px solid ${borderDefault}`,
          overflow: 'hidden',
        }}
      >
        {/* Fill */}
        <div style={{
          position: 'absolute', inset: 0, width: `${pct}%`,
          background: `linear-gradient(90deg, ${fillColor}88 0%, ${fillColor} 100%)`,
          borderRadius: s.radius,
          boxShadow: pct > 0 ? `0 0 8px ${fillColor}44` : 'none',
          transition: 'width 0.3s ease, background 0.4s ease, box-shadow 0.4s ease',
          zIndex: 1,
        }} />

        {/* Hranice zón — viditelné i přes fill */}
        {useZones && (
          <>
            <div style={{
              position: 'absolute', left: '25%', top: 0, bottom: 0, width: 1,
              background: `${dangerColor}55`,
              zIndex: 2, pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
              background: `${warningColor}40`,
              zIndex: 2, pointerEvents: 'none',
            }} />
          </>
        )}

        {/* Damage flash overlay — restartuje se při změně flashKey */}
        {flashKey !== undefined && (
          <div
            key={flashKey}
            style={{
              position: 'absolute', inset: 0,
              background: `${dangerColor}88`,
              borderRadius: s.radius,
              animation: 'donjonResFlash 0.5s ease-out forwards',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        )}
      </div>

    </div>
  )
}
