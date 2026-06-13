# LINT-TODO — zbylé `no-unused-vars` warningy

Stav: **0 errors, 7 warnings**. Sekce 🪦 vyčištěna (commit níže).

CI neblokují.

---

## 🔧 Chybějící použití — dotáhnout feature (2 položky)

- [ ] **`src/lib/donjon/DonjonSelect.jsx:139`** — `const glowColor = \`\${v.active}40\``
      Vypočtená barva pro focus/active glow, ale **nikde v JSX neaplikovaná**.
      Sibling `tkajui/Select.jsx` mělo `boxShadow: glowColor` — refaktor v
      `tkajui/Select.jsx` to z kódu odstranil (čistili jsme VARIANTS), takže
      sibling už referencí není. Buď přidat do `boxShadow`/`outline` v
      DonjonSelect, nebo smazat.

- [ ] **`src/lib/donjon/Erb.jsx:124`** — `const hrotHeight = hrotWidth * 14 / 48`
      Odkazovaná **v komentáři na ř. 198** ("Shifted up by (hrotHeight + edgeInset)"),
      ale v kódu nahrazená výrazem napevno. Buď použít proměnnou ve stylu, nebo
      smazat proměnnou + opravit komentář.

---

## ❓ Nejasné — rozhodnout (5 položek)

- [ ] **`src/App.jsx:14`** — `const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))`
      Soubor `pages/PlaceholderPage.jsx` existuje, ale žádná `<Route>` ho
      nepoužívá. Buď chybí routa, nebo je to dead code od refaktoru.
      → **Otázka:** přidat routu, nebo smazat import + soubor?

- [ ] **`src/pages/AnimacePage.jsx:120`** — `function MoveDieDemo()`
      Plná demo komponenta, **nikde nerenderovaná**. WIP nebo zbytek po refaktoru?

- [ ] **`src/pages/AnimacePage.jsx:242`** — `function PushDemo()` — totéž

- [ ] **`src/pages/FloatFeedbackPage.jsx:99`** — `function MultiDemo()` — totéž

- [ ] **`src/pages/ToastPage.jsx:85`** — `const cmp = lib === 'tkajui' ? '...' : '...'`
      Název komponenty jako string ('ToastProvider / useToast' resp.
      'DonjonToastProvider / useDonjonToast') — **nikde nezobrazený**.
      → Buď chybí v dokumentačním nadpisu sekce, nebo smazat.

---

## Workflow

Per `CLAUDE.md`: každá úprava na vlastní `chore/<...>` branch, merge `--no-ff`.
