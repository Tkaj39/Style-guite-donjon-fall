/* ── HomePage ──────────────────────────────────────────────────────────────
   Titulní stránka style guidu — dual-library design.
   Struktura:
     1. Hero (dual brand: donjon + TkajUI)
     2. Stats (TkajUI / donjon / extends ratio)
     3. „Dvě knihovny, jeden systém" — vztah base ↔ game layer
     4. „Začni tady" — Mood, Components, Tokens, Architektura
     5. „UI Foundations" — TkajUI base komponenty (modrá)
     6. „Herní primitiva" — donjon exclusive komponenty (zlatá)
     7. Co je nového
   ─────────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import pkg from '../../package.json'
import { registry } from '../data/componentRegistry'
import { componentMeta } from '../data/componentMeta'
import {
  gold, goldMid, goldDim,
  bg0, bg2, bg3, bgDeep,
  borderDefault, borderMid,
  textHigh, textMid, textLow,
  gainColor, dangerColor, warningColor, infoColor, magicColor,
} from '../lib/donjon/tokens'
import { octagon, octagonInner } from '../lib/shared/octagon'
import ArchDiagram from '../styleguide/ArchDiagram'
import LibraryLogo from '../styleguide/LibraryLogo'

const NPM_PACKAGE = 'donjon-fall-ui'

// Brand barvy knihoven — sjednocené s LIBRARY_CFG v ShowcasePage.
// Toto je výjimka z pravidla „nesmíchávej palety": HomePage prezentuje
// OBĚ knihovny jako rovnocenné a potřebuje brand identitu pro každou.
const BRAND = {
  donjon: { color: goldMid, accent: gold,      label: 'donjon-fall-ui' },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
  // eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
  tkajui: { color: '#7BAED4', accent: '#7BAED4', label: 'TkajUI'         },
}

/* ── Stats — počítáno z registry ── */
function getStats() {
  const total       = registry.length
  const documented  = registry.filter(c => c.status === 'documented').length
  const donjon      = registry.filter(c => c.category === 'donjon-fall-ui').length
  const tkajui      = registry.filter(c => c.category === 'TkajUI').length
  const extending   = Object.values(componentMeta).filter(m => m.subcategory === 'extends-tkajui').length
  return { total, documented, donjon, tkajui, extending }
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
// eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
function StackIcon({ color = '#7BAED4' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3" y="4"  width="18" height="4" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="3" y="10" width="18" height="4" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="3" y="16" width="18" height="4" rx="1" stroke={color} strokeWidth="1.4" />
    </svg>
  )
}
// eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
function FormIcon({ color = '#7BAED4' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="3.5" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="3" y="13" width="18" height="3.5" rx="1" stroke={color} strokeWidth="1.4" />
      <path d="M5 8h2M5 15h2" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}
// eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
function ButtonIcon({ color = '#7BAED4' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M8 12h8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
// eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
function ModalIcon({ color = '#7BAED4' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="1.4" opacity="0.4" />
      <rect x="6" y="7" width="12" height="10" rx="1.5" stroke={color} strokeWidth="1.6" />
      <path d="M9 11h6M9 14h4" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}
// eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
function TabsIcon({ color = '#7BAED4' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M3 9h6V6h12v3" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="3" y="9" width="18" height="11" rx="1.5" stroke={color} strokeWidth="1.4" />
    </svg>
  )
}
// eslint-disable-next-line donjon/no-hardcoded-hex -- brand color v cross-library kontextu (HomePage, ArchDiagram — mix paletes)
function ToggleIcon({ color = '#7BAED4' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="4" stroke={color} strokeWidth="1.4" />
      <circle cx="16" cy="12" r="2.6" fill={color} />
    </svg>
  )
}
function ArchIcon({ color = goldMid }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="9" y="2" width="6" height="4" rx="0.6" stroke={color} strokeWidth="1.3" />
      <rect x="2" y="14" width="6" height="6" rx="0.6" stroke={color} strokeWidth="1.3" />
      <rect x="16" y="14" width="6" height="6" rx="0.6" stroke={color} strokeWidth="1.3" />
      <path d="M12 6v4M12 10H5v4M12 10h7v4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

/* ── HomeCard primitiva pro herní/UI sekce ── */
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
function StatBox({ value, label, accent = gold, sublabel }) {
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
      {sublabel && (
        <div style={{
          fontSize: '0.625rem',
          color: textLow, marginTop: 4,
          opacity: 0.75,
        }}>
          {sublabel}
        </div>
      )}
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

/* ── Brand chip pro hero ── */
function BrandChip({ brand, withLink }) {
  const cfg = BRAND[brand]
  const content = (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px 3px 8px',
      background: `${cfg.color}14`,
      border: `1px solid ${cfg.color}3A`,
      color: cfg.color,
      borderRadius: 4,
      fontSize: '0.75rem', fontWeight: 600,
      letterSpacing: '0.02em',
    }}>
      <LibraryLogo brand={brand} size={14} color={cfg.color} />
      {cfg.label}
    </span>
  )
  return withLink ? <Link to={withLink} style={{ textDecoration: 'none' }}>{content}</Link> : content
}

/* ── Library hero card — paralelní brand block (TkajUI / donjon) ── */
function LibraryCard({ brand, role, tagline, bullets, ctaTo, ctaLabel }) {
  const cfg = BRAND[brand]
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '24px 26px 22px',
        background: `linear-gradient(165deg, ${cfg.color}11 0%, ${bg2} 70%)`,
        border: `1px solid ${hover ? `${cfg.color}66` : borderDefault}`,
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: 8,
        transition: 'border-color 160ms',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span aria-hidden="true" style={{ display: 'inline-flex', filter: `drop-shadow(0 0 10px ${cfg.color}55)` }}>
          <LibraryLogo brand={brand} size={28} color={cfg.color} />
        </span>
        <h2 style={{
          margin: 0,
          fontSize: '1.5rem', fontWeight: 700,
          color: textHigh, letterSpacing: '-0.01em',
        }}>
          {cfg.label}
        </h2>
        <span style={{
          fontSize: '0.6875rem', fontWeight: 700,
          color: cfg.color, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '2px 7px',
          background: `${cfg.color}14`,
          border: `1px solid ${cfg.color}3A`,
          borderRadius: 3,
        }}>
          {role}
        </span>
      </div>

      <p style={{
        margin: 0, color: textMid,
        fontSize: '0.9375rem', lineHeight: 1.55,
      }}>
        {tagline}
      </p>

      <ul style={{
        margin: 0, padding: 0, listStyle: 'none',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {bullets.map((b, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 8,
            fontSize: '0.8125rem', color: textMid, lineHeight: 1.5,
          }}>
            <span style={{ color: cfg.color, marginTop: 1, flexShrink: 0 }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link
        to={ctaTo}
        style={{
          marginTop: 4,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px',
          background: hover ? `${cfg.color}22` : `${cfg.color}11`,
          border: `1px solid ${cfg.color}55`,
          color: cfg.color,
          borderRadius: 5,
          fontSize: '0.8125rem', fontWeight: 600,
          textDecoration: 'none',
          alignSelf: 'flex-start',
          transition: 'all 160ms',
        }}
      >
        {ctaLabel}
        <span>→</span>
      </Link>
    </div>
  )
}

/* ── Section header (sjednocený styl pro všechny sekce) ── */
function SectionHeader({ kicker, title, description }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {kicker && (
        <div style={{
          fontSize: '0.6875rem', fontWeight: 700,
          color: goldMid, letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: title ? 8 : 0,
        }}>
          {kicker}
        </div>
      )}
      {title && (
        <h2 style={{
          margin: 0,
          fontSize: '1.375rem', fontWeight: 700,
          color: textHigh, letterSpacing: '-0.01em',
          marginBottom: description ? 8 : 0,
        }}>
          {title}
        </h2>
      )}
      {description && (
        <p style={{
          margin: 0,
          fontSize: '0.875rem', color: textMid,
          maxWidth: 640, lineHeight: 1.55,
        }}>
          {description}
        </p>
      )}
    </div>
  )
}

export default function HomePage() {
  const stats = getStats()

  return (
    <>
      <title>{`donjon-fall-ui & TkajUI · Style Guide`}</title>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 64px' }}>

        {/* ── HERO — dual brand ───────────────────────────────────── */}
        <section style={{
          padding: '44px 32px 40px',
          background: `
            radial-gradient(circle at 15% 0%,  ${gold}0E, transparent 55%),
            radial-gradient(circle at 85% 0%,  ${BRAND.tkajui.color}0D, transparent 55%),
            ${bg2}
          `,
          border: `1px solid ${borderDefault}`,
          borderRadius: 10,
          marginBottom: 24,
        }}>
          {/* Dual brand title row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            flexWrap: 'wrap', marginBottom: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span aria-hidden="true" style={{ display: 'inline-flex', filter: `drop-shadow(0 0 12px ${gold}55)` }}>
                <LibraryLogo brand="donjon" size={40} color={gold} />
              </span>
              <h1 style={{
                margin: 0,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: textHigh, letterSpacing: '-0.02em',
              }}>
                donjon-fall-ui
              </h1>
            </div>
            <span aria-hidden="true" style={{ color: textLow, fontSize: '1.5rem', fontWeight: 300 }}>×</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span aria-hidden="true" style={{ display: 'inline-flex', filter: `drop-shadow(0 0 10px ${BRAND.tkajui.color}55)` }}>
                <LibraryLogo brand="tkajui" size={32} color={BRAND.tkajui.color} />
              </span>
              <h1 style={{
                margin: 0,
                fontSize: 'clamp(1.5rem, 3.5vw, 2.15rem)',
                fontWeight: 700,
                color: BRAND.tkajui.color, letterSpacing: '-0.01em',
              }}>
                TkajUI
              </h1>
            </div>
            <span style={{
              marginLeft: 'auto',
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

          {/* Tagline */}
          <p style={{
            margin: 0,
            fontSize: '1.0625rem', color: textMid,
            lineHeight: 1.6, maxWidth: 740,
            marginBottom: 28,
          }}>
            <strong style={{ color: textHigh, fontWeight: 600 }}>Dvě knihovny, jedna codebase.</strong>{' '}
            <span style={{ color: BRAND.tkajui.color }}>TkajUI</span> — chladná modrá UI základna
            pro jakoukoli React aplikaci.{' '}
            <span style={{ color: goldMid }}>donjon-fall-ui</span> — herní vrstva
            postavená nad TkajUI, zlatá středověká estetika s oktagonálními tvary
            a ornamentálními hex motivy.
          </p>

          {/* CTA row */}
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
              <LibraryLogo brand="donjon" size={16} color={bg0} />
              Začít s donjon
              <span style={{ fontSize: '1rem' }}>→</span>
            </Link>
            <Link
              to="/components?lib=tkajui"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                background: `${BRAND.tkajui.color}11`,
                color: BRAND.tkajui.color,
                border: `1px solid ${BRAND.tkajui.color}55`,
                borderRadius: 6,
                fontWeight: 700, fontSize: '0.875rem',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'all 120ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.tkajui.color}22`; e.currentTarget.style.borderColor = `${BRAND.tkajui.color}99` }}
              onMouseLeave={e => { e.currentTarget.style.background = `${BRAND.tkajui.color}11`; e.currentTarget.style.borderColor = `${BRAND.tkajui.color}55` }}
            >
              <LibraryLogo brand="tkajui" size={16} color={BRAND.tkajui.color} />
              Začít s TkajUI
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
          marginBottom: 48,
        }}>
          <StatBox value={stats.total} label="Komponent celkem" />
          <StatBox value={stats.tkajui} label="TkajUI" accent={BRAND.tkajui.color} sublabel="base library" />
          <StatBox value={stats.donjon} label="donjon-fall-ui" sublabel={`herní vrstva · +${stats.extending} extends`} />
          <StatBox value={stats.documented} label="Dokumentováno" accent={gainColor} />
          <StatBox value="WCAG 2.1" label="A11y AA" accent={gainColor} />
        </section>

        {/* ── DVĚ KNIHOVNY, JEDEN SYSTÉM ───────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            kicker="🏛️ Architektura"
            title="Dvě knihovny, jeden systém"
            description="TkajUI je obecná UI základna použitelná v jakékoli React aplikaci. donjon-fall-ui z ní vychází a přidává herní vrstvu — středověkou estetiku, ornamenty a primitiva specifická pro deskové a tahové hry. Sdílejí motion, breakpointy a z-index škálu."
          />

          {/* Architecture diagram */}
          <div style={{ marginBottom: 20 }}>
            <ArchDiagram />
          </div>

          {/* Two side-by-side library cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
          }}>
            <LibraryCard
              brand="tkajui"
              role="Base library"
              tagline={`Chladná paleta · accent blue · oktagonální tvary · ${stats.tkajui} komponent`}
              bullets={[
                'Buttons, Cards, Inputs, Modals, Tabs, Tooltips, Toasts',
                'Zero-dependency, WCAG 2.1 AA',
                'Použij pro: dashboardy, formuláře, business apps',
              ]}
              ctaTo="/components?lib=tkajui"
              ctaLabel="Prozkoumat TkajUI"
            />
            <LibraryCard
              brand="donjon"
              role="Game layer"
              tagline={`Teplá zlatá paleta · středověký feel · ${stats.donjon} komponent (${stats.extending} extends TkajUI)`}
              bullets={[
                'PlayerPanel, ResourceBar, ActionTile, EventLog, HexTile, …',
                `${stats.extending} rozšířených protějšků TkajUI (Donjon* prefix)`,
                'Použij pro: deskové/tahové hry, herní HUD, fantasy UI',
              ]}
              ctaTo="/components?lib=donjon"
              ctaLabel="Prozkoumat donjon"
            />
          </div>
        </section>

        {/* ── ZAČNI TADY ───────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader kicker="⚡ Začni tady" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
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
              description={`Všech ${stats.total} komponent s metadaty, props tabulkami a live ukázkami. Filtruj podle knihovny.`}
            />
            <HomeCard
              to="/tokens"
              icon={<SparkIcon />}
              title="Design tokeny"
              description="Barvy, fonty, spacing, animace. Sdílené (motion, z-index) i lib-specifické (gold vs accent blue)."
            />
            <HomeCard
              to="/architecture"
              icon={<ArchIcon />}
              title="Architektura"
              description="Závislostní směr knihoven, naming kontrakt, 13 párů TkajUI↔donjon a pravidla pro nové komponenty."
              badge="new"
            />
          </div>
        </section>

        {/* ── TKAJUI FOUNDATIONS ───────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            kicker={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><LibraryLogo brand="tkajui" size={14} color={BRAND.tkajui.color} /> UI Foundations · TkajUI</span>}
            title="Obecná UI primitiva"
            description="Base komponenty použitelné v jakékoli React aplikaci. Stejné API jako donjon protějšky, ale s chladnou modrou paletou a střídmou estetikou."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}>
            <HomeCard
              to="/buttons?lib=tkajui"
              icon={<ButtonIcon />}
              accent={BRAND.tkajui.color}
              title="Button"
              description="Primární akční prvek — čtyři barevné varianty, čtyři velikosti, ikonové módy, loading stav."
            />
            <HomeCard
              to="/cards?lib=tkajui"
              icon={<StackIcon />}
              accent={BRAND.tkajui.color}
              title="Card"
              description="Kontejner pro seskupený obsah s pevnou strukturou hlavička–tělo–patička a 4 variantami."
            />
            <HomeCard
              to="/inputs?lib=tkajui"
              icon={<FormIcon />}
              accent={BRAND.tkajui.color}
              title="Input"
              description="Textové vstupní pole s labelem, hintem, chybovým stavem, ikonami a disabled módem."
            />
            <HomeCard
              to="/modal?lib=tkajui"
              icon={<ModalIcon />}
              accent={BRAND.tkajui.color}
              title="Modal"
              description="Dialogový překryv s backdropem, varianty default/danger/success/warning, focus management."
            />
            <HomeCard
              to="/tabs?lib=tkajui"
              icon={<TabsIcon />}
              accent={BRAND.tkajui.color}
              title="Tabs"
              description="Záložková navigace ve dvou stylech — underline a pills. Klávesnicová navigace, ARIA roles."
            />
            <HomeCard
              to="/toggle?lib=tkajui"
              icon={<ToggleIcon />}
              accent={BRAND.tkajui.color}
              title="Toggle"
              description="Přepínač on/off — stejné API jako checkbox, vizuálně srozumitelnější pro binární volby."
            />
          </div>
        </section>

        {/* ── HERNÍ PRIMITIVA ──────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            kicker={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><LibraryLogo brand="donjon" size={14} color={gold} /> Herní primitiva · donjon-fall-ui</span>}
            title="Co donjon přidává navíc"
            description="Specializované UI bloky pro deskové a tahové hry — to, co TkajUI neumí a generické knihovny neumí. Plus 13 rozšíření TkajUI komponent ve zlaté paletě s ornamenty."
          />
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
          <div style={{ flex: '1 1 380px' }}>
            <div style={{
              fontSize: '0.6875rem', fontWeight: 700,
              color: goldMid, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
            }}>
              📜 Nejnovější změny
              <BrandChip brand="tkajui" />
              <BrandChip brand="donjon" />
            </div>
            <ul style={{
              margin: 0, padding: 0, listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 5,
              fontSize: '0.8125rem', color: textMid, lineHeight: 1.5,
            }}>
              <li style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <LibraryLogo brand="tkajui" size={11} color={BRAND.tkajui.color} />
                <span style={{ color: BRAND.tkajui.color, marginRight: 2 }}>shared</span>
                lib/shared/tokens.js — sdílené motion, breakpointy a z-index pro obě knihovny
              </li>
              <li style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <LibraryLogo brand="tkajui" size={11} color={BRAND.tkajui.color} />
                <span style={{ color: BRAND.tkajui.color, marginRight: 2 }}>tkajui</span>
                přidán borderStrong, surface/bg aliasy pro library-agnostický kód
              </li>
              <li style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <LibraryLogo brand="donjon" size={11} color={goldMid} />
                <span style={{ color: goldMid, marginRight: 2 }}>donjon</span>
                ExtendsBanner ve ShowcasePage — link na TkajUI base + diff body
              </li>
              <li style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <LibraryLogo brand="donjon" size={11} color={goldMid} />
                <span style={{ color: goldMid, marginRight: 2 }}>donjon</span>
                Centrální ornament sizing · 8 dokumentovaných herních primitiv · WCAG 2.1 AA audit
              </li>
            </ul>
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
              alignSelf: 'flex-start',
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
