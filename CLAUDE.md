# CLAUDE.md — donjon-fall-ui Style Guide

This file is auto-loaded by Claude at the start of every session. It holds
project-specific context, conventions, and workflow rules.

---

## Stack

- **React 19** + **Vite 8** (Rolldown bundler) + **Tailwind CSS 4**
- **@vitejs/plugin-react 6** with the React Compiler enabled (`reactCompilerPreset`)
- **Vitest 4** for tests, **react-router-dom 6** for routing
- Node ≥ 22.12.0

```bash
npm run dev        # dev server (port 5173)
npm run build      # production build — always verify after a larger change
npm run test:run   # Vitest one-shot
npm run lint:lib   # ESLint, src/lib/ only
```

---

## Git workflow — REQUIRED

**No direct commits to `master`. Ever.** Every change — feature, fix, chore,
docs — must live on its own feature branch and reach `master` only through
a `--no-ff` merge commit. This gives a clean per-feature history, makes
rollbacks atomic, and forces an explicit "this is done" merge moment.

### Before starting ANY work

1. Verify you're on `master` and clean: `git status`
2. Create a branch whose name describes the work in kebab-case:
   ```bash
   git checkout -b feat/<short-name>     # new feature
   git checkout -b fix/<short-name>      # bug fix
   git checkout -b chore/<short-name>    # tooling / docs / refactor without behavior change
   git checkout -b refactor/<short-name> # behavior-preserving restructure
   ```
   Examples: `feat/notch-menu`, `fix/hex-tile-border`, `chore/english-only`,
   `refactor/extract-octagon-utility`.
3. Branch name must reflect the change — not a vague "updates" or "wip".

### During work

- Commit early, push the branch (`git push -u origin <branch>`) so it's visible.
- Multiple commits per branch are fine — they get squashed by the merge view if needed.

### Finishing

1. `npm run test:run` + `npm run build` — green
2. Commit, push the branch
3. Switch + merge with `--no-ff` so the merge is an explicit boundary:
   ```bash
   git checkout master
   git merge --no-ff <branch> -m "Merge branch '<branch>': <one-line summary>"
   git push origin master
   ```
4. Optional: delete the branch (`git branch -d <branch>`, `git push origin --delete <branch>`)

### Forbidden

- ❌ `git commit` while on `master`
- ❌ `git push origin master` from anything other than a merge of a feature branch
- ❌ Force-push to `master`
- ❌ Skipping the `--no-ff` flag (would lose the merge commit boundary)
- ❌ Vague branch names (`updates`, `wip`, `tmp`, `branch1`)

---

## Project structure

```
src/
  lib/
    shared/       ← motion, breakpoints, z-index — shared structural tokens
    tkajui/       ← TkajUI — generic UI library (cool blue palette)
    donjon/       ← donjon-fall-ui — game UI (warm medieval gold palette)
  pages/          ← showcase pages (one per component or topic)
  data/
    componentMeta.js    ← hand-written component metadata (description, props, relatedSlugs)
    componentRegistry.js ← auto-discovery from lib/ + merge with componentMeta
    __tests__/architectureContract.test.js ← enforced naming + dep direction
  utils/
    octagon.js    ← clip-path functions: octagon(), hex(), scoopPath()...
    tooltipUtils.jsx    ← shared getPosition() + Arrow for Tooltip/DonjonTooltip
    toastContext.jsx    ← shared createToastContext() factory for Toast/DonjonToast
  hooks/
    useModalPageInert.js ← ref-counted inert for #root while a modal is open
  styleguide/
    ShowcasePage.jsx ← Layout, Section, Preview, CodeBlock (+ copy button), useLibVariant
    ArchDiagram.jsx ← shared shared→tkajui→donjon diagram (HomePage + /architecture)
  App.jsx         ← lazy imports + Routes
  index.css       ← Tailwind + @keyframes animations + dialog styles
design-sources/   ← raw SVGs the inline JSX paths were derived from (not built, reference only)
scripts/
  eslint-rules/no-hardcoded-hex.js ← donjon/no-hardcoded-hex (suggest token + autofix)
  fix-hardcoded-hex.mjs  ← mass replace `'#XXX'` → token + add import
  fix-jsx-attrs.mjs       ← `color="#XXX"` → `color={token}`
  disable-remaining-hex.mjs ← bulk eslint-disable with categorized reasons
  fix-disable-comments.mjs ← `//` → `{/* */}` in JSX child context
```

---

## Two separate design systems — tied together by architecture

**Dependency direction** (NEVER the other way):
```
shared  ← tkajui     (base library)
shared  ← donjon  ← tkajui  (game layer — built on the base)
```

- `src/lib/shared/tokens.js` — motion, breakpoints, z-index (structurally neutral)
- `tkajui` may import from `shared` — NEVER from donjon
- `donjon` may import from `shared` (and in theory from tkajui) — NEVER the reverse

### TkajUI (`src/lib/tkajui/`) — base library
- Cool palette: `surface0–4`, `accent=#6576ff`, `textHigh=#eeeef8`
- Import: `import { surface2, accent } from './tokens'`
- Button shape: **octagon** via `octagon(cx)` from `../../utils/octagon`
- Placeholder color: `textLow = '#4c4c68'`

### donjon-fall-ui (`src/lib/donjon/`) — game layer
- Warm gold palette: `bg0–4`, `gold=#FFC183`, `textHigh=#E8DDD0`
- Import: `import { gold, bg2, borderDefault } from './tokens'`
- Button shape: **octagon with a larger cx** (donjon uses cx=12 vs tkajui cx=8)
- DonjonBadge: **hex polygon** (not octagon) — uses an inline `hex(i)` function
- Placeholder color: `textLow = '#9A9080'`

### Naming convention

- `Donjon*` prefix ↔ `subcategory: 'extends-tkajui'` (extends the TkajUI counterpart)
  Examples: DonjonButton, DonjonCard, DonjonModal, DonjonInput, DonjonTabs
- no prefix ↔ `subcategory: 'exclusive'` (game primitive with no TkajUI analog)
  Examples: ActionTile, ResourceBar, PlayerPanel, EventLog, HexTile

For extends-tkajui components, `componentMeta` MUST contain:
- `extendsSlug: 'button'` — slug of the TkajUI counterpart
- `differencesFromBase: ['...', ...]` — what donjon adds/changes (shown in the showcase)

> ⚠ Color/surface/text tokens are defined per library. Only motion, breakpoints
> and z-index are shared via `lib/shared/tokens.js` — structural values without
> visual color. The `architectureContract.test.js` test enforces this.

**Aliases:** donjon exports `surface0..4` (= `bg0..4`) and tkajui exports `bg0..4`
(= `surface0..4`) — for library-agnostic code (utils, hooks). The idiomatic name
for each library is its native one (donjon: `bg*`, tkajui: `surface*`).

---

## Key tokens — donjon (most-used)

```js
// Gold
gold = '#FFC183'     // primary accent — text, icons, active elements
goldMid = '#B8956A'  // labels, subtitles
goldDim = '#8F7458'  // borders, muted text

// Backgrounds
bg0 = '#12102A'      // page background
bg2 = '#1E1C30'      // card background
bg3 = '#252340'      // elevated panel
bgDeep = '#1B1A30'   // panel headers

// Borders
borderDefault = '#353751'
borderMid     = '#2A2848'

// Text
textHigh = '#E8DDD0'   // primary text
textMid  = '#C8BFAF'   // labels
textLow  = '#9A9080'   // muted / hints
textFaint = '#4A4560'  // ultra-muted

// Game colors
gainColor    = '#50B86C'  // green — gain
dangerColor  = '#E05C5C'  // red — loss / damage
warningColor = '#C08040'  // orange — warning
infoColor    = '#4A80E2'  // blue — mana / info
magicColor   = '#9A60C8'  // purple — magic / XP

// Semantic text tints (parity with tkajui) — text on variant backgrounds, AA contrast
dangerText   = '#F9C0C0'
successText  = '#C0F0C8'
warningText  = '#FFD580'
infoText     = '#93C5FD'

// Pre-computed solid tinted bg for ornament fills (no alpha blending)
selBgInfo    = '#242948'  // ≈ infoColor@13% on bg2
selBgDanger  = '#382536'
selBgGain    = '#253138'
selBgMagic   = '#2F2544'
```

---

## Coding rules

### Colors
- **Always import from `./tokens`** — never hardcoded hex values in components
- Exception: transparencies like `${gold}30` or `${dangerColor}88` are OK inline
- **ESLint rule `donjon/no-hardcoded-hex`** scope: `src/lib/**` + `src/pages/**`
  - The rule suggests a concrete token *("use `dangerColor` from donjon/tokens")*
  - Autofix when the token is already imported in the file
  - For legitimate exceptions *(ColorsPage demo, player color demo data, code
    snippet text in CodeBlock)* use `// eslint-disable-next-line donjon/no-hardcoded-hex -- reason`
    or in JSX child context `{/* eslint-disable-next-line donjon/no-hardcoded-hex -- reason */}`
- **Mass-fix scripts** under `/scripts/` — run them after a larger refactor if
  there are many violations

### Inline `<style>` tags
- `@keyframes` belong in `src/index.css` — **not in components**
- Placeholder colors: use `<style href="unique-id" precedence="low">{...}</style>` (React 19 dedup)
- See `DonjonInput.jsx`, `Input.jsx` as references

### Component shape (clip-path)
- TkajUI: `octagon(cx)` from `../../utils/octagon` — cx=8 (md)
- Donjon: `octagon(cx)` with cx=10–14 depending on size; DonjonBadge has its own `hex()`
- Border trick: outer wrapper = border color, inner wrapper = fill color, `padding: bord`

### Animation
- Tokens: `animFast=80ms`, `animNormal=160ms`, `animSlow=300ms`
- `GameTransition` for mount/unmount animations — 6 presets (fadeScale, slideUp, slideDown, pop, fade, slideLeft)
- `useGameAnimation` hook for imperative Web Animations API

### Shared utilities
- `getPosition()` + `Arrow` from `../../utils/tooltipUtils` — used by both Tooltip variants
- `createToastContext()` from `../../utils/toastContext` — used by both Toast variants
- `useModalPageInert(isOpen)` from `../../hooks/useModalPageInert` — for open dialogs

### Prop defaults — `bordered` and `dividers`

- **`bordered = true`** universally. Every component with this prop defaults to bordered: Accordion, Avatar, HUDLayout, List, SidebarLayout, StickyBar, Table, Timeline, DonjonForm. Bordered is the design-system default; explicit `bordered={false}` opts out for embedded contexts.
- **`dividers` depends on category**:
  - `true` on **list-style** components — List/DonjonList, NotchMenu/DonjonNotchMenu. Sequential rows where the divider helps the eye separate items.
  - `false` on **group/sparse** components — ButtonGroup/DonjonButtonGroup, DescriptionList/DonjonDescriptionList. Dividers would visually fragment the compact layout.

  tkajui ↔ donjon are paired 1:1 on every default.

---

## Adding a new component — checklist

Every new public component requires **4 changes**:

### 1. Component file
```
src/lib/donjon/MyComponent.jsx     ← for donjon-fall-ui
src/lib/tkajui/MyComponent.jsx     ← for TkajUI
```
- Import colors exclusively from `./tokens`
- No inline `@keyframes` — add to `src/index.css`
- JSDoc with prop descriptions

### 2. Showcase page
```
src/pages/MyComponentPage.jsx
```
- Uses `ShowcasePage`, `Section`, `Preview`, `CodeBlock` from `../styleguide/ShowcasePage`
- Each section: interactive preview + copy-able CodeBlock
- If the component has both variants (tkajui + donjon): add into the existing
  page and use `useLibVariant()`

### 3. Route in App.jsx
```jsx
// Lazy import:
const MyComponentPage = lazy(() => import('./pages/MyComponentPage'))

// Route:
<Route path="my-component" element={<S><MyComponentPage /></S>} />
```

### 4. componentMeta.js
```js
'my-component': {
  description: 'What the component does and why it exists.',
  subcategory: 'exclusive',        // or 'extends-tkajui'
  status: 'stable',                // or 'draft'
  showcaseRoute: '/my-component',
  props: [
    { name: 'value',    type: 'number',  required: true,  description: '...' },
    { name: 'onChange', type: 'function',required: true,  description: '...' },
    { name: 'size',     type: "'sm'|'md'|'lg'", required: false, default: "'md'", description: '...' },
  ],
  relatedSlugs: ['event-log', 'donjon-badge'],
},
```

> ✅ Always verify: `npm run build` must pass without errors after all 4 changes.

---

## componentMeta.js — slug convention

- Slug = kebab-case of the filename: `DonjonProgressBar.jsx` → `donjon-progress-bar`
- The slug is generated by `componentRegistry.js`; the key in componentMeta must match exactly
- `status: 'stable'` = complete, `'draft'` = WIP, `'generated'` = auto-data only

---

## ShowcasePage API

```jsx
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

export default function MyPage() {
  return (
    <ShowcasePage
      title="Component name"
      description="One-line description."
      componentSlugs={['my-component']}     // renders metadata from componentMeta
      variants={[                            // optional — for components with tkajui+donjon variants
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section id="basic" title="Basic usage" description="...">
        <Preview>...</Preview>
        <CodeBlock code={`<MyComponent value={42} />`} />
      </Section>
    </ShowcasePage>
  )
}

// Read the active variant (tkajui vs donjon) inside a page:
const lib = useLibVariant()  // 'tkajui' | 'donjon'
```

---

## Modals and portals

- Modals render via `createPortal(content, document.body)` — outside `#root`
- Always call `useModalPageInert(isOpen)` — it inerts `#root` while a dialog is open
- Z-index hierarchy: tooltips=2100, toasts=2000, notification center=1800, modals=1500

---

## Common mistakes — avoid

| Mistake | Correct |
|---|---|
| `import { gold } from '../donjon/tokens'` in a tkajui component | Each lib has its own `./tokens` |
| `@keyframes` inline in a `<style>` tag | Put them in `src/index.css` |
| Hardcoded `#FFC183` in a component | `import { gold } from './tokens'` |
| `componentMeta` entry without `showcaseRoute` | Always add showcaseRoute |
| A new component without a Route in App.jsx | See the checklist above |
| ~~`dangerText` in a donjon component~~ | The token EXISTS as of commit `cbf149c` (parity with tkajui) |
| Barrel index.js without `export * from './tokens'` | Always re-export tokens from the barrel (regression test enforces this) |
| `// eslint-disable` between JSX siblings | In a JSX child context you MUST use `{/* eslint-disable ... */}` |
| Auto-replace `'#XXX'` → `tokenName` in a JSX attr | JSX: `color="#XXX"` → `color={tokenName}` (braces required) |
| Node script reads a CRLF file with a `.+$` regex | `.` doesn't match `\r` — strip CRLF or use `[^\n]+` |

---

## Lessons learned from mass refactors (lint cleanup, P5-P13 audit, etc.)

### JSX comment context
ESLint disable comments work TWO ways depending on context:
- **JS expression context** *(inside `style={...}`, between statements, in an arrow callback `=> (`):* `// eslint-disable-next-line ...`
- **JSX child context** *(between `<X>` and `</X>` as a text node):* `{/* eslint-disable-next-line ... */}`

Heuristic for detecting JSX child context *(from `scripts/fix-disable-comments.mjs`)*:
- previous non-empty line ends with `>` or `}`  AND
- next non-empty line starts with `<` or `{<`

### Mass cross-lib token imports
TokensPage imports the palette from BOTH libs *(donjon + tkajui)* — some tokens
share the **same name** *(e.g. `successColor`, `borderSubtle`)*. Auto-fix scripts
must detect existing imports via the ESM `ImportDeclaration` AST and avoid
duplicates, otherwise parsing fails.

### Pre-existing build warnings vs. new errors
- `process is not defined` in `NotchedBox.jsx` — pre-existing *(dev guard
  `if (typeof process !== 'undefined')`)*. Unrelated to color fixes.
- `INEFFECTIVE_DYNAMIC_IMPORT` warnings — production build is OK, just a
  Rolldown note that `componentRegistry.js` glob matches components that are
  also static-imported. Not an error.

### Component variant naming convention
**Donjon components with `subcategory: 'extends-tkajui'` must have** *(enforced
by `architectureContract.test.js`)*:
- A name with the `Donjon` prefix *(DonjonButton, DonjonCard, …)*
- `extendsSlug` in componentMeta pointing to an existing TkajUI slug
- `differencesFromBase` array of strings documenting what donjon adds
- 5-variant standard: `'default'|'danger'|'success'|'warning'|'info'` *(parity
  with tkajui where it exists)*

### Design source SVG → JSX paths workflow
1. The designer exports an SVG into `/design-sources/` *(NOT `src/`)*
2. The developer opens it, copies `<path d="..." />` into the JSX component
   *(typically `Ornaments.jsx`, `Erb.jsx`)*
3. Hardcoded fills *(`#FFC183`, `#8F7458`)* are replaced by tokens from
   `./tokens` *(typically via `color`/`colorDim` props)*
4. The original in `/design-sources/` stays as a reference for future tweaks
5. The README in `/design-sources/` keeps the up-to-date mapping of files ↔ components

### ESLint scope expansion gotcha
When you expand `donjon/no-hardcoded-hex` to a new directory:
- Run `npx eslint <dir> --format json` and count violations BEFORE doing fixes
- Pre-existing `no-undef` and other rules may light up — budget time for it
- Large counts = use batch scripts *(see `/scripts/`)*, not manual fixes

### Pull request for colleagues
After `git push origin master`:
1. Colleague: `git pull` (80+ commits ahead)
2. `npm install` (deps may have changed)
3. `npm run lint` (verify their code passes the new rules)
4. If lint reports violations → either fix per the suggestion *("use token X")*
   or `eslint-disable-next-line donjon/no-hardcoded-hex -- reason`

---

## Game UI lib components — quick reference

Recent (2026-06) extractions from HudPage + ScreensPage. Both pages now
compose the same lib components so the canonical look is single-source.

### `<VPCounter>` (src/lib/donjon/VPCounter.jsx)
HUD score panel with two layouts:
- `layout='column'` (default) — vertical stacked rows under a title.
- `layout='row'` — horizontal strip: PlayerRow ‖ central hex divider ‖
  mirrored PlayerRow. Used as ScreensPage MiniScoreHeader.

Key props:
- `players: [{ id, color, vp, icon, active }]` — `active: true` triggers
  the player-color drop-shadow glow on the Erb + colored VP digit;
  `active: false` rows fade to 0.55 opacity.
- `compact: boolean` — drops the VPPips row, leaves only Erb + VP number.
  Set to true on narrow row layouts (mobile header in a 230 px frame).
- Central hex content (row layout only): `centerValue` (single number)
  OR `centerLeft` + `centerRight` + `centerIcon` (two values with a
  pictogram separator). Hex outline is bgDeep-filled with a thin gold
  stroke (strokeWidth=0.75) and overflows the shell by 10 px each side.
- Exports a named `VPPips` sub-component so chip-scale callers reuse the
  exact pip styling (octagonal border-trick with player-color glow).

### `<ActionBar>` (src/lib/donjon/ActionBar.jsx)
HUD strip of `<ActionTile>` buttons + optional octagonal shell.

Key props:
- `actions: [{ label, icon, variant, keycap, selected, disabled }]`
- `size: 'xs'|'sm'|'md'` — tile width 48/80/110.
- `bordered` (default `true`) — octagonal shell + 4 corner RohOrnaments
  at cx=8 with uniform 8 px padding. Set `false` for floating contexts
  (ScreensPage uses bordered=false so the tiles float over the grass).
- `showLabel` (default `true`) / `showKeycap` (default `true`) — when
  showLabel=false, each tile is wrapped in a DonjonTooltip so the
  label still surfaces on hover / for screen readers.
- `scale: number` — CSS transform on the row for shrinking inside
  narrow device-frame previews.

### `<ActionTile>` plastic styling
At ornament='decorated' the tile gets a `linear-gradient(bg3 → bg4)`
idle background, `inset 0 1px 0 rgba(255,255,255,0.08)` top highlight,
`inset 0 -6px 8px rgba(0,0,0,0.25)` bottom shadow, and a
`filter: drop-shadow(0 2px 3px rgba(0,0,0,0.55))` for lift. isBlocked
disables all of these. Don't reintroduce solid flat bgs on idle tiles.

### `<HexTile>` (recent additions)
- `texture` prop applies to **empty** AND **base** cells. On base, the
  owner color is layered over the grass with `background-blend-mode:
  multiply` so the terrain shows through the player tint instead of a
  flat owner solid fill.
- Focal markers come from `FocalPointActiveIcon` / `FocalPointPassiveIcon`
  (not inline flame / diamond glyphs). Passive focal has opacity 0.6 so
  the active focal pops as the current turn's target.
- Selected state uses `gold` (warm) instead of `textActive` (cool cream)
  — contrasts cleanly against the green `move` state tint and the
  grass texture.

### `<Shield>` (donjon/Erb.jsx)
- `icon` prop renders a sized + cloned ReactNode inside the shield with
  high-contrast `textHighest` color + drop-shadow glow in the player
  color. Use it instead of `showSymbol={true}` when you want a faction
  pictogram instead of the Roman-numeral default.
- Now has a visible gold outer frame (ring thickness scales with shield
  size — 2 px on xs).

### Action / focal icon catalogue (semantic names)
- `MoveIcon` — die movement
- `TowerIcon` — tower silhouette (Pohyb věže)
- `TowerCollapseIcon` — falling tower (Kolaps věže)
- `RerollIcon` — 5-pip die + refresh arrow above (Přehazování)
- `FocalPointActiveIcon` / `FocalPointPassiveIcon` — hex focal markers
- `HexIcon` — generic hex glyph (used as VPCounter divider)

---

## Testing

Tests live in `src/lib/tkajui/__tests__/` and `src/lib/donjon/__tests__/`.

```bash
npm run test:run          # all tests
npm run test:run -- Input # filter by name
```

If you add a new component with non-trivial logic (hooks, animations, state),
add a basic test to `__tests__/`.
