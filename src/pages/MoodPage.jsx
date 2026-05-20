import { useLibVariant, ShowcasePage, Section } from '../styleguide/ShowcasePage'

/* ══════════════════════════════════════════════════════════════════════════
   TkajUI — Mood & Vision
   ══════════════════════════════════════════════════════════════════════════ */

function TkajuiPillar({ title, children }) {
  return (
    <div style={{ borderLeft: '2px solid #6576ff', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', color: '#6576ff' }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: '0.9375rem', color: '#8888a8', lineHeight: 1.65 }}>
        {children}
      </p>
    </div>
  )
}

function TkajuiPrinciple({ icon, title, children }) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '18px 20px', background: '#1b1b27', border: '1px solid #35354a', borderRadius: 6 }}>
      <span style={{ fontSize: '1.25rem', flexShrink: 0, lineHeight: 1 }}>{icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: '#eeeef8' }}>{title}</p>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8888a8', lineHeight: 1.6 }}>{children}</p>
      </div>
    </div>
  )
}

function TkajuiContent() {
  return (
    <>
      <Section id="manifesto">
        <blockquote style={{ margin: 0, padding: '20px 28px', background: '#13131c', borderLeft: '3px solid #6576ff', borderRadius: 4 }}>
          <p style={{ margin: 0, fontSize: '1.125rem', fontStyle: 'italic', color: '#eeeef8', lineHeight: 1.7 }}>
            Dobrá komponenta je ta, na kterou uživatel nemyslí.
          </p>
        </blockquote>
        <p style={{ margin: 0, fontSize: '0.9375rem', color: '#4c4c68', lineHeight: 1.75 }}>
          TkajUI je obecná UI knihovna bez kontextu a bez příběhu. Neobsahuje téma —
          poskytuje <strong style={{ color: '#8888a8' }}>stavební kameny</strong> pro produkty, které si příběh
          teprve budují. Každá komponenta musí fungovat v dashboardu, e-shopu i interní aplikaci.
          Pokud design volání o pozornost, selhal.
        </p>
      </Section>

      <Section id="pilire" title="Tři pilíře">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TkajuiPillar title="Neviditelnost">
            Komponenta se podřídí obsahu. Barvy, tvary i animace nesmí volat po pozornosti —
            přenáší informaci, ne estetiku. Uživatel si pamatuje co udělal, ne jak tlačítko vypadalo.
          </TkajuiPillar>
          <TkajuiPillar title="Předvídatelnost">
            Stejný vstup, stejný výstup, vždy. Hover je vždy hover, focus je vždy focus,
            disabled je vždy disabled. Žádné překvapivé stavy, žádné kontextové výjimky.
            Uživatel naučený jednu komponentu zvládne všechny.
          </TkajuiPillar>
          <TkajuiPillar title="Kompozice nad konfigurací">
            Místo jedné monstrózní komponenty s 30 props — malé, ortogonální primitive které se skládají.
            Button je Button. Ikonu a loading přidáš ty, ne defaultní prop.
            Složitost patří do produktu, ne do knihovny.
          </TkajuiPillar>
        </div>
      </Section>

      <Section id="co-tkajui-neni" title="Co TkajUI není">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
          <TkajuiPrinciple icon="🚫" title="Není téma">
            TkajUI nedodává „vibe". Chladné slate barvy a modrý akcent záměrně nic neříkají —
            nechávají prostor pro brand vrstvy nad nimi.
          </TkajuiPrinciple>
          <TkajuiPrinciple icon="🚫" title="Není design system">
            Je to komponentová knihovna. Spacing tokeny, grid systém a brand guidelines si
            každý produkt definuje sám.
          </TkajuiPrinciple>
          <TkajuiPrinciple icon="🚫" title="Není donjon-fall-ui">
            donjon-fall-ui rozšiřuje TkajUI o herní témata, dramatické efekty a středověkou estetiku.
            TkajUI samo žádný kontext nemá.
          </TkajuiPrinciple>
          <TkajuiPrinciple icon="✓" title="Je to základ">
            Solidní, přístupné, testované primitive. oktagonální tvar je jediná výraznější
            vizuální volba — vše ostatní je čistá funkce.
          </TkajuiPrinciple>
        </div>
      </Section>

      <Section id="reference" title="Reference">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
          {[
            { label: 'Radix UI',     note: 'Bezstylistické primitive — přístupnost first, vizuál po tobě' },
            { label: 'shadcn/ui',    note: 'Komponenty které vlastníš — žádná černá skříňka' },
            { label: 'Linear app',   note: 'Hustota informací bez vizuálního chaosu' },
            { label: 'Notion',       note: 'UI které zmizí za obsahem — nic nepřekáží' },
          ].map(ref => (
            <div key={ref.label} style={{ padding: '14px 16px', background: '#13131c', border: '1px solid #1b1b27', borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: '#6576ff' }}>{ref.label}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#4c4c68', lineHeight: 1.5 }}>{ref.note}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   donjon-fall-ui — Mood & Vision (původní obsah)
   ══════════════════════════════════════════════════════════════════════════ */

function DonjonPillar({ title, children }) {
  return (
    <div style={{ borderLeft: `2px solid ${goldDim}`, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: gold }}>
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
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 24px', background: 'linear-gradient(150deg,#1E1C30 0%,#171626 100%)', border: '1px solid #353751', borderRadius: 2 }}>
      <div style={{ width: 52, height: 52, flexShrink: 0, background: swatch, borderRadius: 2, border: '1px solid #8F745840' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: goldMid }}>{label}</p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: goldDim, lineHeight: 1.6 }}>{description}</p>
      </div>
    </div>
  )
}

function DonjonContent() {
  return (
    <>
      <Section id="manifesto-donjon">
        <blockquote style={{ margin: 0, padding: '24px 32px', background: 'linear-gradient(150deg,#252340 0%,borderSubtle 100%)', borderLeft: `3px solid ${gold}`, borderRadius: 2 }}>
          <p style={{ margin: 0, fontSize: '1.125rem', fontStyle: 'italic', color: '#E8DDD0', lineHeight: 1.7 }}>
            Donjon Fall není šachy. Je to bitva s osudem.
          </p>
        </blockquote>
        <p style={{ margin: 0, fontSize: '0.9375rem', color: '#9A9080', lineHeight: 1.75 }}>
          Hráč přichází pro strategii, ale zůstává pro momenty. Ten hod kostkou není mechanika —
          je to generál který ztrácí zásoby, posila která dorazila v poslední chvíli, věž která
          nevydržela. Hra musí být <strong style={{ color: '#C8BFAF' }}>čitelná okamžitě</strong> (15 minut,
          žádné zdržování), ale každý moment musí mít <strong style={{ color: '#C8BFAF' }}>váhu</strong>.
        </p>
      </Section>

      <Section id="dramaticnost" title="Tři designové pilíře">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <DonjonPillar title="Dramatičnost">
            Přechody, animace a stavy mají pocit filmového střihu, ne softwarového klikání.
            Hod kostkou je kulminace. Vítězný bod je scéna. UI reaguje jako by vědělo, co se děje.
          </DonjonPillar>
          <DonjonPillar title="Čitelnost pod tlakem">
            Barvy a hierarchie fungují i když hráč myslí na tah. Žádná informace nesmí
            vyžadovat pozornost navíc. Co je důležité, vyčnívá samo.
          </DonjonPillar>
          <DonjonPillar title="Středověká surovost s noblesou">
            Bojiště je živé a organické — tráva, půda, terén. Herní artefakty jsou opracované —
            tesaný kámen, odlitý kov, zlato jako odměna, ne dekorace. Dvě vrstvy jednoho světa.
          </DonjonPillar>
        </div>
      </Section>

      <Section id="materialovy-jazyk" title="Materiálový jazyk">
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
      </Section>

      <Section id="cilovy-hrac" title="Cílový hráč">
        <p style={{ margin: 0, fontSize: '0.9375rem', color: '#9A9080', lineHeight: 1.75 }}>
          Hráč který nevydrží u šachů — ne proto že by je neuměl, ale proto že mu chybí
          napětí a příběh. Chce strategii, ale chce i moment kdy se otočí ke spoluhráči
          a říká <em style={{ color: '#C8BFAF' }}>"nemůžeš věřit co se právě stalo"</em>.
          Hra trvá 15 minut. Bude jich hrát pět za sebou.
        </p>
      </Section>

      <Section id="reference-donjon" title="Reference">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
          {[
            { label: 'Guardians of the Galaxy', note: 'Blockbuster vizuál s neočekávanými emočními momenty' },
            { label: 'Šachy',                   note: 'Čistota pravidel a hloubka strategie — ale bez napětí z náhody' },
            { label: 'Kostky jako artefakty',   note: 'Fyzická přítomnost herních komponent — váha, materiál, zvuk' },
            { label: 'Středověká bitevní mapa',  note: 'Kreslená při loučích — organická, ne sterilní' },
          ].map(ref => (
            <div key={ref.label} style={{ padding: '14px 16px', background: '#161524', border: '1px solid #2A2848', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: goldMid }}>{ref.label}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B6A82', lineHeight: 1.5 }}>{ref.note}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Stránka
   ══════════════════════════════════════════════════════════════════════════ */

function MoodContent() {
  const lib = useLibVariant()
  return lib === 'donjon' ? <DonjonContent /> : <TkajuiContent />
}

export default function MoodPage() {
  return (
    <ShowcasePage
      title="Mood & Vision"
      description="Filozofie a záměr každé knihovny — odkud vychází každé designové rozhodnutí."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <MoodContent />
    </ShowcasePage>
  )
}