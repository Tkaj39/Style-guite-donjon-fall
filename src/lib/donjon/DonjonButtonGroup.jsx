import { useId } from 'react'
import { octagon, clipLeft, clipRight } from '../../utils/octagon'
import { SideOrnament, HexOrnament } from './Ornaments'
import { gold, goldDim, bg2, bgInactive, VARIANT_BG, VARIANT_BORDER, VARIANT_TITLE_GRAD } from './tokens'

const sizeMap = {
  xs: { h: 32, cx: 9.61,  px: 10, fontSize: '0.6875rem' },
  sm: { h: 40, cx: 12.01, px: 14, fontSize: '0.75rem'   },
  md: { h: 52, cx: 15.62, px: 18, fontSize: '0.8125rem' },
  lg: { h: 64, cx: 19.22, px: 22, fontSize: '0.875rem'  },
}

export default function DonjonButtonGroup({
  variant = 'menu',
  ornament = 'decorated',
  size = 'md',
  dividers = false,
  items = [],
  value,
  onChange,
}) {
  const s = sizeMap[size] ?? sizeMap.md
  const ornW = Math.round(24 * (s.h / 66) * 10) / 10
  const iconSize = { xs: 12, sm: 14, md: 18, lg: 22 }[size] ?? 14
  const rawId = useId()
  const gid   = rawId.replace(/:/g, '')
  const safeItems = items ?? []
  const last  = safeItems.length - 1
  const hasOrnaments = ornament !== 'plain'

  /* ── Plain mode: outer octagon border wrapper ────────────────────────────
     CSS `border` gets clipped on diagonal corners → outer/inner trick.
     The whole group gets one octagon wrapper so borders align at corners.
  ─────────────────────────────────────────────────────────────────────── */
  const groupInner = (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        ...(hasOrnaments ? {} : { clipPath: octagon(s.cx) }),
      }}
      role="group"
    >
      {safeItems.map((item, i) => {
        const isActive = item.value === value
        const isFirst  = i === 0
        const isLast   = i === last
        const isOnly   = isFirst && isLast
        const uid      = `${gid}-${i}`

        const clipPath = isOnly  ? octagon(s.cx)
                       : isFirst ? clipLeft(s.cx)
                       : isLast  ? clipRight(s.cx)
                       : undefined

                    const padL = hasOrnaments && (isFirst || isOnly) ? s.px + ornW : s.px
                    const padR = hasOrnaments && (isLast  || isOnly) ? s.px + ornW : s.px

                    const edgePadL = hasOrnaments && (isFirst || isOnly) ? s.cx + 8 : 0
                    const edgePadR = hasOrnaments && (isLast  || isOnly) ? s.cx + 8 : 0

        return (
          <div key={item.value} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && dividers && (
              <span
                aria-hidden="true"
                style={{
                  width: 1, height: 20,
                  background: goldDim,
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
            )}
            <button
              type="button"
              onClick={() => onChange?.(item.value)}
              aria-pressed={isActive}
              style={{
                position: 'relative',
                height: s.h,
                paddingLeft: padL,
                paddingRight: padR,
                clipPath,
                background: isActive
                  ? VARIANT_BG.default
                  : `linear-gradient(150deg,${bgInactive} 0%,${bg2} 70%)`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 150ms',
              }}
              className="hover:brightness-110 active:brightness-90 focus:outline-hidden focus-visible:drop-shadow-[0_0_8px_#FFC183AA]"
            >
              {hasOrnaments && (isFirst || isOnly) && <SideOrnament h={s.h} uid={`${uid}l`} />}
              {hasOrnaments && (isLast  || isOnly) && <SideOrnament h={s.h} uid={`${uid}r`} flip />}

              {hasOrnaments && <HexOrnament uid={`${uid}t`} edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} hexOffsetX={(padL - padR) / 2} />}
              {hasOrnaments && <HexOrnament uid={`${uid}b`} flip edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} hexOffsetX={(padL - padR) / 2} />}

              {item.icon && (
                <span style={{
                  width: iconSize, height: iconSize,
                  display: 'flex', alignItems: 'center', flexShrink: 0,
                  color: isActive ? gold : goldDim,
                  filter: isActive ? `drop-shadow(0 0 3px ${gold}66)` : undefined,
                  position: 'relative',
                }}>
                  {item.icon}
                </span>
              )}

              <span style={{
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: 1,
                position: 'relative',
                fontSize: s.fontSize,
                transition: 'font-size 200ms',
                ...(isActive ? {
                  backgroundImage: VARIANT_TITLE_GRAD.default,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : {
                  color: goldDim,
                }),
              }}>
                {item.label}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )

  if (!hasOrnaments) {
    return (
      <div style={{
        display: 'inline-flex',
        alignSelf: 'flex-start',
        clipPath: octagon(s.cx),
        background: VARIANT_BORDER.default,
        padding: 1,
        boxSizing: 'border-box',
      }}>
        {groupInner}
      </div>
    )
  }

  return groupInner
}
