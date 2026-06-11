/* ── Thumbnail (tkajui) ──────────────────────────────────────────────
   Small clickable image preview with optional ring (selected) and
   caption. Use for media pickers, gallery grids, save-slot screens.

   Unlike Avatar this is a media tile (square or aspect-respecting),
   not a circular identity glyph.
   ─────────────────────────────────────────────────────────────────── */
import { octagon, octagonInner } from '../shared/octagon'
import { surface3, borderDefault, accent, textHigh, textMid } from './tokens'

const SIZES = {
  xs: 48,
  sm: 72,
  md: 96,
  lg: 128,
  xl: 192,
}

// Octagon corner-cut per size — proportional to the tile.
const SIZE_CX = {
  xs: 5,
  sm: 7,
  md: 9,
  lg: 11,
  xl: 14,
}

/**
 * @param {string} src                 Image URL.
 * @param {string} [alt='']
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|number} [size='md']  Box width in px.
 * @param {number} [aspect=1]          Width / height ratio (1 = square, 16/9, etc.).
 * @param {boolean} [selected=false]   Accent ring + raised look.
 * @param {string} [caption]           Below-image label.
 * @param {React.ReactNode} [badge]    Top-right corner slot (count, status).
 * @param {(e: MouseEvent) => void} [onClick]  Becomes a button when set.
 */
export default function Thumbnail({
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
  const ringColor = selected ? accent : borderDefault

  const Wrapper = isInteractive ? 'button' : 'div'

  return (
    <Wrapper
      type={isInteractive ? 'button' : undefined}
      onClick={onClick}
      aria-pressed={isInteractive ? selected || undefined : undefined}
      className={[isInteractive ? 'tkajui-focus' : null, className].filter(Boolean).join(' ') || undefined}
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
      {/* Octagon ring via border-trick — 2 px ring (accent when selected). */}
      <span
        style={{
          position: 'relative',
          display: 'block',
          width: w,
          height: h,
          background: ringColor,
          clipPath: octagon(cx),
          padding: 2,
          boxSizing: 'border-box',
          transition: 'background 120ms, transform 120ms, filter 120ms',
          transform: selected ? 'translateY(-1px)' : 'none',
          filter: selected ? `drop-shadow(0 0 4px ${accent}55)` : 'none',
        }}
      >
        <span style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          background: surface3,
          clipPath: octagonInner(cx, 2),
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
            fontSize: '0.75rem',
            color: selected ? textHigh : textMid,
            maxWidth: w,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {caption}
        </span>
      )}
    </Wrapper>
  )
}
