import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import {
  bg0, borderSubtle, dangerColor, failColor, gold, goldDim, goldMid, successColor, textActive, textCool, textDeep, textFaint,
} from '../lib/donjon/tokens'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { Shield, PlayerIdentityBadge } from '../lib/donjon/Erb'
import { players } from '../data/gameUiMockData'

/* ── Player indicator ── */
function PlayerIndicator({ name, color, vp, isActive, diceCount }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 12px',
      background: isActive ? `${color}18` : bg0,
      border: `1px solid ${isActive ? color : `${goldDim}30`}`,
      borderRadius: 4,
      boxShadow: isActive ? `0 0 10px ${color}40` : 'none',
      minWidth: 200,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
      <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 400, color: textActive, flex: 1 }}>{name}</span>
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
      background: bg0,
      border: `1px solid ${goldDim}30`,
      borderRadius: 4,
      minWidth: 180,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '0.625rem', color: textDeep, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kolo</span>
        <span style={{ fontSize: '1.125rem', fontWeight: 700, color: textActive }}>{current} <span style={{ fontSize: '0.75rem', color: textDeep }}>/ {total}</span></span>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < current ? goldMid : i === current - 1 ? gold : borderSubtle,
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {phases.map((p, i) => (
          <div key={p} style={{
            padding: '2px 6px', borderRadius: 2,
            fontSize: '0.625rem', fontWeight: i === phase ? 700 : 400,
            // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
            background: i === phase ? '#B8956A20' : 'transparent',
            // eslint-disable-next-line donjon/no-hardcoded-hex -- alpha-tail v middle stringu (manuální transformace na template literal)
            border: `1px solid ${i === phase ? '#B8956A50' : 'transparent'}`,
            color: i === phase ? goldMid : textDeep,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 14px', background: bg0, border: `1px solid ${goldDim}30`, borderRadius: 4, minWidth: 200 }}>
      <span style={{ fontSize: '0.625rem', color: textDeep, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vítězné body</span>
      {players.map(({ name, color, vp }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{ fontSize: '0.75rem', color: textCool, width: 60 }}>{name}</span>
          <div style={{ flex: 1, display: 'flex', gap: 3 }}>
            {Array.from({ length: max }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 8, borderRadius: 2,
                background: i < vp ? color : borderSubtle,
                boxShadow: i < vp ? `0 0 4px ${color}60` : 'none',
                transition: 'background 0.2s',
              }} />
            ))}
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: textActive, width: 20, textAlign: 'right' }}>{vp}</span>
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
      background: bg0, border: `1px solid ${goldDim}30`, borderRadius: 4,
    }}>
      {actions.map(({ label, key, available }) => (
        <div key={label} style={{
          padding: '6px 12px',
          // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
          background: available ? '#1E1C3A' : bg0,
          border: `1px solid ${available ? `${goldDim}40` : `${goldDim}20`}`,
          borderRadius: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          opacity: available ? 1 : 0.4,
          cursor: available ? 'pointer' : 'not-allowed',
          minWidth: 60,
        }}>
          <span style={{ fontSize: '0.8125rem', color: available ? textActive : textDeep }}>{label}</span>
          {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
          <code style={{ fontSize: '0.5625rem', color: textDeep, background: '#0E0C22', padding: '1px 4px', borderRadius: 2 }}>{key}</code>
        </div>
      ))}
    </div>
  )
}

const PLAYERS = [
  // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
  { name: 'Hráč 1', color: '#4080C0', vp: 3 },
  { name: 'Hráč 2', color: failColor, vp: 1 },
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
      library="donjon"
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
            {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
            <PlayerIndicator name="Hráč 1 (aktivní)" color="#4080C0" vp={3} diceCount={4} isActive />
            <PlayerIndicator name="Hráč 2"            color={failColor} vp={1} diceCount={2} isActive={false} />
          </div>
        </Preview>
        <CodeBlock code={`{/* Player indicator — aktivní hráč má glow a silnější border */}
<div style={{
  background: isActive ? \`\${playerColor}18\` : 'bg0',
  border:     \`1px solid \${isActive ? playerColor : \`\${goldDim}30\`}\`,
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
        ? 'goldMid'        // dokončené kolo
        : i === currentRound - 1
          ? 'gold'      // aktuální kolo
          : 'borderSubtle',     // budoucí kolo
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
    background: i < currentVP ? playerColor : 'borderSubtle',
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
          {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
          <div style={{ position: 'relative', height: 100, width: 240, background: '#0E0C22', borderRadius: 4, border: `1px solid ${goldDim}20`, overflow: 'hidden' }}>
            {/* Simulace float feedbacku */}
            <div style={{
              position: 'absolute', left: '50%', top: '60%',
              transform: 'translateX(-50%)',
              fontSize: '1.125rem', fontWeight: 700, color: successColor,
              textShadow: `0 0 12px ${successColor}`,
              animation: 'floatUp 2s ease-out forwards',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}>+1 VP ⭐</div>
            <div style={{
              position: 'absolute', left: '30%', top: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.875rem', fontWeight: 700, color: failColor,
              textShadow: `0 0 8px ${failColor}`,
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

      {/* Shield */}
      <Section
        id="shield"
        title="Shield — heraldický štít hráče"
        description="Hexagonální štít s barvou a symbolem hráče. Čtyři velikosti — xs pro HUD, sm pro scoreboard, md/lg pro win dialog a profilový pohled."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Velikosti — size prop
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
                {['xs', 'sm', 'md', 'lg'].map(size => (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <Shield player={players[0]} size={size} />
                    <span style={{ fontSize: '0.5rem', color: textFaint, fontFamily: 'monospace' }}>{size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Barvy hráčů — 6 hráčů, size sm
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {players.map(p => (
                  <Shield key={p.id} player={p} size="sm" />
                ))}
              </div>
            </div>
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                showSymbol=false — barevný štít bez symbolu (kompaktní HUD)
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {players.slice(0, 4).map(p => (
                  <Shield key={p.id} player={p} size="xs" showSymbol={false} />
                ))}
              </div>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`import { Shield } from 'src/lib/donjon/Erb'

// Standardní štít s symbolem
<Shield player={{ id: 1, color: dangerColor, label: 'Hráč 1' }} size="sm" />

// Bez symbolu — kompaktní HUD varianta
<Shield player={player} size="xs" showSymbol={false} />`} />
      </Section>

      {/* PlayerIdentityBadge */}
      <Section
        id="player-identity-badge"
        title="PlayerIdentityBadge — kompaktní identita hráče"
        description="Malý štít + jméno hráče se zlatým gradientem. Určen pro scoreboard, HUD horní lištu a win dialog. Kombinuje Shield xs a jméno hráče."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Všichni hráči
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {players.map(p => (
                  <PlayerIdentityBadge key={p.id} player={p} />
                ))}
              </div>
            </div>
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                V HUD kontextu — hráč 1 vs hráč 2 (2-hráčová partie)
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
                background: '#0E0C22', border: '1px solid #1E1D30',
                borderRadius: 4, padding: '8px 16px', maxWidth: 400,
              }}>
                <PlayerIdentityBadge player={players[0]} />
                {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
                <span style={{ fontSize: '0.625rem', color: '#3A3858', fontWeight: 700, padding: '0 12px' }}>vs</span>
                <PlayerIdentityBadge player={players[1]} />
              </div>
            </div>
          </div>
        </Preview>
        {/* eslint-disable-next-line donjon/no-hardcoded-hex -- hex v code snippet text (ukázka pro uživatele) */}
        <CodeBlock code={`import { PlayerIdentityBadge } from 'src/lib/donjon/Erb'

// Kompaktní badge — štít xs + jméno s gradientem
<PlayerIdentityBadge player={{ id: 1, color: dangerColor, label: 'Hráč 1' }} />

// HUD horní lišta — 2 hráči vs
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <PlayerIdentityBadge player={player1} />
  <span style={{ color: '#3A3858' }}>vs</span>
  <PlayerIdentityBadge player={player2} />
</div>`} />
      </Section>

      {/* Herní status */}
      <Section
        id="herni-status"
        title="Herní status — stavové indikátory"
        description="Vizuální signály pro kritické herní stavy — blokovaná akce, danger zóna, vítězství na dosah, neaktivní hráč. Používají barvu hráče nebo sémantickou barvu (danger/success)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Blokováno */}
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Blokovaná akce
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 10px', borderRadius: 3,
                  // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
                  background: '#3D181815', border: '1px solid #C0404030',
                  fontSize: '0.75rem', color: failColor,
                }}>
                  <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="5" cy="5" r="4" /><path d="M3 3l4 4M7 3l-4 4" />
                  </svg>
                  Akce blokována
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 10px', borderRadius: 3,
                  // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
                  background: '#3D181815', border: '1px solid #C0404030',
                  fontSize: '0.75rem', color: failColor,
                }}>
                  <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="5" cy="5" r="4" /><path d="M3 3l4 4M7 3l-4 4" />
                  </svg>
                  Pohyb na toto pole zakázán
                </div>
              </div>
            </div>
            {/* Danger — kritický VP */}
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Danger — soupeř na dosah vítězství (4 z 5 VP)
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '8px 14px', borderRadius: 4,
                // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
                background: '#3D181820', border: `1px solid ${failColor}`,
                boxShadow: '0 0 12px #C0404035',
              }}>
                <Shield player={players[1]} size="xs" showSymbol={false} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: failColor }}>Hráč 2</span>
                <span style={{ fontSize: '0.6875rem', color: goldDim }}>4 / 5 VP</span>
                <DonjonBadge variant="danger" size="sm">Pozor!</DonjonBadge>
              </div>
            </div>
            {/* Neaktivní hráč */}
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Aktivní vs neaktivní hráč
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {/* Aktivní */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 12px', borderRadius: 4, maxWidth: 260,
                  background: `${players[0].color}12`, border: `1px solid ${players[0].color}55`,
                  boxShadow: `0 0 10px ${players[0].color}30`,
                }}>
                  <Shield player={players[0]} size="xs" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: textActive }}>Hráč 1</span>
                  <DonjonBadge variant="success" size="sm">Na tahu</DonjonBadge>
                </div>
                {/* Neaktivní */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 12px', borderRadius: 4, maxWidth: 260,
                  background: bg0, border: '1px solid #1E1D3060',
                  opacity: 0.6,
                }}>
                  <Shield player={players[1]} size="xs" showSymbol={false} />
                  {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
                  <span style={{ fontSize: '0.75rem', color: '#6A6880' }}>Hráč 2</span>
                  <DonjonBadge variant="default" size="sm">Čeká</DonjonBadge>
                </div>
              </div>
            </div>
          </div>
        </Preview>
        {/* eslint-disable-next-line donjon/no-hardcoded-hex -- hex v code snippet text (ukázka pro uživatele) */}
        {/* eslint-disable-next-line donjon/no-hardcoded-hex -- hex v code snippet text (ukázka pro uživatele) */}
        <CodeBlock code={`/* Blokovaná akce */
<div style={{ color: failColor, border: '1px solid #C0404030', background: '#3D181815' }}>
  <BlockIcon />
  Akce blokována
</div>

/* Danger — soupeř blízko vítězství */
{opponent.vp >= targetVP - 1 && (
  <div style={{ border: \`1px solid \${failColor}\`, boxShadow: '0 0 12px #C0404035' }}>
    <Shield player={opponent} size="xs" showSymbol={false} />
    <span>{opponent.label}</span>
    <Badge variant="danger">Pozor!</Badge>
  </div>
)}

/* Aktivní vs neaktivní hráč */
<PlayerRow
  style={{
    background: isActive ? \`\${player.color}12\` : 'bg0',
    border:     \`1px solid \${isActive ? player.color + '55' : '#1E1D3060'}\`,
    boxShadow:  isActive ? \`0 0 10px \${player.color}30\` : 'none',
    opacity:    isActive ? 1 : 0.6,
  }}
/>`} />
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
              // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
              // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
              <div key={rule} style={{ padding: '10px 12px', background: good ? '#183D2018' : '#3D181818', border: `1px solid ${good ? '#40A05530' : '#C0404030'}`, borderRadius: 3 }}>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: good ? successColor : failColor, lineHeight: 1.4 }}>
                  {good ? '✓' : '✗'} {rule}
                </p>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ HUD musí být vždy viditelný bez scrollování — fixní pozice nebo sticky panel na okraji herní plochy.</p>
          <p>✓ Priorita informací v HUDu: VP score &gt; HP/životy &gt; aktivní hráč &gt; sekundární zdroje.</p>
          <p>✓ Minimalizuj HUD pro herní plochu — každý pixel odebraný HUDem je herní prostor navíc.</p>
          <p>✓ Aktualizuj HUD synchronně s herní logikou — zpožděný HUD způsobuje zmatení hráče.</p>
          <p>✗ Nevkládej do HUDu ovládací prvky — HUD je read-only panel, ne interaktivní UI.</p>
          <p>✗ Nepoužívej animace v HUDu pro informace, které se mění každý tah — animuj jen VP gain, low HP.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
