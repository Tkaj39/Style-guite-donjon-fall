import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonButton from '../lib/donjon/DonjonButton'

/* ── Focus ring demo ── */
function FocusDemo({ label, style, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <div
        tabIndex={0}
        style={{
          padding: '8px 20px',
          background: '#1E1C3A',
          border: '1px solid #8F745440',
          borderRadius: 3,
          fontSize: '0.875rem',
          color: '#F0E6D3',
          cursor: 'pointer',
          outline: 'none',
          ...style,
        }}
      >
        {label}
      </div>
      <p style={{ margin: 0, fontSize: '0.6875rem', color: '#4A4870', textAlign: 'center', maxWidth: 120, lineHeight: 1.3 }}>{desc}</p>
    </div>
  )
}

/* ── Ring anatomy ── */
function RingAnatomy({ label, offset, width, color, style: extraStyle = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{
        padding: '10px 18px',
        background: '#1E1C3A',
        border: '1px solid #8F745440',
        borderRadius: 3,
        fontSize: '0.8125rem',
        color: '#F0E6D3',
        outline: `${width}px solid ${color}`,
        outlineOffset: `${offset}px`,
        ...extraStyle,
      }}>
        {label}
      </div>
    </div>
  )
}

export default function FocusRingPage() {
  return (
    <ShowcasePage
      title="Focus Ring systém"
      description="Vizuální indikátor fokusu je kritický pro keyboard přístupnost. Donjon Fall používá :focus-visible — viditelný jen při keyboard navigaci, skrytý při klikání myší."
    >

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
              <div style={{ padding: '8px 16px', background: '#1E1C3A', border: '1px solid #8F745440', borderRadius: 3, fontSize: '0.875rem', color: '#F0E6D3', outline: 'none' }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: '#8F9CB3', textAlign: 'center', lineHeight: 1.3 }}>Keyboard uživatel neví kde je</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#C08040', letterSpacing: '0.08em', textTransform: 'uppercase' }}>⚠ Browser default</p>
              <div style={{ padding: '8px 16px', background: '#1E1C3A', border: '1px solid #8F745440', borderRadius: 3, fontSize: '0.875rem', color: '#F0E6D3', outline: '2px solid #0055FF' }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: '#8F9CB3', textAlign: 'center', lineHeight: 1.3 }}>Modrý — nesedí do Donjon palety</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#40A055', letterSpacing: '0.08em', textTransform: 'uppercase' }}>✓ Donjon ring</p>
              <div style={{ padding: '8px 16px', background: '#1E1C3A', border: '1px solid #8F745440', borderRadius: 3, fontSize: '0.875rem', color: '#F0E6D3', outline: '2px solid #B8956A', outlineOffset: 2 }}>
                Tlačítko
              </div>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: '#8F9CB3', textAlign: 'center', lineHeight: 1.3 }}>Zlatý — zapadá do design systému</p>
            </div>
          </div>
        </Preview>
      </Section>

      {/* Výchozí focus ring */}
      <Section
        id="vychozi"
        title="Výchozí focus ring"
        description="Standardní ring pro majority komponent — 2px solid gold, offset 2px."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <RingAnatomy label="Default ring"  offset={2} width={2} color="#B8956A" />
            <RingAnatomy label="Offset větší"  offset={4} width={2} color="#B8956A" />
            <RingAnatomy label="Ring silnější" offset={2} width={3} color="#B8956A" />
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

      {/* Varianty ringu */}
      <Section
        id="varianty"
        title="Varianty focus ringu"
        description="Různé komponenty mají mírně odlišné ringy podle kontextu a varianty."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <RingAnatomy label="Default"  offset={2} width={2} color="#B8956A" />
            <RingAnatomy label="Danger"   offset={2} width={2} color="#C04040" />
            <RingAnatomy label="Success"  offset={2} width={2} color="#40A055" />
            <RingAnatomy label="Info"     offset={2} width={2} color="#4080C0" />
            <RingAnatomy label="Inset" offset={-2} width={2} color="#B8956A"
              extraStyle={{ border: '2px solid #8F745440' }}
            />
          </div>
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { ctx: 'Výchozí tlačítko / input', ring: '2px solid #B8956A', offset: '2px', note: 'Standardní zlatý ring' },
              { ctx: 'Danger tlačítko',          ring: '2px solid #C04040', offset: '2px', note: 'Ring odpovídá variantě tlačítka' },
              { ctx: 'Success tlačítko',         ring: '2px solid #40A055', offset: '2px', note: 'Ring odpovídá variantě' },
              { ctx: 'Inset (tmavé pozadí)',      ring: '2px solid #B8956A', offset: '-2px', note: 'Záporný offset — ring dovnitř prvku' },
              { ctx: 'Modal / overlay',           ring: '2px solid #B8956A', offset: '3px', note: 'Větší offset pro viditelnost nad bg' },
            ].map(({ ctx, ring, offset, note }) => (
              <div key={ctx} style={{ display: 'grid', gridTemplateColumns: '200px 160px 60px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{ctx}</span>
                <code style={{ fontSize: '0.6875rem', color: '#B8956A', lineHeight: 1.4 }}>{ring}</code>
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
        <CodeBlock code={`/* Focus trap — přesný vzor implementovaný v Modal.jsx */
function useFocusTrap(ref, isActive) {
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

// Použití:
useFocusTrap(modalRef, isOpen)`} />
      </Section>

      {/* Skip link */}
      <Section
        id="skip-link"
        title="Skip link"
        description="Keyboard uživatel může přeskočit navigaci přímo na hlavní obsah — viditelný jen při fokusu."
      >
        <Preview>
          <div style={{ position: 'relative', width: '100%', maxWidth: 400, height: 60, border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden', background: '#12102A' }}>
            <a
              href="#main-content"
              style={{
                position: 'absolute',
                top: -60,
                left: 0,
                padding: '8px 16px',
                background: '#B8956A',
                color: '#12102A',
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
        <CodeBlock code={`{/* Skip link — první element v <body> */}
<a
  href="#main-content"
  className={[
    'sr-only focus-visible:not-sr-only',          // schovej, ukaž při fokusu
    'fixed top-2 left-2 z-[9999]',
    'px-4 py-2 bg-[#B8956A] text-[#12102A]',
    'font-bold text-sm rounded',
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

    </ShowcasePage>
  )
}
