/* ── Avatar (tkajui) ────────────────────────────────────────────────────
   Portrait image with circular or octagonal frame and an initials
   fallback when no image is available (or the image fails to load).

   Used for player/NPC portraits in the HUD, scoreboard, dialog headers,
   anywhere a small identity icon is needed.
   ─────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import { octagon } from '../shared/octagon'
import { surface3, borderDefault, textHigh, textMid } from './tokens'

const SIZE_MAP = {
  xs: { box: 24, fontSize: '0.625rem', cx: 4.5 },
  sm: { box: 32, fontSize: '0.75rem',  cx: 6   },
  md: { box: 48, fontSize: '1rem',     cx: 9   },
  lg: { box: 64, fontSize: '1.25rem',  cx: 12  },
  xl: { box: 96, fontSize: '1.75rem',  cx: 18  },
}

/** Extract up-to-2 initials from a name. "Aragorn" → "A", "John Doe" → "JD". */
function initialsOf(name) {
  if (!name || typeof name !== 'string') return ''
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Avatar — player/NPC portrait or initials fallback.
 *
 * @param {string} [src]    Image URL. When absent (or load fails) → initials.
 * @param {string} [name]   Display name. Used for `alt` and initials.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|number} [size='md']  Box size in px or token.
 * @param {'circle'|'octagon'} [shape='circle']  Frame silhouette.
 * @param {string} [color]  CSS color — used for octagon border ring and as
 *   the initials-fallback bg tint. Useful for player-color identity.
 * @param {string} [bg]     Override the fallback background color (defaults to surface3).
 * @param {boolean} [bordered=true]  Show a 1px border ring (works on both shapes).
 *
 * @example <Avatar src="/portrait.jpg" name="Aragorn" size="md" />
 * @example <Avatar name="Frodo Baggins" size="lg" shape="octagon" color={blue} />
 */
export default function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  color,
  bg,
  bordered = true,
  className,
  style,
  ...rest
}) {
  const [failed, setFailed] = useState(false)
  const s = typeof size === 'number'
    ? { box: size, fontSize: `${Math.round(size * 0.42)}px`, cx: Math.round(size * 0.19) }
    : (SIZE_MAP[size] ?? SIZE_MAP.md)
  const showImage = src && !failed
  const initials = initialsOf(name)
  const borderColor = color ?? borderDefault
  const fallbackBg = bg ?? (color ? `${color}33` : surface3)
  const clipPath = shape === 'octagon' ? octagon(s.cx) : undefined
  const borderRadius = shape === 'circle' ? '50%' : undefined

  // Outer wrapper carries the border via border-trick when octagon (clip-path
  // clips CSS borders). For circle we use a plain CSS border + border-radius.
  if (shape === 'octagon' && bordered) {
    return (
      <span
        className={className}
        title={name}
        style={{
          display: 'inline-block',
          width: s.box,
          height: s.box,
          clipPath,
          background: borderColor,
          padding: 1,
          boxSizing: 'border-box',
          ...style,
        }}
        {...rest}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            clipPath,
            background: fallbackBg,
            color: textHigh,
            fontSize: s.fontSize,
            fontWeight: 600,
            letterSpacing: '0.02em',
            userSelect: 'none',
            overflow: 'hidden',
          }}
        >
          {showImage ? (
            <img
              src={src}
              alt={name ?? ''}
              onError={() => setFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              draggable={false}
            />
          ) : initials || (
            <span style={{ color: textMid }} aria-hidden="true">?</span>
          )}
        </span>
      </span>
    )
  }

  // Circle (or octagon with no border) — single layer is enough.
  return (
    <span
      className={className}
      title={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: s.box,
        height: s.box,
        background: fallbackBg,
        clipPath,
        borderRadius,
        border: bordered && shape === 'circle' ? `1px solid ${borderColor}` : undefined,
        boxSizing: 'border-box',
        color: textHigh,
        fontSize: s.fontSize,
        fontWeight: 600,
        letterSpacing: '0.02em',
        userSelect: 'none',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={name ?? ''}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          draggable={false}
        />
      ) : initials || (
        <span style={{ color: textMid }} aria-hidden="true">?</span>
      )}
    </span>
  )
}

