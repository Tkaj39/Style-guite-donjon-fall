import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonBadge from '../components/DonjonBadge'

/* ── Breakpoint vizuál ── */
function BpBar({ label, min, max, color, desc, items }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: '12px 14px', background: '#12102A', border: `1px solid ${color}33`, borderRadius: 4, borderLeft: `3px solid ${color}` }}>
      <div style={{ flexShrink: 0, width: 80 }}>
        <code style={{ fontSize: '0.8125rem', fontWeight: 700, color }}>{label}</code>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#4A4870' }}>{min}{max ? `–${max}` : '+'} px</p>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 4px', fontSize: '0.8125rem', color: '#F0E6D3' }}>{desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {items.map(i => (
            <DonjonBadge key={i} size="sm" variant="default">{i}</DonjonBadge>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Layout diagram ── */
function LayoutDiagram({ cols, sidebar, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4870', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
      <div style={{ display: 'flex', gap: 3, height: 60, width: 140 }}>
        {sidebar && (
          <div style={{ width: 22, background: '#2A2948', border: '1px solid #8F745430', borderRadius: 2, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 3 }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} style={{ background: '#1A1830', border: '1px solid #8F745430', borderRadius: 2 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ResponsivePage() {
  return (
    <ShowcasePage
      title="Responsive Design"
      description="Pravidla pro adaptaci Donjon Fall UI na různé velikosti obrazovek — breakpointy, grid, sidebar chování, typografie a dotyková přístupnost."
    >

      {/* Breakpointy */}
      <Section
        id="breakpointy"
        title="Breakpointy"
        description="Čtyři breakpointy odpovídající Tailwind CSS výchozím hodnotám. Design začíná mobile-first."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: 600 }}>
            <BpBar
              label="xs" min={0} max={639}
              color="#4080C0"
              desc="Mobil — jednosloupcový layout, sidebar skrytý"
              items={['1 sloupec', 'sidebar: drawer', 'font: -1 stupeň', 'touch targets: 44px+']}
            />
            <BpBar
              label="sm" min={640} max={767}
              color="#40A055"
              desc="Velký mobil / malý tablet — 1–2 sloupce"
              items={['1–2 sloupce', 'sidebar: drawer', 'card grid: 2 col']}
            />
            <BpBar
              label="md" min={768} max={1023}
              color="#C08040"
              desc="Tablet — 2–3 sloupce, sidebar overlay"
              items={['2–3 sloupce', 'sidebar: overlay', 'panel: 50 % šířky']}
            />
            <BpBar
              label="lg" min={1024} max={1279}
              color="#8F7458"
              desc="Desktop — plný layout, sticky sidebar"
              items={['3–4 sloupce', 'sidebar: sticky', 'plný grid']}
            />
            <BpBar
              label="xl" min={1280}
              color="#B8956A"
              desc="Velký desktop — rozšířené obsahové oblasti"
              items={['max-width: 1440px', 'větší gutter', 'více karet vedle sebe']}
            />
          </div>
        </Preview>
        <CodeBlock code={`/* Tailwind breakpointy — mobile-first */
// xs: 0px     (žádný prefix — výchozí)
// sm: 640px   sm:
// md: 768px   md:
// lg: 1024px  lg:
// xl: 1280px  xl:

/* CSS equivalenty */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }`} />
      </Section>

      {/* Grid layout na breakpointech */}
      <Section
        id="grid"
        title="Grid na breakpointech"
        description="Jak se mění počet sloupců a přítomnost sidebaru v závislosti na velikosti."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <LayoutDiagram label="xs — 375px"  cols={1} sidebar={false} />
            <LayoutDiagram label="sm — 640px"  cols={2} sidebar={false} />
            <LayoutDiagram label="md — 768px"  cols={2} sidebar={true}  />
            <LayoutDiagram label="lg — 1024px" cols={3} sidebar={true}  />
            <LayoutDiagram label="xl — 1280px" cols={4} sidebar={true}  />
          </div>
        </Preview>
        <CodeBlock code={`{/* Responsivní grid — Tailwind */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

{/* Responsivní layout s postranním panelem */}
<div className="flex flex-col lg:flex-row gap-6">
  <aside className="w-full lg:w-64 shrink-0">{/* sidebar */}</aside>
  <main className="flex-1 min-w-0">{/* obsah */}</main>
</div>`} />
      </Section>

      {/* Sidebar chování */}
      <Section
        id="sidebar"
        title="Sidebar chování"
        description="Na mobilu a tabletu sidebar nemá místo — skryj ho za hamburger menu. Na desktopu je sticky."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { bp: 'xs / sm', behavior: 'Skrytý — hamburger v topbaru otevře drawer overlay (translateX)', z: 'z-300', close: 'Klik mimo, Escape, × tlačítko' },
              { bp: 'md',      behavior: 'Skrytý — identické chování jako xs/sm', z: 'z-300', close: 'Klik mimo, Escape, × tlačítko' },
              { bp: 'lg+',     behavior: 'Sticky left — vždy viditelný, top-0, height: 100vh, overflow-y: auto', z: 'n/a (in-flow)', close: 'n/a' },
            ].map(({ bp, behavior, z, close }) => (
              <div key={bp} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 60px 1fr', gap: 10, padding: '9px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'start' }}>
                <code style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#B8956A' }}>{bp}</code>
                <span style={{ fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{behavior}</span>
                <code style={{ fontSize: '0.75rem', color: '#4A4870' }}>{z}</code>
                <span style={{ fontSize: '0.75rem', color: '#4A4870', lineHeight: 1.4 }}>{close}</span>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`{/* Sidebar — responsivní přepínání */}
<aside
  className={[
    'fixed lg:sticky top-0 h-screen z-[300]',
    'w-64 shrink-0',
    'transition-transform duration-300 ease-in-out',
    'lg:translate-x-0',          // desktop: vždy viditelný
    isOpen ? 'translate-x-0' : '-translate-x-full', // mobil: drawer
  ].join(' ')}
>
  {/* ...obsah sidebaru... */}
</aside>

{/* Overlay pozadí (mobil) */}
{isOpen && (
  <div
    className="fixed inset-0 bg-black/60 z-[299] lg:hidden"
    onClick={closeSidebar}
  />
)}`} />
      </Section>

      {/* Typografie */}
      <Section
        id="typografie"
        title="Typografická škála na breakpointech"
        description="Nadpisy a UI text se zmenšují na mobilních zařízeních — ale ne lineárně."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { element: 'Page title (h1)',  desktop: '1.75rem / 28px', mobile: '1.375rem / 22px' },
              { element: 'Section title (h2)', desktop: '1.25rem / 20px', mobile: '1.0625rem / 17px' },
              { element: 'Card title',        desktop: '0.9375rem / 15px', mobile: '0.875rem / 14px' },
              { element: 'Body / default',    desktop: '0.875rem / 14px', mobile: '0.875rem / 14px' },
              { element: 'Small / caption',   desktop: '0.75rem / 12px', mobile: '0.75rem / 12px' },
              { element: 'Micro / label',     desktop: '0.625rem / 10px', mobile: '0.625rem / 10px' },
            ].map(({ element, desktop, mobile }) => (
              <div key={element} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{element}</span>
                <code style={{ fontSize: '0.75rem', color: '#B8956A' }}>{desktop}</code>
                <code style={{ fontSize: '0.75rem', color: '#4080C0' }}>{mobile}</code>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`/* Responsivní nadpis — Tailwind */
<h1 className="text-[1.375rem] lg:text-[1.75rem] font-bold">
  Donjon Fall
</h1>

/* CSS alternativa */
.page-title {
  font-size: clamp(1.375rem, 3vw, 1.75rem);
}`} />
      </Section>

      {/* Touch targets */}
      <Section
        id="touch"
        title="Dotykové cíle"
        description="Na dotykových zařízeních musí být interaktivní prvky dostatečně velké pro prst."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { element: 'Tlačítko (sm)',   min: '32 × 32px', recommended: '44 × 44px', note: 'Přidej padding nebo min-height' },
              { element: 'Tlačítko (md)',   min: '36 × 36px', recommended: '44 × 44px', note: 'Výchozí md velikost již splňuje' },
              { element: 'Toggle',          min: '44 × 28px', recommended: '44 × 44px', note: 'Přidej wrapper s paddingem' },
              { element: 'Checkbox',        min: '24 × 24px', recommended: '44 × 44px', note: 'Klikaný label rozšíří plochu' },
              { element: 'Nav link (mobil)', min: '44px výška', recommended: '48px výška', note: 'Sidebar položka musí mít min-height' },
              { element: 'Icon button',     min: '24 × 24px', recommended: '44 × 44px', note: 'Vždy přidej padding k ikoně' },
            ].map(({ element, min, recommended, note }) => (
              <div key={element} style={{ display: 'grid', gridTemplateColumns: '170px 80px 90px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'start' }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{element}</span>
                <code style={{ fontSize: '0.75rem', color: '#C04040' }}>{min}</code>
                <code style={{ fontSize: '0.75rem', color: '#40A055' }}>{recommended}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`/* Touch target helper — rozšíř klikatelnou plochu bez změny vizuálu */
.touch-target {
  position: relative;
}
.touch-target::after {
  content: '';
  position: absolute;
  inset: -8px; /* přidá 8px padding kolem */
}

/* Tailwind — min-height pro nav linky */
<NavLink className="flex items-center min-h-[44px] px-3">
  {label}
</NavLink>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Mobile-first: piš výchozí styly pro mobil, přepisuj je směrem nahoru (lg:, xl:).</p>
          <p>✓ Sidebar je drawer na &lt;lg, sticky na lg+. Overlay pozadí musí mít Escape a klik-mimo zavření.</p>
          <p>✓ Touch targets: min 44×44px pro všechny interaktivní prvky na mobilním layoutu.</p>
          <p>✓ Grid: začni od 1 sloupce, rozšiřuj — nikdy nezačínaj od 4 sloupců a nezmenšuj.</p>
          <p>✗ Nepřizpůsobuj breakpointy designu — přizpůsobuj design breakpointům.</p>
          <p>✗ Nepoužívej pevné šířky v px pro obsahové bloky — používej max-width + šířku v %.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
