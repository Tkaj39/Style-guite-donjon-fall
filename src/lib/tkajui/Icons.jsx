/* ── TkajUI utility icons ─────────────────────────────────────────────
   Generic UI icons (not game-specific) — extracted from HomePage so
   the showcase + any consumer can reuse them instead of redefining.

   Each icon takes `width` / `height` / `color` (default `currentColor`)
   so it inherits text color when nested in a `<span>` / `<a>`. All have
   `aria-hidden="true"` because they're decorative — the surrounding
   element carries the label.

   For game-themed icons (Sword, Shield, Heart, Dice…) see
   `donjon-fall-ui/Icons.jsx`.
   ─────────────────────────────────────────────────────────────────── */

/** Bulleted list — three horizontal bars with leading dots. */
export function ListIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** Phase / state diagram — dot → big circle → line → dot. */
export function PhasesIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <circle cx="5" cy="12" r="2.5" fill={color} />
      <path d="M8 12h4" stroke={color} strokeWidth="1.5" />
      <circle cx="14" cy="12" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M17 12h4" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

/** Hash / grid — # symbol, for tokens / numbers / categories. */
export function HashIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M9 3 7 21M17 3l-2 18M3 9h18M2 15h18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Palette — color picker / theming. */
export function PaletteIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1.2 2-2.5 0-1.2-1-2-1-3 0-1.5 1-2.5 2.5-2.5H17a4 4 0 0 0 4-4c0-3.3-4-6-9-6Z" stroke={color} strokeWidth="1.5" />
      <circle cx="7.5" cy="11" r="1.2" fill={color} />
      <circle cx="12" cy="7.5" r="1.2" fill={color} />
      <circle cx="16.5" cy="11" r="1.2" fill={color} />
    </svg>
  )
}

/** 2×2 grid — layout / spacing / shape. */
export function GridIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

/** Spark / sparkle — animations / motion. */
export function SparkIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l4 4M14.5 14.5l4 4M18.5 5.5l-4 4M9.5 14.5l-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Stack — three horizontal bars (layers). */
export function StackIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="3" y="4"  width="18" height="4" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="3" y="10" width="18" height="4" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="3" y="16" width="18" height="4" rx="1" stroke={color} strokeWidth="1.4" />
    </svg>
  )
}

/** Form — two input fields stacked. */
export function FormIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="3.5" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="3" y="13" width="18" height="3.5" rx="1" stroke={color} strokeWidth="1.4" />
      <path d="M5 8h2M5 15h2" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

/** Button — rounded pill with horizontal line. */
export function ButtonIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M8 12h8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** Modal — frame within a frame. */
export function ModalIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="1.4" opacity="0.4" />
      <rect x="6" y="7" width="12" height="10" rx="1.5" stroke={color} strokeWidth="1.6" />
      <path d="M9 11h6M9 14h4" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

/** Tabs — tab strip with content area below. */
export function TabsIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M3 9h6V6h12v3" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="3" y="9" width="18" height="11" rx="1.5" stroke={color} strokeWidth="1.4" />
    </svg>
  )
}

/** Toggle — pill with circular thumb on the right (on state). */
export function ToggleIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="4" stroke={color} strokeWidth="1.4" />
      <circle cx="16" cy="12" r="2.6" fill={color} />
    </svg>
  )
}

/** Architecture — top box connected to two bottom boxes (parent → children). */
export function ArchIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="9" y="2" width="6" height="4" rx="0.6" stroke={color} strokeWidth="1.3" />
      <rect x="2" y="14" width="6" height="6" rx="0.6" stroke={color} strokeWidth="1.3" />
      <rect x="16" y="14" width="6" height="6" rx="0.6" stroke={color} strokeWidth="1.3" />
      <path d="M12 6v4M12 10H5v4M12 10h7v4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

/* ── Common actions ────────────────────────────────────────────────────────
   The 14 most-reused UI icons across an app shell — settings panel,
   search, CRUD verbs, download / share, chrome controls. Each follows
   the same { width, height, color = 'currentColor' } API as the icons
   above so they can be drop-in replacements for emoji or one-off SVGs. */

/** Settings — gear / cog. */
export function SettingsIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.13.66.36.87.69.21.33.32.71.31 1.1a1.65 1.65 0 0 0-1.18 1.21Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}

/** Search — magnifier with diagonal handle. */
export function SearchIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke={color} strokeWidth="1.5"/>
      <path d="m20 20-4.35-4.35" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/** Plus — horizontal + vertical cross, increment / add. */
export function PlusIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

/** Minus — single horizontal stroke, decrement / collapse. */
export function MinusIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

/** Edit — pencil pointing down-left over a baseline. */
export function EditIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M14.5 4 20 9.5 9.5 20H4v-5.5L14.5 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="m13 5.5 5.5 5.5" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}

/** Trash — bin with lid + 2 inner ribs, delete verb. */
export function TrashIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v6M14 11v6" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

/** Download — arrow pointing down into a tray. */
export function DownloadIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M12 3v12m0 0-4-4m4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Upload — mirror of Download (arrow points up out of the tray). */
export function UploadIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M12 21V9m0 0-4 4m4-4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Close — diagonal cross (X), used for dismiss / close. */
export function CloseIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

/** Check — confirmation tick (✓). */
export function CheckIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="m5 12 5 5 9-12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Copy — two overlapping rounded rectangles, clipboard verb. */
export function CopyIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

/** Chevron Down — disclosure / dropdown caret. */
export function ChevronDownIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** Chevron Right — disclosure / breadcrumb arrow. */
export function ChevronRightIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/** External link — square with diagonal arrow exiting top-right. */
export function ExternalLinkIcon({ width = 22, height = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M14 4h6v6M20 4 10 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}
