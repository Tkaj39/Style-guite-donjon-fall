/* ── Form hub ────────────────────────────────────────────────────────
   Single showcase page for the form-controls family.

   Merges what used to live at:
     /inputs (Input) · /select (Select) · /toggle (Toggle) · /slider (Slider)
     + /form (Field, Form, Radio[Group], Checkbox[Group], TextArea,
              NumberInput, Combobox, SubmitButton)

   Each section has an explicit `id` matching the componentMeta slug so
   old routes can redirect via `/form#input` etc. Live demos use
   `useLibVariant()` to flip between TkajUI and donjon-fall-ui where
   both flavors exist.
   ─────────────────────────────────────────────────────────────────── */
import { useState } from 'react'
import {
  Field, Form, Radio, RadioGroup, Checkbox, CheckboxGroup,
} from '../lib/tkajui/Form'
import Input from '../lib/tkajui/Input'
import Select from '../lib/tkajui/Select'
import Toggle from '../lib/tkajui/Toggle'
import Slider from '../lib/tkajui/Slider'
import TextArea from '../lib/tkajui/TextArea'
import NumberInput from '../lib/tkajui/NumberInput'
import Combobox from '../lib/tkajui/Combobox'
import Button from '../lib/tkajui/Button'
import SubmitButton from '../lib/tkajui/SubmitButton'
import { Stack, Inline, Grid } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow } from '../lib/tkajui/tokens'

import DonjonInput from '../lib/donjon/DonjonInput'
import DonjonSelect from '../lib/donjon/DonjonSelect'
import DonjonToggle from '../lib/donjon/DonjonToggle'
import DonjonSlider from '../lib/donjon/DonjonSlider'
import DonjonSubmitButton from '../lib/donjon/DonjonSubmitButton'

import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

const COUNTRIES = [
  { value: 'cz', label: 'Czech Republic' },
  { value: 'sk', label: 'Slovakia' },
  { value: 'at', label: 'Austria' },
  { value: 'de', label: 'Germany' },
]

const SPELLS = [
  { value: 'firebolt',      label: 'Firebolt',       hint: 'Lvl 1' },
  { value: 'magic-missile', label: 'Magic Missile',  hint: 'Lvl 1' },
  { value: 'fireball',      label: 'Fireball',       hint: 'Lvl 3' },
  { value: 'lightning',     label: 'Lightning Bolt', hint: 'Lvl 3' },
  { value: 'heal',          label: 'Cure Wounds',    hint: 'Lvl 1' },
  { value: 'invisibility',  label: 'Invisibility',   hint: 'Lvl 2' },
  { value: 'teleport',      label: 'Teleport',       hint: 'Lvl 5' },
  { value: 'wish',          label: 'Wish',           hint: 'Lvl 9', disabled: true },
]

const DIFFICULTIES = ['easy', 'normal', 'hard', 'nightmare']

const _noop = () => {}

/* ────────────────────────────────────────────────────────────────────
   Input — basic text field
   ──────────────────────────────────────────────────────────────────── */
function InputDemo() {
  const lib = useLibVariant()
  const I = lib === 'donjon' ? DonjonInput : Input
  const [name, setName] = useState('Aragorn')
  return (
    <Stack gap="md">
      <I value={name} onChange={setName} label="Username" placeholder="Type something…" />
      <I value="" onChange={_noop} label="Email" hint="We'll never share." placeholder="you@example.com" />
      <I value="abc" onChange={_noop} label="Password" error="Must be at least 8 characters" />
      <I value="disabled" onChange={_noop} label="Disabled" disabled />
      <Inline gap="md" align="end">
        {['xs', 'sm', 'md', 'lg'].map(sz => (
          <I key={sz} size={sz} value="Hello" onChange={_noop} label={sz} />
        ))}
      </Inline>
    </Stack>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Select — single-choice dropdown
   ──────────────────────────────────────────────────────────────────── */
function SelectDemo() {
  const lib = useLibVariant()
  const S = lib === 'donjon' ? DonjonSelect : Select
  const [country, setCountry] = useState('cz')
  return (
    <Stack gap="md">
      <S value={country} onChange={setCountry} options={COUNTRIES} label="Country" />
      <S value="" onChange={_noop} options={COUNTRIES} placeholder="Choose…" label="With placeholder" />
      <S value="cz" onChange={_noop} options={COUNTRIES} disabled label="Disabled" />
      <Inline gap="md" align="end">
        {['xs', 'sm', 'md', 'lg'].map(sz => (
          <S key={sz} size={sz} value="cz" onChange={_noop} options={COUNTRIES} label={sz} />
        ))}
      </Inline>
    </Stack>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Toggle — on/off switch
   ──────────────────────────────────────────────────────────────────── */
function ToggleDemo() {
  const lib = useLibVariant()
  const T = lib === 'donjon' ? DonjonToggle : Toggle
  const [sfx, setSfx] = useState(true)
  const [music, setMusic] = useState(false)
  return (
    <Stack gap="md">
      <T checked={sfx} onChange={setSfx} label="Sound effects" />
      <T checked={music} onChange={setMusic} label="Background music" />
      <T checked onChange={_noop} label="Success variant" variant="success" />
      <T checked={false} onChange={_noop} label="Warning variant" variant="warning" />
      <T checked onChange={_noop} label="Disabled" disabled />
    </Stack>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Slider — numeric range picker
   ──────────────────────────────────────────────────────────────────── */
function SliderDemo() {
  const lib = useLibVariant()
  const S = lib === 'donjon' ? DonjonSlider : Slider
  const [volume, setVolume] = useState(60)
  const [difficulty, setDifficulty] = useState(2)
  return (
    <Stack gap="md">
      <S value={volume} onChange={setVolume} label="Volume" showValue />
      <S value={difficulty} onChange={setDifficulty} min={0} max={3} step={1} label="Difficulty" showValue
        formatValue={(v) => DIFFICULTIES[v] ?? '?'} />
      <S value={45} onChange={_noop} label="Success" variant="success" showValue />
      <S value={30} onChange={_noop} label="Warning" variant="warning" showValue />
      <Inline gap="md" align="end">
        {['xs', 'sm', 'md', 'lg'].map(sz => (
          <S key={sz} size={sz} value={50} onChange={_noop} label={sz} showValue style={{ minWidth: 120 }} />
        ))}
      </Inline>
    </Stack>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Field — label / hint / error composer for any input
   ──────────────────────────────────────────────────────────────────── */
function FieldDemo() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const validate = () => setError(email.includes('@') ? '' : 'Email must contain @')
  return (
    <Stack gap="md">
      <Field label="Email" required hint="We'll never share your email." error={error}>
        <Input value={email} onChange={setEmail} placeholder="you@example.com" onBlur={validate} />
      </Field>
      <Field label="Country" hint="Where do you live?">
        <Select options={COUNTRIES} value="" onChange={_noop} placeholder="Choose…" />
      </Field>
    </Stack>
  )
}

function RadioGroupDemo() {
  const [difficulty, setDifficulty] = useState('normal')
  return (
    <Stack gap="lg">
      <RadioGroup label="Difficulty" value={difficulty} onChange={setDifficulty} hint="Change later in settings.">
        {DIFFICULTIES.map(d => (
          <Radio key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</Radio>
        ))}
      </RadioGroup>
      <RadioGroup label="Genre" value="rpg" onChange={_noop} orientation="horizontal">
        <Radio value="rpg">RPG</Radio>
        <Radio value="strategy">Strategy</Radio>
        <Radio value="puzzle">Puzzle</Radio>
        <Radio value="action" disabled>Action (locked)</Radio>
      </RadioGroup>
    </Stack>
  )
}

function CheckboxGroupDemo() {
  const [features, setFeatures] = useState(['multiplayer'])
  const [single, setSingle] = useState(false)
  return (
    <Stack gap="lg">
      <Checkbox checked={single} onChange={setSingle}>Subscribe to newsletter (standalone)</Checkbox>
      <CheckboxGroup label="Options" value={features} onChange={setFeatures} hint={`Selected: ${features.join(', ') || 'none'}`}>
        <Checkbox value="multiplayer">Multiplayer</Checkbox>
        <Checkbox value="permadeath">Permadeath</Checkbox>
        <Checkbox value="hardmode">Hard mode</Checkbox>
        <Checkbox value="cheats" disabled>Cheats (developer build only)</Checkbox>
      </CheckboxGroup>
    </Stack>
  )
}

function TextAreaDemo() {
  const [bio, setBio] = useState('A wandering ranger from the north.\nKeeper of ancient lore.')
  return (
    <Stack gap="md">
      <Field label="Bio" hint="Auto-grows with content (field-sizing: content).">
        <TextArea value={bio} onChange={setBio} placeholder="Tell us about your character…" rows={3} />
      </Field>
      <Field label="Notes" error="At least 10 characters required">
        <TextArea value="Short" onChange={_noop} rows={2} />
      </Field>
    </Stack>
  )
}

function NumberInputDemo() {
  const [qty, setQty] = useState(5)
  const [vol, setVol] = useState(0.75)
  return (
    <Stack gap="md">
      <Field label="Quantity" hint="Integer · min 0 · max 99">
        <NumberInput value={qty} onChange={setQty} min={0} max={99} />
      </Field>
      <Field label="Volume" hint="Decimal (precision 2) · step 0.05">
        <NumberInput value={vol} onChange={setVol} min={0} max={1} step={0.05} precision={2} />
      </Field>
      <Field label="With error" error="Value must be positive">
        <NumberInput value={-3} onChange={_noop} />
      </Field>
    </Stack>
  )
}

function ComboboxDemo() {
  const [spell, setSpell] = useState('fireball')
  return (
    <Stack gap="md">
      <Field label="Select a spell" hint="Type to filter — Arrow keys, Enter, Esc, Backspace to clear.">
        <Combobox options={SPELLS} value={spell} onChange={setSpell} placeholder="Search spells…" />
      </Field>
      <Field label="Smaller (sm) — no clearable">
        <Combobox options={SPELLS} value={null} onChange={_noop} size="sm" clearable={false} />
      </Field>
    </Stack>
  )
}

function SubmitButtonDemo() {
  const lib = useLibVariant()
  const Submit = lib === 'donjon' ? DonjonSubmitButton : SubmitButton
  return (
    <Stack gap="md">
      <form>
        <Submit loadingLabel="Saving…">Save</Submit>
      </form>
      <form>
        <Inline gap="sm">
          <Submit variant="success">Sign up</Submit>
          <Submit variant="danger" loadingLabel="Deleting…">Delete</Submit>
          {lib === 'donjon'
            ? <Submit variant="default" ornament="plain">Reset</Submit>
            : <Submit variant="link">Reset</Submit>}
        </Inline>
      </form>
    </Stack>
  )
}

function FormDemo() {
  const [submitted, setSubmitted] = useState(null)
  const [data, setData] = useState({ email: '', password: '', terms: false })
  return (
    <Stack gap="md" style={{ background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
      <Form onSubmit={() => setSubmitted({ ...data })} gap={12}>
        <Field label="Email" required>
          <Input value={data.email} onChange={v => setData({ ...data, email: v })} placeholder="you@example.com" />
        </Field>
        <Field label="Password" required hint="At least 8 characters">
          <Input value={data.password} onChange={v => setData({ ...data, password: v })} placeholder="••••••••" />
        </Field>
        <Checkbox checked={data.terms} onChange={v => setData({ ...data, terms: v })}>
          I accept the terms of service
        </Checkbox>
        <Inline gap="sm" justify="end">
          <Button variant="default" onClick={() => { setSubmitted(null); setData({ email: '', password: '', terms: false }) }}>Reset</Button>
          <Button variant="success" type="submit" disabled={!data.terms}>Sign up</Button>
        </Inline>
      </Form>
      {submitted && (
        <pre style={{ margin: 0, fontSize: '0.75rem', color: textMid, background: 'rgba(0,0,0,0.2)', padding: 8, borderRadius: 4 }}>
          submitted = {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </Stack>
  )
}

export default function FormPage() {
  return (
    <ShowcasePage
      title="Forms & inputs"
      description="Kompletní rodina form controls — text inputs, výběry, toggles, sliders + compositional helpers (Field / Form / RadioGroup / CheckboxGroup). Lib switcher v hlavičce přepne mezi tkajui a donjon variantami tam, kde existují obě."
      componentSlugs={['input', 'select', 'toggle', 'slider', 'field', 'form', 'radio', 'radio-group', 'checkbox', 'checkbox-group', 'text-area', 'number-input', 'combobox', 'submit-button', 'donjon-submit-button']}
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section id="input" title="Input — text field" description="Single-line text input. `size`, `label`, `hint`, `error`, `disabled`. Multi-line varianta přes `<TextArea>` (níže). Donjon má variantní vzhled, jinak stejné API.">
        <Preview><InputDemo /></Preview>
        <CodeBlock code={`<Input value={name} onChange={setName} label="Username" placeholder="…" />
<Input value={pw} onChange={setPw} label="Password" error="Too short" />`} />
      </Section>

      <Section id="select" title="Select — single-choice dropdown" description="Octagon trigger, arrow keys + Esc, podpora `disabled` items. Pro >10 položek nebo typeahead použij Combobox (níže).">
        <Preview><SelectDemo /></Preview>
        <CodeBlock code={`<Select value={country} onChange={setCountry}
  options={[{ value: 'cz', label: 'Czech Republic' }, ...]}
  label="Country" />`} />
      </Section>

      <Section id="toggle" title="Toggle — on/off switch" description="Boolean switch, optional label vlevo. Variants pro success/warning/danger semantic.">
        <Preview><ToggleDemo /></Preview>
        <CodeBlock code={`<Toggle checked={sfx} onChange={setSfx} label="Sound effects" />
<Toggle checked={hard} onChange={setHard} variant="warning" label="Hard mode" />`} />
      </Section>

      <Section id="slider" title="Slider — numeric range" description="Continuous nebo discrete (step), volitelný `formatValue` pro custom label, variants, sizes.">
        <Preview><SliderDemo /></Preview>
        <CodeBlock code={`<Slider value={volume} onChange={setVolume} label="Volume" showValue />

{/* Discrete s formatValue */}
<Slider value={diff} onChange={setDiff} min={0} max={3} step={1}
  formatValue={(v) => ['easy', 'normal', 'hard', 'nightmare'][v]} showValue />`} />
      </Section>

      <Section id="field" title="Field — label + input + hint + error composer" description="Klonuje single child input, injektuje `id` + `aria-describedby`. Použij okolo Input / Select / TextArea / NumberInput.">
        <Preview><FieldDemo /></Preview>
        <CodeBlock code={`<Field label="Email" required hint="We'll never share it" error={emailError}>
  <Input value={email} onChange={setEmail} />
</Field>`} />
      </Section>

      <Section id="radio-group" title="Radio + RadioGroup — single-choice" description="Provider pro skupinu Radio buttonů. Sdílí name/value/onChange přes context.">
        <Preview><RadioGroupDemo /></Preview>
        <CodeBlock code={`<RadioGroup label="Difficulty" value={diff} onChange={setDiff}>
  <Radio value="easy">Easy</Radio>
  <Radio value="normal">Normal</Radio>
  <Radio value="hard">Hard</Radio>
</RadioGroup>`} />
      </Section>

      <Section id="checkbox-group" title="Checkbox + CheckboxGroup — multi-choice" description="Standalone Checkbox má `checked` + `onChange(boolean)`. V CheckboxGroup → `value` per option.">
        <Preview><CheckboxGroupDemo /></Preview>
        <CodeBlock code={`<CheckboxGroup label="Options" value={features} onChange={setFeatures}>
  <Checkbox value="multiplayer">Multiplayer</Checkbox>
  <Checkbox value="permadeath">Permadeath</Checkbox>
</CheckboxGroup>`} />
      </Section>

      <Section id="text-area" title="TextArea — multi-line text input" description="Thin wrapper okolo `<Input multiline>` s dedicated API. Auto-grow přes CSS field-sizing: content.">
        <Preview><TextAreaDemo /></Preview>
        <CodeBlock code={`<Field label="Bio" hint="Auto-grows">
  <TextArea value={bio} onChange={setBio} rows={3} />
</Field>`} />
      </Section>

      <Section id="number-input" title="NumberInput — number + stepper" description="Numeric field s − / + tlačítky. Min/max/step/precision. Stepper disabled na hranicích.">
        <Preview><NumberInputDemo /></Preview>
        <CodeBlock code={`<NumberInput value={qty} onChange={setQty} min={0} max={99} />

{/* Decimal — precision 2, step 0.05 */}
<NumberInput value={vol} onChange={setVol} min={0} max={1} step={0.05} precision={2} />`} />
      </Section>

      <Section id="combobox" title="Combobox — searchable single-select" description="Input s typeahead filtrem + dropdown matchů. Pro >10 options kde scrollování je pomalejší než typing.">
        <Preview><ComboboxDemo /></Preview>
        <CodeBlock code={`<Combobox
  options={[{ value: 'fireball', label: 'Fireball', hint: 'Lvl 3' }, ...]}
  value={spell} onChange={setSpell} placeholder="Search…" />`} />
      </Section>

      <Section id="submit-button" title="SubmitButton — pending state via useFormStatus" description="`type='submit'` Button uvnitř `<form>`. Při pending stavu zamění label za `loadingLabel`. Postaveno na useFormStatus z React 19.">
        <Preview><SubmitButtonDemo /></Preview>
        <CodeBlock code={`<form action={saveAction}>
  <SubmitButton loadingLabel="Saving…">Save</SubmitButton>
</form>`} />
      </Section>

      <Section id="form" title="Form — submit wrapper" description="<form> wrapper s automatickým preventDefault, flex column layout.">
        <Preview><FormDemo /></Preview>
        <CodeBlock code={`<Form onSubmit={(e) => signup(data)}>
  <Field label="Email" required><Input value={data.email} onChange={…} /></Field>
  <Checkbox checked={data.terms} onChange={…}>I accept the terms</Checkbox>
  <Button type="submit" variant="success" disabled={!data.terms}>Sign up</Button>
</Form>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ Vždy obal Input / Select / TextArea / NumberInput / Combobox do <code style={{ color: textLow }}>Field</code> — link label + aria-describedby.</p>
          <p style={{ margin: 0 }}>✓ RadioGroup pro 2–7 možností. Pro víc → Select nebo Combobox.</p>
          <p style={{ margin: 0 }}>✓ Combobox pro {'>'} 10 položek nebo když je užitečný typeahead.</p>
          <p style={{ margin: 0 }}>✓ Toggle pro binární on/off. Checkbox pro multi-select.</p>
          <p style={{ margin: 0 }}>✓ Form automaticky volá `e.preventDefault()` — žádný native page refresh.</p>
          <p style={{ margin: 0 }}>{'✓ SubmitButton uvnitř `<form action={…}>` ukáže pending state přes useFormStatus.'}</p>
          <p style={{ margin: 0, color: textLow }}>Donjon variants existují pro Input / Select / Toggle / Slider. Pro Field, Radio, Checkbox, TextArea, NumberInput, Combobox, Form je jen TkajUI báze (sdílí ji obě libs).</p>
        </Stack>
      </Section>

      <Section id="anchors" title="Legacy URL → anchor map">
        <Stack gap="xs" style={{ fontSize: '0.8125rem', color: textMid }}>
          <p style={{ margin: 0 }}><code style={{ color: textLow }}>/inputs</code> → <code style={{ color: textLow }}>/form#input</code></p>
          <p style={{ margin: 0 }}><code style={{ color: textLow }}>/select</code> → <code style={{ color: textLow }}>/form#select</code></p>
          <p style={{ margin: 0 }}><code style={{ color: textLow }}>/toggle</code> → <code style={{ color: textLow }}>/form#toggle</code></p>
          <p style={{ margin: 0 }}><code style={{ color: textLow }}>/slider</code> → <code style={{ color: textLow }}>/form#slider</code></p>
          <p style={{ margin: 0, color: textLow }}>Staré routes jsou Navigate redirects — bookmarky kolegů fungují, jen je dostanou na sloučenou stránku.</p>
        </Stack>
      </Section>

      {/* No Grid needed but keep import alive */}
      <Grid columns={1} style={{ display: 'none' }}>marker</Grid>
    </ShowcasePage>
  )
}
