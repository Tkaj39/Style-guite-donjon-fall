import { useState } from 'react'
import { SideOrnament, ZkosenOrnament, RohOrnament, HexOrnament, HrotErbu, ornamentHForCx, ORNAMENT_BASE_WIDTH } from '../lib/donjon/Ornaments'
import CornerOrnament from '../lib/donjon/CornerOrnament'
import { Shield } from '../lib/donjon/Erb'
import { buttonSizes, CARD_ORN_H } from '../utils/sizes'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { octagon, octagonInner, octagonPerCorner, octagonInnerPerCorner } from '../utils/octagon'
import { gold, goldMid, goldDim, infoColor, bg2, bg3, borderDefault, borderMid, textHigh, textMid, textLow } from '../lib/donjon/tokens'

/* ── Doporučené hodnoty cx pro různé komponenty ── */
const CX_REFERENCE = [
  { cx: 10, usage: 'malá tlačítka (sm)', sample: 'DonjonButton size="sm"' },
  { cx: 12, usage: 'střední tlačítka (md)', sample: 'DonjonButton size="md"' },
  { cx: 14, usage: 'mini panely', sample: 'PlayerPanel, EventLog, NotificationCenter' },
  { cx: 16, usage: 'karty a modaly', sample: 'DonjonCard, DonjonModal' },
  { cx: 20, usage: 'velké panely', sample: 'custom hero karta' },
]

/* ── OrnamentRow — vizualizace pro corner ornamenty (zkosen, roh) ──
   Reálný oktagon shell + ornament uvnitř ve všech 4 rozích. */
function OrnamentRow({ cx, type, label }) {
  const h = ornamentHForCx(cx, type)
  const baseW = ORNAMENT_BASE_WIDTH[type]
  const renderedW = Math.round(baseW * h / 66 * 10) / 10
  const uid = `prev-${type}-${cx}`
  const Orn = type === 'roh' ? RohOrnament : ZkosenOrnament

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0' }}>
      <span style={{ width: 60, fontSize: '0.75rem', color: goldDim, fontFamily: 'ui-monospace, monospace' }}>
        cx={cx}
      </span>
      <div style={{ clipPath: octagon(cx), background: goldDim, padding: 1, width: 110, height: 64 }}>
        <div style={{
          position: 'relative',
          clipPath: octagonInner(cx),
          background: bg3,
          width: '100%',
          height: '100%',
        }}>
          {/* všechny 4 rohy: top-left, top-right, bottom-left, bottom-right */}
          <Orn h={h} uid={`${uid}tl`} />
          <Orn h={h} uid={`${uid}tr`} flip />
          <Orn h={h} uid={`${uid}bl`} bottom />
          <Orn h={h} uid={`${uid}br`} flip bottom />
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', color: textMid, fontFamily: 'ui-monospace, monospace', minWidth: 140 }}>
        h={h}  →  {renderedW}px {label || ''}
      </span>
    </div>
  )
}

/* ── SideOrnamentRow — DonjonButton shell ──
   Reálná replika tlačítka: h = button height, cx = button cx, plus HexOrnament. */
function SideOrnamentRow({ sizeKey, h, cx, px }) {
  const baseW = ORNAMENT_BASE_WIDTH.side
  const renderedW = Math.round(baseW * h / 66 * 10) / 10
  const uid = `prev-side-${sizeKey}`
  // Button-style width: scale to keep typical button proportion
  const shellW = Math.round(h * 2.4)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0' }}>
      <span style={{ width: 60, fontSize: '0.75rem', color: goldDim, fontFamily: 'ui-monospace, monospace' }}>
        size={sizeKey}
      </span>
      {/* Real DonjonButton shell s outer border + inner fill + ornamenty */}
      <div style={{ clipPath: octagon(cx), background: goldDim, padding: 1, width: shellW, height: h }}>
        <div style={{
          position: 'relative',
          clipPath: octagonInner(cx),
          background: bg3,
          width: '100%',
          height: '100%',
        }}>
          <SideOrnament h={h} uid={`${uid}l`} />
          <SideOrnament h={h} uid={`${uid}r`} flip />
          <HexOrnament uid={`${uid}t`} edgePadL={cx + 8} textPadL={px + renderedW} textPadR={px + renderedW} />
          <HexOrnament uid={`${uid}b`} flip edgePadL={cx + 8} textPadL={px + renderedW} textPadR={px + renderedW} />
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', color: textMid, fontFamily: 'ui-monospace, monospace', minWidth: 160 }}>
        h={h}, cx={cx}  →  {renderedW}px
      </span>
    </div>
  )
}

const SIZES = Object.entries(buttonSizes).map(([key, s]) => ({ key, h: s.h }))
const CARD_SIZE = { key: 'card', h: CARD_ORN_H }

/* ── MixedCornerDemo — interaktivní demo asymetrického octagonu ── */
const MIXED_PRESETS = [
  { label: 'Symetrický 14',     corners: { tl: 14, tr: 14, br: 14, bl: 14 } },
  { label: 'Symetrický 20',     corners: { tl: 20, tr: 20, br: 20, bl: 20 } },
  { label: 'Top heavy',         corners: { tl: 20, tr: 20, br: 10, bl: 10 } },
  { label: 'Diagonála',         corners: { tl: 20, tr: 10, br: 20, bl: 10 } },
  { label: 'Mixed',             corners: { tl: 20, tr: 10, br: 14, bl: 16 } },
]
const CORNER_LABELS = {
  tl: 'Top-Left', tr: 'Top-Right', br: 'Bottom-Right', bl: 'Bottom-Left',
}

function MixedCornerDemo() {
  const [corners, setCorners] = useState({ tl: 20, tr: 10, br: 14, bl: 16 })
  const [type, setType] = useState('roh')   // 'roh' | 'zkosen'
  const Orn = type === 'roh' ? RohOrnament : ZkosenOrnament

  function setCorner(key, value) {
    setCorners(c => ({ ...c, [key]: Math.max(0, Math.min(40, Number(value) || 0)) }))
  }

  return (
    <Preview>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, width: '100%' }}>
        {/* Controls */}
        <div style={{ flex: '0 1 280px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Type switcher */}
          <div>
            <p style={{ margin: '0 0 6px', fontSize: '0.6875rem', color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Typ ornamentu
            </p>
            <div style={{ display: 'flex', gap: 4, padding: 2, background: `${borderDefault}33`, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
              {['roh', 'zkosen'].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    flex: 1, padding: '5px 10px', borderRadius: 4, border: 'none',
                    background: type === t ? `${gold}1F` : 'transparent',
                    color: type === t ? gold : textLow,
                    fontSize: '0.75rem', fontWeight: type === t ? 600 : 500,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {t === 'roh' ? 'RohOrnament' : 'ZkosenOrnament'}
                </button>
              ))}
            </div>
          </div>

          {/* Per-corner inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {['tl','tr','bl','br'].map(key => (
              <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.6875rem', color: goldDim, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {CORNER_LABELS[key]}
                </span>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={corners[key]}
                  onChange={e => setCorner(key, e.target.value)}
                  style={{
                    padding: '6px 10px',
                    background: bg2,
                    border: `1px solid ${borderDefault}`,
                    borderRadius: 4,
                    color: textHigh,
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.8125rem',
                    width: '100%',
                  }}
                />
              </label>
            ))}
          </div>

          {/* Presets */}
          <div>
            <p style={{ margin: '0 0 6px', fontSize: '0.6875rem', color: goldDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Presety
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {MIXED_PRESETS.map(p => {
                const isActive = JSON.stringify(p.corners) === JSON.stringify(corners)
                return (
                  <button
                    key={p.label}
                    onClick={() => setCorners(p.corners)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 3,
                      border: `1px solid ${isActive ? gold : borderDefault}`,
                      background: isActive ? `${gold}14` : 'transparent',
                      color: isActive ? gold : textMid,
                      fontSize: '0.6875rem', fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div style={{ flex: '1 1 320px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            clipPath: octagonPerCorner(corners),
            background: goldDim,
            padding: 1,
            width: '100%',
            height: 200,
          }}>
            <div style={{
              position: 'relative',
              clipPath: octagonInnerPerCorner(corners),
              background: bg3,
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {corners.tl > 0 && <Orn h={ornamentHForCx(corners.tl, type)} uid="m-tl" />}
              {corners.tr > 0 && <Orn h={ornamentHForCx(corners.tr, type)} uid="m-tr" flip />}
              {corners.bl > 0 && <Orn h={ornamentHForCx(corners.bl, type)} uid="m-bl" bottom />}
              {corners.br > 0 && <Orn h={ornamentHForCx(corners.br, type)} uid="m-br" flip bottom />}
              <span style={{ fontSize: '0.6875rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Live preview
              </span>
            </div>
          </div>

          {/* Hodnoty na ornamenty */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            fontSize: '0.6875rem',
            fontFamily: 'ui-monospace, monospace',
            color: textLow,
          }}>
            {['tl','tr','bl','br'].map(key => (
              <div key={key} style={{
                padding: '6px 10px',
                background: bg2,
                border: `1px solid ${borderMid}`,
                borderRadius: 4,
              }}>
                <span style={{ color: goldMid }}>{key}</span>{' '}
                cx={corners[key]} → h={corners[key] > 0 ? ornamentHForCx(corners[key], type) : '—'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Preview>
  )
}

export default function OrnamentsPage() {
  return (
    <ShowcasePage
      title="Ornaments"
      description="Sdílené dekorativní prvky používané v tlačítkách, skupinách tlačítek a kartách. Každý ornament automaticky škáluje podle rozměrů komponenty a používá gradienty zlaté palety."
      componentSlugs={['ornaments', 'corner-ornament']}
      library="donjon"
    >

      {/* ── Centrální škálování přes ornamentHForCx ── */}
      <Section
        id="sizing"
        title="Velikost ornamentu vs. cx (zkosení rohu)"
        description="Centrální helper ornamentHForCx(cx, type) vrací výšku ornamentu tak, aby jeho vykreslená šířka odpovídala zadanému cx (octagon corner-cut). Žádná magic čísla per-komponenta."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%' }}>
            {/* ZkosenOrnament sloupec */}
            <div style={{ flex: '1 1 300px' }}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: gold, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ZkosenOrnament <span style={{ color: textLow, fontWeight: 400 }}>(base 22)</span>
              </h4>
              {CX_REFERENCE.map(({ cx }) => <OrnamentRow key={cx} cx={cx} type="zkosen" />)}
            </div>

            {/* RohOrnament sloupec */}
            <div style={{ flex: '1 1 300px' }}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: gold, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                RohOrnament <span style={{ color: textLow, fontWeight: 400 }}>(base 25)</span>
              </h4>
              {CX_REFERENCE.map(({ cx }) => <OrnamentRow key={cx} cx={cx} type="roh" />)}
            </div>

            {/* SideOrnament sloupec — reálný DonjonButton shell pro 4 velikosti */}
            <div style={{ flex: '1 1 360px' }}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: gold, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                SideOrnament <span style={{ color: textLow, fontWeight: 400 }}>(base 22, full-height)</span>
              </h4>
              <p style={{ fontSize: '0.6875rem', color: textLow, marginBottom: 8, lineHeight: 1.5 }}>
                Vertikální závorka přes celou výšku — používá se v DonjonButton. Ukázka je reálný
                button shell včetně HexOrnament nahoře a dole, převzato z <code style={{ color: textMid }}>buttonSizes</code>.
              </p>
              {Object.entries(buttonSizes).map(([key, s]) => (
                <SideOrnamentRow key={key} sizeKey={key} h={s.h} cx={s.cx} px={s.px} />
              ))}
            </div>
          </div>
        </Preview>

        {/* Tabulka doporučených cx + usage */}
        <Preview>
          <div style={{ width: '100%' }}>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: gold, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Doporučené cx hodnoty
            </h4>
            <table style={{ width: '100%', fontSize: '0.8125rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderDefault}`, color: goldDim, textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>cx</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>h (zkosen)</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>h (roh)</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>h (side)*</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>Použití</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>Příklad</th>
                </tr>
              </thead>
              <tbody>
                {CX_REFERENCE.map(({ cx, usage, sample }) => (
                  <tr key={cx} style={{ borderBottom: `1px solid ${borderDefault}44`, color: textMid }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'ui-monospace, monospace', color: textHigh }}>{cx}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'ui-monospace, monospace', color: textLow }}>{ornamentHForCx(cx, 'zkosen')}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'ui-monospace, monospace', color: textLow }}>{ornamentHForCx(cx, 'roh')}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'ui-monospace, monospace', color: textLow }}>{Math.max(28, cx * 2)}</td>
                    <td style={{ padding: '8px 12px' }}>{usage}</td>
                    <td style={{ padding: '8px 12px', color: textLow, fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem' }}>{sample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '0.6875rem', color: textLow, marginTop: 10, lineHeight: 1.5 }}>
              * SideOrnament neodvozuje h z cx — jeho výška = výška komponenty (full-height bracket).
              Hodnoty v tabulce jsou orientační (button výšky 28/36/44).
            </p>
          </div>
        </Preview>

        <CodeBlock code={`import { RohOrnament, ZkosenOrnament, SideOrnament, ornamentHForCx } from './Ornaments'

const cx = 14   // corner-cut komponenty
const h = ornamentHForCx(cx, 'roh')

// ✓ Všechny 4 rohy přes kombinaci flip × bottom
<RohOrnament h={h} uid="tl" />                {/* top-left   */}
<RohOrnament h={h} uid="tr" flip />           {/* top-right  */}
<RohOrnament h={h} uid="bl" bottom />         {/* bottom-left  */}
<RohOrnament h={h} uid="br" flip bottom />    {/* bottom-right */}

// ✓ SideOrnament — full-height bracket, h = výška komponenty (NE z cx)
<SideOrnament h={buttonHeight} uid="..." />   // typ. 28 / 36 / 44 (sm/md/lg)

// ✗ Magic čísla per komponenta (předtím)
<RohOrnament h={66} uid="..." />   // šířka 25px, ale cx je jen 14 → vyčuhuje
<RohOrnament h={38} uid="..." />   // ručně dopočítané, nepřenosné

// Pro DonjonCard, DonjonModal s 'roh' i 'zkosen' variantou:
const ornH = ornamentHForCx(cx, ornament === 'roh' ? 'roh' : 'zkosen')`} />
      </Section>

      {/* ── Mixed cx — asymetrický octagon ── */}
      <Section
        id="mixed-cx"
        title="Různé velikosti zkosení v jednom bloku"
        description="Octagon nemusí mít všechny 4 rohy stejné. octagonPerCorner({ tl, tr, br, bl }) umožňuje per-roh kontrolu, ornamenty se přizpůsobí každému rohu zvlášť přes ornamentHForCx."
      >
        <MixedCornerDemo />

        <CodeBlock code={`import { octagonPerCorner } from '../utils/octagon'
import { RohOrnament, ornamentHForCx } from './Ornaments'

const corners = { tl: 20, tr: 10, br: 14, bl: 16 }

// Outer border + inner fill octagon s individuálními zkoseními
<div style={{ clipPath: octagonPerCorner(corners), background: borderColor, padding: 1 }}>
  <div style={{ clipPath: octagonPerCorner({
    tl: corners.tl - 1, tr: corners.tr - 1,
    br: corners.br - 1, bl: corners.bl - 1,
  }), background: bg }}>
    {/* Každý roh dostane ornament škálovaný dle SVÉHO cx */}
    <RohOrnament h={ornamentHForCx(corners.tl, 'roh')} uid="tl" />
    <RohOrnament h={ornamentHForCx(corners.tr, 'roh')} uid="tr" flip />
    <RohOrnament h={ornamentHForCx(corners.bl, 'roh')} uid="bl" bottom />
    <RohOrnament h={ornamentHForCx(corners.br, 'roh')} uid="br" flip bottom />
  </div>
</div>`} />
      </Section>

      {/* ── SideOrnament ── */}
      <Section
        id="side-ornament"
        description="Vertikální dekorace umístěná na levém nebo pravém okraji. Obsahuje dvojitý bracket, dva tikatury a centrální diamant. Šírka se proporcionálně přizpůsobuje výšce."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">SideOrnament</h2>

        <Preview>
          <div className="flex items-end gap-8 flex-wrap">
            {[...SIZES, CARD_SIZE].map(({ key, h }) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div style={{ position: 'relative', width: Math.round(24 * (h / 66) * 10) / 10, height: h }}>
                  <SideOrnament h={h} uid={`demo-side-${key}`} />
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{key} · {h}px</span>
              </div>
            ))}
            {[...SIZES, CARD_SIZE].map(({ key, h }) => (
              <div key={`${key}-flip`} className="flex flex-col items-center gap-2">
                <div style={{ position: 'relative', width: Math.round(24 * (h / 66) * 10) / 10, height: h }}>
                  <SideOrnament h={h} uid={`demo-side-flip-${key}`} flip />
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{key} flip</span>
              </div>
            ))}
          </div>
        </Preview>

        {/* Props table */}
        <div className="overflow-x-auto rounded-lg border border-neutral-800 mt-4">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900">
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Prop</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Typ</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Popis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {[
                ['h',    'number',  'Výška v px — šírka se přepočítá automaticky'],
                ['uid',  'string',  'Jedinečný prefix pro SVG gradient ID (použij useId)'],
                ['flip', 'boolean', 'Zrcadlí ornament pro pravou stranu (scaleX(-1))'],
              ].map(([p, t, d]) => (
                <tr key={p} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="px-3 py-2.5"><code className="font-mono text-brand-300 text-[11px]">{p}</code></td>
                  <td className="px-3 py-2.5"><code className="font-mono text-neutral-400 text-[10px]">{t}</code></td>
                  <td className="px-3 py-2.5 text-neutral-400 text-[11px]">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <CodeBlock code={`<SideOrnament h={52} uid="unique-id" />
      <SideOrnament h={52} uid="unique-id" flip />`} />
        </div>
      </Section>

      {/* ── HexOrnament ── */}
      <Section
        id="hex-ornament"
        description="Horizontální lišta s vnější čárou, vnitřní čárou a centrálním hexagonem. Umísťuje se na horní nebo dolní okraj (flip). Čáry používají gradient zlaté palety, hexagon má tmavou výplň."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">HexOrnament</h2>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-2">Symetrické použití (karta, tlačítko)</p>
        <Preview>
          <div className="flex flex-col gap-12 w-full max-w-lg">
            <div style={{ position: 'relative', width: '100%', height: 7 }}>
              <HexOrnament uid="demo-hex-top" edgePadL={16} />
            </div>
            <div style={{ position: 'relative', width: '100%', height: 7 }}>
              <HexOrnament uid="demo-hex-bot" flip edgePadL={16} />
            </div>
          </div>
        </Preview>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mt-6 mb-2">Asymetrické použití (ButtonGroup — první/poslední item)</p>
        <Preview>
          <div className="flex flex-col gap-8 w-full max-w-lg">
            <div style={{ position: 'relative', width: '100%', height: 7 }}>
              <HexOrnament uid="demo-hex-asym-t" edgePadL={17.61} edgePadR={0} textPadL={27} textPadR={10} hexOffsetX={8.5} />
            </div>
            <div style={{ position: 'relative', width: '100%', height: 7 }}>
              <HexOrnament uid="demo-hex-asym-b" flip edgePadL={17.61} edgePadR={0} textPadL={27} textPadR={10} hexOffsetX={8.5} />
            </div>
          </div>
        </Preview>

        {/* Props table */}
        <div className="overflow-x-auto rounded-lg border border-neutral-800 mt-4">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900">
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Prop</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Default</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Popis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {[
                ['uid',        '—',           'Jedinečný prefix pro SVG gradient ID'],
                ['flip',       'false',        'Otočí ornament pro spodní okraj (scaleY(-1))'],
                ['edgePadL',   '16',           'Odsazení vnější čáry zleva (px)'],
                ['edgePadR',   'edgePadL',     'Odsazení vnější čáry zprava — default = edgePadL'],
                ['textPadL',   'null → 23 %',  'Odsazení vnitřní čáry zleva (px nebo %)'],
                ['textPadR',   'null → 23 %',  'Odsazení vnitřní čáry zprava'],
                ['hexOffsetX', '0',            'Horizontální posun hexagonu od středu (px) — pro asymetrické layouty'],
              ].map(([p, d, desc]) => (
                <tr key={p} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="px-3 py-2.5"><code className="font-mono text-brand-300 text-[11px]">{p}</code></td>
                  <td className="px-3 py-2.5"><code className="font-mono text-neutral-500 text-[10px]">{d}</code></td>
                  <td className="px-3 py-2.5 text-neutral-400 text-[11px]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <CodeBlock code={`<HexOrnament uid="..." edgePadL={16} />
      <HexOrnament uid="..." edgePadL={16} flip />

      {/* ButtonGroup první item (clipLeft) */}
      <HexOrnament uid="..." edgePadL={17.61} edgePadR={0} textPadL={27} textPadR={10} hexOffsetX={8.5} />`} />
        </div>
      </Section>

      {/* ── ZkosenOrnament ── */}
      <Section
        id="zkosen-ornament"
        description="Rohový ornament — dvě diagonální závorky + diamant uprostřed. Nahrazuje SideOrnament v komponentách přes ornament='zkosen'. Škáluje stejně: referenční výška 66 px."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">ZkosenOrnament</h2>

        <Preview>
          <div className="flex items-end gap-8 flex-wrap">
            {[...SIZES, CARD_SIZE].map(({ key, h }) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div style={{ position: 'relative', width: Math.round(22 * (h / 66) * 10) / 10, height: Math.round(22 * (h / 66) * 10) / 10 }}>
                  <ZkosenOrnament h={h} uid={`demo-zkosen-${key}`} />
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{key} · {h}px</span>
              </div>
            ))}
            {[...SIZES, CARD_SIZE].map(({ key, h }) => (
              <div key={`${key}-flip`} className="flex flex-col items-center gap-2">
                <div style={{ position: 'relative', width: Math.round(22 * (h / 66) * 10) / 10, height: Math.round(22 * (h / 66) * 10) / 10 }}>
                  <ZkosenOrnament h={h} uid={`demo-zkosen-flip-${key}`} flip />
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{key} flip</span>
              </div>
            ))}
          </div>
        </Preview>

        <div className="mt-4">
          <CodeBlock code={`<ZkosenOrnament h={52} uid="unique-id" />
      <ZkosenOrnament h={52} uid="unique-id" flip />

      {/* V komponentě: */}
      <DonjonButton ornament="zkosen">Tlačítko</DonjonButton>`} />
        </div>
      </Section>

      {/* ── RohOrnament ── */}
      <Section
        id="roh-ornament"
        description="Rohový ornament + vertikální sestup — diagonální závorka v rohu + spodní část jako SideOrnament (výška ~46/66). Škáluje stejně: referenční výška 66 px."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">RohOrnament</h2>

        <Preview>
          <div className="flex items-end gap-8 flex-wrap">
            {[...SIZES, CARD_SIZE].map(({ key, h }) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div style={{ position: 'relative', width: Math.round(25 * (h / 66) * 10) / 10, height: Math.round(46 * (h / 66) * 10) / 10 }}>
                  <RohOrnament h={h} uid={`demo-roh-${key}`} />
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{key} · {h}px</span>
              </div>
            ))}
            {[...SIZES, CARD_SIZE].map(({ key, h }) => (
              <div key={`${key}-flip`} className="flex flex-col items-center gap-2">
                <div style={{ position: 'relative', width: Math.round(25 * (h / 66) * 10) / 10, height: Math.round(46 * (h / 66) * 10) / 10 }}>
                  <RohOrnament h={h} uid={`demo-roh-flip-${key}`} flip />
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{key} flip</span>
              </div>
            ))}
          </div>
        </Preview>

        <div className="mt-4">
          <CodeBlock code={`<RohOrnament h={52} uid="unique-id" />
      <RohOrnament h={52} uid="unique-id" flip />

      {/* V komponentě: */}
      <DonjonButton ornament="roh">Tlačítko</DonjonButton>`} />
        </div>
      </Section>

      {/* ── CornerOrnament ── */}
      <Section
        id="corner-ornament"
        description="Dekorativní rohová ozdoba. Umisťuje se absolutně do rohu panelu nebo rámečku. Čtyři varianty tvaru, libovolná barva a velikost. Pro ostatní rohy použij CSS transform: scaleX(-1), scaleY(-1), scale(-1)."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">CornerOrnament</h2>

        <Preview>
          <div className="flex items-start gap-10 flex-wrap">
            {(['bracket', 'dot', 'diamond', 'cross']).map(variant => (
              <div key={variant} className="flex flex-col items-center gap-3">
                <div className="flex gap-4 items-center">
                  {[12, 16, 24, 32].map(size => (
                    <div key={size} className="flex flex-col items-center gap-1.5">
                      <CornerOrnament variant={variant} size={size} />
                      <span className="text-[9px] text-neutral-700 font-mono">{size}px</span>
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">{variant}</span>
              </div>
            ))}
          </div>
        </Preview>

        {/* Props table */}
        <div className="overflow-x-auto rounded-lg border border-neutral-800 mt-4">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900">
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Prop</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Default</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Popis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {[
                ['size',       '16',       'Rozměr ornamenty v px.'],
                ['color',      'goldDim',  'CSS barva výplně.'],
                ['variant',    'bracket',  "Tvar: 'bracket' | 'dot' | 'diamond' | 'cross'"],
                ['cornerType', 'cut',      "Geometrie rohu: 'cut' (ostrý L) | 'round' (konvexní oblouk) | 'scoop' (konkávní oblouk)"],
                ['style',      '{}',       'Inline styly pro pozicování (position, top, left…)'],
              ].map(([p, d, desc]) => (
                <tr key={p} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="px-3 py-2.5"><code className="font-mono text-brand-300 text-[11px]">{p}</code></td>
                  <td className="px-3 py-2.5"><code className="font-mono text-neutral-500 text-[10px]">{d}</code></td>
                  <td className="px-3 py-2.5 text-neutral-400 text-[11px]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <CodeBlock code={`<CornerOrnament variant="bracket" size={16} />
      <CornerOrnament variant="dot"     size={24} color={gold} />

      {/* Rohy pomocí transform */}
      <CornerOrnament style={{ position: 'absolute', top: 0, left: 0 }} />
      <CornerOrnament style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }} />
      <CornerOrnament style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }} />
      <CornerOrnament style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1)' }} />`} />
        </div>
      </Section>

      {/* ── CornerOrnament — cornerType ── */}
      <Section
        id="corner-ornament-corner-type"
        description="cornerType přizpůsobí geometrii ornamentu tvaru rohu komponenty, na které sedí. 'cut' = ostrý L-bracket (výchozí Donjon), 'round' = konvexní oblouk, 'scoop' = konkávní oblouk."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">CornerOrnament — cornerType</h2>

        {/* 3 cornerType × 4 pozice */}
        <Preview>
          <div className="flex flex-col gap-8 w-full">
            {(['cut', 'round', 'scoop']).map(ct => (
              <div key={ct} className="flex gap-8 items-start">
                <div className="w-16 shrink-0 text-right pt-1">
                  <code className="text-[11px] text-brand-400 font-mono">{ct}</code>
                </div>
                <div className="flex gap-6 items-center flex-wrap">
                  {/* TL */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', top: 6, left: 6 }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">TL</span>
                  </div>
                  {/* TR */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">TR</span>
                  </div>
                  {/* BL */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">BL</span>
                  </div>
                  {/* BR */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">BR</span>
                  </div>
                  {/* All 4 on one card */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-sm relative" style={{ width: 80, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={16} style={{ position: 'absolute', top: 4, left: 4 }} />
                      <CornerOrnament cornerType={ct} size={16} style={{ position: 'absolute', top: 4, right: 4, transform: 'scaleX(-1)' }} />
                      <CornerOrnament cornerType={ct} size={16} style={{ position: 'absolute', bottom: 4, left: 4, transform: 'scaleY(-1)' }} />
                      <CornerOrnament cornerType={ct} size={16} style={{ position: 'absolute', bottom: 4, right: 4, transform: 'scale(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">všechny 4</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Preview>

        <div className="mt-4">
          <CodeBlock code={`{/* Komponenta s octagonem (cut rohy) */}
      <CornerOrnament cornerType="cut"   style={{ position: 'absolute', top: 6, left: 6 }} />

      {/* Komponenta s border-radius (round rohy) */}
      <CornerOrnament cornerType="round" style={{ position: 'absolute', top: 6, left: 6 }} />

      {/* Komponenta se scoop tvarem (concave rohy) */}
      <CornerOrnament cornerType="scoop" style={{ position: 'absolute', top: 6, left: 6 }} />

      {/* cornerSize override — přizpůsobí cornerType geometrii dle paneluže */}
      <CornerOrnament cornerType="scoop" cornerSize={8} style={{ position: 'absolute', top: 6, left: 6 }} />
      <CornerOrnament cornerType="round" cornerSize={4} style={{ position: 'absolute', top: 6, left: 6 }} />`} />
        </div>
      </Section>

      {/* ── HrotErbu — dekorativní hrot pro Erb ── */}
      <Section id="hrot-erbu">
        <h2 className="text-base font-semibold text-neutral-100 mb-2">HrotErbu</h2>
        <p className="text-sm text-neutral-400 mb-4 max-w-2xl">
          Dekorativní chevron pro spodní vrchol erbu nebo prapor. Inline SVG
          z <code className="text-brand-300">/design-sources/hrot-erbu.svg</code>, native
          viewBox 48×14. Renderuje se s libovolnou šířkou, výška se dopočítá
          z aspect ratio (~3.4:1).
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Standalone — různé šířky */}
          <div className="flex flex-col gap-3">
            <p style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Standalone (gold)
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', background: bg2, borderRadius: 4 }}>
              <HrotErbu width={24} />
              <HrotErbu width={36} />
              <HrotErbu width={48} />
            </div>
          </div>

          {/* Custom color */}
          <div className="flex flex-col gap-3">
            <p style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Custom color (player blue)
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', background: bg2, borderRadius: 4 }}>
              <HrotErbu width={36} color={infoColor} />
              <HrotErbu width={36} color={infoColor} colorDim={`${infoColor}55`} />
            </div>
          </div>

          {/* Použití v Erb */}
          <div className="flex flex-col gap-3">
            <p style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Použití v Shield (default modrý erb)
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, padding: '20px', background: bg2, borderRadius: 4 }}>
              <Shield playerColor={infoColor} size="md" ornament="decorated" />
              <Shield playerColor={infoColor} size="md" ornament="decorated" ornamentColor="player" />
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal) */}
        <CodeBlock code={`import { HrotErbu } from 'donjon-fall-ui'

{/* Standalone — gold default */}
<HrotErbu width={36} />

{/* Custom barva (např. dle hráče) */}
<HrotErbu width={36} color={infoColor} colorDim="#4A80E255" />

{/* Použití v Erb — sám se renderuje když ornament="decorated" */}
<Shield playerColor={infoColor} size="md" ornament="decorated" />
<Shield playerColor={infoColor} size="md" ornament="decorated" ornamentColor="player" />`} />
      </Section>

      {/* ── Pravidla použití ── */}
      <Section id="pravidla">
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Pravidla použití</h2>
        <ul className="flex flex-col gap-2 text-sm text-neutral-400 list-none">
          {[
            ['SideOrnament a HexOrnament', 'uid', 'vždy generuj přes useId() a odstraň dvojtečky: rawId.replace(/:/g, \'\')'],
            ['SideOrnament', null, 'má position: absolute — rodič musí mít position: relative'],
            ['HexOrnament',  null, 'je také absolutně pozicovaný (left: 0, right: 0, top/bottom: 0)'],
            ['Všechny ornamenty', null, 'přidej aria-hidden="true" — jsou čistě vizuální'],
            ['Symetrické komponenty', null, '(DonjonButton, DonjonCard) stačí edgePadL'],
            ['Asymetrické layouty', null, '(ButtonGroup krajní itemy) použij plné L/R API a hexOffsetX'],
          ].map(([comp, prop, desc], i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-relaxed">
              <span className="text-brand-600 mt-0.5 shrink-0">·</span>
              <span>
                <code className="text-brand-400 text-[11px]">{comp}</code>
                {prop && <> — <code className="text-neutral-500 text-[11px]">{prop}</code></>}
                {' — '}{desc}
              </span>
            </li>
          ))}
        </ul>
      </Section>

    </ShowcasePage>
  )
}
