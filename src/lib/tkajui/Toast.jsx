import { octagon } from '../shared/octagon'
import { createToastContext } from '../shared/toastContext'
import {
  surface3,
  borderDefault, borderMid,
  accent,
  textHigh, textMid,
  successColor, successBg, successBorder, successText,
  dangerColor, dangerBg, dangerBorder, dangerText,
  warningColor, warningBg, warningBorder, warningText,
  infoColor, infoBg, infoBorder, infoText,
  zToast,
} from './tokens'

/* ── Varianty ── */
const VARIANTS = {
  default: {
    bg:     surface3,
    border: borderMid,
    title:  textHigh,
    icon:   accent,
    bar:    accent,
  },
  success: {
    bg:     successBg,
    border: successBorder,
    title:  successText,
    icon:   successColor,
    bar:    successColor,
  },
  danger: {
    bg:     dangerBg,
    border: dangerBorder,
    title:  dangerText,
    icon:   dangerColor,
    bar:    dangerColor,
  },
  warning: {
    bg:     warningBg,
    border: warningBorder,
    title:  warningText,
    icon:   warningColor,
    bar:    warningColor,
  },
  info: {
    bg:     infoBg,
    border: infoBorder,
    title:  infoText,
    icon:   infoColor,
    bar:    infoColor,
  },
}

const cx = 10

/* ── Ikony ── */
function VariantIcon({ variant, color }) {
  if (variant === 'success') return (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 8l2.5 2.5L11 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (variant === 'danger') return (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
      <path d="M8 5v3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill={color} />
    </svg>
  )
  if (variant === 'warning') return (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <path d="M8 2.5L14 13.5H2L8 2.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 7v2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.75" fill={color} />
    </svg>
  )
  return (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
      <path d="M8 7.5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5.5" r="0.75" fill={color} />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11">
      <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

/* ── ToastItem ── */
function ToastItem({ id, title, message, variant = 'default', duration = 4000, onRemove }) {
  const v = VARIANTS[variant] ?? VARIANTS.default

  // Role and aria-live depend on the variant:
  //  danger/warning → alert + assertive (interrupts the screen reader)
  //  success/default → status + polite (waits for a pause)
  const isAssertive = variant === 'danger' || variant === 'warning'
  const role = isAssertive ? 'alert' : 'status'
  const ariaLive = isAssertive ? 'assertive' : 'polite'

  return (
    /* Tailwind v4 starting: variant — entry animace bez inline <style> tagu */
    <div
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      className="starting:opacity-0 starting:translate-x-5 transition-[opacity,transform] duration-200 ease"
      style={{ width: 320 }}
    >
      <div style={{ clipPath: octagon(cx), background: v.border, padding: 1 }}>
        <div style={{ clipPath: octagon(cx - 1), background: v.bg, display: 'flex', flexDirection: 'column' }}>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px 10px' }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <VariantIcon variant={variant} color={v.icon} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <p style={{
                  margin: '0 0 2px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: v.title,
                  letterSpacing: '0.02em',
                }}>
                  {title}
                </p>
              )}
              {message && (
                <p style={{ margin: 0, fontSize: '0.75rem', color: textMid, lineHeight: 1.4 }}>
                  {message}
                </p>
              )}
            </div>

            <button
              onClick={() => onRemove(id)}
              aria-label="Close"
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                background: 'transparent',
                border: `1px solid ${borderDefault}`,
                borderRadius: 3,
                color: textMid,
                cursor: 'pointer',
                marginTop: -2,
                transition: 'background 0.12s, color 0.12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = borderDefault; e.currentTarget.style.color = textHigh }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = textMid }}
            >
              <CloseIcon />
            </button>
          </div>

          {duration > 0 && (
            <div style={{ height: 2, background: `${v.border}44`, margin: '0 12px 10px', borderRadius: 1, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: v.bar,
                transformOrigin: 'left',
                animation: `toastProgress ${duration}ms linear forwards`,
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Context, Provider and Hook — shared logic from toastContext ── */
const { ToastProvider: _Provider, useToast } = createToastContext({
  zIndex:   zToast,
  hookName: 'useToast',
})

export { useToast }

export function ToastProvider({ children, position = 'bottom-right' }) {
  return (
    <_Provider
      position={position}
      renderToasts={(toasts, removeToast) =>
        toasts.map(t => <ToastItem key={t.id} {...t} onRemove={removeToast} />)
      }
    >
      {children}
    </_Provider>
  )
}
