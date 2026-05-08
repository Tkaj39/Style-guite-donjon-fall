import { useId } from 'react'
import { octagon, clipLeft, clipRight } from '../utils/octagon'
import { SideOrnament, HexOrnament } from './Ornaments'



const sizeMap = {
  xs: { h: 32, cx: 9.61,  px: 10, fontSize: '0.6875rem' },
  sm: { h: 40, cx: 12.01, px: 14, fontSize: '0.75rem'   },
  md: { h: 52, cx: 15.62, px: 18, fontSize: '0.8125rem' },
  lg: { h: 64, cx: 19.22, px: 22, fontSize: '0.875rem'  },
}

/**
 * @param {'menu'|'tabs'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} dividers
 * @param {{ value: string, label: string, icon?: React.ReactNode }[]} items
 * @param {string} value
 * @param {(value: string) => void} onChange
 */
export default function ButtonGroup({
  variant = 'menu',
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
  const last  = items.length - 1

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }} role="group">
      {items.map((item, i) => {
        const isActive = item.value === value
        const isFirst  = i === 0
        const isLast   = i === last
        const isOnly   = isFirst && isLast
        const uid      = `${gid}-${i}`

        const clipPath = isOnly  ? octagon(s.cx)
                       : isFirst ? clipLeft(s.cx)
                       : isLast  ? clipRight(s.cx)
                       : undefined

        const padL = isFirst || isOnly ? s.px + ornW : s.px
        const padR = isLast  || isOnly ? s.px + ornW : s.px

        // edgePad clears the clipped corner area; only apply where clipping exists
        const edgePadL = isFirst || isOnly ? s.cx + 8 : 0
        const edgePadR = isLast  || isOnly ? s.cx + 8 : 0

        return (
          <div key={item.value} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && dividers && (
              <span
                aria-hidden="true"
                style={{
                  width: 1, height: 20,
                  background: '#8F7458',
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
                  ? 'linear-gradient(150deg,#353751 0%,#2A2948 70%)'
                  : 'linear-gradient(150deg,#232238 0%,#1B1A30 70%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 150ms',
              }}
              className="hover:brightness-110 active:brightness-90 focus:outline-none focus-visible:brightness-110"
            >
              {(isFirst || isOnly) && <SideOrnament h={s.h} uid={`${uid}l`} />}
              {(isLast  || isOnly) && <SideOrnament h={s.h} uid={`${uid}r`} flip />}

              <HexOrnament uid={`${uid}t`} edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} hexOffsetX={(padL - padR) / 2} />
              <HexOrnament uid={`${uid}b`} flip edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} hexOffsetX={(padL - padR) / 2} />

              {item.icon && (
                <span style={{
                  width: iconSize, height: iconSize,
                  display: 'flex', alignItems: 'center', flexShrink: 0,
                  color: isActive ? '#FFC183' : '#8F7458',
                  filter: isActive ? 'drop-shadow(0 0 3px #FFC18366)' : undefined,
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
                  backgroundImage: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : {
                  color: '#8F7458',
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
}
