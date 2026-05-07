import { ShowcasePage } from '../components/layout/ShowcasePage'

function Pillar({ title, children }) {
  return (
    <div style={{
      borderLeft: '2px solid #8F7458',
      paddingLeft: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      <p style={{
        margin: 0,
        fontSize: '0.6875rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#FFC183',
      }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: '0.9375rem', color: '#C8BFAF', lineHeight: 1.65 }}>
        {children}
      </p>
    </div>
  )
}

function MaterialBlock({ label, description, swatch }) {
  return (
    <div style={{
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start',
      padding: '20px 24px',
      background: 'linear-gradient(150deg,#1E1C30 0%,#171626 100%)',
      border: '1px solid #353751',
      borderRadius: 2,
    }}>
      <div style={{
        width: 52,
        height: 52,
        flexShrink: 0,
        background: swatch,
        borderRadius: 2,
        border: '1px solid #8F745840',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{
          margin: 0,
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#B8956A',
        }}>
          {label}
        </p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#8F7458', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </div>
  )
}

function Quote({ children }) {
  return (
    <blockquote style={{
      margin: 0,
      padding: '24px 32px',
      background: 'linear-gradient(150deg,#252340 0%,#1A1830 100%)',
      borderLeft: '3px solid #FFC183',
      borderRadius: 2,
    }}>
      <p style={{
        margin: 0,
        fontSize: '1.125rem',
        fontStyle: 'italic',
        color: '#E8DDD0',
        lineHeight: 1.7,
      }}>
        {children}
      </p>
    </blockquote>
  )
}

export default function MoodPage() {
  return (
    <ShowcasePage
      title="Mood & Vision"
      description="Základ ze kterého vychází každé designové rozhodnutí — tvar, barva, animace i zvuk."
    >
      {/* Manifesto */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Quote>
          Donjon Fall není šachy. Je to bitva s osudem.
        </Quote>
        <p style={{ margin: 0, fontSize: '0.9375rem', color: '#9A9080', lineHeight: 1.75 }}>
          Hráč přichází pro strategii, ale zůstává pro momenty. Ten hod kostkou není mechanika —
          je to generál který ztrácí zásoby, posila která dorazila v poslední chvíli, věž která
          nevydržela. Hra musí být <strong style={{ color: '#C8BFAF' }}>čitelná okamžitě</strong> (15 minut,
          žádné zdržování), ale každý moment musí mít <strong style={{ color: '#C8BFAF' }}>váhu</strong>.
        </p>
      </section>

      {/* Design pillars */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{
          margin: 0,
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#6B6A82',
        }}>
          Tři designové pilíře
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Pillar title="Dramatičnost">
            Přechody, animace a stavy mají pocit filmového střihu, ne softwarového klikání.
            Hod kostkou je kulminace. Vítězný bod je scéna. UI reaguje jako by vědělo, co se děje.
          </Pillar>
          <Pillar title="Čitelnost pod tlakem">
            Barvy a hierarchie fungují i když hráč myslí na tah. Žádná informace nesmí
            vyžadovat pozornost navíc. Co je důležité, vyčnívá samo.
          </Pillar>
          <Pillar title="Středověká surovost s noblesou">
            Bojiště je živé a organické — tráva, půda, terén. Herní artefakty jsou opracované —
            tesaný kámen, odlitý kov, zlato jako odměna, ne dekorace. Dvě vrstvy jednoho světa.
          </Pillar>
        </div>
      </section>

      {/* Material language */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{
          margin: 0,
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#6B6A82',
        }}>
          Materiálový jazyk
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <MaterialBlock
            label="Herní pole"
            description="Tráva, půda, organické. Živé bojiště — surové, nedokonalé, skutečné. Textura zemí a terénů tvoří kontrast ke zpracovaným artefaktům."
            swatch="linear-gradient(135deg, #2D4A1E 0%, #1A3010 50%, #3A5C28 100%)"
          />
          <MaterialBlock
            label="Herní komponenty"
            description="Artefakty. Kostky jsou odlité z kovu, věže jsou tesaný kámen, UI prvky jsou okované dřevo nebo rytý kov. Věci které přežily bitvy."
            swatch="linear-gradient(135deg, #4A3C28 0%, #2A2218 50%, #FFC18330 100%)"
          />
        </div>
      </section>

      {/* Audience */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{
          margin: 0,
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#6B6A82',
        }}>
          Cílový hráč
        </p>
        <p style={{ margin: 0, fontSize: '0.9375rem', color: '#9A9080', lineHeight: 1.75 }}>
          Hráč který nevydrží u šachů — ne proto že by je neuměl, ale proto že mu chybí
          napětí a příběh. Chce strategii, ale chce i moment kdy se otočí ke spoluhráči
          a říká <em style={{ color: '#C8BFAF' }}>"nemůžeš věřit co se právě stalo"</em>.
          Hra trvá 15 minut. Bude jich hrát pět za sebou.
        </p>
      </section>

      {/* Reference */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{
          margin: 0,
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#6B6A82',
        }}>
          Reference
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 8,
        }}>
          {[
            { label: 'Guardians of the Galaxy', note: 'Blockbuster vizuál s neočekávanými emočními momenty' },
            { label: 'Šachy', note: 'Čistota pravidel a hloubka strategie — ale bez napětí z náhody' },
            { label: 'Kostky jako artefakty', note: 'Fyzická přítomnost herních komponent — váha, materiál, zvuk' },
            { label: 'Středověká bitevní mapa', note: 'Kreslená při loučích — organická, ne sterilní' },
          ].map(ref => (
            <div key={ref.label} style={{
              padding: '14px 16px',
              background: '#161524',
              border: '1px solid #2A2848',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: '#B8956A' }}>
                {ref.label}
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B6A82', lineHeight: 1.5 }}>
                {ref.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ShowcasePage>
  )
}
