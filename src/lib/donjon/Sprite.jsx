/* ── Sprite (donjon-fall-ui) ─────────────────────────────────────────
   Animated sprite-sheet renderer using CSS steps(). Pass a single
   horizontal strip image of N equally-sized frames + frame count +
   fps. The component shifts background-position via a steps() keyframe
   animation.

   For single static icons use an <img> or an <svg>. For Lottie /
   complex vector animations use a dedicated tool.
   ─────────────────────────────────────────────────────────────────── */
import { useId } from 'react'

/**
 * @param {string} src               Horizontal sprite-sheet image URL.
 * @param {number} frameWidth        Single-frame width in px.
 * @param {number} frameHeight       Single-frame height in px.
 * @param {number} frames            Total number of frames in the strip.
 * @param {number} [fps=12]          Frames per second.
 * @param {boolean} [playing=true]
 * @param {'infinite'|number} [iterations='infinite']
 * @param {number} [scale=1]         Render scale multiplier.
 * @param {boolean} [flip=false]     Horizontal mirror.
 * @param {React.ReactNode} [fallback]  Rendered when src is empty.
 */
export default function Sprite({
  src,
  frameWidth,
  frameHeight,
  frames,
  fps = 12,
  playing = true,
  iterations = 'infinite',
  scale = 1,
  flip = false,
  fallback = null,
  className,
  style,
  ...rest
}) {
  const rawId = useId()
  const uid = `sprite-${rawId.replace(/:/g, '')}`
  if (!src) return fallback

  const duration = (frames / fps).toFixed(3)
  const totalWidth = frameWidth * frames

  return (
    <span
      role="img"
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-block',
        width:  frameWidth  * scale,
        height: frameHeight * scale,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${totalWidth * scale}px ${frameHeight * scale}px`,
        backgroundPosition: '0 0',
        imageRendering: 'pixelated',
        transform: flip ? 'scaleX(-1)' : undefined,
        animation: playing
          ? `${uid} ${duration}s steps(${frames}) ${iterations === 'infinite' ? 'infinite' : iterations}`
          : undefined,
        ...style,
      }}
      {...rest}
    >
      <style>{`
        @keyframes ${uid} {
          from { background-position: 0 0; }
          to   { background-position: -${totalWidth * scale}px 0; }
        }
      `}</style>
    </span>
  )
}
