import { useState } from 'react'
import DonjonNotificationCenter from '../lib/donjon/DonjonNotificationCenter'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

/* ── Mock eventy pro showcase ── */
const SAMPLE_EVENTS = [
  { id: 1, type: 'event',   text: 'Hra začíná. Hráč 1 je na tahu.',       timestamp: Date.now() - 120000 },
  { id: 2, type: 'gain',    text: 'Hráč 1 získal 3 VP za ovládnutí hradu.', timestamp: Date.now() - 90000 },
  { id: 3, type: 'loss',    text: 'Hráč 2 ztratil 5 HP po útoku.',          timestamp: Date.now() - 60000 },
  { id: 4, type: 'warning', text: 'Hráč 2 má méně než 25 % HP.',            timestamp: Date.now() - 30000 },
  { id: 5, type: 'system',  text: 'Kolo 3 začíná.',                         timestamp: Date.now() - 5000  },
]

/* ── Interaktivní demo ── */
function NotifDemo({ position = 'bottom-right' }) {
  const [events, setEvents] = useState(SAMPLE_EVENTS)
  const [counter, setCounter] = useState(6)

  function addEvent(type) {
    const texts = {
      gain:    ['Získáno +2 VP', 'Bonus za strategii', 'Posilnění aktivováno'],
      loss:    ['Ztraceno 4 HP', 'Útok nepřítele', 'Obrana selhala'],
      event:   ['Nová karta vybrána', 'Fáze útoku', 'Kolo 4'],
      warning: ['Zásoby docházejí', 'Nebezpečná zóna', 'HP pod 25 %'],
      system:  ['Připojení obnoveno', 'Tah přeskočen', 'Hra pozastavena'],
    }
    const pool = texts[type]
    const text = pool[Math.floor(Math.random() * pool.length)]
    setEvents(prev => [...prev, { id: counter, type, text, timestamp: Date.now() }])
    setCounter(c => c + 1)
  }

  return (
    <div style={{ position: 'relative', minHeight: 200, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#9A9080' }}>
        Klikni na tlačítka pro přidání eventů, pak na zvoneček (vpravo dole) pro otevření panelu:
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['gain', 'loss', 'event', 'warning', 'system'].map(type => (
          <button
            key={type}
            onClick={() => addEvent(type)}
            style={{
              padding: '5px 10px', fontSize: '0.75rem', borderRadius: 3,
              border: '1px solid #353751', background: '#1E1C30',
              color: '#C8BFAF', cursor: 'pointer',
            }}
          >
            + {type}
          </button>
        ))}
        <button
          onClick={() => setEvents([])}
          style={{
            padding: '5px 10px', fontSize: '0.75rem', borderRadius: 3,
            border: '1px solid #353751', background: 'transparent',
            color: '#6B6A82', cursor: 'pointer',
          }}
        >
          clear all
        </button>
      </div>
      <p style={{ margin: 0, fontSize: '0.6875rem', color: '#4A4560' }}>
        {events.length} eventů celkem
      </p>

      {/* Komponenta renderuje do document.body přes portal */}
      <DonjonNotificationCenter
        events={events}
        maxVisible={5}
        position={position}
        onClear={() => setEvents([])}
      />
    </div>
  )
}

export default function NotificationCenterPage() {
  return (
    <ShowcasePage
      title="DonjonNotificationCenter"
      description="Herní panel notifikací — agregátor herních událostí vysouvající se z rohu obrazovky. Kombinuje EventLog, GameTransition a DonjonBadge."
      componentSlugs={['donjon-notification-center']}
    >

      <Section
        id="interaktivni-demo"
        title="Interaktivní demo"
        description="Panel se zobrazí jako fixed overlay vpravo dole. Zvoneček má counter nepřečtených zpráv."
      >
        <Preview>
          <NotifDemo position="bottom-right" />
        </Preview>
        <CodeBlock code={`import DonjonNotificationCenter from 'donjon-fall-ui/DonjonNotificationCenter'

const [events, setEvents] = useState([])

// events: Array<{ id, text, type, timestamp }>
// Typy: 'gain' | 'loss' | 'event' | 'warning' | 'system'

<DonjonNotificationCenter
  events={events}
  maxVisible={5}
  position="bottom-right"
  onClear={() => setEvents([])}
/>`} />
      </Section>

      <Section
        id="typy-eventu"
        title="Typy událostí"
        description="Každý typ má vlastní barvu a DonjonBadge variantu. Timestamp se formátuje jako HH:MM."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { type: 'gain',    text: 'Hráč 1 získal 3 VP za ovládnutí hradu.' },
              { type: 'loss',    text: 'Hráč 2 ztratil 5 HP po útoku z boku.' },
              { type: 'event',   text: 'Kolo 4 — fáze stavby začíná.' },
              { type: 'warning', text: 'HP pod 25 % — nebezpečná zóna!' },
              { type: 'system',  text: 'Připojení přerušeno, hra pozastavena.' },
            ].map(e => (
              <div key={e.type} style={{
                padding: '7px 12px', borderRadius: 3,
                background: '#1E1C30', border: '1px solid #353751',
                fontSize: '0.8125rem', color: '#C8BFAF',
                display: 'flex', gap: 8, alignItems: 'center',
              }}>
                <code style={{ fontSize: '0.625rem', color: '#8F7458', minWidth: 50 }}>{e.type}</code>
                {e.text}
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`// Struktura eventu:
{ id: 'uuid', type: 'gain', text: 'Získáno 3 VP', timestamp: Date.now() }

// Typy a jejich sémantika:
// gain    → zelená  — pozitivní herní feedback (VP, heal, bonus)
// loss    → červená — negativní event (damage, penalty)
// event   → zlatá   — herní příkaz, konec fáze, tahy
// warning → oranžová — varování (nízké HP, nebezpečí)
// system  → šedá    — systémové zprávy (pauza, reconnect)`} />
      </Section>

      <Section
        id="pozice"
        title="Pozice panelu"
        description="Čtyři rohy obrazovky. Šipka animace se přizpůsobí — slideUp pro dolní, slideDown pro horní pozice."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['bottom-right', 'bottom-left', 'top-right', 'top-left'].map(pos => (
              <div key={pos} style={{
                padding: '6px 12px', borderRadius: 3,
                background: '#1E1C30', border: '1px solid #353751',
                fontSize: '0.75rem', color: '#FFC183',
                fontFamily: 'monospace',
              }}>
                position="{pos}"
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`// Dolní rohy — panel se vysouvá nahoru (slideUp):
<DonjonNotificationCenter position="bottom-right" events={events} />
<DonjonNotificationCenter position="bottom-left"  events={events} />

// Horní rohy — panel se vysouvá dolů (slideDown):
<DonjonNotificationCenter position="top-right" events={events} />
<DonjonNotificationCenter position="top-left"  events={events} />`} />
      </Section>

      <Section
        id="api"
        title="Props API"
        description="Minimalista API — předej events pole a onClear callback. Vše ostatní je volitelné."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              ['events',     'Array<EventItem>',             'required',    'Pole herních událostí k zobrazení.'],
              ['maxVisible', 'number',                       "default: 5",  'Max počet zobrazených záznamů — starší jsou archivovány.'],
              ['position',   "'bottom-right' | 'top-right' | …", "default: 'bottom-right'", 'Roh obrazovky.'],
              ['onClear',    '() => void',                   'optional',    'Callback pro tlačítko "Smazat" v hlavičce panelu.'],
            ].map(([name, type, req, desc]) => (
              <div key={name} style={{
                display: 'grid', gridTemplateColumns: '120px 200px 100px 1fr',
                gap: 8, padding: '6px 10px', borderRadius: 3,
                background: '#1E1C30', border: '1px solid #353751',
                fontSize: '0.75rem',
              }}>
                <code style={{ color: '#FFC183' }}>{name}</code>
                <code style={{ color: '#7AAEF5' }}>{type}</code>
                <span style={{ color: '#9A9080' }}>{req}</span>
                <span style={{ color: '#C8BFAF' }}>{desc}</span>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`// EventItem struktura:
interface EventItem {
  id:        string | number  // unikátní klíč pro React reconciliation
  text:      string           // text notifikace
  type:      'gain' | 'loss' | 'event' | 'warning' | 'system'
  timestamp: number           // Date.now() — formátuje se jako HH:MM
}

// Typický use case — přidávání eventů:
function onGameEvent(event) {
  setEvents(prev => [...prev, {
    id:        crypto.randomUUID(),
    type:      event.type,
    text:      event.message,
    timestamp: Date.now(),
  }])
}`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Přidávej event při každé herní události — komponenta automaticky limituje viditelné záznamy na <code className="text-brand-300">maxVisible</code>.</p>
          <p>✓ Generuj unikátní <code className="text-brand-300">id</code> pro každý event (<code className="text-brand-300">crypto.randomUUID()</code>) — React ho potřebuje pro reconciliation.</p>
          <p>✓ Vždy přidej <code className="text-brand-300">timestamp: Date.now()</code> — panel ho zobrazí jako HH:MM čas příchodu.</p>
          <p>✓ Pouze jedna instance <code className="text-brand-300">DonjonNotificationCenter</code> na stránku — panel je fixed overlay přes <code className="text-brand-300">createPortal</code>.</p>
          <p>✗ Nepřidávej příliš časté eventy (každý herní tick) — 1 event na herní akci, ne per-frame update.</p>
          <p>✗ Nepoužívej pro kritické informace vyžadující okamžitou akci — pro to je <code className="text-brand-300">DonjonModal</code>.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
