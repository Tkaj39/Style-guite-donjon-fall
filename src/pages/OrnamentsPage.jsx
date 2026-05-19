import { SideOrnament, HexOrnament } from '../lib/tkajui/Ornaments'
import CornerOrnament from '../lib/tkajui/CornerOrnament'
import { buttonSizes, CARD_ORN_H } from '../utils/sizes'
import { ShowcasePage, Section, Preview } from '../styleguide/ShowcasePage'

const SIZES = Object.entries(buttonSizes).map(([key, s]) => ({ key, h: s.h }))
const CARD_SIZE = { key: 'card', h: CARD_ORN_H }

export default function OrnamentsPage() {
  return (
    <ShowcasePage
      title="Ornaments"
      description="Sdílené dekorativní prvky používané v tlačítkách, skupinách tlačítek a kartách. Každý ornament automaticky škáluje podle rozměrů komponenty a používá gradienty zlaté palety."
      componentSlugs={['ornaments', 'corner-ornament']}
    >

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

        <pre className="mt-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-brand-400 overflow-x-auto leading-relaxed">{`<SideOrnament h={52} uid="unique-id" />
<SideOrnament h={52} uid="unique-id" flip />`}</pre>
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

        <pre className="mt-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-brand-400 overflow-x-auto leading-relaxed">{`<HexOrnament uid="..." edgePadL={16} />
<HexOrnament uid="..." edgePadL={16} flip />

{/* ButtonGroup první item (clipLeft) */}
<HexOrnament uid="..." edgePadL={17.61} edgePadR={0} textPadL={27} textPadR={10} hexOffsetX={8.5} />`}</pre>
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
                ['color',      '#8F7458',  'CSS barva výplně.'],
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

        <pre className="mt-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-brand-400 overflow-x-auto leading-relaxed">{`<CornerOrnament variant="bracket" size={16} />
<CornerOrnament variant="dot"     size={24} color="#FFC183" />

{/* Rohy pomocí transform */}
<CornerOrnament style={{ position: 'absolute', top: 0, left: 0 }} />
<CornerOrnament style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }} />
<CornerOrnament style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }} />
<CornerOrnament style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1)' }} />`}</pre>
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
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', top: 6, left: 6 }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">TL</span>
                  </div>
                  {/* TR */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">TR</span>
                  </div>
                  {/* BL */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">BL</span>
                  </div>
                  {/* BR */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded relative" style={{ width: 52, height: 52 }}>
                      <CornerOrnament cornerType={ct} size={20} style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono">BR</span>
                  </div>
                  {/* All 4 on one card */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="bg-neutral-950 border border-neutral-800 rounded relative" style={{ width: 80, height: 52 }}>
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

        <pre className="mt-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-brand-400 overflow-x-auto leading-relaxed">{`{/* Komponenta s octagonem (cut rohy) */}
<CornerOrnament cornerType="cut"   style={{ position: 'absolute', top: 6, left: 6 }} />

{/* Komponenta s border-radius (round rohy) */}
<CornerOrnament cornerType="round" style={{ position: 'absolute', top: 6, left: 6 }} />

{/* Komponenta se scoop tvarem (concave rohy) */}
<CornerOrnament cornerType="scoop" style={{ position: 'absolute', top: 6, left: 6 }} />`}</pre>
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
