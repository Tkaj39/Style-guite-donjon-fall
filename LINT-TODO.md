# LINT-TODO — zbylé `no-unused-vars` warningy

Stav po cleanup (commit `31f187a`): **0 errors, 13 warnings**. Všech 13 je
`no-unused-vars` a vyžadují lidský úsudek (dead kód × nedotažená feature ×
WIP) — proto je tu odložené k rozhodnutí, nikoli mechanicky smazané.

CI neblokují.

---

## 🪦 Jednoznačně dead — smazat (6 položek)

- [ ] **`src/lib/tkajui/Select.jsx:66`** — `const v = VARIANTS[variant] ?? VARIANTS.default`
      `v.*` se nikde nečte. DonjonSelect (sibling) používá `v.idle`/`v.active`
      aktivně — pravděpodobně refaktor odstranil variant styling v tkajui/Select,
      ale lookup zůstal.

- [ ] **`src/pages/MapSelectPage.jsx:17`** — `const rows = Math.ceil(count / cols)`
      Layout používá `gridTemplateColumns`, počet řádků je implicitní.

- [ ] **`src/pages/SettingsPage.jsx:10`** — `const p2 = players[1]`
      Druhý hráč z mock dat — používá se pouze `p1`.

- [ ] **`src/pages/SettingsPage.jsx:361`** — `const [activeTab, setActiveTab] = useState('zvuk')`
      Page wrapper má vlastní useState, ale do `<SettingsModal>` se předává
      hardcoded `activeTab="zvuk"`. Celý useState je dead.

- [ ] **`src/pages/ShapesPage.jsx:83`** — `const half = s / 2` (diamond větev)
      Polygon se počítá jen z `d`. Zapomenutý mezivýpočet.

---

## 🔧 Chybějící použití — dotáhnout feature (2 položky)

- [ ] **`src/lib/donjon/DonjonSelect.jsx:139`** — `const glowColor = \`\${v.active}40\``
      Vypočtená barva pro focus/active glow, ale **nikde v JSX neaplikovaná**.
      Sibling `tkajui/Select.jsx` má `boxShadow: glowColor`. Feature nedotažená
      napůl — buď přidat do `boxShadow`/`outline`, nebo smazat.

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
Doporučení: skupinou (např. všech 6 dead smazat v jednom commitu) — ne soubor
po souboru.
