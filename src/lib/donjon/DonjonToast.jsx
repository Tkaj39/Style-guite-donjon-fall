/* ── DonjonToast ───────────────────────────────────────────────────────────
   Herní toast notifikace — Provider + hook.
   Herní varianty: default(zlatá) · gain(zelená) · loss(červená) ·
                   warning(jantarová) · event(modrá)
   Bez oktagonálního tvaru — rovný box s barevnou levou lištou.
   ─────────────────────────────────────────────────────────────────────── */
import { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  gold, goldDim,
  bg2, bg3,
  borderDefault,
  textHigh, textMid,
  gainColor, dangerColor, warningColor,
} from './tokens'

const Z_TOAST = 2000

/* ── Varianty ── */
const VARIANTS = {
  default: { bar: gold,         title: gold,         icon: gold         },
  gain:    { bar: gainColor,    title: gainColor,     icon: gainColor    },
  loss:    { bar: dangerColor,  title: dangerColor,   icon: dangerColor  },
  warning: { bar: warningColor, title: warningColor,  icon: warningColor },
  event:   { bar: '#4A80E2',    title: '#7AAEF5',     icon: '#4A80E2'   },
}

const POSITIONS = {
  'bottom-right': { bottom: 24, right: 24, alignItems: 'flex-end' },
  'top-right':    { top: 24,    right: 24, alignItems: 'flex-end' },
  'bottom-left':  { bottom: 24, left: 24,  alignItems: 'flex-start' },
  'top-left':     { top: 24,    left: 24,  alignItems: 'flex-start' },
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

  return (
    <div
      className="starting:opacity-0 starting:translate-x-5 transition-[opacity,transform] duration-200 ease"
      style={{ width: 310 }}
    >
      <div style={{
        display: 'flex',
        background: bg3,
        border: `1px solid ${borderDefault}`,
        borderLeft: `3px solid ${v.bar}`,
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px ${v.bar}11`,
      }}>
        {/* Icon */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 12,
          paddingLeft: 12,
        }}>
          <VariantIcon variant={variant} color={v.icon} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, padding: '10px 12px 10px 10px' }}>
          {title && (
            <p style={{
              margin: '0 0 2px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: v.title,
              letterSpacing: '0.04em',
            }}>
              {title}
            </p>
          )}
          {message && (
            <p style={{
              margin: 0,
              fontSize: '0.75rem',
              color: textMid,
              lineHeight: 1.4,
            }}>
              {message}
            </p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => onRemove(id)}
          aria-label="Zavřít"
          style={{
            flexShrink: 0,
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            margin: '8px 8px 0 0',
            background: 'transparent',
            border: `1px solid ${borderDefault}`,
            borderRadius: 2,
            color: textMid,
            cursor: 'pointer',
            transition: 'background 0.12s, color 0.12s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = borderDefault; e.currentTarget.style.color = textHigh }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = textMid }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div style={{ height: 2, background: `${v.bar}22`, borderRadius: '0 0 3px 3px', overflow: 'hidden', marginTop: -1 }}>
          <div style={{
            height: '100%',
            background: v.bar,
            transformOrigin: 'left',
            animation: `donjonToastProgress ${duration}ms linear forwards`,
          }} />
        </div>
      )}
    </div>
  )
}

/* ── Context ── */
const ToastContext = createContext(null)

/* ── ToastProvider ── */
export function ToastProvider({ children, position = 'bottom-right' }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback(({ title, message, variant = 'default', duration = 4000 }) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev.slice(-4), { id, title, message, variant, duration }])
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
    return id
  }, [removeToast])

  const pos = POSITIONS[position] ?? POSITIONS['bottom-right']

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <>
          <style>{`
            @keyframes donjonToastProgress {
              from { transform: scaleX(1) }
              to   { transform: scaleX(0) }
            }
          `}</style>
          <div style={{
            position: 'fixed',
            zIndex: Z_TOAST,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            ...pos,
          }}>
            {toasts.map(t => (
              <ToastItem key={t.id} {...t} onRemove={removeToast} />
            ))}
          </div>
        </>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

/* ── Hook ── */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast musí být použito uvnitř <ToastProvider>')
  return ctx
}
