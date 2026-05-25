/**
 * Pictogram — donjon-fall-ui varianta
 *
 * Přepisuje vizuální styl TkajUI Pictogram: herní estetika, tmavé pozadí
 * s jemným oktagonálním ořezem, zlatá / fantasy barevná schémata.
 *
 * @param {React.ComponentType} icon      - SVG komponenta z donjon/icons
 * @param {'sm'|'md'|'lg'|'xl'} size      - výchozí 'md'
 * @param {'active'|'passive'|'disabled'|'danger'|'success'} variant - výchozí 'active'
 * @param {boolean}             bare      - false = s oktagonálním rámečkem a pozadím (výchozí: true = jen ikona)
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
  active:   { color: gold,            bg: bg2,    border: `${gold}44`,                    glow: `drop-shadow(0 0 6px ${gold}44)` },
  passive:  { color: goldDim,         bg: bg1,    border: `${goldDim}44`,                 glow: 'none' },
  disabled: { color: borderDefault,   bg: bg0,    border: borderMid,                      glow: 'none' },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- unikátní tmavá plocha pro danger/success pictogram varianty (fialová/zelená tónovaná)
  danger:   { color: VARIANT_BORDER.danger,  bg: '#1C1020', border: `${VARIANT_BORDER.danger}55`,  glow: `drop-shadow(0 0 5px ${VARIANT_BORDER.danger}44)` },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- unikátní tmavá plocha pro danger/success pictogram varianty (fialová/zelená tónovaná)
  success:  { color: VARIANT_BORDER.success, bg: '#101C14', border: `${VARIANT_BORDER.success}55`, glow: `drop-shadow(0 0 5px ${VARIANT_BORDER.success}44)` },
}

// Padding obklopující ikonu (proporcionální k velikosti)
const PADDING = { sm: 5, md: 7, lg: 10, xl: 14 }

// cx pro oktagonální clip (30 % paddingu → zaoblení)
const CX = { sm: 3, md: 4, lg: 5, xl: 7 }

export default function DonjonPictogram({ icon: Icon, size = 'md', variant = 'active', bare = true, className, style = {} }) {
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

  // S pozadím — outer/inner wrapper trick (stejně jako DonjonInput/DonjonButton)
  // outer = border barva + clip, inner = fill barva + clip-1, filter pro glow
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
        color: v.color,
        ...style,
      }}
    >
      <span style={{
        position: 'absolute',
        inset: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: octagon(Math.max(cx - 1, 0)),
        background: v.bg,
      }}>
        <Icon width={px} height={px} />
      </span>
    </span>
  )
}
