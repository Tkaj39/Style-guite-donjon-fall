/* ── DonjonTooltip ─────────────────────────────────────────────────────────
   Herní tooltip s pergamenovým stylem — tmavé pozadí, zlatý border.
   API identické s TkajUI Tooltip, jiná vizuální estetika.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useCallback, useEffect } from 'react'
import {
  gold, goldDim,
  bg2,
  textMid, textParchment,
} from './tokens'

const Z_TOOLTIP = 2100

/* ── Výpočet pozice ── */
function getPosition(rect, placement) {
  const gap = 8
  switch (placement) {
    case 'bottom': return { top: rect.bottom + gap, left: rect.left + rect.width / 2, tx: '-50%', ty: '0' }
    case 'left':   return { top: rect.top + rect.height / 2, left: rect.left - gap,  tx: '-100%', ty: '-50%' }
    case 'right':  return { top: rect.top + rect.height / 2, left: rect.right + gap, tx: '0',     ty: '-50%' }
    default:       return { top: rect.top - gap,  left: rect.left + rect.width / 2,  tx: '-50%',  ty: '-100%' }
  }
}

/* ── Šipka v goldDim barvě ── */
function Arrow({ placement }) {
  const s = 5
  const base = { position: 'absolute', width: 0, height: 0 }
  const styles = {
    top:    { ...base, bottom: -s, left: '50%', transform: 'translateX(-50%)', borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderTop: `${s}px solid ${goldDim}` },
    bottom: { ...base, top: -s,   left: '50%', transform: 'translateX(-50%)', borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderBottom: `${s}px solid ${goldDim}` },
    left:   { ...base, right: -s, top: '50%',  transform: 'translateY(-50%)', borderTop: `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderLeft: `${s}px solid ${goldDim}` },
    right:  { ...base, left: -s,  top: '50%',  transform: 'translateY(-50%)', borderTop: `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderRight: `${s}px solid ${goldDim}` },
  }
  return <span style={styles[placement] ?? styles.top} />
}

export default function DonjonTooltip({
  children,
  content,
  title,
  placement = 'top',
  delay     = 120,
  disabled  = false,
}) {
  const [pos, setPos]   = useState(null)
  const triggerRef      = useRef(null)
  const timerRef        = useRef(null)

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
            zIndex: Z_TOOLTIP,
            pointerEvents: 'none',
            maxWidth: 240,
            minWidth: 80,
          }}
        >
          <span style={{
            display: 'block',
            position: 'relative',
            background: bg2,
            border: `1px solid ${goldDim}`,
            borderRadius: 2,
            padding: title ? '8px 12px' : '5px 10px',
            boxShadow: `0 4px 20px rgba(0,0,0,0.7), 0 0 0 1px ${goldDim}22`,
          }}>
            <Arrow placement={placement} />
            {title && (
              <p style={{
                margin: '0 0 3px 0',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: gold,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {title}
              </p>
            )}
            <p style={{
              margin: 0,
              fontSize: '0.75rem',
              color: textMid,
              lineHeight: 1.5,
            }}>
              {content}
            </p>
          </span>
        </span>
      )}
    </span>
  )
}
