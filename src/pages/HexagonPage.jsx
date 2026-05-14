import HexTile from '../lib/donjon/HexTile'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { players } from '../data/gameUiMockData'

const allStates = [
  { state: 'empty',          label: 'Prázdný' },
  { state: 'base',           label: 'Základna' },
  { state: 'focal-active',   label: 'Ohnisko aktivní' },
  { state: 'focal-passive',  label: 'Ohnisko pasivní' },
  { state: 'selected',       label: 'Vybraný' },
  { state: 'move',           label: 'Pohyb' },
  { state: 'attack',         label: 'Útok' },
  { state: 'blocked',        label: 'Blokovaný' },
]

export default function HexagonPage() {
  return (
    <ShowcasePage
      title="Hexagon"
      description="Základní herní pole — hexagonální dlaždice s 8 vizuálními stavy. Pasivní ohniska fungují jako normální hex, aktivní ohnisko přidává VP a přehodí kostku."
      componentSlug="hex-tile"
    >
      {/* All states overview */}
      <Section
        title="Přehled stavů"
        description="Všechny stavy hex dlaždice seřazené vedle sebe — md velikost."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end' }}>
            {allStates.map(({ state, label }) => (
              <HexTile
                key={state}
                state={state}
                owner={state === 'base' ? players[0].color : null}
                size="md"
                label={label}
                showLabel
              />
            ))}
          </div>
        </Preview>
      </Section>

      {/* Empty */}
      <Section
        id="prazdny"
        title="Prázdný hex"
        description="Výchozí stav — pole bez kostky ani speciálního označení."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
            <HexTile state="empty" size="sm" label="sm" showLabel />
            <HexTile state="empty" size="md" label="md" showLabel />
            <HexTile state="empty" size="lg" label="lg" showLabel />
          </div>
        </Preview>
        <CodeBlock code={`<HexTile state="empty" size="md" />`} />
      </Section>

      {/* Base */}
      <Section
        id="zakladna"
        title="Základna"
        description="Startovní pozice kostek hráče — barevně označena barvou daného hráče. Základny nemají speciální herní pravidla."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end' }}>
            {players.map(p => (
              <HexTile key={p.id} state="base" owner={p.color} size="md" label={p.label} showLabel />
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<HexTile state="base" owner="#E05C5C" size="md" />`} />
      </Section>

      {/* Focal points */}
      <Section
        id="ohniska"
        title="Ohniska"
        description="Speciální hexe rozdělené do skupin. Stav (aktivní/pasivní) se mění v průběhu hry po každém zisku VP z ohniska."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Active focal point */}
          <div id="ohnisko-aktivni" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: '#F0E6D3' }}>Aktivní ohnisko</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#4A4560' }}>
                Hráč na tahu získá +1 VP pokud kontroluje kostku/věž na tomto hexu. Kostka se přehodí: nová hodnota = min(hod, původní − 1).
              </p>
            </div>
            <Preview>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
                <HexTile state="focal-active" size="sm" label="sm" showLabel />
                <HexTile state="focal-active" size="md" label="md" showLabel />
                <HexTile state="focal-active" size="lg" label="lg" showLabel />
              </div>
            </Preview>
            <CodeBlock code={`<HexTile state="focal-active" size="md" />`} />
          </div>

          {/* Passive focal point */}
          <div id="ohnisko-pasivni" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: '#F0E6D3' }}>Pasivní ohnisko</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#4A4560' }}>
                Funguje jako normální hex. Čeká na aktivaci — stane se aktivním poté, co jiné ohnisko ve skupině přinese VP.
              </p>
            </div>
            <Preview>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
                <HexTile state="focal-passive" size="sm" label="sm" showLabel />
                <HexTile state="focal-passive" size="md" label="md" showLabel />
                <HexTile state="focal-passive" size="lg" label="lg" showLabel />
              </div>
            </Preview>
            <CodeBlock code={`<HexTile state="focal-passive" size="md" />`} />
          </div>
        </div>
      </Section>

      {/* Interaction states */}
      <Section
        title="Interakční stavy"
        description="Vizuální stavy pro výběr a plánování pohybu — zobrazeny při výběru kostky nebo věže."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="selected" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: '#F0E6D3', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vybraný</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: '#4A4560', maxWidth: 90 }}>Zvolená kostka nebo věž</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="move" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: '#50B86C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pohyb</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: '#4A4560', maxWidth: 90 }}>Dostupný cíl pohybu</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="attack" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: '#E05C5C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Útok</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: '#4A4560', maxWidth: 90 }}>Nepřátelský cíl útoku</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="blocked" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: '#4A4560', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Blokovaný</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: '#4A4560', maxWidth: 90 }}>Pole nedosažitelné pro pohyb</p>
              </div>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<HexTile state="selected" size="md" />
<HexTile state="move"     size="md" />
<HexTile state="attack"   size="md" />
<HexTile state="blocked"  size="md" />`} />
      </Section>

      {/* Size variants */}
      <Section
        title="Velikosti"
        description="Tři velikosti pro různé kontexty — sm pro mini-mapu, md pro herní mapu, lg pro detail."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-end' }}>
            {['sm', 'md', 'lg'].map(sz => (
              <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
                  <HexTile state="empty"         size={sz} />
                  <HexTile state="base"          size={sz} owner={players[0].color} />
                  <HexTile state="focal-active"  size={sz} />
                </div>
                <p style={{ margin: 0, fontSize: '0.5625rem', color: '#4A4560', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sz}</p>
              </div>
            ))}
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
