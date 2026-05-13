import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'

/* ── Badge variant → accent color ── */
const variantColor = {
  default: '#8F7458',
  success: '#6EAB78',
  danger:  '#E05C5C',
  warning: '#C89A3C',
  info:    '#5B8FD4',
}

function SoundSpec({ label, trigger, variant = 'default', loop = false, description, ms }) {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      background: '#1B1A30', borderRadius: 4,
      border: '1px solid #2A2948', padding: '10px 14px',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 3, flexShrink: 0,
        background: '#232238', border: '1px solid #3A3858',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#4A4560', fontSize: '1rem',
      }}>
        {loop ? '⟳' : '▶'}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D4C5A9', letterSpacing: '0.04em' }}>{label}</span>
          {loop && <DonjonBadge size="sm" variant="default">loop</DonjonBadge>}
          {ms && (
            <span style={{ fontSize: '0.625rem', color: '#4A4560', fontVariantNumeric: 'tabular-nums' }}>{ms} ms</span>
          )}
          <DonjonBadge size="sm" variant={variant}>{trigger}</DonjonBadge>
        </div>
        {description && (
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.5 }}>{description}</p>
        )}
      </div>
    </div>
  )
}

function SoundGroup({ title, children }) {
  return (
    <DonjonCard title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </DonjonCard>
  )
}

/* ── Sekvenční chain s šipkami ── */
function ChainStep({ label, ms, color = '#4A4560', note }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        background: '#232238', border: `1px solid ${color}`,
        borderRadius: 4, padding: '6px 12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        minWidth: 88,
      }}>
        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#D4C5A9', textAlign: 'center' }}>{label}</span>
        {ms && <span style={{ fontSize: '0.5625rem', color: '#4A4560', fontVariantNumeric: 'tabular-nums' }}>{ms} ms</span>}
      </div>
      {note && (
        <span style={{ fontSize: '0.5625rem', color: '#4A4560', textAlign: 'center', maxWidth: 88, lineHeight: 1.3 }}>{note}</span>
      )}
    </div>
  )
}

function ChainArrow() {
  return (
    <div style={{ color: '#3A3858', fontSize: '0.75rem', flexShrink: 0, alignSelf: 'flex-start', marginTop: 10, padding: '0 2px' }}>
      →
    </div>
  )
}

function SoundChain({ steps, label, description }) {
  return (
    <div style={{
      background: '#1B1A30', borderRadius: 4,
      border: '1px solid #2A2948', padding: '10px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {label && (
        <span style={{ fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
            <ChainStep {...step} />
            {i < steps.length - 1 && <ChainArrow />}
          </div>
        ))}
      </div>
      {description && (
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.5 }}>{description}</p>
      )}
    </div>
  )
}

/* ── Sdílená základna + variantní konce ── */
function SharedBase({ label, ms, description }) {
  return (
    <div style={{
      background: '#1B1A30', borderRadius: 4,
      border: '1px solid #2A2948', padding: '10px 14px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 3, flexShrink: 0,
          background: '#232238', border: '1px solid #3A3858',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#4A4560', fontSize: '0.875rem',
        }}>▶</div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D4C5A9' }}>{label}</span>
        {ms && <span style={{ fontSize: '0.5625rem', color: '#4A4560' }}>{ms} ms</span>}
        <DonjonBadge size="sm" variant="default">sdílená základna</DonjonBadge>
      </div>
      {description && <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.5 }}>{description}</p>}
    </div>
  )
}

function VariantTail({ label, ms, variant = 'default', description }) {
  const color = variantColor[variant] ?? '#8F7458'
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-start',
      background: '#15141F', borderRadius: 4,
      border: `1px solid ${color}44`,
      padding: '8px 12px', marginLeft: 20,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 3, flexShrink: 0,
        background: '#1B1A30', border: `1px solid ${color}66`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color, fontSize: '0.75rem',
      }}>↳</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 3 }}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#D4C5A9' }}>{label}</span>
          {ms && <span style={{ fontSize: '0.5625rem', color: '#4A4560' }}>{ms} ms</span>}
          <DonjonBadge size="sm" variant={variant}>tail</DonjonBadge>
        </div>
        {description && <p style={{ margin: 0, fontSize: '0.6875rem', color: '#8F7458', lineHeight: 1.4 }}>{description}</p>}
      </div>
    </div>
  )
}

export default function ZvukyPage() {
  return (
    <ShowcasePage
      title="Zvuky"
      description="Specifikace herního zvukového designu — hudba, UI zvuky a herní události. Každý zvuk je popsán triggerem, charakterem a délkou."
    >

      {/* ── Hudba ── */}
      <Section
        id="hudba"
        title="Hudba"
        description="Ambient soundtrack — smyčky podle herní situace. Dynamické přechody mezi vrstvami."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SoundSpec
              label="Hlavní téma — lobby"
              trigger="Výběr mapy / čekání"
              variant="default"
              loop
              description="Pomalé, strategické téma s perkusemi a smyčci. Naznačuje taktické napětí před bitvou. BPM 72, 3–4 minuty."
            />
            <SoundSpec
              label="Herní smyčka — klidná"
              trigger="Standardní tah bez souboje"
              variant="default"
              loop
              description="Střední tempo, minimalistické. Hexové perkuse a drone. Podkrývá soustředění hráče při výběru akce."
            />
            <SoundSpec
              label="Herní smyčka — napětí"
              trigger="Náhlá smrt aktivní"
              variant="danger"
              loop
              description="Rychlejší rytmus, přidána disonance. Signalizuje kritický stav hry — aktivuje se po překročení tahu 8 bez výherce."
            />
          </div>
        </Preview>
      </Section>

      {/* ── UI zvuky ── */}
      <Section
        id="ui-zvuky"
        title="UI zvuky"
        description="Zvuky rozhraní — navigace, potvrzení, chyba. Konzistentní set pro celou UI vrstvu."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <SoundGroup title="Navigace a výběr">
              <SoundSpec
                label="Hover hex"
                trigger="Kurzor nad hexem"
                variant="default"
                ms={25}
                description="Jemný tick. Nízkofrekvenční klik bez přesycení při rychlém pohybu."
              />
              <SoundSpec
                label="Výběr hexu / kostky"
                trigger="Klik na herní element"
                variant="info"
                ms={40}
                description="Suchý klik s mírnou rezonancí. Jasně odlišný od hover ticku."
              />
              <SoundSpec
                label="Zrušení výběru"
                trigger="Klik mimo / Escape"
                variant="default"
                ms={30}
                description="Obrácený klik — klesající tón."
              />
            </SoundGroup>
            <SoundGroup title="Akce a potvrzení">
              <SoundSpec
                label="Potvrzení akce"
                trigger="Výběr akce v menu"
                variant="success"
                ms={60}
                description="Střední klik s pozitivní harmonií. Používá se pro všechny 4 herní akce."
              />
              <SoundSpec
                label="Chyba / nedostupná akce"
                trigger="Klik na disabled prvek"
                variant="danger"
                ms={50}
                description="Nízký dull thud. Signalizuje, že akce není možná."
              />
              <SoundSpec
                label="Konec tahu"
                trigger="Předání tahu"
                variant="default"
                ms={200}
                description="Čistý ding s doznívající rezonancí. Jemně upozorní na přechod hráče."
              />
            </SoundGroup>
          </div>
        </Preview>
      </Section>

      {/* ── Herní zvuky ── */}
      <Section
        id="herni-zvuky"
        title="Herní zvuky"
        description="Zvuky herních událostí — pohyb, souboj, body, konec hry. Každý zvuk odpovídá vizuální animaci."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>

            {/* Pohyb */}
            <SoundGroup title="Pohyb">
              <SoundSpec
                label="Pohyb kostky"
                trigger="Move die — přesun na cílový hex"
                variant="default"
                ms={280}
                description="Rychlé klouzání s krátkým dopadem na konci. Synchronizováno s animací."
              />
              <SoundSpec
                label="Pohyb věže"
                trigger="Move tower — věž se přesune jako celek"
                variant="default"
                ms={360}
                description="Těžší, hlubší zvuk pohybu. Vyjadřuje váhu stohovaných kostek."
              />
            </SoundGroup>

            {/* Push chain */}
            <SoundGroup title="Souboj — Push chain">
              <SoundChain
                label="Sekvenční průběh Push"
                steps={[
                  { label: 'Impakt', ms: 180, color: '#E05C5C44', note: 'kovový úder' },
                  { label: 'Def. reroll', ms: 220, color: '#C89A3C44', note: 'chrastění' },
                  { label: 'Posun formace', ms: 320, color: '#5B8FD444', note: 'whoosh' },
                  { label: 'Settle / tail', ms: 180, color: '#4A456044', note: 'dopad / prasknutí' },
                ]}
                description="Čtyři za sebou jdoucí zvuky tvoří jeden push event. Settle a Destruction tail jsou vzájemně výlučné — závisí na výsledku."
              />
              <SoundSpec
                label="Impakt"
                trigger="Útočník vstoupí na nepřátelské pole"
                variant="danger"
                ms={180}
                description="Krátký kovový úder. Synchronizováno se shake efektem kostky obránce."
              />
              <SoundSpec
                label="Defender reroll"
                trigger="Obránce přehazuje po Push"
                variant="warning"
                ms={220}
                description="Rychlé chrastění — stejný základ jako akční reroll, ale kratší a jemnější. Signalizuje přehazování, ne posílení."
              />
              <SoundSpec
                label="Posun formace"
                trigger="Obránce se posouvá na nový hex"
                variant="info"
                ms={320}
                description="Whoosh s dopadem — odtlačovací pohyb. Vyjadřuje fyzické odtlačení formace."
              />
            </SoundGroup>

            {/* Push outcome varianty */}
            <SoundGroup title="Push — výsledkové varianty">
              <SharedBase
                label="Destruction base"
                ms={200}
                description="Sdílený začátek destrukce — prasknutí s nástupem. Hraje se jako settle tail pokaždé, když kostka mizí z mapy."
              />
              <VariantTail
                label="Free push — settle"
                ms={120}
                variant="default"
                description="Mírný dopad — kostka se usadí na novém hexu. Žádná destrukce."
              />
              <VariantTail
                label="Off map — pád"
                ms={280}
                variant="danger"
                description="Vytlačení mimo mapu — prasknutí + klesající tón pádu. Kostka je zničena."
              />
              <VariantTail
                label="Encirclement — obklíčení"
                ms={240}
                variant="danger"
                description="Obklíčení bez pohybu — krátký závan + implosion accent. Kostka zmizí na místě."
              />
            </SoundGroup>

            {/* Reroll */}
            <SoundGroup title="Přehazování">
              <SoundSpec
                label="Akční reroll"
                trigger="Akce Reroll — hráč posílí kostku"
                variant="success"
                ms={400}
                description="Rychlé chrastění + finální kliknutí nové hodnoty. Tón stoupá pro novou hodnotu ≥ původní. Cue je plnější než defender reroll."
              />
              <SoundSpec
                label="Ohniskový reroll"
                trigger="Kostka na ohnisku přehazuje po zisku VP"
                variant="warning"
                ms={320}
                description="Zlatý tón s ohlasem ohniska + chrastění. Odlišuje se od akčního rerollu teplou barvou zvuku. Synchronizováno s pulse animací hexu."
              />
              <SoundSpec
                label="Neutrální feedback — hodnota zůstává"
                trigger="Reroll: nová hodnota < původní, ponech původní"
                variant="default"
                ms={180}
                description="Tichý, neutrální ding bez stoupání. Signalizuje, že reroll neměl efekt — ani pozitivní, ani negativní. Odlišné od chyby."
              />
            </SoundGroup>

            {/* Destrukce */}
            <SoundGroup title="Destrukce a kolaps">
              <SharedBase
                label="Destruction base"
                ms={200}
                description="Sdílený základ pro všechny typy destrukce — prasknutí s nástupem fade-out. Hraje se vždy při odstranění kostky."
              />
              <VariantTail
                label="Reward tail — zisk VP"
                ms={300}
                variant="success"
                description="Stoupající tón odměny po prasknutí. Přidává se při každém zisku VP za destrukci."
              />
              <VariantTail
                label="Collapse varianta"
                ms={400}
                variant="danger"
                description="Postupný pád — spodní kostka věže mizí, věž se zkracuje. Třesknutí + táhlý pád místo okamžitého prasknutí. Delší tail než standardní destrukce."
              />
            </SoundGroup>

            {/* Ohnisko */}
            <SoundGroup title="Ohnisko">
              <SoundSpec
                label="Zisk VP — aktivní ohnisko"
                trigger="Ohnisko vyhodnoceno na začátku tahu"
                variant="warning"
                ms={500}
                description="Zlatý zvon s rezonancí. Synchronizováno s pulse animací ohniska. Ohniskový reroll cue navazuje."
              />
              <SoundSpec
                label="Focal chosen accent"
                trigger="Ohnisko se přepne — nové aktivní ohnisko zvoleno"
                variant="warning"
                ms={160}
                description="Krátký zlatý akcent — tón, který přesně naznačí výběr nového ohniska ze skupiny. Připomíná hover, ale s teplejší barvou."
              />
              <SoundSpec
                label="Top die focus accent"
                trigger="Vrchní kostka věže na ohnisku — vizuální focus"
                variant="default"
                ms={80}
                description="Jemný tick s lehkým zlatým podtónem. Odlišný od UI hover ticku — teplejší, organičtější."
              />
              <SoundSpec
                label="Reject cue"
                trigger="Kostka nesplňuje podmínky ohniska"
                variant="danger"
                ms={60}
                description="Tichý, nízký dull impulse. Jemnější než UI chyba — nedostatek podmínek, ne uživatelská chyba."
              />
            </SoundGroup>

            {/* Win cue */}
            <SoundGroup title="Výhra">
              <SoundSpec
                label="Win cue — fanfára + výhra"
                trigger="Hráč dosáhne cílového počtu VP"
                variant="success"
                ms={9000}
                description="Jediný win cue — kombinuje slavnostní fanfáru s dotvrzením výhry. Přechod fade-in přes herní smyčku, pak plné znění 8–10 s. Nahrazuje oddělené Vítězné fanfáry + Výhra."
              />
            </SoundGroup>

            {/* Náhlá smrt */}
            <SoundGroup title="Náhlá smrt">
              <SoundSpec
                label="Náhlá smrt — upozornění"
                trigger="Aktivace náhlé smrti"
                variant="danger"
                ms={1000}
                description="Dramatický akord s disonancí. Jednorázové upozornění — přechod do danger smyčky. Navazuje na Herní smyčka — napětí."
              />
            </SoundGroup>

          </div>
        </Preview>
      </Section>

    </ShowcasePage>
  )
}
