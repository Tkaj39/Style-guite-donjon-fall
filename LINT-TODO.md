# LINT-TODO — zbylé `no-unused-vars` warningy

Stav: **0 errors, 2 warnings**. Sekce 🪦 a ❓ vyčištěny.

CI neblokují.

---

## 🔧 Chybějící použití — dotáhnout feature (2 položky)

- [ ] **`src/lib/donjon/DonjonSelect.jsx:139`** — `const glowColor = \`\${v.active}40\``
      Vypočtená barva pro focus/active glow, ale **nikde v JSX neaplikovaná**.
      Buď přidat do `boxShadow`/`outline`, nebo smazat.

- [ ] **`src/lib/donjon/Erb.jsx:124`** — `const hrotHeight = hrotWidth * 14 / 48`
      Odkazovaná **v komentáři na ř. 198** ("Shifted up by (hrotHeight + edgeInset)"),
      ale v kódu nahrazená výrazem napevno. Buď použít proměnnou ve stylu, nebo
      smazat proměnnou + opravit komentář.
