/* ── DonjonNumberInput (donjon-fall-ui) ──────────────────────────────
   Game variant of NumberInput. Same controlled API (value, onChange,
   min/max/step/precision, sizes, error/hint, partial-typing tolerance
   on blur) as the TkajUI version — visuals shift to the parchment
   palette:
     • Border-trick gold octagon shell (matches DonjonInput cx scale)
     • bg2 fill, gold focus border, dangerColor error border
     • bgDeep stepper buttons with gold glyph, gold hover lift
     • textHigh value text, tabular-nums
   ─────────────────────────────────────────────────────────────────── */
import { useId, useState } from 'react'
import { octagon } from '../shared/octagon'
import {
  gold, goldDim, goldMid,
  bg2, bg3, bgDeep,
  textHigh, textLow,
  dangerColor, dangerText, animFast,
} from './tokens'

// Matches DonjonInput cx scale (larger than tkajui Input)
const SIZES = {
  xs: { h: 28, cx: 8,  px: 8,  btnW: 24, fontSize: '0.6875rem' },
  sm: { h: 36, cx: 10, px: 10, btnW: 28, fontSize: '0.75rem'   },
  md: { h: 44, cx: 12, px: 12, btnW: 32, fontSize: '0.8125rem' },
  lg: { h: 52, cx: 14, px: 14, btnW: 36, fontSize: '0.875rem'  },
}

function clamp(n, min, max) {
  if (typeof min === 'number' && n < min) return min
  if (typeof max === 'number' && n > max) return max
  return n
}

function round(n, precision) {
  if (!precision) return Math.round(n)
  const f = 10 ** precision
  return Math.round(n * f) / f
}

/**
 * @param {number} value
 * @param {(value: number) => void} onChange
 * @param {number} [min] [max] [step=1] [precision=0]
 * @param {string} [placeholder]
 * @param {string} [label] [hint] [error]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled]
 */
export default function DonjonNumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  precision = 0,
  placeholder,
  label,
  hint,
  error,
  size = 'md',
  disabled = false,
  className,
  style,
  id: idProp,
  ...rest
}) {
  const [focused, setFocused] = useState(false)
  const rawId = useId()
  const id = idProp ?? `donjon-numberinput-${rawId.replace(/:/g, '')}`
  const s = SIZES[size] ?? SIZES.md

  const borderColor = error
    ? dangerColor
    : focused ? gold : goldDim
  const clipPath = octagon(s.cx)

  const atMin = typeof min === 'number' && typeof value === 'number' && value <= min
  const atMax = typeof max === 'number' && typeof value === 'number' && value >= max
  const decDisabled = disabled || atMin
  const incDisabled = disabled || atMax

  const commit = (next) => {
    if (disabled) return
    const v = round(clamp(next, min, max), precision)
    onChange?.(v)
  }

  const handleInputChange = (e) => {
    const text = e.target.value
    if (text === '' || text === '-') {
      onChange?.(text)
      return
    }
    const n = Number(text)
    if (Number.isFinite(n)) {
      commit(n)
    }
  }

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={id} style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: goldMid,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }}>
          {label}
        </label>
      )}

      {/* Border-trick container — outer = border color, inner = bg2 fill */}
      <div
        style={{
          position: 'relative',
          height: s.h,
          background: borderColor,
          clipPath,
          padding: 1,
          opacity: disabled ? 0.55 : 1,
          transition: `background ${animFast}ms`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 1,
            clipPath,
            background: bg2,
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <StepperButton
            label="−"
            onClick={() => commit((Number(value) || 0) - step)}
            disabled={decDisabled}
            width={s.btnW}
            side="left"
          />

          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={value ?? ''}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false)
              const text = e.target.value
              if (text === '' || text === '-') {
                onChange?.(null)
                return
              }
              const n = Number(text)
              if (Number.isFinite(n)) commit(n)
              else onChange?.(null)
            }}
            style={{
              flex: 1,
              minWidth: 0,
              height: '100%',
              padding: `0 ${s.px}px`,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: error ? dangerText : textHigh,
              caretColor: gold,
              fontSize: s.fontSize,
              textAlign: 'center',
              fontFamily: 'inherit',
              fontVariantNumeric: 'tabular-nums',
            }}
            {...rest}
          />

          <StepperButton
            label="+"
            onClick={() => commit((Number(value) || 0) + step)}
            disabled={incDisabled}
            width={s.btnW}
            side="right"
          />
        </div>
      </div>

      {error && (
        <span role="alert" style={{ fontSize: '0.6875rem', color: dangerText }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: '0.6875rem', color: textLow }}>{hint}</span>
      )}
    </div>
  )
}

function StepperButton({ label, onClick, disabled, width, side }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label === '−' ? 'Decrement' : 'Increment'}
      onClick={onClick}
      disabled={disabled}
      style={{
        width,
        height: '100%',
        flexShrink: 0,
        border: 'none',
        background: disabled ? bg2 : bgDeep,
        color: disabled ? goldDim : gold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        fontWeight: 700,
        userSelect: 'none',
        transition: `background ${animFast}ms, color ${animFast}ms`,
        [side === 'left' ? 'borderRight' : 'borderLeft']: `1px solid ${goldDim}88`,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = bg3 }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = bgDeep }}
    >
      {label}
    </button>
  )
}
