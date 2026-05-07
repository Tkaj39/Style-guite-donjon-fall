import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { players } from '../data/gameUiMockData'

const SHIELD_CLIP = 'polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%)'

const sizeMap = {
  xs: { w: 24,  h: 28  },
  sm: { w: 40,  h: 47  },
  md: { w: 64,  h: 75  },
  lg: { w: 96,  h: 112 },
}

// Simple symbol per player index: Roman numerals I–VI
const symbols = ['I', 'II', 'III', 'IV', 'V', 'VI']

function Shield({ player, size = 'md', showSymbol = true }) {
  const s = sizeMap[size]
  return (
    <div style={{
      display: 'inline-block',
      filter: `drop-shadow(0 0 8px ${player.color}55)`,
    }}>
      {/* Outer border */}
      <div style={{
        width: s.w, height: s.h,
        clipPath: SHIELD_CLIP,
        background: player.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Inner fill */}
        <div style={{
          width: s.w - 3, height: s.h - 3,
          clipPath: SHIELD_CLIP,
          background: player.color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {showSymbol && (
            <span style={{
              color: player.color,
              fontWeight: 900,
              fontSize: s.w * 0.28,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              userSelect: 'none',
              textShadow: `0 0 8px ${player.color}88`,
            }}>
              {symbols[player.id - 1]}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function PlayerIdentityBadge({ player }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: '#1B1A30', borderRadius: 4,
      border: `1px solid ${player.color}44`,
      padding: '6px 12px',
    }}>
      <Shield player={player} size="xs" showSymbol={false} />
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        background: `linear-gradient(180deg,#F9F9F9 0%,${player.color} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{player.label}</span>
    </div>
  )
}

export default function ErbPage() {
  return (
    <ShowcasePage
      title="Erb"
      description="Vizuální identita hráče — heraldický štít s barvou a symbolem hráče. Používán v HUDu, scoreboardu a dialogu výhry."
    >
      <Section
        id="stit"
        title="Štít"
        description="Základní heraldický tvar — 6 hráčů, každý se svou barvou."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end' }}>
            {players.map(p => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Shield player={p} size="md" showSymbol={false} />
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.label}</span>
              </div>
            ))}
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
            {(['xs', 'sm', 'md', 'lg']).map(sz => (
              <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Shield player={players[0]} size={sz} showSymbol={false} />
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sz}</span>
              </div>
            ))}
          </div>
        </Preview>

        <CodeBlock code={`<Shield player={{ color: '#E05C5C', label: 'Hráč 1' }} size="md" />`} />
      </Section>

      <Section
        id="symbol"
        title="Symbol"
        description="Erb se symbolem hráče — římská číslice I–VI jako identifikátor."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end' }}>
            {players.map(p => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Shield player={p} size="md" showSymbol />
                <span style={{ fontSize: '0.5625rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.label}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      <Section
        title="Použití v HUDu a scoreboardu"
        description="Erb v kontextu — identity badge pro scoreboard, HUD a win dialog."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320 }}>
            {players.map(p => <PlayerIdentityBadge key={p.id} player={p} />)}
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
