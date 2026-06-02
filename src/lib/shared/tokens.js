/**
 * Shared design tokens — structurally neutral values shared between
 * TkajUI and donjon-fall-ui. These tokens have NO visual color:
 *   • motion (durations, easings)
 *   • breakpoints
 *   • z-index scale
 *
 * Dependency direction:  tkajui → shared  and  donjon → shared
 * Color/surface/text tokens are defined per library in its own `tokens.js`.
 *
 * Why:
 * — Shared animations guarantee that side-by-side previews (TkajUI vs Donjon)
 *   have the same "feel" — components open and close at the same speed.
 * — Shared breakpoints guarantee that useBreakpoint() returns the same values
 *   regardless of which library you're using.
 * — Shared z-index prevents conflicts when an app mixes both libraries
 *   (e.g. tkajui Modal + donjon Toast).
 */

// ── Animation timing ───────────────────────────────────────────────────────
/** Fast UI reactions: tooltip appear, damage flash (80 ms) */
export const animFast     = 80
/** Standard transitions: hover, focus, state (160 ms) */
export const animNormal   = 160
/** Panel open, expand, slide (300 ms) */
export const animSlow     = 300
/** Dramatic game events: combat result, victory (600 ms) */
export const animDramatic = 600

/** Clean in-out for panels and reveal */
export const easingSharp  = 'cubic-bezier(0.4, 0, 0.6, 1)'
/** Overshoot for pop, bounce, spawn */
export const easingBounce = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
/** Ease-out for incoming elements */
export const easingEnter  = 'cubic-bezier(0, 0, 0.2, 1)'
/** Ease-in for outgoing elements */
export const easingExit   = 'cubic-bezier(0.4, 0, 1, 1)'

// ── Breakpoints ────────────────────────────────────────────────────────────
/** Mobile devices — portrait (< 480 px) */
export const bpMobile  = 480
/** Tablet / landscape mobile (≥ 480 px) */
export const bpTablet  = 768
/** Desktop (≥ 768 px) */
export const bpDesktop = 1024
/** Wide desktop (≥ 1024 px) */
export const bpWide    = 1280

/** Breakpoint object for useBreakpoint hook and conditional styles */
export const BREAKPOINTS = {
  mobile:  bpMobile,
  tablet:  bpTablet,
  desktop: bpDesktop,
  wide:    bpWide,
}

// ── Z-index scale ─────────────────────────────────────────────────────────
// Modals do not use z-index — they live in the native <dialog> top-layer.
// Hierarchy for overlays:  dropdown < notification < toast < tooltip
export const zDropdown     = 900
export const zNotification = 1800
export const zToast        = 2000
export const zTooltip      = 2100

// ── Spacing scale (named, 4-base) ──────────────────────────────────────────
// Used by the Stack / Inline / Cluster layout primitives and anywhere else
// that needs a consistent gap / padding step. Both libraries share these
// values so a `gap="md"` reads identically in TkajUI and donjon-fall-ui.

/** Spacing scale (px). Each step doubles roughly through the t-shirt range. */
export const SPACE = {
  none: 0,
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
}

/** Valid keys of SPACE — `<Stack gap="md">` accepts one of these or a raw px number. */
export const SPACE_VALUES = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

/** Resolve a `gap`/`padding`-shaped prop: 'md' → 16, 12 → 12. */
export function resolveSpace(value, fallback = 0) {
  if (value == null) return fallback
  if (typeof value === 'number') return value
  if (SPACE[value] != null) return SPACE[value]
  return fallback
}
