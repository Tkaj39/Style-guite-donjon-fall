/**
 * Contrast utility — WCAG 2.1 výpočty pro kontrast textu na pozadí.
 *
 * Sdílené mezi tkajui i donjon (knihovně-agnostické, jen hex math).
 * Nemá závislosti — čistá matematika ze specifikace WCAG.
 *
 * Použití:
 *   import { pickContrastText, isLightBg, contrastRatio } from 'shared/contrast'
 *
 *   <div style={{ background: bgHex, color: pickContrastText(bgHex) }}>…
 *
 * Reference:
 *   https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *   https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */

// ── Parsing ─────────────────────────────────────────────────────────────

/**
 * Rozparsuje hex string (#RGB / #RGBA / #RRGGBB / #RRGGBBAA) na { r, g, b } 0..255.
 * Alpha kanál se ignoruje (kontrast se počítá z RGB).
 * Vrací null pro neplatný vstup.
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number } | null}
 */
export function parseHex(hex) {
  if (typeof hex !== 'string') return null
  let h = hex.trim().replace(/^#/, '')
  // Krátký zápis #RGB nebo #RGBA → expanze
  if (h.length === 3 || h.length === 4) {
    h = h.slice(0, 3).split('').map(c => c + c).join('')
  } else if (h.length === 8) {
    h = h.slice(0, 6) // odřízni alpha
  }
  if (h.length !== 6 || !/^[0-9a-f]{6}$/i.test(h)) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

// ── Luminance & ratio ───────────────────────────────────────────────────

/** sRGB → linear RGB (per kanál) podle WCAG 2.1 formule. */
function srgbToLinear(c) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

/**
 * Relativní luminance (0..1) podle WCAG 2.1.
 * Pro neplatný hex vrátí 0 (chová se jako černá).
 * @param {string} hex
 */
export function relativeLuminance(hex) {
  const rgb = parseHex(hex)
  if (!rgb) return 0
  return (
    0.2126 * srgbToLinear(rgb.r) +
    0.7152 * srgbToLinear(rgb.g) +
    0.0722 * srgbToLinear(rgb.b)
  )
}

/**
 * Kontrastní poměr mezi dvěma barvami (1..21) podle WCAG 2.1.
 * @param {string} a - hex
 * @param {string} b - hex
 * @returns {number}
 */
export function contrastRatio(a, b) {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

// ── Convenience predicates ──────────────────────────────────────────────

/**
 * Je pozadí spíš světlé? Threshold luminance = 0.5 (WCAG midpoint mezi
 * čistě bílou L=1 a čistě černou L=0). Vrací false pro neplatný hex.
 * @param {string} hex
 */
export function isLightBg(hex) {
  return relativeLuminance(hex) > 0.5
}

/**
 * Splňuje pár (foreground/background) WCAG level?
 * @param {string} fg
 * @param {string} bg
 * @param {'AA'|'AAA'} [level='AA']
 * @param {'normal'|'large'} [size='normal'] - large = 18pt+ nebo 14pt+ bold
 */
export function meetsContrast(fg, bg, level = 'AA', size = 'normal') {
  const ratio = contrastRatio(fg, bg)
  // WCAG 2.1: AA = 4.5 (normal), 3.0 (large) — AAA = 7.0 (normal), 4.5 (large)
  const threshold = level === 'AAA'
    ? (size === 'large' ? 4.5 : 7.0)
    : (size === 'large' ? 3.0 : 4.5)
  return ratio >= threshold
}

// ── Default text colors ────────────────────────────────────────────────

/**
 * Výchozí pár textových barev — používá `pickContrastText` jako fallback
 * a knihovny je můžou přepsat svými tokeny (textHigh apod.).
 *
 * Hodnoty jsou „bezpečné defaulty" které dávají WCAG AA na čistě bílém
 * i čistě černém pozadí. Pro design system preferuj předat vlastní páry
 * přes druhý argument `pickContrastText(bg, { onLight, onDark })`.
 */
// eslint-disable-next-line donjon/no-hardcoded-hex -- bezpečný near-white fallback, knihovny předají vlastní textHigh
export const DEFAULT_TEXT_ON_DARK  = '#F2F2F2'  // near-white
// eslint-disable-next-line donjon/no-hardcoded-hex -- bezpečný near-black fallback, knihovny předají vlastní textOnLight
export const DEFAULT_TEXT_ON_LIGHT = '#111111'  // near-black

/**
 * Vrátí textovou barvu vhodnou pro daný hex pozadí.
 *
 * @param {string} bg - hex pozadí
 * @param {{ onLight?: string, onDark?: string }} [options]
 *   Předaj knihovní tokeny: `{ onLight: textOnLight, onDark: textHigh }`
 *   nebo nech default (#111 / #F2F2F2).
 * @returns {string}
 *
 * @example
 * // Default (bezpečné fallbacky):
 * <div style={{ background: bg, color: pickContrastText(bg) }} />
 *
 * // S knihovními tokeny:
 * import { textHigh, surface0 } from 'tkajui/tokens'
 * <div style={{ background: bg, color: pickContrastText(bg, {
 *   onDark: textHigh,
 *   onLight: surface0,
 * }) }} />
 */
export function pickContrastText(bg, options = {}) {
  const onLight = options.onLight ?? DEFAULT_TEXT_ON_LIGHT
  const onDark  = options.onDark  ?? DEFAULT_TEXT_ON_DARK
  return isLightBg(bg) ? onLight : onDark
}

/**
 * Vrátí lepší ze dvou kandidátů podle WCAG kontrastu vůči pozadí.
 * Praktické když máš dvě sémanticky validní možnosti (např. „accent
 * vs. neutralText na barevné kartě") a chceš výpočtem zvolit čitelnější.
 *
 * @param {string} bg
 * @param {string} fgA
 * @param {string} fgB
 * @returns {string} - vítěz s vyšším poměrem
 */
export function bestContrast(bg, fgA, fgB) {
  return contrastRatio(fgA, bg) >= contrastRatio(fgB, bg) ? fgA : fgB
}
