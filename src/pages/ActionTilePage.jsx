import { useState } from 'react'
import ActionTile from '../lib/donjon/ActionTile'
import DonjonButton from '../lib/donjon/DonjonButton'
import { SwordIcon, ShieldIcon, TowerIcon } from '../lib/donjon/icons'
import {
  gold, bg2, bg3, bgDeep, borderDefault,
  textMid, textFaint, textParchment, textHigh,
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

/* ── Herní akce ── */
function MoveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
      <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 7l4-4 4 4M8 17l4 4 4-4M7 8l-4 4 4 4M17 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CastleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
      <rect x="3" y="11" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 11V7h3V4h3v3h3V4h3v3h3v4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="9" y="15" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
      <path d="M7 16l-4-4m0 0l4-4m-4 4h14M17 8l4 4m0 0l-4 4m4-4H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BombIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
      <circle cx="11" cy="14" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17.5 7.5l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 7l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ActionTilePage() {
  const [selected, setSelected] = useState('move')
  const [selected2, setSelected2] = useState(null)

  const actions = [
    { id: 'move',    icon: <MoveIcon />,    title: 'Pohyb',     cost: 1,   variant: 'move'    },
    { id: 'attack',  icon: <SwordIcon />,   title: 'Útok',      cost: 2,   variant: 'attack'  },
    { id: 'tower',   icon: <CastleIcon />,  title: 'Věž',       cost: 2,   variant: 'default' },
    { id: 'swap',    icon: <SwapIcon />,    title: 'Přehodit',  cost: 3,   variant: 'special' },
    { id: 'bomb',    icon: <BombIcon />,    title: 'Destrukce', cost: 4,   variant: 'attack', locked: true },
  ]

  return (
    <div style={PAGE}>
      <h1 style={H1}>ActionTile</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        Klikatelná akční dlaždice — jiná než Button. Tile tvar s ikonou nahoře, názvem
        a cost badgem v rohu. Selekce, disabled stav, lock stav s ikonou. Vhodné pro
        výběr herní akce, karet nebo schopností. V rámci donjon konzistence funguje jako
        plain baseline tile bez ornamentální vrstvy.
      </p>

      {/* ── Interaktivní demo ── */}
      <Section id="demo" title="Interaktivní demo" desc="Klikni na dlaždici pro výběr akce.">
        <Demo>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {actions.map(a => (
              <ActionTile
                key={a.id}
                icon={a.icon}
                title={a.title}
                cost={a.cost}
                variant={a.variant}
                selected={selected === a.id}
                locked={a.locked}
                onClick={() => !a.locked && setSelected(a.id)}
              />
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: textFaint, margin: 0 }}>
            Vybraná akce: <span style={{ color: gold, fontWeight: 600 }}>{selected}</span>
            &nbsp;· Destrukce je zamčená (locked)
          </p>
        </Demo>
        <Code>{`const [selected, setSelected] = useState('move')

<ActionTile
  icon={<MoveIcon />}
  title="Pohyb"
  cost={1}
  variant="move"
  selected={selected === 'move'}
  onClick={() => setSelected('move')}
/>
<ActionTile
  icon={<BombIcon />}
  title="Destrukce"
  cost={4}
  variant="attack"
  locked  {/* zobrazí lock ikonu, onClick nefunguje */}
/>`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Varianty ── */}
      <Section id="varianty" title="Barevné varianty" desc="Barva borderu při hover/selected odpovídá variantě.">
        <Demo style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { variant: 'default', title: 'Default', icon: <ShieldIcon /> },
            { variant: 'attack',  title: 'Attack',  icon: <SwordIcon />  },
            { variant: 'move',    title: 'Move',    icon: <MoveIcon />   },
            { variant: 'special', title: 'Special', icon: <TowerIcon />  },
          ].map(a => (
            <ActionTile
              key={a.variant}
              icon={a.icon}
              title={a.variant}
              selected={selected2 === a.variant}
              variant={a.variant}
              onClick={() => setSelected2(a.variant === selected2 ? null : a.variant)}
            />
          ))}
        </Demo>
        <Code>{`<ActionTile variant="default" title="Default" icon={<ShieldIcon />} />
<ActionTile variant="attack"  title="Attack"  icon={<SwordIcon />} />
<ActionTile variant="move"    title="Move"    icon={<MoveIcon />}  />
<ActionTile variant="special" title="Special" icon={<TowerIcon />} />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Stavy ── */}
      <Section id="stavy" title="Stavy" desc="Výchozí, vybraná, disabled, locked.">
        <Demo style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <ActionTile icon={<SwordIcon />} title="Výchozí"  cost={2} />
          <ActionTile icon={<SwordIcon />} title="Vybraná"  cost={2} selected />
          <ActionTile icon={<SwordIcon />} title="Disabled" cost={2} disabled />
          <ActionTile icon={<SwordIcon />} title="Locked"   cost={4} locked />
        </Demo>
        <Code>{`<ActionTile icon={<SwordIcon />} title="Výchozí"  cost={2} />
<ActionTile icon={<SwordIcon />} title="Vybraná"  cost={2} selected />
<ActionTile icon={<SwordIcon />} title="Disabled" cost={2} disabled />
<ActionTile icon={<SwordIcon />} title="Locked"   cost={4} locked />`}</Code>
      </Section>

      <div style={DIVIDER} />

      <Section
        id="plain-tile"
        title="Plain baseline tile"
        desc="ActionTile je záměrně střídmější než dekorované panely typu DonjonCard nebo DonjonModal. Slouží jako referenční plain tile pro husté akční gridy, kde musí dominovat ikona, stav a cena akce."
      >
        <Demo>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <ActionTile icon={<MoveIcon />} title="Pohyb" cost={1} variant="move" />
            <ActionTile icon={<SwordIcon />} title="Útok" cost={2} variant="attack" selected />
            <ActionTile icon={<TowerIcon />} title="Věž" cost={2} variant="special" />
          </div>
        </Demo>
        <Code>{`{/* Záměrně plain tile bez ornament API */}
<ActionTile icon={<MoveIcon />} title="Pohyb" cost={1} variant="move" />
<ActionTile icon={<SwordIcon />} title="Útok" cost={2} variant="attack" selected />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Velikosti ── */}
      <Section id="velikosti" title="Velikosti">
        <Demo style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <ActionTile icon={<SwordIcon />} title="sm"  cost={2} size="sm" />
          <ActionTile icon={<SwordIcon />} title="md"  cost={2} size="md" />
          <ActionTile icon={<SwordIcon />} title="lg"  cost={2} size="lg" description="Popis akce" />
        </Demo>
        <Code>{`<ActionTile size="sm" icon={<SwordIcon />} title="sm" cost={2} />
<ActionTile size="md" icon={<SwordIcon />} title="md" cost={2} />
<ActionTile size="lg" icon={<SwordIcon />} title="lg" cost={2} description="Popis akce" />`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Typická herní použití ── */}
      <Section id="pouziti" title="Typická herní použití" desc="Grid pro výběr akce + kartový výběr schopností.">
        <Demo>
          <p style={{ fontSize: '0.75rem', color: textFaint, marginBottom: 14, marginTop: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Výběr akce — Hráč 1 je na tahu
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {actions.slice(0, 4).map(a => (
              <ActionTile
                key={a.id}
                icon={a.icon}
                title={a.title}
                cost={a.cost}
                variant={a.variant}
                selected={selected === a.id}
                onClick={() => setSelected(a.id)}
                size="md"
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <DonjonButton size="sm" variant="danger">Přeskočit</DonjonButton>
            <DonjonButton size="sm">Potvrdit akci</DonjonButton>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
