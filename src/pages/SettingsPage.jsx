import { textFaint, textParchment, gold, goldDim, bg4, bgDeep, borderMuted } from '../lib/donjon/tokens'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import DonjonCard from '../lib/donjon/DonjonCard'
import { octagon, octagonInner } from '../lib/shared/octagon'
import { ShowcasePage, Section, Preview } from '../styleguide/ShowcasePage'
import DeviceFrame, { ComparisonRow } from '../styleguide/DeviceFrame'
import { players } from '../data/gameUiMockData'

const p1 = players[0]

/* ── Mini slider ── */
function MiniSlider({ label, pct, labelW = 64, fs = '0.4375rem' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: fs, color: goldDim, width: labelW, flexShrink: 0 }}>{label}</span>
      <div style={{
        flex: 1, height: 3, background: bgDeep,
        clipPath: octagon(1), position: 'relative', overflow: 'visible',
      }}>
        <div style={{ width: `${pct}%`, height: '100%', background: gold, clipPath: octagon(1) }} />
        {/* Diamond thumb — donjon thumb aesthetic (square rotated 45°) */}
        <div style={{
          position: 'absolute', top: -3,
          left: `${pct}%`, transform: 'translateX(-50%) rotate(45deg)',
          width: 7, height: 7,
          background: gold,
          border: '1px solid #12111F',
          flexShrink: 0,
        }} />
      </div>
      <span style={{
        fontSize: fs, color: textFaint,
        fontVariantNumeric: 'tabular-nums', width: 24, textAlign: 'right',
      }}>{pct}%</span>
    </div>
  )
}

/* ── Mini toggle ── */
function MiniToggle({ on, label, fs = '0.4375rem', labelW = 80 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: fs, color: goldDim, width: labelW, flexShrink: 0 }}>{label}</span>
      {/* Donjon sharp toggle — octagonal track + diamond thumb */}
      <div style={{
        width: 26, height: 13, flexShrink: 0,
        clipPath: octagon(3),
        // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
        background: on ? '#FFC18330' : bgDeep,
        padding: 1,
        position: 'relative',
      }}>
        <div style={{
          clipPath: octagonInner(3),
          width: '100%', height: '100%',
          // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
          background: on ? '#FFC18330' : bgDeep,
          border: `1px solid ${on ? `${gold}66` : borderMuted}`,
        }} />
        {/* Diamond thumb */}
        <div style={{
          position: 'absolute', top: 3,
          left: on ? 16 : 4,
          width: 6, height: 6,
          transform: 'rotate(45deg)',
          background: on ? gold : textFaint,
        }} />
      </div>
      <span style={{ fontSize: fs, color: on ? gold : textFaint }}>
        {on ? 'Zapnuto' : 'Vypnuto'}
      </span>
    </div>
  )
}

/* ── Mini divider ── */
function Divider() {
  return <div style={{ height: 1, background: bg4, margin: '2px 0' }} />
}

/* ── Tab tlačítko ── */
function TabBtn({ label, active, fs = '0.4375rem', px = 8, py = 4 }) {
  /* Active tab is rendered as an octagonal chamfered chip (donjon visual cue)
     instead of a flat bottom-border underline. Inactive tabs stay plain. */
  const cx = Math.max(2, Math.round(py * 0.45))
  return (
    <div style={{
      padding: `${py}px ${px}px`,
      fontSize: fs, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
      color: active ? gold : textFaint,
      clipPath: active ? octagon(cx) : undefined,
      background: active ? `${gold}1F` : 'transparent',
      cursor: 'default', flexShrink: 0,
    }}>
      {label}
    </div>
  )
}

/* ── Obsah jednotlivých tabů ── */
function TabZvuk({ fs = '0.4375rem', labelW = 64 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MiniSlider label="Hudba" pct={70} fs={fs} labelW={labelW} />
      <MiniSlider label="Zvukové efekty" pct={85} fs={fs} labelW={labelW} />
      <Divider />
      <MiniToggle label="Vypnout vše" on={false} fs={fs} labelW={labelW} />
    </div>
  )
}

function TabJazyk({ fs = '0.4375rem' }) {
  const langs = [
    { code: 'CZ', label: 'Čeština', active: true },
    { code: 'EN', label: 'English', active: false },
    { code: 'DE', label: 'Deutsch', active: false },
    { code: 'FR', label: 'Français', active: false },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {langs.map(l => (
        <div key={l.code} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '4px 8px', borderRadius: 3,
          // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
          background: l.active ? '#252342' : 'transparent',
          // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
          border: `1px solid ${l.active ? '#5A5878' : 'transparent'}`,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
            background: l.active ? gold : bg4,
          }} />
          <span style={{ fontSize: fs, color: l.active ? textParchment : textFaint, fontWeight: l.active ? 700 : 400 }}>
            {l.label}
          </span>
          <span style={{ fontSize: '0.375rem', color: borderMuted, marginLeft: 'auto' }}>{l.code}</span>
        </div>
      ))}
    </div>
  )
}

function TabOvladani({ fs = '0.375rem' }) {
  const bindings = [
    { action: 'Pohyb kostky',  key: 'LMB / Klik' },
    { action: 'Potvrdit',      key: 'Enter' },
    { action: 'Zrušit',        key: 'Esc' },
    { action: 'Souboj: Push',  key: 'P' },
    { action: 'Souboj: Occupy',key: 'O' },
    { action: 'Konec tahu',    key: 'Tab' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {bindings.map(b => (
        <div key={b.action} style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px 0', borderBottom: '1px solid #1E1D30',
        }}>
          <span style={{ fontSize: fs, color: goldDim }}>{b.action}</span>
          <div style={{
            background: bgDeep, border: `1px solid ${borderMuted}`,
            borderRadius: 2, padding: '1px 5px',
            fontSize: fs, color: textParchment, fontWeight: 700, letterSpacing: '0.06em',
          }}>
            {b.key}
          </div>
        </div>
      ))}
    </div>
  )
}

function TabGrafika({ fs = '0.4375rem', labelW = 64 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MiniToggle label="Animace" on={true} fs={fs} labelW={labelW} />
      <MiniToggle label="Fullscreen" on={false} fs={fs} labelW={labelW} />
      <Divider />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: fs, color: goldDim, width: labelW }}>Kvalita</span>
        <div style={{
          display: 'flex', gap: 4,
        }}>
          {['Nízká', 'Střední', 'Vysoká'].map((q, i) => (
            <div key={q} style={{
              padding: '2px 6px', borderRadius: 2, fontSize: '0.375rem',
              // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
              background: i === 2 ? '#252342' : bgDeep,
              // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
              border: `1px solid ${i === 2 ? '#5A5878' : bg4}`,
              color: i === 2 ? textParchment : textFaint,
              fontWeight: i === 2 ? 700 : 400,
            }}>{q}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mapa tabů → komponenta tabu ── */
const TAB_COMPONENTS = {
  zvuk:     TabZvuk,
  jazyk:    TabJazyk,
  ovladani: TabOvladani,
  grafika:  TabGrafika,
}

const TAB_LABELS = {
  zvuk: 'Zvuk', jazyk: 'Jazyk', ovladani: 'Ovládání', grafika: 'Grafika',
}

/* ── Nastavení modal ── */
function SettingsModal({ activeTab = 'zvuk', size = 'desktop' }) {
  const isDesktop = size === 'desktop'
  const isTablet  = size === 'tablet'

  const modalW = isDesktop ? 420 : isTablet ? 320 : 190
  const cx     = isDesktop ? 12 : isTablet ? 10 : 8  // octagon chamfer scales with modal size
  const tabs   = ['zvuk', 'jazyk', 'ovladani', 'grafika']

  const headerFs = isDesktop ? '0.5625rem' : isTablet ? '0.5rem' : '0.4375rem'
  const tabFs    = isDesktop ? '0.4375rem' : '0.375rem'
  const tabPx    = isDesktop ? 10 : 6
  const tabPy    = isDesktop ? 5  : 3
  const bodyFs   = isDesktop ? '0.4375rem' : '0.375rem'
  const labelW   = isDesktop ? 80 : 56

  const TabContent = TAB_COMPONENTS[activeTab]

  return (
    /* Donjon octagonal modal shell — border-trick:
       outer wrapper = gold border color + octagon clip,
       inner wrapper = panel fill + octagon-inner clip, 1px padding = border width. */
    <div style={{
      width: modalW,
      clipPath: octagon(cx),
      background: `${goldDim}99`,
      padding: 1,
      boxShadow: '0 20px 60px #00000099',
      filter: `drop-shadow(0 0 1px ${goldDim}66)`,
    }}>
    <div style={{
      clipPath: octagonInner(cx),
      // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
      background: '#1C1A2E',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isDesktop ? '10px 16px' : '7px 12px',
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
        borderBottom: `1px solid ${bg4}`, background: '#14132A',
      }}>
        <span style={{
          fontSize: headerFs, fontWeight: 700,
          color: textParchment, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>Nastavení</span>
        <span style={{ fontSize: headerFs, color: textFaint, cursor: 'default' }}>✕</span>
      </div>

      {/* Taby */}
      <div style={{
        display: 'flex',
        borderBottom: `1px solid ${goldDim}33`,
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
        padding: '0 12px', gap: 2, background: '#14132A',
      }}>
        {tabs.map(t => (
          <TabBtn
            key={t} label={TAB_LABELS[t]}
            active={t === activeTab}
            fs={tabFs} px={tabPx} py={tabPy}
          />
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: isDesktop ? '14px 16px' : '10px 12px', flex: 1 }}>
        <TabContent fs={bodyFs} labelW={labelW} />
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: 8,
        padding: isDesktop ? '10px 16px' : '7px 12px',
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
        borderTop: `1px solid ${bg4}`, background: '#14132A',
      }}>
        {/* Donjon-style octagonal footer buttons — border-trick gives
            the chamfered shell, padding sits inside the inner clip. */}
        <div style={{
          clipPath: octagon(3),
          background: borderMuted,
          padding: 1,
        }}>
          <div style={{
            clipPath: octagonInner(3),
            padding: isDesktop ? '3px 11px' : '2px 7px',
            fontSize: tabFs, color: goldDim, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: bgDeep,
          }}>Zrušit</div>
        </div>
        <div style={{
          clipPath: octagon(3),
          background: `${gold}99`,
          padding: 1,
          filter: `drop-shadow(0 0 4px ${gold}33)`,
        }}>
          <div style={{
            clipPath: octagonInner(3),
            padding: isDesktop ? '3px 11px' : '2px 7px',
            fontSize: tabFs, color: gold, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: `${gold}1A`,
          }}>Uložit →</div>
        </div>
      </div>
    </div>
    </div>
  )
}

/* ── HUD simulace pozadí ── */
function BackdropHUD({ hudH = 34 }) {
  return (
    <div style={{
      height: hudH, background: bgDeep,
      borderBottom: `1px solid ${bg4}`,
      display: 'flex', alignItems: 'center', gap: 7,
      padding: '0 12px', flexShrink: 0,
    }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: p1.color }} />
      <span style={{ fontSize: '0.4375rem', color: textParchment, fontWeight: 700, letterSpacing: '0.06em' }}>HRÁČ 1</span>
      <div style={{
        marginLeft: 'auto',
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
        background: '#252342', borderRadius: 2,
        padding: '1px 6px', fontSize: '0.375rem',
        color: gold, fontWeight: 700,
      }}>AKCE</div>
    </div>
  )
}

/* ── Frame layout se settings modalem ── */
function SettingsLayout({ activeTab = 'zvuk', size = 'desktop' }) {
  const hudH = size === 'desktop' ? 34 : size === 'tablet' ? 28 : 22

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Herní pozadí (ztlumené) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', filter: 'brightness(0.3)' }}>
        <BackdropHUD hudH={hudH} />
        <div style={{
          flex: 1,
          background: 'radial-gradient(ellipse at 50% 50%, #14132A 0%, #0A0917 100%)',
        }} />
      </div>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
        background: '#00000066',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <SettingsModal activeTab={activeTab} size={size} />
      </div>
    </div>
  )
}

/* ── Samostatný tab preview (bez device frame) ── */
function TabPreview({ tab, title, description }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DonjonCard title={title} description={description}>
        <div style={{
          // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
          background: '#12111F', borderRadius: 4, padding: '12px 14px',
          border: '1px solid #1E1D30',
        }}>
          {(() => {
            const C = TAB_COMPONENTS[tab]
            return <C fs="0.5rem" labelW={88} />
          })()}
        </div>
      </DonjonCard>
    </div>
  )
}

/* ── Page ── */
export default function SettingsPage() {
  return (
    <ShowcasePage
      title="Nastavení"
      description="Modální dialog nastavení — zobrazí se jako overlay přes aktivní herní obrazovku. Obsahuje čtyři taby: Zvuk, Jazyk, Ovládání, Grafika."
      library="donjon"
    >
      <Section
        id="desktop"
        title="Desktop — 1280px+"
        description="Nastavení modal (420px šířka) centrovaný přes ztlumené herní pozadí. Tab Zvuk aktivní."
      >
        <Preview>
          <DeviceFrame type="desktop">
            <SettingsLayout activeTab="zvuk" size="desktop" />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="tablet"
        title="Tablet — 768px"
        description="Modal se zúží na 320px. Taby jsou kompaktnější, fonty menší."
      >
        <Preview>
          <DeviceFrame type="tablet">
            <SettingsLayout activeTab="zvuk" size="tablet" />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="mobile"
        title="Mobil — 375px"
        description="Modal se vejde na celou šířku obrazovky (190px). Taby — 4 v jedné řadě, velmi kompaktní."
      >
        <Preview>
          <DeviceFrame type="mobile">
            <SettingsLayout activeTab="zvuk" size="mobile" />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="srovnani"
        title="Srovnání"
        description="Tři zařízení — modal se přizpůsobuje šířce, obsah zůstává identický."
      >
        <Preview>
          <ComparisonRow
            desktop={<SettingsLayout activeTab="zvuk" size="desktop" />}
            tablet={<SettingsLayout activeTab="zvuk" size="tablet" />}
            mobile={<SettingsLayout activeTab="zvuk" size="mobile" />}
          />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <DonjonBadge variant="default">Overlay — #00000066 přes herní pozadí</DonjonBadge>
            <DonjonBadge variant="default">Modal — 420px desktop / 320px tablet / 190px mobile</DonjonBadge>
            <DonjonBadge variant="warning">Tab indikátor — zlatý border-bottom</DonjonBadge>
          </div>
        </Preview>
      </Section>

      {/* Jednotlivé taby */}
      <Section
        id="tab-zvuk"
        title="Tab — Zvuk"
        description="Hudba a zvukové efekty jako slidery (0–100 %), toggle pro vypnutí všeho."
      >
        <Preview>
          <TabPreview
            tab="zvuk"
            title="Nastavení zvuku"
            description="Slider pro hudbu a efekty + master toggle"
          />
        </Preview>
      </Section>

      <Section
        id="tab-jazyk"
        title="Tab — Jazyk"
        description="Výběr jazyka UI — radio seznam. Aktivní jazyk je zvýrazněn zlatou tečkou."
      >
        <Preview>
          <TabPreview
            tab="jazyk"
            title="Výběr jazyka"
            description="CZ, EN, DE, FR — radio seznam"
          />
        </Preview>
      </Section>

      <Section
        id="tab-ovladani"
        title="Tab — Ovládání"
        description="Tabulka klávesových zkratek — akce vlevo, přiřazená klávesa vpravo v badge."
      >
        <Preview>
          <TabPreview
            tab="ovladani"
            title="Klávesové zkratky"
            description="Přehled bindingů — pohyb, souboj, systémové akce"
          />
        </Preview>
      </Section>

      <Section
        id="tab-grafika"
        title="Tab — Grafika"
        description="Toggle animací a fullscreen, výběr kvality (Nízká / Střední / Vysoká)."
      >
        <Preview>
          <TabPreview
            tab="grafika"
            title="Grafická nastavení"
            description="Animace, fullscreen, kvalita renderování"
          />
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
