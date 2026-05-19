/**
 * donjon-fall-ui Design Tokens
 * Herní UI knihovna — teplá zlatá paleta, tmavé fialové pozadí, středověká estetika.
 */

// ── Zlato — primární akcent ────────────────────────────────────────────────
export const gold    = '#FFC183'  // hlavní zlatá — text, ikony, aktivní prvky
export const goldMid = '#B8956A'  // labels, subtitles, gradient konce
export const goldDim = '#8F7458'  // borders, muted text, dividers

// ── Surfaces ──────────────────────────────────────────────────────────────
export const bg0       = '#12102A'  // nejhlubší pozadí (page bg)
export const bg1       = '#171626'  // base dark
export const bg2       = '#1E1C30'  // card bg
export const bg3       = '#252340'  // elevated panel
export const bg4       = '#2A2948'  // hover / raised
export const bgInactive = '#232238' // inactive button v ButtonGroup

// ── Borders ───────────────────────────────────────────────────────────────
export const borderSubtle  = '#1A1830'
export const borderDefault = '#353751'
export const borderMid     = '#2A2848'

// ── Text ──────────────────────────────────────────────────────────────────
export const textHigh     = '#E8DDD0'  // near-white, warm tint
export const textMid      = '#C8BFAF'  // labels, popis
export const textActive   = '#F0E6D3'  // aktivní tab, highlighted text
export const textLow      = '#9A9080'  // muted / hints
export const textDisabled = '#6B6A82'  // disabled / inactive tabs

// ── Semantic ──────────────────────────────────────────────────────────────
export const dangerColor  = '#E05C5C'
export const successColor = '#40A055'
export const warningColor = '#C08040'

// ── Pomocné lookup tabulky ────────────────────────────────────────────────

/** Varianty pro Button, Card, Modal */
export const VARIANT_BG = {
  default: `linear-gradient(150deg,${borderDefault} 0%,${bg4} 70%)`,
  danger:  'linear-gradient(150deg,#3D1818 0%,#250A0A 70%)',
  success: 'linear-gradient(150deg,#183D20 0%,#0A250E 70%)',
  warning: 'linear-gradient(150deg,#3D2E10 0%,#250E04 70%)',
}

export const VARIANT_HEADER_BG = {
  default: 'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)',
  danger:  'linear-gradient(150deg,#4A1A1A 0%,#2E0C0C 70%)',
  success: 'linear-gradient(150deg,#1E4A28 0%,#0D2E12 70%)',
  warning: 'linear-gradient(150deg,#4A3412 0%,#2E1006 70%)',
}

export const VARIANT_BORDER = {
  default: goldDim,
  danger:  '#C04040',
  success: '#40A055',
  warning: '#C08040',
}

export const VARIANT_TITLE_GRAD = {
  default: `linear-gradient(180deg,#F9F9F9 0%,${goldMid} 100%)`,
  danger:  'linear-gradient(180deg,#F9C0C0 0%,#C04040 100%)',
  success: 'linear-gradient(180deg,#C0F0C8 0%,#40A055 100%)',
  warning: 'linear-gradient(180deg,#FFD580 0%,#C08040 100%)',
}
