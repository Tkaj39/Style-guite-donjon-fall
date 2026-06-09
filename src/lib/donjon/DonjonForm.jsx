/* ── DonjonFormPrimitives (donjon-fall-ui) ───────────────────────────
   Game variants of Field and Form. The TkajUI versions are purely
   structural (label + flex column), so both libraries used to render
   identically. The donjon versions add the parchment palette and the
   octagonal gold shell so a "form on screen" reads as a donjon panel
   instead of a generic surface card.

   DonjonField   — Field with goldMid uppercase label, dangerColor
                   required marker, donjon hint/error tokens
   DonjonForm    — Form rendered inside an octagonal gold shell
                   (border-trick), optional gold uppercase title +
                   description header strip, bg2 inner panel

   APIs mirror the TkajUI primitives 1:1 so callers can hot-swap.
   ─────────────────────────────────────────────────────────────────── */
import { Children, cloneElement, isValidElement, useId } from 'react'
import { octagon } from '../shared/octagon'
import {
  gold, goldDim, goldMid,
  bg2,
  textMid, textLow,
  dangerColor, dangerText,
} from './tokens'

const SHELL_CX = 12

/* ── Field ─────────────────────────────────────────────────────────── */

/**
 * @param {ReactNode} [label]
 * @param {ReactNode} [hint]
 * @param {string}    [error]
 * @param {boolean}   [required]
 * @param {string}    [htmlFor]
 */
export function DonjonField({
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
  const id    = htmlFor ?? `donjon-field-${rawId.replace(/:/g, '')}`
  const hintId  = hint  ? `${id}-hint`  : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

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
            fontWeight: 700,
            color: goldMid,
            textTransform: 'uppercase',
            letterSpacing: 0.6,
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

/* ── Form ──────────────────────────────────────────────────────────── */

/**
 * @param {(e: SubmitEvent) => void} [onSubmit]
 * @param {number|string} [gap=16]
 * @param {ReactNode} [title]         Optional gold uppercase title at the top of the panel.
 * @param {ReactNode} [description]   Subtitle under the title.
 * @param {boolean}   [bordered=true] Octagonal gold shell. Disable for embedding inside another donjon container.
 * @param {number|string} [padding=20]
 */
export function DonjonForm({
  onSubmit,
  gap = 16,
  title,
  description,
  bordered = true,
  padding = 20,
  children,
  className,
  style,
  ...rest
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  const formEl = (
    <form
      onSubmit={handleSubmit}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        // When bordered=false the outer container is omitted, so this is
        // the only surface — keep it neutral
        background: bordered ? 'transparent' : undefined,
        padding: bordered ? 0 : padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </form>
  )

  if (!bordered) {
    return formEl
  }

  return (
    <div
      style={{
        background: gold,            // outer = gold edge
        clipPath: octagon(SHELL_CX),
        padding: 1,                  // border thickness
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: bg2,           // inner = parchment fill
          clipPath: octagon(SHELL_CX),
          padding,
          display: 'flex',
          flexDirection: 'column',
          gap: title || description ? 16 : 0,
        }}
      >
        {(title || description) && (
          <div style={{
            paddingBottom: 12,
            borderBottom: `1px solid ${goldDim}55`,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
            {title && (
              <h3 style={{
                margin: 0,
                color: gold,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                fontWeight: 700,
              }}>
                {title}
              </h3>
            )}
            {description && (
              <p style={{ margin: 0, color: textMid, fontSize: '0.8125rem', lineHeight: 1.5 }}>
                {description}
              </p>
            )}
          </div>
        )}
        {formEl}
      </div>
    </div>
  )
}
