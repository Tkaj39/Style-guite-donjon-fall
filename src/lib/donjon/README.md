# donjon-fall-ui

Game UI component library built on top of [`tkajui`](https://www.npmjs.com/package/tkajui). Warm medieval gold palette, ornament SVGs, HUD layout, gameplay primitives, and a full suite of `Donjon*` variants that extend the TkajUI counterparts with gold borders + octagonal ornaments.

## Install

```bash
npm install donjon-fall-ui tkajui react react-dom
```

Peer deps: `react >= 18`, `react-dom >= 18`. `tkajui` and `@tkaj/donjon-shared` are direct dependencies.

## Quick start

```jsx
import { DonjonButton, DonjonCard, FramedImage, Dialogue, HUDLayout } from 'donjon-fall-ui'
import 'donjon-fall-ui/styles'   // donjon.css — gold tokens + ornament utilities

export function StartScreen() {
  return (
    <HUDLayout
      top={<h1>⚔ Donjon Fall</h1>}
      bottom={<DonjonButton variant="success">Start campaign</DonjonButton>}
    >
      <DonjonCard title="Choose your hero">
        <FramedImage src="/aragorn.jpg" size="lg" />
      </DonjonCard>
    </HUDLayout>
  )
}
```

## Subpath exports

| Import | What it gives you |
|---|---|
| `donjon-fall-ui` | All React components + token re-exports. |
| `donjon-fall-ui/tokens` | Gold palette + bg/border/text tokens + game colors. |
| `donjon-fall-ui/enums` | `*_VALUES` arrays for enum-typed props. |
| `donjon-fall-ui/styles` | `donjon.css` — `:root { --donjon-* }` custom properties, game-piece `@keyframes`, component keyframes, `.dj-clip-focus` + `.dj-segment-button`. |
| `donjon-fall-ui/playerColors` | 6 player colors × 3 variants for multi-player UIs. |
| `donjon-fall-ui/textures` | Grass meadow tile URL strings (`grassTile1024` / `512` / `256`, plus `grassTiles`) for screen backgrounds and `HexTile texture={…}`. |

> **Note on `./textures`:** Unlike `./tokens` (and the other JS subpaths), this entry is **not** built by tsup into `dist/`. It ships as source `textures.js` next to the `textures/*.jpg` folder so `import.meta.url` asset resolution stays valid for Vite and npm. Prefer this subpath over the main barrel — textures are intentionally not re-exported from `donjon-fall-ui` root.

## Game-piece animations

CSS keyframes for die/tower moves, combat push, focal pulses, reject, etc. ship in `donjon-fall-ui/styles`. Named presets + a remount-on-play hook live on the main barrel. Multi-phase combat sequences stay in the game app.

```jsx
import {
  DieFace, useCssAnimation, animationStyle, gameAnimationPresets,
} from 'donjon-fall-ui'
import 'donjon-fall-ui/styles'

function MoveDie() {
  const move = useCssAnimation('dieMove')
  return (
    <>
      <div {...move.bind}><DieFace value={3} /></div>
      <button onClick={move.play} disabled={move.playing}>Play</button>
    </>
  )
}

// Always-on infinite pulse (no remount):
// style={{ animation: stuck ? animationStyle('dieStuckPulse') : 'none' }}

// Retarget distances for a non-md hex size:
// :root { --donjon-hex-step-x: 96px; --donjon-hex-step-y: 108px; }
```

See the style-guide `/animations` page for the full catalog and `/motion` for `GameTransition` + `useGameAnimation` (WAAPI).

## Component categories

**Donjon\* (extends tkajui)** — DonjonButton, DonjonBadge, DonjonCard, DonjonModal, DonjonInput, DonjonSelect, DonjonToggle, DonjonSlider, DonjonTabs, DonjonTooltip, DonjonToast, DonjonProgressBar, DonjonButtonGroup, DonjonNotchMenu, DonjonNotificationCenter, DonjonPictogram.

**Game-exclusive primitives** — HexTile, ActionTile, ResourceBar, NumericDisplay, PlayerPanel, EventLog, PhaseIndicator, DieFace, Erb, FloatFeedback, GameTransition, FramedImage.

**Gameplay** — Dialogue, ChoicePanel, RewardPopup, AchievementToast, LevelUp.

**Game-layout** — HUDLayout, Scoreboard, Leaderboard, Cooldown, Minimap, Timeline, Sprite.

**Ornaments** (SVG) — RohOrnament, SideOrnament, HexOrnament, ZkosenOrnament, ScoopOrnament, HrotErbu, CornerOrnament.

Full live showcase: [Style guide](https://github.com/Tkaj39/Style-guite-donjon-fall).

## Architecture

```
shared  ← tkajui     (base)
shared  ← donjon-fall-ui  ← tkajui  (this package — game layer)
```

donjon-fall-ui may import from `@tkaj/donjon-shared` and `tkajui`. The reverse is forbidden — enforced by `architectureContract.test.js`.

## License

MIT
