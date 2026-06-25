import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { bg0, bgDeep, borderMuted, borderSubtle, failColor, gold, goldDim, goldMid, successColor, textActive, textDeep, textFaint } from '../lib/donjon/tokens'
import { octagon, octagonInner } from '../lib/shared/octagon'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import VPCounter from '../lib/donjon/VPCounter'
import ActionBar from '../lib/donjon/ActionBar'
import { MoveIcon, SwordIcon, ShieldIcon, TowerIcon, HourglassIcon } from '../lib/donjon/icons'
import { Shield, PlayerIdentityBadge } from '../lib/donjon/Erb'
import { players } from '../data/gameUiMockData'

/* ── Player indicator ── donjon: octagonal border-trick + diamond markers */
function PlayerIndicator({ name, color, vp, isActive, diceCount }) {
  const borderC = isActive ? color : `${goldDim}55`
  return (
    <div style={{
      clipPath: octagon(4),
      background: borderC,
      padding: 1,
      minWidth: 200,
      boxShadow: isActive ? `0 0 10px ${color}40` : 'none',
    }}>
      <div style={{
        clipPath: octagonInner(4),
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 12px',
        background: isActive ? `${color}18` : bgDeep,
      }}>
        {/* Diamond color marker */}
        <div style={{
          width: 10, height: 10, transform: 'rotate(45deg)',
          background: color, flexShrink: 0,
          boxShadow: `0 0 6px ${color}`,
        }} />
        <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 400, color: textActive, flex: 1 }}>{name}</span>
        {/* Dice pips → diamond markers */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {Array.from({ length: diceCount }).map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, transform: 'rotate(45deg)',
              background: color, opacity: 0.8,
            }} />
          ))}
        </div>
        <DonjonBadge size="sm" variant="default">{vp} VP</DonjonBadge>
      </div>
    </div>
  )
}

/* ── Turn tracker ── donjon: octagonal shell + flat segments + octagonal phase chips */
function TurnTracker({ current, total, phase }) {
  const phases = ['Pohyb', 'Útok', 'Stavba']
  return (
    <div style={{ clipPath: octagon(4), background: `${goldDim}55`, padding: 1, minWidth: 180 }}>
      <div style={{
        clipPath: octagonInner(4),
        display: 'flex', flexDirection: 'column', gap: 6,
        padding: '10px 14px',
        background: bgDeep,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '0.625rem', color: textDeep, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kolo</span>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: textActive, fontVariantNumeric: 'tabular-nums' }}>
            {current} <span style={{ fontSize: '0.75rem', color: textDeep }}>/ {total}</span>
          </span>
        </div>
        {/* Round progress — flat segments (no border-radius) */}
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3,
              background: i < current ? goldMid : i === current - 1 ? gold : borderSubtle,
              boxShadow: i === current - 1 ? `0 0 4px ${gold}88` : 'none',
            }} />
          ))}
        </div>
        {/* Phase chips — octagonal */}
        <div style={{ display: 'flex', gap: 4 }}>
          {phases.map((p, i) => {
            const isActive = i === phase
            return (
              <div key={p} style={{
                clipPath: octagon(2),
                background: isActive ? `${gold}33` : 'transparent',
                padding: '2px 8px',
                fontSize: '0.625rem', fontWeight: isActive ? 700 : 400,
                color: isActive ? gold : textDeep,
                letterSpacing: '0.04em',
              }}>{p}</div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const PLAYERS = [
  // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
  { name: 'Hráč 1', color: '#4080C0', vp: 3, icon: <SwordIcon />,  active: true },
  { name: 'Hráč 2', color: failColor,  vp: 1, icon: <ShieldIcon />, active: false },
]

/* Action data shape mirrors the lib <ActionBar> contract:
   { label, icon, variant, keycap, disabled } */
const ACTIONS = [
  { label: 'Pohyb',  icon: <MoveIcon />,      variant: 'move',    keycap: 'M' },
  { label: 'Útok',   icon: <SwordIcon />,     variant: 'attack',  keycap: 'A' },
  { label: 'Stavba', icon: <TowerIcon />,     variant: 'default', keycap: 'B', disabled: true },
  { label: 'Konec',  icon: <HourglassIcon />, variant: 'default', keycap: 'E' },
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
          <div style={{ clipPath: octagon(4), background: `${goldDim}33`, padding: 1, width: 240, height: 100 }}>
          <div style={{
            clipPath: octagonInner(4),
            position: 'relative', width: '100%', height: '100%',
            // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
            background: '#0E0C22', overflow: 'hidden',
          }}>
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
              <div style={{ clipPath: octagon(4), background: `${goldDim}55`, padding: 1, maxWidth: 400 }}>
              <div style={{
                clipPath: octagonInner(4),
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt)
                background: '#0E0C22',
                padding: '8px 16px',
              }}>
                <PlayerIdentityBadge player={players[0]} />
                <span style={{ fontSize: '0.625rem', color: borderMuted, fontWeight: 700, padding: '0 12px' }}>vs</span>
                <PlayerIdentityBadge player={players[1]} />
              </div>
              </div>
            </div>
          </div>
        </Preview>
        { }
        <CodeBlock code={`import { PlayerIdentityBadge } from 'src/lib/donjon/Erb'

// Kompaktní badge — štít xs + jméno s gradientem
<PlayerIdentityBadge player={{ id: 1, color: dangerColor, label: 'Hráč 1' }} />

// HUD horní lišta — 2 hráči vs
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <PlayerIdentityBadge player={player1} />
  <span style={{ color: borderMuted }}>vs</span>
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
                {['Akce blokována', 'Pohyb na toto pole zakázán'].map(text => (
                  <div key={text} style={{
                    // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize danger-tinted background
                    clipPath: octagon(2), background: '#C0404033', padding: 1,
                  }}>
                    <div style={{
                      clipPath: octagonInner(2),
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 10px',
                      // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize danger-tinted background
                      background: '#3D181815',
                      fontSize: '0.75rem', color: failColor,
                    }}>
                      <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="5" cy="5" r="4" /><path d="M3 3l4 4M7 3l-4 4" />
                      </svg>
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Danger — kritický VP */}
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textFaint, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Danger — soupeř na dosah vítězství (4 z 5 VP)
              </p>
              <div style={{
                display: 'inline-block',
                clipPath: octagon(4), background: failColor, padding: 1,
                boxShadow: `0 0 12px ${failColor}55`,
              }}>
                <div style={{
                  clipPath: octagonInner(4),
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '8px 14px',
                  // eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize danger-tinted background
                  background: '#3D181820',
                }}>
                  <Shield player={players[1]} size="xs" showSymbol={false} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: failColor }}>Hráč 2</span>
                  <span style={{ fontSize: '0.6875rem', color: goldDim }}>4 / 5 VP</span>
                  <DonjonBadge variant="danger" size="sm">Pozor!</DonjonBadge>
                </div>
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
                  clipPath: octagon(4), background: `${players[0].color}aa`, padding: 1, maxWidth: 260,
                  boxShadow: `0 0 10px ${players[0].color}30`,
                }}>
                  <div style={{
                    clipPath: octagonInner(4),
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 12px',
                    background: `${players[0].color}12`,
                  }}>
                    <Shield player={players[0]} size="xs" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: textActive }}>Hráč 1</span>
                    <DonjonBadge variant="success" size="sm">Na tahu</DonjonBadge>
                  </div>
                </div>
                {/* Neaktivní */}
                <div style={{
                  clipPath: octagon(4), background: `${goldDim}33`, padding: 1, maxWidth: 260,
                  opacity: 0.6,
                }}>
                  <div style={{
                    clipPath: octagonInner(4),
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 12px',
                    background: bg0,
                  }}>
                    <Shield player={players[1]} size="xs" showSymbol={false} />
                    {/* eslint-disable-next-line donjon/no-hardcoded-hex -- TODO: tokenize nebo rationalizovat (tech debt) */}
                    <span style={{ fontSize: '0.75rem', color: '#6A6880' }}>Hráč 2</span>
                    <DonjonBadge variant="default" size="sm">Čeká</DonjonBadge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Preview>
        { }
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
