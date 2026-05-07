import { octagon, clipLeft, clipRight } from '../utils/octagon'
import { buttonSizes } from '../utils/sizes'

const heading = {
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#8F7458',
  marginBottom: 4,
}

const desc = {
  fontSize: '0.8125rem',
  color: '#6B6480',
  lineHeight: 1.6,
  marginBottom: 24,
}

const demoBox = {
  background: 'linear-gradient(150deg,#2A2948 0%,#1B1A30 100%)',
  borderRadius: 4,
  padding: '32px 40px',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 32,
  flexWrap: 'wrap',
  marginBottom: 16,
}

const chip = (clip, h, bg = 'linear-gradient(150deg,#353751 0%,#2A2948 70%)', border = '#8F7458') => ({
  clipPath: clip,
  background: bg,
  height: h,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: `1px solid ${border}33`,
})

const lbl = {
  fontSize: '0.625rem',
  color: '#4A4560',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginTop: 8,
  textAlign: 'center',
}

const codeStyle = {
  background: '#0F0E1A',
  borderRadius: 4,
  padding: '10px 14px',
  fontSize: '0.75rem',
  color: '#8F7458',
  fontFamily: 'monospace',
  lineHeight: 1.6,
  overflowX: 'auto',
  whiteSpace: 'pre',
}

const SIZES = Object.entries(buttonSizes).map(([label, s], i) => ({
  label, h: s.h, cx: s.cx, w: 120 + i * 20,
}))

export default function ShapesPage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F0E6D3', marginBottom: 8 }}>
          Shapes
        </h2>
        <p style={{ ...desc, marginBottom: 0 }}>
          Systém zkosených rohů pomocí CSS <code style={{ color: '#B8956A' }}>clip-path</code>.
          Všechny komponenty hry sdílejí stejnou geometrii — osmihranný střih se zachovaným poměrem zkosení k výšce.
        </p>
      </div>

      {/* Octagon */}
      <div style={{ marginBottom: 48 }} id="octagon">
        <p style={heading}>Octagon</p>
        <p style={desc}>
          Základní tvar. Používá se v DonjonButton, DonjonCard a všude, kde je komponenta symetrická.
          Parametr <code style={{ color: '#B8956A' }}>cx</code> určuje velikost zkosení v px — pro každou výšku tlačítka je fixní hodnota.
        </p>

        <div style={demoBox}>
          {SIZES.map(({ label, h, cx, w }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ ...chip(octagon(cx), h), width: w }}>
                <span style={{ fontSize: '0.625rem', color: '#8F7458', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  cx {cx}
                </span>
              </div>
              <p style={lbl}>{label} · h={h}</p>
            </div>
          ))}
        </div>

        <div style={codeStyle}>{`// src/utils/octagon.js
export function octagon(cx) {
  return \`polygon(
    \${cx}px 0px, calc(100% - \${cx}px) 0px,
    100% \${cx}px, 100% calc(100% - \${cx}px),
    calc(100% - \${cx}px) 100%, \${cx}px 100%,
    0px calc(100% - \${cx}px), 0px \${cx}px
  )\`
}

// Použití
clipPath: octagon(15.62)  // md tlačítko`}</div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: '0.75rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2948' }}>
              {['Velikost', 'Výška (h)', 'Zkosení (cx)', 'Poměr cx/h'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '6px 12px 6px 0', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZES.map(({ label, h, cx }) => (
              <tr key={label} style={{ borderBottom: '1px solid #1B1A30' }}>
                <td style={{ padding: '6px 12px 6px 0', color: '#B8956A', fontFamily: 'monospace' }}>{label}</td>
                <td style={{ padding: '6px 12px 6px 0', color: '#8F7458', fontFamily: 'monospace' }}>{h}px</td>
                <td style={{ padding: '6px 12px 6px 0', color: '#8F7458', fontFamily: 'monospace' }}>{cx}px</td>
                <td style={{ padding: '6px 0', color: '#6B6480', fontFamily: 'monospace' }}>{(cx / h).toFixed(4)}</td>
              </tr>
            ))}
            <tr style={{ borderBottom: '1px solid #1B1A30' }}>
              <td style={{ padding: '6px 12px 6px 0', color: '#6B6480', fontFamily: 'monospace' }}>card</td>
              <td style={{ padding: '6px 12px 6px 0', color: '#8F7458', fontFamily: 'monospace' }}>auto</td>
              <td style={{ padding: '6px 12px 6px 0', color: '#8F7458', fontFamily: 'monospace' }}>16 / 15px</td>
              <td style={{ padding: '6px 0', color: '#6B6480', fontFamily: 'monospace' }}>border shell + inner fill</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DonjonCard two-layer */}
      <div style={{ marginBottom: 48 }} id="card-border">
        <p style={heading}>Dvouvrstvý border (DonjonCard)</p>
        <p style={desc}>
          Karta nemá CSS border — border je simulovaný vnějším div se zkosením <code style={{ color: '#B8956A' }}>cx=16</code>
          a vnitřním div s <code style={{ color: '#B8956A' }}>cx=15</code>, s paddingem 1px.
          Tím border přesně sleduje zkosené rohy.
        </p>
        <div style={demoBox}>
          <div style={{ clipPath: octagon(16), background: '#8F7458', padding: 1, display: 'inline-block' }}>
            <div style={{ clipPath: octagon(15), background: 'linear-gradient(150deg,#353751 0%,#2A2948 70%)', width: 220, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.6875rem', color: '#8F7458', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>outer cx=16 / inner cx=15</span>
            </div>
          </div>
        </div>
        <div style={codeStyle}>{`// DonjonCard — border simulovaný clip-path
<div style={{ clipPath: octagon(16), background: borderColor, padding: 1 }}>
  <div style={{ clipPath: octagon(15), background: fillColor }}>
    {content}
  </div>
</div>`}</div>
      </div>

      {/* ButtonGroup clips */}
      <div style={{ marginBottom: 48 }} id="button-group-clips">
        <p style={heading}>Asymetrické varianty (ButtonGroup)</p>
        <p style={desc}>
          ButtonGroup nepoužívá <code style={{ color: '#B8956A' }}>octagon()</code> — každý item má jen ty rohy, které mu náleží podle pozice.
          Tři varianty: první item (clipLeft), prostřední (bez zkosení), poslední item (clipRight), nebo celý sám (clipBoth = octagon).
        </p>

        <div style={demoBox}>
          {[
            { label: 'clipLeft (první)', fn: clipLeft, cx: 9.61 },
            { label: 'octagon (jediný)', fn: octagon, cx: 9.61 },
            { label: 'clipRight (poslední)', fn: clipRight, cx: 9.61 },
            { label: 'žádný (prostřední)', fn: () => undefined, cx: 9.61 },
          ].map(({ label, fn, cx }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ ...chip(fn(cx), 32), width: 110 }} />
              <p style={lbl}>{label}</p>
            </div>
          ))}
        </div>

        <div style={codeStyle}>{`function clipLeft(cx) {
  return \`polygon(\${cx}px 0px,100% 0px,100% 100%,\${cx}px 100%,0px calc(100% - \${cx}px),0px \${cx}px)\`
}
function clipRight(cx) {
  return \`polygon(0px 0px,calc(100% - \${cx}px) 0px,100% \${cx}px,100% calc(100% - \${cx}px),calc(100% - \${cx}px) 100%,0px 100%)\`
}
// Výběr podle pozice
const clipPath = isOnly  ? octagon(cx)
               : isFirst ? clipLeft(cx)
               : isLast  ? clipRight(cx)
               : undefined`}</div>
      </div>

      {/* Rules */}
      <div style={{ marginBottom: 48 }} id="pravidla">
        <p style={heading}>Pravidla</p>
        <ul style={{ fontSize: '0.8125rem', color: '#6B6480', lineHeight: 2, paddingLeft: 20 }}>
          <li>Poměr cx/h je přibližně <strong style={{ color: '#8F7458' }}>0.300</strong> pro všechny velikosti — zkosení je vždy ~30 % výšky</li>
          <li><code style={{ color: '#B8956A' }}>clip-path</code> ořezává i border — proto DonjonCard simuluje border jako vrstvu</li>
          <li>SideOrnament šírka se počítá ze stejné proporce: <code style={{ color: '#B8956A' }}>w = round(24 × (h / 66) × 10) / 10</code></li>
          <li>Nikdy nepoužívej <code style={{ color: '#B8956A' }}>border-radius</code> a <code style={{ color: '#B8956A' }}>clip-path</code> zároveň — clip-path vždy vyhraje</li>
          <li>Nové komponenty: použij <code style={{ color: '#B8956A' }}>octagon()</code> z <code style={{ color: '#B8956A' }}>src/utils/octagon.js</code>, nevytvářej vlastní polygon</li>
        </ul>
      </div>
    </div>
  )
}
