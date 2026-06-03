# Migration guide

This file tracks breaking-change paths between published versions of
**@tkaj/donjon-shared**, **tkajui** and **donjon-fall-ui**.

> While the packages live on the 0.x track, breaking changes between
> minors are allowed but documented here.

---

## v0.1.0 — initial release

There is nothing to migrate from. Welcome 👋

### Install

```bash
# Use one of the two UI packages — they pull in @tkaj/donjon-shared
# transitively. Use both if you want the generic look in some screens
# and the game look in others.

# Generic UI:
npm install tkajui

# Game UI (also pulls tkajui as a runtime dep):
npm install donjon-fall-ui

# Or both:
npm install tkajui donjon-fall-ui
```

### One-time setup

1. Import the CSS once at app entry — pick the libs you use:

   ```js
   // src/index.css or src/main.jsx
   import 'tkajui/styles'
   import 'donjon-fall-ui/styles'
   ```

   These ship CSS custom properties (`--tkajui-*` / `--donjon-*`) plus
   utility classes (`.tkajui-segment-button`, `.dj-clip-focus`,
   `.dj-segment-button`) and the gameplay keyframes.

2. Components are importable from the package root:

   ```jsx
   import { Button, Card } from 'tkajui'
   import { DonjonButton, HUDLayout, FramedImage } from 'donjon-fall-ui'
   ```

3. Tokens are exported both as JS constants and as CSS custom properties:

   ```jsx
   import { accent, surface2 } from 'tkajui/tokens'
   <div style={{ background: surface2, color: accent }}>...</div>
   ```

   ```css
   /* OR in plain CSS */
   .my-card { background: var(--tkajui-surface2); color: var(--tkajui-accent); }
   ```

### React requirement

React **18+** is a peer dependency. React 19 is fully supported (the
style guide itself runs on React 19 with the React Compiler).

### TypeScript

Each package ships `.d.ts` generated from JSDoc, so TypeScript projects
get autocomplete + prop typing out of the box. No `@types/*` package
needed.

### Tailwind?

Not required. The packages render their own visuals via inline `style`
+ a small ship-along CSS file. If you have Tailwind in your project,
nothing collides — the lib CSS is namespaced.

---

## Roadmap

When 0.2.x or 1.0.0 lands, breaking changes will be documented here in
the form:

> ## v0.2.0 — *date*
>
> ### Breaking
> - `<X>` renamed to `<Y>` — codemod: `find . -name '*.jsx' -exec sed -i 's/<X /<Y /g' {} +`
> ### Added
> - …
> ### Removed
> - …
