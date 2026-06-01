/**
 * TkajUI — generic UI components
 *
 * Import tokens separately:
 *   import { accent, surface2, borderDefault } from 'tkajui/tokens'
 *
 * Or as CSS custom properties:
 *   @import 'tkajui/tkajui.css';  → var(--tkajui-accent)
 */

// ─── Basic interactive elements ──────────────────────────────────────────
export { default as Button }         from './Button'
export { default as Badge }          from './Badge'
export { default as Card }           from './Card'
export { default as Input }          from './Input'

// ─── Composite components ───────────────────────────────────────────────
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
export { default as NotchMenu }      from './NotchMenu'

export { default as Pictogram }      from './Pictogram'

// ─── Shape primitives ────────────────────────────────────────────────────
// Base shape elements with a unified cornerSize system.
// ScoopClip & NotchedBox are wrapper components; octagon and other utilities
// return CSS clip-path strings usable inline.
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
 * Re-export of palette tokens from `./tokens` — the palette is a first-class
 * export, same as components. Parity with the donjon-fall-ui barrel export.
 *
 * @example
 *   import { Button, accent, surface2 } from 'tkajui'
 *   import { animNormal, zTooltip, BREAKPOINTS } from 'tkajui'   // shared tokens
 */
export * from './tokens'

// Note: Ornaments (CornerOrnament, SideOrnament, HexOrnament) are game-themed
// decorations exclusive to donjon-fall-ui. Import them directly:
//   import { CornerOrnament } from 'donjon-fall-ui'
//   import { SideOrnament, HexOrnament } from 'donjon-fall-ui'
// TkajUI is the base library — it must not depend on donjon nor re-export it.
