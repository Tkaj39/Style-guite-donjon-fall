import { useState } from 'react'
import DonjonCard from '../components/DonjonCard'
import DonjonButton from '../components/DonjonButton'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const players = [
  { id: 1, color: '#E05C5C', label: 'Hráč 1' },
  { id: 2, color: '#4D8FE0', label: 'Hráč 2' },
  { id: 3, color: '#50B86C', label: 'Hráč 3' },
  { id: 4, color: '#D4A830', label: 'Hráč 4' },
  { id: 5, color: '#9B6CC8', label: 'Hráč 5' },
  { id: 6, color: '#E07840', label: 'Hráč 6' },
]

function EndTurnIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" />
    </svg>
  )
}

function TurnCard({ player, turn }) {
  return (
    <DonjonCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Player color chip */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 4,
          background: player.color,
          flexShrink: 0,
          boxShadow: `0 0 12px ${player.color}66`,
        }} />
        {/* Player name + turn */}
        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0,
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            background: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.2,
          }}>
            {player.label}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '0.6875rem', color: '#8F7458', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Na tahu
          </p>
        </div>
        <DonjonBadge size="sm" variant="default">Tah {turn}</DonjonBadge>
      </div>
    </DonjonCard>
  )
}

export default function TahPage() {
  const [activeTurn, setActiveTurn] = useState(0)

  return (
    <ShowcasePage
      title="Tah"
      description="UI indikátor aktuálního tahu — zobrazuje který hráč je na řadě a číslo tahu."
    >
      {/* All 6 player variants */}
      <Section
        title="Indikátor hráče"
        description="Karta tahu pro každého z šesti hráčů — barva chipsetu odpovídá barvě hráče na mapě."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {players.map((player, i) => (
              <TurnCard key={player.id} player={player} turn={i + 1} />
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<DonjonCard>
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 40, height: 40, background: playerColor }} />
    <div>
      <p>{playerLabel}</p>
      <p>Na tahu</p>
    </div>
    <DonjonBadge size="sm">Tah {turn}</DonjonBadge>
  </div>
</DonjonCard>`} />
      </Section>

      {/* Interactive demo */}
      <Section
        title="Živá ukázka"
        description="Simulace střídání hráčů — klikni na Konec tahu."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <TurnCard player={players[activeTurn]} turn={activeTurn + 1} />
            <DonjonButton
              size="sm"
              trailingIcon={<EndTurnIcon />}
              onClick={() => setActiveTurn((t) => (t + 1) % players.length)}
            >
              Konec tahu
            </DonjonButton>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
