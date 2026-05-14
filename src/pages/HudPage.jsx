import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonBadge from '../components/DonjonBadge'

/* ── Player indicator ── */
function PlayerIndicator({ name, color, vp, isActive, diceCount }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 12px',
      background: isActive ? `${color}18` : '#12102A',
      border: `1px solid ${isActive ? color : '#8F745430'}`,
      borderRadius: 4,
      boxShadow: isActive ? `0 0 10px ${color}40` : 'none',
      minWidth: 200,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
      <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 400, color: '#F0E6D3', flex: 1 }}>{name}</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {Array.from({ length: diceCount }).map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: 1, background: color, opacity: 0.7 }} />
        ))}
      </div>
      <DonjonBadge size="sm" variant="default">{vp} VP</DonjonBadge>
    </div>
  )
}

/* ── Turn tracker ── */
function TurnTracker({ current, total, phase }) {
  const phases = ['Pohyb', 'Útok', 'Stavba']
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 6,
      padding: '10px 14px',
      background: '#12102A',
      border: '1px solid #8F745430',
      borderRadius: 4,
      minWidth: 180,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '0.625rem', color: '#4A4870', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kolo</span>
        <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#F0E6D3' }}>{current} <span style={{ fontSize: '0.75rem', color: '#4A4870' }}>/ {total}</span></span>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < current ? '#B8956A' : i === current - 1 ? '#FFC183' : '#1A1830',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {phases.map((p, i) => (
          <div key={p} style={{
            padding: '2px 6px', borderRadius: 2,
            fontSize: '0.625rem', fontWeight: i === phase ? 700 : 400,
            background: i === phase ? '#B8956A20' : 'transparent',
            border: `1px solid ${i === phase ? '#B8956A50' : 'transparent'}`,
            color: i === phase ? '#B8956A' : '#4A4870',
          }}>{p}</div>
        ))}
      </div>
    </div>
  )
}

/* ── VP counter ── */
function VPCounter({ players }) {
  const max = 5
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 14px', background: '#12102A', border: '1px solid #8F745430', borderRadius: 4, minWidth: 200 }}>
      <span style={{ fontSize: '0.625rem', color: '#4A4870', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vítězné body</span>
      {players.map(({ name, color, vp }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{ fontSize: '0.75rem', color: '#8F9CB3', width: 60 }}>{name}</span>
          <div style={{ flex: 1, display: 'flex', gap: 3 }}>
            {Array.from({ length: max }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 8, borderRadius: 2,
                background: i < vp ? color : '#1A1830',
                boxShadow: i < vp ? `0 0 4px ${color}60` : 'none',
                transition: 'background 0.2s',
              }} />
            ))}
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F0E6D3', width: 20, textAlign: 'right' }}>{vp}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Action bar ── */
function ActionBar({ actions, activePlayer }) {
  return (
    <div style={{
      display: 'flex', gap: 6, padding: '8px 12px',
      background: '#12102A', border: '1px solid #8F745430', borderRadius: 4,
    }}>
      {actions.map(({ label, key, available }) => (
        <div key={label} style={{
          padding: '6px 12px',
          background: available ? '#1E1C3A' : '#12102A',
          border: `1px solid ${available ? '#8F745440' : '#8F745420'}`,
          borderRadius: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          opacity: available ? 1 : 0.4,
          cursor: available ? 'pointer' : 'not-allowed',
          minWidth: 60,
        }}>
          <span style={{ fontSize: '0.8125rem', color: available ? '#F0E6D3' : '#4A4870' }}>{label}</span>
          <code style={{ fontSize: '0.5625rem', color: '#4A4870', background: '#0E0C22', padding: '1px 4px', borderRadius: 2 }}>{key}</code>
        </div>
      ))}
    </div>
  )
}

const PLAYERS = [
  { name: 'Hráč 1', color: '#4080C0', vp: 3 },
  { name: 'Hráč 2', color: '#C04040', vp: 1 },
]

const ACTIONS = [
  { label: 'Pohyb', key: 'M', available: true },
  { label: 'Útok',  key: 'A', available: true },
  { label: 'Stavba', key: 'B', available: false },
  { label: 'Konec', key: 'E', available: true },
]

export default function HudPage() {
  return (
    <ShowcasePage
      title="HUD Elementy"
      description="Herní HUD (heads-up display) — prvky zobrazující stav hry přes herní plochu. Informace musí být čitelné a dostupné bez přerušení herního toku."
    >

      {/* Player indicators */}
      <Section
        id="player-indicators"
        title="Indikátory hráčů"
        description="Zobrazují aktivního hráče, VP a počet kostek. Aktivní hráč má glow v barvě hráče."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <PlayerIndicator name="Hráč 1 (aktivní)" color="#4080C0" vp={3} diceCount={4} isActive />
            <PlayerIndicator name="Hráč 2"            color="#C04040" vp={1} diceCount={2} isActive={false} />
          </div>
        </Preview>
        <CodeBlock code={`{/* Player indicator — aktivní hráč má glow a silnější border */}
<div style={{
  background: isActive ? \`\${playerColor}18\` : '#12102A',
  border:     \`1px solid \${isActive ? playerColor : '#8F745430'}\`,
  boxShadow:  isActive ? \`0 0 10px \${playerColor}40\` : 'none',
}}>
  <ColorDot color={playerColor} />
  <span>{name}</span>
  <DicePips count={diceCount} />
  <Badge>{vp} VP</Badge>
</div>`} />
      </Section>

      {/* Turn tracker */}
      <Section
        id="turn-tracker"
        title="Tracker kola a fáze"
        description="Zobrazuje aktuální kolo, progress bar a aktivní fázi tahu (Pohyb / Útok / Stavba)."
      >
        <Preview>
          <TurnTracker current={3} total={10} phase={1} />
          <TurnTracker current={7} total={10} phase={0} />
        </Preview>
        <CodeBlock code={`{/* Kolo progress */}
<div style={{ display: 'flex', gap: 2 }}>
  {Array.from({ length: totalRounds }).map((_, i) => (
    <div key={i} style={{
      flex: 1, height: 3, borderRadius: 2,
      background: i < currentRound
        ? '#B8956A'        // dokončené kolo
        : i === currentRound - 1
          ? '#FFC183'      // aktuální kolo
          : '#1A1830',     // budoucí kolo
    }} />
  ))}
</div>

{/* Fáze tahu */}
const PHASES = ['Pohyb', 'Útok', 'Stavba']
{PHASES.map((phase, i) => (
  <PhaseChip key={phase} active={i === currentPhase}>{phase}</PhaseChip>
))}`} />
      </Section>

      {/* VP counter */}
      <Section
        id="vp-counter"
        title="VP Counter"
        description="Progress bary pro každého hráče — segmentové zobrazení VP vůči cíli."
      >
        <Preview>
          <VPCounter players={PLAYERS} />
        </Preview>
        <CodeBlock code={`{/* VP progress — segmenty do cílového počtu */}
{Array.from({ length: targetVP }).map((_, i) => (
  <div key={i} style={{
    flex: 1, height: 8, borderRadius: 2,
    background: i < currentVP ? playerColor : '#1A1830',
    boxShadow: i < currentVP ? \`0 0 4px \${playerColor}60\` : 'none',
    transition: 'background 0.3s, box-shadow 0.3s',
  }} />
))}

{/* Animace při získání VP */}
@keyframes vpPulse {
  0%   { transform: scale(1) }
  50%  { transform: scale(1.3); box-shadow: 0 0 16px var(--player-color) }
  100% { transform: scale(1) }
}`} />
      </Section>

      {/* Action bar */}
      <Section
        id="action-bar"
        title="Action Bar"
        description="Dostupné akce v aktuální fázi — s klávesovými zkratkami a dostupností."
      >
        <Preview>
          <ActionBar actions={ACTIONS} />
        </Preview>
        <CodeBlock code={`{/* Action bar item — s klávesovou zkratkou */}
<div
  role="button"
  aria-disabled={!available}
  tabIndex={available ? 0 : -1}
  style={{ cursor: available ? 'pointer' : 'not-allowed', opacity: available ? 1 : 0.4 }}
>
  <span>{actionLabel}</span>
  <kbd>{keyboardShortcut}</kbd>
</div>

{/* Keyboard shortcut listener */}
useEffect(() => {
  const handleKey = (e) => {
    if (e.key === 'a' && isPlayerTurn) triggerAttack()
    if (e.key === 'm' && isPlayerTurn) triggerMove()
    if (e.key === 'e' && isPlayerTurn) endTurn()
  }
  document.addEventListener('keydown', handleKey)
  return () => document.removeEventListener('keydown', handleKey)
}, [isPlayerTurn])`} />
      </Section>

      {/* Float feedback */}
      <Section
        id="float-feedback"
        title="FloatFeedback — herní notifikace"
        description="Textové animace nad hexem při herní události — VP získáno, kostka ztracena, akce blokována."
      >
        <Preview>
          <div style={{ position: 'relative', height: 100, width: 240, background: '#0E0C22', borderRadius: 4, border: '1px solid #8F745420', overflow: 'hidden' }}>
            {/* Simulace float feedbacku */}
            <div style={{
              position: 'absolute', left: '50%', top: '60%',
              transform: 'translateX(-50%)',
              fontSize: '1.125rem', fontWeight: 700, color: '#40A055',
              textShadow: '0 0 12px #40A055',
              animation: 'floatUp 2s ease-out forwards',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}>+1 VP ⭐</div>
            <div style={{
              position: 'absolute', left: '30%', top: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.875rem', fontWeight: 700, color: '#C04040',
              textShadow: '0 0 8px #C04040',
              animation: 'floatUp 2s ease-out 0.3s forwards',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}>Blokováno ✗</div>
            <style>{`
              @keyframes floatUp {
                0%   { opacity: 0; transform: translateX(-50%) translateY(0); }
                20%  { opacity: 1; }
                100% { opacity: 0; transform: translateX(-50%) translateY(-48px); }
              }
            `}</style>
          </div>
        </Preview>
        <CodeBlock code={`/* FloatFeedback — animovaný text nad herním prvkem */
function FloatFeedback({ text, color, x, y, onDone }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x, top: y,
        fontSize: '1.125rem', fontWeight: 700,
        color, textShadow: \`0 0 12px \${color}\`,
        animation: 'floatUp 1.8s ease-out forwards',
        pointerEvents: 'none',
        zIndex: 500,
      }}
      onAnimationEnd={onDone}
    >
      {text}
    </div>
  )
}

@keyframes floatUp {
  0%   { opacity: 0; transform: translateY(0) }
  20%  { opacity: 1 }
  100% { opacity: 0; transform: translateY(-56px) }
}`} />
      </Section>

      {/* HUD pravidla */}
      <Section
        id="pravidla-hud"
        title="Pravidla HUD"
        description="Co HUD smí a nesmí dělat."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 560 }}>
            {[
              ['Zobrazovat stav, ne instrukce — uživatel hraje, ne čte', true],
              ['Informace dostupné na první pohled — bez hoveru', true],
              ['Minimální text — ikony a čísla místo slov', true],
              ['Aktivní hráč vždy vizuálně odlišený (glow, border)', true],
              ['FloatFeedback jen pro herní eventy (VP, pohyb, blok)', true],
              ['Zobrazovat toast + FloatFeedback zároveň pro stejný event', false],
              ['Blokovat herní plochu HUD prvky — max 20 % viewportu', false],
              ['Animovat HUD neustále bez herní události — rušivé', false],
            ].map(([rule, good]) => (
              <div key={rule} style={{ padding: '10px 12px', background: good ? '#183D2018' : '#3D181818', border: `1px solid ${good ? '#40A05530' : '#C0404030'}`, borderRadius: 3 }}>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: good ? '#40A055' : '#C04040', lineHeight: 1.4 }}>
                  {good ? '✓' : '✗'} {rule}
                </p>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

    </ShowcasePage>
  )
}
