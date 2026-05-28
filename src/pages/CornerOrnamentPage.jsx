import { useState } from 'react'
import CornerOrnament from '../lib/donjon/CornerOrnament'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { gold, goldDim, goldMid, bg0, bg2, bg4, borderDefault, textCool, successColor, dangerColor } from '../lib/donjon/tokens'

/* ── Ukázkový panel se čtyřmi rohy ── */
function CornerPanel({ cornerType = 'cut', size = 14, color, bg = bg2, border = borderDefault, children, label }) {
  const c = color ?? goldDim
  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{
        position: 'relative',
        width: 100, height: 64,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <CornerOrnament variant="bracket" cornerType={cornerType} size={size} color={c}
          style={{ position: 'absolute', top: 5, left: 5 }} />
        <CornerOrnament variant="bracket" cornerType={cornerType} size={size} color={c}
          style={{ position: 'absolute', top: 5, right: 5, transform: 'scaleX(-1)' }} />
        <CornerOrnament variant="bracket" cornerType={cornerType} size={size} color={c}
          style={{ position: 'absolute', bottom: 5, left: 5, transform: 'scaleY(-1)' }} />
        <CornerOrnament variant="bracket" cornerType={cornerType} size={size} color={c}
          style={{ position: 'absolute', bottom: 5, right: 5, transform: 'scale(-1)' }} />
        {children}
      </div>
      {label && <span className="text-[9px] text-neutral-600 font-mono text-center">{label}</span>}
    </div>
  )
}

/* ── Interaktivní demo ── */
const VARIANT_OPTIONS    = ['bracket', 'dot', 'diamond', 'cross']
const CORNER_TYPE_OPTIONS = ['cut', 'round', 'scoop']
const SIZE_OPTIONS       = [8, 12, 16, 20, 28, 40]
const COLOR_OPTIONS      = [
  { label: 'goldDim',     value: goldDim,      token: 'goldDim' },
  { label: 'gold',        value: gold,         token: 'gold' },
  { label: 'goldMid',     value: goldMid,      token: 'goldMid' },
  { label: 'textCool',    value: textCool,     token: 'textCool' },
  { label: 'success',     value: successColor, token: 'successColor' },
  { label: 'danger',      value: dangerColor,  token: 'dangerColor' },
]

function PickerBtn({ active, onClick, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '3px 10px',
        borderRadius: 3,
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
        border: `1px solid ${active ? gold : '#2a2838'}`,
        background: active ? `${gold}18` : 'transparent',
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
        // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
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

function InteractiveDemo() {
  const [variant,    setVariant]    = useState('bracket')
  const [cornerType, setCornerType] = useState('cut')
  const [size,       setSize]       = useState(16)
  const [colorIdx,   setColorIdx]   = useState(0)

  const col     = COLOR_OPTIONS[colorIdx]
  const isBracket = variant === 'bracket'

  const OFFSETS = [
    { style: { position: 'absolute', top: 8, left: 8 } },
    { style: { position: 'absolute', top: 8, right: 8, transform: 'scaleX(-1)' } },
    { style: { position: 'absolute', bottom: 8, left: 8, transform: 'scaleY(-1)' } },
    { style: { position: 'absolute', bottom: 8, right: 8, transform: 'scale(-1)' } },
  ]

  const ctArg    = isBracket ? cornerType : 'cut'
  const ctSnippet = isBracket ? ` cornerType="${cornerType}"` : ''
  const snippet = `<div style={{ position: 'relative' }}>
  {/* TL */}
  <CornerOrnament variant="${variant}"${ctSnippet} size={${size}} color={${col.token}}
    style={{ position: 'absolute', top: 8, left: 8 }} />
  {/* TR */}
  <CornerOrnament variant="${variant}"${ctSnippet} size={${size}} color={${col.token}}
    style={{ position: 'absolute', top: 8, right: 8, transform: 'scaleX(-1)' }} />
  {/* BL */}
  <CornerOrnament variant="${variant}"${ctSnippet} size={${size}} color={${col.token}}
    style={{ position: 'absolute', bottom: 8, left: 8, transform: 'scaleY(-1)' }} />
  {/* BR */}
  <CornerOrnament variant="${variant}"${ctSnippet} size={${size}} color={${col.token}}
    style={{ position: 'absolute', bottom: 8, right: 8, transform: 'scale(-1)' }} />
</div>`

  const labelStyle = {
    fontSize: '0.5625rem', fontWeight: 600,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
    color: '#4a4860', marginBottom: 6,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Pickers */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>

        {/* Variant */}
        <div>
          <p style={labelStyle}>variant</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {VARIANT_OPTIONS.map(v => (
              <PickerBtn key={v} active={variant === v} onClick={() => setVariant(v)}>{v}</PickerBtn>
            ))}
          </div>
        </div>

        {/* cornerType — disabled for non-bracket */}
        <div>
          {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
          {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
          <p style={{ ...labelStyle, color: isBracket ? '#4a4860' : '#2a2838' }}>
            {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
            cornerType {!isBracket && <span style={{ fontSize: '0.5rem', textTransform: 'none', letterSpacing: 0, color: '#3a3848' }}>(jen bracket)</span>}
          </p>
          <div style={{ display: 'flex', gap: 4 }}>
            {CORNER_TYPE_OPTIONS.map(ct => (
              <PickerBtn
                key={ct}
                active={isBracket && cornerType === ct}
                disabled={!isBracket}
                onClick={() => isBracket && setCornerType(ct)}
              >
                {ct}
              </PickerBtn>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <p style={labelStyle}>size</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {SIZE_OPTIONS.map(s => (
              <PickerBtn key={s} active={size === s} onClick={() => setSize(s)}>{s}</PickerBtn>
            ))}
          </div>
        </div>

        {/* Color */}
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
                  // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
                  border: `2px solid ${colorIdx === i ? '#ffffff44' : 'transparent'}`,
                  background: c.value,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'border-color 0.12s',
                }}
              />
            ))}
          </div>
          {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
          <p style={{ fontSize: '0.5rem', color: '#4a4860', marginTop: 4, fontFamily: 'monospace' }}>{col.label}</p>
        </div>
      </div>

      {/* Live preview */}
      <div style={{
        position: 'relative',
        width: '100%', height: 140,
        background: bg2,
        border: `1px solid ${borderDefault}`,
        borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {OFFSETS.map((o, i) => (
          <CornerOrnament
            key={i}
            variant={variant}
            cornerType={ctArg}
            size={size}
            color={col.value}
            style={o.style}
          />
        ))}
        {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
        <span style={{ fontSize: '0.625rem', color: '#3a3848', fontFamily: 'monospace', pointerEvents: 'none' }}>
          {variant}{isBracket ? ` / ${cornerType}` : ''} · {size}px
        </span>
      </div>

      {/* Code snippet */}
      <CodeBlock code={snippet} />
    </div>
  )
}

/* ── Props tabulka ── */
function PropsTable() {
  const rows = [
    { name: 'size',       type: 'number',                               req: false, def: '16',           desc: 'Rozměr ornamenty v px — šířka i výška.' },
    { name: 'color',      type: 'string',                               req: false, def: "'currentColor'", desc: 'CSS barva výplně. Výchozí dědí barvu textu z rodiče.' },
    { name: 'variant',    type: "'bracket'|'dot'|'diamond'|'cross'",    req: false, def: "'bracket'",     desc: 'Tvar ornamenty.' },
    { name: 'cornerType', type: "'cut'|'round'|'scoop'",               req: false, def: "'cut'",         desc: "Geometrie lokte — platí jen pro variant='bracket'." },
    { name: 'style',      type: 'CSSProperties',                        req: false, def: '{}',            desc: 'Inline styly — typicky position, top/right/bottom/left, transform.' },
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
              <td className="px-3 py-2.5 max-w-[180px]"><code className="font-mono text-neutral-400 text-[10px] break-all">{type}</code></td>
              <td className="px-3 py-2.5 hidden sm:table-cell">
                {def ? <code className="font-mono text-neutral-500 text-[10px]">{def}</code> : <span className="text-neutral-700">—</span>}
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

/* ── Main ── */
export default function CornerOrnamentPage() {
  return (
    <ShowcasePage
      title="CornerOrnament"
      description="Dekorativní rohová ozdoba tvořená SVG — bracket, dot, diamond nebo cross. Umisťuje se absolutně do rohu panelu nebo rámečku. Pro ostatní tři rohy se používá CSS transform: scaleX(-1), scaleY(-1) nebo scale(-1)."
      componentSlug="corner-ornament"
      library="donjon"
    >

      {/* ── Varianty ── */}
      <Section
        id="varianty"
        description="Čtyři tvarové varianty v rozsahu velikostí 10–40 px. Každá varianta sedí do levého horního rohu — ostatní rohy se získají transformací."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Varianty</h2>
        <Preview>
          <div className="flex flex-wrap gap-10">
            {[
              { variant: 'bracket', label: 'bracket — výchozí, L-tvar' },
              { variant: 'dot',     label: 'dot — tečka + linky' },
              { variant: 'diamond', label: 'diamond — kosočtverec' },
              { variant: 'cross',   label: 'cross — kříž + dot' },
            ].map(({ variant, label }) => (
              <div key={variant} className="flex flex-col items-center gap-4">
                <div className="flex gap-5 items-end">
                  {[10, 14, 18, 24, 32, 40].map(size => (
                    <div key={size} className="flex flex-col items-center gap-1.5">
                      <CornerOrnament variant={variant} size={size} color={goldDim} />
                      <span className="text-[9px] text-neutral-700 font-mono">{size}</span>
                    </div>
                  ))}
                </div>
                <code className="text-[11px] text-brand-400 font-mono">{variant}</code>
                <span className="text-[10px] text-neutral-600 text-center">{label}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* ── cornerType (jen bracket) ── */}
      <Section
        id="corner-type"
        description="cornerType přizpůsobí geometrii lokte tvaru rohu komponenty, do které ornament sedí. Platí pouze pro variant='bracket'. cut = ostrý L (výchozí Donjon), round = konvexní oblouk (zaoblený roh), scoop = konkávní oblouk (vydlabaný roh)."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">cornerType — geometrie lokte</h2>
        <Preview>
          <div className="flex flex-col gap-8 w-full">
            {[
              { ct: 'cut',   desc: 'Ostrý L-bracket — dva obdélníky. Výchozí geometrie Donjon komponent.' },
              { ct: 'round', desc: 'Konvexní oblouk — path s A (arc). Odpovídá zaoblenému border-radius.' },
              { ct: 'scoop', desc: 'Konkávní oblouk — path s A (opačný sweep). Odpovídá vydlabanému rohu.' },
            ].map(({ ct, desc }) => (
              <div key={ct} className="flex gap-6 items-start">
                {/* Label */}
                <div className="w-20 shrink-0 text-right pt-0.5">
                  <code className="text-[11px] text-brand-400 font-mono">{ct}</code>
                </div>

                {/* Čtyři rohy zvlášť */}
                <div className="flex gap-4 flex-wrap items-start">
                  {[
                    { label: 'TL', transform: undefined },
                    { label: 'TR', transform: 'scaleX(-1)' },
                    { label: 'BL', transform: 'scaleY(-1)' },
                    { label: 'BR', transform: 'scale(-1)' },
                  ].map(({ label, transform }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5">
                      <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-sm relative"
                        style={{ width: 48, height: 48 }}>
                        <CornerOrnament
                          variant="bracket" cornerType={ct} size={18} color={goldDim}
                          style={{
                            position: 'absolute',
                            ...(label === 'TL' ? { top: 5, left: 5 } : {}),
                            ...(label === 'TR' ? { top: 5, right: 5 } : {}),
                            ...(label === 'BL' ? { bottom: 5, left: 5 } : {}),
                            ...(label === 'BR' ? { bottom: 5, right: 5 } : {}),
                            ...(transform ? { transform } : {}),
                          }}
                        />
                      </div>
                      <span className="text-[9px] text-neutral-700 font-mono">{label}</span>
                    </div>
                  ))}

                  {/* Všechny 4 najednou */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-sm relative"
                      style={{ width: 88, height: 48 }}>
                      <CornerOrnament variant="bracket" cornerType={ct} size={14} color={goldDim}
                        style={{ position: 'absolute', top: 4, left: 4 }} />
                      <CornerOrnament variant="bracket" cornerType={ct} size={14} color={goldDim}
                        style={{ position: 'absolute', top: 4, right: 4, transform: 'scaleX(-1)' }} />
                      <CornerOrnament variant="bracket" cornerType={ct} size={14} color={goldDim}
                        style={{ position: 'absolute', bottom: 4, left: 4, transform: 'scaleY(-1)' }} />
                      <CornerOrnament variant="bracket" cornerType={ct} size={14} color={goldDim}
                        style={{ position: 'absolute', bottom: 4, right: 4, transform: 'scale(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">všechny 4</span>
                  </div>
                </div>

                {/* Popis */}
                <span className="text-[11px] text-neutral-500 leading-relaxed max-w-[200px] pt-0.5 hidden md:block">{desc}</span>
              </div>
            ))}
          </div>
        </Preview>

        <div className="mt-4">
          <CodeBlock code={`{/* Donjon panely — ostrý L */}
<CornerOrnament cornerType="cut"   ... />

{/* Karty s border-radius */}
<CornerOrnament cornerType="round" ... />

{/* Speciální vydlabaný tvar */}
      <CornerOrnament cornerType="scoop" ... />`} />
        </div>
      </Section>

      {/* ── Barvy ── */}
      <Section
        id="barvy"
        description="Výchozí color='currentColor' dědí barvu textu rodiče — ornament se přizpůsobí barvě kontejneru bez dodatečného prop. Explicitní barva se hodí pro akcent nebo pro sémantické stavy."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Barvy a dědičnost</h2>
        <Preview>
          <div className="flex flex-wrap gap-6 items-start">
            {/* currentColor příklady */}
            {[
              { label: 'currentColor (goldDim)', color: goldDim, textColor: goldDim },
              { label: 'currentColor (gold)',    color: 'currentColor', textColor: gold },
              { label: 'currentColor (textCool)', color: 'currentColor', textColor: textCool },
            ].map(({ label, color, textColor }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div style={{
                  position: 'relative', width: 80, height: 52,
                  background: bg2, border: `1px solid ${borderDefault}`,
                  borderRadius: 2, color: textColor,
                }}>
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', top: 4, left: 4 }} />
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', top: 4, right: 4, transform: 'scaleX(-1)' }} />
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', bottom: 4, left: 4, transform: 'scaleY(-1)' }} />
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', bottom: 4, right: 4, transform: 'scale(-1)' }} />
                </div>
                <span className="text-[9px] text-neutral-600 text-center max-w-[90px] leading-snug">{label}</span>
              </div>
            ))}

            {/* Explicitní barvy pro sémantické stavy */}
            {[
              { label: 'success', color: successColor },
              { label: 'danger',  color: dangerColor },
              { label: 'gold',    color: gold },
              { label: 'goldMid', color: goldMid },
            ].map(({ label, color }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div style={{
                  position: 'relative', width: 80, height: 52,
                  background: bg2, border: `1px solid ${color}44`,
                  borderRadius: 2,
                }}>
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', top: 4, left: 4 }} />
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', top: 4, right: 4, transform: 'scaleX(-1)' }} />
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', bottom: 4, left: 4, transform: 'scaleY(-1)' }} />
                  <CornerOrnament size={13} color={color}
                    style={{ position: 'absolute', bottom: 4, right: 4, transform: 'scale(-1)' }} />
                </div>
                <span className="text-[9px] text-neutral-600 font-mono">{label}</span>
              </div>
            ))}
          </div>
        </Preview>

        <div className="mt-4">
          <CodeBlock code={`{/* Dědí barvu textu rodiče — nejčistší přístup */}
<div style={{ color: goldDim }}>
  <CornerOrnament />        {/* color="currentColor" — default */}
</div>

{/* Explicitní barva */}
<CornerOrnament color={gold} />
<CornerOrnament color={successColor} />
<CornerOrnament color={dangerColor} />`} />
        </div>
      </Section>

      {/* ── Panel vzor — čtyři rohy ── */}
      <Section
        id="panel-vzor"
        description="Standardní vzor použití — bracket ornamenty ve všech čtyřech rozích panelu nebo karty. Každý roh se získá transformací levého horního originálu."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Panel vzor — čtyři rohy</h2>
        <Preview>
          <div className="flex flex-wrap gap-8 items-start">
            <CornerPanel cornerType="cut"   label="cut · 14px · goldDim" />
            <CornerPanel cornerType="cut"   size={10} color={gold} label="cut · 10px · gold" />
            <CornerPanel cornerType="round" label="round · 14px · goldDim" />
            <CornerPanel cornerType="scoop" label="scoop · 14px · goldDim" />
            <CornerPanel cornerType="cut"   size={18} color={goldMid} bg={bg0} border={goldDim} label="cut · 18px · goldMid · dark" />
          </div>
        </Preview>

        {/* Různé varianty v panelech */}
        <h3 className="text-sm font-semibold text-neutral-300 mt-6 mb-3">Ostatní varianty v rohách</h3>
        <Preview>
          <div className="flex flex-wrap gap-8 items-start">
            {['dot', 'diamond', 'cross'].map(variant => (
              <div key={variant} className="flex flex-col items-center gap-2">
                <div style={{
                  position: 'relative', width: 100, height: 64,
                  background: bg2, border: `1px solid ${borderDefault}`,
                  borderRadius: 2,
                }}>
                  {[
                    { top: 5, left: 5 },
                    { top: 5, right: 5, transform: 'scaleX(-1)' },
                    { bottom: 5, left: 5, transform: 'scaleY(-1)' },
                    { bottom: 5, right: 5, transform: 'scale(-1)' },
                  ].map((s, i) => (
                    <CornerOrnament key={i} variant={variant} size={14} color={goldDim}
                      style={{ position: 'absolute', ...s }} />
                  ))}
                </div>
                <code className="text-[10px] text-brand-400 font-mono">{variant}</code>
              </div>
            ))}
          </div>
        </Preview>

        <div className="mt-4">
          <CodeBlock code={`{/* Parent musí mít position: relative */}
<div style={{ position: 'relative', width: 200, height: 120 }}>

  {/* TL — originál */}
  <CornerOrnament style={{ position: 'absolute', top: 6, left: 6 }} />

  {/* TR — zrcadlení po X */}
  <CornerOrnament style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />

  {/* BL — zrcadlení po Y */}
  <CornerOrnament style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />

  {/* BR — zrcadlení po X i Y */}
  <CornerOrnament style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />

  {/* obsah panelu */}
</div>`} />
        </div>
      </Section>

      {/* ── Velikosti ── */}
      <Section
        id="velikosti"
        description="Ornament se proporcionálně škáluje — tloušťka čar a délka ramen jsou odvozeny z size jako procenta. Doporučený rozsah: 10–24 px pro UI, 24–48 px pro dekorativní panely."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Rozsah velikostí</h2>
        <Preview>
          <div className="flex flex-col gap-6">
            {['bracket', 'dot', 'diamond', 'cross'].map(variant => (
              <div key={variant} className="flex items-center gap-4">
                <code className="w-16 shrink-0 text-right text-[11px] text-brand-400 font-mono">{variant}</code>
                <div className="flex gap-5 items-end flex-wrap">
                  {[8, 10, 12, 16, 20, 24, 32, 48].map(size => (
                    <div key={size} className="flex flex-col items-center gap-1">
                      <CornerOrnament variant={variant} size={size} color={goldDim} />
                      <span className="text-[8px] text-neutral-700 font-mono">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* ── Interaktivní demo ── */}
      <Section
        id="interaktivni"
        title="Interaktivní demo"
        description="Zvolte kombinaci variant / cornerType / size / color — náhled a kódový snippet se aktualizují živě."
      >
        <InteractiveDemo />
      </Section>

      {/* ── Props ── */}
      <Section id="props">
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Props</h2>
        <PropsTable />
      </Section>

      {/* ── Použití ── */}
      <Section id="pouziti" description="Implementační pravidla — co kontrolovat před použitím.">
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Použití</h2>

        <div className="mb-4">
          <CodeBlock code={`import CornerOrnament from 'donjon-fall-ui/CornerOrnament'

function Panel({ children }) {
  return (
    // parent musi mit position: relative
    <div style={{ position: 'relative', background: bg2, border: \`1px solid \${goldDim}\` }}>
      {/* ctyri rohy pomoci transform */}
      <CornerOrnament size={14} color={goldDim}
        style={{ position: 'absolute', top: 6, left: 6 }} />
      <CornerOrnament size={14} color={goldDim}
        style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />
      <CornerOrnament size={14} color={goldDim}
        style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
      <CornerOrnament size={14} color={goldDim}
        style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />

      {children}
    </div>
  )
}`} />
        </div>

        <div id="pravidla" className="flex flex-col gap-2 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-1">Pravidla</p>
          {[
            'Parent musí mít position: relative — CornerOrnament se renderuje jako absolutně pozicovaný SVG.',
            'Pro ostatní rohy použij transform: scaleX(-1) pro TR, scaleY(-1) pro BL, scale(-1) pro BR.',
            'color="currentColor" dědí barvu textu rodiče — nevyžaduje extra prop pokud rodič nastaví color.',
            "cornerType platí pouze pro variant='bracket' — u ostatních variant nemá efekt.",
            'aria-hidden="true" je nastaveno automaticky — ornament je čistě vizuální dekorace.',
            'Doporučený offset od kraje: size / 2 ± 2 px (u 14px → top: 5–8, pro těsnější sezení na rohu).',
          ].map((rule, i) => (
            <div key={i} className="flex gap-2 text-[12px] text-neutral-400 leading-relaxed">
              <span className="text-brand-600 shrink-0 mt-0.5">·</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </Section>

    </ShowcasePage>
  )
}
