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

// ── Semantic text — světlé tinty pro text na variant pozadí ───────────────
// Parita s TkajUI tokens (dangerText/successText/warningText/infoText).
// Použití: text uvnitř variant card/badge/banner kde main color je moc temný.
// Kontrast na variant bg ~5:1 (AA pro text).
export const dangerText  = '#F9C0C0'   // světlý tint pro text na danger bg
export const successText = '#C0F0C8'   // světlý tint pro text na success bg
export const warningText = '#FFD580'   // světlý tint pro text na warning bg
export const infoText    = '#93C5FD'   // světlý tint pro text na info bg

// ── Herní barvy zdrojů ─────────────────────────────────────────────────────
// Tyto barvy mají sémantický herní význam (mana, magie, XP) a nepatří do
// standardní UI palety (danger/success/warning). Pojmenované pro konzistenci
// napříč DonjonProgressBar, ResourceBar, NumericDisplay, DonjonToast aj.
export const infoColor   = '#4A80E2'  // mana / info / event modrá
export const infoLight   = '#7AAEF5'  // světlejší tint pro nadpisy a ikony
export const infoMid     = '#2D3D6B'  // solid mid-blue pro selected pozadí (bez alpha → ornament hex výplň matchne button bg)
export const infoDark    = '#1E3A6B'  // tmavší info — selected ornamenty, kontrast na light blue bg

// ── Solid selected backgrounds — pre-computed `${variantColor}22` na bg2 ──
// Používají se jako bgFill v SVG ornamentech pro matchne button surface bez alpha double-blend.
export const selBgInfo    = '#242948'  // ≈ infoColor@13% na bg2
export const selBgDanger  = '#382536'  // ≈ dangerColor@13% na bg2
export const selBgGain    = '#253138'  // ≈ gainColor@13% na bg2
export const selBgMagic   = '#2F2544'  // ≈ magicColor@13% na bg2
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

// ── Surface aliases (sjednocené naming napříč knihovnami) ─────────────────
// TkajUI používá `surface0..4`, donjon historicky `bg0..4`. Aliasy umožňují
// psát knihovně-agnostické kódy (např. ve `src/utils/` nebo `src/hooks/`).
// Pro donjon-specifický kód preferuj `bg0..4` (idiomatický pro tuto paletu).
export const surface0 = bg0
export const surface1 = bg1
export const surface2 = bg2
export const surface3 = bg3
export const surface4 = bg4

// ── Border scale — `borderStrong` ────────────────────────────────────────
// TkajUI má 4-úrovňovou škálu (Subtle/Default/Mid/Strong). Donjon historicky
// 3 úrovně — přidáno `borderStrong` pro paritu (aktivní/highlighted bordery
// nad `borderMid`). Hodnota leží mezi borderMid a goldDim — viditelný akcent
// bez plné saturace.
export const borderStrong  = '#4F4D6E'

// ── Sdílené tokeny (motion, breakpoints, z-index) ─────────────────────────
// Re-export ze `lib/shared/tokens.js` — strukturálně neutrální tokeny
// společné pro tkajui i donjon. Změna se projeví v obou knihovnách.
export {
  animFast, animNormal, animSlow, animDramatic,
  easingSharp, easingBounce, easingEnter, easingExit,
  bpMobile, bpTablet, bpDesktop, bpWide, BREAKPOINTS,
  zDropdown, zNotification, zToast, zTooltip,
} from '../shared/tokens'
