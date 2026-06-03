/* ── NumberInput (tkajui) ─────────────────────────────────────────────
   Numeric text field with built-in − / + stepper buttons. Controlled
   via `value` (number) + `onChange(next: number)`. Honors min / max /
   step + precision (decimal places). Same visual language as Input.

   Use cases: settings sliders (volume, brightness), inventory counts,
   quantity pickers, damage rolls.
   ─────────────────────────────────────────────────────────────────── */
import { useId, useState } from 'react'
import { octagon } from '../../utils/octagon'
import {
  surface2, surface3,
  borderDefault,
  accent,
  textHigh, textMid, textLow,
  dangerColor, dangerText, animFast,
} from './tokens'

const SIZES = {
  xs: { h: 28, cx: 6, px: 8,  btnW: 24, fontSize: '0.6875rem' },
  sm: { h: 36, cx: 8, px: 10, btnW: 28, fontSize: '0.75rem'   },
  md: { h: 44, cx: 8, px: 12, btnW: 32, fontSize: '0.8125rem' },
  lg: { h: 52, cx: 8, px: 14, btnW: 36, fontSize: '0.875rem'  },
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
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step=1]
 * @param {number} [precision=0]  Decimal places to keep when rounding.
 * @param {string} [placeholder]
 * @param {string} [label] [hint]
 * @param {string} [error]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled]
 */
export default function NumberInput({
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
  const id = idProp ?? `tkajui-numberinput-${rawId.replace(/:/g, '')}`
  const s = SIZES[size] ?? SIZES.md

  const borderColor = error
    ? dangerColor
    : focused ? accent : borderDefault
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
      // Allow empty / partial-typing states without forcing number coercion.
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
        <label htmlFor={id} style={{ fontSize: '0.75rem', fontWeight: 600, color: textHigh }}>
          {label}
        </label>
      )}

      {/* Border-trick container */}
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
            background: surface2,
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          {/* − button */}
          <StepperButton
            label="−"
            onClick={() => commit((Number(value) || 0) - step)}
            disabled={decDisabled}
            width={s.btnW}
            side="left"
            cx={s.cx}
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
              // Re-commit on blur to clean up partial typing ("-" → null, "3.50" → 3.5).
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
              fontSize: s.fontSize,
              textAlign: 'center',
              fontFamily: 'inherit',
              fontVariantNumeric: 'tabular-nums',
            }}
            {...rest}
          />

          {/* + button */}
          <StepperButton
            label="+"
            onClick={() => commit((Number(value) || 0) + step)}
            disabled={incDisabled}
            width={s.btnW}
            side="right"
            cx={s.cx}
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
        background: disabled ? surface2 : surface3,
        color: disabled ? textMid : textHigh,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        fontWeight: 600,
        userSelect: 'none',
        transition: `background ${animFast}ms`,
        // Visual separator from the input area
        [side === 'left' ? 'borderRight' : 'borderLeft']: `1px solid ${borderDefault}`,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = surface3 }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = surface3 }}
    >
      {label}
    </button>
  )
}
