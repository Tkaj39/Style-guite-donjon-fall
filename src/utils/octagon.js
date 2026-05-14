export function octagon(cx) {
  return `polygon(${cx}px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
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

/**
 * octagonWithNotch — octagon s V-zářezem na jedné straně.
 * Zářez jde dovnitř tvaru (odebrání materiálu).
 *
 * @param {number} cx   - rohové zkosení (stejné jako octagon)
 * @param {number} nw   - šířka zářezu v px (default 28)
 * @param {number} nh   - hloubka zářezu v px (default 12)
 * @param {'bottom'|'top'|'left'|'right'} side - strana zářezu
 */
export function octagonWithNotch(cx, nw = 28, nh = 12, side = 'bottom') {
  const hw = nw / 2
  switch (side) {
    case 'bottom':
      return `polygon(
        ${cx}px 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        calc(50% + ${hw}px) 100%,
        50% calc(100% - ${nh}px),
        calc(50% - ${hw}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px ${cx}px
      )`
    case 'top':
      return `polygon(
        ${cx}px 0px,
        calc(50% - ${hw}px) 0px,
        50% ${nh}px,
        calc(50% + ${hw}px) 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px ${cx}px
      )`
    case 'left':
      return `polygon(
        ${cx}px 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px calc(50% + ${hw}px),
        ${nh}px 50%,
        0px calc(50% - ${hw}px),
        0px ${cx}px
      )`
    case 'right':
      return `polygon(
        ${cx}px 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(50% - ${hw}px),
        calc(100% - ${nh}px) 50%,
        100% calc(50% + ${hw}px),
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px ${cx}px
      )`
    default:
      return octagon(cx)
  }
}
