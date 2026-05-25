import { useState, useRef } from 'react'
import ResourceBar from '../lib/donjon/ResourceBar'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonSlider from '../lib/donjon/DonjonSlider'
import {
  gold, goldDim, bg2, bg3, bgDeep, borderDefault,
  textHigh, textMid, textFaint, textParchment, textLow,
  gainColor, dangerColor, warningColor,
} from '../lib/donjon/tokens'

const PAGE    = { padding: '40px 32px', maxWidth: 860, margin: '0 auto' }
const H1      = { fontSize: '1.5rem', fontWeight: 700, color: gold, letterSpacing: '0.04em', marginBottom: 4 }
const H2      = { fontSize: '0.875rem', fontWeight: 700, color: gold, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }
const DIVIDER = { height: 1, background: borderDefault, margin: '40px 0', opacity: 0.4 }
const LABEL   = { fontSize: '0.625rem', color: textFaint, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }

function Section({ id, title, desc, children }) {
  return (
    <section id={id} style={{ marginBottom: 40 }}>
      <h2 style={H2}>{title}</h2>
      {desc && <p style={{ fontSize: '0.8125rem', color: textMid, marginBottom: 16, marginTop: 2 }}>{desc}</p>}
      {children}
    </section>
  )
}

function Demo({ children, style }) {
  return (
    <div style={{ background: bg2, border: `1px solid ${borderDefault}`, borderRadius: 4, padding: 24, ...style }}>
      {children}
    </div>
  )
}

function Code({ children }) {
  return (
    <pre style={{
      background: bgDeep, border: `1px solid ${borderDefault}`, borderRadius: 4,
      padding: '12px 16px', fontSize: '0.75rem', color: textParchment,
      overflowX: 'auto', margin: '8px 0 0', lineHeight: 1.6,
      fontFamily: "'JetBrains Mono', Consolas, monospace",
    }}>
      <code>{children.trim()}</code>
    </pre>
  )
}

export default function ResourceBarPage() {
  const [hp, setHp]     = useState(72)
  const [mana, setMana] = useState(45)
  const [flash, setFlash] = useState(0)
  const flashKeyRef = useRef(0)

  const triggerFlash = () => {
    flashKeyRef.current += 1
    setFlash(flashKeyRef.current)
    setHp(v => Math.max(0, v - Math.floor(Math.random() * 15 + 8)))
  }

  return (
    <div style={PAGE}>
      <h1 style={H1}>ResourceBar</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        HP/mana/stamina bar s vizuálními zónami. Hranice danger/warning jsou <em>vždy viditelné</em> v pozadí traku —
        i při plném HP hráč vidí kde zóny začínají. Liší se od DonjonProgressBar: zóny jsou prostorové, ne jen reaktivní.
      </p>

      <Section
        id="plain-baseline"
        title="Plain baseline resource shell"
        desc="ResourceBar je záměrně plain referenční stavebnice: prioritu mají čitelné prahy, rychlé skenování hodnoty a minimální vizuální šum, ne ornamentální rámování."
      >
        <Demo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
            <ResourceBar value={72} max={100} variant="hp" label="HP" showValue zones />
            <ResourceBar value={45} max={100} variant="mana" label="Mana" showValue zones={false} />
            <p style={{ margin: 0, fontSize: '0.8125rem', color: textMid, lineHeight: 1.6 }}>
              Tahle komponenta nemá druhý ornament režim. V donjon auditní logice slouží jako plain baseline pro resource HUD a
              její vizuální identita stojí na zónách, barvě fillu a rychlé čitelnosti, ne na SideOrnament nebo HexOrnament vrstvě.
            </p>
          </div>
        </Demo>
        <Code>{`{/* ResourceBar zůstává záměrně plain baseline komponenta */}
<ResourceBar value={72} max={100} variant="hp" label="HP" showValue zones />
<ResourceBar value={45} max={100} variant="mana" label="Mana" showValue zones={false} />`}</Code>
      </Section>

      {/* ── Interaktivní demo ── */}
      <Section id="demo" title="Interaktivní demo" desc="Přetáhni slider nebo spusť damage flash.">
        <Demo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 380 }}>
            <ResourceBar value={hp} max={100} variant="hp" label="HP" showValue zones flashKey={flash} />
            <ResourceBar value={mana} max={100} variant="mana" label="Mana" showValue zones={false} />
            <div style={{ height: 1, background: borderDefault, opacity: 0.3 }} />
            <DonjonSlider value={hp} onChange={setHp} min={0} max={100} label="HP" showValue />
            <div style={{ display: 'flex', gap: 8 }}>
              <DonjonButton size="sm" variant="danger" onClick={triggerFlash}>Damage flash</DonjonButton>
              <DonjonButton size="sm" onClick={() => { setHp(100); setMana(100) }}>Reset</DonjonButton>
            </div>
          </div>
        </Demo>
        <Code>{`<ResourceBar value={hp} max={100} variant="hp" label="HP" showValue zones flashKey={flashKey} />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Zóny ── */}
      <Section id="zony" title="Vizuální zóny" desc="Srovnání s/bez zones prop. Hranice jsou viditelné přes fill (zIndex 2).">
        <Demo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'HP = 85%  (zones: true)',  value: 85, zones: true  },
              { label: 'HP = 40%  (zones: true)',  value: 40, zones: true  },
              { label: 'HP = 15%  (zones: true)',  value: 15, zones: true  },
              { label: 'HP = 85%  (zones: false)', value: 85, zones: false },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: '0.75rem', color: textFaint, width: 180, flexShrink: 0 }}>{row.label}</span>
                <div style={{ flex: 1 }}>
                  <ResourceBar value={row.value} max={100} variant="hp" size="md" showValue zones={row.zones} />
                </div>
              </div>
            ))}
          </div>
        </Demo>
        <Code>{`{/* Zóny viditelné v pozadí — danger 0-25%, warning 25-50%, safe 50-100% */}
<ResourceBar value={85} zones />
<ResourceBar value={40} zones />
<ResourceBar value={15} zones />

{/* Bez zón — jen tmavé pozadí (jako DonjonProgressBar) */}
<ResourceBar value={85} zones={false} />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Varianty ── */}
      <Section id="varianty" title="Varianty" desc="Různé typy zdrojů — každý má vlastní barvu, hp má automatické prahové barvy.">
        <Demo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
            {[
              { variant: 'hp',      value: 62, label: 'HP',     zones: true  },
              { variant: 'mana',    value: 45, label: 'Mana'                 },
              { variant: 'stamina', value: 80, label: 'Stamina'              },
              { variant: 'xp',      value: 33, label: 'XP'                   },
              { variant: 'shield',  value: 55, label: 'Štít'                 },
            ].map(r => (
              <ResourceBar key={r.variant} {...r} size="md" showValue />
            ))}
          </div>
        </Demo>
        <Code>{`<ResourceBar variant="hp"      value={62} label="HP"      showValue zones />
<ResourceBar variant="mana"    value={45} label="Mana"    showValue />
<ResourceBar variant="stamina" value={80} label="Stamina" showValue />
<ResourceBar variant="xp"      value={33} label="XP"      showValue />
<ResourceBar variant="shield"  value={55} label="Štít"    showValue />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Damage flash ── */}
      <Section id="flash" title="Damage flash" desc="flashKey pattern — změna hodnoty spustí animaci.">
        <Demo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360 }}>
            <ResourceBar value={hp} max={100} variant="hp" label="HP" showValue zones flashKey={flash} size="lg" />
            <DonjonButton size="sm" variant="danger" onClick={triggerFlash}>
              Spustit damage ({hp} HP)
            </DonjonButton>
          </div>
        </Demo>
        <Code>{`// flashKey pattern: incrementuj hodnotu pro nový flash
const [flashKey, setFlashKey] = useState(0)

const takeDamage = () => {
  setFlashKey(k => k + 1)  // re-mountuje element → restartuje animaci
  setHp(v => v - damage)
}

<ResourceBar value={hp} max={100} variant="hp" flashKey={flashKey} />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Props ── */}
      <Section id="props" title="Props">
        <div style={{ background: bgDeep, border: `1px solid ${borderDefault}`, borderRadius: 4, overflow: 'hidden' }}>
          {[
            ['value', 'number', '100', 'Aktuální hodnota (0–max)'],
            ['max', 'number', '100', 'Maximum'],
            ['variant', "'hp'|'mana'|'stamina'|'xp'|'shield'|'default'", "'hp'", 'Barva a logika výplně'],
            ['size', "'sm'|'md'|'lg'", "'md'", 'Výška baru'],
            ['label', 'string', '—', 'Popisek nad barem'],
            ['showValue', 'boolean', 'false', 'Zobrazí aktuální/max hodnoty'],
            ['zones', 'boolean', 'true', 'Zónová pásma v pozadí traku'],
            ['flashKey', 'any', '—', 'Změna spustí damage flash animaci'],
          ].map(([prop, type, def, desc], i) => (
            <div key={prop} style={{
              display: 'grid', gridTemplateColumns: '130px 260px 80px 1fr',
              gap: 12, padding: '9px 16px', fontSize: '0.75rem',
              background: i % 2 ? 'transparent' : `${bg3}55`,
              borderBottom: i < 7 ? `1px solid ${borderDefault}33` : 'none',
            }}>
              <span style={{ color: gold, fontWeight: 600, fontFamily: 'monospace' }}>{prop}</span>
              <span style={{ color: textFaint, fontFamily: 'monospace', fontSize: '0.6875rem' }}>{type}</span>
              <span style={{ color: textLow }}>{def}</span>
              <span style={{ color: textMid }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
