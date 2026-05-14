import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonBadge from '../lib/donjon/DonjonBadge'

/* ── Kontrast chip ── */
function ContrastChip({ fg, bg, label, ratio, pass }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      padding: '12px 16px', borderRadius: 4,
      background: bg, border: `1px solid ${pass ? '#40A05540' : '#C0404040'}`,
      minWidth: 120,
    }}>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: fg }}>{label}</span>
      <span style={{ fontSize: '0.625rem', color: fg, opacity: 0.7 }}>{ratio} : 1</span>
      <span style={{
        fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.08em',
        color: pass ? '#40A055' : '#C04040',
        background: pass ? '#40A05522' : '#C0404022',
        border: `1px solid ${pass ? '#40A05544' : '#C0404044'}`,
        padding: '1px 6px', borderRadius: 8,
      }}>
        {pass ? '✓ PASS' : '✗ FAIL'}
      </span>
    </div>
  )
}

/* ── Aria demo ── */
function AriaRow({ element, role, attrs, note }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 110px 1fr 1fr', gap: 10, padding: '9px 14px', borderBottom: '1px solid #8F745418', alignItems: 'start' }}>
      <code style={{ fontSize: '0.75rem', color: '#B8956A' }}>{element}</code>
      <code style={{ fontSize: '0.75rem', color: '#4080C0' }}>{role}</code>
      <code style={{ fontSize: '0.6875rem', color: '#8F9CB3', lineHeight: 1.5 }}>{attrs}</code>
      <span style={{ fontSize: '0.75rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
    </div>
  )
}

export default function AccessibilityPage() {
  return (
    <ShowcasePage
      title="Accessibility"
      description="Pravidla přístupnosti pro Donjon Fall UI. Cíl je WCAG 2.1 AA — kontrast, keyboard navigace, správná sémantika a podpora screen readerů."
    >

      {/* Kontrast */}
      <Section
        id="kontrast"
        title="Kontrast barev"
        description="WCAG 2.1 AA vyžaduje min. 4.5 : 1 pro normální text, 3 : 1 pro velký text a UI komponenty."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <ContrastChip fg="#F0E6D3" bg="#12102A" label="Hlavní text"      ratio="12.4" pass />
            <ContrastChip fg="#B8956A" bg="#12102A" label="Zlatý akcent"     ratio="5.8"  pass />
            <ContrastChip fg="#8F9CB3" bg="#12102A" label="Sekundární text"  ratio="4.6"  pass />
            <ContrastChip fg="#4A4870" bg="#12102A" label="Placeholder"      ratio="2.1"  pass={false} />
            <ContrastChip fg="#F0E6D3" bg="#2A2948" label="Text na kartě"    ratio="9.3"  pass />
            <ContrastChip fg="#8F7458" bg="#2A2948" label="Border text"      ratio="3.4"  pass={false} />
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-4">
          <p>⚠ <span style={{ color: '#C08040' }}>Placeholder (#4A4870)</span> a border text (#8F7458) nesplňují AA — nepoužívej je pro kritické informace. Jsou přijatelné pro dekorativní nebo kontextový obsah, kde je primární informace dostupná jinak.</p>
        </div>
      </Section>

      {/* Keyboard navigace */}
      <Section
        id="keyboard"
        title="Keyboard navigace"
        description="Celé UI musí být ovladatelné bez myši. Pořadí tabování musí odpovídat vizuálnímu pořadí."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <DonjonButton size="sm">Tab 1</DonjonButton>
            <DonjonButton size="sm" variant="success">Tab 2</DonjonButton>
            <DonjonButton size="sm" disabled>Přeskočen</DonjonButton>
            <DonjonButton size="sm">Tab 3</DonjonButton>
          </div>
        </Preview>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4, maxWidth: 640 }}>
          {[
            { key: 'Tab / Shift+Tab', action: 'Pohyb mezi interaktivními prvky' },
            { key: 'Enter / Space',   action: 'Aktivace tlačítka, přepínače, volby' },
            { key: 'Escape',          action: 'Zavření modálu, dropdownu, tooltipu' },
            { key: 'Arrow keys',      action: 'Pohyb v tabs, select, button group' },
            { key: 'Home / End',      action: 'První / poslední položka v seznamu' },
          ].map(({ key, action }) => (
            <div key={key} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <code style={{ fontSize: '0.75rem', color: '#B8956A', whiteSpace: 'nowrap', flexShrink: 0 }}>{key}</code>
              <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{action}</span>
            </div>
          ))}
        </div>
        <CodeBlock code={`/* tabIndex pravidla */
tabIndex={0}   // normálně focusovatelný (do tab pořadí)
tabIndex={-1}  // programmaticky focusovatelný, ale mimo Tab pořadí
// tabIndex > 0 — nikdy nepoužívej (rozbije přirozené pořadí)

/* Disabled prvky */
<button disabled tabIndex={-1}>Nedostupné</button>
// disabled atribut automaticky vyloučí z tab pořadí`} />
      </Section>

      {/* Sémantika a ARIA */}
      <Section
        id="aria"
        title="Sémantika a ARIA"
        description="Přehled ARIA atributů použitých v komponentách style guidu."
      >
        <Preview dark={false}>
          <div style={{ width: '100%', border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 110px 1fr 1fr', gap: 10, padding: '8px 14px', background: '#12102A', borderBottom: '1px solid #8F745430' }}>
              {['Element', 'role', 'ARIA atributy', 'Poznámka'].map(h => (
                <span key={h} style={{ fontSize: '0.625rem', color: '#4A4870', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            <AriaRow element="Modal"    role="dialog"      attrs='aria-modal="true" aria-labelledby="{titleId}"' note="Trap focus uvnitř při otevření" />
            <AriaRow element="Tooltip"  role="tooltip"     attrs='aria-describedby="{tooltipId}"'                note="Trigger má describedby na bublinu" />
            <AriaRow element="Select"   role="combobox"    attrs='aria-expanded aria-haspopup="listbox" aria-controls' note="Listbox má role=option" />
            <AriaRow element="Toggle"   role="switch"      attrs='aria-checked aria-disabled'                   note="Stav se mění synchronně s UI" />
            <AriaRow element="Tabs"     role="tablist"     attrs='aria-selected aria-disabled'                  note="Každý tab má role=tab" />
            <AriaRow element="Progress" role="progressbar" attrs='aria-valuenow aria-valuemin aria-valuemax aria-label' note="Indeterminate: vynech valuenow" />
            <AriaRow element="Button"   role="button"      attrs='aria-disabled aria-label (pro icon-only)'     note="aria-label povinný pokud není text" />
          </div>
        </Preview>
        <CodeBlock code={`{/* Icon-only button — MUSÍ mít aria-label */}
<button aria-label="Zavřít dialog">
  <CloseIcon />
</button>

{/* Živá oblast — oznámení pro screen reader */}
<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

{/* Toast oblast */}
<div role="log" aria-live="assertive" aria-relevant="additions">
  {toasts.map(t => <ToastItem key={t.id} {...t} />)}
</div>`} />
      </Section>

      {/* Focus management */}
      <Section
        id="focus-management"
        title="Focus management"
        description="Při otevření overlaye focus přesuň dovnitř. Při zavření vrať na spouštěcí prvek."
      >
        <CodeBlock code={`// Modal — vzor implementovaný v Modal.jsx
useEffect(() => {
  if (!isOpen) return

  // Ulož focus před otevřením
  previousFocusRef.current = document.activeElement

  // Přesuň focus na první focusovatelný prvek
  const frame = requestAnimationFrame(() => {
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.[0]?.focus()
  })

  return () => {
    cancelAnimationFrame(frame)
    // Vrať focus zpět po zavření
    previousFocusRef.current?.focus()
  }
}, [isOpen])

// Focus trap — zachyť Tab uvnitř modálu
const handleKeyDown = (e) => {
  if (e.key !== 'Tab') return
  const focusable = getFocusableElements(modalRef.current)
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus()
  }
}`} />
      </Section>

      {/* Barva jako jediný nosič info */}
      <Section
        id="color-alone"
        title="Barva jako jediný nosič informace"
        description="Nikdy nepoužívej barvu jako jediný způsob předání informace — přidej ikonu, label nebo pattern."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Špatně */}
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: '#C04040', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✗ Jen barva</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#40A055' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#C04040' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#C08040' }} />
              </div>
            </div>
            {/* Správně */}
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: '#40A055', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✓ Barva + label</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <DonjonBadge variant="success" dot>Online</DonjonBadge>
                <DonjonBadge variant="danger" dot>Offline</DonjonBadge>
                <DonjonBadge variant="warning" dot>Čekám</DonjonBadge>
              </div>
            </div>
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-2">
          <p>✓ Statusy, chyby a varování vždy doplň textem nebo ikonou — pro barvoslepé uživatele.</p>
          <p>✓ Disabled stav komunikuj atributem i vizuálem — pouze opacity nestačí (screen reader nevidí opacity).</p>
        </div>
      </Section>

      {/* Checklist */}
      <Section id="checklist" title="Checklist pro nové komponenty">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>☐ Každý interaktivní prvek má viditelný focus ring (<code style={{ color: '#8F9CB3' }}>:focus-visible</code>).</p>
          <p>☐ Icon-only tlačítka mají <code style={{ color: '#8F9CB3' }}>aria-label</code>.</p>
          <p>☐ Formulářová pole mají <code style={{ color: '#8F9CB3' }}>label</code> nebo <code style={{ color: '#8F9CB3' }}>aria-label</code>.</p>
          <p>☐ Overlaye (modal, dropdown) implementují focus trap a vracejí focus po zavření.</p>
          <p>☐ Dynamický obsah (toast, error) má <code style={{ color: '#8F9CB3' }}>role="status"</code> nebo <code style={{ color: '#8F9CB3' }}>aria-live</code>.</p>
          <p>☐ Barva není jediný nosič kritické informace.</p>
          <p>☐ Disabled prvky mají <code style={{ color: '#8F9CB3' }}>aria-disabled="true"</code> nebo HTML <code style={{ color: '#8F9CB3' }}>disabled</code>.</p>
          <p>☐ Animace respektují <code style={{ color: '#8F9CB3' }}>prefers-reduced-motion</code>.</p>
          <p>☐ Celý flow funguje jen s klávesnicí (Tab, šipky, Escape, Enter).</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
