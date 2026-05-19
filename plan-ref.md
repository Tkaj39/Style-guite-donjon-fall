# plan-ref.md — Audit hardcoded hodnot & refactoring plán

## Co bylo prověřeno

| Oblast | Metoda |
|--------|--------|
| `src/lib/tkajui/*.jsx` | každý soubor přečten, importy z `tokens.js` ověřeny |
| `src/lib/donjon/*.jsx` | každý soubor přečten, re-exporty vs. vlastní implementace rozlišeny |
| `src/pages/**/*.jsx` | 1 546 hex výskytů ve 54 souborech |
| `src/index.css` | žádné CSS proměnné, pouze keyframes |
| `src/lib/tkajui/tokens.js` | existuje, 12 komponent importuje |
| `src/lib/donjon/tokens.js` | **neexistuje** |
| `tailwind.config.js` | custom `brand-*` paleta — neshoduje se s `tokens.js` |
| `App.jsx` | 60+ statických importů stránek |
| `ShowcasePage.jsx` + `Sidebar.jsx` | duplikace library barev |
| `src/lib/tkajui/__tests__/` | axe + ARIA testy pro TkajUI; donjon bez pokrytí |
| `vite.config.js`, `package.json` | čisté, bez problémů |

---

## Mapa donjon komponent — vlastní implementace vs. re-exporty

Toto rozdělení je klíčové pro správné určení rozsahu refactoringu:

| Soubor | Typ | Vlastní barvy? |
|--------|-----|----------------|
| `DonjonButton.jsx` | vlastní implementace | ✗ hardcoded |
| `DonjonCard.jsx` | vlastní implementace | ✗ hardcoded |
| `DonjonModal.jsx` | vlastní implementace | ✗ hardcoded |
| `DonjonTabs.jsx` | vlastní implementace | ✗ hardcoded |
| `DonjonButtonGroup.jsx` | vlastní implementace | ✗ hardcoded |
| `DonjonPictogram.jsx` | vlastní implementace | ✗ hardcoded |
| `DonjonBadge.jsx` | re-export → `tkajui/Badge` | ✓ žádné |
| `DonjonInput.jsx` | re-export → `tkajui/Input` | ✓ žádné |
| `DonjonSelect.jsx` | re-export → `tkajui/Select` | ✓ žádné |
| `DonjonSlider.jsx` | re-export → `tkajui/Slider` | ✓ žádné |
| `DonjonToast.jsx` | re-export → `tkajui/Toast` | ✓ žádné |
| `DonjonTooltip.jsx` | re-export → `tkajui/Tooltip` | ✓ žádné |
| `DonjonToggle.jsx` | re-export → `tkajui/Toggle` | ✓ žádné |
| `DonjonProgressBar.jsx` | re-export → `tkajui/ProgressBar` | ✓ žádné |
| `FloatFeedback.jsx` | game asset, vlastní | ✗ hardcoded |
| `HexTile.jsx` | game asset, vlastní | ✗ hardcoded |
| `DieFace.jsx` | game asset, dynamický `playerColor` prop + 2 hardcoded | částečně |

---

## Nálezy podle závažnosti

### 🔴 Kritické — přímo zhoršuje udržovatelnost

#### 1. Donjon nemá `tokens.js`

TkajUI má `src/lib/tkajui/tokens.js` a 12 lib komponent ho správně importuje.
Donjon **nemá žádný ekvivalent**. Barvy jsou hardcoded v 6 vlastních implementacích:

```
src/lib/donjon/DonjonButton.jsx      → #FFC183, #B8956A, #8F7458, #353751, #2A2948 …
src/lib/donjon/DonjonCard.jsx        → stejné hodnoty znova
src/lib/donjon/DonjonModal.jsx       → stejné hodnoty znova + #C08040, #FFD580
src/lib/donjon/DonjonTabs.jsx        → #F0E6D3, #B8956A, #8F745466, #8F9CB3
src/lib/donjon/DonjonButtonGroup.jsx → #8F7458, #353751, #2A2948, #232238, #1B1A30
src/lib/donjon/DonjonPictogram.jsx   → #FFC183, #8F7458, #3A3A52, #C04040, #40A055 …
```

Navíc `src/lib/tkajui/Ornaments.jsx` a `src/lib/tkajui/CornerOrnament.jsx` (viz bod 4) používají
donjon barvy přímo — po vzniku `tokens.js` by je měly importovat odtud.

**Dopad:** změna zlaté = 6+ ruční editů s rizikem nesouladu.

Navrhovaný soubor `src/lib/donjon/tokens.js`:
```js
// Zlato — primární akcent
export const gold        = '#FFC183'  // hlavní zlatá, text, ikony
export const goldMid     = '#B8956A'  // labels, subtitles
export const goldDim     = '#8F7458'  // borders, muted

// Pozadí / surfaces
export const bg0         = '#12102A'  // nejhlubší (page bg)
export const bg1         = '#171626'  // base dark
export const bg2         = '#1E1C30'  // card bg
export const bg3         = '#252340'  // elevated panel
export const bg4         = '#2A2948'  // hover / raised
export const bgInactive  = '#232238'  // inactive button v ButtonGroup

// Borders
export const borderSubtle  = '#1A1830'
export const borderDefault = '#353751'
export const borderMid     = '#2A2848'

// Text
export const textHigh      = '#E8DDD0'  // near-white, warm tint
export const textMid       = '#C8BFAF'  // labels — také = #F0E6D3 v Tabs
export const textLow       = '#9A9080'  // muted / hints
export const textDisabled  = '#6B6A82'  // = #8F9CB3 v Tabs (sjednotit)

// Semantic
export const dangerColor   = '#E05C5C'
export const successColor  = '#40A055'
export const warningColor  = '#C08040'
```

---

#### 2. `tailwind.config.js` `brand-*` ≠ `tokens.js` `accent`

Projekt má **tři nezávislé definice "modré" barvy** které se neshodují:

```js
// tailwind.config.js
brand-500: '#4f57f7'   ← použito v Sidebar, ShowcasePage, 8 stránek (25+ výskytů)

// src/lib/tkajui/tokens.js
accent:      '#6576ff'  ← použito v lib komponentách
accentLight: '#8591ff'

// src/styleguide/ShowcasePage.jsx
tkajui: { color: '#7BAED4' }  ← ocelová modrá pro UI chrome
```

`brand-500 = #4f57f7` a `accent = #6576ff` jsou vizuálně různé odstíny.
Style guide má jiné "modré" než TkajUI komponenty.

**Fix:** sjednotit — upravit `brand-500` v `tailwind.config.js` na `#6576ff` (nebo celou
brand škálu přegenerovat od `#6576ff` jako středového bodu).

---

#### 3. TkajUI `Card.jsx` používá donjon paletu — cross-contamination

`src/lib/tkajui/Card.jsx` je v tkajui složce ale **neimportuje z `tokens.js`** a má
hardcoded donjon barvy:

```js
// src/lib/tkajui/Card.jsx — CHYBA
const variants = {
  default: {
    bg:        'linear-gradient(150deg,#353751 0%,#2A2948 70%)',  // donjon bg3/bg4
    border:    '#8F7458',                                          // donjon goldDim
    headerBg:  'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)',
    titleGrad: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)', // donjon goldMid
  }, …
}
```

`DonjonCard.jsx` má **identické hodnoty zkopírované** — obě karty vypadají stejně,
přestože by TkajUI Card měla mít chladnou slate paletu.

**Fix:** TkajUI `Card.jsx` → nahradit donjon hex hodnoty TkajUI tokeny (`surface3`, `surface4`,
`borderDefault`, `textHigh`). `DonjonCard.jsx` → po vzniku `donjon/tokens.js` použít ty.

---

#### 4. Dvě donjon komponenty žijí v tkajui složce s donjon barvami

Dva soubory jsou v `src/lib/tkajui/` ale patří do donjon-fall-ui — registry je správně kategorizuje
přes `CATEGORY_OVERRIDES`, fyzické umístění však zůstává matoucí:

**`Ornaments.jsx`** (`SideOrnament` + `HexOrnament`):
- importují ho **pouze** donjon komponenty (DonjonButton, DonjonCard, DonjonModal, DonjonButtonGroup)
- hardcoded donjon barvy na více místech:

```js
// SideOrnament — SVG gradienty
<stop stopColor="#FFC183" />
<stop stopColor="#8F7458" />

// HexOrnament — diamond fill + linie
fill="#2A2948"
background: 'linear-gradient(90deg,#8F7458 0%,#FFC183 50%,#8F7458 100%)'
```

**`CornerOrnament.jsx`**:
- accepts `color` prop (správný vzor), ale výchozí hodnota je donjon barva:

```js
export default function CornerOrnament({ color = '#8F7458', … })
//                                               ↑ donjon goldDim jako default
```

- v TkajUI kontextu bez specifikace barvy vykreslí zlatohnědou místo chladné slate

**Fix (v prioritě):**
1. Krátkodobě: Ornaments.jsx + CornerOrnament.jsx importují barvy z `donjon/tokens.js`; CornerOrnament default → `currentColor`
2. Dlouhodobě: přesunout oba soubory do `src/lib/donjon/`

---

### 🟡 Střední — tech debt, není bloker

#### 5. `@keyframes spin` jako inline `<style>` tag — oba Spinner komponenty

Stejný problém ve **dvou** souborech:

```jsx
// src/lib/donjon/DonjonButton.jsx — Spinner
// src/lib/tkajui/Button.jsx       — Spinner (identický kód)
<style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
```

Při každém renderu tlačítka v loading stavu se do DOM přidá nový `<style>`.

**Fix:** přesunout do `src/index.css` — oba soubory opravit naráz.

---

#### 6. TkajUI lib — hardcoded hodnoty co chybí v `tokens.js`

Jinak vzorné importy, ale tyto konkrétní hodnoty nejsou tokenizované:

```js
// src/lib/tkajui/Button.jsx
danger:  { bgHover: '#2d0a0a' }    // chybí dangerBgHover
success: { bgHover: '#0a2e16' }    // chybí successBgHover
warning: { bgHover: '#2a1604' }    // chybí warningBgHover

// src/lib/tkajui/Modal.jsx
danger:  { headerBg: '#2a0606',    // chybí dangerHeaderBg
           desc:     '#c07070' }   // chybí dangerDescColor

// src/lib/tkajui/ProgressBar.jsx + src/lib/tkajui/Slider.jsx  ← oba stejný vzor
default: { fill: '…,#4455ee 100%' }    // #4455ee = accentDim, importován není
success: { fill: '…,#18a850 100%' }    // tmavší end gradientu, mimo tokeny
danger:  { fill: '…,#cc2222 100%' }
warning: { fill: '…,#cc7010 100%' }
info:    { fill: '…,#2070d0 100%' }
```

**Fix:** přidat chybějící tokeny do `tokens.js` a aktualizovat 4 soubory (Button, Modal, ProgressBar, Slider).

---

#### 7. Donjon komponenty s vlastní implementací nemají axe / ARIA testy

TkajUI: `accessibility.test.jsx` pokrývá axe audit pro 10 komponent.
Donjon vlastní implementace: **žádné testy přístupnosti**:

| Komponenta | Typ | Testy |
|-----------|-----|-------|
| DonjonButton | vlastní implementace | ❌ |
| DonjonCard | vlastní implementace | ❌ |
| DonjonModal | vlastní implementace | ❌ |
| DonjonTabs | vlastní implementace | ❌ |
| DonjonButtonGroup | vlastní implementace | ❌ |
| DonjonPictogram | vlastní implementace | ❌ |
| DonjonBadge/Input/Select/… | re-exporty TkajUI | ✓ přes tkajui testy |

---

#### 8. Barvy LIBRARY_CFG duplikované ve dvou souborech

`ShowcasePage.jsx` exportuje `LIBRARY_CFG` s `#7BAED4` a `#B8956A`.
`Sidebar.jsx` má identické hodnoty v `LibIcon` znovu, nezávisle.

**Fix:** Sidebar importuje `LIBRARY_CFG` ze ShowcasePage (už ho exportuje).

---

#### 9. Pages: 1 546 hex hodnot — část by měla importovat tokeny

Stránky jsou dokumentace, určitá míra hardcodování je OK. Ale stránky které
**dokumentují tokeny samotné** by je měly importovat — jinak dokumentace a realita mohou divergovat.

Týká se hlavně: `TokensPage`, `FocusRingPage`, `GlowShadowPage`, `InteractionStatesPage`, `ColorsPage`.

---

#### 10. Nekonzistentní styling pattern v donjon vlastních komponentách

`DonjonButton.jsx` kombinuje Tailwind `hover:brightness-110` v `className` s inline `filter` stylem
na stejném elementu — Tailwind přepisuje celou `filter` vlastnost a brightness efekt nemusí fungovat.
`DonjonCard`, `DonjonModal`, `DonjonTabs` jsou čistě inline — konzistentnější.

---

### 🟢 Nízká priorita — pořádek v kódu

#### 11. Žádné CSS custom properties v `index.css`

Žádné CSS vars ani pro donjon, ani pro TkajUI. Relevantní pro runtime přepínání tématu.
**Není nutné teď** — zvážit při eventuálním public release.

---

#### 12. `App.jsx` — 60+ statických importů, žádný lazy loading

Bundle 926 kB (gzip 229 kB). Pro interní style guide přijatelné.
`React.lazy` + `Suspense` by bundle výrazně zmenšilo.

---

#### 13. Mix `<section style=...>` vs `<Section>` komponenta

Starší stránky píší raw `<section style={{...}}>`. Novější používají `<Section id="..." title="...">`.
Doporučeno: nové stránky vždy přes `<Section>`, existující postupně migrovat.

---

## Doporučené pořadí refactoringu

| # | Úkol | Soubory | Dopad | Obtížnost |
|---|------|---------|-------|-----------|
| 1 | Sjednotit `brand-500` Tailwind s `accent` tokenem | `tailwind.config.js` | Vizuální konzistence | Triviální |
| 2 | Opravit TkajUI `Card.jsx` — nahradit donjon barvy TkajUI tokeny | `Card.jsx` | Správnost TkajUI | Malá |
| 3 | Vytvořit `src/lib/donjon/tokens.js` | 1 nový soubor | Základ pro vše níže | Nízká |
| 4 | Refaktorovat 6 donjon vlastních implementací na tokens.js | `DonjonButton`, `DonjonCard`, `DonjonModal`, `DonjonTabs`, `DonjonButtonGroup`, `DonjonPictogram` | DRY, single source of truth | Střední |
| 5 | Ornaments.jsx + CornerOrnament.jsx importují barvy z donjon/tokens.js | `Ornaments.jsx`, `CornerOrnament.jsx` | Odstraní hardcoded zlato | Triviální |
| 6 | Přesunout `@keyframes spin` do `index.css` | `Button.jsx`, `DonjonButton.jsx`, `index.css` | DOM leak fix | Triviální |
| 7 | Přidat chybějící tokeny do TkajUI `tokens.js` | `tokens.js`, `Button.jsx`, `Modal.jsx`, `ProgressBar.jsx`, `Slider.jsx` | Čistota TkajUI | Triviální |
| 8 | Sidebar importuje `LIBRARY_CFG` ze ShowcasePage | `Sidebar.jsx` | Odstraní duplikaci barev | Triviální |
| 9 | Napsat axe testy pro donjon vlastní implementace | nový `src/lib/donjon/__tests__/accessibility.test.jsx` | Přístupnost | Střední |
| 10 | TokensPage + FocusRingPage + ColorsPage importují tokeny | 3–5 stránek | Konzistence dokumentace | Malá |
| 11 | Sjednotit styling pattern v donjon komponentách | 6 vlastních komponent | Čistota kódu | Střední |
| 12 | Ornaments.jsx + CornerOrnament.jsx přesunout do `src/lib/donjon/` | + opravit importy | Správné umístění | Malá |
| 13 | Lazy loading v `App.jsx` | `App.jsx` | Bundle −60 % | Malá implementace |
| 14 | Migrovat `<section>` → `<Section>` ve starých stránkách | ~20 stránek | Čistota, anchor nav | Velký rozsah, malý dopad |

---

## Co je naopak v pořádku

| Oblast | Stav |
|--------|------|
| `src/lib/tkajui/tokens.js` | Existuje, strukturovaný, 12 komponent importuje ✓ |
| `src/utils/sizes.js` | Centralizované rozměry tlačítek, nikde neduplikované ✓ |
| `src/utils/octagon.js` | Centralizovaná geometrie, unit-testovaná ✓ |
| `ShowcasePage` architektura | `LibVariantContext`, `useLibVariant()`, `?lib=` URL param — solidní ✓ |
| `componentRegistry.js` + `componentMeta.js` | Dynamický glob + ruční metadata, čistá separace ✓ |
| `Sidebar` struktura | children deep-links, library ikony — dobře navržené ✓ |
| TkajUI testy | axe audit, ARIA checks, consistency, lifecycle, null-safety — solidní pokrytí ✓ |
| Donjon re-exporty | 8 z 13 donjon komponent jsou čisté re-exporty — žádná duplicita kódu ✓ |
| `DieFace.jsx` | dynamický `playerColor` prop místo hardcoded barvy hráče — správný vzor ✓ |
| `vite.config.js` | čistý, bez problémů ✓ |
| Build | žádné errory, jen chunk size warning (OK pro interní tool) ✓ |
