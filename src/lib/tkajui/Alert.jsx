/* ── Alert (tkajui) ──────────────────────────────────────────────────
   Inline contextual feedback box. Use Alert for messages that belong
   in the document flow — form validation summary, "save failed",
   "your trial is ending soon".

   Difference from Toast: stays put (not auto-dismissed), positioned
   inline (not floating), good for context-specific guidance.
   Difference from Banner: smaller, used at the section level, may have
   a dismiss button.
   ─────────────────────────────────────────────────────────────────── */
import { VARIANT_COLORS, textHigh, textMid } from './tokens'

const VARIANT_ICONS = {
  default: 'ⓘ',
  info:    'ⓘ',
  success: '✓',
  warning: '⚠',
  danger:  '⛔',
}

/**
 * @param {'default'|'success'|'danger'|'warning'|'info'} [variant='info']
 * @param {string} [title]      Optional bold heading.
 * @param {React.ReactNode} children  Body content.
 * @param {React.ReactNode} [icon]    Override the default variant icon.
 *                                    Pass `null` to suppress.
 * @param {React.ReactNode} [action]  Trailing action — typically a `<Button size="sm" variant="link">`.
 * @param {() => void} [onDismiss]    Show an × button that calls this on click.
 */
export default function Alert({
  variant = 'info',
  title,
  children,
  icon,
  action,
  onDismiss,
  className,
  style,
  ...rest
}) {
  const v = VARIANT_COLORS[variant] ?? VARIANT_COLORS.info
  const iconNode = icon === null ? null : (icon ?? VARIANT_ICONS[variant])

  return (
    <div
      role="alert"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 14px',
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderLeft: `3px solid ${v.color}`,
        borderRadius: 6,
        color: textHigh,
        fontSize: '0.875rem',
        lineHeight: 1.45,
        ...style,
      }}
      {...rest}
    >
      {iconNode != null && (
        <span
          aria-hidden="true"
          style={{
            flex: '0 0 auto',
            color: v.color,
            fontSize: '1.1rem',
            lineHeight: 1.25,
          }}
        >
          {iconNode}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 600, color: v.text, marginBottom: children ? 2 : 0 }}>
            {title}
          </div>
        )}
        {children && (
          <div style={{ color: textMid }}>{children}</div>
        )}
      </div>
      {action && (
        <div style={{ flex: '0 0 auto', alignSelf: 'center' }}>{action}</div>
      )}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          style={{
            flex: '0 0 auto',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: textMid,
            fontSize: '1.1rem',
            lineHeight: 1,
            padding: 2,
            alignSelf: 'flex-start',
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
