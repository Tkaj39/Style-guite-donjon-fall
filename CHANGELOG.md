# Changelog

All notable changes to **@tkaj/donjon-shared**, **tkajui** and **donjon-fall-ui** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the projects adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Until 1.0.0 the 0.MINOR.PATCH track may include breaking changes between
minors — read the diff before upgrading.

## [Unreleased]

### Added — for the upcoming 0.1.0
- **@tkaj/donjon-shared 0.1.0** — first publish. Subpath exports for
  `./tokens`, `./octagon`, `./polygon`, `./sizes`, `./contrast`,
  `./toastContext`, `./tooltipUtils`, `./useModalPageInert`,
  `./useBreakpoint`. ESM + CJS + `.d.ts`. Tree-shakable
  (`sideEffects: false`).
- **tkajui 0.1.0** — generic React component library. Includes Button,
  Card, Input, Select, Modal, Tooltip, Toast (+ provider), Tabs, Slider,
  Toggle, ProgressBar, Avatar, Badge, Pictogram, NotchMenu, ButtonGroup,
  Layout primitives (Stack/Inline/Cluster/Grid/Container/Box/Spacer/Split/
  Center/AspectBox), Form primitives (Field, Form, Radio[Group],
  Checkbox[Group], TextArea, NumberInput, Combobox), Feedback (Spinner,
  Skeleton, Alert, Banner), Buttons & media (IconButton, HeroImage,
  Backdrop, Thumbnail), Inventory (InventorySlot, InventoryGrid),
  Layout structures (StickyBar, SidebarLayout), Disclosure (Drawer,
  DropdownMenu, Accordion), Data display (Table, List, DescriptionList,
  Stat), Navigation (Breadcrumb, Pagination, ContextMenu), plus
  ScoopClip, NotchedBox and clip-path utilities re-exported from
  `@tkaj/donjon-shared`. Ships `tkajui.css` with CSS custom properties +
  the `.tkajui-segment-button` utility class.
- **donjon-fall-ui 0.1.0** — game UI built on top of tkajui. Donjon*
  variants (Button, Badge, Card, Modal, Input, Select, Toggle, Slider,
  Tabs, Tooltip, Toast, ProgressBar, ButtonGroup, NotchMenu,
  NotificationCenter, Pictogram), game-exclusive primitives (HexTile,
  ActionTile, ResourceBar, NumericDisplay, PlayerPanel, EventLog,
  PhaseIndicator, DieFace, Erb, FloatFeedback, GameTransition,
  FramedImage), gameplay (Dialogue, ChoicePanel, RewardPopup,
  AchievementToast, LevelUp), game-layout (HUDLayout, Scoreboard,
  Leaderboard, Cooldown, Minimap, Timeline, Sprite), and ornament SVGs
  (RohOrnament, SideOrnament, HexOrnament, ZkosenOrnament, ScoopOrnament,
  HrotErbu, CornerOrnament). Ships `donjon.css` with CSS custom
  properties, `.dj-clip-focus`, `.dj-segment-button` utility classes
  plus all gameplay @keyframes.

### Infrastructure
- npm workspaces wire the three packages together; each is symlinked
  into `node_modules/`.
- tsup pipeline produces ESM + CJS + `.d.ts` per package. The
  `prepublishOnly` hook runs the build automatically.
- `source` export condition (resolved first by Vite + Vitest) means the
  app + tests read raw `.jsx` source without needing a build step
  between edits.
- GitHub Actions:
  - `ci.yml` — lint + tests + app build + lib builds on every push and PR
    to `master`.
  - `release.yml` — on a `v*` tag, runs the same sanity checks and then
    publishes all three packages to npm with provenance. Requires the
    `NPM_TOKEN` repo secret.
