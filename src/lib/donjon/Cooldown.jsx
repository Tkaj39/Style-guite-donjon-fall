/* ── Cooldown (donjon-fall-ui) ───────────────────────────────────────
   Circular or linear countdown indicator. Visual sweep from `remaining`
   to 0 over `total`. Use as an overlay on ActionTile / IconButton or
   standalone above an icon.

   Pass `remaining` (ms) + `total` (ms). The component does NOT manage
   a timer — your game loop owns the clock and passes updated values.
   ─────────────────────────────────────────────────────────────────── */
import { bg2, gold, goldDim, textHigh, textMid } from './tokens'

const SIZES = { sm: 32, md: 48, lg: 64, xl: 96 }

/**
 * @param {number} remaining       Ms left.
 * @param {number} total           Total cooldown ms.
 * @param {'circle'|'linear'} [shape='circle']
 * @param {'sm'|'md'|'lg'|'xl'|number} [size='md']  Box dim or bar width.
 * @param {string} [color]
 * @param {string} [trackColor]
 * @param {boolean} [showLabel=true]   Time-remaining in seconds.
 * @param {React.ReactNode} [icon]     Center icon (circle only).
 */
export default function Cooldown({
  remaining,
  total,
  shape = 'circle',
  size = 'md',
  color,
  trackColor,
  showLabel = true,
  icon,
  className,
  style,
  ...rest
}) {
  const clamped = Math.max(0, Math.min(remaining, total))
  const ratio = total > 0 ? clamped / total : 0
  const done = clamped <= 0
  const fill = color ?? gold
  const track = trackColor ?? goldDim
  const seconds = Math.ceil(clamped / 1000)

  if (shape === 'linear') {
    const w = typeof size === 'number' ? size : (SIZES[size] ?? SIZES.md) * 3
    return (
      <div
        role="progressbar"
        aria-valuenow={Math.round(ratio * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={className}
        style={{
          width: w,
          background: bg2,
          border: `1px solid ${track}`,
          borderRadius: 4,
          overflow: 'hidden',
          height: 8,
          position: 'relative',
          ...style,
        }}
        {...rest}
      >
        <div style={{
          height: '100%',
          width: `${ratio * 100}%`,
          background: fill,
          transition: 'width 120ms linear',
        }} />
        {showLabel && !done && (
          <span style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.625rem', color: textHigh, fontVariantNumeric: 'tabular-nums',
            mixBlendMode: 'difference',
          }}>{seconds}s</span>
        )}
      </div>
    )
  }

  // circle (default)
  const d = typeof size === 'number' ? size : (SIZES[size] ?? SIZES.md)
  const stroke = Math.max(3, Math.round(d / 9))
  const r = (d - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * ratio

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(ratio * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: d, height: d,
        ...style,
      }}
      {...rest}
    >
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={d/2} cy={d/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={d/2} cy={d/2} r={r}
          fill="none" stroke={fill} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform={`rotate(-90 ${d/2} ${d/2})`}
          style={{ transition: 'stroke-dasharray 120ms linear' }}
        />
      </svg>
      <span style={{
        position: 'relative',
        color: done ? textMid : textHigh,
        fontWeight: 700,
        fontSize: `${Math.max(10, d * 0.28)}px`,
        fontVariantNumeric: 'tabular-nums',
        textAlign: 'center',
        lineHeight: 1,
      }}>
        {done ? (icon ?? '✓') : (showLabel ? `${seconds}` : (icon ?? null))}
      </span>
    </div>
  )
}
