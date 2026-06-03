import { octagon, clipLeft, clipRight } from '../shared/octagon'
import {
  surface2, surface3, surface4,
  borderDefault,
  accent,
  textHigh, textMid,
} from './tokens'

const sizeMap = {
  xs: { h: 32, cx: 9.61,  px: 10, fontSize: '0.6875rem' },
  sm: { h: 40, cx: 12.01, px: 14, fontSize: '0.75rem'   },
  md: { h: 52, cx: 15.62, px: 18, fontSize: '0.8125rem' },
  lg: { h: 64, cx: 19.22, px: 22, fontSize: '0.875rem'  },
}

/**
 * ButtonGroup — TkajUI segmented control.
 * Variants: menu | tabs. Clean UI palette.
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
  const iconSize = { xs: 12, sm: 14, md: 18, lg: 22 }[size] ?? 14
  const safeItems = items ?? []
  const last  = safeItems.length - 1

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }} role="group">
      {safeItems.map((item, i) => {
        const isActive = item.value === value
        const isFirst  = i === 0
        const isLast   = i === last
        const isOnly   = isFirst && isLast

        const clipPath = isOnly  ? octagon(s.cx)
                       : isFirst ? clipLeft(s.cx)
                       : isLast  ? clipRight(s.cx)
                       : undefined

        return (
          <div key={item.value} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && dividers && (
              <span
                aria-hidden="true"
                style={{
                  width: 1, height: 20,
                  background: borderDefault,
                  opacity: 0.6,
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
                paddingLeft: s.px,
                paddingRight: s.px,
                clipPath,
                background: isActive ? surface3 : surface2,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 150ms, background 150ms',
              }}
              className="tkajui-segment-button"
            >
              {item.icon && (
                <span style={{
                  width: iconSize, height: iconSize,
                  display: 'flex', alignItems: 'center', flexShrink: 0,
                  color: isActive ? accent : textMid,
                  position: 'relative',
                }}>
                  {item.icon}
                </span>
              )}

              <span style={{
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.04em',
                lineHeight: 1,
                position: 'relative',
                fontSize: s.fontSize,
                color: isActive ? textHigh : textMid,
                transition: 'color 150ms',
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
