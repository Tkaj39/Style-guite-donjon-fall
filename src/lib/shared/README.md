# @tkaj/donjon-shared

Structural utilities shared by [`tkajui`](https://www.npmjs.com/package/tkajui) and [`donjon-fall-ui`](https://www.npmjs.com/package/donjon-fall-ui). Pure JS / JSX — no visual styling, no theme colors, no opinions.

Rarely imported directly; consumers usually pull these through `tkajui` / `donjon-fall-ui`. Published separately so both libs can declare a single source of truth for clip-path geometry, motion tokens, and z-index ordering.

## Install

```bash
npm install @tkaj/donjon-shared react react-dom
```

Peer deps: `react >= 18`. `react-dom` only if you use the `useModalPageInert` hook.

## Subpath exports

| Import | What it gives you |
|---|---|
| `@tkaj/donjon-shared` | Re-export of everything from `./tokens`, `./octagon`, `./polygon`. |
| `./tokens` | `SPACE`, `CONTAINER_WIDTHS`, motion (`animFast`/`animNormal`/`animSlow`), easing, breakpoints, z-index. |
| `./octagon` | `octagon(cx)`, `octagonPerCorner`, `octagonInner`, `clipLeft`, `clipRight`, `roundRect`, `pill`, `scoopPath`, `SHAPE_SIZES`. |
| `./polygon` | `hexFlatTop`, `hexPointyTop`, `regularPolygon`. |
| `./sizes` | Button size scale tokens. |
| `./contrast` | WCAG contrast ratio + `pickContrastText`. |
| `./toastContext` | `createToastContext()` factory used by both Toast variants. |
| `./tooltipUtils` | `getPosition()` + `Arrow` SVG for tooltip positioning. |
| `./useModalPageInert` | Ref-counted `inert` toggle for `#root` while a dialog is open. |
| `./useBreakpoint` | Hook returning the active breakpoint key. |

## Example — clip-path silhouette

```jsx
import { octagon } from '@tkaj/donjon-shared/octagon'

<div style={{ clipPath: octagon(12), background: 'gold', padding: 1 }}>
  <div style={{ clipPath: octagon(11), background: 'black' }}>Octagon</div>
</div>
```

## License

MIT
