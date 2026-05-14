import { Link } from 'react-router-dom'
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
  const propsCount = comp.props?.length ?? 0

  return (
    <Link
      to={`/components/${comp.slug}`}
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
        <span className="text-neutral-700 group-hover:text-brand-500 transition-colors">
          <ArrowIcon />
        </span>
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

/* ── Main page ── */
export default function ComponentsPage() {
  const counts = getCategoryCounts()
  const totalComponents = registry.length
  const documentedCount = registry.filter(c => c.status === 'documented').length
  const publicCount     = registry.filter(c => c.visibility === 'public').length

  return (
    <ShowcasePage
      title="Components"
      description="Přehled všech komponent Donjon Fall design systému, rozdělených do dvou knihoven: TkajUI (generické UI) a donjon-fall-ui (herní komponenty). Automaticky generováno z filesystému, doplněno ručními metadaty."
    >
      {/* ── Statistiky ── */}
      <Section id="statistiky" description="Aktuální stav dokumentace komponent.">
        <div className="flex flex-wrap gap-3">
          <StatCard value={totalComponents} label="celkem komponent" />
          <StatCard value={publicCount}     label="public" />
          <StatCard value={totalComponents - publicCount} label="internal" />
          <StatCard value={documentedCount} label="documented" />
          <StatCard value={totalComponents - documentedCount} label="zbývá zdokumentovat" />
        </div>
      </Section>

      {/* ── Kategorie ── */}
      {CATEGORIES.map(category => {
        const comps = registry.filter(c => c.category === category)
        if (comps.length === 0) return null

        // Řazení: public first, pak internal; v rámci skupiny abecedně (už seřazeno z registru)
        const publicComps   = comps.filter(c => c.visibility === 'public')
        const internalComps = comps.filter(c => c.visibility === 'internal')

        return (
          <Section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
            <CategoryHeader category={category} counts={counts} />

            {/* Public */}
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

            {/* Internal */}
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
