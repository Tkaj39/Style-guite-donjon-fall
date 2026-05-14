import { ToastProvider, useToast } from '../lib/tkajui/Toast'
import DonjonButton from '../components/DonjonButton'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Demo helpers ─ musí být uvnitř ToastProvider ── */
function VariantDemo() {
  const { addToast } = useToast()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {[
        { variant: 'default', label: 'Default',  title: 'Oznámení',        message: 'Neutrální informace o stavu akce.' },
        { variant: 'success', label: 'Success',  title: 'Úspěch',          message: 'Operace proběhla úspěšně.' },
        { variant: 'danger',  label: 'Danger',   title: 'Chyba',           message: 'Akci se nepodařilo dokončit.' },
        { variant: 'warning', label: 'Warning',  title: 'Upozornění',      message: 'Zkontroluj stav před pokračováním.' },
        { variant: 'info',    label: 'Info',     title: 'Tip',             message: 'Doplňující informace pro hráče.' },
      ].map(({ variant, label, title, message }) => (
        <DonjonButton
          key={variant}
          size="sm"
          variant={variant === 'default' || variant === 'info' ? 'default' : variant}
          onClick={() => addToast({ title, message, variant })}
        >
          {label}
        </DonjonButton>
      ))}
    </div>
  )
}

function TitleDemo() {
  const { addToast } = useToast()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <DonjonButton size="sm" onClick={() => addToast({ title: 'S titulkem', message: 'Titulek zvýrazní hlavní sdělení, zpráva doplňuje detail.', variant: 'default' })}>
        S titulkem
      </DonjonButton>
      <DonjonButton size="sm" onClick={() => addToast({ message: 'Jen krátká zpráva bez titulku — jednodušší kontexty.', variant: 'default' })}>
        Jen zpráva
      </DonjonButton>
      <DonjonButton size="sm" onClick={() => addToast({ title: 'Jen titulek', variant: 'success' })}>
        Jen titulek
      </DonjonButton>
    </div>
  )
}

function DurationDemo() {
  const { addToast } = useToast()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <DonjonButton size="sm" onClick={() => addToast({ title: '2 sekundy', message: 'Rychlé potvrzení.', variant: 'success', duration: 2000 })}>
        2 s
      </DonjonButton>
      <DonjonButton size="sm" onClick={() => addToast({ title: '6 sekund', message: 'Více času na přečtení.', variant: 'warning', duration: 6000 })}>
        6 s
      </DonjonButton>
      <DonjonButton size="sm" onClick={() => addToast({ title: 'Trvalý toast', message: 'Nezavírá se automaticky — uživatel musí kliknout ×.', variant: 'danger', duration: 0 })}>
        Trvalý (duration=0)
      </DonjonButton>
    </div>
  )
}

function StackDemo() {
  const { addToast } = useToast()
  return (
    <DonjonButton
      size="sm"
      onClick={() => {
        addToast({ title: 'Hráč 1 pohyb',    message: 'Kostka přesunuta na hex C4.',     variant: 'default', duration: 5000 })
        setTimeout(() => addToast({ title: 'Souboj',         message: 'Hráč 2 útočí na C4.',           variant: 'warning', duration: 5000 }), 200)
        setTimeout(() => addToast({ title: 'Výsledek',       message: 'Hráč 1 zvítězil — +1 VP.',      variant: 'success', duration: 5000 }), 400)
      }}
    >
      Vyvolat 3 toasty najednou
    </DonjonButton>
  )
}

/* ── Page ── */
export default function ToastPage() {
  return (
    <ToastProvider position="bottom-right">
      <ShowcasePage
        title="Toast"
        description="Plovoucí notifikace pro krátkodobá oznámení — výsledky akcí, chyby, potvrzení. Automaticky se zavře po uplynutí doby nebo manuálně tlačítkem ×. Používá useToast hook uvnitř ToastProvider."
        componentSlug="toast"
      >

        {/* Varianty */}
        <Section
          id="variants"
          title="Varianty"
          description="Pět sémantických variant — default, success, danger, warning, info. Kliknutím na tlačítko zobrazíš toast vpravo dole."
        >
          <Preview>
            <VariantDemo />
          </Preview>
          <CodeBlock code={`const { addToast } = useToast()

addToast({ title: 'Úspěch', message: 'Operace proběhla úspěšně.', variant: 'success' })
addToast({ title: 'Chyba',  message: 'Akci se nepodařilo dokončit.', variant: 'danger' })
addToast({ message: 'Neutrální oznámení.', variant: 'default' })`} />
        </Section>

        {/* Titulek vs bez */}
        <Section
          id="title"
          title="Titulek a zpráva"
          description="Titulek i zpráva jsou volitelné — lze kombinovat libovolně."
        >
          <Preview>
            <TitleDemo />
          </Preview>
          <CodeBlock code={`{/* S titulkem i zprávou */}
addToast({ title: 'S titulkem', message: 'Detail akce.', variant: 'default' })

{/* Jen zpráva */}
addToast({ message: 'Krátká zpráva.', variant: 'default' })

{/* Jen titulek */}
addToast({ title: 'Jen titulek', variant: 'success' })`} />
        </Section>

        {/* Doba zobrazení */}
        <Section
          id="duration"
          title="Doba zobrazení"
          description="Prop duration nastaví čas v ms, po které se toast automaticky zavře. duration={0} vytvoří trvalý toast (musí být zavřen ručně)."
        >
          <Preview>
            <DurationDemo />
          </Preview>
          <CodeBlock code={`{/* Výchozí — 4 sekundy */}
addToast({ title: 'Hotovo', variant: 'success' })

{/* Vlastní čas */}
addToast({ title: 'Varování', variant: 'warning', duration: 6000 })

{/* Trvalý — nezavírá se sám */}
addToast({ title: 'Chyba připojení', variant: 'danger', duration: 0 })`} />
        </Section>

        {/* Stack */}
        <Section
          id="stack"
          title="Stohování"
          description="Více toastů se zobrazí nad sebou. Maximum je 5 — starší toasty jsou automaticky odstraněny, pokud přijde šestý."
        >
          <Preview>
            <StackDemo />
          </Preview>
          <CodeBlock code={`{/* Více toastů naráz */}
addToast({ title: 'Hráč 1 pohyb',  message: 'Kostka přesunuta.', variant: 'default' })
addToast({ title: 'Souboj',        message: 'Útok na C4.',        variant: 'warning' })
addToast({ title: 'Výsledek',      message: '+1 VP.',             variant: 'success' })`} />
        </Section>

        {/* Pozice */}
        <Section
          id="position"
          title="Pozice"
          description="ToastProvider přijímá prop position — čtyři rohy obrazovky. Demo výše používá bottom-right (výchozí)."
        >
          <Preview>
            <div style={{ color: '#8F9CB3', fontSize: '0.875rem', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 8px' }}>Dostupné hodnoty:</p>
              <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li><code style={{ color: '#B8956A' }}>"bottom-right"</code> — výchozí, pravý dolní roh</li>
                <li><code style={{ color: '#B8956A' }}>"top-right"</code> — pravý horní roh</li>
                <li><code style={{ color: '#B8956A' }}>"bottom-left"</code> — levý dolní roh</li>
                <li><code style={{ color: '#B8956A' }}>"top-left"</code> — levý horní roh</li>
              </ul>
            </div>
          </Preview>
          <CodeBlock code={`{/* V main.jsx nebo root layoutu */}
<ToastProvider position="bottom-right">
  <App />
</ToastProvider>`} />
        </Section>

        {/* Integrace */}
        <Section
          id="integrace"
          title="Integrace do aplikace"
          description="ToastProvider se přidá jednou na kořen aplikace — poté lze useToast volat z libovolné komponenty."
        >
          <CodeBlock code={`// main.jsx
import { ToastProvider } from './components/Toast'

createRoot(document.getElementById('root')).render(
  <ToastProvider position="bottom-right">
    <App />
  </ToastProvider>
)

// AnyComponent.jsx
import { useToast } from './components/Toast'

function SaveButton() {
  const { addToast } = useToast()

  const handleSave = async () => {
    try {
      await save()
      addToast({ title: 'Uloženo', variant: 'success' })
    } catch {
      addToast({ title: 'Chyba', message: 'Uložení selhalo.', variant: 'danger', duration: 0 })
    }
  }

  return <DonjonButton onClick={handleSave}>Uložit</DonjonButton>
}`} />
        </Section>

        {/* Pravidla */}
        <Section
          id="pravidla"
          title="Pravidla použití"
        >
          <div className="flex flex-col gap-2 text-sm text-neutral-400">
            <p>✓ Používej pro krátkodobou zpětnou vazbu — výsledek akce, potvrzení, nekritická chyba.</p>
            <p>✓ Pro kritické chyby (ztráta dat, selhání sítě) nastav duration=0 — uživatel musí toast potvrdit ručně.</p>
            <p>✓ Drž text krátký — titulek max ~5 slov, zpráva max ~15 slov. Více textu patří do Modálu.</p>
            <p>✓ Nepřidávej do toastu interaktivní obsah (tlačítka akcí) — je to špatně přístupné. Výjimkou je close ×.</p>
            <p>✗ Nezobrazuj více než 3–4 toasty naráz — uživatel nestihne číst.</p>
            <p>✗ Nepoužívej toast pro herní eventy (zisk VP, souboj) — na to slouží FloatFeedback, který je přímo v herní scéně.</p>
          </div>
        </Section>

      </ShowcasePage>
    </ToastProvider>
  )
}
