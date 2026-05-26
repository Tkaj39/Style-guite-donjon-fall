/* ── TopNav ────────────────────────────────────────────────────────────────
   Horní lišta nad sidebarem + obsahem.
   Levá: hamburger (mobile) + brand + aktivní stránka.
   Pravá: search trigger, npm install copy, changelog, GitHub.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import pkg from '../../package.json'
import { sections } from './Sidebar'
import { useLibPreference } from './LibPreferenceProvider'
import { LIBRARY_CFG } from './ShowcasePage'
import {
  gold, goldMid, goldDim,
  bgDeep, borderDefault, textHigh, textMid, textLow,
} from '../lib/donjon/tokens'

/* ── Konfigurace pro publish ── */
const NPM_PACKAGE  = 'donjon-fall-ui'
const GITHUB_URL   = 'https://github.com/tkajdamek/donjon-fall-ui'
const RELEASES_URL = `${GITHUB_URL}/releases`

/* Detekce platformy pro hotkey hint */
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
const HOTKEY_LABEL = isMac ? '⌘K' : 'Ctrl+K'

/* ── Ikonky ── */
function HamburgerIcon() {
  return (
    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect y="3" width="20" height="2" rx="1" />
      <rect y="9" width="20" height="2" rx="1" />
      <rect y="15" width="20" height="2" rx="1" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.19 1.18a11.1 11.1 0 0 1 5.81 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8 3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── LibPreferenceToggle — globální přepínač knihovny ── */
function LibPreferenceToggle() {
  const [preference, setPreference] = useLibPreference()
  const options = [
    { id: 'tkajui', cfg: LIBRARY_CFG.tkajui },
    { id: 'donjon', cfg: LIBRARY_CFG.donjon },
  ]
  return (
    <div
      role="group"
      aria-label="Výchozí knihovna pro showcase stránky"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        background: `${borderDefault}33`,
        border: `1px solid ${borderDefault}`,
        borderRadius: 6,
      }}
    >
      {options.map(({ id, cfg }) => {
        const active = preference === id
        const Icon = cfg.Icon
        return (
          <button
            key={id}
            onClick={() => setPreference(id)}
            aria-pressed={active}
            title={`Nastavit ${cfg.label} jako výchozí knihovnu`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 9px',
              borderRadius: 4,
              border: 'none',
              background: active ? `${cfg.color}1F` : 'transparent',
              color: active ? cfg.color : textLow,
              fontSize: '0.75rem',
              fontWeight: active ? 600 : 500,
              fontFamily: 'inherit',
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'background 120ms, color 120ms',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = textHigh }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = textLow }}
          >
            <Icon size={12} />
            <span className="hidden xl:inline">{cfg.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* Malá tečka v pravém horním rohu — vizuální indikátor "v přípravě" */
function WipDot() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 6,
        right: 6,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#C08040',  // warningColor — "v přípravě"
        boxShadow: '0 0 4px #C0804099',
        pointerEvents: 'none',
      }}
    />
  )
}

function ChangelogIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3h7l3 3v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 3v3h3M5 9h6M5 11.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/* ── Helper: najdi aktivní položku v sections podle pathname ── */
function findActivePage(pathname) {
  for (const section of sections) {
    for (const item of section.items) {
      if (item.to === pathname) {
        return { label: item.label.replace(/^[^\w\s]+\s*/, '').trim(), to: item.to }
      }
      if (item.children) {
        for (const c of item.children) {
          // c.to může být '/components#tkajui' — match po porovnání jen pathname části
          const cPath = c.to.split('#')[0]
          if (cPath === pathname) {
            return { label: c.label, to: c.to }
          }
        }
      }
    }
  }
  return null
}

/* ── NPM install button s clipboard copy ── */
function NpmInstallButton({ compact = false }) {
  const [copied, setCopied] = useState(false)
  const cmd = `npm install ${NPM_PACKAGE}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // fallback — vybere text v dummy textareu (zde stačí)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const ariaLabel = copied
    ? 'Příkaz zkopírován do schránky'
    : `Zkopíruj install příkaz "${cmd}" — balíček zatím není publikován na npm, připravujeme`
  const tooltip = copied
    ? 'Zkopírováno do schránky'
    : `${cmd}\n\n⚠ Balíček zatím není publikován na npm — v přípravě`

  if (compact) {
    return (
      <button
        onClick={copy}
        aria-label={ariaLabel}
        title={tooltip}
        className="flex items-center justify-center w-9 h-9 rounded-md transition-colors relative"
        style={{ color: copied ? gold : textLow }}
        onMouseEnter={e => { if (!copied) { e.currentTarget.style.color = gold; e.currentTarget.style.background = `${borderDefault}66` } }}
        onMouseLeave={e => { if (!copied) { e.currentTarget.style.color = textLow; e.currentTarget.style.background = 'transparent' } }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {!copied && <WipDot />}
      </button>
    )
  }

  return (
    <button
      onClick={copy}
      aria-label={ariaLabel}
      title={tooltip}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        background: `${borderDefault}33`,
        border: `1px solid ${copied ? `${gold}66` : borderDefault}`,
        borderRadius: 6,
        color: copied ? gold : textMid,
        fontSize: '0.8125rem',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        cursor: 'pointer',
        transition: 'all 120ms',
      }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.borderColor = goldDim }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.borderColor = borderDefault }}
    >
      <span style={{ color: copied ? gold : textLow }}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
      <span>
        {copied ? 'Zkopírováno' : `npm i ${NPM_PACKAGE}`}
      </span>
      {!copied && (
        <span
          aria-hidden="true"
          style={{
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#C08040',
            border: '1px solid #C0804055',
            background: '#C0804011',
            borderRadius: 3,
            padding: '1px 4px',
            letterSpacing: '0.06em',
            marginLeft: 4,
          }}
          title="V přípravě — balíček zatím není publikován"
        >
          WIP
        </span>
      )}
    </button>
  )
}

export default function TopNav({ onMenuToggle, showMenuToggle = false, menuButtonRef, menuOpen = false, onSearchOpen }) {
  const location = useLocation()
  const activePage = useMemo(() => findActivePage(location.pathname), [location.pathname])

  return (
    <header
      style={{
        height: 56,
        background: bgDeep,
        borderBottom: `1px solid ${borderDefault}`,
      }}
      className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6"
    >
      {/* Levá strana — hamburger (mobile) + brand + aktivní stránka */}
      <div className="flex items-center gap-3 min-w-0">
        {showMenuToggle && (
          <button
            ref={menuButtonRef}
            onClick={onMenuToggle}
            aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={menuOpen}
            aria-controls="sidebar-nav"
            className="lg:hidden p-2 -ml-2 rounded-md transition-colors"
            style={{ color: textLow }}
            onMouseEnter={e => { e.currentTarget.style.color = textHigh; e.currentTarget.style.background = `${borderDefault}66` }}
            onMouseLeave={e => { e.currentTarget.style.color = textLow; e.currentTarget.style.background = 'transparent' }}
          >
            <HamburgerIcon />
          </button>
        )}

        <Link
          to="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label={`donjon-fall-ui style guide v${pkg.version} — domovská stránka (knihovna se připravuje k publikaci)`}
          title={`donjon-fall-ui v${pkg.version}\nHerní UI knihovna — style guide\n\n⚠ Knihovna se připravuje k publikaci`}
        >
          <span aria-hidden="true" style={{ fontSize: 22, lineHeight: 1, filter: `drop-shadow(0 0 6px ${gold}33)` }}>
            🏰
          </span>
          <span
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: textHigh,
              letterSpacing: '0.02em',
              transition: 'color 120ms',
            }}
          >
            donjon-fall-ui
          </span>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: goldDim,
              padding: '2px 6px',
              border: `1px solid ${goldDim}44`,
              borderRadius: 3,
              letterSpacing: '0.04em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            v{pkg.version}
          </span>
        </Link>

        {/* Aktivní stránka — viditelné jen na desktopu, jen pokud nejsme na homepage */}
        {activePage && (
          <div className="hidden md:flex items-center gap-2 min-w-0">
            <span aria-hidden="true" style={{ color: goldDim, fontSize: '0.875rem', userSelect: 'none' }}>/</span>
            <span
              style={{
                fontSize: '0.875rem',
                color: textMid,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={activePage.label}
            >
              {activePage.label}
            </span>
          </div>
        )}
      </div>

      {/* Pravá strana — search + install + changelog + GitHub */}
      <div className="flex items-center gap-2">
        {/* Search trigger — desktop varianta */}
        {onSearchOpen && (
          <button
            onClick={onSearchOpen}
            aria-label={`Hledat stránky a komponenty (klávesová zkratka ${HOTKEY_LABEL})`}
            title={`Hledat napříč style guidem\nStránky • komponenty • props\n\nKlávesová zkratka: ${HOTKEY_LABEL}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              background: `${borderDefault}33`,
              border: `1px solid ${borderDefault}`,
              borderRadius: 6,
              color: textLow,
              fontSize: '0.8125rem',
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'border-color 120ms, background 120ms',
              minWidth: 180,
            }}
            className="hidden lg:flex"
            onMouseEnter={e => { e.currentTarget.style.borderColor = goldDim; e.currentTarget.style.background = `${borderDefault}66` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = borderDefault; e.currentTarget.style.background = `${borderDefault}33` }}
          >
            <SearchIcon />
            <span style={{ flex: 1, textAlign: 'left' }}>Hledat…</span>
            <kbd style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: textLow,
              border: `1px solid ${borderDefault}`,
              borderRadius: 3,
              padding: '1px 5px',
              fontFamily: 'inherit',
            }}>
              {HOTKEY_LABEL}
            </kbd>
          </button>
        )}

        {/* Search ikona — mobile + tablet */}
        {onSearchOpen && (
          <button
            onClick={onSearchOpen}
            aria-label={`Hledat stránky a komponenty (klávesová zkratka ${HOTKEY_LABEL})`}
            title={`Hledat\nKlávesová zkratka: ${HOTKEY_LABEL}`}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md transition-colors"
            style={{ color: textLow }}
            onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.background = `${borderDefault}66` }}
            onMouseLeave={e => { e.currentTarget.style.color = textLow; e.currentTarget.style.background = 'transparent' }}
          >
            <SearchIcon />
          </button>
        )}

        {/* Library variant preference — desktop a tablet (md+) */}
        <div className="hidden md:block">
          <LibPreferenceToggle />
        </div>

        {/* NPM install — desktop full button */}
        <div className="hidden lg:block">
          <NpmInstallButton />
        </div>

        {/* NPM install — mobile compact icon */}
        <div className="lg:hidden">
          <NpmInstallButton compact />
        </div>

        {/* Changelog — odkaz na GitHub releases */}
        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Changelog (seznam vydání na GitHubu) — repo se zatím připravuje k publikaci"
          title={`Changelog (GitHub releases)\n\n⚠ Repo se zatím připravuje k publikaci\n${RELEASES_URL}`}
          style={{ color: textLow }}
          className="flex items-center justify-center w-9 h-9 rounded-md transition-colors relative"
          onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.background = `${borderDefault}66` }}
          onMouseLeave={e => { e.currentTarget.style.color = textLow; e.currentTarget.style.background = 'transparent' }}
        >
          <ChangelogIcon />
          <WipDot />
        </a>

        {/* GitHub */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository (zdrojový kód) — repo se zatím připravuje k publikaci"
          title={`GitHub repository\n\n⚠ Repo se zatím připravuje k publikaci\n${GITHUB_URL}`}
          style={{ color: textLow }}
          className="flex items-center justify-center w-9 h-9 rounded-md transition-colors relative"
          onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.background = `${borderDefault}66` }}
          onMouseLeave={e => { e.currentTarget.style.color = textLow; e.currentTarget.style.background = 'transparent' }}
        >
          <GitHubIcon />
          <WipDot />
        </a>
      </div>
    </header>
  )
}
