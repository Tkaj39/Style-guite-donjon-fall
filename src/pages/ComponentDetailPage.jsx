import { useParams, Link, Navigate } from 'react-router-dom'
import { getBySlug, registry } from '../data/componentRegistry'
import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

/* ── Ikony ── */
function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <path d="M8 2 4 6l4 4" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="10" height="10">
      <path d="M3 2H1v9h9V9M6 1h5v5M11 1 6 6" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
      <path d="M2 1h5.5L10 3.5V11H2V1Z" />
      <path d="M7 1v3h3" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="10" height="10">
      <path d="M4.5 2 9 6l-4.5 4M9 6H2" />
    </svg>
  )
}

/* ── Helpers ── */
const STATUS_STYLES = {
  documented: 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/40',
  draft:      'bg-amber-900/40  text-amber-400  border border-amber-700/40',
  generated:  'bg-neutral-800   text-neutral-500 border border-neutral-700',
}
const STATUS_LABEL = {
  documented: 'documented',
  draft:      'draft',
  generated:  'auto-generated',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium ${STATUS_STYLES[status] ?? STATUS_STYLES.generated}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  )
}

function VisibilityTag({ visibility }) {
  const isPublic = visibility === 'public'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
      isPublic
        ? 'bg-neutral-800 text-neutral-400 border-neutral-700'
        : 'bg-neutral-900 text-neutral-600 border-neutral-800'
    }`}>
      {isPublic ? 'public' : 'internal'}
    </span>
  )
}

/* ── PropsTable ── */
function RequiredDot({ required }) {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full mt-0.5 ${required ? 'bg-brand-500' : 'bg-neutral-700'}`}
      title={required ? 'required' : 'optional'}
    />
  )
}

function PropsTable({ props }) {
  if (!props || props.length === 0) {
    return (
      <p className="text-sm text-neutral-600 italic">Žádné zdokumentované props.</p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-900">
            <th className="px-3 py-2.5 font-semibold text-neutral-400 w-4">·</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400">Prop</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400">Type</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400 hidden sm:table-cell">Default</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400">Popis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60">
          {props.map((prop, i) => (
            <tr key={i} className="hover:bg-neutral-800/30 transition-colors">
              <td className="px-3 py-2.5">
                <RequiredDot required={prop.required} />
              </td>
              <td className="px-3 py-2.5">
                <code className="font-mono text-brand-300 text-[11px]">{prop.name}</code>
              </td>
              <td className="px-3 py-2.5 max-w-[180px]">
                <code className="font-mono text-neutral-400 text-[10px] break-words">{prop.type}</code>
              </td>
              <td className="px-3 py-2.5 hidden sm:table-cell">
                {prop.default != null
                  ? <code className="font-mono text-neutral-500 text-[10px]">{prop.default}</code>
                  : <span className="text-neutral-700">—</span>
                }
              </td>
              <td className="px-3 py-2.5 text-neutral-400 text-[11px] leading-relaxed">
                {prop.description ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Legenda */}
      <div className="flex items-center gap-4 px-3 py-2 border-t border-neutral-800 bg-neutral-900/50">
        <span className="flex items-center gap-1.5 text-[10px] text-neutral-600">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />
          required
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-neutral-600">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-700" />
          optional
        </span>
      </div>
    </div>
  )
}

/* ── RelatedComponents ── */
function RelatedComponents({ slugs }) {
  if (!slugs || slugs.length === 0) return null

  const related = slugs
    .map(slug => getBySlug(slug))
    .filter(Boolean)

  if (related.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {related.map(comp => (
        <Link
          key={comp.slug}
          to={`/components/${comp.slug}`}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-brand-600/60 hover:bg-neutral-800/60 transition-all text-sm text-neutral-300 hover:text-brand-300"
        >
          <span>{comp.name}</span>
          <span className="text-neutral-700 group-hover:text-brand-500 transition-colors">
            <ArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  )
}

/* ── Meta row item ── */
function MetaItem({ label, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-neutral-600 w-20 shrink-0">{label}</span>
      {children}
    </div>
  )
}

/* ── PropsSourceNote ── */
function PropsSourceNote({ propsSource }) {
  if (propsSource === 'manual') return null
  if (propsSource === 'undocumented') {
    return (
      <p className="text-xs text-amber-600/80 mt-2 italic">
        Props zatím nejsou zdokumentované.
      </p>
    )
  }
  return null
}

/* ── Main ── */
export default function ComponentDetailPage() {
  const { slug } = useParams()
  const comp = getBySlug(slug)

  if (!comp) {
    return <Navigate to="/components" replace />
  }

  const allSlugs = registry.map(c => c.slug)
  const currentIndex = allSlugs.indexOf(slug)
  const prevComp = currentIndex > 0 ? getBySlug(allSlugs[currentIndex - 1]) : null
  const nextComp = currentIndex < allSlugs.length - 1 ? getBySlug(allSlugs[currentIndex + 1]) : null

  return (
    <ShowcasePage
      title={comp.name}
      description={comp.description || undefined}
    >
      {/* ── Navigace zpět ── */}
      <div className="flex items-center justify-between -mt-2 mb-2">
        <Link
          to="/components"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-200 transition-colors"
        >
          <ChevronLeftIcon />
          Všechny komponenty
        </Link>

        {/* Prev / Next */}
        <div className="flex items-center gap-3 text-xs">
          {prevComp && (
            <Link to={`/components/${prevComp.slug}`} className="text-neutral-600 hover:text-neutral-300 transition-colors">
              ← {prevComp.name}
            </Link>
          )}
          {prevComp && nextComp && <span className="text-neutral-800">·</span>}
          {nextComp && (
            <Link to={`/components/${nextComp.slug}`} className="text-neutral-600 hover:text-neutral-300 transition-colors">
              {nextComp.name} →
            </Link>
          )}
        </div>
      </div>

      {/* ── Metadata ── */}
      <Section id="meta">
        <div className="flex flex-col gap-2.5 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
          <MetaItem label="Stav">
            <StatusBadge status={comp.status} />
          </MetaItem>
          <MetaItem label="Viditelnost">
            <VisibilityTag visibility={comp.visibility} />
          </MetaItem>
          <MetaItem label="Kategorie">
            <span className="text-xs text-neutral-400">{comp.category}</span>
          </MetaItem>
          <MetaItem label="Soubor">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
              <FileIcon />
              {comp.filePath}
            </span>
          </MetaItem>
          <MetaItem label="Route">
            <code className="text-[11px] font-mono text-neutral-500">{comp.route}</code>
          </MetaItem>
          {comp.showcaseRoute && (
            <MetaItem label="Showcase">
              <Link
                to={comp.showcaseRoute}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-brand-400 hover:text-brand-300 transition-colors"
              >
                <ExternalIcon />
                {comp.showcaseRoute}
              </Link>
            </MetaItem>
          )}
        </div>
      </Section>

      {/* ── Props ── */}
      <Section id="props">
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Props</h2>
        <PropsTable props={comp.props} />
        <PropsSourceNote propsSource={comp.propsSource} />
      </Section>

      {/* ── Related ── */}
      {comp.relatedSlugs?.length > 0 && (
        <Section id="related">
          <h2 className="text-base font-semibold text-neutral-100 mb-4">Související komponenty</h2>
          <RelatedComponents slugs={comp.relatedSlugs} />
        </Section>
      )}
    </ShowcasePage>
  )
}
