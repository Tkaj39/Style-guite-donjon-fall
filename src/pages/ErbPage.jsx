import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { textFaint } from '../lib/donjon/tokens'
import { players } from '../data/gameUiMockData'
import { Shield, PlayerIdentityBadge } from '../lib/donjon/Erb'

export default function ErbPage() {
  return (
    <ShowcasePage
      library="donjon"
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
                <span style={{ fontSize: '0.5625rem', color: textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.label}</span>
              </div>
            ))}
          </div>
        </Preview>

        <Preview>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
            {(['xs', 'sm', 'md', 'lg']).map(sz => (
              <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Shield player={players[0]} size={sz} showSymbol={false} />
                <span style={{ fontSize: '0.5625rem', color: textFaint, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sz}</span>
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
                <span style={{ fontSize: '0.5625rem', color: textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.label}</span>
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
