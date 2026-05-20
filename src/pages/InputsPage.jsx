import { useState, useActionState } from 'react'
import Input from '../lib/tkajui/Input'
import DonjonInput from '../lib/donjon/DonjonInput'
import Select from '../lib/tkajui/Select'
import DonjonSelect from '../lib/donjon/DonjonSelect'
import Button from '../lib/tkajui/Button'
import DonjonButton from '../lib/donjon/DonjonButton'
import SubmitButton from '../lib/tkajui/SubmitButton'
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

const DIFFICULTY_OPTIONS = [
  { value: 'easy',     label: 'Lehká — pro začátečníky' },
  { value: 'standard', label: 'Standardní' },
  { value: 'hard',     label: 'Těžká — zkušení hráči' },
  { value: 'hardcore', label: 'Hardcore — žádné chyby' },
]

/* ── MultilineDemo — ukázka field-sizing-content ── */
function MultilineDemo({ I, cmp }) {
  const [val, setVal] = useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}>
      <I
        label="Popis strategie"
        placeholder="Popiš svou taktiku pro toto kolo…"
        multiline
        rows={3}
        value={val}
        onChange={e => setVal(e.target.value)}
        hint="Textarea roste s obsahem (field-sizing:content) — žádný JS resize handler."
      />
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#6868a0' }}>
        Délka: {val.length} znaků · {val.split('\n').length} řádků
      </p>
    </div>
  )
}

/* ── SubmitButtonDemo — ukázka useFormStatus + useActionState ── */
async function saveProfileAction(prevState, formData) {
  await new Promise(r => setTimeout(r, 1500))
  const name = formData.get('playerName')?.trim()
  if (!name) return { error: 'Zadej jméno hráče.', ok: false, name: null }
  return { error: null, ok: true, name }
}

function SubmitButtonDemo() {
  const [state, formAction] = useActionState(saveProfileAction, { error: null, ok: false, name: null })
  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
      <Input
        name="playerName"
        label="Jméno hráče"
        placeholder="Zadej jméno…"
        error={state.error ?? undefined}
      />
      {/* pending stav přijde automaticky — žádný useState pro loading */}
      <SubmitButton variant="primary" loadingLabel="Ukládám…">
        Uložit profil
      </SubmitButton>
      {state.ok && (
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#5ab87a' }}>
          ✓ Uloženo: <strong>{state.name}</strong>
        </p>
      )}
    </form>
  )
}

function InputContent() {
  const lib = useLibVariant()
  const I   = lib === 'tkajui' ? Input : DonjonInput
  const S   = lib === 'tkajui' ? Select : DonjonSelect
  const Btn = lib === 'tkajui' ? Button : DonjonButton
  const cmp = lib === 'tkajui' ? 'Input' : 'DonjonInput'
  const sCmp  = lib === 'tkajui' ? 'Select' : 'DonjonSelect'
  const bCmp  = lib === 'tkajui' ? 'Button' : 'DonjonButton'

  const [basicValue,    setBasicValue]    = useState('')
  const [emailValue,    setEmailValue]    = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [searchValue,   setSearchValue]   = useState('')
  const [errorValue,    setErrorValue]    = useState('wrong_password')
  const [hintValue,     setHintValue]     = useState('')

  // Login form state
  const [loginEmail,    setLoginEmail]    = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginErrors,   setLoginErrors]   = useState({})
  const [loginOk,       setLoginOk]       = useState(false)

  function handleLogin() {
    const errs = {}
    if (!loginEmail.includes('@')) errs.email = 'Zadej platnou e-mailovou adresu.'
    if (loginPassword.length < 6)  errs.password = 'Heslo musí mít alespoň 6 znaků.'
    setLoginErrors(errs)
    setLoginOk(Object.keys(errs).length === 0)
  }

  // Settings form state
  const [heroName,     setHeroName]     = useState('')
  const [difficulty,   setDifficulty]   = useState('standard')
  const [settingsErrors, setSettingsErrors] = useState({})
  const [settingsSaved,  setSettingsSaved]  = useState(false)

  function handleSettings() {
    const errs = {}
    if (heroName.trim().length < 3) errs.heroName = 'Jméno hrdiny musí mít alespoň 3 znaky.'
    if (heroName.trim().length > 24) errs.heroName = 'Jméno hrdiny nesmí být delší než 24 znaků.'
    setSettingsErrors(errs)
    setSettingsSaved(Object.keys(errs).length === 0)
  }

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

      {/* Multiline — field-sizing-content (Tailwind v4 / CSS 2024) */}
      <Section
        id="multiline"
        title="Multiline — field-sizing-content (Tailwind v4)"
        description="Prop multiline=true přepne na <textarea> s CSS field-sizing:content — pole roste s obsahem automaticky, bez JavaScriptu. Tailwind v4 utilita: field-sizing-content."
      >
        <Preview>
          <MultilineDemo I={I} cmp={cmp} />
        </Preview>
        <CodeBlock code={`{/* field-sizing:content → textarea roste s textem, min-height z rows */}
<${cmp}
  label="Popis strategie"
  placeholder="Popiš svou taktiku…"
  multiline
  rows={3}
  value={value}
  onChange={e => setValue(e.target.value)}
/>`} />
      </Section>

      {/* Kompozice — login form */}
      <Section
        id="form-prihlaseni"
        title="Kompozice — přihlašovací formulář"
        description="Input + Button + live validace po kliknutí na Přihlásit. Ukazuje typický pattern: validace až po submit, ne při psaní."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 360 }}>
            {loginOk && (
              <div style={{
                padding: '8px 12px', borderRadius: 4,
                background: '#183D2020', border: '1px solid #40A05550',
                fontSize: '0.8125rem', color: '#40A055',
              }}>
                ✓ Přihlášení úspěšné! (demo)
              </div>
            )}
            <I
              label="E-mail"
              type="email"
              placeholder="hero@dungeon.fall"
              leadingIcon={<AtIcon />}
              value={loginEmail}
              onChange={e => { setLoginEmail(e.target.value); setLoginOk(false) }}
              error={loginErrors.email}
            />
            <I
              label="Heslo"
              type="password"
              placeholder="Alespoň 6 znaků…"
              leadingIcon={<KeyIcon />}
              value={loginPassword}
              onChange={e => { setLoginPassword(e.target.value); setLoginOk(false) }}
              error={loginErrors.password}
            />
            <Btn onClick={handleLogin} style={{ width: '100%', justifyContent: 'center' }}>
              Přihlásit se
            </Btn>
          </div>
        </Preview>
        <CodeBlock code={`const [email,    setEmail]    = useState('')
const [password, setPassword] = useState('')
const [errors,   setErrors]   = useState({})

function handleSubmit() {
  const errs = {}
  if (!email.includes('@'))    errs.email    = 'Zadej platnou e-mailovou adresu.'
  if (password.length < 6)     errs.password = 'Heslo musí mít alespoň 6 znaků.'
  setErrors(errs)
  if (Object.keys(errs).length === 0) login(email, password)
}

<${cmp} label="E-mail" type="email" value={email}
  onChange={e => setEmail(e.target.value)} error={errors.email} />
<${cmp} label="Heslo"  type="password" value={password}
  onChange={e => setPassword(e.target.value)} error={errors.password} />
<${bCmp} onClick={handleSubmit}>Přihlásit se</${bCmp}>`} />
      </Section>

      {/* Kompozice — settings form */}
      <Section
        id="form-nastaveni"
        title="Kompozice — formulář nastavení"
        description="Input + Select + Button — typický profil / nastavení hráče. Kombinuje textové pole, výběr a potvrzovací tlačítko."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 360 }}>
            {settingsSaved && (
              <div style={{
                padding: '8px 12px', borderRadius: 4,
                background: '#183D2020', border: '1px solid #40A05550',
                fontSize: '0.8125rem', color: '#40A055',
              }}>
                ✓ Nastavení uloženo! (demo)
              </div>
            )}
            <I
              label="Jméno hrdiny"
              placeholder="3–24 znaků…"
              hint="Zobrazí se ostatním hráčům."
              value={heroName}
              onChange={e => { setHeroName(e.target.value); setSettingsSaved(false) }}
              error={settingsErrors.heroName}
            />
            <S
              label="Obtížnost"
              options={DIFFICULTY_OPTIONS}
              value={difficulty}
              onChange={setDifficulty}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Btn variant="link" size="sm" onClick={() => { setHeroName(''); setDifficulty('standard'); setSettingsSaved(false); setSettingsErrors({}) }}>
                Reset
              </Btn>
              <Btn onClick={handleSettings}>
                Uložit nastavení
              </Btn>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`const [heroName,   setHeroName]   = useState('')
const [difficulty, setDifficulty] = useState('standard')
const [errors,     setErrors]     = useState({})

function handleSave() {
  const errs = {}
  if (heroName.trim().length < 3)  errs.heroName = 'Alespoň 3 znaky.'
  if (heroName.trim().length > 24) errs.heroName = 'Max 24 znaků.'
  setErrors(errs)
  if (Object.keys(errs).length === 0) saveSettings({ heroName, difficulty })
}

<${cmp}
  label="Jméno hrdiny"
  hint="Zobrazí se ostatním hráčům."
  value={heroName}
  onChange={e => setHeroName(e.target.value)}
  error={errors.heroName}
/>
<${sCmp}
  label="Obtížnost"
  options={[
    { value: 'easy',     label: 'Lehká' },
    { value: 'standard', label: 'Standardní' },
    { value: 'hard',     label: 'Těžká' },
  ]}
  value={difficulty}
  onChange={setDifficulty}
/>
<${bCmp} onClick={handleSave}>Uložit nastavení</${bCmp}>`} />
      </Section>

      {/* SubmitButton + useActionState — React 19 */}
      <Section
        id="submit-button"
        title="SubmitButton + useFormStatus (React 19)"
        description="SubmitButton automaticky čte stav odesílání z nadřazeného formuláře přes useFormStatus hook — žádný ruční useState pro loading."
      >
        <Preview>
          <SubmitButtonDemo />
        </Preview>
        <CodeBlock code={`import { useActionState } from 'react'
import SubmitButton from '@/lib/tkajui/SubmitButton'

// Async server action (nebo API call)
async function saveAction(prevState, formData) {
  await new Promise(r => setTimeout(r, 1500)) // simulace síťového volání
  const name = formData.get('playerName')
  if (!name?.trim()) return { error: 'Zadej jméno hráče.', ok: false }
  return { error: null, ok: true, name }
}

function MyForm() {
  const [state, formAction] = useActionState(saveAction, { error: null, ok: false })
  return (
    <form action={formAction}>
      <Input name="playerName" label="Jméno hráče" />
      {/* pending stav přijde automaticky z useFormStatus — žádný useState */}
      <SubmitButton variant="primary" loadingLabel="Ukládám…">
        Uložit profil
      </SubmitButton>
      {state.ok && <p>Uloženo: {state.name}</p>}
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  )
}`} />
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
