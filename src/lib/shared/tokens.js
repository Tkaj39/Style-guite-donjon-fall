/**
 * Shared design tokens — strukturálně neutrální hodnoty sdílené mezi
 * TkajUI a donjon-fall-ui. Tyto tokeny NEMAJÍ vizuální barevnost:
 *   • motion (durations, easings)
 *   • breakpoints
 *   • z-index škála
 *
 * Závislostní směr:  tkajui → shared  a  donjon → shared
 * Tokeny barev/povrchů/textu si každá knihovna definuje vlastní v `tokens.js`.
 *
 * Důvod:
 * — Sdílené animace zaručí, že side-by-side preview (TkajUI vs Donjon)
 *   mají stejný "feel" — komponenty otevírají a zavírají se za stejně dlouho.
 * — Sdílené breakpointy zaručí, že useBreakpoint() vrací stejné hodnoty
 *   bez ohledu na to, kterou knihovnu právě používáš.
 * — Sdílený z-index zabraňuje konfliktům, když app míchá obě knihovny
 *   (např. tkajui Modal + donjon Toast).
 */

// ── Animační timing ────────────────────────────────────────────────────────
/** Rychlé UI reakce: tooltip appear, damage flash (80 ms) */
export const animFast     = 80
/** Standardní přechody: hover, focus, stav (160 ms) */
export const animNormal   = 160
/** Otevření panelů, expand, slide (300 ms) */
export const animSlow     = 300
/** Dramatické herní události: výsledek souboje, výhry (600 ms) */
export const animDramatic = 600

/** Čisté in-out pro panely a rozvíjení */
export const easingSharp  = 'cubic-bezier(0.4, 0, 0.6, 1)'
/** Overshoot pro pop, bounce, spawn */
export const easingBounce = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
/** Ease-out pro příchozí elementy */
export const easingEnter  = 'cubic-bezier(0, 0, 0.2, 1)'
/** Ease-in pro odcházející elementy */
export const easingExit   = 'cubic-bezier(0.4, 0, 1, 1)'

// ── Breakpointy ────────────────────────────────────────────────────────────
/** Mobilní zařízení — portrait (< 480 px) */
export const bpMobile  = 480
/** Tablet / landscape mobil (≥ 480 px) */
export const bpTablet  = 768
/** Desktop (≥ 768 px) */
export const bpDesktop = 1024
/** Wide desktop (≥ 1024 px) */
export const bpWide    = 1280

/** Breakpoint objekt pro useBreakpoint hook a podmíněné styly */
export const BREAKPOINTS = {
  mobile:  bpMobile,
  tablet:  bpTablet,
  desktop: bpDesktop,
  wide:    bpWide,
}

// ── Z-index škála ─────────────────────────────────────────────────────────
// Modály nepoužívají z-index — jsou v native <dialog> top-layer.
// Hierarchie pro overlaye:  dropdown < notification < toast < tooltip
export const zDropdown     = 900
export const zNotification = 1800
export const zToast        = 2000
export const zTooltip      = 2100
