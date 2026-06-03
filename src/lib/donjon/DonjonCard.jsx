import { useId } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { SideOrnament, ZkosenOrnament, RohOrnament, HexOrnament, ornamentHForCx } from './Ornaments'
import {
  goldDim, goldMid,
  VARIANT_BG, VARIANT_BORDER, VARIANT_HEADER_BG, VARIANT_TITLE_GRAD,
} from './tokens'

const variants = {
  default: {
    bg:        VARIANT_BG.default,
    border:    VARIANT_BORDER.default,
    headerBg:  VARIANT_HEADER_BG.default,
    titleGrad: VARIANT_TITLE_GRAD.default,
  },
  danger: {
    bg:        VARIANT_BG.danger,
    border:    VARIANT_BORDER.danger,
    headerBg:  VARIANT_HEADER_BG.danger,
    titleGrad: VARIANT_TITLE_GRAD.danger,
  },
  success: {
    bg:        VARIANT_BG.success,
    border:    VARIANT_BORDER.success,
    headerBg:  VARIANT_HEADER_BG.success,
    titleGrad: VARIANT_TITLE_GRAD.success,
  },
}


const cx = 16

export default function DonjonCard({
  children,
  title,
  description,
  footer,
  variant = 'default',
  ornament = 'decorated',
}) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const v = variants[variant] ?? variants.default
  const hasOrnaments = ornament !== 'plain'
  /* ZkosenOrnament: h=66 → 22×22px (matches cx=16).
     RohOrnament:    width must match cx → h = cx*(66/25). */
  const SideOrn = ornament === 'roh' ? RohOrnament : ZkosenOrnament
  const ornH = ornamentHForCx(cx, ornament === 'roh' ? 'roh' : 'zkosen')
  const hasHeader = !!(title || description)
  const headerPadding = hasOrnaments ? '14px 40px 12px' : '14px 28px 12px'
  const bodyPadding = hasOrnaments ? '16px 28px' : '18px 24px'
  const footerPadding = hasOrnaments ? '12px 28px 14px' : '12px 24px 14px'

  return (
    /* Outer border shell */
    <div style={{ clipPath: octagon(cx), background: v.border, padding: 1 }}>
    {/* Inner fill */}
    <div
      style={{
        position: 'relative',
        clipPath: octagonInner(cx),
        background: v.bg,
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100%',
        height: '100%',
      }}
    >
      {/* Header */}
      {hasHeader ? (
        <div
          style={{
            position: 'relative',
            background: v.headerBg,
            borderBottom: `1px solid ${v.border}44`,
            padding: headerPadding,
          }}
        >
          {hasOrnaments && <HexOrnament uid={`${uid}ht`} edgePadL={cx} />}

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
                color: goldMid,
                lineHeight: 1.4,
                textWrap: 'pretty',
              }}
            >
              {description}
            </p>
          )}
        </div>
      ) : null}

      {/* Body */}
      <div style={{ position: 'relative', padding: bodyPadding, flex: 1 }}>
        {!hasHeader && hasOrnaments && <HexOrnament uid={`${uid}ht`} edgePadL={cx} />}
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            position: 'relative',
            borderTop: `1px solid ${v.border}44`,
            padding: footerPadding,
          }}
        >
          {hasOrnaments && <HexOrnament uid={`${uid}hb`} flip edgePadL={cx} />}
          {footer}
        </div>
      )}

      {/* Side ornaments — after content, so they render above the header */}
      {hasOrnaments && hasHeader && <SideOrn h={ornH} uid={`${uid}l`} />}
      {hasOrnaments && hasHeader && <SideOrn h={ornH} uid={`${uid}r`} flip />}
    </div>
    </div>
  )
}
