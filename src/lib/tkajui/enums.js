/* ── TkajUI enum values ─────────────────────────────────────────────────
   Runtime-accessible lists of valid values for every enum-typed prop in
   TkajUI. Naming convention: `<COMPONENT>_<PROP>_VALUES`.

   See src/lib/donjon/enums.js for the full rationale + use cases.
   ─────────────────────────────────────────────────────────────────────── */

export const BADGE_VARIANT_VALUES = ['default', 'success', 'danger', 'warning', 'info']
export const BADGE_SIZE_VALUES    = ['sm', 'md']

export const BUTTON_VARIANT_VALUES = ['default', 'danger', 'success', 'warning', 'link']
export const BUTTON_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']

export const BUTTON_GROUP_VARIANT_VALUES = ['default', 'tabs']
export const BUTTON_GROUP_SIZE_VALUES    = ['sm', 'md']

export const CARD_VARIANT_VALUES = ['default', 'danger', 'success']

export const INPUT_SIZE_VALUES = ['xs', 'sm', 'md', 'lg']

export const MODAL_SIZE_VALUES    = ['sm', 'md', 'lg']
export const MODAL_VARIANT_VALUES = ['default', 'danger', 'success', 'warning']

export const NOTCH_MENU_SIZE_VALUES = ['xs', 'sm', 'md', 'lg']

export const PICTOGRAM_SIZE_VALUES = ['sm', 'md', 'lg', 'xl']

export const PROGRESS_BAR_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']
export const PROGRESS_BAR_VARIANT_VALUES = ['default', 'success', 'danger', 'warning', 'info']

export const SELECT_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']
export const SELECT_VARIANT_VALUES = ['default', 'success', 'danger', 'warning']

export const SLIDER_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']
export const SLIDER_VARIANT_VALUES = ['default', 'success', 'danger', 'warning', 'info']

export const SUBMIT_BUTTON_VARIANT_VALUES = ['default', 'danger', 'success', 'warning', 'link']
export const SUBMIT_BUTTON_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']

export const TABS_VARIANT_VALUES     = ['underline', 'pills']
export const TABS_SIZE_VALUES        = ['xs', 'sm', 'md', 'lg']
export const TABS_ORIENTATION_VALUES = ['horizontal', 'vertical']

export const TOAST_VARIANT_VALUES  = ['default', 'success', 'danger', 'warning', 'info']
export const TOAST_POSITION_VALUES = ['bottom-right', 'top-right', 'bottom-left', 'top-left']

export const TOGGLE_LABEL_POSITION_VALUES = ['right', 'left']
export const TOGGLE_SIZE_VALUES            = ['sm', 'md']
export const TOGGLE_VARIANT_VALUES         = ['default', 'success', 'danger', 'warning']

export const TOOLTIP_VARIANT_VALUES = ['default', 'danger', 'success', 'warning', 'info']

// ── Shape primitives (tkajui-only utilities) ──────────────────────────────

export const SCOOP_CLIP_SHAPE_VALUES = ['bezier', 'circle']
export const SCOOP_CLIP_SIZE_VALUES  = ['xs', 'sm', 'md', 'lg']

export const CORNER_ORNAMENT_VARIANT_VALUES    = ['bracket', 'dot', 'diamond', 'cross']
export const CORNER_ORNAMENT_CORNER_TYPE_VALUES = ['cut', 'round', 'scoop']

export const NOTCHED_BOX_SIDE_VALUES = ['top', 'bottom', 'left', 'right']

export const DEVICE_FRAME_TYPE_VALUES = ['desktop', 'tablet', 'mobile']
