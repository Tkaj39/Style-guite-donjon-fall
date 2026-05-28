import { useState } from 'react'
import NumericDisplay from '../lib/donjon/NumericDisplay'
import DonjonButton from '../lib/donjon/DonjonButton'
import { CodeBlock } from '../styleguide/ShowcasePage'
import {
  gold, bg2, bg3, bgDeep, borderDefault,
  textMid, textFaint, textParchment,
} from '../lib/donjon/tokens'

const PAGE    = { padding: '40px 32px', maxWidth: 860, margin: '0 auto' }
const H1      = { fontSize: '1.5rem', fontWeight: 700, color: gold, letterSpacing: '0.04em', marginBottom: 4 }
const H2      = { fontSize: '0.875rem', fontWeight: 700, color: gold, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }
const DIVIDER = { height: 1, background: borderDefault, margin: '40px 0', opacity: 0.4 }

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
    <div style={{ marginTop: 8 }}>
      <CodeBlock code={children.trim()} />
    </div>
  )
}

export default function NumericDisplayPage() {
  const [vp, setVp]         = useState(7)
  const [hp, setHp]         = useState(72)
  const [mana, setMana]     = useState(45)
  const [coins, setCoins]   = useState(120)

  return (
    <div style={PAGE}>
      <h1 style={H1}>NumericDisplay</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        Animované číslo pro herní countery — VP, HP, zdroje.
        Při změně hodnoty: floating delta badge (+N/−N) + krátký flash pozadí.
        Ideální pro HUD countery, scoreboard a resource displeje.
      </p>

      <Section
        id="plain-baseline"
        title="Plain baseline counter"
        desc="NumericDisplay je záměrně plain referenční counter. Těžiště je v rychlé čitelnosti čísla, stavu změny a HUD rytmu, ne v ornamentálním shellu."
      >
        <Demo style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <NumericDisplay value={7} variant="vp" label="VP" size="lg" suffix=" VP" />
          <NumericDisplay value={72} variant="default" label="HP" size="md" suffix=" hp" />
          <NumericDisplay value={45} variant="mana" label="Mana" size="md" suffix=" mp" />
        </Demo>
        <Code>{`{/* NumericDisplay zůstává záměrně plain baseline counter */}
<NumericDisplay value={7} variant="vp" label="VP" size="lg" suffix=" VP" />
<NumericDisplay value={72} variant="default" label="HP" size="md" suffix=" hp" />
<NumericDisplay value={45} variant="mana" label="Mana" size="md" suffix=" mp" />`}</Code>
      </Section>

      {/* ── Interaktivní demo ── */}
      <Section id="demo" title="Interaktivní demo" desc="Klikni na tlačítka pro demonstraci animace.">
        <Demo style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <NumericDisplay value={vp} label="Vítězné body" variant="vp" size="lg" suffix=" VP" />
            <div style={{ display: 'flex', gap: 8 }}>
              <DonjonButton size="sm" onClick={() => setVp(v => v + 1)}>+1 VP</DonjonButton>
              <DonjonButton size="sm" variant="danger" onClick={() => setVp(v => Math.max(0, v - 1))}>−1 VP</DonjonButton>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <NumericDisplay value={hp} label="HP" variant="default" size="md" suffix=" hp" />
            <div style={{ display: 'flex', gap: 8 }}>
              <DonjonButton size="sm" onClick={() => setHp(v => Math.min(100, v + 10))}>Heal +10</DonjonButton>
              <DonjonButton size="sm" variant="danger" onClick={() => setHp(v => Math.max(0, v - 15))}>Dmg −15</DonjonButton>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <NumericDisplay value={coins} label="Zlato" variant="resource" size="md" prefix="⚙ " />
            <div style={{ display: 'flex', gap: 8 }}>
              <DonjonButton size="sm" onClick={() => setCoins(v => v + 25)}>+25</DonjonButton>
              <DonjonButton size="sm" variant="danger" onClick={() => setCoins(v => Math.max(0, v - 50))}>−50</DonjonButton>
            </div>
          </div>
        </Demo>
        <Code>{`const [vp, setVp] = useState(7)

<NumericDisplay value={vp} label="Vítězné body" variant="vp" size="lg" suffix=" VP" />

// Při změně vp se automaticky zobrazí floating +1 / −1 badge`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Varianty ── */}
      <Section id="varianty" title="Varianty" desc="Různé barevné varianty pro různé typy zdrojů.">
        <Demo style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <NumericDisplay value={7}   variant="vp"       label="VP"      size="md" suffix=" VP" />
          <NumericDisplay value={72}  variant="default"  label="HP"      size="md" />
          <NumericDisplay value={45}  variant="resource" label="Zdroje"  size="md" />
          <NumericDisplay value={30}  variant="mana"     label="Mana"    size="md" />
        </Demo>
        <Code>{`<NumericDisplay value={7}  variant="vp"       label="VP"     />
<NumericDisplay value={72} variant="default"  label="HP"     />
<NumericDisplay value={45} variant="resource" label="Zdroje" />
<NumericDisplay value={30} variant="mana"     label="Mana"   />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Velikosti ── */}
      <Section id="velikosti" title="Velikosti">
        <Demo style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
          <NumericDisplay value={vp} variant="vp" label="sm" size="sm" />
          <NumericDisplay value={vp} variant="vp" label="md" size="md" />
          <NumericDisplay value={vp} variant="vp" label="lg" size="lg" />
        </Demo>
      </Section>

      <div style={DIVIDER} />

      {/* ── Label pozice ── */}
      <Section id="label-position" title="Pozice popisku" desc="Label může být nad, pod, vlevo nebo vpravo od čísla.">
        <Demo style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
          <NumericDisplay value={7} variant="vp" label="top"    size="md" labelPosition="top"    />
          <NumericDisplay value={7} variant="vp" label="bottom" size="md" labelPosition="bottom" />
          <NumericDisplay value={7} variant="vp" label="left"   size="md" labelPosition="left"   />
          <NumericDisplay value={7} variant="vp" label="right"  size="md" labelPosition="right"  />
        </Demo>
        <Code>{`<NumericDisplay value={vp} label="VP" labelPosition="top"    />
<NumericDisplay value={vp} label="VP" labelPosition="bottom" />
<NumericDisplay value={vp} label="VP" labelPosition="left"   />
<NumericDisplay value={vp} label="VP" labelPosition="right"  />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── HUD příklad ── */}
      <Section id="hud" title="HUD příklad" desc="Kombinace více NumericDisplay pro herní HUD.">
        <Demo>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <NumericDisplay value={vp}    variant="vp"       size="lg" label="VP"    suffix=" VP" />
            <div style={{ width: 1, height: 48, background: borderDefault, opacity: 0.4 }} />
            <NumericDisplay value={hp}    variant="default"  size="md" label="HP"    suffix=" hp" />
            <NumericDisplay value={mana}  variant="mana"     size="md" label="Mana"  suffix=" mp" />
            <NumericDisplay value={coins} variant="resource" size="md" label="Zlato" prefix="⚙ " />
          </div>
        </Demo>
        <Code>{`<NumericDisplay value={vp}    variant="vp"       size="lg" label="VP"    suffix=" VP" />
<NumericDisplay value={hp}    variant="default"  size="md" label="HP"    suffix=" hp" />
<NumericDisplay value={mana}  variant="mana"     size="md" label="Mana"  suffix=" mp" />
<NumericDisplay value={coins} variant="resource" size="md" label="Zlato" prefix="⚙ " />`}</Code>
      </Section>
    </div>
  )
}
