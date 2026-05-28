# Design Sources

Originální SVG soubory, ze kterých byly odvozeny inline SVG paths v komponentách.

## Soubory

| Soubor | Použito v | viewBox |
|---|---|---|
| `erb.svg` | `Shield` v `src/lib/donjon/Erb.jsx` (clip-path) | 116.22 × 116.21 |
| `prapor.svg` | `Shield` shape="prapor" v `Erb.jsx` (clip-path) | 29.05 × 116.21 |
| `hrot-erbu.svg` | `HrotErbu` v `src/lib/donjon/Ornaments.jsx` (inline paths) | 48 × 14 |
| `roh.svg` | `RohOrnament` v `Ornaments.jsx` (inline paths) | 25 × 46 |
| `zkosen.svg` | `ZkosenOrnament` v `Ornaments.jsx` (inline paths) | 22 × 22 |

## Workflow

1. Designér nakreslí SVG ve Figmě/Illustratoru, exportuje do této složky.
2. Vývojář otevře soubor, zkopíruje `<path d="..." />` do JSX komponenty.
3. Hardcoded barvy (`#FFC183`, `#8F7458`, …) nahradí tokeny z `tokens.js`
   (typicky `color`/`colorDim` props pro variant-aware ornamenty).
4. Originální soubor zůstává jako reference pro budoucí úpravy.

## Proč ne `src/`?

`src/` je pro app code. Tyto SVG nejsou importované ani buildované — jsou
to design artefakty. Drží se mimo `src/` aby nezmátly `import.meta.glob`
nebo bundler.
