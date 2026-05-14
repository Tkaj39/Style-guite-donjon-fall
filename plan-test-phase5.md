# Fáze 5 — Průřezové testy (~255 min)

Testy které ověřují celou knihovnu najednou — konzistence API, správné exporty, robustnost a a11y.
Dělat až po fázích 1–4 kdy jsou komponenty otestované individuálně.

---

## Barrel export (~20 min)

**`src/lib/tkajui/__tests__/barrel.test.js`**

Ověří že `src/lib/tkajui/index.js` exportuje vše co má. Rychlý, vysoká hodnota.

```
✓ import { Pictogram }     → není undefined, je to funkce
✓ import { ProgressBar }   → není undefined
✓ import { Toggle }        → není undefined
✓ import { Slider }        → není undefined
✓ import { Select }        → není undefined
✓ import { Tabs }          → není undefined
✓ import { ButtonGroup }   → není undefined
✓ import { Modal }         → není undefined
✓ import { Toast }         → není undefined (nebo ToastProvider + useToast)
✓ import { Tooltip }       → není undefined
✓ import { ScoopClip }     → není undefined
✓ import { CornerOrnament } → není undefined
✓ import { Ornaments }     → není undefined
✓ import { octagon }       → není undefined, je to funkce
✓ import { scoopPath }     → není undefined
✓ import { SHAPE_SIZES }   → není undefined, je to objekt
```

---

## Cross-component konzistence (~60 min)

**`src/lib/tkajui/__tests__/consistency.test.jsx`**

### `size` prop — všechny hodnoty renderují bez pádu
```
// jsdom nepočítá CSS — testujeme jen že komponenta přijme hodnotu a necrashne
✓ Pictogram size="sm"/"md"/"lg"/"xl" → renderuje bez pádu
✓ ProgressBar size="sm"/"md"/"lg" → renderuje bez pádu
✓ Toggle size="sm"/"md" → renderuje bez pádu
✓ Slider size="sm"/"md"/"lg" → renderuje bez pádu
✓ Select size="sm"/"md"/"lg" → renderuje bez pádu
✓ Tabs size="sm"/"md"/"lg" → renderuje bez pádu
✓ ButtonGroup size="xs"/"sm"/"md"/"lg" → renderuje bez pádu
✓ Modal size="sm"/"md"/"lg" → renderuje bez pádu
✓ neznámý size u každé komponenty → renderuje bez pádu (fallback)
```

### `disabled` prop — chování
```
✓ Toggle disabled=true → kliknutí nezavolá onChange
✓ Slider disabled=true → změna nezavolá onChange
✓ Select disabled=true → kliknutí neotevře dropdown
✓ Tooltip disabled=true → hover nezobrazí popup
✓ každá z výše uvedených má disabled atribut nebo aria-disabled=true
```

### `variant` prop — neznámá hodnota necrashne
```
✓ ProgressBar variant="unknown" → renderuje bez pádu
✓ Toggle variant="unknown" → renderuje bez pádu
✓ Slider variant="unknown" → renderuje bez pádu
✓ Select variant="unknown" → renderuje bez pádu
✓ Modal variant="unknown" → renderuje bez pádu
✓ Toast variant="unknown" → renderuje bez pádu
✓ Tooltip variant="unknown" → renderuje bez pádu
```

### `className` + `style` — průchod na wrapper
```
✓ ProgressBar className="x" → přítomno na wrapperu
✓ ProgressBar style={{ opacity: 0.5 }} → přítomno na wrapperu
✓ ScoopClip className="x" → přítomno na wrapperu
✓ ScoopClip style={{ height: 48 }} → přítomno na wrapperu
✓ Pictogram className="x" → přítomno na span
✓ Pictogram style={{ margin: 4 }} → přítomno na span
✓ CornerOrnament style={{ position: 'absolute' }} → přítomno na svg
```

### `onChange` — vrací hodnotu, ne event
```
✓ Toggle onChange → dostane boolean (true/false)
✓ Slider onChange → dostane number
✓ Select onChange → dostane string (value)
✓ Tabs onChange → dostane string (value)
✓ ButtonGroup onChange → dostane string (value)
```

---

## Null / undefined safety (~45 min)

**`src/lib/tkajui/__tests__/nullsafety.test.jsx`**

```
// Select
✓ options={null} → renderuje bez pádu
✓ options={undefined} → renderuje bez pádu
✓ options={[]} value="x" → necrashne, žádné options
✓ onChange={null} → kliknutí necrashne

// Tabs
✓ items={null} → renderuje bez pádu
✓ items={undefined} → renderuje bez pádu
✓ onChange={undefined} → kliknutí necrashne

// ButtonGroup
✓ items={[]} → renderuje prázdnou skupinu bez pádu
✓ items={null} → renderuje bez pádu

// ProgressBar
✓ value={NaN} → necrashne (zobrazí 0% nebo prázdný bar)
✓ value={Infinity} → necrashne
✓ value={-10} → necrashne (fill není záporná)
✓ value={150} max={100} → necrashne (fill max 100%)

// Pictogram
✓ icon={undefined} → necrashne
✓ icon={null} → necrashne

// Slider
✓ value={NaN} → necrashne
✓ min={50} max={10} → necrashne (invertovaný range)
✓ onChange={null} → pohyb slideru necrashne

// Modal
✓ title={null} isOpen onClose={fn} → renderuje bez pádu
✓ children={null} isOpen onClose={fn} → renderuje bez pádu

// Tooltip
✓ content={null} → renderuje bez pádu
✓ content="" → renderuje bez pádu
```

---

## Lifecycle — cleanup a portály (~50 min)

**`src/lib/tkajui/__tests__/lifecycle.test.jsx`**

### Cleanup
```
// Modal — scroll lock
✓ isOpen=true → document.body.style.overflow = 'hidden'
✓ Modal unmount → document.body.style.overflow vráceno na původní hodnotu
✓ onClose zavolán → document.body.style.overflow se obnoví

// Tooltip
✓ Tooltip unmount s otevřeným popupem → žádná chyba

// Toast (fake timers)
✓ Toast unmount před vypršením duration → clearTimeout byl zavolán
✓ removeToast(id) → timer pro daný toast je zastaven

// Select
✓ Select unmount s otevřeným dropdownem → žádná chyba, listener odebrán
```

### Portály — renderování do document.body
```
// Modal
✓ isOpen=true → modal je potomkem document.body (ne parent divu)
✓ isOpen=true → backdrop je potomkem document.body

// Toast
✓ addToast() → toast je potomkem document.body

// Tooltip (ověřit podle implementace — může být relative nebo portal)
✓ popup se renderuje bez pádu bez ohledu na typ renderování
```

---

## Accessibility — axe audit (~80 min)

**`src/lib/tkajui/__tests__/accessibility.test.jsx`**

```js
// Vzor pro každou komponentu:
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

const { container } = render(<Toggle label="Zvuk" checked={false} onChange={() => {}} />)
expect(await axe(container)).toHaveNoViolations()
```

### Pokryté komponenty
```
✓ <Toggle label="Zvuk" checked={false} onChange={fn}> projde axe audit
✓ <Toggle> bez label → axe HLÁSÍ porušení (ověří že test odhalí chybu)
✓ <Slider label="Hlasitost" value={50} onChange={fn}> projde axe audit
✓ <ProgressBar label="Načítání" value={50}> projde axe audit
✓ <Select label="Jazyk" options={[...]} value="" onChange={fn}> projde axe audit
✓ <Tabs items={[...]} value="a" onChange={fn}> projde axe audit
✓ <ButtonGroup items={[...]} value="x" onChange={fn}> projde axe audit
✓ <Modal isOpen title="Potvrzení" onClose={fn}> projde axe audit
✓ <Tooltip content="Nápověda"><button>Trigger</button></Tooltip> projde axe audit
✓ <Pictogram icon={MockIcon} size="md"> projde axe audit
```

### Co axe ověří automaticky
```
✓ role="progressbar" má aria-valuenow, aria-valuemin, aria-valuemax
✓ role="combobox" je propojeno s role="listbox" (aria-controls)
✓ role="tablist" → každý role="tab" má aria-selected
✓ role="dialog" má aria-modal=true a aria-labelledby
✓ role="tooltip" je propojeno s triggerem přes aria-describedby
✓ interaktivní prvky mají dostupný název (label, aria-label, aria-labelledby)
✓ focus order je logický
```
