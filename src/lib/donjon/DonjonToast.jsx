/* ── DonjonToast ───────────────────────────────────────────────────────────
   Game toast notifications — Provider + hook.
   Game variants: default(gold) · gain(green) · loss(red) ·
                  warning(amber) · event(blue)
   Shape: octagon cx=12, dark bgDeep, variant color in border + title + glow.
   ─────────────────────────────────────────────────────────────────────── */
import { octagon, octagonInner } from '../shared/octagon'
import { createToastContext } from '../shared/toastContext'
import {
  gold, goldDim,
  bgDeep,
  textMid,
  gainColor, dangerColor, warningColor, infoColor, infoLight,
} from './tokens'

const CX = 12

/* ── Varianty ── */
const VARIANTS = {
  default: { bar: gold,         title: gold,         icon: gold         },
  gain:    { bar: gainColor,    title: gainColor,     icon: gainColor    },
  loss:    { bar: dangerColor,  title: dangerColor,   icon: dangerColor  },
  warning: { bar: warningColor, title: warningColor,  icon: warningColor },
  event:   { bar: infoColor,    title: infoLight,     icon: infoColor   },
}

/* ── Ikony ── */
function GainIcon({ color }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 8l2.5 2.5L11 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LossIcon({ color }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
      <path d="M8 5v3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill={color} />
    </svg>
  )
}
function WarningIcon({ color }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2.5L14 13.5H2L8 2.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 7v2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.75" fill={color} />
    </svg>
  )
}
function EventIcon({ color }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2l1.5 4.5H14l-3.75 2.75 1.43 4.4L8 11.25l-3.68 2.4 1.43-4.4L2 6.5h4.5L8 2Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}
function DefaultIcon({ color }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
      <path d="M8 7.5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5.5" r="0.75" fill={color} />
    </svg>
  )
}

function VariantIcon({ variant, color }) {
  if (variant === 'gain')    return <GainIcon color={color} />
  if (variant === 'loss')    return <LossIcon color={color} />
  if (variant === 'warning') return <WarningIcon color={color} />
  if (variant === 'event')   return <EventIcon color={color} />
  return <DefaultIcon color={color} />
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
      <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

/* ── ToastItem ── */
function ToastItem({ id, title, message, variant = 'default', duration = 4000, onRemove }) {
  const v = VARIANTS[variant] ?? VARIANTS.default

  // Role and aria-live by game variant:
  //  loss/warning → alert + assertive (interrupts the screen reader for important info)
  //  gain/event/default → status + polite (waits for a pause — does not interrupt the game)
  const isAssertive = variant === 'loss' || variant === 'warning'
  const role = isAssertive ? 'alert' : 'status'
  const ariaLive = isAssertive ? 'assertive' : 'polite'

  return (
    <div
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      className="starting:opacity-0 starting:translate-x-5 transition-[opacity,transform] duration-200 ease"
      style={{ width: 310 }}
    >
      {/* Shadow wrapper — no clip-path so drop-shadow isn't clipped */}
      <div style={{ filter: `drop-shadow(0 4px 20px rgba(0,0,0,0.7)) drop-shadow(0 0 14px ${v.bar}25)` }}>
        {/* Outer border layer */}
        <div style={{ clipPath: octagon(CX), background: v.bar, padding: 1 }}>
          {/* Inner content */}
          <div style={{ clipPath: octagonInner(CX), background: bgDeep, display: 'flex', flexDirection: 'column' }}>

            {/* Content row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 12px 10px' }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <VariantIcon variant={variant} color={v.icon} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {title && (
                  <p style={{
                    margin: '0 0 2px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: v.title,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
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

              {/* Close */}
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
                  background: `${goldDim}22`,
                  border: 'none',
                  clipPath: octagon(5),
                  color: textMid,
                  cursor: 'pointer',
                  marginTop: -1,
                  transition: 'background 0.12s, color 0.12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${goldDim}55`; e.currentTarget.style.color = gold }}
                onMouseLeave={e => { e.currentTarget.style.background = `${goldDim}22`; e.currentTarget.style.color = textMid }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Progress bar */}
            {duration > 0 && (
              <div style={{ height: 2, background: `${v.bar}22`, margin: '0 10px 10px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: v.bar,
                  transformOrigin: 'left',
                  animation: `donjonToastProgress ${duration}ms linear forwards`,
                }} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Context, Provider and Hook — shared logic from toastContext ── */
const { ToastProvider: _Provider, useToast } = createToastContext({
  zIndex:   2000,
  hookName: 'useToast (DonjonToast)',
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
