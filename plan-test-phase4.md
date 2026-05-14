# Fáze 4 — Komplexní komponenty (~155 min)

Portály, fake timery, fokus management. Nejtěžší fáze — doporučeno dělat odděleně.

---

## Modal (~60 min)

```
✓ isOpen=false → modal NENÍ v dokumentu (nebo je skrytý)
✓ isOpen=true → modal je viditelný v dokumentu
✓ title="Potvrzení" → text 'Potvrzení' je v dokumentu
✓ description="..." → popis je v dokumentu
✓ children → obsah se renderuje uvnitř modalu
✓ footer → footer obsah je v dokumentu
✓ showCloseButton=true → tlačítko × je viditelné
✓ showCloseButton=false → tlačítko × NENÍ viditelné
✓ kliknutí na × zavolá onClose
✓ closeOnBackdrop=true → kliknutí na backdrop zavolá onClose
✓ closeOnBackdrop=false → kliknutí na backdrop NEZAVOLÁ onClose
✓ closeOnEscape=true → stisk Escape zavolá onClose
✓ closeOnEscape=false → Escape NEZAVOLÁ onClose
✓ isOpen=true → fokus se přesune dovnitř modalu
  (⚠ jsdom — document.activeElement může být flaky; zvážit waitFor())
✓ po zavření se fokus vrátí na trigger
  (⚠ funguje jen pokud komponenta volá trigger.focus() explicitně)
✓ size="sm"/"md"/"lg" → renderuje bez pádu
✓ variant="danger"/"success"/"warning" → renderuje bez pádu
✓ body scroll-lock → document.body.style.overflow = 'hidden' při isOpen=true
```

---

## Toast (~50 min)

```
// ⚠ Toast testy potřebují fake timers:
// beforeEach(() => vi.useFakeTimers())
// afterEach(() => vi.useRealTimers())
// vi.advanceTimersByTime(duration) pro simulaci vypršení
```

```
✓ ToastProvider renderuje children
✓ addToast({ title: 'OK', variant: 'success' }) → toast se zobrazí
✓ toast obsahuje title text
✓ toast obsahuje message text (pokud předán)
✓ variant="success"/"danger"/"warning" → renderuje bez pádu
  (barvu lze testovat jen pokud komponenta používá inline style)
✓ duration=1000 + vi.advanceTimersByTime(1000) → toast zmizí
✓ kliknutí na close button → toast se okamžitě odstraní
✓ addToast 6× → maximálně 5 toastů je viditelných najednou
✓ removeToast(id) → konkrétní toast zmizí
✓ position="top-right"/"bottom-left"/"top-left"/"bottom-right" → renderuje bez pádu
  (skutečná pozice se netestuje — jsdom nemá layout engine)
```

---

## Tooltip (~45 min)

```
// ⚠ Tooltip testy potřebují fake timers kvůli delay (default 120ms):
// beforeEach(() => vi.useFakeTimers())
// afterEach(() => vi.useRealTimers())
// po hover/focus: vi.advanceTimersByTime(120)
```

```
✓ children se renderují normálně (trigger je viditelný)
✓ tooltip popup NENÍ viditelný na startu
✓ hover na trigger + vi.advanceTimersByTime(delay) → popup se zobrazí
✓ popup obsahuje content text
✓ title="Titulek" → title je v popupu
✓ title chybí → jen content text, žádný titulek
✓ hover pryč → popup zmizí
✓ focus na trigger + vi.advanceTimersByTime(delay) → popup se zobrazí
  (delay platí i pro focus — fake timers musí být aktivní)
✓ blur → popup zmizí
✓ disabled=true → hover NEZOBRAZÍ popup
✓ placement="top"/"bottom"/"left"/"right" → renderuje bez pádu
  (pozice se netestuje — jsdom nemá layout engine)
✓ popup se zobrazí bez ohledu na placement (content je přítomný v DOM)
✓ variant="danger"/"success"/"warning"/"info" → renderuje bez pádu
✓ popup má role="tooltip"
✓ delay=0 → popup se zobrazí bez vi.advanceTimersByTime (okamžitě)
```
