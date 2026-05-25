/**
 * Herní ikony pro donjon-fall-ui
 * Každá ikona je čistá SVG komponenta (přijímá width, height — color přes currentColor).
 *
 * Kategorie:
 *   Zdroje:    HeartIcon, DropIcon, BoltIcon
 *   Akce:      SwordIcon, ShieldIcon, MoveIcon, TargetIcon, MagicIcon
 *   Herní stav: StarIcon, CrownIcon, DiceIcon, HourglassIcon, TowerIcon
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
