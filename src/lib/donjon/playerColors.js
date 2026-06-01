/* eslint-disable donjon/no-hardcoded-hex --
 * This file IS the source of truth for the palette. Hex values are defined
 * here as tokens; importing `{ red, blueDark, … }` is how they get used
 * everywhere else. The `donjon/no-hardcoded-hex` rule does not make sense
 * here — its purpose is "use a token", and these ARE the tokens.
 */
/**
 * Player palette — player colors for donjon-fall-ui
 *
 * The single source of truth for player colors. Defines 6 distinct,
 * mutually distinguishable shades — each in three variants:
 *
 *   - `<color>`       — primary color (dice, shields, player UI accents)
 *   - `<color>Light`  — light variant (text on dark backgrounds, sub-info)
 *   - `<color>Dark`   — dark variant (base on the map, owned territory)
 *
 * Convention: up to 6 players (red, blue, green, yellow, purple, orange).
 * Values are synchronised with the primaries from `gameUiMockData.js`
 * (used operationally in the Erb, DieFace, PlayerPanel, HexTile demos).
 *
 * Usage:
 *   import { red, blueDark, playerColors } from 'donjon-fall-ui'
 *
 *   <Shield playerColor={red} />
 *   <HexTile state="base" playerColor={playerColors[0].primary} />
 *   {playerColors.map(p => <DieFace playerColor={p.primary} />)}
 *
 * Or via CSS:
 *   color: var(--donjon-player-red);
 *   background: var(--donjon-player-blue-dark);
 */

/* ── Primaries ───────────────────────────────────────────────────────── */
export const red    = '#E05C5C'
export const blue   = '#4D8FE0'
export const green  = '#50B86C'
export const yellow = '#D4A830'
export const purple = '#9B6CC8'
export const orange = '#E07840'

/* ── Light variants (text on dark, sub-info) ────────────────────────── */
export const redLight    = '#F9C0C0'
export const blueLight   = '#C8DDF8'
export const greenLight  = '#C8F0D5'
export const yellowLight = '#F4E2A0'
export const purpleLight = '#DAC0F0'
export const orangeLight = '#F8D0B8'

/* ── Dark variants (base / owned territory) ─────────────────────────── */
export const redDark     = '#3D1818'
export const blueDark    = '#122340'
export const greenDark   = '#122F1A'
export const yellowDark  = '#382A08'
export const purpleDark  = '#2A1840'
export const orangeDark  = '#3D1F0A'

/* ── Structured data ────────────────────────────────────────────────── */

/**
 * Player object with metadata.
 * @typedef {Object} PlayerColor
 * @property {number} id - 1..6
 * @property {string} key - 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'
 * @property {string} name - English color name ('Red' etc.)
 * @property {string} primary - primary hex
 * @property {string} light - light variant
 * @property {string} dark - dark variant
 * @property {string} label - human-friendly UI label ('Player 1' etc.)
 */

/**
 * Players array — ordered by ID (1..6). Suitable for `.map()` in demos
 * or for the initial game state.
 *
 * Note: `name` and `label` are kept in Czech for backwards compatibility
 * with the existing showcase pages (`Hráč 1`, `Červená`). When you import
 * this into a fresh application, override them with your own localised
 * strings. Keeping them here in Czech avoids breaking the in-repo demo.
 * @type {PlayerColor[]}
 */
export const playerColors = [
  { id: 1, key: 'red',    name: 'Červená',  primary: red,    light: redLight,    dark: redDark,    label: 'Hráč 1' },
  { id: 2, key: 'blue',   name: 'Modrá',    primary: blue,   light: blueLight,   dark: blueDark,   label: 'Hráč 2' },
  { id: 3, key: 'green',  name: 'Zelená',   primary: green,  light: greenLight,  dark: greenDark,  label: 'Hráč 3' },
  { id: 4, key: 'yellow', name: 'Žlutá',    primary: yellow, light: yellowLight, dark: yellowDark, label: 'Hráč 4' },
  { id: 5, key: 'purple', name: 'Fialová',  primary: purple, light: purpleLight, dark: purpleDark, label: 'Hráč 5' },
  { id: 6, key: 'orange', name: 'Oranžová', primary: orange, light: orangeLight, dark: orangeDark, label: 'Hráč 6' },
]

/**
 * Lookup map for quick access by key.
 * @example playerColorsByKey.red.primary  // '#E05C5C'
 */
export const playerColorsByKey = Object.fromEntries(
  playerColors.map(p => [p.key, p])
)
