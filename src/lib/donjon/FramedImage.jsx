/* ── FramedImage (donjon-fall-ui) ──────────────────────────────────────
   Image inside an ornamental heraldic frame — octagonal silhouette + gold
   border + optional SideOrnament brackets on the left/right edges and
   RohOrnament accents in the corners.

   Use cases: NPC portraits in the dialogue panel, hero artwork in the
   main menu, character sheet portrait, win-screen MVP image.
   ─────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { octagon } from '../../utils/octagon'
import { SideOrnament, RohOrnament } from './Ornaments'
import { bg2, gold, goldDim } from './tokens'

const SIZE_MAP = {
  xs: { box: 48,  cx: 8,  ornW: 14, rohW: 16 },
  sm: { box: 80,  cx: 12, ornW: 22, rohW: 22 },
  md: { box: 128, cx: 18, ornW: 30, rohW: 28 },
  lg: { box: 192, cx: 24, ornW: 40, rohW: 36 },
  xl: { box: 256, cx: 32, ornW: 50, rohW: 44 },
}

/**
 * FramedImage — image with a donjon ornamental frame.
 *
 * @param {string} src              Image URL.
 * @param {string} [alt]            Alt text.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|number} [size='md']  Frame box size in px.
 * @param {'decorated'|'plain'} [ornament='decorated']  Decorated adds
 *   SideOrnament + RohOrnament accents; plain is just the gold octagon frame.
 * @param {string} [color]          Border color override (defaults to gold).
 *
 * @example <FramedImage src="/aragorn.jpg" alt="Aragorn" size="lg" />
 * @example <FramedImage src="/icon.png" size="sm" ornament="plain" />
 */
export default function FramedImage({
  src,
  alt = '',
  size = 'md',
  ornament = 'decorated',
  color,
  className,
  style,
  ...rest
}) {
  const s = typeof size === 'number'
    ? { box: size, cx: Math.round(size * 0.14), ornW: Math.round(size * 0.20), rohW: Math.round(size * 0.18) }
    : (SIZE_MAP[size] ?? SIZE_MAP.md)
  const borderColor = color ?? gold
  const dimColor = color ? `${color}88` : goldDim
  const clip = octagon(s.cx)
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const hasOrnaments = ornament !== 'plain'

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: s.box,
        height: s.box,
        ...style,
      }}
      {...rest}
    >
      {/* Outer = border color via border-trick */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: borderColor,
          clipPath: clip,
          padding: 1,
          boxSizing: 'border-box',
          filter: `drop-shadow(0 0 6px ${borderColor}33)`,
        }}
      >
        {/* Inner = parchment-dark background; image covers it */}
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            background: bg2,
            clipPath: clip,
            overflow: 'hidden',
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </span>
      </span>

      {/* Side ornaments — vertical brackets on left + right */}
      {hasOrnaments && (
        <>
          <SideOrnament
            h={s.box}
            uid={`${uid}l`}
            color={borderColor}
            colorDim={dimColor}
            style={{ left: 1, pointerEvents: 'none' }}
          />
          <SideOrnament
            h={s.box}
            uid={`${uid}r`}
            flip
            color={borderColor}
            colorDim={dimColor}
            style={{ right: 1, pointerEvents: 'none' }}
          />
          {/* Corner accents on all 4 corners */}
          <RohOrnament h={s.rohW} uid={`${uid}tl`}                color={borderColor} colorDim={dimColor} style={{ top: 1, left: 1, pointerEvents: 'none' }} />
          <RohOrnament h={s.rohW} uid={`${uid}tr`} flip           color={borderColor} colorDim={dimColor} style={{ top: 1, right: 1, pointerEvents: 'none' }} />
          <RohOrnament h={s.rohW} uid={`${uid}bl`} bottom         color={borderColor} colorDim={dimColor} style={{ bottom: 1, left: 1, pointerEvents: 'none' }} />
          <RohOrnament h={s.rohW} uid={`${uid}br`} flip bottom    color={borderColor} colorDim={dimColor} style={{ bottom: 1, right: 1, pointerEvents: 'none' }} />
        </>
      )}
    </span>
  )
}
