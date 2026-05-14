import { useId } from 'react'
import { octagon } from '../utils/octagon'
import { SideOrnament, HexOrnament } from '../lib/tkajui/Ornaments'

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

export default function DonjonCard({
  children,
  title,
  description,
  footer,
  variant = 'default',
}) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const v = variants[variant] ?? variants.default
  const ornH = 66

  return (
    /* Outer border shell */
    <div style={{ clipPath: octagon(cx), background: v.border, padding: 1, display: 'inline-block', minWidth: 240 }}>
    {/* Inner fill */}
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
      {/* Side ornaments — only when there's a header to anchor them to */}
      {(title || description) && <SideOrnament h={ornH} uid={`${uid}l`} />}
      {(title || description) && <SideOrnament h={ornH} uid={`${uid}r`} flip />}

      {/* Header */}
      {(title || description) ? (
        <div
          style={{
            position: 'relative',
            background: v.headerBg,
            borderBottom: `1px solid ${v.border}44`,
            padding: '14px 40px 12px',
          }}
        >
          <HexOrnament uid={`${uid}ht`} edgePadL={cx} />

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
            <p
              style={{
                margin: '4px 0 0',
                fontSize: '0.75rem',
                color: '#8F7458',
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          )}
        </div>
      ) : null}

      {/* Body */}
      <div style={{ position: 'relative', padding: '16px 28px', flex: 1 }}>
        {!title && !description && <HexOrnament uid={`${uid}ht`} edgePadL={cx} />}
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
          <HexOrnament uid={`${uid}hb`} flip edgePadL={cx} />
          {footer}
        </div>
      )}
    </div>
    </div>
  )
}
