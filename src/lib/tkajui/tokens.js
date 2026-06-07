/**
 * TkajUI Design Tokens
 * A clean, generic UI library — cool neutrals + a blue accent.
 * Contrast is built from tonal steps, not from a game-themed gradient palette.
 */

// ── Surfaces ──────────────────────────────────────────────────────────────
export const surface0 = '#0d0d14'   // deepest background
export const surface1 = '#13131c'   // base dark
export const surface2 = '#1b1b27'   // input / card bg
export const surface3 = '#232332'   // elevated panel
export const surface4 = '#2c2c3e'   // hover state

// ── Borders ───────────────────────────────────────────────────────────────
export const borderSubtle  = '#22222e'
export const borderDefault = '#35354a'
export const borderMid     = '#484860'
export const borderStrong  = '#626280'

// ── Text ──────────────────────────────────────────────────────────────────
export const textHigh     = '#eeeef8'  // near-white, cool tint
export const textMid      = '#8888a8'  // labels, hints
export const textLow      = '#7a7a9a'  // placeholder, disabled, hints — 4.12:1 on surface2 (near-AA, comfortable AA-large)
export const textDisabled = '#333348'

// ── Accent (interactive blue) ──────────────────────────────────────────────
export const accent       = '#6576ff'
export const accentLight  = '#8591ff'  // hover / brighter
export const accentDim    = '#4455ee'  // pressed
export const accentBg     = '#6576ff18'
export const accentBorder = '#6576ff55'

// ── Semantic — Success ─────────────────────────────────────────────────────
export const successColor      = '#34d364'
export const successBg         = '#071c10'
export const successBgHover    = '#0a2e16'  // button hover bg; card headerBg
export const successHeaderBg   = successBgHover
export const successBorder     = '#34d36444'
export const successText       = '#86efac'
export const successDescColor  = '#4a9a6a'  // card description color
export const successDim        = '#18a850'  // gradient end (ProgressBar, Slider)

// ── Semantic — Danger ──────────────────────────────────────────────────────
export const dangerColor     = '#f05555'
export const dangerBg        = '#200808'
export const dangerBgHover   = '#2d0a0a'  // button hover bg
export const dangerHeaderBg  = '#2a0606'  // card headerBg
export const dangerBorder    = '#f0555544'
export const dangerText      = '#fca5a5'
export const dangerDescColor = '#c07070'  // card description color
export const dangerDim       = '#cc2222'  // gradient end (ProgressBar, Slider)

// ── Semantic — Warning ─────────────────────────────────────────────────────
export const warningColor     = '#f0a030'
export const warningBg        = '#1e1003'
export const warningBgHover   = '#2a1604'  // button hover bg
export const warningHeaderBg  = '#271402'  // modal / card headerBg
export const warningBorder    = '#f0a03044'
export const warningText      = '#fcd34d'
export const warningDescColor = '#906040'  // card / modal description color
export const warningDim       = '#cc7010'  // gradient end (ProgressBar, Slider)

// ── Semantic — Info ────────────────────────────────────────────────────────
export const infoColor  = '#4fa3f5'
export const infoBg     = '#071424'
export const infoBorder = '#4fa3f544'
export const infoText   = '#93c5fd'
export const infoDim    = '#2070d0'  // gradient end (ProgressBar, Slider)

// ── Primary (white-on-accent) ──────────────────────────────────────────────
export const primaryText = '#ffffff'
export const primaryIcon = '#ffffffcc'

// ── Shared tokens (motion, breakpoints, z-index) ──────────────────────────
// Re-export from `lib/shared/tokens.js` — structurally neutral tokens shared
// by tkajui and donjon. A change propagates to both libraries.
// Note: Modals do not use z-index — they live in the native <dialog> top-layer.
export {
  animFast, animNormal, animSlow, animDramatic,
  easingSharp, easingBounce, easingEnter, easingExit,
  bpMobile, bpTablet, bpDesktop, bpWide, BREAKPOINTS,
  zDropdown, zNotification, zToast, zTooltip,
  SPACE, SPACE_VALUES, resolveSpace,
  CONTAINER_WIDTHS, CONTAINER_WIDTH_VALUES, resolveContainerWidth,
  shadowSm, shadowMd, shadowLg, shadowModal, shadowDeep,
  scrimLight, scrimMid, scrimHeavy, panelShadow,
} from '../shared/tokens'

// ── Background aliases (unified naming across libraries) ──────────────────
// donjon uses `bg0..4`, tkajui historically `surface0..4`. The aliases allow
// library-agnostic code. For tkajui-specific code prefer `surface*`.
export const bg0 = surface0
export const bg1 = surface1
export const bg2 = surface2
export const bg3 = surface3
export const bg4 = surface4

// ── Helpers: variant lookup tables ────────────────────────────────────────
export const VARIANT_COLORS = {
  default: { color: accent,        bg: accentBg,     border: accentBorder, text: textHigh,    muted: textMid   },
  success: { color: successColor,  bg: successBg,    border: successBorder, text: successText, muted: '#4a9a6a' },
  danger:  { color: dangerColor,   bg: dangerBg,     border: dangerBorder,  text: dangerText,  muted: '#905050' },
  warning: { color: warningColor,  bg: warningBg,    border: warningBorder, text: warningText, muted: '#907040' },
  info:    { color: infoColor,     bg: infoBg,       border: infoBorder,    text: infoText,    muted: '#406090' },
}
