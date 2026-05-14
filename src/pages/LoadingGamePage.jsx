import HexTile from '../lib/donjon/HexTile'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import DeviceFrame, { ComparisonRow } from '../components/layout/DeviceFrame'
import { players } from '../data/gameUiMockData'

const p1 = players[0]
const p2 = players[1]

/* ── Progress bar ── */
function ProgressBar({ pct }) {
  return (
    <div style={{
      width: '100%', height: 3, background: '#1B1A30',
      borderRadius: 2, overflow: 'hidden', border: '1px solid #2A2948',
    }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: 'linear-gradient(90deg, #FFC183 0%, #8F7458 100%)',
        borderRadius: 2, boxShadow: '0 0 5px #FFC18344',
      }} />
    </div>
  )
}

/* ── Outline hex mřížka (prázdné hexy bez kostek) ── */
function OutlineMap({ cols = 5, rows = 3, hexSize = 'sm', scale = 1 }) {
  const dim = { sm: [42, 48], xs: [28, 32] }[hexSize] ?? [42, 48]
  const [cellW, cellH] = dim
  const gap = 3
  const rowH    = Math.round(cellH * 0.75) + gap
  const colW    = cellW + gap
  const halfOff = Math.round(colW / 2)
  const totalW  = cols * colW + halfOff - gap
  const totalH  = (rows - 1) * rowH + cellH

  return (
    <div style={{
      transform: scale !== 1 ? `scale(${scale})` : undefined,
      transformOrigin: 'top left',
    }}>
      <div style={{ position: 'relative', width: totalW, height: totalH }}>
        {Array.from({ length: rows }, (_, ri) =>
          Array.from({ length: cols }, (_, ci) => {
            const x = ci * colW + (ri % 2 === 1 ? halfOff : 0)
            const y = ri * rowH
            return (
              <div key={`${ri}-${ci}`} style={{ position: 'absolute', left: x, top: y }}>
                <HexTile state="empty" size={hexSize} />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

/* ── Hráčský badge ── */
function PlayerPill({ player, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5,
      background: '#1B1A30', border: '1px solid #2A2948',
      borderRadius: 3, padding: '3px 8px',
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: player.color, flexShrink: 0 }} />
      <span style={{ fontSize: '0.4375rem', color: '#D4C5A9', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )
}

/* ── Obsah načítací obrazovky před hrou ── */
function LoadingGameContent({ size = 'desktop' }) {
  const isDesktop = size === 'desktop'
  const isTablet  = size === 'tablet'
  const isMobile  = size === 'mobile'

  const pct = 78
  const mapScale = isMobile ? 0.55 : isTablet ? 0.65 : 0.80
  const mapCols  = isMobile ? 4 : 5
  const mapRows  = isMobile ? 2 : 3

  const titleFs  = isDesktop ? '0.5625rem' : isTablet ? '0.5rem' : '0.4375rem'
  const metaFs   = isDesktop ? '0.4375rem' : '0.375rem'
  const statusFs = isDesktop ? '0.4375rem' : '0.375rem'
  const gap      = isDesktop ? 14 : isTablet ? 12 : 10

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 40%, #14132A 0%, #0A0917 100%)',
      padding: isDesktop ? '24px 40px' : '20px 24px', gap,
    }}>
      {/* Hráči */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <PlayerPill player={p1} label="Hráč 1" />
        <span style={{ fontSize: metaFs, color: '#3A3858', fontWeight: 700 }}>vs</span>
        <PlayerPill player={p2} label="Hráč 2" />
      </div>

      {/* Info o mapě */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          margin: '0 0 3px', fontSize: titleFs,
          fontWeight: 700, color: '#D4C5A9',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Default mapa
        </p>
        <p style={{ margin: 0, fontSize: metaFs, color: '#4A4560' }}>
          61 hexů · 2 hráči · 5 VP
        </p>
      </div>

      {/* Outline hex mapa */}
      <div style={{
        background: '#0D0C1A', borderRadius: 4,
        border: '1px solid #1E1D30',
        padding: 10, opacity: 0.7,
        overflow: 'hidden',
        width: isMobile ? 120 : isTablet ? 160 : 220,
        height: isMobile ? 60 : isTablet ? 72 : 90,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <OutlineMap
          cols={mapCols} rows={mapRows}
          hexSize={isMobile ? 'xs' : 'sm'}
          scale={mapScale}
        />
      </div>

      {/* Progress sekce */}
      <div style={{ width: '100%', maxWidth: isDesktop ? 280 : 220, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: statusFs, color: '#8F7458' }}>Připravuje se bitevní pole…</span>
          <span style={{
            fontSize: statusFs, color: '#FFC183', fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}>{pct}%</span>
        </div>
        <ProgressBar pct={pct} />
      </div>
    </div>
  )
}

/* ── Page ── */
export default function LoadingGamePage() {
  return (
    <ShowcasePage
      title="Načítání hry"
      description="Přechodová obrazovka mezi výběrem mapy a spuštěním herního plánu. Zobrazuje hráče, název mapy, schématickou mapu v obrysu a progress bar."
    >
      <Section
        id="desktop"
        title="Desktop — 1280px+"
        description="Centrovaný layout: hráči vs hráči nahoře, info o mapě, outline hex mřížka, progress bar dole."
      >
        <Preview>
          <DeviceFrame type="desktop">
            <LoadingGameContent size="desktop" />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="tablet"
        title="Tablet — 768px"
        description="Stejný layout, zmenšená hex mřížka a méně horizontálního prostoru."
      >
        <Preview>
          <DeviceFrame type="tablet">
            <LoadingGameContent size="tablet" />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="mobile"
        title="Mobil — 375px"
        description="Kompaktní varianta — mapa se zmenší na 4×2 hexů, typography redukována."
      >
        <Preview>
          <DeviceFrame type="mobile">
            <LoadingGameContent size="mobile" />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="srovnani"
        title="Srovnání"
        description="Tři zařízení vedle sebe — obsah je stejný, mění se rozměry mapy a velikosti textu."
      >
        <Preview>
          <ComparisonRow
            desktop={<LoadingGameContent size="desktop" />}
            tablet={<LoadingGameContent size="tablet" />}
            mobile={<LoadingGameContent size="mobile" />}
          />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <DonjonBadge variant="default">Outline hex mapa — jen prázdné hexe bez kostek</DonjonBadge>
            <DonjonBadge variant="warning">Progress bar — 78 % (demo stav)</DonjonBadge>
            <DonjonBadge variant="info">Hráči — barevné pilly odpovídají barvám na mapě</DonjonBadge>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
