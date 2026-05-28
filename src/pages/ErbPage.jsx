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
      componentSlug="erb"
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

      <Section
        id="prapor"
        title="Prapor — banner s variabilní délkou"
        description="Stejný komponent Shield, jiný tvar. Tip má fixní velikost relativně k šířce (28.9 %), tělo libovolně dlouhé. Vhodné pro side-panel dekorace, herní rangy, vlastnické značky."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Stejná šířka, různé délky */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              {[80, 120, 160, 200].map(h => (
                <div key={h} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Shield shape="prapor" player={players[0]} width={32} height={h} />
                  <span style={{ fontSize: '0.6875rem', color: '#9A9080', fontFamily: 'ui-monospace, monospace' }}>
                    h={h}
                  </span>
                </div>
              ))}
            </div>

            {/* Různé šířky, stejná délka */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              {[24, 32, 48, 64].map(w => (
                <div key={w} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Shield shape="prapor" player={players[1]} width={w} height={140} showSymbol={false} />
                  <span style={{ fontSize: '0.6875rem', color: '#9A9080', fontFamily: 'ui-monospace, monospace' }}>
                    w={w}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Preview>
        <CodeBlock code={`{/* Prapor s symbolem hráče u vrchu (showSymbol implicit true) */}
<Shield shape="prapor" player={{ id: 1, color: '#E05C5C' }} width={32} height={120} />

{/* Prapor bez symbolu (čistá dekorace) */}
<Shield shape="prapor" playerColor="#4A90E2" width={40} height={200} showSymbol={false} />

{/* Variabilní délka — tip má vždy stejnou proporci k šířce */}
<Shield shape="prapor" playerColor="#C84A4A" width={32} height={80} />
<Shield shape="prapor" playerColor="#C84A4A" width={32} height={200} />`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Barva erbu je jedinečná pro každého hráče — nikdy nepřiděluj dvěma hráčům stejnou barvu.</p>
          <p>✓ Používej Shield všude kde identifikuješ hráče — HUD, scoreboard, win dialog, event log.</p>
          <p>✓ Shield vs PlayerBadge: Shield je čistá ikona, PlayerBadge je inline řádkový identifikátor s textem.</p>
          <p>✓ Velikost erbu přizpůsob kontextu — sm pro inline text, md pro sidepanel, lg pro win screen.</p>
          <p>✗ Nepoužívej playerColor přímo na text bez dostatečného kontrastu — vždy over-tmavé pozadí.</p>
          <p>✗ Nenahrazuj erb jménem hráče bez vizuální barvy — jméno samotné nestačí pro rychlou identifikaci.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
