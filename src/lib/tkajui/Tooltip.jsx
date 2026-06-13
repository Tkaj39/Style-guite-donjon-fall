import { useState, useRef, useCallback, useEffect } from 'react'
import { surface3, borderMid, accent, textMid, successColor, successBg, successBorder, successText, dangerColor, dangerBg, dangerBorder, dangerText, warningColor, warningBg, warningBorder, warningText, infoColor, infoBg, infoBorder, infoText, zTooltip } from './tokens'
import { getPosition, resolveFlip, Arrow } from '../shared/tooltipUtils'
import { octagon, octagonInner } from '../shared/octagon'

/* ── Varianty ── */
const VARIANTS = {
  default: { bg: surface3,    border: borderMid,     title: accent,        text: textMid  },
  danger:  { bg: dangerBg,    border: dangerBorder,   title: dangerColor,   text: dangerText  },
  success: { bg: successBg,   border: successBorder,  title: successColor,  text: successText },
  warning: { bg: warningBg,   border: warningBorder,  title: warningColor,  text: warningText },
  info:    { bg: infoBg,      border: infoBorder,     title: infoColor,     text: infoText    },
}

/* ── Tooltip ── */
export default function Tooltip({
  children,
  content,
  title,
  placement = 'top',     // 12 hodnot: top/bottom/left/right × default/-start/-end
  variant = 'default',
  delay = 120,
  disabled = false,
  autoFlip = true,
}) {
  const [pos, setPos] = useState(null)
  const [effectivePlacement, setEP] = useState(placement)
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const timerRef  = useRef(null)
  const v = VARIANTS[variant] ?? VARIANTS.default

  const show = useCallback(() => {
    if (disabled || !content) return
    timerRef.current = setTimeout(() => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (!rect) return
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
            zIndex: zTooltip,
            pointerEvents: 'none',
            maxWidth: 240,
            minWidth: 80,
          }}
        >
          {/* Octagon bubble via border-trick. The Arrow stays OUTSIDE the
              clipped layers (clipPath would slice it off) — it anchors to
              this relatively-positioned wrapper, which is the same box. */}
          <span style={{
            display: 'block',
            position: 'relative',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.55))',
          }}>
            <Arrow placement={effectivePlacement} color={v.border} />
            <span style={{
              display: 'block',
              background: v.border,
              clipPath: octagon(6),
              padding: 1,
              boxSizing: 'border-box',
            }}>
              <span style={{
                display: 'block',
                background: v.bg,
                clipPath: octagonInner(6),
                padding: title ? '8px 12px' : '5px 10px',
                boxSizing: 'border-box',
              }}>
                {title && (
                  <p style={{ margin: '0 0 3px 0', fontSize: '0.6875rem', fontWeight: 600, color: v.title, letterSpacing: '0.04em' }}>
                    {title}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: '0.75rem', color: v.text, lineHeight: 1.5 }}>
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
