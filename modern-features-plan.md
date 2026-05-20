# Plán: využití nových funkcí React 19 a Tailwind CSS v4

Verze jsou upgradovány (React 19.2.6, Tailwind 4.3.0), kód ale zatím zůstal v předchozím stylu.
Tento dokument mapuje konkrétní příležitosti — co přesně změnit, proč, kde, a jaký dopad to má na testy.

---

## 1. Native `<dialog>` element — největší příležitost

### Problém

`Modal.jsx` a `DonjonModal.jsx` implementují ručně věci, které prohlížeč zvládne nativně:

```js
// Modal.jsx — aktuální stav (3 useEffect, querySelectorAll, document.addEventListener)
document.addEventListener('keydown', handle)           // ESC klávesa
querySelectorAll(focusableSelectors)?.[0]?.focus()     // focus trap
document.body.style.overflow = 'hidden'                // scroll lock
// + backdrop jako extra <div> s position: fixed
// + předchozí focus uložen do useRef a obnoven při zavření
```

Toto jsou přesně ty věci, které nativní `<dialog>` element řeší automaticky:
- ESC klávesa zavře dialog (bez event listeneru)
- Focus trap je součástí specifikace
- Backdrop přes `::backdrop` pseudo-element (čistý CSS)
- `dialog.showModal()` / `dialog.close()` řídí stav
- Scroll lock přes CSS `overflow: hidden` na `<dialog>`

React 19 správně podporuje `inert` jako boolean atribut (v Reactu 18 způsoboval warning).
`inert` na pozadí za modalem je silnější než focus trap — prohlížeč odstraní
prvky z tab order, accessibility tree i pointer eventů najednou.

### Jak to udělat

```jsx
// Po — Modal.jsx zjednodušený
import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, children, ... }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (isOpen) el.showModal()
    else el.close()
  }, [isOpen])

  return (
    <dialog
      ref={ref}
      onClose={onClose}                    // nativní ESC → onClose
      onClick={(e) => {                    // klik na backdrop
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      {children}
    </dialog>
  )
}
```

```css
/* index.css — backdrop přes CSS, bez extra <div> */
dialog::backdrop {
  background: rgba(6, 6, 12, 0.80);
  backdrop-filter: blur(2px);
}
```

### Co odpadne

| Teď | Po |
|-----|-----|
| 2× `useEffect` (ESC + scroll lock) | 0 |
| `document.addEventListener('keydown', ...)` | 0 |
| `querySelectorAll(focusableSelectors)` | 0 |
| `previousFocusRef` + `.focus()` | 0 |
| `document.body.style.overflow = 'hidden'` | 0 |
| backdrop jako `<div style={{ position: fixed }}>` | 0 |
| `role="dialog"` + `aria-modal="true"` | 0 (nativní) |

### Dopad na testy

**Změna DOM struktury.** Existující testy v `modal.test.jsx` hledají
`role="dialog"` — `<dialog>` element ho má implicitně, takže dotazy přes
`getByRole('dialog')` projdou. Ale testy hledající konkrétní `<div>` struktura
(pokud existují) je třeba aktualizovat.

**`dialog.showModal()` v jsdom** — testovací prostředí (jsdom) nepodporuje
`showModal()` nativně. Je třeba přidat mock:

```js
// src/test/setup.js — přidat
HTMLDialogElement.prototype.showModal = vi.fn(function() { this.open = true })
HTMLDialogElement.prototype.close    = vi.fn(function() { this.open = false })
```

**Scope:** `Modal.jsx`, `DonjonModal.jsx`, `src/test/setup.js`, `modal.test.jsx`.

---

## 2. React 19 — `useFormStatus` a `useActionState`

### 2.1 `SubmitButton` s `useFormStatus`

**Problém:** `Button` přijímá `loading={boolean}` prop, který musí předávat rodič ručně.
Při použití v HTML formuláři (`<form action={asyncFn}>`) tlačítko neví, že probíhá submit.

**Co React 19 nabízí:** `useFormStatus()` vrací `{ pending }` — funguje uvnitř
libovolného potomka `<form>`. Nevyžaduje žádný prop drilling.

```jsx
// src/lib/tkajui/SubmitButton.jsx — nová komponenta (10 řádků)
import { useFormStatus } from 'react-dom'
import Button from './Button'

export default function SubmitButton({ children, ...props }) {
  const { pending } = useFormStatus()
  return <Button loading={pending} type="submit" {...props}>{children}</Button>
}
```

**Dopad na testy:** nová komponenta → nový test soubor. `Button.jsx` se nemění.
Zpětná kompatibilita zachována — `loading` prop zůstane na `Button`.

**Scope:** nový `src/lib/tkajui/SubmitButton.jsx`, nový `SubmitButton.test.jsx`,
export přidat do `src/lib/tkajui/index.js`. Donjon varianta: `DonjonSubmitButton`
jako re-export s `DonjonButton`.

---

### 2.2 `useActionState` — FormField wrapper

**Problém:** Formuláře s `Input` vyžadují ručně řídit loading stav, error stav
a submit logiku v rodičovské komponentě — typicky 3–5 useState hookù.

**Co React 19 nabízí:** `useActionState(action, initialState)` vrací
`[state, dispatch, isPending]`. Akce je async funkce, stav se aktualizuje po jejím dokončení.

```jsx
// Příklad použití (ne implementace komponenty)
const [state, action, isPending] = useActionState(async (prev, formData) => {
  try {
    await api.save(formData.get('username'))
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}, null)

return (
  <form action={action}>
    <Input name="username" error={state?.error} />
    <SubmitButton>Uložit</SubmitButton>   {/* automaticky loading při isPending */}
  </form>
)
```

**Pozor — toto není breaking change na `Input`:** `Input.jsx` se nemění vůbec.
`useActionState` žije v rodičovské komponentě nebo ve `FormField` wrapperu.
`error` prop na `Input` zůstane stejný — jen teď přichází ze `state.error`.

**Dopad na testy:** žádný — `Input.jsx` se nemění.

**Scope:** Dokumentace/příklad na InputsPage. Volitelně nový `FormField` wrapper.
Nízká priorita — relevantní až při napojení na reálnou aplikaci.

---

## 3. Tailwind CSS v4

### 3.1 CSS custom properties pro velikostní systém

**Problém:** Komponenty (`Button`, `Input`) mají dynamické velikosti z `sizes.js`
(`s.h`, `s.px`, `s.cx`, `s.fontSize`). Tyto hodnoty jdou do inline stylů, protože
Tailwind arbitrary values nelze skládat za běhu.

**Aktuální vzor (Button.jsx):**
```jsx
<button style={{
  height: s.h,
  padding: `0 ${s.px}px`,
  clipPath: octagon(s.cx),
  fontSize: s.fontSize,
}}>
```

**Lepší vzor pro Tailwind v4 — CSS custom properties:**

```jsx
// Button.jsx — dynamické hodnoty jako CSS proměnné, zbytek Tailwind třídy
<button
  style={{
    '--btn-h':    `${s.h}px`,
    '--btn-px':   `${s.px}px`,
    '--btn-clip': octagon(s.cx),
    '--btn-fs':   s.fontSize,
  }}
  className="h-[var(--btn-h)] px-[var(--btn-px)] [clip-path:var(--btn-clip)]
             text-[length:var(--btn-fs)] inline-flex items-center justify-center
             cursor-pointer select-none transition-[filter] duration-150
             hover:brightness-110 active:brightness-90 disabled:opacity-40"
>
```

**Výhody:** statické utility (flex, cursor, transition…) jsou v Tailwindu a lze je
přepsat className propem. Dynamické hodnoty jsou stále CSS proměnné (ne hardcoded).
Tailwind v4 generuje `var()` varianty automaticky pro arbitrary values.

**Dopad na testy:** testy testují DOM a chování, ne CSS — projdou beze změny.
Vizuální výsledek je identický.

**Scope:** `Button.jsx`, `Input.jsx`, `DonjonButton.jsx`. Ostatní komponenty postupně.

---

### 3.2 `@starting-style` — entry animace bez `<style>` tagů v JSX

**Problém:** `Modal.jsx`, `Toast.jsx`, `Select.jsx` injektují `@keyframes` přes
`<style>` tag přímo do JSX:

```jsx
// Modal.jsx řádek 265 — ošklivé
<style>{`
  @keyframes modalBackdropIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes modalPanelIn    { from { opacity: 0; transform: translateY(-8px) } to {...} }
`}</style>
```

**Co Tailwind v4 nabízí:** `@starting-style` je nativní CSS at-rule pro počáteční
stav `transition` — žádné keyframes, žádný JavaScript, žádné `<style>` tagy.

```css
/* index.css */
.modal-backdrop {
  transition: opacity 150ms ease;
  opacity: 1;
  @starting-style { opacity: 0; }
}

.modal-panel {
  transition: opacity 180ms ease, transform 180ms ease;
  opacity: 1;
  transform: translateY(0);
  @starting-style { opacity: 0; transform: translateY(-8px); }
}
```

**⚠ Browser support — realistické hodnocení:**

| Prohlížeč | Podpora od |
|-----------|-----------|
| Chrome | 117 (srpen 2023) |
| Firefox | 129 (srpen 2024) |
| Safari | 17.5 (květen 2024) |

Aktuální implementace (`@keyframes` v `<style>`) funguje všude.
`@starting-style` má degradaci — animace se na starším prohlížeči přeskočí,
UI zůstane funkční. **Přístup: progressive enhancement** — přidat `@starting-style`
ale keyframes zatím nevyhazovat. Po roce (2026) zvážit úplné odstranění.

**Dopad na testy:** pokud se odstraní `<style>` tag, testy co hledají
`<style>` element v DOM (pokud existují) je třeba aktualizovat.

**Scope:** `Modal.jsx`, `Toast.jsx`, `Select.jsx`, `index.css`.

---

### 3.3 `text-shadow-*` — donjon display texty

**Co Tailwind v4 nabízí:** `text-shadow-sm/md/lg` a arbitrary `text-shadow-[...]`.

**Kde použít:**
```jsx
// MenuPage.jsx, LoadingAppPage.jsx — herní nadpis
<h1 className="text-shadow-[0_0_32px_#FFC18355]">DONJON FALL</h1>

// VictoryPoints, herní oznámení
<span className="text-shadow-[0_0_16px_#FFC18388]">{vp} VP</span>
```

**Dopad na testy:** žádný — čistě additivní.
**Browser support:** Chrome 120+, Firefox 128+, Safari 17+ — degrades gracefully (text bez stínu).

---

### 3.4 `field-sizing-content` — auto-resize textarea

**Co Tailwind v4 nabízí:** `field-sizing-content` — textarea roste s obsahem bez JS.

```jsx
// Input.jsx — přidat prop multiline
{multiline
  ? <textarea className="field-sizing-content resize-none ..." />
  : <input ... />
}
```

**Browser support:** Chrome 123+, Firefox 129+. Safari zatím nepodporuje — fallback
na pevnou výšku. **Progressive enhancement** — na nepodporovaných prohlížečích
textarea prostě neroste.

**Dopad na testy:** nová větev v `Input.jsx`, nový test pro multiline chování.
Existující testy pro `<input>` projdou beze změny.

---

### 3.5 `inert` atribut — pozadí za modalem

React 18 ignoroval `inert` (způsoboval warning). **React 19 ho správně podporuje.**

```jsx
// App.jsx nebo layout wrapper
<main inert={modalIsOpen || undefined}>
  {/* celý herní UI */}
</main>
<Modal isOpen={modalIsOpen} ... />
```

`inert` odstraní obsah z tab order, accessibility tree i pointer eventů — silnější
než `pointer-events-none` nebo `aria-hidden`. Zvlášť důležité pro screen readery.

**Dopad na testy:** přidat test, že `<main>` má atribut `inert` při otevřeném modalu.

---

## 4. Inline styly → CSS proměnné (architektura)

Migrace není binární volba „inline styl vs. Tailwind třída". Správná architektura
pro komponenty s dynamickými hodnotami v Tailwind v4:

```
┌──────────────────────────────────────────────────────────┐
│  Dynamická hodnota z prop (size, variant)                │
│  → CSS custom property přes style={{ '--var': value }}   │
│                                                          │
│  Statická utility (flex, cursor, transition)             │
│  → Tailwind třída v className                            │
│                                                          │
│  Barva z JS tokenu (pro SVG, kde className nefunguje)    │
│  → inline style={{ color: token }} ZŮSTANE              │
└──────────────────────────────────────────────────────────┘
```

### Co MUSÍ zůstat inline

| Použití | Důvod |
|---------|-------|
| SVG atributy `stroke`, `fill` | Tailwind třídy na SVG atributy nefungují |
| `clipPath: octagon(cx)` | Vypočítaná hodnota — přes `--clip` CSS var (viz 3.1) |
| Donjon gradienty (vícebarvové) | Arbitrary values nepodporují více tokenů |

### Co jde migrovat na Tailwind třídy

| Inline styl | Tailwind třída |
|---|---|
| `display: 'flex'` | `flex` |
| `alignItems: 'center'` | `items-center` |
| `gap: 8` | `gap-2` |
| `position: 'relative'` | `relative` |
| `flexShrink: 0` | `shrink-0` |
| `overflow: 'hidden'` | `overflow-hidden` |
| `userSelect: 'none'` | `select-none` |
| `cursor: 'pointer'` | `cursor-pointer` |
| `lineHeight: 1` | `leading-none` |
| `width: '100%'` | `w-full` |

**Strategie:** nemigrovat vše najednou. Při každé úpravě komponenty projít
inline styly a přesunout statické hodnoty do className.

---

## 5. Dopad na testy — souhrn

| Změna | Typ dopadu | Co upravit |
|-------|-----------|------------|
| `<dialog>` v Modal | **DOM struktura** | Přidat `showModal`/`close` mock do `setup.js`, zkontrolovat selektory v `modal.test.jsx` |
| `inert` atribut | **Nový test** | Přidat assertion že `inert` je na pozadí |
| `SubmitButton` | **Nová komponenta** | Nový `submitButton.test.jsx` |
| CSS var v Button | **Žádný** | Testy testují DOM, ne CSS |
| `@starting-style` | **Žádný** | Testy testují DOM, ne CSS |
| `field-sizing` textarea | **Nová větev** | Rozšířit `input.test.jsx` |

---

## 6. Pořadí implementace

| # | Úkol | Priorita | Složitost | Dopad |
|---|------|----------|-----------|-------|
| 1 | `<dialog>` v Modal + DonjonModal + `setup.js` mock | 🔴 Vysoká | střední | -2 useEffect, -30 řádků, lepší a11y |
| 2 | `inert` atribut na pozadí | 🔴 Vysoká | nízká | silnější focus management |
| 3 | `text-shadow-*` na herní nadpisy | 🔴 Vysoká | nízká | čistě additivní, hned viditelné |
| 4 | `SubmitButton` s `useFormStatus` | 🟡 Střední | nízká | nová komponenta, bez breaking change |
| 5 | CSS var architektura v `Button.jsx` | 🟡 Střední | střední | základ pro ostatní komponenty |
| 6 | `@starting-style` progressive enhancement | 🟡 Střední | střední | odstranění `<style>` tagů, browser risk |
| 7 | `field-sizing-content` multiline Input | 🟡 Střední | nízká | nová funkce |
| 8 | CSS var architektura v `Input.jsx` | 🟢 Nízká | střední | průběžně |
| 9 | `useActionState` FormField příklad | 🟢 Nízká | vysoká | závisí na game state architektuře |

---

## 7. Co zachovat beze změny

- **JS tokeny (`tokens.js`)** — CSS proměnné z `@theme` je doplňují, nenahrazují.
  Tokeny zůstanou pro SVG atributy a JS logiku (podmíněné barvy).
- **`octagon()` utility** — clip-path nelze vyjádřit bez JS výpočtu.
- **Herní `@keyframes` v `index.css`** — die-shake, formation-push, focal-activate
  jsou příliš komplexní na `@starting-style`. Zůstanou jako keyframes navždy.
- **`createPortal` v Toast** — Toast se renderuje do `document.body`, portal zůstane.
  `<dialog>` pro Toast nemá smysl (není to blokující dialog).
