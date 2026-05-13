import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const LAYERS = [
  { name: 'base',         z: 0,    color: '#2A2948', label: 'Základní obsah', desc: 'Herní plán, text, statické elementy stránky.' },
  { name: 'raised',       z: 10,   color: '#2E2B50', label: 'Vyvýšené karty', desc: 'Hover karta, aktivní hex tile, přepnutý panel.' },
  { name: 'sticky',       z: 100,  color: '#353358', label: 'Sticky prvky', desc: 'Sticky header, fixní HUD, turn indicator.' },
  { name: 'dropdown',     z: 200,  color: '#3A3860', label: 'Dropdown / Select', desc: 'Otevřený Select, kontextové menu, auto-complete.' },
  { name: 'sidebar',      z: 300,  color: '#3E3D68', label: 'Sidebar / Drawer', desc: 'Mobilní sidebar, vysuvné panely.' },
  { name: 'modal-bg',     z: 900,  color: '#252240', label: 'Modal backdrop', desc: 'Tmavé pozadí za modálem.' },
  { name: 'modal',        z: 1000, color: '#4A4878', label: 'Modal / Dialog', desc: 'Modální dialog, potvrzovací overlay.' },
  { name: 'toast',        z: 2000, color: '#504E80', label: 'Toast / Notifikace', desc: 'Plovoucí notifikace — vždy nad vším ostatním kromě tooltipu.' },
  { name: 'tooltip',      z: 3000, color: '#585688', label: 'Tooltip', desc: 'Kontextová nápověda — nejvyšší z UI vrstev.' },
  { name: 'devtools',     z: 9999, color: '#1A1830', label: 'Dev / Debug', desc: 'Debug overlay, vývojářské panely.' },
]

function LayerBar({ name, z, color, label, desc, highlight }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 60px 1fr',
      gap: 12,
      padding: '10px 14px',
      background: highlight ? '#2A2948' : 'transparent',
      borderBottom: '1px solid #8F745418',
      alignItems: 'center',
      borderLeft: highlight ? '3px solid #B8956A' : '3px solid transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: 2, background: color, border: '1px solid #8F745440', flexShrink: 0 }} />
        <code style={{ fontSize: '0.6875rem', color: '#8F9CB3' }}>{name}</code>
      </div>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#B8956A', fontFamily: 'monospace' }}>{z}</span>
      <div>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F0E6D3', fontWeight: 500 }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#8F9CB3' }}>{desc}</p>
      </div>
    </div>
  )
}

/* Vizuální stack diagram */
function StackDiagram() {
  const visible = [
    { z: 3000, label: 'Tooltip', bg: '#2A3D5A', border: '#4080C0' },
    { z: 2000, label: 'Toast',   bg: '#2A3520', border: '#40A055' },
    { z: 1000, label: 'Modal',   bg: '#353751', border: '#8F7458' },
    { z: 900,  label: 'Backdrop',bg: '#0A0820', border: '#8F745430', opacity: 0.8 },
    { z: 200,  label: 'Select',  bg: '#252340', border: '#8F745455' },
    { z: 0,    label: 'Obsah',   bg: '#12102A', border: '#8F745430' },
  ]
  return (
    <div style={{ position: 'relative', width: 300, height: 260 }}>
      {visible.map((layer, i) => (
        <div
          key={layer.z}
          style={{
            position: 'absolute',
            left: i * 8,
            top: i * 6,
            right: 8 - i * 2,
            height: 44,
            background: layer.bg,
            border: `1px solid ${layer.border}`,
            borderRadius: 3,
            opacity: layer.opacity ?? 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#F0E6D3' }}>{layer.label}</span>
          <code style={{ fontSize: '0.625rem', color: '#4A4870' }}>z:{layer.z}</code>
        </div>
      ))}
    </div>
  )
}

export default function ZIndexPage() {
  const CURRENT_USAGE = ['dropdown', 'sidebar', 'modal-bg', 'modal', 'toast', 'tooltip']

  return (
    <ShowcasePage
      title="Z-index škála"
      description="Systém vrstvení překryvných prvků. Definuje pořadí vrstev, prevenci konfliktů a pravidla pro nové overlay komponenty."
    >

      {/* Škála */}
      <Section
        id="skala"
        title="Škála vrstev"
        description="Zvýrazněné vrstvy jsou aktuálně použité v komponentách style guidu."
      >
        <Preview dark={false}>
          <div style={{ width: '100%', border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '90px 60px 1fr',
              gap: 12,
              padding: '8px 14px',
              background: '#12102A',
              borderBottom: '1px solid #8F745430',
            }}>
              {['Vrstva', 'z-index', 'Použití'].map(h => (
                <span key={h} style={{ fontSize: '0.625rem', color: '#4A4870', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            {LAYERS.map(layer => (
              <LayerBar key={layer.name} {...layer} highlight={CURRENT_USAGE.includes(layer.name)} />
            ))}
          </div>
        </Preview>
        <CodeBlock code={`/* Z-index tokeny — přidat do globals.css nebo design tokens */
--z-base:      0;
--z-raised:    10;
--z-sticky:    100;
--z-dropdown:  200;
--z-sidebar:   300;
--z-modal-bg:  900;
--z-modal:     1000;
--z-toast:     2000;
--z-tooltip:   3000;
--z-devtools:  9999;`} />
      </Section>

      {/* Vizuální stack */}
      <Section
        id="stack"
        title="Vizuální stack"
        description="Překryvné vrstvy uspořádané od základu (dole) po tooltip (nahoře)."
      >
        <Preview>
          <StackDiagram />
        </Preview>
      </Section>

      {/* Aktuální použití */}
      <Section
        id="pouziti"
        title="Aktuální použití v komponentách"
        description="Konkrétní hodnoty nasazené v kódu style guidu."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: 480 }}>
            {[
              { component: 'Select (dropdown)',   z: 900,  file: 'Select.jsx' },
              { component: 'Modal (backdrop)',    z: 1000, file: 'Modal.jsx' },
              { component: 'Modal (panel)',       z: 1000, file: 'Modal.jsx' },
              { component: 'Toast (container)',   z: 2000, file: 'Toast.jsx' },
              { component: 'Tooltip (bubble)',    z: 3000, file: 'Tooltip.jsx' },
              { component: 'Sidebar (mobile)',    z: 50,   file: 'Sidebar.jsx' },
            ].map(({ component, z, file }) => (
              <div key={component} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 12px', background: '#12102A', border: '1px solid #8F745420', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{component}</span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <code style={{ fontSize: '0.6875rem', color: '#4A4870' }}>{file}</code>
                  <code style={{ fontSize: '0.875rem', fontWeight: 700, color: '#B8956A', minWidth: 40, textAlign: 'right' }}>z:{z}</code>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section
        id="pravidla"
        title="Pravidla pro nové overlay komponenty"
      >
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Nové overlaye vždy zařaď do existující škály — nepoužívej libovolná čísla.</p>
          <p>✓ Tooltip musí být vždy nejvyšší z UI vrstev (z: 3000) — nikdy ho nesniž kvůli jinému prvku.</p>
          <p>✓ Toast je nad modalem (2000 {'>'} 1000) — notifikace musí být čitelné i při otevřeném dialogu.</p>
          <p>✓ Backdrop modalu (z: 900) musí být pod panelem modalu (z: 1000) ve stejném stacking contextu.</p>
          <p>✗ Nepoužívaj <code style={{ color: '#8F9CB3' }}>z-index: 9999</code> pro produkční UI — je to záchranná brána jen pro dev overlay.</p>
          <p>✗ Pozor na <code style={{ color: '#8F9CB3' }}>position: relative/absolute</code> — vytváří nový stacking context a může překrývat logiku z-indexů.</p>
          <p>✗ <code style={{ color: '#8F9CB3' }}>transform</code>, <code style={{ color: '#8F9CB3' }}>filter</code> a <code style={{ color: '#8F9CB3' }}>opacity {'<'} 1</code> na rodičovském elementu také vytváří nový stacking context — nikdy neobaluj modal nebo tooltip prvkem s transformem.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
