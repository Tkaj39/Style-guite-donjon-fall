import { useState } from 'react'
import HexTile from '../components/game-assets/HexTile'
import DieFace from '../components/game-assets/DieFace'
import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import { players, turnPhases } from '../data/gameUiMockData'

// Default map: 61 hexes in large hexagon shape
// Row sizes: 6-7-8-9-8-7-6 (7 rows)
const ROW_SIZES = [6, 7, 8, 9, 8, 7, 6]
const HEX_SIZE = 'sm'
const HEX_W = 48
const HEX_H = 42
const HEX_OFFSET_X = HEX_W * 0.75 // horizontal step for flat-top hex
const HEX_OFFSET_Y = HEX_H         // vertical step

// Default map hex state definitions (col, row from 0)
// Red base: top row (row 0), Blue base: bottom row (row 6)
// 3 focal points in middle row (row 3): cols 1, 4, 7 (left, center, right)
function getHexState(row, col) {
  if (row === 0) return { state: 'base', owner: players[0].color }
  if (row === 6) return { state: 'base', owner: players[1].color }
  if (row === 3 && col === 4) return { state: 'focal-active', owner: null }
  if (row === 3 && col === 1) return { state: 'focal-passive', owner: null }
  if (row === 3 && col === 7) return { state: 'focal-passive', owner: null }
  return { state: 'empty', owner: null }
}

function DefaultMap() {
  const maxCols = Math.max(...ROW_SIZES) // 9
  const mapW = (maxCols - 1) * HEX_OFFSET_X + HEX_W
  const mapH = ROW_SIZES.length * HEX_OFFSET_Y

  return (
    <div style={{ position: 'relative', width: mapW, height: mapH, margin: '0 auto' }}>
      {ROW_SIZES.map((cols, row) => {
        const offsetX = (maxCols - cols) / 2 * HEX_OFFSET_X
        const y = row * HEX_OFFSET_Y
        return Array.from({ length: cols }, (_, col) => {
          const { state, owner } = getHexState(row, col)
          const x = offsetX + col * HEX_OFFSET_X
          return (
            <div key={`${row}-${col}`} style={{ position: 'absolute', left: x, top: y }}>
              <HexTile state={state} owner={owner} size={HEX_SIZE} />
            </div>
          )
        })
      })}
    </div>
  )
}

function TurnHUD({ player, turn, phase, warning = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      background: 'linear-gradient(150deg,#232238 0%,#1B1A30 70%)',
      border: `1px solid ${warning ? '#C04040' : '#3A3858'}`,
      borderRadius: 4, padding: '10px 16px',
      boxShadow: warning ? '0 0 12px #C0404033' : 'none',
    }}>
      {/* Player chip */}
      <div style={{
        width: 28, height: 28, borderRadius: 3,
        background: player.color, flexShrink: 0,
        boxShadow: `0 0 8px ${player.color}66`,
      }} />
      {/* Player name */}
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        background: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{player.label}</span>
      {/* Divider */}
      <div style={{ width: 1, height: 20, background: '#3A3858', flexShrink: 0 }} />
      {/* Turn number */}
      <DonjonBadge size="sm" variant="default">Tah {turn}</DonjonBadge>
      {/* Phase */}
      <DonjonBadge size="sm" variant={warning ? 'danger' : 'default'}>{phase}</DonjonBadge>
      {warning && <DonjonBadge size="sm" variant="danger">Náhlá smrt</DonjonBadge>}
    </div>
  )
}

function HexInfoPanel({ hexState, owner }) {
  const labels = {
    empty: 'Prázdný',
    base: 'Základna',
    'focal-active': 'Ohnisko aktivní',
    'focal-passive': 'Ohnisko pasivní',
    selected: 'Vybraný',
    move: 'Cíl pohybu',
    attack: 'Cíl útoku',
    blocked: 'Blokovaný',
  }
  return (
    <DonjonCard title="Info — hex" description={labels[hexState] ?? hexState}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <DonjonBadge variant="default">{labels[hexState]}</DonjonBadge>
          {owner && <DonjonBadge variant="default">{owner.label}</DonjonBadge>}
          {hexState === 'focal-active' && <DonjonBadge variant="warning">+1 VP na začátku tahu</DonjonBadge>}
          {hexState === 'focal-passive' && <DonjonBadge variant="default">Čeká na aktivaci</DonjonBadge>}
        </div>
      </div>
    </DonjonCard>
  )
}

function UnitInfoPanel({ die, tower }) {
  if (tower) {
    const top = tower[tower.length - 1]
    const rest = tower.slice(0, -1)
    const S = rest.filter(d => d.owner === top.owner).length
    const E = rest.filter(d => d.owner !== top.owner).length
    const O = tower.filter(d => d.owner === top.owner).length
    const cp = top.value + S - E
    const mr = Math.max(O - E, 1)
    const p = players.find(p => p.id === top.owner)
    return (
      <DonjonCard title="Info — věž" description={`Kontroler: ${p?.label}`}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <DonjonBadge variant="default">CP: {cp}</DonjonBadge>
          <DonjonBadge variant="default">Pohyb: {mr}</DonjonBadge>
          <DonjonBadge variant={E > 0 ? 'warning' : 'default'}>{tower.length} kostek</DonjonBadge>
          {E > 0 && <DonjonBadge variant="danger">Smíšená</DonjonBadge>}
        </div>
      </DonjonCard>
    )
  }
  if (die) {
    const p = players.find(p => p.id === die.owner)
    return (
      <DonjonCard title="Info — kostka" description={`Vlastník: ${p?.label}`}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <DonjonBadge variant="default">CP: {die.value}</DonjonBadge>
          <DonjonBadge variant="default">Pohyb: {die.value}</DonjonBadge>
        </div>
      </DonjonCard>
    )
  }
  return null
}

function EventFeed({ events }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {events.map((ev, i) => {
        const p = players.find(p => p.id === ev.playerId)
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#1B1A30', borderRadius: 3, padding: '5px 10px',
            border: '1px solid #2A2948',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p?.color ?? '#8F7458', flexShrink: 0 }} />
            <span style={{ fontSize: '0.6875rem', color: '#8F7458', flex: 1 }}>{p?.label} — {ev.label}</span>
            <DonjonBadge size="sm" variant={ev.variant ?? 'warning'}>+1 VP</DonjonBadge>
          </div>
        )
      })}
    </div>
  )
}

const sampleEvents = [
  { playerId: 1, label: 'Zničení kostky', variant: 'danger' },
  { playerId: 2, label: 'Aktivní ohnisko', variant: 'warning' },
  { playerId: 1, label: 'Zničení kostky', variant: 'danger' },
]

export default function MapPage() {
  const [hudPhase, setHudPhase] = useState(0)

  return (
    <ShowcasePage
      title="Mapa"
      description="Herní plocha složená z hexagonálních polí. Default mapa: 61 hexů, 2 hráči, 3 ohniska v jedné skupině."
    >
      <Section
        id="default"
        title="Default mapa"
        description="61 hexů v hexagonálním uspořádání (řady 6-7-8-9-8-7-6). Červená základna nahoře, modrá dole. Střední ohnisko aktivní, levé a pravé pasivní."
      >
        <Preview>
          <DefaultMap />
        </Preview>

        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <HexTile state="base" owner={players[0].color} size="sm" label="Základna — Hráč 1" showLabel />
            <HexTile state="base" owner={players[1].color} size="sm" label="Základna — Hráč 2" showLabel />
            <HexTile state="focal-active" size="sm" label="Ohnisko aktivní" showLabel />
            <HexTile state="focal-passive" size="sm" label="Ohnisko pasivní ×2" showLabel />
            <HexTile state="empty" size="sm" label="Prázdný" showLabel />
          </div>
        </Preview>
      </Section>

      <Section
        id="varianty"
        title="Varianty mapy"
        description="Mapa je navržena variabilně — počet hráčů, focal point skupiny a win condition jsou parametry mapy, ne pevná pravidla."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <DonjonCard title="Default mapa" description="Standardní konfigurace pro 2 hráče">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <DonjonBadge variant="default">61 hexů</DonjonBadge>
                <DonjonBadge variant="default">2 hráči · 5 kostek</DonjonBadge>
                <DonjonBadge variant="warning">1 skupina · 3 ohniska</DonjonBadge>
                <DonjonBadge variant="success">Cíl: 5 VP</DonjonBadge>
              </div>
            </DonjonCard>
            <DonjonCard title="Variabilní parametry" description="Nastavení závisí na mapě">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
                  Počet hráčů (2–6), počet kostek per hráč, počet a uspořádání ohnisek, cílový počet VP — vše definuje tvůrce mapy.
                </p>
              </div>
            </DonjonCard>
          </div>
        </Preview>
      </Section>

      <Section
        id="board-hud"
        title="Board HUD"
        description="Persistentní herní panel — aktivní hráč, číslo tahu, fáze a info panely."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 600 }}>
            <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Fáze: {turnPhases[hudPhase].label}
            </p>
            <TurnHUD player={players[0]} turn={3} phase={turnPhases[hudPhase].label} />
            <div style={{ display: 'flex', gap: 8 }}>
              {turnPhases.map((ph, i) => (
                <button key={i} onClick={() => setHudPhase(i)} style={{
                  background: hudPhase === i ? '#353751' : '#1B1A30',
                  border: '1px solid #3A3858', borderRadius: 3,
                  color: '#8F7458', fontSize: '0.625rem', padding: '4px 10px',
                  cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {ph.label}
                </button>
              ))}
            </div>
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 600 }}>
            <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Náhlá smrt — warning stav</p>
            <TurnHUD player={players[1]} turn={5} phase="Akce" warning />
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <HexInfoPanel hexState="focal-active" owner={players[0]} />
            <HexInfoPanel hexState="base" owner={players[1]} />
            <UnitInfoPanel die={{ owner: 1, value: 4 }} />
            <UnitInfoPanel tower={[{ owner: 2, value: 3 }, { owner: 1, value: 1 }, { owner: 1, value: 5 }]} />
          </div>
        </Preview>
      </Section>

      <Section
        id="score-feedback"
        title="Score Feedback"
        description="Mikrokomponenty pro zpětnou vazbu na zisk VP — event feed zobrazuje poslední bodové zisky."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8, minWidth: 200 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Event feed</p>
              <EventFeed events={sampleEvents} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>VP badge varianty</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <DonjonBadge variant="danger">+1 VP — zničení</DonjonBadge>
                <DonjonBadge variant="warning">+1 VP — ohnisko</DonjonBadge>
              </div>
            </div>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
