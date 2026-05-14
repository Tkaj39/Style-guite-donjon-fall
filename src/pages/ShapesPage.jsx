import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import { octagon, clipLeft, clipRight, octagonWithNotch, roundRect, pill, scoopPath, SHAPE_SIZES } from '../utils/octagon'
import { buttonSizes } from '../utils/sizes'
import ScoopClip from '../components/ScoopClip'

/* ── sdílené styly ── */
const inter = '"Inter", sans-serif'

const chip = (clip, h, w, bg = 'linear-gradient(150deg,#353751 0%,#2A2948 70%)') => ({
  clipPath: clip,
  background: bg,
  height: h,
  width: w,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: `1px solid #8F745833`,
})

const lbl = {
  fontSize: '0.625rem',
  color: '#4A4560',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginTop: 8,
  textAlign: 'center',
  fontFamily: inter,
}

const SIZES = Object.entries(buttonSizes).map(([label, s], i) => ({
  label, h: s.h, cx: s.cx, w: 120 + i * 20,
}))

/* ── Corner ornament SVG ── */
function CornerOrnament({ size = 20, color = '#8F7458', variant = 'bracket', style = {} }) {
  const s = size

  if (variant === 'bracket') {
    // L-bracket: dvě čáry ve tvaru L
    const t = Math.round(s * 0.15)   // tloušťka čáry
    const len = Math.round(s * 0.55) // délka ramene
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style}>
        <rect x={0} y={0} width={t} height={len} fill={color} />
        <rect x={0} y={0} width={len} height={t} fill={color} />
      </svg>
    )
  }

  if (variant === 'bracket-inner') {
    const t = Math.round(s * 0.15)
    const len = Math.round(s * 0.55)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style}>
        <rect x={s - t} y={0} width={t} height={len} fill={color} />
        <rect x={s - len} y={0} width={len} height={t} fill={color} />
      </svg>
    )
  }

  if (variant === 'dot') {
    // Tečka + dvě krátké čáry
    const r = Math.round(s * 0.12)
    const gap = Math.round(s * 0.25)
    const lineLen = Math.round(s * 0.35)
    const t = Math.round(s * 0.1)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style}>
        <circle cx={r} cy={r} r={r} fill={color} />
        <rect x={gap} y={0} width={lineLen} height={t} fill={color} opacity="0.6" />
        <rect x={0} y={gap} width={t} height={lineLen} fill={color} opacity="0.6" />
      </svg>
    )
  }

  if (variant === 'diamond') {
    // Malý kosočtverec
    const half = s / 2
    const d = Math.round(s * 0.22)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style}>
        <polygon points={`${d},0 ${d*2},${d} ${d},${d*2} 0,${d}`} fill={color} />
      </svg>
    )
  }

  if (variant === 'cross') {
    // Křížek s tečkami — heraldický styl
    const t = Math.round(s * 0.12)
    const arm = Math.round(s * 0.45)
    const dot = Math.round(s * 0.08)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style}>
        <rect x={0} y={0} width={arm} height={t} fill={color} />
        <rect x={0} y={0} width={t} height={arm} fill={color} />
        <circle cx={arm - dot} cy={dot * 1.5} r={dot * 0.8} fill={color} opacity="0.5" />
      </svg>
    )
  }

  return null
}

/* ── NotchedBox — karta s rohovou ozdobou ── */
function NotchedBox({ cx = 15, nw = 28, nh = 12, side = 'bottom', label, color = '#8F7458' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        clipPath: octagonWithNotch(cx, nw, nh, side),
        background: 'linear-gradient(150deg,#2A2948 0%,#1B1A30 100%)',
        width: 160, height: 80,
        border: `1px solid ${color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.625rem', color: '#8F9CB3', fontFamily: inter,
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        {side}
      </div>
      <p style={lbl}>{label}</p>
    </div>
  )
}

/* ── OrnamentedCard — karta s rohovými ozdobami ── */
function OrnamentedCard({ variant = 'bracket', size = 16, color = '#8F7458', title, children }) {
  const pos = {
    position: 'absolute',
  }
  return (
    <div style={{
      position: 'relative',
      clipPath: octagon(15),
      background: 'linear-gradient(150deg,#353751 0%,#2A2948 70%)',
      width: 220, minHeight: 100,
      padding: '16px 20px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      {/* rohové ornament — TL */}
      <div style={{ ...pos, top: 6, left: 6 }}>
        <CornerOrnament size={size} color={color} variant={variant} />
      </div>
      {/* TR — zrcadlené */}
      <div style={{ ...pos, top: 6, right: 6, transform: 'scaleX(-1)' }}>
        <CornerOrnament size={size} color={color} variant={variant} />
      </div>
      {/* BL — zrcadlené Y */}
      <div style={{ ...pos, bottom: 6, left: 6, transform: 'scaleY(-1)' }}>
        <CornerOrnament size={size} color={color} variant={variant} />
      </div>
      {/* BR — zrcadlené XY */}
      <div style={{ ...pos, bottom: 6, right: 6, transform: 'scale(-1)' }}>
        <CornerOrnament size={size} color={color} variant={variant} />
      </div>

      {title && (
        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#F0E6D3', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: inter }}>
          {title}
        </p>
      )}
      {children}
    </div>
  )
}

export default function ShapesPage() {
  return (
    <ShowcasePage
      title="Shapes"
      description="Systém zkosených rohů pomocí CSS clip-path. Všechny komponenty hry sdílejí stejnou geometrii — osmihranný střih se zachovaným poměrem zkosení k výšce."
    >

      {/* Octagon */}
      <Section
        id="octagon"
        title="Octagon"
        description="Základní tvar — symetrický osmihran. Parametr cx určuje velikost zkosení, poměr cx/h je vždy ~0.300."
      >
        <Preview>
          {SIZES.map(({ label, h, cx, w }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ ...chip(octagon(cx), h, w) }}>
                <span style={{ fontSize: '0.625rem', color: '#8F7458', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, fontFamily: inter }}>
                  cx {cx}
                </span>
              </div>
              <p style={lbl}>{label} · h={h}</p>
            </div>
          ))}
        </Preview>
        <Preview dark={false}>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.75rem', width: '100%', maxWidth: 480 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #8F745430' }}>
                {['Velikost', 'Výška (h)', 'Zkosení (cx)', 'Poměr cx/h'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 14px 6px 0', color: '#4A4870', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map(({ label, h, cx }) => (
                <tr key={label} style={{ borderBottom: '1px solid #8F745418' }}>
                  <td style={{ padding: '6px 14px 6px 0', color: '#B8956A', fontFamily: 'monospace' }}>{label}</td>
                  <td style={{ padding: '6px 14px 6px 0', color: '#8F9CB3', fontFamily: 'monospace' }}>{h}px</td>
                  <td style={{ padding: '6px 14px 6px 0', color: '#8F9CB3', fontFamily: 'monospace' }}>{cx}px</td>
                  <td style={{ padding: '6px 0', color: '#4A4870', fontFamily: 'monospace' }}>{(cx / h).toFixed(4)}</td>
                </tr>
              ))}
              <tr>
                <td style={{ padding: '6px 14px 6px 0', color: '#4A4870', fontFamily: 'monospace' }}>card</td>
                <td style={{ padding: '6px 14px 6px 0', color: '#8F9CB3', fontFamily: 'monospace' }}>auto</td>
                <td style={{ padding: '6px 14px 6px 0', color: '#8F9CB3', fontFamily: 'monospace' }}>16 / 15px</td>
                <td style={{ padding: '6px 0', color: '#4A4870', fontFamily: 'monospace', fontSize: '0.6875rem' }}>outer shell + inner fill</td>
              </tr>
            </tbody>
          </table>
        </Preview>
        <CodeBlock code={`// src/utils/octagon.js
export function octagon(cx) {
  return \`polygon(
    \${cx}px 0px, calc(100% - \${cx}px) 0px,
    100% \${cx}px, 100% calc(100% - \${cx}px),
    calc(100% - \${cx}px) 100%, \${cx}px 100%,
    0px calc(100% - \${cx}px), 0px \${cx}px
  )\`
}

// Použití — md tlačítko
style={{ clipPath: octagon(15.62) }}`} />
      </Section>

      {/* Dvouvrstvý border */}
      <Section
        id="card-border"
        title="Dvouvrstvý border (DonjonCard)"
        description="clip-path ořezává i border — DonjonCard simuluje border vnějším divem (cx=16) a vnitřním divem (cx=15) s paddingem 1px."
      >
        <Preview>
          <div style={{ clipPath: octagon(16), background: '#8F7458', padding: 1, display: 'inline-block' }}>
            <div style={{ clipPath: octagon(15), background: 'linear-gradient(150deg,#353751 0%,#2A2948 70%)', width: 260, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.6875rem', color: '#8F7458', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, fontFamily: inter }}>outer cx=16 / inner cx=15</span>
            </div>
          </div>
          <div style={{ clipPath: octagon(16), background: '#4080C0', padding: 1, display: 'inline-block' }}>
            <div style={{ clipPath: octagon(15), background: 'linear-gradient(150deg,#182A3D 0%,#12102A 100%)', width: 260, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.6875rem', color: '#4080C0', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, fontFamily: inter }}>player color border</span>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`// DonjonCard — border simulovaný clip-path
<div style={{ clipPath: octagon(16), background: borderColor, padding: 1 }}>
  <div style={{ clipPath: octagon(15), background: fillColor }}>
    {content}
  </div>
</div>`} />
      </Section>

      {/* Asymetrické varianty */}
      <Section
        id="button-group-clips"
        title="Asymetrické varianty (ButtonGroup)"
        description="Pro skupiny tlačítek — každý item má jen rohy podle své pozice ve skupině."
      >
        <Preview>
          {[
            { label: 'clipLeft (první)',    fn: clipLeft,  cx: 9.61 },
            { label: 'octagon (jediný)',    fn: octagon,   cx: 9.61 },
            { label: 'clipRight (poslední)', fn: clipRight, cx: 9.61 },
            { label: 'žádný (prostřední)',  fn: () => undefined, cx: 9.61 },
          ].map(({ label, fn, cx }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ ...chip(fn(cx), 32, 110) }} />
              <p style={lbl}>{label}</p>
            </div>
          ))}
        </Preview>
        <CodeBlock code={`function clipLeft(cx) {
  return \`polygon(\${cx}px 0px,100% 0px,100% 100%,\${cx}px 100%,0px calc(100% - \${cx}px),0px \${cx}px)\`
}
function clipRight(cx) {
  return \`polygon(0px 0px,calc(100% - \${cx}px) 0px,100% \${cx}px,100% calc(100% - \${cx}px),calc(100% - \${cx}px) 100%,0px 100%)\`
}

// Výběr podle pozice
const clipFn = isOnly ? octagon : isFirst ? clipLeft : isLast ? clipRight : null
const clipPath = clipFn?.(cx)`} />
      </Section>

      {/* octagonWithNotch */}
      <Section
        id="notch"
        title="Notch (octagonWithNotch)"
        description="Octagon s V-zářezem na jedné straně. Zářez jde dovnitř tvaru — použití: tooltip pointer, panel konektor, herní ukazatel směru."
      >
        <Preview>
          <NotchedBox side="bottom" cx={12} nw={28} nh={14} label="notch bottom (default)" />
          <NotchedBox side="top"    cx={12} nw={28} nh={14} label="notch top" />
          <NotchedBox side="left"   cx={12} nw={28} nh={14} label="notch left" />
          <NotchedBox side="right"  cx={12} nw={28} nh={14} label="notch right" />
        </Preview>

        {/* Variace šířky a hloubky */}
        <Preview>
          {[
            { nw: 16, nh: 8,  label: 'úzký, mělký' },
            { nw: 28, nh: 12, label: 'střední (default)' },
            { nw: 40, nh: 16, label: 'široký, hluboký' },
            { nw: 56, nh: 20, label: 'velký V' },
          ].map(({ nw, nh, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                clipPath: octagonWithNotch(10, nw, nh, 'bottom'),
                background: 'linear-gradient(150deg,#2A2948 0%,#1B1A30 100%)',
                width: 110, height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '0.5625rem', color: '#8F9CB3', fontFamily: inter, letterSpacing: '0.06em' }}>nw={nw} nh={nh}</span>
              </div>
              <p style={lbl}>{label}</p>
            </div>
          ))}
        </Preview>

        {/* Použití — tooltip nad hexem */}
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <div style={{
              clipPath: octagonWithNotch(10, 28, 12, 'bottom'),
              background: '#1E1C3A',
              border: '1px solid #8F745444',
              padding: '10px 18px',
              fontSize: '0.8125rem', color: '#F0E6D3', fontFamily: inter,
              letterSpacing: '0.04em',
              marginBottom: -1,
            }}>
              Hex D4 · Obsazeno
            </div>
            <div style={{
              width: 40, height: 40,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: '#4080C040',
              border: '1px solid #4080C0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.625rem', color: '#4080C0', fontFamily: inter,
            }}>
              D4
            </div>
            <p style={{ ...lbl, marginTop: 8 }}>tooltip s notch nad hexem</p>
          </div>
        </Preview>

        <CodeBlock code={`import { octagonWithNotch } from '../utils/octagon'

// Základní použití — notch bottom (default)
<div style={{ clipPath: octagonWithNotch(cx, nw, nh, 'bottom') }}>
  {content}
</div>

// Parametry
octagonWithNotch(
  cx   = 12,        // rohové zkosení (px) — stejné jako octagon
  nw   = 28,        // šířka zářezu (px)
  nh   = 12,        // hloubka zářezu (px)
  side = 'bottom'   // 'bottom' | 'top' | 'left' | 'right'
)

// Tooltip nad hexem — notch dolů
<div style={{ clipPath: octagonWithNotch(10, 28, 12, 'bottom') }}>
  Hex D4 · Obsazeno
</div>

// Panel konektor — notch doprava (spojení s vedlejším panelem)
<div style={{ clipPath: octagonWithNotch(12, 24, 10, 'right') }}>
  {panelContent}
</div>`} />
      </Section>

      {/* Corner Ornaments */}
      <Section
        id="corner-ornaments"
        title="Corner Ornaments"
        description="Dekorativní rohové ozdoby SVG — umisťují se do rohů karet a panelů. Čtyři varianty pro různé kontexty a úrovně důrazu."
      >
        {/* Varianty ornamentů */}
        <Preview>
          {[
            { variant: 'bracket', label: 'bracket', desc: 'L-závorka — výchozí' },
            { variant: 'dot',     label: 'dot',     desc: 'Tečka + čáry' },
            { variant: 'diamond', label: 'diamond', desc: 'Kosočtverec' },
            { variant: 'cross',   label: 'cross',   desc: 'Heraldický kříž' },
          ].map(({ variant, label, desc }) => (
            <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: 12, background: '#1A1830', border: '1px solid #8F745420', borderRadius: 4 }}>
                <CornerOrnament size={24} color="#B8956A" variant={variant} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <code style={{ fontSize: '0.75rem', color: '#B8956A', display: 'block' }}>{label}</code>
                <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#4A4870' }}>{desc}</p>
              </div>
            </div>
          ))}
        </Preview>

        {/* Ornament na kartě — všechny čtyři rohy */}
        <Preview>
          <OrnamentedCard variant="bracket" size={16} color="#8F7458" title="Bracket corners">
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', textAlign: 'center', fontFamily: inter }}>výchozí ornament</p>
          </OrnamentedCard>
          <OrnamentedCard variant="dot" size={18} color="#B8956A" title="Dot corners">
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', textAlign: 'center', fontFamily: inter }}>zlatý akcent</p>
          </OrnamentedCard>
          <OrnamentedCard variant="diamond" size={14} color="#4080C0" title="Diamond corners">
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', textAlign: 'center', fontFamily: inter }}>hráčská barva</p>
          </OrnamentedCard>
        </Preview>

        {/* Velikosti */}
        <Preview>
          {[12, 16, 20, 28].map(size => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ padding: 12, background: '#1A1830', border: '1px solid #8F745420', borderRadius: 4, position: 'relative', width: 60, height: 60 }}>
                <CornerOrnament size={size} color="#8F7458" variant="bracket" style={{ position: 'absolute', top: 6, left: 6 }} />
                <CornerOrnament size={size} color="#8F7458" variant="bracket" style={{ position: 'absolute', top: 6, right: 6, transform: 'scaleX(-1)' }} />
                <CornerOrnament size={size} color="#8F7458" variant="bracket" style={{ position: 'absolute', bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
                <CornerOrnament size={size} color="#8F7458" variant="bracket" style={{ position: 'absolute', bottom: 6, right: 6, transform: 'scale(-1)' }} />
              </div>
              <p style={lbl}>{size}px</p>
            </div>
          ))}
        </Preview>

        <CodeBlock code={`import CornerOrnament from '../components/CornerOrnament'

{/* Karta s rohovými ozdobami */}
<div style={{ position: 'relative', clipPath: octagon(15), ... }}>
  {/* TL */ } <CornerOrnament style={{ position:'absolute', top:6, left:6 }}  />
  {/* TR */ } <CornerOrnament style={{ position:'absolute', top:6, right:6 }} transform="scaleX(-1)" />
  {/* BL */ } <CornerOrnament style={{ position:'absolute', bottom:6, left:6 }} transform="scaleY(-1)" />
  {/* BR */ } <CornerOrnament style={{ position:'absolute', bottom:6, right:6 }} transform="scale(-1)" />
  {content}
</div>

{/* Props */}
<CornerOrnament
  size={16}          // px — výchozí 16
  color="#8F7458"    // výchozí gold-dark
  variant="bracket"  // 'bracket' | 'dot' | 'diamond' | 'cross'
/>`} />
      </Section>

      {/* Shape varianty */}
      <Section
        id="shape-varianty"
        title="Shape varianty — Cut / Round / Scoop / Curve"
        description="Čtyři rohové styly tvoří kompletní shapes systém. Cut je výchozí pro Donjon Fall; ostatní varianty pro specifické kontexty."
      >
        {/* Srovnávací matice — 4 varianty × 5 velikostí */}
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            {[
              {
                key: 'cut', label: 'Cut', desc: 'Zkosené rohy — výchozí Donjon styl',
                color: '#B8956A',
                getClip: (s) => octagon(s.cut),
              },
              {
                key: 'round', label: 'Round', desc: 'Konvexní zaoblení — inset(round r)',
                color: '#4080C0',
                getClip: (s) => roundRect(s.round),
              },
              {
                key: 'scoop', label: 'Scoop', desc: 'Konkávní rohy — path() s pevnými px',
                color: '#40A055',
                getClip: (s) => scoopPath(s.w, s.h, s.scoop),
              },
              {
                key: 'pill', label: 'Curve / Pill', desc: 'Plně zaoblené — stadium tvar',
                color: '#C08040',
                getClip: () => pill(),
              },
            ].map(({ key, label, desc, color, getClip }) => (
              <div key={key} style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                {/* Label vlevo */}
                <div style={{ width: 70, flexShrink: 0, textAlign: 'right', paddingBottom: 4 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color, fontFamily: inter, letterSpacing: '0.04em' }}>{label}</span>
                </div>
                {/* Tvary pro každou velikost */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  {Object.entries(SHAPE_SIZES).map(([sKey, s]) => (
                    <div key={sKey} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        clipPath: getClip(s),
                        background: `linear-gradient(150deg, ${color}18 0%, ${color}08 100%)`,
                        border: `1.5px solid ${color}55`,
                        width: s.w, height: s.h,
                        flexShrink: 0,
                      }} />
                      <span style={{ ...lbl, color: '#4A4870' }}>{sKey}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Preview>

        {/* Detail Cut */}
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#B8956A', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: inter }}>Cut — zkosené rohy (Donjon výchozí)</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 8, flexWrap: 'wrap' }}>
              {Object.entries(SHAPE_SIZES).map(([key, s]) => (
                <div key={key} style={{ clipPath: octagon(s.cut), background: '#1E1C3A', border: '1px solid #B8956A40', width: s.w, height: s.h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.5625rem', color: '#B8956A', fontFamily: inter }}>cx={s.cut}</span>
                </div>
              ))}
            </div>
          </div>
        </Preview>

        {/* Detail Round */}
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#4080C0', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: inter }}>Round — konvexní zaoblení (responsive ✓)</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 8, flexWrap: 'wrap' }}>
              {Object.entries(SHAPE_SIZES).map(([key, s]) => (
                <div key={key} style={{ clipPath: roundRect(s.round), background: '#12102A', border: '1px solid #4080C040', width: s.w, height: s.h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.5625rem', color: '#4080C0', fontFamily: inter }}>r={s.round}</span>
                </div>
              ))}
            </div>
          </div>
        </Preview>

        {/* Detail Scoop */}
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#40A055', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: inter }}>Scoop — konkávní rohy (pevné px nebo ScoopClip)</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 8, flexWrap: 'wrap' }}>
              {Object.entries(SHAPE_SIZES).map(([key, s]) => (
                <div key={key} style={{ clipPath: scoopPath(s.w, s.h, s.scoop), background: '#12102A', border: '1px solid #40A05540', width: s.w, height: s.h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.5625rem', color: '#40A055', fontFamily: inter }}>r={s.scoop}</span>
                </div>
              ))}
            </div>
          </div>
        </Preview>

        {/* Detail Curve/Pill */}
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#C08040', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: inter }}>Curve / Pill — stadium tvar (responsive ✓)</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 8, flexWrap: 'wrap' }}>
              {Object.entries(SHAPE_SIZES).map(([key, s]) => (
                <div key={key} style={{ clipPath: pill(), background: '#12102A', border: '1px solid #C0804040', width: s.w, height: s.h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.5625rem', color: '#C08040', fontFamily: inter }}>pill</span>
                </div>
              ))}
            </div>
          </div>
        </Preview>

        <CodeBlock code={`import { octagon, roundRect, scoopPath, pill, SHAPE_SIZES } from '../utils/octagon'
import ScoopClip from '../components/ScoopClip'

// ── Cut — zkosené rohy (výchozí Donjon) ──
<div style={{ clipPath: octagon(15.62) }}>Obsah</div>

// ── Round — konvexně zaoblené, responsive ──
<div style={{ clipPath: roundRect(8) }}>Obsah</div>

// ── Scoop (A) — pevné rozměry, path() ──
// Element MUSÍ mít přesně w × h px
<div style={{ width: 170, height: 52, clipPath: scoopPath(170, 52, 13) }}>
  Obsah
</div>

// ── Scoop (B) — ScoopClip, pseudo-responsive ──
// Vhodné pro pevnou výšku + proměnnou šířku
<ScoopClip r={0.25} style={{ height: 52, padding: '0 18px', background: '#1E1C3A' }}>
  Obsah
</ScoopClip>

// ── Curve / Pill — plně zaoblené, responsive ──
<div style={{ clipPath: pill() }}>Obsah</div>

// ── Velikostní tabulka (SHAPE_SIZES) ──
// SHAPE_SIZES.md = { w:170, h:52, cut:15.62, round:8, scoop:13, bb:0.25 }`} />
      </Section>

      {/* ScoopClip — responzivní scoop */}
      <Section
        id="scoop-responsive"
        title="Responzivní Scoop — ScoopClip"
        description="ScoopClip používá SVG clipPath s clipPathUnits='objectBoundingBox' — souřadnice 0–1 relativně k elementu. Funguje nejlépe pro pevnou výšku + variabilní šířku (tlačítka, panely)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            {/* Různé šířky — stejný r */}
            {[100, 160, 240].map(w => (
              <ScoopClip
                key={w}
                r={0.25}
                style={{
                  width: w, height: 48,
                  background: 'linear-gradient(150deg, #40A05518 0%, #12102A 100%)',
                  border: '1px solid #40A05540',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#40A055', fontFamily: inter }}>w={w}px · r=0.25</span>
              </ScoopClip>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`// ScoopClip — responzivní scoop přes SVG clipPathUnits="objectBoundingBox"
import ScoopClip from '../components/ScoopClip'

<ScoopClip
  r={0.25}        // relativní hloubka 0–1 (doporučeno 0.20–0.28)
  style={{        // předáno na vnitřní div
    height: 52,
    padding: '0 18px',
    background: '#1E1C3A',
  }}
>
  Obsah komponenty
</ScoopClip>

// Jak to funguje:
// 1. ScoopClip renderuje inline <svg> s <clipPath clipPathUnits="objectBoundingBox">
// 2. Cesta je definovaná v 0–1 souřadnicích (relativní k elementu)
// 3. clip-path: url(#id) aplikuje tvar na div
// ⚠ Prohnutí se mírně deformuje u extrémních poměrů stran (velmi úzké/velmi široké)`} />
      </Section>

      {/* Kdy jakou variantu */}
      <Section
        id="kdy-jakou"
        title="Kdy jakou variantu použít"
        description="Každá varianta komunikuje jiný vizuální charakter — volba musí odpovídat kontextu."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600 }}>
            {[
              { variant: 'Cut',         color: '#B8956A', use: 'Výchozí — všechna tlačítka, karty, HUD. Geometrický, středověký charakter.', avoid: 'Kontexty vyžadující soft/organický vzhled' },
              { variant: 'Round',       color: '#4080C0', use: 'Informační panely, tooltips, modaly ve světlém kontextu. Přátelský, moderní.', avoid: 'Herní akce — příliš soft pro bojový kontext' },
              { variant: 'Scoop',       color: '#40A055', use: 'Speciální herní prvky, výsledkové karty, dekorativní rámce. Neobvyklý akcent.', avoid: 'Běžné UI komponenty — scoop je nápadný, šetři ho' },
              { variant: 'Curve / Pill', color: '#C08040', use: 'Badgy, toggle trackery, search pole. Organický, hravý.', avoid: 'Tlačítka v herním kontextu — příliš mírné' },
            ].map(({ variant, color, use, avoid }) => (
              <div key={variant} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 10, padding: '10px 12px', background: '#12102A', border: `1px solid ${color}22`, borderLeft: `3px solid ${color}`, borderRadius: 3 }}>
                <code style={{ fontSize: '0.8125rem', fontWeight: 700, color }}>{variant}</code>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#40A055', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Použij</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{use}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#C04040', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Vyhni se</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{avoid}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Poměr cx/h je přibližně <strong className="text-[#8F7458]">0.300</strong> pro všechny velikosti — zkosení je vždy ~30 % výšky.</p>
          <p>✓ <code className="text-neutral-300">clip-path</code> ořezává i border — DonjonCard simuluje border jako vrstvu (outer cx=16, inner cx=15, padding: 1px).</p>
          <p>✓ Notch: nw=28, nh=12 je výchozí pro md kontext. Škáluj proporcionálně s cx.</p>
          <p>✓ Cut je výchozí varianta pro Donjon Fall — geometrický herní charakter.</p>
          <p>✓ Round a Pill jsou responsive (inset round) — fungují s libovolnou šířkou.</p>
          <p>✓ Scoop s pevnými rozměry: element musí mít přesně w×h — scoopPath(w, h, r).</p>
          <p>✓ Scoop s variabilní šířkou: použij ScoopClip s r=0.25 — objectBoundingBox přístup.</p>
          <p>✓ Corner ornaments: vždy 4× — TL, TR, BL, BR pomocí CSS transform (scaleX/scaleY/-1).</p>
          <p>✓ Ornament color: <code className="text-neutral-300">#8F7458</code> (gold-dark) pro výchozí, player color pro herní kontexty.</p>
          <p>✗ Nikdy nepoužívej <code className="text-neutral-300">border-radius</code> a <code className="text-neutral-300">clip-path</code> zároveň — clip-path vždy vyhraje.</p>
          <p>✗ Nevytvářej vlastní polygon — vždy používej funkce z <code className="text-neutral-300">src/utils/octagon.js</code>.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
