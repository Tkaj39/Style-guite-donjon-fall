/**
 * Pictogram — donjon-fall-ui variant
 *
 * Three orthogonal axes:
 *
 *   variant — semantic color preset ('active'|'passive'|'disabled'|'danger'|'success').
 *             Drives icon color + (when framed) bg / border / glow as one bundle.
 *   color   — icon color override. Wins over the variant's icon color in BOTH
 *             modes. Does NOT affect bg / border / glow.
 *   bare    — visual mode. true (default) = icon only. false = octagonal frame
 *             with bg, border, and glow from the variant.
 *
 * Priority for the rendered icon color:
 *   1. `color` prop (explicit override)
 *   2. variant's color (semantic preset)
 *
 * Frame styling (bg / border / glow) comes solely from `variant` — `color`
 * does not touch it. When `bare={true}`, none of bg / border / glow apply.
 *
 * Drop-in TkajUI compat: `<DonjonPictogram color="#FFC183" />` reproduces the
 * tkajui-style "just a colored icon" call (bare default + color override).
 *
 * @param {React.ComponentType} icon      - SVG component from donjon/icons
 * @param {'sm'|'md'|'lg'|'xl'} size      - default 'md'
 * @param {string}              color     - icon color override. Beats variant's icon color. Does not affect frame styling.
 * @param {'active'|'passive'|'disabled'|'danger'|'success'} variant - default 'active'. Picks the semantic color preset (+ frame palette when bare=false).
 * @param {boolean}             bare      - default true (icon only). false adds the octagonal frame with bg / border / glow from the variant.
 * @param {string}              className
 * @param {object}              style
 *
 * @example
 * // Just an icon in the active gold (default)
 * <DonjonPictogram icon={SwordIcon} size="lg" />
 *
 * // Semantic color preset, still bare
 * <DonjonPictogram icon={SwordIcon} size="lg" variant="danger" />
 *
 * // TkajUI-style explicit color override (bare)
 * <DonjonPictogram icon={ShieldIcon} size="sm" color="#FFC183" />
 *
 * // Framed with the variant's full palette
 * <DonjonPictogram icon={ShieldIcon} size="md" variant="success" bare={false} />
 *
 * // Framed (success bg / border / glow) with a custom icon color
 * <DonjonPictogram icon={ShieldIcon} size="md" variant="success" color={gold} bare={false} />
 */

import { octagon, octagonInner } from '../shared/octagon'
import { gold, goldDim, bg0, bg1, bg2, borderDefault, borderMid, VARIANT_BORDER } from './tokens'

const SIZES = { sm: 16, md: 24, lg: 32, xl: 48 }

// Donjon variant color palette
const VARIANTS = {
  active:   { color: gold,            bg: bg2,    border: `${gold}44`,                    glow: `drop-shadow(0 0 6px ${gold}44)` },
  passive:  { color: goldDim,         bg: bg1,    border: `${goldDim}44`,                 glow: 'none' },
  disabled: { color: borderDefault,   bg: bg0,    border: borderMid,                      glow: 'none' },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- unique dark surface for the danger/success pictogram variants (purple/green tinted)
  danger:   { color: VARIANT_BORDER.danger,  bg: '#1C1020', border: `${VARIANT_BORDER.danger}55`,  glow: `drop-shadow(0 0 5px ${VARIANT_BORDER.danger}44)` },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- unique dark surface for the danger/success pictogram variants (purple/green tinted)
  success:  { color: VARIANT_BORDER.success, bg: '#101C14', border: `${VARIANT_BORDER.success}55`, glow: `drop-shadow(0 0 5px ${VARIANT_BORDER.success}44)` },
}

// Padding around the icon (proportional to size)
const PADDING = { sm: 5, md: 7, lg: 10, xl: 14 }

// cx for the octagonal clip (30 % of padding → corner rounding)
const CX = { sm: 3, md: 4, lg: 5, xl: 7 }

export default function DonjonPictogram({ icon: Icon, size = 'md', color, variant = 'active', bare = true, className, style = {} }) {
  const px  = SIZES[size]  ?? SIZES.md
  const pad = PADDING[size] ?? PADDING.md
  const cx  = CX[size] ?? CX.md
  const v   = VARIANTS[variant] ?? VARIANTS.active
  // The `color` prop (parity with TkajUI Pictogram) overrides the variant color.
  // Bg and border stay from the variant (game frame aesthetic preserved).
  const iconColor = color ?? v.color

  if (bare) {
    // No background — just the icon with a game color (or `color` override)
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: iconColor, ...style }}
      >
        <Icon width={px} height={px} />
      </span>
    )
  }

  // With background — outer/inner wrapper trick (same as DonjonInput/DonjonButton)
  // outer = border color + clip, inner = fill color + clip-1, filter for glow
  const total = px + pad * 2
  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: total,
        height: total,
        clipPath: octagon(cx),
        background: v.border,
        filter: v.glow !== 'none' ? v.glow : undefined,
        color: iconColor,
        ...style,
      }}
    >
      <span style={{
        position: 'absolute',
        inset: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: octagonInner(cx),
        background: v.bg,
      }}>
        <Icon width={px} height={px} />
      </span>
    </span>
  )
}
