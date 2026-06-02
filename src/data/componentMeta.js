/* ── Phase 2: metadata layer ─────────────────────────────────────────────
   Hand-written information about components — description, props, rules, links.
   Key = component slug (stable, derived from the file name).

   This layer NEVER overwrites auto-generated data (name, filePath, category,
   visibility, slug, route). It only adds content.

   Documentation state (status):
     'generated'  — auto-generated data only, nothing hand-written
     'draft'      — description or props exist but are not complete
     'documented' — required blocks are filled in
   ─────────────────────────────────────────────────────────────────────── */

export const componentMeta = {

  /* ── UI Components ─────────────────────────────────────────────────── */

  'badge': {
    description: 'Status badge with an octagonal shape. Semantic color variants, optional live-state dot, and an icon slot. DonjonBadge is a visually identical re-export.',
    status: 'documented',
    showcaseRoute: '/badges',
    props: [
      { name: 'children', type: 'ReactNode',                                              required: true,  description: 'Badge text.' },
      { name: 'variant',  type: "'default'|'success'|'danger'|'warning'|'info'",          required: false, default: "'default'", description: 'Color variant.' },
      { name: 'size',     type: "'sm'|'md'",                                              required: false, default: "'md'",      description: 'Size.' },
      { name: 'dot',      type: 'boolean',                                                required: false, default: 'false',     description: 'Shows a colored dot on the left.' },
      { name: 'icon',     type: 'ReactNode',                                              required: false, default: 'undefined', description: 'Icon instead of the dot.' },
    ],
    relatedSlugs: ['donjon-badge', 'button', 'donjon-card'],
  },

  'button': {
    description: 'Primary action button with an octagonal shape. Four semantic variants, three sizes, icon support and a loading state. DonjonButton extends it with SideOrnament and HexOrnament.',
    status: 'documented',
    showcaseRoute: '/buttons',
    props: [
      { name: 'children',      type: 'ReactNode',                                         required: false, description: 'Button content.' },
      { name: 'variant',       type: "'default'|'danger'|'success'|'warning'|'link'",     required: false, default: "'default'", description: 'Color variant.' },
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                              required: false, default: "'md'",      description: 'Size.' },
      { name: 'leadingIcon',   type: 'ReactNode',                                         required: false, default: 'undefined', description: 'Icon to the left of the text.' },
      { name: 'trailingIcon',  type: 'ReactNode',                                         required: false, default: 'undefined', description: 'Icon to the right of the text.' },
      { name: 'iconOnly',      type: 'boolean',                                           required: false, default: 'false',     description: 'Square icon-only button.' },
      { name: 'fullWidth',     type: 'boolean',                                           required: false, default: 'false',     description: 'Stretches the button to full width.' },
      { name: 'loading',       type: 'boolean',                                           required: false, default: 'false',     description: 'Shows a spinner and blocks clicks.' },
      { name: 'disabled',      type: 'boolean',                                           required: false, default: 'false',     description: 'Disables the button.' },
    ],
    relatedSlugs: ['donjon-button', 'button-group', 'modal'],
  },

  'card': {
    description: 'Container card with an octagonal frame. Optional header (title + description), body, and footer. DonjonCard extends with SideOrnament and HexOrnament.',
    status: 'documented',
    showcaseRoute: '/cards',
    props: [
      { name: 'children',    type: 'ReactNode',                             required: false, description: 'Card body content.' },
      { name: 'title',       type: 'string',                                required: false, default: 'undefined', description: 'Header title.' },
      { name: 'description', type: 'string',                                required: false, default: 'undefined', description: 'Header subtitle.' },
      { name: 'footer',      type: 'ReactNode',                             required: false, default: 'undefined', description: 'Footer content — typically action buttons.' },
      { name: 'variant',     type: "'default'|'danger'|'success'",          required: false, default: "'default'", description: 'Color variant of the frame and header.' },
    ],
    relatedSlugs: ['donjon-card', 'modal', 'button'],
  },

  'input': {
    description: 'Text input field with an octagonal frame. Label, hint, error state, leading/trailing icons. DonjonInput is a visually identical re-export.',
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'label',        type: 'string',                               required: false, description: 'Field label — shown above the field.' },
      { name: 'value',        type: 'string',                               required: true,  description: 'Current field value.' },
      { name: 'onChange',     type: '(e: ChangeEvent) => void',             required: true,  description: 'Value change handler.' },
      { name: 'placeholder',  type: 'string',                               required: false, default: 'undefined', description: 'Placeholder text.' },
      { name: 'size',         type: "'xs'|'sm'|'md'|'lg'",                      required: false, default: "'md'",      description: 'Field height.' },
      { name: 'leadingIcon',  type: 'ReactNode',                            required: false, default: 'undefined', description: 'Icon on the left inside the field.' },
      { name: 'trailingIcon', type: 'ReactNode',                            required: false, default: 'undefined', description: 'Icon on the right inside the field.' },
      { name: 'error',        type: 'string',                               required: false, default: 'undefined', description: 'Error message — paints the frame red.' },
      { name: 'hint',         type: 'string',                               required: false, default: 'undefined', description: 'Hint below the field (grey, no error state).' },
      { name: 'disabled',     type: 'boolean',                              required: false, default: 'false',     description: 'Disables the field.' },
    ],
    relatedSlugs: ['donjon-input', 'select', 'button'],
  },

  'tabs': {
    description: 'Horizontal tab navigation. The underline variant suits main navigation, pills suits in-panel navigation. Supports icons, badge counts, disabled tabs and keyboard arrows.',
    status: 'documented',
    showcaseRoute: '/tabs',
    props: [
      { name: 'items',       type: 'Array<{value, label, icon?, badge?, disabled?, closable?}>',  required: true,  description: 'Tab list. closable: true shows × when onClose is provided.' },
      { name: 'value',       type: 'string',                                                   required: true,  description: 'Value of the active tab.' },
      { name: 'onChange',    type: '(value: string) => void',                                 required: true,  description: 'Callback when the tab changes.' },
      { name: 'variant',     type: "'underline'|'pills'",                                    required: false, default: "'underline'", description: 'Visual style.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",                                         required: false, default: "'md'",        description: 'Tab size.' },
      { name: 'orientation', type: "'horizontal'|'vertical'",                                required: false, default: "'horizontal'", description: 'Layout — horizontal (default) or vertical sidebar-style.' },
      { name: 'onClose',     type: '(value: string) => void',                                 required: false, description: 'Callback to close a tab. Activates the × icon on items with closable: true.' },
    ],
    relatedSlugs: ['button-group', 'donjon-card', 'modal'],
  },

  'notch-menu': {
    description: 'Panel with V-shaped notched cutouts along the top edge. Each notch holds an Item — either a tab (controlled via parent value/onChange) or a standalone action (onClick). Compound API: `<NotchMenu><NotchMenu.Item>...</NotchMenu.Item><NotchMenu.Body>...</NotchMenu.Body></NotchMenu>`. Items with a `value` prop behave as tabs; items without it are actions.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'tabs',
    differencesFromBase: [
      'Visual: trapezoid tabs with V-notches between items, integrated body panel below',
      'Compound API (NotchMenu.Item + NotchMenu.Body) instead of items prop array',
      'Mixed tabs + standalone actions in one row — driven by presence of `value`',
    ],
    status: 'documented',
    showcaseRoute: '/notch-menu',
    props: [
      { name: 'value',    type: 'string | null',                       required: false, default: 'null',   description: 'Active tab value. Required only when at least one Item has a `value` (tab mode).' },
      { name: 'onChange', type: '(value: string) => void',             required: false, description: 'Callback fired when the user clicks a tab Item. Required for tab mode.' },
      { name: 'size',     type: "'xs'|'sm'|'md'|'lg'",                 required: false, default: "'md'",   description: 'Item height + padding + font size. Mirrors ButtonGroup so the two compose visually.' },
      { name: 'dividers', type: 'boolean',                              required: false, default: 'true',   description: '1px vertical dividers between adjacent items.' },
      { name: 'children', type: 'NotchMenu.Item[] + NotchMenu.Body?',  required: true,  description: 'Compound API. Items render in the chevron banner; a single Body renders the content panel below.' },
    ],
    relatedSlugs: ['button-group', 'tabs', 'donjon-notch-menu'],
  },

  'donjon-notch-menu': {
    description: 'Game variant of NotchMenu — gold-bordered chevron banner with DonjonButtonGroup-styled items (gold gradient on active, uppercase gradient text). Same compound API as NotchMenu.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'notch-menu',
    differencesFromBase: [
      'Items use DonjonButtonGroup styling: gold gradient on active, bgInactive→bg2 gradient on inactive',
      'Uppercase labels with gradient text on the active item',
      'Gold border on the banner + soft gold glow',
      'Wider chevron tips (h × 0.5) for a more dramatic banner silhouette',
    ],
    status: 'documented',
    showcaseRoute: '/notch-menu',
    props: [
      { name: 'value',    type: 'string | null',                                       required: false, default: 'null',         description: 'Active tab value.' },
      { name: 'onChange', type: '(value: string) => void',                             required: false, description: 'Tab-change callback.' },
      { name: 'size',     type: "'xs'|'sm'|'md'|'lg'",                                 required: false, default: "'md'",         description: 'Item height + padding + font size. Mirrors DonjonButtonGroup.' },
      { name: 'dividers', type: 'boolean',                                              required: false, default: 'true',         description: '1px goldDim dividers between adjacent items.' },
      { name: 'ornament', type: "'decorated'|'plain'",                                  required: false, default: "'decorated'",  description: 'Item ornaments. `decorated` adds SideOrnament on outer ends + HexOrnament line on top/bottom of every item. `plain` skips them.' },
      { name: 'children', type: 'DonjonNotchMenu.Item[] + DonjonNotchMenu.Body?',      required: true,  description: 'Items + optional Body.' },
    ],
    relatedSlugs: ['notch-menu', 'donjon-button-group', 'donjon-tabs'],
  },

  'select': {
    description: 'Custom dropdown for picking a single value from a list. Octagonal trigger, arrow-key and Escape keyboard navigation, support for disabled items.',
    status: 'documented',
    showcaseRoute: '/select',
    props: [
      { name: 'value',       type: 'string | null',                                        required: true,  description: 'Selected value.' },
      { name: 'onChange',    type: '(value: string) => void',                              required: true,  description: 'Callback on selection.' },
      { name: 'options',     type: 'Array<{value, label, disabled?}>',                    required: true,  description: 'Option list.' },
      { name: 'placeholder', type: 'string',                                               required: false, default: "'Select an option…'", description: 'Empty-state text.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Label above the trigger.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",                                      required: false, default: "'md'",      description: 'Trigger height.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'",              required: false, default: "'default'", description: 'Color variant.' },
      { name: 'disabled',    type: 'boolean',                                              required: false, default: 'false',     description: 'Disables the entire select.' },
    ],
    relatedSlugs: ['donjon-input', 'button-group', 'toggle'],
  },

  'slider': {
    description: 'Range input for picking a value within a range. Native <input type=range> overlaid by custom visuals continuing from ProgressBar. formatValue support for units.',
    status: 'documented',
    showcaseRoute: '/slider',
    props: [
      { name: 'value',       type: 'number',                                               required: true,  description: 'Current value.' },
      { name: 'onChange',    type: '(value: number) => void',                             required: true,  description: 'Change callback.' },
      { name: 'min',         type: 'number',                                               required: false, default: '0',         description: 'Minimum value.' },
      { name: 'max',         type: 'number',                                               required: false, default: '100',        description: 'Maximum value.' },
      { name: 'step',        type: 'number',                                               required: false, default: '1',         description: 'Change step.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",                                      required: false, default: "'md'",       description: 'Track height.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'|'info'",       required: false, default: "'default'",  description: 'Color variant.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Label above the slider.' },
      { name: 'showValue',   type: 'boolean',                                              required: false, default: 'false',      description: 'Shows the current value on the right.' },
      { name: 'formatValue', type: '(value: number) => string',                           required: false, description: 'Formats the displayed value (e.g. appends a unit).' },
      { name: 'disabled',    type: 'boolean',                                              required: false, default: 'false',      description: 'Disables interaction.' },
    ],
    relatedSlugs: ['progress-bar', 'toggle', 'donjon-input'],
  },

  'progress-bar': {
    description: 'Linear progress indicator. Determinate (value 0–100) or indeterminate (animated shimmer). Five variants, three sizes, optional label and percentage.',
    status: 'documented',
    showcaseRoute: '/progress-bar',
    props: [
      { name: 'value',         type: 'number',                                                    required: false, default: '0',         description: 'Current value (0 to max).' },
      { name: 'max',           type: 'number',                                                    required: false, default: '100',        description: 'Maximum value.' },
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                                           required: false, default: "'md'",       description: 'Bar height (4 / 8 / 14 px).' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'|'info'",            required: false, default: "'default'",  description: 'Fill color variant.' },
      { name: 'label',         type: 'string',                                                    required: false, description: 'Label above the bar (also aria-label).' },
      { name: 'showValue',     type: 'boolean',                                                   required: false, default: 'false',      description: 'Shows the percentage value to the right above the bar.' },
      { name: 'indeterminate', type: 'boolean',                                                   required: false, default: 'false',      description: 'Animated shimmer for unknown progress.' },
    ],
    relatedSlugs: ['toggle', 'donjon-badge', 'toast'],
  },

  'toggle': {
    description: 'On/off switch for binary settings with immediate effect. Pill shape, animated thumb, full keyboard accessibility. Four variants and two sizes.',
    status: 'documented',
    showcaseRoute: '/toggle',
    props: [
      { name: 'checked',       type: 'boolean',                                           required: true,  description: 'Current toggle state.' },
      { name: 'onChange',      type: '(value: boolean) => void',                          required: true,  description: 'Callback when the state changes.' },
      { name: 'label',         type: 'string',                                            required: false, description: 'Text label next to the toggle.' },
      { name: 'labelPosition', type: "'right'|'left'",                                   required: false, default: "'right'",   description: 'Label position relative to the toggle.' },
      { name: 'size',          type: "'sm'|'md'",                                        required: false, default: "'md'",      description: 'Toggle size.' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'",           required: false, default: "'default'", description: 'Color variant of the active state.' },
      { name: 'disabled',      type: 'boolean',                                           required: false, default: 'false',     description: 'Disables interaction.' },
      { name: 'id',            type: 'string',                                            required: false, description: 'HTML id for binding to an external <label>.' },
    ],
    relatedSlugs: ['button-group', 'donjon-input', 'modal'],
  },

  'toast': {
    description: 'Floating notifications for short-lived messages. Auto-closes after duration elapses. Global state is managed by ToastProvider and accessed via the useToast hook. A11y: role="alert"+assertive for danger/warning, role="status"+polite for default/success.',
    status: 'documented',
    showcaseRoute: '/toast',
    props: [
      { name: 'title',    type: 'string',                                                    required: false, description: '[addToast] Notification title.' },
      { name: 'message',  type: 'string',                                                    required: false, description: '[addToast] Message body.' },
      { name: 'variant',  type: "'default'|'success'|'danger'|'warning'|'info'",            required: false, default: "'default'", description: '[addToast] Color variant.' },
      { name: 'duration', type: 'number',                                                    required: false, default: '4000',      description: '[addToast] Time in ms until auto-close. 0 = persistent.' },
      { name: 'position', type: "'bottom-right'|'top-right'|'bottom-left'|'top-left'",      required: false, default: "'bottom-right'", description: '[ToastProvider] Stack position on screen.' },
      { name: 'children', type: 'ReactNode',                                                 required: true,  description: '[ToastProvider] App content — the hook is available inside.' },
    ],
    relatedSlugs: ['modal', 'donjon-badge', 'float-feedback'],
  },

  'modal': {
    description: 'Modal dialog with focus trap, Escape close, and locked scroll. Shares the visual style with DonjonCard — octagonal border, ornaments, color variants.',
    status: 'documented',
    showcaseRoute: '/modal',
    props: [
      { name: 'isOpen',          type: 'boolean',                                           required: true,  description: 'Controls the modal visibility.' },
      { name: 'onClose',         type: '() => void',                                        required: true,  description: 'Close callback — invoked by Escape, the backdrop, and the close button.' },
      { name: 'title',           type: 'string',                                            required: false, description: 'Header title. When omitted, the header is not rendered.' },
      { name: 'description',     type: 'string',                                            required: false, description: 'Subtitle below the title.' },
      { name: 'children',        type: 'ReactNode',                                         required: false, description: 'Modal body content.' },
      { name: 'footer',          type: 'ReactNode',                                         required: false, description: 'Footer content — typically buttons.' },
      { name: 'size',            type: "'sm'|'md'|'lg'",                                   required: false, default: "'md'",      description: 'Maximum panel width (sm=360, md=480, lg=640).' },
      { name: 'variant',         type: "'default'|'danger'|'success'|'warning'",           required: false, default: "'default'", description: 'Color variant — border, header, title.' },
      { name: 'closeOnBackdrop', type: 'boolean',                                           required: false, default: 'true',      description: 'Backdrop click closes the modal.' },
      { name: 'closeOnEscape',   type: 'boolean',                                           required: false, default: 'true',      description: 'The Escape key closes the modal.' },
      { name: 'showCloseButton', type: 'boolean',                                           required: false, default: 'true',      description: 'Shows the × button in the header (or in the body when title is absent).' },
    ],
    relatedSlugs: ['donjon-card', 'donjon-button', 'tooltip'],
  },

  'donjon-modal': {
    description: 'Game variant of Modal — extends the TkajUI Modal with SideOrnament and HexOrnament decoration in the header, body and footer. Now also supports a plain gold-frame mode without ornaments.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'modal',
    differencesFromBase: [
      'Ornamental shell — SideOrnament on the sides, HexOrnament in the header and footer',
      'Plain mode (`ornament="plain"`) — gold frame without ornaments for denser layouts',
      'Donjon palette — gold border, warm parchment bg2 instead of cool surface2',
    ],
    status: 'documented',
    showcaseRoute: '/modal',
    props: [
      { name: 'isOpen',          type: 'boolean',                                           required: true,  description: 'Controls the modal visibility.' },
      { name: 'onClose',         type: '() => void',                                        required: true,  description: 'Close callback.' },
      { name: 'title',           type: 'string',                                            required: false, description: 'Header title.' },
      { name: 'description',     type: 'string',                                            required: false, description: 'Subtitle below the title.' },
      { name: 'children',        type: 'ReactNode',                                         required: false, description: 'Modal body content.' },
      { name: 'footer',          type: 'ReactNode',                                         required: false, description: 'Footer content.' },
      { name: 'size',            type: "'sm'|'md'|'lg'",                                   required: false, default: "'md'",      description: 'Maximum panel width.' },
      { name: 'variant',         type: "'default'|'danger'|'success'|'warning'",           required: false, default: "'default'", description: 'Color variant.' },
      { name: 'ornament',        type: "'decorated'|'plain'",                              required: false, default: "'decorated'", description: 'Visual mode of the donjon shell — with or without ornaments.' },
      { name: 'closeOnBackdrop', type: 'boolean',                                           required: false, default: 'true',      description: 'Backdrop click closes the modal.' },
      { name: 'closeOnEscape',   type: 'boolean',                                           required: false, default: 'true',      description: 'Escape closes the modal.' },
      { name: 'showCloseButton', type: 'boolean',                                           required: false, default: 'true',      description: 'Shows the × button in the header.' },
    ],
    relatedSlugs: ['modal', 'donjon-card', 'donjon-button'],
  },

  'tooltip': {
    description: 'Contextual hint shown on hover or focus. Supports 4 placement directions, 5 color variants, and an optional title.',
    status: 'documented',
    showcaseRoute: '/tooltip',
    props: [
      { name: 'children',   type: 'ReactNode',                                         required: true,  description: 'Trigger element — the tooltip appears on its hover/focus.' },
      { name: 'content',    type: 'string',                                            required: true,  description: 'Tooltip bubble text.' },
      { name: 'title',      type: 'string',                                            required: false, description: 'Optional title above the content.' },
      { name: 'placement',  type: "'top'|'bottom'|'left'|'right' + '-start'|'-end'",  required: false, default: "'top'",     description: '12 values: 4 sides × 3 alignments (default/-start/-end).' },
      { name: 'variant',    type: "'default'|'danger'|'success'|'warning'|'info'",    required: false, default: "'default'", description: 'Color variant.' },
      { name: 'delay',      type: 'number',                                            required: false, default: '120',       description: 'Show delay in ms.' },
      { name: 'disabled',   type: 'boolean',                                           required: false, default: 'false',     description: 'Disables tooltip rendering.' },
      { name: 'autoFlip',   type: 'boolean',                                           required: false, default: 'true',      description: 'Automatically flip to the opposite side when the tooltip would overflow the viewport.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-badge', 'float-feedback'],
  },

  'donjon-button': {
    description: 'Primary action element of the design system. Six color variants (default/primary/danger/success/warning/link), four sizes, icon modes, and loading / disabled state. Also supports a plain gold-frame mode without ornaments.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'button',
    differencesFromBase: [
      'Larger octagon cornerSize (12 vs 8) — bolder game silhouette',
      '4 ornaments (SideOrnament + ZkosenOrnament + RohOrnament + HexOrnament) in decorated mode',
      'Plain mode (`ornament="plain"`) — outer-wrapper octagon border trick instead of a CSS border',
      'Donjon palette — gold gradient instead of accent blue',
      '`primary` variant — solid gold fill (higher visual weight than the default gradient)',
      '`link` variant — text-only button without a shell/ornaments, underline on hover',
      '`warning` variant — parity with TkajUI Button.warning',
    ],
    status: 'documented',
    showcaseRoute: '/buttons',
    props: [
      { name: 'children',     type: 'ReactNode',                                                          required: false, description: 'Button content — text or ReactNode.' },
      { name: 'variant',      type: "'default'|'primary'|'danger'|'success'|'warning'|'link'",            required: false, default: "'default'", description: 'Color variant. `primary` = solid gold fill, `link` = text-only button without a shell. Parity with TkajUI Button.' },
      { name: 'size',         type: "'xs'|'sm'|'md'|'lg'",                     required: false, default: "'md'",      description: 'Button size.' },
      { name: 'ornament',     type: "'decorated'|'plain'",                     required: false, default: "'decorated'", description: 'Visual mode of the donjon shell — with or without ornaments.' },
      { name: 'leadingIcon',  type: 'ReactNode',                               required: false, description: 'Icon before the text.' },
      { name: 'trailingIcon', type: 'ReactNode',                               required: false, description: 'Icon after the text.' },
      { name: 'iconOnly',     type: 'boolean',                                 required: false, default: 'false',     description: 'Hides the text and shows only the icon.' },
      { name: 'fullWidth',    type: 'boolean',                                 required: false, default: 'false',     description: 'Stretches the button to the parent full width.' },
      { name: 'loading',      type: 'boolean',                                 required: false, default: 'false',     description: 'Shows a spinner and blocks clicks.' },
      { name: 'disabled',     type: 'boolean',                                 required: false, default: 'false',     description: 'Disables the button.' },
      { name: 'onClick',      type: '() => void',                              required: false, description: 'Click handler.' },
      { name: 'className',    type: 'string',                                  required: false, description: 'Additional Tailwind classes.' },
    ],
    relatedSlugs: ['button-group', 'donjon-card', 'donjon-input'],
  },

  'button-group': {
    description: 'Segmented control — picks a single value from a fixed list of options. Used for action selection, tabs and filters.',
    status: 'documented',
    showcaseRoute: '/button-groups',
    props: [
      { name: 'items',    type: 'Array<{value: string, label: string, icon?: ReactNode}>', required: true,  description: 'List of toggleable options.' },
      { name: 'value',    type: 'string',                                                  required: true,  description: 'Currently selected value.' },
      { name: 'onChange', type: '(value: string) => void',                                 required: true,  description: 'Callback when the selection changes.' },
      { name: 'variant',  type: "'default'|'tabs'",                                        required: false, default: "'default'", description: 'Group visual style.' },
      { name: 'size',     type: "'sm'|'md'",                                               required: false, default: "'md'",      description: 'Group size.' },
      { name: 'dividers', type: 'boolean',                                                 required: false, default: 'false',     description: 'Shows dividers between items.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-card'],
  },

  'donjon-button-group': {
    description: 'Game variant of ButtonGroup — extends the TkajUI ButtonGroup with SideOrnament and HexOrnament decoration. Now also supports a plain gold-frame mode without ornaments.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'button-group',
    differencesFromBase: [
      'Shared SideOrnament + HexOrnament ornaments across the group',
      'Variants `menu` and `tabs` — game context (action vs navigation)',
      'Plain mode (`ornament="plain"`) — outer-wrapper octagon border without ornaments',
    ],
    status: 'documented',
    showcaseRoute: '/button-groups',
    props: [
      { name: 'items',    type: 'Array<{value, label, icon?}>', required: true,  description: 'List of toggleable options.' },
      { name: 'value',    type: 'string',                       required: true,  description: 'Currently selected value.' },
      { name: 'onChange', type: '(value: string) => void',      required: true,  description: 'Callback when the selection changes.' },
      { name: 'variant',  type: "'menu'|'tabs'",                required: false, default: "'menu'", description: 'Group visual style.' },
      { name: 'ornament', type: "'decorated'|'plain'",          required: false, default: "'decorated'", description: 'Visual mode of the donjon shell — with or without ornaments.' },
      { name: 'size',     type: "'xs'|'sm'|'md'|'lg'",         required: false, default: "'md'",   description: 'Group size.' },
      { name: 'dividers', type: 'boolean',                      required: false, default: 'false',  description: 'Shows dividers between items.' },
    ],
    relatedSlugs: ['button-group', 'donjon-button', 'donjon-card'],
  },

  'donjon-input': {
    description: 'Text input field for forms. Supports label, hint, error state, icons and a disabled state.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'input',
    differencesFromBase: [
      'Octagon shape with a larger cornerSize — the game visual signature',
      'Gold focus ring + warm placeholder color (`textLow` from the donjon palette)',
      'Variant-gradient header for `danger`/`success` states',
    ],
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'label',       type: 'string',                     required: false, description: 'Field description shown above the input.' },
      { name: 'value',       type: 'string',                     required: true,  description: 'Controlled field value.' },
      { name: 'onChange',    type: '(value: string) => void',    required: true,  description: 'Callback when the value changes.' },
      { name: 'placeholder', type: 'string',                     required: false, description: 'Placeholder text shown in an empty field.' },
      { name: 'leadingIcon', type: 'ReactNode',                  required: false, description: 'Icon on the left inside the field.' },
      { name: 'trailingIcon',type: 'ReactNode',                  required: false, description: 'Icon on the right inside the field.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",             required: false, default: "'md'",    description: 'Field size.' },
      { name: 'cornerSize',  type: 'number',                     required: false, description: 'Corner-cut override in px (otherwise derived from size). Unified with octagon/ScoopClip.' },
      { name: 'error',       type: 'string',                     required: false, description: 'Error message — renders the field in the error state.' },
      { name: 'hint',        type: 'string',                     required: false, description: 'Helper text below the field.' },
      { name: 'disabled',    type: 'boolean',                    required: false, default: 'false',   description: 'Disables editing.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-card'],
  },

  'donjon-badge': {
    description: 'Game badge with a hexagonal shape and glow effect. Visually different from TkajUI Badge — native game variants (gain/loss/event/warning/magic), diamond indicator instead of a circle.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/badges',
    props: [
      { name: 'children', type: 'ReactNode',                                                                              required: false, description: 'Badge text or content.' },
      { name: 'variant',  type: "'default'|'gain'|'loss'|'event'|'warning'|'magic'|'muted'|'success'|'danger'|'info'|'primary'", required: false, default: "'default'", description: 'Game variant. Backward-compat: success=gain, danger=loss, info=infoColor, primary=event.' },
      { name: 'size',     type: "'sm'|'md'",                                                                              required: false, default: "'md'",      description: 'Badge size.' },
      { name: 'dot',      type: 'boolean',                                                                                required: false, default: 'false',     description: 'Shows a heraldic diamond on the left.' },
      { name: 'icon',     type: 'ReactNode',                                                                              required: false, description: 'SVG icon to the left of the text — alternative to dot.' },
    ],
    relatedSlugs: ['donjon-card', 'float-feedback', 'badge'],
  },

  'donjon-card': {
    description: 'Container for grouped content. Fixed header–body–footer structure and color variants for different contexts. Now also supports a plain gold-frame mode without ornaments.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'card',
    differencesFromBase: [
      'Ornamental shell — SideOrnament + ZkosenOrnament + RohOrnament + HexOrnament',
      'Plain mode (`ornament="plain"`) — gold frame without ornaments',
      'Variant-gradient header (`VARIANT_HEADER_BG`) instead of solid bg',
    ],
    status: 'documented',
    showcaseRoute: '/cards',
    props: [
      { name: 'children',    type: 'ReactNode',                              required: false, description: 'Card body content.' },
      { name: 'title',       type: 'string',                                 required: false, description: 'Card header title.' },
      { name: 'description', type: 'string',                                 required: false, description: 'Subtitle in the card header.' },
      { name: 'footer',      type: 'ReactNode',                              required: false, description: 'Footer content — typically buttons.' },
      { name: 'ornament',    type: "'decorated'|'plain'",                    required: false, default: "'decorated'", description: 'Visual mode of the donjon shell — with or without ornaments.' },
      { name: 'variant',     type: "'default'|'danger'|'success'|'warning'", required: false, default: "'default'", description: 'Color variant affects the border and background.' },
    ],
    relatedSlugs: ['donjon-badge', 'donjon-button', 'donjon-input'],
  },

  'ornaments': {
    description: 'Internal set of shared decorative elements — side ornament and hex frame. Used inside other components, not as a standalone API.',
    status: 'documented',
    showcaseRoute: '/ornaments',
    props: [
      // SideOrnament
      { name: 'h',          type: 'number',  required: false, description: '[SideOrnament] Ornament height in px.' },
      { name: 'uid',        type: 'string',  required: true,  description: '[SideOrnament / HexOrnament] Unique ID for the SVG gradient.' },
      { name: 'flip',       type: 'boolean', required: false, default: 'false', description: '[SideOrnament / HexOrnament] Flips the ornament horizontally.' },
      // HexOrnament extra
      { name: 'edgePadL',   type: 'number',  required: false, description: '[HexOrnament] Left-edge inset.' },
      { name: 'edgePadR',   type: 'number',  required: false, description: '[HexOrnament] Right-edge inset.' },
      { name: 'textPadL',   type: 'number',  required: false, description: '[HexOrnament] Inner left text padding.' },
      { name: 'textPadR',   type: 'number',  required: false, description: '[HexOrnament] Inner right text padding.' },
      { name: 'hexOffsetX', type: 'number',  required: false, description: '[HexOrnament] Horizontal offset of the hex motif.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-badge'],
  },

  'submit-button': {
    description: 'Form submit wrapper around the Button component. Automatically reads the pending state of the parent form via React 19 useFormStatus and switches the button into loading mode without manual state management.',
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'children',      type: 'ReactNode',                                         required: false, default: "'Odeslat'", description: 'Default button content outside the pending state.' },
      { name: 'loadingLabel',  type: 'string',                                            required: false, description: 'Text shown during the pending state in place of children.' },
      { name: 'variant',       type: "'default'|'danger'|'success'|'warning'|'link'",    required: false, default: "'default'", description: 'Variant forwarded to the underlying Button.' },
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                              required: false, default: "'md'",      description: 'Button size.' },
      { name: 'leadingIcon',   type: 'ReactNode',                                         required: false, description: 'Icon to the left of the text.' },
      { name: 'trailingIcon',  type: 'ReactNode',                                         required: false, description: 'Icon to the right of the text.' },
      { name: 'iconOnly',      type: 'boolean',                                           required: false, default: 'false',     description: 'Square icon-only mode.' },
      { name: 'fullWidth',     type: 'boolean',                                           required: false, default: 'false',     description: 'Stretches the button to the parent full width.' },
      { name: 'disabled',      type: 'boolean',                                           required: false, default: 'false',     description: 'Disables the button even outside the pending state.' },
      { name: 'className',     type: 'string',                                            required: false, description: 'Additional CSS classes passed to Button.' },
    ],
    relatedSlugs: ['button', 'input', 'donjon-button'],
  },

  /* ── Game Assets ───────────────────────────────────────────────────── */

  'erb': {
    description: 'Heraldic player identity — a shield with color and an optional symbol (I–VI). Two shapes: erb (fixed proportions, square top + tapered tip) and prapor (banner with a fixed tip and variable length). The Shield component is for the game UI, PlayerIdentityBadge for scoreboards and the HUD.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/erb',
    props: [
      { name: 'player',      type: '{ color: string, label: string, id?: number }', required: false, description: 'Player object — color, label, ID (1–6). Alternative to playerColor.' },
      { name: 'playerColor', type: 'string',                                         required: false, description: 'Direct player color (#hex) — takes precedence over player.color.' },
      { name: 'shape',       type: "'erb'|'prapor'",                                required: false, default: "'erb'",  description: 'Shape: erb = classic shield with fixed proportions. prapor = banner with a fixed tip and variable length (via width + height).' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'|number",                    required: false, default: "'md'",  description: 'Named size or pixel width (24–96 px). Used only for shape="erb".' },
      { name: 'width',       type: 'number',                                         required: false, default: '32',   description: 'Width in px for shape="prapor". The tip scales with width (28.9 %).' },
      { name: 'height',      type: 'number',                                         required: false, default: '120',  description: 'Length in px for shape="prapor". The tip has a fixed size relative to width; the rest of the body scales freely.' },
      { name: 'showSymbol',  type: 'boolean',                                         required: false, default: 'true', description: 'Shows the Roman numeral inside the shield (I–VI per player.id). For prapor it is aligned to the top.' },
      { name: 'ornament',      type: "'plain'|'decorated'",                          required: false, default: "'plain'", description: 'Decorative mode — turns on HexOrnament on the top edge and HrotErbu below the bottom tip. Hidden for size < 30 px.' },
      { name: 'ornamentColor', type: "'gold'|'player'",                              required: false, default: "'gold'",  description: 'Ornament color — gold (classic heraldic gold) or player (derived from player.color with alpha fade).' },
    ],
    relatedSlugs: ['hex-tile', 'die-face', 'donjon-badge', 'ornaments'],
  },

  'hex-tile': {
    description: 'Hexagonal tile of the game map. Three orthogonal props: `property` describes what the cell IS on the board (empty / focal / base), `focal` is a game-state sub-axis for focal cells (active / passive — independent of selection), `state` describes how the player is currently interacting with it (default / selected / move / attack / blocked). Legacy combined `state` strings (focal-active / focal-passive / empty / base / selected / move / attack / blocked) still work for backward compat.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/hexagon',
    props: [
      { name: 'property',  type: "'empty'|'focal'|'base'",                              required: false, default: "'empty'",   description: 'Cell role on the board.' },
      { name: 'focal',     type: "'active'|'passive'",                                  required: false, default: "'passive'", description: 'Focal sub-state. Only used when property="focal" — driven by game logic, independent of selection.' },
      { name: 'state',     type: "'default'|'selected'|'move'|'attack'|'blocked'",      required: false, default: "'default'", description: 'Interaction state. Also accepts legacy values: `empty`/`base`/`focal-active`/`focal-passive` — they imply property/focal/state.' },
      { name: 'owner',     type: 'string',                                              required: false, description: 'Player color (#hex) — required when property="base".' },
      { name: 'size',      type: "'sm'|'md'|'lg'",                                      required: false, default: "'md'",      description: 'Hex size.' },
      { name: 'label',     type: 'string',                                              required: false, description: 'Label rendered inside the hex.' },
      { name: 'showLabel', type: 'boolean',                                             required: false, default: 'false',     description: 'Shows the label even without hovering.' },
    ],
    relatedSlugs: ['die-face', 'float-feedback'],
  },

  'die-face': {
    description: 'Visual representation of a single D6 die — shows values 1–6, the player color, and state modes (selected, rerolled).',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/dice',
    props: [
      { name: 'value',       type: 'number (1–6)',            required: true,  description: 'Die value.' },
      { name: 'playerColor', type: 'string (#hex)',           required: true,  description: 'Player color — tints the die.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",    required: false, default: "'md'", description: 'Die size.' },
      { name: 'state',       type: "'default'|'selected'|'rerolled'", required: false, default: "'default'", description: 'Die visual state.' },
    ],
    relatedSlugs: ['hex-tile', 'float-feedback'],
  },

  'float-feedback': {
    description: 'Short floating feedback showing a game event (VP gain, destruction, combat). Animates in and then disappears.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/float-feedback',
    props: [
      { name: 'text',     type: 'string',                              required: true,  description: 'Feedback text (e.g. "+1 VP").' },
      { name: 'variant',  type: "'default'|'danger'|'success'|'warning'", required: false, default: "'default'", description: 'Color variant.' },
      { name: 'visible',  type: 'boolean',                             required: true,  description: 'Triggers rendering and the animation.' },
      { name: 'animKey',  type: 'string | number',                     required: false, description: 'Changing the key restarts the animation.' },
      { name: 'onDone',   type: '() => void',                          required: false, description: 'Callback when the animation finishes.' },
      { name: 'style',    type: 'CSSProperties',                       required: false, description: 'Additional inline styles for positioning.' },
    ],
    relatedSlugs: ['hex-tile', 'donjon-badge'],
  },

  'action-tile': {
    description: 'Clickable action tile for game menus and turn choices. Combines an icon, title, optional description and cost badge in a single compact tile. Within the donjon system it acts as the reference plain tile without an ornamental layer.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/action-tile',
    props: [
      { name: 'icon',        type: 'ReactNode',                                        required: true,  description: 'Action icon at the top of the tile.' },
      { name: 'title',       type: 'string',                                           required: true,  description: 'Action title (also used as the aria-label).' },
      { name: 'description', type: 'string',                                           required: false, description: 'Short supporting text under the title.' },
      { name: 'cost',        type: 'number',                                           required: false, description: 'Action cost displayed in the bottom-right corner.' },
      { name: 'selected',    type: 'boolean',                                          required: false, default: 'false',     description: 'Highlights the tile as actively selected.' },
      { name: 'disabled',    type: 'boolean',                                          required: false, default: 'false',     description: 'Blocks clicks and dims the visual.' },
      { name: 'locked',      type: 'boolean',                                          required: false, default: 'false',     description: 'Shows a locked state and blocks interaction without the disabled style.' },
      { name: 'onClick',     type: '() => void',                                       required: false, description: 'Callback when an unlocked tile is clicked.' },
      { name: 'size',        type: "'sm'|'md'|'lg'",                                  required: false, default: "'md'",    description: 'Tile size.' },
      { name: 'variant',     type: "'default'|'attack'|'move'|'special'",             required: false, default: "'default'", description: 'Action color and semantic type.' },
      { name: 'ornament',    type: "'plain'|'decorated'",                              required: false, default: "'decorated'", description: 'Decorated adds SideOrnament brackets and an octagon shell (default), plain is the baseline tile.' },
      { name: 'style',       type: 'CSSProperties',                                    required: false, description: 'Inline styles for layout fine-tuning.' },
      { name: 'className',   type: 'string',                                           required: false, description: 'Additional CSS classes.' },
    ],
    relatedSlugs: ['player-panel', 'event-log', 'float-feedback'],
  },

  'event-log': {
    description: 'Scrollable list of game events with a type icon, optional round, and automatic scroll to the newest entry. The default mode is plain; optionally renders a decorated donjon shell.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/event-log',
    props: [
      { name: 'events',       type: 'Array<{ id?, type?, text, detail?, round? }>',    required: false, default: '[]',                 description: 'List of logged events in order from oldest to newest.' },
      { name: 'maxHeight',    type: 'number',                                           required: false, default: '280',                description: 'Maximum scroll area height in px.' },
      { name: 'title',        type: 'string',                                           required: false, default: "'Game log'",      description: 'Component header title.' },
      { name: 'showTitle',    type: 'boolean',                                          required: false, default: 'true',               description: 'Shows or hides the header with the title and the entry count.' },
      { name: 'showRound',    type: 'boolean',                                          required: false, default: 'true',               description: 'Shows the round number next to each entry.' },
      { name: 'autoScroll',   type: 'boolean',                                          required: false, default: 'true',               description: 'After events change, automatically scrolls the list to the end.' },
      { name: 'ornament',     type: "'plain'|'decorated'",                              required: false, default: "'decorated'",        description: 'Visual mode of the log shell — decorated donjon panel (default) or plain baseline.' },
      { name: 'emptyMessage', type: 'string',                                           required: false, default: "'No events yet.'", description: 'Text for the empty state when there are no entries.' },
      { name: 'showFilters',  type: 'boolean',                                          required: false, default: 'false',              description: 'Shows type filter chips in the header (gain/loss/event/warning/system).' },
      { name: 'showSearch',   type: 'boolean',                                          required: false, default: 'false',              description: 'Shows a search input in the header — fulltext across text and detail.' },
      { name: 'groupByRound', type: 'boolean',                                          required: false, default: 'false',              description: 'Groups events by the round field with a "Round N" header.' },
      { name: 'renderEvent',  type: '(entry, defaultRender) => ReactNode',              required: false, description: 'Custom renderer for an individual event. The second argument is the default JSX fallback.' },
      { name: 'style',        type: 'CSSProperties',                                    required: false, description: 'Inline styles on the wrapping container.' },
      { name: 'className',    type: 'string',                                           required: false, description: 'Additional CSS classes on the wrapping container.' },
    ],
    relatedSlugs: ['float-feedback', 'action-tile', 'resource-bar'],
  },

  'numeric-display': {
    description: 'Numeric game counter for VP, HP, mana or resources. Within the donjon system it serves as the reference plain baseline counter without an ornamental layer; on value change it briefly flashes and shows a floating delta badge.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/numeric-display',
    props: [
      { name: 'value',         type: 'number',                                          required: false, default: '0',                  description: 'Current numeric value.' },
      { name: 'label',         type: 'string',                                          required: false, description: 'Counter label.' },
      { name: 'prefix',        type: 'string',                                          required: false, description: 'Text or character before the value.' },
      { name: 'suffix',        type: 'string',                                          required: false, description: 'Text or character after the value.' },
      { name: 'size',          type: "'sm'|'md'|'lg'",                                 required: false, default: "'md'",             description: 'Number and badge size.' },
      { name: 'variant',       type: "'default'|'vp'|'resource'|'mana'",               required: false, default: "'default'",        description: 'Color variant per resource type.' },
      { name: 'labelPosition', type: "'top'|'bottom'|'left'|'right'",                  required: false, default: "'top'",            description: 'Label position relative to the number.' },
      { name: 'style',         type: 'CSSProperties',                                    required: false, description: 'Inline styles for the wrapper.' },
      { name: 'className',     type: 'string',                                           required: false, description: 'Additional CSS classes for the wrapper.' },
    ],
    relatedSlugs: ['resource-bar', 'player-panel', 'float-feedback'],
  },

  'game-transition': {
    description: 'Lightweight wrapper for enter and exit animations with automatic mount and unmount behavior. Within the donjon system it serves as the reference plain motion wrapper without an ornamental layer; suitable for panels, dialogs, HUD blocks and screen transitions without an external animation library.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/motion',
    props: [
      { name: 'show',      type: 'boolean',                                                                 required: true,  description: 'Controls mount state and triggers the enter or exit animation.' },
      { name: 'preset',    type: "'fadeScale'|'slideUp'|'slideDown'|'pop'|'fade'|'slideLeft'",            required: false, default: "'fadeScale'", description: 'Predefined transition type.' },
      { name: 'duration',  type: 'number',                                                                  required: false, description: 'Custom animation duration in ms; defaults to the animSlow token.' },
      { name: 'children',  type: 'ReactNode',                                                               required: true,  description: 'Content wrapped by the transition.' },
      { name: 'style',     type: 'CSSProperties',                                                           required: false, description: 'Additional inline styles merged with the computed transition style.' },
      { name: 'className', type: 'string',                                                                  required: false, description: 'Additional CSS classes for the wrapper.' },
      { name: 'as',        type: 'string | React.ElementType',                                              required: false, default: "'div'",       description: 'HTML tag or component used as the wrapper.' },
      { name: 'onExited',  type: '() => void',                                                              required: false, description: 'Callback invoked after the exit animation completes and the element unmounts.' },
    ],
    relatedSlugs: ['float-feedback', 'player-panel', 'modal'],
  },

  'phase-indicator': {
    description: 'Sequential indicator of turn or full-game phases. Shows completed steps, the current phase, and upcoming steps in horizontal and vertical layouts. Within the donjon system it serves as the reference plain progress indicator without an ornamental layer.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/phase-indicator',
    props: [
      { name: 'phases',       type: 'Array<{ id: string, label: string, icon?: ReactNode, description?: string }>', required: false, default: '[]',          description: 'Phase list in the intended progression order.' },
      { name: 'currentPhase', type: 'string',                                                                     required: true,  description: 'ID of the currently active phase.' },
      { name: 'orientation',  type: "'horizontal'|'vertical'",                                                  required: false, default: "'horizontal'", description: 'Indicator direction.' },
      { name: 'size',         type: "'sm'|'md'",                                                                 required: false, default: "'md'",         description: 'Dot, line and text size.' },
      { name: 'onPhaseClick', type: '(phaseId: string) => void',                                                  required: false, description: 'Optional callback for clicks on the current or already-completed phases.' },
      { name: 'style',        type: 'CSSProperties',                                                              required: false, description: 'Wrapper inline styles.' },
      { name: 'className',    type: 'string',                                                                     required: false, description: 'Additional CSS classes for the wrapper.' },
    ],
    relatedSlugs: ['event-log', 'action-tile', 'player-panel'],
  },

  'player-panel': {
    description: 'Compact player panel for the HUD and score overview. Combines the crest, name, VP badge and optional resource bars in a single game block. Within the donjon system it acts as the reference plain shell without an ornamental layer.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/player-panel',
    props: [
      { name: 'name',       type: 'string',                               required: true,  description: 'Player name or label.' },
      { name: 'color',      type: 'string',                               required: false, default: 'infoColor', description: 'Player color passed into the crest.' },
      { name: 'symbol',     type: "'sword'|'shield'|'tower'",            required: false, default: "'sword'",  description: 'Symbol shown on the coat of arms.' },
      { name: 'vp',         type: 'number',                               required: false, default: '0',          description: 'Victory point count in the badge.' },
      { name: 'hp',         type: 'number',                               required: false, description: 'Current HP; when set, renders the HP bar.' },
      { name: 'maxHp',      type: 'number',                               required: false, default: '100',        description: 'Maximum HP used to compute the bar.' },
      { name: 'mana',       type: 'number',                               required: false, description: 'Current mana; when set, renders the mana bar.' },
      { name: 'maxMana',    type: 'number',                               required: false, default: '100',        description: 'Maximum mana used to compute the bar.' },
      { name: 'stamina',    type: 'number',                               required: false, description: 'Current stamina; when set, renders the stamina bar.' },
      { name: 'maxStamina', type: 'number',                               required: false, default: '100',        description: 'Maximum stamina used to compute the bar.' },
      { name: 'children',   type: '<PlayerPanel.Resource>[]',             required: false, description: 'Composition API — an array of resources (hp/mana/stamina/sanity/...). When provided, flat props are ignored.' },
      { name: 'isActive',   type: 'boolean',                              required: false, default: 'false',      description: 'Highlights the panel as the player on turn.' },
      { name: 'eliminated', type: 'boolean',                              required: false, default: 'false',      description: 'Fades the panel and shows the eliminated state.' },
      { name: 'size',       type: "'sm'|'md'",                           required: false, default: "'md'",     description: 'Panel size.' },
      { name: 'ornament',   type: "'plain'|'decorated'",                required: false, default: "'decorated'", description: 'Decorated adds RohOrnament brackets in the corners and an octagon shell (default), plain is the baseline panel.' },
      { name: 'style',      type: 'CSSProperties',                        required: false, description: 'Inline styles on the wrapping panel.' },
      { name: 'className',  type: 'string',                               required: false, description: 'Additional CSS classes on the wrapping panel.' },
    ],
    relatedSlugs: ['resource-bar', 'numeric-display', 'erb'],
  },

  'resource-bar': {
    description: 'Game resource bar for HP, mana, stamina or shield. Intentionally a reference plain baseline with no ornamental layer; on top of a generic progress bar it adds danger zones and a damage flash overlay.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/resource-bar',
    props: [
      { name: 'value',     type: 'number',                                                           required: false, default: '100',       description: 'Current resource value.' },
      { name: 'max',       type: 'number',                                                           required: false, default: '100',       description: 'Maximum resource value.' },
      { name: 'size',      type: "'sm'|'md'|'lg'",                                                  required: false, default: "'md'",    description: 'Bar height and typography.' },
      { name: 'variant',   type: "'hp'|'mana'|'stamina'|'xp'|'shield'|'default'",                  required: false, default: "'hp'",    description: 'Resource bar type and its color behavior.' },
      { name: 'label',     type: 'string',                                                           required: false, description: 'Label above the bar.' },
      { name: 'showValue', type: 'boolean',                                                          required: false, default: 'false',     description: 'Shows the numeric value on the right side of the header.' },
      { name: 'zones',     type: 'boolean',                                                          required: false, default: 'true',      description: 'Enables zoned background and threshold boundaries.' },
      { name: 'flashKey',  type: 'string | number',                                                  required: false, description: 'Value change restarts the damage flash overlay.' },
      { name: 'style',     type: 'CSSProperties',                                                    required: false, description: 'Wrapper inline styles.' },
      { name: 'className', type: 'string',                                                           required: false, description: 'Additional CSS classes for the wrapper.' },
    ],
    relatedSlugs: ['numeric-display', 'player-panel', 'donjon-progress-bar'],
  },

  /* ── donjon-fall-ui extensions of TkajUI (re-exports) ─────────────── */

  'donjon-tabs': {
    description: 'Game variant of Tabs. underline and topline use ornament lines with a hex motif, pills uses a framed track. Plain mode without ornament lines. Full API parity with TkajUI Tabs, including horizontal and vertical orientations.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'tabs',
    differencesFromBase: [
      'Ornamental shell with a HexOrnament accent (decorated mode)',
      'Gold active state + ornamental indicator',
      'Variants `underline` and `pills` mapped to the game aesthetic',
      'In vertical orientation the gapped-lines ornaments turn off (designed for horizontal layout)',
    ],
    status: 'documented',
    showcaseRoute: '/tabs',
    props: [
      { name: 'items',       type: 'Array<{value, label, icon?, badge?, disabled?, closable?}>',  required: true,  description: 'Tab list. closable: true shows × when onClose is provided.' },
      { name: 'value',       type: 'string',                                                   required: true,  description: 'Value of the active tab.' },
      { name: 'onChange',    type: '(value: string) => void',                                 required: true,  description: 'Callback when the tab changes.' },
      { name: 'variant',     type: "'underline'|'pills'",                                    required: false, default: "'underline'", description: 'Visual style.' },
      { name: 'ornament',    type: "'decorated'|'plain'",                                    required: false, default: "'decorated'", description: 'Visual mode of the donjon lines and shell — with or without ornaments.' },
      { name: 'orientation', type: "'horizontal'|'vertical'",                                required: false, default: "'horizontal'", description: 'Tablist orientation. Vertical = column, keyboard ArrowUp/Down. Parity with TkajUI Tabs.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",                                         required: false, default: "'md'",        description: 'Tab size.' },
      { name: 'onClose',     type: '(value: string) => void',                                 required: false, description: 'Callback to close a tab. Activates the × icon on items with closable: true.' },
    ],
    relatedSlugs: ['tabs', 'donjon-card', 'donjon-modal'],
  },

  'donjon-select': {
    description: 'Game variant of Select. Octagonal trigger and a game color palette. The variant prop supports 5 states (default/danger/success/warning/info) in parity with TkajUI Select.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'select',
    differencesFromBase: [
      'Octagon trigger + dropdown panel',
      'Gold dropdown arrow + warm dark dropdown background',
      'Donjon palette — gold border, bg2 dropdown surface',
      '`variant` prop (5 states) — parity with TkajUI Select for success/danger/warning/info contextual states',
    ],
    status: 'documented',
    showcaseRoute: '/select',
    props: [
      { name: 'value',       type: 'string | null',                                        required: true,  description: 'Selected value.' },
      { name: 'onChange',    type: '(value: string) => void',                              required: true,  description: 'Callback on selection.' },
      { name: 'options',     type: 'Array<{value, label, disabled?}>',                    required: true,  description: 'Option list.' },
      { name: 'placeholder', type: 'string',                                               required: false, default: "'Select an option…'", description: 'Empty-state text.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Label above the trigger.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",                                      required: false, default: "'md'",      description: 'Trigger height.' },
      { name: 'variant',     type: "'default'|'danger'|'success'|'warning'|'info'",       required: false, default: "'default'", description: 'Color variant. Parity with TkajUI Select.' },
      { name: 'disabled',    type: 'boolean',                                              required: false, default: 'false',     description: 'Disables the entire select.' },
    ],
    relatedSlugs: ['select', 'donjon-input', 'donjon-toggle'],
  },

  'donjon-slider': {
    description: 'Game variant of Slider. Visually identical to TkajUI — game gradients and glow are built into the base component. Same API as Slider.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'slider',
    differencesFromBase: [
      'Gold thumb with a diamond shape (octagon clip) instead of round',
      'Dark trough — bg1 trough instead of surface2',
      'Donjon palette — gold fill instead of accent blue',
      '`variant` prop (5 states) — parity with TkajUI Slider for contextual bars',
    ],
    status: 'documented',
    showcaseRoute: '/slider',
    props: [
      { name: 'value',       type: 'number',                              required: true,  description: 'Current value.' },
      { name: 'onChange',    type: '(value: number) => void',            required: true,  description: 'Callback when the value changes.' },
      { name: 'min',         type: 'number',                              required: false, default: '0',         description: 'Minimum value.' },
      { name: 'max',         type: 'number',                              required: false, default: '100',       description: 'Maximum value.' },
      { name: 'step',        type: 'number',                              required: false, default: '1',         description: 'Change step.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",                     required: false, default: "'md'",      description: 'Track height.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'|'info'", required: false, default: "'default'", description: 'Color variant.' },
      { name: 'label',       type: 'string',                              required: false, description: 'Label above the slider.' },
      { name: 'showValue',   type: 'boolean',                             required: false, default: 'false', description: 'Shows the current value.' },
      { name: 'disabled',    type: 'boolean',                             required: false, default: 'false', description: 'Disables the slider.' },
      { name: 'formatValue', type: '(value: number) => string',          required: false, description: 'Formatter function for the displayed value.' },
      { name: 'ticks',       type: 'number | number[]',                   required: false, description: 'Visual markers on the track. Number = number of divisions; array = specific values.' },
      { name: 'thumbShape',  type: "'diamond'|'circle'|'octagon'",       required: false, default: "'diamond'", description: 'Thumb shape — diamond (default), circle, octagon.' },
    ],
    relatedSlugs: ['slider', 'donjon-progress-bar'],
  },

  'donjon-toggle': {
    description: 'Game variant of Toggle. Visually identical to TkajUI — game color schemes are built into the base component. Same API as Toggle.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'toggle',
    differencesFromBase: [
      'Magical switch aesthetic — gold track when ON, dark when OFF',
      'Octagon clip-path thumb instead of a round one',
      'Donjon palette — gold ON state instead of accent blue',
      '`variant` prop (5 states) + `id` prop — parity with TkajUI Toggle (success/danger/warning/info + label-binding)',
    ],
    status: 'documented',
    showcaseRoute: '/toggle',
    props: [
      { name: 'checked',       type: 'boolean',                                                  required: true,  description: 'Toggle state.' },
      { name: 'onChange',      type: '(checked: boolean) => void',                              required: true,  description: 'Toggle callback.' },
      { name: 'label',         type: 'string',                                                   required: false, description: 'Text label.' },
      { name: 'labelPosition', type: "'left'|'right'",                                           required: false, default: "'right'",   description: 'Label position.' },
      { name: 'size',          type: "'sm'|'md'",                                                required: false, default: "'md'",      description: 'Toggle size.' },
      { name: 'variant',       type: "'default'|'danger'|'success'|'warning'|'info'",          required: false, default: "'default'", description: 'Color variant. Parity with TkajUI Toggle.' },
      { name: 'disabled',      type: 'boolean',                                                  required: false, default: 'false',     description: 'Disables the toggle.' },
      { name: 'id',            type: 'string',                                                   required: false, description: 'HTML id for label binding via htmlFor. Parity with TkajUI Toggle.' },
    ],
    relatedSlugs: ['toggle', 'donjon-select'],
  },

  'donjon-progress-bar': {
     description: 'Game variant of ProgressBar. Drop-in replacement for the TkajUI ProgressBar — the default variant is `default`, game ones (HP/mana/stamina/xp) are opt-in. Unified heights for shape parity (md=8). Same API as ProgressBar with game extras.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'progress-bar',
    differencesFromBase: [
      'HP/mana/stamina/xp variants with automatic color thresholds (opt-in via `variant`)',
      '`ticks` prop — countable resources (e.g. 10 ticks for HP)',
      '`flash` prop — damage flash animation for game feedback',
      'Heights unified with TkajUI (md=8) — drop-in replacement with no layout shift',
    ],
    status: 'documented',
    showcaseRoute: '/progress-bar',
    props: [
      { name: 'value',         type: 'number',                                                                              required: false, default: '0',         description: 'Current value (0 – max).' },
      { name: 'max',           type: 'number',                                                                              required: false, default: '100',       description: 'Maximum value.' },
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                                                                 required: false, default: "'md'",      description: 'Track height.' },
      { name: 'variant',       type: "'default'|'hp'|'mana'|'stamina'|'xp'",                                              required: false, default: "'default'", description: 'Default = universal (gold/threshold). HP/mana/stamina/xp = game presets with a fixed color.' },
      { name: 'label',         type: 'string',                                                                              required: false, description: 'Label above the bar.' },
      { name: 'showValue',     type: 'boolean',                                                                             required: false, default: 'false',     description: 'Shows the percentage on the right.' },
      { name: 'ticks',         type: 'number',                                                                              required: false, default: '0',         description: 'Number of dividing ticks (0 = none). Game extra.' },
      { name: 'flash',         type: 'boolean',                                                                             required: false, default: 'false',     description: 'Damage flash animation. Game extra.' },
      { name: 'indeterminate', type: 'boolean',                                                                             required: false, default: 'false',     description: 'Animated shimmer (unknown length).' },
    ],
    relatedSlugs: ['progress-bar', 'donjon-slider'],
  },

  'donjon-tooltip': {
    description: 'Game variant of Tooltip. Visually identical to TkajUI — game color schemes are built into the base component. Same API as Tooltip.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'tooltip',
    differencesFromBase: [
      'Parchment feel — gold border + warm dark bg2',
      'Octagon arrow instead of a triangle',
      'Optional title (gold gradient) above the content',
      '`variant` prop (5 states) — parity with TkajUI Tooltip for contextual bubbles',
    ],
    status: 'documented',
    showcaseRoute: '/tooltip',
    props: [
      { name: 'children',   type: 'ReactNode',                                              required: true,  description: 'Trigger element.' },
      { name: 'content',    type: 'string',                                                  required: true,  description: 'Tooltip text.' },
      { name: 'title',      type: 'string',                                                  required: false, description: 'Optional title above the text.' },
      { name: 'placement',  type: "'top'|'bottom'|'left'|'right' + '-start'|'-end'",        required: false, default: "'top'",     description: '12 values: 4 sides × 3 alignments (default/-start/-end).' },
      { name: 'variant',    type: "'default'|'danger'|'success'|'warning'|'info'",          required: false, default: "'default'", description: 'Color variant.' },
      { name: 'delay',      type: 'number',                                                  required: false, default: '120',       description: 'Show delay in ms.' },
      { name: 'disabled',   type: 'boolean',                                                 required: false, default: 'false',     description: 'Disables tooltip rendering.' },
      { name: 'autoFlip',   type: 'boolean',                                                 required: false, default: 'true',      description: 'Automatically flip to the opposite side when the tooltip would overflow the viewport.' },
    ],
    relatedSlugs: ['tooltip', 'donjon-badge'],
  },

  'donjon-toast': {
    description: 'Game variant of Toast. Octagonal shell and game variants. Usage: ToastProvider + useToast hook. Same API as Toast.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'toast',
    differencesFromBase: [
      'Game variants: `gain` (green), `loss` (red), `event` (blue), `warning` (amber) — intentionally a different set than TkajUI default/danger/success/warning',
      'Parchment feel — gold border + warm dark bg',
      'Octagon clip-path instead of a rounded card',
      'A11y: role="alert" + aria-live="assertive" for loss/warning (interrupts the screen reader), role="status" + polite for gain/event/default',
    ],
    status: 'documented',
    showcaseRoute: '/toast',
    props: [
      { name: 'title',    type: 'string',                                              required: false, description: 'Toast title (bold, gradient).' },
      { name: 'message',  type: 'string',                                              required: false, description: 'Message body text.' },
      { name: 'variant',  type: "'default'|'success'|'danger'|'warning'|'info'",      required: false, default: "'default'", description: 'Color variant.' },
      { name: 'duration', type: 'number',                                              required: false, default: '4000',      description: 'Time until auto-close in ms. 0 = persistent.' },
    ],
    relatedSlugs: ['toast', 'float-feedback'],
  },

  /* ── Utility / Clip components ────────────────────────────────────── */

  'donjon-pictogram': {
    description: 'Game variant of Pictogram — icon with a dark octagonal background and a gold / fantasy color palette. Five variants (active, passive, disabled, danger, success), four sizes, optional bare mode without a background. Drop-in compat with TkajUI Pictogram via the `color` prop.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'pictogram',
    differencesFromBase: [
      'Variant prop (active/passive/disabled/danger/success) — game palette instead of a single `color`',
      '`color` prop for drop-in compat with TkajUI (overrides the variant color)',
      '`bare={false}` adds an octagonal clip-path wrapper + glow filter (game frame)',
    ],
    status: 'documented',
    showcaseRoute: '/pictograms',
    props: [
      { name: 'icon',      type: 'React.ComponentType<{width, height}>', required: true,  description: 'SVG component from donjon/icons.' },
      { name: 'size',      type: "'sm'|'md'|'lg'|'xl'",                  required: false, default: "'md'",      description: 'Icon size (16 / 24 / 32 / 48 px).' },
      { name: 'color',     type: 'string',                               required: false, description: 'Icon color override — parity with TkajUI Pictogram. When provided, overrides `variant`. CSS color (hex / rgb / token).' },
      { name: 'variant',   type: "'active'|'passive'|'disabled'|'danger'|'success'", required: false, default: "'active'", description: 'Color variant — drives the icon color and background. Ignored when `color` is provided.' },
      { name: 'bare',      type: 'boolean',                              required: false, default: 'true',      description: 'No background — just the icon with a game color. bare={false} adds an octagonal frame with a dark background.' },
      { name: 'className', type: 'string',                               required: false, description: 'Tailwind classes on the wrapping span.' },
      { name: 'style',     type: 'CSSProperties',                        required: false, description: 'Inline styles on the wrapping span.' },
    ],
    relatedSlugs: ['pictogram', 'donjon-badge', 'donjon-button'],
  },

  'pictogram': {
    description: 'Generic SVG icon wrapper (TkajUI). Accepts any SVG component as the `icon` prop and renders it at the correct size and color. No background, no decoration — pure icon.',
    status: 'documented',
    showcaseRoute: '/pictograms',
    props: [
      { name: 'icon',      type: 'React.ComponentType<{width, height, color}>', required: true,  description: 'SVG component (accepts width, height, color).' },
      { name: 'size',      type: "'sm'|'md'|'lg'|'xl'",                         required: false, default: "'md'",          description: 'Size (16 / 24 / 32 / 48 px).' },
      { name: 'color',     type: 'string',                                       required: false, default: "'currentColor'", description: 'CSS icon color.' },
      { name: 'className', type: 'string',                                       required: false, description: 'Tailwind classes on the wrapping span.' },
      { name: 'style',     type: 'CSSProperties',                               required: false, description: 'Inline styles on the wrapping span.' },
    ],
    relatedSlugs: ['donjon-badge', 'donjon-button'],
  },

  'scoop-clip': {
    description: 'Wrapper with concave-rounded corners (scoop shape) via SVG clipPath with objectBoundingBox — adapts to arbitrary element dimensions. Internal utility for shaping panels and buttons.',
    status: 'documented',
    showcaseRoute: '/scoop-clip',
    props: [
      { name: 'shape',       type: "'bezier'|'circle'", required: false, default: "'bezier'", description: 'Arc geometry. bezier = responsive Q curve in objectBoundingBox, circle = fixed circular cutout with an absolute px radius.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'", required: false, description: 'Size preset — unified with octagon. In bezier mode maps to SHAPE_SIZES[size].bb, in circle mode to SHAPE_SIZES[size].scoop + default w/h from SHAPE_SIZES.' },
      { name: 'cornerSize',  type: 'number',      required: false, default: '0.25 (bezier) / preset.scoop (circle)',  description: 'Corner cut size (unified terminology with octagon). In bezier mode 0–0.5 (relative ratio), in circle mode absolute px. Takes precedence over size.' },
      { name: 'r',           type: 'number',      required: false, description: '⚠ DEPRECATED — alias for cornerSize, kept for backward compat. In new code use cornerSize.' },
      { name: 'borderColor', type: 'string',      required: false, description: 'Border color — renders an outer layer with the same clipPath.' },
      { name: 'borderWidth', type: 'number',      required: false, default: '1', description: 'Border thickness in px.' },
      { name: 'children',    type: 'ReactNode',   required: false, description: 'Content wrapped by the clipPath shape.' },
      { name: 'style',       type: 'CSSProperties', required: false, description: 'Inline styles. In circle mode, width/height are auto-filled from SHAPE_SIZES[size] if not set.' },
      { name: 'className',   type: 'string',      required: false, description: 'Tailwind classes on the wrapping div.' },
    ],
    relatedSlugs: ['corner-ornament', 'ornaments', 'notched-box'],
  },

  'corner-ornament': {
    description: 'Decorative corner ornament. Positioned absolutely into a panel or frame corner. Four shape variants and three corner geometries (cut/round/scoop).',
    status: 'documented',
    showcaseRoute: '/ornaments',
    props: [
      { name: 'cornerSize', type: "number|'xs'|'sm'|'md'|'lg'",                 required: false, description: 'Ornament size — px or size preset. The preset maps to SHAPE_SIZES[preset].cut. Unified terminology with octagon and ScoopClip.' },
      { name: 'size',       type: 'number',                                     required: false, default: '16',       description: '⚠ DEPRECATED — alias for cornerSize (px).' },
      { name: 'color',      type: 'string',                                     required: false, default: "'#8F7458'", description: 'CSS fill color.' },
      { name: 'variant',    type: "'bracket'|'dot'|'diamond'|'cross'",         required: false, default: "'bracket'", description: 'Decorative ornament shape.' },
      { name: 'cornerType', type: "'cut'|'round'|'scoop'",                     required: false, default: "'cut'",     description: 'Component corner geometry — adapts the elbow shape (bracket variant).' },
      { name: 'style',      type: 'CSSProperties',                             required: false, description: 'Inline styles for positioning (position, top, left…).' },
    ],
    relatedSlugs: ['ornaments', 'scoop-clip', 'notched-box'],
  },

  'notched-box': {
    description: 'Container with a V-notch on one side (octagonWithNotch). The optional NotchedBox.Slot positions content into the center of the notch outside the clip-path — typically a badge or indicator.',
    status: 'documented',
    showcaseRoute: '/shapes',
    props: [
      { name: 'cornerSize', type: 'number',                              required: false, default: '15',       description: 'Corner cut size in px — unified terminology with octagon and ScoopClip.' },
      { name: 'cx',       type: 'number',                                required: false, description: '⚠ DEPRECATED — alias for cornerSize.' },
      { name: 'nw',       type: 'number',                                required: false, default: '28',       description: 'Notch width in px.' },
      { name: 'nh',       type: 'number',                                required: false, default: '12',       description: 'Notch depth in px.' },
      { name: 'side',        type: "'top'|'bottom'|'left'|'right'",   required: false, default: "'bottom'", description: 'Side that carries the notch.' },
      { name: 'notchOffset', type: 'number',                            required: false, default: '0.5',      description: 'Notch position along the side (0 = start, 0.5 = center, 1 = end). The slot tracks it automatically.' },
      { name: 'borderColor', type: 'string',                            required: false, description: 'Border color — renders an underlay layer with the same shape.' },
      { name: 'borderWidth', type: 'number',                            required: false, default: '1', description: 'Border thickness in px.' },
      { name: 'children', type: 'ReactNode',                             required: false, description: 'Panel content + optional NotchedBox.Slot.' },
      { name: 'style',    type: 'CSSProperties',                        required: false, description: 'Inline styles on the clipped div (width, height, background…).' },
      { name: 'className', type: 'string',                              required: false, description: 'Tailwind classes on the clipped div.' },
    ],
    relatedSlugs: ['scoop-clip', 'corner-ornament', 'ornaments'],
  },

  'icons': {
    description: 'Set of game SVG icons for donjon-fall-ui. Each icon is a pure SVG component accepting width and height — color is driven by currentColor. Intended to be used via the DonjonPictogram or Pictogram wrapper.',
    status: 'documented',
    showcaseRoute: '/pictograms',
    props: [
      { name: 'width',  type: 'number', required: false, default: '24', description: 'SVG width in px.' },
      { name: 'height', type: 'number', required: false, default: '24', description: 'SVG height in px.' },
    ],
    relatedSlugs: ['donjon-pictogram', 'pictogram'],
  },

  /* ── Layout (internal) ─────────────────────────────────────────────── */

  'layout': {
    description: 'Main app wrapper — combines the sidebar, mobile header and the routed page content. Internal component, not intended for direct use.',
    status: 'documented',
    props: [
      // Layout has no public props — internal state: sidebarOpen
    ],
    relatedSlugs: ['sidebar', 'showcase-page'],
  },

  'sidebar': {
    description: 'Style guide navigation tree — renders sections, items and sub-sections. Highlights the active route. Internal presentation component.',
    status: 'documented',
    props: [
      { name: 'isOpen',  type: 'boolean',      required: true, description: 'Sidebar open state on mobile.' },
      { name: 'onClose', type: '() => void',   required: true, description: 'Callback to close the sidebar.' },
    ],
    relatedSlugs: ['layout', 'showcase-page'],
  },

  'device-frame': {
    description: 'Visual frame simulating a physical device (desktop, tablet, mobile) for layout documentation. Also exports ComparisonRow for a comparison row.',
    status: 'documented',
    props: [
      // DeviceFrame
      { name: 'type',     type: "'desktop'|'tablet'|'mobile'", required: true,  description: '[DeviceFrame] Device type.' },
      { name: 'children', type: 'ReactNode',                   required: true,  description: '[DeviceFrame] Content inside the frame.' },
      // ComparisonRow
      { name: 'desktop',  type: 'ReactNode',                   required: true,  description: '[ComparisonRow] Layout for the desktop frame.' },
      { name: 'tablet',   type: 'ReactNode',                   required: true,  description: '[ComparisonRow] Layout for the tablet frame.' },
      { name: 'mobile',   type: 'ReactNode',                   required: true,  description: '[ComparisonRow] Layout for the mobile frame.' },
    ],
    relatedSlugs: ['showcase-page', 'layout'],
  },

  'error-boundary': {
    description: 'Internal safety wrapper for lazy-rendered pages. Catches render errors, logs them to the console, and shows a readable fallback with a reset option instead of a blank screen.',
    status: 'documented',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'App or page content protected by the error boundary wrapper.' },
    ],
    relatedSlugs: ['layout', 'showcase-page'],
  },

  'donjon-notification-center': {
    description: 'Game notification panel that slides out from a screen corner. Aggregates game events (gain/loss/event/warning/system) with color coding, DonjonBadge type and an HH:MM timestamp. Combines GameTransition (panel animation) + DonjonBadge (event type) + createPortal. Unread counter on the toggle button.',
    subcategory: 'exclusive',
    status: 'stable',
    showcaseRoute: '/notification-center',
    props: [
      { name: 'events',     type: "Array<{id, text, type, timestamp}>",                              required: true,  description: "Array of game events. Types: 'gain' | 'loss' | 'event' | 'warning' | 'system'." },
      { name: 'maxVisible', type: 'number',                                                           required: false, default: '5',             description: 'Maximum number of most-recent entries shown. Older ones are archived.' },
      { name: 'position',   type: "'bottom-right'|'bottom-left'|'top-right'|'top-left'",             required: false, default: "'bottom-right'", description: 'Screen corner where the panel appears.' },
      { name: 'onClear',    type: '() => void',                                                       required: false, description: 'Callback for the Clear button in the panel header.' },
      { name: 'ornament',   type: "'plain'|'decorated'",                                                  required: false, default: "'decorated'", description: 'Decorated adds RohOrnament brackets inside an octagon shell (default), plain is the baseline panel.' },
    ],
    relatedSlugs: ['event-log', 'donjon-toast', 'game-transition', 'donjon-badge'],
  },

  'showcase-page': {
    description: 'Base layout for documentation pages. Composed of four exports: ShowcasePage, Section, Preview and CodeBlock.',
    status: 'documented',
    props: [
      // ShowcasePage
      { name: 'title',       type: 'string',    required: true,  description: '[ShowcasePage] Page title.' },
      { name: 'description', type: 'string',    required: false, description: '[ShowcasePage / Section] Description below the heading.' },
      { name: 'children',    type: 'ReactNode', required: true,  description: '[ShowcasePage / Section / Preview] Content.' },
      // Section
      { name: 'id',          type: 'string',    required: false, description: '[Section] Anchor ID for the sidebar link.' },
      // Preview
      { name: 'dark',        type: 'boolean',   required: false, default: 'true', description: '[Preview] Dark background for the preview box.' },
      // CodeBlock
      { name: 'code',        type: 'string',    required: true,  description: '[CodeBlock] Source code to display.' },
    ],
    relatedSlugs: ['layout', 'sidebar', 'device-frame'],
  },

}
