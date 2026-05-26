/* ── DonjonBadge ────────────────────────────────────────────────────────────
   Herní varianta odznaku — šestihranný tvar (hex polygon), herní barevná
   paleta, glow efekt na colored variantách, diamantový indikátor místo kruhu.

   Vizuálně záměrně odlišný od TkajUI Badge:
     TkajUI Badge  → octagon, soft muted bg, generické UI varianty
     DonjonBadge   → hex silhouette, tmavé bg + colored glow, herní varianty

   Nativní donjon varianty: default · gain · loss · event · warning · muted
   Backward-compat aliasy:  success · danger · info · primary
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, goldDim,
  bg2, bg3,
  borderDefault, borderMid,
  textMid, textFaint,
  gainColor, dangerColor, warningColor, infoColor, magicColor,
} from './tokens'

import { hexFlatTop } from '../../utils/polygon'

/* ── Varianty ──
   Inner bg musí být tmavé — barevný text na tmavém bg je čitelný.
   Průhledný bg tint by splynul s border barvou a text by nebyl vidět. */
const VARIANTS = {
  /* Nativní herní varianty */
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

  /* Backward-compat aliasy — pro kód používající TkajUI varianty */
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

/* ── Velikosti ──
   h       = celková výška outer wrapperu
   bord    = border tloušťka (padding outer wrapperu na každé straně)
   indent  = hex polygon indent (outer)
   Vnitřní hex = indent - bord, vnitřní výška = h - 2*bord */
const SIZES = {
  sm: { h: 20, bord: 2, indent: 6, px: 9,  fontSize: '0.5625rem', gap: 4, dotSize: 4, iconSize: 10 },
  md: { h: 26, bord: 2, indent: 8, px: 12, fontSize: '0.625rem',  gap: 5, dotSize: 5, iconSize: 12 },
}

/**
 * DonjonBadge — herní odznak se šestihranným tvarem a glow efektem.
 *
 * @param {'default'|'gain'|'loss'|'event'|'warning'|'magic'|'muted'|'success'|'danger'|'info'|'primary'} variant
 * @param {'sm'|'md'} size
 * @param {boolean} dot  — diamantový indikátor vlevo
 * @param {ReactNode} icon — ikona místo diamantu
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
      {/* Vnější obal — border barva */}
      <span
        style={{
          display:    'inline-flex',
          clipPath:   outerShape,
          background: v.border,
          padding:    s.bord,
        }}
      >
        {/* Vnitřní obsah */}
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
          {/* Diamantový indikátor */}
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

          {/* Ikona */}
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
