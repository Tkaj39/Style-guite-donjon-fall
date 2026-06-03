import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import {
  bg0, bg2, bgDeep, bg4, failColor, gold, goldDim, goldMid, successColor, textActive, textCool, textDeep, textFaint, textHigh, warningColor,
} from '../lib/donjon/tokens'
import { primaryText } from '../lib/tkajui/tokens'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonBadge from '../lib/donjon/DonjonBadge'

/* ── Kontrast chip ── */
function ContrastChip({ fg, bg, label, ratio, pass }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      padding: '12px 16px', borderRadius: 4,
      // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
      background: bg, border: `1px solid ${pass ? '#40A05540' : '#C0404040'}`,
      minWidth: 120,
    }}>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: fg }}>{label}</span>
      <span style={{ fontSize: '0.625rem', color: fg, opacity: 0.7 }}>{ratio} : 1</span>
      <span style={{
        fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.08em',
        color: pass ? successColor : failColor,
        // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
        background: pass ? '#40A05522' : '#C0404022',
        // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
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
    <div style={{ display: 'grid', gridTemplateColumns: '100px 110px 1fr 1fr', gap: 10, padding: '9px 14px', borderBottom: `1px solid ${goldDim}18`, alignItems: 'start' }}>
      <code style={{ fontSize: '0.75rem', color: goldMid }}>{element}</code>
      {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
      <code style={{ fontSize: '0.75rem', color: '#4080C0' }}>{role}</code>
      <code style={{ fontSize: '0.6875rem', color: textCool, lineHeight: 1.5 }}>{attrs}</code>
      <span style={{ fontSize: '0.75rem', color: textDeep, lineHeight: 1.4 }}>{note}</span>
    </div>
  )
}

export default function AccessibilityPage() {
  return (
    <ShowcasePage
      title="Accessibility"
      description="Pravidla přístupnosti pro Donjon Fall UI. Cíl je WCAG 2.1 AA — kontrast, keyboard navigace, správná sémantika a podpora screen readerů."
      library="both"
    >

      {/* Kontrast */}
      <Section
        id="kontrast"
        title="Kontrast barev"
        description="WCAG 2.1 AA vyžaduje min. 4.5 : 1 pro normální text, 3 : 1 pro velký text a UI komponenty."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <ContrastChip fg={textActive} bg={bg0} label="Hlavní text"      ratio="12.4" pass />
            <ContrastChip fg={goldMid} bg={bg0} label="Zlatý akcent"     ratio="5.8"  pass />
            <ContrastChip fg={textCool} bg={bg0} label="Sekundární text"  ratio="4.6"  pass />
            <ContrastChip fg={textDeep} bg={bg0} label="Placeholder"      ratio="2.1"  pass={false} />
            <ContrastChip fg={textActive} bg={bg4} label="Text na kartě"    ratio="9.3"  pass />
            <ContrastChip fg={goldDim} bg={bg4} label="Border text"      ratio="3.4"  pass={false} />
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-4">
          <p>⚠ <span style={{ color: warningColor }}>Placeholder (textDeep)</span> a border text (goldDim) nesplňují AA — nepoužívej je pro kritické informace. Jsou přijatelné pro dekorativní nebo kontextový obsah, kde je primární informace dostupná jinak.</p>
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
              <code style={{ fontSize: '0.75rem', color: goldMid, whiteSpace: 'nowrap', flexShrink: 0 }}>{key}</code>
              <span style={{ fontSize: '0.8125rem', color: textCool }}>{action}</span>
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
          <div style={{ width: '100%', border: `1px solid ${goldDim}30`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 110px 1fr 1fr', gap: 10, padding: '8px 14px', background: bg0, borderBottom: `1px solid ${goldDim}30` }}>
              {['Element', 'role', 'ARIA atributy', 'Poznámka'].map(h => (
                <span key={h} style={{ fontSize: '0.625rem', color: textDeep, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
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
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: failColor, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✗ Jen barva</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: successColor }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: failColor }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: warningColor }} />
              </div>
            </div>
            {/* Správně */}
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: successColor, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✓ Barva + label</p>
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

      {/* ── Contrast tooling ─────────────────────────────────────────────── */}
      <Section
        id="contrast-tooling"
        title="Kontrast — utility, lint pravidlo, audit test"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem', color: textCool }}>
          <p>
            Design system má 3 vrstvy obrany proti špatnému kontrastu.
            Použij tu, která sedí na tvůj use case.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            <div style={{ background: bg0, border: `1px solid ${goldDim}`, padding: 14, borderRadius: 4 }}>
              <div style={{ color: warningColor, fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Runtime utilita
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4, color: textActive }}>
                shared/contrast.js
              </div>
              <p style={{ marginTop: 6, color: goldMid, lineHeight: 1.5 }}>
                Funkce <code style={{ color: textCool }}>contrastRatio(fg, bg)</code>,
                <code style={{ color: textCool }}>meetsContrast(fg, bg, level)</code>,
                <code style={{ color: textCool }}>pickContrastText(bg)</code>.
                Pure-JS WCAG matematika, žádné závislosti. Použij pro
                dynamicky generované barvy (player picker, custom theme).
              </p>
            </div>

            <div style={{ background: bg0, border: `1px solid ${goldDim}`, padding: 14, borderRadius: 4 }}>
              <div style={{ color: warningColor, fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Build-time guard
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4, color: textActive }}>
                ESLint donjon/contrast-check
              </div>
              <p style={{ marginTop: 6, color: goldMid, lineHeight: 1.5 }}>
                AST scan inline <code style={{ color: textCool }}>style=&#123;&#123; color, background &#125;&#125;</code>
                — rozluští tokeny i literály, hlásí pod-AA-large pair.
                Skipne při alpha &lt; 50% (semi-transparent panel) nebo
                ratio = 1.0 (decorative).
              </p>
            </div>

            <div style={{ background: bg0, border: `1px solid ${goldDim}`, padding: 14, borderRadius: 4 }}>
              <div style={{ color: warningColor, fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                CI regression
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4, color: textActive }}>
                contrast-audit.test.js
              </div>
              <p style={{ marginTop: 6, color: goldMid, lineHeight: 1.5 }}>
                32 canonical text × bg párů (textHigh×surface, semantic
                Text×Bg, gold×bg…), jeden assertion na pair. Bumpne při
                změně tokenů. Tisknout v terminálu ASCII tabulku se vším
                ratio.
              </p>
            </div>
          </div>

          <Preview>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {/* Real WCAG ratios from the actual donjon palette */}
              <ContrastChip fg={primaryText} bg={bg0}    label="white on bg0"        ratio="16.0" pass />
              <ContrastChip fg={textHigh}    bg={bg2}    label="textHigh on bg2"     ratio="12.4" pass />
              <ContrastChip fg={gold}        bg={bg2}    label="gold on bg2"         ratio="10.1" pass />
              <ContrastChip fg={goldDim}     bg={bg2}    label="goldDim on bg2"      ratio="4.4"  pass />
              <ContrastChip fg={textFaint}   bg={bgDeep} label="textFaint on bgDeep" ratio="1.9"  pass={false} />
            </div>
          </Preview>

          {/* eslint-disable-next-line donjon/no-hardcoded-hex -- documentation snippet, hex literals are example arguments */}
          <CodeBlock code={`/* Pro runtime kontrolu — typicky dynamicky generované barvy */
import { contrastRatio, meetsContrast, pickContrastText } from '@tkaj/donjon-shared/contrast'

const ratio = contrastRatio('#FFC183', '#1E1C30')   // 10.07
meetsContrast('#FFC183', '#1E1C30', 'AA')           // true
pickContrastText('#FFC183')                          // '#111111' (dark text wins)

/* WCAG hodnoty:
 *   AA-large = 3.0   (text >=18pt nebo >=14pt bold)
 *   AA       = 4.5   (default body text)
 *   AAA      = 7.0   (high-importance text) */`} />

          <p style={{ marginTop: 4 }}>
            ESLint pravidlo je v <code style={{ color: textCool }}>warn</code> módu — false-positives existují
            (gradient backgrounds, alpha overlays). Když je hláška legitimní,
            disable inline s vysvětlujícím komentářem:
          </p>

          <CodeBlock code={`{/* eslint-disable-next-line donjon/contrast-check -- decorative chip, no readable text */}
<div style={{ color: textFaint, background: bgDeep }}>📦</div>`} />

          <p>
            Audit test pustíš jednorázově (<code style={{ color: textCool }}>npm run test:run -- contrast-audit</code>)
            nebo automaticky v CI — tisk vypadá takhle:
          </p>
          <pre style={{
            background: bg0, color: textCool,
            border: `1px solid ${goldDim}`, borderRadius: 4,
            padding: 12, fontSize: '0.75rem', overflow: 'auto', margin: 0,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}>{`┌── WCAG contrast audit ─────────────────────────────────
│ ✓ 16.80  tkajui.textHigh    on tkajui.surface0   AA (≥4.5)
│ ✓ 14.78  tkajui.textHigh    on tkajui.surface2   AA (≥4.5)
│ ✓  4.98  tkajui.textMid     on tkajui.surface2   AA-large (≥3)
│ ✓  3.48  tkajui.textLow     on tkajui.surface2   AA-large (≥3)
│ ✓ 12.13  tkajui.successText on tkajui.surface2   AA (≥4.5)
│ ✓ 13.84  donjon.textHigh    on donjon.bg0        AA (≥4.5)
│ ✓ 10.07  donjon.gold        on donjon.bg2        AA (≥4.5)
└─────────────────────────────────────────────────────────`}</pre>
        </div>
      </Section>

      {/* Checklist */}
      <Section id="checklist" title="Checklist pro nové komponenty">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>☐ Každý interaktivní prvek má viditelný focus ring (<code style={{ color: textCool }}>:focus-visible</code>).</p>
          <p>☐ Icon-only tlačítka mají <code style={{ color: textCool }}>aria-label</code>.</p>
          <p>☐ Formulářová pole mají <code style={{ color: textCool }}>label</code> nebo <code style={{ color: textCool }}>aria-label</code>.</p>
          <p>☐ Overlaye (modal, dropdown) implementují focus trap a vracejí focus po zavření.</p>
          <p>☐ Dynamický obsah (toast, error) má <code style={{ color: textCool }}>role="status"</code> nebo <code style={{ color: textCool }}>aria-live</code>.</p>
          <p>☐ Barva není jediný nosič kritické informace.</p>
          <p>☐ Disabled prvky mají <code style={{ color: textCool }}>aria-disabled="true"</code> nebo HTML <code style={{ color: textCool }}>disabled</code>.</p>
          <p>☐ Animace respektují <code style={{ color: textCool }}>prefers-reduced-motion</code>.</p>
          <p>☐ Celý flow funguje jen s klávesnicí (Tab, šipky, Escape, Enter).</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
