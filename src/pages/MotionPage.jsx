import { useState, useEffect } from 'react'
import useGameAnimation from '../lib/donjon/useGameAnimation'
import GameTransition, { gameTransitionPresets } from '../lib/donjon/GameTransition'
import DonjonButton from '../lib/donjon/DonjonButton'
import PlayerPanel from '../lib/donjon/PlayerPanel'
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
      <Section id="easing" title="Easing křivky" desc="Pojmenované easing funkce — stejný slovník v celé library.">
        <Demo>
          {[
            { name: 'easingSharp',  val: easingSharp,  label: 'In-out pro panely, rozvíjení' },
            { name: 'easingBounce', val: easingBounce, label: 'Overshoot — pop, spawn, herní feedback' },
            { name: 'easingEnter',  val: easingEnter,  label: 'Ease-out — příchozí elementy' },
            { name: 'easingExit',   val: easingExit,   label: 'Ease-in — odcházející elementy' },
          ].map(e => (
            <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <code style={{ width: 130, fontSize: '0.75rem', color: gold, flexShrink: 0 }}>{e.name}</code>
              <code style={{ fontSize: '0.68rem', color: textParchment, flex: 1 }}>{e.val}</code>
              <span style={{ fontSize: '0.7rem', color: textFaint, minWidth: 200, textAlign: 'right' }}>{e.label}</span>
            </div>
          ))}
        </Demo>
        <Code>{`// Herní konvence:
// spawn / pop       → easingBounce   (živý overshoot, fyzický pocit)
// panel otevření    → easingSharp    (plynulý in-out)
// příchod elementu  → easingEnter    (zpomalení na konci)
// zmizení           → easingExit     (rychlý odchod)

import { easingBounce } from 'donjon-fall-ui/tokens'
el.animate([
  { transform: 'scale(0.6)', opacity: 0 },
  { transform: 'scale(1)',   opacity: 1 },
], { duration: animNormal, easing: easingBounce })`}</Code>
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
onVpGain={() => flash('#50B86C')   // zisk VP / resource
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
// Props:   show, preset, duration, onExited, as, style, className`}</Code>
      </Section>

      <div style={DIVIDER} />

      {/* ── Kombinace ── */}
      <Section id="kombinace" title="Herní kombinace" desc="Všechny animační nástroje dohromady.">
        <Demo>
          <PlayerPanel
            name="Hráč 1"
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
    </div>
  )
}
