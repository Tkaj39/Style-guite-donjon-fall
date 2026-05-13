import { useState, useRef, useCallback, useEffect } from 'react'

/* ── Varianty ── */
const VARIANTS = {
  default: { bg: '#1E1C30', border: '#8F7458', text: '#D4C5A9' },
  danger:  { bg: '#2A1010', border: '#C04040', text: '#F9C0C0' },
  success: { bg: '#102018', border: '#40A055', text: '#C0F0C8' },
  warning: { bg: '#2A1E08', border: '#C08040', text: '#FFD580' },
  info:    { bg: '#0E1828', border: '#4080C0', text: '#A0C8F0' },
}

/* ── Výpočet pozice ── */
function getPosition(rect, placement) {
  const gap = 8
  switch (placement) {
    case 'bottom': return { top: rect.bottom + gap, left: rect.left + rect.width / 2, tx: '-50%', ty: '0' }
    case 'left':   return { top: rect.top + rect.height / 2, left: rect.left - gap, tx: '-100%', ty: '-50%' }
    case 'right':  return { top: rect.top + rect.height / 2, left: rect.right + gap, tx: '0',    ty: '-50%' }
    default:       return { top: rect.top - gap,  left: rect.left + rect.width / 2, tx: '-50%', ty: '-100%' }
  }
}

/* ── Šipka ── */
function Arrow({ placement, color }) {
  const s = 5
  const base = { position: 'absolute', width: 0, height: 0 }
  const styles = {
    top:    { ...base, bottom: -s, left: '50%', transform: 'translateX(-50%)', borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderTop: `${s}px solid ${color}` },
    bottom: { ...base, top: -s,   left: '50%', transform: 'translateX(-50%)', borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderBottom: `${s}px solid ${color}` },
    left:   { ...base, right: -s, top: '50%',  transform: 'translateY(-50%)', borderTop: `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderLeft: `${s}px solid ${color}` },
    right:  { ...base, left: -s,  top: '50%',  transform: 'translateY(-50%)', borderTop: `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderRight: `${s}px solid ${color}` },
  }
  return <span style={styles[placement] ?? styles.top} />
}

/* ── Tooltip ── */
export default function Tooltip({
  children,
  content,
  title,
  placement = 'top',
  variant = 'default',
  delay = 120,
  disabled = false,
}) {
  const [pos, setPos] = useState(null)
  const triggerRef = useRef(null)
  const timerRef  = useRef(null)
  const v = VARIANTS[variant] ?? VARIANTS.default

  const show = useCallback(() => {
    if (disabled || !content) return
    timerRef.current = setTimeout(() => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      setPos(getPosition(rect, placement))
    }, delay)
  }, [disabled, content, placement, delay])

  const hide = useCallback(() => {
    clearTimeout(timerRef.current)
    setPos(null)
  }, [])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <span
      ref={triggerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {children}

      {pos && (
        <span
          role="tooltip"
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            transform: `translate(${pos.tx}, ${pos.ty})`,
            zIndex: 9999,
            pointerEvents: 'none',
            maxWidth: 240,
            minWidth: 80,
          }}
        >
          <span style={{
            display: 'block',
            position: 'relative',
            background: v.bg,
            border: `1px solid ${v.border}`,
            borderRadius: 4,
            padding: title ? '8px 12px' : '5px 10px',
            boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px ${v.border}33`,
          }}>
            <Arrow placement={placement} color={v.border} />
            {title && (
              <p style={{ margin: '0 0 3px 0', fontSize: '0.6875rem', fontWeight: 700, color: v.border, letterSpacing: '0.05em' }}>
                {title}
              </p>
            )}
            <p style={{ margin: 0, fontSize: '0.75rem', color: v.text, lineHeight: 1.5 }}>
              {content}
            </p>
          </span>
        </span>
      )}
    </span>
  )
}
