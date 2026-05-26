/**
 * octagon — clip-path s 8 stranami (oktagon).
 *
 * Standardní corner-cut tvar pro donjon-fall-ui — diagonální řez 45°
 * na každém rohu. Sjednocená terminologie napříč clip-path utilitami:
 * `cornerSize` znamená velikost rohového zkosení v px.
 *
 * @param {number} cornerSize  velikost zkosení rohu v px
 */
export function octagon(cornerSize) {
  const cx = cornerSize
  return `polygon(${cx}px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

/**
 * octagonPerCorner — octagon s individuálními zkoseními v každém rohu.
 *
 * @param {{ tl?: number, tr?: number, br?: number, bl?: number }} corners
 *        Velikost cutu v px pro každý roh; chybějící = 0 (ostrý roh).
 *
 * @example
 *   clipPath: octagonPerCorner({ tl: 20, tr: 10, br: 14, bl: 16 })
 */
export function octagonPerCorner({ tl = 0, tr = 0, br = 0, bl = 0 } = {}) {
  return `polygon(${tl}px 0px,calc(100% - ${tr}px) 0px,100% ${tr}px,100% calc(100% - ${br}px),calc(100% - ${br}px) 100%,${bl}px 100%,0px calc(100% - ${bl}px),0px ${tl}px)`
}

/**
 * octagonInner — vnitřní octagon pro outer/inner border trick.
 *
 * Outer shell má clip-path: octagon(cornerSize) + background: border, padding: 1.
 * Inner fill pak používá octagon(cornerSize - 1), aby zlatý lem 1px byl viditelný.
 * Tato funkce odstraňuje opakovaný "- 1" boilerplate napříč komponentami.
 *
 * @param {number} cornerSize  outer corner-cut v px
 * @param {number} [border]    tloušťka borderu (default 1px)
 */
export function octagonInner(cornerSize, border = 1) {
  return octagon(Math.max(0, cornerSize - border))
}

/**
 * octagonInnerPerCorner — vnitřní octagon pro asymetrický blok.
 * Per-corner pendant k octagonInner.
 *
 * @param {{ tl?, tr?, br?, bl? }} corners
 * @param {number} [border]  tloušťka borderu (default 1px)
 */
export function octagonInnerPerCorner(corners, border = 1) {
  return octagonPerCorner({
    tl: Math.max(0, (corners.tl ?? 0) - border),
    tr: Math.max(0, (corners.tr ?? 0) - border),
    br: Math.max(0, (corners.br ?? 0) - border),
    bl: Math.max(0, (corners.bl ?? 0) - border),
  })
}

export function clipLeft(cx) {
  return `polygon(${cx}px 0px,100% 0px,100% 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

export function clipRight(cx) {
  return `polygon(0px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,0px 100%)`
}

// ─────────────────────────────────────────────────────────────────
// SHAPE VARIANTY — 4 rohové styly × 5 velikostí
// ─────────────────────────────────────────────────────────────────

/**
 * roundRect — konvexně zaoblené rohy (responsive)
 * Používá clip-path: inset(0 round r) — škáluje s elementem.
 * @param {number} r  rohové zaoblení v px
 */
export function roundRect(r) {
  return `inset(0 round ${r}px)`
}

/**
 * pill — maximálně zaoblené — stadium / pill tvar (responsive)
 * Ekvivalentní border-radius: 9999px, ale přes clip-path.
 */
export function pill() {
  return `inset(0 round 9999px)`
}

/**
 * scoopPath — konkávní rohy (scoop) pomocí SVG path() — PEVNÉ ROZMĚRY
 *
 * ⚠ path() v clip-path používá absolutní px — element musí mít přesně w×h.
 * Pro responzivní scoop použij <ScoopClip> komponentu (SVG objectBoundingBox).
 *
 * @param {number} w  šířka elementu v px
 * @param {number} h  výška elementu v px
 * @param {number} r  hloubka scoopnutí v px (doporučeno ~25–30 % výšky)
 */
export function scoopPath(w, h, r) {
  // Quadratic bezier s kontrolním bodem UVNITŘ tvaru → konkávní prohnutí
  return `path('M ${r},0 H ${w - r} Q ${w - r},${r} ${w},${r} V ${h - r} Q ${w - r},${h - r} ${w - r},${h} H ${r} Q ${r},${h - r} 0,${h - r} V ${r} Q ${r},${r} ${r},0 Z')`
}

/**
 * scoopBB — konkávní rohy pomocí SVG clipPath s clipPathUnits="objectBoundingBox"
 * Pseudo-responzivní: souřadnice jsou 0–1 relativně k elementu.
 * Funguje dobře pro konstantní poměr stran; při výrazné změně šířky se prohnutí mírně deformuje.
 *
 * Použití: přidej <ScoopClipDef id="my-scoop" r={0.2} /> do SVG defs,
 *          pak style={{ clipPath: 'url(#my-scoop)' }} na elementu.
 *
 * @param {number} r  relativní hloubka scoopnutí (0–1, doporučeno 0.18–0.28)
 */
export function scoopBBPath(r) {
  // Stejná logika jako scoopPath, ale v 0–1 souřadnicovém systému
  return `M ${r},0 H ${1 - r} Q ${1 - r},${r} 1,${r} V ${1 - r} Q ${1 - r},${1 - r} ${1 - r},1 H ${r} Q ${r},${1 - r} 0,${1 - r} V ${r} Q ${r},${r} ${r},0 Z`
}

/**
 * scoopCirclePath — konkávní rohy jako PRAVÉ KRUHOVÉ OBLOUKY (ne bezier).
 *
 * Používá SVG A (arc) command místo Q bezier — výsledkem je matematicky
 * přesný výřez kruhu (čtvrtina kruhu na každém rohu). Funguje pouze
 * s absolutními px souřadnicemi — element musí mít přesně w×h.
 *
 * Rozdíl oproti scoopPath/scoopBBPath (Q bezier):
 *  - Bezier = aproximace, kruh = přesná geometrie. Vizuální rozdíl je
 *    subtilní u malých r, výraznější u velkých r.
 *  - Bezier škáluje s objectBoundingBox; arc škáluje pouze pokud měníš
 *    parametry. Pro fixed scoop velikost (např. "kruh 12px na všech rozích
 *    bez ohledu na velikost elementu") použij circle path.
 *
 * @param {number} w  šířka elementu v px
 * @param {number} h  výška elementu v px
 * @param {number} r  poloměr kruhu v px (doporučeno ~25–30 % výšky)
 */
export function scoopCirclePath(w, h, r) {
  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // sweep-flag=0 → counter-clockwise v SVG souřadnicích (Y dolů) → oblouk
  //                 se prohýbá DOVNITŘ tvaru (concave / scoop směr)
  return `M ${r},0 H ${w - r} A ${r},${r} 0 0,0 ${w},${r} V ${h - r} A ${r},${r} 0 0,0 ${w - r},${h} H ${r} A ${r},${r} 0 0,0 0,${h - r} V ${r} A ${r},${r} 0 0,0 ${r},0 Z`
}

/**
 * Tabulka doporučených hodnot pro 5 velikostí shapes systému.
 * Zachovává poměr ~0.30 (cut cx/h) a ~0.24 (scoop r/h).
 */
export const SHAPE_SIZES = {
  xs:   { w: 100, h: 32,  cut: 9.61,  round: 5,  scoop: 8,  bb: 0.25 },
  sm:   { w: 130, h: 40,  cut: 12.01, round: 6,  scoop: 10, bb: 0.25 },
  md:   { w: 170, h: 52,  cut: 15.62, round: 8,  scoop: 13, bb: 0.25 },
  lg:   { w: 210, h: 64,  cut: 19.22, round: 10, scoop: 16, bb: 0.25 },
  card: { w: 220, h: 120, cut: 16,    round: 12, scoop: 28, bb: 0.23 },
}

/* ── Notch geometry helpers ────────────────────────────────────────────────
   Polygon points pro jeden zářez podle strany + tvaru.
   Vrací pole stringů ve směru perimetru (clockwise od top-left).
   Pro 'top' jde zleva doprava, 'bottom' zprava doleva (reverse),
   'right' shora dolů, 'left' zdola nahoru (reverse). */

const NOTCH_SHAPES = ['v', 'square', 'trapezoid']

function pctStr(offset) {
  const off = Math.max(0, Math.min(1, offset))
  // parseFloat odstraní trailing zeros: 50.000 → 50, 33.333 → 33.333
  return `${parseFloat((off * 100).toFixed(3))}%`
}

/** Body zářezu na horizontální straně (top / bottom) — order zleva doprava. */
function horizontalNotchPoints({ shape, pct, hw, edgeY, apexYExpr }) {
  if (shape === 'square') {
    return [
      `calc(${pct} - ${hw}px) ${edgeY}`,
      `calc(${pct} - ${hw}px) ${apexYExpr}`,
      `calc(${pct} + ${hw}px) ${apexYExpr}`,
      `calc(${pct} + ${hw}px) ${edgeY}`,
    ]
  }
  if (shape === 'trapezoid') {
    const flat = hw * 0.4
    return [
      `calc(${pct} - ${hw}px) ${edgeY}`,
      `calc(${pct} - ${flat}px) ${apexYExpr}`,
      `calc(${pct} + ${flat}px) ${apexYExpr}`,
      `calc(${pct} + ${hw}px) ${edgeY}`,
    ]
  }
  return [
    `calc(${pct} - ${hw}px) ${edgeY}`,
    `${pct} ${apexYExpr}`,
    `calc(${pct} + ${hw}px) ${edgeY}`,
  ]
}

/** Body zářezu na vertikální straně (left / right) — order shora dolů. */
function verticalNotchPoints({ shape, pct, hw, edgeX, apexXExpr }) {
  if (shape === 'square') {
    return [
      `${edgeX} calc(${pct} - ${hw}px)`,
      `${apexXExpr} calc(${pct} - ${hw}px)`,
      `${apexXExpr} calc(${pct} + ${hw}px)`,
      `${edgeX} calc(${pct} + ${hw}px)`,
    ]
  }
  if (shape === 'trapezoid') {
    const flat = hw * 0.4
    return [
      `${edgeX} calc(${pct} - ${hw}px)`,
      `${apexXExpr} calc(${pct} - ${flat}px)`,
      `${apexXExpr} calc(${pct} + ${flat}px)`,
      `${edgeX} calc(${pct} + ${hw}px)`,
    ]
  }
  return [
    `${edgeX} calc(${pct} - ${hw}px)`,
    `${apexXExpr} ${pct}`,
    `${edgeX} calc(${pct} + ${hw}px)`,
  ]
}

/** Body jednoho zářezu ve směru perimetru (clockwise od top-left). */
function notchPolygonPoints({ side, offset, nw, nh, shape = 'v' }) {
  const hw  = nw / 2
  const pct = pctStr(offset)
  const sh  = NOTCH_SHAPES.includes(shape) ? shape : 'v'

  if (side === 'top') {
    return horizontalNotchPoints({ shape: sh, pct, hw, edgeY: '0px', apexYExpr: `${nh}px` })
  }
  if (side === 'bottom') {
    return horizontalNotchPoints({ shape: sh, pct, hw, edgeY: '100%', apexYExpr: `calc(100% - ${nh}px)` }).reverse()
  }
  if (side === 'right') {
    return verticalNotchPoints({ shape: sh, pct, hw, edgeX: '100%', apexXExpr: `calc(100% - ${nh}px)` })
  }
  if (side === 'left') {
    return verticalNotchPoints({ shape: sh, pct, hw, edgeX: '0px', apexXExpr: `${nh}px` }).reverse()
  }
  return []
}

/**
 * octagonWithNotches — octagon s libovolným počtem zářezů na různých stranách.
 *
 * @param {number} cornerSize  velikost rohového zkosení v px
 * @param {Array<{ side, offset, nw, nh, shape? }>} notches
 *
 * Obchází perimeter clockwise (top → right → bottom → left), na každé straně
 * setřídí zářezy podle offsetu a vloží je mezi rohy.
 *
 * @example
 *   octagonWithNotches(12, [
 *     { side: 'top',    offset: 0.5, nw: 28, nh: 12, shape: 'v' },
 *     { side: 'bottom', offset: 0.3, nw: 20, nh: 10, shape: 'square' },
 *   ])
 */
export function octagonWithNotches(cornerSize, notches = []) {
  const cx = cornerSize
  const grouped = { top: [], right: [], bottom: [], left: [] }
  for (const n of notches) {
    if (grouped[n.side]) grouped[n.side].push(n)
  }
  grouped.top.sort((a, b)    => a.offset - b.offset)
  grouped.right.sort((a, b)  => a.offset - b.offset)
  grouped.bottom.sort((a, b) => b.offset - a.offset)
  grouped.left.sort((a, b)   => b.offset - a.offset)

  const pts = []
  pts.push(`${cx}px 0px`)
  for (const n of grouped.top) pts.push(...notchPolygonPoints(n))
  pts.push(`calc(100% - ${cx}px) 0px`)
  pts.push(`100% ${cx}px`)
  for (const n of grouped.right) pts.push(...notchPolygonPoints(n))
  pts.push(`100% calc(100% - ${cx}px)`)
  pts.push(`calc(100% - ${cx}px) 100%`)
  for (const n of grouped.bottom) pts.push(...notchPolygonPoints(n))
  pts.push(`${cx}px 100%`)
  pts.push(`0px calc(100% - ${cx}px)`)
  for (const n of grouped.left) pts.push(...notchPolygonPoints(n))
  pts.push(`0px ${cx}px`)

  return `polygon(${pts.join(',')})`
}

/**
 * octagonWithNotch — single-notch shortcut nad octagonWithNotches.
 *
 * @param {number} cornerSize   velikost rohového zkosení v px
 * @param {number} nw           default 28
 * @param {number} nh           default 12
 * @param {'bottom'|'top'|'left'|'right'} side  default 'bottom'
 * @param {number} offset       default 0.5
 * @param {'v'|'square'|'trapezoid'} shape  default 'v'
 */
export function octagonWithNotch(cornerSize, nw = 28, nh = 12, side = 'bottom', offset = 0.5, shape = 'v') {
  return octagonWithNotches(cornerSize, [{ side, offset, nw, nh, shape }])
}

export { NOTCH_SHAPES }

/**
 * notchClamp — sanity-check a clamp parametrů zářezu vůči rozměrům prvku.
 *
 * Validní geometrie vyžaduje:
 *  - nw + 2·cornerSize ≤ délka strany (jinak zářez přesahuje rohy)
 *  - nh ≤ tloušťka / 2                (jinak V projde středem prvku)
 *
 * Při neznámých rozměrech (width/height = null) se vrátí původní hodnoty
 * bez clampingu — caller je zodpovědný za sanity check.
 *
 * @param {{ cornerSize, cx?, nw, nh, side, offset, width, height }} params
 *        cornerSize je preferovaný název; cx je backward-compat alias.
 * @returns {{ cx, nw, nh, offset, warning?: string }}
 *        Zatím vrací 'cx' v návratovce kvůli backward compat s existujícími callery.
 */
export function notchClamp({ cornerSize, cx, nw, nh, side = 'bottom', offset = 0.5, width, height }) {
  // Sjednocená terminologie — cornerSize je preferovaný, cx je alias
  cx = cornerSize ?? cx
  const horizontal = side === 'top' || side === 'bottom'
  const sideLen    = horizontal ? width  : height
  const thickness  = horizontal ? height : width

  let clampedNw  = nw
  let clampedNh  = nh
  const warnings = []

  // nh ≤ thickness/2 — V nesmí projít středem
  if (thickness != null && nh > thickness / 2) {
    clampedNh = Math.floor(thickness / 2)
    warnings.push(`nh=${nh} > thickness/2=${thickness / 2}, clamping na ${clampedNh}`)
  }
  // nw + 2·cx ≤ délka strany — zářez nesmí přesahovat rohy
  if (sideLen != null && nw + 2 * cx > sideLen) {
    clampedNw = Math.max(0, sideLen - 2 * cx)
    warnings.push(`nw + 2·cx=${nw + 2 * cx} > ${side} length=${sideLen}, clamping nw na ${clampedNw}`)
  }
  // offset clamp už dělá octagonWithNotch, tady jen normalizace
  const clampedOffset = Math.max(0, Math.min(1, offset))

  return {
    cx,
    nw: clampedNw,
    nh: clampedNh,
    offset: clampedOffset,
    warning: warnings.length ? warnings.join('; ') : undefined,
  }
}
