/* ── tooltipUtils — sdílená logika pro Tooltip + DonjonTooltip ──────────────
   getPosition: výpočet souřadnic plovoucího tooltípu podle placement.
   Arrow:       CSS border-trick šipka, barva předaná jako prop.
   ─────────────────────────────────────────────────────────────────────── */

/**
 * Vrátí { top, left, tx, ty } pro fixně pozicovaný tooltip.
 * @param {DOMRect} rect — getBoundingClientRect() triggeru
 * @param {'top'|'bottom'|'left'|'right'} placement
 */
export function getPosition(rect, placement) {
  const gap = 8
  switch (placement) {
    case 'bottom': return { top: rect.bottom + gap, left: rect.left + rect.width / 2, tx: '-50%', ty: '0'    }
    case 'left':   return { top: rect.top + rect.height / 2, left: rect.left  - gap,  tx: '-100%', ty: '-50%' }
    case 'right':  return { top: rect.top + rect.height / 2, left: rect.right + gap,  tx: '0',     ty: '-50%' }
    default:       return { top: rect.top  - gap,  left: rect.left + rect.width / 2,  tx: '-50%', ty: '-100%' }
  }
}

/**
 * CSS border-trick šipka pro tooltip.
 * @param {'top'|'bottom'|'left'|'right'} placement — směr, kam šipka ukazuje
 * @param {string} color — barva šipky (hex / rgba)
 */
export function Arrow({ placement, color }) {
  const s    = 5
  const base = { position: 'absolute', width: 0, height: 0 }
  const styles = {
    top:    { ...base, bottom: -s, left: '50%', transform: 'translateX(-50%)', borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderTop:    `${s}px solid ${color}` },
    bottom: { ...base, top:    -s, left: '50%', transform: 'translateX(-50%)', borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderBottom: `${s}px solid ${color}` },
    left:   { ...base, right:  -s, top:  '50%', transform: 'translateY(-50%)', borderTop:  `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderLeft:  `${s}px solid ${color}` },
    right:  { ...base, left:   -s, top:  '50%', transform: 'translateY(-50%)', borderTop:  `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderRight: `${s}px solid ${color}` },
  }
  return <span style={styles[placement] ?? styles.top} />
}
