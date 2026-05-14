import DonjonBadge from '../lib/donjon/DonjonBadge'
import DonjonCard from '../lib/donjon/DonjonCard'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import DeviceFrame, { ComparisonRow } from '../components/layout/DeviceFrame'

/* ── Mock data — dostupné mapy ── */
const MAPS = [
  { id: 'default', name: 'Default',   hexes: 61, players: 2, vp: 5,  dots: 9, selected: false },
  { id: 'small',   name: 'Malá',      hexes: 37, players: 2, vp: 3,  dots: 6, selected: true  },
  { id: 'large',   name: 'Velká',     hexes: 91, players: 4, vp: 8,  dots: 12, selected: false },
]

/* ── Abstraktní hex miniaturní mapa (tečky v hex mřížce) ── */
function HexDots({ count = 9, dotSize = 6, gap = 3, color = '#2A2948' }) {
  const cols = 3
  const rows = Math.ceil(count / cols)
  return (
    <div style={{
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
      gap,
    }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          width: dotSize, height: dotSize,
          borderRadius: 1,
          background: color,
        }} />
      ))}
    </div>
  )
}

/* ── Karta mapy ── */
function MapCard({ map, cardW = 100, compact = false }) {
  const { name, hexes, players, vp, dots, selected } = map
  const fs       = compact ? '0.4375rem' : '0.5rem'
  const metaFs   = compact ? '0.375rem'  : '0.4375rem'
  const thumbH   = compact ? 36 : 44
  const dotSize  = compact ? 4  : 5
  const dotColor = selected ? '#FFC18366' : '#2A2948'

  return (
    <div style={{
      width: cardW,
      border: `1px solid ${selected ? '#FFC18388' : '#2A2948'}`,
      borderRadius: 4,
      background: selected ? '#1C1A2E' : '#1B1A30',
      boxShadow: selected ? '0 0 14px #FFC18322' : 'none',
      padding: compact ? '6px' : '8px',
      display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6,
      flexShrink: 0,
    }}>
      {/* Thumbnail — hex dots */}
      <div style={{
        background: '#12111F', borderRadius: 3,
        height: thumbH,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${selected ? '#FFC18833' : '#1E1D30'}`,
      }}>
        <HexDots count={dots} dotSize={dotSize} color={dotColor} />
      </div>

      {/* Info */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <p style={{
            margin: 0, fontSize: fs, fontWeight: 700,
            color: selected ? '#FFC183' : '#D4C5A9',
          }}>
            {name}
          </p>
          {selected && (
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#FFC183', boxShadow: '0 0 4px #FFC183',
            }} />
          )}
        </div>
        <p style={{ margin: 0, fontSize: metaFs, color: '#4A4560', lineHeight: 1.4 }}>
          {hexes} h · {players} hráči · {vp} VP
        </p>
      </div>
    </div>
  )
}

/* ── Tlačítko zpět / potvrdit ── */
function NavBtn({ label, primary = false, fs = '0.4375rem', py = 5, px = 10 }) {
  return (
    <div style={{
      padding: `${py}px ${px}px`,
      border: `1px solid ${primary ? '#FFC18388' : '#3A3858'}`,
      borderRadius: 4,
      background: primary ? '#2A2020' : '#1B1A30',
      color: primary ? '#FFC183' : '#8F7458',
      fontSize: fs, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
      boxShadow: primary ? '0 0 8px #FFC18322' : 'none',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </div>
  )
}

/* ── Desktop layout — 3 karty v řadě ── */
function MapSelectDesktopLayout() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#0F0E1E',
    }}>
      {/* Header */}
      <div style={{
        height: 38, background: '#14132A',
        borderBottom: '1px solid #2A2948',
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 12, flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.4375rem', color: '#4A4560', letterSpacing: '0.06em' }}>← Zpět</span>
        <span style={{
          fontSize: '0.5rem', fontWeight: 700,
          color: '#D4C5A9', letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>Výběr mapy</span>
      </div>

      {/* Karty */}
      <div style={{
        flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        gap: 14,
      }}>
        {MAPS.map(m => <MapCard key={m.id} map={m} cardW={120} />)}
      </div>

      {/* Footer */}
      <div style={{
        height: 42, background: '#14132A',
        borderTop: '1px solid #2A2948',
        display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end', padding: '0 20px', flexShrink: 0,
      }}>
        <NavBtn label="Potvrdit výběr →" primary />
      </div>
    </div>
  )
}

/* ── Tablet layout — 2 karty + 1 pod nimi ── */
function MapSelectTabletLayout() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', background: '#0F0E1E',
    }}>
      {/* Header */}
      <div style={{
        height: 36, background: '#14132A',
        borderBottom: '1px solid #2A2948',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 10, flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.375rem', color: '#4A4560' }}>← Zpět</span>
        <span style={{
          fontSize: '0.4375rem', fontWeight: 700,
          color: '#D4C5A9', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>Výběr mapy</span>
      </div>

      {/* Karty — 2+1 */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {MAPS.slice(0, 2).map(m => <MapCard key={m.id} map={m} cardW={100} compact />)}
        </div>
        <MapCard map={MAPS[2]} cardW={100} compact />
      </div>

      {/* Footer */}
      <div style={{
        height: 36, background: '#14132A', borderTop: '1px solid #2A2948',
        display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end', padding: '0 16px', flexShrink: 0,
      }}>
        <NavBtn label="Potvrdit →" primary fs="0.375rem" py={4} px={8} />
      </div>
    </div>
  )
}

/* ── Mobile layout — 1 karta viditelná ── */
function MapSelectMobileLayout() {
  const selectedMap = MAPS.find(m => m.selected)

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', background: '#0F0E1E',
    }}>
      {/* Header */}
      <div style={{
        height: 30, background: '#14132A',
        borderBottom: '1px solid #2A2948',
        display: 'flex', alignItems: 'center',
        padding: '0 12px', gap: 8, flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.3125rem', color: '#4A4560' }}>←</span>
        <span style={{
          fontSize: '0.375rem', fontWeight: 700,
          color: '#D4C5A9', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>Výběr mapy</span>
      </div>

      {/* Aktuální karta — centrovaná, + scroll indikátor */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px',
      }}>
        <MapCard map={selectedMap} cardW={130} />

        {/* Scroll indikátor */}
        <div style={{ display: 'flex', gap: 4 }}>
          {MAPS.map((m, i) => (
            <div key={i} style={{
              width: m.selected ? 12 : 5, height: 3, borderRadius: 2,
              background: m.selected ? '#FFC183' : '#2A2948',
              transition: 'width 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        height: 32, background: '#14132A', borderTop: '1px solid #2A2948',
        display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end', padding: '0 12px', flexShrink: 0,
      }}>
        <NavBtn label="Potvrdit →" primary fs="0.3125rem" py={3} px={6} />
      </div>
    </div>
  )
}

/* ── Page ── */
export default function MapSelectPage() {
  return (
    <ShowcasePage
      title="Výběr mapy"
      description="Obrazovka výběru herní mapy před spuštěním partie. Každá karta ukazuje název, počet hexů, hráčů a cílový VP. Vybraná karta je zvýrazněna zlatým okrajem."
    >
      <Section
        id="desktop"
        title="Desktop — 1280px+"
        description="Tři karty v jedné řadě. Vybraná karta (Malá) má zlatý rámeček a glow. Confirm button vpravo dole."
      >
        <Preview>
          <DeviceFrame type="desktop">
            <MapSelectDesktopLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="tablet"
        title="Tablet — 768px"
        description="Dvě karty v první řadě, třetí karta pod nimi. Kompaktnější verze karet."
      >
        <Preview>
          <DeviceFrame type="tablet">
            <MapSelectTabletLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="mobile"
        title="Mobil — 375px"
        description="Jedna karta najednou, navigace mezi mapami pomocí swipe (indikováno tečkami). Vybraná karta je aktivní."
      >
        <Preview>
          <DeviceFrame type="mobile">
            <MapSelectMobileLayout />
          </DeviceFrame>
        </Preview>
      </Section>

      <Section
        id="srovnani"
        title="Srovnání"
        description="Desktop → 3 karty v řadě, Tablet → 2+1, Mobil → 1 karta + swipe indikátor."
      >
        <Preview>
          <ComparisonRow
            desktop={<MapSelectDesktopLayout />}
            tablet={<MapSelectTabletLayout />}
            mobile={<MapSelectMobileLayout />}
          />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <DonjonBadge variant="warning">Vybraná karta — zlatý border + glow</DonjonBadge>
            <DonjonBadge variant="default">Thumbnail — hex dots odpovídají počtu hexů</DonjonBadge>
            <DonjonBadge variant="default">Mobil — swipe indikátor (tečky)</DonjonBadge>
          </div>
        </Preview>
      </Section>

      <Section
        id="karta-mapy"
        title="Karta mapy — detail"
        description="Close-up jedné karty ve výchozím a vybraném stavu."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <DonjonCard title="Nevybraná karta" description="Výchozí stav">
              <MapCard map={{ ...MAPS[0], selected: false }} cardW={140} />
            </DonjonCard>
            <DonjonCard title="Vybraná karta" description="Zlatý rámeček + glow">
              <MapCard map={{ ...MAPS[1], selected: true }} cardW={140} />
            </DonjonCard>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
