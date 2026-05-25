# CLAUDE.md — donjon-fall-ui Style Guide

Tento soubor je automaticky načten Claudem při každé session. Obsahuje project-specific kontext, konvence a workflow pravidla.

---

## Stack

- **React 19** + **Vite 8** (Rolldown bundler) + **Tailwind CSS 4**
- **@vitejs/plugin-react 6** s aktivním React Compiler (`reactCompilerPreset`)
- **Vitest 4** pro testy, **react-router-dom 6** pro routing
- Node ≥ 22.12.0

```bash
npm run dev        # dev server (port 5173)
npm run build      # produkční build — vždy ověř po větší změně
npm run test:run   # Vitest jednorázově
npm run lint:lib   # ESLint pouze src/lib/
```

---

## Struktura projektu

```
src/
  lib/
    tkajui/       ← TkajUI — obecná UI knihovna (chladná modrá paleta)
    donjon/       ← donjon-fall-ui — herní UI (zlatá středověká paleta)
  pages/          ← showcase stránky (jedna per komponenta nebo téma)
  data/
    componentMeta.js    ← ruční metadata komponent (popis, props, relatedSlugs)
    componentRegistry.js ← auto-discovery z lib/ + merge s componentMeta
  utils/
    octagon.js    ← clip-path funkce: octagon(), hex(), scoopPath()...
    tooltipUtils.jsx    ← sdílený getPosition() + Arrow pro Tooltip/DonjonTooltip
    toastContext.jsx    ← sdílená createToastContext() factory pro Toast/DonjonToast
  hooks/
    useModalPageInert.js ← ref-counted inert pro #root při otevřeném modalu
  styleguide/
    ShowcasePage.jsx ← Layout, Section, Preview, CodeBlock, useLibVariant
  App.jsx         ← lazy imports + Routes
  index.css       ← Tailwind + @keyframes animace + dialog styles
```

---

## Dva oddělené design systémy

### TkajUI (`src/lib/tkajui/`)
- Chladná paleta: `surface0–4`, `accent=#6576ff`, `textHigh=#eeeef8`
- Import: `import { surface2, accent } from './tokens'`
- Tvar tlačítek: **oktagon** přes `octagon(cx)` z `../../utils/octagon`
- Placeholder barva: `textLow = '#4c4c68'`

### donjon-fall-ui (`src/lib/donjon/`)
- Teplá zlatá paleta: `bg0–4`, `gold=#FFC183`, `textHigh=#E8DDD0`
- Import: `import { gold, bg2, borderDefault } from './tokens'`
- Tvar tlačítek: **oktagon s větším cx** (donjon má cx=12 vs tkajui cx=8)
- DonjonBadge: **hex polygon** (ne oktagon) — vlastní `hex(i)` funkce inline
- Placeholder barva: `textLow = '#9A9080'`

> ⚠ Nikdy nemíchej tokeny mezi knihovnami. Každá má vlastní `tokens.js`.

---

## Klíčové tokeny — donjon (nejpoužívanější)

```js
// Zlato
gold = '#FFC183'     // primární akcent — text, ikony, aktivní prvky
goldMid = '#B8956A'  // labels, subtitles
goldDim = '#8F7458'  // borders, muted text

// Pozadí
bg0 = '#12102A'      // page background
bg2 = '#1E1C30'      // card background
bg3 = '#252340'      // elevated panel
bgDeep = '#1B1A30'   // hlavičky panelů

// Borders
borderDefault = '#353751'
borderMid     = '#2A2848'

// Text
textHigh = '#E8DDD0'   // hlavní text
textMid  = '#C8BFAF'   // labels
textLow  = '#9A9080'   // muted / hints
textFaint = '#4A4560'  // ultra-muted

// Herní barvy
gainColor    = '#50B86C'  // zelená — gain / zisk
dangerColor  = '#E05C5C'  // červená — loss / damage
warningColor = '#C08040'  // oranžová — varování
infoColor    = '#4A80E2'  // modrá — mana / info
magicColor   = '#9A60C8'  // fialová — magie / XP
```

---

## Pravidla kódování

### Barvy
- **Vždy importuj z `./tokens`** — nikdy hardcoded hex hodnoty v komponentách
- Výjimka: průhlednosti jako `${gold}30` nebo `${dangerColor}88` jsou OK inline

### Inline `<style>` tagy
- `@keyframes` patří do `src/index.css` — **ne do komponent**
- Placeholder barvy: použij `<style href="unique-id" precedence="low">{...}</style>` (React 19 deduplikace)
- Viz: `DonjonInput.jsx`, `Input.jsx` jako vzor

### Tvar komponent (clip-path)
- TkajUI: `octagon(cx)` z `../../utils/octagon` — cx=8 (md)
- Donjon: `octagon(cx)` s cx=10–14 podle velikosti, DonjonBadge má vlastní `hex()`
- Border trick: outer wrapper = border barva, inner wrapper = fill barva, `padding: bord`

### Animace
- Tokeny: `animFast=80ms`, `animNormal=160ms`, `animSlow=300ms`
- `GameTransition` pro mount/unmount animace — 6 presetů (fadeScale, slideUp, slideDown, pop, fade, slideLeft)
- `useGameAnimation` hook pro imperatívní Web Animations API

### Sdílené utility
- `getPosition()` + `Arrow` z `../../utils/tooltipUtils` — pro obě Tooltip varianty
- `createToastContext()` z `../../utils/toastContext` — pro obě Toast varianty
- `useModalPageInert(isOpen)` z `../../hooks/useModalPageInert` — při otevřených dialozích

---

## Přidání nové komponenty — checklist

Každá nová veřejná komponenta vyžaduje **4 změny**:

### 1. Soubor komponenty
```
src/lib/donjon/MojeKomponenta.jsx     ← pro donjon-fall-ui
src/lib/tkajui/MojeKomponenta.jsx     ← pro TkajUI
```
- Importuj barvy výhradně z `./tokens`
- Bez inline `@keyframes` — přidej do `src/index.css`
- JSDoc komentář s popisem props

### 2. Showcase stránka
```
src/pages/MojeKomponentaPage.jsx
```
- Používá `ShowcasePage`, `Section`, `Preview`, `CodeBlock` z `../styleguide/ShowcasePage`
- Každá sekce: interaktivní preview + kopírovatelný CodeBlock
- Pokud má obě varianty (tkajui + donjon): přidej do existující stránky se `useLibVariant()`

### 3. Route v App.jsx
```jsx
// Lazy import:
const MojeKomponentaPage = lazy(() => import('./pages/MojeKomponentaPage'))

// Route:
<Route path="moje-komponenta" element={<S><MojeKomponentaPage /></S>} />
```

### 4. componentMeta.js
```js
'moje-komponenta': {
  description: 'Popis co komponenta dělá a proč existuje.',
  subcategory: 'exclusive',        // nebo 'extends-tkajui'
  status: 'stable',                // nebo 'draft'
  showcaseRoute: '/moje-komponenta',
  props: [
    { name: 'value',    type: 'number',  required: true,  description: '...' },
    { name: 'onChange', type: 'function',required: true,  description: '...' },
    { name: 'size',     type: "'sm'|'md'|'lg'", required: false, default: "'md'", description: '...' },
  ],
  relatedSlugs: ['event-log', 'donjon-badge'],
},
```

> ✅ Vždy ověř: `npm run build` musí projít bez chyb po všech 4 změnách.

---

## componentMeta.js — slug konvence

- Slug = kebab-case z názvu souboru: `DonjonProgressBar.jsx` → `donjon-progress-bar`
- Slug generuje `componentRegistry.js` automaticky — v componentMeta musí klíč přesně odpovídat
- `status: 'stable'` = kompletní, `'draft'` = WIP, `'generated'` = jen auto-data

---

## ShowcasePage API

```jsx
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

export default function MojeStránka() {
  return (
    <ShowcasePage
      title="Název komponenty"
      description="Jednořádkový popis."
      componentSlugs={['moje-komponenta']}     // zobrazí metadata z componentMeta
      variants={[                               // volitelné — pro komponenty s tkajui+donjon variantou
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section id="zakladni" title="Základní použití" description="...">
        <Preview>...</Preview>
        <CodeBlock code={`<MojeKomponenta value={42} />`} />
      </Section>
    </ShowcasePage>
  )
}

// Čtení aktivní varianty (tkajui vs donjon) uvnitř stránky:
const lib = useLibVariant()  // 'tkajui' | 'donjon'
```

---

## Modaly a portaly

- Modaly renderují přes `createPortal(content, document.body)` — mimo `#root`
- Vždy volej `useModalPageInert(isOpen)` — inertuje `#root` při otevřeném dialogu
- Z-index hierarchie: tooltips=2100, toasts=2000, notification center=1800, modals=1500

---

## Časté chyby — vyhnout se

| Chyba | Správně |
|---|---|
| `import { gold } from '../donjon/tokens'` v tkajui komponentě | Každá lib má vlastní `./tokens` |
| `@keyframes` inline v `<style>` tagu | Do `src/index.css` |
| Hardcoded `#FFC183` v komponentě | `import { gold } from './tokens'` |
| `componentMeta` záznam bez `showcaseRoute` | Vždy přidej showcaseRoute |
| Nová komponenta bez Route v App.jsx | Viz checklist výše |
| `dangerText` v donjon komponentě | Token neexistuje, použij `dangerColor` |

---

## Testování

Testy jsou v `src/lib/tkajui/__tests__/` a `src/lib/donjon/__tests__/`.

```bash
npm run test:run          # všechny testy
npm run test:run -- Input # filtr podle názvu
```

Pokud přidáš novou komponentu s netriviální logikou (hooks, animace, state), přidej základní test do `__tests__/`.
