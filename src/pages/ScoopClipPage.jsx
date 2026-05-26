import { useState } from 'react'
import ScoopClip from '../lib/tkajui/ScoopClip'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import {
  gold, goldDim, goldMid,
  bg2, bg3, bg4, bgDeep,
  borderDefault,
  textHigh, textMid, textLow, textFaint, textCool,
  successColor, dangerColor, infoColor, warningColor,
} from '../lib/donjon/tokens'

/* ── Sdílené mini-styly ── */
const labelStyle = {
  fontSize: '0.5625rem', fontWeight: 600,
  letterSpacing: '0.1em', textTransform: 'uppercase',
  color: '#4a4860', marginBottom: 6,
}
const nano = { fontSize: '0.5rem', color: textFaint, fontFamily: 'monospace', textAlign: 'center', marginTop: 4 }

/* ── Picker tlačítko ── */
function PickerBtn({ active, onClick, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '3px 10px',
        borderRadius: 3,
        border: `1px solid ${active ? gold : '#2a2838'}`,
        background: active ? `${gold}18` : 'transparent',
        color: active ? gold : disabled ? '#3a3848' : '#8a8899',
        fontSize: '0.6875rem',
        fontFamily: 'monospace',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.12s',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

/* ── Props tabulka ── */
function PropsTable() {
  const rows = [
    { name: 'r',           type: 'number',        req: false, def: '0.25', desc: 'Relativní hloubka konkávního vydlabání (0–0.5). Hodnota 0.25 znamená 25 % výšky elementu.' },
    { name: 'borderColor', type: 'string',        req: false, def: '—',    desc: 'Barva borderu — renderuje podkladovou vrstvu se správným scoop tvarem. Nepoužívej CSS border v style.' },
    { name: 'borderWidth', type: 'number',        req: false, def: '1',    desc: 'Tloušťka borderu v px (funguje jen pokud je borderColor nastavena).' },
    { name: 'children',   type: 'ReactNode',     req: false, def: '—',    desc: 'Obsah obalený scoop tvarem.' },
    { name: 'style',      type: 'CSSProperties', req: false, def: '{}',   desc: 'Inline styly na vnitřní div. Typicky height, padding, background.' },
    { name: 'className',  type: 'string',        req: false, def: '—',    desc: 'Tailwind nebo vlastní CSS třídy na vnitřní div.' },
  ]
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-900">
            <th className="px-3 py-2.5 font-semibold text-neutral-400 w-4">·</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400">Prop</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400">Type</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400 hidden sm:table-cell">Default</th>
            <th className="px-3 py-2.5 font-semibold text-neutral-400">Popis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60">
          {rows.map(({ name, type, req, def, desc }) => (
            <tr key={name} className="hover:bg-neutral-800/30 transition-colors">
              <td className="px-3 py-2.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${req ? 'bg-brand-500' : 'bg-neutral-700'}`} title={req ? 'required' : 'optional'} />
              </td>
              <td className="px-3 py-2.5"><code className="font-mono text-brand-300 text-[11px]">{name}</code></td>
              <td className="px-3 py-2.5"><code className="font-mono text-neutral-400 text-[10px]">{type}</code></td>
              <td className="px-3 py-2.5 hidden sm:table-cell">
                <code className="font-mono text-neutral-500 text-[10px]">{def}</code>
              </td>
              <td className="px-3 py-2.5 text-neutral-400 text-[11px] leading-relaxed">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-4 px-3 py-2 border-t border-neutral-800 bg-neutral-900/50">
        <span className="flex items-center gap-1.5 text-[10px] text-neutral-600"><span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />required</span>
        <span className="flex items-center gap-1.5 text-[10px] text-neutral-600"><span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-700" />optional</span>
      </div>
    </div>
  )
}

/* ── Interaktivní demo ── */
const COLOR_OPTIONS = [
  { token: 'goldDim',      value: goldDim,      label: 'goldDim' },
  { token: 'gold',         value: gold,         label: 'gold' },
  { token: 'goldMid',      value: goldMid,      label: 'goldMid' },
  { token: 'successColor', value: successColor, label: 'success' },
  { token: 'dangerColor',  value: dangerColor,  label: 'danger' },
  { token: 'infoColor',    value: infoColor,    label: 'info' },
]
const HEIGHT_OPTIONS = [36, 48, 64, 80]

function InteractiveDemo() {
  const [r,        setR]        = useState(0.25)
  const [height,   setHeight]   = useState(48)
  const [colorIdx, setColorIdx] = useState(0)

  const col = COLOR_OPTIONS[colorIdx]

  const snippet = `<ScoopClip
  r={${r}}
  borderColor="${col.value}44"
  style={{
    height: ${height},
    padding: '0 24px',
    background: '${col.value}18',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  Obsah
</ScoopClip>`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Pickers */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>

        {/* r slider */}
        <div style={{ minWidth: 200 }}>
          <p style={labelStyle}>r = {r.toFixed(2)} <span style={{ color: '#3a3848', fontSize: '0.5rem' }}>(hloubka vydlabání)</span></p>
          <input
            type="range"
            min={0.05} max={0.45} step={0.01}
            value={r}
            onChange={e => setR(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: gold, cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem', color: '#3a3848', marginTop: 2 }}>
            <span>0.05 (mělký)</span><span>0.45 (hluboký)</span>
          </div>
        </div>

        {/* Výška */}
        <div>
          <p style={labelStyle}>height</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {HEIGHT_OPTIONS.map(h => (
              <PickerBtn key={h} active={height === h} onClick={() => setHeight(h)}>{h}px</PickerBtn>
            ))}
          </div>
        </div>

        {/* Barva */}
        <div>
          <p style={labelStyle}>color</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {COLOR_OPTIONS.map((c, i) => (
              <button
                key={c.token}
                type="button"
                title={c.label}
                onClick={() => setColorIdx(i)}
                style={{
                  width: 20, height: 20,
                  borderRadius: 3,
                  border: `2px solid ${colorIdx === i ? '#ffffff44' : 'transparent'}`,
                  background: c.value,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'border-color 0.12s',
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: '0.5rem', color: '#4a4860', marginTop: 4, fontFamily: 'monospace' }}>{col.label}</p>
        </div>
      </div>

      {/* Live preview — 3 šířky najednou */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[140, 220, 320].map(w => (
          <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.5rem', color: '#3a3848', fontFamily: 'monospace', width: 36, textAlign: 'right', flexShrink: 0 }}>{w}px</span>
            <ScoopClip
              r={r}
              borderColor={`${col.value}44`}
              style={{
                width: w,
                height,
                background: `${col.value}14`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '0.6875rem', color: col.value, fontFamily: 'monospace' }}>
                r={r.toFixed(2)}
              </span>
            </ScoopClip>
          </div>
        ))}
        <p style={{ fontSize: '0.5625rem', color: '#3a3848', marginTop: 4 }}>
          Stejný r při různých šířkách — vidíš jak se prohnutí přizpůsobuje.
        </p>
      </div>

      {/* Code snippet */}
      <pre style={{
        margin: 0, padding: '14px 16px',
        background: '#0F0E1A',
        border: '1px solid #1e1c2e',
        borderRadius: 4,
        fontSize: '0.6875rem',
        fontFamily: 'monospace',
        color: goldDim,
        lineHeight: 1.7,
        overflow: 'auto',
        whiteSpace: 'pre',
      }}>
        {snippet}
      </pre>
    </div>
  )
}

/* ── Main ── */
export default function ScoopClipPage() {
  return (
    <ShowcasePage
      title="ScoopClip"
      description="Obal s konkávně vydlabanými rohy (scoop tvar) pomocí SVG clipPath s objectBoundingBox — souřadnice 0–1 relativně k elementu, takže tvar se přizpůsobí libovolné šířce při zachování výšky."
      componentSlug="scoop-clip"
      library="donjon"
    >

      {/* ── Velikosti — size prop ── */}
      <Section
        id="velikosti"
        title="Velikosti — prop size"
        description="Stejný velikostní systém jako u octagonu: xs / sm / md / lg. V bezier módu mapuje na SHAPE_SIZES[size].bb (relativní), v circle módu na SHAPE_SIZES[size].scoop (absolutní px)."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <p style={{ ...nano, marginBottom: 8, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Bezier (responzivní)
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end', marginBottom: 18 }}>
              {[
                { size: 'xs', w: 100, h: 32 },
                { size: 'sm', w: 130, h: 40 },
                { size: 'md', w: 170, h: 52 },
                { size: 'lg', w: 210, h: 64 },
              ].map(({ size, w, h }) => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ScoopClip
                    shape="bezier" size={size}
                    borderColor={`${goldDim}55`}
                    style={{
                      width: w, height: h,
                      background: `${goldDim}12`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', color: goldDim, fontFamily: 'monospace' }}>size="{size}"</span>
                  </ScoopClip>
                  <p style={nano}>{size} · {w}×{h}px</p>
                </div>
              ))}
            </div>

            <p style={{ ...nano, marginBottom: 8, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Circle (pevný výřez kruhu)
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end' }}>
              {[
                { size: 'xs', r: 8  },
                { size: 'sm', r: 10 },
                { size: 'md', r: 13 },
                { size: 'lg', r: 16 },
              ].map(({ size, r }) => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ScoopClip
                    shape="circle" size={size}
                    borderColor={`${goldDim}55`}
                    style={{
                      background: `${goldDim}12`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', color: goldDim, fontFamily: 'monospace' }}>size="{size}"</span>
                  </ScoopClip>
                  <p style={nano}>{size} · r={r}px</p>
                </div>
              ))}
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<ScoopClip size="md" style={{ width: 170, height: 52 }}>
  Tlačítko (bezier default)
</ScoopClip>

<ScoopClip shape="circle" size="md">
  Pevný kruhový výřez (container auto 170×52)
</ScoopClip>

// Custom hodnota přes r má přednost před size:
<ScoopClip r={0.30} style={{ height: 80 }}>...</ScoopClip>
<ScoopClip shape="circle" r={20} style={{ width: 200, height: 60 }}>...</ScoopClip>`} />
      </Section>

      {/* ── Shape: bezier vs circle ── */}
      <Section
        id="shape"
        title="Tvar oblouku — bezier vs circle"
        description="Dva geometrické režimy. Bezier (default) je responzivní Q křivka v objectBoundingBox — přizpůsobí se libovolné velikosti elementu. Circle používá A arc command s absolutními px — matematicky přesný kruhový výřez, ale element musí mít explicitní width × height."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <p style={{ ...nano, marginBottom: 8, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Bezier (responzivní)
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end', marginBottom: 20 }}>
              {['xs', 'sm', 'md', 'lg'].map(size => {
                const { w, h } = { xs: { w: 100, h: 32 }, sm: { w: 130, h: 40 }, md: { w: 170, h: 52 }, lg: { w: 210, h: 64 } }[size]
                return (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ScoopClip
                      shape="bezier" size={size}
                      borderColor={`${goldDim}55`}
                      style={{ width: w, height: h, background: `${goldDim}12` }}
                    />
                    <p style={nano}>{size}</p>
                  </div>
                )
              })}
            </div>

            <p style={{ ...nano, marginBottom: 8, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Circle (pevný výřez kruhu)
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end', marginBottom: 8 }}>
              {['xs', 'sm', 'md', 'lg'].map(size => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ScoopClip
                    shape="circle" size={size}
                    borderColor={`${goldDim}55`}
                    style={{ background: `${goldDim}12` }}
                  />
                  <p style={nano}>{size}</p>
                </div>
              ))}
            </div>
            <p style={{ ...nano, color: textFaint, fontSize: '0.6875rem' }}>
              U circle módu se width × height automaticky nastaví z SHAPE_SIZES[size].
              Kruhový výřez má pevný poloměr (xs: 8px, sm: 10px, md: 13px, lg: 16px).
            </p>
          </div>
        </Preview>

        {/* Direct comparison */}
        <Preview>
          <div style={{ width: '100%' }}>
            <p style={{ ...nano, marginBottom: 8, color: textCool, letterSpacing: '0.06em' }}>
              Srovnání na stejně velkém boxu (lg = 210×64, r=16px)
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ScoopClip shape="bezier" r={16/64} borderColor={gold} borderWidth={1}
                  style={{ width: 210, height: 64, background: bgDeep }} />
                <p style={nano}>bezier · r=0.25</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ScoopClip shape="circle" r={16} borderColor={gold} borderWidth={1}
                  style={{ width: 210, height: 64, background: bgDeep }} />
                <p style={nano}>circle · r=16px</p>
              </div>
            </div>
            <p style={{ ...nano, marginTop: 10, color: textFaint, fontSize: '0.6875rem' }}>
              Bezier oblouk je vizuálně podobný, ale kontrolní bod kvadratické křivky
              není přesně na kružnici — drobné odchylky vidět zejména v rozích.
            </p>
          </div>
        </Preview>

        <CodeBlock code={`// Bezier — responzivní, scaluje s containerem
<ScoopClip shape="bezier" size="md" style={{ width: 200, height: 60 }}>...</ScoopClip>

// Circle — pevný kruhový výřez, container je z SHAPE_SIZES.md
<ScoopClip shape="circle" size="md">...</ScoopClip>

// Circle s custom hodnotami
<ScoopClip shape="circle" r={20} style={{ width: 250, height: 80 }}>...</ScoopClip>`} />
      </Section>

      {/* ── r hodnoty ── */}
      <Section
        id="r-hodnoty"
        title="Hloubka vydlabání — prop r"
        description="r je relativní hloubka scoopnutí vůči výšce elementu. Hodnota 0.25 znamená vydlabání 25 % výšky z každého rohu. Doporučený rozsah: 0.18–0.30."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <p style={{ ...nano, marginBottom: 8, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Bezier — r v 0–0.5 (podíl výšky)
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', marginBottom: 18 }}>
              {[0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40].map(r => (
                <div key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ScoopClip
                    shape="bezier" r={r}
                    borderColor={`${goldDim}44`}
                    style={{
                      width: 110, height: 52,
                      background: `${goldDim}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', color: goldDim, fontFamily: 'monospace' }}>r={r}</span>
                  </ScoopClip>
                  <p style={nano}>r={r}</p>
                </div>
              ))}
            </div>

            <p style={{ ...nano, marginBottom: 8, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Circle — r v px (poloměr kruhu, stejný container 110×52)
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
              {[5, 8, 11, 13, 16, 18, 21].map(r => (
                <div key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ScoopClip
                    shape="circle" r={r}
                    borderColor={`${goldDim}44`}
                    style={{
                      width: 110, height: 52,
                      background: `${goldDim}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', color: goldDim, fontFamily: 'monospace' }}>r={r}px</span>
                  </ScoopClip>
                  <p style={nano}>r={r}px</p>
                </div>
              ))}
            </div>
          </div>
        </Preview>
      </Section>

      {/* ── Responzivita ── */}
      <Section
        id="responzivita"
        title="Responzivní chování"
        description="Díky objectBoundingBox se tvar přizpůsobuje šířce elementu. Při extrémních poměrech stran (velmi úzký nebo velmi široký element) se prohnutí mírně deformuje — ScoopClip funguje nejlépe pro prvky s konstantní výškou."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 400 }}>
            <p style={{ ...nano, marginBottom: 6, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Bezier — r=0.25 (relativní) deformuje při změně šířky
            </p>
            {[80, 140, 200, 300, 400].map(w => (
              <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '0.5rem', color: textFaint, fontFamily: 'monospace', width: 36, textAlign: 'right', flexShrink: 0 }}>{w}px</span>
                <ScoopClip
                  shape="bezier" r={0.25}
                  borderColor={`${goldDim}33`}
                  style={{
                    width: w,
                    height: 44,
                    background: `${goldDim}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '0.625rem', color: goldDim, fontFamily: 'monospace' }}>r=0.25</span>
                </ScoopClip>
              </div>
            ))}

            <p style={{ ...nano, marginTop: 18, marginBottom: 6, color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Circle — r=11px (absolutní) zůstává stejný kruh při různé šířce
            </p>
            {[80, 140, 200, 300, 400].map(w => (
              <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '0.5rem', color: textFaint, fontFamily: 'monospace', width: 36, textAlign: 'right', flexShrink: 0 }}>{w}px</span>
                <ScoopClip
                  shape="circle" r={11}
                  borderColor={`${goldDim}33`}
                  style={{
                    width: w,
                    height: 44,
                    background: `${goldDim}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '0.625rem', color: goldDim, fontFamily: 'monospace' }}>r=11px</span>
                </ScoopClip>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* ── Barvy a kontexty ── */}
      <Section
        id="barvy"
        title="Barvy a herní kontexty"
        description="ScoopClip nepřidává žádnou barvu — background a border se předávají přes style prop. Tvar sedí ke všem barvám z palety."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { color: goldDim,      label: 'goldDim — výchozí' },
              { color: gold,         label: 'gold — akcent' },
              { color: successColor, label: 'success' },
              { color: dangerColor,  label: 'danger' },
              { color: infoColor,    label: 'info — mana' },
              { color: warningColor, label: 'warning' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ScoopClip
                  r={0.25}
                  borderColor={`${color}55`}
                  style={{
                    width: 120,
                    height: 44,
                    background: `${color}12`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.625rem', color, fontFamily: 'monospace', fontWeight: 600 }}>{label.split(' — ')[0]}</span>
                </ScoopClip>
                <p style={{ ...nano, fontSize: '0.4375rem' }}>{label}</p>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* ── Praktické příklady ── */}
      <Section
        id="priklady"
        title="Praktické příklady"
        description="ScoopClip jako tlačítko, badge, panel a výsledková karta."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>

            {/* Tlačítko */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <ScoopClip
                r={0.28}
                borderColor={`${goldDim}66`}
                style={{
                  height: 40,
                  padding: '0 20px',
                  background: `${gold}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '0.8125rem', color: gold, fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Odeslat tah</span>
              </ScoopClip>
              <span style={nano}>tlačítko</span>
            </div>

            {/* Badge / label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <ScoopClip
                r={0.35}
                borderColor={`${successColor}44`}
                style={{
                  height: 24,
                  padding: '0 12px',
                  background: `${successColor}18`,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: successColor, flexShrink: 0 }} />
                <span style={{ fontSize: '0.625rem', color: successColor, fontWeight: 700, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>VÍTĚZ</span>
              </ScoopClip>
              <span style={nano}>badge</span>
            </div>

            {/* Panel / karta */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <ScoopClip
                r={0.08}
                borderColor={borderDefault}
                style={{
                  width: 180,
                  background: bg3,
                  padding: '16px 18px',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}
              >
                <span style={{ fontSize: '0.6875rem', color: goldDim, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Výsledky kola</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: textMid }}>Hráč 1</span>
                  <span style={{ fontSize: '0.75rem', color: gold, fontWeight: 700 }}>+3 VP</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: textMid }}>Hráč 2</span>
                  <span style={{ fontSize: '0.75rem', color: textFaint }}>0 VP</span>
                </div>
              </ScoopClip>
              <span style={nano}>panel (r=0.08)</span>
            </div>

            {/* Progress bar s scoop tvarem */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 180 }}>
                {[
                  { label: 'HP',    pct: 72, color: successColor },
                  { label: 'Mana',  pct: 45, color: infoColor },
                  { label: 'Stam',  pct: 20, color: warningColor },
                ].map(({ label, pct, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.5625rem', color: textFaint, fontFamily: 'monospace', width: 28 }}>{label}</span>
                    <div style={{ flex: 1, height: 16, position: 'relative', background: bg2, border: `1px solid ${borderDefault}`, borderRadius: 2, overflow: 'hidden' }}>
                      <ScoopClip
                        r={0.30}
                        style={{
                          position: 'absolute', top: 0, left: 0,
                          width: `${pct}%`, height: '100%',
                          background: `linear-gradient(90deg, ${color}55, ${color})`,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.5rem', color, fontFamily: 'monospace', width: 24, textAlign: 'right' }}>{pct}%</span>
                  </div>
                ))}
              </div>
              <span style={nano}>resource bary</span>
            </div>

          </div>
        </Preview>
      </Section>

      {/* ── Interaktivní demo ── */}
      <Section
        id="interaktivni"
        title="Interaktivní demo"
        description="Nastav r, výšku a barvu — náhled a snippet se aktualizují živě."
      >
        <InteractiveDemo />
      </Section>

      {/* ── Jak to funguje ── */}
      <Section
        id="jak-to-funguje"
        title="Jak to funguje"
        description="ScoopClip renderuje inline SVG s clipPath v DOM těsně před clipped div. Bez external dep, funguje v každém moderním prohlížeči."
      >
        <div className="flex flex-col gap-4">
          <CodeBlock code={`import ScoopClip from 'donjon-fall-ui/ScoopClip'

// ── Základní použití ──
<ScoopClip
  r={0.25}
  borderColor="#FFC18344"   // border sleduje scoop tvar — nepoužívej CSS border
  style={{
    height: 52,
    padding: '0 18px',
    background: '#FFC18318',
    display: 'flex',
    alignItems: 'center',
  }}
>
  Obsah
</ScoopClip>

// ── Jak to funguje interně ──
// 1. useId() generuje unikátní ID pro clipPath
// 2. Renderuje inline <svg aria-hidden> s <defs><clipPath clipPathUnits="objectBoundingBox">
// 3. Path je v 0–1 souřadnicích: M r,0 H 1-r Q 1-r,r 1,r V ... Z
// 4. <div style={{ clipPath: 'url(#scoop-id)' }}> je obalený element
//
// ⚠ clipPathUnits="objectBoundingBox" — souřadnice jsou relativní k elementu,
//    takže tvar se přizpůsobí šířce, ale zachovává poměr r k výšce.
// ⚠ Při velmi úzkých (w < h) nebo velmi širokých (w >> h) prvcích se
//    prohnutí mírně deformuje — nejlépe funguje pro standardní poměry stran.`} />

          <div className="flex flex-col gap-2 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-1">Pravidla</p>
            {[
              ['✓', 'Pevná výška + variabilní šířka — ScoopClip. Pro pevné px oba rozměry použij scoopPath(w, h, r) z utils/octagon.'],
              ['✓', 'Doporučené r: 0.20–0.28 pro UI, 0.08–0.15 pro panely a karty, 0.30–0.40 pro dekorativní akcenty.'],
              ['✓', 'Pro border používej prop borderColor — CSS border je ořezán pravoúhle a nesleduje scoop rohy.'],
              ['✓', 'useId() garantuje unikátní SVG ID i při více instancích na stejné stránce.'],
              ['✗', 'Nepoužívej ScoopClip pro prvky s extrémním poměrem stran — prohnutí se deformuje (w < 0.5×h nebo w > 8×h).'],
              ['✗', 'Nikdy nekombinuj clip-path s border-radius — clip-path vždy vyhraje a radius je oříznut.'],
            ].map(([mark, text], i) => (
              <div key={i} className="flex gap-2 text-[12px] text-neutral-400 leading-relaxed">
                <span className={`shrink-0 mt-0.5 font-bold ${mark === '✓' ? 'text-emerald-600' : 'text-red-700'}`}>{mark}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Props ── */}
      <Section id="props">
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Props</h2>
        <PropsTable />
      </Section>

    </ShowcasePage>
  )
}
