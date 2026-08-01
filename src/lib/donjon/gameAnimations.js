/**
 * Named CSS keyframe presets for game-piece choreography.
 *
 * Keyframes ship in `donjon.css` (`import 'donjon-fall-ui/styles'`).
 * Distances are driven by `--donjon-hex-*` CSS variables so consumers
 * can retarget motion to a different hex size.
 *
 * Pair with `useCssAnimation` for the remount-on-play trigger pattern
 * used throughout `/animations`, or call `animationStyle()` yourself
 * when you already own the phase state machine.
 */

/** Default md-hex board geometry (mirrors CSS vars in donjon.css). */
export const GAME_PIECE_HEX = {
  /** One hex right — 62 px tile + 12 px gap */
  stepX: 74,
  /** One hex up — 72 px tile + 12 px gap */
  stepY: 84,
  /** Mid-arc lift for a single-hex move */
  arcY: -12,
  /** Mid-arc lift for a two-hex move */
  arcY2: -18,
  /** Vertical offset of the top die in a tower */
  towerStack: 16,
}

/**
 * @typedef {object} GameAnimationPreset
 * @property {string} name             CSS @keyframes name
 * @property {number} duration         Duration in ms
 * @property {string} easing           CSS easing
 * @property {string} [fill='both']    animation-fill-mode
 * @property {number|string} [iterationCount=1]
 */

/** @type {Record<string, GameAnimationPreset>} */
export const gameAnimationPresets = {
  /** Single-hex die / tower move */
  dieMove: {
    name: 'die-move',
    duration: 320,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Two-hex die move */
  dieMove2: {
    name: 'die-move-2',
    duration: 380,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Jump onto a die (ends on tower stack) */
  dieMoveOnto: {
    name: 'die-move-onto',
    duration: 280,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Jump off a tower top onto a hex */
  dieMoveOffTower: {
    name: 'die-move-off-tower',
    duration: 280,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** One hex up — bent / L-shaped moves */
  dieMoveUp: {
    name: 'die-move-up',
    duration: 260,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Combat impact shake */
  dieShake: {
    name: 'die-shake',
    duration: 180,
    easing: 'ease-in',
    fill: 'both',
  },
  /** Occupy — drop onto an empty hex */
  dieDrop: {
    name: 'die-drop',
    duration: 240,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Tower collapse — fall and fade */
  dieCollapse: {
    name: 'die-collapse',
    duration: 300,
    easing: 'ease-in',
    fill: 'forwards',
  },
  /** 3D Y-axis reroll spin */
  dieRerollSpin: {
    name: 'die-reroll-spin',
    duration: 500,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Legacy scaleX flip (unused by demos; kept for completeness) */
  dieReroll: {
    name: 'die-reroll',
    duration: 400,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Illegal move reject */
  dieReject: {
    name: 'die-reject',
    duration: 320,
    easing: 'ease-in-out',
    fill: 'both',
  },
  /** Stuck / sudden-death infinite pulse */
  dieStuckPulse: {
    name: 'die-stuck-pulse',
    duration: 1200,
    easing: 'ease-in-out',
    fill: 'none',
    iterationCount: 'infinite',
  },
  /** Brief flash on the top die of a tower */
  dieTopHighlight: {
    name: 'die-top-highlight',
    duration: 300,
    easing: 'ease-out',
    fill: 'none',
  },
  /** Partial formation push (overlap / nudge) */
  formationPush: {
    name: 'formation-push',
    duration: 320,
    easing: 'ease-out',
    fill: 'both',
  },
  /** Full-hex formation push */
  formationPushFull: {
    name: 'formation-push-full',
    duration: 360,
    easing: 'ease-out',
    fill: 'both',
  },
  /** Push off the map */
  formationPushOffMap: {
    name: 'formation-push-off-map',
    duration: 360,
    easing: 'ease-out',
    fill: 'forwards',
  },
  /** Focal evaluation pulse on a hex */
  hexFocalPulse: {
    name: 'hex-focal-pulse',
    duration: 500,
    easing: 'ease-out',
    fill: 'both',
  },
  /** New focal activation flash */
  focalActivate: {
    name: 'focal-activate',
    duration: 400,
    easing: 'ease-out',
    fill: 'none',
  },
  /** Floating +/- / VP text (FloatFeedback) */
  floatFeedback: {
    name: 'float-feedback',
    duration: 700,
    easing: 'ease-out',
    fill: 'forwards',
  },
  /** Alternate VP pop (unused by FloatFeedback; available for callers) */
  vpPop: {
    name: 'vp-pop',
    duration: 700,
    easing: 'ease-out',
    fill: 'forwards',
  },
}

/**
 * Resolve a preset key or inline config to a preset object.
 * @param {string|GameAnimationPreset} presetOrConfig
 * @returns {GameAnimationPreset|null}
 */
export function resolveGameAnimation(presetOrConfig) {
  if (presetOrConfig == null) return null
  if (typeof presetOrConfig === 'string') {
    return gameAnimationPresets[presetOrConfig] ?? null
  }
  return presetOrConfig
}

/**
 * Build a CSS `animation` shorthand from a preset key or config.
 *
 * @param {string|GameAnimationPreset} presetOrConfig
 * @param {{
 *   duration?: number,
 *   easing?: string,
 *   fill?: string,
 *   delay?: number,
 *   iterationCount?: number|string,
 * }} [overrides]
 * @returns {string} CSS animation value, or `'none'` if the preset is unknown
 *
 * @example
 * style={{ animation: animationStyle('dieMove') }}
 * style={{ animation: animationStyle('dieMove', { duration: 260 }) }}
 * style={{ animation: active ? animationStyle('dieStuckPulse') : 'none' }}
 */
export function animationStyle(presetOrConfig, overrides = {}) {
  const p = resolveGameAnimation(presetOrConfig)
  if (!p?.name) return 'none'

  const duration = overrides.duration ?? p.duration
  const easing = overrides.easing ?? p.easing
  const fill = overrides.fill ?? p.fill ?? 'both'
  const delay = overrides.delay ?? p.delay ?? 0
  const iterationCount = overrides.iterationCount ?? p.iterationCount ?? 1

  // CSS shorthand: name duration easing delay iteration-count direction fill-mode
  // We omit direction (defaults to normal).
  let value = `${p.name} ${duration}ms ${easing}`
  if (delay) value += ` ${delay}ms`
  if (iterationCount !== 1) value += ` ${iterationCount}`
  if (fill && fill !== 'none') value += ` ${fill}`
  return value
}
