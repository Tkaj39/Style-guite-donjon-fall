import { useState } from 'react'
import Input from '../lib/tkajui/Input'
import DonjonInput from '../lib/donjon/DonjonInput'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

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

function InputContent() {
  const lib = useLibVariant()
  const I   = lib === 'tkajui' ? Input : DonjonInput
  const cmp = lib === 'tkajui' ? 'Input' : 'DonjonInput'

  const [basicValue,    setBasicValue]    = useState('')
  const [emailValue,    setEmailValue]    = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [searchValue,   setSearchValue]   = useState('')
  const [errorValue,    setErrorValue]    = useState('wrong_password')
  const [hintValue,     setHintValue]     = useState('')

  return (
    <>
      <Section
        title="Sizes"
        description="Tři pevné výšky: sm (36px), md (44px), lg (52px)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <I size="sm" label="Small (36px)"  placeholder="Small input…"  value="" onChange={() => {}} />
            <I size="md" label="Medium (44px)" placeholder="Medium input…" value="" onChange={() => {}} />
            <I size="lg" label="Large (52px)"  placeholder="Large input…"  value="" onChange={() => {}} />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} size="sm" label="Small"  placeholder="Small input…"  value={val} onChange={setVal} />
<${cmp} size="md" label="Medium" placeholder="Medium input…" value={val} onChange={setVal} />
<${cmp} size="lg" label="Large"  placeholder="Large input…"  value={val} onChange={setVal} />`} />
      </Section>

      <Section
        title="States"
        description="Default, focused (klikni pro vyzkoušení), error a disabled."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <I label="Default"  placeholder="Klikni pro focus…" value={basicValue}  onChange={e => setBasicValue(e.target.value)} />
            <I label="Error"    placeholder="Enter password"     value={errorValue}  onChange={e => setErrorValue(e.target.value)} error="Incorrect credentials. Try again." />
            <I label="Disabled" placeholder="This field is locked" value="Locked value" onChange={() => {}} disabled />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} label="Default" value={val} onChange={e => setVal(e.target.value)} />
<${cmp} label="Error"   value={val} onChange={e => setVal(e.target.value)} error="Incorrect credentials." />
<${cmp} label="Disabled" value="Locked" onChange={() => {}} disabled />`} />
      </Section>

      <Section
        title="S ikonami"
        description="Přední a zadní ikony zlatou barvou. Libovolný ReactNode jako leadingIcon / trailingIcon."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <I label="Search"       placeholder="Search the realm…"         leadingIcon={<SearchIcon />} value={searchValue}   onChange={e => setSearchValue(e.target.value)} />
            <I label="Email"        placeholder="hero@dungeon.fall"          leadingIcon={<AtIcon />}     value={emailValue}    onChange={e => setEmailValue(e.target.value)} />
            <I label="Password"     placeholder="Enter secret passphrase…"  leadingIcon={<KeyIcon />} trailingIcon={<EyeIcon />} type="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp}
  label="Search"
  placeholder="Search the realm…"
  leadingIcon={<SearchIcon />}
  value={val}
  onChange={e => setVal(e.target.value)}
/>
<${cmp}
  label="Password"
  leadingIcon={<KeyIcon />}
  trailingIcon={<EyeIcon />}
  type="password"
  value={val}
  onChange={e => setVal(e.target.value)}
/>`} />
      </Section>

      <Section
        title="Hint text"
        description="Pomocný text pod inputem v tlumené barvě. Přepsán errorem pokud je nastaveno error prop."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <I label="Hero Name"  placeholder="Choose your battle name…" hint="Must be 3–24 characters, letters only." value={hintValue} onChange={e => setHintValue(e.target.value)} />
            <I label="Guild Code" placeholder="Enter invite code…"        hint="Ask your guild master for the code."   value="" onChange={() => {}} />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp}
  label="Hero Name"
  placeholder="Choose your battle name…"
  hint="Must be 3–24 characters, letters only."
  value={val}
  onChange={e => setVal(e.target.value)}
/>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy přidej <code className="text-brand-300">label</code> — i vizuálně skrytý label je nutný pro přístupnost.</p>
          <p>✓ <code className="text-brand-300">hint</code> pro nápovědu před interakcí, <code className="text-brand-300">error</code> až po validaci (ne hned při psaní).</p>
          <p>✓ <code className="text-brand-300">leadingIcon</code> pro kontext pole — lupa pro hledání, štít pro heslo, postava pro jméno hráče.</p>
          <p>✓ Pro výběr ze seznamu hodnot použij Select místo manuálního psaní.</p>
          <p>✗ Nepoužívej <code className="text-brand-300">placeholder</code> jako náhradu labelu — placeholder zmizí při psaní.</p>
          <p>✗ Nezobrazuj <code className="text-brand-300">error</code> hned při načtení stránky — až po první interakci uživatele.</p>
          <p>✗ Neblokuj odeslání formuláře jen proto, že pole je prázdné bez vizuálního error stavu.</p>
        </div>
      </Section>
    </>
  )
}

export default function InputsPage() {
  return (
    <ShowcasePage
      title="Inputs"
      description="Textová pole — oktagonální tvar, zlaté/bronzové bordery, focus glow a error stavy."
      componentSlugs={['donjon-input', 'input']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <InputContent />
    </ShowcasePage>
  )
}
