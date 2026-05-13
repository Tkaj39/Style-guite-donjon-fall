import { NavLink } from 'react-router-dom'

const sections = [
  {
    label: 'System',
    items: [
      {
        to: '/components', label: 'Components',
        children: [
          { to: '/components#ui-components',  label: 'UI Components' },
          { to: '/components#game-assets',    label: 'Game Assets' },
          { to: '/components#layout',         label: 'Layout' },
          { to: '/components#bez-komponenty',  label: 'Bez komponenty' },
          { to: '/components#legenda',        label: 'Legenda' },
        ],
      },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { to: '/mood', label: 'Mood & Vision' },
      {
        to: '/colors', label: 'Colors',
        children: [
          { to: '/colors#barvy-hracu', label: 'Barvy hráčů' },
          { to: '/colors#stavy-hexu', label: 'Stavy hexů' },
          { to: '/colors#planovani-tahu', label: 'Plánování tahu' },
          { to: '/colors#barvy-hry', label: 'Barvy hry' },
        ],
      },
      { to: '/typography', label: 'Typography' },
      { to: '/spacing', label: 'Spacing' },
      { to: '/pictograms', label: 'Pictograms' },
      { to: '/ornaments', label: 'Ornaments' },
      { to: '/shapes', label: 'Shapes' },
    ],
  },
  {
    label: 'Principy',
    items: [
      { to: '/motion',             label: 'Motion' },
      { to: '/interaction-states', label: 'Interaction States' },
      { to: '/z-index',            label: 'Z-index škála' },
    ],
  },
  {
    label: 'Components',
    items: [
      { to: '/tooltip', label: 'Tooltip' },
      { to: '/modal', label: 'Modal' },
      { to: '/toast',  label: 'Toast' },
      { to: '/toggle',       label: 'Toggle' },
      { to: '/progress-bar', label: 'Progress Bar' },
      { to: '/select',       label: 'Select' },
      { to: '/slider',       label: 'Slider' },
      { to: '/tabs',         label: 'Tabs' },
      { to: '/buttons', label: 'Buttons' },
      { to: '/button-groups', label: 'Button Groups' },
      { to: '/inputs', label: 'Inputs' },
      { to: '/badges', label: 'Badges' },
      { to: '/cards', label: 'Cards' },
    ],
  },
  {
    label: 'Game UI',
    items: [
      {
        to: '/turn', label: 'Tah',
        children: [
          { to: '/turn#struktura-tahu', label: 'Struktura tahu' },
          { to: '/turn#indikator-hrace', label: 'Indikátor hráče' },
          { to: '/turn#scenare', label: 'Flow scénáře' },
          { to: '/turn#ohnisko', label: 'Ohnisko' },
          { to: '/turn#souboj', label: 'Souboj' },
        ],
      },
      {
        to: '/actions', label: 'Akce',
        children: [
          { to: '/actions#prehled', label: 'Přehled akcí' },
          { to: '/actions#pohyb-kostky', label: 'Pohyb kostky' },
          { to: '/actions#pohyb-veze', label: 'Pohyb věže' },
          { to: '/actions#kolaps-veze', label: 'Kolaps věže' },
          { to: '/actions#prehazovani', label: 'Přehazování' },
          { to: '/actions#vyber-akce', label: 'Výběr akce' },
        ],
      },
      { to: '/victory-points', label: 'Vítězné body' },
      {
        to: '/dialogs', label: 'Dialogy',
        children: [
          { to: '/dialogs#rozhodnuti-souboje', label: 'Rozhodnutí souboje' },
          { to: '/dialogs#vitezny-bod', label: 'Vítězný bod' },
          { to: '/dialogs#zacatek-tahu', label: 'Začátek tahu' },
          { to: '/dialogs#vyhra-hry', label: 'Výhra hry' },
          { to: '/dialogs#nahla-smrt', label: 'Náhlá smrt' },
        ],
      },
    ],
  },
  {
    label: 'Game Assets',
    items: [
      {
        to: '/hexagon', label: 'Hexagon',
        children: [
          { to: '/hexagon#prazdny', label: 'Prázdný' },
          { to: '/hexagon#zakladna', label: 'Základna' },
          {
            to: '/hexagon#ohniska', label: 'Ohniska',
            children: [
              { to: '/hexagon#ohnisko-aktivni', label: 'Aktivní' },
              { to: '/hexagon#ohnisko-pasivni', label: 'Pasivní' },
            ],
          },
        ],
      },
      {
        to: '/dice', label: 'Kostky',
        children: [
          { to: '/dice#hodnoty', label: 'Hodnoty' },
          { to: '/dice#vez-cista', label: 'Věž čistá' },
          { to: '/dice#vez-smisena', label: 'Věž smíšená' },
        ],
      },
      {
        to: '/map', label: 'Mapa',
        children: [
          { to: '/map#default', label: 'Default' },
          { to: '/map#varianty', label: 'Varianty' },
        ],
      },
      {
        to: '/erb', label: 'Erb',
        children: [
          { to: '/erb#stit', label: 'Štít' },
          { to: '/erb#symbol', label: 'Symbol' },
        ],
      },
      {
        to: '/animations', label: 'Animace',
        children: [
          { to: '/animations#pohyb-kostky', label: 'Pohyb kostky' },
          { to: '/animations#pohyb-veze', label: 'Pohyb věže' },
          { to: '/animations#souboj-push', label: 'Souboj — Push' },
          { to: '/animations#souboj-occupy', label: 'Souboj — Occupy' },
          { to: '/animations#souboj-tower', label: 'Souboj — Tower' },
          { to: '/animations#prehazovani', label: 'Přehazování' },
          { to: '/animations#kolaps-veze', label: 'Kolaps věže' },
          { to: '/animations#ohnisko', label: 'Ohnisko' },
          { to: '/animations#nelegalni-akce', label: 'Nelegální akce' },
          { to: '/animations#sudden-death', label: 'Sudden death' },
        ],
      },
      {
        to: '/screens', label: 'Obrazovky',
        children: [
          { to: '/screens#desktop',   label: 'PC — 1280px+' },
          { to: '/screens#tablet',    label: 'Tablet — 768px' },
          { to: '/screens#mobile',    label: 'Mobil — 375px' },
          { to: '/screens#srovnani',  label: 'Srovnání' },
        ],
      },
      {
        to: '/sounds', label: 'Zvuky',
        children: [
          { to: '/sounds#hudba', label: 'Hudba' },
          { to: '/sounds#ui-zvuky', label: 'UI zvuky' },
          { to: '/sounds#herni-zvuky', label: 'Herní zvuky' },
        ],
      },
    ],
  },
  {
    label: 'Obrazovky aplikace',
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

function CloseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

function SubItem({ item, onClose, depth = 1 }) {
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
      {item.children && (
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
  return (
    <li>
      <NavLink
        to={item.to}
        onClick={onClose}
        className={({ isActive }) =>
          `block px-3 py-2 rounded-md text-sm transition-colors ${
            isActive
              ? 'bg-brand-500/20 text-brand-400 font-medium'
              : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
          }`
        }
      >
        {item.label}
      </NavLink>
      {item.children && (
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
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
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
