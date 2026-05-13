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

  'donjon-input': {
    description: 'Textové vstupní pole pro formuláře. Podporuje label, hint, chybový stav, ikony a disabled.',
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

  'hex-tile': {
    description: 'Hexagonální políčko herní mapy. Zobrazuje různé stavy hexu (prázdný, základna, ohnisko) a vlastnictví hráče.',
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
    status: 'documented',
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
