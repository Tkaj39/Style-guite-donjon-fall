import { octagon } from '../../utils/octagon'
import {
  accent, accentBg, accentBorder,
  surface3, borderDefault, textHigh, textMid,
  successColor, successBg, successBorder, successText,
  dangerColor, dangerBg, dangerBorder, dangerText,
  warningColor, warningBg, warningBorder, warningText,
  infoColor, infoBg, infoBorder, infoText,
} from './tokens'

const variantMap = {
  default: { bg: surface3,    border: borderDefault, text: textMid,      dot: textMid      },
  primary: { bg: accentBg,    border: accentBorder,  text: accent,        dot: accent        },
  success: { bg: successBg,   border: successBorder,  text: successText,   dot: successColor  },
  danger:  { bg: dangerBg,    border: dangerBorder,   text: dangerText,    dot: dangerColor   },
  warning: { bg: warningBg,   border: warningBorder,  text: warningText,   dot: warningColor  },
  info:    { bg: infoBg,      border: infoBorder,     text: infoText,      dot: infoColor     },
}

const sizeMap = {
  sm: { cx: 3, px: 7,  py: 2, fontSize: '0.625rem',  gap: 4, dotSize: 5,  iconSize: 10 },
  md: { cx: 4, px: 10, py: 3, fontSize: '0.6875rem', gap: 5, dotSize: 6,  iconSize: 12 },
}

/**
 * Badge — TkajUI base badge.
 * Octagonal shape, clean UI palette.
 * Variants: default | primary | success | danger | warning | info
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
}) {
  const v = variantMap[variant] ?? variantMap.default
  const s = sizeMap[size] ?? sizeMap.md

  return (
    <span style={{ display: 'inline-flex', alignSelf: 'flex-start', clipPath: octagon(s.cx), background: v.border, padding: 1 }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: s.gap,
          clipPath: octagon(Math.max(s.cx - 1, 0)),
          background: v.bg,
          paddingLeft: s.px,
          paddingRight: s.px,
          paddingTop: s.py,
          paddingBottom: s.py,
          fontSize: s.fontSize,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: v.text,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {dot && !icon && (
          <span style={{ display: 'inline-block', width: s.dotSize, height: s.dotSize, borderRadius: '50%', background: v.dot, flexShrink: 0 }} />
        )}
        {icon && (
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0, color: v.text }}>
            {icon}
          </span>
        )}
        {children}
      </span>
    </span>
  )
}
