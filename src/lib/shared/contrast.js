/**
 * Contrast utility — WCAG 2.1 calculations for text-on-background contrast.
 *
 * Shared between tkajui and donjon (library-agnostic, just hex math).
 * No dependencies — pure math from the WCAG specification.
 *
 * Usage:
 *   import { pickContrastText, isLightBg, contrastRatio } from 'shared/contrast'
 *
 *   <div style={{ background: bgHex, color: pickContrastText(bgHex) }}>…
 *
 * References:
 *   https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *   https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */

// ── Parsing ─────────────────────────────────────────────────────────────

/**
 * Parses a hex string (#RGB / #RGBA / #RRGGBB / #RRGGBBAA) into { r, g, b } 0..255.
 * The alpha channel is ignored (contrast is computed from RGB only).
 * Returns null for invalid input.
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number } | null}
 */
export function parseHex(hex) {
  if (typeof hex !== 'string') return null
  let h = hex.trim().replace(/^#/, '')
  // Shorthand #RGB or #RGBA → expand
  if (h.length === 3 || h.length === 4) {
    h = h.slice(0, 3).split('').map(c => c + c).join('')
  } else if (h.length === 8) {
    h = h.slice(0, 6) // strip alpha
  }
  if (h.length !== 6 || !/^[0-9a-f]{6}$/i.test(h)) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

// ── Luminance & ratio ───────────────────────────────────────────────────

/** sRGB → linear RGB (per channel) per the WCAG 2.1 formula. */
function srgbToLinear(c) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

/**
 * Relative luminance (0..1) per WCAG 2.1.
 * Returns 0 for invalid hex (behaves as black).
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
 * Contrast ratio between two colors (1..21) per WCAG 2.1.
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
 * Is the background relatively light? Threshold luminance = 0.5 (WCAG midpoint
 * between pure white L=1 and pure black L=0). Returns false for invalid hex.
 * @param {string} hex
 */
export function isLightBg(hex) {
  return relativeLuminance(hex) > 0.5
}

/**
 * Does the (foreground/background) pair meet a WCAG level?
 * @param {string} fg
 * @param {string} bg
 * @param {'AA'|'AAA'} [level='AA']
 * @param {'normal'|'large'} [size='normal'] - large = 18pt+ or 14pt+ bold
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
 * Default text color pair — used by `pickContrastText` as a fallback,
 * libraries may override with their own tokens (textHigh etc.).
 *
 * The values are "safe defaults" that pass WCAG AA on both pure white
 * and pure black backgrounds. For a design system, prefer to pass your
 * own pair via the second argument: `pickContrastText(bg, { onLight, onDark })`.
 */
// eslint-disable-next-line donjon/no-hardcoded-hex -- safe near-white fallback, libraries pass their own textHigh
export const DEFAULT_TEXT_ON_DARK  = '#F2F2F2'  // near-white
// eslint-disable-next-line donjon/no-hardcoded-hex -- safe near-black fallback, libraries pass their own textOnLight
export const DEFAULT_TEXT_ON_LIGHT = '#111111'  // near-black

/**
 * Returns the text color appropriate for the given hex background.
 *
 * @param {string} bg - background hex
 * @param {{ onLight?: string, onDark?: string }} [options]
 *   Pass library tokens: `{ onLight: textOnLight, onDark: textHigh }`
 *   or leave the defaults (#111 / #F2F2F2).
 * @returns {string}
 *
 * @example
 * // Default (safe fallbacks):
 * <div style={{ background: bg, color: pickContrastText(bg) }} />
 *
 * // With library tokens:
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
 * Returns the better of two foreground candidates by WCAG contrast against
 * the background. Practical when you have two semantically valid options
 * (e.g. "accent vs. neutralText on a colored card") and want to pick the
 * more readable one programmatically.
 *
 * @param {string} bg
 * @param {string} fgA
 * @param {string} fgB
 * @returns {string} - the winner with the higher ratio
 */
export function bestContrast(bg, fgA, fgB) {
  return contrastRatio(fgA, bg) >= contrastRatio(fgB, bg) ? fgA : fgB
}
