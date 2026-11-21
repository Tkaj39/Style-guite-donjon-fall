import { useState, useCallback } from 'react'
import { animationStyle } from './gameAnimations'

/**
 * Remount-on-play helper for CSS keyframe animations.
 *
 * Mirrors the pattern used on `/animations`: bump a React `key` to
 * restart the animation, track `playing`, and clear it on
 * `animationend`. Multi-phase combat/move sequences stay in the game
 * app — this hook only covers the single-shot trigger.
 *
 * Requires `import 'donjon-fall-ui/styles'` so the keyframes exist.
 *
 * @param {string|import('./gameAnimations').GameAnimationPreset} preset
 *   Key into `gameAnimationPresets`, or an inline `{ name, duration, easing, fill }`.
 * @param {{
 *   onEnd?: () => void,
 *   duration?: number,
 *   easing?: string,
 *   fill?: string,
 *   iterationCount?: number|string,
 * }} [options]
 *
 * @returns {{
 *   playing: boolean,
 *   animKey: number,
 *   play: () => void,
 *   style: { animation: string },
 *   bind: { key: number, style: { animation: string }, onAnimationEnd: (e: AnimationEvent) => void },
 * }}
 *
 * @example
 * const move = useCssAnimation('dieMove')
 * <div {...move.bind}><DieFace value={3} /></div>
 * <button onClick={move.play} disabled={move.playing}>Play</button>
 *
 * @example
 * // Always-on infinite pulse (no remount needed):
 * style={{ animation: active ? animationStyle('dieStuckPulse') : 'none' }}
 */
export default function useCssAnimation(preset, options = {}) {
  const { onEnd, ...overrides } = options
  const [animKey, setAnimKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(() => {
    if (playing) return
    setPlaying(true)
    setAnimKey((k) => k + 1)
  }, [playing])

  const handleEnd = useCallback((e) => {
    // Ignore bubbled events from animated children (e.g. FloatFeedback).
    if (e && e.target !== e.currentTarget) return
    setPlaying(false)
    onEnd?.()
  }, [onEnd])

  const animation = animKey > 0 ? animationStyle(preset, overrides) : 'none'

  return {
    playing,
    animKey,
    play,
    style: { animation },
    bind: {
      key: animKey,
      style: { animation },
      onAnimationEnd: handleEnd,
    },
  }
}
