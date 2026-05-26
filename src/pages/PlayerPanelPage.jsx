import { useState } from 'react'
import PlayerPanel from '../lib/donjon/PlayerPanel'
import DonjonButton from '../lib/donjon/DonjonButton'
import {
  gold, bg2, bgDeep, borderDefault,
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

const PLAYERS = [
  { name: 'Hráč 1', color: '#4A90E2', symbol: 'sword',  vp: 7,  hp: 72, maxHp: 100 },
  { name: 'Hráč 2', color: '#C84A4A', symbol: 'shield', vp: 4,  hp: 31, maxHp: 100 },
  { name: 'Hráč 3', color: '#4AB870', symbol: 'tower',  vp: 11, hp: 88, maxHp: 100 },
  { name: 'Hráč 4', color: '#C8A44A', symbol: 'sword',  vp: 2,  hp: 15, maxHp: 100 },
]

export default function PlayerPanelPage() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [hpValues, setHpValues]   = useState(PLAYERS.map(p => p.hp))
  const [eliminated, setEliminated] = useState([false, false, false, false])

  const dealDamage = (i) => {
    const dmg = Math.floor(Math.random() * 20 + 8)
    setHpValues(prev => {
      const next = [...prev]
      next[i] = Math.max(0, next[i] - dmg)
      return next
    })
  }

  const nextTurn = () => setActiveIdx(i => (i + 1) % PLAYERS.length)

  return (
    <div style={PAGE}>
      <h1 style={H1}>PlayerPanel</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        Mini karta hráče — erb, jméno, VP badge, resource bary.
        Aktivní stav (isActive) signalizuje kdo je na tahu.
        Kombinuje Shield, ResourceBar a DonjonBadge do jednoho kompozitu.
        V rámci donjon konzistence funguje jako referenční plain shell bez ornamentální vrstvy.
      </p>

      {/* ── Interaktivní demo ── */}
      <Section id="demo" title="Interaktivní demo" desc="Klikni Další tah nebo Damage pro simulaci hry.">
        <Demo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {PLAYERS.map((p, i) => (
              <PlayerPanel
                key={p.name}
                name={p.name}
                color={p.color}
                symbol={p.symbol}
                vp={p.vp}
                hp={hpValues[i]}
                maxHp={p.maxHp}
                mana={60}
                isActive={activeIdx === i}
                eliminated={eliminated[i]}
                size="md"
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <DonjonButton size="sm" onClick={nextTurn}>Další tah →</DonjonButton>
            {PLAYERS.map((p, i) => (
              <DonjonButton key={p.name} size="sm" variant="danger" onClick={() => dealDamage(i)}>
                Dmg {p.name.split(' ')[1]}
              </DonjonButton>
            ))}
          </div>
        </Demo>
        <Code>{`<PlayerPanel
  name="Hráč 1" color="#4A90E2" symbol="sword"
  vp={7} hp={72} maxHp={100} mana={60}
  isActive={turn === 0}
/>`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Stavy ── */}
      <Section id="stavy" title="Stavy" desc="Výchozí, aktivní (na tahu), vyřazený.">
        <Demo style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <PlayerPanel name="Výchozí"    color="#4A90E2" symbol="sword"  vp={5}  hp={80} size="sm" />
          <PlayerPanel name="Na tahu"    color="#C84A4A" symbol="shield" vp={3}  hp={55} size="sm" isActive />
          <PlayerPanel name="Kritické HP" color="#4AB870" symbol="tower"  vp={9}  hp={18} size="sm" />
          <PlayerPanel name="Vyřazen"    color="#9A9080" symbol="sword"  vp={1}  hp={0}  size="sm" eliminated />
        </Demo>
        <Code>{`{/* Aktivní — zlatý border + glow */}
<PlayerPanel name="Na tahu" color="#C84A4A" isActive />

{/* Vyřazený — 45% opacity + VYŘAZEN badge */}
<PlayerPanel name="Vyřazen" color="#9A9080" eliminated />`}</Code>
      </Section>

      <div style={DIVIDER} />

      <Section
        id="plain-shell"
        title="Plain baseline shell"
        desc="PlayerPanel je záměrně střídmější než DonjonCard nebo DonjonModal. Slouží jako referenční plain gold-frame blok pro HUD a score přehledy, ne jako ornamentální hero panel."
      >
        <Demo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <PlayerPanel name="HUD hráč" color="#4A90E2" symbol="sword" vp={7} hp={72} mana={46} stamina={54} isActive />
            <PlayerPanel name="Score přehled" color="#C84A4A" symbol="shield" vp={4} hp={31} mana={58} stamina={40} />
          </div>
        </Demo>
        <Code>{`{/* Záměrně plain shell bez ornament API */}
<PlayerPanel
  name="HUD hráč"
  color="#4A90E2"
  symbol="sword"
  vp={7}
  hp={72}
  mana={46}
  stamina={54}
  isActive
/>`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Composition API — libovolné herní zdroje ── */}
      <Section
        id="composition"
        title="Composition API — vlastní zdroje"
        desc="Místo flat hp/mana/stamina props předej <PlayerPanel.Resource> children. Otevírá panel pro jakékoli herní zdroje (sanity, hunger, faith…) bez modifikace komponenty."
      >
        <Demo style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <PlayerPanel name="Standard" color="#4A90E2" symbol="sword" vp={7} isActive size="sm">
            <PlayerPanel.Resource variant="hp"      value={72} max={100} label="HP" />
            <PlayerPanel.Resource variant="mana"    value={45} max={100} label="Mana" />
            <PlayerPanel.Resource variant="stamina" value={60} max={100} label="Stam" />
          </PlayerPanel>

          <PlayerPanel name="Survival" color="#C84A4A" symbol="shield" vp={3} size="sm">
            <PlayerPanel.Resource variant="hp"      value={45} max={100} label="HP" />
            <PlayerPanel.Resource variant="stamina" value={80} max={100} label="Hunger" />
            <PlayerPanel.Resource variant="mana"    value={30} max={100} label="Sanity" />
            <PlayerPanel.Resource variant="xp"      value={120} max={200} label="XP" />
          </PlayerPanel>

          <PlayerPanel name="Caster" color="#9A60C8" symbol="tower" vp={5} size="sm">
            <PlayerPanel.Resource variant="hp"   value={62} max={100} label="HP" />
            <PlayerPanel.Resource variant="mana" value={88} max={100} label="Mana" zones />
          </PlayerPanel>
        </Demo>
        <Code>{`<PlayerPanel name="Survival" color="#C84A4A" symbol="shield" vp={3}>
  <PlayerPanel.Resource variant="hp"      value={45} max={100} label="HP" />
  <PlayerPanel.Resource variant="stamina" value={80} max={100} label="Hunger" />
  <PlayerPanel.Resource variant="mana"    value={30} max={100} label="Sanity" />
  <PlayerPanel.Resource variant="xp"      value={120} max={200} label="XP" />
</PlayerPanel>

// PlayerPanel.Resource přijímá stejné props jako ResourceBar:
//   variant, value, max, label, showValue, zones, size, flashKey

// Pokud předáš children, flat props (hp/mana/stamina) se ignorují.
// Pokud nepřdáš, fallback na flat API zůstává funkční.`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Bez resource barů ── */}
      <Section id="simple" title="Bez resource barů" desc="Jednoduchá verze — jen erb, jméno a VP.">
        <Demo style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {PLAYERS.map(p => (
            <PlayerPanel key={p.name} name={p.name} color={p.color} symbol={p.symbol} vp={p.vp} size="sm" />
          ))}
        </Demo>
        <Code>{`{/* Bez hp/mana props — kompaktní verze */}
<PlayerPanel name="Hráč 1" color="#4A90E2" symbol="sword" vp={7} size="sm" />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Velikosti ── */}
      <Section id="velikosti" title="Velikosti">
        <Demo style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <PlayerPanel name="Hráč 1 (sm)" color="#4A90E2" symbol="sword" vp={7} hp={72} size="sm" />
          <PlayerPanel name="Hráč 1 (md)" color="#4A90E2" symbol="sword" vp={7} hp={72} size="md" />
        </Demo>
        <Code>{`<PlayerPanel name="Hráč 1" ... size="sm" />
<PlayerPanel name="Hráč 1" ... size="md" />`}</Code>
      </Section>
    </div>
  )
}
