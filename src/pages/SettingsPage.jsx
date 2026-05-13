import { useState } from 'react'
import DonjonBadge from '../components/DonjonBadge'
import DonjonCard from '../components/DonjonCard'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import DeviceFrame, { ComparisonRow } from '../components/layout/DeviceFrame'
import { players } from '../data/gameUiMockData'

const p1 = players[0]
const p2 = players[1]

/* ── Mini slider ── */
function MiniSlider({ label, pct, labelW = 64, fs = '0.4375rem' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: fs, color: '#8F7458', width: labelW, flexShrink: 0 }}>{label}</span>
      <div style={{
        flex: 1, height: 3, background: '#1B1A30',
        borderRadius: 2, position: 'relative', overflow: 'visible',
      }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#FFC183', borderRadius: 2 }} />
        <div style={{
          position: 'absolute', top: -4,
          left: `${pct}%`, transform: 'translateX(-50%)',
          width: 8, height: 8, borderRadius: '50%',
          background: '#FFC183', border: '1px solid #12111F',
          flexShrink: 0,
        }} />
      </div>
      <span style={{
        fontSize: fs, color: '#4A4560',
        fontVariantNumeric: 'tabular-nums', width: 24, textAlign: 'right',
      }}>{pct}%</span>
    </div>
  )
}

/* ── Mini toggle ── */
function MiniToggle({ on, label, fs = '0.4375rem', labelW = 80 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: fs, color: '#8F7458', width: labelW, flexShrink: 0 }}>{label}</span>
      <div style={{
        width: 26, height: 13, borderRadius: 7, flexShrink: 0,
        background: on ? '#FFC18330' : '#1B1A30',
        border: `1px solid ${on ? '#FFC18366' : '#3A3858'}`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 2,
          left: on ? 14 : 2,
          width: 7, height: 7, borderRadius: '50%',
          background: on ? '#FFC183' : '#4A4560',
        }} />
      </div>
      <span style={{ fontSize: fs, color: on ? '#FFC183' : '#4A4560' }}>
        {on ? 'Zapnuto' : 'Vypnuto'}
      </span>
    </div>
  )
}

/* ── Mini divider ── */
function Divider() {
  return <div style={{ height: 1, background: '#2A2948', margin: '2px 0' }} />
}

/* ── Tab tlačítko ── */
function TabBtn({ label, active, fs = '0.4375rem', px = 8, py = 4 }) {
  return (
    <div style={{
      padding: `${py}px ${px}px`,
      fontSize: fs, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
      color: active ? '#FFC183' : '#4A4560',
      borderBottom: `2px solid ${active ? '#FFC183' : 'transparent'}`,
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
          background: l.active ? '#252342' : 'transparent',
          border: `1px solid ${l.active ? '#5A5878' : 'transparent'}`,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
            background: l.active ? '#FFC183' : '#2A2948',
          }} />
          <span style={{ fontSize: fs, color: l.active ? '#D4C5A9' : '#4A4560', fontWeight: l.active ? 700 : 400 }}>
            {l.label}
          </span>
          <span style={{ fontSize: '0.375rem', color: '#3A3858', marginLeft: 'auto' }}>{l.code}</span>
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
          <span style={{ fontSize: fs, color: '#8F7458' }}>{b.action}</span>
          <div style={{
            background: '#1B1A30', border: '1px solid #3A3858',
            borderRadius: 2, padding: '1px 5px',
            fontSize: fs, color: '#D4C5A9', fontWeight: 700, letterSpacing: '0.06em',
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
        <span style={{ fontSize: fs, color: '#8F7458', width: labelW }}>Kvalita</span>
        <div style={{
          display: 'flex', gap: 4,
        }}>
          {['Nízká', 'Střední', 'Vysoká'].map((q, i) => (
            <div key={q} style={{
              padding: '2px 6px', borderRadius: 2, fontSize: '0.375rem',
              background: i === 2 ? '#252342' : '#1B1A30',
              border: `1px solid ${i === 2 ? '#5A5878' : '#2A2948'}`,
              color: i === 2 ? '#D4C5A9' : '#4A4560',
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
  const tabs   = ['zvuk', 'jazyk', 'ovladani', 'grafika']

  const headerFs = isDesktop ? '0.5625rem' : isTablet ? '0.5rem' : '0.4375rem'
  const tabFs    = isDesktop ? '0.4375rem' : '0.375rem'
  const tabPx    = isDesktop ? 10 : 6
  const tabPy    = isDesktop ? 5  : 3
  const bodyFs   = isDesktop ? '0.4375rem' : '0.375rem'
  const labelW   = isDesktop ? 80 : 56

  const TabContent = TAB_COMPONENTS[activeTab]

  return (
    <div style={{
      width: modalW,
      background: '#1C1A2E',
      border: '1px solid #3A3858',
      borderRadius: 6,
      boxShadow: '0 20px 60px #00000099',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isDesktop ? '10px 16px' : '7px 12px',
        borderBottom: '1px solid #2A2948', background: '#14132A',
      }}>
        <span style={{
          fontSize: headerFs, fontWeight: 700,
          color: '#D4C5A9', letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>Nastavení</span>
        <span style={{ fontSize: headerFs, color: '#4A4560', cursor: 'default' }}>✕</span>
      </div>

      {/* Taby */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #2A2948',
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
        borderTop: '1px solid #2A2948', background: '#14132A',
      }}>
        <div style={{
          padding: isDesktop ? '4px 12px' : '3px 8px',
          fontSize: tabFs, color: '#8F7458', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          border: '1px solid #3A3858', borderRadius: 3,
          background: '#1B1A30',
        }}>Zrušit</div>
        <div style={{
          padding: isDesktop ? '4px 12px' : '3px 8px',
          fontSize: tabFs, color: '#FFC183', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          border: '1px solid #FFC18355', borderRadius: 3,
          background: '#2A2020', boxShadow: '0 0 6px #FFC18322',
        }}>Uložit →</div>
      </div>
    </div>
  )
}

/* ── HUD simulace pozadí ── */
function BackdropHUD({ hudH = 34 }) {
  return (
    <div style={{
      height: hudH, background: '#1B1A30',
      borderBottom: '1px solid #2A2948',
      display: 'flex', alignItems: 'center', gap: 7,
      padding: '0 12px', flexShrink: 0,
    }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: p1.color }} />
      <span style={{ fontSize: '0.4375rem', color: '#D4C5A9', fontWeight: 700, letterSpacing: '0.06em' }}>HRÁČ 1</span>
      <div style={{
        marginLeft: 'auto',
        background: '#252342', borderRadius: 2,
        padding: '1px 6px', fontSize: '0.375rem',
        color: '#FFC183', fontWeight: 700,
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
  const [activeTab, setActiveTab] = useState('zvuk')

  return (
    <ShowcasePage
      title="Nastavení"
      description="Modální dialog nastavení — zobrazí se jako overlay přes aktivní herní obrazovku. Obsahuje čtyři taby: Zvuk, Jazyk, Ovládání, Grafika."
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
