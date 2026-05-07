import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'

function SoundSpec({ label, trigger, variant = 'default', loop = false, description }) {
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

export default function ZvukyPage() {
  return (
    <ShowcasePage
      title="Zvuky"
      description="Specifikace herního zvukového designu — hudba, UI zvuky a herní události. Každý zvuk je popsán triggerem, charakterem a délkou."
    >
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
            <SoundSpec
              label="Vítězné fanfáry"
              trigger="Hráč dosáhne 5 VP"
              variant="success"
              description="Krátká slavnostní fanfára s perkusemi a smyčci. 8–10 sekund. Hraje se přes fade-out herní smyčky."
            />
          </div>
        </Preview>
      </Section>

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
                description="Jemný tick, 20–30 ms. Nízkofrekvenční klik bez přesycení při rychlém pohybu."
              />
              <SoundSpec
                label="Výběr hexu / kostky"
                trigger="Klik na herní element"
                variant="info"
                description="Suchý klik s mírnou rezonancí. 40 ms. Jasně odlišný od hover ticku."
              />
              <SoundSpec
                label="Zrušení výběru"
                trigger="Klik mimo / Escape"
                variant="default"
                description="Obrácený klik — klesající tón. 30 ms."
              />
            </SoundGroup>
            <SoundGroup title="Akce a potvrzení">
              <SoundSpec
                label="Potvrzení akce"
                trigger="Výběr akce v menu"
                variant="success"
                description="Střední klik s pozitivní harmonií. 60 ms. Používá se pro všechny 4 herní akce."
              />
              <SoundSpec
                label="Chyba / nedostupná akce"
                trigger="Klik na disabled prvek"
                variant="danger"
                description="Nízký dull thud. 50 ms. Signalizuje, že akce není možná."
              />
              <SoundSpec
                label="Konec tahu"
                trigger="Předání tahu"
                variant="default"
                description="Čistý ding s doznívající rezonancí. 200 ms. Jemně upozorní na přechod hráče."
              />
            </SoundGroup>
          </div>
        </Preview>
      </Section>

      <Section
        id="herni-zvuky"
        title="Herní zvuky"
        description="Zvuky herních událostí — pohyb, souboj, body, konec hry. Každý zvuk odpovídá vizuální animaci."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <SoundGroup title="Pohyb">
              <SoundSpec
                label="Pohyb kostky"
                trigger="Move die — přesun na cílový hex"
                variant="default"
                description="Rychlé klouzání s krátkým dopadem na konci. 280 ms — synchronizováno s animací."
              />
              <SoundSpec
                label="Pohyb věže"
                trigger="Move tower — věž se přesune jako celek"
                variant="default"
                description="Těžší, hlubší zvuk pohybu. 360 ms. Vyjadřuje váhu stohovaných kostek."
              />
            </SoundGroup>
            <SoundGroup title="Souboj">
              <SoundSpec
                label="Impakt Phase 1"
                trigger="Útočník vstoupí na nepřátelské pole"
                variant="danger"
                description="Krátký kovový úder. 180 ms. Synchronizováno se shake efektem kostky."
              />
              <SoundSpec
                label="Push — odtlačení"
                trigger="Výběr Push v Phase 2"
                variant="warning"
                description="Odtlačovací whoosh s dopadem. 320 ms. Vyjadřuje fyzické odtlačení formace."
              />
              <SoundSpec
                label="Occupy — obsazení"
                trigger="Výběr Occupy v Phase 2"
                variant="info"
                description="Klesající tón — kostka dopadne na věž. 240 ms. Naznačuje dominanci."
              />
              <SoundSpec
                label="Zničení kostky"
                trigger="Vytlačení z mapy / Obklíčení"
                variant="danger"
                description="Prasknutí s doznívajícím fade-out. 400 ms. Finální zvuk pro odstraněnou kostku."
              />
            </SoundGroup>
            <SoundGroup title="VP a konec hry">
              <SoundSpec
                label="Zisk VP — ohnisko"
                trigger="Aktivní ohnisko vyhodnoceno"
                variant="warning"
                description="Zlatý zvon s rezonancí. 500 ms. Synchronizováno s pulse animací ohniska."
              />
              <SoundSpec
                label="Zisk VP — zničení"
                trigger="Nepřátelská kostka odstraněna"
                variant="danger"
                description="Kombinácia impakt zvuku a stoupajícího tónu odměny. 300 ms."
              />
              <SoundSpec
                label="Přehazování"
                trigger="Akce Reroll"
                variant="success"
                description="Rychlé chrastění s finálním kliknutím nové hodnoty. 400 ms."
              />
              <SoundSpec
                label="Kolaps věže"
                trigger="Akce Tower collapse"
                variant="danger"
                description="Třesknutí s postupným pádem — spodní kostka mizí, věž se zkracuje. 300 ms."
              />
              <SoundSpec
                label="Náhlá smrt — upozornění"
                trigger="Aktivace náhlé smrti"
                variant="danger"
                description="Dramatický akord s disonancí. 1 s. Jednorázové upozornění — přechod do danger smyčky."
              />
              <SoundSpec
                label="Výhra"
                trigger="Hráč dosáhne cílového počtu VP"
                variant="success"
                description="Slavnostní fanfára. 8–10 s. Přechod fade-in přes herní smyčku."
              />
            </SoundGroup>
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
