import OpponentTurnBanner from '../lib/donjon/OpponentTurnBanner'
import ActionBar from '../lib/donjon/ActionBar'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { SwordIcon, ShieldIcon, MoveIcon, TowerIcon } from '../lib/donjon/icons'
import { players } from '../data/gameUiMockData'

/* Shared player data — pick the two canonical game colors. */
const RED  = players[0]  // červený
const BLUE = players[1]  // modrý

/* Example action set used only to make the "on turn vs waiting" contrast
   visible side-by-side in the Preview — it is not part of the component. */
const DEMO_ACTIONS = [
  { label: 'Pohyb',    icon: <MoveIcon />,   variant: 'move',    keycap: 'M' },
  { label: 'Útok',     icon: <SwordIcon />,  variant: 'attack',  keycap: 'A' },
  { label: 'Obrana',   icon: <ShieldIcon />, variant: 'default', keycap: 'D' },
  { label: 'Věž',      icon: <TowerIcon />,  variant: 'special', keycap: 'T' },
]

export default function OpponentTurnBannerPage() {
  return (
    <ShowcasePage
      title="OpponentTurnBanner"
      description="HUD banner showing, in place of the inactive ActionBar, whose turn it currently is. Solid player-color rectangle + short „<Color> turn“ message."
      componentSlugs={['opponent-turn-banner']}
    >
      <Section
        id="zakladni"
        title="Základní použití"
        description="Pokud je hráč na tahu → ActionBar. Pokud ne → OpponentTurnBanner s barvou soupeře."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <div>
              <p style={{ fontSize: '0.625rem', opacity: 0.7, margin: '0 0 8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Pohled hráče na tahu
              </p>
              <ActionBar actions={DEMO_ACTIONS} size="sm" bordered={false} />
            </div>
            <div>
              <p style={{ fontSize: '0.625rem', opacity: 0.7, margin: '0 0 8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Pohled čekajícího hráče
              </p>
              <OpponentTurnBanner player={{ color: BLUE.color, name: 'Blue' }} size="sm" />
            </div>
          </div>
        </Preview>
        <CodeBlock code={`{isMyTurn
  ? <ActionBar actions={myActions} size="sm" />
  : <OpponentTurnBanner player={activePlayer} size="sm" />}`} />
      </Section>

      <Section
        id="velikosti"
        title="Velikosti"
        description="xs / sm / md — stejná výšková škála jako ActionBar (44 / 72 / 96 px), takže banner zapadne do HUDu beze změny layoutu."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <OpponentTurnBanner player={{ color: RED.color,  name: 'Red' }}  size="xs" />
            <OpponentTurnBanner player={{ color: BLUE.color, name: 'Blue' }} size="sm" />
            <OpponentTurnBanner player={{ color: RED.color,  name: 'Red' }}  size="md" />
          </div>
        </Preview>
        <CodeBlock code={`<OpponentTurnBanner player={{ color: '#E05C5C', name: 'Red' }} size="xs" />
<OpponentTurnBanner player={{ color: '#4A80E2', name: 'Blue' }} size="sm" />
<OpponentTurnBanner player={{ color: '#E05C5C', name: 'Red' }} size="md" />`} />
      </Section>

      <Section
        id="varianty-barev"
        title="Varianty barev hráčů"
        description="Banner respektuje jakoukoliv barvu, kterou mu předáš přes player.color — libovolná barva hráče / týmu / frakce."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <OpponentTurnBanner player={{ color: '#E05C5C', name: 'Red' }}    size="sm" />
            <OpponentTurnBanner player={{ color: '#4A80E2', name: 'Blue' }}   size="sm" />
            <OpponentTurnBanner player={{ color: '#50B86C', name: 'Green' }}  size="sm" />
            <OpponentTurnBanner player={{ color: '#9A60C8', name: 'Purple' }} size="sm" />
            <OpponentTurnBanner player={{ color: '#C08040', name: 'Orange' }} size="sm" />
          </div>
        </Preview>
      </Section>

      <Section
        id="vlastni-text"
        title="Vlastní text"
        description="Prop message přepíše výchozí „<name> turn“ — pro lokalizaci, delší zprávu nebo stav mimo tah."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <OpponentTurnBanner player={{ color: BLUE.color, name: 'Modrý' }} size="sm" message="Modrý je na tahu" />
            <OpponentTurnBanner player={{ color: RED.color,  name: 'Red' }}   size="sm" message="Waiting for opponent…" />
          </div>
        </Preview>
        <CodeBlock code={`<OpponentTurnBanner
  player={{ color: '#4A80E2', name: 'Modrý' }}
  size="sm"
  message="Modrý je na tahu"
/>`} />
      </Section>
    </ShowcasePage>
  )
}
