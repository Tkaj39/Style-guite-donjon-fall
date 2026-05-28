import { useState } from 'react'
import useBreakpoint from '../lib/donjon/useBreakpoint'
import ActionTile from '../lib/donjon/ActionTile'
import PlayerPanel from '../lib/donjon/PlayerPanel'
import DonjonCard from '../lib/donjon/DonjonCard'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonModal from '../lib/donjon/DonjonModal'
import { CodeBlock } from '../styleguide/ShowcasePage'
import { SwordIcon, ShieldIcon, TowerIcon } from '../lib/donjon/icons'
import {
  gold, bg2, bg3, bgDeep, borderDefault,
  textMid, textFaint, textParchment, textHigh,
  gainColor, dangerColor, warningColor,
  bpMobile, bpTablet, bpDesktop, bpWide, BREAKPOINTS,
} from '../lib/donjon/tokens'

const PAGE    = { padding: '40px 32px', maxWidth: 900, margin: '0 auto' }
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
    <div style={{ marginTop: 8 }}>
      <CodeBlock code={children.trim()} />
    </div>
  )
}

/* ── Live breakpoint indicator ── */
function BreakpointIndicator() {
  const { width, isMobile, isTablet, isDesktop, isWide, isTouch } = useBreakpoint()

  const active = isWide ? 'wide' : isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'

  const TIERS = [
    { id: 'mobile',  label: 'Mobile',  px: `< ${bpTablet}px`,   color: dangerColor,  active: isMobile  },
    { id: 'tablet',  label: 'Tablet',  px: `${bpTablet}–${bpDesktop-1}px`, color: warningColor, active: isTablet  },
    { id: 'desktop', label: 'Desktop', px: `${bpDesktop}–${bpWide-1}px`,   color: gainColor,  active: isDesktop && !isWide },
    { id: 'wide',    label: 'Wide',    px: `≥ ${bpWide}px`,     color: gold,         active: isWide    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {TIERS.map(t => (
          <div key={t.id} style={{
            padding: '6px 14px', borderRadius: 4,
            border: `1px solid ${t.active ? t.color : borderDefault}`,
            background: t.active ? `${t.color}18` : 'transparent',
            display: 'flex', flexDirection: 'column', gap: 2, minWidth: 110,
          }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: t.active ? t.color : textFaint }}>{t.label}</span>
            <span style={{ fontSize: '0.7rem', color: t.active ? textMid : textFaint }}>{t.px}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '0.75rem', color: textFaint }}>
        Aktuální šířka: <span style={{ color: gold, fontWeight: 600 }}>{width} px</span>
        {' · '}isTouch: <span style={{ color: isTouch ? warningColor : textFaint }}>{String(isTouch)}</span>
        {' · '}isWide: <span style={{ color: isWide ? gainColor : textFaint }}>{String(isWide)}</span>
      </div>
    </div>
  )
}

/* ── Adaptive layout demo ── */
function AdaptiveDemo() {
  const { isMobile, isTouch } = useBreakpoint()
  const actions = [
    { id: 'move',   icon: <ShieldIcon />, title: 'Pohyb',  cost: 1, variant: 'move'   },
    { id: 'attack', icon: <SwordIcon />,  title: 'Útok',   cost: 2, variant: 'attack' },
    { id: 'tower',  icon: <TowerIcon />,  title: 'Věž',    cost: 3, variant: 'default'},
  ]
  const [sel, setSel] = useState('move')

  return (
    <div>
      <p style={{ fontSize: '0.75rem', color: textFaint, margin: '0 0 12px' }}>
        ActionTile velikost se přizpůsobuje dotykovému zařízení. Zmenši okno pro efekt.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {actions.map(a => (
          <ActionTile
            key={a.id}
            icon={a.icon}
            title={a.title}
            cost={a.cost}
            variant={a.variant}
            size={isTouch ? 'lg' : 'md'}
            selected={sel === a.id}
            onClick={() => setSel(a.id)}
          />
        ))}
      </div>
      <p style={{ fontSize: '0.75rem', color: textFaint, margin: '10px 0 0' }}>
        isTouch: <span style={{ color: isTouch ? gold : textFaint }}>{String(isTouch)}</span>
        {' · '}size: <span style={{ color: gold }}>{isTouch ? 'lg' : 'md'}</span>
      </p>
    </div>
  )
}

export default function ResponsivePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { width, isMobile } = useBreakpoint()

  return (
    <div style={PAGE}>
      <h1 style={H1}>Responzivita</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        Breakpoint tokeny, useBreakpoint hook a responzivní chování komponent.
        Herní UI potřebuje fungovat od mobilu (375 px) po wide desktop (1440+).
        Resize okno pro live ukázku.
      </p>

      {/* ── Live breakpoint ── */}
      <Section id="breakpoints" title="Breakpointy — live" desc="Resize okno prohlížeče pro live přepínání.">
        <Demo>
          <BreakpointIndicator />
        </Demo>
        <Code>{`import useBreakpoint from 'donjon-fall-ui/useBreakpoint'
import { bpMobile, bpTablet, bpDesktop, bpWide, BREAKPOINTS } from 'donjon-fall-ui/tokens'

// Hodnoty:  mobile < 768 | tablet 768–1023 | desktop 1024–1279 | wide ≥ 1280

const { width, isMobile, isTablet, isDesktop, isWide, isTouch } = useBreakpoint()
//  isMobile  = width < bpTablet  (768)
//  isTablet  = width 768–1023
//  isDesktop = width ≥ bpDesktop (1024)
//  isWide    = width ≥ bpWide    (1280)
//  isTouch   = width < bpDesktop  (mobil + tablet)`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Tokens tabulka ── */}
      <Section id="tokeny" title="Breakpoint tokeny" desc="Pojmenované konstanty — konzistentní přes celou library.">
        <Demo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'bpMobile',  val: bpMobile,  label: 'Mobil portrait — nejmenší viewport pro hru' },
              { name: 'bpTablet',  val: bpTablet,  label: 'Tablet / landscape mobil — 2 sloupce' },
              { name: 'bpDesktop', val: bpDesktop, label: 'Desktop — plný layout, hover interactions' },
              { name: 'bpWide',    val: bpWide,    label: 'Wide desktop — extra prostor pro game UI' },
            ].map(b => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <code style={{ width: 110, fontSize: '0.75rem', color: gold, flexShrink: 0 }}>{b.name}</code>
                <span style={{ width: 52, fontSize: '0.75rem', color: textHigh, flexShrink: 0 }}>{b.val} px</span>
                <span style={{ fontSize: '0.75rem', color: textFaint }}>{b.label}</span>
              </div>
            ))}
          </div>
        </Demo>
        <Code>{`import { bpMobile, bpTablet, bpDesktop, bpWide, BREAKPOINTS } from 'donjon-fall-ui/tokens'

// Podmíněné styly bez hooku (server-side nebo jednoduchý případ):
const isCompact = windowWidth < bpTablet

// Nebo media queries v CSS (donjon.css exportuje jako custom properties):
// @media (max-width: var(--donjon-bp-tablet)) { ... }

// BREAKPOINTS object pro iteraci:
// { mobile: 480, tablet: 768, desktop: 1024, wide: 1280 }`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── useBreakpoint hook ── */}
      <Section id="hook" title="useBreakpoint hook" desc="React hook — automaticky reaguje na resize.">
        <Code>{`import useBreakpoint from 'donjon-fall-ui/useBreakpoint'

function GameHUD({ players }) {
  const { isMobile, isTouch, isDesktop } = useBreakpoint()

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 8 : 16,
    }}>
      {players.map(p => (
        <PlayerPanel
          key={p.id}
          name={p.name}
          size={isMobile ? 'sm' : 'md'}
          {...p}
        />
      ))}

      <ActionGrid size={isTouch ? 'lg' : 'md'} />
    </div>
  )
}`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Adaptive ActionTile ── */}
      <Section id="action-tile" title="Adaptivní ActionTile" desc="Touch zařízení = větší dlaždice (lg), desktop = standardní (md).">
        <Demo>
          <AdaptiveDemo />
        </Demo>
        <Code>{`const { isTouch } = useBreakpoint()

<ActionTile
  icon={<SwordIcon />}
  title="Útok"
  cost={2}
  size={isTouch ? 'lg' : 'md'}  // lg = vetší hit target pro dotyk
  variant="attack"
/>`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Responzivní Modal ── */}
      <Section id="modal" title="Responzivní Modal" desc="DonjonModal nyní používá min(w px, calc(100vw - 32px)) — nikdy se nepřekryje s okrajem.">
        <Demo>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <DonjonButton size="sm" onClick={() => setModalOpen(true)}>Otevřít modal</DonjonButton>
          </div>
          <p style={{ fontSize: '0.75rem', color: textFaint, margin: 0 }}>
            Zmenš okno na {'<'} 480 px — modal se automaticky zúží na 100vw − 32 px.
          </p>
        </Demo>
        <Code>{`// DonjonModal používá:
// maxWidth: \`min(\${w}px, calc(100vw - 32px))\`
// → nikdy nepřesahuje viewport, vždy 16px margin na každé straně

<DonjonModal
  isOpen={isOpen}
  onClose={() => setOpen(false)}
  title="Výsledek kola"
  size="md"   // md = max 480px, ale < 480px viewportu = 100% - 32px
>
  obsah
</DonjonModal>`}</Code>

        <DonjonModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Responzivní modal"
          description="Zmenši okno pro ukázku responzivního chování"
          footer={<DonjonButton size="sm" onClick={() => setModalOpen(false)}>Zavřít</DonjonButton>}
        >
          <p style={{ fontSize: '0.875rem', color: textMid, margin: 0 }}>
            Aktuální šířka viewportu: <span style={{ color: gold }}>{width} px</span>
            <br />
            maxWidth modálu: <span style={{ color: gold }}>min(480px, calc(100vw - 32px))</span>
          </p>
        </DonjonModal>
      </Section>

      <div style={DIVIDER} />

      {/* ── DonjonCard fluid ── */}
      <Section id="card" title="Fluid DonjonCard" desc="DonjonCard nyní nemá pevný minWidth — přizpůsobí se kontejneru.">
        <Demo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            <DonjonCard title="Karta 1">
              <p style={{ fontSize: '0.8125rem', color: textMid, margin: 0 }}>Fluid karta</p>
            </DonjonCard>
            <DonjonCard title="Karta 2" variant="danger">
              <p style={{ fontSize: '0.8125rem', color: textMid, margin: 0 }}>Přizpůsobí se</p>
            </DonjonCard>
            <DonjonCard title="Karta 3" variant="success">
              <p style={{ fontSize: '0.8125rem', color: textMid, margin: 0 }}>Grid layout</p>
            </DonjonCard>
          </div>
          <p style={{ fontSize: '0.75rem', color: textFaint, margin: '12px 0 0' }}>
            Grid s auto-fill + minmax(180px, 1fr). Karty se roztáhnou nebo zalamují.
          </p>
        </Demo>
        <Code>{`// DonjonCard dříve: display: 'inline-block', minWidth: 240  ← fixní
// DonjonCard nyní:  žádný inline-block, bez minWidth         ← fluid

// Responzivní grid karet:
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
  <DonjonCard title="Karta 1">obsah</DonjonCard>
  <DonjonCard title="Karta 2">obsah</DonjonCard>
  <DonjonCard title="Karta 3">obsah</DonjonCard>
</div>

// Nebo flex:
<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
  <div style={{ flex: '1 1 240px' }}><DonjonCard title="A">obsah</DonjonCard></div>
  <div style={{ flex: '1 1 240px' }}><DonjonCard title="B">obsah</DonjonCard></div>
</div>`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Responsive patterns ── */}
      <Section id="patterns" title="Responzivní vzory" desc="Kopírovatelné recepty pro herní layouts.">
        <Code>{`// 1. Herní HUD — PlayerPanely vedle sebe nebo pod sebou:
const { isMobile } = useBreakpoint()
<div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 8 }}>
  <PlayerPanel name="Hráč 1" ... />
  <PlayerPanel name="Hráč 2" ... />
</div>

// 2. Akční grid — 4 dlaždice → 2+2 na mobilu:
<div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, auto)', gap: 8 }}>
  {actions.map(a => <ActionTile key={a.id} size={isTouch ? 'lg' : 'md'} {...a} />)}
</div>

// 3. EventLog šířka — full na mobilu, fixní na desktopu:
<EventLog events={log} style={{ width: isMobile ? '100%' : 280 }} />

// 4. Modal velikost podle obsahu a viewportu — automaticky:
<DonjonModal size={isMobile ? 'sm' : 'md'} ... />

// 5. PhaseIndicator orientace:
<PhaseIndicator
  phases={FAZE}
  currentPhase={phase}
  orientation={isMobile ? 'vertical' : 'horizontal'}
/>`}</Code>
      </Section>
    </div>
  )
}
