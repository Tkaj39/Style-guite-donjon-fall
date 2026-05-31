import { SHAPE_SIZES } from '../../utils/octagon'

/**
 * CornerOrnament — decorative corner ornament
 *
 * Always placed in the corner of an absolutely positioned container.
 * For the other corners use CSS transform: scaleX(-1), scaleY(-1), scale(-1).
 *
 * Props:
 *   cornerSize {number|'xs'|'sm'|'md'|'lg'}    ornament size — px or size preset
 *                                              (unified terminology with octagon and ScoopClip).
 *                                              The preset maps to SHAPE_SIZES[preset].cut.
 *   size       {number}                        DEPRECATED alias for cornerSize (px, default 16)
 *   color      {string}                        fill color — default 'currentColor' (inherits from parent)
 *   variant    {'bracket'|'dot'|'diamond'|'cross'}  ornament shape
 *   cornerType {'cut'|'round'|'scoop'}         geometry of the corner the ornament sits on (default 'cut')
 *   style      {object}                        extra inline styles (position, top, left…)
 */
export default function CornerOrnament({
  cornerSize,
  size       = 16,
  color      = 'currentColor',
  variant    = 'bracket',
  cornerType = 'cut',
  style      = {},
}) {
  // Resolve: cornerSize (preset string or px number) > size (px number)
  const resolved = cornerSize ?? size
  const s = typeof resolved === 'string'
    ? (SHAPE_SIZES[resolved]?.cut ?? 16)
    : resolved

  // ── bracket ────────────────────────────────────────────────────────────────
  if (variant === 'bracket') {
    const t   = Math.max(1, Math.round(s * 0.15))   // line thickness
    const len = Math.round(s * 0.55)                  // arm length
    const r   = Math.round(s * 0.22)                  // arc radius (round / scoop)

    // round — smooth convex arc at the elbow (matches a rounded corner)
    if (cornerType === 'round') {
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
          <path
            d={`M 0,${len} L 0,${r} A ${r},${r} 0 0 1 ${r},0 L ${len},0`}
            stroke={color}
            strokeWidth={t}
            strokeLinecap="square"
          />
        </svg>
      )
    }

    // scoop — concave arc at the elbow (matches a scoop-rounded corner)
    if (cornerType === 'scoop') {
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
          <path
            d={`M 0,${len} L 0,${r} A ${r},${r} 0 0 0 ${r},0 L ${len},0`}
            stroke={color}
            strokeWidth={t}
            strokeLinecap="square"
          />
        </svg>
      )
    }

    // cut (default) — sharp L-bracket (two rectangles)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <rect x={0} y={0} width={t}   height={len} fill={color} />
        <rect x={0} y={0} width={len} height={t}   fill={color} />
      </svg>
    )
  }

  // ── dot ────────────────────────────────────────────────────────────────────
  if (variant === 'dot') {
    const r      = Math.round(s * 0.14)
    const gap    = Math.round(s * 0.28)
    const lineL  = Math.round(s * 0.40)
    const t      = Math.max(1, Math.round(s * 0.10))
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <circle cx={r} cy={r} r={r} fill={color} />
        <rect x={gap} y={0}   width={lineL} height={t} fill={color} opacity="0.55" />
        <rect x={0}   y={gap} width={t}     height={lineL} fill={color} opacity="0.55" />
      </svg>
    )
  }

  // ── diamond ────────────────────────────────────────────────────────────────
  if (variant === 'diamond') {
    const d = Math.round(s * 0.24)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <polygon points={`${d},0 ${d * 2},${d} ${d},${d * 2} 0,${d}`} fill={color} />
      </svg>
    )
  }

  // ── cross ──────────────────────────────────────────────────────────────────
  if (variant === 'cross') {
    const t   = Math.max(1, Math.round(s * 0.13))
    const arm = Math.round(s * 0.50)
    const dot = Math.round(s * 0.09)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <rect x={0} y={0} width={arm} height={t}   fill={color} />
        <rect x={0} y={0} width={t}   height={arm} fill={color} />
        <circle cx={arm - dot * 1.5} cy={dot * 1.8} r={dot} fill={color} opacity="0.5" />
      </svg>
    )
  }

  return null
}