import { useState } from 'react'
import Select from '../components/Select'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const MAPS = [
  { value: 'default',  label: 'Default mapa' },
  { value: 'frozen',   label: 'Ledová tundra' },
  { value: 'volcanic', label: 'Sopečné pole' },
  { value: 'ancient',  label: 'Prastaré ruiny' },
  { value: 'coastal',  label: 'Pobřežní pevnost' },
]

const LANGS = [
  { value: 'cs', label: 'Čeština' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Français', disabled: true },
  { value: 'pl', label: 'Polski',   disabled: true },
]

const QUALITY = [
  { value: 'low',    label: 'Nízká — 30 FPS' },
  { value: 'medium', label: 'Střední — 60 FPS' },
  { value: 'high',   label: 'Vysoká — 120 FPS' },
  { value: 'ultra',  label: 'Ultra — neomezeno' },
]

function Demo({ options, placeholder, ...props }) {
  const [value, setValue] = useState(null)
  return <Select value={value} onChange={setValue} options={options} placeholder={placeholder} {...props} />
}

export default function SelectPage() {
  const [map, setMap]  = useState('default')
  const [lang, setLang] = useState('cs')

  return (
    <ShowcasePage
      title="Select"
      description="Vlastní dropdown pro výběr jedné hodnoty ze seznamu. Oktagonální trigger navazuje na DonjonInput. Klávesnicová navigace šipkami, Escape a Enter."
      componentSlug="select"
    >

      {/* Základní */}
      <Section
        id="basic"
        title="Základní"
        description="Výchozí podoba — placeholder, volba a potvrzení."
      >
        <Preview>
          <div style={{ width: 240 }}>
            <Demo options={MAPS} placeholder="Vyber mapu…" />
          </div>
        </Preview>
        <CodeBlock code={`const [value, setValue] = useState(null)

<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'default',  label: 'Default mapa' },
    { value: 'frozen',   label: 'Ledová tundra' },
    { value: 'volcanic', label: 'Sopečné pole' },
  ]}
  placeholder="Vyber mapu…"
/>`} />
      </Section>

      {/* S labelem */}
      <Section
        id="label"
        title="S popiskem"
        description="Prop label zobrazí popisek nad triggerem a slouží jako aria-label pro seznam."
      >
        <Preview>
          <div style={{ width: 260 }}>
            <Select value={map} onChange={setMap} options={MAPS} label="Výběr mapy" />
          </div>
          <div style={{ width: 220 }}>
            <Select value={lang} onChange={setLang} options={LANGS} label="Jazyk rozhraní" />
          </div>
        </Preview>
        <CodeBlock code={`<Select
  value={value}
  onChange={setValue}
  options={langOptions}
  label="Jazyk rozhraní"
/>`} />
      </Section>

      {/* Varianty */}
      <Section
        id="variants"
        title="Varianty"
        description="Čtyři sémantické varianty ovlivní barvu borderu a hover stavu."
      >
        <Preview>
          {[
            { variant: 'default', placeholder: 'Default…'  },
            { variant: 'success', placeholder: 'Success…'  },
            { variant: 'danger',  placeholder: 'Danger…'   },
            { variant: 'warning', placeholder: 'Warning…'  },
          ].map(({ variant, placeholder }) => (
            <div key={variant} style={{ width: 180 }}>
              <Demo options={MAPS} variant={variant} placeholder={placeholder} />
            </div>
          ))}
        </Preview>
        <CodeBlock code={`<Select variant="danger"  options={…} value={v} onChange={set} />
<Select variant="success" options={…} value={v} onChange={set} />`} />
      </Section>

      {/* Velikosti */}
      <Section
        id="sizes"
        title="Velikosti"
        description="Tři výšky triggeru — sm (30 px), md (36 px, výchozí), lg (44 px)."
      >
        <Preview>
          {(['sm', 'md', 'lg'] ).map(size => (
            <div key={size} style={{ width: 200 }}>
              <Demo options={MAPS} size={size} placeholder={`${size.toUpperCase()} — vyber…`} />
            </div>
          ))}
        </Preview>
        <CodeBlock code={`<Select size="sm" options={…} value={v} onChange={set} />
<Select size="md" options={…} value={v} onChange={set} />
<Select size="lg" options={…} value={v} onChange={set} />`} />
      </Section>

      {/* Disabled položky */}
      <Section
        id="disabled-options"
        title="Nedostupné položky"
        description="Jednotlivé položky mohou mít disabled: true — zobrazí se vyšedlé a nelze je vybrat."
      >
        <Preview>
          <div style={{ width: 240 }}>
            <Select value={lang} onChange={setLang} options={LANGS} label="Jazyk (FR a PL zatím nepodporováno)" />
          </div>
        </Preview>
        <CodeBlock code={`const options = [
  { value: 'cs', label: 'Čeština' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français', disabled: true },
]`} />
      </Section>

      {/* Disabled celý */}
      <Section
        id="disabled"
        title="Disabled"
        description="Prop disabled zakáže celý select."
      >
        <Preview>
          <div style={{ width: 240 }}>
            <Select value="default" options={MAPS} label="Mapa (uzamčeno)" disabled />
          </div>
        </Preview>
        <CodeBlock code={`<Select disabled value="default" options={…} />`} />
      </Section>

      {/* Grafika — praktický příklad */}
      <Section
        id="game-settings"
        title="Herní nastavení — příklad"
        description="Kombinace více Select komponent v settings layoutu."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 300 }}>
            <Select value={map}  onChange={setMap}  options={MAPS}    label="Mapa" />
            <Select value={lang} onChange={setLang} options={LANGS}   label="Jazyk" />
            <Demo options={QUALITY} label="Kvalita grafiky" placeholder="Vyber kvalitu…" />
          </div>
        </Preview>
        <CodeBlock code={`<Select value={map}     onChange={setMap}     options={mapOptions}     label="Mapa" />
<Select value={lang}    onChange={setLang}    options={langOptions}    label="Jazyk" />
<Select value={quality} onChange={setQuality} options={qualityOptions} label="Kvalita grafiky" />`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Použij Select místo ButtonGroup pokud máš více než ~4 možnosti nebo jsou labely delší.</p>
          <p>✓ Vždy přidej label — zvyšuje přístupnost a přehlednost formuláře.</p>
          <p>✓ Disabled položky zobrazuj jen pokud je uživateli jasné proč — jinak je raději neuvádět.</p>
          <p>✗ Nepoužívej Select pro binární volbu (ano/ne) — tam patří Toggle nebo ButtonGroup.</p>
          <p>✗ Nepoužívej Select pokud potřebuješ multi-select — to je jiná komponenta.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
