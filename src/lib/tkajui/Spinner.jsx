/* ── Spinner (tkajui) ─────────────────────────────────────────────────
   Indeterminate loading indicator — a thin ring with one rotating arc.

   Use Spinner when a single action is in flight and you can't show
   progress; use ProgressBar (variant=indeterminate) when the work
   happens inside a longer surface.
   ─────────────────────────────────────────────────────────────────── */
import { accent, borderDefault, textMid } from './tokens'
import { animSlow } from '../shared/tokens'

const SIZES = {
  xs: { d: 14, stroke: 2 },
  sm: { d: 20, stroke: 2 },
  md: { d: 28, stroke: 3 },
  lg: { d: 40, stroke: 4 },
  xl: { d: 56, stroke: 5 },
}

/**
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [size='md']
 * @param {string} [color]   Override accent color of the rotating arc.
 * @param {string} [trackColor]  Override muted color of the static ring.
 * @param {string} [label]   Accessible name (default 'Loading…').
 *                           When omitted the spinner is decorative (aria-hidden).
 */
export default function Spinner({
  size = 'md',
  color,
  trackColor,
  label,
  className,
  style,
  ...rest
}) {
  const s = typeof size === 'number'
    ? { d: size, stroke: Math.max(2, Math.round(size / 9)) }
    : (SIZES[size] ?? SIZES.md)
  const arcColor   = color      ?? accent
  const ringColor  = trackColor ?? borderDefault
  const r = (s.d - s.stroke) / 2
  const c = 2 * Math.PI * r
  const decorative = !label

  return (
    <span
      className={className}
      role={decorative ? undefined : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: textMid,
        ...style,
      }}
      {...rest}
    >
      <svg
        width={s.d}
        height={s.d}
        viewBox={`0 0 ${s.d} ${s.d}`}
        style={{
          animation: `spin ${animSlow * 4}ms linear infinite`,
          display: 'block',
        }}
      >
        <circle
          cx={s.d / 2}
          cy={s.d / 2}
          r={r}
          fill="none"
          stroke={ringColor}
          strokeWidth={s.stroke}
        />
        <circle
          cx={s.d / 2}
          cy={s.d / 2}
          r={r}
          fill="none"
          stroke={arcColor}
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * 0.25} ${c}`}
          transform={`rotate(-90 ${s.d / 2} ${s.d / 2})`}
        />
      </svg>
      {label && <span>{label}</span>}
    </span>
  )
}
