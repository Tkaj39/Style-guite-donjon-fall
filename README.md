# donjon-fall-ui — Style Guide & Game UI Library

Interaktivní style guide a herní UI knihovna pro **Donjon Fall** — tahovou hex strategii.

---

## Rychlý start

```bash
git clone <repo>
npm install
npm run dev        # http://localhost:5173
```

---

## Struktura knihoven

Pod `src/lib/` žijí dvě oddělené knihovny:

| Knihovna | Cesta | Popis |
|----------|-------|-------|
| **TkajUI** | `src/lib/tkajui/` | Generické UI primitivy — chladná paleta, modrý akcent |
| **donjon-fall-ui** | `src/lib/donjon/` | Herní komponenty — zlatá paleta, středověká estetika |

Pravidlo: **TkajUI** pro formuláře a infrastrukturu, **donjon-fall-ui** pro vše herní.

---

## Import komponent

```jsx
// ── donjon-fall-ui (barrel) ─────────────────────────────────────────────
import {
  DonjonButton, DonjonCard, DonjonInput,
  DonjonProgressBar, DonjonSlider, DonjonToggle,
  DonjonSelect, DonjonTooltip,
  DonjonToastProvider, useDonjonToast,
  HexTile, DieFace, FloatFeedback,
} from './src/lib/donjon'

// ── Přímý import (tree-shaking, type hints) ─────────────────────────────
import DonjonButton  from './src/lib/donjon/DonjonButton'
import HexTile       from './src/lib/donjon/HexTile'
import FloatFeedback from './src/lib/donjon/FloatFeedback'

// ── TkajUI (generické) ───────────────────────────────────────────────────
import { Modal, Tabs } from './src/lib/tkajui'
```

---

## Design tokeny

### JS (v komponentách)

```js
import { gold, goldDim, bg0, bg2, borderDefault, textHigh } from './src/lib/donjon/tokens'

const style = {
  background: bg2,
  border: `1px solid ${goldDim}`,
  color: gold,
}
```

### CSS custom properties

```css
/* Přidej do svého CSS souboru nebo index.css */
@import './src/lib/donjon/donjon.css';

.my-element {
  color: var(--donjon-gold);
  background: var(--donjon-bg2);
  border: 1px solid var(--donjon-border-default);
}
```

> Výhodné pro CSS animace, SVG fill, pseudo-elementy — kdekoliv, kde nelze importovat JS.

Dostupné CSS proměnné:

```
Zlato:    --donjon-gold  --donjon-gold-mid  --donjon-gold-dim
Pozadí:   --donjon-bg0  --donjon-bg1  --donjon-bg2  --donjon-bg3  --donjon-bg4  --donjon-bg-deep
Borders:  --donjon-border-subtle  --donjon-border-default  --donjon-border-mid
Text:     --donjon-text-high  --donjon-text-mid  --donjon-text-active
          --donjon-text-low  --donjon-text-faint  --donjon-text-cool  --donjon-text-parchment
Semantic: --donjon-success  --donjon-danger  --donjon-warning  --donjon-fail  --donjon-gain
```

---

## Klíčové komponenty — tahák

### HexTile

```jsx
<HexTile state="empty" size="md" />
<HexTile state="focal-active" playerColor="#4A90E2" />
<HexTile state="selected" />
// states: 'empty' | 'base' | 'focal-active' | 'focal-passive' | 'selected' | 'move' | 'attack'
```

### FloatFeedback

```jsx
// Parent MUSÍ mít position: relative
<div style={{ position: 'relative' }}>
  <HexTile />
  <FloatFeedback text="+1 VP" variant="vp" visible={visible} animKey={key} onDone={() => setVisible(false)} />
</div>
// variants: 'gain' | 'loss' | 'vp' | 'neutral'
```

### DonjonProgressBar (HP bar)

```jsx
<DonjonProgressBar value={72} max={100} label="HP" ticks={10} />
<DonjonProgressBar value={23} max={100} variant="hp" showValue />
// Automatické barevné prahy: >50% zelená, 25–50% zlatá, <25% červená
```

### DonjonButton

```jsx
<DonjonButton>Nová hra</DonjonButton>
<DonjonButton variant="danger" size="sm">Vzdát se</DonjonButton>
```

### DonjonCard

```jsx
<DonjonCard title="Výběr akce" variant="default">
  obsah karty
</DonjonCard>
```

### CornerOrnament (dekorativní rohy)

```jsx
// Vždy v position: relative containeru
<CornerOrnament size={14} color={goldDim} style={{ position: 'absolute', top: 6, left: 6 }} />
<CornerOrnament size={14} color={goldDim} style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />
<CornerOrnament size={14} color={goldDim} style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
<CornerOrnament size={14} color={goldDim} style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />
```

---

## Style Guide — navigace

| Sekce | URL | Obsah |
|-------|-----|-------|
| Foundations | `/colors`, `/typography`, `/tokens` | Barvy, písmo, tokeny |
| Principy | `/motion`, `/interaction-states` | Animace, stavy |
| Components | `/buttons`, `/inputs`, `/cards` | UI komponenty |
| Game UI | `/turn`, `/hud`, `/dialogs` | Herní obrazovky |
| Game Assets | `/hexagon`, `/dice`, `/map`, `/float-feedback` | Herní assety |
| Snippety | `/snippets` | Copy-paste vzory |
| Obrazovky | `/menu`, `/settings`, `/loading-app` | App obrazovky |

---

## Tech stack

- **React 19** + Vite
- **Tailwind CSS v4**
- Vitest pro testy (`npm test`)
- Žádné externí UI frameworky — vlastní komponenty

---

## Přidání nové komponenty

1. Vytvoř `src/lib/donjon/MojeKomponenta.jsx`
2. Exportuj z `src/lib/donjon/index.js`
3. Přidej do `src/data/componentRegistry.js`
4. Vytvoř showcase stránku `src/pages/MojeKomponentaPage.jsx`
5. Přidej route do `src/App.jsx` + odkaz do `src/styleguide/Sidebar.jsx`
