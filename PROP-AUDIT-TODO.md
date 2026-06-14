# PROP-AUDIT-TODO — Critical review of component props

Goals: **prop consistency** + **logical extension** across tkajui ↔ donjon.

Audit scope: ~103 components (all default exports of `src/lib/tkajui/*.jsx` and
`src/lib/donjon/*.jsx`). Pairs compared 1:1.

---

## 🔴 Critical

- [x] **#1 Add `className, style, ...rest` passthrough to 6 Donjon components** ✓ done (commit `afe0fb7`)
  - DonjonModal, DonjonTabs, DonjonToggle, DonjonSelect, DonjonTooltip, DonjonCard
  - tkajui counterparts already forward them — Donjon breaks parity
  - Without this, users can't add `data-testid`, custom `aria-*`, tour steps, etc.
  - **Fix:** ~1 line per file (add to destructure + spread on the root element)

- [x] **#2 Resolve `tkajui/Select.variant` dead prop** ✓ done — restored 5-variant VARIANTS lookup, wired into outer border, dropdown shadow, and selected-option check icon. Parity with DonjonSelect.
  - After cleaning `VARIANTS` object, `variant` is accepted but **does nothing**.
  - DonjonSelect applies variant visually; tkajui Select doesn't anymore.
  - **Pick one:**
    - (a) restore visual variants in tkajui Select (parity)
    - (b) remove the `variant` prop entirely from tkajui Select (smaller API)
  - **Recommendation:** (a) — design-system parity is more valuable

- [x] **#3 Rename `isOpen` → `open` on Modal/DonjonModal** ✓ done — both components + 9 consumers + 6 test files + componentMeta. CommandPalette/Sidebar (styleguide internals) deliberately left for a separate decision since they're not in the public API.
  - Other dialog-style components use `open`: Drawer, DonjonDrawer, Backdrop,
    AchievementToast, RewardPopup
  - Radix / MUI / shadcn convention is `open`
  - **Breaking change** — but small footprint, one-shot rename

- [x] **#4 Add DonjonRadio/RadioGroup/Checkbox/CheckboxGroup** ✓ already done — **audit miss.** Components live in `src/lib/donjon/DonjonChoiceControls.jsx` (380 lines, diamond aesthetic, 5-variant) and are exported from the barrel. The audit checked only `DonjonForm.jsx` and missed the sibling file. No action needed.

---

## 🟡 Medium drift

- [x] **#5 `size` has two meanings — split scale from dimension** ✓ done with revisions to the original proposal:
  - **Minimap**: `size` → `width` (clean rename; was always a width).
  - **Drawer/DonjonDrawer**: kept `size` (semantically side-agnostic — sets cross-axis width for left/right, height for top/bottom). Renaming to `width` would mislead on top/bottom sides. Improved JSDoc to clarify it's a CSS length (not a t-shirt scale).
  - **HeroImage/DonjonHeroImage**: kept the `'sm'|'md'|'lg'|'xl'|number` union on `height`. Both modes describe the same axis ("how tall is the panel"), so splitting into two props would add API surface for marginal gain. Improved JSDoc to make the union explicit.
  - Updated callsites + componentMeta. Build + 562/562 tests pass.

- [x] **#6 `Pictogram` vs `DonjonPictogram` — overlapping color controls** ✓ partial — JSDoc + componentMeta now document the three axes (variant = preset, color = icon-color override, bare = frame mode) with an explicit priority matrix. Kept all 3 props because the audit's "reduce to 2" proposal would change established semantics: `<DonjonPictogram variant="danger" />` currently renders a bare red icon (variant just picks color when bare) and consumers rely on that. A full reduction (e.g. dropping `bare` so `variant` always implies framed) would migrate every existing bare-with-variant call; deferred unless explicitly requested.

- [x] **#7 `aria-label` parity** ✓ done — tkajui Modal now accepts `'aria-label'` and renders it on `<dialog>` when `title` is absent (mirrors DonjonModal). componentMeta updated for both. Added 2 axe + assertion tests to `tkajui/__tests__/accessibility.test.jsx` matching the donjon test pattern.

---

## 🟢 Nits

- [ ] `bordered` defaults disagree — pick a convention (`true` by default = decorated)
- [ ] `ScoopClip.r` is `DEPRECATED` — plan removal milestone
- [ ] Several Donjon* lack `...rest` → can't attach native refs/handlers to the root

---

## ✅ Good (no change needed)

- ~25 paired components have **identical signatures** + Donjon adds only
  `ornament` — vzorové (Button, Card, Input, Tabs, Tooltip, Badge, Pagination,
  Accordion, Combobox, ContextMenu, DescriptionList, Drawer, DropdownMenu,
  HeroImage, List, NumberInput, Stat, SubmitButton, Table, TextArea, Thumbnail,
  NotchMenu, Breadcrumb)
- `items = []` array pattern — consistent across 10+ components
- `ornament = 'decorated'` default — consistent across 10+ Donjon components
- 5-variant standard (`default|danger|success|warning|info`) — consistent
- Form module structure in tkajui

---

## Workflow

Per `CLAUDE.md`: each item on its own `chore/<...>` branch, merge `--no-ff`.
Item #1 first (lowest risk, biggest UX win).
