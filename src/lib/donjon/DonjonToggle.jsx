/* ── DonjonToggle ──────────────────────────────────────────────────────────
   Game on/off switch — gold state, dark base, glow effect.
   shape='round'  — round track + round thumb (default)
   shape='sharp'  — octagon track + diamond thumb (beveled corners)
   ─────────────────────────────────────────────────────────────────────── */
import { octagon } from '../shared/octagon'
import {
  gold, goldDim, bgDeep,
  textHigh, textMid, textLow,
  dangerColor, successColor, warningColor, infoColor,
} from './tokens'

const SIZES = {
  sm: { trackW: 32, trackH: 18, thumb: 12, pad: 3, padSharp: 5,  cx: 9,  thumbSharp: 8,  sharpTop: 5, fontSize: '0.75rem',   gap: 7 },
  md: { trackW: 44, trackH: 24, thumb: 16, pad: 4, padSharp: 6,  cx: 12, thumbSharp: 11, sharpTop: 7, fontSize: '0.8125rem', gap: 9 },
}

/* Variant lookup — parita s TkajUI Toggle.
   main = checked stroke/thumb color, dim = idle (unchecked). */
const VARIANTS = {
  default: { main: gold,         dim: goldDim                       },
  danger:  { main: dangerColor,  dim: `${dangerColor}88`            },
  success: { main: successColor, dim: `${successColor}88`           },
  warning: { main: warningColor, dim: `${warningColor}88`           },
  info:    { main: infoColor,    dim: `${infoColor}88`              },
}

export default function DonjonToggle({
  checked      = false,
  onChange,
  label,
  'aria-label': ariaLabel,
  labelPosition = 'right',
  size          = 'md',
  variant       = 'default',   // 'default'|'danger'|'success'|'warning'|'info' — parita s TkajUI Toggle
  disabled      = false,
  shape         = 'round',
  id,                         // forwardable id pro <label htmlFor>
}) {
  const v            = VARIANTS[variant] ?? VARIANTS.default
  const s            = SIZES[size] ?? SIZES.md
  const sharp        = shape === 'sharp' || shape === 'sharp-outline'
  const sharpOutline = shape === 'sharp-outline'

  const thumbTravel      = s.trackW - s.thumb      - s.pad * 2
  const thumbTravelSharp = s.trackW - s.thumbSharp - s.padSharp * 2

  const trackStyle = sharpOutline ? {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: s.trackW,
    height: s.trackH,
    clipPath: octagon(s.cx),
    background: checked ? v.dim : `${v.dim}55`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.18s',
    flexShrink: 0,
    opacity: disabled ? 0.4 : 1,
    outline: 'none',
  } : sharp ? {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: s.trackW,
    height: s.trackH,
    clipPath: octagon(s.cx),
    background: checked
      ? `linear-gradient(145deg, ${v.dim} 0%, ${v.main}22 40%)`
      : `linear-gradient(145deg, ${v.dim}66 0%, ${bgDeep} 40%)`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.18s',
    flexShrink: 0,
    opacity: disabled ? 0.4 : 1,
    outline: 'none',
    overflow: 'hidden',
  } : {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: s.trackW,
    height: s.trackH,
    borderRadius: s.trackH / 2,
    border: `1.5px solid ${checked ? v.dim : `${v.dim}55`}`,
    background: checked ? `${v.main}1A` : bgDeep,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'border-color 0.18s, background 0.18s',
    flexShrink: 0,
    opacity: disabled ? 0.4 : 1,
    outline: 'none',
  }

  const thumbStyle = sharp ? {
    position: 'absolute',
    left: s.padSharp,
    top: s.sharpTop,
    width: s.thumbSharp,
    height: s.thumbSharp,
    borderRadius: 2,
    background: checked ? v.main : `${v.dim}66`,
    boxShadow: checked ? `0 0 8px ${v.main}66, 0 0 3px ${v.main}44` : 'none',
    transform: `translateX(${checked ? thumbTravelSharp : 0}px) rotate(45deg)`,
    transition: 'transform 0.18s ease, background 0.18s, box-shadow 0.18s',
    pointerEvents: 'none',
  } : {
    position: 'absolute',
    left: s.pad,
    width: s.thumb,
    height: s.thumb,
    borderRadius: '50%',
    background: checked ? v.main : `${v.dim}55`,
    boxShadow: checked ? `0 0 8px ${v.main}66, 0 0 3px ${v.main}44` : 'none',
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
      id={id}
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel || label || undefined}
      tabIndex={disabled ? -1 : 0}
      style={trackStyle}
      className={sharp ? 'dj-clip-focus' : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={e => { if (!disabled && !sharp) e.currentTarget.style.boxShadow = `0 0 0 2px ${v.main}99` }}
      onBlur={e => { if (!sharp) e.currentTarget.style.boxShadow = 'none' }}
    >
      {sharpOutline && (
        <div style={{
          position: 'absolute',
          inset: 1.5,
          clipPath: octagon(s.cx - 1.5),
          background: checked ? `${v.main}14` : bgDeep,
          transition: 'background 0.18s',
          pointerEvents: 'none',
        }} />
      )}
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
