import { useId } from 'react'
import { scoopBBPath, scoopCirclePath, SHAPE_SIZES } from '../shared/octagon'

/**
 * ScoopClip — wrapper for elements with concave scooped corners.
 *
 * Two modes via the `shape` prop:
 *
 *  **shape="bezier"** (default) — RESPONSIVE
 *    SVG clipPath with objectBoundingBox and a Q bezier curve. The shape
 *    automatically adapts to arbitrary element dimensions (0–1 coords).
 *    Under extreme aspect-ratio changes the curve deforms slightly.
 *    `cornerSize` is in the 0–1 range (fraction).
 *
 *  **shape="circle"** — FIXED CIRCULAR CUTOUT
 *    SVG clipPath with absolute px and an A arc command (mathematically
 *    precise circle). The element MUST have explicit width/height —
 *    ScoopClip sets them from the `size` preset if no style override is given.
 *    `cornerSize` is in PIXELS (circle radius).
 *
 * Sizing — unified terminology with the octagon system:
 *   - `size`       — 'xs' | 'sm' | 'md' | 'lg' (same system as octagon).
 *                    In bezier mode maps to SHAPE_SIZES[size].bb (relative).
 *                    In circle mode maps to SHAPE_SIZES[size].scoop (absolute px)
 *                    and the default container width/height come from
 *                    SHAPE_SIZES[size].w/h.
 *   - `cornerSize` — direct value (0–1 in bezier, px in circle). Wins over size.
 *   - `r`          — DEPRECATED alias for cornerSize (backward compat).
 *
 * @example
 * // Responsive bezier — adapts to the container
 * <ScoopClip size="md" style={{ width: 200, height: 60 }}>...</ScoopClip>
 *
 * // Fixed circular cutout — 13px circle on every corner
 * <ScoopClip shape="circle" size="md">...</ScoopClip>
 *
 * // Custom size via cornerSize
 * <ScoopClip shape="circle" cornerSize={20} style={{ width: 250, height: 80 }}>...</ScoopClip>
 */
export default function ScoopClip({
  shape = 'bezier',
  size,
  cornerSize,
  r,                 // DEPRECATED — use cornerSize. Will be removed in the next major.
  children,
  style = {},
  className,
  borderColor,
  borderWidth = 1,
}) {
  const id     = useId().replace(/:/g, '')
  const clipId = `scoop-${id}`

  // Backward compat: cornerSize wins, then the r alias
  if (r !== undefined && !import.meta.env.PROD) {
    console.warn(
      "[ScoopClip] The 'r' prop is deprecated and will be removed in the next major release. Use 'cornerSize' instead — same value, clearer name."
    )
  }
  const explicitSize = cornerSize ?? r

  const isCircle = shape === 'circle'

  if (isCircle) {
    /* ── Circle mode: absolute px, fixed circular cutout ────────────── */
    const preset = size && SHAPE_SIZES[size]
    const w = pxValue(style.width)  ?? preset?.w ?? 170
    const h = pxValue(style.height) ?? preset?.h ?? 52
    const rPx = explicitSize ?? preset?.scoop ?? 13

    // CSS clip-path: path() — works with absolute px
    const clip = `path('${scoopCirclePath(w, h, rPx)}')`

    // Auto-set width/height if they aren't in style
    const baseStyle = {
      width: w,
      height: h,
      ...style,
    }

    if (borderColor) {
      // Border trick: outer with clip-path larger by (r + bw) px (bigger circle, bigger arc)
      const outerClip = `path('${scoopCirclePath(w + 2 * borderWidth, h + 2 * borderWidth, rPx + borderWidth)}')`
      return (
        <div style={{ position: 'relative', display: 'inline-block', width: w, height: h }}>
          <div style={{
            position: 'absolute', inset: -borderWidth,
            clipPath: outerClip,
            background: borderColor,
          }} />
          <div className={className} style={{
            ...baseStyle,
            position: 'relative',
            clipPath: clip,
          }}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className={className} style={{ ...baseStyle, clipPath: clip }}>
        {children}
      </div>
    )
  }

  /* ── Bezier mode: responsive, SVG clipPath objectBoundingBox ──── */
  const finalR = explicitSize != null
    ? explicitSize
    : (size && SHAPE_SIZES[size]?.bb) ?? 0.25

  return (
    <>
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={scoopBBPath(finalR)} />
          </clipPath>
        </defs>
      </svg>

      {borderColor ? (
        <div style={{ clipPath: `url(#${clipId})`, background: borderColor }}>
          <div className={className} style={{ clipPath: `url(#${clipId})`, margin: borderWidth, ...style }}>
            {children}
          </div>
        </div>
      ) : (
        <div className={className} style={{ clipPath: `url(#${clipId})`, ...style }}>
          {children}
        </div>
      )}
    </>
  )
}

function pxValue(v) {
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const m = v.match(/^(\d+(?:\.\d+)?)px$/)
    if (m) return parseFloat(m[1])
  }
  return null
}
