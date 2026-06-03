import { useState } from 'react'
import {
  Field, Form, Radio, RadioGroup, Checkbox, CheckboxGroup,
} from '../lib/tkajui/Form'
import Input from '../lib/tkajui/Input'
import Select from '../lib/tkajui/Select'
import Button from '../lib/tkajui/Button'
import TextArea from '../lib/tkajui/TextArea'
import NumberInput from '../lib/tkajui/NumberInput'
import Combobox from '../lib/tkajui/Combobox'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

const COUNTRIES = [
  { value: 'cz', label: 'Czech Republic' },
  { value: 'sk', label: 'Slovakia' },
  { value: 'at', label: 'Austria' },
  { value: 'de', label: 'Germany' },
]

const DIFFICULTIES = ['easy', 'normal', 'hard', 'nightmare']

function FieldDemo() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const validate = () => setError(email.includes('@') ? '' : 'Email must contain @')
  return (
    <Stack gap="md">
      <Field
        label="Email"
        required
        hint="We'll never share your email."
        error={error}
      >
        <Input value={email} onChange={setEmail} placeholder="you@example.com" onBlur={validate} />
      </Field>
      <Field label="Country" hint="Where do you live?">
        <Select options={COUNTRIES} value="" onChange={() => {}} placeholder="Choose…" />
      </Field>
    </Stack>
  )
}

function RadioGroupDemo() {
  const [difficulty, setDifficulty] = useState('normal')
  return (
    <Stack gap="lg">
      <RadioGroup
        label="Difficulty"
        value={difficulty}
        onChange={setDifficulty}
        hint="You can change this later in settings."
      >
        {DIFFICULTIES.map(d => (
          <Radio key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</Radio>
        ))}
      </RadioGroup>
      <RadioGroup
        label="Genre"
        value="rpg"
        onChange={() => {}}
        orientation="horizontal"
      >
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
      <Checkbox checked={single} onChange={setSingle}>
        Subscribe to newsletter (standalone)
      </Checkbox>
      <CheckboxGroup
        label="Options"
        value={features}
        onChange={setFeatures}
        hint={`Selected: ${features.join(', ') || 'none'}`}
      >
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
        <TextArea value="Short" onChange={() => {}} rows={2} />
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
      <Field label="Disabled state">
        <NumberInput value={42} onChange={() => {}} disabled />
      </Field>
      <Field label="With error" error="Value must be positive">
        <NumberInput value={-3} onChange={() => {}} />
      </Field>
    </Stack>
  )
}

const SPELLS = [
  { value: 'firebolt',     label: 'Firebolt',          hint: 'Lvl 1' },
  { value: 'magic-missile', label: 'Magic Missile',    hint: 'Lvl 1' },
  { value: 'fireball',     label: 'Fireball',          hint: 'Lvl 3' },
  { value: 'lightning',    label: 'Lightning Bolt',    hint: 'Lvl 3' },
  { value: 'heal',         label: 'Cure Wounds',       hint: 'Lvl 1' },
  { value: 'invisibility', label: 'Invisibility',      hint: 'Lvl 2' },
  { value: 'teleport',     label: 'Teleport',          hint: 'Lvl 5' },
  { value: 'meteor',       label: 'Meteor Swarm',      hint: 'Lvl 9' },
  { value: 'resurrect',    label: 'Resurrect',         hint: 'Lvl 7', disabled: true },
  { value: 'wish',         label: 'Wish',              hint: 'Lvl 9', disabled: true },
]

function ComboboxDemo() {
  const [spell, setSpell] = useState('fireball')
  return (
    <Stack gap="md">
      <Field label="Select a spell" hint="Type to filter — Arrow keys, Enter, Esc, Backspace to clear.">
        <Combobox options={SPELLS} value={spell} onChange={setSpell} placeholder="Search spells…" />
      </Field>
      <Field label="Smaller (sm) — no clearable">
        <Combobox options={SPELLS} value={null} onChange={() => {}} size="sm" clearable={false} />
      </Field>
    </Stack>
  )
}

function FormDemo() {
  const [submitted, setSubmitted] = useState(null)
  const [data, setData] = useState({ email: '', password: '', terms: false })
  return (
    <Stack gap="md" style={{ background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
      <Form
        onSubmit={() => setSubmitted({ ...data })}
        gap={12}
      >
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
      title="Form primitives"
      description="Field + Radio/RadioGroup + Checkbox/CheckboxGroup + Form — kompletní sada pro stavbu formulářů. Native form semantics, fieldset/legend pro screen readery, aria-describedby, aria-invalid, required marker."
      componentSlugs={['field', 'form', 'radio', 'radio-group', 'checkbox', 'checkbox-group', 'text-area', 'number-input', 'combobox']}
    >
      <Section
        id="field"
        title="Field — label + input + hint + error composer"
        description="Klonuje single child input element a injektuje `id` + `aria-describedby` (link na hint/error). Pair s Input, Select, Toggle, atd."
      >
        <Preview>
          <FieldDemo />
        </Preview>
        <CodeBlock code={`<Field label="Email" required hint="We'll never share it" error={emailError}>
  <Input value={email} onChange={setEmail} />
</Field>`} />
      </Section>

      <Section
        id="radio-group"
        title="RadioGroup — single-choice"
        description="Provider pro skupinu Radio buttonů. Sdílí name/value/onChange přes context. Fieldset + legend pro a11y."
      >
        <Preview>
          <RadioGroupDemo />
        </Preview>
        <CodeBlock code={`const [diff, setDiff] = useState('normal')

<RadioGroup label="Difficulty" value={diff} onChange={setDiff}>
  <Radio value="easy">Easy</Radio>
  <Radio value="normal">Normal</Radio>
  <Radio value="hard">Hard</Radio>
</RadioGroup>

{/* Horizontal layout */}
<RadioGroup label="Genre" orientation="horizontal" value={g} onChange={setG}>
  <Radio value="rpg">RPG</Radio>
  <Radio value="strategy">Strategy</Radio>
</RadioGroup>`} />
      </Section>

      <Section
        id="checkbox-group"
        title="Checkbox + CheckboxGroup — multi-choice"
        description="Standalone Checkbox má `checked` + `onChange(boolean)`. V CheckboxGroup → `value` per option, group spravuje array of selected."
      >
        <Preview>
          <CheckboxGroupDemo />
        </Preview>
        <CodeBlock code={`const [features, setFeatures] = useState(['multiplayer'])

<CheckboxGroup label="Options" value={features} onChange={setFeatures}>
  <Checkbox value="multiplayer">Multiplayer</Checkbox>
  <Checkbox value="permadeath">Permadeath</Checkbox>
  <Checkbox value="hardmode">Hard mode</Checkbox>
</CheckboxGroup>

{/* Standalone */}
<Checkbox checked={subscribe} onChange={setSubscribe}>
  Subscribe to newsletter
</Checkbox>`} />
      </Section>

      <Section
        id="text-area"
        title="TextArea — multi-line text input"
        description="Thin wrapper okolo `<Input multiline>` s vlastním API pro jasné multi-line use cases. Auto-grow přes CSS field-sizing: content."
      >
        <Preview>
          <TextAreaDemo />
        </Preview>
        <CodeBlock code={`<Field label="Bio" hint="Auto-grows">
  <TextArea value={bio} onChange={setBio} rows={3} />
</Field>`} />
      </Section>

      <Section
        id="number-input"
        title="NumberInput — number + stepper buttons"
        description="Numeric text field s − / + tlačítky. Min/max/step/precision. Stepper disabled na hranicích. Při blur se commit zaokrouhlí na precision."
      >
        <Preview>
          <NumberInputDemo />
        </Preview>
        <CodeBlock code={`const [qty, setQty] = useState(5)

<Field label="Quantity">
  <NumberInput value={qty} onChange={setQty} min={0} max={99} />
</Field>

{/* Decimal — precision 2, step 0.05 */}
<NumberInput value={vol} onChange={setVol} min={0} max={1} step={0.05} precision={2} />`} />
      </Section>

      <Section
        id="combobox"
        title="Combobox — searchable single-select"
        description="Input s typeahead filtrem + dropdown matchů. Pro >10 options kde scrollování je pomalejší než typing. Arrow keys, Enter, Esc, Backspace pro clear."
      >
        <Preview>
          <ComboboxDemo />
        </Preview>
        <CodeBlock code={`const [spell, setSpell] = useState(null)

<Combobox
  options={[
    { value: 'fireball', label: 'Fireball', hint: 'Lvl 3' },
    { value: 'heal',     label: 'Cure Wounds' },
    { value: 'wish',     label: 'Wish', hint: 'Lvl 9', disabled: true },
  ]}
  value={spell}
  onChange={setSpell}
  placeholder="Search spells…"
/>`} />
      </Section>

      <Section
        id="form"
        title="Form — submit wrapper"
        description="<form> wrapper s automatickým preventDefault, flex column layout. Spojí Field + Checkbox + Button do reálného formuláře."
      >
        <Preview>
          <FormDemo />
        </Preview>
        <CodeBlock code={`<Form onSubmit={(e) => signup(data)}>
  <Field label="Email" required>
    <Input value={data.email} onChange={v => setData({ ...data, email: v })} />
  </Field>
  <Field label="Password" required hint="At least 8 characters">
    <Input value={data.password} onChange={v => setData({ ...data, password: v })} />
  </Field>
  <Checkbox checked={data.terms} onChange={v => setData({ ...data, terms: v })}>
    I accept the terms
  </Checkbox>
  <Inline justify="end" gap="sm">
    <Button onClick={reset}>Reset</Button>
    <Button type="submit" variant="success" disabled={!data.terms}>Sign up</Button>
  </Inline>
</Form>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid }}>
          <p style={{ margin: 0 }}>✓ Field vždy obklopí input — automaticky linkne label + aria-describedby.</p>
          <p style={{ margin: 0 }}>✓ RadioGroup pro 2–7 možností. Pro víc → Select.</p>
          <p style={{ margin: 0 }}>✓ Checkbox pro binární toggle. CheckboxGroup pro 2+ nezávislé volby.</p>
          <p style={{ margin: 0 }}>✓ Form automaticky volá `e.preventDefault()` — žádný native page refresh.</p>
          <p style={{ margin: 0 }}>✓ Submit button má `type=&quot;submit&quot;` aby spustil onSubmit (Enter na inputu).</p>
          <p style={{ margin: 0 }}>✗ Nepoužívej standalone Checkbox v CheckboxGroup — context se přepíše.</p>
          <p style={{ margin: 0, color: textLow }}>Donjon-themed varianty (DonjonRadio, DonjonCheckbox) zatím chybí — viz TODO.</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
