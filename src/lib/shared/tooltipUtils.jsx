/* ── tooltipUtils — sdílená logika pro Tooltip + DonjonTooltip ──────────────
   getPosition:   výpočet souřadnic plovoucího tooltípu podle placement.
   resolveFlip:   auto-flip pokud by tooltip vyletěl mimo viewport.
   Arrow:         CSS border-trick šipka, barva předaná jako prop.

   12 placement hodnot: 4 hlavní strany × 3 zarovnání (-start, default, -end).
     top / top-start / top-end
     bottom / bottom-start / bottom-end
     left / left-start / left-end
     right / right-start / right-end
   ─────────────────────────────────────────────────────────────────────── */

const GAP = 8

/* Rozdělení 'top-start' → { side: 'top', align: 'start' } */
function parsePlacement(placement) {
  const [side, align = 'center'] = placement.split('-')
  return { side, align }
}

/**
 * Vrátí { top, left, tx, ty, placement } pro fixně pozicovaný tooltip.
 * @param {DOMRect} rect       getBoundingClientRect() triggeru
 * @param {string}  placement  jedna z 12 hodnot (viz výše)
 */
export function getPosition(rect, placement) {
  const { side, align } = parsePlacement(placement)

  if (side === 'top' || side === 'bottom') {
    const top = side === 'top' ? rect.top - GAP : rect.bottom + GAP
    const ty  = side === 'top' ? '-100%' : '0'
    let left, tx
    if (align === 'start')      { left = rect.left;             tx = '0'    }
    else if (align === 'end')   { left = rect.right;            tx = '-100%' }
    else                         { left = rect.left + rect.width / 2; tx = '-50%' }
    return { top, left, tx, ty }
  }

  // left | right
  const left = side === 'left' ? rect.left - GAP : rect.right + GAP
  const tx   = side === 'left' ? '-100%' : '0'
  let top, ty
  if (align === 'start')      { top = rect.top;                  ty = '0'    }
  else if (align === 'end')   { top = rect.bottom;               ty = '-100%' }
  else                         { top = rect.top + rect.height / 2; ty = '-50%' }
  return { top, left, tx, ty }
}

/**
 * Auto-flip: pokud by tooltip přesahoval viewport, otoč placement na opačnou stranu.
 *
 * @param {DOMRect}    rect       trigger rect
 * @param {object}     tooltipBox přibližné rozměry tooltipu { width, height }
 * @param {string}     placement  původní placement (12 hodnot)
 * @returns {string}              opravený placement (může být stejný)
 */
export function resolveFlip(rect, tooltipBox, placement) {
  if (typeof window === 'undefined') return placement
  const { side, align } = parsePlacement(placement)
  const vw = window.innerWidth
  const vh = window.innerHeight
  const tw = tooltipBox?.width  ?? 200
  const th = tooltipBox?.height ?? 40

  let flipped = side
  if (side === 'top'    && rect.top    - GAP - th < 0)            flipped = 'bottom'
  if (side === 'bottom' && rect.bottom + GAP + th > vh)           flipped = 'top'
  if (side === 'left'   && rect.left   - GAP - tw < 0)            flipped = 'right'
  if (side === 'right'  && rect.right  + GAP + tw > vw)           flipped = 'left'

  return align === 'center' ? flipped : `${flipped}-${align}`
}

/**
 * CSS border-trick šipka pro tooltip.
 *
 * @param {string} placement   12 hodnot — určuje stranu i zarovnání šipky
 * @param {string} color       barva šipky
 */
export function Arrow({ placement, color }) {
  const { side, align } = parsePlacement(placement)
  const s    = 5
  const base = { position: 'absolute', width: 0, height: 0 }

  // Pozice podél hrany podle align
  const horizPos =
    align === 'start' ? { left: 12 }
    : align === 'end' ? { right: 12 }
    : { left: '50%', transform: 'translateX(-50%)' }
  const vertPos =
    align === 'start' ? { top: 12 }
    : align === 'end' ? { bottom: 12 }
    : { top: '50%', transform: 'translateY(-50%)' }

  const styles = {
    top:    { ...base, bottom: -s, ...horizPos, borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderTop:    `${s}px solid ${color}` },
    bottom: { ...base, top:    -s, ...horizPos, borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderBottom: `${s}px solid ${color}` },
    left:   { ...base, right:  -s, ...vertPos,  borderTop:  `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderLeft:  `${s}px solid ${color}` },
    right:  { ...base, left:   -s, ...vertPos,  borderTop:  `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderRight: `${s}px solid ${color}` },
  }
  return <span style={styles[side] ?? styles.top} />
}

export const TOOLTIP_PLACEMENTS = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
]
