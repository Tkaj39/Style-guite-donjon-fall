/**
 * FloatFeedback — plovoucí text změny hodnoty nebo VP.
 *
 * Používá se vždy jako `position: absolute` child uvnitř
 * `position: relative` containeru (hex wrapper nebo podobné).
 * Stoupá nahoru a mizí (keyframe float-feedback, 700 ms).
 *
 * Props:
 *   text     — zobrazovaný text, např. "+1", "−1", "+1 VP"
 *   variant  — "gain" | "loss" | "vp" | "neutral"
 *   visible  — boolean; pokud false, element není v DOM
 *   animKey  — změna hodnoty vynutí remount a restartuje animaci
 *   onDone   — volitelný callback po konci animace
 *   style    — volitelný override pozicování (default: centred above)
 */

import { gold, goldDim, dangerColor, gainColor } from './tokens'

const variantStyle = {
  gain:    { color: gainColor,    textShadow: `0 0 8px ${gainColor}88`    },
  loss:    { color: dangerColor,  textShadow: `0 0 8px ${dangerColor}88`  },
  vp:      { color: gold,         textShadow: `0 0 10px ${gold}99`        },
  neutral: { color: goldDim,      textShadow: 'none'                      },
}

export default function FloatFeedback({
  text,
  variant = 'gain',
  visible = true,
  animKey = 0,
  onDone,
  style,
}) {
  if (!visible) return null

  const colors = variantStyle[variant] ?? variantStyle.neutral

  return (
    <div
      key={animKey}
      onAnimationEnd={onDone}
      style={{
        position: 'absolute',
        top: -8,
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'float-feedback 700ms ease-out forwards',
        fontSize: '0.6875rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 10,
        ...colors,
        ...style,
      }}
    >
      {text}
    </div>
  )
}
