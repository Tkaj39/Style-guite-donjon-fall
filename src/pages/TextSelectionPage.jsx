import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Selection demo ── */
function SelectionDemo({ label, bg, color, children, note }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200 }}>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>{label}</p>
      <p
        style={{ margin: 0, fontSize: '0.875rem', color: '#F0E6D3', lineHeight: 1.6, userSelect: 'text', cursor: 'text' }}
        onMouseDown={e => {
          const el = e.currentTarget
          el.style.setProperty('--sel-bg',    bg)
          el.style.setProperty('--sel-color', color)
        }}
      >
        {children}
      </p>
      {note && <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4870', lineHeight: 1.3 }}>{note}</p>}
      <style>{`
        ::selection {
          background: #B8956A55;
          color: #F0E6D3;
        }
      `}</style>
    </div>
  )
}

export default function TextSelectionPage() {
  return (
    <ShowcasePage
      title="Text Selection"
      description="Vlastní ::selection styling pro výběr textu. Výběr musí být čitelný na tmavém pozadí a odpovídat zlaté paletě."
    >

      {/* Ukázka */}
      <Section
        id="ukazka"
        title="Výběr textu — živá ukázka"
        description="Označ text v boxech níže pro zobrazení výběrového zvýraznění. Donjon Fall používá zlatý poloprůhledný fill."
      >
        <Preview>
          <div style={{ maxWidth: 440, width: '100%' }}>
            <SelectionDemo
              label="Výchozí Donjon selection"
              bg="#B8956A55"
              color="#F0E6D3"
              note="Označ tento text pro zobrazení výběru →"
            >
              Zahaj strategický souboj věží v Donjon Fall. Každý tah rozhoduje o osudu pevnosti — pohybuj kostkami, obsazuj ohniska a dosáhni vítězných bodů dřív než soupeř.
            </SelectionDemo>
          </div>
        </Preview>
        <CodeBlock code={`/* Globální selection styling — index.css nebo App.css */
::selection {
  background: rgba(184, 149, 106, 0.33); /* #B8956A @ 33% */
  color: #F0E6D3;
}

/* Firefox */
::-moz-selection {
  background: rgba(184, 149, 106, 0.33);
  color: #F0E6D3;
}`} />
      </Section>

      {/* Hodnoty a kontext */}
      <Section
        id="hodnoty"
        title="Selection hodnoty"
        description="Přehled ::selection hodnot pro různé kontexty — výchozí, chybový, herní."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { ctx: 'Výchozí text',          bg: 'rgba(184,149,106,0.33)', color: '#F0E6D3',   note: 'Zlatý poloprůhledný — základní kontexty' },
              { ctx: 'Code blok (CodeBlock)',  bg: 'rgba(64,128,192,0.40)', color: '#F0E6D3',   note: 'Modrý — kód má vlastní kontext' },
              { ctx: 'Chybový text',          bg: 'rgba(192,64,64,0.35)',  color: '#F0E6D3',   note: 'Červený — v error stavu (vzácné)' },
              { ctx: 'no-select (UI prvky)',  bg: 'n/a',                   color: 'n/a',        note: 'user-select: none — tlačítka, labely, badge' },
            ].map(({ ctx, bg, color, note }) => (
              <div key={ctx} style={{ display: 'grid', gridTemplateColumns: '180px 200px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{ctx}</span>
                <code style={{ fontSize: '0.6875rem', color: '#B8956A', lineHeight: 1.5 }}>{bg}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* user-select */}
      <Section
        id="user-select"
        title="user-select — co nelze označit"
        description="Tlačítka, ikony a herní prvky nesmí být označitelné — narušuje to interakci a herní feeling."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { element: 'Tlačítka (DonjonButton)',     select: 'none', reason: 'Kliknutí by označilo text' },
              { element: 'Badge, chip, label',          select: 'none', reason: 'Dekorativní — není k označení' },
              { element: 'Navigační položky (sidebar)',  select: 'none', reason: 'Link — ne text' },
              { element: 'Herní hex, kostka, mapa',     select: 'none', reason: 'Interaktivní canvas prvky' },
              { element: 'Tooltip obsah',               select: 'none', reason: 'Nepersistentní — mizí' },
              { element: 'Toast obsah',                 select: 'text', reason: 'Může obsahovat URL nebo kód' },
              { element: 'Tělo textu, popis, CodeBlock', select: 'text', reason: 'Uživatel může chtít zkopírovat' },
              { element: 'Chybová zpráva',              select: 'text', reason: 'Pro kopírování do bug reportu' },
            ].map(({ element, select, reason }) => (
              <div key={element} style={{ display: 'grid', gridTemplateColumns: '220px 60px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{element}</span>
                <code style={{ fontSize: '0.8125rem', fontWeight: 700, color: select === 'none' ? '#C04040' : '#40A055' }}>{select}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{reason}</span>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`/* Globálně — UI prvky bez výběru */
button, [role="button"], label, nav a, .badge {
  user-select: none;
}

/* Herní canvas */
.hex-map, .dice, .erb {
  user-select: none;
  -webkit-user-select: none;
}

/* Vždy selectable — chybové zprávy, kód */
.error-message, code, pre {
  user-select: text;
}

/* Tailwind utility */
className="select-none"   /* user-select: none */
className="select-text"   /* user-select: text */
className="select-all"    /* kliknutí = vybere vše (pro kód) */`} />
      </Section>

      {/* Copy to clipboard pattern */}
      <Section
        id="copy-pattern"
        title="Copy to clipboard pattern"
        description="Pro code bloky — tlačítko kopírování je lepší než nutit uživatele označit text ručně."
      >
        <Preview>
          <div style={{
            position: 'relative',
            background: '#0E0C22',
            border: '1px solid #8F745430',
            borderRadius: 4,
            padding: '12px 14px',
            maxWidth: 380, width: '100%',
          }}>
            <code style={{ fontSize: '0.8125rem', color: '#8F9CB3', fontFamily: 'monospace', lineHeight: 1.6, display: 'block' }}>
              {`addToast({ title: 'Nelegální tah',\n  variant: 'danger' })`}
            </code>
            <button
              style={{
                position: 'absolute', top: 8, right: 8,
                padding: '4px 8px',
                background: '#1A1830',
                border: '1px solid #8F745430',
                borderRadius: 2,
                fontSize: '0.625rem',
                color: '#8F9CB3',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
              onClick={e => {
                navigator.clipboard?.writeText('addToast({ title: \'Nelegální tah\', variant: \'danger\' })')
                e.currentTarget.textContent = 'Zkopírováno ✓'
                setTimeout(() => { if (e.currentTarget) e.currentTarget.textContent = 'Kopírovat' }, 2000)
              }}
            >
              Kopírovat
            </button>
          </div>
        </Preview>
        <CodeBlock code={`function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ position: 'relative' }}>
      <pre style={{ userSelect: 'text' }}><code>{code}</code></pre>
      <button onClick={handleCopy} aria-label="Kopírovat kód">
        {copied ? 'Zkopírováno ✓' : 'Kopírovat'}
      </button>
    </div>
  )
}`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Globální <code className="text-neutral-300">::selection</code>: zlatý poloprůhledný (#B8956A @ 33%), světlý text.</p>
          <p>✓ <code className="text-neutral-300">user-select: none</code> na všech UI prvcích — tlačítka, badge, nav, herní elementy.</p>
          <p>✓ <code className="text-neutral-300">user-select: text</code> explicitně na textu, chybách, code blocích, toast obsahu.</p>
          <p>✓ Code block: přidej copy tlačítko — je rychlejší než ruční označení.</p>
          <p>✗ Nepoužívej <code className="text-neutral-300">user-select: none</code> globálně na celou stránku — znemožní kopírování chybových zpráv.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
