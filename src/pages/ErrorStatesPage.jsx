import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonButton from '../components/DonjonButton'
import DonjonBadge from '../components/DonjonBadge'

/* ── Error card ── */
function ErrorCard({ icon, title, desc, actions, severity = 'danger' }) {
  const colors = {
    danger:  { border: '#C04040', bg: '#3D1818', badge: 'danger'  },
    warning: { border: '#C08040', bg: '#3D2E10', badge: 'warning' },
  }
  const c = colors[severity] ?? colors.danger
  return (
    <div style={{
      padding: '20px 20px 16px',
      background: `linear-gradient(150deg,${c.bg} 0%,#12102A 100%)`,
      border: `1px solid ${c.border}44`,
      borderRadius: 4,
      display: 'flex', flexDirection: 'column', gap: 10,
      maxWidth: 340,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#F0E6D3' }}>{title}</p>
          <DonjonBadge variant={c.badge} size="sm" style={{ marginTop: 4 }}>{severity === 'danger' ? 'Chyba' : 'Upozornění'}</DonjonBadge>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F9CB3', lineHeight: 1.5 }}>{desc}</p>
      {actions && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {actions}
        </div>
      )}
    </div>
  )
}

/* ── Inline error ── */
function InlineError({ label, value, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 280 }}>
      <label style={{ fontSize: '0.75rem', color: '#8F9CB3' }}>{label}</label>
      <div style={{
        padding: '7px 10px',
        background: '#C0404018',
        border: '1.5px solid #C04040',
        borderRadius: 3,
        fontSize: '0.8125rem',
        color: '#F0E6D3',
      }}>
        {value}
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#C04040', display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 7a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
        {error}
      </p>
    </div>
  )
}

export default function ErrorStatesPage() {
  return (
    <ShowcasePage
      title="Error States"
      description="Vizuální vzory a pravidla pro chybové stavy — od inline validace po systémovou chybu. Každá chyba má kategorii, kanál a recovery akci."
    >

      {/* Kategorie chyb */}
      <Section
        id="kategorie"
        title="Kategorie chyb"
        description="Čtyři kategorie určují závažnost, kanál a recovery strategii."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 620 }}>
            {[
              { cat: 'Validační',   severity: 'Nízká',    channel: 'Inline (u pole)',      recovery: 'Uživatel opraví vstup',            example: 'Prázdné povinné pole, neplatný formát' },
              { cat: 'Akce',        severity: 'Střední',  channel: 'Toast danger',          recovery: 'Zopakovat akci nebo zvolit jinak', example: 'Nelegální tah, limit překročen' },
              { cat: 'Síť',         severity: 'Vysoká',   channel: 'Toast danger (trvalý)', recovery: 'Retry tlačítko, offline režim',    example: 'Chyba připojení, timeout serveru' },
              { cat: 'Systémová',   severity: 'Kritická', channel: 'Modal danger',          recovery: 'Reload nebo kontaktuj podporu',    example: 'Ztráta dat, render fail, crash stavu hry' },
            ].map(({ cat, severity, channel, recovery, example }) => (
              <div key={cat} style={{ display: 'grid', gridTemplateColumns: '90px 80px 160px 1fr', gap: 10, padding: '9px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'start' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#B8956A' }}>{cat}</span>
                <DonjonBadge variant={severity === 'Kritická' ? 'danger' : severity === 'Vysoká' ? 'danger' : severity === 'Střední' ? 'warning' : 'default'} size="sm">{severity}</DonjonBadge>
                <code style={{ fontSize: '0.75rem', color: '#8F9CB3' }}>{channel}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{recovery} — <em>{example}</em></span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Inline validace */}
      <Section
        id="inline"
        title="Inline validační chyba"
        description="Zobrazena přímo pod polem. Ikona + červený text + červený border na inputu."
      >
        <Preview>
          <InlineError label="Jméno hráče" value="" error="Jméno je povinné pole." />
          <InlineError label="Počet kol" value="0" error="Minimální počet kol je 1." />
          <InlineError label="Email" value="neplatny-email" error="Zadej platnou e-mailovou adresu." />
        </Preview>
        <CodeBlock code={`{/* V DonjonInput — prop error zobrazí inline chybu */}
<DonjonInput
  label="Jméno hráče"
  value={name}
  onChange={setName}
  error={name.trim() === '' ? 'Jméno je povinné pole.' : undefined}
/>

{/* Vlastní inline error pattern */}
<div>
  <input style={{ border: error ? '1.5px solid #C04040' : '…' }} />
  {error && (
    <p style={{ color: '#C04040', fontSize: '0.75rem' }}>
      <ErrorIcon /> {error}
    </p>
  )}
</div>`} />
      </Section>

      {/* Chyba akce */}
      <Section
        id="akce"
        title="Chyba akce"
        description="Nelegální tah, překročený limit, zamítnutá operace — toast danger nebo inline badge."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <DonjonBadge variant="danger">Nelegální tah</DonjonBadge>
            <DonjonBadge variant="warning">Limit dosažen (5 VP)</DonjonBadge>
            <DonjonBadge variant="danger">Hex obsazený</DonjonBadge>
          </div>
        </Preview>
        <CodeBlock code={`// Chyba akce → toast (krátká, auto-dismiss)
addToast({ title: 'Nelegální tah', message: 'Na tento hex nelze přesunout kostku.', variant: 'danger', duration: 4000 })

// Blocked hint → tooltip nebo inline badge
<Tooltip content="Hex je obsazený hráčem 2" variant="danger">
  <button style={blockedStyle}>Útok</button>
</Tooltip>`} />
      </Section>

      {/* Síťová chyba */}
      <Section
        id="sit"
        title="Síťová chyba"
        description="Trvalý toast s Retry akcí — uživatel musí chybu vědomě potvrdit nebo zopakovat."
      >
        <Preview>
          <ErrorCard
            icon="🔌"
            title="Chyba připojení"
            desc="Nepodařilo se připojit k serveru. Zkontroluj internetové připojení a zkus to znovu."
            severity="danger"
            actions={<>
              <DonjonButton size="sm" variant="danger">Zkusit znovu</DonjonButton>
              <DonjonButton size="sm">Hrát offline</DonjonButton>
            </>}
          />
        </Preview>
        <CodeBlock code={`// Síťová chyba → trvalý toast (duration: 0)
addToast({
  title: 'Chyba připojení',
  message: 'Nepodařilo se načíst data ze serveru.',
  variant: 'danger',
  duration: 0,  // uživatel musí zavřít ručně
})

// Nebo Error card v místě obsahu
{networkError && (
  <ErrorCard title="Chyba sítě" onRetry={fetchData} />
)}`} />
      </Section>

      {/* Systémová chyba */}
      <Section
        id="systemova"
        title="Systémová / kritická chyba"
        description="Modal danger — blokuje UI dokud uživatel nerozhodne."
      >
        <Preview>
          <ErrorCard
            icon="⚠️"
            title="Kritická chyba aplikace"
            desc="Stav hry byl poškozen a nelze pokračovat. Hra bude ukončena. Postup v tomto kole byl ztracen."
            severity="danger"
            actions={<>
              <DonjonButton size="sm" variant="danger">Restartovat hru</DonjonButton>
              <DonjonButton size="sm">Hlavní menu</DonjonButton>
            </>}
          />
        </Preview>
        <CodeBlock code={`{/* Systémová chyba → Modal danger */}
<Modal
  isOpen={!!criticalError}
  onClose={() => {}}         // nelze zavřít bez akce
  closeOnBackdrop={false}
  closeOnEscape={false}
  showCloseButton={false}
  title="Kritická chyba"
  variant="danger"
  footer={<>
    <DonjonButton variant="danger" onClick={restart}>Restartovat</DonjonButton>
  </>}
>
  {criticalError.message}
</Modal>`} />
      </Section>

      {/* Textace */}
      <Section
        id="textace"
        title="Textace chybových zpráv"
        description="Pravidla pro psaní srozumitelných chybových hlášek."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 560 }}>
            {[
              { bad: 'Error 403: Forbidden',              good: 'Nemáš oprávnění provést tuto akci.' },
              { bad: 'Invalid input',                     good: 'Jméno hráče nesmí být prázdné.' },
              { bad: 'Network request failed',            good: 'Nepodařilo se připojit k serveru. Zkus to znovu.' },
              { bad: 'Something went wrong',              good: 'Tah se nepodařilo dokončit. Stav hry je neporušen.' },
              { bad: 'Illegal move: hex occupied',        good: 'Tento hex je obsazený hráčem 2 — zvol jiný cíl.' },
            ].map(({ bad, good }) => (
              <div key={bad} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#3D181820', border: '1px solid #C0404030' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#C04040', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Špatně</p>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F9CB3', fontFamily: 'monospace' }}>{bad}</p>
                </div>
                <div style={{ padding: '8px 12px', background: '#183D2020', border: '1px solid #40A05530' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#40A055', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ Dobře</p>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F0E6D3' }}>{good}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-2">
          <p>✓ Piš co se stalo + proč + co dělat dál.</p>
          <p>✓ Vyhni se technickému žargonu — HTTP kódy, stack trace a identifikátory patří do logu, ne do UI.</p>
          <p>✗ Nezačínaj chybou — začni tím co uživatel potřebuje vědět.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
