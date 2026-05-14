import { SideOrnament, HexOrnament } from '../lib/tkajui/Ornaments'
import { buttonSizes, CARD_ORN_H } from '../utils/sizes'

const sectionStyle = {
  marginBottom: 48,
}

const headingStyle = {
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#8F7458',
  marginBottom: 4,
}

const descStyle = {
  fontSize: '0.8125rem',
  color: '#6B6480',
  marginBottom: 24,
  lineHeight: 1.5,
}

const demoBox = {
  background: 'linear-gradient(150deg,#2A2948 0%,#1B1A30 100%)',
  borderRadius: 4,
  padding: '32px 40px',
  display: 'flex',
  alignItems: 'center',
  gap: 40,
  flexWrap: 'wrap',
  marginBottom: 16,
}

const label = {
  fontSize: '0.625rem',
  color: '#4A4560',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginTop: 6,
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
}

const SIZES = Object.entries(buttonSizes).map(([key, s]) => ({ key, h: s.h }))
const CARD_SIZE = { key: 'card', h: CARD_ORN_H }

export default function OrnamentsPage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F0E6D3', marginBottom: 8 }}>
          Ornaments
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6B6480', lineHeight: 1.6 }}>
          Sdílené dekorativní prvky používané v tlačítkách, skupinách tlačítek a kartách.
          Každý ornament automaticky škáluje podle rozměrů komponenty a používá gradienty zlaté palety.
        </p>
      </div>

      {/* SideOrnament */}
      <div style={sectionStyle} id="side-ornament">
        <p style={headingStyle}>SideOrnament</p>
        <p style={descStyle}>
          Vertikální dekorace umístěná na levém nebo pravém okraji. Obsahuje dvojitý bracket, dva tikatury a centrální diamant.
          Šírka se proporcionálně přizpůsobuje výšce: <code style={{ color: '#B8956A' }}>w = round(24 × (h / 66) × 10) / 10 − 2</code>.
        </p>

        <div style={demoBox}>
          {[...SIZES, CARD_SIZE].map(({ key, h }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: Math.round(24 * (h / 66) * 10) / 10, height: h }}>
                <SideOrnament h={h} uid={`demo-side-${key}`} />
              </div>
              <p style={label}>{key} · {h}px</p>
            </div>
          ))}
          {[...SIZES, CARD_SIZE].map(({ key, h }) => (
            <div key={`${key}-flip`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: Math.round(24 * (h / 66) * 10) / 10, height: h }}>
                <SideOrnament h={h} uid={`demo-side-flip-${key}`} flip />
              </div>
              <p style={label}>{key} flip</p>
            </div>
          ))}
        </div>

        <div style={codeStyle}>
          {'<SideOrnament h={52} uid="unique-id" />'}<br />
          {'<SideOrnament h={52} uid="unique-id" flip />'}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: '0.75rem', color: '#8F7458' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2948' }}>
              <th style={{ textAlign: 'left', padding: '6px 12px 6px 0', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Prop</th>
              <th style={{ textAlign: 'left', padding: '6px 12px 6px 0', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Typ</th>
              <th style={{ textAlign: 'left', padding: '6px 0', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Popis</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['h', 'number', 'Výška v px — šírka se přepočítá automaticky'],
              ['uid', 'string', 'Jedinečný prefix pro SVG gradient ID (použij useId)'],
              ['flip', 'boolean', 'Zrcadlí ornament pro pravou stranu (scaleX(-1))'],
            ].map(([p, t, d]) => (
              <tr key={p} style={{ borderBottom: '1px solid #1B1A30' }}>
                <td style={{ padding: '6px 12px 6px 0', color: '#B8956A', fontFamily: 'monospace' }}>{p}</td>
                <td style={{ padding: '6px 12px 6px 0', color: '#6B6480', fontFamily: 'monospace' }}>{t}</td>
                <td style={{ padding: '6px 0', color: '#8F7458' }}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HexOrnament */}
      <div style={sectionStyle} id="hex-ornament">
        <p style={headingStyle}>HexOrnament</p>
        <p style={descStyle}>
          Horizontální lišta s vnější čárou, vnitřní čárou a centrálním hexagonem. Umísťuje se na horní nebo dolní okraj (flip).
          Čáry používají gradient zlaté palety, hexagon má tmavou výplň.
        </p>

        {/* Default symmetric */}
        <p style={{ ...label, textAlign: 'left', color: '#4A4560', marginBottom: 8 }}>Symetrické použití (karta, tlačítko)</p>
        <div style={{ ...demoBox, padding: '24px 40px', gap: 0, flexDirection: 'column' }}>
          <div style={{ position: 'relative', width: '100%', height: 7 }}>
            <HexOrnament uid="demo-hex-top" edgePadL={16} />
          </div>
          <div style={{ height: 48 }} />
          <div style={{ position: 'relative', width: '100%', height: 7 }}>
            <HexOrnament uid="demo-hex-bot" flip edgePadL={16} />
          </div>
        </div>
        <div style={codeStyle}>
          {'<HexOrnament uid="..." edgePadL={16} />'}<br />
          {'<HexOrnament uid="..." edgePadL={16} flip />'}
        </div>

        {/* Asymmetric (button group) */}
        <p style={{ ...label, textAlign: 'left', color: '#4A4560', margin: '24px 0 8px' }}>Asymetrické použití (ButtonGroup — první/poslední item)</p>
        <div style={{ ...demoBox, padding: '24px 40px', gap: 0, flexDirection: 'column' }}>
          <div style={{ position: 'relative', width: '100%', height: 7 }}>
            <HexOrnament uid="demo-hex-asym-t" edgePadL={17.61} edgePadR={0} textPadL={27} textPadR={10} hexOffsetX={8.5} />
          </div>
          <div style={{ height: 32 }} />
          <div style={{ position: 'relative', width: '100%', height: 7 }}>
            <HexOrnament uid="demo-hex-asym-b" flip edgePadL={17.61} edgePadR={0} textPadL={27} textPadR={10} hexOffsetX={8.5} />
          </div>
        </div>
        <div style={codeStyle}>
          {'// ButtonGroup první item (clipLeft)\n'}
          {'<HexOrnament uid="..." edgePadL={17.61} edgePadR={0} textPadL={27} textPadR={10} hexOffsetX={8.5} />'}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: '0.75rem', color: '#8F7458' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2948' }}>
              <th style={{ textAlign: 'left', padding: '6px 12px 6px 0', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Prop</th>
              <th style={{ textAlign: 'left', padding: '6px 12px 6px 0', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Default</th>
              <th style={{ textAlign: 'left', padding: '6px 0', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Popis</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['uid', '—', 'Jedinečný prefix pro SVG gradient ID'],
              ['flip', 'false', 'Otočí ornament pro spodní okraj (scaleY(-1))'],
              ['edgePadL', '16', 'Odsazení vnější čáry zleva (px)'],
              ['edgePadR', 'edgePadL', 'Odsazení vnější čáry zprava — default = edgePadL'],
              ['textPadL', 'null → 23%', 'Odsazení vnitřní čáry zleva (px nebo %)'],
              ['textPadR', 'null → 23%', 'Odsazení vnitřní čáry zprava'],
              ['hexOffsetX', '0', 'Horizontální posun hexagonu od středu (px) — pro asymetrické layouty'],
            ].map(([p, d, desc]) => (
              <tr key={p} style={{ borderBottom: '1px solid #1B1A30' }}>
                <td style={{ padding: '6px 12px 6px 0', color: '#B8956A', fontFamily: 'monospace' }}>{p}</td>
                <td style={{ padding: '6px 12px 6px 0', color: '#6B6480', fontFamily: 'monospace' }}>{d}</td>
                <td style={{ padding: '6px 0', color: '#8F7458' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage rules */}
      <div style={sectionStyle} id="pravidla">
        <p style={headingStyle}>Pravidla použití</p>
        <ul style={{ fontSize: '0.8125rem', color: '#6B6480', lineHeight: 2, paddingLeft: 20 }}>
          <li>Vždy generuj <code style={{ color: '#B8956A' }}>uid</code> přes <code style={{ color: '#B8956A' }}>useId()</code> a odstraň dvojtečky: <code style={{ color: '#B8956A' }}>rawId.replace(/:/g, '')</code></li>
          <li>SideOrnament má <code style={{ color: '#B8956A' }}>position: absolute</code> — rodič musí mít <code style={{ color: '#B8956A' }}>position: relative</code></li>
          <li>HexOrnament je také absolutně pozicovaný (left: 0, right: 0, top/bottom: 0)</li>
          <li>Ornament přidej <code style={{ color: '#B8956A' }}>aria-hidden="true"</code> — jsou čistě vizuální</li>
          <li>Pro symetrické komponenty (DonjonButton, DonjonCard) stačí <code style={{ color: '#B8956A' }}>edgePadL</code></li>
          <li>Pro asymetrické (ButtonGroup krajní itemy) použij plné L/R API a <code style={{ color: '#B8956A' }}>hexOffsetX</code></li>
        </ul>
      </div>
    </div>
  )
}
