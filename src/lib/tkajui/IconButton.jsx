/* ── IconButton (tkajui) ─────────────────────────────────────────────
   Square button whose only content is an icon. Same octagonal silhouette
   as Button (border-trick), but width=height. Use when the icon alone
   communicates the action (close ×, refresh ↻, settings ⚙).

   For icon + text — use the regular <Button> with an icon prefix.
   Always pair with `aria-label` since there's no visible text.
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../../utils/octagon'
import {
  VARIANT_COLORS, surface3, surface4, borderDefault, textHigh, textMid,
} from './tokens'

const SIZES = {
  xs: { box: 24, cx: 4,  font: 12 },
  sm: { box: 32, cx: 6,  font: 14 },
  md: { box: 40, cx: 8,  font: 16 },
  lg: { box: 48, cx: 10, font: 18 },
}

/**
 * @param {React.ReactNode} children   Icon — usually a glyph, emoji, or <svg>.
 * @param {string} ariaLabel           **Required.** Accessible name.
 * @param {'default'|'success'|'danger'|'warning'|'info'} [variant='default']
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled=false]
 * @param {boolean} [active=false]     Force the active (pressed-on) visual.
 * @param {() => void} [onClick]
 */
export default function IconButton({
  children,
  ariaLabel,
  variant = 'default',
  size = 'md',
  disabled = false,
  active = false,
  onClick,
  className,
  style,
  type = 'button',
  ...rest
}) {
  const s = SIZES[size] ?? SIZES.md
  const v = VARIANT_COLORS[variant] ?? VARIANT_COLORS.default
  const isAccent = variant !== 'default'
  const fill   = isAccent ? v.bg     : surface3
  const border = isAccent ? v.border : borderDefault
  const txt    = isAccent ? v.color  : textHigh
  const clip   = octagon(s.cx)

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={active || undefined}
      className={className}
      style={{
        position: 'relative',
        width: s.box,
        height: s.box,
        padding: 0,
        background: border,
        clipPath: clip,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: 'absolute',
          inset: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: active ? surface4 : fill,
          color: disabled ? textMid : txt,
          fontSize: s.font,
          lineHeight: 1,
          clipPath: clip,
          transition: 'background 120ms',
        }}
      >
        {children}
      </span>
    </button>
  )
}
