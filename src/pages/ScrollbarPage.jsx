import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Live scrollbar demo ── */
function ScrollDemo({ label, className, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>{label}</p>
      <div
        className={className}
        style={{
          height: 160, width: 220,
          overflowY: 'scroll',
          background: '#12102A',
          border: '1px solid #8F745430',
          borderRadius: 4,
          padding: '8px 12px',
          ...style,
        }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <p key={i} style={{ margin: '0 0 6px', fontSize: '0.8125rem', color: '#8F9CB3' }}>
            Řádek {i + 1} — obsah seznamu
          </p>
        ))}
      </div>
    </div>
  )
}

export default function ScrollbarPage() {
  return (
    <ShowcasePage
      title="Scrollbar Styling"
      description="Vlastní scrollbar odpovídá tmavé paletě Donjon Fall. Webkit scrollbar API + scrollbar-width pro Firefox."
    >

      {/* Live ukázky */}
      <Section
        id="ukazky"
        title="Ukázky scrollbarů"
        description="Poskoč po obsahu boxů — scrollbar je viditelný při scrollování."
      >
        <Preview>
          <ScrollDemo
            label="Donjon scrollbar (výchozí)"
            className="donjon-scrollbar"
          />
          <ScrollDemo
            label="Tenký scrollbar (sidebar)"
            className="donjon-scrollbar-thin"
          />
          <ScrollDemo
            label="Browser default"
            style={{}}
          />
        </Preview>
        <style>{`
          /* Donjon scrollbar — výchozí */
          .donjon-scrollbar::-webkit-scrollbar        { width: 6px; }
          .donjon-scrollbar::-webkit-scrollbar-track  { background: #0E0C22; border-radius: 3px; }
          .donjon-scrollbar::-webkit-scrollbar-thumb  { background: #8F745460; border-radius: 3px; }
          .donjon-scrollbar::-webkit-scrollbar-thumb:hover { background: #B8956A; }
          .donjon-scrollbar { scrollbar-width: thin; scrollbar-color: #8F745460 #0E0C22; }

          /* Tenký (sidebar) */
          .donjon-scrollbar-thin::-webkit-scrollbar        { width: 4px; }
          .donjon-scrollbar-thin::-webkit-scrollbar-track  { background: transparent; }
          .donjon-scrollbar-thin::-webkit-scrollbar-thumb  { background: #8F745440; border-radius: 2px; }
          .donjon-scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #8F7458; }
          .donjon-scrollbar-thin { scrollbar-width: thin; scrollbar-color: #8F745440 transparent; }
        `}</style>
      </Section>

      {/* CSS kód */}
      <Section
        id="kod"
        title="CSS implementace"
        description="Dvě varianty — výchozí (6px, zlatý hover) a tenká pro sidebar/panel (4px)."
      >
        <CodeBlock code={`/* ── Donjon scrollbar — výchozí (6px) ── */
.donjon-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.donjon-scrollbar::-webkit-scrollbar-track {
  background: #0E0C22;
  border-radius: 3px;
}
.donjon-scrollbar::-webkit-scrollbar-thumb {
  background: #8F745460;
  border-radius: 3px;
}
.donjon-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #B8956A;
  transition: background 0.15s;
}

/* Firefox */
.donjon-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #8F745460 #0E0C22;
}

/* ── Tenký scrollbar — sidebar, panel (4px) ── */
.donjon-scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.donjon-scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.donjon-scrollbar-thin::-webkit-scrollbar-thumb {
  background: #8F745440;
  border-radius: 2px;
}
.donjon-scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #8F7458;
}
.donjon-scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #8F745440 transparent;
}

/* ── Skrytý scrollbar (funkční scroll bez visuals) ── */
.scroll-hidden {
  scrollbar-width: none;
}
.scroll-hidden::-webkit-scrollbar {
  display: none;
}`} />
      </Section>

      {/* Kde se používá */}
      <Section
        id="pouziti"
        title="Kde se scrollbar používá"
        description="Mapování variant na konkrétní místa v aplikaci."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { place: 'Sidebar navigace',        variant: 'donjon-scrollbar-thin', note: 'Tenký, přesný výběr položky — minimální rušení' },
              { place: 'Dropdown listbox',        variant: 'donjon-scrollbar-thin', note: 'Tenký — dropdown je malý kontext' },
              { place: 'Modal s dlouhým obsahem', variant: 'donjon-scrollbar',      note: 'Výchozí — modal je velký kontext' },
              { place: 'Karet / seznam stránky',  variant: 'donjon-scrollbar',      note: 'Výchozí — hlavní obsahová oblast' },
              { place: 'Carousel / tab pane',     variant: 'scroll-hidden',         note: 'Skrytý — navigace je vlastní (arrow tlačítka)' },
              { place: 'Herní log / history',     variant: 'donjon-scrollbar-thin', note: 'Tenký — log je doplňkový, ne primární' },
              { place: 'Toast kontejner',         variant: 'scroll-hidden',         note: 'Toasty nepoužívají scroll — limituj počet' },
            ].map(({ place, variant, note }) => (
              <div key={place} style={{ display: 'grid', gridTemplateColumns: '200px 160px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{place}</span>
                <code style={{ fontSize: '0.75rem', color: '#B8956A' }}>{variant}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Scroll behavior */}
      <Section
        id="scroll-behavior"
        title="Scroll behavior"
        description="Plynulé scrollování pro anchor navigaci — ale ne pro programmatické scrolly při chybách."
      >
        <CodeBlock code={`/* Plynulé scrollování pro anchor linky (sidebar → sekce) */
html {
  scroll-behavior: smooth;
}

/* Respektuj prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Programmatický scroll — vždy explicitně uveď behavior */
element.scrollIntoView({ behavior: 'smooth', block: 'center' }) // sidebar navigace
element.scrollIntoView({ behavior: 'auto',   block: 'center' }) // error focus — okamžitý

/* scroll-padding-top pro sticky header / sidebar výřez */
html {
  scroll-padding-top: 80px; /* výška sticky headeru */
}`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy přidej scrollbar styling na scrollovatelné kontejnery — browser default je vizuálně nesourodý.</p>
          <p>✓ Sidebar a dropdown: tenká varianta (4px). Hlavní obsah a modal: výchozí (6px).</p>
          <p>✓ Webkit + Firefox: vždy oba — <code className="text-neutral-300">::-webkit-scrollbar</code> + <code className="text-neutral-300">scrollbar-width/color</code>.</p>
          <p>✓ Skrytý scrollbar (<code className="text-neutral-300">scrollbar-width: none</code>) jen tam kde existuje alternativní navigace.</p>
          <p>✗ Nepoužívej <code className="text-neutral-300">overflow: hidden</code> na zamezení scroll — odstraní accessibility. Raději <code className="text-neutral-300">scroll-hidden</code> třídu.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
