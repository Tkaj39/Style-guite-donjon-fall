/* ── Toggle / Switch ────────────────────────────────────────────────────
   On/off switch with an animated thumb. Pill shape — a contrast to the other
   octagonal elements. Variants, sizes, label left/right, disabled.
   Clean TkajUI palette.
   ─────────────────────────────────────────────────────────────────────── */

import { accent, accentBg, surface2, borderDefault, borderMid, textHigh, textMid, textLow, successColor, successBg, dangerColor, dangerBg, warningColor, warningBg } from './tokens'

const VARIANTS = {
  default: { border: accent,        bg: accentBg,    thumb: accent       },
  success: { border: successColor,  bg: successBg,   thumb: successColor  },
  danger:  { border: dangerColor,   bg: dangerBg,    thumb: dangerColor   },
  warning: { border: warningColor,  bg: warningBg,   thumb: warningColor  },
}

const SIZES = {
  sm: { trackW: 32, trackH: 18, thumb: 12, pad: 3, fontSize: '0.75rem',   gap: 7 },
  md: { trackW: 44, trackH: 24, thumb: 16, pad: 4, fontSize: '0.8125rem', gap: 9 },
}

export default function Toggle({
  checked = false,
  onChange,
  label,
  'aria-label': ariaLabel,
  labelPosition = 'right',
  size = 'md',
  variant = 'default',
  disabled = false,
  id,
}) {
  const s = SIZES[size] ?? SIZES.md
  const v = VARIANTS[variant] ?? VARIANTS.default

  const thumbTravel = s.trackW - s.thumb - s.pad * 2

  const trackStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: s.trackW,
    height: s.trackH,
    borderRadius: s.trackH / 2,
    border: `1.5px solid ${checked ? v.border : borderDefault}`,
    background: checked ? v.bg : surface2,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'border-color 0.18s, background 0.18s',
    flexShrink: 0,
    opacity: disabled ? 0.4 : 1,
    outline: 'none',
  }

  const thumbStyle = {
    position: 'absolute',
    left: s.pad,
    width: s.thumb,
    height: s.thumb,
    borderRadius: '50%',
    background: checked ? v.thumb : borderMid,
    boxShadow: checked ? `0 0 6px ${v.thumb}55` : 'none',
    transform: `translateX(${checked ? thumbTravel : 0}px)`,
    transition: 'transform 0.18s ease, background 0.18s, box-shadow 0.18s',
    pointerEvents: 'none',
  }

  const labelStyle = {
    fontSize: s.fontSize,
    color: disabled ? textLow : (checked ? textHigh : textMid),
    userSelect: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color 0.18s',
    lineHeight: 1.3,
  }

  const handleClick = () => {
    if (!disabled) onChange?.(!checked)
  }

  const handleKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault()
      onChange?.(!checked)
    }
  }

  const trackEl = (
    <div
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel || label || undefined}
      tabIndex={disabled ? -1 : 0}
      id={id}
      // Unified accent focus ring (keyboard only) instead of the previous
      // inline onFocus boxShadow that also fired on mouse focus.
      className="tkajui-focus"
      style={trackStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div style={thumbStyle} />
    </div>
  )

  if (!label) return trackEl

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={e => { e.preventDefault(); handleClick() }}
    >
      {trackEl}
      <span style={labelStyle}>{label}</span>
    </label>
  )
}
