import { useState } from 'react'
import EventLog from '../lib/donjon/EventLog'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonSelect from '../lib/donjon/DonjonSelect'
import {
  gold, bg2, bgDeep, borderDefault,
  textMid, textFaint, textParchment,
  gainColor, dangerColor, warningColor,
} from '../lib/donjon/tokens'

const PAGE    = { padding: '40px 32px', maxWidth: 860, margin: '0 auto' }
const H1      = { fontSize: '1.5rem', fontWeight: 700, color: gold, letterSpacing: '0.04em', marginBottom: 4 }
const H2      = { fontSize: '0.875rem', fontWeight: 700, color: gold, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }
const DIVIDER = { height: 1, background: borderDefault, margin: '40px 0', opacity: 0.4 }

function Section({ id, title, desc, children }) {
  return (
    <section id={id} style={{ marginBottom: 40 }}>
      <h2 style={H2}>{title}</h2>
      {desc && <p style={{ fontSize: '0.8125rem', color: textMid, marginBottom: 16, marginTop: 2 }}>{desc}</p>}
      {children}
    </section>
  )
}

function Demo({ children, style }) {
  return (
    <div style={{ background: bg2, border: `1px solid ${borderDefault}`, borderRadius: 4, padding: 24, ...style }}>
      {children}
    </div>
  )
}

function Code({ children }) {
  return (
    <pre style={{
      background: bgDeep, border: `1px solid ${borderDefault}`, borderRadius: 4,
      padding: '12px 16px', fontSize: '0.75rem', color: textParchment,
      overflowX: 'auto', margin: '8px 0 0', lineHeight: 1.6,
      fontFamily: "'JetBrains Mono', Consolas, monospace",
    }}>
      <code>{children.trim()}</code>
    </pre>
  )
}

const SAMPLE_EVENTS = [
  { id: '1', type: 'system',  text: 'Hra začíná — 3 hráči', round: 1 },
  { id: '2', type: 'event',   text: 'Hráč 1 zahájil tah', round: 1 },
  { id: '3', type: 'gain',    text: '+1 VP pro Hráče 1', detail: 'Obsadil základnu na hexu C3', round: 1 },
  { id: '4', type: 'event',   text: 'Hráč 2 zahájil tah', round: 1 },
  { id: '5', type: 'loss',    text: 'Hráč 2 prohrál souboj', detail: 'Hráč 1 způsobil 2 body poškození', round: 1 },
  { id: '6', type: 'gain',    text: '+3 VP pro Hráče 1', detail: 'Kolaps věže soupeře', round: 2 },
  { id: '7', type: 'warning', text: 'Mana Hráče 3 je kritická', detail: 'Zbývá méně než 15 %', round: 2 },
  { id: '8', type: 'system',  text: 'Kolo 3 — Hráč 1 vede s 4 VP', round: 3 },
  { id: '9', type: 'event',   text: 'Sudden Death aktivován', detail: 'Zbývá 2 kola', round: 4 },
  { id: '10', type: 'gain',   text: 'Hráč 1 VÍTĚZ — 7 VP', detail: 'Dosáhl cílového skóre', round: 5 },
]

let nextId = 11

const EVENT_TEMPLATES = {
  gain:    [
    text => ({ type: 'gain',    text: `+${1 + Math.floor(Math.random()*3)} VP pro Hráče ${1 + Math.floor(Math.random()*2)}`, detail: 'Obsadil ohnisko' }),
    text => ({ type: 'gain',    text: `Hráč ${1 + Math.floor(Math.random()*2)} získal zdroj`,  detail: 'Hex se zlatem' }),
  ],
  loss:    [
    text => ({ type: 'loss',    text: `Hráč ${1 + Math.floor(Math.random()*2)} prohrál souboj`, detail: 'Věž zkolabovala' }),
    text => ({ type: 'loss',    text: `−5 HP pro Hráče ${1 + Math.floor(Math.random()*2)}`, detail: 'Útok kostkou' }),
  ],
  event:   [
    text => ({ type: 'event',   text: `Hráč ${1 + Math.floor(Math.random()*3)} zahájil tah` }),
    text => ({ type: 'event',   text: 'Ohnisko přešlo do pasivního stavu' }),
  ],
  warning: [
    text => ({ type: 'warning', text: `Hráč ${1 + Math.floor(Math.random()*2)} má kriticky málo HP` }),
    text => ({ type: 'warning', text: 'Hra skončí za 2 kola — Sudden Death' }),
  ],
  system:  [
    text => ({ type: 'system',  text: `Kolo ${3 + Math.floor(Math.random()*5)} začíná` }),
    text => ({ type: 'system',  text: 'Pravidla ověřena — žádné porušení' }),
  ],
}

export default function EventLogPage() {
  const [events, setEvents] = useState(SAMPLE_EVENTS)
  const [selectedType, setSelectedType] = useState('gain')
  const [round, setRound] = useState(3)

  const addEvent = () => {
    const templates = EVENT_TEMPLATES[selectedType]
    const tmpl = templates[Math.floor(Math.random() * templates.length)]
    const entry = tmpl()
    setEvents(prev => [...prev, { id: String(nextId++), round, ...entry }])
  }

  const clear = () => setEvents([])

  return (
    <div style={PAGE}>
      <h1 style={H1}>EventLog</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        Seznam herních eventů s automatickým scrollem na nejnovější.
        Barevné kódování podle typu: gain (zelená), loss (červená), event (zlatá),
        warning (jantarová), system (šedá). Auto-scroll se spustí při každé změně events.
        Výchozí režim je plain log panel; nově lze zapnout i dekorovaný shell.
      </p>

      {/* ── Interaktivní demo ── */}
      <Section id="demo" title="Interaktivní demo" desc="Přidávej záznamy a sleduj auto-scroll.">
        <Demo>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 280px' }}>
              <EventLog events={events} maxHeight={320} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <DonjonSelect
                value={selectedType}
                onChange={setSelectedType}
                label="Typ záznamu"
                options={[
                  { value: 'gain',    label: 'gain — zisk (zelená)' },
                  { value: 'loss',    label: 'loss — ztráta (červená)' },
                  { value: 'event',   label: 'event — herní (zlatá)' },
                  { value: 'warning', label: 'warning — varování (jantarová)' },
                  { value: 'system',  label: 'system — systém (šedá)' },
                ]}
                style={{ maxWidth: 220 }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <DonjonButton size="sm" onClick={addEvent}>+ Přidat záznam</DonjonButton>
                <DonjonButton size="sm" variant="danger" onClick={clear}>Vymazat</DonjonButton>
              </div>
              <p style={{ fontSize: '0.75rem', color: textFaint, margin: 0 }}>
                Záznamy: {events.length}
                <br />Auto-scroll: vždy na nejnovější
              </p>
            </div>
          </div>
        </Demo>
        <Code>{`// Struktura záznamu:
{ id: '1', type: 'gain', text: '+1 VP pro Hráče 1', detail: 'Obsadil základnu', round: 3 }

<EventLog events={gameLog} maxHeight={320} />

// Typy: 'gain' | 'loss' | 'event' | 'warning' | 'system'`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Typy ── */}
      <Section id="typy" title="Typy záznamů" desc="Každý typ má barvu, ikonu a pozadí.">
        <Demo>
          <EventLog
            events={[
              { id: 'a', type: 'gain',    text: '+2 VP pro Hráče 1', detail: 'Obsadil základnu na hexu C3', round: 1 },
              { id: 'b', type: 'loss',    text: 'Hráč 2 prohrál souboj', detail: 'Ztráta věže', round: 1 },
              { id: 'c', type: 'event',   text: 'Hráč 3 zahájil tah', round: 2 },
              { id: 'd', type: 'warning', text: 'Varování: HP Hráče 2 pod 25 %', round: 2 },
              { id: 'e', type: 'system',  text: 'Kolo 3 začíná — 2 hráči zbývají', round: 3 },
            ]}
            maxHeight={260}
            showTitle={false}
          />
        </Demo>
        <Code>{`// Každý typ záznam:
{ type: 'gain',    text: '+2 VP',        detail: 'Volitelný popis', round: 1 }
{ type: 'loss',    text: 'Prohrál boj',  round: 1 }
{ type: 'event',   text: 'Zahájil tah',  round: 2 }
{ type: 'warning', text: 'HP kritické',  round: 2 }
{ type: 'system',  text: 'Kolo začíná',  round: 3 }`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Variace ── */}
      <Section id="variace" title="Variace" desc="Bez hlavičky, bez kola, vlastní výška.">
        <Demo style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 230px' }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Bez hlavičky</p>
            <EventLog events={SAMPLE_EVENTS.slice(0, 4)} maxHeight={160} showTitle={false} showRound={false} />
          </div>
          <div style={{ flex: '0 0 230px' }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Vlastní nadpis + výška</p>
            <EventLog events={SAMPLE_EVENTS} maxHeight={160} title="Poslední akce" />
          </div>
        </Demo>
        <Code>{`{/* Bez hlavičky, bez kola */}
<EventLog events={log} showTitle={false} showRound={false} maxHeight={160} />

{/* Vlastní nadpis */}
<EventLog events={log} title="Poslední akce" maxHeight={160} />`}</Code>
      </Section>

      <div style={DIVIDER} />

      <Section
        id="ornament"
        title="Plain vs Decorated"
        desc="Plain je výchozí baseline pro hustý herní log. Decorated režim přidá výraznější donjon shell pro samostatné panely a highlightované výpisy."
      >
        <Demo style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 260px' }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Plain</p>
            <EventLog events={SAMPLE_EVENTS.slice(0, 5)} maxHeight={220} />
          </div>
          <div style={{ flex: '0 0 260px' }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Decorated</p>
            <EventLog events={SAMPLE_EVENTS.slice(0, 5)} maxHeight={220} ornament="decorated" />
          </div>
        </Demo>
        <Code>{`<EventLog events={log} maxHeight={220} />

<EventLog events={log} maxHeight={220} ornament="decorated" />`}</Code>
      </Section>

      {/* Pokročilé props */}
      <Section
        id="pokrocile"
        title="Pokročilé možnosti"
        desc="Filtry, vyhledávání, seskupení podle kola, custom render, prázdný stav a auto-scroll vypnutí."
      >
        <Demo style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 280px' }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>showFilters + showSearch + groupByRound</p>
            <EventLog
              events={SAMPLE_EVENTS}
              maxHeight={260}
              showFilters
              showSearch
              groupByRound
            />
          </div>
          <div style={{ flex: '0 0 280px' }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>autoScroll=false + emptyMessage</p>
            <EventLog
              events={[]}
              maxHeight={120}
              autoScroll={false}
              emptyMessage="Žádné záznamy zatím. Začni hru pro generování událostí."
            />
          </div>
          <div style={{ flex: '0 0 280px' }}>
            <p style={{ fontSize: '0.625rem', color: textFaint, margin: '0 0 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>renderEvent — custom render</p>
            <EventLog
              events={SAMPLE_EVENTS.slice(0, 3)}
              maxHeight={160}
              renderEvent={(event) => (
                <div style={{ padding: '6px 10px', fontSize: '0.75rem', color: textFaint }}>
                  <strong style={{ color: '#B8956A' }}>[{event.type}]</strong> {event.text}
                </div>
              )}
            />
          </div>
        </Demo>
        <Code>{`{/* Filtrování + vyhledávání + seskupení podle kola */}
<EventLog events={log} maxHeight={260} showFilters showSearch groupByRound />

{/* Vypnutý auto-scroll + vlastní prázdný stav */}
<EventLog
  events={[]}
  autoScroll={false}
  emptyMessage="Žádné záznamy zatím."
/>

{/* Custom render každého záznamu */}
<EventLog
  events={log}
  renderEvent={(event) => (
    <div>[{event.type}] {event.text}</div>
  )}
/>`}</Code>
      </Section>
    </div>
  )
}
