# Design Sources

Original SVG files from which the inline SVG paths in the components were derived.

## Files

| File | Used in | viewBox |
|---|---|---|
| `erb.svg` | `Shield` in `src/lib/donjon/Erb.jsx` (clip-path) | 116.22 × 116.21 |
| `prapor.svg` | `Shield` shape="prapor" in `Erb.jsx` (clip-path) | 29.05 × 116.21 |
| `hrot-erbu.svg` | `HrotErbu` in `src/lib/donjon/Ornaments.jsx` (inline paths) | 48 × 14 |
| `roh.svg` | `RohOrnament` in `Ornaments.jsx` (inline paths) | 25 × 46 |
| `zkosen.svg` | `ZkosenOrnament` in `Ornaments.jsx` (inline paths) | 22 × 22 |

## Workflow

1. The designer draws the SVG in Figma/Illustrator and exports it into this folder.
2. The developer opens the file and copies `<path d="..." />` into the JSX component.
3. Hardcoded colors (`#FFC183`, `#8F7458`, …) are replaced with tokens from
   `tokens.js` (typically via `color`/`colorDim` props for variant-aware ornaments).
4. The original file stays as a reference for future tweaks.

## Why not `src/`?

`src/` is for app code. These SVGs are not imported or bundled — they are
design artifacts. They live outside `src/` so they don't confuse
`import.meta.glob` or the bundler.
