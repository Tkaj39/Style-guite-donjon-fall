# Plán upgradu: React 18 → 19 a Tailwind CSS v3 → v4

Tento dokument popisuje, co se změní, jak postupovat a na co si dát pozor při upgradu závislostí v tomto projektu.

---

## 1. React 18 → React 19

### Co se změní v kódu

Kódová základna je psána moderním způsobem, takže breaking changes jsou minimální. Konkrétně:

**`forwardRef` je v React 19 zbytečný** — `ref` je od verze 19 běžný prop jako každý jiný. Stávající kód s `forwardRef` bude stále fungovat (React 19 ho zachovává kvůli zpětné kompatibilitě), ale doporučuje se přepsat tyto tři komponenty:

- `src/lib/tkajui/Button.jsx` — wrapper `forwardRef(function Button(..., ref))`
- `src/lib/tkajui/NotchedBox.jsx` — wrapper `forwardRef(function NotchedBox(..., ref))`
- `src/lib/donjon/DonjonButton.jsx` — wrapper `forwardRef(function DonjonButton(..., ref))`

Přepis je přímočarý — stačí odstranit `forwardRef` obal a přidat `ref` do destrukturované props:

```jsx
// Před (React 18)
import { forwardRef } from 'react'
const Button = forwardRef(function Button({ children, ...props }, ref) {
  return <button ref={ref} {...props}>{children}</button>
})

// Po (React 19)
function Button({ children, ref, ...props }) {
  return <button ref={ref} {...props}>{children}</button>
}
```

### Co se nemění

Následující vzory jsou plně kompatibilní a nevyžadují žádné úpravy:

- `createRoot` v `main.jsx` — již správně používáno
- `createContext` / `useContext` / `.Provider` v `Toast.jsx` a `ShowcasePage.jsx`
- `createPortal` v `Toast.jsx`
- `useEffect` s cleanup funkcemi ve všech komponentách
- Žádné `defaultProps` na function components (byly odstraněny v React 19)
- Žádné legacy string refs
- Žádné `ReactDOM.render`

### Testy

Testy v `src/lib/tkajui/__tests__/` používají `act(() => { ... })` — tento vzor je s React 19 kompatibilní. Po upgradu spusť celou testovací sadu a zkontroluj, zda se chování nezměnilo:

```bash
npm run test:run
```

### Postup upgradu React

```bash
npm install react@^19 react-dom@^19
npm run test:run
```

---

## 2. Tailwind CSS v3 → v4

### Zásadní rozdíly mezi v3 a v4

| v3 | v4 |
|---|---|
| Konfigurace v `tailwind.config.js` | Konfigurace přímo v CSS pomocí `@theme` |
| `@tailwind base/components/utilities` v CSS | Nahrazeno `@import "tailwindcss"` |
| PostCSS plugin jako primární integrace | Nativní CSS engine, PostCSS stále podporován |
| Custom barvy v `theme.extend.colors` | Custom barvy jako CSS proměnné v `@theme` |

### Použití migračního nástroje

Tailwind poskytuje oficiální CLI nástroj, který provede většinu migrace automaticky:

```bash
npx @tailwindcss/upgrade
```

Nástroj udělá následující:
1. Aktualizuje `package.json` (`tailwindcss`, případně PostCSS plugin)
2. Přepíše `tailwind.config.js` → přesune konfiguraci do `src/index.css`
3. Nahradí `@tailwind base/components/utilities` za `@import "tailwindcss"`
4. Přemapuje custom barvy z JS konfigurace do CSS `@theme` bloku

Po spuštění nástroje bude `src/index.css` obsahovat přibližně toto:

```css
@import "tailwindcss";

@theme {
  --color-brand-50:  #f0f4ff;
  --color-brand-100: #dde6ff;
  --color-brand-200: #c3d0ff;
  --color-brand-300: #9db0ff;
  --color-brand-400: #7485ff;
  --color-brand-500: #4f57f7;
  --color-brand-600: #3d3eed;
  --color-brand-700: #3030d1;
  --color-brand-800: #2a2ba9;
  --color-brand-900: #272b85;
  --color-brand-950: #18194d;

  --font-family-sans: 'Inter', system-ui, sans-serif;
}

@layer base {
  body {
    @apply bg-neutral-950 text-neutral-100 font-sans antialiased;
  }
}
```

Třídy jako `brand-500`, `brand-600/60` atd. budou fungovat stejně jako dříve — jen jejich definice bude v CSS místo v JS.

### Co se v kódu nemění

Audit neodhalil žádné deprecated utility třídy. Konkrétně v kódu **nejsou** použity:

- `bg-opacity-*` / `text-opacity-*` (v4 vyžaduje slash syntaxi, např. `bg-black/50`) — **nenalezeno**
- `flex-shrink-*` / `flex-grow-*` (přejmenovány na `shrink-*` / `grow-*`) — **nenalezeno**
- `overflow-ellipsis` (přejmenováno na `text-ellipsis`) — **nenalezeno**
- `decoration-slice` (přejmenováno na `box-decoration-slice`) — **nenalezeno**

Slash syntaxe pro opacity (`border-brand-600/60`) je již v kódu použita správně a v4 ji plně podporuje.

Arbitrary values jako `text-[11px]` a `transition-[filter]` jsou v4 kompatibilní.

### Postup upgradu Tailwind

```bash
npx @tailwindcss/upgrade
npm install
npm run build
```

Pokud nástroj nahlásí chyby nebo varování, zkontroluj výstup a oprav ručně.

---

## 3. Na co si dát pozor po upgradu

### Vizuální kontrola brand barev

Po migraci Tailwind zkontroluj vizuálně celý style guide — zejména všechny komponenty, které používají `brand-*` třídy. Migrace CSS proměnných je automatická, ale barvy mohou mít mírně odlišný rendering kvůli jiným výchozím hodnotám v v4 (např. jiná výchozí opacity u `ring`, `shadow` apod.).

Prověř zejména:
- `DonjonButton` — všechny varianty a stavy (hover, focus, disabled)
- `Button` — primary varianta s `brand-500`
- Focus ringy (`focus-visible:ring-brand-500`)
- Komponenty v `src/styleguide/` — projdi všechny showcase stránky v prohlížeči

### Keyframe animace v index.css

Soubor `src/index.css` obsahuje velké množství vlastních `@keyframes` animací (die-reroll, die-shake, formation-push, float-feedback atd.). Tyto animace jsou psány jako plain CSS a s Tailwind v4 nejsou v konfliktu — ale po migraci zkontroluj, zda se animované komponenty (`DieFace`, `FloatFeedback`, `HexTile`) stále chovají správně.

### Testy po Tailwind upgradu

Tailwind v4 generuje CSS jiným způsobem, ale testy komponent testují DOM strukturu a chování, ne CSS výstup — neměly by být ovlivněny. Přesto spusť celou sadu pro jistotu:

```bash
npm run test:run
```

---

## 4. Doporučené pořadí kroků

1. **Větev** — vytvoř novou větev (`upgrade/react19-tailwind4`) pro celý upgrade
2. **React 19** — upgraduj React, spusť testy, oprav případné problémy
3. **`forwardRef` refactor** — odstraň `forwardRef` z Button, NotchedBox, DonjonButton (volitelné, ale vhodné udělat teď)
4. **Tailwind v4** — spusť `npx @tailwindcss/upgrade`, zkontroluj výstup
5. **Build** — `npm run build` musí proběhnout bez chyb
6. **Vizuální kontrola** — projdi všechny stránky style guide v prohlížeči (`npm run dev`)
7. **Testy** — `npm run test:run` musí projít
8. **PR / merge**