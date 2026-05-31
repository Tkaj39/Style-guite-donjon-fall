/* ── NumericDisplay ────────────────────────────────────────────────────────
   Animated number for game counters — VP, HP, resources.
   On value change: floating delta badge (+N / -N) + brief background flash.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from 'react'
import {
  gold, goldDim, goldMid,
  bg2, bg3, bg4,
  borderDefault,
  textHigh, textMid, textLow, textFaint,
  gainColor, dangerColor, infoColor, infoLight,
} from './tokens'

const VARIANTS = {
  default:  { color: textHigh,  gainFlash: `${gainColor}25`,   lossFlash: `${dangerColor}25`  },
  vp:       { color: gold,      gainFlash: `${gold}30`,        lossFlash: `${dangerColor}25`  },
  resource: { color: goldMid,   gainFlash: `${gainColor}22`,   lossFlash: `${dangerColor}22`  },
  mana:     { color: infoLight,  gainFlash: `${infoColor}22`,   lossFlash: `${dangerColor}22`  },
}

const SIZES = {
  sm: { valueFontSize: '1.25rem', labelFontSize: '0.6875rem', deltaBadge: '0.6875rem', minW: 40  },
  md: { valueFontSize: '1.75rem', labelFontSize: '0.75rem',   deltaBadge: '0.75rem',   minW: 52  },
  lg: { valueFontSize: '2.5rem',  labelFontSize: '0.8125rem', deltaBadge: '0.875rem',  minW: 68  },
}

export default function NumericDisplay({
  value         = 0,
  label,
  prefix,
  suffix,
  size          = 'md',
  variant       = 'default',
  labelPosition = 'top',  // 'top' | 'bottom' | 'left' | 'right'
  style,
  className,
}) {
  const s  = SIZES[size]  ?? SIZES.md
  const v  = VARIANTS[variant] ?? VARIANTS.default

  const prevRef             = useRef(value)
  const [delta, setDelta]   = useState(0)
  const [flashing, setFlashing] = useState(false) // 'gain' | 'loss' | false

  useEffect(() => {
    const prev = prevRef.current
    if (prev === value) return
    const d = value - prev
    setDelta(d)
    setFlashing(d > 0 ? 'gain' : 'loss')
    prevRef.current = value
    const t = setTimeout(() => setFlashing(false), 700)
    return () => clearTimeout(t)
  }, [value])

  /* Flash background color */
  const flashBg = flashing === 'gain'
    ? v.gainFlash
    : flashing === 'loss'
      ? v.lossFlash
      : 'transparent'

  const valueEl = (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Number */}
      <div style={{
        minWidth: s.minW,
        textAlign: 'center',
        padding: '4px 10px',
        background: flashBg,
        border: `1px solid ${flashing ? (flashing === 'gain' ? gainColor : dangerColor) + '55' : borderDefault}`,
        borderRadius: 3,
        transition: 'background 0.15s, border-color 0.15s',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {prefix && <span style={{ fontSize: '0.7em', color: textLow, marginRight: 2 }}>{prefix}</span>}
        <span style={{
          fontSize: s.valueFontSize,
          fontWeight: 700,
          color: v.color,
          letterSpacing: '0.02em',
          lineHeight: 1.1,
        }}>
          {value}
        </span>
        {suffix && <span style={{ fontSize: '0.7em', color: textLow, marginLeft: 2 }}>{suffix}</span>}
      </div>

      {/* Delta badge — floats upward and fades */}
      {flashing && delta !== 0 && (
        <span
          key={`${value}-${Date.now()}`}
          style={{
            position: 'absolute',
            top: -4,
            right: -6,
            fontSize: s.deltaBadge,
            fontWeight: 700,
            color: flashing === 'gain' ? gainColor : dangerColor,
            animation: 'numDeltaFloat 0.7s ease-out forwards',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            textShadow: `0 0 8px ${flashing === 'gain' ? gainColor : dangerColor}88`,
          }}
        >
          {delta > 0 ? `+${delta}` : delta}
        </span>
      )}
    </div>
  )

  const labelEl = label && (
    <span style={{
      fontSize: s.labelFontSize,
      color: textMid,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )

  const isVertical = labelPosition === 'top' || labelPosition === 'bottom'
  const isReversed = labelPosition === 'right' || labelPosition === 'bottom'

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        gap: isVertical ? 4 : 10,
        ...style,
      }}
      className={className}
    >
      {!isReversed && labelEl}
      {valueEl}
      {isReversed && labelEl}

    </div>
  )
}
