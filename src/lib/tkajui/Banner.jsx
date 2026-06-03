/* ── Banner (tkajui) ─────────────────────────────────────────────────
   Full-width announcement strip — sits at the top of a page or
   section, communicates a global state (system status, trial expiry,
   new feature, maintenance window).

   Difference from Alert: spans full width, used at the page/section
   level (not next to a specific form/control), has stronger visual
   weight.
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
 * @param {string} [title]          Bold heading.
 * @param {React.ReactNode} children Body / description.
 * @param {React.ReactNode} [icon]   Override default icon. Pass `null` to suppress.
 * @param {React.ReactNode} [action] Trailing CTA — typically a Button.
 * @param {() => void} [onDismiss]   Show × button.
 * @param {boolean} [sticky=false]   `position: sticky; top: 0; z-index: 10`.
 */
export default function Banner({
  variant = 'info',
  title,
  children,
  icon,
  action,
  onDismiss,
  sticky = false,
  className,
  style,
  ...rest
}) {
  const v = VARIANT_COLORS[variant] ?? VARIANT_COLORS.info
  const iconNode = icon === null ? null : (icon ?? VARIANT_ICONS[variant])

  return (
    <div
      role="region"
      aria-label={title || (typeof children === 'string' ? children : 'Banner')}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        padding: '12px 20px',
        background: v.bg,
        borderTop:    `1px solid ${v.border}`,
        borderBottom: `1px solid ${v.border}`,
        color: textHigh,
        fontSize: '0.875rem',
        lineHeight: 1.45,
        boxSizing: 'border-box',
        ...(sticky ? { position: 'sticky', top: 0, zIndex: 10 } : null),
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
            fontSize: '1.25rem',
            lineHeight: 1.25,
          }}
        >
          {iconNode}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <span style={{ fontWeight: 600, color: v.text, marginRight: children ? 8 : 0 }}>
            {title}
          </span>
        )}
        {children && (
          <span style={{ color: textMid }}>{children}</span>
        )}
      </div>
      {action && (
        <div style={{ flex: '0 0 auto' }}>{action}</div>
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
            fontSize: '1.25rem',
            lineHeight: 1,
            padding: 2,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
