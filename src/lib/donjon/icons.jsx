/**
 * Game icons for donjon-fall-ui
 * Each icon is a pure SVG component (accepts width, height — color via currentColor).
 *
 * Categories:
 *   Resources:   HeartIcon, DropIcon, BoltIcon
 *   Actions:     SwordIcon, ShieldIcon, MoveIcon, TargetIcon, MagicIcon
 *   Game state:  StarIcon, CrownIcon, DiceIcon, HourglassIcon, TowerIcon
 *   Map:         HexIcon, BaseIcon, FocalPointIcon,
 *                FocalPointActiveIcon, FocalPointPassiveIcon
 *   Mechanics:   PushIcon, OccupyIcon, EncirclementIcon,
 *                TowerCollapseIcon, SuddenDeathIcon, TurnOrderIcon
 *   Brand:       DonjonLogoIcon, TkajuiLogoIcon (library marks, mirror favicon)
 */

/* ── Resources ──────────────────────────────────────────────────────────── */

/** HP / player health */
export function HeartIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path
        d="M12 20C5 16 3.5 11 3.5 9.5A4.5 4.5 0 0 1 12 6.5 4.5 4.5 0 0 1 20.5 9.5C20.5 11 19 16 12 20Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  )
}

/** Mana / magical energy */
export function DropIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path
        d="M12 3C9 8 5 12 5 15.5a7 7 0 0 0 14 0C19 12 15 8 12 3z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  )
}

/** Stamina / action energy */
export function BoltIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path
        d="M13 3L5 13.5h6.5L8.5 21 19.5 9H13V3z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Actions ────────────────────────────────────────────────────────────── */

/** Attack / combat */
export function SwordIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M4 20L14 10M14 10L18 4L20 6L14 10M14 10L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 12L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/** Defense / player base */
export function ShieldIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M12 3L4 7V12C4 16.4 7.4 20.5 12 21C16.6 20.5 20 16.4 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Move / die movement */
export function MoveIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Target / attack range */
export function TargetIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 5V3M12 21v-2M5 12H3M21 12h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/** Magic / special ability */
export function MagicIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Wand */}
      <path d="M4 20l8.5-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Large sparkle */}
      <path d="M10 7l.7 1.8 1.8.7-1.8.7L10 12l-.7-1.8L7.5 9.5l1.8-.7L10 7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Small sparkle top-right */}
      <path d="M18 4l.5 1.2 1.2.5-1.2.5L18 7.4l-.5-1.2-1.2-.5 1.2-.5L18 4z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
      {/* Tiny sparkle right */}
      <path d="M20 13l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4.4-1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Game state ─────────────────────────────────────────────────────────── */

/** Victory points (VP) */
export function StarIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path
        d="M12 2l2.8 5.8 6.2.9-4.5 4.4 1.4 6.4-5.9-3.1-5.9 3.1 1.4-6.4L3 8.7l6.2-.9L12 2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  )
}

/** Winner / score leader */
export function CrownIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path
        d="M3 17.5L5.5 8l4.5 4.5L12 4l2 8.5L18.5 8l2.5 9.5H3z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/** Die / reroll */
export function DiceIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8.5"  cy="8.5"  r="1.5" fill="currentColor"/>
      <circle cx="15.5" cy="8.5"  r="1.5" fill="currentColor"/>
      <circle cx="12"   cy="12"   r="1.5" fill="currentColor"/>
      <circle cx="8.5"  cy="15.5" r="1.5" fill="currentColor"/>
      <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/>
    </svg>
  )
}

/** End of turn / time limit */
export function HourglassIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M5 3h14M5 21h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 3l6 9-6 9M18 3l-6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/** Tower / donjon (stack of dice) */
export function TowerIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <rect x="6" y="11" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 11V7H8V9H10V7H14V9H16V7H18V11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 21V17H14V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Loot / inventory ─────────────────────────────────────────────────────
   Item icons used on InventorySlot, RewardPopup, ChoicePanel etc. Each
   takes width / height — color via currentColor so the slot's color
   token tints the icon. */

/** Potion — flask with rounded top and liquid level. */
export function PotionIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M10 3h4M10 3v4l-3 5a3.5 3.5 0 0 0 3 5h4a3.5 3.5 0 0 0 3-5l-3-5V3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 14h8" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="11" cy="16.5" r="0.5" fill="currentColor"/>
      <circle cx="13.5" cy="17" r="0.5" fill="currentColor"/>
    </svg>
  )
}

/** Gem — faceted diamond / loot stone. */
export function GemIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M6 9 12 3l6 6-6 12L6 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 9h12M9 6l3 15M15 6l-3 15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  )
}

/** Key — old skeleton key. */
export function KeyIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <circle cx="8" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="m11.5 11.5 8.5-8.5M16 7l3 3M14 9l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Scroll — rolled parchment, two visible end-caps. */
export function ScrollIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M5 5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8M5 5v12a3 3 0 0 0 3 3h11M5 5a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 11h8M9 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

/** Skull — death / dangerous item marker. */
export function SkullIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M5 11a7 7 0 1 1 14 0v3a2 2 0 0 1-2 2v3H7v-3a2 2 0 0 1-2-2v-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
      <path d="M11 17h2M10 16h1m3 0h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

/** Lock — closed padlock for locked / disabled slots. */
export function LockIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor"/>
      <path d="M12 16.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Stats / achievements ─────────────────────────────────────────────────
   Stat icons for LevelUp + character sheet (STR / INT / MP / etc.) and
   the AchievementToast trophy default. */

/** Trophy — cup with side handles + base, default for AchievementToast. */
export function TrophyIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 6H4a2 2 0 0 0 2 2h1M17 6h3a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 14v3M9 17h6M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/** Sparkle — 4-point star burst for mana, magic spark, level-up moment.
    Two crossed thin diamonds; visually distinct from StarIcon (5-point) and
    BoltIcon (lightning). */
export function SparkleIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M12 2 13.5 10.5 22 12 13.5 13.5 12 22 10.5 13.5 2 12 10.5 10.5 12 2Z" fill="currentColor"/>
    </svg>
  )
}

/** Strength — flexed bicep with upward chevrons signaling power growth. */
export function StrengthIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M5 19c0-4 2-6 5-6h2c2 0 4-1.5 4-4 0-3-2-5-5-5-2 0-3 1-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="13" cy="11" r="2.2" fill="currentColor"/>
      <path d="m17 3 2 2-2 2M19 5h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Intelligence — stylized brain (two hemispheres + central groove). */
export function IntelligenceIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 2.5A3 3 0 0 0 5 13a3 3 0 0 0 0 4 3 3 0 0 0 3 3h1V4H9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 2.5A3 3 0 0 1 19 13a3 3 0 0 1 0 4 3 3 0 0 1-3 3h-1V4h0Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M9 4v16M15 4v16M9 12h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Map ────────────────────────────────────────────────────────────────── */

/** Map tile / hex — empty hexagon (pointy-top) */
export function HexIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path
        d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  )
}

/** Player base / spawn hex — hex with a flag inside */
export function BaseIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Hex outline */}
      <path
        d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Flag pole */}
      <path d="M10 8V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Pennant */}
      <path d="M10 8H16L14 10.5L16 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/** Focal point — generic symbol (2 concentric circles + center) */
export function FocalPointIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <circle cx="12" cy="12" r="8.5"  stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4.5"  stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="1.25" fill="currentColor"/>
    </svg>
  )
}

/** Active focal point — filled center + radiating rays */
export function FocalPointActiveIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <circle cx="12" cy="12" r="3.25" fill="currentColor"/>
      <circle cx="12" cy="12" r="7"    stroke="currentColor" strokeWidth="1.5"/>
      {/* 4 N/E/S/W rays */}
      <path
        d="M12 1.5V4M12 20v2.5M1.5 12H4M20 12h2.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* 4 diagonal rays (shorter) */}
      <path
        d="M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M19.2 4.8l-1.4 1.4M6.2 17.8L4.8 19.2"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  )
}

/** Passive focal point — dashed ring + hollow center */
export function FocalPointPassiveIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <circle
        cx="12" cy="12" r="8.5"
        stroke="currentColor" strokeWidth="1.5"
        strokeDasharray="2.5 2.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

/* ── Game mechanics ─────────────────────────────────────────────────────── */

/** Push — pushing an enemy formation back (arrow pushing a wall) */
export function PushIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* The wall being pushed */}
      <path d="M17 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19.5 6.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Arrow pushing to the right */}
      <path d="M3 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Occupy — jumping onto an enemy tower (arrow from above into the structure) */
export function OccupyIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Tower body */}
      <rect x="7" y="13" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      {/* Battlements */}
      <path d="M7 13V11H9V12H11V11H13V12H15V11H17V13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Arrow from top down */}
      <path d="M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 5L12 8L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Encirclement — surrounding (4 triangles pointing inward at the center) */
export function EncirclementIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Target in the middle */}
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      {/* 4 arrows/triangles around (N, E, S, W) — pointing inward */}
      <path d="M9 3h6l-3 4z"    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M21 9v6l-4-3z"   stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M15 21H9l3-4z"   stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M3 15V9l4 3z"    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/** Tower collapse — leaning tower with falling stones */
export function TowerCollapseIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Leaning tower (rotated rect via path) */}
      <path
        d="M6 21L9 8L15 9.5L13 21Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Tilted battlements (top edge tilted) */}
      <path d="M9 8L9.5 6L11 6.3L11.3 4.5L13 4.8L13.3 6.5L15 7L15 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Falling stones */}
      <rect x="17" y="6"  width="2.5" height="2.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(20 18.25 7.25)"/>
      <rect x="19" y="11" width="2"   height="2"   stroke="currentColor" strokeWidth="1.2" transform="rotate(-15 20 12)"/>
      <rect x="17" y="16" width="2.5" height="2.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(35 18.25 17.25)"/>
    </svg>
  )
}

/** Sudden death — skull (instant loss with no legal action) */
export function SuddenDeathIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Skull */}
      <path
        d="M5 11C5 6.6 8.1 3.5 12 3.5C15.9 3.5 19 6.6 19 11V14.5L17 16V19H13.5V17H10.5V19H7V16L5 14.5V11Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Eye sockets (X markers — symbol of death) */}
      <path d="M8 10L10.5 12.5M10.5 10L8 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13.5 10L16 12.5M16 10L13.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Brand marks (Library logos) ─────────────────────────────────────────
   Path data taken from /public/favicon-*.svg (viewBox 145.27 × 145.27).
   Solid silhouette — fill+stroke `currentColor` for maximum visibility
   even at small sizes (11–16 px).
   ─────────────────────────────────────────────────────────────────────── */

/** donjon-fall-ui — library mark (mirror of favicon-donjon.svg) */
export function DonjonLogoIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 145.27 145.27" width={width} height={height} aria-hidden="true">
      <polygon
        fill="currentColor" stroke="currentColor" strokeMiterlimit="10"
        points="130.75 29.06 130.74 97.19 72.64 130.74 14.54 97.19 14.53 29.06 43.59 29.06 43.59 84.92 72.64 101.69 101.69 84.92 101.69 29.06 130.75 29.06"
      />
      <polygon
        fill="currentColor" stroke="currentColor" strokeMiterlimit="10"
        points="87.75 43.58 87.75 78.44 72.64 87.16 57.52 78.44 57.52 43.58 87.75 43.58"
      />
    </svg>
  )
}

/** TkajUI — library mark (mirror of favicon-tkajui.svg) */
export function TkajuiLogoIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 145.27 145.27" width={width} height={height} aria-hidden="true">
      <polygon
        fill="currentColor" stroke="currentColor" strokeMiterlimit="10"
        points="130.74 58.11 130.73 97.19 72.64 130.74 14.54 97.19 14.53 58.11 43.59 58.11 43.59 84.92 72.64 101.69 101.68 84.92 101.68 58.11 130.74 58.11"
      />
      <polygon
        fill="currentColor" stroke="currentColor" strokeMiterlimit="10"
        points="130.74 14.53 130.74 43.58 87.75 43.58 87.75 78.44 72.63 87.16 57.51 78.44 57.51 43.58 14.53 43.58 14.53 14.53 130.74 14.53"
      />
    </svg>
  )
}

/** Turn order / initiative — circular arrow with three dots */
export function TurnOrderIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Circular arrow (turn cycle) */}
      <path
        d="M19 12A7 7 0 1 1 12 5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <path d="M12 2L15 5L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* 3 dots inside — players in order */}
      <circle cx="9"  cy="13" r="1.2" fill="currentColor"/>
      <circle cx="13" cy="13" r="1.2" fill="currentColor"/>
      <circle cx="13" cy="17" r="1.2" fill="currentColor"/>
    </svg>
  )
}
