import { useRef, useCallback } from 'react'
import { animNormal, animSlow, animDramatic, easingBounce, easingEnter, easingSharp, gainColor } from './tokens'

/**
 * Hook for game-themed Web Animations API animations.
 * Attach `ref` to a DOM element, then call animation functions.
 *
 * @returns {{ ref, shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut }}
 *
 * @example
 * const { ref, shake, pop } = useGameAnimation()
 * // On failure:
 * <button ref={ref} onClick={() => shake()}>Action</button>
 *
 * @example
 * // PlayerPanel on turn:
 * const { ref, pulse } = useGameAnimation()
 * useEffect(() => { if (isActive) pulse() }, [isActive])
 * <PlayerPanel ref={ref} isActive={isActive} />
 */
export default function useGameAnimation() {
  const ref = useRef(null)

  /**
   * Shake — failure, rejection, error.
   * @param {number} [intensity=6] - Intensity in px
   * @param {number} [duration] - Duration in ms (default: animSlow)
   */
  const shake = useCallback((intensity = 6, duration = animSlow) => {
    const el = ref.current
    if (!el) return
    el.animate([
      { transform: 'translateX(0)' },
      { transform: `translateX(${intensity}px)` },
      { transform: `translateX(-${intensity}px)` },
      { transform: `translateX(${intensity * 0.6}px)` },
      { transform: `translateX(-${intensity * 0.6}px)` },
      { transform: `translateX(${intensity * 0.3}px)` },
      { transform: 'translateX(0)' },
    ], { duration, easing: easingSharp, fill: 'none' })
  }, [])

  /**
   * Knockback — physical hit, push back.
   * @param {number} [dx=0] - Horizontal offset in px
   * @param {number} [dy=-8] - Vertical offset in px (negative = up)
   * @param {number} [duration] - Duration of one half of the movement, in ms
   */
  const knockback = useCallback((dx = 0, dy = -8, duration = animNormal) => {
    const el = ref.current
    if (!el) return
    el.animate([
      { transform: 'translate(0, 0)', easing: easingEnter },
      { transform: `translate(${dx}px, ${dy}px)`, easing: easingBounce },
      { transform: 'translate(0, 0)' },
    ], { duration: duration * 2.5, fill: 'none' })
  }, [])

  /**
   * Pop (spawn/appear) — the element appears with a bounce effect.
   * @param {number} [scale=1.12] - Max scale overshoot
   * @param {number} [duration] - Duration in ms
   */
  const pop = useCallback((scale = 1.12, duration = animNormal) => {
    const el = ref.current
    if (!el) return
    el.animate([
      { transform: 'scale(0.6)', opacity: 0, offset: 0 },
      { transform: `scale(${scale})`, opacity: 1, offset: 0.6, easing: easingBounce },
      { transform: 'scale(1)', opacity: 1, offset: 1 },
    ], { duration, easing: easingEnter, fill: 'none' })
  }, [])

  /**
   * Pulse — attention, "on turn", notice.
   * @param {number} [scale=1.07] - Scale at the peak
   * @param {number} [duration] - Duration in ms
   */
  const pulse = useCallback((scale = 1.07, duration = animSlow) => {
    const el = ref.current
    if (!el) return
    el.animate([
      { transform: 'scale(1)' },
      { transform: `scale(${scale})` },
      { transform: 'scale(1)' },
    ], { duration, easing: easingBounce, fill: 'none' })
  }, [])

  /**
   * Flash — gain (green) or loss (red) color flash.
   * @param {string} [color=gainColor] - Hex color of the flash glow (default = gainColor token)
   * @param {number} [duration] - Duration in ms
   */
  const flash = useCallback((color = gainColor, duration = animNormal * 3) => {
    const el = ref.current
    if (!el) return
    el.animate([
      { boxShadow: `inset 0 0 0 2px ${color}BB, 0 0 16px ${color}55` },
      { boxShadow: `inset 0 0 0 1px ${color}44, 0 0 8px ${color}22` },
      { boxShadow: 'none' },
    ], { duration, easing: easingSharp, fill: 'none' })
  }, [])

  /**
   * Tilt — hesitation, indecision, magical effect.
   * @param {number} [deg=5] - Max rotation in degrees
   * @param {number} [duration] - Duration in ms
   */
  const tilt = useCallback((deg = 5, duration = animSlow) => {
    const el = ref.current
    if (!el) return
    el.animate([
      { transform: 'rotate(0deg)' },
      { transform: `rotate(${deg}deg)` },
      { transform: `rotate(-${deg * 0.4}deg)` },
      { transform: 'rotate(0deg)' },
    ], { duration: duration * 1.5, easing: easingBounce, fill: 'none' })
  }, [])

  /**
   * FadeIn (entrance) — the element appears.
   * @param {number} [duration] - Duration in ms
   * @returns {Animation} Web Animations API instance
   */
  const fadeIn = useCallback((duration = animSlow) => {
    const el = ref.current
    if (!el) return
    return el.animate([
      { opacity: 0, transform: 'scale(0.92) translateY(6px)' },
      { opacity: 1, transform: 'scale(1) translateY(0)' },
    ], { duration, easing: easingBounce, fill: 'none' })
  }, [])

  /**
   * FadeOut (exit) — the element leaves (fill: forwards → stays invisible).
   * @param {number} [duration] - Duration in ms
   * @returns {Animation} Web Animations API instance
   */
  const fadeOut = useCallback((duration = animSlow) => {
    const el = ref.current
    if (!el) return
    return el.animate([
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0.9)' },
    ], { duration, easing: easingSharp, fill: 'forwards' })
  }, [])

  /**
   * Victory — dramatic highlight for a win / objective completion.
   * Combines scale + glow pulse.
   * @param {number} [duration] - Duration in ms
   */
  const victory = useCallback((duration = animDramatic) => {
    const el = ref.current
    if (!el) return
    el.animate([
      { transform: 'scale(1)',    filter: 'brightness(1)' },
      { transform: 'scale(1.05)', filter: 'brightness(1.4)', offset: 0.3 },
      { transform: 'scale(0.98)', filter: 'brightness(0.9)', offset: 0.6 },
      { transform: 'scale(1)',    filter: 'brightness(1.2)', offset: 0.8 },
      { transform: 'scale(1)',    filter: 'brightness(1)' },
    ], { duration, easing: easingBounce, fill: 'none' })
  }, [])

  return { ref, shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut, victory }
}
