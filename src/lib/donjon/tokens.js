/**
 * donjon-fall-ui Design Tokens
 * Game UI library — warm gold palette, dark purple backgrounds, medieval aesthetic.
 */

// ── Gold — primary accent ──────────────────────────────────────────────────
export const gold    = '#FFC183'  // main gold — text, icons, active elements
export const goldMid = '#B8956A'  // labels, subtitles, muted gold text (5:1+ AA ✅)
export const goldDim = '#8F7458'  // borders, UI elements, dividers (3:1 non-text ✅) — for text use goldMid

// ── Surfaces ──────────────────────────────────────────────────────────────
export const bg0       = '#12102A'  // deepest background (page bg)
export const bg1       = '#171626'  // base dark
export const bg2       = '#1E1C30'  // card bg
export const bg3       = '#252340'  // elevated panel
export const bg4       = '#2A2948'  // hover / raised
export const bgInactive = '#232238' // inactive button inside ButtonGroup

// Header panel — gradient endpoints for VARIANT_HEADER_BG.default and Turn/Typography demos.
// Used as `background: linear-gradient(150deg, headerBgStart 0%, headerBgEnd 70%)`.
export const headerBgStart = '#3D3A5C'  // lighter purple gradient start
export const headerBgEnd   = '#2E2B50'  // darker purple gradient end

// Hex tile — focal cell colors (see HexTile.jsx). Warm amber-olive palette
// so the focal markers (gold flame, olive diamond) read as game-context
// objectives instead of generic UI panels.
//
// Active focal: gold border + flame icon on a warm-amber dark fill.
// Passive focal: olive border + diamond dot on a warm dark fill.

/** Warm amber-tinted dark fill behind the gold flame marker (active focal). */
export const focalActiveBg = '#201D0E'

/** Warm-dark olive-tinted fill behind the diamond marker (passive focal). */
export const focalPassiveBg = '#1C1A0E'

/** Olive border + diamond-dot marker color for the passive focal cell. */
export const focalPassiveBorder = '#6A6040'

/** @deprecated — use `focalPassiveBg` instead. Kept for back-compat with the
 *  ColorsPage palette demo and existing showcase pages. Value left unchanged
 *  to avoid breaking visuals where it's still referenced. */
export const hexFocalPassive = '#2E2D4A'

// Deeper variant of bg1 — for inset/recessed surfaces (Spacing demo containers,
// Typography game-context demo). Darker than bg1, lighter than bg0.
export const bg1Deep = '#141324'

// ── Borders ───────────────────────────────────────────────────────────────
export const borderSubtle  = '#1A1830'
export const borderDefault = '#353751'
export const borderMid     = '#2A2848'
// Muted blue-purple UI border/text — used on inactive elements:
// borders of cards/toggles/inputs, the vs-indicator between players, chrome frames.
// Repeats across ~14 files — so it has its own token.
export const borderMuted       = '#3A3858'
// Light variant for the active state of the same family (rare; only the TahPage optional badge).
export const borderMutedActive = '#5A5880'

// ── Text ──────────────────────────────────────────────────────────────────
export const textHigh     = '#E8DDD0'  // near-white, warm tint
export const textMid      = '#C8BFAF'  // labels, descriptions
export const textActive   = '#F0E6D3'  // active tab, highlighted text
export const textLow      = '#9A9080'  // muted / hints
export const textDisabled = '#6B6A82'  // disabled / inactive tabs
export const textCaption  = '#3A3A52'  // ornamental text in demos (Typography/Spacing labels — fails WCAG, decorative only)
export const textFaint    = '#4A4560'  // decorative only (2:1 — fails WCAG) — for informational text use textLow
export const textDeep     = '#4A4870'  // ultra-dark blue-purple muted variant
export const textCool     = '#8F9CB3'  // cool blue-grey, secondary / code text
export const textParchment = '#D4C5A9' // warm cream, mid warm text

// ── Semantic ──────────────────────────────────────────────────────────────
export const dangerColor  = '#E05C5C'
export const successColor = '#40A055'
export const warningColor = '#C08040'
export const failColor    = '#C04040'  // fail / error state (darker than dangerColor)

// ── Semantic text — light tints for text on variant backgrounds ───────────
// Parity with TkajUI tokens (dangerText/successText/warningText/infoText).
// Use: text inside a variant card/badge/banner where the main color is too dark.
// Contrast on the variant bg ~5:1 (AA for text).
export const dangerText  = '#F9C0C0'   // light tint for text on a danger bg
export const successText = '#C0F0C8'   // light tint for text on a success bg
export const warningText = '#FFD580'   // light tint for text on a warning bg
export const infoText    = '#93C5FD'   // light tint for text on an info bg

// ── Resource colors (game) ────────────────────────────────────────────────
// These colors carry semantic game meaning (mana, magic, XP) and do not belong
// to the standard UI palette (danger/success/warning). Named for consistency
// across DonjonProgressBar, ResourceBar, NumericDisplay, DonjonToast, etc.
export const infoColor   = '#4A80E2'  // mana / info / event blue
export const infoLight   = '#7AAEF5'  // lighter tint for headings and icons
export const infoMid     = '#2D3D6B'  // solid mid-blue for selected backgrounds (no alpha → SVG ornament fill matches button bg)
export const infoDark    = '#1E3A6B'  // darker info — selected ornaments, contrast on a light blue bg

// ── Solid selected backgrounds — pre-computed `${variantColor}22` on bg2 ──
// Used as bgFill in SVG ornaments to match the button surface without an alpha double-blend.
export const selBgInfo    = '#242948'  // ≈ infoColor@13% on bg2
export const selBgDanger  = '#382536'  // ≈ dangerColor@13% on bg2
export const selBgGain    = '#253138'  // ≈ gainColor@13% on bg2
export const selBgMagic   = '#2F2544'  // ≈ magicColor@13% on bg2
export const magicColor  = '#9A60C8'  // magic / XP purple
export const magicDark   = '#7A48A8'  // darker magic — selected border, shadow
export const shieldColor = '#7AB5E0'  // shield / defense — light blue
export const neutralColor = '#808080' // neutral grey — fallback player color, placeholder
export const textHighest  = '#F9F9F9' // near-white — gradient top, max contrast

// ── Surfaces (extra) ──────────────────────────────────────────────────────
export const bgDeep = '#1B1A30'  // deep background variant

// ── Game feedback ─────────────────────────────────────────────────────────
// gainColor: a brighter green for positive game feedback (FloatFeedback gain,
//            HexTile move state) — intentionally a different shade than
//            successColor (UI semantic).
export const gainColor = '#50B86C'

// ── Variant lookup tables ─────────────────────────────────────────────────

/** Variants for Button, Card, Modal */
export const VARIANT_BG = {
  default: `linear-gradient(150deg,${borderDefault} 0%,${bg4} 70%)`,
  danger:  'linear-gradient(150deg,#3D1818 0%,#250A0A 70%)',
  success: 'linear-gradient(150deg,#183D20 0%,#0A250E 70%)',
  warning: 'linear-gradient(150deg,#3D2E10 0%,#250E04 70%)',
}

export const VARIANT_HEADER_BG = {
  default: `linear-gradient(150deg,${headerBgStart} 0%,${headerBgEnd} 70%)`,
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
/** Focus ring color for keyboard navigation — gold@60% */
export const focusRingColor = `${gold}99`  // '#FFC18399'
/** Active/focus border color for UI elements (inputs, buttons) — 4:1+ non-text contrast ✅ */
export const borderFocus = '#8886C0'

// ── Surface aliases (unified naming across libraries) ─────────────────────
// TkajUI uses `surface0..4`, donjon historically `bg0..4`. The aliases enable
// library-agnostic code (e.g. in `src/utils/` or `src/hooks/`). For
// donjon-specific code prefer `bg0..4` (idiomatic for this palette).
export const surface0 = bg0
export const surface1 = bg1
export const surface2 = bg2
export const surface3 = bg3
export const surface4 = bg4

// ── Border scale — `borderStrong` ────────────────────────────────────────
// TkajUI has a 4-level scale (Subtle/Default/Mid/Strong). Donjon historically
// had 3 levels — `borderStrong` was added for parity (active/highlighted
// borders above `borderMid`). The value sits between borderMid and goldDim —
// a visible accent without full saturation.
export const borderStrong  = '#4F4D6E'

// ── Shield / prapor sizing ────────────────────────────────────────────────
// Pixel dimensions for `<Shield>` (Erb.jsx). Single source of truth — used
// inside the component AND by showcase pages so demos don't drift from the
// library defaults.

/** Erb (shield) preset sizes — width × height in px.
 *  Aspect ratio ≈ 1:1.17 (matches design-sources/erb.svg). */
export const SHIELD_SIZES = {
  xs: { w: 24,  h: 28  },
  sm: { w: 40,  h: 47  },
  md: { w: 64,  h: 75  },
  lg: { w: 96,  h: 112 },
}

/** Aspect ratio applied when `<Shield size>` is a raw number:
 *  `h = round(w * SHIELD_ASPECT_RATIO)`. Derived from design-sources/erb.svg. */
export const SHIELD_ASPECT_RATIO = 1.17

/** Banner (prapor) preset widths in px. Heights are intentionally NOT
 *  tokenized — the prapor body is, by definition, of variable length. */
export const PRAPOR_WIDTHS = {
  sm: 32,
  md: 40,
  lg: 48,
}

/** Default `<Shield shape="prapor">` width (`width` prop fallback). */
export const PRAPOR_DEFAULT_WIDTH = PRAPOR_WIDTHS.sm
/** Default `<Shield shape="prapor">` height (`height` prop fallback). */
export const PRAPOR_DEFAULT_HEIGHT = 120

/** Tip height as a fraction of shield/prapor width — fixed across both
 *  shapes (derived from /design-sources/erb.svg and /design-sources/prapor.svg). */
export const PRAPOR_TIP_RATIO = 0.289

/** Min width (px) at which decorative ornaments are rendered on a shield.
 *  Below this the detail is too small — ornaments are skipped. */
export const SHIELD_ORNAMENT_MIN_WIDTH = 30

// ── Hex tile sizing (board hex — pointy-top) ──────────────────────────────
// Pixel dimensions for `<HexTile>` (HexTile.jsx). The board hex is a regular
// pointy-top hexagon — width × height ≈ √3:2 ≈ 0.866 (matches hexPointyTop()).

/** Hex tile preset sizes — width × height in px. */
export const HEX_TILE_SIZES = {
  sm: { w: 42, h: 48 },
  md: { w: 62, h: 72 },
  lg: { w: 83, h: 96 },
}

/** Border thickness (px) — the visible outer outline of a hex tile.
 *  Implemented as the inset between the outer border layer and inner fill. */
export const HEX_TILE_BORDER_WIDTH = 2

/** Inner icon size (px) per HexTile size — used by FlameIcon on focal-active. */
export const HEX_TILE_ICON_SIZES = { sm: 8, md: 10, lg: 14 }

/** Inner diamond-dot size (px) per HexTile size — used on focal-passive. */
export const HEX_TILE_DOT_SIZES = { sm: 5, md: 6, lg: 9 }

// Public enums for HexTile axes moved to ./enums.js (HEX_TILE_PROPERTY_VALUES,
// HEX_TILE_FOCAL_VALUES, HEX_TILE_STATE_VALUES) — same naming pattern as the
// rest of the library, see ./enums.js for the full list.

// ── Hex badge sizing (chip hex — flat-top) ────────────────────────────────
// Pixel dimensions for `<DonjonBadge>` (DonjonBadge.jsx). The badge hex is
// flat-top with side indents (matches hexFlatTop(indent)).

/** Hex badge preset sizes — full geometry per size.
 *  h       = outer wrapper height
 *  bord    = border thickness (outer padding on each side)
 *  indent  = hex polygon indent in px (outer); inner indent = indent - bord
 *  px      = horizontal padding inside the chip
 *  fontSize / gap / dotSize / iconSize — text + indicator sizing */
export const HEX_BADGE_SIZES = {
  sm: { h: 20, bord: 2, indent: 6, px: 9,  fontSize: '0.5625rem', gap: 4, dotSize: 4, iconSize: 10 },
  md: { h: 26, bord: 2, indent: 8, px: 12, fontSize: '0.625rem',  gap: 5, dotSize: 5, iconSize: 12 },
}

// ── Shared tokens (motion, breakpoints, z-index) ──────────────────────────
// Re-export from `lib/shared/tokens.js` — structurally neutral tokens shared
// by tkajui and donjon. A change propagates to both libraries.
export {
  animFast, animNormal, animSlow, animDramatic,
  easingSharp, easingBounce, easingEnter, easingExit,
  bpMobile, bpTablet, bpDesktop, bpWide, BREAKPOINTS,
  zDropdown, zNotification, zToast, zTooltip,
} from '../shared/tokens'
