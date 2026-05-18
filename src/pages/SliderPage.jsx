import { useState } from 'react'
import Slider from '../lib/tkajui/Slider'
import DonjonSlider from '../lib/donjon/DonjonSlider'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../components/layout/ShowcasePage'

function SliderContent() {
  const lib = useLibVariant()
  const Sl  = lib === 'tkajui' ? Slider : DonjonSlider
  const cmp = lib === 'tkajui' ? 'Slider' : 'DonjonSlider'

  const [vol, setVol] = useState(70)
  const [sfx, setSfx] = useState(85)
  const [msc, setMsc] = useState(40)

  function Demo({ initial = 50, ...props }) {
    const [value, setValue] = useState(initial)
    return <Sl value={value} onChange={setValue} {...props} />
  }

  return (
    <>
      {/* Základní */}
      <Section
        id="basic"
        title="Základní"
        description="Výchozí slider s popiskem a zobrazením aktuální hodnoty."
      >
        <Preview>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Demo label="Hlasitost" showValue initial={60} />
          </div>
        </Preview>
        <CodeBlock code={`const [value, setValue] = useState(60)

<${cmp} value={value} onChange={setValue} label="Hlasitost" showValue />`} />
      </Section>

      {/* Varianty */}
      <Section
        id="variants"
        title="Varianty"
        description="Pět barevných variant — stejná paleta jako ProgressBar."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 360 }}>
            {[
              { variant: 'default', label: 'Default',  initial: 70 },
              { variant: 'success', label: 'Success',  initial: 85 },
              { variant: 'danger',  label: 'Danger',   initial: 20 },
              { variant: 'warning', label: 'Warning',  initial: 55 },
              { variant: 'info',    label: 'Info',     initial: 65 },
            ].map(({ variant, label, initial }) => (
              <Demo key={variant} variant={variant} label={label} showValue initial={initial} />
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} value={v} onChange={set} variant="success" label="HP" showValue />
<${cmp} value={v} onChange={set} variant="danger"  label="Damage" showValue />`} />
      </Section>

      {/* Velikosti */}
      <Section
        id="sizes"
        title="Velikosti"
        description="Tři výšky traku — sm (4 px), md (6 px, výchozí), lg (10 px)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 360 }}>
            <Demo size="sm" label="Small"  initial={65} showValue />
            <Demo size="md" label="Medium" initial={65} showValue />
            <Demo size="lg" label="Large"  initial={65} showValue />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} size="sm" value={v} onChange={set} />
<${cmp} size="md" value={v} onChange={set} />
<${cmp} size="lg" value={v} onChange={set} />`} />
      </Section>

      {/* Vlastní rozsah a krok */}
      <Section
        id="range-step"
        title="Vlastní rozsah a krok"
        description="Props min, max, step a formatValue pro libovolné hodnoty."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 360 }}>
            <Demo
              label="Počet hráčů"
              min={2} max={6} step={1}
              initial={3}
              showValue
              formatValue={v => `${v} hráči`}
              variant="info"
            />
            <Demo
              label="Rychlost hry"
              min={0.5} max={3} step={0.5}
              initial={1}
              showValue
              formatValue={v => `${v}×`}
              variant="warning"
            />
            <Demo
              label="Cílové VP"
              min={3} max={10} step={1}
              initial={5}
              showValue
              formatValue={v => `${v} VP`}
              variant="default"
            />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp}
  min={2} max={6} step={1}
  value={players} onChange={setPlayers}
  label="Počet hráčů"
  formatValue={v => \`\${v} hráči\`}
  showValue
/>`} />
      </Section>

      {/* Audio nastavení */}
      <Section
        id="audio-settings"
        title="Audio nastavení — příklad"
        description="Typické herní nastavení zvuku se třemi slidery."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 340 }}>
            <Sl value={vol} onChange={setVol} label="Celková hlasitost" showValue formatValue={v => `${v} %`} />
            <Sl value={sfx} onChange={setSfx} label="Zvukové efekty"    showValue formatValue={v => `${v} %`} variant="info" />
            <Sl value={msc} onChange={setMsc} label="Hudba"             showValue formatValue={v => `${v} %`} variant="warning" />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} value={vol} onChange={setVol} label="Celková hlasitost" showValue formatValue={v => \`\${v} %\`} />
<${cmp} value={sfx} onChange={setSfx} label="Zvukové efekty"    showValue variant="info" />
<${cmp} value={msc} onChange={setMsc} label="Hudba"             showValue variant="warning" />`} />
      </Section>

      {/* Disabled */}
      <Section
        id="disabled"
        title="Disabled"
        description="Prop disabled znepřístupní slider a vizuálně ho zesvětlí."
      >
        <Preview>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Sl value={60} label="Uzamčená hodnota" showValue disabled />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} value={60} label="Uzamčeno" disabled />`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Použij Slider pro průběžné hodnoty (hlasitost, jas) kde přesné číslo není kritické.</p>
          <p>✓ Vždy zobraz aktuální hodnotu (showValue) — uživatel potřebuje zpětnou vazbu.</p>
          <p>✓ formatValue použij pro hodnoty s jednotkami (%, dB, × apod.).</p>
          <p>✓ Pro přesné hodnoty (počet hráčů, VP) nastav step na celé číslo.</p>
          <p>✗ Nepoužívej Slider pro binární přepínání — na to je Toggle.</p>
          <p>✗ Nepoužívej Slider pro hodnoty z diskrétní množiny (jazyk, mapa) — na to je Select.</p>
        </div>
      </Section>
    </>
  )
}

export default function SliderPage() {
  return (
    <ShowcasePage
      title="Slider"
      description="Táhlo pro výběr hodnoty v rozsahu. Nativní <input type=range> zajišťuje drag a klávesnicové ovládání; vlastní vizuál navazuje na ProgressBar."
      componentSlugs={['donjon-slider', 'slider']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <SliderContent />
    </ShowcasePage>
  )
}
