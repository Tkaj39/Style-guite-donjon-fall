# Fáze 2 — Jednoduché komponenty (~95 min)

Komponenty bez komplexního stavu, bez portálů, bez timerů. Dobrý start po utils.

---

## Pictogram (~20 min)

```jsx
// Setup — mock ikona zachytí props které dostane
const MockIcon = ({ width, height }) => <svg data-testid="icon" width={width} height={height} />
```

```
✓ renderuje <span> s display inline-flex
✓ size="sm" → ikona dostane width < než size="lg" (relativní, ne pevné px)
✓ size="md" → ikona dostane width < než size="xl"
✓ size chybí → renderuje bez pádu (fallback na 'md')
✓ neznámý size → renderuje bez pádu (fallback)
✓ color="#FFC183" → style.color = #FFC183 na wrapperu
✓ color chybí → renderuje bez pádu (currentColor je default)
✓ className="custom" → span má třídu 'custom'
✓ style={{ marginTop: 8 }} → aplikuje se na span
✓ předaná ikona se renderuje (data-testid="icon" je v DOM)
```

---

## ProgressBar (~30 min)

```
✓ renderuje element s role="progressbar"
✓ value=50, max=100 → aria-valuenow=50
✓ aria-valuemin=0, aria-valuemax=100
✓ value=0 → fill má style.width "0%"
✓ value=100 → fill má style.width "100%"
✓ value=50 → fill má style.width ~"50%"
✓ value > max → fill nepřekročí 100%
✓ value < 0 → fill nemá zápornou šířku
✓ showValue=true → aktuální hodnota je viditelná jako text
✓ showValue=false → hodnota se nezobrazuje
✓ label="Načítání" → text 'Načítání' je v dokumentu
✓ label chybí → žádný label element
✓ indeterminate=true → aria-valuenow není přítomno
✓ indeterminate=true → element má animační třídu nebo style atribut
✓ size="sm"/"md"/"lg" → renderuje bez pádu (vizuální srovnání nelze v jsdom)
✓ variant="danger"/"success"/"warning"/"info" → renderuje bez pádu
  (barvu lze testovat jen pokud komponenta používá inline style)
✓ className="custom" → aplikuje se na wrapper
✓ style={{ borderRadius: 4 }} → aplikuje se na wrapper
```

---

## ScoopClip (~25 min)

```
✓ renderuje wrapper div
✓ children se renderují uvnitř
✓ SVG clipPath je přítomno v dokumentu (skrytý SVG element)
✓ clipPath má clipPathUnits="objectBoundingBox"
✓ r=0.25 → path data obsahují hodnotu 0.25
✓ r=0 → necrashne
✓ r=0.5 → necrashne
✓ style={{ height: 48 }} → aplikuje se na wrapper
✓ className="custom" → aplikuje se na wrapper
✓ wrapper má style.clipPath obsahující 'url(#'
```

---

## CornerOrnament (~20 min)

```
✓ renderuje <svg>
✓ size=24 → svg má width=24, height=24
✓ size chybí → svg má width=16, height=16 (default)
✓ color="#FFC183" → fill atribut obsahuje '#FFC183'
✓ variant="bracket" → renderuje bez pádu
✓ variant="dot" → renderuje bez pádu (obsahuje <circle>)
✓ variant="diamond" → renderuje bez pádu (obsahuje <polygon>)
✓ variant="cross" → renderuje bez pádu
✓ neznámý variant → vrátí null nebo renderuje bez pádu
✓ style={{ position: 'absolute' }} → aplikuje se na svg
```
