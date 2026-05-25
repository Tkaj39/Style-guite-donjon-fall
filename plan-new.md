# donjon-fall-ui — Plán vylepšení po upgradu na Vite 8

> Vygenerováno 2026-05-25 po upgradu Vite 5→8, plugin-react 4→6  
> Stack: React 19 · Vite 8.0.14 · plugin-react 6.0.2 · Tailwind CSS 4.3 · Vitest 4  
> Revidováno: odstraněny technické chyby z původní verze

---

## Priorita 1 — Okamžitá výhra (< 1 hodina)

### 1.1 `server.forwardConsole` — browser logy v terminálu

Vite 8 přináší novou funkci: browser `console.*` se přeposílají přímo do terminálu.  
Pro style guide s 80+ lazy routes = velký DX win — React warnings vidíš bez otevření DevTools.

```js
// vite.config.js
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    forwardConsole: true,   // ← přidat
  },
  test: { ... },
})
```

**Soubor:** `vite.config.js`  
**Odhad:** 5 minut

---

### 1.2 Rolldown compat check

Vite 8 přešel na **Rolldown** (Rust bundler) jako výchozí. Build je automaticky rychlejší bez konfigurace — ale ne všechny pluginy jsou kompatibilní.

**Ověřit:**
- ✅ `@tailwindcss/vite` — Rolldown kompatibilní (ověřeno buildem)
- ✅ `@vitejs/plugin-react` 6 — nativně navržen pro Rolldown + Oxc
- ⚠️ Pokud se kdykoli přidá další Vite plugin, ověřit kompatibilitu s Rolldownem před mergem

**Stav:** build prochází, žádná akce nutná — jen vědomost pro budoucí pluginy.  
**Odhad:** 0 minut (informace, ne úkol)

---

## Priorita 2 — Cleanup kódu (1–2 dny)

### 2.1 Inline `<style>` tagy — React 19 `precedence` nebo přesun do CSS

**Problém:** 90 výskytů `<style>` tagů uvnitř komponent vkládá `@keyframes` do DOM opakovaně.

**Dotčené soubory:**
- `src/lib/donjon/DonjonProgressBar.jsx` — `@keyframes donjonDmgFlash`
- `src/lib/donjon/NumericDisplay.jsx` — `@keyframes numDeltaFloat`
- `src/lib/donjon/DonjonToast.jsx` — `@keyframes donjonToastProgress`
- `src/lib/tkajui/Toast.jsx` — `@keyframes toastProgress`
- + 17 dalších souborů

**Dvě možná řešení:**

**A) React 19 `<style precedence>` — jednodušší, idiomatické**  
React 19 nativně hoistne `<style>` do `<head>` a deduplikuje podle `href`. Žádná migrace do CSS nutná:

```jsx
// V komponentě — React to vloží do <head> jen jednou:
<style href="donjon-dmg-flash" precedence="low">{`
  @keyframes donjonDmgFlash {
    0%   { opacity: 1; background: #E05C5C; }
    100% { opacity: 0; background: transparent; }
  }
`}</style>
```

**B) Přesun do `src/index.css` + Tailwind v4 `@theme`**  
Vhodné pokud animace sdílí více komponent nebo je chceš vystavit jako utility třídy:

```css
/* src/index.css */
@keyframes donjonDmgFlash {
  0%   { opacity: 1; background: #E05C5C; }
  100% { opacity: 0; background: transparent; }
}

@theme {
  --animate-dmg-flash: donjonDmgFlash 0.4s ease-out forwards;
}
```

```jsx
// V komponentě:
<div className="animate-[dmg-flash]" />
```

> **Doporučení:** Pro animace specifické pro jednu komponentu → varianta A. Pro sdílené animace (Toast, Progress) → varianta B.

**Odhad:** 4 hodiny

---

### 2.2 Extrakce sdílené logiky Toast + Tooltip

**Problém:** duplicitní kód mezi donjon a tkajui variantami.

| Duplicita | Soubory | Rozsah |
|---|---|---|
| `ToastProvider` / `useToast` / `ToastItem` | `DonjonToast.jsx` + `Toast.jsx` | ~200 řádků |
| `getPosition` / `Arrow` komponenta | `DonjonTooltip.jsx` + `Tooltip.jsx` | ~80 řádků |

**Řešení:** extrahovat do sdílených utilit:
- `src/utils/toastContext.js` — provider + hook, importovaný oběma variantami
- `src/utils/tooltipUtils.js` — `getPosition`, `Arrow`

> ⚠️ Refactor může odkrýt subtilní rozdíly v chování donjon vs tkajui variant. Spustit Vitest suite po každé extrakci.

**Odhad:** 3 hodiny

---

### 2.3 ErrorBoundary — nechat být nebo tiny wrapper

**Problém:** `src/styleguide/ErrorBoundary.jsx` je class component — jediný v celém projektu.

**Hodnocení:** React 19 stále nemá nativní function component Error Boundary. Class component zde **není bug ani tech debt** — funguje správně.

**Dvě možnosti:**

**A) Nechat být** ← doporučeno  
Funguje, netestuje se, nerozbíjí nic. Zbytečné přidávat external dep kvůli kosmetice.

**B) Tiny custom wrapper** (pokud vadí class component esteticky)

```jsx
// src/styleguide/ErrorBoundary.jsx — 25 řádků, žádný dep:
class ErrorBoundaryInner extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    return this.state.error
      ? this.props.fallback(this.state.error)
      : this.props.children
  }
}

export function ErrorBoundary({ fallback, children }) {
  return <ErrorBoundaryInner fallback={fallback}>{children}</ErrorBoundaryInner>
}
```

> ❌ Nepřidávat `react-error-boundary` jako dep — zbytečná závislost pro jeden use case.

**Odhad:** 30 minut (jen pokud se rozhodneš pro B)

---

## Priorita 3 — Nové funkce (2–4 dny)

### 3.1 React Compiler — automatická memoizace

plugin-react 6 exportuje `reactCompilerPreset` přímo — integruje se přes `babel` option na `react()`, Rolldown o to postará dál sám.

**Komponenty které nejvíce profitují** (re-renderují při každé změně rodiče):
- `NumericDisplay.jsx` — animované číslo
- `EventLog.jsx` — seznam eventů
- `PhaseIndicator.jsx` — fázový ukazatel
- `DonjonProgressBar.jsx` — HP/mana bar s flash animací

**Správná aktivace** (ověřeno ze zdrojáků plugin-react 6):

```bash
npm i -D babel-plugin-react-compiler
```

```js
// vite.config.js
import react, { reactCompilerPreset } from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: { presets: [reactCompilerPreset()] },  // ← správně, bez extra balíčku
    }),
  ],
})
```

> ⚠️ **Důležité varování pro UI knihovnu:** React Compiler mění memoizační chování komponent. Uživatelé knihovny si mohou nastavit vlastní memoizaci — Compiler ji může zduplikovat nebo přepsat. Před aktivací:
> 1. Spustit celý Vitest suite
> 2. Ručně ověřit re-render chování `DonjonProgressBar` a `NumericDisplay` (mají interní animační state)
> 3. Dokumentovat v CHANGELOG že verze používá Compiler

**Odhad:** 2 hodiny (aktivace + testování)

---

### 3.2 `useActionState` ve formulářích

**Problém:** formuláře v `InputsPage` a `ValidationPage` používají ruční `useState` + async handler — React 19 má `useActionState` přesně pro tento případ.

**Před:**
```jsx
const [state, setState] = useState({ error: null, ok: false })
async function handleSubmit() {
  const result = await saveProfile(formData)
  setState(result)
}
```

**Po:**
```jsx
// třetí prvek je isPending — automaticky true při probíhající akci
const [state, formAction, isPending] = useActionState(saveProfileAction, { error: null, ok: false })
```

**Dotčené soubory:**
- `src/pages/InputsPage.jsx` — `saveProfileAction` (řádek 62)
- `src/pages/ValidationPage.jsx`

**Odhad:** 2 hodiny

---

### 3.3 Nová komponenta: `DonjonNotificationCenter`

Nová herní komponenta kombinující funkce `EventLog` + `DonjonToast` + `GameTransition`.

**Popis:** Agregátor herních notifikací — panel který se vysouvá z rohu obrazovky, zobrazuje stream herních eventů s časovými razítky, barevně kóduje typy (gain/loss/event/warning) a automaticky archivuje starší záznamy.

**Využívá:**
- `GameTransition` — animace příchodu/odchodu notifikací
- `DonjonBadge` — typ eventu
- `useModalPageInert` — inertuje pozadí při rozbalení panelu

**Props API (návrh):**
```jsx
<DonjonNotificationCenter
  events={[{ id, text, type, timestamp }]}
  maxVisible={5}
  position="bottom-right"
  onClear={() => {}}
/>
```

**Odhad:** 6 hodin (implementace + showcase stránka)

---

## Priorita 4 — Sledovat (bez akce teď)

### 4.1 Full Bundle Mode (Vite 8 experimental)

Vite 8 přináší nový "Full Bundle Mode" (`experimental.bundledDev`) který nahrazuje dev server. Nahlášené zrychlení: 46s → 6s startup u velkých projektů.

Projekt má 80+ lazy routes — startup by se výrazně zrychlil.

**Stav:** experimentální, nestabilní API. Sledovat Vite release notes.  
**Akce:** přidat do tohoto plánu až bude stabilní (Vite 8.x+).

---

### 4.2 `use(Promise)` / Resource pattern

React 19 `use()` hook umožňuje async data fetching přímo v render funkci. Projekt zatím používá mock/synchronní data.

Relevantní až při napojení na reálné API (herní server, backend pro save/load).

---

## Přehled

| # | Úkol | Priorita | Odhad | Stav |
|---|---|---|---|---|
| 1.1 | `forwardConsole` do vite.config.js | Okamžitá | 5 min | ✅ done |
| 1.2 | Rolldown compat check | Okamžitá | 0 min | ✅ done |
| 2.1 | Inline `<style>` → React 19 precedence / index.css | Cleanup | 4 h | ✅ done |
| 2.2 | Extrakce Toast + Tooltip logiky | Cleanup | 3 h | ✅ done |
| 2.3 | ErrorBoundary — zvážit (nechat být doporučeno) | Cleanup | 30 min | ✅ skipped (class component ponechán) |
| 3.1 | React Compiler aktivace (+ varování pro lib) | Nová funkce | 2 h | ✅ done |
| 3.2 | `useActionState` ve formulářích | Nová funkce | 2 h | ✅ done (bylo hotové) |
| 3.3 | `DonjonNotificationCenter` komponenta | Nová funkce | 6 h | ✅ done |
| 4.1 | Full Bundle Mode | Sledovat | — | waiting |
| 4.2 | `use(Promise)` pattern | Sledovat | — | waiting |

**Celkový odhad aktivních úkolů:** ~17.5 hodiny
