/* ── donjon-fall-ui enum values ─────────────────────────────────────────
   Runtime-accessible lists of valid values for every enum-typed prop in
   donjon-fall-ui. Naming convention: `<COMPONENT>_<PROP>_VALUES`.

   Use cases:
     • Iterate over valid values:           DONJON_BUTTON_VARIANT_VALUES.map(...)
     • Validate user input:                 if (DONJON_BUTTON_SIZE_VALUES.includes(x)) ...
     • Build select / radio inputs:         <Select options={DONJON_TABS_VARIANT_VALUES} />
     • Drive componentMeta types:           (see src/data/componentMeta.js)

   The arrays live here (not in the component file) so component files can
   keep exporting only their React component — React Fast Refresh requires
   a clean component-only export surface.

   Coverage = every enum prop documented in componentMeta.js for any donjon
   component (Donjon* extends-tkajui variants + game-exclusive primitives).
   ─────────────────────────────────────────────────────────────────────── */

// ── Donjon extends-tkajui ─────────────────────────────────────────────────

export const DONJON_BADGE_VARIANT_VALUES = [
  'default', 'gain', 'loss', 'event', 'warning', 'magic', 'muted',
  // Backward-compat aliases (kept as valid values):
  'success', 'danger', 'info', 'primary',
]
export const DONJON_BADGE_SIZE_VALUES = ['sm', 'md']

export const DONJON_BUTTON_VARIANT_VALUES = ['default', 'primary', 'danger', 'success', 'warning', 'link']
export const DONJON_BUTTON_SIZE_VALUES     = ['xs', 'sm', 'md', 'lg']
export const DONJON_BUTTON_ORNAMENT_VALUES = ['decorated', 'plain']

export const DONJON_BUTTON_GROUP_VARIANT_VALUES  = ['menu', 'tabs']
export const DONJON_BUTTON_GROUP_ORNAMENT_VALUES = ['decorated', 'plain']
export const DONJON_BUTTON_GROUP_SIZE_VALUES     = ['xs', 'sm', 'md', 'lg']

export const DONJON_CARD_ORNAMENT_VALUES = ['decorated', 'plain']
export const DONJON_CARD_VARIANT_VALUES  = ['default', 'danger', 'success', 'warning']

export const DONJON_INPUT_SIZE_VALUES = ['xs', 'sm', 'md', 'lg']

export const DONJON_MODAL_SIZE_VALUES     = ['sm', 'md', 'lg']
export const DONJON_MODAL_VARIANT_VALUES  = ['default', 'danger', 'success', 'warning']
export const DONJON_MODAL_ORNAMENT_VALUES = ['decorated', 'plain']

export const DONJON_NOTCH_MENU_SIZE_VALUES           = ['xs', 'sm', 'md', 'lg']
export const DONJON_NOTCH_MENU_ORNAMENT_VALUES       = ['decorated', 'plain']
export const DONJON_NOTCH_MENU_ITEMS_POSITION_VALUES = ['top', 'bottom']
export const DONJON_NOTCH_MENU_BODY_CORNERS_VALUES   = ['octagon', 'sharp']

// ── Image essentials ──────────────────────────────────────────────────────
export const FRAMED_IMAGE_SIZE_VALUES     = ['xs', 'sm', 'md', 'lg', 'xl']
export const FRAMED_IMAGE_ORNAMENT_VALUES = ['decorated', 'plain']

export const DONJON_PICTOGRAM_SIZE_VALUES    = ['sm', 'md', 'lg', 'xl']
export const DONJON_PICTOGRAM_VARIANT_VALUES = ['active', 'passive', 'disabled', 'danger', 'success']

export const DONJON_PROGRESS_BAR_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']
export const DONJON_PROGRESS_BAR_VARIANT_VALUES = ['default', 'hp', 'mana', 'stamina', 'xp']

export const DONJON_SELECT_SIZE_VALUES    = ['xs', 'sm', 'md', 'lg']
export const DONJON_SELECT_VARIANT_VALUES = ['default', 'danger', 'success', 'warning', 'info']

export const DONJON_SLIDER_SIZE_VALUES       = ['xs', 'sm', 'md', 'lg']
export const DONJON_SLIDER_VARIANT_VALUES    = ['default', 'success', 'danger', 'warning', 'info']
export const DONJON_SLIDER_THUMB_SHAPE_VALUES = ['diamond', 'circle', 'octagon']

export const DONJON_TABS_VARIANT_VALUES     = ['underline', 'pills']
export const DONJON_TABS_ORNAMENT_VALUES    = ['decorated', 'plain']
export const DONJON_TABS_ORIENTATION_VALUES = ['horizontal', 'vertical']
export const DONJON_TABS_SIZE_VALUES        = ['xs', 'sm', 'md', 'lg']

export const DONJON_TOAST_VARIANT_VALUES = ['default', 'success', 'danger', 'warning', 'info']

export const DONJON_TOGGLE_LABEL_POSITION_VALUES = ['left', 'right']
export const DONJON_TOGGLE_SIZE_VALUES            = ['sm', 'md']
export const DONJON_TOGGLE_VARIANT_VALUES         = ['default', 'danger', 'success', 'warning', 'info']

export const DONJON_TOOLTIP_VARIANT_VALUES = ['default', 'danger', 'success', 'warning', 'info']

// ── Game-exclusive primitives ─────────────────────────────────────────────

export const ACTION_TILE_SIZE_VALUES     = ['sm', 'md', 'lg']
export const ACTION_TILE_VARIANT_VALUES  = ['default', 'attack', 'move', 'special']
export const ACTION_TILE_ORNAMENT_VALUES = ['plain', 'decorated']

export const DIE_FACE_SIZE_VALUES  = ['xs', 'sm', 'md', 'lg']
export const DIE_FACE_STATE_VALUES = ['default', 'selected', 'rerolled']

export const DONJON_NOTIFICATION_CENTER_POSITION_VALUES = ['bottom-right', 'bottom-left', 'top-right', 'top-left']
export const DONJON_NOTIFICATION_CENTER_ORNAMENT_VALUES = ['plain', 'decorated']

export const ERB_SHAPE_VALUES          = ['erb', 'prapor']
export const ERB_ORNAMENT_VALUES       = ['plain', 'decorated']
export const ERB_ORNAMENT_COLOR_VALUES = ['gold', 'player']

export const EVENT_LOG_ORNAMENT_VALUES = ['plain', 'decorated']

export const FLOAT_FEEDBACK_VARIANT_VALUES = ['default', 'danger', 'success', 'warning']

export const GAME_TRANSITION_PRESET_VALUES = ['fadeScale', 'slideUp', 'slideDown', 'pop', 'fade', 'slideLeft']

export const HEX_TILE_PROPERTY_VALUES = ['empty', 'focal', 'base']
export const HEX_TILE_FOCAL_VALUES    = ['active', 'passive']
export const HEX_TILE_STATE_VALUES    = ['default', 'selected', 'move', 'attack', 'blocked']
export const HEX_TILE_SIZE_VALUES     = ['sm', 'md', 'lg']

export const NUMERIC_DISPLAY_SIZE_VALUES           = ['sm', 'md', 'lg']
export const NUMERIC_DISPLAY_VARIANT_VALUES        = ['default', 'vp', 'resource', 'mana']
export const NUMERIC_DISPLAY_LABEL_POSITION_VALUES = ['top', 'bottom', 'left', 'right']

export const PHASE_INDICATOR_ORIENTATION_VALUES = ['horizontal', 'vertical']
export const PHASE_INDICATOR_SIZE_VALUES        = ['sm', 'md']

export const PLAYER_PANEL_SYMBOL_VALUES   = ['sword', 'shield', 'tower']
export const PLAYER_PANEL_SIZE_VALUES     = ['sm', 'md']
export const PLAYER_PANEL_ORNAMENT_VALUES = ['plain', 'decorated']

export const RESOURCE_BAR_SIZE_VALUES    = ['sm', 'md', 'lg']
export const RESOURCE_BAR_VARIANT_VALUES = ['hp', 'mana', 'stamina', 'xp', 'shield', 'default']

// ── Gameplay group ─────────────────────────────────────────────────────
export const DIALOGUE_PORTRAIT_SIDE_VALUES   = ['left', 'right']
export const CHOICE_PANEL_LAYOUT_VALUES      = ['list', 'grid']
export const CHOICE_PANEL_CONSEQUENCE_VALUES = ['cost', 'gain', 'danger', 'info']
export const ACHIEVEMENT_TOAST_TIER_VALUES   = ['gold', 'silver', 'bronze']

// ── Game-specific layout group ─────────────────────────────────────────
export const SCOREBOARD_LAYOUT_VALUES = ['compact', 'table']
export const COOLDOWN_SHAPE_VALUES    = ['circle', 'linear']
export const COOLDOWN_SIZE_VALUES     = ['sm', 'md', 'lg', 'xl']
