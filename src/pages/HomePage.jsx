/* ── HomePage ──────────────────────────────────────────────────────────────
   Titulní stránka style guidu.
   Hero (brand + install) → Stats → Začni tady → Herní primitiva → Recent.
   ─────────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import pkg from '../../package.json'
import { registry } from '../data/componentRegistry'
import {
  gold, goldMid, goldDim,
  bg0, bg2, bg3, bgDeep,
  borderDefault, borderMid,
  textHigh, textMid, textLow,
  gainColor, dangerColor, warningColor, infoColor, magicColor,
} from '../lib/donjon/tokens'
import { octagon, octagonInner } from '../utils/octagon'

const NPM_PACKAGE = 'donjon-fall-ui'

/* ── Stats — počítáno z registry ── */
function getStats() {
  const total = registry.length
  const documented = registry.filter(c => c.status === 'documented').length
  const donjon = registry.filter(c => c.category === 'donjon-fall-ui').length
  const tkajui = registry.filter(c => c.category === 'TkajUI').length
  return { total, documented, donjon, tkajui }
}

/* ── Mini ikonky pro karty herních primitiv ── */
function ShieldIcon({ color = gold }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M12 2 4 5v7c0 4.5 3.5 7.5 8 9 4.5-1.5 8-4.5 8-9V5l-8-3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function HeartIcon({ color = dangerColor }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function SwordIcon({ color = gold }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="m4 20 4-4M6 18l-3 3M14.5 5.5 19 2l3 3-3.5 4.5M14 6l4 4M14 10l-9.5 9.5L7 22l9.5-9.5" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function ListIcon({ color = goldMid }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function PhasesIcon({ color = infoColor }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <circle cx="5" cy="12" r="2.5" fill={color} />
      <path d="M8 12h4" stroke={color} strokeWidth="1.5" />
      <circle cx="14" cy="12" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M17 12h4" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="12" r="0" />
    </svg>
  )
}
function HashIcon({ color = magicColor }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M9 3 7 21M17 3l-2 18M3 9h18M2 15h18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function PaletteIcon({ color = gold }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1.2 2-2.5 0-1.2-1-2-1-3 0-1.5 1-2.5 2.5-2.5H17a4 4 0 0 0 4-4c0-3.3-4-6-9-6Z" stroke={color} strokeWidth="1.5" />
      <circle cx="7.5" cy="11" r="1.2" fill={color} />
      <circle cx="12" cy="7.5" r="1.2" fill={color} />
      <circle cx="16.5" cy="11" r="1.2" fill={color} />
    </svg>
  )
}
function GridIcon({ color = goldMid }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
function SparkIcon({ color = gold }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l4 4M14.5 14.5l4 4M18.5 5.5l-4 4M9.5 14.5l-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Card primitiva pro home ── */
function HomeCard({ to, icon, title, description, accent = gold, badge }) {
  const [hover, setHover] = useState(false)
  const cx = 12
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        clipPath: octagon(cx),
        background: hover ? `${accent}66` : borderDefault,
        padding: 1,
        textDecoration: 'none',
        transition: 'background 160ms',
      }}
    >
      <div style={{
        position: 'relative',
        clipPath: octagonInner(cx),
        background: hover ? bg3 : bg2,
        padding: '20px 22px',
        height: '100%',
        transition: 'background 160ms',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: accent }}>{icon}</span>
          {badge && (
            <span style={{
              fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.08em',
              color: accent, padding: '2px 6px',
              border: `1px solid ${accent}55`, borderRadius: 3,
              textTransform: 'uppercase',
            }}>
              {badge}
            </span>
          )}
        </div>
        <h3 style={{
          margin: 0,
          fontSize: '0.9375rem', fontWeight: 700,
          color: textHigh, letterSpacing: '0.02em',
          marginBottom: 6,
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0,
          fontSize: '0.8125rem', color: textMid, lineHeight: 1.5,
        }}>
          {description}
        </p>
        <span style={{
          position: 'absolute', bottom: 14, right: 18,
          color: hover ? accent : goldDim,
          fontSize: '0.875rem', transition: 'color 160ms, transform 160ms',
          transform: hover ? 'translateX(2px)' : 'translateX(0)',
        }}>
          →
        </span>
      </div>
    </Link>
  )
}

/* ── Stat box ── */
function StatBox({ value, label, accent = gold }) {
  return (
    <div style={{
      padding: '20px 16px',
      background: bg2,
      border: `1px solid ${borderDefault}`,
      borderRadius: 6,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '2rem', fontWeight: 700, color: accent,
        fontVariantNumeric: 'tabular-nums', lineHeight: 1,
        marginBottom: 6,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.6875rem', fontWeight: 600,
        color: textLow, letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

/* ── NPM install — kompaktní inline verze pro hero ── */
function HeroInstall() {
  const [copied, setCopied] = useState(false)
  const cmd = `npm install ${NPM_PACKAGE}`

  async function copy() {
    try { await navigator.clipboard.writeText(cmd) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copy}
      aria-label={copied ? 'Zkopírováno' : `Zkopírovat ${cmd}`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '10px 16px',
        background: bgDeep,
        border: `1px solid ${copied ? `${gold}66` : borderDefault}`,
        borderRadius: 6,
        color: copied ? gold : textMid,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 160ms',
      }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.borderColor = goldDim }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.borderColor = borderDefault }}
    >
      <span style={{ color: goldDim }}>$</span>
      <span>{copied ? 'Zkopírováno!' : cmd}</span>
      <span style={{
        fontSize: '0.6875rem', fontWeight: 700,
        color: warningColor,
        border: `1px solid ${warningColor}55`,
        background: `${warningColor}11`,
        borderRadius: 3, padding: '1px 5px', letterSpacing: '0.04em',
      }}>
        WIP
      </span>
    </button>
  )
}

export default function HomePage() {
  const stats = getStats()

  return (
    <>
      <title>{`donjon-fall-ui · Herní UI knihovna`}</title>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 64px' }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section style={{
          padding: '48px 32px',
          background: `radial-gradient(circle at 20% 0%, ${gold}0E, transparent 60%), ${bg2}`,
          border: `1px solid ${borderDefault}`,
          borderRadius: 10,
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18 }}>
            <span aria-hidden="true" style={{ fontSize: 40, filter: `drop-shadow(0 0 12px ${gold}55)` }}>🏰</span>
            <h1 style={{
              margin: 0,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: textHigh, letterSpacing: '-0.02em',
            }}>
              donjon-fall-ui
            </h1>
            <span style={{
              fontSize: '0.75rem', fontWeight: 600,
              color: goldDim,
              padding: '3px 8px',
              border: `1px solid ${goldDim}55`,
              borderRadius: 4, fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.04em',
            }}>
              v{pkg.version}
            </span>
          </div>

          <p style={{
            margin: 0,
            fontSize: '1.0625rem', color: textMid,
            lineHeight: 1.55, maxWidth: 640,
            marginBottom: 28,
          }}>
            Herní UI knihovna ve stylu středověkého dungeonu.
            <span style={{ color: goldMid }}> Zlatá paleta</span> ·
            <span style={{ color: goldMid }}> oktagonální tvary</span> ·
            <span style={{ color: goldMid }}> ornamentální hex motivy</span>.
            Zero-dependency, React 19, accessibility-first.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <HeroInstall />
            <Link
              to="/components"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                background: gold,
                color: bg0,
                borderRadius: 6,
                fontWeight: 700, fontSize: '0.875rem',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'transform 120ms, box-shadow 120ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${gold}44` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Začít s komponenty
              <span style={{ fontSize: '1rem' }}>→</span>
            </Link>
            <Link
              to="/mood"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                background: 'transparent',
                color: textMid,
                border: `1px solid ${borderDefault}`,
                borderRadius: 6,
                fontWeight: 600, fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'border-color 120ms, color 120ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = goldDim; e.currentTarget.style.color = textHigh }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = borderDefault; e.currentTarget.style.color = textMid }}
            >
              Mood &amp; Vision
            </Link>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────── */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
          marginBottom: 40,
        }}>
          <StatBox value={stats.total} label="Komponent" />
          <StatBox value={stats.documented} label="Dokumentováno" accent={gainColor} />
          <StatBox value={stats.donjon} label="donjon-fall-ui" />
          <StatBox value={stats.tkajui} label="TkajUI" accent={infoColor} />
          <StatBox value="WCAG 2.1" label="A11y AA" accent={gainColor} />
        </section>

        {/* ── ZAČNI TADY ───────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{
            margin: '0 0 20px',
            fontSize: '0.6875rem', fontWeight: 700,
            color: goldMid, letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            ⚡ Začni tady
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}>
            <HomeCard
              to="/mood"
              icon={<PaletteIcon />}
              title="Mood & Vision"
              description="Hodnoty knihovny, estetika, jak vznikla a kam míří. Začni tady pokud chceš pochopit proč."
            />
            <HomeCard
              to="/components"
              icon={<GridIcon />}
              title="Komponenty"
              description="Všech 42+ komponent s metadaty, props tabulkami a live ukázkami. Filtruj podle knihovny."
            />
            <HomeCard
              to="/tokens"
              icon={<SparkIcon />}
              title="Design tokeny"
              description="Barvy, fonty, spacing, animace. Vše importovatelné z donjon-fall-ui/tokens."
            />
          </div>
        </section>

        {/* ── HERNÍ PRIMITIVA ──────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{
            margin: '0 0 8px',
            fontSize: '0.6875rem', fontWeight: 700,
            color: goldMid, letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            ✨ Herní primitiva
          </h2>
          <p style={{
            margin: '0 0 20px',
            fontSize: '0.8125rem', color: textLow,
            maxWidth: 600, lineHeight: 1.55,
          }}>
            Specializované UI bloky pro deskové a tahové hry — to, co generické knihovny neumí.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}>
            <HomeCard
              to="/player-panel"
              icon={<ShieldIcon />}
              accent={infoColor}
              title="PlayerPanel"
              description="Mini karta hráče s erbem, VP, HP/mana/stamina bary. Označuje aktivního hráče glow efektem."
            />
            <HomeCard
              to="/resource-bar"
              icon={<HeartIcon />}
              accent={dangerColor}
              title="ResourceBar"
              description="HP/mana/stamina/XP bar s vizuálními zónami a damage flash. 5 prefab variant."
            />
            <HomeCard
              to="/action-tile"
              icon={<SwordIcon />}
              accent={gold}
              title="ActionTile"
              description="Klikatelná akční dlaždice s ikonou, popisem a costem. Stavy: selected, disabled, locked."
            />
            <HomeCard
              to="/event-log"
              icon={<ListIcon />}
              accent={goldMid}
              title="EventLog"
              description="Scrollovatelný log herních událostí s auto-scroll. Typové barevné kódování událostí."
            />
            <HomeCard
              to="/phase-indicator"
              icon={<PhasesIcon />}
              accent={infoColor}
              title="PhaseIndicator"
              description="Ukazatel fáze hry (příprava → boj → konec). Glow na aktivní fázi, zelená na dokončené."
            />
            <HomeCard
              to="/numeric-display"
              icon={<HashIcon />}
              accent={magicColor}
              title="NumericDisplay"
              description="Animované číslo pro VP a počítadla. Při změně zobrazí +/− delta badge s gain/loss flash."
            />
          </div>
        </section>

        {/* ── CO JE NOVÉHO ──────────────────────────────────────── */}
        <section style={{
          padding: '20px 24px',
          background: bgDeep,
          border: `1px solid ${borderMid}`,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: '0.6875rem', fontWeight: 700,
              color: goldMid, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 6,
            }}>
              📜 Nejnovější změny
            </div>
            <p style={{
              margin: 0, fontSize: '0.8125rem', color: textMid,
              lineHeight: 1.55, maxWidth: 540,
            }}>
              Centrální ornament sizing helper · sjednocen ornament default ·
              WCAG 2.1 AA audit · TopNav s ⌘K command palette · 8 dokumentovaných primitiv.
            </p>
          </div>
          <a
            href="https://github.com/tkajdamek/donjon-fall-ui/releases"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '0.8125rem', fontWeight: 600,
              color: gold, textDecoration: 'none',
              padding: '6px 12px',
              border: `1px solid ${goldDim}55`,
              borderRadius: 4,
              transition: 'background 120ms, border-color 120ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${gold}11`; e.currentTarget.style.borderColor = goldDim }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${goldDim}55` }}
          >
            Full changelog →
          </a>
        </section>

      </div>
    </>
  )
}
