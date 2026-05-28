import { useState, useEffect } from 'react'
import useGameAnimation from '../lib/donjon/useGameAnimation'
import GameTransition, { gameTransitionPresets } from '../lib/donjon/GameTransition'
import DonjonButton from '../lib/donjon/DonjonButton'
import PlayerPanel from '../lib/donjon/PlayerPanel'
import { CodeBlock } from '../styleguide/ShowcasePage'
import {
  gold, bg2, bg3, bgDeep, borderDefault,
  textMid, textFaint, textParchment,
  gainColor, dangerColor, warningColor,
  animFast, animNormal, animSlow, animDramatic,
  easingSharp, easingBounce, easingEnter, easingExit,
} from '../lib/donjon/tokens'

const PAGE    = { padding: '40px 32px', maxWidth: 900, margin: '0 auto' }
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

function AnimBox({ label, color = borderDefault }) {
  return (
    <div style={{
      width: 76, height: 76,
      background: `${color}1A`,
      border: `2px solid ${color}55`,
      borderRadius: 6,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.6rem', color: textFaint, textAlign: 'center',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      flexShrink: 0,
    }}>
      {label}
    </div>
  )
}

/* ── Bezier curve SVG ── */
function BezierCurve({ x1, y1, x2, y2, color = gold }) {
  const W = 100, H = 100
  // CSS timing coords: (0,0)=start (bottom-left), (1,1)=end (top-right)
  // SVG coords: Y=0 is top → flip Y
  const toSvg = (cx, cy) => [cx * W, (1 - cy) * H]
  const [sx, sy] = [0, H]
  const [cp1x, cp1y] = toSvg(x1, y1)
  const [cp2x, cp2y] = toSvg(x2, y2)
  const [ex, ey] = [W, 0]
  const path = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`

  return (
    <svg width={90} height={90} viewBox="-8 -20 116 128" style={{ overflow: 'visible', display: 'block' }}>
      {/* Grid */}
      {[0.25, 0.5, 0.75].map(t => (
        <g key={t}>
          <line x1={t*W} y1={0} x2={t*W} y2={H} stroke={borderDefault} strokeWidth="0.6" />
          <line x1={0} y1={(1-t)*H} x2={W} y2={(1-t)*H} stroke={borderDefault} strokeWidth="0.6" />
        </g>
      ))}
      {/* Border box */}
      <rect x={0} y={0} width={W} height={H} fill="none" stroke={`${borderDefault}`} strokeWidth="0.6" />
      {/* Diagonal (linear reference) */}
      <line x1={0} y1={H} x2={W} y2={0} stroke={`${borderDefault}`} strokeWidth="0.8" strokeDasharray="4,3" />
      {/* Control point handles */}
      <line x1={sx} y1={sy} x2={cp1x} y2={cp1y} stroke={`${color}50`} strokeWidth="1.2" strokeDasharray="3,2" />
      <line x1={ex} y1={ey} x2={cp2x} y2={cp2y} stroke={`${color}50`} strokeWidth="1.2" strokeDasharray="3,2" />
      {/* Control points */}
      <circle cx={cp1x} cy={cp1y} r={3.5} fill={`${color}55`} stroke={`${color}99`} strokeWidth="1" />
      <circle cx={cp2x} cy={cp2y} r={3.5} fill={`${color}55`} stroke={`${color}99`} strokeWidth="1" />
      {/* Curve */}
      <path d={path} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Endpoints */}
      <circle cx={sx} cy={sy} r={3} fill={color} />
      <circle cx={ex} cy={ey} r={3} fill={color} />
    </svg>
  )
}

/* ── Easing live demo ── */
const EASINGS_DATA = [
  { name: 'easingSharp',  val: easingSharp,  x1: 0.40, y1: 0.00, x2: 0.60, y2: 1.00, ms: animSlow,    color: gold,         desc: 'Panely, rozvíjení' },
  { name: 'easingBounce', val: easingBounce, x1: 0.34, y1: 1.56, x2: 0.64, y2: 1.00, ms: animNormal,  color: gainColor,    desc: 'Pop, spawn, VP gain' },
  { name: 'easingEnter',  val: easingEnter,  x1: 0.00, y1: 0.00, x2: 0.20, y2: 1.00, ms: animSlow,    color: warningColor, desc: 'Příchozí elementy' },
  { name: 'easingExit',   val: easingExit,   x1: 0.40, y1: 0.00, x2: 1.00, y2: 1.00, ms: animNormal,  color: dangerColor,  desc: 'Odcházející elementy' },
]

const PLAY_BTN = {
  padding: '5px 14px', fontSize: '0.75rem', borderRadius: 3, cursor: 'pointer',
  border: `1px solid ${gold}66`, background: `${gold}12`, color: gold,
  fontWeight: 600, letterSpacing: '0.04em',
}
const RESET_BTN = {
  padding: '5px 12px', fontSize: '0.75rem', borderRadius: 3, cursor: 'pointer',
  border: `1px solid ${borderDefault}`, background: 'transparent', color: textMid,
}

function EasingLiveDemo() {
  const [phase, setPhase] = useState('idle') // 'idle' | 'running'
  const TRAVEL = 132 // px — fits track, bounce overshoots slightly (visual OK)

  return (
    <div>
      {/* Bezier curve SVGs */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24, justifyContent: 'flex-start' }}>
        {EASINGS_DATA.map(e => (
          <div key={e.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <BezierCurve x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} color={e.color} />
            <code style={{ fontSize: '0.625rem', color: e.color, letterSpacing: '0.04em', textAlign: 'center' }}>{e.name}</code>
            <span style={{ fontSize: '0.5625rem', color: textFaint, textAlign: 'center', maxWidth: 88, lineHeight: 1.3 }}>{e.desc}</span>
          </div>
        ))}
      </div>

      {/* Live animation tracks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
        {EASINGS_DATA.map(e => (
          <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <code style={{ width: 132, fontSize: '0.6875rem', color: e.color, flexShrink: 0 }}>{e.name}</code>
            <div style={{ width: 210, height: 32, background: bgDeep, borderRadius: 3, position: 'relative', flexShrink: 0 }}>
              <div style={{
                position: 'absolute', top: 4, left: 4,
                width: 24, height: 24,
                background: `${e.color}1E`,
                border: `1.5px solid ${e.color}88`,
                borderRadius: 3,
                transform: phase === 'running' ? `translateX(${TRAVEL}px)` : 'translateX(0)',
                transition: phase === 'running' ? `transform ${e.ms}ms ${e.val}` : 'none',
              }} />
              {/* Target marker */}
              <div style={{
                position: 'absolute', right: 4, top: 6, bottom: 6,
                width: 1, background: `${e.color}30`,
              }} />
            </div>
            <span style={{ fontSize: '0.6875rem', color: textFaint, flexShrink: 0 }}>{e.ms} ms</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          style={{ ...PLAY_BTN, opacity: phase === 'running' ? 0.5 : 1, cursor: phase === 'running' ? 'default' : 'pointer' }}
          disabled={phase === 'running'}
          onClick={() => setPhase('running')}
        >
          ▶ Přehrát
        </button>
        <button style={RESET_BTN} onClick={() => setPhase('idle')}>
          ↺ Reset
        </button>
      </div>
    </div>
  )
}

/* ── Timing × Easing pairing table ── */
const PAIRINGS = [
  { scenario: 'Hover / focus stav',          timing: 'animNormal', ms: animNormal, easing: 'easingSharp',  val: easingSharp,  example: 'Button hover, input border, tab aktivace' },
  { scenario: 'Tooltip / Toast appear',       timing: 'animFast',   ms: animFast,   easing: 'easingEnter',  val: easingEnter,  example: 'DonjonTooltip, DonjonToast slide in' },
  { scenario: 'Panel / sidebar slide in',     timing: 'animSlow',   ms: animSlow,   easing: 'easingEnter',  val: easingEnter,  example: 'GameTransition slideUp, EventLog open' },
  { scenario: 'Panel / overlay slide out',    timing: 'animNormal', ms: animNormal, easing: 'easingExit',   val: easingExit,   example: 'GameTransition exit, Modal close' },
  { scenario: 'VP gain / spawn / pop',        timing: 'animNormal', ms: animNormal, easing: 'easingBounce', val: easingBounce, example: 'FloatFeedback, NumericDisplay change' },
  { scenario: 'Modal otevření',               timing: 'animSlow',   ms: animSlow,   easing: 'easingEnter',  val: easingEnter,  example: 'DonjonModal backdrop + panel' },
  { scenario: 'Dramatická výhra / výsledek',  timing: 'animDramatic', ms: animDramatic, easing: 'easingBounce', val: easingBounce, example: 'Win screen, achievement unlock' },
  { scenario: 'Herní přechod (GameTransition)', timing: 'animSlow', ms: animSlow, easing: 'easingSharp',  val: easingSharp,  example: 'Výchozí preset fadeScale' },
]

function PairingTable() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 110px 130px 1fr', gap: 8, padding: '6px 10px', borderBottom: `1px solid ${borderDefault}` }}>
        {['Scénář', 'Timing', 'Easing', 'Příklad'].map(h => (
          <span key={h} style={{ fontSize: '0.625rem', color: textFaint, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
        ))}
      </div>
      {PAIRINGS.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 110px 130px 1fr', gap: 8, padding: '7px 10px', background: i % 2 === 0 ? `${borderDefault}0A` : 'transparent', borderRadius: 3, alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: textMid, lineHeight: 1.3 }}>{row.scenario}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 24, height: 5, background: `${gold}33`, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ width: `${Math.min((row.ms / animDramatic) * 100, 100)}%`, height: '100%', background: `${gold}99`, borderRadius: 2 }} />
            </div>
            <code style={{ fontSize: '0.6875rem', color: gold }}>{row.timing}</code>
          </div>
          <code style={{ fontSize: '0.6875rem', color: textParchment }}>{row.easing}</code>
          <span style={{ fontSize: '0.6875rem', color: textFaint, lineHeight: 1.4 }}>{row.example}</span>
        </div>
      ))}
    </div>
  )
}

function TimingRow({ name, ms, label }) {
  const pct = Math.min((ms / animDramatic) * 100, 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <code style={{ width: 120, fontSize: '0.75rem', color: gold, flexShrink: 0 }}>{name}</code>
      <div style={{ width: 160, height: 6, background: bgDeep, borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: `${gold}88`, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: '0.75rem', color: textMid, width: 50, textAlign: 'right', flexShrink: 0 }}>{ms} ms</span>
      <span style={{ fontSize: '0.75rem', color: textFaint }}>{label}</span>
    </div>
  )
}

export default function MotionPage() {
  const a1 = useGameAnimation()
  const a2 = useGameAnimation()
  const a3 = useGameAnimation()
  const a4 = useGameAnimation()
  const a5 = useGameAnimation()
  const a6 = useGameAnimation()
  const a7 = useGameAnimation()
  const a8 = useGameAnimation()

  const [tPreset, setTPreset] = useState('fadeScale')
  const [showT, setShowT] = useState(true)

  function cycleTransition() {
    setShowT(false)
    setTimeout(() => setShowT(true), 350)
  }

  const PRESETS = Object.keys(gameTransitionPresets)

  return (
    <div style={PAGE}>
      <h1 style={H1}>Motion & Animace</h1>
      <p style={{ fontSize: '0.875rem', color: textMid, marginBottom: 32 }}>
        Animační systém: timing tokeny, Web Animations API hook a GameTransition wrapper.
        Konzistentní timing, zero-dependency animace, žádné magic numbers napříč library.
      </p>

      <Section
        id="plain-baseline"
        title="Plain baseline transition wrapper"
        desc="GameTransition je záměrně plain infrastrukturní vrstva pro mount a unmount animace. V donjon konzistenci nese timing a pohybový jazyk, ne ornamentální shell nebo dekorativní overlaye."
      >
        <Demo style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: textMid, lineHeight: 1.6, maxWidth: 640 }}>
            Používej ho jako neutrální obal kolem panelů, HUD bloků a dialogů. Vizuální identita zůstává na dětech uvnitř; samotný wrapper má držet jen konzistentní enter a exit chování.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <AnimBox label="fadeScale" color={gold} />
            <AnimBox label="slideUp" color={warningColor} />
            <AnimBox label="pop" color={gainColor} />
          </div>
        </Demo>
        <Code>{`{/* GameTransition zůstává záměrně plain baseline motion wrapper */}
<GameTransition show={isOpen} preset="fadeScale">
  <PlayerPanel name="Hráč 1" vp={7} />
</GameTransition>`}</Code>
      </Section>

      {/* ── Timing tokeny ── */}
      <Section id="timing" title="Timing tokeny" desc="Čtyři pojmenované rychlosti — konzistentní přechody bez magic čísel.">
        <Demo>
          <TimingRow name="animFast"     ms={animFast}     label="Tooltip, damage flash, okamžité UI reakce" />
          <TimingRow name="animNormal"   ms={animNormal}   label="Hover, focus, přechod stavů komponent" />
          <TimingRow name="animSlow"     ms={animSlow}     label="Otevření panelů, slide, GameTransition default" />
          <TimingRow name="animDramatic" ms={animDramatic} label="Výsledek souboje, výhra, dramatický reveal" />
        </Demo>
        <Code>{`import { animFast, animNormal, animSlow, animDramatic } from 'donjon-fall-ui/tokens'
// nebo z CSS: var(--donjon-anim-normal)

const style = {
  transition: \`background \${animNormal}ms \${easingEnter}, transform \${animSlow}ms \${easingBounce}\`,
}

// CSS:
// .my-element { transition: background var(--donjon-anim-normal) var(--donjon-ease-enter); }`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Easing ── */}
      <Section id="easing" title="Easing křivky" desc="Čtyři pojmenované křivky — vizualizace Bézierovy křivky, živé porovnání pohybu a referenční hodnoty.">
        <Demo>
          <EasingLiveDemo />
        </Demo>
        {/* Reference hodnot */}
        <Demo style={{ marginTop: 8 }}>
          {EASINGS_DATA.map(e => (
            <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <code style={{ width: 132, fontSize: '0.6875rem', color: e.color, flexShrink: 0 }}>{e.name}</code>
              <code style={{ fontSize: '0.6375rem', color: textParchment, flex: 1, letterSpacing: '0.01em' }}>{e.val}</code>
              <span style={{ fontSize: '0.6375rem', color: textFaint, minWidth: 160, textAlign: 'right' }}>{e.desc}</span>
            </div>
          ))}
        </Demo>
        <Code>{`import { easingSharp, easingBounce, easingEnter, easingExit } from 'donjon-fall-ui/tokens'
// nebo z CSS: var(--donjon-ease-bounce)

// Konvence použití:
// spawn / pop / VP gain  → easingBounce   (živý overshoot, fyzický pocit)
// panel / sidebar in     → easingEnter    (zpomalení na konci = "přistání")
// overlay / modal out    → easingExit     (rychlý odchod)
// hover / focus / toggle → easingSharp    (plynulý in-out)

el.animate([
  { transform: 'scale(0.6)', opacity: 0 },
  { transform: 'scale(1)',   opacity: 1 },
], { duration: animNormal, easing: easingBounce })`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Timing × Easing pairing ── */}
      <Section id="pairing" title="Timing × Easing — přehled kombinací" desc="Referenční tabulka doporučených párování pro nejčastější herní scénáře.">
        <Demo style={{ padding: '12px 0' }}>
          <PairingTable />
        </Demo>
        <Code>{`// Rychlý přehled: scénář → { timing, easing }
//
//  hover / focus      animNormal (160ms)  +  easingSharp
//  tooltip / toast    animFast   (80ms)   +  easingEnter
//  panel slide-in     animSlow   (300ms)  +  easingEnter
//  panel slide-out    animNormal (160ms)  +  easingExit
//  VP gain / spawn    animNormal (160ms)  +  easingBounce
//  win screen / drama animDramatic (600ms)+  easingBounce
//  GameTransition     animSlow   (300ms)  +  easingSharp  (výchozí preset)
`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── useGameAnimation ── */}
      <Section id="hook" title="useGameAnimation hook" desc="Přímé programatické animace přes Web Animations API — žádné CSS třídy.">
        <Demo>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>

            {[
              { anim: a1, label: 'Shake', color: dangerColor,  btn: 'Neúspěch', fn: () => a1.shake() },
              { anim: a2, label: 'Knockback', color: dangerColor, btn: 'Zásah',    fn: () => a2.knockback(0, -12) },
              { anim: a3, label: 'Pop',    color: gainColor,   btn: 'Spawn',    fn: () => a3.pop() },
              { anim: a4, label: 'Pulse',  color: gold,        btn: 'Na tahu',  fn: () => a4.pulse() },
              { anim: a5, label: 'Flash',  color: gainColor,   btn: '+VP',      fn: () => a5.flash(gainColor) },
              { anim: a6, label: 'Tilt',   color: warningColor,btn: 'Magie',    fn: () => a6.tilt() },
              { anim: a7, label: 'FadeIn', color: gold,        btn: 'FadeIn',   fn: () => a7.fadeIn() },
              { anim: a8, label: 'Victory',color: gold,        btn: 'Výhra!',   fn: () => a8.victory() },
            ].map(({ anim, label, color, btn, fn }) => (
              <div key={label} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                <div ref={anim.ref}>
                  <AnimBox label={label} color={color} />
                </div>
                <DonjonButton size="sm" variant={color === dangerColor ? 'danger' : 'default'} onClick={fn}>{btn}</DonjonButton>
              </div>
            ))}

          </div>
        </Demo>
        <Code>{`import useGameAnimation from 'donjon-fall-ui/useGameAnimation'

const { ref, shake, knockback, pop, pulse, flash, tilt, fadeIn, fadeOut, victory } = useGameAnimation()

// Ref připojíš na libovolný DOM element:
<div ref={ref}><HexTile /></div>

// Animace na události:
onClick={() => shake()              // neúspěch
onHit={() => knockback(0, -8)      // fyzický zásah
onSpawn={() => pop()               // spawn / appear
onTurn={() => pulse()              // "na tahu"
onVpGain={() => flash(gainColor)   // zisk VP / resource
onGameEnd={() => victory()         // výsledek`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── GameTransition ── */}
      <Section id="transition" title="GameTransition" desc="Enter/exit animace s automatickým mount/unmount. Žádné závislosti.">
        <Demo>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', color: textFaint, margin: '0 0 8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Preset</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {PRESETS.map(p => (
                  <button
                    key={p}
                    onClick={() => setTPreset(p)}
                    style={{
                      padding: '4px 9px', fontSize: '0.7rem', borderRadius: 3, cursor: 'pointer',
                      border: `1px solid ${tPreset === p ? gold : borderDefault}`,
                      background: tPreset === p ? `${gold}18` : 'transparent',
                      color: tPreset === p ? gold : textMid,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <DonjonButton size="sm" onClick={cycleTransition}>Spustit animaci</DonjonButton>
            </div>

            <div style={{ flex: 1, minWidth: 180, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GameTransition show={showT} preset={tPreset}>
                <div style={{
                  background: bg3, border: `1px solid ${gold}55`, borderRadius: 6,
                  padding: '14px 22px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.1rem', marginBottom: 3 }}>⚔</div>
                  <div style={{ fontSize: '0.8rem', color: gold, fontWeight: 600 }}>Herní element</div>
                  <div style={{ fontSize: '0.7rem', color: textFaint, marginTop: 2 }}>{tPreset}</div>
                </div>
              </GameTransition>
            </div>
          </div>
        </Demo>
        <Code>{`import GameTransition from 'donjon-fall-ui/GameTransition'

// Panel přicházející odspodu:
<GameTransition show={isPanelOpen} preset="slideUp">
  <PlayerPanel name="Hráč 1" isActive />
</GameTransition>

// Výsledkový dialog — pop s bounce:
<GameTransition show={gameOver} preset="pop" duration={400} onExited={cleanup}>
  <DonjonCard title="Výsledek">
    <NumericDisplay value={vp} label="VP" variant="vp" size="lg" />
  </DonjonCard>
</GameTransition>

// Presety: fadeScale | slideUp | slideDown | pop | fade | slideLeft
// Props:   show, preset, duration, onExited, as, style, className

// Render jako list item (sémantický wrapper):
<GameTransition show={isVisible} preset="slideUp" as="li">
  <PlayerPanel name="Hráč 2" />
</GameTransition>

// Render jako section (custom HTML tag):
<GameTransition show={panelOpen} preset="fadeScale" as="section">
  <DonjonCard title="Inventář" />
</GameTransition>`}</Code>
      </Section>

      <div style={DIVIDER} />

      <div style={DIVIDER} />

      {/* ── Kombinace ── */}
      <Section id="kombinace" title="Herní kombinace" desc="Všechny animační nástroje dohromady.">
        <Demo>
          <PlayerPanel
            name="Hráč 1"
            // eslint-disable-next-line donjon/no-hardcoded-hex -- demo player color (demo data, ne styling token)
            color="#4A90E2"
            symbol="sword"
            vp={7}
            hp={72}
            maxHp={100}
            isActive
          />
          <p style={{ fontSize: '0.75rem', color: textFaint, margin: '14px 0 0' }}>
            PlayerPanel s isActive (golden glow). Obal ho do <code style={{ color: gold }}>{'<GameTransition>'}</code> pro slide-in
            a použij <code style={{ color: gold }}>useGameAnimation</code> pro <code style={{ color: gold }}>knockback()</code> při zásahu.
          </p>
        </Demo>
        <Code>{`function GamePlayerPanel({ player, visible }) {
  const { ref, pop, knockback, victory } = useGameAnimation()

  useEffect(() => { if (visible) pop() }, [visible])
  useEffect(() => { if (player.wasHit) knockback(0, -8) }, [player.wasHit])
  useEffect(() => { if (player.won) victory() }, [player.won])

  return (
    <GameTransition show={visible} preset="slideLeft">
      <div ref={ref}>
        <PlayerPanel {...player} />
      </div>
    </GameTransition>
  )
}`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Pravidla ── */}
      <Section id="pravidla" title="Pravidla použití">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            ['✓', `Vždy používej pojmenované tokeny (animFast, easingBounce) — žádná magic čísla v kódu.`],
            ['✓', `Délka odpovídá důležitosti: rychlé UI reakce 80 ms, přechody 160–300 ms, dramatické herní eventy 600 ms.`],
            ['✓', `Vstupní animace (easingEnter) jsou delší než výstupní (easingExit) — hráč potřebuje čas "přistání" vidět.`],
            ['✓', `easingBounce pouze pro herní feedback (VP, spawn) — ne pro funkční UI přechody (modal, hover).`],
            ['✓', `GameTransition vždy pro mount/unmount UI prvků — nikdy neměň herní stav uprostřed přechodu.`],
            ['✓', `Respektuj prefers-reduced-motion — animace s herním obsahem zakázat, funkční (loading spinner) ponechat.`],
            ['✗', `Nespouštěj více dramatických animací najednou — jedna dramatická animace na scénu.`],
            ['✗', `Neopakuj animace v smyčce pro dekoraci — herní UI není demo reel, pohyb musí nést informaci.`],
          ].map(([icon, text], i) => (
            <p key={i} style={{ margin: 0, fontSize: '0.8125rem', color: icon === '✓' ? textMid : textFaint, display: 'flex', gap: 8, lineHeight: 1.5 }}>
              <span style={{ color: icon === '✓' ? gainColor : dangerColor, flexShrink: 0 }}>{icon}</span>
              {text}
            </p>
          ))}
        </div>
      </Section>
    </div>
  )
}
