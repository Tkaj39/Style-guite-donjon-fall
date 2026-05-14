import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Comparison row ── */
function CompRow({ bad, good, context }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3, overflow: 'hidden' }}>
      {context && (
        <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4870', letterSpacing: '0.06em', textTransform: 'uppercase', paddingLeft: 2 }}>{context}</p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        <div style={{ padding: '8px 12px', background: '#3D181820', border: '1px solid #C0404030' }}>
          <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#C04040', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Špatně</p>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F9CB3' }}>{bad}</p>
        </div>
        <div style={{ padding: '8px 12px', background: '#183D2020', border: '1px solid #40A05530' }}>
          <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#40A055', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ Dobře</p>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F0E6D3' }}>{good}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Tone chip ── */
function ToneChip({ label, example, color, bg }) {
  return (
    <div style={{ padding: '12px 14px', background: bg, border: `1px solid ${color}44`, borderRadius: 4, flex: 1, minWidth: 140 }}>
      <p style={{ margin: '0 0 4px', fontSize: '0.625rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F0E6D3', lineHeight: 1.4 }}>"{example}"</p>
    </div>
  )
}

export default function MicrocopyPage() {
  return (
    <ShowcasePage
      title="Content & Microcopy"
      description="Pravidla pro psaní textů v UI — tlačítka, labely, nápovědy, potvrzení, chyby. Dobrý microcopy mluví jazykem hráče, ne systému."
    >

      {/* Tón a hlas */}
      <Section
        id="ton"
        title="Tón a hlas"
        description="Donjon Fall UI mluví stručně, konkrétně a přátelsky. Tón se mění podle kontextu."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, width: '100%' }}>
            <ToneChip label="Herní"     example="Zahaj bitvu — výber protivníka."    color="#B8956A" bg="#2E2B50" />
            <ToneChip label="Neutrální" example="Hra se ukládá automaticky."         color="#4080C0" bg="#182A3D" />
            <ToneChip label="Úspěch"    example="Hra uložena. Můžeš pokračovat."    color="#40A055" bg="#183D20" />
            <ToneChip label="Chyba"     example="Tah se nepodařilo dokončit. Zkus to znovu." color="#C04040" bg="#3D1818" />
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-2">
          <p>✓ Herní kontext: smí být dramatičtější a používat herní terminologii (bitva, věž, hex).</p>
          <p>✓ Systémový kontext (uložení, chyba, síť): stručný, jasný, bez emocí.</p>
          <p>✗ Nikdy nemíchej tóny v jedné zprávě — "Epická chyba: síťový timeout" je špatně.</p>
        </div>
      </Section>

      {/* Tlačítka */}
      <Section
        id="tlacitka"
        title="Text tlačítek"
        description="Tlačítko = akce. Text musí popisovat co se stane — ne stav systému."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 560 }}>
            <CompRow context="Primární akce" bad="OK"             good="Zahájit hru" />
            <CompRow context="Potvrzení"     bad="Ano"            good="Smazat hru" />
            <CompRow context="Zrušení"       bad="Ne"             good="Ponechat" />
            <CompRow context="Odeslání"      bad="Submit"         good="Uložit nastavení" />
            <CompRow context="Pokračování"   bad="Další"          good="Vybrat mapu →" />
            <CompRow context="Stav načítání" bad="Načítání…"     good="Ukládám…" />
            <CompRow context="Destruktivní"  bad="Delete"         good="Smazat rozehranou hru" />
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-2">
          <p>✓ Sloveso + objekt: "Zahájit hru", "Uložit nastavení", "Smazat tah".</p>
          <p>✓ Loading stav tlačítka: přítomný čas průběhový — "Ukládám…", "Načítám…".</p>
          <p>✗ Vyhni se: OK, Ano, Ne, Submit, Next — jsou sémanticky prázdné.</p>
          <p>✗ Destruktivní akce: tlačítko musí pojmenovat co se smaže — ne jen "Smazat".</p>
        </div>
      </Section>

      {/* Labely */}
      <Section
        id="labely"
        title="Labely polí a tooltipů"
        description="Label popisuje co pole obsahuje — ne co s ním uživatel dělá."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 560 }}>
            <CompRow context="Input label"      bad="Zadejte jméno hráče"  good="Jméno hráče" />
            <CompRow context="Input label"      bad="Vyberte mapu hry"     good="Mapa" />
            <CompRow context="Placeholder"      bad="Jméno"                good="např. Rytíř17" />
            <CompRow context="Tooltip"          bad="Click to see more"    good="Zobrazit historii tahů (H)" />
            <CompRow context="Checkbox"         bad="Zapnout/Vypnout"      good="Zobrazit mřížku hexů" />
            <CompRow context="Toggle label"     bad="Hudba on/off"         good="Hudba na pozadí" />
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-2">
          <p>✓ Label: podstatné jméno nebo substantivní fráze — "Jméno hráče", ne "Zadejte jméno".</p>
          <p>✓ Placeholder: příklad nebo hint — "např. Rytíř17", ne opakování labelu.</p>
          <p>✓ Tooltip: popis akce + klávesová zkratka v závorce kde existuje.</p>
        </div>
      </Section>

      {/* Potvrzovací dialogy */}
      <Section
        id="potvrzeni"
        title="Potvrzovací dialogy"
        description="Destruktivní akce musí pojmenovat přesně co se stane — ne jen 'Opravdu chceš smazat?'"
      >
        <Preview>
          <div style={{ maxWidth: 360, width: '100%' }}>
            {/* Správný dialog */}
            <div style={{ padding: '20px', background: '#1E1C3A', border: '1px solid #C0404040', borderRadius: 4 }}>
              <p style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700, color: '#F0E6D3' }}>Smazat rozehranou hru?</p>
              <p style={{ margin: '0 0 16px', fontSize: '0.8125rem', color: '#8F9CB3', lineHeight: 1.5 }}>
                Hra <strong style={{ color: '#F0E6D3' }}>Bitva u severní pevnosti</strong> bude trvale smazána.
                Postup v kole 3 bude ztracen a nelze ho obnovit.
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <div style={{ padding: '6px 14px', background: '#1A1830', border: '1px solid #8F745440', borderRadius: 2, fontSize: '0.8125rem', color: '#B8956A', cursor: 'pointer' }}>
                  Ponechat hru
                </div>
                <div style={{ padding: '6px 14px', background: '#C0404020', border: '1px solid #C04040', borderRadius: 2, fontSize: '0.8125rem', color: '#C04040', cursor: 'pointer', fontWeight: 700 }}>
                  Smazat hru
                </div>
              </div>
            </div>
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-2">
          <p>✓ Nadpis = akce + objekt: "Smazat rozehranou hru?", ne "Opravdu?"</p>
          <p>✓ Tělo = konkrétní důsledek: co se smaže, jestli lze obnovit, co se ztratí.</p>
          <p>✓ Tlačítka: primární = destruktivní akce s plným názvem, sekundární = zachovávající akce ("Ponechat", ne "Zrušit").</p>
          <p>✗ Vyhni se: "Opravdu chceš smazat?", "Tato akce je nevratná." bez konkrétního objektu.</p>
        </div>
      </Section>

      {/* Prázdné stavy — microcopy */}
      <Section
        id="empty-copy"
        title="Microcopy pro prázdné stavy"
        description="Prázdný stav je příležitost — microcopy musí navést uživatele, ne konstatovat absenci."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 560 }}>
            <CompRow context="Žádné hry"      bad="Empty game list."               good="Zatím tu nic není — zahaj první partii." />
            <CompRow context="Žádné výsledky" bad="No results found."              good="Žádná mapa neodpovídá. Zkus jiný název." />
            <CompRow context="Log prázdný"    bad="No turn history."               good="Historie tahů se zobrazí po prvním tahu." />
            <CompRow context="Onboarding"     bad="You have no saved games yet."   good="Připrav se na souboj — vyber mapu a zahaj první hru." />
          </div>
        </Preview>
      </Section>

      {/* Číslice a formáty */}
      <Section
        id="formaty"
        title="Číslice, formáty a jednotky"
        description="Konzistentní formátování čísel a jednotek v herním UI."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { type: 'Vítězné body',   format: '5 VP', note: 'Vždy s mezerou před VP' },
              { type: 'Počet hexů',     format: '61 h.', note: 'Zkratka h. — ne hex, hexes ani hexů' },
              { type: 'Počet hráčů',   format: '2–4 hráči', note: 'Rozsah s en-dash (–), ne pomlčkou (-)' },
              { type: 'Kolo',          format: 'Kolo 3 / 10', note: 'Aktuální / celkový — ne "Round 3 of 10"' },
              { type: 'Čas (odpočet)', format: '1:42', note: 'MM:SS — bez nul před minutami pod 10' },
              { type: 'Procenta',      format: '67 %', note: 'Mezera před % (česká typografie)' },
            ].map(({ type, format, note }) => (
              <div key={type} style={{ display: 'grid', gridTemplateColumns: '130px 90px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{type}</span>
                <code style={{ fontSize: '0.875rem', fontWeight: 700, color: '#B8956A' }}>{format}</code>
                <span style={{ fontSize: '0.75rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Herní terminologie */}
      <Section
        id="terminologie"
        title="Herní terminologie"
        description="Konzistentní pojmy napříč celým UI — hráč nesmí vidět stejnou věc pod dvěma různými jmény."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { term: 'Hex',         use: 'Pole na mapě',              avoid: 'Hexagon, políčko, dlaždice' },
              { term: 'Věž',         use: 'Sloupec kostek hráče',      avoid: 'Stack, tower, sloupec' },
              { term: 'Kostka',      use: 'Jedna herní kostka',        avoid: 'Piece, kámen, díl' },
              { term: 'Tah',         use: 'Jedna akce hráče',          avoid: 'Krok, move, turn (v češtině)' },
              { term: 'Kolo',        use: 'Jeden cyklus všech hráčů',  avoid: 'Round (v češtině), část' },
              { term: 'VP / Vítězné body', use: 'Herní skóre',        avoid: 'Body, score, pts' },
              { term: 'Ohnisko',     use: 'Zvláštní hex na mapě',      avoid: 'Focus point, cíl, bod' },
            ].map(({ term, use, avoid }) => (
              <div key={term} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'start' }}>
                <code style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#B8956A' }}>{term}</code>
                <span style={{ fontSize: '0.75rem', color: '#40A055', lineHeight: 1.4 }}>✓ {use}</span>
                <span style={{ fontSize: '0.75rem', color: '#C04040', lineHeight: 1.4 }}>✗ {avoid}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Psát česky — UI je primárně česky, anglické výrazy jen kde jsou standardní (VP, OK).</p>
          <p>✓ Tlačítko = sloveso + objekt. Label = podstatné jméno. Tooltip = co dělá + zkratka.</p>
          <p>✓ Destruktivní akce musí pojmenovat objekt — ne jen "Smazat" nebo "Ano".</p>
          <p>✓ Herní tón smí být dramatičtější — systémový tón musí být stručný a faktický.</p>
          <p>✗ Neopakuj label v placeholderu — placeholder je příklad nebo hint.</p>
          <p>✗ Nepřekládej anglické systémové chybové zprávy doslova — parafrázuj lidsky.</p>
          <p>✗ Nepoužívej pasivní konstrukce — "Hra byla smazána" → "Hra smazána ✓".</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
