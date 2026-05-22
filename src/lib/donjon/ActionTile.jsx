/* ── ActionTile ────────────────────────────────────────────────────────────
   Klikatelná akční dlaždice — ikona, název, popis, cena.
   Jiná než Button: tile tvar, ikona-forward, cost badge v rohu, lock stav.
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, goldDim, goldMid,
  bg2, bg3, bg4,
  borderDefault, borderMid,
  textHigh, textMid, textLow, textFaint,
  dangerColor, warningColor, gainColor,
} from './tokens'

const SIZES = {
  sm: { w: 80,  h: 72,  iconArea: 28, titleSize: '0.6875rem', descSize: '0.6rem',    costSize: '0.6875rem', radius: 3 },
  md: { w: 110, h: 96,  iconArea: 36, titleSize: '0.75rem',   descSize: '0.6875rem', costSize: '0.75rem',   radius: 4 },
  lg: { w: 148, h: 130, iconArea: 48, titleSize: '0.875rem',  descSize: '0.75rem',   costSize: '0.8125rem', radius: 4 },
}

const VARIANTS = {
  default: { border: borderDefault, activeBorder: goldDim,      selBg: `${gold}0E`,    selBorder: goldDim     },
  attack:  { border: borderDefault, activeBorder: dangerColor,  selBg: `${dangerColor}12`, selBorder: dangerColor  },
  move:    { border: borderDefault, activeBorder: gainColor,    selBg: `${gainColor}10`, selBorder: gainColor   },
  special: { border: borderDefault, activeBorder: '#9A60C8',    selBg: '#9A60C818',    selBorder: '#7A48A8'   },
}

/* ── Lock ikona ── */
function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="4" y="7" width="8" height="7" rx="1.5" stroke="#9A9080" strokeWidth="1.3" />
      <path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="#9A9080" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export default function ActionTile({
  icon,
  title,
  description,
  cost,
  selected   = false,
  disabled   = false,
  locked     = false,
  onClick,
  size       = 'md',
  variant    = 'default',
  style,
  className,
}) {
  const s = SIZES[size] ?? SIZES.md
  const v = VARIANTS[variant] ?? VARIANTS.default

  const isBlocked  = disabled || locked
  const borderColor = selected ? v.selBorder : v.border
  const bgColor     = selected ? v.selBg : 'transparent'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={!locked && !disabled ? onClick : undefined}
      aria-pressed={selected}
      aria-label={title}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        width: s.w,
        height: s.h,
        background: isBlocked ? 'transparent' : bgColor,
        border: `1px solid ${isBlocked ? borderMid : borderColor}`,
        borderRadius: s.radius,
        cursor: disabled ? 'not-allowed' : locked ? 'default' : 'pointer',
        opacity: disabled ? 0.35 : locked ? 0.6 : 1,
        transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
        boxShadow: selected ? `0 0 10px ${v.selBorder}33, inset 0 0 0 1px ${v.selBorder}22` : 'none',
        padding: '8px 6px 10px',
        outline: 'none',
        ...style,
      }}
      onMouseEnter={e => {
        if (!isBlocked) {
          e.currentTarget.style.background = bg3
          e.currentTarget.style.borderColor = v.activeBorder
        }
      }}
      onMouseLeave={e => {
        if (!isBlocked) {
          e.currentTarget.style.background = selected ? v.selBg : 'transparent'
          e.currentTarget.style.borderColor = selected ? v.selBorder : v.border
        }
      }}
      className={className}
    >
      {/* Ikona */}
      <div style={{
        width: s.iconArea, height: s.iconArea,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: disabled ? textFaint : selected ? gold : textMid,
        transition: 'color 0.15s',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Název */}
      <span style={{
        fontSize: s.titleSize,
        fontWeight: 600,
        color: disabled ? textFaint : selected ? textHigh : textMid,
        letterSpacing: '0.04em',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.15s',
      }}>
        {title}
      </span>

      {/* Popis — volitelný */}
      {description && (
        <span style={{
          fontSize: s.descSize,
          color: textFaint,
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          {description}
        </span>
      )}

      {/* Cost badge — pravý dolní roh */}
      {cost != null && !locked && (
        <span style={{
          position: 'absolute',
          bottom: 5, right: 6,
          fontSize: s.costSize,
          fontWeight: 700,
          color: disabled ? textFaint : goldMid,
          letterSpacing: '0.02em',
        }}>
          {cost}
        </span>
      )}

      {/* Lock overlay */}
      {locked && (
        <div style={{
          position: 'absolute', top: 5, right: 5,
        }}>
          <LockIcon />
        </div>
      )}

      {/* Selected checkmark — levý horní roh */}
      {selected && (
        <div style={{
          position: 'absolute', top: 4, left: 5,
          width: 8, height: 8, borderRadius: '50%',
          background: v.selBorder,
          boxShadow: `0 0 4px ${v.selBorder}88`,
        }} />
      )}
    </button>
  )
}
