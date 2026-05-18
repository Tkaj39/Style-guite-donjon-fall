import { octagon } from '../../utils/octagon'

const variants = {
  default: {
    bg: 'linear-gradient(150deg,#353751 0%,#2A2948 70%)',
    border: '#8F7458',
    headerBg: 'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)',
    titleGrad: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
  },
  danger: {
    bg: 'linear-gradient(150deg,#3D1818 0%,#250A0A 70%)',
    border: '#C04040',
    headerBg: 'linear-gradient(150deg,#4A1A1A 0%,#2E0C0C 70%)',
    titleGrad: 'linear-gradient(180deg,#F9C0C0 0%,#C04040 100%)',
  },
  success: {
    bg: 'linear-gradient(150deg,#183D20 0%,#0A250E 70%)',
    border: '#40A055',
    headerBg: 'linear-gradient(150deg,#1E4A28 0%,#0D2E12 70%)',
    titleGrad: 'linear-gradient(180deg,#C0F0C8 0%,#40A055 100%)',
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
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.4 }}>
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
