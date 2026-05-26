/* ── TopNav ────────────────────────────────────────────────────────────────
   Horní lišta nad sidebarem + obsahem.
   Na mobilu obsahuje hamburger toggle pro sidebar.
   Na desktopu zobrazuje brand vlevo, GitHub link vpravo.
   ─────────────────────────────────────────────────────────────────────── */
import pkg from '../../package.json'
import { gold, goldMid, goldDim, bgDeep, borderDefault, textHigh, textLow } from '../lib/donjon/tokens'

const GITHUB_URL = 'https://github.com/tkajdamek/donjon-fall-ui'

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

/* Detekce platformy pro hotkey hint */
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
const HOTKEY_LABEL = isMac ? '⌘K' : 'Ctrl+K'

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function TopNav({ onMenuToggle, showMenuToggle = false, menuButtonRef, menuOpen = false, onSearchOpen }) {
  return (
    <header
      style={{
        height: 56,
        background: bgDeep,
        borderBottom: `1px solid ${borderDefault}`,
      }}
      className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6"
    >
      {/* Levá strana — hamburger (mobile) + brand */}
      <div className="flex items-center gap-3">
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

        <a href="/" className="flex items-center gap-2.5 group" aria-label="donjon-fall-ui homepage">
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
        </a>
      </div>

      {/* Pravá strana — search + externí odkazy */}
      <div className="flex items-center gap-2">
        {/* Search trigger — vypadá jako input, otevírá command palette */}
        {onSearchOpen && (
          <button
            onClick={onSearchOpen}
            aria-label={`Hledat (${HOTKEY_LABEL})`}
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
            className="hidden sm:flex"
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

        {/* Mobile-only search icon button */}
        {onSearchOpen && (
          <button
            onClick={onSearchOpen}
            aria-label={`Hledat (${HOTKEY_LABEL})`}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-md transition-colors"
            style={{ color: textLow }}
            onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.background = `${borderDefault}66` }}
            onMouseLeave={e => { e.currentTarget.style.color = textLow; e.currentTarget.style.background = 'transparent' }}
          >
            <SearchIcon />
          </button>
        )}

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          style={{ color: textLow }}
          className="flex items-center justify-center w-9 h-9 rounded-md transition-colors"
          onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.background = `${borderDefault}66` }}
          onMouseLeave={e => { e.currentTarget.style.color = textLow; e.currentTarget.style.background = 'transparent' }}
        >
          <GitHubIcon />
        </a>
      </div>
    </header>
  )
}
