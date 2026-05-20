# Plán: využití nových funkcí React 19 a Tailwind CSS v4

Tento dokument popisuje konkrétní příležitosti k využití nových schopností obou upgradovaných závislostí
v knihovnách TkajUI a donjon-fall-ui. Verze jsou upgradovány, kód ale zatím zůstal v předchozím stylu.

---

## 1. React 19

### 1.1 `useActionState` — formuláře v Input

**Problém:** `Input.jsx` spravuje focus stav přes `useState` + `onFocus`/`onBlur` handlery.
Při použití v reálném formuláři musí rodičovská komponenta obsluhovat submit, loading stav
a chybový stav zvlášť.

**Co React 19 nabízí:** `useActionState(action, initialState)` — hook, který propojí
akci formuláře (async funkci) s lokálním stavem komponenty. Vrací `[state, dispatch, isPending]`.

**Kde použít:** nová varianta `Input` nebo wrapper `FormField`, který přijme `action` prop
a interně použije `useActionState`. Tlačítko submit v tomtéž formuláři pak může číst
`isPending` přes `useFormStatus` (viz níže).

```jsx
// Před (React 18 styl — vše v rodiči)
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
async function handleSubmit(e) {
  e.preventDefault()
  setLoading(true)
  try { await api.save(value) } catch (e) { setError(e.message) }
  setLoading(false)
}

// Po (React 19)
const [state, action, isPending] = useActionState(async (prev, formData) => {
  try { await api.save(formData.get('value')); return { ok: true } }
  catch (e) { return { ok: false, error: e.message } }
}, null)
// <form action={action}> — žádný onSubmit handler
```

**Dopad:** TkajUI `Input` + nová `FormField` obalová komponenta.
Donjon varianta `DonjonInput` zdědí automaticky.

---

### 1.2 `useFormStatus` — loading stav tlačítka

**Problém:** `Button` a `DonjonButton` mají prop `loading={boolean}`, který musí
předávat rodičovská komponenta ručně — tj. stav je duplicitní (jednou v rodiči, jednou v tlačítku).

**Co React 19 nabízí:** `useFormStatus()` vrací `{ pending, data, method, action }`.
Tlačítko samo pozná, zda probíhá submit formuláře, bez externího prop.

```jsx
// Po (React 19) — interní Spinner se zapne sám při submit
import { useFormStatus } from 'react-dom'

function SubmitButton({ children, ...props }) {
  const { pending } = useFormStatus()
  return <Button loading={pending} {...props}>{children}</Button>
}
```

**Dopad:** nová `SubmitButton` komponenta (tenký wrapper nad `Button`).
Nevyžaduje změnu `Button.jsx` — zachovává zpětnou kompatibilitu.

---

### 1.3 `useOptimistic` — okamžitá zpětná vazba

**Kde použít:** `FloatFeedback` nebo herní log — při akci (přehazování kostky, pohyb)
zobrazit výsledek okamžitě a pak potvrdit ze serveru/store.

**Poznámka:** Tato featura je relevantní až při napojení na skutečný game state.
Pro čistý style guide je to zatím nízká priorita.

---

## 2. Tailwind CSS v4

### 2.1 `@starting-style` — entry animace bez `<style>` tagů v JSX

**Problém:** `Modal.jsx`, `DonjonModal.jsx`, `Toast.jsx`, `Select.jsx` injektují
`@keyframes` přímo do JSX přes `<style>` tag uvnitř komponenty:

```jsx
// Teď (Modal.jsx řádek 265) — ošklivé, ale funkční
<style>{`
  @keyframes modalBackdropIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes modalPanelIn    { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: translateY(0) } }
`}</style>
```

**Co Tailwind v4 nabízí:** `@starting-style` je nativní CSS pravidlo, které definuje
počáteční stav pro `transition` — bez JavaScriptu, bez keyframes, bez `<style>` tagů.

```css
/* index.css */
.modal-panel {
  transition: opacity 150ms, transform 150ms;
  @starting-style {
    opacity: 0;
    transform: translateY(-8px);
  }
}
```

```jsx
// Modal.jsx — žádný <style> tag, žádné @keyframes
<div className="modal-panel opacity-100 translate-y-0">...</div>
```

**Dopad:** `Modal`, `DonjonModal`, `Toast`, `Select` — odstranění inline `<style>` tagů,
přesun animací do `index.css`. Kód komponent se zjednoduší.

**Poznámka:** `@starting-style` funguje v moderních prohlížečích (Chrome 117+, Firefox 129+, Safari 17.5+).
Pro starší prohlížeče fallback — prvek prostě přeskočí animaci, UI zůstane funkční.

---

### 2.2 3D transform utility — DieFace reroll animace

**Problém:** Animace přehazování kostky (`die-reroll-spin`) je definovaná v `index.css`
přes `@keyframes` s `rotateY()`. Nelze ji řídit z Tailwindu.

```css
/* index.css — teď */
@keyframes die-reroll-spin {
  0%   { transform: rotateY(0deg);   }
  40%  { transform: rotateY(90deg);  }
  60%  { transform: rotateY(90deg);  }
  100% { transform: rotateY(360deg); }
}
```

**Co Tailwind v4 nabízí:** nové utility `rotate-x-*`, `rotate-y-*`, `rotate-z-*`
a `perspective-*` — 3D transformace jako běžné třídy.

```jsx
// Po — animate-* + vlastní keyframes v @theme
// nebo kombinace Tailwind tříd pro statické 3D stavy
<div className="rotate-y-90 transition-transform duration-300">...</div>
```

**Dopad:** `DieFace.jsx` — přechod na Tailwind třídy pro 3D stavy. `@keyframes die-reroll-spin`
zůstane v `index.css`, ale nové varianty animace půjdou psát bez přidávání keyframes.

---

### 2.3 `text-shadow-*` — donjon display typografie

**Problém:** Donjon herní texty (název hry, výsledky) nemají žádný text-shadow efekt,
i když by typograficky dávaly smysl (zlatý glow, atmosférický efekt).

**Co Tailwind v4 nabízí:** `text-shadow-sm`, `text-shadow-md`, `text-shadow-lg`
a arbitrary values `text-shadow-[0_0_20px_#FFC183]`.

```jsx
// V MenuPage nebo herním nadpisu
<h1 className="text-shadow-[0_0_24px_#FFC18366]">DONJON FALL</h1>
```

**Dopad:** `MenuPage`, `LoadingAppPage`, herní typografické prvky. Čistě additivní — nic se nerozbije.

---

### 2.4 CSS proměnné z `@theme` v komponentách

**Problém:** Komponenty importují barvy z JS tokenů (`import { accent } from './tokens'`)
a předávají je jako inline `style={{ color: accent }}`. Tailwind v4 publikuje všechny
`@theme` hodnoty jako CSS custom properties — jsou dostupné přímo v CSS.

```css
/* Tailwind v4 automaticky generuje: */
:root {
  --color-brand-500: #6576ff;
  --color-brand-600: #4455ee;
  /* ... */
}
```

**Příležitost:** Tam kde komponenta používá statickou barvu z brand palety (ne dynamickou
z JS tokenů), lze nahradit inline styl Tailwind třídou nebo CSS proměnnou:

```jsx
// Teď
<span style={{ color: accent }}>text</span>  // accent = '#6576ff'

// Po — přes Tailwind třídu (pokud barva není dynamická)
<span className="text-brand-500">text</span>

// Po — přes CSS proměnnou (pokud potřebujeme inline styl ale bez JS importu)
<span style={{ color: 'var(--color-brand-500)' }}>text</span>
```

**Kde to nelze aplikovat:** clip-path hodnoty (dynamicky počítané z props `cx`),
donjon gradienty (složené z více tokenů), barvy závislé na variantě prop.

**Dopad:** Postupná migrace statických barev v `Button`, `Input`, `Badge`, `Card`.
Dynamické hodnoty zůstanou jako inline styly.

---

### 2.5 `field-sizing: content` — auto-resize textarea

**Co Tailwind v4 nabízí:** `field-sizing-content` — textarea se automaticky zvětší
podle obsahu bez JavaScriptu.

```jsx
<textarea className="field-sizing-content" />
```

**Dopad:** `Input.jsx` — přidat volitelný prop `multiline`, který přepne na `<textarea>`
s `field-sizing-content`. Bez JS resize logiky.

---

## 3. Inline styly → Tailwind migrace (postupná)

Komponenty jsou z ~90 % psané přes `style={{}}`. Část z toho je oprávněná
(dynamické hodnoty nelze napsat jako Tailwind třídy), část by šla migrovat.

### Co MUSÍ zůstat jako inline styl

| Příklad | Důvod |
|---------|-------|
| `clipPath: octagon(s.cx)` | Hodnota se počítá dynamicky z prop `size` |
| `background: v.bg` kde `v` závisí na `variant` prop | Dynamická hodnota za běhu |
| `height: s.h` kde `s` závisí na `size` prop | Dynamická hodnota za běhu |
| `animation: 'float-feedback 700ms'` | Keyframe z `index.css`, runtime string |

### Co by šlo migrovat na Tailwind třídy

| Teď (inline) | Po (Tailwind) |
|---|---|
| `display: 'flex', alignItems: 'center', gap: 8` | `flex items-center gap-2` |
| `position: 'relative'` | `relative` |
| `flexShrink: 0` | `shrink-0` |
| `lineHeight: 1` | `leading-none` |
| `userSelect: 'none'` | `select-none` |
| `overflow: 'hidden'` | `overflow-hidden` |
| `width: '100%'` | `w-full` |
| `cursor: 'pointer'` | `cursor-pointer` |

**Přístup:** Nemigrovat vše najednou. Při každé úpravě komponenty projít inline styly
a statické hodnoty převést na Tailwind třídy.

---

## 4. Doporučené pořadí implementace

| Priorita | Úkol | Složitost | Dopad |
|----------|------|-----------|-------|
| 🔴 Vysoká | `@starting-style` — odstranění `<style>` tagů z Modal, Toast, Select | střední | čistší kód, lepší SSR |
| 🔴 Vysoká | `text-shadow-*` — donjon display texty | nízká | vizuální vylepšení |
| 🟡 Střední | `SubmitButton` wrapper s `useFormStatus` | nízká | nová komponenta, bez breaking change |
| 🟡 Střední | CSS proměnné z `@theme` místo JS tokenů tam kde lze | střední | postupná migrace |
| 🟡 Střední | `field-sizing-content` — multiline Input | nízká | nová funkce |
| 🟢 Nízká | `useActionState` — FormField wrapper | vysoká | závisí na game state architektuře |
| 🟢 Nízká | 3D transform utility pro DieFace | střední | kosmetické, @keyframes fungují |
| 🟢 Nízká | Inline styl → Tailwind migrace | vysoká | průběžně při editaci |

---

## 5. Co zachovat beze změny

- **JS tokeny (`tokens.js`)** — zůstanou. CSS proměnné z `@theme` je doplňují,
  nenahrazují. Tokeny jsou potřeba pro SVG atributy (`stroke`, `fill`) kde CSS třídy nefungují.
- **`octagon()` utility** — clip-path se musí počítat v JS, Tailwind to neumí.
- **`@keyframes` v `index.css`** — herní animace (die-shake, formation-push, focal-activate…)
  jsou příliš komplexní na `@starting-style`. Zůstanou jako keyframes.
- **`forwardRef` removal** — already done ✓
