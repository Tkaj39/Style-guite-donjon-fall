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

- [ ] **#4 Add DonjonRadio/RadioGroup/Checkbox/CheckboxGroup**
  - tkajui/Form.jsx exports 6: Field, Form, Radio, RadioGroup, Checkbox, CheckboxGroup
  - donjon/DonjonForm.jsx exports 2: DonjonField, DonjonForm — **parity broken**
  - Donjon* should mirror the full set

---

## 🟡 Medium drift

- [ ] **#5 `size` has two meanings — split scale from dimension**
  - **Scale** (`xs|sm|md|lg`): Button, Card, Input, Modal, Avatar, Tabs, …
  - **Pixel value**: `Drawer size = 320`, `Minimap size = 180`
  - **Fix:** rename pixel ones — `Drawer.size` → `Drawer.width`,
    `Minimap.size` → `Minimap.width`
  - Also `HeroImage.height = 'md'` is a string scale named like a pixel
    dimension — either `size = 'md'` (scale) or `height = 320` (pixel)

- [ ] **#6 `Pictogram` vs `DonjonPictogram` — overlapping color controls**
  - Pictogram: `color = 'currentColor'`
  - DonjonPictogram: `color`, `variant = 'active'`, `bare = true` — three knobs
  - Unclear priority when all three are set
  - **Fix:** reduce to 2 (variant for preset, color as override) + document priority

- [ ] **#7 `aria-label` parity**
  - DonjonModal has `'aria-label': ariaLabel`; Modal doesn't
  - DonjonToggle + Toggle both have it ✓
  - **Fix:** add `aria-label` to tkajui Modal — accessibility props need 1:1 parity

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
