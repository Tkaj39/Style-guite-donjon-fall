import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Cursor demo ── */
function CursorDemo({ cursor, label, desc, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', minWidth: 120 }}>
      <div
        style={{
          padding: '12px 20px',
          background: '#1E1C3A',
          border: '1px solid #8F745440',
          borderRadius: 3,
          fontSize: '0.875rem',
          color: '#F0E6D3',
          cursor,
          userSelect: 'none',
          minWidth: 90,
          textAlign: 'center',
        }}
      >
        {children || label}
      </div>
      <div style={{ textAlign: 'center' }}>
        <code style={{ fontSize: '0.75rem', color: '#B8956A', display: 'block' }}>{cursor}</code>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#4A4870', lineHeight: 1.3 }}>{desc}</p>
      </div>
    </div>
  )
}

export default function CursorPage() {
  return (
    <ShowcasePage
      title="Cursor States"
      description="Kurzor myši komunikuje interakci — co se stane při kliknutí, tažení nebo čekání. Správný kurzor snižuje kognitivní zátěž."
    >

      {/* Základní kurzory */}
      <Section
        id="zakladni"
        title="Základní kurzory"
        description="Nejčastěji používané hodnoty cursor v Donjon Fall UI."
      >
        <Preview>
          <CursorDemo cursor="default"     label="Default"     desc="Výchozí — statický obsah" />
          <CursorDemo cursor="pointer"     label="Pointer"     desc="Klikatelný prvek" />
          <CursorDemo cursor="text"        label="Text"        desc="Editovatelný text" />
          <CursorDemo cursor="not-allowed" label="Blocked"     desc="Disabled, nepovolen" />
          <CursorDemo cursor="wait"        label="Wait"        desc="Čeká na operaci" />
          <CursorDemo cursor="progress"    label="Progress"    desc="Operace na pozadí" />
          <CursorDemo cursor="grab"        label="Grab"        desc="Přetahovatelný" />
          <CursorDemo cursor="grabbing"    label="Grabbing"    desc="Aktivní tažení" />
          <CursorDemo cursor="crosshair"   label="Crosshair"   desc="Přesný výběr, mapa" />
          <CursorDemo cursor="zoom-in"     label="Zoom in"     desc="Přiblížení" />
          <CursorDemo cursor="zoom-out"    label="Zoom out"    desc="Oddálení" />
          <CursorDemo cursor="move"        label="Move"        desc="Přesouvatelný prvek" />
          <CursorDemo cursor="col-resize"  label="Col resize"  desc="Změna šířky sloupce" />
          <CursorDemo cursor="row-resize"  label="Row resize"  desc="Změna výšky řádku" />
        </Preview>
      </Section>

      {/* Mapování na komponenty */}
      <Section
        id="mapovani"
        title="Mapování na komponenty"
        description="Která komponenta používá který kurzor."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 580 }}>
            {[
              { component: 'DonjonButton — enabled',  cursor: 'pointer',     note: 'Vždy pointer na klikatelném tlačítku' },
              { component: 'DonjonButton — disabled', cursor: 'not-allowed', note: 'Disabled = not-allowed; pointer-events: none nestačí pro UX' },
              { component: 'DonjonInput',             cursor: 'text',        note: 'Input field — editovatelný text' },
              { component: 'DonjonInput — disabled',  cursor: 'not-allowed', note: 'Disabled input' },
              { component: 'Select trigger',          cursor: 'pointer',     note: 'Otevírá dropdown' },
              { component: 'Slider thumb',            cursor: 'grab',        note: 'Tažení posuvníku' },
              { component: 'Slider thumb — active',   cursor: 'grabbing',    note: 'Aktivní tažení (mousedown)' },
              { component: 'Hex na mapě — výběr',     cursor: 'pointer',     note: 'Klikatelný hex' },
              { component: 'Hex — disabled/blocked',  cursor: 'not-allowed', note: 'Hex nedostupný pro aktuální tah' },
              { component: 'Hex — mapa pan',          cursor: 'grab / grabbing', note: 'Posunování mapy' },
              { component: 'Mapa — přiblížení',       cursor: 'zoom-in',     note: 'Scroll = zoom' },
              { component: 'Tooltip trigger',         cursor: 'help',        note: 'Prvek s nápovědou (alternativa: default)' },
              { component: 'Statický text',           cursor: 'default',     note: 'Neklikatelný, needitovatelný obsah' },
              { component: 'NavLink',                 cursor: 'pointer',     note: 'Odkaz v sidebar / menu' },
              { component: 'Loading overlay',         cursor: 'wait',        note: 'Celá stránka čeká' },
            ].map(({ component, cursor, note }) => (
              <div key={component} style={{ display: 'grid', gridTemplateColumns: '220px 120px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{component}</span>
                <code style={{ fontSize: '0.8125rem', color: '#B8956A' }}>{cursor}</code>
                <span style={{ fontSize: '0.75rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`/* Disabled — kombinace not-allowed + opacity */
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  /* Pozor: pointer-events: none zabrání zobrazení kurzoru i tooltipu */
}

/* Hex interakce */
.hex              { cursor: default; }
.hex.selectable   { cursor: pointer; }
.hex.blocked      { cursor: not-allowed; }
.hex-map.panning  { cursor: grabbing; }
.hex-map          { cursor: grab; }

/* Slider */
.slider-thumb         { cursor: grab; }
.slider-thumb:active  { cursor: grabbing; }`} />
      </Section>

      {/* Pointer events */}
      <Section
        id="pointer-events"
        title="pointer-events: none — kdy NE"
        description="pointer-events: none odstraní veškeré mouse interakce — tooltip, hover, cursor. Použij jen vědomě."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 540 }}>
            <div style={{ padding: '14px', border: '1px solid #C0404040', borderRadius: 4, background: '#3D181818' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#C04040', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ pointer-events: none na disabled</p>
              <p style={{ margin: '0 0 4px', fontSize: '0.8125rem', color: '#F0E6D3' }}>Tooltip se nezobrazí</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>Uživatel nevidí cursor not-allowed — neví proč je disabled.</p>
            </div>
            <div style={{ padding: '14px', border: '1px solid #40A05540', borderRadius: 4, background: '#183D2018' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#40A055', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ cursor: not-allowed + disabled attr</p>
              <p style={{ margin: '0 0 4px', fontSize: '0.8125rem', color: '#F0E6D3' }}>Tooltip lze přidat na wrapper</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3' }}>Uživatel vidí not-allowed, tooltip vysvětlí proč.</p>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`{/* Disabled tlačítko — zachovej cursor a hover pro tooltip */}
<Tooltip content="Nejprve dokonči tah" disabled={!isDisabled}>
  <span style={{ cursor: isDisabled ? 'not-allowed' : undefined }}>
    <button
      disabled={isDisabled}
      style={{ pointerEvents: isDisabled ? 'none' : undefined }}
    >
      Útok
    </button>
  </span>
</Tooltip>

{/* Wrapper span přijme hover události místo disabled buttonu */}`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Klikatelný prvek = vždy <code className="text-neutral-300">cursor: pointer</code>.</p>
          <p>✓ Disabled prvek = <code className="text-neutral-300">cursor: not-allowed</code> — uživatel ví, že prvek existuje ale není dostupný.</p>
          <p>✓ Přetahovatelné prvky (slider, mapa pan): <code className="text-neutral-300">grab</code> → <code className="text-neutral-300">grabbing</code> při mousedown.</p>
          <p>✓ Hex mapa při výběru akce: <code className="text-neutral-300">crosshair</code> — přesný výběr cíle.</p>
          <p>✗ <code className="text-neutral-300">pointer-events: none</code> na disabled prvcích ruší tooltip a cursor — použij wrapper span.</p>
          <p>✗ Nepoužívej <code className="text-neutral-300">cursor: pointer</code> na neklíkatelném textu nebo dekorativním obsahu.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
