import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registry, CATEGORIES, getCategoryCounts } from '../data/componentRegistry'
import { ShowcasePage, Section } from '../styleguide/ShowcasePage'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Input,
  NotchedBox,
  Pictogram,
  ProgressBar,
  ScoopClip,
  Select,
  Slider,
  SubmitButton,
  Tabs,
  Toggle,
} from '../lib/tkajui'
import {
  ActionTile,
  DieFace,
  DonjonBadge,
  DonjonButton,
  DonjonButtonGroup,
  DonjonCard,
  DonjonInput,
  DonjonPictogram,
  EventLog,
  FloatFeedback,
  GameTransition,
  HexTile,
  NumericDisplay,
  PhaseIndicator,
  PlayerPanel,
  ResourceBar,
  ShieldIcon,
  SwordIcon,
  TowerIcon,
} from '../lib/donjon'

/* ── Tech stack data ── */
const TECH_STACK = [
  {
    group: 'Runtime',
    items: [
      { name: 'React',        version: '19.2.6',  role: 'UI framework',                 url: 'https://react.dev',               accent: '#61dafb' },
      { name: 'React DOM',    version: '19.2.6',  role: 'DOM renderer',                 url: 'https://react.dev',               accent: '#61dafb' },
    ],
  },
  {
    group: 'Routing',
    items: [
      { name: 'React Router', version: '6.30.3',  role: 'SPA routing',                  url: 'https://reactrouter.com',         accent: '#ca4246' },
    ],
  },
  {
    group: 'Styling',
    items: [
      { name: 'Tailwind CSS',       version: '4.3.0',  role: 'Utility-first CSS framework',  url: 'https://tailwindcss.com',         accent: '#38bdf8' },
      { name: '@tailwindcss/vite',  version: '4.3.0',  role: 'Vite plugin pro Tailwind v4',  url: 'https://tailwindcss.com/docs/installation/using-vite', accent: '#38bdf8' },
    ],
  },
  {
    group: 'Build',
    items: [
      { name: 'Vite',               version: '8.0.14', role: 'Dev server + bundler',          url: 'https://vite.dev',                accent: '#a78bfa' },
      { name: '@vitejs/plugin-react', version: '6.0.2', role: 'React + Oxc transform',        url: 'https://github.com/vitejs/vite-plugin-react', accent: '#a78bfa' },
    ],
  },
  {
    group: 'Testing',
    items: [
      { name: 'Vitest',                   version: '4.1.6',  role: 'Test runner (Vite-native)',     url: 'https://vitest.dev',              accent: '#6da13f' },
      { name: '@testing-library/react',   version: '16.3.2', role: 'DOM testing utilities',         url: 'https://testing-library.com',     accent: '#e33d4c' },
      { name: 'jest-axe',                 version: '10.0.0', role: 'Accessibility assertions',      url: 'https://github.com/nickcolley/jest-axe', accent: '#e33d4c' },
    ],
  },
]

/* ── TechRow ── */
function TechRow({ name, version, role, url, accent }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800/60 transition-colors -mx-3"
    >
      <span
        className="shrink-0 w-1.5 h-1.5 rounded-full"
        style={{ background: accent }}
      />
      <span className="text-sm text-neutral-200 font-medium w-52 shrink-0 truncate group-hover:text-white transition-colors">
        {name}
      </span>
      <code className="text-xs font-mono text-neutral-500 w-16 shrink-0">{version}</code>
      <span className="text-xs text-neutral-600 min-w-0 truncate">{role}</span>
    </a>
  )
}

/* ── Stránky style guidu bez odpovídající komponenty ── */
const NON_COMPONENT_PAGES = [
  {
    group: 'Foundations',
    note: 'Designové tokeny a vizuální jazyk — pravděpodobně zůstanou jen jako dokumentace.',
    pages: [
      { to: '/mood',       label: 'Mood & Vision',  candidate: false },
      { to: '/colors',     label: 'Colors',          candidate: false },
      { to: '/typography', label: 'Typography',      candidate: false },
      { to: '/spacing',    label: 'Spacing',         candidate: false },
      { to: '/pictograms', label: 'Pictograms',      candidate: true,  note: 'Ikony by mohly být exportovány jako komponenta' },
      { to: '/shapes',     label: 'Shapes',          candidate: false, note: 'Utilita (octagon.js) — správná úroveň abstrakce, React wrapper by nepřidal hodnotu' },
    ],
  },
  {
    group: 'Game UI',
    note: 'Interakční vzory a flow obrazovky — složené z existujících komponent, samy o sobě pravděpodobně ne.',
    pages: [
      { to: '/turn',           label: 'Tah',            candidate: false },
      { to: '/actions',        label: 'Akce',           candidate: false },
      { to: '/victory-points', label: 'Vítězné body',   candidate: false },
      { to: '/dialogs',        label: 'Dialogy',        candidate: true,  note: 'Dialog wrapper by mohl být obecná komponenta' },
    ],
  },
  {
    group: 'Game Assets',
    note: 'Herní vizuální prvky — silní kandidáti na vlastní komponentu.',
    pages: [
      { to: '/erb',        label: 'Erb',      candidate: true,  note: 'Štít + symbol hráče — vhodná standalone komponenta' },
      { to: '/map',        label: 'Mapa',     candidate: true,  note: 'Herní mapa — mohla by být komponentou s props pro layout' },
      { to: '/animations', label: 'Animace',  candidate: false, note: 'Animace jsou součástí FloatFeedback a dalších komponent' },
      { to: '/sounds',     label: 'Zvuky',    candidate: false },
    ],
  },
  {
    group: 'Obrazovky aplikace',
    note: 'Celé obrazovky / layouty — spíše kompozice komponent než samostatné komponenty.',
    pages: [
      { to: '/menu',         label: 'Hlavní menu',          candidate: false },
      { to: '/map-select',   label: 'Výběr mapy',           candidate: true,  note: 'MapCard by mohla být reusable' },
      { to: '/loading-app',  label: 'Načítání aplikace',    candidate: false },
      { to: '/loading-game', label: 'Načítání hry',         candidate: false },
      { to: '/settings',     label: 'Nastavení',            candidate: true,  note: 'SettingsModal by mohl být obecný modal' },
    ],
  },
]

/* ── Ikony ── */
function PublicIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10">
      <circle cx="6" cy="6" r="5" fillOpacity="0" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="2" />
    </svg>
  )
}

function InternalIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10">
      <path d="M6 1 1 6l5 5 5-5-5-5ZM6 3.5 9.5 6 6 8.5 2.5 6 6 3.5Z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10">
      <path d="M4.5 2 9 6l-4.5 4M9 6H2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PropsIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10">
      <path d="M1 2.5h10M1 6h7M1 9.5h4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ── StatusBadge ── */
const STATUS_STYLES = {
  documented: 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/40',
  draft:      'bg-amber-900/40  text-amber-400  border border-amber-700/40',
  generated:  'bg-neutral-800   text-neutral-500 border border-neutral-700',
}
const STATUS_LABEL = {
  documented: 'documented',
  draft:      'draft',
  generated:  'auto',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-medium ${STATUS_STYLES[status] ?? STATUS_STYLES.generated}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  )
}

/* ── VisibilityTag ── */
function VisibilityTag({ visibility }) {
  const isPublic = visibility === 'public'
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${isPublic ? 'text-neutral-400' : 'text-neutral-600'}`}>
      {isPublic ? <PublicIcon /> : <InternalIcon />}
      {isPublic ? 'public' : 'internal'}
    </span>
  )
}

function PreviewFallback({ comp }) {
  const accent =
    comp.category === 'TkajUI' ? 'from-indigo-500/25 via-sky-400/10 to-transparent'
    : comp.category === 'donjon-fall-ui' ? 'from-amber-500/25 via-yellow-400/10 to-transparent'
    : 'from-neutral-500/20 via-neutral-400/5 to-transparent'

  return (
    <div className={`relative h-24 rounded-md border border-neutral-800 bg-gradient-to-br ${accent} overflow-hidden`}>
      <div className="absolute inset-x-3 top-3 h-3 rounded bg-neutral-800/90" />
      <div className="absolute left-3 top-10 h-8 w-8 rounded-md border border-neutral-700 bg-neutral-900/90" />
      <div className="absolute right-3 top-10 left-14 h-2.5 rounded bg-neutral-800/80" />
      <div className="absolute right-8 top-[3.65rem] left-14 h-2 rounded bg-neutral-900/90" />
      <div className="absolute bottom-3 left-3 inline-flex items-center rounded border border-neutral-700 bg-neutral-950/90 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
        {comp.name}
      </div>
    </div>
  )
}

function StaticToastPreview() {
  return (
    <div className="w-full max-w-[15rem] rounded-md border border-amber-700/40 bg-neutral-950/90 px-3 py-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.32)]">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">Toast</div>
      <div className="mt-1 text-xs font-medium text-neutral-100">+2 VP</div>
      <div className="mt-0.5 text-[11px] text-neutral-400">Obsadil jsi hex.</div>
    </div>
  )
}

function StaticTooltipPreview() {
  return (
    <div className="relative flex w-full items-center justify-center py-2">
      <div className="rounded border border-neutral-700 bg-neutral-900 px-3 py-1 text-[11px] text-neutral-300">Trigger</div>
      <div className="absolute -top-1 rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] text-neutral-200 shadow-lg">
        Tooltip obsah
      </div>
    </div>
  )
}

function StaticModalPreview() {
  return (
    <div className="flex h-full items-center justify-center rounded-md bg-neutral-950/70 p-3">
      <div className="w-full max-w-[15rem] rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <div className="text-xs font-semibold text-neutral-100">Modal</div>
        <div className="mt-1 h-2 rounded bg-neutral-800" />
        <div className="mt-1 h-2 w-4/5 rounded bg-neutral-800/80" />
      </div>
    </div>
  )
}

function StaticIconsPreview() {
  return (
    <div className="flex h-full items-center justify-center gap-3 text-amber-300">
      <SwordIcon width={18} height={18} />
      <ShieldIcon width={18} height={18} />
      <TowerIcon width={18} height={18} />
    </div>
  )
}

function StaticErrorPreview() {
  return (
    <div className="flex h-full items-center justify-center rounded-md border border-rose-900/50 bg-rose-950/20 px-3">
      <div className="flex items-center gap-2 text-xs text-rose-300">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-rose-700/50">!</span>
        fallback UI
      </div>
    </div>
  )
}

/* ── Statické mini-náhledy pro MiniPreview ──────────────────────────────
   Definováno na úrovni modulu — previews jsou konstantní, nevznikají znovu
   při každém renderu. noop slouží jako prázdný onChange pro controlled inputs. */
const _noop = () => {}

const MINI_PREVIEWS = {
  badge: <Badge variant="info" size="sm">Info</Badge>,
  button: <Button size="sm">Akce</Button>,
  'button-group': <ButtonGroup items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} value="a" onChange={_noop} size="sm" />,
  card: <Card title="Card" description="Mini preview" variant="default" />,
  input: <Input value="Hráč" onChange={_noop} size="sm" label="Jméno" />,
  modal: <StaticModalPreview />,
  'submit-button': <form><SubmitButton size="sm" loadingLabel="Ukládám…">Uložit</SubmitButton></form>,
  tooltip: <StaticTooltipPreview />,
  'progress-bar': <ProgressBar value={64} size="sm" variant="success" showValue />,
  select: <Select value="one" onChange={_noop} options={[{ value: 'one', label: 'Volba' }]} size="sm" label="Select" />,
  slider: <Slider value={42} onChange={_noop} size="sm" label="Síla" showValue />,
  tabs: <Tabs items={[{ value: 'map', label: 'Mapa' }, { value: 'hud', label: 'HUD' }]} value="map" onChange={_noop} size="sm" />,
  toggle: <Toggle checked onChange={_noop} size="sm" label="Aktivní" />,
  toast: <StaticToastPreview />,
  pictogram: <Pictogram icon={SwordIcon} size="lg" color="#d9b46b" />,
  'scoop-clip': <ScoopClip r={0.18} style={{ width: 84, height: 38, background: '#191922', border: '1px solid #34343c' }} />,
  'notched-box': <NotchedBox style={{ width: 92, height: 42, background: '#17171f', border: '1px solid #30303a' }}><NotchedBox.Slot><span className="text-[9px] text-neutral-400">VP</span></NotchedBox.Slot></NotchedBox>,
  'corner-ornament': <div className="relative h-12 w-16 rounded border border-neutral-700 bg-neutral-900"><div className="absolute left-1 top-1 h-2.5 w-2.5 rounded-sm border border-amber-700/50" /></div>,
  ornaments: <div className="flex items-center gap-2 text-amber-300"><div className="h-7 w-2 rounded bg-amber-500/60" /><div className="h-7 w-7 rounded-[8px] border border-amber-500/60" /></div>,
  icons: <StaticIconsPreview />,
  'donjon-badge': <DonjonBadge size="sm">XP</DonjonBadge>,
  'donjon-button': <DonjonButton size="sm">Tah</DonjonButton>,
  'donjon-button-group': <DonjonButtonGroup items={[{ value: 'attack', label: 'Útok' }, { value: 'move', label: 'Pohyb' }]} value="attack" onChange={_noop} size="sm" />,
  'donjon-card': <DonjonCard title="Loot" description="Pergamenový panel" />,
  'donjon-input': <DonjonInput value="Arkan" onChange={_noop} size="sm" label="Nick" />,
  'donjon-modal': <StaticModalPreview />,
  'donjon-progress-bar': <ProgressBar value={72} size="sm" variant="warning" showValue />,
  'donjon-pictogram': <DonjonPictogram icon={ShieldIcon} size="lg" />,
  'donjon-select': <Select value="fire" onChange={_noop} options={[{ value: 'fire', label: 'Oheň' }]} size="sm" label="Škola" />,
  'donjon-slider': <Slider value={58} onChange={_noop} size="sm" label="Hudba" showValue />,
  'donjon-tabs': <Tabs items={[{ value: 'p1', label: 'Hráč 1' }, { value: 'p2', label: 'Hráč 2' }]} value="p1" onChange={_noop} size="sm" variant="pills" />,
  'donjon-toast': <StaticToastPreview />,
  'donjon-toggle': <Toggle checked onChange={_noop} size="sm" label="SFX" variant="warning" />,
  'donjon-tooltip': <StaticTooltipPreview />,
  erb: <div className="flex items-center justify-center"><div className="flex h-12 w-10 items-center justify-center rounded-[12px] border border-amber-700/60 bg-neutral-900 text-[11px] font-bold text-amber-300">II</div></div>,
  'hex-tile': <HexTile state="selected" size="sm" label="A3" showLabel />,
  'die-face': <DieFace value={5} playerColor="#d6aa57" size="sm" state="selected" />,
  'float-feedback': <FloatFeedback text="+2 VP" visible variant="success" animKey="preview" />,
  'action-tile': <ActionTile icon={<SwordIcon width={18} height={18} />} title="Útok" cost={2} size="sm" selected />,
  'event-log': <EventLog events={[{ id: 1, type: 'gain', text: '+2 VP', round: 3 }, { id: 2, type: 'warning', text: 'Nebezpečí', detail: 'Hex je oslabený' }]} maxHeight={64} showTitle={false} />,
  'phase-indicator': <PhaseIndicator phases={[{ id: 'move', label: 'Pohyb' }, { id: 'fight', label: 'Souboj' }, { id: 'end', label: 'Konec' }]} currentPhase="fight" size="sm" />,
  'resource-bar': <ResourceBar value={68} max={100} variant="hp" size="sm" label="HP" showValue zones />,
  'numeric-display': <NumericDisplay value={12} label="VP" variant="vp" size="sm" />,
  'player-panel': <PlayerPanel name="Hráč 1" color="#4A90E2" symbol="shield" vp={7} hp={72} size="sm" isActive />,
  'game-transition': <GameTransition show preset="slideUp"><div className="rounded border border-amber-700/40 bg-neutral-900 px-3 py-2 text-xs text-neutral-200">Enter / exit</div></GameTransition>,
  'error-boundary': <StaticErrorPreview />,
}

function MiniPreview({ comp }) {
  return (
    <div className="pointer-events-none flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-neutral-950/80 px-3 py-3" aria-hidden="true">
      {MINI_PREVIEWS[comp.slug] ?? <PreviewFallback comp={comp} />}
    </div>
  )
}

/* ── ComponentCard ── */
function ComponentCard({ comp }) {
  const navigate = useNavigate()
  const propsCount = comp.props?.length ?? 0
  const hasShowcase = !!comp.showcaseRoute
  const primaryTo = comp.showcaseRoute || `/components/${comp.slug}`

  return (
    <Link
      to={primaryTo}
      className="group flex flex-col gap-3 p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-brand-600/60 hover:bg-neutral-800/80 transition-all duration-150"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-sm font-semibold text-neutral-100 group-hover:text-brand-300 transition-colors truncate">
            {comp.name}
          </span>
          <code className="text-[10px] text-neutral-600 font-mono">{comp.slug}</code>
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <StatusBadge status={comp.status} />
        </div>
      </div>

      <MiniPreview comp={comp} />

      {/* Description */}
      {comp.description ? (
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
          {comp.description}
        </p>
      ) : (
        <p className="text-xs text-neutral-700 italic">Bez popisu</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-800">
        <div className="flex items-center gap-3">
          <VisibilityTag visibility={comp.visibility} />
          {propsCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500">
              <PropsIcon />
              {propsCount} props
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!hasShowcase && (
            <span className="text-[10px] font-mono text-neutral-800 px-1.5 py-0.5 rounded-sm border border-neutral-800/60" title="Chybí showcase stránka">
              no showcase
            </span>
          )}
          {/* API chip — vždy viditelný, zastaví bubblování na Link */}
          <span
            onClick={e => { e.preventDefault(); e.stopPropagation(); navigate(`/components/${comp.slug}`) }}
            className={`text-[10px] font-mono transition-colors cursor-pointer px-1.5 py-0.5 rounded border ${
              hasShowcase
                ? 'text-neutral-500 border-neutral-700 hover:text-neutral-200 hover:border-neutral-500 hover:bg-neutral-800'
                : 'text-neutral-700 border-transparent hover:text-neutral-400 hover:bg-neutral-800'
            }`}
            title="Otevřít API dokumentaci komponenty"
          >
            API
          </span>
          <span className={`transition-colors ${hasShowcase ? 'text-neutral-700 group-hover:text-brand-500' : 'text-neutral-800'}`}>
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ── CategoryHeader ── */
function CategoryHeader({ category, counts }) {
  const c = counts.find(c => c.category === category) ?? { total: 0, public: 0, internal: 0 }
  return (
    <div className="flex items-baseline gap-4">
      <h2 className="text-base font-semibold text-neutral-100">{category}</h2>
      <div className="flex items-center gap-2 text-xs text-neutral-600">
        <span>{c.total} komponent</span>
        {c.internal > 0 && (
          <>
            <span className="text-neutral-800">·</span>
            <span>{c.public} public</span>
            <span className="text-neutral-800">·</span>
            <span>{c.internal} internal</span>
          </>
        )}
      </div>
    </div>
  )
}

/* ── StatCard ── */
function StatCard({ value, label, accent }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800">
      <span className={`text-2xl font-bold tabular-nums ${accent ? 'text-brand-500' : 'text-white'}`}>{value}</span>
      <span className="text-xs text-neutral-500">{label}</span>
    </div>
  )
}

/* ── LibStatBlock — per-knihovna breakdown ── */
function LibStatBlock({ libId, libLabel, accent, reg }) {
  const comps      = reg.filter(c => c.category === libId)
  const total      = comps.length
  const pubCount   = comps.filter(c => c.visibility === 'public').length
  const intCount   = total - pubCount
  const docCount   = comps.filter(c => c.status === 'documented').length
  const undocCount = total - docCount
  const showCount  = comps.filter(c => !!c.showcaseRoute).length

  const rows = [
    { value: total,      label: 'komponent celkem', bold: true },
    { value: pubCount,   label: 'public' },
    { value: intCount,   label: 'internal' },
    { value: docCount,   label: 'documented' },
    { value: undocCount, label: 'zbývá zdokumentovat', warn: undocCount > 0 },
    { value: showCount,  label: 'se showcase stránkou' },
  ]

  return (
    <div style={{ flex: '1 1 220px', minWidth: 0 }} className="flex flex-col gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, flexShrink: 0, display: 'inline-block' }} />
        <span className="text-sm font-semibold text-neutral-200">{libLabel}</span>
      </div>
      {/* Řádky */}
      <div className="flex flex-col gap-1.5">
        {rows.map(({ value, label, bold, warn }) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-neutral-500 leading-tight">{label}</span>
            <span className={`tabular-nums text-sm font-${bold ? '700' : '500'} ${
              bold   ? 'text-neutral-100' :
              warn && value > 0 ? 'text-amber-400' :
              'text-neutral-300'
            }`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── LibTabs ── */
const LIB_TABS = [
  { id: null,            label: 'Vše',           desc: 'Všechny knihovny' },
  { id: 'TkajUI',        label: 'TkajUI',        desc: 'Generické UI komponenty bez herního stylu' },
  { id: 'donjon-fall-ui',label: 'donjon-fall-ui', desc: 'Herní komponenty — rozšiřují TkajUI o Ornaments' },
  { id: 'Layout',        label: 'Layout',         desc: 'Interní layout komponenty style guidu' },
]

function LibTabs({ active, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-neutral-800 w-fit">
        {LIB_TABS.map(tab => (
          <button
            key={String(tab.id)}
            onClick={() => onChange(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              active === tab.id
                ? 'bg-neutral-700 text-neutral-100 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Popis aktivní záložky */}
      {active !== null && (
        <p className="text-xs text-neutral-600 pl-1">
          {LIB_TABS.find(t => t.id === active)?.desc}
        </p>
      )}
    </div>
  )
}

/* ── Main page ── */
export default function ComponentsPage() {
  const [activeLib, setActiveLib] = useState(null)

  const counts = getCategoryCounts()

  // Filtrovaný registr podle aktivní záložky
  const filteredRegistry = activeLib
    ? registry.filter(c => c.category === activeLib)
    : registry

  const totalComponents  = filteredRegistry.length
  const documentedCount  = filteredRegistry.filter(c => c.status === 'documented').length
  const publicCount      = filteredRegistry.filter(c => c.visibility === 'public').length
  const showcaseCount    = filteredRegistry.filter(c => !!c.showcaseRoute).length

  // Zobrazované kategorie — buď všechny, nebo jen ta aktivní
  const visibleCategories = activeLib ? [activeLib] : CATEGORIES

  return (
    <ShowcasePage
      title="Components"
      description="Přehled všech komponent Donjon Fall design systému, rozdělených do dvou knihoven: TkajUI (generické UI) a donjon-fall-ui (herní komponenty). Automaticky generováno z filesystému, doplněno ručními metadaty."
    >
      {/* ── Přepínač knihoven ── */}
      <Section id="knihovny">
        <LibTabs active={activeLib} onChange={setActiveLib} />

        {/* Srovnávací poznámka při přepnutí */}
        {activeLib === 'TkajUI' && (
          <div className="mt-4 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs text-blue-300/80">
            <span className="shrink-0 mt-0.5">ℹ</span>
            <span>TkajUI komponenty používají zkosené rohy a jsou <strong>dekorace-free</strong> — žádné Ornaments, žádný herní styl. Přepni na <button onClick={() => setActiveLib('donjon-fall-ui')} className="underline hover:text-blue-200">donjon-fall-ui</button> pro varianty s ozdobami.</span>
          </div>
        )}
        {activeLib === 'donjon-fall-ui' && (
          <div className="mt-4 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-amber-950/30 border border-amber-900/40 text-xs text-amber-300/80">
            <span className="shrink-0 mt-0.5">⚔</span>
            <span>donjon-fall-ui rozšiřuje TkajUI o herní Ornaments (SideOrnament, HexOrnament, CornerOrnament). Závislost jde vždy <strong>donjon → tkajui</strong>, nikdy naopak. Přepni na <button onClick={() => setActiveLib('TkajUI')} className="underline hover:text-amber-200">TkajUI</button> pro čistý základ.</span>
          </div>
        )}
      </Section>

      {/* ── Statistiky ── */}
      <Section id="statistiky" description={activeLib ? `Statistiky pro ${activeLib}` : 'Aktuální stav dokumentace komponent.'}>
        {activeLib === null ? (
          /* Zobrazení "Vše" — rozděleno per-knihovna */
          <div className="flex flex-col gap-4">
            {/* Celkový součet */}
            <div className="flex flex-wrap gap-3">
              <StatCard value={totalComponents} label="komponent celkem" />
              <StatCard value={registry.filter(c => c.status === 'documented').length} label="documented" />
              <StatCard value={registry.filter(c => c.status !== 'documented').length} label="zbývá zdokumentovat" />
              <StatCard value={registry.filter(c => !!c.showcaseRoute).length} label="se showcase stránkou" />
            </div>
            {/* Per-knihovna breakdown */}
            <div className="flex flex-wrap gap-4">
              <LibStatBlock libId="TkajUI"         libLabel="TkajUI"         accent="#6576ff" reg={registry} />
              <LibStatBlock libId="donjon-fall-ui"  libLabel="donjon-fall-ui" accent="goldMid" reg={registry} />
              <LibStatBlock libId="Layout"          libLabel="Layout (internal)" accent="#484860" reg={registry} />
            </div>
          </div>
        ) : (
          /* Vybraná knihovna — původní flat karty */
          <div className="flex flex-wrap gap-3">
            <StatCard value={totalComponents} label="komponent ve výběru" />
            <StatCard value={publicCount}     label="public" />
            <StatCard value={totalComponents - publicCount} label="internal" />
            <StatCard value={documentedCount} label="documented" accent={documentedCount === totalComponents} />
            <StatCard value={totalComponents - documentedCount} label="zbývá zdokumentovat" />
            <StatCard value={showcaseCount}   label="se showcase stránkou" />
            <StatCard value={totalComponents - showcaseCount} label="bez showcase" />
          </div>
        )}
      </Section>

      {/* ── Kategorie ── */}
      {visibleCategories.map(category => {
        const comps = filteredRegistry.filter(c => c.category === category)
        if (comps.length === 0) return null

        const publicComps   = comps.filter(c => c.visibility === 'public')
        const internalComps = comps.filter(c => c.visibility === 'internal')

        // donjon-fall-ui: public komponenty rozdělíme do podskupin
        const isDonjon = category === 'donjon-fall-ui'
        const extendsTkajui = isDonjon ? publicComps.filter(c => c.subcategory === 'extends-tkajui') : []
        const exclusive     = isDonjon ? publicComps.filter(c => c.subcategory === 'exclusive')      : []
        const uncategorized = isDonjon ? publicComps.filter(c => !c.subcategory)                     : publicComps

        return (
          <Section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
            <CategoryHeader category={category} counts={counts} />

            {/* donjon-fall-ui: podskupiny */}
            {isDonjon ? (
              <div className="mt-4 flex flex-col gap-8">
                {/* Rozšiřuje TkajUI */}
                {extendsTkajui.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">Rozšiřuje TkajUI</p>
                      <div className="h-px flex-1 bg-neutral-800" />
                      <span className="text-[10px] text-neutral-700">{extendsTkajui.length}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {extendsTkajui.map(comp => <ComponentCard key={comp.slug} comp={comp} />)}
                    </div>
                  </div>
                )}

                {/* Vlastní donjon-fall-ui */}
                {exclusive.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">Vlastní herní komponenty</p>
                      <div className="h-px flex-1 bg-neutral-800" />
                      <span className="text-[10px] text-neutral-700">{exclusive.length}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {exclusive.map(comp => <ComponentCard key={comp.slug} comp={comp} />)}
                    </div>
                  </div>
                )}

                {/* Ostatní (bez subcategory) */}
                {uncategorized.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {uncategorized.map(comp => <ComponentCard key={comp.slug} comp={comp} />)}
                  </div>
                )}

                {/* Internal */}
                {internalComps.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600">Internal</p>
                      <div className="h-px flex-1 bg-neutral-800" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {internalComps.map(comp => <ComponentCard key={comp.slug} comp={comp} />)}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Ostatní kategorie — původní layout */
              <>
                {publicComps.length > 0 && (
                  <div className="mt-4">
                    {internalComps.length > 0 && (
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">Public</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {publicComps.map(comp => (
                        <ComponentCard key={comp.slug} comp={comp} />
                      ))}
                    </div>
                  </div>
                )}
                {internalComps.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">Internal</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {internalComps.map(comp => (
                        <ComponentCard key={comp.slug} comp={comp} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </Section>
        )
      })}

      {/* ── Stránky bez komponenty ── */}
      <Section
        id="bez-komponenty"
        description="Stránky style guidu, které nemají odpovídající .jsx soubor v src/components. Pomůže ti rozhodnout, které z nich vyextrahovat do vlastní komponenty."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Stránky bez komponenty</h2>
        <div className="flex flex-col gap-6">
          {NON_COMPONENT_PAGES.map(group => (
            <div key={group.group}>
              {/* Skupina header */}
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-sm font-semibold text-neutral-300">{group.group}</h3>
                <span className="text-[11px] text-neutral-600">{group.note}</span>
              </div>

              {/* Stránky */}
              <div className="flex flex-wrap gap-2">
                {group.pages.map(page => (
                  <div key={page.to} className="group relative">
                    <Link
                      to={page.to}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                        page.candidate
                          ? 'bg-amber-950/30 border-amber-800/50 text-amber-300 hover:border-amber-600/70 hover:bg-amber-900/40'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400'
                      }`}
                    >
                      {page.candidate && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title="Potenciální komponenta" />
                      )}
                      {page.label}
                    </Link>
                    {/* Tooltip s poznámkou */}
                    {page.note && (
                      <div className="absolute bottom-full left-0 mb-1.5 z-10 hidden group-hover:block w-56 px-2.5 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 text-[11px] text-neutral-300 leading-snug pointer-events-none shadow-lg">
                        {page.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-800/60">
          <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            potenciální komponenta
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            jen dokumentace
          </span>
        </div>
      </Section>

      {/* ── Tech stack ── */}
      <Section id="tech-stack" description="Závislosti projektu — verze ke dni poslední aktualizace dokumentace.">
        <div className="flex flex-col gap-6">
          {TECH_STACK.map(group => (
            <div key={group.group}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-1">{group.group}</p>
              <div className="flex flex-col">
                {group.items.map(item => (
                  <TechRow key={item.name} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Legenda ── */}
      <Section id="legenda" description="Vysvětlení ikon a stavů použitých v přehledu.">
        <div className="flex flex-col gap-3 max-w-lg">
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <StatusBadge status="documented" />
            <span>Povinné bloky jsou vyplněny (popis + props)</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <StatusBadge status="draft" />
            <span>Popis nebo props existují, ale nejsou kompletní</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <StatusBadge status="generated" />
            <span>Jen automatická data, žádná ruční metadata</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400 mt-2">
            <VisibilityTag visibility="public" />
            <span>Komponenta určená pro přímé použití</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <VisibilityTag visibility="internal" />
            <span>Interní komponenta — sdílená infrastruktura</span>
          </div>
        </div>
      </Section>
    </ShowcasePage>
  )
}
