# Plán testování — TkajUI (přehled)

## Stack

| Nástroj | Verze | Účel |
|---------|-------|------|
| **Vitest** | ^1.x | test runner — přirozený fit pro Vite |
| **@testing-library/react** | ^14.x | render komponent, DOM queries |
| **@testing-library/user-event** | ^14.x | simulace klikání, psaní, klávesnice |
| **@testing-library/jest-dom** | ^6.x | DOM matchers |
| **jsdom** | — | simulace prohlížeče |
| **jest-axe** | ^8.x | accessibility audit (funguje s Vitest i přes název) |

```bash
npm install -D vitest @vitest/ui jsdom \
  @testing-library/react @testing-library/user-event @testing-library/jest-dom \
  jest-axe
```

---

## Konfigurace

**`vite.config.js`:**
```js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
  },
})
```

**`src/test/setup.js`:**
```js
import '@testing-library/jest-dom'
```

**`package.json`:**
```json
"test":     "vitest",
"test:ui":  "vitest --ui",
"test:run": "vitest run"
```

---

## Fáze a soubory

| Soubor | Obsah | Čas |
|--------|-------|-----|
| [plan-test-phase1.md](./plan-test-phase1.md) | Setup + utility testy (`octagon.js`) | ~75 min |
| [plan-test-phase2.md](./plan-test-phase2.md) | Jednoduché komponenty — Pictogram, ProgressBar, ScoopClip, CornerOrnament | ~95 min |
| [plan-test-phase3.md](./plan-test-phase3.md) | Interaktivní komponenty — Toggle, Slider, Select, Tabs, ButtonGroup | ~185 min |
| [plan-test-phase4.md](./plan-test-phase4.md) | Komplexní/portálové — Modal, Toast, Tooltip | ~155 min |
| [plan-test-phase5.md](./plan-test-phase5.md) | Průřezové — barrel, konzistence, null safety, lifecycle, a11y | ~255 min |

**Celkem: ~11 hodin**

---

## Adresářová struktura testů

```
src/
  utils/
    octagon.test.js
  lib/
    tkajui/
      __tests__/
        Pictogram.test.jsx
        ProgressBar.test.jsx
        ScoopClip.test.jsx
        CornerOrnament.test.jsx
        Toggle.test.jsx
        Slider.test.jsx
        Select.test.jsx
        Tabs.test.jsx
        ButtonGroup.test.jsx
        Modal.test.jsx
        Toast.test.jsx
        Tooltip.test.jsx
        barrel.test.js
        consistency.test.jsx
        nullsafety.test.jsx
        lifecycle.test.jsx
        accessibility.test.jsx
  test/
    setup.js
    helpers.jsx
```

---

## Pomocné utility

```jsx
// src/test/helpers.jsx
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

export function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

export const MockIcon = ({ width, height, ...props }) => (
  <svg data-testid="mock-icon" width={width} height={height} {...props} />
)

// Portal helper — ověří že element je v document.body, ne v parent divu
export function isInPortal(element) {
  return document.body.contains(element) &&
    !document.getElementById('root')?.contains(element)
}

// axe helper — viz jest-axe dokumentace
// import { axe, toHaveNoViolations } from 'jest-axe'
// expect.extend(toHaveNoViolations)
// expect(await axe(container)).toHaveNoViolations()
```

---

## Co netestovat

- **Vizuální vzhled** — barvy, font-size — ověřuje style guide v prohlížeči
- **CSS animace** — jsdom je nepodporuje
- **Pozicování prvků** — Tooltip placement, Modal center — jsdom nemá layout engine
- **Vizuální srovnání velikostí** — jsdom nepočítá CSS; `getComputedStyle` vrátí prázdné hodnoty
- **Pevné px hodnoty props** — křehké; změna čísel = spadlý test i když komponenta funguje
- **Kontrast barev** — axe s jsdom to nekontroluje spolehlivě
- **Barvy přes CSS třídy** — jen inline `style.color/background` je v jsdom čitelné
- **Ornaments (SideOrnament, HexOrnament)** — čistě dekorativní SVG bez logiky
- **Showcase stránky** — PictogramsPage, ShapesPage… — dokumentace, ne logika
