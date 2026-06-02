/* ── Form primitives (tkajui) ──────────────────────────────────────────
   Six components that together cover the "I need to build a form" path:

     <Field label hint error required>          label + input wrapper
     <Radio value>label</Radio>                  single radio (in group context)
     <RadioGroup value onChange>...</RadioGroup> single-choice picker
     <Checkbox checked onChange>label</Checkbox> standalone toggle
     <CheckboxGroup value onChange>...</CheckboxGroup> multi-choice (array)
     <Form onSubmit>...</Form>                   <form> wrapper with preventDefault

   All purely structural — TkajUI palette. Donjon-themed variants live in
   the donjon barrel (re-exports here as a base implementation).
   ─────────────────────────────────────────────────────────────────── */
import {
  Children, cloneElement, createContext, isValidElement, useContext, useId,
} from 'react'
import {
  surface2, surface3,
  borderDefault,
  textHigh, textMid, textLow,
  accent, accentBorder,
  dangerColor, dangerText, animFast,
} from './tokens'

/* ── Field ────────────────────────────────────────────────────────────
   Label + (single child input) + hint + error composer. Clones the child
   element to inject `id` and `aria-describedby` so the label links and
   screen readers announce hint/error.
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {ReactNode} [label]    Field label (above the input).
 * @param {ReactNode} [hint]     Helper text shown below (only when error is absent).
 * @param {string}    [error]    Error message — when set, overrides hint and applies error styling.
 * @param {boolean}   [required] Show a `*` after the label.
 * @param {string}    [htmlFor]  Override the auto-generated input id.
 */
export function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  className,
  style,
}) {
  const rawId = useId()
  const id    = htmlFor ?? `tkajui-field-${rawId.replace(/:/g, '')}`
  const hintId  = hint  ? `${id}-hint`  : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  // Clone the single input child with id + aria-describedby + aria-invalid.
  // If user wrapped multiple children, we only enhance the FIRST valid element.
  let enhanced = false
  const enhancedChildren = Children.map(children, (child) => {
    if (enhanced || !isValidElement(child)) return child
    enhanced = true
    return cloneElement(child, {
      id: child.props.id ?? id,
      'aria-describedby': [child.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
      'aria-invalid': error ? 'true' : child.props['aria-invalid'],
    })
  })

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label != null && (
        <label
          htmlFor={id}
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: textHigh,
            letterSpacing: '0.02em',
          }}
        >
          {label}
          {required && <span style={{ color: dangerColor, marginLeft: 4 }} aria-hidden="true">*</span>}
        </label>
      )}
      {enhancedChildren}
      {error && (
        <span id={errorId} role="alert" style={{ fontSize: '0.6875rem', color: dangerText }}>
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={hintId} style={{ fontSize: '0.6875rem', color: textLow }}>
          {hint}
        </span>
      )}
    </div>
  )
}

/* ── Form ─────────────────────────────────────────────────────────────
   <form> wrapper that auto-calls e.preventDefault() before user handler.
   Renders a <Stack>-like flex column with sensible default gap.
   ─────────────────────────────────────────────────────────────────── */

/**
 * @param {(e: SubmitEvent) => void} [onSubmit]
 * @param {number|string} [gap=16]  Gap between form sections in px (or any CSS length).
 */
export function Form({
  onSubmit,
  gap = 16,
  children,
  className,
  style,
  ...rest
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }
  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap, ...style }}
      {...rest}
    >
      {children}
    </form>
  )
}

/* ── Radio + RadioGroup ───────────────────────────────────────────────
   Native <input type=radio> styled. RadioGroup provides the shared
   `name`, controlled `value`, `onChange`, plus error/hint context.
   ─────────────────────────────────────────────────────────────────── */

const RadioGroupContext = createContext(null)

/**
 * @param {string|number} value      The value this radio represents.
 * @param {boolean}       [disabled]
 * @param {ReactNode}     children   Label text.
 */
export function Radio({ value, disabled = false, children, className, style, ...rest }) {
  const ctx = useContext(RadioGroupContext)
  const rawId = useId()
  const id = `tkajui-radio-${rawId.replace(/:/g, '')}`
  if (!ctx) {
    return (
      <label
        htmlFor={id}
        className={className}
        style={{ ...baseRadioLabelStyle(disabled), ...style }}
      >
        <input id={id} type="radio" value={value} disabled={disabled} style={hiddenInputStyle} {...rest} />
        <RadioDot checked={false} disabled={disabled} />
        <span style={baseRadioTextStyle(false, disabled)}>{children}</span>
      </label>
    )
  }
  const checked = ctx.value === value
  const groupDisabled = ctx.disabled || disabled
  return (
    <label
      htmlFor={id}
      className={className}
      style={{ ...baseRadioLabelStyle(groupDisabled), ...style }}
    >
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
      <RadioDot checked={checked} disabled={groupDisabled} />
      <span style={baseRadioTextStyle(checked, groupDisabled)}>{children}</span>
    </label>
  )
}

/**
 * @param {string} [name]                          Required when there are multiple groups on the page — auto-generated otherwise.
 * @param {string|number|null} [value]
 * @param {(v: string|number) => void} [onChange]
 * @param {boolean} [disabled]
 * @param {ReactNode} [label]
 * @param {ReactNode} [hint]
 * @param {string}    [error]
 * @param {boolean}   [required]
 * @param {'vertical'|'horizontal'} [orientation='vertical']
 */
export function RadioGroup({
  name,
  value = null,
  onChange,
  disabled = false,
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
  const resolvedName = name ?? `tkajui-radiogroup-${rawId.replace(/:/g, '')}`
  const ctx = { name: resolvedName, value, onChange, disabled }
  return (
    <fieldset
      role="radiogroup"
      aria-required={required || undefined}
      aria-invalid={error ? 'true' : undefined}
      className={className}
      style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, ...style }}
    >
      {label != null && (
        <legend style={{ fontSize: '0.75rem', fontWeight: 600, color: textHigh, padding: 0, marginBottom: 4 }}>
          {label}
          {required && <span style={{ color: dangerColor, marginLeft: 4 }} aria-hidden="true">*</span>}
        </legend>
      )}
      <RadioGroupContext.Provider value={ctx}>
        <div style={{ display: 'flex', flexDirection: orientation === 'horizontal' ? 'row' : 'column', gap: orientation === 'horizontal' ? 16 : 8 }}>
          {children}
        </div>
      </RadioGroupContext.Provider>
      {error && (
        <span role="alert" style={{ fontSize: '0.6875rem', color: dangerText }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: '0.6875rem', color: textLow }}>{hint}</span>
      )}
    </fieldset>
  )
}

/* ── Checkbox + CheckboxGroup ────────────────────────────────────────
   Standalone Checkbox: `checked` + `onChange(boolean)`.
   In CheckboxGroup: `value` (own key) + reads checked from group's array
   `value`; onChange(value, nextArray) bubbles to group.
   ─────────────────────────────────────────────────────────────────── */

const CheckboxGroupContext = createContext(null)

/**
 * @param {string|number} [value]   Required when nested in a CheckboxGroup; identifies the option.
 * @param {boolean}       [checked] Controlled state for standalone use.
 * @param {(checked: boolean) => void} [onChange]   Standalone callback.
 * @param {boolean}       [disabled]
 * @param {ReactNode}     children  Label text.
 */
export function Checkbox({
  value,
  checked,
  onChange,
  disabled = false,
  children,
  className,
  style,
  ...rest
}) {
  const ctx = useContext(CheckboxGroupContext)
  const rawId = useId()
  const id = `tkajui-checkbox-${rawId.replace(/:/g, '')}`

  // Determine resolved checked state + click handler.
  let resolvedChecked
  let handle
  let groupDisabled = disabled
  if (ctx && value !== undefined) {
    resolvedChecked = ctx.value.includes(value)
    groupDisabled = ctx.disabled || disabled
    handle = () => {
      if (groupDisabled) return
      const next = resolvedChecked
        ? ctx.value.filter((v) => v !== value)
        : [...ctx.value, value]
      ctx.onChange?.(next)
    }
  } else {
    resolvedChecked = !!checked
    handle = () => !disabled && onChange?.(!resolvedChecked)
  }

  return (
    <label
      htmlFor={id}
      className={className}
      style={{ ...baseCheckboxLabelStyle(groupDisabled), ...style }}
    >
      <input
        id={id}
        type="checkbox"
        checked={resolvedChecked}
        disabled={groupDisabled}
        onChange={handle}
        style={hiddenInputStyle}
        {...rest}
      />
      <CheckboxBox checked={resolvedChecked} disabled={groupDisabled} />
      <span style={baseCheckboxTextStyle(resolvedChecked, groupDisabled)}>{children}</span>
    </label>
  )
}

/**
 * @param {Array<string|number>} value    Currently-selected values.
 * @param {(next: Array) => void} onChange
 * @param {boolean} [disabled]
 * @param {ReactNode} [label] [hint]
 * @param {string} [error]
 * @param {boolean} [required]
 * @param {'vertical'|'horizontal'} [orientation='vertical']
 */
export function CheckboxGroup({
  value = [],
  onChange,
  disabled = false,
  label,
  hint,
  error,
  required = false,
  orientation = 'vertical',
  children,
  className,
  style,
}) {
  const ctx = { value, onChange, disabled }
  return (
    <fieldset
      aria-required={required || undefined}
      aria-invalid={error ? 'true' : undefined}
      className={className}
      style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, ...style }}
    >
      {label != null && (
        <legend style={{ fontSize: '0.75rem', fontWeight: 600, color: textHigh, padding: 0, marginBottom: 4 }}>
          {label}
          {required && <span style={{ color: dangerColor, marginLeft: 4 }} aria-hidden="true">*</span>}
        </legend>
      )}
      <CheckboxGroupContext.Provider value={ctx}>
        <div style={{ display: 'flex', flexDirection: orientation === 'horizontal' ? 'row' : 'column', gap: orientation === 'horizontal' ? 16 : 8 }}>
          {children}
        </div>
      </CheckboxGroupContext.Provider>
      {error && (
        <span role="alert" style={{ fontSize: '0.6875rem', color: dangerText }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: '0.6875rem', color: textLow }}>{hint}</span>
      )}
    </fieldset>
  )
}

/* ── Visual sub-components + helpers ──────────────────────────────── */

const hiddenInputStyle = {
  position: 'absolute',
  opacity: 0,
  width: 1,
  height: 1,
  margin: -1,
  pointerEvents: 'none',
}

function baseRadioLabelStyle(disabled) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
  }
}

function baseRadioTextStyle(_checked, disabled) {
  return {
    fontSize: '0.8125rem',
    color: disabled ? textMid : textHigh,
  }
}

function baseCheckboxLabelStyle(disabled) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
  }
}

function baseCheckboxTextStyle(_checked, disabled) {
  return {
    fontSize: '0.8125rem',
    color: disabled ? textMid : textHigh,
  }
}

function RadioDot({ checked, disabled }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: `1px solid ${checked ? accent : borderDefault}`,
        background: disabled ? surface3 : surface2,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `border-color ${animFast}ms, background ${animFast}ms`,
        flexShrink: 0,
        boxShadow: checked ? `0 0 0 3px ${accentBorder}` : 'none',
      }}
    >
      {checked && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: accent,
        }} />
      )}
    </span>
  )
}

function CheckboxBox({ checked, disabled }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 16,
        height: 16,
        borderRadius: 3,
        border: `1px solid ${checked ? accent : borderDefault}`,
        background: checked ? accent : (disabled ? surface3 : surface2),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `border-color ${animFast}ms, background ${animFast}ms`,
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 5.5 L4 7.5 L8.5 2.5" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

