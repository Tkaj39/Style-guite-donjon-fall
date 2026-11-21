import OpponentTurnBanner from '../lib/donjon/OpponentTurnBanner'
import ActionBar from '../lib/donjon/ActionBar'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { SwordIcon, ShieldIcon, MoveIcon, TowerIcon } from '../lib/donjon/icons'
import { playerColors } from '../lib/donjon/playerColors'

/* Canonical palette — primary + dark pairs per player. */
const RED    = playerColors[0]  // red
const BLUE   = playerColors[1]  // blue
const GREEN  = playerColors[2]
const YELLOW = playerColors[3]
const PURPLE = playerColors[4]
const ORANGE = playerColors[5]

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
      description="HUD banner showing, in place of the inactive ActionBar, whose turn it currently is. Octagonal shell with a gold border; body paints the on-turn player's dark variant and the message the primary variant."
      componentSlugs={['opponent-turn-banner']}
    >
      <Section
        id="zakladni"
        title="Základní použití"
        description="Pokud je hráč na tahu → ActionBar. Pokud ne → OpponentTurnBanner s barvou soupeře. Player object pochází z playerColors."
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
              <OpponentTurnBanner player={{ ...BLUE, name: 'Blue' }} size="sm" />
            </div>
          </div>
        </Preview>
        <CodeBlock code={`import { playerColors } from 'donjon-fall-ui'

{isMyTurn
  ? <ActionBar actions={myActions} size="sm" />
  : <OpponentTurnBanner player={playerColors[activePlayerIdx]} size="sm" />}`} />
      </Section>

      <Section
        id="velikosti"
        title="Velikosti"
        description="xs / sm / md — stejná výšková škála jako ActionBar (44 / 72 / 96 px), takže banner zapadne do HUDu beze změny layoutu."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <OpponentTurnBanner player={{ ...RED,  name: 'Red' }}  size="xs" />
            <OpponentTurnBanner player={{ ...BLUE, name: 'Blue' }} size="sm" />
            <OpponentTurnBanner player={{ ...RED,  name: 'Red' }}  size="md" />
          </div>
        </Preview>
        <CodeBlock code={`<OpponentTurnBanner player={playerColors[0]} size="xs" />  {/* Red */}
<OpponentTurnBanner player={playerColors[1]} size="sm" />  {/* Blue */}
<OpponentTurnBanner player={playerColors[0]} size="md" />  {/* Red */}`} />
      </Section>

      <Section
        id="varianty-barev"
        title="Varianty barev hráčů"
        description="Banner respektuje jakoukoliv kanonickou barvu z playerColors (red/blue/green/yellow/purple/orange) — vždy dark variant jako výplň a primary jako text."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <OpponentTurnBanner player={{ ...RED,    name: 'Red' }}    size="sm" />
            <OpponentTurnBanner player={{ ...BLUE,   name: 'Blue' }}   size="sm" />
            <OpponentTurnBanner player={{ ...GREEN,  name: 'Green' }}  size="sm" />
            <OpponentTurnBanner player={{ ...YELLOW, name: 'Yellow' }} size="sm" />
            <OpponentTurnBanner player={{ ...PURPLE, name: 'Purple' }} size="sm" />
            <OpponentTurnBanner player={{ ...ORANGE, name: 'Orange' }} size="sm" />
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
            <OpponentTurnBanner player={{ ...BLUE, name: 'Modrý' }} size="sm" message="Modrý je na tahu" />
            <OpponentTurnBanner player={{ ...RED,  name: 'Red' }}   size="sm" message="Waiting for opponent…" />
          </div>
        </Preview>
        <CodeBlock code={`<OpponentTurnBanner
  player={playerColors[1]}      // Blue (primary + dark)
  size="sm"
  message="Modrý je na tahu"
/>`} />
      </Section>
    </ShowcasePage>
  )
}
