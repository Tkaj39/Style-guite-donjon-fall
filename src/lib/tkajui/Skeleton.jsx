/* ── Skeleton (tkajui) ────────────────────────────────────────────────
   Placeholder shape for content that is loading. Renders a gradient
   that shimmers across the X axis.

   Variants:
     'text'   — single line of text (rounded ends)
     'block'  — rectangular block (cards, images, panels)
     'circle' — round avatar / icon placeholder
   ─────────────────────────────────────────────────────────────────── */
import { surface2, surface3 } from './tokens'

/**
 * @param {'text'|'block'|'circle'} [variant='text']
 * @param {string|number} [width='100%']
 * @param {string|number} [height]    Defaults: text=1em, block=80px, circle=40px (square).
 * @param {number} [lines=1]  Only meaningful for variant='text'. Last line is 60 % wide.
 * @param {boolean} [animated=true]
 */
export default function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  animated = true,
  className,
  style,
  ...rest
}) {
  if (variant === 'text' && lines > 1) {
    return (
      <span
        className={className}
        style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}
        aria-hidden="true"
        {...rest}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            width={i === lines - 1 ? '60%' : (width ?? '100%')}
            animated={animated}
          />
        ))}
      </span>
    )
  }

  const isCircle = variant === 'circle'
  const isText   = variant === 'text'
  const w = width  ?? (isCircle ? 40 : '100%')
  const h = height ?? (isCircle ? (typeof w === 'number' ? w : 40) : isText ? '1em' : 80)
  const radius = isCircle ? '50%' : isText ? 4 : 6

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: w,
        height: h,
        borderRadius: radius,
        background: animated
          ? `linear-gradient(90deg, ${surface2} 0%, ${surface3} 50%, ${surface2} 100%)`
          : surface2,
        backgroundSize: animated ? '200% 100%' : undefined,
        animation: animated ? 'skeletonShimmer 1.4s ease-in-out infinite' : undefined,
        verticalAlign: isText ? 'middle' : undefined,
        ...style,
      }}
      {...rest}
    />
  )
}
