import { useState } from 'react'
import DonjonInput from '../lib/donjon/DonjonInput'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M6.5 1a5.5 5.5 0 1 0 3.797 9.504l2.6 2.6a.75.75 0 1 0 1.06-1.06l-2.6-2.6A5.5 5.5 0 0 0 6.5 1ZM2.5 6.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"/>
  </svg>
)

const KeyIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M10.5 1a4.5 4.5 0 0 1 1.443 8.765l-2.243 2.243a.5.5 0 0 1-.353.146H7.5v1a.5.5 0 0 1-.5.5H6v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.793a.5.5 0 0 1 .146-.353l4.765-4.766A4.5 4.5 0 0 1 10.5 1Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 1a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
  </svg>
)

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M8 3C4.5 3 1.5 5.5 0 8c1.5 2.5 4.5 5 8 5s6.5-2.5 8-5c-1.5-2.5-4.5-5-8-5Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
  </svg>
)

const AtIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M10.5 5A3.5 3.5 0 0 0 5 8.5a2.5 2.5 0 0 0 5 0V7.75a.75.75 0 0 1 1.5 0V8.5a4 4 0 1 1-2-3.464V4.25a.75.75 0 0 1 1.5 0V8.5A1 1 0 0 0 12 8.5a3.5 3.5 0 0 0-1.5-2.865V5Z"/>
  </svg>
)

export default function InputsPage() {
  const [basicValue, setBasicValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [errorValue, setErrorValue] = useState('wrong_password')
  const [hintValue, setHintValue] = useState('')

  return (
    <ShowcasePage
      title="Inputs"
      description="Donjon Fall fantasy text inputs — octagon clip-path, gold/bronze borders, focus glow and error states."
      componentSlug="donjon-input"
    >
      {/* Sizes */}
      <Section
        title="Sizes"
        description="Three fixed heights: sm (36px), md (44px), lg (52px)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <DonjonInput size="sm" label="Small (36px)" placeholder="Small input…" value="" onChange={() => {}} />
            <DonjonInput size="md" label="Medium (44px)" placeholder="Medium input…" value="" onChange={() => {}} />
            <DonjonInput size="lg" label="Large (52px)" placeholder="Large input…" value="" onChange={() => {}} />
          </div>
        </Preview>
        <CodeBlock code={`<DonjonInput size="sm" label="Small" placeholder="Small input…" value={val} onChange={setVal} />
<DonjonInput size="md" label="Medium" placeholder="Medium input…" value={val} onChange={setVal} />
<DonjonInput size="lg" label="Large" placeholder="Large input…" value={val} onChange={setVal} />`} />
      </Section>

      {/* States */}
      <Section
        title="States"
        description="Default, focused (click to try), error, and disabled states."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <DonjonInput label="Default" placeholder="Click to focus…" value={basicValue} onChange={e => setBasicValue(e.target.value)} />
            <DonjonInput label="Error" placeholder="Enter password" value={errorValue} onChange={e => setErrorValue(e.target.value)} error="Incorrect credentials. Try again." />
            <DonjonInput label="Disabled" placeholder="This field is locked" value="Locked value" onChange={() => {}} disabled />
          </div>
        </Preview>
        <CodeBlock code={`<DonjonInput label="Default" value={val} onChange={e => setVal(e.target.value)} />
<DonjonInput label="Error" value={val} onChange={e => setVal(e.target.value)} error="Incorrect credentials." />
<DonjonInput label="Disabled" value="Locked" onChange={() => {}} disabled />`} />
      </Section>

      {/* With icons */}
      <Section
        title="With Icons"
        description="Leading and trailing icons in gold. Pass any React node as leadingIcon or trailingIcon."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <DonjonInput
              label="Search"
              placeholder="Search the realm…"
              leadingIcon={<SearchIcon />}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <DonjonInput
              label="Email Address"
              placeholder="hero@dungeon.fall"
              leadingIcon={<AtIcon />}
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
            />
            <DonjonInput
              label="Password"
              placeholder="Enter secret passphrase…"
              leadingIcon={<KeyIcon />}
              trailingIcon={<EyeIcon />}
              type="password"
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
            />
          </div>
        </Preview>
        <CodeBlock code={`<DonjonInput
  label="Search"
  placeholder="Search the realm…"
  leadingIcon={<SearchIcon />}
  value={val}
  onChange={e => setVal(e.target.value)}
/>
<DonjonInput
  label="Password"
  leadingIcon={<KeyIcon />}
  trailingIcon={<EyeIcon />}
  type="password"
  value={val}
  onChange={e => setVal(e.target.value)}
/>`} />
      </Section>

      {/* Hint text */}
      <Section
        title="Hint Text"
        description="Helper text displayed below the input in muted bronze. Replaced by error when error prop is set."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <DonjonInput
              label="Hero Name"
              placeholder="Choose your battle name…"
              hint="Must be 3–24 characters, letters only."
              value={hintValue}
              onChange={e => setHintValue(e.target.value)}
            />
            <DonjonInput
              label="Guild Code"
              placeholder="Enter invite code…"
              hint="Ask your guild master for the code."
              value=""
              onChange={() => {}}
            />
          </div>
        </Preview>
        <CodeBlock code={`<DonjonInput
  label="Hero Name"
  placeholder="Choose your battle name…"
  hint="Must be 3–24 characters, letters only."
  value={val}
  onChange={e => setVal(e.target.value)}
/>`} />
      </Section>
    </ShowcasePage>
  )
}
