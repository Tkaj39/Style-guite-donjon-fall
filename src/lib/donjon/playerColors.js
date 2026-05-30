/* eslint-disable donjon/no-hardcoded-hex --
 * Soubor JE zdroj pravdy palety. Hex hodnoty jsou tu definovány jako tokeny;
 * importem `{ red, blueDark, … }` se pak používají všude jinde. Pravidlo
 * `donjon/no-hardcoded-hex` zde nedává smysl — jeho smysl je „použij token",
 * a tohle JSOU ty tokeny.
 */
/**
 * Player palette — barvy hráčů pro donjon-fall-ui
 *
 * Jediný zdroj pravdy pro hráčské barvy. Definuje 6 jasných, vzájemně
 * rozlišitelných odstínů — každý ve třech variantách:
 *
 *   - `<color>`       — primární barva (kostky, štíty, UI akcenty hráče)
 *   - `<color>Light`  — světlá varianta (text na tmavém pozadí, sub-info)
 *   - `<color>Dark`   — tmavá varianta (základna na mapě, vlastněné území)
 *
 * Konvence: max 6 hráčů (red, blue, green, yellow, purple, orange).
 * Hodnoty se synchronizují s primary z `gameUiMockData.js` (operativně
 * používané v Erb, DieFace, PlayerPanel, HexTile demech).
 *
 * Použití:
 *   import { red, blueDark, playerColors } from 'donjon-fall-ui'
 *
 *   <Shield playerColor={red} />
 *   <HexTile state="base" playerColor={playerColors[0].primary} />
 *   {playerColors.map(p => <DieFace playerColor={p.primary} />)}
 *
 * Nebo přes CSS:
 *   color: var(--donjon-player-red);
 *   background: var(--donjon-player-blue-dark);
 */

/* ── Primárky ────────────────────────────────────────────────────────── */
export const red    = '#E05C5C'
export const blue   = '#4D8FE0'
export const green  = '#50B86C'
export const yellow = '#D4A830'
export const purple = '#9B6CC8'
export const orange = '#E07840'

/* ── Světlé varianty (text na tmavém, sub-info) ─────────────────────── */
export const redLight    = '#F9C0C0'
export const blueLight   = '#C8DDF8'
export const greenLight  = '#C8F0D5'
export const yellowLight = '#F4E2A0'
export const purpleLight = '#DAC0F0'
export const orangeLight = '#F8D0B8'

/* ── Tmavé varianty (base / vlastněná území) ────────────────────────── */
export const redDark     = '#3D1818'
export const blueDark    = '#122340'
export const greenDark   = '#122F1A'
export const yellowDark  = '#382A08'
export const purpleDark  = '#2A1840'
export const orangeDark  = '#3D1F0A'

/* ── Strukturovaná data ─────────────────────────────────────────────── */

/**
 * Hráčský objekt s metadaty.
 * @typedef {Object} PlayerColor
 * @property {number} id - 1..6
 * @property {string} key - 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'
 * @property {string} name - česká barva ('Červená' apod.)
 * @property {string} primary - primární hex
 * @property {string} light - světlá varianta
 * @property {string} dark - tmavá varianta
 * @property {string} label - lidský label pro UI ('Hráč 1' apod.)
 */

/**
 * Pole hráčů — uspořádané podle ID (1..6). Vhodné pro `.map()` v demech
 * nebo iniciální stav herního stavu.
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
 * Lookup mapa pro rychlý přístup podle klíče.
 * @example playerColorsByKey.red.primary  // '#E05C5C'
 */
export const playerColorsByKey = Object.fromEntries(
  playerColors.map(p => [p.key, p])
)
