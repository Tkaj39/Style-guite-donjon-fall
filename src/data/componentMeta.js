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
    description: 'Stavový odznak s oktagonálním tvarem. Sémantické barevné varianty, volitelná tečka pro živý stav a ikona. DonjonBadge je vizuálně identický re-export.',
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
    description: 'Základní akční tlačítko s oktagonálním tvarem. Čtyři sémantické varianty, tři velikosti, podpora ikon a loading stavu. DonjonButton rozšiřuje o SideOrnament a HexOrnament.',
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
    description: 'Textové vstupní pole s oktagonálním rámem. Label, hint, error stav, leading/trailing ikony. DonjonInput je vizuálně identický re-export.',
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'label',        type: 'string',                               required: false, description: 'Popisek pole — zobrazí se nad polem.' },
      { name: 'value',        type: 'string',                               required: true,  description: 'Current field value.' },
      { name: 'onChange',     type: '(e: ChangeEvent) => void',             required: true,  description: 'Value change handler.' },
      { name: 'placeholder',  type: 'string',                               required: false, default: 'undefined', description: 'Zástupný text.' },
      { name: 'size',         type: "'xs'|'sm'|'md'|'lg'",                      required: false, default: "'md'",      description: 'Výška pole.' },
      { name: 'leadingIcon',  type: 'ReactNode',                            required: false, default: 'undefined', description: 'Icon on the left inside the field.' },
      { name: 'trailingIcon', type: 'ReactNode',                            required: false, default: 'undefined', description: 'Icon on the right inside the field.' },
      { name: 'error',        type: 'string',                               required: false, default: 'undefined', description: 'Error message — paints the frame red.' },
      { name: 'hint',         type: 'string',                               required: false, default: 'undefined', description: 'Hint below the field (grey, no error state).' },
      { name: 'disabled',     type: 'boolean',                              required: false, default: 'false',     description: 'Deaktivuje pole.' },
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
      { name: 'orientation', type: "'horizontal'|'vertical'",                                required: false, default: "'horizontal'", description: 'Layout — horizontal (default) nebo vertical sidebar-style.' },
      { name: 'onClose',     type: '(value: string) => void',                                 required: false, description: 'Callback to close a tab. Activates the × icon on items with closable: true.' },
    ],
    relatedSlugs: ['button-group', 'donjon-card', 'modal'],
  },

  'select': {
    description: 'Vlastní dropdown pro výběr jedné hodnoty ze seznamu. Oktagonální trigger, klávesnicová navigace šipkami a Escape, podpora disabled položek.',
    status: 'documented',
    showcaseRoute: '/select',
    props: [
      { name: 'value',       type: 'string | null',                                        required: true,  description: 'Selected value.' },
      { name: 'onChange',    type: '(value: string) => void',                              required: true,  description: 'Callback on selection.' },
      { name: 'options',     type: 'Array<{value, label, disabled?}>',                    required: true,  description: 'Option list.' },
      { name: 'placeholder', type: 'string',                                               required: false, default: "'Select an option…'", description: 'Empty-state text.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Popisek nad triggerem.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",                                      required: false, default: "'md'",      description: 'Trigger height.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'",              required: false, default: "'default'", description: 'Color variant.' },
      { name: 'disabled',    type: 'boolean',                                              required: false, default: 'false',     description: 'Disables the entire select.' },
    ],
    relatedSlugs: ['donjon-input', 'button-group', 'toggle'],
  },

  'slider': {
    description: 'Range input pro výběr hodnoty v rozsahu. Nativní <input type=range> překrytý vlastním vizuálem navazujícím na ProgressBar. Podpora formatValue pro jednotky.',
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
      { name: 'label',       type: 'string',                                               required: false, description: 'Popisek nad sliderem.' },
      { name: 'showValue',   type: 'boolean',                                              required: false, default: 'false',      description: 'Zobrazí aktuální hodnotu vpravo.' },
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
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                                           required: false, default: "'md'",       description: 'Výška lišty (4 / 8 / 14 px).' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'|'info'",            required: false, default: "'default'",  description: 'Fill color variant.' },
      { name: 'label',         type: 'string',                                                    required: false, description: 'Popisek nad lištou (také aria-label).' },
      { name: 'showValue',     type: 'boolean',                                                   required: false, default: 'false',      description: 'Zobrazí procentuální hodnotu vpravo nad lištou.' },
      { name: 'indeterminate', type: 'boolean',                                                   required: false, default: 'false',      description: 'Animated shimmer for unknown progress.' },
    ],
    relatedSlugs: ['toggle', 'donjon-badge', 'toast'],
  },

  'toggle': {
    description: 'Přepínač on/off pro binární nastavení s okamžitým efektem. Pill tvar, animovaný thumb, plná klávesnicová přístupnost. Čtyři varianty a dvě velikosti.',
    status: 'documented',
    showcaseRoute: '/toggle',
    props: [
      { name: 'checked',       type: 'boolean',                                           required: true,  description: 'Current toggle state.' },
      { name: 'onChange',      type: '(value: boolean) => void',                          required: true,  description: 'Callback when the state changes.' },
      { name: 'label',         type: 'string',                                            required: false, description: 'Textový popisek vedle přepínače.' },
      { name: 'labelPosition', type: "'right'|'left'",                                   required: false, default: "'right'",   description: 'Pozice popisku vůči přepínači.' },
      { name: 'size',          type: "'sm'|'md'",                                        required: false, default: "'md'",      description: 'Toggle size.' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'",           required: false, default: "'default'", description: 'Color variant of the active state.' },
      { name: 'disabled',      type: 'boolean',                                           required: false, default: 'false',     description: 'Disables interaction.' },
      { name: 'id',            type: 'string',                                            required: false, description: 'HTML id for binding to an external <label>.' },
    ],
    relatedSlugs: ['button-group', 'donjon-input', 'modal'],
  },

  'toast': {
    description: 'Plovoucí notifikace pro krátkodobá oznámení. Automaticky se zavře po uplynutí duration. Globální stav spravuje ToastProvider, přístupný přes useToast hook. A11y: role="alert"+assertive pro danger/warning, role="status"+polite pro default/success.',
    status: 'documented',
    showcaseRoute: '/toast',
    props: [
      { name: 'title',    type: 'string',                                                    required: false, description: '[addToast] Titulek notifikace.' },
      { name: 'message',  type: 'string',                                                    required: false, description: '[addToast] Tělo zprávy.' },
      { name: 'variant',  type: "'default'|'success'|'danger'|'warning'|'info'",            required: false, default: "'default'", description: '[addToast] Barevná varianta.' },
      { name: 'duration', type: 'number',                                                    required: false, default: '4000',      description: '[addToast] Čas v ms do automatického zavření. 0 = trvalý.' },
      { name: 'position', type: "'bottom-right'|'top-right'|'bottom-left'|'top-left'",      required: false, default: "'bottom-right'", description: '[ToastProvider] Pozice stacku na obrazovce.' },
      { name: 'children', type: 'ReactNode',                                                 required: true,  description: '[ToastProvider] Obsah aplikace — hook je dostupný uvnitř.' },
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
      { name: 'description',     type: 'string',                                            required: false, description: 'Podnadpis pod title.' },
      { name: 'children',        type: 'ReactNode',                                         required: false, description: 'Modal body content.' },
      { name: 'footer',          type: 'ReactNode',                                         required: false, description: 'Footer content — typically buttons.' },
      { name: 'size',            type: "'sm'|'md'|'lg'",                                   required: false, default: "'md'",      description: 'Maximum panel width (sm=360, md=480, lg=640).' },
      { name: 'variant',         type: "'default'|'danger'|'success'|'warning'",           required: false, default: "'default'", description: 'Color variant — border, header, title.' },
      { name: 'closeOnBackdrop', type: 'boolean',                                           required: false, default: 'true',      description: 'Backdrop click closes the modal.' },
      { name: 'closeOnEscape',   type: 'boolean',                                           required: false, default: 'true',      description: 'The Escape key closes the modal.' },
      { name: 'showCloseButton', type: 'boolean',                                           required: false, default: 'true',      description: 'Zobrazí tlačítko × v hlavičce (nebo těle bez title).' },
    ],
    relatedSlugs: ['donjon-card', 'donjon-button', 'tooltip'],
  },

  'donjon-modal': {
    description: 'Game variant of Modal — extends the TkajUI Modal with SideOrnament and HexOrnament decoration in the header, body and footer. Now also supports a plain gold-frame mode without ornaments.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'modal',
    differencesFromBase: [
      'Ornamentální shell — SideOrnament po stranách, HexOrnament v hlavičce a patičce',
      'Plain režim (`ornament="plain"`) — gold-frame bez ornamentů pro hustší layouty',
      'Donjon palette — gold border, warm parchment bg2 instead of cool surface2',
    ],
    status: 'documented',
    showcaseRoute: '/modal',
    props: [
      { name: 'isOpen',          type: 'boolean',                                           required: true,  description: 'Controls the modal visibility.' },
      { name: 'onClose',         type: '() => void',                                        required: true,  description: 'Close callback.' },
      { name: 'title',           type: 'string',                                            required: false, description: 'Header title.' },
      { name: 'description',     type: 'string',                                            required: false, description: 'Podnadpis pod title.' },
      { name: 'children',        type: 'ReactNode',                                         required: false, description: 'Modal body content.' },
      { name: 'footer',          type: 'ReactNode',                                         required: false, description: 'Footer content.' },
      { name: 'size',            type: "'sm'|'md'|'lg'",                                   required: false, default: "'md'",      description: 'Maximum panel width.' },
      { name: 'variant',         type: "'default'|'danger'|'success'|'warning'",           required: false, default: "'default'", description: 'Color variant.' },
      { name: 'ornament',        type: "'decorated'|'plain'",                              required: false, default: "'decorated'", description: 'Visual mode of the donjon shell — with or without ornaments.' },
      { name: 'closeOnBackdrop', type: 'boolean',                                           required: false, default: 'true',      description: 'Backdrop click closes the modal.' },
      { name: 'closeOnEscape',   type: 'boolean',                                           required: false, default: 'true',      description: 'Escape closes the modal.' },
      { name: 'showCloseButton', type: 'boolean',                                           required: false, default: 'true',      description: 'Zobrazí tlačítko × v hlavičce.' },
    ],
    relatedSlugs: ['modal', 'donjon-card', 'donjon-button'],
  },

  'tooltip': {
    description: 'Contextual hint shown on hover or focus. Supports 4 placement directions, 5 color variants, and an optional title.',
    status: 'documented',
    showcaseRoute: '/tooltip',
    props: [
      { name: 'children',   type: 'ReactNode',                                         required: true,  description: 'Trigger element — tooltip se zobrazí při jeho hover/focus.' },
      { name: 'content',    type: 'string',                                            required: true,  description: 'Text tooltipové bubliny.' },
      { name: 'title',      type: 'string',                                            required: false, description: 'Volitelný titulek nad obsahem.' },
      { name: 'placement',  type: "'top'|'bottom'|'left'|'right' + '-start'|'-end'",  required: false, default: "'top'",     description: '12 values: 4 sides × 3 alignments (default/-start/-end).' },
      { name: 'variant',    type: "'default'|'danger'|'success'|'warning'|'info'",    required: false, default: "'default'", description: 'Color variant.' },
      { name: 'delay',      type: 'number',                                            required: false, default: '120',       description: 'Prodleva zobrazení v ms.' },
      { name: 'disabled',   type: 'boolean',                                           required: false, default: 'false',     description: 'Disables tooltip rendering.' },
      { name: 'autoFlip',   type: 'boolean',                                           required: false, default: 'true',      description: 'Automatically flip to the opposite side when the tooltip would overflow the viewport.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-badge', 'float-feedback'],
  },

  'donjon-button': {
    description: 'Primární akční prvek design systému. Šest barevných variant (default/primary/danger/success/warning/link), čtyři velikosti, ikonové módy a loading / disabled stav. Plain gold-frame režim i bez ornamentů.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'button',
    differencesFromBase: [
      'Větší octagon cornerSize (12 vs 8) — výraznější herní siluetu',
      '4 ornaments (SideOrnament + ZkosenOrnament + RohOrnament + HexOrnament) in decorated mode',
      'Plain režim (`ornament="plain"`) — outer-wrapper octagon border trick místo CSS borderu',
      'Donjon palette — gold gradient instead of accent blue',
      '`primary` variant — solid gold fill (vyšší vizuální váha než default gradient)',
      '`link` variant — textový button bez shellu/ornamentů, underline na hover',
      '`warning` variant — parita s TkajUI Button.warning',
    ],
    status: 'documented',
    showcaseRoute: '/buttons',
    props: [
      { name: 'children',     type: 'ReactNode',                                                          required: false, description: 'Button content — text or ReactNode.' },
      { name: 'variant',      type: "'default'|'primary'|'danger'|'success'|'warning'|'link'",            required: false, default: "'default'", description: 'Color variant. `primary` = solid gold fill, `link` = text-only button without a shell. Parity with TkajUI Button.' },
      { name: 'size',         type: "'xs'|'sm'|'md'|'lg'",                     required: false, default: "'md'",      description: 'Button size.' },
      { name: 'ornament',     type: "'decorated'|'plain'",                     required: false, default: "'decorated'", description: 'Visual mode of the donjon shell — with or without ornaments.' },
      { name: 'leadingIcon',  type: 'ReactNode',                               required: false, description: 'Icon before the text.' },
      { name: 'trailingIcon', type: 'ReactNode',                               required: false, description: 'Ikona za textem.' },
      { name: 'iconOnly',     type: 'boolean',                                 required: false, default: 'false',     description: 'Skryje text, zobrazí jen ikonu.' },
      { name: 'fullWidth',    type: 'boolean',                                 required: false, default: 'false',     description: 'Stretches the button to the parent full width.' },
      { name: 'loading',      type: 'boolean',                                 required: false, default: 'false',     description: 'Zobrazí spinner a zakáže kliknutí.' },
      { name: 'disabled',     type: 'boolean',                                 required: false, default: 'false',     description: 'Zakáže tlačítko.' },
      { name: 'onClick',      type: '() => void',                              required: false, description: 'Click handler.' },
      { name: 'className',    type: 'string',                                  required: false, description: 'Přidání Tailwind tříd.' },
    ],
    relatedSlugs: ['button-group', 'donjon-card', 'donjon-input'],
  },

  'button-group': {
    description: 'Skupinový přepínač — výběr jedné hodnoty z předem daného seznamu možností. Používá se pro výběr akce, taby a filtry.',
    status: 'documented',
    showcaseRoute: '/button-groups',
    props: [
      { name: 'items',    type: 'Array<{value: string, label: string, icon?: ReactNode}>', required: true,  description: 'List of toggleable options.' },
      { name: 'value',    type: 'string',                                                  required: true,  description: 'Currently selected value.' },
      { name: 'onChange', type: '(value: string) => void',                                 required: true,  description: 'Callback when the selection changes.' },
      { name: 'variant',  type: "'default'|'tabs'",                                        required: false, default: "'default'", description: 'Group visual style.' },
      { name: 'size',     type: "'sm'|'md'",                                               required: false, default: "'md'",      description: 'Velikost skupiny.' },
      { name: 'dividers', type: 'boolean',                                                 required: false, default: 'false',     description: 'Shows dividers between items.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-card'],
  },

  'donjon-button-group': {
    description: 'Game variant of ButtonGroup — extends the TkajUI ButtonGroup with SideOrnament and HexOrnament decoration. Now also supports a plain gold-frame mode without ornaments.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'button-group',
    differencesFromBase: [
      'Sdílené ornamenty SideOrnament + HexOrnament napříč skupinou',
      'Variants `menu` a `tabs` — herní kontext (akce vs navigace)',
      'Plain režim (`ornament="plain"`) — outer-wrapper octagon border bez ornamentů',
    ],
    status: 'documented',
    showcaseRoute: '/button-groups',
    props: [
      { name: 'items',    type: 'Array<{value, label, icon?}>', required: true,  description: 'List of toggleable options.' },
      { name: 'value',    type: 'string',                       required: true,  description: 'Currently selected value.' },
      { name: 'onChange', type: '(value: string) => void',      required: true,  description: 'Callback when the selection changes.' },
      { name: 'variant',  type: "'menu'|'tabs'",                required: false, default: "'menu'", description: 'Group visual style.' },
      { name: 'ornament', type: "'decorated'|'plain'",          required: false, default: "'decorated'", description: 'Visual mode of the donjon shell — with or without ornaments.' },
      { name: 'size',     type: "'xs'|'sm'|'md'|'lg'",         required: false, default: "'md'",   description: 'Velikost skupiny.' },
      { name: 'dividers', type: 'boolean',                      required: false, default: 'false',  description: 'Shows dividers between items.' },
    ],
    relatedSlugs: ['button-group', 'donjon-button', 'donjon-card'],
  },

  'donjon-input': {
    description: 'Textové vstupní pole pro formuláře. Podporuje label, hint, chybový stav, ikony a disabled.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'input',
    differencesFromBase: [
      'Octagon shape with a larger cornerSize — the game visual signature',
      'Zlatý focus ring + warm placeholder color (`textLow` z donjon palety)',
      'Variant gradient hlavička pro `danger`/`success` stavy',
    ],
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'label',       type: 'string',                     required: false, description: 'Popis pole zobrazený nad inputem.' },
      { name: 'value',       type: 'string',                     required: true,  description: 'Řízená hodnota pole.' },
      { name: 'onChange',    type: '(value: string) => void',    required: true,  description: 'Callback when the value changes.' },
      { name: 'placeholder', type: 'string',                     required: false, description: 'Zástupný text v prázdném poli.' },
      { name: 'leadingIcon', type: 'ReactNode',                  required: false, description: 'Icon on the left inside the field.' },
      { name: 'trailingIcon',type: 'ReactNode',                  required: false, description: 'Icon on the right inside the field.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",             required: false, default: "'md'",    description: 'Velikost pole.' },
      { name: 'cornerSize',  type: 'number',                     required: false, description: 'Override pro corner-cut v px (jinak derivováno z size). Sjednoceno s octagon/ScoopClip.' },
      { name: 'error',       type: 'string',                     required: false, description: 'Error message — renders the field in the error state.' },
      { name: 'hint',        type: 'string',                     required: false, description: 'Pomocný text pod polem.' },
      { name: 'disabled',    type: 'boolean',                    required: false, default: 'false',   description: 'Zakáže editaci.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-card'],
  },

  'donjon-badge': {
    description: 'Game badge with a hexagonal shape and glow effect. Visually different from TkajUI Badge — native game variants (gain/loss/event/warning/magic), diamond indicator instead of a circle.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/badges',
    props: [
      { name: 'children', type: 'ReactNode',                                                                              required: false, description: 'Text nebo obsah odznaku.' },
      { name: 'variant',  type: "'default'|'gain'|'loss'|'event'|'warning'|'magic'|'muted'|'success'|'danger'|'info'|'primary'", required: false, default: "'default'", description: 'Game variant. Backward-compat: success=gain, danger=loss, info=infoColor, primary=event.' },
      { name: 'size',     type: "'sm'|'md'",                                                                              required: false, default: "'md'",      description: 'Velikost odznaku.' },
      { name: 'dot',      type: 'boolean',                                                                                required: false, default: 'false',     description: 'Zobrazí heraldický diamant vlevo.' },
      { name: 'icon',     type: 'ReactNode',                                                                              required: false, description: 'SVG ikona vlevo od textu — alternativa k dot.' },
    ],
    relatedSlugs: ['donjon-card', 'float-feedback', 'badge'],
  },

  'donjon-card': {
    description: 'Container for grouped content. Fixed header–body–footer structure and color variants for different contexts. Now also supports a plain gold-frame mode without ornaments.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'card',
    differencesFromBase: [
      'Ornamentální shell — SideOrnament + ZkosenOrnament + RohOrnament + HexOrnament',
      'Plain režim (`ornament="plain"`) — gold-frame bez ornamentů',
      'Variant gradient hlavička (`VARIANT_HEADER_BG`) místo solid bg',
    ],
    status: 'documented',
    showcaseRoute: '/cards',
    props: [
      { name: 'children',    type: 'ReactNode',                              required: false, description: 'Card body content.' },
      { name: 'title',       type: 'string',                                 required: false, description: 'Card header title.' },
      { name: 'description', type: 'string',                                 required: false, description: 'Podnadpis v hlavičce karty.' },
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
      { name: 'h',          type: 'number',  required: false, description: '[SideOrnament] Výška ornamenty v px.' },
      { name: 'uid',        type: 'string',  required: true,  description: '[SideOrnament / HexOrnament] Unikátní ID pro SVG gradient.' },
      { name: 'flip',       type: 'boolean', required: false, default: 'false', description: '[SideOrnament / HexOrnament] Horizontálně otočí ornament.' },
      // HexOrnament extra
      { name: 'edgePadL',   type: 'number',  required: false, description: '[HexOrnament] Odsazení levé hrany.' },
      { name: 'edgePadR',   type: 'number',  required: false, description: '[HexOrnament] Odsazení pravé hrany.' },
      { name: 'textPadL',   type: 'number',  required: false, description: '[HexOrnament] Vnitřní levý padding pro text.' },
      { name: 'textPadR',   type: 'number',  required: false, description: '[HexOrnament] Vnitřní pravý padding pro text.' },
      { name: 'hexOffsetX', type: 'number',  required: false, description: '[HexOrnament] Horizontální posun hex motivu.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-badge'],
  },

  'submit-button': {
    description: 'Form submit wrapper around the Button component. Automatically reads the pending state of the parent form via React 19 useFormStatus and switches the button into loading mode without manual state management.',
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'children',      type: 'ReactNode',                                         required: false, default: "'Odeslat'", description: 'Výchozí obsah tlačítka mimo pending stav.' },
      { name: 'loadingLabel',  type: 'string',                                            required: false, description: 'Text zobrazený během pending stavu místo children.' },
      { name: 'variant',       type: "'default'|'danger'|'success'|'warning'|'link'",    required: false, default: "'default'", description: 'Předaný variant do základního Button.' },
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                              required: false, default: "'md'",      description: 'Button size.' },
      { name: 'leadingIcon',   type: 'ReactNode',                                         required: false, description: 'Icon to the left of the text.' },
      { name: 'trailingIcon',  type: 'ReactNode',                                         required: false, description: 'Icon to the right of the text.' },
      { name: 'iconOnly',      type: 'boolean',                                           required: false, default: 'false',     description: 'Čtvercový režim pouze s ikonou.' },
      { name: 'fullWidth',     type: 'boolean',                                           required: false, default: 'false',     description: 'Stretches the button to the parent full width.' },
      { name: 'disabled',      type: 'boolean',                                           required: false, default: 'false',     description: 'Zakáže tlačítko i mimo pending stav.' },
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
      { name: 'playerColor', type: 'string',                                         required: false, description: 'Přímá barva hráče (#hex) — má přednost před player.color.' },
      { name: 'shape',       type: "'erb'|'prapor'",                                required: false, default: "'erb'",  description: 'Tvar: erb = klasický štít s fixními proporcemi. prapor = banner s fixním tipem a variabilní délkou (přes width + height).' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'|number",                    required: false, default: "'md'",  description: 'Pojmenovaná velikost nebo pixel šířka (24–96 px). Použito pouze pro shape="erb".' },
      { name: 'width',       type: 'number',                                         required: false, default: '32',   description: 'Šířka v px pro shape="prapor". Tip škáluje s width (28.9 %).' },
      { name: 'height',      type: 'number',                                         required: false, default: '120',  description: 'Length in px for shape="prapor". The tip has a fixed size relative to width; the rest of the body scales freely.' },
      { name: 'showSymbol',  type: 'boolean',                                         required: false, default: 'true', description: 'Zobrazí římskou číslici uvnitř štítu (I–VI dle player.id). U prapor zarovnán nahoru.' },
      { name: 'ornament',      type: "'plain'|'decorated'",                          required: false, default: "'plain'", description: 'Decorative mode — turns on HexOrnament on the top edge and HrotErbu below the bottom tip. Hidden for size < 30 px.' },
      { name: 'ornamentColor', type: "'gold'|'player'",                              required: false, default: "'gold'",  description: 'Ornament color — gold (classic heraldic gold) or player (derived from player.color with alpha fade).' },
    ],
    relatedSlugs: ['hex-tile', 'die-face', 'donjon-badge', 'ornaments'],
  },

  'hex-tile': {
    description: 'Hexagonal tile of the game map. Shows the various hex states (empty, base, focal point) and player ownership.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/hexagon',
    props: [
      { name: 'state',     type: "'empty'|'base'|'focal-active'|'focal-passive'|'selected'|'move'|'attack'|'blocked'", required: true,  description: 'Stav hexu — určuje vizuální styl.' },
      { name: 'owner',     type: 'string',            required: false, description: 'Player color (#hex) — drives the base color.' },
      { name: 'size',      type: "'xs'|'sm'|'md'|'lg'", required: false, default: "'md'", description: 'Velikost hexu.' },
      { name: 'label',     type: 'string',            required: false, description: 'Popisek zobrazený uvnitř hexu.' },
      { name: 'showLabel', type: 'boolean',           required: false, default: 'false', description: 'Zobrazí label i bez najetí myší.' },
    ],
    relatedSlugs: ['die-face', 'float-feedback'],
  },

  'die-face': {
    description: 'Vizuální reprezentace jedné D6 kostky — zobrazuje hodnotu 1–6, barvu hráče a stavové módy (selected, rerolled).',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/dice',
    props: [
      { name: 'value',       type: 'number (1–6)',            required: true,  description: 'Hodnota kostky.' },
      { name: 'playerColor', type: 'string (#hex)',           required: true,  description: 'Player color — tints the die.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",    required: false, default: "'md'", description: 'Velikost kostky.' },
      { name: 'state',       type: "'default'|'selected'|'rerolled'", required: false, default: "'default'", description: 'Vizuální stav kostky.' },
    ],
    relatedSlugs: ['hex-tile', 'float-feedback'],
  },

  'float-feedback': {
    description: 'Short floating feedback showing a game event (VP gain, destruction, combat). Animates in and then disappears.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/float-feedback',
    props: [
      { name: 'text',     type: 'string',                              required: true,  description: 'Text zpětné vazby (např. "+1 VP").' },
      { name: 'variant',  type: "'default'|'danger'|'success'|'warning'", required: false, default: "'default'", description: 'Color variant.' },
      { name: 'visible',  type: 'boolean',                             required: true,  description: 'Spouští zobrazení a animaci.' },
      { name: 'animKey',  type: 'string | number',                     required: false, description: 'Změna klíče restartuje animaci.' },
      { name: 'onDone',   type: '() => void',                          required: false, description: 'Callback when the animation finishes.' },
      { name: 'style',    type: 'CSSProperties',                       required: false, description: 'Přidání inline stylů pro pozicování.' },
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
      { name: 'selected',    type: 'boolean',                                          required: false, default: 'false',     description: 'Zvýrazní dlaždici jako aktivně vybranou.' },
      { name: 'disabled',    type: 'boolean',                                          required: false, default: 'false',     description: 'Zakáže kliknutí a zeslabí vizuál.' },
      { name: 'locked',      type: 'boolean',                                          required: false, default: 'false',     description: 'Zobrazí lock stav a zablokuje interakci bez disabled stylu.' },
      { name: 'onClick',     type: '() => void',                                       required: false, description: 'Callback when an unlocked tile is clicked.' },
      { name: 'size',        type: "'sm'|'md'|'lg'",                                  required: false, default: "'md'",    description: 'Velikost dlaždice.' },
      { name: 'variant',     type: "'default'|'attack'|'move'|'special'",             required: false, default: "'default'", description: 'Action color and semantic type.' },
      { name: 'ornament',    type: "'plain'|'decorated'",                              required: false, default: "'decorated'", description: 'Decorated adds SideOrnament brackets and an octagon shell (default), plain is the baseline tile.' },
      { name: 'style',       type: 'CSSProperties',                                    required: false, description: 'Inline styles for layout fine-tuning.' },
      { name: 'className',   type: 'string',                                           required: false, description: 'Additional CSS classes.' },
    ],
    relatedSlugs: ['player-panel', 'event-log', 'float-feedback'],
  },

  'event-log': {
    description: 'Scrollovatelný seznam herních událostí s typovou ikonou, volitelným kolem a automatickým posunem na nejnovější záznam. Výchozí režim je plain; volitelně umí i dekorovaný donjon shell.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/event-log',
    props: [
      { name: 'events',       type: 'Array<{ id?, type?, text, detail?, round? }>',    required: false, default: '[]',                 description: 'Seznam logovaných událostí v pořadí od nejstarší po nejnovější.' },
      { name: 'maxHeight',    type: 'number',                                           required: false, default: '280',                description: 'Maximum scroll area height in px.' },
      { name: 'title',        type: 'string',                                           required: false, default: "'Game log'",      description: 'Titulek hlavičky komponenty.' },
      { name: 'showTitle',    type: 'boolean',                                          required: false, default: 'true',               description: 'Zobrazí nebo skryje hlavičku s titulkem a počtem záznamů.' },
      { name: 'showRound',    type: 'boolean',                                          required: false, default: 'true',               description: 'Zobrazí číslo kola u jednotlivých záznamů.' },
      { name: 'autoScroll',   type: 'boolean',                                          required: false, default: 'true',               description: 'Po změně events automaticky posune výpis na konec.' },
      { name: 'ornament',     type: "'plain'|'decorated'",                              required: false, default: "'decorated'",        description: 'Vizuální režim shellu logu — dekorovaný donjon panel (default) nebo plain baseline.' },
      { name: 'emptyMessage', type: 'string',                                           required: false, default: "'Zatím žádné události.'", description: 'Text pro prázdný stav bez záznamů.' },
      { name: 'showFilters',  type: 'boolean',                                          required: false, default: 'false',              description: 'Zobrazí typové filter chipy v hlavičce (gain/loss/event/warning/system).' },
      { name: 'showSearch',   type: 'boolean',                                          required: false, default: 'false',              description: 'Zobrazí search input v hlavičce — fulltext přes text a detail.' },
      { name: 'groupByRound', type: 'boolean',                                          required: false, default: 'false',              description: 'Seskupí události podle pole round s headerem "Kolo N".' },
      { name: 'renderEvent',  type: '(entry, defaultRender) => ReactNode',              required: false, description: 'Custom renderer for an individual event. The second argument is the default JSX fallback.' },
      { name: 'style',        type: 'CSSProperties',                                    required: false, description: 'Inline styles on the wrapping container.' },
      { name: 'className',    type: 'string',                                           required: false, description: 'Additional CSS classes on the wrapping container.' },
    ],
    relatedSlugs: ['float-feedback', 'action-tile', 'resource-bar'],
  },

  'numeric-display': {
    description: 'Číselný herní counter pro VP, HP, manu nebo zdroje. V donjon konzistenci slouží jako referenční plain baseline counter bez ornamentální vrstvy; při změně hodnoty krátce problikne a zobrazí plovoucí delta badge.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/numeric-display',
    props: [
      { name: 'value',         type: 'number',                                          required: false, default: '0',                  description: 'Current numeric value.' },
      { name: 'label',         type: 'string',                                          required: false, description: 'Popisek counteru.' },
      { name: 'prefix',        type: 'string',                                          required: false, description: 'Text nebo znak před hodnotou.' },
      { name: 'suffix',        type: 'string',                                          required: false, description: 'Text nebo znak za hodnotou.' },
      { name: 'size',          type: "'sm'|'md'|'lg'",                                 required: false, default: "'md'",             description: 'Velikost čísla a badge.' },
      { name: 'variant',       type: "'default'|'vp'|'resource'|'mana'",               required: false, default: "'default'",        description: 'Color variant per resource type.' },
      { name: 'labelPosition', type: "'top'|'bottom'|'left'|'right'",                  required: false, default: "'top'",            description: 'Pozice popisku vůči číslu.' },
      { name: 'style',         type: 'CSSProperties',                                    required: false, description: 'Inline styly pro wrapper.' },
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
      { name: 'show',      type: 'boolean',                                                                 required: true,  description: 'Řídí mount stav a spuštění enter nebo exit animace.' },
      { name: 'preset',    type: "'fadeScale'|'slideUp'|'slideDown'|'pop'|'fade'|'slideLeft'",            required: false, default: "'fadeScale'", description: 'Předdefinovaný typ přechodu.' },
      { name: 'duration',  type: 'number',                                                                  required: false, description: 'Vlastní délka animace v ms; výchozí je animSlow token.' },
      { name: 'children',  type: 'ReactNode',                                                               required: true,  description: 'Content wrapped by the transition.' },
      { name: 'style',     type: 'CSSProperties',                                                           required: false, description: 'Additional inline styles merged with the computed transition style.' },
      { name: 'className', type: 'string',                                                                  required: false, description: 'Additional CSS classes for the wrapper.' },
      { name: 'as',        type: 'string | React.ElementType',                                              required: false, default: "'div'",       description: 'HTML tag or component used as the wrapper.' },
      { name: 'onExited',  type: '() => void',                                                              required: false, description: 'Callback invoked after the exit animation completes and the element unmounts.' },
    ],
    relatedSlugs: ['float-feedback', 'player-panel', 'modal'],
  },

  'phase-indicator': {
    description: 'Sekvenční ukazatel fází tahu nebo celé hry. Zobrazuje dokončené kroky, aktuální fázi a budoucí kroky v horizontálním i vertikálním rozložení. V donjon konzistenci slouží jako referenční plain progress indikátor bez ornamentální vrstvy.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/phase-indicator',
    props: [
      { name: 'phases',       type: 'Array<{ id: string, label: string, icon?: ReactNode, description?: string }>', required: false, default: '[]',          description: 'Seznam fází v pořadí, v jakém mají probíhat.' },
      { name: 'currentPhase', type: 'string',                                                                     required: true,  description: 'ID of the currently active phase.' },
      { name: 'orientation',  type: "'horizontal'|'vertical'",                                                  required: false, default: "'horizontal'", description: 'Směr zobrazení indikátoru.' },
      { name: 'size',         type: "'sm'|'md'",                                                                 required: false, default: "'md'",         description: 'Velikost bodů, linek a textu.' },
      { name: 'onPhaseClick', type: '(phaseId: string) => void',                                                  required: false, description: 'Volitelný callback pro klik na aktuální nebo již splněné fáze.' },
      { name: 'style',        type: 'CSSProperties',                                                              required: false, description: 'Inline styly wrapperu.' },
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
      { name: 'symbol',     type: "'sword'|'shield'|'tower'",            required: false, default: "'sword'",  description: 'Symbol zobrazený v erbu.' },
      { name: 'vp',         type: 'number',                               required: false, default: '0',          description: 'Počet vítězných bodů v badge.' },
      { name: 'hp',         type: 'number',                               required: false, description: 'Current HP; when set, renders the HP bar.' },
      { name: 'maxHp',      type: 'number',                               required: false, default: '100',        description: 'Maximum HP used to compute the bar.' },
      { name: 'mana',       type: 'number',                               required: false, description: 'Current mana; when set, renders the mana bar.' },
      { name: 'maxMana',    type: 'number',                               required: false, default: '100',        description: 'Maximum mana used to compute the bar.' },
      { name: 'stamina',    type: 'number',                               required: false, description: 'Current stamina; when set, renders the stamina bar.' },
      { name: 'maxStamina', type: 'number',                               required: false, default: '100',        description: 'Maximum stamina used to compute the bar.' },
      { name: 'children',   type: '<PlayerPanel.Resource>[]',             required: false, description: 'Composition API — an array of resources (hp/mana/stamina/sanity/...). When provided, flat props are ignored.' },
      { name: 'isActive',   type: 'boolean',                              required: false, default: 'false',      description: 'Zvýrazní panel jako hráče na tahu.' },
      { name: 'eliminated', type: 'boolean',                              required: false, default: 'false',      description: 'Oslabí panel a zobrazí stav vyřazení.' },
      { name: 'size',       type: "'sm'|'md'",                           required: false, default: "'md'",     description: 'Velikost panelu.' },
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
      { name: 'size',      type: "'sm'|'md'|'lg'",                                                  required: false, default: "'md'",    description: 'Výška a typografie baru.' },
      { name: 'variant',   type: "'hp'|'mana'|'stamina'|'xp'|'shield'|'default'",                  required: false, default: "'hp'",    description: 'Typ resource baru a jeho barevné chování.' },
      { name: 'label',     type: 'string',                                                           required: false, description: 'Popisek nad barem.' },
      { name: 'showValue', type: 'boolean',                                                          required: false, default: 'false',     description: 'Zobrazí číselnou hodnotu vpravo v hlavičce.' },
      { name: 'zones',     type: 'boolean',                                                          required: false, default: 'true',      description: 'Zapne zónové pozadí a hranice prahů.' },
      { name: 'flashKey',  type: 'string | number',                                                  required: false, description: 'Změna hodnoty restartuje damage flash overlay.' },
      { name: 'style',     type: 'CSSProperties',                                                    required: false, description: 'Inline styly wrapperu.' },
      { name: 'className', type: 'string',                                                           required: false, description: 'Additional CSS classes for the wrapper.' },
    ],
    relatedSlugs: ['numeric-display', 'player-panel', 'donjon-progress-bar'],
  },

  /* ── donjon-fall-ui rozšíření TkajUI (re-exporty) ─────────────────── */

  'donjon-tabs': {
    description: 'Game variant of Tabs. underline and topline use ornament lines with a hex motif, pills uses a framed track. Plain mode without ornament lines. Full API parity with TkajUI Tabs, including horizontal and vertical orientations.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'tabs',
    differencesFromBase: [
      'Ornamental shell with a HexOrnament accent (decorated mode)',
      'Zlatý aktivní stav + ornamentální indikátor',
      'Variants `underline` a `pills` mapované na herní estetiku',
      'Ve vertikální orientaci se gapped-lines ornamenty vypnou (designované pro horizontální layout)',
    ],
    status: 'documented',
    showcaseRoute: '/tabs',
    props: [
      { name: 'items',       type: 'Array<{value, label, icon?, badge?, disabled?, closable?}>',  required: true,  description: 'Tab list. closable: true shows × when onClose is provided.' },
      { name: 'value',       type: 'string',                                                   required: true,  description: 'Value of the active tab.' },
      { name: 'onChange',    type: '(value: string) => void',                                 required: true,  description: 'Callback when the tab changes.' },
      { name: 'variant',     type: "'underline'|'pills'",                                    required: false, default: "'underline'", description: 'Visual style.' },
      { name: 'ornament',    type: "'decorated'|'plain'",                                    required: false, default: "'decorated'", description: 'Vizuální režim donjon linek a shellu — s ornamenty nebo bez nich.' },
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
      'Zlatý dropdown arrow + warm dark dropdown background',
      'Donjon paleta — gold border, bg2 dropdown surface',
      '`variant` prop (5 stavů) — parita s TkajUI Select pro success/danger/warning/info kontextové stavy',
    ],
    status: 'documented',
    showcaseRoute: '/select',
    props: [
      { name: 'value',       type: 'string | null',                                        required: true,  description: 'Selected value.' },
      { name: 'onChange',    type: '(value: string) => void',                              required: true,  description: 'Callback on selection.' },
      { name: 'options',     type: 'Array<{value, label, disabled?}>',                    required: true,  description: 'Option list.' },
      { name: 'placeholder', type: 'string',                                               required: false, default: "'Select an option…'", description: 'Empty-state text.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Popisek nad triggerem.' },
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
      'Zlatý thumb s diamantovým tvarem (octagon clip) místo round',
      'Tmavá drážka — bg1 trough místo surface2',
      'Donjon palette — gold fill instead of accent blue',
      '`variant` prop (5 stavů) — parita s TkajUI Slider pro kontextové bary',
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
      { name: 'label',       type: 'string',                              required: false, description: 'Popisek nad sliderem.' },
      { name: 'showValue',   type: 'boolean',                             required: false, default: 'false', description: 'Zobrazí aktuální hodnotu.' },
      { name: 'disabled',    type: 'boolean',                             required: false, default: 'false', description: 'Znepřístupní slider.' },
      { name: 'formatValue', type: '(value: number) => string',          required: false, description: 'Formatter function for the displayed value.' },
      { name: 'ticks',       type: 'number | number[]',                   required: false, description: 'Vizuální markery na trati. Číslo = počet rozdělení; pole = konkrétní hodnoty.' },
      { name: 'thumbShape',  type: "'diamond'|'circle'|'octagon'",       required: false, default: "'diamond'", description: 'Tvar thumbu — diamond (default), circle, octagon.' },
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
      '`variant` prop (5 stavů) + `id` prop — parita s TkajUI Toggle (success/danger/warning/info + label-binding)',
    ],
    status: 'documented',
    showcaseRoute: '/toggle',
    props: [
      { name: 'checked',       type: 'boolean',                                                  required: true,  description: 'Stav přepínače.' },
      { name: 'onChange',      type: '(checked: boolean) => void',                              required: true,  description: 'Toggle callback.' },
      { name: 'label',         type: 'string',                                                   required: false, description: 'Textový popisek.' },
      { name: 'labelPosition', type: "'left'|'right'",                                           required: false, default: "'right'",   description: 'Pozice popisku.' },
      { name: 'size',          type: "'sm'|'md'",                                                required: false, default: "'md'",      description: 'Toggle size.' },
      { name: 'variant',       type: "'default'|'danger'|'success'|'warning'|'info'",          required: false, default: "'default'", description: 'Color variant. Parity with TkajUI Toggle.' },
      { name: 'disabled',      type: 'boolean',                                                  required: false, default: 'false',     description: 'Znepřístupní přepínač.' },
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
      '`ticks` prop — počítatelné resourcy (např. 10 dílků pro HP)',
      '`flash` prop — damage flash animace pro herní feedback',
      'Výšky sjednocené s TkajUI (md=8) — drop-in replacement bez layout posunu',
    ],
    status: 'documented',
    showcaseRoute: '/progress-bar',
    props: [
      { name: 'value',         type: 'number',                                                                              required: false, default: '0',         description: 'Current value (0 – max).' },
      { name: 'max',           type: 'number',                                                                              required: false, default: '100',       description: 'Maximum value.' },
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                                                                 required: false, default: "'md'",      description: 'Track height.' },
      { name: 'variant',       type: "'default'|'hp'|'mana'|'stamina'|'xp'",                                              required: false, default: "'default'", description: 'Default = universal (gold/threshold). HP/mana/stamina/xp = game presets with a fixed color.' },
      { name: 'label',         type: 'string',                                                                              required: false, description: 'Popisek nad barem.' },
      { name: 'showValue',     type: 'boolean',                                                                             required: false, default: 'false',     description: 'Zobrazí procenta vpravo.' },
      { name: 'ticks',         type: 'number',                                                                              required: false, default: '0',         description: 'Počet dělicích čar (0 = žádné). Herní extra.' },
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
      'Pergamen-feel — zlatý border + warm dark bg2',
      'Octagon arrow instead of a triangle',
      'Volitelný titulek (gold gradient) nad obsahem',
      '`variant` prop (5 stavů) — parita s TkajUI Tooltip pro kontextové bubliny',
    ],
    status: 'documented',
    showcaseRoute: '/tooltip',
    props: [
      { name: 'children',   type: 'ReactNode',                                              required: true,  description: 'Trigger element.' },
      { name: 'content',    type: 'string',                                                  required: true,  description: 'Text tooltipu.' },
      { name: 'title',      type: 'string',                                                  required: false, description: 'Volitelný titulek nad textem.' },
      { name: 'placement',  type: "'top'|'bottom'|'left'|'right' + '-start'|'-end'",        required: false, default: "'top'",     description: '12 values: 4 sides × 3 alignments (default/-start/-end).' },
      { name: 'variant',    type: "'default'|'danger'|'success'|'warning'|'info'",          required: false, default: "'default'", description: 'Color variant.' },
      { name: 'delay',      type: 'number',                                                  required: false, default: '120',       description: 'Zpoždění zobrazení v ms.' },
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
      'Pergamen-feel — zlatý border + warm dark bg',
      'Octagon clip-path instead of a rounded card',
      'A11y: role="alert" + aria-live="assertive" for loss/warning (interrupts the screen reader), role="status" + polite for gain/event/default',
    ],
    status: 'documented',
    showcaseRoute: '/toast',
    props: [
      { name: 'title',    type: 'string',                                              required: false, description: 'Titulek toastu (tučný, gradientový).' },
      { name: 'message',  type: 'string',                                              required: false, description: 'Message body text.' },
      { name: 'variant',  type: "'default'|'success'|'danger'|'warning'|'info'",      required: false, default: "'default'", description: 'Color variant.' },
      { name: 'duration', type: 'number',                                              required: false, default: '4000',      description: 'Čas do auto-zavření v ms. 0 = trvalý.' },
    ],
    relatedSlugs: ['toast', 'float-feedback'],
  },

  /* ── Utility / Clip components ────────────────────────────────────── */

  'donjon-pictogram': {
    description: 'Game variant of Pictogram — icon with a dark octagonal background and a gold / fantasy color palette. Five variants (active, passive, disabled, danger, success), four sizes, optional bare mode without a background. Drop-in compat with TkajUI Pictogram via the `color` prop.',
    subcategory: 'extends-tkajui',
    extendsSlug: 'pictogram',
    differencesFromBase: [
      'Variant prop (active/passive/disabled/danger/success) — herní paleta místo single `color`',
      '`color` prop pro drop-in compat s TkajUI (přepíše barvu z variant)',
      '`bare={false}` přidá oktagonální clip-path wrapper + glow filtr (herní rámeček)',
    ],
    status: 'documented',
    showcaseRoute: '/pictograms',
    props: [
      { name: 'icon',      type: 'React.ComponentType<{width, height}>', required: true,  description: 'SVG komponenta z donjon/icons.' },
      { name: 'size',      type: "'sm'|'md'|'lg'|'xl'",                  required: false, default: "'md'",      description: 'Velikost ikony (16 / 24 / 32 / 48 px).' },
      { name: 'color',     type: 'string',                               required: false, description: 'Override barvy ikony — parita s TkajUI Pictogram. Když je předán, přebíjí `variant`. CSS color (hex / rgb / token).' },
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
      { name: 'icon',      type: 'React.ComponentType<{width, height, color}>', required: true,  description: 'SVG komponenta (přijímá width, height, color).' },
      { name: 'size',      type: "'sm'|'md'|'lg'|'xl'",                         required: false, default: "'md'",          description: 'Velikost (16 / 24 / 32 / 48 px).' },
      { name: 'color',     type: 'string',                                       required: false, default: "'currentColor'", description: 'CSS barva ikony.' },
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
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'", required: false, description: 'Velikostní preset — sjednocený s octagonem. V bezier módu mapuje na SHAPE_SIZES[size].bb, v circle módu na SHAPE_SIZES[size].scoop + default w/h z SHAPE_SIZES.' },
      { name: 'cornerSize',  type: 'number',      required: false, default: '0.25 (bezier) / preset.scoop (circle)',  description: 'Velikost rohového zkosení (sjednocená terminologie s octagonem). V bezier módu 0–0.5 (relativní podíl), v circle módu absolutní px. Má přednost před size.' },
      { name: 'r',           type: 'number',      required: false, description: '⚠ DEPRECATED — alias pro cornerSize, zachováno pro backward compat. V novém kódu používej cornerSize.' },
      { name: 'borderColor', type: 'string',      required: false, description: 'Border color — renders an outer layer with the same clipPath.' },
      { name: 'borderWidth', type: 'number',      required: false, default: '1', description: 'Border thickness in px.' },
      { name: 'children',    type: 'ReactNode',   required: false, description: 'Content wrapped by the clipPath shape.' },
      { name: 'style',       type: 'CSSProperties', required: false, description: 'Inline styles. In circle mode, width/height are auto-filled from SHAPE_SIZES[size] if not set.' },
      { name: 'className',   type: 'string',      required: false, description: 'Tailwind třídy na obalový div.' },
    ],
    relatedSlugs: ['corner-ornament', 'ornaments', 'notched-box'],
  },

  'corner-ornament': {
    description: 'Decorative corner ornament. Positioned absolutely into a panel or frame corner. Four shape variants and three corner geometries (cut/round/scoop).',
    status: 'documented',
    showcaseRoute: '/ornaments',
    props: [
      { name: 'cornerSize', type: "number|'xs'|'sm'|'md'|'lg'",                 required: false, description: 'Velikost ornamenty — px nebo size preset. Preset mapuje na SHAPE_SIZES[preset].cut. Sjednocená terminologie s octagon a ScoopClip.' },
      { name: 'size',       type: 'number',                                     required: false, default: '16',       description: '⚠ DEPRECATED — alias pro cornerSize (px).' },
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
      { name: 'cornerSize', type: 'number',                              required: false, default: '15',       description: 'Velikost rohového zkosení v px — sjednocená terminologie s octagon a ScoopClip.' },
      { name: 'cx',       type: 'number',                                required: false, description: '⚠ DEPRECATED — alias pro cornerSize.' },
      { name: 'nw',       type: 'number',                                required: false, default: '28',       description: 'Notch width in px.' },
      { name: 'nh',       type: 'number',                                required: false, default: '12',       description: 'Notch depth in px.' },
      { name: 'side',        type: "'top'|'bottom'|'left'|'right'",   required: false, default: "'bottom'", description: 'Strana na které je zářez.' },
      { name: 'notchOffset', type: 'number',                            required: false, default: '0.5',      description: 'Pozice zářezu podél strany (0 = start, 0.5 = střed, 1 = konec). Slot ho automaticky sleduje.' },
      { name: 'borderColor', type: 'string',                            required: false, description: 'Border color — renders an underlay layer with the same shape.' },
      { name: 'borderWidth', type: 'number',                            required: false, default: '1', description: 'Border thickness in px.' },
      { name: 'children', type: 'ReactNode',                             required: false, description: 'Panel content + optional NotchedBox.Slot.' },
      { name: 'style',    type: 'CSSProperties',                        required: false, description: 'Inline styly na clipped div (width, height, background…).' },
      { name: 'className', type: 'string',                              required: false, description: 'Tailwind třídy na clipped div.' },
    ],
    relatedSlugs: ['scoop-clip', 'corner-ornament', 'ornaments'],
  },

  'icons': {
    description: 'Sada herních SVG ikon pro donjon-fall-ui. Každá ikona je čistá SVG komponenta přijímající width a height — barvu řídí currentColor. Určeno k použití přes DonjonPictogram nebo Pictogram wrapper.',
    status: 'documented',
    showcaseRoute: '/pictograms',
    props: [
      { name: 'width',  type: 'number', required: false, default: '24', description: 'Šířka SVG v px.' },
      { name: 'height', type: 'number', required: false, default: '24', description: 'Výška SVG v px.' },
    ],
    relatedSlugs: ['donjon-pictogram', 'pictogram'],
  },

  /* ── Layout (internal) ─────────────────────────────────────────────── */

  'layout': {
    description: 'Main app wrapper — combines the sidebar, mobile header and the routed page content. Internal component, not intended for direct use.',
    status: 'documented',
    props: [
      // Layout nemá veřejné props — interní state: sidebarOpen
    ],
    relatedSlugs: ['sidebar', 'showcase-page'],
  },

  'sidebar': {
    description: 'Style guide navigation tree — renders sections, items and sub-sections. Highlights the active route. Internal presentation component.',
    status: 'documented',
    props: [
      { name: 'isOpen',  type: 'boolean',      required: true, description: 'Otevřenost sidebaru na mobilním zařízení.' },
      { name: 'onClose', type: '() => void',   required: true, description: 'Callback to close the sidebar.' },
    ],
    relatedSlugs: ['layout', 'showcase-page'],
  },

  'device-frame': {
    description: 'Vizuální rámeček simulující fyzické zařízení (desktop, tablet, mobil) pro dokumentaci layoutů. Exportuje také ComparisonRow pro srovnávací řadu.',
    status: 'documented',
    props: [
      // DeviceFrame
      { name: 'type',     type: "'desktop'|'tablet'|'mobile'", required: true,  description: '[DeviceFrame] Typ zařízení.' },
      { name: 'children', type: 'ReactNode',                   required: true,  description: '[DeviceFrame] Obsah uvnitř rámečku.' },
      // ComparisonRow
      { name: 'desktop',  type: 'ReactNode',                   required: true,  description: '[ComparisonRow] Layout pro desktop frame.' },
      { name: 'tablet',   type: 'ReactNode',                   required: true,  description: '[ComparisonRow] Layout pro tablet frame.' },
      { name: 'mobile',   type: 'ReactNode',                   required: true,  description: '[ComparisonRow] Layout pro mobile frame.' },
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
      { name: 'events',     type: "Array<{id, text, type, timestamp}>",                              required: true,  description: "Pole herních událostí. Typy: 'gain' | 'loss' | 'event' | 'warning' | 'system'." },
      { name: 'maxVisible', type: 'number',                                                           required: false, default: '5',             description: 'Maximum number of most-recent entries shown. Older ones are archived.' },
      { name: 'position',   type: "'bottom-right'|'bottom-left'|'top-right'|'top-left'",             required: false, default: "'bottom-right'", description: 'Roh obrazovky kde se panel zobrazí.' },
      { name: 'onClear',    type: '() => void',                                                       required: false, description: 'Callback for the Clear button in the panel header.' },
      { name: 'ornament',   type: "'plain'|'decorated'",                                                  required: false, default: "'decorated'", description: 'Decorated adds RohOrnament brackets inside an octagon shell (default), plain is the baseline panel.' },
    ],
    relatedSlugs: ['event-log', 'donjon-toast', 'game-transition', 'donjon-badge'],
  },

  'showcase-page': {
    description: 'Základní layout dokumentačních stránek. Skládá se ze čtyř exportů: ShowcasePage, Section, Preview a CodeBlock.',
    status: 'documented',
    props: [
      // ShowcasePage
      { name: 'title',       type: 'string',    required: true,  description: '[ShowcasePage] Nadpis stránky.' },
      { name: 'description', type: 'string',    required: false, description: '[ShowcasePage / Section] Popis pod nadpisem.' },
      { name: 'children',    type: 'ReactNode', required: true,  description: '[ShowcasePage / Section / Preview] Obsah.' },
      // Section
      { name: 'id',          type: 'string',    required: false, description: '[Section] Anchor ID pro sidebar odkaz.' },
      // Preview
      { name: 'dark',        type: 'boolean',   required: false, default: 'true', description: '[Preview] Tmavé pozadí preview boxu.' },
      // CodeBlock
      { name: 'code',        type: 'string',    required: true,  description: '[CodeBlock] Zdrojový kód k zobrazení.' },
    ],
    relatedSlugs: ['layout', 'sidebar', 'device-frame'],
  },

}
