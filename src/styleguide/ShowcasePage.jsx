import { useState, createContext, useContext, useEffect } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { useLibPreference } from './LibPreferenceProvider'
import { componentMeta } from '../data/componentMeta'

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
  if (!library) return null
  // 'both' → vyrenderuj obě pilule vedle sebe (foundation pages společné
  // pro obě knihovny — Spacing, Motion, Responsive, …)
  if (library === 'both') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <LibraryBadge library="tkajui" />
        <LibraryBadge library="donjon" />
      </span>
    )
  }
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
                ? 'border-current shadow-xs'
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

/* ── ExtendsBanner ──
 * Pro donjon komponenty s subcategory:'extends-tkajui' zobrazí pruh s:
 *   • Link na TkajUI protějšek (extendsSlug)
 *   • Seznam differencesFromBase — co donjon přidává/mění oproti base
 * Skryje se pokud aktivní varianta je tkajui (nedává smysl ukazovat "extends" pro base).
 */
function ExtendsBanner({ slugs, activeVariant }) {
  // Najdi první slug, který extends-tkajui (typicky stránka má jen jeden donjon slug)
  const extendingSlug = slugs.find(s => componentMeta[s]?.subcategory === 'extends-tkajui')
  if (!extendingSlug) return null
  const meta = componentMeta[extendingSlug]
  if (!meta.extendsSlug) return null
  // Skryj na tkajui variantě — uživatel kouká na base, ne na rozšíření
  if (activeVariant === 'tkajui') return null

  const baseMeta = componentMeta[meta.extendsSlug]
  const baseLabel = baseMeta?.title || meta.extendsSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div
      className="mt-5 rounded-lg border border-neutral-800/80 bg-neutral-900/60 p-4"
      style={{ borderLeftWidth: 3, borderLeftColor: LIBRARY_CFG.donjon.color }}
    >
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-neutral-500 uppercase tracking-wider font-semibold">Rozšiřuje</span>
        <Link
          to={`/components/${meta.extendsSlug}?lib=tkajui`}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[#7BAED4] bg-[#7BAED4]/10 border border-[#7BAED4]/30 hover:bg-[#7BAED4]/20 transition-colors font-medium"
        >
          <TkajuiIcon size={10} />
          {baseLabel}
        </Link>
        <span className="text-neutral-600">→</span>
        <span className="text-neutral-400">přidává herní vrstvu</span>
      </div>
      {meta.differencesFromBase?.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5 text-xs text-neutral-400">
          {meta.differencesFromBase.map((diff, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#B8956A] mt-0.5 flex-shrink-0">▸</span>
              <span dangerouslySetInnerHTML={{ __html: formatDiff(diff) }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Backtick → <code> inline markup pro diff body
function formatDiff(str) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-neutral-800/80 text-neutral-300 text-[10.5px]">$1</code>')
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
 * @param {string}   [library]          'tkajui' | 'donjon' | 'both' — statický badge (pokud není variants)
 * @param {string}   [componentSlug]    zkratka pro jeden API chip
 * @param {string[]} [componentSlugs]   více API chipů
 * @param {Array}    [variants]         [{ id: 'donjon'|'tkajui', label?: string }, ...]
 *                                      První položka = výchozí varianta.
 *                                      Přidá VariantSwitcher + poskytne LibVariantContext dětem.
 */
export function ShowcasePage({ title, description, children, componentSlug, componentSlugs, library, variants }) {
  const slugs = componentSlugs ?? (componentSlug ? [componentSlug] : [])

  // Varianta — priorita: URL ?lib= > globální preference > první položka variants
  const [searchParams, setSearchParams] = useSearchParams()
  const [preference, setPreference] = useLibPreference()
  const libParam = searchParams.get('lib')
  const preferredInVariants = variants?.find(v => v.id === preference)?.id
  const initVariant = variants?.find(v => v.id === libParam)?.id
                   ?? preferredInVariants
                   ?? variants?.[0]?.id
                   ?? null
  const [activeVariant, setActiveVariant] = useState(initVariant)

  /* Sync s globální preferencí — když user změní v TopNav, aktualizuj zde
     (pouze pokud nová preference je v dostupných variantách stránky). */
  useEffect(() => {
    if (!variants) return
    if (preference === activeVariant) return
    const allowed = variants.find(v => v.id === preference)
    if (allowed) {
      setActiveVariant(preference)
      setSearchParams({ lib: preference }, { replace: true })
    }
  }, [preference, variants, activeVariant, setSearchParams])

  /* Scroll to anchor target on initial mount + whenever the hash changes.
     Without this, navigating to `/form#input` (e.g. via a Navigate
     redirect from the merged routes) lands at the top of the page —
     the browser's native anchor-scroll fires before the lazy-loaded
     section has rendered. We poll briefly until the element exists,
     then scroll into view. */
  const location = useLocation()
  useEffect(() => {
    const hash = location.hash?.slice(1)
    if (!hash) return undefined
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // For screen readers, also move focus to the section
        if (typeof el.focus === 'function') {
          const hadTabindex = el.hasAttribute('tabindex')
          if (!hadTabindex) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        }
        return
      }
      if (++attempts < 20) timer = setTimeout(tryScroll, 50)
    }
    let timer = setTimeout(tryScroll, 0)
    return () => clearTimeout(timer)
  }, [location.hash, location.pathname])

  const handleVariantChange = (v) => {
    setActiveVariant(v)
    setSearchParams({ lib: v }, { replace: true })
    setPreference(v)  // uložit jako globální preference
  }

  // Aktivní knihovna: buď z varianty nebo ze statického library prop
  const effectiveLibrary = activeVariant ?? library

  return (
    <LibVariantContext.Provider value={activeVariant}>
      {/* React 19 — document metadata hoistovaná do <head> bez knihoven */}
      <title>{title} · Donjon Fall Style Guide</title>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <header className="mb-8 lg:mb-10 border-b border-neutral-800 pb-6 lg:pb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl lg:text-3xl font-bold text-white text-balance">{title}</h2>
                {/* Variantní přepínač — nahrazuje statický LibraryBadge */}
                {variants
                  ? <VariantSwitcher variants={variants} active={activeVariant} onChange={handleVariantChange} />
                  : <LibraryBadge library={effectiveLibrary} />
                }
              </div>
              {description && (
                <p className="text-neutral-400 text-sm lg:text-base text-pretty">{description}</p>
              )}
            </div>
            {slugs.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {slugs.map(slug => <ApiChip key={slug} slug={slug} />)}
              </div>
            )}
          </div>
          {/* Extends-tkajui banner — pro donjon komponenty s TkajUI protějškem */}
          {slugs.length > 0 && <ExtendsBanner slugs={slugs} activeVariant={activeVariant} />}
        </header>
        {/* *:scroll-mt-8 — kotvové odkazy ze sidebaru nezakrývá hlavička */}
        <div className="flex flex-col gap-10 lg:gap-12 *:scroll-mt-8">{children}</div>
      </div>
    </LibVariantContext.Provider>
  )
}

export function Section({ id, title, description, children }) {
  return (
    <section id={id} className="flex flex-col gap-3 lg:gap-4">
      <div>
        <h3 className="text-base lg:text-lg font-semibold text-white text-balance">{title}</h3>
        {description && (
          <p className="text-xs lg:text-sm text-neutral-500 mt-0.5 text-pretty">{description}</p>
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
      {/* has-[:focus-visible]: — jemný signál když je focusovaný child uvnitř preview */}
      <div
        className={`rounded-xl border border-neutral-800 p-4 sm:p-6 lg:p-8 flex flex-wrap items-start gap-3 lg:gap-4 overflow-x-auto transition-colors has-[:focus-visible]:border-neutral-700 ${
          dark ? 'bg-neutral-900' : 'bg-neutral-100'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * CodeBlock — kód s copy buttonem v pravém horním rohu.
 *
 * Copy button je vždy viditelný (ne hover-only) — uživatel vidí, že
 * snippet lze kopírovat. Po kliknutí: text se změní na "Copied ✓"
 * po dobu 1.5s, pak se vrátí na "Copy".
 *
 * Selhání clipboard (např. v insecure context) tichá — button zůstane
 * v "Copy" stavu, žádná error UI (nepřerušuje flow uživatele).
 */
export function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard nedostupný — nedělej nic */
    }
  }

  return (
    <div className="relative group">
      <pre className="rounded-lg bg-neutral-950 border border-neutral-800 pl-4 lg:pl-5 pr-16 py-3 lg:py-4 text-xs lg:text-sm text-neutral-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Zkopírováno' : 'Kopírovat kód'}
        className={[
          'absolute top-2 right-2 inline-flex items-center gap-1.5',
          'px-2 py-1 rounded-md text-[10.5px] font-mono font-medium uppercase tracking-wider',
          'border transition-all duration-150',
          copied
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500',
        ].join(' ')}
      >
        {copied ? (
          <>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2.5 6 2.5 2.5 4.5-5" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3.5" y="3.5" width="6" height="7" rx="1" />
              <path d="M5.5 1.5h5a1 1 0 0 1 1 1v5" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  )
}
