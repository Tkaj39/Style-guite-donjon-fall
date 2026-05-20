import { useState } from 'react'
import { useLibVariant, ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import Toggle from '../lib/tkajui/Toggle'
import ProgressBar from '../lib/tkajui/ProgressBar'

/* ══════════════════════════════════════════════════════════════════════════
   Sdílená stavová matice (stejná pro obě knihovny)
   ══════════════════════════════════════════════════════════════════════════ */

function StateRow({ state, required, description, components, accentColor = 'goldMid', textColor = 'textCool', bg = 'bg0', border = `${goldDim}18`, faintColor = 'textDeep' }) {
  const reqColor = required ? 'successColor' : textColor
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px 60px 1fr 1fr',
      gap: 12,
      padding: '10px 14px',
      borderBottom: `1px solid ${border}`,
      alignItems: 'center',
    }}>
      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: accentColor, fontFamily: 'monospace' }}>{state}</span>
      <span style={{ fontSize: '0.6875rem', color: reqColor, fontWeight: 600 }}>{required ? 'povinný' : 'volitelný'}</span>
      <span style={{ fontSize: '0.75rem', color: textColor, lineHeight: 1.4 }}>{description}</span>
      <span style={{ fontSize: '0.6875rem', color: faintColor }}>{components}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   TkajUI — Interaction States
   ══════════════════════════════════════════════════════════════════════════ */

/* Jednoduchý TkajUI-styled button pro demos */
function TBtn({ children, variant = 'default', disabled, loading, onClick, style: extraStyle }) {
  const variants = {
    default: { bg: '#232332', border: '#35354a', color: '#eeeef8' },
    primary: { bg: '#6576ff', border: '#6576ff', color: '#ffffff' },
    danger:  { bg: '#f0555515', border: '#f05555', color: '#f05555' },
    success: { bg: '#34d36415', border: '#34d364', color: '#34d364' },
  }
  const v = variants[variant] ?? variants.default
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        padding: '8px 16px',
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: 3,
        color: v.color,
        fontSize: '0.8125rem',
        fontWeight: 500,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'filter 150ms',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        ...extraStyle,
      }}
      className={disabled || loading ? '' : 'hover:brightness-110 active:brightness-90 focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2'}
    >
      {loading ? '⏳ ' : ''}{children}
    </button>
  )
}

function TkajHoverDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <TBtn>Hover me</TBtn>
      <TBtn variant="danger">Hover danger</TBtn>
      <TBtn variant="success">Hover success</TBtn>
    </div>
  )
}

function TkajFocusDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <p style={{ width: '100%', margin: '0 0 8px', fontSize: '0.75rem', color: '#4c4c68' }}>
        Stiskni Tab pro procházení focusem →
      </p>
      <TBtn>Button 1</TBtn>
      <TBtn>Button 2</TBtn>
      <Toggle checked={false} onChange={() => {}} />
      <TBtn>Button 3</TBtn>
    </div>
  )
}

function TkajDisabledDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <TBtn disabled>Disabled</TBtn>
      <TBtn variant="danger" disabled>Danger disabled</TBtn>
      <Toggle checked={true} onChange={() => {}} disabled label="Disabled on" />
      <Toggle checked={false} onChange={() => {}} disabled label="Disabled off" />
    </div>
  )
}

function TkajLoadingDemo() {
  const [loading, setLoading] = useState(false)
  const start = () => { setLoading(true); setTimeout(() => setLoading(false), 2500) }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <TBtn loading={loading} onClick={start}>
        {loading ? 'Zpracovávám…' : 'Zahájit akci'}
      </TBtn>
      <TBtn variant="success" loading={loading} onClick={start}>
        {loading ? 'Ukládám…' : 'Uložit'}
      </TBtn>
      <div style={{ width: '100%', marginTop: 8, maxWidth: 300 }}>
        <ProgressBar indeterminate={loading} value={loading ? 0 : 100} label={loading ? 'Načítám…' : 'Hotovo'} variant={loading ? 'default' : 'success'} />
      </div>
    </div>
  )
}

function TkajSelectedDemo() {
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
            border: `1px solid ${sel === value ? '#6576ff' : '#35354a'}`,
            background: sel === value ? '#6576ff18' : 'transparent',
            color: sel === value ? '#eeeef8' : '#8888a8',
            borderRadius: 3,
            cursor: 'pointer',
            transition: 'all 0.12s',
          }}
          className="hover:brightness-110"
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function TkajBlockedDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <TBtn variant="danger" disabled>
        Nelegální tah
      </TBtn>
      <div style={{
        padding: '6px 12px',
        border: '1px solid #f0555555',
        background: '#f0555512',
        borderRadius: 3,
        fontSize: '0.75rem',
        color: '#f05555',
        cursor: 'not-allowed',
      }}>
        Hex obsazený
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#4c4c68', width: '100%' }}>
        Blocked ≠ disabled — prvek existuje, ale akce není povolena pravidly.
      </p>
    </div>
  )
}

function TkajuiStatesContent() {
  return (
    <>
      {/* Matice */}
      <Section
        id="matrix"
        title="Matice stavů"
        description="Přehled stavů, jejich povinnosti a typické komponenty."
      >
        <Preview dark={false}>
          <div style={{ width: '100%', border: '1px solid #35354a', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 60px 1fr 1fr', gap: 12, padding: '8px 14px', background: '#1b1b27', borderBottom: '1px solid #35354a' }}>
              {['Stav', 'Priorita', 'Popis', 'Komponenty'].map(h => (
                <span key={h} style={{ fontSize: '0.625rem', color: '#4c4c68', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            <StateRow state="hover"    required accentColor="#6576ff" textColor="#8888a8" bg="#1b1b27" border="#35354a18" faintColor="#4c4c68"
              description="Vizuální odezva na pohyb myši — brightness(1.1)."
              components="Button, Badge, Toggle, Select, Tabs, Card…" />
            <StateRow state="focus"    required accentColor="#6576ff" textColor="#8888a8" bg="#1b1b27" border="#35354a18" faintColor="#4c4c68"
              description="Keyboard focus — 2px solid #6576ff, offset 2px. Vždy viditelný."
              components="všechny interaktivní prvky" />
            <StateRow state="active"   required accentColor="#6576ff" textColor="#8888a8" bg="#1b1b27" border="#35354a18" faintColor="#4c4c68"
              description="Krátká odezva při kliknutí — brightness(0.9)."
              components="Button, Toggle, Select" />
            <StateRow state="disabled" required accentColor="#6576ff" textColor="#8888a8" bg="#1b1b27" border="#35354a18" faintColor="#4c4c68"
              description="Opacity 0.45 + cursor: not-allowed. Prvek v layoutu zůstává."
              components="Button, Input, Toggle, Select, Slider" />
            <StateRow state="loading"  required={false} accentColor="#6576ff" textColor="#8888a8" bg="#1b1b27" border="#35354a18" faintColor="#4c4c68"
              description="Akce probíhá — indeterminate bar nebo spinner, blokovaná interakce."
              components="Button, ProgressBar" />
            <StateRow state="selected" required={false} accentColor="#6576ff" textColor="#8888a8" bg="#1b1b27" border="#35354a18" faintColor="#4c4c68"
              description="Prvek je aktivně vybraný v sadě — accent border + accent bg."
              components="Tabs, ButtonGroup, filter tlačítka" />
            <StateRow state="blocked"  required={false} accentColor="#6576ff" textColor="#8888a8" bg="#1b1b27" border="#35354a18" faintColor="#4c4c68"
              description="Akce není povolena — vizuálně odlišné od disabled (červený tón)."
              components="herní prvky, akční tlačítka" />
          </div>
        </Preview>
      </Section>

      {/* Hover */}
      <Section id="hover" title="Hover" description="Každý interaktivní prvek reaguje na najetí myší — filter: brightness(1.1). Trvání 150 ms ease-out. Žádné hard-coded hover barvy.">
        <Preview><TkajHoverDemo /></Preview>
        <CodeBlock code={`/* TkajUI hover — globální vzor */
transition: filter 150ms ease-out;

/* Tailwind */
className="hover:brightness-110 active:brightness-90"

/* Proč filter místo barvy? */
/* → funguje na jakémkoliv bg/border bez přepisování každého tokenu */`} />
      </Section>

      {/* Focus */}
      <Section id="focus" title="Focus" description="Focus ring musí být vždy viditelný při keyboard navigaci. TkajUI používá čistý modrý outline — 2px solid #6576ff, bez glow.">
        <Preview><TkajFocusDemo /></Preview>
        <CodeBlock code={`/* Focus ring — globální pravidlo */
:focus-visible {
  outline: 2px solid #6576ff;
  outline-offset: 2px;
}

/* Per-component v React */
onFocus={e => e.currentTarget.style.outline = '2px solid #6576ff'}
onBlur={e => e.currentTarget.style.outline = 'none'}`} />
      </Section>

      {/* Disabled */}
      <Section id="disabled" title="Disabled" description="Opacity 0.45 + cursor: not-allowed. Prvek zůstává v layoutu, neinteraguje. Nikdy neskrývej disabled prvky — uživatel musí vědět co tam je.">
        <Preview><TkajDisabledDemo /></Preview>
        <CodeBlock code={`/* Disabled vzor */
opacity: \${disabled ? 0.45 : 1};
cursor: \${disabled ? "not-allowed" : "pointer"};
pointer-events: \${disabled ? "none" : "auto"};

<button disabled aria-disabled="true">Nedostupné</button>`} />
      </Section>

      {/* Loading */}
      <Section id="loading" title="Loading" description="Loading stav blokuje interakci a signalizuje probíhající operaci. Spinner nebo indeterminate bar — nikdy obojí najednou.">
        <Preview><TkajLoadingDemo /></Preview>
        <CodeBlock code={`<TButton loading={isLoading} onClick={submit}>
  {isLoading ? 'Zpracovávám…' : 'Odeslat'}
</TButton>

<ProgressBar indeterminate={isLoading} value={progress} />`} />
      </Section>

      {/* Selected */}
      <Section id="selected" title="Selected" description="Vybraný prvek v sadě — accent border (#6576ff) + accent bg (#6576ff18). Žádný glow — čistá selekce.">
        <Preview><TkajSelectedDemo /></Preview>
        <CodeBlock code={`/* TkajUI selected stav */
border-color: #6576ff;
background: #6576ff18;
color: #eeeef8;

/* Tailwind */
className={\`border-brand-500 bg-[#6576ff18] text-[#eeeef8]\`}`} />
      </Section>

      {/* Blocked */}
      <Section id="blocked" title="Blocked" description="Blocked ≠ Disabled. Disabled = prvek není dostupný v UI. Blocked = akce není povolena kontextem. Červený tón, ne šedý.">
        <Preview><TkajBlockedDemo /></Preview>
        <CodeBlock code={`/* Blocked styl — odlišný od disabled */
border-color: #f0555555;
background: #f0555512;
color: #f05555;
cursor: not-allowed;

/* Tooltip vysvětlí proč */
<Tooltip content="Akce není dostupná" variant="danger">
  <button style={blockedStyle}>Nedostupná akce</button>
</Tooltip>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Hover a focus jsou povinné pro každý interaktivní prvek — bez výjimky.</p>
          <p>✓ Hover = <code className="text-neutral-300">brightness(1.1)</code>. Focus = <code className="text-neutral-300">outline: 2px solid #6576ff</code>. Neměň tyto vzory per-komponentu.</p>
          <p>✓ Disabled prvky ponechej v layoutu — jen snižuj opacity a blokuj interakci.</p>
          <p>✓ Loading stav vždy blokuje opakované kliknutí.</p>
          <p>✗ Nepoužívej více stavů najednou (selected + loading) — jeden prvek, jeden stav.</p>
          <p>✗ Blocked a disabled nejsou totéž — blocked má kontextovou příčinu.</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   donjon-fall-ui — Interaction States
   ══════════════════════════════════════════════════════════════════════════ */

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
      <p style={{ width: '100%', margin: '0 0 8px', fontSize: '0.75rem', color: textDeep }}>
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
            border: `1px solid ${sel === value ? 'goldMid' : `${goldDim}40`}`,
            background: sel === value ? 'bg4' : 'transparent',
            color: sel === value ? 'textActive' : 'textCool',
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
        color: failColor,
        cursor: 'not-allowed',
      }}>
        Hex obsazený
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: textDeep, width: '100%' }}>
        Blocked ≠ disabled — prvek existuje, ale akce není povolena pravidly hry.
      </p>
    </div>
  )
}

function DonjonStatesContent() {
  return (
    <>
      {/* Matice */}
      <Section
        id="matrix"
        title="Matice stavů"
        description="Přehled stavů, jejich povinnosti a typické komponenty."
      >
        <Preview dark={false}>
          <div style={{ width: '100%', border: `1px solid ${goldDim}30`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 60px 1fr 1fr', gap: 12, padding: '8px 14px', background: bg0, borderBottom: `1px solid ${goldDim}30` }}>
              {['Stav', 'Priorita', 'Popis', 'Komponenty'].map(h => (
                <span key={h} style={{ fontSize: '0.625rem', color: textDeep, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            <StateRow state="hover"    required description="Vizuální odezva na pohyb myši nad prvkem." components="Button, Badge, Toggle, Select, Tabs, Card, hex tile…" />
            <StateRow state="focus"    required description="Keyboard focus — musí být vždy viditelný (ring nebo outline)." components="všechny interaktivní prvky" />
            <StateRow state="active"   required description="Krátká odezva při kliknutí / stisku (scale, invert)." components="Button, Toggle, Select" />
            <StateRow state="disabled" required description="Prvek existuje, ale interakce je blokována — 40–45 % opacity." components="Button, Input, Toggle, Select, Slider" />
            <StateRow state="loading"  required={false} description="Akce probíhá — spinner nebo indeterminate bar, block interakce." components="Button, ProgressBar, Skeleton" />
            <StateRow state="selected" required={false} description="Prvek je aktivně vybraný v sadě (tabs, filter, map tile)." components="Tabs, ButtonGroup, hex tile" />
            <StateRow state="blocked"  required={false} description="Akce není povolena pravidly hry — vizuálně odlišné od disabled." components="hex tile, akční tlačítka" />
            <StateRow state="error"    required={false} description="Neplatná hodnota nebo selhání — border + helper text." components="Input, form groups" />
          </div>
        </Preview>
      </Section>

      {/* Hover */}
      <Section id="hover" title="Hover" description="Každý interaktivní prvek reaguje na najetí myší — světlejší fill, border nebo glow. Trvání 120–150 ms, ease-out.">
        <Preview><HoverDemo /></Preview>
        <CodeBlock code={`/* Hover token */
transition: background 0.12s ease-out, border-color 0.12s ease-out;

button:hover {
  background: var(--variant-bg-hover);
  border-color: var(--variant-border);
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

onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #8F745566'}
onBlur={e => e.currentTarget.style.boxShadow = 'none'}`} />
      </Section>

      {/* Disabled */}
      <Section id="disabled" title="Disabled" description="Opacity 40–45 % + cursor: not-allowed. Prvek zůstává v layoutu, neinteraguje. Nikdy neskrývej disabled prvky.">
        <Preview><DisabledDemo /></Preview>
        <CodeBlock code={`opacity: \${disabled ? 0.45 : 1};
cursor: \${disabled ? "not-allowed" : "pointer"};
pointer-events: \${disabled ? "none" : "auto"};

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
border-color: goldMid;
background: bg4;
box-shadow: 0 0 0 1px #B8956A44;
color: textActive;`} />
      </Section>

      {/* Blocked */}
      <Section id="blocked" title="Blocked" description="Blocked ≠ Disabled. Disabled = prvek není dostupný v UI. Blocked = prvek existuje, ale pravidla hry zakazují akci.">
        <Preview><BlockedDemo /></Preview>
        <CodeBlock code={`/* Blocked styl — odlišný od disabled */
border-color: #C0404055;
background: #C0404012;
color: failColor;
cursor: not-allowed;

<Tooltip content="Hex je obsazený" variant="danger">
  <button style={blockedStyle}>Útok</button>
</Tooltip>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Hover a focus jsou povinné pro každý interaktivní prvek — bez výjimky.</p>
          <p>✓ Focus ring musí být viditelný — <code className="text-neutral-300">:focus-visible</code> preferuj před <code className="text-neutral-300">:focus</code>, aby se nezobrazoval při kliknutí myší.</p>
          <p>✓ Disabled prvky ponechej v layoutu a v DOM — pouze snižuj opacity a blokuj interakci.</p>
          <p>✓ Loading stav vždy blokuje opakované kliknutí — double submit je ošetřen automaticky.</p>
          <p>✗ Nepoužívej více stavů najednou (selected + loading) — jeden prvek, jeden stav.</p>
          <p>✗ Blocked a disabled nejsou totéž — blocked má herní příčinu, disabled nemá kontext.</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Stránka
   ══════════════════════════════════════════════════════════════════════════ */

function StatesContent() {
  const lib = useLibVariant()
  return lib === 'donjon' ? <DonjonStatesContent /> : <TkajuiStatesContent />
}

export default function InteractionStatesPage() {
  return (
    <ShowcasePage
      title="Interaction States"
      description="Systémový přehled všech interakčních stavů — od hover po blocked. Každý stav má definované vizuální chování platné napříč komponentami."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <StatesContent />
    </ShowcasePage>
  )
}
