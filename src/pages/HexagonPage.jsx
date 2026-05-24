import { useState } from 'react'
import HexTile from '../lib/donjon/HexTile'
import { textFaint, textActive, gold, bg2, borderDefault, textMid } from '../lib/donjon/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
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

/* ── Tlačítko pro výběr volby v interaktivním demu ── */
function PickerBtn({ active, color, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 10px',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        border: `1px solid ${active ? (color ?? gold) : borderDefault}`,
        borderRadius: 3,
        background: active ? `${color ?? gold}1A` : bg2,
        color: active ? (color ?? gold) : textMid,
        cursor: 'pointer',
        transition: 'border-color 0.12s, background 0.12s, color 0.12s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

function HexInteractiveDemo() {
  const [demoState,  setDemoState]  = useState('empty')
  const [demoPlayer, setDemoPlayer] = useState(players[0])
  const [demoSize,   setDemoSize]   = useState('md')

  const needsPlayer = demoState === 'base'
  const owner       = needsPlayer ? demoPlayer.color : null

  const codeStr = demoState === 'base'
    ? `<HexTile state="base" owner="${demoPlayer.color}" size="${demoSize}" />`
    : `<HexTile state="${demoState}" size="${demoSize}" />`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Živý náhled */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '32px 16px',
        background: bg2, borderRadius: 6, border: `1px solid ${borderDefault}`,
        minHeight: 140,
      }}>
        <HexTile state={demoState} owner={owner} size={demoSize} showLabel label={demoState} />
      </div>

      {/* Ovládací panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Stav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Stav
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {allStates.map(({ state, label }) => (
              <PickerBtn key={state} active={demoState === state} onClick={() => setDemoState(state)}>
                {label}
              </PickerBtn>
            ))}
          </div>
        </div>

        {/* Hráč — jen pro base */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, opacity: needsPlayer ? 1 : 0.3, pointerEvents: needsPlayer ? 'auto' : 'none', transition: 'opacity 0.2s' }}>
          <span style={{ fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Hráč (jen pro stav „Základna")
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {players.map(p => (
              <button
                key={p.id}
                onClick={() => setDemoPlayer(p)}
                title={p.label}
                style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: p.color,
                  border: `2px solid ${demoPlayer.id === p.id ? '#fff' : 'transparent'}`,
                  cursor: 'pointer',
                  boxShadow: demoPlayer.id === p.id ? `0 0 0 1px ${p.color}` : 'none',
                  transition: 'border-color 0.12s, box-shadow 0.12s',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Velikost */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Velikost
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['sm', 'md', 'lg'].map(sz => (
              <PickerBtn key={sz} active={demoSize === sz} onClick={() => setDemoSize(sz)}>
                {sz}
              </PickerBtn>
            ))}
          </div>
        </div>

        {/* Kód */}
        <CodeBlock code={codeStr} />
      </div>
    </div>
  )
}

export default function HexagonPage() {
  return (
    <ShowcasePage
      library="donjon"
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
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: textActive }}>Aktivní ohnisko</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: textFaint }}>
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
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: textActive }}>Pasivní ohnisko</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: textFaint }}>
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
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: textActive, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vybraný</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: textFaint, maxWidth: 90 }}>Zvolená kostka nebo věž</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="move" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: '#50B86C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pohyb</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: textFaint, maxWidth: 90 }}>Dostupný cíl pohybu</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="attack" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: '#E05C5C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Útok</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: textFaint, maxWidth: 90 }}>Nepřátelský cíl útoku</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="blocked" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Blokovaný</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: textFaint, maxWidth: 90 }}>Pole nedosažitelné pro pohyb</p>
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
                <p style={{ margin: 0, fontSize: '0.5625rem', color: textFaint, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sz}</p>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Interactive demo */}
      <Section
        id="interaktivni"
        title="Interaktivní demo"
        description="Vyzkoušej kombinace stavu, hráče a velikosti — hex se aktualizuje živě."
      >
        <HexInteractiveDemo />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Stav hexu musí vždy odpovídat herní logice — nesynchronizovaný vizuál způsobuje chyby v rozhodování hráče.</p>
          <p>✓ Barva owner prop je hráčova identitní barva — použij ji konzistentně ve všech prvcích UI pro daného hráče.</p>
          <p>✓ Focal-active pro ohnisko, které lze obsadit (aktivní tahem) — focal-passive pro ostatní v skupině.</p>
          <p>✓ Pro mini-mapu (overview) použij size="sm" — zbytečně velké hexy v mini-mapě narušují přehlednost.</p>
          <p>✗ Nepoužívej state="selected" pro permanentní stav — je to jen vizuální highlight, ne vlastnictví.</p>
          <p>✗ Nepřidávej interaktivitu přímo do HexTile — ovládání patří do nadřazeného herního gridu.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
