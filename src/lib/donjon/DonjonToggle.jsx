/* ── DonjonToggle ──────────────────────────────────────────────────────────
   Herní přepínač on/off — zlatý stav, tmavá základna, glow efekt.
   API identické s TkajUI Toggle, jiná vizuální estetika.
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, goldDim,
  bg2, bg3,
  borderDefault,
  textHigh, textMid, textLow,
} from './tokens'

const SIZES = {
  sm: { trackW: 32, trackH: 18, thumb: 12, pad: 3, fontSize: '0.75rem',   gap: 7 },
  md: { trackW: 44, trackH: 24, thumb: 16, pad: 4, fontSize: '0.8125rem', gap: 9 },
}

export default function DonjonToggle({
  checked      = false,
  onChange,
  label,
  'aria-label': ariaLabel,
  labelPosition = 'right',
  size          = 'md',
  disabled      = false,
}) {
  const s = SIZES[size] ?? SIZES.md
  const thumbTravel = s.trackW - s.thumb - s.pad * 2

  const trackStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: s.trackW,
    height: s.trackH,
    borderRadius: s.trackH / 2,
    border: `1.5px solid ${checked ? goldDim : borderDefault}`,
    background: checked ? `${gold}1A` : bg2,
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
    background: checked ? gold : borderDefault,
    boxShadow: checked ? `0 0 8px ${gold}66, 0 0 3px ${gold}44` : 'none',
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
      style={trackStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={e => { if (!disabled) e.currentTarget.style.boxShadow = `0 0 0 2px ${gold}33` }}
      onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
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
