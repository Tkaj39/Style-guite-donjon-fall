/* ── DonjonTooltip ─────────────────────────────────────────────────────────
   Herní tooltip s pergamenovým stylem — tmavé pozadí, zlatý border.
   API identické s TkajUI Tooltip, jiná vizuální estetika.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useCallback, useEffect } from 'react'
import {
  gold, goldDim,
  bg2,
  textMid,
} from './tokens'
import { getPosition, resolveFlip, Arrow } from '../../utils/tooltipUtils'

const Z_TOOLTIP = 2100

export default function DonjonTooltip({
  children,
  content,
  title,
  placement = 'top',     // 12 hodnot — viz TOOLTIP_PLACEMENTS
  delay     = 120,
  disabled  = false,
  autoFlip  = true,      // automaticky otoč pokud by tooltip přesahoval viewport
}) {
  const [pos, setPos]               = useState(null)
  const [effectivePlacement, setEP] = useState(placement)
  const triggerRef                  = useRef(null)
  const tooltipRef                  = useRef(null)
  const timerRef                    = useRef(null)

  const show = useCallback(() => {
    if (disabled || !content) return
    timerRef.current = setTimeout(() => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      // První render — odhadované rozměry, druhý effect doladí po měření
      const tooltipBox = tooltipRef.current?.getBoundingClientRect()
      const final = autoFlip ? resolveFlip(rect, tooltipBox, placement) : placement
      setEP(final)
      setPos(getPosition(rect, final))
    }, delay)
  }, [disabled, content, placement, delay, autoFlip])

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
          ref={tooltipRef}
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
          {/* Arrow + bubble ve společném filtru → shadow kruje celý tvar */}
          <span style={{ display: 'block', position: 'relative', filter: `drop-shadow(0 4px 16px rgba(0,0,0,0.75)) drop-shadow(0 0 8px ${goldDim}33)` }}>
            <Arrow placement={effectivePlacement} color={goldDim} />
            {/* Outer border */}
            <span style={{ display: 'block', clipPath: 'polygon(8px 0%,calc(100% - 8px) 0%,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0% calc(100% - 8px),0% 8px)', background: goldDim, padding: 1 }}>
              {/* Inner content */}
              <span style={{
                display: 'block',
                clipPath: 'polygon(7px 0%,calc(100% - 7px) 0%,100% 7px,100% calc(100% - 7px),calc(100% - 7px) 100%,7px 100%,0% calc(100% - 7px),0% 7px)',
                background: bg2,
                padding: title ? '8px 12px' : '5px 10px',
              }}>
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
                <p style={{ margin: 0, fontSize: '0.75rem', color: textMid, lineHeight: 1.5 }}>
                  {content}
                </p>
              </span>
            </span>
          </span>
        </span>
      )}
    </span>
  )
}
