/* ── DonjonBadge ────────────────────────────────────────────────────────────
   Game-themed badge variant — hexagonal shape (hex polygon), game color
   palette, glow effect on the colored variants, diamond indicator instead
   of a circle.

   Intentionally visually different from TkajUI Badge:
     TkajUI Badge  → octagon, soft muted bg, generic UI variants
     DonjonBadge   → hex silhouette, dark bg + colored glow, game variants

   Native donjon variants:    default · gain · loss · event · warning · muted
   Backward-compat aliases:   success · danger · info · primary
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, goldDim,
  bg2, bg3,
  borderDefault, borderMid,
  textMid, textFaint,
  gainColor, dangerColor, warningColor, infoColor, magicColor,
  HEX_BADGE_SIZES,
} from './tokens'

import { hexFlatTop } from '../../utils/polygon'

/* ── Variants ──
   Inner bg must be dark — colored text on a dark bg is readable.
   A transparent bg tint would blend with the border and hide the text. */
const VARIANTS = {
  /* Native game variants */
  default: {
    bg:     bg3,
    border: borderDefault,
    glow:   null,
    text:   textMid,
    dot:    goldDim,
  },
  gain: {
    bg:     bg2,
    border: gainColor,
    glow:   gainColor,
    text:   gainColor,
    dot:    gainColor,
  },
  loss: {
    bg:     bg2,
    border: dangerColor,
    glow:   dangerColor,
    text:   dangerColor,
    dot:    dangerColor,
  },
  event: {
    bg:     bg2,
    border: gold,
    glow:   gold,
    text:   gold,
    dot:    gold,
  },
  warning: {
    bg:     bg2,
    border: warningColor,
    glow:   warningColor,
    text:   warningColor,
    dot:    warningColor,
  },
  magic: {
    bg:     bg2,
    border: magicColor,
    glow:   magicColor,
    text:   magicColor,
    dot:    magicColor,
  },
  muted: {
    bg:     bg2,
    border: borderMid,
    glow:   null,
    text:   textFaint,
    dot:    textFaint,
  },

  /* Backward-compat aliases — for code using TkajUI variants */
  success: {
    bg:     bg2,
    border: gainColor,
    glow:   gainColor,
    text:   gainColor,
    dot:    gainColor,
  },
  danger: {
    bg:     bg2,
    border: dangerColor,
    glow:   dangerColor,
    text:   dangerColor,
    dot:    dangerColor,
  },
  info: {
    bg:     bg2,
    border: infoColor,
    glow:   infoColor,
    text:   infoColor,
    dot:    infoColor,
  },
  primary: {
    bg:     bg2,
    border: gold,
    glow:   gold,
    text:   gold,
    dot:    gold,
  },
}

/* ── Sizes ── Single source of truth lives in `./tokens` (HEX_BADGE_SIZES)
   so showcase pages and other consumers can mirror the badge geometry. */
const SIZES = HEX_BADGE_SIZES

/**
 * DonjonBadge — game-themed badge with a hexagonal shape and glow effect.
 *
 * @param {'default'|'gain'|'loss'|'event'|'warning'|'magic'|'muted'|'success'|'danger'|'info'|'primary'} variant
 * @param {'sm'|'md'} size
 * @param {boolean} dot  — diamond indicator on the left
 * @param {ReactNode} icon — icon shown instead of the diamond
 */
export default function DonjonBadge({
  children,
  variant = 'default',
  size    = 'md',
  dot     = false,
  icon,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.default
  const s = SIZES[size]       ?? SIZES.md

  const outerShape = hexFlatTop(s.indent)
  const innerShape = hexFlatTop(Math.max(s.indent - s.bord, 1))

  return (
    <span
      style={{
        display: 'inline-flex',
        alignSelf: 'flex-start',
        filter: v.glow ? `drop-shadow(0 0 4px ${v.glow}55)` : 'none',
      }}
    >
      {/* Outer wrapper — border color */}
      <span
        style={{
          display:    'inline-flex',
          clipPath:   outerShape,
          background: v.border,
          padding:    s.bord,
        }}
      >
        {/* Inner content */}
        <span
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           s.gap,
            clipPath:      innerShape,
            background:    v.bg,
            paddingLeft:   s.px,
            paddingRight:  s.px,
            height:        s.h - 2 * s.bord,
            fontSize:      s.fontSize,
            fontWeight:    700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         v.text,
            lineHeight:    1,
            whiteSpace:    'nowrap',
            userSelect:    'none',
          }}
        >
          {/* Diamond indicator */}
          {dot && !icon && (
            <span
              style={{
                display:     'inline-block',
                width:       s.dotSize,
                height:      s.dotSize,
                background:  v.dot,
                transform:   'rotate(45deg)',
                flexShrink:  0,
                boxShadow:   v.glow ? `0 0 3px ${v.glow}88` : 'none',
              }}
            />
          )}

          {/* Icon */}
          {icon && (
            <span
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                justifyContent:  'center',
                width:           s.iconSize,
                height:          s.iconSize,
                flexShrink:      0,
                color:           v.text,
              }}
            >
              {icon}
            </span>
          )}

          {children}
        </span>
      </span>
    </span>
  )
}
