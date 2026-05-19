import { useState, createContext, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

/* ── Variant context — sdílí aktivní knihovnu se všemi dětmi ── */
const LibVariantContext = createContext(null)

/** Hook pro čtení aktivní varianty ('tkajui' | 'donjon' | null) ze ShowcasePage. */
export function useLibVariant() {
  return useContext(LibVariantContext)
}

/* ── Library icons ── */
function TkajuiIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1"   width="12" height="3" rx="0.8" fill="currentColor" opacity="0.4" />
      <rect x="1" y="5.5" width="12" height="3" rx="0.8" fill="currentColor" opacity="0.7" />
      <rect x="1" y="10"  width="12" height="3" rx="0.8" fill="currentColor" />
    </svg>
  )
}

function DonjonIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5V10.5"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.5 5H10.5"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 10.5H8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7 10.5V12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export const LIBRARY_CFG = {
  tkajui: { label: 'TkajUI',         color: '#7BAED4', Icon: TkajuiIcon },
  donjon: { label: 'donjon-fall-ui', color: '#B8956A', Icon: DonjonIcon },
}

function LibraryBadge({ library }) {
  const c = LIBRARY_CFG[library]
  if (!c) return null
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 4,
      background: `${c.color}14`, border: `1px solid ${c.color}3A`,
      color: c.color, fontSize: '0.6875rem', fontWeight: 600,
      fontFamily: '"Inter", sans-serif', letterSpacing: '0.04em',
      flexShrink: 0, lineHeight: 1,
    }}>
      <c.Icon size={12} />
      {c.label}
    </span>
  )
}

/* ── VariantSwitcher ── */
/**
 * Přepínač variant — zobrazí se v hlavičce ShowcasePage místo statického LibraryBadge.
 * variants: [{ id: 'donjon' | 'tkajui', label?: string }]
 */
function VariantSwitcher({ variants, active, onChange }) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-neutral-700/50 bg-neutral-800/40 w-fit">
      {variants.map(v => {
        const cfg = LIBRARY_CFG[v.id]
        const isActive = active === v.id
        const label = v.label ?? cfg?.label ?? v.id
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            title={cfg?.label}
            style={isActive && cfg ? {
              color: cfg.color,
              background: `${cfg.color}18`,
              borderColor: `${cfg.color}45`,
            } : {}}
            className={[
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 border',
              isActive
                ? 'border-current shadow-sm'
                : 'text-neutral-500 hover:text-neutral-300 border-transparent hover:bg-neutral-700/40',
            ].join(' ')}
          >
            {cfg && <cfg.Icon size={11} />}
            {label}
          </button>
        )
      })}
    </div>
  )
}

function ApiChip({ slug }) {
  return (
    <Link
      to={`/components/${slug}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 hover:border-brand-600/60 hover:bg-neutral-700/80 transition-all text-[11px] font-mono text-neutral-400 hover:text-brand-300"
    >
      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="9" height="9">
        <path d="M3 2H1v7h8V7M6 1h3v3M9 1 5 5" />
      </svg>
      API: {slug}
    </Link>
  )
}

/* ── ShowcasePage ── */
/**
 * @param {string}   title
 * @param {string}   [description]
 * @param {string}   [library]          'tkajui' | 'donjon' — statický badge (pokud není variants)
 * @param {string}   [componentSlug]    zkratka pro jeden API chip
 * @param {string[]} [componentSlugs]   více API chipů
 * @param {Array}    [variants]         [{ id: 'donjon'|'tkajui', label?: string }, ...]
 *                                      První položka = výchozí varianta.
 *                                      Přidá VariantSwitcher + poskytne LibVariantContext dětem.
 */
export function ShowcasePage({ title, description, children, componentSlug, componentSlugs, library, variants }) {
  const slugs = componentSlugs ?? (componentSlug ? [componentSlug] : [])

  // Varianta — inicializuje z ?lib= URL parametru, pak z první položky variants
  const [searchParams] = useSearchParams()
  const libParam = searchParams.get('lib')
  const initVariant = variants?.find(v => v.id === libParam)?.id ?? variants?.[0]?.id ?? null
  const [activeVariant, setActiveVariant] = useState(initVariant)

  // Aktivní knihovna: buď z varianty nebo ze statického library prop
  const effectiveLibrary = activeVariant ?? library

  return (
    <LibVariantContext.Provider value={activeVariant}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <header className="mb-8 lg:mb-10 border-b border-neutral-800 pb-6 lg:pb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl lg:text-3xl font-bold text-white">{title}</h2>
                {/* Variantní přepínač — nahrazuje statický LibraryBadge */}
                {variants
                  ? <VariantSwitcher variants={variants} active={activeVariant} onChange={setActiveVariant} />
                  : <LibraryBadge library={effectiveLibrary} />
                }
              </div>
              {description && (
                <p className="text-neutral-400 text-sm lg:text-base">{description}</p>
              )}
            </div>
            {slugs.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {slugs.map(slug => <ApiChip key={slug} slug={slug} />)}
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-col gap-10 lg:gap-12">{children}</div>
      </div>
    </LibVariantContext.Provider>
  )
}

export function Section({ id, title, description, children }) {
  return (
    <section id={id} className="flex flex-col gap-3 lg:gap-4">
      <div>
        <h3 className="text-base lg:text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-xs lg:text-sm text-neutral-500 mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export function Preview({ children, dark = true, label }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <p className="text-xs text-neutral-600 font-mono">{label}</p>
      )}
      <div
        className={`rounded-xl border border-neutral-800 p-4 sm:p-6 lg:p-8 flex flex-wrap items-start gap-3 lg:gap-4 overflow-x-auto ${
          dark ? 'bg-neutral-900' : 'bg-neutral-100'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export function CodeBlock({ code }) {
  return (
    <pre className="rounded-lg bg-neutral-950 border border-neutral-800 px-4 lg:px-5 py-3 lg:py-4 text-xs lg:text-sm text-neutral-300 overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}
