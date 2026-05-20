import { useLibVariant, ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import DonjonButton from '../lib/donjon/DonjonButton'
import * as T from '../lib/tkajui/tokens'
import * as D from '../lib/donjon/tokens'

/* ── Sdílené demo primitiva ── */

function RingAnatomy({ label, offset, width, color, style: extraStyle = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{
        padding: '10px 18px',
        background: '#1E1C3A',
        border: `1px solid ${D.goldDim}40`,
        borderRadius: 3,
        fontSize: '0.8125rem',
        color: D.textActive,
        outline: `${width}px solid ${color}`,
        outlineOffset: `${offset}px`,
        ...extraStyle,
      }}>
        {label}
      </div>
    </div>
  )
}

function RingAnatomyTkaj({ label, offset, width, color, style: extraStyle = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{
        padding: '10px 18px',
        background: T.surface2,
        border: `1px solid ${T.borderDefault}`,
        borderRadius: 3,
        fontSize: '0.8125rem',
        color: T.textHigh,
        outline: `${width}px solid ${color}`,
        outlineOffset: `${offset}px`,
        ...extraStyle,
      }}>
        {label}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   TkajUI — Focus Ring
   ══════════════════════════════════════════════════════════════════════════ */

function TkajuiFocusContent() {
  return (
    <>
      {/* Proč focus ring */}
      <Section
        id="proc"
        title="Proč focus ring"
        description=":focus-visible zajišťuje, že ring vidí keyboard uživatelé — ale nevidí ho mouse uživatelé, kteří ho nepotřebují."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, maxWidth: 540 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: T.dangerColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✗ Žádný ring</p>
              <div style={{ padding: '8px 16px', background: T.surface2, border: `1px solid ${T.borderDefault}`, borderRadius: 3, fontSize: '0.875rem', color: T.textHigh, outline: 'none' }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: T.textMid, textAlign: 'center', lineHeight: 1.3 }}>Keyboard uživatel neví kde je</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: T.warningColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>⚠ Browser default</p>
              <div style={{ padding: '8px 16px', background: T.surface2, border: `1px solid ${T.borderDefault}`, borderRadius: 3, fontSize: '0.875rem', color: T.textHigh, outline: '2px solid #0055FF' }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: T.textMid, textAlign: 'center', lineHeight: 1.3 }}>Modrý — ale nesedí do TkajUI palety</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: T.successColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✓ TkajUI ring</p>
              <div style={{ padding: '8px 16px', background: T.surface2, border: `1px solid ${T.borderDefault}`, borderRadius: 3, fontSize: '0.875rem', color: T.textHigh, outline: `2px solid ${T.accent}`, outlineOffset: 2 }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: T.textMid, textAlign: 'center', lineHeight: 1.3 }}>Accent modrý — konzistentní s akcenty</p>
            </div>
          </div>
        </Preview>
      </Section>

      {/* Výchozí ring */}
      <Section
        id="vychozi"
        title="Výchozí focus ring"
        description="Standardní ring pro všechny komponenty — 2px solid #6576ff, offset 2px. Bez glow: čistý, jednoznačný."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <RingAnatomyTkaj label="Default ring"  offset={2} width={2} color={T.accent} />
            <RingAnatomyTkaj label="Offset větší"  offset={4} width={2} color={T.accent} />
            <RingAnatomyTkaj label="Ring silnější" offset={2} width={3} color={T.accent} />
          </div>
        </Preview>
        <CodeBlock code={`/* Výchozí focus ring — globální reset */
*, *::before, *::after {
  outline: none; /* resetuj browser default */
}

:focus-visible {
  outline: 2px solid #6576ff;
  outline-offset: 2px;
}

/* Tailwind ekvivalent */
className="focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2"

/* NIKDY nepoužívej :focus bez :focus-visible — spouští se i při kliknutí myší */`} />
      </Section>

      {/* Varianty */}
      <Section
        id="varianty"
        title="Varianty focus ringu"
        description="Ring odpovídá sémantické barvě komponenty — danger má červený ring, success zelený."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <RingAnatomyTkaj label="Default" offset={2}  width={2} color={T.accent}       />
            <RingAnatomyTkaj label="Danger"  offset={2}  width={2} color={T.dangerColor}  />
            <RingAnatomyTkaj label="Success" offset={2}  width={2} color={T.successColor} />
            <RingAnatomyTkaj label="Info"    offset={2}  width={2} color={T.infoColor}    />
            <RingAnatomyTkaj label="Inset"   offset={-2} width={2} color={T.accent}
              style={{ border: `2px solid ${T.borderDefault}` }}
            />
          </div>
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { ctx: 'Výchozí tlačítko / input', ring: `2px solid ${T.accent}`,       offset: '2px',  note: 'Standardní accent modrý ring' },
              { ctx: 'Danger tlačítko',          ring: `2px solid ${T.dangerColor}`,  offset: '2px',  note: 'Ring odpovídá variantě tlačítka' },
              { ctx: 'Success tlačítko',         ring: `2px solid ${T.successColor}`, offset: '2px',  note: 'Ring odpovídá variantě' },
              { ctx: 'Inset (tmavé pozadí)',     ring: `2px solid ${T.accent}`,       offset: '-2px', note: 'Záporný offset — ring dovnitř prvku' },
              { ctx: 'Modal / overlay',          ring: `2px solid ${T.accent}`,       offset: '3px',  note: 'Větší offset pro viditelnost nad bg' },
            ].map(({ ctx, ring, offset, note }) => (
              <div key={ctx} style={{ display: 'grid', gridTemplateColumns: '200px 160px 60px 1fr', gap: 10, padding: '8px 12px', background: T.surface2, border: `1px solid ${T.borderDefault}18`, borderRadius: 3, alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: T.textMid }}>{ctx}</span>
                <code style={{ fontSize: '0.6875rem', color: T.accent, lineHeight: 1.4 }}>{ring}</code>
                <code style={{ fontSize: '0.6875rem', color: T.textLow }}>{offset}</code>
                <span style={{ fontSize: '0.6875rem', color: T.textLow, lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Focus trap */}
      <Section
        id="focus-trap"
        title="Focus trap v overlayích"
        description="Modal, dialog a dropdown musí zachytit Tab — focus nesmí uniknout z otevřeného overlaye."
      >
        <CodeBlock code={`function useFocusTrap(ref, isActive) {
  useEffect(() => {
    if (!isActive) return

    const FOCUSABLE = [
      'a[href]', 'button:not([disabled])', 'input:not([disabled])',
      'select:not([disabled])', 'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusable = [...ref.current.querySelectorAll(FOCUSABLE)]
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [ref, isActive])
}

useFocusTrap(modalRef, isOpen)`} />
      </Section>

      {/* Skip link */}
      <Section
        id="skip-link"
        title="Skip link"
        description="Keyboard uživatel může přeskočit navigaci přímo na hlavní obsah — viditelný jen při fokusu."
      >
        <Preview>
          <div style={{ position: 'relative', width: '100%', maxWidth: 400, height: 60, border: `1px solid ${T.borderDefault}`, borderRadius: 4, overflow: 'hidden', background: T.surface1 }}>
            <a
              href="#main-content"
              style={{
                position: 'absolute',
                top: -60,
                left: 0,
                padding: '8px 16px',
                background: T.accent,
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '0 0 4px 0',
                transition: 'top 0.15s',
                zIndex: 9999,
              }}
              onFocus={e => e.currentTarget.style.top = '0'}
              onBlur={e => e.currentTarget.style.top = '-60px'}
            >
              Přeskočit na obsah
            </a>
            <p style={{ margin: '20px auto', textAlign: 'center', fontSize: '0.75rem', color: T.textLow }}>Zmáčkni Tab pro zobrazení skip linku</p>
          </div>
        </Preview>
        <CodeBlock code={`<a
  href="#main-content"
  className={[
    'sr-only focus-visible:not-sr-only',
    'fixed top-2 left-2 z-9999',
    'px-4 py-2 bg-brand-500 text-white',
    'font-semibold text-sm rounded-sm',
    'focus-visible:outline-2 focus-visible:outline-white',
  ].join(' ')}
>
  Přeskočit na obsah
</a>

<main id="main-content" tabIndex={-1}>
  {/* hlavní obsah */}
</main>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy používej <code className="text-neutral-300">:focus-visible</code> — nikdy ne <code className="text-neutral-300">:focus</code> samotný.</p>
          <p>✓ Výchozí ring: 2px solid #6576ff, offset 2px. Danger: #f05555. Success: #34d364.</p>
          <p>✓ Overlay (modal, dropdown): focus trap — Tab nesmí uniknout ven.</p>
          <p>✓ Při zavření overlaye vrať focus na spouštěcí prvek (button, link).</p>
          <p>✓ Skip link jako první element stránky pro keyboard uživatele.</p>
          <p>✗ Nikdy neodstraňuj outline bez alternativní vizuální indikace fokusu.</p>
          <p>✗ Nepřidávej glow k focus ringu — TkajUI používá čistý outline bez efektů.</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   donjon-fall-ui — Focus Ring
   ══════════════════════════════════════════════════════════════════════════ */

function DonjonFocusContent() {
  return (
    <>
      {/* Proč focus ring */}
      <Section
        id="proc"
        title="Proč focus ring"
        description=":focus-visible zajišťuje, že ring vidí keyboard uživatelé — ale nevidí ho mouse uživatelé, kteří ho nepotřebují."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, maxWidth: 540 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#C04040', letterSpacing: '0.08em', textTransform: 'uppercase' }}>✗ Žádný ring</p>
              <div style={{ padding: '8px 16px', background: '#1E1C3A', border: `1px solid ${D.goldDim}40`, borderRadius: 3, fontSize: '0.875rem', color: D.textActive, outline: 'none' }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: '#8F9CB3', textAlign: 'center', lineHeight: 1.3 }}>Keyboard uživatel neví kde je</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: D.warningColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>⚠ Browser default</p>
              <div style={{ padding: '8px 16px', background: '#1E1C3A', border: `1px solid ${D.goldDim}40`, borderRadius: 3, fontSize: '0.875rem', color: D.textActive, outline: '2px solid #0055FF' }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: '#8F9CB3', textAlign: 'center', lineHeight: 1.3 }}>Modrý — nesedí do Donjon palety</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: D.successColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✓ Donjon ring</p>
              <div style={{ padding: '8px 16px', background: '#1E1C3A', border: `1px solid ${D.goldDim}40`, borderRadius: 3, fontSize: '0.875rem', color: D.textActive, outline: `2px solid ${D.goldMid}`, outlineOffset: 2 }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: '#8F9CB3', textAlign: 'center', lineHeight: 1.3 }}>Zlatý — zapadá do design systému</p>
            </div>
          </div>
        </Preview>
      </Section>

      {/* Výchozí ring */}
      <Section
        id="vychozi"
        title="Výchozí focus ring"
        description="Standardní ring pro majority komponent — 2px solid gold, offset 2px."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <RingAnatomy label="Default ring"  offset={2} width={2} color={D.goldMid} />
            <RingAnatomy label="Offset větší"  offset={4} width={2} color={D.goldMid} />
            <RingAnatomy label="Ring silnější" offset={2} width={3} color={D.goldMid} />
          </div>
        </Preview>
        <CodeBlock code={`/* Výchozí focus ring — globální reset */
*, *::before, *::after {
  outline: none; /* resetuj browser default */
}

:focus-visible {
  outline: 2px solid #B8956A;
  outline-offset: 2px;
}

/* Tailwind ekvivalent */
className="focus-visible:outline-2 focus-visible:outline-[#B8956A] focus-visible:outline-offset-2"

/* NIKDY nepoužívej :focus bez :focus-visible — :focus se spouští i při kliknutí myší */`} />
      </Section>

      {/* Varianty */}
      <Section
        id="varianty"
        title="Varianty focus ringu"
        description="Různé komponenty mají mírně odlišné ringy podle kontextu a varianty."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <RingAnatomy label="Default"  offset={2}  width={2} color={D.goldMid}      />
            <RingAnatomy label="Danger"   offset={2}  width={2} color="#C04040"         />
            <RingAnatomy label="Success"  offset={2}  width={2} color={D.successColor}  />
            <RingAnatomy label="Info"     offset={2}  width={2} color="#4080C0"          />
            <RingAnatomy label="Inset"    offset={-2} width={2} color={D.goldMid}
              style={{ border: `2px solid ${D.goldDim}40` }}
            />
          </div>
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { ctx: 'Výchozí tlačítko / input', ring: `2px solid ${D.goldMid}`,      offset: '2px',  note: 'Standardní zlatý ring' },
              { ctx: 'Danger tlačítko',          ring: '2px solid #C04040',            offset: '2px',  note: 'Ring odpovídá variantě tlačítka' },
              { ctx: 'Success tlačítko',         ring: `2px solid ${D.successColor}`,  offset: '2px',  note: 'Ring odpovídá variantě' },
              { ctx: 'Inset (tmavé pozadí)',     ring: `2px solid ${D.goldMid}`,       offset: '-2px', note: 'Záporný offset — ring dovnitř prvku' },
              { ctx: 'Modal / overlay',          ring: `2px solid ${D.goldMid}`,       offset: '3px',  note: 'Větší offset pro viditelnost nad bg' },
            ].map(({ ctx, ring, offset, note }) => (
              <div key={ctx} style={{ display: 'grid', gridTemplateColumns: '200px 160px 60px 1fr', gap: 10, padding: '8px 12px', background: D.bg0, border: `1px solid ${D.goldDim}18`, borderRadius: 3, alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{ctx}</span>
                <code style={{ fontSize: '0.6875rem', color: D.goldMid, lineHeight: 1.4 }}>{ring}</code>
                <code style={{ fontSize: '0.6875rem', color: '#4A4870' }}>{offset}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Focus trap */}
      <Section
        id="focus-trap"
        title="Focus trap v overlayích"
        description="Modal, dialog a dropdown musí zachytit Tab — focus nesmí uniknout z otevřeného overlaye."
      >
        <CodeBlock code={`function useFocusTrap(ref, isActive) {
  useEffect(() => {
    if (!isActive) return

    const FOCUSABLE = [
      'a[href]', 'button:not([disabled])', 'input:not([disabled])',
      'select:not([disabled])', 'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusable = [...ref.current.querySelectorAll(FOCUSABLE)]
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [ref, isActive])
}

useFocusTrap(modalRef, isOpen)`} />
      </Section>

      {/* Skip link */}
      <Section
        id="skip-link"
        title="Skip link"
        description="Keyboard uživatel může přeskočit navigaci přímo na hlavní obsah — viditelný jen při fokusu."
      >
        <Preview>
          <div style={{ position: 'relative', width: '100%', maxWidth: 400, height: 60, border: `1px solid ${D.goldDim}30`, borderRadius: 4, overflow: 'hidden', background: D.bg0 }}>
            <a
              href="#main-content"
              style={{
                position: 'absolute',
                top: -60,
                left: 0,
                padding: '8px 16px',
                background: D.goldMid,
                color: D.bg0,
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: '0 0 4px 0',
                transition: 'top 0.15s',
                zIndex: 9999,
              }}
              onFocus={e => e.currentTarget.style.top = '0'}
              onBlur={e => e.currentTarget.style.top = '-60px'}
            >
              Přeskočit na obsah
            </a>
            <p style={{ margin: '20px auto', textAlign: 'center', fontSize: '0.75rem', color: '#4A4870' }}>Zmáčkni Tab pro zobrazení skip linku</p>
          </div>
        </Preview>
        <CodeBlock code={`<a
  href="#main-content"
  className={[
    'sr-only focus-visible:not-sr-only',
    'fixed top-2 left-2 z-9999',
    'px-4 py-2 bg-[#B8956A] text-[#12102A]',
    'font-bold text-sm rounded-sm',
    'focus-visible:outline-2 focus-visible:outline-white',
  ].join(' ')}
>
  Přeskočit na obsah
</a>

<main id="main-content" tabIndex={-1}>
  {/* hlavní obsah */}
</main>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy používej <code className="text-neutral-300">:focus-visible</code> — nikdy ne <code className="text-neutral-300">:focus</code> samotný.</p>
          <p>✓ Výchozí ring: 2px solid #B8956A, offset 2px. Danger varianta: #C04040, Success: #40A055.</p>
          <p>✓ Overlay (modal, dropdown): focus trap — Tab nesmí uniknout ven.</p>
          <p>✓ Při zavření overlaye vrať focus na spouštěcí prvek (button, link).</p>
          <p>✓ Skip link jako první element stránky pro keyboard uživatele.</p>
          <p>✗ Nikdy neodstraňuj outline bez alternativní vizuální indikace fokusu.</p>
          <p>✗ Nepoužívej <code className="text-neutral-300">outline: none</code> na elementu samotném — jen globálně jako reset s okamžitou náhradou.</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Stránka
   ══════════════════════════════════════════════════════════════════════════ */

function FocusContent() {
  const lib = useLibVariant()
  return lib === 'donjon' ? <DonjonFocusContent /> : <TkajuiFocusContent />
}

export default function FocusRingPage() {
  return (
    <ShowcasePage
      title="Focus Ring systém"
      description="Vizuální indikátor fokusu je kritický pro keyboard přístupnost. Obě knihovny používají :focus-visible — viditelný jen při keyboard navigaci, skrytý při klikání myší."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <FocusContent />
    </ShowcasePage>
  )
}
