import { octagon } from '../../utils/octagon'
import {
  surface2, surface3, surface4,
  borderDefault, borderMid,
  textHigh, textMid,
  accent,
  dangerColor, dangerBg, dangerBorder, dangerText, dangerHeaderBg, dangerDescColor,
  successColor, successBg, successBorder, successText, successHeaderBg, successDescColor,
} from './tokens'

const variants = {
  default: {
    bg:        surface3,
    border:    borderDefault,
    headerBg:  surface4,
    titleGrad: `linear-gradient(180deg,${textHigh} 0%,${textMid} 100%)`,
    descColor: textMid,
  },
  danger: {
    bg:        dangerBg,
    border:    dangerBorder,
    headerBg:  dangerHeaderBg,
    titleGrad: `linear-gradient(180deg,${dangerText} 0%,${dangerColor} 100%)`,
    descColor: dangerDescColor,
  },
  success: {
    bg:        successBg,
    border:    successBorder,
    headerBg:  successHeaderBg,
    titleGrad: `linear-gradient(180deg,${successText} 0%,${successColor} 100%)`,
    descColor: successDescColor,
  },
}

const cx = 16

/**
 * Card — TkajUI základní karta.
 * Oktagonální tvar, bez Ornaments. DonjonCard rozšiřuje tuto komponentu
 * o SideOrnament + HexOrnament pro herní vzhled.
 */
export default function Card({
  children,
  title,
  description,
  footer,
  variant = 'default',
}) {
  const v = variants[variant] ?? variants.default

  return (
    <div style={{ clipPath: octagon(cx), background: v.border, padding: 1, display: 'inline-block', minWidth: 240 }}>
      <div
        style={{
          position: 'relative',
          clipPath: octagon(Math.max(cx - 1, 0)),
          background: v.bg,
          display: 'flex',
          flexDirection: 'column',
          minWidth: '100%',
          height: '100%',
        }}
      >
        {/* Header */}
        {(title || description) ? (
          <div
            style={{
              position: 'relative',
              background: v.headerBg,
              borderBottom: `1px solid ${v.border}44`,
              padding: '14px 28px 12px',
            }}
          >
            {title && (
              <h3
                style={{
                  margin: 0,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  backgroundImage: v.titleGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: v.descColor, lineHeight: 1.4 }}>
                {description}
              </p>
            )}
          </div>
        ) : null}

        {/* Body */}
        <div style={{ position: 'relative', padding: '16px 28px', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              position: 'relative',
              borderTop: `1px solid ${v.border}44`,
              padding: '12px 28px 14px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
