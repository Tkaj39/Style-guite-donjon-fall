/**
 * Pictogram — donjon-fall-ui varianta
 *
 * Přepisuje vizuální styl TkajUI Pictogram: herní estetika, tmavé pozadí
 * s jemným oktagonálním ořezem, zlatá / fantasy barevná schémata.
 *
 * @param {React.ComponentType} icon      - SVG komponenta z donjon/icons
 * @param {'sm'|'md'|'lg'|'xl'} size      - výchozí 'md'
 * @param {'active'|'passive'|'disabled'|'danger'|'success'} variant - výchozí 'active'
 * @param {boolean}             bare      - true = bez pozadí (jen ikona s barvou)
 * @param {string}              className
 * @param {object}              style
 *
 * @example
 * <DonjonPictogram icon={SwordIcon} size="lg" variant="active" />
 * <DonjonPictogram icon={ShieldIcon} size="sm" variant="passive" bare />
 */

import { octagon } from '../../utils/octagon'
import { gold, goldDim, bg0, bg1, bg2, borderDefault, borderMid, VARIANT_BORDER } from './tokens'

const SIZES = { sm: 16, md: 24, lg: 32, xl: 48 }

// Donjon barevná paleta variant
const VARIANTS = {
  active:   { color: gold,            bg: bg2,    border: `${gold}33`,                    glow: `0 0 10px ${gold}33` },
  passive:  { color: goldDim,         bg: bg1,    border: `${goldDim}33`,                 glow: 'none' },
  disabled: { color: borderDefault,   bg: bg0,    border: borderMid,                      glow: 'none' },
  danger:   { color: VARIANT_BORDER.danger,  bg: '#1C1020', border: `${VARIANT_BORDER.danger}33`,  glow: `0 0 8px ${VARIANT_BORDER.danger}22` },
  success:  { color: VARIANT_BORDER.success, bg: '#101C14', border: `${VARIANT_BORDER.success}33`, glow: `0 0 8px ${VARIANT_BORDER.success}22` },
}

// Padding obklopující ikonu (proporcionální k velikosti)
const PADDING = { sm: 5, md: 7, lg: 10, xl: 14 }

// cx pro oktagonální clip (30 % paddingu → zaoblení)
const CX = { sm: 3, md: 4, lg: 5, xl: 7 }

export default function DonjonPictogram({ icon: Icon, size = 'md', variant = 'active', bare = false, className, style = {} }) {
  const px  = SIZES[size]  ?? SIZES.md
  const pad = PADDING[size] ?? PADDING.md
  const cx  = CX[size] ?? CX.md
  const v   = VARIANTS[variant] ?? VARIANTS.active

  if (bare) {
    // Bez pozadí — jen ikona s herní barvou
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: v.color, ...style }}
      >
        <Icon width={px} height={px} />
      </span>
    )
  }

  // S pozadím — tmavý oktagonální kontejner
  const total = px + pad * 2
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: total,
        height: total,
        background: v.bg,
        border: `1px solid ${v.border}`,
        boxShadow: v.glow,
        clipPath: octagon(cx),
        color: v.color,
        ...style,
      }}
    >
      <Icon width={px} height={px} />
    </span>
  )
}
