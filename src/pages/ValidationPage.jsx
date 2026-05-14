import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonBadge from '../lib/donjon/DonjonBadge'

/* ── Field with state ── */
function ValidatedField({ label, value, state = 'default', hint, error, success }) {
  const borders = {
    default:  '#8F745440',
    focus:    '#B8956A',
    error:    '#C04040',
    success:  '#40A055',
    warning:  '#C08040',
    disabled: '#8F745420',
  }
  const bgs = {
    default:  '#12102A',
    focus:    '#12102A',
    error:    '#C0404010',
    success:  '#40A05510',
    warning:  '#C0804010',
    disabled: '#0E0C22',
  }
  const border = borders[state] ?? borders.default
  const bg     = bgs[state]     ?? bgs.default

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 220, maxWidth: 280 }}>
      <label style={{ fontSize: '0.75rem', color: '#8F9CB3', display: 'flex', gap: 6, alignItems: 'center' }}>
        {label}
        {state === 'error'   && <DonjonBadge variant="danger"  size="sm">chyba</DonjonBadge>}
        {state === 'success' && <DonjonBadge variant="success" size="sm">ok</DonjonBadge>}
      </label>
      <div style={{
        padding: '7px 10px',
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: 3,
        fontSize: '0.8125rem',
        color: state === 'disabled' ? '#4A4870' : '#F0E6D3',
        cursor: state === 'disabled' ? 'not-allowed' : 'text',
      }}>
        {value || <span style={{ color: '#4A4870' }}>Placeholder</span>}
      </div>
      {error   && <p style={{ margin: 0, fontSize: '0.75rem', color: '#C04040', display: 'flex', gap: 5, alignItems: 'center', lineHeight: 1.3 }}>
        <svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11" style={{ flexShrink: 0 }}>
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 7a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
        {error}
      </p>}
      {success && <p style={{ margin: 0, fontSize: '0.75rem', color: '#40A055', display: 'flex', gap: 5, alignItems: 'center', lineHeight: 1.3 }}>
        <svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11" style={{ flexShrink: 0 }}>
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
        </svg>
        {success}
      </p>}
      {hint && !error && !success && (
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A4870', lineHeight: 1.3 }}>{hint}</p>
      )}
    </div>
  )
}

/* ── Strength bar ── */
function PasswordStrength({ strength = 0 }) {
  const levels = [
    { label: 'Velmi slabé', color: '#C04040' },
    { label: 'Slabé',       color: '#C08040' },
    { label: 'Střední',     color: '#C0B040' },
    { label: 'Silné',       color: '#40A055' },
    { label: 'Velmi silné', color: '#2080C0' },
  ]
  const current = levels[Math.min(strength, levels.length - 1)]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 220 }}>
      <label style={{ fontSize: '0.75rem', color: '#8F9CB3' }}>Heslo</label>
      <div style={{ padding: '7px 10px', background: '#12102A', border: '1.5px solid #B8956A', borderRadius: 3, fontSize: '0.8125rem', color: '#F0E6D3' }}>
        ••••••••••
      </div>
      <div style={{ display: 'flex', gap: 3 }}>
        {levels.map((l, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= strength ? l.color : '#1A1830',
            transition: 'background 0.2s',
          }} />
        ))}
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: current.color }}>{current.label}</p>
    </div>
  )
}

export default function ValidationPage() {
  return (
    <ShowcasePage
      title="Validation Patterns"
      description="Vzory pro validaci vstupů — kdy validovat, jak zobrazit chybu, jak potvrdit správnost. Validace má vést uživatele, ne trestat ho."
    >

      {/* Strategie validace */}
      <Section
        id="strategie"
        title="Strategie validace"
        description="Kdy spustit validaci určuje uživatelský zážitek víc než co jiného."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600 }}>
            {[
              {
                strategy: 'onBlur (blur)',
                when: 'Po opuštění pole (výchozí)',
                pros: 'Uživatel není rušen při psaní',
                cons: 'Chyba se zobrazí až po odchodu z pole',
                use: 'Většina formulářových polí',
              },
              {
                strategy: 'onChange (live)',
                when: 'Při každé změně hodnoty',
                pros: 'Okamžitá zpětná vazba',
                cons: 'Chyba bliká při psaní — rušivé',
                use: 'Síla hesla, live search, formáty (e-mail)',
              },
              {
                strategy: 'onSubmit',
                when: 'Až při odeslání formuláře',
                pros: 'Uživatel není rušen vůbec',
                cons: 'Pozdní zpětná vazba — uživatel musí scrollovat k chybám',
                use: 'Multi-step wizard, komplexní formuláře',
              },
              {
                strategy: 'Hybridní (blur + submit)',
                when: 'onBlur pro každé pole + onSubmit pro souhrn',
                pros: 'Nejlepší kompromis pro delší formuláře',
                cons: 'Složitější implementace',
                use: 'Doporučeno pro formuláře s více poli',
              },
            ].map(({ strategy, when, pros, cons, use }) => (
              <div key={strategy} style={{ padding: '10px 14px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 4 }}>
                  <code style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#B8956A' }}>{strategy}</code>
                  <span style={{ fontSize: '0.75rem', color: '#4A4870' }}>{when}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#40A055', lineHeight: 1.4 }}>✓ {pros}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#C04040', lineHeight: 1.4 }}>✗ {cons}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>Použij: {use}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Stavy pole */}
      <Section
        id="stavy-pole"
        title="Stavy validovaného pole"
        description="Každý stav má vlastní border, background a doprovodný text."
      >
        <Preview>
          <ValidatedField
            label="Default"
            state="default"
            hint="Jméno hráče se zobrazí v lobby."
          />
          <ValidatedField
            label="Focus"
            state="focus"
            value="Hráč1"
            hint="Vyplň jméno pro lobby."
          />
          <ValidatedField
            label="Chyba"
            state="error"
            value=""
            error="Jméno nesmí být prázdné."
          />
          <ValidatedField
            label="Úspěch"
            state="success"
            value="Hráč1"
            success="Jméno je dostupné."
          />
          <ValidatedField
            label="Varování"
            state="warning"
            value="Hráč123456789"
            hint="Jméno je příliš dlouhé — bude zkráceno na 12 znaků."
          />
          <ValidatedField
            label="Disabled"
            state="disabled"
            value="Nelze měnit"
          />
        </Preview>
        <CodeBlock code={`/* Stav pole — tabulka hodnot */
const FIELD_STATES = {
  default:  { border: '#8F745440', bg: '#12102A' },
  focus:    { border: '#B8956A',   bg: '#12102A' },
  error:    { border: '#C04040',   bg: '#C0404010' },
  success:  { border: '#40A055',   bg: '#40A05510' },
  warning:  { border: '#C08040',   bg: '#C0804010' },
  disabled: { border: '#8F745420', bg: '#0E0C22' },
}

// Priorita: error > warning > success > focus > default
const state = error ? 'error' : warning ? 'warning' : validated ? 'success' : focused ? 'focus' : 'default'`} />
      </Section>

      {/* Síla hesla */}
      <Section
        id="sila-hesla"
        title="Síla hesla"
        description="Progressivní indikátor síly — 5 úrovní, barevné bloky + textový label."
      >
        <Preview>
          <PasswordStrength strength={0} />
          <PasswordStrength strength={1} />
          <PasswordStrength strength={2} />
          <PasswordStrength strength={3} />
          <PasswordStrength strength={4} />
        </Preview>
        <CodeBlock code={`function getPasswordStrength(password) {
  let score = 0
  if (password.length >= 8)  score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return Math.min(score, 4) // 0–4
}

const LEVELS = [
  { label: 'Velmi slabé', color: '#C04040' },
  { label: 'Slabé',       color: '#C08040' },
  { label: 'Střední',     color: '#C0B040' },
  { label: 'Silné',       color: '#40A055' },
  { label: 'Velmi silné', color: '#2080C0' },
]`} />
      </Section>

      {/* Souhrn chyb */}
      <Section
        id="souhrn-chyb"
        title="Souhrn chyb formuláře"
        description="Při onSubmit s chybami — zobraz souhrn nahoře + scrolluj na první chybu."
      >
        <Preview>
          <div style={{ maxWidth: 360, width: '100%' }}>
            <div style={{
              padding: '12px 14px', background: '#3D181820',
              border: '1px solid #C0404050', borderRadius: 4,
              marginBottom: 12,
            }}>
              <p style={{ margin: '0 0 6px', fontSize: '0.8125rem', fontWeight: 700, color: '#C04040', display: 'flex', gap: 6, alignItems: 'center' }}>
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 7a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                Formulář obsahuje 3 chyby
              </p>
              <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {['Jméno hráče je povinné.', 'E-mail má neplatný formát.', 'Heslo musí mít min. 8 znaků.'].map(e => (
                  <li key={e} style={{ fontSize: '0.75rem', color: '#8F9CB3' }}>{e}</li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <ValidatedField label="Jméno hráče" state="error"   value=""        error="Jméno je povinné." />
              <ValidatedField label="E-mail"       state="error"   value="neco@"   error="Neplatný formát e-mailu." />
              <ValidatedField label="Heslo"        state="error"   value="1234"    error="Min. 8 znaků." />
            </div>
          </div>
        </Preview>
        <CodeBlock code={`// onSubmit — validace + scroll na první chybu
function handleSubmit(e) {
  e.preventDefault()
  const errors = validate(formValues)
  if (Object.keys(errors).length > 0) {
    setErrors(errors)
    // Scroll na první pole s chybou
    firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    firstErrorRef.current?.focus()
    return
  }
  submitForm(formValues)
}

// Souhrn chyb — role="alert" pro screen reader
{hasErrors && (
  <div role="alert" aria-live="assertive">
    <p>Formulář obsahuje {errorCount} chyb</p>
    <ul>{errorMessages.map(msg => <li key={msg}>{msg}</li>)}</ul>
  </div>
)}`} />
      </Section>

      {/* Vzory textace */}
      <Section
        id="textace"
        title="Textace validačních zpráv"
        description="Chybová zpráva musí říct co je špatně a jak to opravit — ne jen co nestačí."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 560 }}>
            {[
              { bad: 'Povinné pole.',              good: 'Jméno hráče nesmí být prázdné.' },
              { bad: 'Neplatný vstup.',            good: 'E-mail musí obsahovat @ a doménu (např. jmeno@email.cz).' },
              { bad: 'Heslo nesplňuje podmínky.',  good: 'Heslo musí mít min. 8 znaků, jedno velké písmeno a číslo.' },
              { bad: 'Hodnota mimo rozsah.',       good: 'Počet kol musí být mezi 1 a 20.' },
              { bad: 'Jméno existuje.',            good: 'Toto jméno je již obsazené — zkus přidat číslo nebo přezdívku.' },
            ].map(({ bad, good }) => (
              <div key={bad} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#3D181820', border: '1px solid #C0404030' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#C04040', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Špatně</p>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F9CB3' }}>{bad}</p>
                </div>
                <div style={{ padding: '8px 12px', background: '#183D2020', border: '1px solid #40A05530' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#40A055', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ Dobře</p>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F0E6D3' }}>{good}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Výchozí strategie: validuj onBlur — uživatel není rušen při psaní.</p>
          <p>✓ Chybová zpráva musí říct <em>co</em> je špatně a <em>jak</em> to opravit.</p>
          <p>✓ Zobraz chybu vždy pod polem (ne nad ním) — tok čtení je shora dolů.</p>
          <p>✓ Červený border + ikona + text — nikdy jen barva jako jediný nosič informace.</p>
          <p>✓ Úspěšnou validaci potvrď zeleným stavem jen tam, kde je to pro uživatele cenné (jméno dostupné, e-mail platný).</p>
          <p>✗ Nezobrazuj chybu před tím, než uživatel opustil pole — netrestej ho za psaní.</p>
          <p>✗ Nepoužívej browser-native validation (required, pattern atribut) — ovládej validaci ručně pro konzistentní UX.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
