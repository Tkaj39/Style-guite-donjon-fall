/* ── ArchDiagram ──────────────────────────────────────────────────────────
   Vizualizace závislostního směru knihoven:
     shared → tkajui → donjon

   Používá se na HomePage (kompaktní řádek) a ArchitecturePage (širší
   varianta s popisky). Brand barvy sjednoceny s LIBRARY_CFG ze
   ShowcasePage (#7BAED4 pro tkajui, #B8956A pro donjon).
   ─────────────────────────────────────────────────────────────────────── */

import { bg2, bgDeep, borderMid, goldMid, textMid, textLow } from '../lib/donjon/tokens'
import { tkajuiBrand } from '../lib/tkajui/tokens'

export const ARCH_BRAND = {
  tkajui: tkajuiBrand,
  donjon: goldMid,
}

function Node({ label, sub, color, bg, big }) {
  return (
    <div style={{
      padding: big ? '12px 18px' : '10px 14px',
      background: bg,
      border: `1px solid ${color}55`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 5,
      minWidth: big ? 160 : 130,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: big ? '0.9375rem' : '0.8125rem',
        fontWeight: 700,
        color,
        letterSpacing: '0.02em',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: big ? '0.6875rem' : '0.625rem',
        color: textLow,
        marginTop: 3,
        letterSpacing: '0.04em',
      }}>
        {sub}
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <span aria-hidden="true" style={{
      color: borderMid, fontSize: '1.25rem', flexShrink: 0,
      padding: '0 4px',
    }}>
      →
    </span>
  )
}

/**
 * Závislostní diagram knihoven.
 * @param {'compact'|'detailed'} [variant='compact'] - Velikost nodů
 * @param {string} [sharedSub] - Sublabel pro shared node
 */
export default function ArchDiagram({ variant = 'compact', sharedSub }) {
  const big = variant === 'detailed'
  return (
    <div
      role="img"
      aria-label="Závislostní diagram: shared → tkajui → donjon"
      style={{
        padding: big ? '20px 24px' : '14px 18px',
        background: bgDeep,
        border: `1px solid ${borderMid}`,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 4,
        rowGap: 12,
      }}
    >
      <Node
        label="shared"
        sub={sharedSub ?? 'motion · breakpoints · z-index'}
        color={textMid}
        bg={bg2}
        big={big}
      />
      <Arrow />
      <Node
        label="tkajui"
        sub="TkajUI · base"
        color={ARCH_BRAND.tkajui}
        bg={`${ARCH_BRAND.tkajui}0E`}
        big={big}
      />
      <Arrow />
      <Node
        label="donjon"
        sub="donjon-fall-ui · game"
        color={ARCH_BRAND.donjon}
        bg={`${ARCH_BRAND.donjon}0E`}
        big={big}
      />
    </div>
  )
}
