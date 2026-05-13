import { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { octagon } from '../utils/octagon'

/* ── Varianty ── */
const VARIANTS = {
  default: {
    bg:        'linear-gradient(150deg,#353751 0%,#2A2948 70%)',
    border:    '#8F7458',
    titleGrad: 'linear-gradient(90deg,#F9F9F9 0%,#B8956A 100%)',
    icon:      '#8F7458',
    bar:       '#8F7458',
  },
  success: {
    bg:        'linear-gradient(150deg,#183D20 0%,#0A250E 70%)',
    border:    '#40A055',
    titleGrad: 'linear-gradient(90deg,#C0F0C8 0%,#40A055 100%)',
    icon:      '#40A055',
    bar:       '#40A055',
  },
  danger: {
    bg:        'linear-gradient(150deg,#3D1818 0%,#250A0A 70%)',
    border:    '#C04040',
    titleGrad: 'linear-gradient(90deg,#F9C0C0 0%,#C04040 100%)',
    icon:      '#C04040',
    bar:       '#C04040',
  },
  warning: {
    bg:        'linear-gradient(150deg,#3D2E10 0%,#250E04 70%)',
    border:    '#C08040',
    titleGrad: 'linear-gradient(90deg,#FFD580 0%,#C08040 100%)',
    icon:      '#C08040',
    bar:       '#C08040',
  },
  info: {
    bg:        'linear-gradient(150deg,#182A3D 0%,#0A1525 70%)',
    border:    '#4080C0',
    titleGrad: 'linear-gradient(90deg,#C0D8F0 0%,#4080C0 100%)',
    icon:      '#4080C0',
    bar:       '#4080C0',
  },
}

const POSITIONS = {
  'bottom-right': { bottom: 24, right: 24, alignItems: 'flex-end' },
  'top-right':    { top: 24,    right: 24, alignItems: 'flex-end' },
  'bottom-left':  { bottom: 24, left: 24,  alignItems: 'flex-start' },
  'top-left':     { top: 24,    left: 24,  alignItems: 'flex-start' },
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
  /* default + info */
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

  return (
    <div style={{ width: 320, animation: 'toastSlideIn 0.2s ease' }}>
      {/* Outer border shell */}
      <div style={{ clipPath: octagon(cx), background: v.border, padding: 1 }}>
        {/* Inner fill */}
        <div style={{ clipPath: octagon(cx - 1), background: v.bg, display: 'flex', flexDirection: 'column' }}>

          {/* Content row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px 10px' }}>
            {/* Ikona */}
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <VariantIcon variant={variant} color={v.icon} />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <p style={{
                  margin: '0 0 2px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  backgroundImage: v.titleGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {title}
                </p>
              )}
              {message && (
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>
                  {message}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => onRemove(id)}
              aria-label="Zavřít"
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                background: 'transparent',
                border: `1px solid ${v.border}44`,
                borderRadius: 3,
                color: '#8F7458',
                cursor: 'pointer',
                marginTop: -2,
                transition: 'background 0.12s, color 0.12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${v.border}22`; e.currentTarget.style.color = '#F0E6D3' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8F7458' }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Progress bar */}
          {duration > 0 && (
            <div style={{ height: 2, background: `${v.border}33`, margin: '0 12px 10px', borderRadius: 1, overflow: 'hidden' }}>
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
            @keyframes toastSlideIn {
              from { opacity: 0; transform: translateX(20px) }
              to   { opacity: 1; transform: translateX(0) }
            }
            @keyframes toastProgress {
              from { transform: scaleX(1) }
              to   { transform: scaleX(0) }
            }
          `}</style>
          <div style={{
            position: 'fixed',
            zIndex: 2000,
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
