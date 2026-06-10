/* ── DonjonThumbnail (donjon-fall-ui) ────────────────────────────────
   Game variant of Thumbnail. Same src / size / aspect / selected /
   caption / badge / onClick API as the TkajUI version — visuals swap
   to the parchment palette:
     • Border-trick gold octagon shell (selected = gold, idle = goldDim)
     • bg2 fallback so a slow/blocked image still shows the tile
     • Gold uppercase caption (smaller, letter-spaced), parchment feel
     • Selected: gold glow ring + lift
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../shared/octagon'
import { bg2, gold, goldDim, goldMid } from './tokens'

const SIZES = {
  xs: 48,
  sm: 72,
  md: 96,
  lg: 128,
  xl: 192,
}

const SIZE_CX = {
  xs: 5,
  sm: 7,
  md: 9,
  lg: 11,
  xl: 14,
}

/**
 * @param {string} src
 * @param {string} [alt='']
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|number} [size='md']
 * @param {number} [aspect=1]
 * @param {boolean} [selected=false]
 * @param {string} [caption]
 * @param {React.ReactNode} [badge]
 * @param {(e: MouseEvent) => void} [onClick]
 */
export default function DonjonThumbnail({
  src,
  alt = '',
  size = 'md',
  aspect = 1,
  selected = false,
  caption,
  badge,
  onClick,
  className,
  style,
  ...rest
}) {
  const w = typeof size === 'number' ? size : (SIZES[size] ?? SIZES.md)
  const h = Math.round(w / aspect)
  const cx = typeof size === 'string' ? (SIZE_CX[size] ?? SIZE_CX.md) : Math.round(w * 0.09)
  const isInteractive = !!onClick
  const ringColor = selected ? gold : goldDim

  const Wrapper = isInteractive ? 'button' : 'div'

  return (
    <Wrapper
      type={isInteractive ? 'button' : undefined}
      onClick={onClick}
      aria-pressed={isInteractive ? selected || undefined : undefined}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 6,
        padding: 0,
        background: 'transparent',
        border: 'none',
        cursor: isInteractive ? 'pointer' : 'default',
        textAlign: 'left',
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: 'relative',
          display: 'block',
          width: w,
          height: h,
          background: ringColor,
          clipPath: octagon(cx),
          padding: 2,             // ring thickness (slightly thicker than other shells for media tiles)
          boxSizing: 'border-box',
          transition: 'background 120ms, transform 120ms, filter 120ms',
          transform: selected ? 'translateY(-1px)' : 'none',
          filter: selected ? `drop-shadow(0 0 6px ${gold}66)` : 'none',
        }}
      >
        <span style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          background: bg2,        // image fallback fill
          clipPath: octagon(Math.max(cx - 1, 0)),
          overflow: 'hidden',
        }}>
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {badge && (
            <span style={{ position: 'absolute', top: 4, right: 4, pointerEvents: 'none' }}>
              {badge}
            </span>
          )}
        </span>
      </span>
      {caption && (
        <span
          style={{
            fontSize: '0.6875rem',
            color: selected ? gold : goldMid,
            maxWidth: w,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: 0.6,
            fontWeight: selected ? 700 : 600,
            transition: 'color 120ms',
          }}
        >
          {caption}
        </span>
      )}
    </Wrapper>
  )
}
