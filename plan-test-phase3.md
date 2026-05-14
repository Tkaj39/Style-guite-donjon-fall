# Fáze 3 — Interaktivní komponenty (~185 min)

Komponenty s klikáním, klávesnicí a onChange. Bez portálů, bez timerů.

---

## Toggle (~40 min)

```
✓ renderuje clickable element
✓ checked=false → aria-checked=false
✓ checked=true → aria-checked=true
✓ kliknutí zavolá onChange s novou hodnotou (!checked)
✓ disabled=true → kliknutí NEZAVOLÁ onChange
✓ disabled=true → element má disabled atribut nebo aria-disabled=true
✓ label="Zvuk" → text 'Zvuk' je v dokumentu
✓ label chybí → žádný label text
✓ labelPosition="left"/"right" → renderuje bez pádu
✓ size="sm"/"md" → renderuje bez pádu (vizuální srovnání nelze v jsdom)
✓ variant="success"/"danger"/"warning" → renderuje bez pádu
  (barvu lze testovat jen pokud komponenta používá inline style)
✓ Space/Enter zavolá onChange (keyboard accessibility)
✓ id="my-toggle" → element má id='my-toggle'
```

---

## Slider (~40 min)

```
✓ renderuje input[type="range"]
✓ value=50 → input.value = "50"
✓ min=10, max=90 → input má min="10", max="90"
✓ step=5 → input má step="5"
✓ onChange se zavolá při fireEvent.change(input, { target: { value: '75' } })
✓ onChange dostane číslo (ne event)
✓ disabled=true → input je disabled
✓ disabled=true → onChange se NEZAVOLÁ
✓ label="Hlasitost" → text 'Hlasitost' je v dokumentu
✓ showValue=true → aktuální hodnota je viditelná jako text
✓ showValue=false → hodnota se nezobrazuje jako text
✓ formatValue={(v) => `${v}%`} → zobrazí '50%' místo '50'
✓ size="sm"/"md"/"lg" → renderuje bez pádu
✓ variant="success"/"danger"/"warning"/"info" → renderuje bez pádu
✓ value=0, min=0, max=100 → necrashne
✓ value=100, min=0, max=100 → necrashne
```

---

## Select (~60 min)

```jsx
// Setup
const options = [
  { value: 'a', label: 'Alfa' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gama', disabled: true },
]
```

```
✓ renderuje trigger button s role="combobox"
✓ dropdown je zavřený na startu
✓ kliknutí na trigger otevře dropdown (role="listbox" je viditelný)
✓ options=[...] → zobrazí všechny options v dropdownu
✓ value="a" → trigger zobrazuje label 'Alfa'
✓ value="" → trigger zobrazuje placeholder
✓ placeholder="Vyber..." → placeholder text je viditelný
✓ kliknutí na option zavolá onChange s value='b'
✓ onChange dostane string value (ne event)
✓ kliknutí mimo dropdown ho zavře (userEvent.click(document.body))
✓ Escape zavře dropdown
✓ disabled option → kliknutí na ni NEZAVOLÁ onChange
✓ disabled=true → trigger je disabled, kliknutí neotevře dropdown
✓ label="Jazyk" → text 'Jazyk' je v dokumentu
✓ size="sm"/"md"/"lg" → renderuje bez pádu
✓ variant="danger"/"success" → renderuje bez pádu
✓ ArrowDown otevře dropdown a fokusuje první option
✓ Enter vybere fokusovanou option a zavře dropdown
```

---

## Tabs (~45 min)

```jsx
// Setup
const items = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
  { value: 'c', label: 'Tab C', disabled: true },
]
```

```
✓ renderuje element s role="tablist"
✓ každý tab má role="tab"
✓ value="a" → tab A má aria-selected=true
✓ value="a" → tab B má aria-selected=false
✓ kliknutí na Tab B zavolá onChange s value='b'
✓ onChange dostane string value (ne event)
✓ disabled tab (C) → kliknutí NEZAVOLÁ onChange
✓ disabled tab → aria-disabled=true
✓ tab s badge={3} → číslo '3' je viditelné
✓ tab s icon → icon se renderuje uvnitř tabu
✓ variant="underline"/"pills" → renderuje bez pádu
✓ size="sm"/"md"/"lg" → renderuje bez pádu
✓ ArrowRight → přesune fokus na další tab
✓ ArrowLeft → přesune fokus na předchozí tab
✓ Enter na fokusovaném tabu → zavolá onChange
```

---

## ButtonGroup (~40 min)

```jsx
// Setup
const items = [
  { value: 'x', label: 'X' },
  { value: 'y', label: 'Y' },
  { value: 'z', label: 'Z' },
]
```

```
✓ renderuje div s role="group"
✓ každý item má button
✓ value="x" → button X má aria-pressed=true
✓ value="x" → button Y má aria-pressed=false
✓ kliknutí na Y zavolá onChange s value='y'
✓ onChange dostane string value (ne event)
✓ první button má style.clipPath s 'clipLeft' hodnotou (inline style)
✓ poslední button má style.clipPath s 'clipRight' hodnotou
✓ prostřední button nemá clipPath nebo má undefined
✓ variant="menu"/"tabs" → renderuje bez pádu
✓ size="xs"/"sm"/"md"/"lg" → renderuje bez pádu
✓ dividers=true → renderuje oddělovače mezi buttony
✓ items=[] → renderuje prázdnou skupinu bez pádu
✓ item s icon → icon se renderuje uvnitř buttonu
```
