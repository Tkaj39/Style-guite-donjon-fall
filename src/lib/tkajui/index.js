/**
 * TkajUI — generické UI komponenty
 *
 * Importuj tokeny zvlášť:
 *   import { accent, surface2, borderDefault } from 'tkajui/tokens'
 *
 * Nebo CSS custom properties:
 *   @import 'tkajui/tkajui.css';  → var(--tkajui-accent)
 */

// ─── Základní interaktivní prvky ──────────────────────────────────────────
export { default as Button }         from './Button'
export { default as Badge }          from './Badge'
export { default as Card }           from './Card'
export { default as Input }          from './Input'

// ─── Složené komponenty ──────────────────────────────────────────────────
export { default as ButtonGroup }    from './ButtonGroup'
export { default as Modal }          from './Modal'
export { default as SubmitButton }   from './SubmitButton'
export { ToastProvider, useToast }   from './Toast'
export { default as Tooltip }        from './Tooltip'

// ─── Form & data controls ────────────────────────────────────────────────
export { default as ProgressBar }    from './ProgressBar'
export { default as Select }         from './Select'
export { default as Slider }         from './Slider'
export { default as Tabs }           from './Tabs'
export { default as Toggle }         from './Toggle'

export { default as Pictogram }      from './Pictogram'

// ─── Shape primitives ────────────────────────────────────────────────────
// Základní tvarové elementy se sjednoceným cornerSize systémem.
// ScoopClip & NotchedBox jsou wrapper komponenty; octagon a další utility
// vrací CSS clip-path stringy použitelné inline.
export { default as ScoopClip }      from './ScoopClip'
export { default as NotchedBox }     from './NotchedBox'
export {
  octagon,
  octagonPerCorner,
  octagonInner,
  octagonInnerPerCorner,
  octagonWithNotch,
  octagonWithNotches,
  notchClamp,
  NOTCH_SHAPES,
  scoopPath,
  scoopBBPath,
  scoopCirclePath,
  clipLeft,
  clipRight,
  roundRect,
  pill,
  SHAPE_SIZES,
} from '../../utils/octagon'

// Polygon shape utility (hex, regularPolygon)
export { hexFlatTop, hexPointyTop, regularPolygon } from '../../utils/polygon'

// ─── Design tokens ──────────────────────────────────────────────────────
/**
 * Re-export palette tokenů ze `./tokens` — paleta je první-class export
 * stejně jako komponenty. Parita s donjon-fall-ui barrel exportem.
 *
 * @example
 *   import { Button, accent, surface2 } from 'tkajui'
 *   import { animNormal, zTooltip, BREAKPOINTS } from 'tkajui'   // shared tokens
 */
export * from './tokens'

// Pozn.: Ornamenty (CornerOrnament, SideOrnament, HexOrnament) jsou herní
// dekorace exkluzivní pro donjon-fall-ui. Importuj přímo:
//   import { CornerOrnament } from 'donjon-fall-ui'
//   import { SideOrnament, HexOrnament } from 'donjon-fall-ui'
// TkajUI je base library — nezávisí na donjon a neměla by je re-exportovat.
