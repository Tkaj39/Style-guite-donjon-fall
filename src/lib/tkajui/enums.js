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

export const NOTCH_MENU_SIZE_VALUES           = ['xs', 'sm', 'md', 'lg']
export const NOTCH_MENU_ITEMS_POSITION_VALUES = ['top', 'bottom']
export const NOTCH_MENU_BODY_CORNERS_VALUES   = ['octagon', 'sharp']

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

// ── Layout primitives (Stack / Inline / Cluster) ──────────────────────────
// `gap` also accepts a raw number (px); the *_GAP_VALUES list only enumerates
// the named token keys for size-style pickers and validators.
export const STACK_GAP_VALUES     = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
export const STACK_ALIGN_VALUES   = ['start', 'center', 'end', 'stretch', 'baseline']
export const STACK_JUSTIFY_VALUES = ['start', 'center', 'end', 'between', 'around', 'evenly']

export const INLINE_GAP_VALUES     = STACK_GAP_VALUES
export const INLINE_ALIGN_VALUES   = STACK_ALIGN_VALUES
export const INLINE_JUSTIFY_VALUES = STACK_JUSTIFY_VALUES

export const CLUSTER_GAP_VALUES     = STACK_GAP_VALUES
export const CLUSTER_ALIGN_VALUES   = STACK_ALIGN_VALUES
export const CLUSTER_JUSTIFY_VALUES = STACK_JUSTIFY_VALUES

export const GRID_GAP_VALUES        = STACK_GAP_VALUES
export const GRID_ALIGN_ITEMS_VALUES = ['start', 'center', 'end', 'stretch']

export const CONTAINER_MAX_WIDTH_VALUES = ['sm', 'md', 'lg', 'xl', 'full']
export const CONTAINER_PADDING_VALUES   = STACK_GAP_VALUES

export const BOX_PADDING_VALUES = STACK_GAP_VALUES

export const SPACER_AXIS_VALUES = ['horizontal', 'vertical']

export const SPLIT_DIRECTION_VALUES = ['horizontal', 'vertical']
export const SPLIT_GAP_VALUES       = STACK_GAP_VALUES

// ── Image essentials ──────────────────────────────────────────────────────
export const AVATAR_SIZE_VALUES   = ['xs', 'sm', 'md', 'lg', 'xl']
export const AVATAR_SHAPE_VALUES  = ['circle', 'octagon']

// ── Form primitives ──────────────────────────────────────────────────────
export const RADIO_GROUP_ORIENTATION_VALUES    = ['vertical', 'horizontal']
export const CHECKBOX_GROUP_ORIENTATION_VALUES = ['vertical', 'horizontal']

export const TEXT_AREA_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']
export const NUMBER_INPUT_SIZE_VALUES = ['xs', 'sm', 'md', 'lg']
