import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registry, CATEGORIES, getCategoryCounts } from '../data/componentRegistry'
import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

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
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${STATUS_STYLES[status] ?? STATUS_STYLES.generated}`}>
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

/* ── ComponentCard ── */
function ComponentCard({ comp }) {
  const navigate = useNavigate()
  const propsCount = comp.props?.length ?? 0
  const hasShowcase = !!comp.showcaseRoute
  // Primární akce: showcase stránka pokud existuje, jinak detail
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
            <span className="text-[10px] font-mono text-neutral-800 px-1.5 py-0.5 rounded border border-neutral-800/60" title="Chybí showcase stránka">
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
function StatCard({ value, label }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800">
      <span className="text-2xl font-bold text-white tabular-nums">{value}</span>
      <span className="text-xs text-neutral-500">{label}</span>
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
                ? 'bg-neutral-700 text-neutral-100 shadow-sm'
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
        <div className="flex flex-wrap gap-3">
          <StatCard value={totalComponents} label={activeLib ? 'komponent ve výběru' : 'celkem komponent'} />
          <StatCard value={publicCount}     label="public" />
          <StatCard value={totalComponents - publicCount} label="internal" />
          <StatCard value={documentedCount} label="documented" />
          <StatCard value={totalComponents - documentedCount} label="zbývá zdokumentovat" />
          <StatCard value={showcaseCount}   label="se showcase stránkou" />
          <StatCard value={totalComponents - showcaseCount} label="bez showcase" />
        </div>
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
