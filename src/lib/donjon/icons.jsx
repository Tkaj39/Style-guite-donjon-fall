/**
 * Herní ikony pro donjon-fall-ui
 * Každá ikona je čistá SVG komponenta (přijímá width, height — color přes currentColor).
 *
 * Kategorie:
 *   Zdroje:      HeartIcon, DropIcon, BoltIcon
 *   Akce:        SwordIcon, ShieldIcon, MoveIcon, TargetIcon, MagicIcon
 *   Herní stav:  StarIcon, CrownIcon, DiceIcon, HourglassIcon, TowerIcon
 *   Mapa:        HexIcon, BaseIcon, FocalPointIcon,
 *                FocalPointActiveIcon, FocalPointPassiveIcon
 *   Mechaniky:   PushIcon, OccupyIcon, EncirclementIcon,
 *                TowerCollapseIcon, SuddenDeathIcon, TurnOrderIcon
 *   Brand:       DonjonLogoIcon, TkajuiLogoIcon (značky knihoven, mirror favicon)
 */

/* ── Zdroje (Resources) ─────────────────────────────────────────────────── */

/** HP / zdraví hráče */
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

/** Mana / magická energie */
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

/** Stamina / energie akce */
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

/* ── Akce (Actions) ─────────────────────────────────────────────────────── */

/** Útok / souboj */
export function SwordIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M4 20L14 10M14 10L18 4L20 6L14 10M14 10L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 12L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/** Obrana / základna hráče */
export function ShieldIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M12 3L4 7V12C4 16.4 7.4 20.5 12 21C16.6 20.5 20 16.4 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Pohyb / přesun kostky */
export function MoveIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Cíl / dosah útoku */
export function TargetIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 5V3M12 21v-2M5 12H3M21 12h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/** Magie / speciální schopnost */
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

/* ── Herní stav (Game State) ─────────────────────────────────────────────── */

/** Vítězné body (VP) */
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

/** Vítěz / lídr skóre */
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

/** Kostka / přehazování */
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

/** Konec tahu / časový limit */
export function HourglassIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M5 3h14M5 21h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 3l6 9-6 9M18 3l-6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/** Věž / donjon (hromada kostek) */
export function TowerIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <rect x="6" y="11" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 11V7H8V9H10V7H14V9H16V7H18V11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 21V17H14V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Mapa (Map) ──────────────────────────────────────────────────────────── */

/** Mapové pole / hex — prázdný hexagon (pointy-top) */
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

/** Základna hráče / spawn hex — hex s vlajkou uvnitř */
export function BaseIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Hex obal */}
      <path
        d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Vlajková tyč */}
      <path d="M10 8V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Praporek */}
      <path d="M10 8H16L14 10.5L16 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/** Ohnisko — generický symbol (2 soustředné kružnice + střed) */
export function FocalPointIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <circle cx="12" cy="12" r="8.5"  stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4.5"  stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="1.25" fill="currentColor"/>
    </svg>
  )
}

/** Aktivní ohnisko — plný střed + vyzařující paprsky */
export function FocalPointActiveIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <circle cx="12" cy="12" r="3.25" fill="currentColor"/>
      <circle cx="12" cy="12" r="7"    stroke="currentColor" strokeWidth="1.5"/>
      {/* 4 paprsky N/E/S/W */}
      <path
        d="M12 1.5V4M12 20v2.5M1.5 12H4M20 12h2.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* 4 paprsky diagonálně (kratší) */}
      <path
        d="M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M19.2 4.8l-1.4 1.4M6.2 17.8L4.8 19.2"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  )
}

/** Pasivní ohnisko — dashed prstenec + dutý střed */
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

/* ── Mechaniky (Game mechanics) ──────────────────────────────────────────── */

/** Push — odtlačení nepřátelské formace (šipka tlačí stěnu) */
export function PushIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Tlačená stěna */}
      <path d="M17 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19.5 6.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Šipka tlačící doprava */}
      <path d="M3 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Occupy — naskočení na nepřátelskou věž (šipka shora do struktury) */
export function OccupyIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Tělo věže */}
      <rect x="7" y="13" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      {/* Cimbuří */}
      <path d="M7 13V11H9V12H11V11H13V12H15V11H17V13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Šipka shora dolů */}
      <path d="M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 5L12 8L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Encirclement — sevření (4 trojúhelníky míří dovnitř na střed) */
export function EncirclementIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Cíl uprostřed */}
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      {/* 4 šipky/trojúhelníky kolem (N, E, S, W) — míří dovnitř */}
      <path d="M9 3h6l-3 4z"    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M21 9v6l-4-3z"   stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M15 21H9l3-4z"   stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M3 15V9l4 3z"    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/** Kolaps věže — nakloněná věž s padajícími kameny */
export function TowerCollapseIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Nakloněná věž (rotated rect via path) */}
      <path
        d="M6 21L9 8L15 9.5L13 21Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Šikmé cimbuří (top edge tilted) */}
      <path d="M9 8L9.5 6L11 6.3L11.3 4.5L13 4.8L13.3 6.5L15 7L15 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Padající kameny */}
      <rect x="17" y="6"  width="2.5" height="2.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(20 18.25 7.25)"/>
      <rect x="19" y="11" width="2"   height="2"   stroke="currentColor" strokeWidth="1.2" transform="rotate(-15 20 12)"/>
      <rect x="17" y="16" width="2.5" height="2.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(35 18.25 17.25)"/>
    </svg>
  )
}

/** Sudden death — lebka (okamžitá prohra bez legální akce) */
export function SuddenDeathIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Lebka */}
      <path
        d="M5 11C5 6.6 8.1 3.5 12 3.5C15.9 3.5 19 6.6 19 11V14.5L17 16V19H13.5V17H10.5V19H7V16L5 14.5V11Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Oční důlky (X markers — symbol smrti) */}
      <path d="M8 10L10.5 12.5M10.5 10L8 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13.5 10L16 12.5M16 10L13.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Brand marks (Library logos) ─────────────────────────────────────────
   Path data převzata z /public/favicon-*.svg (viewBox 145.27 × 145.27).
   Solidní silueta — fill+stroke `currentColor` pro maximální viditelnost
   i v malých velikostech (11–16 px).
   ─────────────────────────────────────────────────────────────────────── */

/** donjon-fall-ui — značka knihovny (mirror favicon-donjon.svg) */
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

/** TkajUI — značka knihovny (mirror favicon-tkajui.svg) */
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

/** Pořadí hráčů / iniciativa — kruhové šipky se třemi tečkami */
export function TurnOrderIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      {/* Kruhová šipka (cyklus tahů) */}
      <path
        d="M19 12A7 7 0 1 1 12 5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <path d="M12 2L15 5L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* 3 tečky uvnitř — hráči v pořadí */}
      <circle cx="9"  cy="13" r="1.2" fill="currentColor"/>
      <circle cx="13" cy="13" r="1.2" fill="currentColor"/>
      <circle cx="13" cy="17" r="1.2" fill="currentColor"/>
    </svg>
  )
}
