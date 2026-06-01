import { useState } from 'react'
import HexTile from '../lib/donjon/HexTile'
import {
  bg2, borderDefault, dangerColor, gainColor, gold, textActive, textFaint, textMid,
} from '../lib/donjon/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { players } from '../data/gameUiMockData'

/* ── Property × state matrix ─────────────────────────────────────────────
   HexTile má dvě nezávislé osy:
     • property — co políčko JE     (empty / focal / base)
     • state    — jak se s ním zachází (default / selected / move / attack / blocked)

   Tabulka níže pokrývá všechny smysluplné kombinace. */

const PROPERTY_LABELS = {
  empty: 'Prázdné',
  focal: 'Ohnisko',
  base:  'Základna',
}

const STATE_LABELS = {
  default:  'Výchozí',
  selected: 'Vybraný',
  move:     'Pohyb',
  attack:   'Útok',
  blocked:  'Blokovaný',
}

const PROPERTIES = ['empty', 'focal', 'base']
const STATES     = ['default', 'selected', 'move', 'attack', 'blocked']

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
  const [demoProperty, setDemoProperty] = useState('empty')
  const [demoState,    setDemoState]    = useState('default')
  const [demoPlayer,   setDemoPlayer]   = useState(players[0])
  const [demoSize,     setDemoSize]     = useState('md')

  const needsPlayer = demoProperty === 'base'
  const owner       = needsPlayer ? demoPlayer.color : null

  // Build the code snippet from the active props
  const propsBits = []
  if (demoProperty !== 'empty')  propsBits.push(`property="${demoProperty}"`)
  if (demoState    !== 'default') propsBits.push(`state="${demoState}"`)
  if (needsPlayer)                propsBits.push(`owner="${demoPlayer.color}"`)
  propsBits.push(`size="${demoSize}"`)
  const codeStr = `<HexTile ${propsBits.join(' ')} />`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Živý náhled */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '32px 16px',
        background: bg2, borderRadius: 6, border: `1px solid ${borderDefault}`,
        minHeight: 140,
      }}>
        <HexTile
          property={demoProperty}
          state={demoState}
          owner={owner}
          size={demoSize}
          showLabel
          label={`${PROPERTY_LABELS[demoProperty]} · ${STATE_LABELS[demoState]}`}
        />
      </div>

      {/* Ovládací panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Vlastnost */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Vlastnost (property)
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PROPERTIES.map(p => (
              <PickerBtn key={p} active={demoProperty === p} onClick={() => setDemoProperty(p)}>
                {PROPERTY_LABELS[p]}
              </PickerBtn>
            ))}
          </div>
        </div>

        {/* Stav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Stav (state)
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {STATES.map(st => (
              <PickerBtn key={st} active={demoState === st} onClick={() => setDemoState(st)}>
                {STATE_LABELS[st]}
              </PickerBtn>
            ))}
          </div>
        </div>

        {/* Hráč — jen pro base */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, opacity: needsPlayer ? 1 : 0.3, pointerEvents: needsPlayer ? 'auto' : 'none', transition: 'opacity 0.2s' }}>
          <span style={{ fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Hráč (jen pro property=„base")
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
                  // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
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

/* ── Matrix view: property × state ───────────────────────────────────── */

// Buňky, které mají v herním kontextu vlastní jméno — zobrazí se pod hexem
// jako menší popisek (semantic name navíc k abstraktní property × state dvojici).
const CELL_LABELS = {
  'focal:default':  'pasivní ohnisko',
  'focal:selected': 'aktivní ohnisko',
}

function PropertyStateMatrix() {
  const cellSize = 56
  const headerStyle = {
    fontSize: '0.625rem', color: textFaint, fontWeight: 600,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    padding: '6px 8px', textAlign: 'center',
  }
  const rowHeaderStyle = { ...headerStyle, textAlign: 'right', minWidth: 96 }
  const cellLabelStyle = {
    fontSize: '0.5625rem', color: gold, fontWeight: 600,
    letterSpacing: '0.06em', textTransform: 'lowercase',
    marginTop: 6, lineHeight: 1.2,
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
        <thead>
          <tr>
            <th style={rowHeaderStyle}></th>
            {STATES.map(st => (
              <th key={st} style={{ ...headerStyle, minWidth: cellSize + 12 }}>{STATE_LABELS[st]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROPERTIES.map(p => (
            <tr key={p}>
              <th style={rowHeaderStyle}>{PROPERTY_LABELS[p]}</th>
              {STATES.map(st => {
                const semanticName = CELL_LABELS[`${p}:${st}`]
                return (
                  <td key={st} style={{ padding: 8, textAlign: 'center', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <HexTile
                        property={p}
                        state={st}
                        owner={p === 'base' ? players[0].color : null}
                        size="sm"
                      />
                      {semanticName && (
                        <span style={cellLabelStyle}>{semanticName}</span>
                      )}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function HexagonPage() {
  return (
    <ShowcasePage
      library="donjon"
      title="Hexagon"
      description="Základní herní pole — hexagonální dlaždice se dvěma nezávislými osami: vlastnost políčka (property) a jeho stav (state)."
      componentSlug="hex-tile"
    >
      {/* API overview */}
      <Section
        title="Dvě nezávislé osy: property × state"
        description="HexTile rozlišuje co políčko JE (property: empty / focal / base) od toho, jak se s ním právě zachází (state: default / selected / move / attack / blocked). Tabulka pokrývá všechny kombinace."
      >
        <Preview>
          <PropertyStateMatrix />
        </Preview>
        <CodeBlock code={`{/* Vlastnost: co políčko JE na mapě */}
<HexTile property="empty" />
<HexTile property="focal" />
<HexTile property="base"  owner={player.color} />

{/* Stav: jak se s ním právě zachází */}
<HexTile state="selected" />
<HexTile state="move" />
<HexTile state="attack" />
<HexTile state="blocked" />

{/* Kombinace — speciální případ: focal + selected = aktivní ohnisko (zlato + plamen) */}
<HexTile property="focal" state="selected" />

{/* Kombinace — základna pod útokem */}
<HexTile property="base" owner={player.color} state="attack" />`} />
      </Section>

      {/* Empty */}
      <Section
        id="prazdny"
        title="Prázdný hex (property = empty)"
        description="Výchozí vlastnost — pole bez speciální role. Combinable se všemi stavy."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
            <HexTile size="sm" showLabel label="sm" />
            <HexTile size="md" showLabel label="md" />
            <HexTile size="lg" showLabel label="lg" />
          </div>
        </Preview>
        <CodeBlock code={`<HexTile size="md" />
{/* property="empty" je výchozí — nemusí se uvádět */}`} />
      </Section>

      {/* Base */}
      <Section
        id="zakladna"
        title="Základna (property = base)"
        description="Startovní pozice kostek hráče — barevně označena barvou daného hráče. Vyžaduje `owner` prop."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end' }}>
            {players.map(p => (
              <HexTile key={p.id} property="base" owner={p.color} size="md" label={p.label} showLabel />
            ))}
          </div>
        </Preview>
        <CodeBlock code={`import { HexTile, red } from 'donjon-fall-ui'

<HexTile property="base" owner={red} size="md" />`} />
      </Section>

      {/* Focal points */}
      <Section
        id="ohniska"
        title="Ohniska (property = focal)"
        description="Speciální hexe rozdělené do skupin. Aktivní vs pasivní rozdíl není nová property — vyplývá ze stavu `selected` na focal políčku."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Active focal point */}
          <div id="ohnisko-aktivni" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: textActive }}>
                Aktivní ohnisko = property=focal + state=selected
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: textFaint }}>
                Hráč na tahu získá +1 VP pokud kontroluje kostku/věž na tomto hexu. Kostka se přehodí: nová hodnota = min(hod, původní − 1).
              </p>
            </div>
            <Preview>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
                <HexTile property="focal" state="selected" size="sm" showLabel label="sm" />
                <HexTile property="focal" state="selected" size="md" showLabel label="md" />
                <HexTile property="focal" state="selected" size="lg" showLabel label="lg" />
              </div>
            </Preview>
            <CodeBlock code={`<HexTile property="focal" state="selected" size="md" />`} />
          </div>

          {/* Passive focal point */}
          <div id="ohnisko-pasivni" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: textActive }}>
                Pasivní ohnisko = property=focal (state=default)
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: textFaint }}>
                Funguje jako normální hex. Čeká na aktivaci — stane se aktivním poté, co jiné ohnisko ve skupině přinese VP.
              </p>
            </div>
            <Preview>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
                <HexTile property="focal" size="sm" showLabel label="sm" />
                <HexTile property="focal" size="md" showLabel label="md" />
                <HexTile property="focal" size="lg" showLabel label="lg" />
              </div>
            </Preview>
            <CodeBlock code={`<HexTile property="focal" size="md" />`} />
          </div>
        </div>
      </Section>

      {/* Interaction states */}
      <Section
        title="Stavy interakce"
        description="Vizuální stavy pro výběr a plánování pohybu — zobrazeny při výběru kostky nebo věže. Aplikované na property=empty, ale fungují i v kombinaci s focal/base."
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
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: gainColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pohyb</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: textFaint, maxWidth: 90 }}>Dostupný cíl pohybu</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <HexTile state="attack" size="md" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, color: dangerColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Útok</p>
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
                  <HexTile size={sz} />
                  <HexTile property="base" owner={players[0].color} size={sz} />
                  <HexTile property="focal" state="selected" size={sz} />
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
        description="Vyzkoušej libovolnou kombinaci property + state + hráč + velikost. Kód níže se aktualizuje živě."
      >
        <HexInteractiveDemo />
      </Section>

      {/* Back-compat */}
      <Section
        id="back-compat"
        title="Zpětná kompatibilita"
        description="Starý jednořetězcový `state` (focal-active / focal-passive / empty / base / ...) stále funguje — interně se mapuje na novou dvojici."
      >
        <CodeBlock code={`{/* Starý API — STÁLE FUNGUJE, nedoporučuje se v novém kódu */}
<HexTile state="focal-active" />     // → property="focal" state="selected"
<HexTile state="focal-passive" />    // → property="focal"
<HexTile state="base" owner={red} /> // → property="base" owner={red}
<HexTile state="move" />             // → state="move" (beze změny)`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vlastnost (property) a stav (state) jsou nezávislé — kombinuj je libovolně dle herní logiky.</p>
          <p>✓ Barva owner prop je hráčova identitní barva — použij ji konzistentně ve všech prvcích UI pro daného hráče.</p>
          <p>✓ Aktivní ohnisko = property=&quot;focal&quot; state=&quot;selected&quot;. Pasivní = property=&quot;focal&quot;.</p>
          <p>✓ Pro mini-mapu (overview) použij size=&quot;sm&quot; — zbytečně velké hexy v mini-mapě narušují přehlednost.</p>
          <p>✗ Nepoužívej state=&quot;selected&quot; pro permanentní stav — je to jen vizuální highlight, ne vlastnictví.</p>
          <p>✗ Nepřidávej interaktivitu přímo do HexTile — ovládání patří do nadřazeného herního gridu.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
