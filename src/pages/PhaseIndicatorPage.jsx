import { useState } from 'react'
import PhaseIndicator from '../lib/donjon/PhaseIndicator'
import DonjonButton from '../lib/donjon/DonjonButton'
import { SwordIcon, ShieldIcon, TowerIcon } from '../lib/donjon/icons'
import {
  gold, bg2, bg3, bgDeep, borderDefault,
  textMid, textFaint, textParchment,
} from '../lib/donjon/tokens'

const PAGE    = { padding: '40px 32px', maxWidth: 860, margin: '0 auto' }
const H1      = { fontSize: '1.5rem', fontWeight: 700, color: gold, letterSpacing: '0.04em', marginBottom: 4 }
const H2      = { fontSize: '0.875rem', fontWeight: 700, color: gold, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }
const DIVIDER = { height: 1, background: borderDefault, margin: '40px 0', opacity: 0.4 }

function Section({ id, title, desc, children }) {
  return (
    <section id={id} style={{ marginBottom: 40 }}>
      <h2 style={H2}>{title}</h2>
      {desc && <p style={{ fontSize: '0.8125rem', color: textMid, marginBottom: 16, marginTop: 2 }}>{desc}</p>}
      {children}
    </section>
  )
}

function Demo({ children, style }) {
  return (
    <div style={{ background: bg2, border: `1px solid ${borderDefault}`, borderRadius: 4, padding: 24, ...style }}>
      {children}
    </div>
  )
}

function Code({ children }) {
  return (
    <pre style={{
      background: bgDeep, border: `1px solid ${borderDefault}`, borderRadius: 4,
      padding: '12px 16px', fontSize: '0.75rem', color: textParchment,
      overflowX: 'auto', margin: '8px 0 0', lineHeight: 1.6,
      fontFamily: "'JetBrains Mono', Consolas, monospace",
    }}>
      <code>{children.trim()}</code>
    </pre>
  )
}

/* ── Definice fází ── */
const FAZE_TAHU = [
  { id: 'pohyb',    label: 'Pohyb',    description: 'Přesuň kostku nebo věž' },
  { id: 'akce',     label: 'Akce',     description: 'Vyber a proveď akci' },
  { id: 'souboj',   label: 'Souboj',   description: 'Vyřeš střety na hexech' },
  { id: 'konec',    label: 'Konec',    description: 'Konec tahu, předej iniciativu' },
]

const FAZE_HRY = [
  { id: 'setup',    label: 'Příprava'   },
  { id: 'rana1',    label: 'Raná hra'   },
  { id: 'stred',    label: 'Střední'    },
  { id: 'pozdni',   label: 'Pozdní'     },
  { id: 'vitez',    label: 'Výsledek'   },
]

const FAZE_IKONY = [
  { id: 'vyber',   label: 'Výběr',    icon: <ShieldIcon width={10} height={10} /> },
  { id: 'pohyb',   label: 'Pohyb',    icon: '→' },
  { id: 'souboj',  label: 'Souboj',   icon: <SwordIcon width={10} height={10} /> },
  { id: 'skore',   label: 'Skóre',    icon: '★' },
]

export default function PhaseIndicatorPage() {
  const [currentTah, setCurrentTah] = useState('akce')
  const [currentHra, setCurrentHra] = useState('stred')

  const nextPhase = () => {
    const idx = FAZE_TAHU.findIndex(p => p.id === currentTah)
    if (idx < FAZE_TAHU.length - 1) {
      setCurrentTah(FAZE_TAHU[idx + 1].id)
    }
  }

  const prevPhase = () => {
    const idx = FAZE_TAHU.findIndex(p => p.id === currentTah)
    if (idx > 0) setCurrentTah(FAZE_TAHU[idx - 1].id)
  }

  return (
    <div style={PAGE}>
      <h1 style={H1}>PhaseIndicator</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        Ukazatel fáze hry — kroky hráčova tahu nebo globální fáze hry.
        Lepší než generický Tabs: sekvenciální logika, splněné fáze mají checkmark,
        aktuální fáze je zlatá s glow, budoucí jsou faint. Spojovací linky vizualizují progress.
        V rámci donjon konzistence funguje jako plain baseline progress indikátor bez ornamentální vrstvy.
      </p>

      {/* ── Interaktivní demo ── */}
      <Section id="demo" title="Interaktivní demo" desc="Přecházej mezi fázemi tahu pomocí tlačítek.">
        <Demo>
          <div style={{ marginBottom: 24 }}>
            <PhaseIndicator
              phases={FAZE_TAHU}
              currentPhase={currentTah}
              orientation="horizontal"
              size="md"
            />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <DonjonButton size="sm" onClick={prevPhase} disabled={currentTah === FAZE_TAHU[0].id}>← Zpět</DonjonButton>
            <DonjonButton size="sm" onClick={nextPhase} disabled={currentTah === FAZE_TAHU[FAZE_TAHU.length - 1].id}>Další →</DonjonButton>
            <span style={{ fontSize: '0.75rem', color: textFaint, marginLeft: 8 }}>
              Fáze: <span style={{ color: gold }}>{FAZE_TAHU.find(p => p.id === currentTah)?.label}</span>
            </span>
          </div>
        </Demo>
        <Code>{`const FAZE = [
  { id: 'pohyb',  label: 'Pohyb',  description: 'Přesuň kostku nebo věž' },
  { id: 'akce',   label: 'Akce',   description: 'Vyber a proveď akci' },
  { id: 'souboj', label: 'Souboj', description: 'Vyřeš střety na hexech' },
  { id: 'konec',  label: 'Konec',  description: 'Konec tahu, předej iniciativu' },
]

<PhaseIndicator phases={FAZE} currentPhase={currentPhase} />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Horizontální vs vertikální ── */}
      <Section id="orientace" title="Orientace" desc="Horizontální (výchozí) nebo vertikální layout.">
        <Demo style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Horizontální</p>
            <PhaseIndicator phases={FAZE_TAHU} currentPhase="souboj" orientation="horizontal" />
          </div>
          <div>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Vertikální</p>
            <PhaseIndicator phases={FAZE_TAHU} currentPhase="souboj" orientation="vertical" />
          </div>
        </Demo>
        <Code>{`{/* Horizontální (výchozí) */}
<PhaseIndicator phases={FAZE} currentPhase="souboj" orientation="horizontal" />

{/* Vertikální — vhodné pro side panel */}
<PhaseIndicator phases={FAZE} currentPhase="souboj" orientation="vertical" />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Fáze hry ── */}
      <Section id="faze-hry" title="Globální fáze hry" desc="PhaseIndicator pro stav celé hry (ne jen tahu).">
        <Demo>
          <div style={{ marginBottom: 20 }}>
            <PhaseIndicator
              phases={FAZE_HRY}
              currentPhase={currentHra}
              orientation="horizontal"
              size="sm"
              onPhaseClick={id => setCurrentHra(id)}
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: textFaint, margin: 0 }}>
            Klikni na splněnou fázi (onPhaseClick) · Aktuální:
            <span style={{ color: gold, marginLeft: 4 }}>{FAZE_HRY.find(p => p.id === currentHra)?.label}</span>
          </p>
        </Demo>
        <Code>{`{/* onPhaseClick — kliknutí jen na splněné fáze */}
<PhaseIndicator
  phases={FAZE_HRY}
  currentPhase={currentPhase}
  size="sm"
  onPhaseClick={id => goToPhase(id)}
/>`}</Code>
      </Section>

      <div style={DIVIDER} />

      <Section
        id="plain-progress"
        title="Plain baseline progress"
        desc="PhaseIndicator je záměrně čistý a sekvenční. Má fungovat jako referenční plain progress blok pro tahové a stavové workflow, ne jako dekorovaný panel shell."
      >
        <Demo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <PhaseIndicator phases={FAZE_TAHU} currentPhase="souboj" orientation="horizontal" size="md" />
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <PhaseIndicator phases={FAZE_TAHU} currentPhase="souboj" orientation="vertical" size="sm" />
              <div style={{ maxWidth: 280, fontSize: '0.75rem', color: textFaint, lineHeight: 1.6 }}>
                Tento blok je plain záměrně: priorita je čitelnost postupu, pořadí kroků a stav dokončení,
                ne ornamentální rámování kolem celé komponenty.
              </div>
            </div>
          </div>
        </Demo>
        <Code>{`{/* Záměrně plain progress indikátor bez ornament API */}
<PhaseIndicator phases={FAZE_TAHU} currentPhase="souboj" orientation="horizontal" />
<PhaseIndicator phases={FAZE_TAHU} currentPhase="souboj" orientation="vertical" size="sm" />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── S ikonami ── */}
      <Section id="ikony" title="S ikonami" desc="Každá fáze může mít vlastní icon (ReactNode).">
        <Demo>
          <PhaseIndicator
            phases={FAZE_IKONY}
            currentPhase="souboj"
            orientation="horizontal"
            size="md"
          />
        </Demo>
        <Code>{`const FAZE = [
  { id: 'vyber',  label: 'Výběr',  icon: <ShieldIcon /> },
  { id: 'pohyb',  label: 'Pohyb',  icon: '→' },
  { id: 'souboj', label: 'Souboj', icon: <SwordIcon />  },
  { id: 'skore',  label: 'Skóre',  icon: '★' },
]

<PhaseIndicator phases={FAZE} currentPhase="souboj" />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Velikosti ── */}
      <Section id="velikosti" title="Velikosti">
        <Demo style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>sm</p>
            <PhaseIndicator phases={FAZE_TAHU.slice(0, 3)} currentPhase="akce" size="sm" />
          </div>
          <div>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>md</p>
            <PhaseIndicator phases={FAZE_TAHU.slice(0, 3)} currentPhase="akce" size="md" />
          </div>
        </Demo>
      </Section>
    </div>
  )
}
