import { useState } from 'react'
import Toggle from '../components/Toggle'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Controlled wrapper ── */
function Demo({ initial = false, ...props }) {
  const [checked, setChecked] = useState(initial)
  return <Toggle checked={checked} onChange={setChecked} {...props} />
}

/* ── Skupinová sekce (settings-like) ── */
function SettingsGroup({ items }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(items.map(item => [item.key, item.initial ?? false]))
  )
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      border: '1px solid #8F745430',
      borderRadius: 6,
      overflow: 'hidden',
      minWidth: 280,
    }}>
      {items.map((item, i) => (
        <div
          key={item.key}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            background: i % 2 === 0 ? '#1A183020' : 'transparent',
            borderBottom: i < items.length - 1 ? '1px solid #8F745420' : 'none',
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F0E6D3' }}>{item.label}</p>
            {item.hint && (
              <p style={{ margin: '2px 0 0', fontSize: '0.6875rem', color: '#8F9CB3' }}>{item.hint}</p>
            )}
          </div>
          <Toggle
            checked={values[item.key]}
            onChange={val => setValues(prev => ({ ...prev, [item.key]: val }))}
            variant={item.variant ?? 'default'}
          />
        </div>
      ))}
    </div>
  )
}

export default function TogglePage() {
  return (
    <ShowcasePage
      title="Toggle"
      description="Přepínač on/off pro binární nastavení. Pill tvar kontrastuje s oktagonálními prvky systému. Plně přístupný — ovládatelný myší i klávesnicí."
      componentSlug="toggle"
    >

      {/* Stavy */}
      <Section
        id="states"
        title="Stavy"
        description="Výchozí (off), zapnutý (on) a deaktivovaný."
      >
        <Preview>
          <Demo label="Vypnuto" initial={false} />
          <Demo label="Zapnuto" initial={true} />
          <Toggle checked={false} label="Disabled off" disabled />
          <Toggle checked={true}  label="Disabled on"  disabled />
        </Preview>
        <CodeBlock code={`<Toggle checked={value} onChange={setValue} label="Zvuky" />

{/* Deaktivovaný */}
<Toggle checked={false} label="Nedostupné" disabled />`} />
      </Section>

      {/* Varianty */}
      <Section
        id="variants"
        title="Varianty"
        description="Čtyři sémantické varianty — default (zlatá), success, danger, warning."
      >
        <Preview>
          {[
            { variant: 'default', label: 'Default' },
            { variant: 'success', label: 'Success' },
            { variant: 'danger',  label: 'Danger' },
            { variant: 'warning', label: 'Warning' },
          ].map(({ variant, label }) => (
            <Demo key={variant} initial={true} label={label} variant={variant} />
          ))}
        </Preview>
        <CodeBlock code={`<Toggle checked={value} onChange={setValue} variant="success" label="Zvuky" />
<Toggle checked={value} onChange={setValue} variant="danger"  label="Nebezpečný mód" />
<Toggle checked={value} onChange={setValue} variant="warning" label="Experimentální" />`} />
      </Section>

      {/* Velikosti */}
      <Section
        id="sizes"
        title="Velikosti"
        description="Dvě velikosti — sm a md (výchozí)."
      >
        <Preview>
          <Demo initial={true} label="Small (sm)"   size="sm" />
          <Demo initial={true} label="Medium (md)"  size="md" />
        </Preview>
        <CodeBlock code={`<Toggle size="sm" checked={value} onChange={setValue} label="Malý" />
<Toggle size="md" checked={value} onChange={setValue} label="Střední" />`} />
      </Section>

      {/* Pozice popisku */}
      <Section
        id="label-position"
        title="Pozice popisku"
        description="Popisek lze umístit vlevo nebo vpravo od přepínače."
      >
        <Preview>
          <Demo initial={true} label="Vpravo (výchozí)" labelPosition="right" />
          <Demo initial={true} label="Vlevo"            labelPosition="left" />
          <Demo initial={false} />
        </Preview>
        <CodeBlock code={`{/* Popisek vpravo — výchozí */}
<Toggle label="Zvuky" labelPosition="right" checked={v} onChange={set} />

{/* Popisek vlevo */}
<Toggle label="Zvuky" labelPosition="left"  checked={v} onChange={set} />

{/* Bez popisku */}
<Toggle checked={v} onChange={set} />`} />
      </Section>

      {/* Skupiny — settings layout */}
      <Section
        id="settings-group"
        title="Skupina nastavení"
        description="Typický vzor pro nastavení — přepínače v listicovém layoutu."
      >
        <Preview>
          <SettingsGroup items={[
            { key: 'music',    label: 'Hudba',            hint: 'Pozadí herního soundtracku',     initial: true,  variant: 'default' },
            { key: 'sfx',      label: 'Zvukové efekty',   hint: 'Herní zvuky a UI feedback',      initial: true,  variant: 'default' },
            { key: 'anim',     label: 'Animace',          hint: 'Pohybové přechody a efekty',     initial: true,  variant: 'default' },
            { key: 'hints',    label: 'Herní nápovědy',   hint: 'Tooltipy a kontextové tipy',     initial: false, variant: 'default' },
            { key: 'fullscr',  label: 'Celá obrazovka',                                           initial: false, variant: 'success' },
          ]} />
        </Preview>
        <CodeBlock code={`{/* Settings seznam */}
<div style={{ border: '1px solid …', borderRadius: 6 }}>
  {settings.map(({ key, label, hint }) => (
    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px' }}>
      <div>
        <p>{label}</p>
        {hint && <p style={{ fontSize: '0.69rem', color: '#8F9CB3' }}>{hint}</p>}
      </div>
      <Toggle checked={values[key]} onChange={val => set(key, val)} />
    </div>
  ))}
</div>`} />
      </Section>

      {/* Pravidla */}
      <Section
        id="pravidla"
        title="Pravidla použití"
      >
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Použij pro binární nastavení s okamžitým efektem — zapnout/vypnout zvuk, animace, fullscreen.</p>
          <p>✓ Přidej popisek vždy, pokud není kontext jednoznačný z okolního UI.</p>
          <p>✓ Variant success pro bezpečné zapnutí, danger pro zapnutí potenciálně rizikového chování.</p>
          <p>✓ Přepínač musí být ovladatelný klávesnicí (Space/Enter) — je implementováno, neodebírej onKeyDown.</p>
          <p>✗ Nepoužívej toggle tam, kde volba vyžaduje potvrzení (Uložit / Zrušit) — tam patří Checkbox + tlačítko.</p>
          <p>✗ Nezaměňuj s ButtonGroup — toggle je binární on/off, ButtonGroup je výběr z více možností.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
