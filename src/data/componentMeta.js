/* ── Fáze 2: metadata vrstva ─────────────────────────────────────────────
   Ručně psané informace o komponentách — popis, props, pravidla, vazby.
   Klíč = slug komponenty (stabilní, odvozený z názvu souboru).

   Tato vrstva NIKDY nepřepisuje automaticky generovaná data (name, filePath,
   category, visibility, slug, route). Doplňuje pouze obsahový obsah.

   Stav dokumentace (status):
     'generated'  — jen automatická data, nic ručního
     'draft'      — popis nebo props existují, ale nejsou kompletní
     'documented' — povinné bloky jsou vyplněny
   ─────────────────────────────────────────────────────────────────────── */

export const componentMeta = {

  /* ── UI Components ─────────────────────────────────────────────────── */

  'badge': {
    description: 'Stavový odznak s oktagonálním tvarem. Sémantické barevné varianty, volitelná tečka pro živý stav a ikona. DonjonBadge je vizuálně identický re-export.',
    status: 'documented',
    showcaseRoute: '/badges',
    props: [
      { name: 'children', type: 'ReactNode',                                              required: true,  description: 'Text odznaku.' },
      { name: 'variant',  type: "'default'|'success'|'danger'|'warning'|'info'",          required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'size',     type: "'sm'|'md'",                                              required: false, default: "'md'",      description: 'Velikost.' },
      { name: 'dot',      type: 'boolean',                                                required: false, default: 'false',     description: 'Zobrazí barevnou tečku vlevo.' },
      { name: 'icon',     type: 'ReactNode',                                              required: false, default: 'undefined', description: 'Ikona místo tečky.' },
    ],
    relatedSlugs: ['donjon-badge', 'button', 'donjon-card'],
  },

  'button': {
    description: 'Základní akční tlačítko s oktagonálním tvarem. Čtyři sémantické varianty, tři velikosti, podpora ikon a loading stavu. DonjonButton rozšiřuje o SideOrnament a HexOrnament.',
    status: 'documented',
    showcaseRoute: '/buttons',
    props: [
      { name: 'children',      type: 'ReactNode',                                         required: false, description: 'Obsah tlačítka.' },
      { name: 'variant',       type: "'default'|'danger'|'success'|'warning'|'link'",     required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'size',          type: "'xs'|'sm'|'md'|'lg'",                              required: false, default: "'md'",      description: 'Velikost.' },
      { name: 'leadingIcon',   type: 'ReactNode',                                         required: false, default: 'undefined', description: 'Ikona vlevo od textu.' },
      { name: 'trailingIcon',  type: 'ReactNode',                                         required: false, default: 'undefined', description: 'Ikona vpravo od textu.' },
      { name: 'iconOnly',      type: 'boolean',                                           required: false, default: 'false',     description: 'Čtvercové tlačítko jen s ikonou.' },
      { name: 'fullWidth',     type: 'boolean',                                           required: false, default: 'false',     description: 'Roztáhne tlačítko na plnou šířku.' },
      { name: 'loading',       type: 'boolean',                                           required: false, default: 'false',     description: 'Zobrazí spinner a zablokuje klikání.' },
      { name: 'disabled',      type: 'boolean',                                           required: false, default: 'false',     description: 'Deaktivuje tlačítko.' },
    ],
    relatedSlugs: ['donjon-button', 'button-group', 'modal'],
  },

  'card': {
    description: 'Kontejnerová karta s oktagonálním rámem. Volitelná hlavička (title + description), tělo a patička. DonjonCard rozšiřuje o SideOrnament a HexOrnament.',
    status: 'documented',
    showcaseRoute: '/cards',
    props: [
      { name: 'children',    type: 'ReactNode',                             required: false, description: 'Obsah těla karty.' },
      { name: 'title',       type: 'string',                                required: false, default: 'undefined', description: 'Nadpis v hlavičce.' },
      { name: 'description', type: 'string',                                required: false, default: 'undefined', description: 'Podnadpis v hlavičce.' },
      { name: 'footer',      type: 'ReactNode',                             required: false, default: 'undefined', description: 'Obsah patičky — typicky akční tlačítka.' },
      { name: 'variant',     type: "'default'|'danger'|'success'",          required: false, default: "'default'", description: 'Barevná varianta rámu a hlavičky.' },
    ],
    relatedSlugs: ['donjon-card', 'modal', 'button'],
  },

  'input': {
    description: 'Textové vstupní pole s oktagonálním rámem. Label, hint, error stav, leading/trailing ikony. DonjonInput je vizuálně identický re-export.',
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'label',        type: 'string',                               required: false, description: 'Popisek pole — zobrazí se nad polem.' },
      { name: 'value',        type: 'string',                               required: true,  description: 'Aktuální hodnota pole.' },
      { name: 'onChange',     type: '(e: ChangeEvent) => void',             required: true,  description: 'Handler změny hodnoty.' },
      { name: 'placeholder',  type: 'string',                               required: false, default: 'undefined', description: 'Zástupný text.' },
      { name: 'size',         type: "'sm'|'md'|'lg'",                      required: false, default: "'md'",      description: 'Výška pole.' },
      { name: 'leadingIcon',  type: 'ReactNode',                            required: false, default: 'undefined', description: 'Ikona vlevo uvnitř pole.' },
      { name: 'trailingIcon', type: 'ReactNode',                            required: false, default: 'undefined', description: 'Ikona vpravo uvnitř pole.' },
      { name: 'error',        type: 'string',                               required: false, default: 'undefined', description: 'Chybová zpráva — zbarví rámeček červeně.' },
      { name: 'hint',         type: 'string',                               required: false, default: 'undefined', description: 'Nápověda pod polem (šedá, bez error stavu).' },
      { name: 'disabled',     type: 'boolean',                              required: false, default: 'false',     description: 'Deaktivuje pole.' },
    ],
    relatedSlugs: ['donjon-input', 'select', 'button'],
  },

  'tabs': {
    description: 'Horizontální záložková navigace. Varianta underline pro hlavní navigaci, pills pro in-panel navigaci. Podporuje ikony, badge počty, disabled záložky a klávesnicové šipky.',
    status: 'documented',
    showcaseRoute: '/tabs',
    props: [
      { name: 'items',    type: 'Array<{value, label, icon?, badge?, disabled?}>',         required: true,  description: 'Seznam záložek.' },
      { name: 'value',    type: 'string',                                                   required: true,  description: 'Hodnota aktivní záložky.' },
      { name: 'onChange', type: '(value: string) => void',                                 required: true,  description: 'Callback při změně záložky.' },
      { name: 'variant',  type: "'underline'|'pills'",                                    required: false, default: "'underline'", description: 'Vizuální styl.' },
      { name: 'size',     type: "'sm'|'md'|'lg'",                                         required: false, default: "'md'",        description: 'Velikost záložek.' },
    ],
    relatedSlugs: ['button-group', 'donjon-card', 'modal'],
  },

  'select': {
    description: 'Vlastní dropdown pro výběr jedné hodnoty ze seznamu. Oktagonální trigger, klávesnicová navigace šipkami a Escape, podpora disabled položek.',
    status: 'documented',
    showcaseRoute: '/select',
    props: [
      { name: 'value',       type: 'string | null',                                        required: true,  description: 'Vybraná hodnota.' },
      { name: 'onChange',    type: '(value: string) => void',                              required: true,  description: 'Callback při výběru.' },
      { name: 'options',     type: 'Array<{value, label, disabled?}>',                    required: true,  description: 'Seznam možností.' },
      { name: 'placeholder', type: 'string',                                               required: false, default: "'Vyber možnost…'", description: 'Text prázdného stavu.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Popisek nad triggerem.' },
      { name: 'size',        type: "'sm'|'md'|'lg'",                                      required: false, default: "'md'",      description: 'Výška triggeru.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'",              required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'disabled',    type: 'boolean',                                              required: false, default: 'false',     description: 'Zakáže celý select.' },
    ],
    relatedSlugs: ['donjon-input', 'button-group', 'toggle'],
  },

  'slider': {
    description: 'Range input pro výběr hodnoty v rozsahu. Nativní <input type=range> překrytý vlastním vizuálem navazujícím na ProgressBar. Podpora formatValue pro jednotky.',
    status: 'documented',
    showcaseRoute: '/slider',
    props: [
      { name: 'value',       type: 'number',                                               required: true,  description: 'Aktuální hodnota.' },
      { name: 'onChange',    type: '(value: number) => void',                             required: true,  description: 'Callback při změně.' },
      { name: 'min',         type: 'number',                                               required: false, default: '0',         description: 'Minimální hodnota.' },
      { name: 'max',         type: 'number',                                               required: false, default: '100',        description: 'Maximální hodnota.' },
      { name: 'step',        type: 'number',                                               required: false, default: '1',         description: 'Krok změny.' },
      { name: 'size',        type: "'sm'|'md'|'lg'",                                      required: false, default: "'md'",       description: 'Výška traku.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'|'info'",       required: false, default: "'default'",  description: 'Barevná varianta.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Popisek nad sliderem.' },
      { name: 'showValue',   type: 'boolean',                                              required: false, default: 'false',      description: 'Zobrazí aktuální hodnotu vpravo.' },
      { name: 'formatValue', type: '(value: number) => string',                           required: false, description: 'Formátuje zobrazenou hodnotu (např. přidá jednotky).' },
      { name: 'disabled',    type: 'boolean',                                              required: false, default: 'false',      description: 'Zakáže interakci.' },
    ],
    relatedSlugs: ['progress-bar', 'toggle', 'donjon-input'],
  },

  'progress-bar': {
    description: 'Lineární ukazatel průběhu. Determinate (value 0–100) nebo indeterminate (animovaný shimmer). Pět variant, tři velikosti, volitelný popisek a procenta.',
    status: 'documented',
    showcaseRoute: '/progress-bar',
    props: [
      { name: 'value',         type: 'number',                                                    required: false, default: '0',         description: 'Aktuální hodnota (0 až max).' },
      { name: 'max',           type: 'number',                                                    required: false, default: '100',        description: 'Maximální hodnota.' },
      { name: 'size',          type: "'sm'|'md'|'lg'",                                           required: false, default: "'md'",       description: 'Výška lišty (4 / 8 / 14 px).' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'|'info'",            required: false, default: "'default'",  description: 'Barevná varianta výplně.' },
      { name: 'label',         type: 'string',                                                    required: false, description: 'Popisek nad lištou (také aria-label).' },
      { name: 'showValue',     type: 'boolean',                                                   required: false, default: 'false',      description: 'Zobrazí procentuální hodnotu vpravo nad lištou.' },
      { name: 'indeterminate', type: 'boolean',                                                   required: false, default: 'false',      description: 'Animovaný shimmer pro neznámý průběh.' },
    ],
    relatedSlugs: ['toggle', 'donjon-badge', 'toast'],
  },

  'toggle': {
    description: 'Přepínač on/off pro binární nastavení s okamžitým efektem. Pill tvar, animovaný thumb, plná klávesnicová přístupnost. Čtyři varianty a dvě velikosti.',
    status: 'documented',
    showcaseRoute: '/toggle',
    props: [
      { name: 'checked',       type: 'boolean',                                           required: true,  description: 'Aktuální stav přepínače.' },
      { name: 'onChange',      type: '(value: boolean) => void',                          required: true,  description: 'Callback při změně stavu.' },
      { name: 'label',         type: 'string',                                            required: false, description: 'Textový popisek vedle přepínače.' },
      { name: 'labelPosition', type: "'right'|'left'",                                   required: false, default: "'right'",   description: 'Pozice popisku vůči přepínači.' },
      { name: 'size',          type: "'sm'|'md'",                                        required: false, default: "'md'",      description: 'Velikost přepínače.' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'",           required: false, default: "'default'", description: 'Barevná varianta aktivního stavu.' },
      { name: 'disabled',      type: 'boolean',                                           required: false, default: 'false',     description: 'Zakáže interakci.' },
      { name: 'id',            type: 'string',                                            required: false, description: 'HTML id pro propojení s externím <label>.' },
    ],
    relatedSlugs: ['button-group', 'donjon-input', 'modal'],
  },

  'toast': {
    description: 'Plovoucí notifikace pro krátkodobá oznámení. Automaticky se zavře po uplynutí duration. Globální stav spravuje ToastProvider, přístupný přes useToast hook.',
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
    description: 'Modální dialog s fokusovým uzamčením, Escape zavřením a zamčeným scrollem. Sdílí vizuální styl s DonjonCard — oktagonální border, ornamenti, barevné varianty.',
    status: 'documented',
    showcaseRoute: '/modal',
    props: [
      { name: 'isOpen',          type: 'boolean',                                           required: true,  description: 'Řídí viditelnost modálu.' },
      { name: 'onClose',         type: '() => void',                                        required: true,  description: 'Callback pro zavření — volán Escape, backdropem i close tlačítkem.' },
      { name: 'title',           type: 'string',                                            required: false, description: 'Nadpis v hlavičce. Pokud není, hlavička se nezobrazí.' },
      { name: 'description',     type: 'string',                                            required: false, description: 'Podnadpis pod title.' },
      { name: 'children',        type: 'ReactNode',                                         required: false, description: 'Obsah těla modálu.' },
      { name: 'footer',          type: 'ReactNode',                                         required: false, description: 'Obsah patičky — typicky tlačítka.' },
      { name: 'size',            type: "'sm'|'md'|'lg'",                                   required: false, default: "'md'",      description: 'Maximální šířka panelu (sm=360, md=480, lg=640).' },
      { name: 'variant',         type: "'default'|'danger'|'success'|'warning'",           required: false, default: "'default'", description: 'Barevná varianta — border, hlavička, titulek.' },
      { name: 'closeOnBackdrop', type: 'boolean',                                           required: false, default: 'true',      description: 'Klik na backdrop zavře modál.' },
      { name: 'closeOnEscape',   type: 'boolean',                                           required: false, default: 'true',      description: 'Klávesa Escape zavře modál.' },
      { name: 'showCloseButton', type: 'boolean',                                           required: false, default: 'true',      description: 'Zobrazí tlačítko × v hlavičce (nebo těle bez title).' },
    ],
    relatedSlugs: ['donjon-card', 'donjon-button', 'tooltip'],
  },

  'donjon-modal': {
    description: 'Herní varianta Modal — rozšiřuje TkajUI Modal o SideOrnament a HexOrnament dekoraci v hlavičce, těle a patičce. Zachovává identické API.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/modal',
    props: [
      { name: 'isOpen',          type: 'boolean',                                           required: true,  description: 'Řídí viditelnost modálu.' },
      { name: 'onClose',         type: '() => void',                                        required: true,  description: 'Callback pro zavření.' },
      { name: 'title',           type: 'string',                                            required: false, description: 'Nadpis v hlavičce.' },
      { name: 'description',     type: 'string',                                            required: false, description: 'Podnadpis pod title.' },
      { name: 'children',        type: 'ReactNode',                                         required: false, description: 'Obsah těla modálu.' },
      { name: 'footer',          type: 'ReactNode',                                         required: false, description: 'Obsah patičky.' },
      { name: 'size',            type: "'sm'|'md'|'lg'",                                   required: false, default: "'md'",      description: 'Maximální šířka panelu.' },
      { name: 'variant',         type: "'default'|'danger'|'success'|'warning'",           required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'closeOnBackdrop', type: 'boolean',                                           required: false, default: 'true',      description: 'Klik na backdrop zavře modál.' },
      { name: 'closeOnEscape',   type: 'boolean',                                           required: false, default: 'true',      description: 'Escape zavře modál.' },
      { name: 'showCloseButton', type: 'boolean',                                           required: false, default: 'true',      description: 'Zobrazí tlačítko × v hlavičce.' },
    ],
    relatedSlugs: ['modal', 'donjon-card', 'donjon-button'],
  },

  'tooltip': {
    description: 'Kontextová nápověda zobrazená při najetí myší nebo focusu. Podporuje 4 směry umístění, 5 barevných variant a volitelný titulek.',
    status: 'documented',
    showcaseRoute: '/tooltip',
    props: [
      { name: 'children',   type: 'ReactNode',                                         required: true,  description: 'Trigger element — tooltip se zobrazí při jeho hover/focus.' },
      { name: 'content',    type: 'string',                                            required: true,  description: 'Text tooltipové bubliny.' },
      { name: 'title',      type: 'string',                                            required: false, description: 'Volitelný titulek nad obsahem.' },
      { name: 'placement',  type: "'top'|'bottom'|'left'|'right'",                    required: false, default: "'top'",     description: 'Směr zobrazení vůči triggeru.' },
      { name: 'variant',    type: "'default'|'danger'|'success'|'warning'|'info'",    required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'delay',      type: 'number',                                            required: false, default: '120',       description: 'Prodleva zobrazení v ms.' },
      { name: 'disabled',   type: 'boolean',                                           required: false, default: 'false',     description: 'Zakáže zobrazení tooltipu.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-badge', 'float-feedback'],
  },

  'donjon-button': {
    description: 'Primární akční prvek design systému. Podporuje čtyři barevné varianty, čtyři velikosti, ikonové módy a loading / disabled stav.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/buttons',
    props: [
      { name: 'children',     type: 'ReactNode',                               required: false, description: 'Obsah tlačítka — text nebo ReactNode.' },
      { name: 'variant',      type: "'default'|'danger'|'success'|'warning'",  required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'size',         type: "'xs'|'sm'|'md'|'lg'",                     required: false, default: "'md'",      description: 'Velikost tlačítka.' },
      { name: 'leadingIcon',  type: 'ReactNode',                               required: false, description: 'Ikona před textem.' },
      { name: 'trailingIcon', type: 'ReactNode',                               required: false, description: 'Ikona za textem.' },
      { name: 'iconOnly',     type: 'boolean',                                 required: false, default: 'false',     description: 'Skryje text, zobrazí jen ikonu.' },
      { name: 'fullWidth',    type: 'boolean',                                 required: false, default: 'false',     description: 'Roztáhne tlačítko na plnou šířku rodiče.' },
      { name: 'loading',      type: 'boolean',                                 required: false, default: 'false',     description: 'Zobrazí spinner a zakáže kliknutí.' },
      { name: 'disabled',     type: 'boolean',                                 required: false, default: 'false',     description: 'Zakáže tlačítko.' },
      { name: 'onClick',      type: '() => void',                              required: false, description: 'Handler kliknutí.' },
      { name: 'className',    type: 'string',                                  required: false, description: 'Přidání Tailwind tříd.' },
    ],
    relatedSlugs: ['button-group', 'donjon-card', 'donjon-input'],
  },

  'button-group': {
    description: 'Skupinový přepínač — výběr jedné hodnoty z předem daného seznamu možností. Používá se pro výběr akce, taby a filtry.',
    status: 'documented',
    showcaseRoute: '/button-groups',
    props: [
      { name: 'items',    type: 'Array<{value: string, label: string, icon?: ReactNode}>', required: true,  description: 'Seznam přepínatelných možností.' },
      { name: 'value',    type: 'string',                                                  required: true,  description: 'Aktuálně vybraná hodnota.' },
      { name: 'onChange', type: '(value: string) => void',                                 required: true,  description: 'Callback při změně výběru.' },
      { name: 'variant',  type: "'default'|'tabs'",                                        required: false, default: "'default'", description: 'Vizuální styl skupiny.' },
      { name: 'size',     type: "'sm'|'md'",                                               required: false, default: "'md'",      description: 'Velikost skupiny.' },
      { name: 'dividers', type: 'boolean',                                                 required: false, default: 'false',     description: 'Zobrazí oddělovače mezi položkami.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-card'],
  },

  'donjon-button-group': {
    description: 'Herní varianta ButtonGroup — rozšiřuje TkajUI ButtonGroup o SideOrnament a HexOrnament dekoraci. Zachovává identické API.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/button-groups',
    props: [
      { name: 'items',    type: 'Array<{value, label, icon?}>', required: true,  description: 'Seznam přepínatelných možností.' },
      { name: 'value',    type: 'string',                       required: true,  description: 'Aktuálně vybraná hodnota.' },
      { name: 'onChange', type: '(value: string) => void',      required: true,  description: 'Callback při změně výběru.' },
      { name: 'variant',  type: "'menu'|'tabs'",                required: false, default: "'menu'", description: 'Vizuální styl skupiny.' },
      { name: 'size',     type: "'xs'|'sm'|'md'|'lg'",         required: false, default: "'md'",   description: 'Velikost skupiny.' },
      { name: 'dividers', type: 'boolean',                      required: false, default: 'false',  description: 'Zobrazí oddělovače mezi položkami.' },
    ],
    relatedSlugs: ['button-group', 'donjon-button', 'donjon-card'],
  },

  'donjon-input': {
    description: 'Textové vstupní pole pro formuláře. Podporuje label, hint, chybový stav, ikony a disabled.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/inputs',
    props: [
      { name: 'label',       type: 'string',                     required: false, description: 'Popis pole zobrazený nad inputem.' },
      { name: 'value',       type: 'string',                     required: true,  description: 'Řízená hodnota pole.' },
      { name: 'onChange',    type: '(value: string) => void',    required: true,  description: 'Callback při změně hodnoty.' },
      { name: 'placeholder', type: 'string',                     required: false, description: 'Zástupný text v prázdném poli.' },
      { name: 'leadingIcon', type: 'ReactNode',                  required: false, description: 'Ikona vlevo uvnitř pole.' },
      { name: 'trailingIcon',type: 'ReactNode',                  required: false, description: 'Ikona vpravo uvnitř pole.' },
      { name: 'size',        type: "'sm'|'md'|'lg'",             required: false, default: "'md'",    description: 'Velikost pole.' },
      { name: 'error',       type: 'string',                     required: false, description: 'Chybová zpráva — zobrazí pole v error stavu.' },
      { name: 'hint',        type: 'string',                     required: false, description: 'Pomocný text pod polem.' },
      { name: 'disabled',    type: 'boolean',                    required: false, default: 'false',   description: 'Zakáže editaci.' },
    ],
    relatedSlugs: ['donjon-button', 'donjon-card'],
  },

  'donjon-badge': {
    description: 'Statusový štítek pro stav, kategorii nebo krátký label. Podporuje barevné varianty, tečku a ikonu.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/badges',
    props: [
      { name: 'children', type: 'ReactNode',                              required: false, description: 'Text nebo obsah štítku.' },
      { name: 'variant',  type: "'default'|'danger'|'success'|'warning'|'info'", required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'size',     type: "'sm'|'md'",                              required: false, default: "'md'",      description: 'Velikost štítku.' },
      { name: 'dot',      type: 'boolean',                                required: false, default: 'false',     description: 'Zobrazí barevnou tečku vlevo.' },
      { name: 'icon',     type: 'ReactNode',                              required: false, description: 'SVG ikona vlevo od textu.' },
    ],
    relatedSlugs: ['donjon-card', 'float-feedback'],
  },

  'donjon-card': {
    description: 'Kontejner pro seskupený obsah. Má pevnou strukturu hlavička–tělo–patička a barevné varianty pro různé kontexty.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/cards',
    props: [
      { name: 'children',    type: 'ReactNode',                              required: false, description: 'Obsah těla karty.' },
      { name: 'title',       type: 'string',                                 required: false, description: 'Nadpis v hlavičce karty.' },
      { name: 'description', type: 'string',                                 required: false, description: 'Podnadpis v hlavičce karty.' },
      { name: 'footer',      type: 'ReactNode',                              required: false, description: 'Obsah patičky — typicky tlačítka.' },
      { name: 'variant',     type: "'default'|'danger'|'success'|'warning'", required: false, default: "'default'", description: 'Barevná varianta ovlivňuje border a pozadí.' },
    ],
    relatedSlugs: ['donjon-badge', 'donjon-button', 'donjon-input'],
  },

  'ornaments': {
    description: 'Interní sada sdílených dekorativních prvků — postranní ornament a hexagonální rámeček. Používané uvnitř jiných komponent, ne jako standalone API.',
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

  /* ── Game Assets ───────────────────────────────────────────────────── */

  'erb': {
    description: 'Heraldická identita hráče — hexagonální štít s barvou a volitelným symbolem (I–VI). Komponenta Shield pro herní UI, PlayerIdentityBadge pro scoreboard a HUD.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/erb',
    props: [
      { name: 'player',     type: '{ color: string, label: string, id: number }', required: true,  description: 'Hráčský objekt — barva, popisek, ID (1–6).' },
      { name: 'size',       type: "'xs'|'sm'|'md'|'lg'",                          required: false, default: "'md'",  description: 'Velikost štítu (24 / 40 / 64 / 96 px šířka).' },
      { name: 'showSymbol', type: 'boolean',                                       required: false, default: 'true', description: 'Zobrazí římskou číslici uvnitř štítu.' },
    ],
    relatedSlugs: ['hex-tile', 'die-face', 'donjon-badge'],
  },

  'hex-tile': {
    description: 'Hexagonální políčko herní mapy. Zobrazuje různé stavy hexu (prázdný, základna, ohnisko) a vlastnictví hráče.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/hexagon',
    props: [
      { name: 'state',     type: "'empty'|'base'|'focal-active'|'focal-passive'|'selected'|'move'|'attack'|'blocked'", required: true,  description: 'Stav hexu — určuje vizuální styl.' },
      { name: 'owner',     type: 'string',            required: false, description: 'Barva hráče (#hex) — ovlivní zbarvení základny.' },
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
      { name: 'playerColor', type: 'string (#hex)',           required: true,  description: 'Barva hráče — ovlivní zbarvení kostky.' },
      { name: 'size',        type: "'xs'|'sm'|'md'|'lg'",    required: false, default: "'md'", description: 'Velikost kostky.' },
      { name: 'state',       type: "'default'|'selected'|'rerolled'", required: false, default: "'default'", description: 'Vizuální stav kostky.' },
    ],
    relatedSlugs: ['hex-tile', 'float-feedback'],
  },

  'float-feedback': {
    description: 'Krátká plovoucí zpětná vazba zobrazující herní event (zisk VP, zničení, souboj). Animuje se a poté zmizí.',
    subcategory: 'exclusive',
    status: 'documented',
    showcaseRoute: '/float-feedback',
    props: [
      { name: 'text',     type: 'string',                              required: true,  description: 'Text zpětné vazby (např. "+1 VP").' },
      { name: 'variant',  type: "'default'|'danger'|'success'|'warning'", required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'visible',  type: 'boolean',                             required: true,  description: 'Spouští zobrazení a animaci.' },
      { name: 'animKey',  type: 'string | number',                     required: false, description: 'Změna klíče restartuje animaci.' },
      { name: 'onDone',   type: '() => void',                          required: false, description: 'Callback po dokončení animace.' },
      { name: 'style',    type: 'CSSProperties',                       required: false, description: 'Přidání inline stylů pro pozicování.' },
    ],
    relatedSlugs: ['hex-tile', 'donjon-badge'],
  },

  /* ── donjon-fall-ui rozšíření TkajUI (re-exporty) ─────────────────── */

  'donjon-tabs': {
    description: 'Herní varianta Tabs. Vizuálně identická s TkajUI — herní barevná paleta je zabudovaná v základní komponentě. Stejné API jako Tabs.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/tabs',
    props: [
      { name: 'items',    type: 'Array<{value, label, icon?, badge?, disabled?}>',         required: true,  description: 'Seznam záložek.' },
      { name: 'value',    type: 'string',                                                   required: true,  description: 'Hodnota aktivní záložky.' },
      { name: 'onChange', type: '(value: string) => void',                                 required: true,  description: 'Callback při změně záložky.' },
      { name: 'variant',  type: "'underline'|'pills'",                                    required: false, default: "'underline'", description: 'Vizuální styl.' },
      { name: 'size',     type: "'sm'|'md'|'lg'",                                         required: false, default: "'md'",        description: 'Velikost záložek.' },
    ],
    relatedSlugs: ['tabs', 'donjon-card', 'donjon-modal'],
  },

  'donjon-select': {
    description: 'Herní varianta Select. Vizuálně identická s TkajUI — oktagonální trigger a herní barevná paleta jsou zabudované v základní komponentě. Stejné API jako Select.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/select',
    props: [
      { name: 'value',       type: 'string | null',                                        required: true,  description: 'Vybraná hodnota.' },
      { name: 'onChange',    type: '(value: string) => void',                              required: true,  description: 'Callback při výběru.' },
      { name: 'options',     type: 'Array<{value, label, disabled?}>',                    required: true,  description: 'Seznam možností.' },
      { name: 'placeholder', type: 'string',                                               required: false, default: "'Vyber možnost…'", description: 'Text prázdného stavu.' },
      { name: 'label',       type: 'string',                                               required: false, description: 'Popisek nad triggerem.' },
      { name: 'size',        type: "'sm'|'md'|'lg'",                                      required: false, default: "'md'",      description: 'Výška triggeru.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'",              required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'disabled',    type: 'boolean',                                              required: false, default: 'false',     description: 'Zakáže celý select.' },
    ],
    relatedSlugs: ['select', 'donjon-input', 'donjon-toggle'],
  },

  'donjon-slider': {
    description: 'Herní varianta Slider. Vizuálně identická s TkajUI — herní gradients a glow jsou zabudované v základní komponentě. Stejné API jako Slider.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/slider',
    props: [
      { name: 'value',       type: 'number',                              required: true,  description: 'Aktuální hodnota.' },
      { name: 'onChange',    type: '(value: number) => void',            required: true,  description: 'Callback při změně hodnoty.' },
      { name: 'min',         type: 'number',                              required: false, default: '0',         description: 'Minimální hodnota.' },
      { name: 'max',         type: 'number',                              required: false, default: '100',       description: 'Maximální hodnota.' },
      { name: 'step',        type: 'number',                              required: false, default: '1',         description: 'Krok změny.' },
      { name: 'size',        type: "'sm'|'md'|'lg'",                     required: false, default: "'md'",      description: 'Výška traku.' },
      { name: 'variant',     type: "'default'|'success'|'danger'|'warning'|'info'", required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'label',       type: 'string',                              required: false, description: 'Popisek nad sliderem.' },
      { name: 'showValue',   type: 'boolean',                             required: false, default: 'false', description: 'Zobrazí aktuální hodnotu.' },
      { name: 'disabled',    type: 'boolean',                             required: false, default: 'false', description: 'Znepřístupní slider.' },
      { name: 'formatValue', type: '(value: number) => string',          required: false, description: 'Formátovací funkce pro zobrazení hodnoty.' },
    ],
    relatedSlugs: ['slider', 'donjon-progress-bar'],
  },

  'donjon-toggle': {
    description: 'Herní varianta Toggle. Vizuálně identická s TkajUI — herní barevná schémata jsou zabudovaná v základní komponentě. Stejné API jako Toggle.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/toggle',
    props: [
      { name: 'checked',       type: 'boolean',                                   required: true,  description: 'Stav přepínače.' },
      { name: 'onChange',      type: '(checked: boolean) => void',               required: true,  description: 'Callback při přepnutí.' },
      { name: 'label',         type: 'string',                                    required: false, description: 'Textový popisek.' },
      { name: 'labelPosition', type: "'left'|'right'",                            required: false, default: "'right'",   description: 'Pozice popisku.' },
      { name: 'size',          type: "'sm'|'md'",                                 required: false, default: "'md'",      description: 'Velikost přepínače.' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'",   required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'disabled',      type: 'boolean',                                   required: false, default: 'false',     description: 'Znepřístupní přepínač.' },
    ],
    relatedSlugs: ['toggle', 'donjon-select'],
  },

  'donjon-progress-bar': {
    description: 'Herní varianta ProgressBar. Vizuálně identická s TkajUI — herní gradients a glow jsou zabudované v základní komponentě. Stejné API jako ProgressBar.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/progress-bar',
    props: [
      { name: 'value',         type: 'number',                                                   required: false, default: '0',     description: 'Aktuální hodnota (0 – max).' },
      { name: 'max',           type: 'number',                                                   required: false, default: '100',   description: 'Maximální hodnota.' },
      { name: 'size',          type: "'sm'|'md'|'lg'",                                           required: false, default: "'md'",  description: 'Výška traku.' },
      { name: 'variant',       type: "'default'|'success'|'danger'|'warning'|'info'",            required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'label',         type: 'string',                                                   required: false, description: 'Popisek nad barem.' },
      { name: 'showValue',     type: 'boolean',                                                  required: false, default: 'false', description: 'Zobrazí procenta vpravo.' },
      { name: 'indeterminate', type: 'boolean',                                                  required: false, default: 'false', description: 'Animovaný shimmer (neznámá délka).' },
    ],
    relatedSlugs: ['progress-bar', 'donjon-slider'],
  },

  'donjon-tooltip': {
    description: 'Herní varianta Tooltip. Vizuálně identická s TkajUI — herní barevná schémata jsou zabudovaná v základní komponentě. Stejné API jako Tooltip.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/tooltip',
    props: [
      { name: 'children',   type: 'ReactNode',                                              required: true,  description: 'Trigger element.' },
      { name: 'content',    type: 'string',                                                  required: true,  description: 'Text tooltipu.' },
      { name: 'title',      type: 'string',                                                  required: false, description: 'Volitelný titulek nad textem.' },
      { name: 'placement',  type: "'top'|'bottom'|'left'|'right'",                          required: false, default: "'top'",     description: 'Směr zobrazení.' },
      { name: 'variant',    type: "'default'|'danger'|'success'|'warning'|'info'",          required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'delay',      type: 'number',                                                  required: false, default: '120',       description: 'Zpoždění zobrazení v ms.' },
      { name: 'disabled',   type: 'boolean',                                                 required: false, default: 'false',     description: 'Zakáže zobrazení tooltipu.' },
    ],
    relatedSlugs: ['tooltip', 'donjon-badge'],
  },

  'donjon-toast': {
    description: 'Herní varianta Toast. Vizuálně identická s TkajUI — oktagonální shell a herní varianty jsou zabudované v základní komponentě. Použití: ToastProvider + useToast hook. Stejné API jako Toast.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/toast',
    props: [
      { name: 'title',    type: 'string',                                              required: false, description: 'Titulek toastu (tučný, gradientový).' },
      { name: 'message',  type: 'string',                                              required: false, description: 'Doplňující text zprávy.' },
      { name: 'variant',  type: "'default'|'success'|'danger'|'warning'|'info'",      required: false, default: "'default'", description: 'Barevná varianta.' },
      { name: 'duration', type: 'number',                                              required: false, default: '4000',      description: 'Čas do auto-zavření v ms. 0 = trvalý.' },
    ],
    relatedSlugs: ['toast', 'float-feedback'],
  },

  /* ── Utility / Clip components ────────────────────────────────────── */

  'donjon-pictogram': {
    description: 'Herní varianta Pictogram — ikona s tmavým oktagonálním pozadím a zlatou/fantasy barevnou paletou. Pět variant (active, passive, disabled, danger, success), čtyři velikosti, volitelný bare mód bez pozadí.',
    subcategory: 'extends-tkajui',
    status: 'documented',
    showcaseRoute: '/pictograms',
    props: [
      { name: 'icon',      type: 'React.ComponentType<{width, height}>', required: true,  description: 'SVG komponenta z donjon/icons.' },
      { name: 'size',      type: "'sm'|'md'|'lg'|'xl'",                  required: false, default: "'md'",      description: 'Velikost ikony (16 / 24 / 32 / 48 px).' },
      { name: 'variant',   type: "'active'|'passive'|'disabled'|'danger'|'success'", required: false, default: "'active'", description: 'Barevná varianta — určuje barvu ikony a pozadí.' },
      { name: 'bare',      type: 'boolean',                              required: false, default: 'false',     description: 'Bez pozadí — jen ikona s herní barvou.' },
      { name: 'className', type: 'string',                               required: false, description: 'Tailwind třídy na obalový span.' },
      { name: 'style',     type: 'CSSProperties',                        required: false, description: 'Inline styly na obalový span.' },
    ],
    relatedSlugs: ['pictogram', 'donjon-badge', 'donjon-button'],
  },

  'pictogram': {
    description: 'Generický SVG icon wrapper (TkajUI). Přijme libovolnou SVG komponentu jako `icon` prop a vykreslí ji ve správné velikosti a barvě. Bez pozadí, bez dekorace — čistá ikona.',
    status: 'documented',
    showcaseRoute: '/pictograms',
    props: [
      { name: 'icon',      type: 'React.ComponentType<{width, height, color}>', required: true,  description: 'SVG komponenta (přijímá width, height, color).' },
      { name: 'size',      type: "'sm'|'md'|'lg'|'xl'",                         required: false, default: "'md'",          description: 'Velikost (16 / 24 / 32 / 48 px).' },
      { name: 'color',     type: 'string',                                       required: false, default: "'currentColor'", description: 'CSS barva ikony.' },
      { name: 'className', type: 'string',                                       required: false, description: 'Tailwind třídy na obalový span.' },
      { name: 'style',     type: 'CSSProperties',                               required: false, description: 'Inline styly na obalový span.' },
    ],
    relatedSlugs: ['donjon-badge', 'donjon-button'],
  },

  'scoop-clip': {
    description: 'Obal s konkávně zaoblenými rohy (scoop tvar) via SVG clipPath s objectBoundingBox — přizpůsobí se libovolným rozměrům elementu. Interní utilita pro tvarování panelů a tlačítek.',
    status: 'documented',
    showcaseRoute: '/shapes',
    props: [
      { name: 'r',         type: 'number',      required: false, default: '0.25',  description: 'Poloměr vydlabání jako podíl výšky (0–0.5).' },
      { name: 'children',  type: 'ReactNode',   required: false, description: 'Obsah obalený clipPath tvarem.' },
      { name: 'style',     type: 'CSSProperties', required: false, description: 'Inline styly na obalový div (výška, padding…).' },
      { name: 'className', type: 'string',      required: false, description: 'Tailwind třídy na obalový div.' },
    ],
    relatedSlugs: ['corner-ornament', 'ornaments'],
  },

  'corner-ornament': {
    description: 'Dekorativní rohová ozdoba. Umisťuje se absolutně do rohu panelu nebo rámečku. Čtyři varianty tvaru a tři typy geometrie rohu (cut/round/scoop).',
    status: 'documented',
    showcaseRoute: '/ornaments',
    props: [
      { name: 'size',       type: 'number',                                     required: false, default: '16',       description: 'Rozměr ornamenty v px.' },
      { name: 'color',      type: 'string',                                     required: false, default: "'#8F7458'", description: 'CSS barva výplně.' },
      { name: 'variant',    type: "'bracket'|'dot'|'diamond'|'cross'",         required: false, default: "'bracket'", description: 'Dekorativní tvar ornamenty.' },
      { name: 'cornerType', type: "'cut'|'round'|'scoop'",                     required: false, default: "'cut'",     description: 'Geometrie rohu komponenty — přizpůsobí tvar elbow (bracket variant).' },
      { name: 'style',      type: 'CSSProperties',                             required: false, description: 'Inline styly pro pozicování (position, top, left…).' },
    ],
    relatedSlugs: ['ornaments', 'scoop-clip', 'notched-box'],
  },

  'notched-box': {
    description: 'Kontejner s V-zářezem na jedné straně (octagonWithNotch). Volitelný NotchedBox.Slot pozicuje obsah do středu zářezu vně clip-path — typicky badge nebo indikátor.',
    status: 'documented',
    showcaseRoute: '/shapes',
    props: [
      { name: 'cx',       type: 'number',                                required: false, default: '15',       description: 'Rohové zkosení v px — stejný parametr jako octagon(cx).' },
      { name: 'nw',       type: 'number',                                required: false, default: '28',       description: 'Šířka zářezu v px.' },
      { name: 'nh',       type: 'number',                                required: false, default: '12',       description: 'Hloubka zářezu v px.' },
      { name: 'side',     type: "'top'|'bottom'|'left'|'right'",        required: false, default: "'bottom'", description: 'Strana na které je zářez.' },
      { name: 'children', type: 'ReactNode',                             required: false, description: 'Obsah panelu + volitelný NotchedBox.Slot.' },
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
    description: 'Hlavní obal aplikace — kombinuje sidebar, mobilní hlavičku a routovaný obsah stránek. Interní komponenta, není určena pro přímé použití.',
    status: 'documented',
    props: [
      // Layout nemá veřejné props — interní state: sidebarOpen
    ],
    relatedSlugs: ['sidebar', 'showcase-page'],
  },

  'sidebar': {
    description: 'Navigační strom style guidu — zobrazuje sekce, položky a podsekce. Zvýrazňuje aktivní route. Interní prezentační komponenta.',
    status: 'documented',
    props: [
      { name: 'isOpen',  type: 'boolean',      required: true, description: 'Otevřenost sidebaru na mobilním zařízení.' },
      { name: 'onClose', type: '() => void',   required: true, description: 'Callback pro zavření sidebaru.' },
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
