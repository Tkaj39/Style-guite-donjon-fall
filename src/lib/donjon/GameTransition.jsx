import { useState, useEffect, useRef } from 'react'
import { animSlow, easingBounce, easingExit } from './tokens'

/**
 * Animační presety pro GameTransition.
 * Každý preset definuje { from, to, exitTo } styly.
 */
export const gameTransitionPresets = {
  /** Fade + scale — výchozí pro panely a dialogy */
  fadeScale: {
    from:   { opacity: 0, transform: 'scale(0.92)' },
    to:     { opacity: 1, transform: 'scale(1)' },
    exitTo: { opacity: 0, transform: 'scale(0.88)' },
  },
  /** Slide nahoru — pro dolní panely, inventáře */
  slideUp: {
    from:   { opacity: 0, transform: 'translateY(20px)' },
    to:     { opacity: 1, transform: 'translateY(0)' },
    exitTo: { opacity: 0, transform: 'translateY(12px)' },
  },
  /** Slide dolů — pro dropdown, submenu */
  slideDown: {
    from:   { opacity: 0, transform: 'translateY(-14px)' },
    to:     { opacity: 1, transform: 'translateY(0)' },
    exitTo: { opacity: 0, transform: 'translateY(-8px)' },
  },
  /** Pop — pro spawn herních elementů, notifikace */
  pop: {
    from:   { opacity: 0, transform: 'scale(0.65)' },
    to:     { opacity: 1, transform: 'scale(1)' },
    exitTo: { opacity: 0, transform: 'scale(0.82)' },
  },
  /** Pouze fade — pro overlay/backdrop */
  fade: {
    from:   { opacity: 0 },
    to:     { opacity: 1 },
    exitTo: { opacity: 0 },
  },
  /** Slide zleva — pro sidebar panely */
  slideLeft: {
    from:   { opacity: 0, transform: 'translateX(-20px)' },
    to:     { opacity: 1, transform: 'translateX(0)' },
    exitTo: { opacity: 0, transform: 'translateX(-12px)' },
  },
}

/**
 * Wrapper pro enter/exit animace — automaticky montuje/demontuje children.
 * Při `show=true` → mount + enter animace. Při `show=false` → exit animace → unmount.
 * Žádné závislosti, čisté React + inline styles.
 *
 * @prop {boolean} show - Viditelný stav
 * @prop {'fadeScale'|'slideUp'|'slideDown'|'pop'|'fade'|'slideLeft'} preset - Typ animace
 * @prop {number} [duration] - Délka v ms (default: animSlow = 300)
 * @prop {() => void} [onExited] - Callback po úplném odstranění z DOM
 * @prop {string|React.ElementType} [as='div'] - HTML tag nebo komponenta
 * @prop {React.CSSProperties} [style] - Extra styly
 *
 * @example
 * <GameTransition show={isOpen} preset="slideUp">
 *   <PlayerPanel name="Hráč 1" />
 * </GameTransition>
 *
 * @example
 * // Výsledkový dialog:
 * <GameTransition show={gameOver} preset="pop" duration={400}>
 *   <DonjonCard title="Výsledek">...</DonjonCard>
 * </GameTransition>
 */
export default function GameTransition({
  show,
  preset = 'fadeScale',
  duration,
  children,
  style,
  className,
  as: Tag = 'div',
  onExited,
}) {
  const dur = duration ?? animSlow
  const p   = gameTransitionPresets[preset] ?? gameTransitionPresets.fadeScale

  // phase: 'entering' (initial frame, no transition) → 'in' → 'out' → unmounted
  const [mounted, setMounted] = useState(show)
  const [phase,   setPhase  ] = useState(show ? 'in' : 'out')

  const rafRef   = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    clearTimeout(timerRef.current)

    if (show) {
      setMounted(true)
      setPhase('entering')
      // Double rAF: first frame mounts with 'entering' (initial styles),
      // second frame triggers transition to 'in' (final styles)
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setPhase('in'))
      })
    } else {
      setPhase('out')
      timerRef.current = setTimeout(() => {
        setMounted(false)
        onExited?.()
      }, dur + 30)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  if (!mounted) return null

  // 'entering' → initial styles, no transition
  // 'in'       → final styles, with enter transition
  // 'out'      → exit styles, with exit transition
  const isIn      = phase === 'in'
  const isExiting = phase === 'out'

  const enterTransition = `opacity ${dur}ms ${easingBounce}, transform ${dur}ms ${easingBounce}`
  const exitTransition  = `opacity ${dur}ms ${easingExit}, transform ${dur}ms ${easingExit}`

  const computedStyle = isIn
    ? { ...p.to,   transition: enterTransition }
    : isExiting
      ? { ...p.exitTo, transition: exitTransition }
      : p.from   // 'entering' — no transition, initial position

  return (
    <Tag style={{ ...computedStyle, ...style }} className={className}>
      {children}
    </Tag>
  )
}
