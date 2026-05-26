/**
 * donjon-fall-ui Design Tokens
 * Herní UI knihovna — teplá zlatá paleta, tmavé fialové pozadí, středověká estetika.
 */

// ── Zlato — primární akcent ────────────────────────────────────────────────
export const gold    = '#FFC183'  // hlavní zlatá — text, ikony, aktivní prvky
export const goldMid = '#B8956A'  // labels, subtitles, muted gold text (5:1+ AA ✅)
export const goldDim = '#8F7458'  // borders, UI elements, dividers (3:1 non-text ✅) — pro text použij goldMid

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
export const textFaint    = '#4A4560'  // pouze dekorativní (2:1 — nesplňuje WCAG) — pro informační text použij textLow
export const textDeep     = '#4A4870'  // ultra-tmavý blue-purple muted variant
export const textCool     = '#8F9CB3'  // studená modro-šedá, sekundární/kódový text
export const textParchment = '#D4C5A9' // teplá krémová, střední warm text

// ── Semantic ──────────────────────────────────────────────────────────────
export const dangerColor  = '#E05C5C'
export const successColor = '#40A055'
export const warningColor = '#C08040'
export const failColor    = '#C04040'  // fail / error state (darker than dangerColor)

// ── Herní barvy zdrojů ─────────────────────────────────────────────────────
// Tyto barvy mají sémantický herní význam (mana, magie, XP) a nepatří do
// standardní UI palety (danger/success/warning). Pojmenované pro konzistenci
// napříč DonjonProgressBar, ResourceBar, NumericDisplay, DonjonToast aj.
export const infoColor   = '#4A80E2'  // mana / info / event modrá
export const infoLight   = '#7AAEF5'  // světlejší tint pro nadpisy a ikony
export const infoDark    = '#1E3A6B'  // tmavší info — selected ornamenty, kontrast na light blue bg
export const magicColor  = '#9A60C8'  // magie / XP fialová
export const magicDark   = '#7A48A8'  // tmavší magic — selected border, shadow
export const shieldColor = '#7AB5E0'  // štít / obrana — světle modrá
export const neutralColor = '#808080' // neutrální šedá — fallback barva hráče, placeholder
export const textHighest  = '#F9F9F9' // téměř bílá — gradient vrchol, max kontrast

// ── Surfaces (extra) ──────────────────────────────────────────────────────
export const bgDeep = '#1B1A30'  // deep background variant

// ── Herní feedback ────────────────────────────────────────────────────────
// gainColor: světlejší zelená pro pozitivní herní feedback (FloatFeedback gain,
//            HexTile move stav) — záměrně jiný odstín než successColor (UI semantic)
export const gainColor = '#50B86C'

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

// ── Focus ring ────────────────────────────────────────────────────────────
/** Barva focus prstence pro klávesnicovou navigaci — gold@60% */
export const focusRingColor = `${gold}99`  // '#FFC18399'
/** Barva aktivního/focus borderu pro UI elementy (inputy, tlačítka) — 4:1+ non-text contrast ✅ */
export const borderFocus = '#8886C0'

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
