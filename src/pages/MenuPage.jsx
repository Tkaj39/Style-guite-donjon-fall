import HexTile from '../lib/donjon/HexTile'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import DeviceFrame, { ComparisonRow } from '../components/layout/DeviceFrame'

/* ── Dekorativní prázdná hex mřížka ── */
function EmptyHexGrid({ cols = 5, rows = 4 }) {
  const cellW = 42, cellH = 48, gap = 4
  const rowH    = Math.round(cellH * 0.75) + gap
  const colW    = cellW + gap
  const halfOff = Math.round(colW / 2)
  const totalW  = cols * colW + halfOff - gap
  const totalH  = (rows - 1) * rowH + cellH

  return (
    <div style={{ position: 'relative', width: totalW, height: totalH }}>
      {Array.from({ length: rows }, (_, ri) =>
        Array.from({ length: cols }, (_, ci) => {
          const x = ci * colW + (ri % 2 === 1 ? halfOff : 0)
          const y = ri * rowH
          return (
            <div key={`${ri}-${ci}`} style={{ position: 'absolute', left: x, top: y }}>
              <HexTile state="empty" size="sm" />
            </div>
          )
        })
      )}
    </div>
  )
}

/* ── Mini menu tlačítko ── */
function MiniMenuBtn({ label, primary = false, disabled = false, fs = '0.5rem', py = 7, px = 14 }) {
  return (
    <div style={{
      padding: `${py}px ${px}px`,
      border: `1px solid ${primary ? '#FFC18388' : disabled ? '#1E1D30' : '#3A3858'}`,
      borderRadius: 4,
      background: primary ? '#2A2020' : disabled ? '#12111F' : '#1B1A30',
      color: primary ? '#FFC183' : disabled ? '#2A2948' : '#8F7458',
      fontSize: fs,
      fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
      textAlign: 'center',
      boxShadow: primary ? '0 0 10px #FFC18322' : 'none',
      opacity: disabled ? 0.5 : 1,
    }}>
      {label}
    </div>
  )
}

/* ── Desktop: levý dekorativní panel + pravý menu panel ── */
function MenuDesktopLayout() {
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {/* Levý dekorativní panel */}
      <div style={{
        flex: 1,
        background: 'radial-gradient(ellipse at 60% 50%, #1A1830 0%, #0A0917 100%)',
        borderRight: '1px solid #2A2948',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ opacity: 0.2, pointerEvents: 'none' }}>
          <EmptyHexGrid cols={5} rows={4} />
        </div>
        {/* Jméno hry drobně v rohu */}
        <span style={{
          position: 'absolute', bottom: 10, right: 14,
          fontSize: '0.375rem', color: '#2A2948',
          fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          DONJON FALL
        </span>
      </div>

      {/* Pravý menu panel */}
      <div style={{
        width: 260, background: '#14132A',
        borderLeft: '1px solid #1E1D30',
        display: 'flex', flexDirection: 'column',
        alignItems: 'stretch', justifyContent: 'center',
        padding: '32px 24px', gap: 10, flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <p style={{
            margin: '0 0 5px',
            fontSize: '1.125rem', fontWeight: 900,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            background: 'linear-gradient(180deg, #FFC183 0%, #8F7458 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1.1,
          }}>
            Donjon<br />Fall
          </p>
          <p style={{
            margin: 0, fontSize: '0.4375rem', color: '#4A4560',
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            Tahová strategická hra
          </p>
        </div>

        <MiniMenuBtn label="▶  Nová hra" primary />
        <MiniMenuBtn label="Pokračovat" disabled />
        <MiniMenuBtn label="⚙  Nastavení" />
        <MiniMenuBtn label="Konec" />
      </div>
    </div>
  )
}

/* ── Tablet: centrovaný sloupec ── */
function MenuTabletLayout() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 40%, #1A1830 0%, #0A0917 100%)',
      padding: '0 48px', gap: 8,
    }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <p style={{
          margin: '0 0 6px',
          fontSize: '1.5rem', fontWeight: 900,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          background: 'linear-gradient(180deg, #FFC183 0%, #8F7458 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1.1,
        }}>
          Donjon Fall
        </p>
        <p style={{ margin: 0, fontSize: '0.5rem', color: '#4A4560', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Tahová strategická hra
        </p>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 9 }}>
        <MiniMenuBtn label="▶  Nová hra" primary fs="0.5625rem" py={9} />
        <MiniMenuBtn label="Pokračovat" disabled fs="0.5625rem" py={9} />
        <MiniMenuBtn label="⚙  Nastavení" fs="0.5625rem" py={9} />
        <MiniMenuBtn label="Konec" fs="0.5625rem" py={9} />
      </div>
    </div>
  )
}

/* ── Mobile: kompaktní centrovaný sloupec ── */
function MenuMobileLayout() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 40%, #1A1830 0%, #0A0917 100%)',
      padding: '0 20px', gap: 6,
    }}>
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <p style={{
          margin: '0 0 4px',
          fontSize: '1rem', fontWeight: 900,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          background: 'linear-gradient(180deg, #FFC183 0%, #8F7458 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1.1,
        }}>
          Donjon Fall
        </p>
        <p style={{ margin: 0, fontSize: '0.375rem', color: '#4A4560', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Tahová strategie
        </p>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <MiniMenuBtn label="▶  Nová hra" primary fs="0.4375rem" py={6} px={10} />
        <MiniMenuBtn label="Pokračovat" disabled fs="0.4375rem" py={6} px={10} />
        <MiniMenuBtn label="⚙  Nastavení" fs="0.4375rem" py={6} px={10} />
        <MiniMenuBtn label="Konec" fs="0.4375rem" py={6} px={10} />
      </div>
    </div>
  )
}

/* ── Page ── */
export default function MenuPage() {
  return (
    <ShowcasePage
      title="Hlavní menu"
      description="Vstupní bod aplikace — výběr herního režimu před spuštěním partie. Desktop zobrazuje dvoupanelové rozložení s dekorativní mapou; tablet a mobil centrovaný sloupec."
    >
      <Section
        id="desktop"
        title="Desktop — 1280px+"
        description="Dvoupanelové rozložení: levý panel s dekorativní hex mřížkou (atmosférický motiv), pravý panel s logem a menu tlačítky. Pokračovat je disabled — bez uloženého stavu."
      >
        <Preview>
          <DeviceFrame type="desktop">
            <MenuDesktopLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="tablet"
        title="Tablet — 768px"
        description="Centrovaný sloupec přes celou výšku — logo nahoře, čtyři tlačítka pod ním. Dekorativní panel odpadá, atmosférický gradient zůstává jako pozadí."
      >
        <Preview>
          <DeviceFrame type="tablet">
            <MenuTabletLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="mobile"
        title="Mobil — 375px"
        description="Kompaktní varianta — menší logo, úzká tlačítka přes celou šířku. Tagline zkrácen na jednu frázi."
      >
        <Preview>
          <DeviceFrame type="mobile">
            <MenuMobileLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="srovnani"
        title="Srovnání"
        description="Všechna tři zařízení vedle sebe — srovnání přizpůsobení layoutu."
      >
        <Preview>
          <ComparisonRow
            desktop={<MenuDesktopLayout />}
            tablet={<MenuTabletLayout />}
            mobile={<MenuMobileLayout />}
          />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <DonjonBadge variant="default">Desktop — dvoupanelové rozložení</DonjonBadge>
            <DonjonBadge variant="default">Tablet / Mobil — centrovaný sloupec</DonjonBadge>
            <DonjonBadge variant="warning">Pokračovat — disabled bez uložení</DonjonBadge>
            <DonjonBadge variant="default">Logo — zlatý gradient, uppercase</DonjonBadge>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
