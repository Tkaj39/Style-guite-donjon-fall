// TkajUI — generické UI komponenty

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

// ─── Přesunuto do lib/donjon/ — re-exporty pro zpětnou kompatibilitu ─────
export { default as CornerOrnament } from '../donjon/CornerOrnament'
export { SideOrnament, HexOrnament } from '../donjon/Ornaments'
