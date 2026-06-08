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

// ─── Layout primitives (purely structural — no themed visuals) ──────────
export { Stack, Inline, Cluster, Grid, Container, Box, Spacer, Split, Center, AspectBox } from './Layout'
export { default as Avatar } from './Avatar'

// ─── Form primitives (purely structural — no themed visuals) ────────────
export { Field, Form, Radio, RadioGroup, Checkbox, CheckboxGroup } from './Form'
export { default as TextArea }    from './TextArea'
export { default as NumberInput } from './NumberInput'

// ─── Buttons & media group ───────────────────────────────────────────────
export { default as IconButton }  from './IconButton'
export { default as HeroImage }   from './HeroImage'
export { default as Backdrop }    from './Backdrop'
export { default as Thumbnail }   from './Thumbnail'

// ─── Inventory group ─────────────────────────────────────────────────────
export { default as InventorySlot } from './InventorySlot'
export { default as InventoryGrid } from './InventoryGrid'

// ─── Layout structures group ─────────────────────────────────────────────
export { default as StickyBar }     from './StickyBar'
export { default as SidebarLayout } from './SidebarLayout'

// ─── Disclosure group ────────────────────────────────────────────────────
export { default as Drawer }        from './Drawer'
export { default as DropdownMenu }  from './DropdownMenu'
export { default as Accordion }     from './Accordion'

// ─── Data display group ──────────────────────────────────────────────────
export { default as Table }           from './Table'
export { default as List }            from './List'
export { default as DescriptionList } from './DescriptionList'
export { default as Stat }            from './Stat'

// ─── Navigation group ────────────────────────────────────────────────────
export { default as Breadcrumb }      from './Breadcrumb'
export { default as Pagination }      from './Pagination'
export { default as ContextMenu }     from './ContextMenu'

// ─── Form — niche ────────────────────────────────────────────────────────
export { default as Combobox }        from './Combobox'

// ─── Feedback group ──────────────────────────────────────────────────────
export { default as Spinner }     from './Spinner'
export { default as Skeleton }    from './Skeleton'
export { default as Alert }       from './Alert'
export { default as Banner }      from './Banner'

export { default as Pictogram }      from './Pictogram'

// ─── Utility icons (generic UI — not game-specific) ──────────────────────
// For game-themed icons see `donjon-fall-ui` (SwordIcon, ShieldIcon, …).
export {
  ListIcon, PhasesIcon, HashIcon, PaletteIcon, GridIcon, SparkIcon,
  StackIcon, FormIcon, ButtonIcon, ModalIcon, TabsIcon, ToggleIcon, ArchIcon,
  // Common actions (settings panel, search, CRUD, chrome controls)
  SettingsIcon, SearchIcon, PlusIcon, MinusIcon, EditIcon, TrashIcon,
  DownloadIcon, UploadIcon, CloseIcon, CheckIcon, CopyIcon,
  ChevronDownIcon, ChevronRightIcon, ExternalLinkIcon,
} from './Icons'

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
} from '../shared/octagon'

// Polygon shape utility (hex, regularPolygon)
export { hexFlatTop, hexPointyTop, regularPolygon } from '../shared/polygon'

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

// Prop enum values (lists of valid prop values like 'xs'|'sm'|'md'|'lg').
// Naming convention: <COMPONENT>_<PROP>_VALUES. See ./enums.js for the full list.
export * from './enums'

// Note: Ornaments (CornerOrnament, SideOrnament, HexOrnament) are game-themed
// decorations exclusive to donjon-fall-ui. Import them directly:
//   import { CornerOrnament } from 'donjon-fall-ui'
//   import { SideOrnament, HexOrnament } from 'donjon-fall-ui'
// TkajUI is the base library — it must not depend on donjon nor re-export it.
