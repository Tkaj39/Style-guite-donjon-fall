import { useState, useRef, useCallback, useEffect } from 'react'
import {
  surface3,
  borderDefault, borderMid,
  accent,
  textHigh, textMid,
  successColor, successBg, successBorder, successText,
  dangerColor, dangerBg, dangerBorder, dangerText,
  warningColor, warningBg, warningBorder, warningText,
  infoColor, infoBg, infoBorder, infoText,
  zTooltip,
} from './tokens'
import { getPosition, Arrow } from '../../utils/tooltipUtils'

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
            zIndex: zTooltip,
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
              <p style={{ margin: '0 0 3px 0', fontSize: '0.6875rem', fontWeight: 600, color: v.title, letterSpacing: '0.04em' }}>
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
