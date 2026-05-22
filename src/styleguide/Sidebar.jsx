import { NavLink, useLocation } from 'react-router-dom'
import { LIBRARY_CFG } from './ShowcasePage'

/* ── Library icons (miniaturní verze) ── */
function LibIcon({ library }) {
  const cfg = LIBRARY_CFG[library]
  if (!cfg) return null
  const color = cfg.color

  if (library === 'tkajui') return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <rect x="1" y="1"   width="12" height="3" rx="0.8" fill={color} opacity="0.45" />
      <rect x="1" y="5.5" width="12" height="3" rx="0.8" fill={color} opacity="0.72" />
      <rect x="1" y="10"  width="12" height="3" rx="0.8" fill={color} />
    </svg>
  )
  if (library === 'donjon') return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 1.5V10.5"   stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.5 5H10.5"   stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 10.5H8.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7 10.5V12.5"  stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
  return null
}

// ── Navigační data ────────────────────────────────────────────────────────────

const sections = [
  {
    label: 'System',
    items: [
      { to: '/snippets', label: '⚡ Snippety', library: 'donjon' },
      { to: '/todo', label: '✦ TODO' },
      {
        to: '/components', label: 'Components',
        children: [
          { to: '/components#tkajui',         label: 'TkajUI' },
          { to: '/components#donjon-fall-ui', label: 'donjon-fall-ui' },
          { to: '/components#layout',         label: 'Layout' },
          { to: '/components#bez-komponenty', label: 'Bez komponenty' },
          { to: '/components#tech-stack',     label: 'Tech stack' },
          { to: '/components#legenda',        label: 'Legenda' },
        ],
      },
    ],
  },
  {
    label: 'Foundations',
    items: [
      {
        to: '/mood', label: 'Mood & Vision',
        children: [
          { to: '/mood?lib=tkajui#manifesto',         label: 'TkajUI — manifest' },
          { to: '/mood?lib=tkajui#pilire',            label: 'TkajUI — pilíře' },
          { to: '/mood?lib=tkajui#co-tkajui-neni',    label: 'Co TkajUI není' },
          { to: '/mood?lib=donjon#dramaticnost',      label: 'donjon — pilíře' },
          { to: '/mood?lib=donjon#materialovy-jazyk', label: 'Materiálový jazyk' },
          { to: '/mood?lib=donjon#cilovy-hrac',       label: 'Cílový hráč' },
        ],
      },
      {
        to: '/colors', label: 'Colors',
        children: [
          { to: '/colors?lib=tkajui#tkajui-paleta',    label: 'TkajUI paleta' },
          { to: '/colors?lib=tkajui#tkajui-vs-donjon', label: 'TkajUI vs donjon' },
          { to: '/colors?lib=donjon#barvy-hry',        label: 'donjon paleta' },
          { to: '/colors?lib=donjon#barvy-hracu',      label: 'Barvy hráčů' },
          { to: '/colors?lib=donjon#stavy-hexu',       label: 'Stavy hexů' },
          { to: '/colors?lib=donjon#planovani-tahu',   label: 'Plánování tahu' },
        ],
      },
      {
        to: '/typography', label: 'Typography',
        children: [
          { to: '/typography?lib=tkajui#tkajui-skala',  label: 'TkajUI — škála' },
          { to: '/typography?lib=tkajui#tkajui-vahy',   label: 'TkajUI — váhy' },
          { to: '/typography?lib=donjon#donjon-display', label: 'donjon — display' },
          { to: '/typography?lib=donjon#donjon-ui',      label: 'donjon — UI škála' },
        ],
      },
      { to: '/spacing',    label: 'Spacing',    library: 'donjon' },
      { to: '/pictograms', label: 'Pictograms' },
      {
        to: '/ornaments', label: 'Ornaments',
        children: [
          { to: '/ornaments#side-ornament',               label: 'SideOrnament' },
          { to: '/ornaments#hex-ornament',                label: 'HexOrnament' },
          { to: '/ornaments#corner-ornament',             label: 'CornerOrnament' },
          { to: '/ornaments#corner-ornament-corner-type', label: '↳ cornerType' },
          { to: '/ornaments#pravidla',                    label: 'Pravidla' },
          { to: '/corner-ornament', label: '— detail stránka',
            children: [
              { to: '/corner-ornament#varianty',    label: 'Varianty' },
              { to: '/corner-ornament#corner-type', label: 'cornerType' },
              { to: '/corner-ornament#barvy',       label: 'Barvy' },
              { to: '/corner-ornament#panel-vzor',  label: 'Panel vzor' },
              { to: '/corner-ornament#velikosti',   label: 'Velikosti' },
              { to: '/corner-ornament#props',       label: 'Props' },
              { to: '/corner-ornament#pouziti',     label: 'Použití' },
            ],
          },
        ],
      },
      { to: '/shapes',  label: 'Shapes' },
      { to: '/texture', label: 'Texture systém' },
      {
        to: '/glow-shadow', label: 'Glow & Shadow',
        children: [
          { to: '/glow-shadow?lib=tkajui#stiny',          label: 'Stíny' },
          { to: '/glow-shadow?lib=tkajui#glow',           label: 'TkajUI — glow' },
          { to: '/glow-shadow?lib=donjon#glow',           label: 'donjon — glow' },
          { to: '/glow-shadow?lib=donjon#animovana-glow', label: 'Animovaná záře' },
          { to: '/glow-shadow#pouziti',                   label: 'Příklady' },
        ],
      },
    ],
  },
  {
    label: 'Principy',
    items: [
      {
        to: '/motion', label: 'Motion', library: 'donjon',
        children: [
          { to: '/motion#timing',     label: 'Timing tokeny' },
          { to: '/motion#easing',     label: 'Easing křivky' },
          { to: '/motion#hook',       label: 'useGameAnimation' },
          { to: '/motion#transition', label: 'GameTransition' },
          { to: '/motion#keyframes',  label: 'CSS keyframes' },
          { to: '/motion#kombinace',  label: 'Herní kombinace' },
        ],
      },
      {
        to: '/interaction-states', label: 'Interaction States',
        children: [
          { to: '/interaction-states?lib=tkajui#matrix',  label: 'Matice stavů' },
          { to: '/interaction-states?lib=tkajui#hover',   label: 'TkajUI — Hover' },
          { to: '/interaction-states?lib=tkajui#focus',   label: 'TkajUI — Focus' },
          { to: '/interaction-states?lib=donjon#hover',   label: 'donjon — Hover' },
          { to: '/interaction-states?lib=donjon#blocked', label: 'donjon — Blocked' },
        ],
      },
      {
        to: '/responsive', label: 'Responsive Design', library: 'donjon',
        children: [
          { to: '/responsive#breakpoints', label: 'Breakpointy — live' },
          { to: '/responsive#tokeny',      label: 'BP tokeny' },
          { to: '/responsive#hook',        label: 'useBreakpoint' },
          { to: '/responsive#action-tile', label: 'Adaptive ActionTile' },
          { to: '/responsive#modal',       label: 'Responzivní Modal' },
          { to: '/responsive#card',        label: 'Fluid Card' },
          { to: '/responsive#patterns',    label: 'Vzory' },
        ],
      },
      {
        to: '/focus-ring', label: 'Focus Ring',
        children: [
          { to: '/focus-ring?lib=tkajui#vychozi',  label: 'TkajUI — výchozí ring' },
          { to: '/focus-ring?lib=donjon#vychozi',  label: 'donjon — výchozí ring' },
          { to: '/focus-ring?lib=tkajui#varianty', label: 'Varianty' },
          { to: '/focus-ring#focus-trap',          label: 'Focus trap' },
          { to: '/focus-ring#skip-link',           label: 'Skip link' },
        ],
      },
      { to: '/accessibility',      label: 'Accessibility',       library: 'donjon' },
      { to: '/feedback-hierarchy', label: 'Feedback Hierarchy',  library: 'donjon' },
      { to: '/error-states',       label: 'Error States',        library: 'donjon' },
      { to: '/empty-states',       label: 'Empty States',        library: 'donjon' },
      { to: '/loading-skeleton',   label: 'Loading & Skeleton',  library: 'donjon' },
      { to: '/validation',         label: 'Validation',          library: 'donjon' },
      { to: '/microcopy',          label: 'Content & Microcopy', library: 'donjon' },
      {
        to: '/tokens', label: 'Design Tokens',
        children: [
          { to: '/tokens?lib=tkajui#co-jsou',  label: 'Co jsou tokeny' },
          { to: '/tokens?lib=tkajui#surfaces', label: 'TkajUI — surfaces' },
          { to: '/tokens?lib=tkajui#akcent',   label: 'TkajUI — akcent' },
          { to: '/tokens?lib=tkajui#semantic', label: 'TkajUI — semantic' },
          { to: '/tokens?lib=donjon#barvy',    label: 'donjon — barvy' },
          { to: '/tokens?lib=donjon#pravidla', label: 'Pravidla' },
        ],
      },
      { to: '/z-index',        label: 'Z-index škála',   library: 'donjon' },
      { to: '/cursor',         label: 'Cursor States',   library: 'donjon' },
      { to: '/scrollbar',      label: 'Scrollbar' },
      { to: '/text-selection', label: 'Text Selection',  library: 'donjon' },
    ],
  },
  {
    label: 'Komponenty',
    items: [
      { to: '/tooltip',      label: 'Tooltip',      library: 'tkajui' },
      { to: '/modal',        label: 'Modal',        library: 'tkajui' },
      { to: '/toast',        label: 'Toast',        library: 'tkajui' },
      { to: '/toggle',       label: 'Toggle',       library: 'tkajui' },
      { to: '/progress-bar', label: 'Progress Bar', library: 'tkajui' },
      { to: '/select',       label: 'Select',       library: 'tkajui' },
      { to: '/slider',       label: 'Slider',       library: 'tkajui' },
      { to: '/tabs',         label: 'Tabs',         library: 'tkajui' },
      { to: '/buttons',       label: 'Buttons' },
      { to: '/button-groups', label: 'Button Groups' },
      {
        to: '/inputs', label: 'Inputs',
        children: [
          { to: '/inputs#form-prihlaseni', label: 'Form — Přihlášení' },
          { to: '/inputs#form-nastaveni',  label: 'Form — Nastavení' },
        ],
      },
      { to: '/badges', label: 'Badges', library: 'donjon' },
      { to: '/cards',  label: 'Cards',  library: 'donjon' },
    ],
  },
  {
    label: 'Herní UI',
    library: 'donjon',
    items: [
      // ── Herní logika ──
      {
        to: '/turn', label: 'Tah',
        children: [
          { to: '/turn#struktura-tahu',  label: 'Struktura tahu' },
          { to: '/turn#indikator-hrace', label: 'Indikátor hráče' },
          { to: '/turn#scenare',         label: 'Flow scénáře' },
          { to: '/turn#ohnisko',         label: 'Ohnisko' },
          { to: '/turn#souboj',          label: 'Souboj' },
        ],
      },
      {
        to: '/actions', label: 'Akce',
        children: [
          { to: '/actions#prehled',      label: 'Přehled akcí' },
          { to: '/actions#pohyb-kostky', label: 'Pohyb kostky' },
          { to: '/actions#pohyb-veze',   label: 'Pohyb věže' },
          { to: '/actions#kolaps-veze',  label: 'Kolaps věže' },
          { to: '/actions#prehazovani',  label: 'Přehazování' },
          { to: '/actions#vyber-akce',   label: 'Výběr akce' },
        ],
      },
      { to: '/victory-points', label: 'Vítězné body' },
      {
        to: '/dialogs', label: 'Dialogy',
        children: [
          { to: '/dialogs#rozhodnuti-souboje', label: 'Rozhodnutí souboje' },
          { to: '/dialogs#vitezny-bod',        label: 'Vítězný bod' },
          { to: '/dialogs#zacatek-tahu',       label: 'Začátek tahu' },
          { to: '/dialogs#vyhra-hry',          label: 'Výhra hry' },
          { to: '/dialogs#nahla-smrt',         label: 'Náhlá smrt' },
        ],
      },
      {
        to: '/hud', label: 'HUD Elementy',
        children: [
          { to: '/hud#player-indicators',     label: 'Indikátory hráčů' },
          { to: '/hud#turn-tracker',          label: 'Turn Tracker' },
          { to: '/hud#vp-counter',            label: 'VP Counter' },
          { to: '/hud#action-bar',            label: 'Action Bar' },
          { to: '/hud#shield',                label: 'Shield' },
          { to: '/hud#player-identity-badge', label: 'PlayerIdentityBadge' },
          { to: '/hud#herni-status',          label: 'Herní status' },
          { to: '/hud#float-feedback',        label: 'FloatFeedback' },
          { to: '/hud#pravidla-hud',          label: 'Pravidla' },
        ],
      },
      // ── Herní primitiva ──
      {
        to: '/resource-bar', label: 'ResourceBar',
        children: [
          { to: '/resource-bar#demo',     label: 'Demo' },
          { to: '/resource-bar#zony',     label: 'Vizuální zóny' },
          { to: '/resource-bar#varianty', label: 'Varianty' },
          { to: '/resource-bar#flash',    label: 'Damage flash' },
          { to: '/resource-bar#props',    label: 'Props' },
        ],
      },
      {
        to: '/numeric-display', label: 'NumericDisplay',
        children: [
          { to: '/numeric-display#demo',          label: 'Demo' },
          { to: '/numeric-display#varianty',      label: 'Varianty' },
          { to: '/numeric-display#label-position', label: 'Pozice labelu' },
          { to: '/numeric-display#hud',           label: 'HUD příklad' },
        ],
      },
      {
        to: '/player-panel', label: 'PlayerPanel',
        children: [
          { to: '/player-panel#demo',      label: 'Demo' },
          { to: '/player-panel#stavy',     label: 'Stavy' },
          { to: '/player-panel#simple',    label: 'Bez resource barů' },
          { to: '/player-panel#velikosti', label: 'Velikosti' },
        ],
      },
      {
        to: '/action-tile', label: 'ActionTile',
        children: [
          { to: '/action-tile#demo',      label: 'Demo' },
          { to: '/action-tile#varianty',  label: 'Varianty' },
          { to: '/action-tile#stavy',     label: 'Stavy' },
          { to: '/action-tile#velikosti', label: 'Velikosti' },
          { to: '/action-tile#pouziti',   label: 'Použití' },
        ],
      },
      {
        to: '/event-log', label: 'EventLog',
        children: [
          { to: '/event-log#demo',    label: 'Demo' },
          { to: '/event-log#typy',    label: 'Typy záznamů' },
          { to: '/event-log#variace', label: 'Variace' },
        ],
      },
      {
        to: '/phase-indicator', label: 'PhaseIndicator',
        children: [
          { to: '/phase-indicator#demo',      label: 'Demo' },
          { to: '/phase-indicator#orientace', label: 'Orientace' },
          { to: '/phase-indicator#faze-hry',  label: 'Fáze hry' },
          { to: '/phase-indicator#ikony',     label: 'S ikonami' },
          { to: '/phase-indicator#velikosti', label: 'Velikosti' },
        ],
      },
      // ── Assety ──
      {
        to: '/hexagon', label: 'Hexagon',
        children: [
          { to: '/hexagon#prazdny',  label: 'Prázdný' },
          { to: '/hexagon#zakladna', label: 'Základna' },
          { to: '/hexagon#ohniska',  label: 'Ohniska' },
        ],
      },
      {
        to: '/dice', label: 'Kostky',
        children: [
          { to: '/dice#hodnoty',     label: 'Hodnoty' },
          { to: '/dice#vez-cista',   label: 'Věž čistá' },
          { to: '/dice#vez-smisena', label: 'Věž smíšená' },
        ],
      },
      {
        to: '/map', label: 'Mapa',
        children: [
          { to: '/map#default',  label: 'Default' },
          { to: '/map#varianty', label: 'Varianty' },
        ],
      },
      {
        to: '/erb', label: 'Erb',
        children: [
          { to: '/erb#stit',   label: 'Štít' },
          { to: '/erb#symbol', label: 'Symbol' },
        ],
      },
      {
        to: '/float-feedback', label: 'FloatFeedback',
        children: [
          { to: '/float-feedback#varianty', label: 'Varianty' },
          { to: '/float-feedback#animace',  label: 'Animační průběh' },
          { to: '/float-feedback#props',    label: 'Props' },
          { to: '/float-feedback#pouziti',  label: 'Použití' },
        ],
      },
      {
        to: '/animations', label: 'Animace',
        children: [
          { to: '/animations#pohyb-kostky',   label: 'Pohyb kostky' },
          { to: '/animations#pohyb-veze',     label: 'Pohyb věže' },
          { to: '/animations#souboj-push',    label: 'Souboj — Push' },
          { to: '/animations#souboj-occupy',  label: 'Souboj — Occupy' },
          { to: '/animations#souboj-tower',   label: 'Souboj — Tower' },
          { to: '/animations#prehazovani',    label: 'Přehazování' },
          { to: '/animations#kolaps-veze',    label: 'Kolaps věže' },
          { to: '/animations#ohnisko',        label: 'Ohnisko' },
          { to: '/animations#nelegalni-akce', label: 'Nelegální akce' },
          { to: '/animations#sudden-death',   label: 'Sudden death' },
        ],
      },
      {
        to: '/sounds', label: 'Zvuky',
        children: [
          { to: '/sounds#hudba',       label: 'Hudba' },
          { to: '/sounds#ui-zvuky',    label: 'UI zvuky' },
          { to: '/sounds#herni-zvuky', label: 'Herní zvuky' },
        ],
      },
      {
        to: '/screens', label: 'Obrazovky (herní)',
        children: [
          { to: '/screens#desktop',  label: 'PC — 1280px+' },
          { to: '/screens#tablet',   label: 'Tablet — 768px' },
          { to: '/screens#mobile',   label: 'Mobil — 375px' },
          { to: '/screens#srovnani', label: 'Srovnání' },
        ],
      },
    ],
  },
  {
    label: 'Obrazovky aplikace',
    library: 'donjon',
    items: [
      {
        to: '/menu', label: 'Hlavní menu',
        children: [
          { to: '/menu#desktop',  label: 'Desktop' },
          { to: '/menu#tablet',   label: 'Tablet' },
          { to: '/menu#mobile',   label: 'Mobil' },
          { to: '/menu#srovnani', label: 'Srovnání' },
        ],
      },
      {
        to: '/map-select', label: 'Výběr mapy',
        children: [
          { to: '/map-select#desktop',    label: 'Desktop' },
          { to: '/map-select#tablet',     label: 'Tablet' },
          { to: '/map-select#mobile',     label: 'Mobil' },
          { to: '/map-select#srovnani',   label: 'Srovnání' },
          { to: '/map-select#karta-mapy', label: 'Karta mapy' },
        ],
      },
      {
        to: '/loading-app', label: 'Načítání aplikace',
        children: [
          { to: '/loading-app#desktop',  label: 'Desktop' },
          { to: '/loading-app#tablet',   label: 'Tablet' },
          { to: '/loading-app#mobile',   label: 'Mobil' },
          { to: '/loading-app#srovnani', label: 'Srovnání' },
        ],
      },
      {
        to: '/loading-game', label: 'Načítání hry',
        children: [
          { to: '/loading-game#desktop',  label: 'Desktop' },
          { to: '/loading-game#tablet',   label: 'Tablet' },
          { to: '/loading-game#mobile',   label: 'Mobil' },
          { to: '/loading-game#srovnani', label: 'Srovnání' },
        ],
      },
      {
        to: '/settings', label: 'Nastavení',
        children: [
          { to: '/settings#desktop',      label: 'Desktop' },
          { to: '/settings#tablet',       label: 'Tablet' },
          { to: '/settings#mobile',       label: 'Mobil' },
          { to: '/settings#srovnani',     label: 'Srovnání' },
          { to: '/settings#tab-zvuk',     label: 'Tab — Zvuk' },
          { to: '/settings#tab-jazyk',    label: 'Tab — Jazyk' },
          { to: '/settings#tab-ovladani', label: 'Tab — Ovládání' },
          { to: '/settings#tab-grafika',  label: 'Tab — Grafika' },
        ],
      },
    ],
  },
]

// ── Komponenty ────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

function SubItem({ item, onClose, depth = 1 }) {
  const { pathname } = useLocation()
  const isRouteActive = pathname === item.to || pathname.startsWith(item.to + '/')
  const py = depth === 1 ? 'py-1.5' : 'py-1'
  const textColor = depth === 1 ? 'text-neutral-500' : 'text-neutral-600'

  return (
    <li>
      <NavLink
        to={item.to}
        onClick={onClose}
        className={({ isActive }) =>
          `block px-3 ${py} rounded-md text-sm transition-colors ${
            isActive
              ? 'bg-brand-500/20 text-brand-400 font-medium'
              : `${textColor} hover:text-neutral-100 hover:bg-neutral-800`
          }`
        }
      >
        {item.label}
      </NavLink>
      {item.children && isRouteActive && (
        <ul className="flex flex-col gap-0.5 mt-0.5 ml-3 pl-3 border-l border-neutral-800">
          {item.children.map((child) => (
            <SubItem key={child.to} item={child} onClose={onClose} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

function NavItem({ item, onClose }) {
  const { pathname } = useLocation()
  // Sub-linky jsou viditelné jen na aktivní route (accordion efekt)
  const isRouteActive = pathname === item.to || pathname.startsWith(item.to + '/')

  return (
    <li>
      <NavLink
        to={item.to}
        onClick={onClose}
        className={({ isActive }) =>
          `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-colors ${
            isActive
              ? 'bg-brand-500/20 text-brand-400 font-medium'
              : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
          }`
        }
      >
        {item.library && <LibIcon library={item.library} />}
        {item.label}
      </NavLink>
      {item.children && isRouteActive && (
        <ul className="flex flex-col gap-0.5 mt-0.5 ml-3 pl-3 border-l border-neutral-800">
          {item.children.map((child) => (
            <SubItem key={child.to} item={child} onClose={onClose} depth={1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={[
        'fixed lg:sticky top-0 h-screen z-50',
        'w-64 shrink-0 border-r border-neutral-800',
        'bg-neutral-950 py-8 px-5 flex flex-col gap-8',
        'transition-transform duration-300 ease-in-out',
        'lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
            Donjon Fall
          </p>
          <h1 className="text-lg font-bold text-white">Style Guide</h1>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-md text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Zavřít menu"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6 flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
              {section.library && <LibIcon library={section.library} />}
              {section.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavItem key={item.to} item={item} onClose={onClose} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
