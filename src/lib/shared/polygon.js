/* ── Polygon clip-path helpery ──────────────────────────────────────────────
   Sjednocené utility pro tvarové primitivy mimo octagon (ten má vlastní soubor).

   Hexagony se v projektu vyskytují ve dvou orientacích:
     - flat-top : ploché vrchní/spodní hrany, špičky vlevo/vpravo (DonjonBadge)
     - pointy-top: špička nahoře/dole, ploché boční hrany (HexTile)

   Octagon zůstává v ./octagon.js. Společný velikostní systém přes SHAPE_SIZES.
   ─────────────────────────────────────────────────────────────────────── */

/**
 * hexFlatTop — hexagon s plochým vrchem a špičkami vlevo/vpravo.
 *
 * Tvar typický pro chipy/badge: ___
 *                              <   >
 *                              ‾‾‾
 *
 * @param {number} indent  vzdálenost rohů od levého/pravého okraje v px
 *                          (čím větší, tím užší špičky)
 */
export function hexFlatTop(indent) {
  return `polygon(${indent}px 0%,calc(100% - ${indent}px) 0%,100% 50%,calc(100% - ${indent}px) 100%,${indent}px 100%,0% 50%)`
}

/**
 * hexPointyTop — hexagon s ostrými vrcholy nahoře a dole, plochými boky.
 *
 * Tvar typický pro herní pole / hex tile:    /\
 *                                            ||
 *                                            \/
 *
 * Bez parametrů — používá fixní 50%/25%/75% souřadnice (regulární hexagon).
 */
export function hexPointyTop() {
  return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
}

/**
 * regularPolygon — obecný polygon s N stranami, centrovaný ve viewportu 0–100%.
 *
 * @param {number} sides     počet stran (3+)
 * @param {object} [opts]
 * @param {number} [opts.rotation]   pootočení v radianech (default 0 = první vrchol nahoře)
 *
 * @example
 *   regularPolygon(6)             // pointy-top hex
 *   regularPolygon(6, { rotation: Math.PI / 6 })  // flat-top hex
 *   regularPolygon(8)             // octagon (rotace 0)
 */
export function regularPolygon(sides, { rotation = 0 } = {}) {
  if (sides < 3) throw new Error(`regularPolygon: sides must be ≥ 3, got ${sides}`)
  const pts = []
  // Začneme od vrcholu "nahoře" (angle = -π/2) a jdeme clockwise
  for (let i = 0; i < sides; i++) {
    const angle = -Math.PI / 2 + rotation + (2 * Math.PI * i) / sides
    const x = 50 + 50 * Math.cos(angle)
    const y = 50 + 50 * Math.sin(angle)
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`)
  }
  return `polygon(${pts.join(', ')})`
}
