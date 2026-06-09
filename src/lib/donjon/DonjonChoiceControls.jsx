/* ── DonjonForm (donjon-fall-ui) ─────────────────────────────────────
   Game variants of the form primitives — diamond-shaped Radio and
   Checkbox + their *Group siblings. The diamond aesthetic matches
   the DonjonSlider thumb and the sharp-mode DonjonToggle thumb:
   square rotated 45° with a variant-aware border/gradient and glow
   when checked.

   APIs mirror the TkajUI Radio / RadioGroup / Checkbox / CheckboxGroup
   1:1 — same standalone + group contracts, same controlled state
   shape — so the FormPage demos can hot-swap by component reference.

   The native input is visually hidden but stays in the DOM for a11y
   (keyboard activation, label-for, screen reader semantics).
   ─────────────────────────────────────────────────────────────────── */
import { createContext, useContext, useId } from 'react'
import {
  gold, goldDim, goldMid, bgDeep,
  textHigh, textMid, textLow,
  dangerColor, successColor, warningColor, infoColor, dangerText,
} from './tokens'

// Variant lookup — parity with DonjonSlider / DonjonToggle.
// main = active stop (bright), mid = gradient mid, dim = idle border.
const VARIANTS = {
  default: { main: gold,         mid: goldMid,             dim: goldDim             },
  danger:  { main: dangerColor,  mid: `${dangerColor}AA`,  dim: `${dangerColor}66`  },
  success: { main: successColor, mid: `${successColor}AA`, dim: `${successColor}66` },
  warning: { main: warningColor, mid: `${warningColor}AA`, dim: `${warningColor}66` },
  info:    { main: infoColor,    mid: `${infoColor}AA`,    dim: `${infoColor}66`    },
}

const SIZE = 18  // diamond box size — matches tkajui checkbox at 16 + a touch more

const hiddenInputStyle = {
  position: 'absolute',
  opacity: 0,
  width: 1,
  height: 1,
  margin: -1,
  pointerEvents: 'none',
}

function labelStyle(checked, disabled) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
  }
}

function labelTextStyle(checked, disabled) {
  return {
    fontSize: '0.8125rem',
    color: disabled ? textMid : (checked ? textHigh : textMid),
    transition: 'color 120ms',
  }
}

/* ── Diamond visuals ─────────────────────────────────────────────── */

// Outer diamond — used by both Radio and Checkbox.
// When checked: full gradient fill + glow.
// When unchecked: bgDeep fill with v.dim border.
function Diamond({ checked, disabled, v, inner = null }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: SIZE,
        height: SIZE,
        transform: 'rotate(45deg)',
        background: checked
          ? `linear-gradient(135deg, ${v.mid} 0%, ${v.main} 100%)`
          : (disabled ? `${bgDeep}88` : bgDeep),
        border: `1.5px solid ${checked ? `${v.main}CC` : v.dim}`,
        boxShadow: checked
          ? `0 0 8px ${v.main}66, 0 2px 4px rgba(0,0,0,0.5)`
          : 'none',
        transition: 'background 140ms, border-color 140ms, box-shadow 140ms',
      }}
    >
      {inner}
    </span>
  )
}

// Inner indicator for Radio — small filled diamond when checked.
function RadioIndicator({ checked, v }) {
  if (!checked) return null
  return (
    <span style={{
      display: 'block',
      width: SIZE * 0.4,
      height: SIZE * 0.4,
      background: `linear-gradient(135deg, ${v.main} 0%, ${v.mid} 100%)`,
      // Slight inset on the inner diamond so it reads as a separate shape
      boxShadow: `0 0 0 1px ${bgDeep}99 inset`,
    }} />
  )
}

// Inner indicator for Checkbox — counter-rotated checkmark.
function CheckMark({ checked, v }) {
  if (!checked) return null
  return (
    <svg
      width={SIZE * 0.55}
      height={SIZE * 0.55}
      viewBox="0 0 10 10"
      style={{
        // Counter-rotate so the tick stays upright inside the rotated diamond
        transform: 'rotate(-45deg)',
        pointerEvents: 'none',
        filter: `drop-shadow(0 0 1px ${v.main}88)`,
      }}
    >
      <path
        d="M2 5.5 L4 7.5 L8.5 2.5"
        fill="none"
        stroke={bgDeep}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Radio + RadioGroup ──────────────────────────────────────────── */

const DonjonRadioGroupContext = createContext(null)

/**
 * @param {string|number} value      Required when nested in DonjonRadioGroup.
 * @param {boolean} [disabled]
 * @param {ReactNode} children       Label text.
 * @param {'default'|'danger'|'success'|'warning'|'info'} [variant='default']
 */
export function DonjonRadio({ value, disabled = false, variant = 'default', children, className, style, ...rest }) {
  const ctx = useContext(DonjonRadioGroupContext)
  const rawId = useId()
  const id = `donjon-radio-${rawId.replace(/:/g, '')}`
  const v = VARIANTS[ctx?.variant ?? variant] ?? VARIANTS.default

  if (!ctx) {
    return (
      <label htmlFor={id} className={className} style={{ ...labelStyle(false, disabled), ...style }}>
        <input id={id} type="radio" value={value} disabled={disabled} style={hiddenInputStyle} {...rest} />
        <Diamond checked={false} disabled={disabled} v={v} />
        <span style={labelTextStyle(false, disabled)}>{children}</span>
      </label>
    )
  }

  const checked = ctx.value === value
  const groupDisabled = ctx.disabled || disabled
  return (
    <label htmlFor={id} className={className} style={{ ...labelStyle(checked, groupDisabled), ...style }}>
      <input
        id={id}
        type="radio"
        name={ctx.name}
        value={value}
        checked={checked}
        disabled={groupDisabled}
        onChange={() => !groupDisabled && ctx.onChange?.(value)}
        style={hiddenInputStyle}
        {...rest}
      />
      <Diamond checked={checked} disabled={groupDisabled} v={v} inner={<RadioIndicator checked={checked} v={v} />} />
      <span style={labelTextStyle(checked, groupDisabled)}>{children}</span>
    </label>
  )
}

/**
 * @param {string} [name]
 * @param {string|number|null} [value]
 * @param {(v: string|number) => void} [onChange]
 * @param {boolean} [disabled]
 * @param {'default'|'danger'|'success'|'warning'|'info'} [variant='default']
 * @param {ReactNode} [label] [hint]
 * @param {string} [error]
 * @param {boolean} [required]
 * @param {'vertical'|'horizontal'} [orientation='vertical']
 */
export function DonjonRadioGroup({
  name,
  value = null,
  onChange,
  disabled = false,
  variant = 'default',
  label,
  hint,
  error,
  required = false,
  orientation = 'vertical',
  children,
  className,
  style,
}) {
  const rawId = useId()
  const resolvedName = name ?? `donjon-radiogroup-${rawId.replace(/:/g, '')}`
  const ctx = { name: resolvedName, value, onChange, disabled, variant }
  return (
    <fieldset
      role="radiogroup"
      aria-required={required || undefined}
      aria-invalid={error ? 'true' : undefined}
      className={className}
      style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, ...style }}
    >
      {label != null && (
        <legend style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: goldMid,
          padding: 0,
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }}>
          {label}
          {required && <span style={{ color: dangerColor, marginLeft: 4 }} aria-hidden="true">*</span>}
        </legend>
      )}
      <DonjonRadioGroupContext.Provider value={ctx}>
        <div style={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          gap: orientation === 'horizontal' ? 18 : 8,
        }}>
          {children}
        </div>
      </DonjonRadioGroupContext.Provider>
      {error && (
        <span role="alert" style={{ fontSize: '0.6875rem', color: dangerText }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: '0.6875rem', color: textLow }}>{hint}</span>
      )}
    </fieldset>
  )
}

/* ── Checkbox + CheckboxGroup ────────────────────────────────────── */

const DonjonCheckboxGroupContext = createContext(null)

/**
 * @param {string|number} [value]  Required when nested in DonjonCheckboxGroup.
 * @param {boolean} [checked]      Controlled state for standalone use.
 * @param {(checked: boolean) => void} [onChange]
 * @param {boolean} [disabled]
 * @param {'default'|'danger'|'success'|'warning'|'info'} [variant='default']
 * @param {ReactNode} children
 */
export function DonjonCheckbox({
  value,
  checked,
  onChange,
  disabled = false,
  variant = 'default',
  children,
  className,
  style,
  ...rest
}) {
  const ctx = useContext(DonjonCheckboxGroupContext)
  const rawId = useId()
  const id = `donjon-checkbox-${rawId.replace(/:/g, '')}`
  const v = VARIANTS[ctx?.variant ?? variant] ?? VARIANTS.default

  let resolvedChecked
  let handle
  let groupDisabled = disabled
  if (ctx && value !== undefined) {
    resolvedChecked = ctx.value.includes(value)
    groupDisabled = ctx.disabled || disabled
    handle = () => {
      if (groupDisabled) return
      const next = resolvedChecked
        ? ctx.value.filter((x) => x !== value)
        : [...ctx.value, value]
      ctx.onChange?.(next)
    }
  } else {
    resolvedChecked = !!checked
    handle = () => !disabled && onChange?.(!resolvedChecked)
  }

  return (
    <label htmlFor={id} className={className} style={{ ...labelStyle(resolvedChecked, groupDisabled), ...style }}>
      <input
        id={id}
        type="checkbox"
        checked={resolvedChecked}
        disabled={groupDisabled}
        onChange={handle}
        style={hiddenInputStyle}
        {...rest}
      />
      <Diamond checked={resolvedChecked} disabled={groupDisabled} v={v} inner={<CheckMark checked={resolvedChecked} v={v} />} />
      <span style={labelTextStyle(resolvedChecked, groupDisabled)}>{children}</span>
    </label>
  )
}

/**
 * @param {Array<string|number>} value
 * @param {(next: Array) => void} onChange
 * @param {boolean} [disabled]
 * @param {'default'|'danger'|'success'|'warning'|'info'} [variant='default']
 * @param {ReactNode} [label] [hint]
 * @param {string} [error]
 * @param {boolean} [required]
 * @param {'vertical'|'horizontal'} [orientation='vertical']
 */
export function DonjonCheckboxGroup({
  value = [],
  onChange,
  disabled = false,
  variant = 'default',
  label,
  hint,
  error,
  required = false,
  orientation = 'vertical',
  children,
  className,
  style,
}) {
  const ctx = { value, onChange, disabled, variant }
  return (
    <fieldset
      aria-required={required || undefined}
      aria-invalid={error ? 'true' : undefined}
      className={className}
      style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, ...style }}
    >
      {label != null && (
        <legend style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: goldMid,
          padding: 0,
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }}>
          {label}
          {required && <span style={{ color: dangerColor, marginLeft: 4 }} aria-hidden="true">*</span>}
        </legend>
      )}
      <DonjonCheckboxGroupContext.Provider value={ctx}>
        <div style={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          gap: orientation === 'horizontal' ? 18 : 8,
        }}>
          {children}
        </div>
      </DonjonCheckboxGroupContext.Provider>
      {error && (
        <span role="alert" style={{ fontSize: '0.6875rem', color: dangerText }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: '0.6875rem', color: textLow }}>{hint}</span>
      )}
    </fieldset>
  )
}
