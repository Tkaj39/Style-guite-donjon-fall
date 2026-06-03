/* ── FramedImage (donjon-fall-ui) ──────────────────────────────────────
   Image inside a donjon ornamental frame — octagonal silhouette + gold
   border + RohOrnament accents in all 4 corners.

   Use cases: NPC portraits in the dialogue panel, hero artwork in the
   main menu, character sheet portrait, win-screen MVP image.
   ─────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { octagon } from '../shared/octagon'
import { RohOrnament, ornamentHForCx } from './Ornaments'
import { bg2, gold, goldDim } from './tokens'

// box = pixel size of the (square) frame
// cx  = octagon corner cut size — keeps a ~15 % cut for a strong silhouette
const SIZE_MAP = {
  xs: { box: 64,  cx: 10 },
  sm: { box: 96,  cx: 14 },
  md: { box: 144, cx: 20 },
  lg: { box: 208, cx: 28 },
  xl: { box: 288, cx: 38 },
}

/**
 * FramedImage — image with a donjon ornamental frame.
 *
 * @param {string} src              Image URL.
 * @param {string} [alt]            Alt text.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|number} [size='md']  Frame box size in px.
 * @param {'decorated'|'plain'} [ornament='decorated']  Decorated adds
 *   RohOrnament accents in all 4 corners; plain is just the gold octagon frame.
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
    ? { box: size, cx: Math.round(size * 0.15) }
    : (SIZE_MAP[size] ?? SIZE_MAP.md)
  const borderColor = color ?? gold
  const dimColor = color ? `${color}88` : goldDim
  const clip = octagon(s.cx)
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const hasOrnaments = ornament !== 'plain'

  // Proportional roh ornament size derived from the octagon cx — same helper
  // used by ActionTile / DonjonCard, keeps the corner accent visually scaled
  // to the frame's bevel.
  const ornH = hasOrnaments ? ornamentHForCx(s.cx, 'roh') : 0
  // RohOrnament's built-in offset (h/14) is tuned for ActionTile's tight
  // box. FramedImage has a bigger relative cx, so the ornaments end up
  // glued to the edge. Push them inward to sit on the diagonal cut.
  const ornOffset = Math.max(2, Math.round(s.cx * 0.4))
  const ornPos = { top: { top: ornOffset, left: ornOffset }, bottom: { bottom: ornOffset, left: ornOffset }, topRight: { top: ornOffset, right: ornOffset }, bottomRight: { bottom: ornOffset, right: ornOffset } }

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
      {/* Outer = gold border via border-trick */}
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
        {/* Inner = parchment-dark background + image cover */}
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

      {/* Corner accents — 4 × RohOrnament aligned to the octagon diagonals.
          flip = horizontal mirror, bottom = vertical mirror. */}
      {hasOrnaments && (
        <>
          <RohOrnament h={ornH} uid={`${uid}tl`}              color={borderColor} colorDim={dimColor} bgFill={bg2} style={ornPos.top} />
          <RohOrnament h={ornH} uid={`${uid}tr`} flip         color={borderColor} colorDim={dimColor} bgFill={bg2} style={ornPos.topRight} />
          <RohOrnament h={ornH} uid={`${uid}bl`} bottom       color={borderColor} colorDim={dimColor} bgFill={bg2} style={ornPos.bottom} />
          <RohOrnament h={ornH} uid={`${uid}br`} flip bottom  color={borderColor} colorDim={dimColor} bgFill={bg2} style={ornPos.bottomRight} />
        </>
      )}
    </span>
  )
}
