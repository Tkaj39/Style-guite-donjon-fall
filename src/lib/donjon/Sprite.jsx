/* ── Sprite (donjon-fall-ui) ─────────────────────────────────────────
   Animated sprite-sheet renderer. Pass a single horizontal strip image
   of N equally-sized frames + frame count + fps. Driven by the Web
   Animations API (no per-instance <style> keyframes, no CSS string
   generation) so the component is self-contained for library publish.

   For single static icons use an <img>. For Lottie / complex vector
   animations use a dedicated tool.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'

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
  const ref = useRef(null)
  const totalWidth = frameWidth * frames
  const stripWidth = totalWidth * scale
  const durationMs = (frames / fps) * 1000

  useEffect(() => {
    const el = ref.current
    if (!el || !src || !playing) return undefined

    // Discrete frame-by-frame keyframes — N+1 stops so each frame holds
    // for one slot. Equivalent to CSS `steps(N)` over background-position.
    const keyframes = Array.from({ length: frames + 1 }, (_, i) => ({
      backgroundPositionX: `${-i * frameWidth * scale}px`,
      easing: 'steps(1)',
    }))

    const anim = el.animate(keyframes, {
      duration: durationMs,
      iterations: iterations === 'infinite' ? Infinity : iterations,
      fill: 'forwards',
    })

    return () => anim.cancel()
  }, [src, playing, frames, frameWidth, scale, durationMs, iterations])

  if (!src) return fallback

  return (
    <span
      ref={ref}
      role="img"
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-block',
        width:  frameWidth  * scale,
        height: frameHeight * scale,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${stripWidth}px ${frameHeight * scale}px`,
        backgroundPosition: '0 0',
        imageRendering: 'pixelated',
        transform: flip ? 'scaleX(-1)' : undefined,
        ...style,
      }}
      {...rest}
    />
  )
}
