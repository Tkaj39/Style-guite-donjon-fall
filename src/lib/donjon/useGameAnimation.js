import { useRef, useCallback } from 'react'
import { animNormal, animSlow, animDramatic, easingBounce, easingEnter, easingSharp, gainColor } from './tokens'

/**
 * Hook pro herní Web Animations API animace.
 * Připoj `ref` na DOM element, pak volej animační funkce.
 *
 * @returns {{ ref, shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut }}
 *
 * @example
 * const { ref, shake, pop } = useGameAnimation()
 * // Při neúspěchu:
 * <button ref={ref} onClick={() => shake()}>Akce</button>
 *
 * @example
 * // PlayerPanel na tahu:
 * const { ref, pulse } = useGameAnimation()
 * useEffect(() => { if (isActive) pulse() }, [isActive])
 * <PlayerPanel ref={ref} isActive={isActive} />
 */
export default function useGameAnimation() {
  const ref = useRef(null)

  /**
   * Zamíchání (shake) — neúspěch, odmítnutí, chyba.
   * @param {number} [intensity=6] - Intenzita v px
   * @param {number} [duration] - Délka v ms (default: animSlow)
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
   * Knockback — fyzický zásah, odsunutí.
   * @param {number} [dx=0] - Horizontální offset v px
   * @param {number} [dy=-8] - Vertikální offset v px (záporné = nahoru)
   * @param {number} [duration] - Délka půlky pohybu v ms
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
   * Pop (spawn/appear) — element se objeví s bounce efektem.
   * @param {number} [scale=1.12] - Maximální scale overshoot
   * @param {number} [duration] - Délka v ms
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
   * Pulse — pozornost, "na tahu", upozornění.
   * @param {number} [scale=1.07] - Scale při vrcholu
   * @param {number} [duration] - Délka v ms
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
   * Flash — zisk (zelená) nebo ztráta (červená) barvy.
   * @param {string} [color=gainColor] - Hex barva flash glow (default = gainColor token)
   * @param {number} [duration] - Délka v ms
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
   * Tilt (náklon) — nerozhodnost, váhání, magický efekt.
   * @param {number} [deg=5] - Max rotace ve stupních
   * @param {number} [duration] - Délka v ms
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
   * FadeIn (entrance) — element přichází.
   * @param {number} [duration] - Délka v ms
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
   * FadeOut (exit) — element odchází (fill: forwards → zůstane neviditelný).
   * @param {number} [duration] - Délka v ms
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
   * Victory — dramatické zvýraznění výhry/splnění cíle.
   * Kombinuje scale + glow puls.
   * @param {number} [duration] - Délka v ms
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
