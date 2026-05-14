import { useState } from 'react'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonButton from '../components/DonjonButton'
import DonjonBadge from '../components/DonjonBadge'
import Toggle from '../lib/tkajui/Toggle'
import ProgressBar from '../lib/tkajui/ProgressBar'

/* ── State matrix row ── */
function StateRow({ state, required, description, components }) {
  const color = required ? '#40A055' : '#8F9CB3'
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px 60px 1fr 1fr',
      gap: 12,
      padding: '10px 14px',
      borderBottom: '1px solid #8F745418',
      alignItems: 'center',
    }}>
      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#B8956A', fontFamily: 'monospace' }}>{state}</span>
      <span style={{ fontSize: '0.6875rem', color, fontWeight: 600 }}>{required ? 'povinný' : 'volitelný'}</span>
      <span style={{ fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{description}</span>
      <span style={{ fontSize: '0.6875rem', color: '#4A4870' }}>{components}</span>
    </div>
  )
}

/* ── Live ukázky jednotlivých stavů ── */
function HoverDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <DonjonButton size="sm">Hover me</DonjonButton>
      <DonjonButton size="sm" variant="danger">Hover danger</DonjonButton>
      <DonjonButton size="sm" variant="success">Hover success</DonjonButton>
    </div>
  )
}

function FocusDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <p style={{ width: '100%', margin: '0 0 8px', fontSize: '0.75rem', color: '#4A4870' }}>
        Stiskni Tab pro procházení focusem →
      </p>
      <DonjonButton size="sm">Button 1</DonjonButton>
      <DonjonButton size="sm">Button 2</DonjonButton>
      <Toggle checked={false} onChange={() => {}} />
      <DonjonButton size="sm">Button 3</DonjonButton>
    </div>
  )
}

function DisabledDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <DonjonButton size="sm" disabled>Disabled</DonjonButton>
      <DonjonButton size="sm" variant="danger" disabled>Danger disabled</DonjonButton>
      <Toggle checked={true} onChange={() => {}} disabled label="Disabled on" />
      <Toggle checked={false} onChange={() => {}} disabled label="Disabled off" />
      <DonjonBadge variant="default">Disabled badge</DonjonBadge>
    </div>
  )
}

function LoadingDemo() {
  const [loading, setLoading] = useState(false)
  const start = () => { setLoading(true); setTimeout(() => setLoading(false), 2500) }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <DonjonButton size="sm" loading={loading} onClick={start}>
        {loading ? 'Zpracovávám…' : 'Zahájit akci'}
      </DonjonButton>
      <DonjonButton size="sm" variant="success" loading={loading} onClick={start}>
        {loading ? 'Ukládám…' : 'Uložit'}
      </DonjonButton>
      <div style={{ width: '100%', marginTop: 8, maxWidth: 300 }}>
        <ProgressBar indeterminate={loading} value={loading ? 0 : 100} label={loading ? 'Načítám…' : 'Hotovo'} variant={loading ? 'default' : 'success'} />
      </div>
    </div>
  )
}

function SelectedDemo() {
  const [sel, setSel] = useState('b')
  const items = [
    { value: 'a', label: 'Pohyb' },
    { value: 'b', label: 'Útok' },
    { value: 'c', label: 'Obnova' },
  ]
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {items.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setSel(value)}
          style={{
            padding: '6px 14px',
            fontSize: '0.8125rem',
            border: `1px solid ${sel === value ? '#B8956A' : '#8F745440'}`,
            background: sel === value ? '#2A2948' : 'transparent',
            color: sel === value ? '#F0E6D3' : '#8F9CB3',
            borderRadius: 3,
            cursor: 'pointer',
            boxShadow: sel === value ? '0 0 0 1px #B8956A44' : 'none',
            transition: 'all 0.12s',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function BlockedDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <DonjonButton
        size="sm"
        variant="danger"
        disabled
        leadingIcon={
          <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        }
      >
        Nelegální tah
      </DonjonButton>
      <div style={{
        padding: '6px 12px',
        border: '1px solid #C0404055',
        background: '#C0404012',
        borderRadius: 3,
        fontSize: '0.75rem',
        color: '#C04040',
        cursor: 'not-allowed',
      }}>
        Hex obsazený
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4870', width: '100%' }}>
        Blocked ≠ disabled — prvek existuje, ale akce není povolena pravidly hry.
      </p>
    </div>
  )
}

export default function InteractionStatesPage() {
  return (
    <ShowcasePage
      title="Interaction States"
      description="Systémový přehled všech interakčních stavů — od hover po blocked. Každý stav má definované vizuální chování platné napříč komponentami."
    >

      {/* Matice stavů */}
      <Section
        id="matrix"
        title="Matice stavů"
        description="Přehled stavů, jejich povinnosti a typické komponenty."
      >
        <Preview dark={false}>
          <div style={{ width: '100%', border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '120px 60px 1fr 1fr',
              gap: 12,
              padding: '8px 14px',
              background: '#12102A',
              borderBottom: '1px solid #8F745430',
            }}>
              {['Stav', 'Priorita', 'Popis', 'Komponenty'].map(h => (
                <span key={h} style={{ fontSize: '0.625rem', color: '#4A4870', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            <StateRow state="hover"     required description="Vizuální odezva na pohyb myši nad prvkem."                           components="Button, Badge, Toggle, Select, Tabs, Card, hex tile…" />
            <StateRow state="focus"     required description="Keyboard focus — musí být vždy viditelný (ring nebo outline)."         components="všechny interaktivní prvky" />
            <StateRow state="active"    required description="Krátká odezva při kliknutí / stisku (scale, invert)."                  components="Button, Toggle, Select" />
            <StateRow state="disabled"  required description="Prvek existuje, ale interakce je blokována — 40–45 % opacity."         components="Button, Input, Toggle, Select, Slider" />
            <StateRow state="loading"   required={false} description="Akce probíhá — spinner nebo indeterminate bar, block interakce." components="Button, ProgressBar, Skeleton" />
            <StateRow state="selected"  required={false} description="Prvek je aktivně vybraný v sadě (tabs, filter, map tile)."      components="Tabs, ButtonGroup, hex tile" />
            <StateRow state="blocked"   required={false} description="Akce není povolena pravidly hry — vizuálně odlišné od disabled." components="hex tile, akční tlačítka" />
            <StateRow state="error"     required={false} description="Neplatná hodnota nebo selhání — border + helper text."           components="Input, form groups" />
          </div>
        </Preview>
      </Section>

      {/* Hover */}
      <Section id="hover" title="Hover" description="Každý interaktivní prvek reaguje na najetí myší — světlejší fill, border nebo glow. Trvání 120–150 ms, ease-out.">
        <Preview><HoverDemo /></Preview>
        <CodeBlock code={`/* Hover token */
transition: background 0.12s ease-out, border-color 0.12s ease-out;

/* Button hover — příklad */
button:hover {
  background: var(--variant-bg-hover);   /* ~10 % opacity variantní barvy */
  border-color: var(--variant-border);   /* plná barva */
}`} />
      </Section>

      {/* Focus */}
      <Section id="focus" title="Focus" description="Focus ring musí být vždy viditelný při keyboard navigaci. Donjon Fall používá zlatý box-shadow — 0 0 0 2px #8F745566.">
        <Preview><FocusDemo /></Preview>
        <CodeBlock code={`/* Focus ring — globální pravidlo */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #8F745566;
}

/* Nebo per-component */
onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #8F745566'}
onBlur={e => e.currentTarget.style.boxShadow = 'none'}`} />
      </Section>

      {/* Disabled */}
      <Section id="disabled" title="Disabled" description="Opacity 40–45 % + cursor: not-allowed. Prvek zůstává v layoutu, neinteraguje. Nikdy neskrývej disabled prvky — uživatel musí vědět co tam je.">
        <Preview><DisabledDemo /></Preview>
        <CodeBlock code={`/* Disabled vzor */
opacity: ${'{disabled ? 0.45 : 1}'};
cursor: ${'{disabled ? "not-allowed" : "pointer"}'};
pointer-events: ${'{disabled ? "none" : "auto"}'};

/* aria atribut */
<button disabled aria-disabled="true">Nedostupné</button>`} />
      </Section>

      {/* Loading */}
      <Section id="loading" title="Loading" description="Loading stav blokuje interakci a signalizuje probíhající operaci. Spinner nebo indeterminate bar — nikdy obojí najednou.">
        <Preview><LoadingDemo /></Preview>
        <CodeBlock code={`<DonjonButton loading={isLoading} onClick={submit}>
  {isLoading ? 'Ukládám…' : 'Uložit'}
</DonjonButton>

<ProgressBar indeterminate={isLoading} value={progress} />`} />
      </Section>

      {/* Selected */}
      <Section id="selected" title="Selected" description="Vybraný prvek v sadě — border, mírně světlejší pozadí, případně glow. Vizuálně odlišný od hover i active.">
        <Preview><SelectedDemo /></Preview>
        <CodeBlock code={`/* Selected stav */
border-color: #B8956A;
background: #2A2948;
box-shadow: 0 0 0 1px #B8956A44;  /* jemný glow */
color: #F0E6D3;`} />
      </Section>

      {/* Blocked */}
      <Section id="blocked" title="Blocked" description="Blocked ≠ Disabled. Disabled = prvek není dostupný v UI. Blocked = prvek existuje, ale pravidla hry zakazují akci. Blocked má červený tón, ne šedý.">
        <Preview><BlockedDemo /></Preview>
        <CodeBlock code={`/* Blocked styl — odlišný od disabled */
border-color: #C0404055;
background: #C0404012;
color: #C04040;
cursor: not-allowed;

/* Tooltip vysvětlí proč */
<Tooltip content="Hex je obsazený — nelze provést útok" variant="danger">
  <button style={blockedStyle}>Útok</button>
</Tooltip>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Hover a focus jsou povinné pro každý interaktivní prvek — bez výjimky.</p>
          <p>✓ Focus ring musí být viditelný — <code style={{ color: '#8F9CB3' }}>:focus-visible</code> preferuj před <code style={{ color: '#8F9CB3' }}>:focus</code>, aby se nezobrazoval při kliknutí myší.</p>
          <p>✓ Disabled prvky ponechej v layoutu a v DOM — pouze snižuj opacity a blokuj interakci.</p>
          <p>✓ Loading stav vždy blokuje opakované kliknutí — double submit je ošetřen automaticky.</p>
          <p>✗ Nepoužívej více stavů najednou (selected + loading) — jeden prvek, jeden stav.</p>
          <p>✗ Blocked a disabled nejsou totéž — blocked má herní příčinu, disabled nemá kontext.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
