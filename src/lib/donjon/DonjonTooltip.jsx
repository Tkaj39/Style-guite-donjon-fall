/* ── DonjonTooltip ─────────────────────────────────────────────────────────
   Game tooltip with a parchment style — dark background, gold border.
   API identical to TkajUI Tooltip, different visual aesthetic.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useCallback, useEffect } from 'react'
import {
  gold, goldDim,
  bg2,
  textMid,
  dangerColor, successColor, warningColor, infoColor,
} from './tokens'
import { getPosition, resolveFlip, Arrow } from '../shared/tooltipUtils'

const Z_TOOLTIP = 2100

/* Variant lookup — parity with TkajUI Tooltip.
   For each variant: border (outer color), title (tooltip title color). */
const VARIANTS = {
  default: { border: goldDim,      title: gold         },
  danger:  { border: dangerColor,  title: dangerColor  },
  success: { border: successColor, title: successColor },
  warning: { border: warningColor, title: warningColor },
  info:    { border: infoColor,    title: infoColor    },
}

export default function DonjonTooltip({
  children,
  content,
  title,
  placement = 'top',     // 12 values — see TOOLTIP_PLACEMENTS
  variant   = 'default', // 'default'|'danger'|'success'|'warning'|'info' — parity with TkajUI Tooltip
  delay     = 120,
  disabled  = false,
  autoFlip  = true,      // automatically flip when the tooltip would overflow the viewport
  className,
  style,
  ...rest
}) {
  const v = VARIANTS[variant] ?? VARIANTS.default
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
      // First render — estimated dimensions, the second effect refines after measuring
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
      className={className}
      style={{ display: 'inline-block', position: 'relative', ...style }}
      {...rest}
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
          {/* Arrow + bubble in a shared filter → shadow wraps the whole shape */}
          <span style={{ display: 'block', position: 'relative', filter: `drop-shadow(0 4px 16px rgba(0,0,0,0.75)) drop-shadow(0 0 8px ${v.border}33)` }}>
            <Arrow placement={effectivePlacement} color={v.border} />
            {/* Outer border — variant-aware */}
            <span style={{ display: 'block', clipPath: 'polygon(8px 0%,calc(100% - 8px) 0%,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0% calc(100% - 8px),0% 8px)', background: v.border, padding: 1 }}>
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
                    color: v.title,
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
