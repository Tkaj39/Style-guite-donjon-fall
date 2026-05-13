/* ── Toggle / Switch ────────────────────────────────────────────────────
   Přepínač on/off s animovaným thumbem. Pill tvar — kontrast k ostatním
   oktagonálním prvkům. Varianty, velikosti, label vlevo/vpravo, disabled.
   ─────────────────────────────────────────────────────────────────────── */

const VARIANTS = {
  default: { border: '#8F7458', bg: '#8F745822', thumb: '#B8956A' },
  success: { border: '#40A055', bg: '#40A05522', thumb: '#40A055' },
  danger:  { border: '#C04040', bg: '#C0404022', thumb: '#C04040' },
  warning: { border: '#C08040', bg: '#C0804022', thumb: '#C08040' },
}

const SIZES = {
  sm: { trackW: 32, trackH: 18, thumb: 12, pad: 3, fontSize: '0.75rem',   gap: 7 },
  md: { trackW: 44, trackH: 24, thumb: 16, pad: 4, fontSize: '0.8125rem', gap: 9 },
}

export default function Toggle({
  checked = false,
  onChange,
  label,
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
    border: `1.5px solid ${checked ? v.border : '#8F745444'}`,
    background: checked
      ? v.bg
      : 'linear-gradient(135deg,#1A1830 0%,#12102A 100%)',
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
    background: checked ? v.thumb : '#4A4870',
    boxShadow: checked ? `0 0 6px ${v.thumb}66` : 'none',
    transform: `translateX(${checked ? thumbTravel : 0}px)`,
    transition: 'transform 0.18s ease, background 0.18s, box-shadow 0.18s',
    pointerEvents: 'none',
  }

  const labelStyle = {
    fontSize: s.fontSize,
    color: disabled ? '#4A4870' : (checked ? '#F0E6D3' : '#8F9CB3'),
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
      tabIndex={disabled ? -1 : 0}
      id={id}
      style={trackStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={e => { if (!disabled) e.currentTarget.style.boxShadow = `0 0 0 2px ${v.border}55` }}
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
