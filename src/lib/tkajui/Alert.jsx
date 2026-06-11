/* ── Alert (tkajui) ──────────────────────────────────────────────────
   Inline contextual feedback box. Use Alert for messages that belong
   in the document flow — form validation summary, "save failed",
   "your trial is ending soon".

   Difference from Toast: stays put (not auto-dismissed), positioned
   inline (not floating), good for context-specific guidance.
   Difference from Banner: smaller, used at the section level, may have
   a dismiss button.
   ─────────────────────────────────────────────────────────────────── */
import { octagon, octagonInner } from '../shared/octagon'
import { VARIANT_COLORS, textHigh, textMid } from './tokens'
import { InfoIcon, SuccessIcon, WarningIcon, DangerIcon, CloseIcon } from './Icons'

const SHELL_CX = 8

const VARIANT_ICONS = {
  default: <InfoIcon width={18} height={18} />,
  info:    <InfoIcon width={18} height={18} />,
  success: <SuccessIcon width={18} height={18} />,
  warning: <WarningIcon width={18} height={18} />,
  danger:  <DangerIcon width={18} height={18} />,
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

  // Octagon shell via border-trick. The variant left rail (previously a
  // 3 px borderLeft, which clipPath would slice off at the corners) is an
  // absolutely positioned bar inside the inner panel instead.
  return (
    <div
      role="alert"
      className={className}
      style={{
        background: v.border,
        clipPath: octagon(SHELL_CX),
        padding: 1,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 14px 12px 17px',   // +3 left for the rail
        background: v.bg,
        clipPath: octagonInner(SHELL_CX),
        color: textHigh,
        fontSize: '0.875rem',
        lineHeight: 1.45,
      }}>
      <span aria-hidden="true" style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: v.color,
      }} />
      {iconNode != null && (
        <span
          aria-hidden="true"
          style={{
            flex: '0 0 auto',
            display: 'inline-flex',
            alignItems: 'center',
            color: v.color,
            lineHeight: 1,
            marginTop: 1,
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
          className="tkajui-focus"
          style={{
            flex: '0 0 auto',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: textMid,
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 1,
            padding: 2,
            alignSelf: 'flex-start',
          }}
        >
          <CloseIcon width={14} height={14} />
        </button>
      )}
      </div>
    </div>
  )
}
