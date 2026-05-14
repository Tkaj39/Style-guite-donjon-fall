import { useState, useRef } from 'react'
import DonjonCard from '../lib/donjon/DonjonCard'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import DieFace from '../lib/donjon/DieFace'
import FloatFeedback from '../lib/donjon/FloatFeedback'
import HexTile from '../lib/donjon/HexTile'
import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import { players } from '../data/gameUiMockData'

/* ── Static spec helpers ── */

function AnimSpec({ duration, easing, trigger, description, children }) {
  return (
    <DonjonCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <DonjonBadge variant="default">{duration}</DonjonBadge>
          <DonjonBadge variant="default">{easing}</DonjonBadge>
          <DonjonBadge variant="info">{trigger}</DonjonBadge>
        </div>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.6 }}>
          {description}
        </p>
        {children && (
          <div style={{ borderTop: '1px solid #2A2948', paddingTop: 12 }}>
            {children}
          </div>
        )}
      </div>
    </DonjonCard>
  )
}

function Arrow() {
  return <span style={{ color: '#4A4560', fontSize: '1.1rem', lineHeight: 1, flexShrink: 0 }}>→</span>
}

function FrameRow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {children}
    </div>
  )
}

/* Hex s jednou kostkou — střed kostky = střed hexu (72px / 2 = 36, sm die 32px → bottom: 20) */
function HexWithDie({ hexState = 'empty', owner, dieValue, dieColor, dieState = 'default' }) {
  return (
    <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
      <HexTile state={hexState} owner={owner} size="md" />
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <DieFace value={dieValue} playerColor={dieColor} size="sm" state={dieState} />
      </div>
    </div>
  )
}

/* Hex s věží — spodní kostka na středu hexu (top: 20), každá další posunuta o 16px (půlka sm kostky) nahoru.
   zIndex zajistí že vrchní kostka vždy překrývá spodní ve vzájemném překryvu. */
function HexWithTower({ hexState = 'empty', owner, dice }) {
  // dice[0] = vrchní kostka, dice[N-1] = spodní kostka
  const N = dice.length
  return (
    <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
      <HexTile state={hexState} owner={owner} size="md" />
      {dice.map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: 20 - (N - 1 - i) * 16,   // spodní kostka: top=20 (střed na y=36), každá výš o 16px
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: N - i,                  // vrchní kostka má nejvyšší z-index
        }}>
          <DieFace value={d.value} playerColor={d.color} size="sm" state={d.state} />
        </div>
      ))}
    </div>
  )
}

/* ── Live demo helpers ── */

function PlayButton({ onClick, playing }) {
  return (
    <button
      onClick={onClick}
      disabled={playing}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: playing ? '#1B1A30' : '#2A2948',
        border: `1px solid ${playing ? '#3A3858' : '#5A5878'}`,
        borderRadius: 4, padding: '5px 14px',
        fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em',
        color: playing ? '#4A4560' : '#D4C5A9',
        cursor: playing ? 'default' : 'pointer',
        transition: 'background 150ms, color 150ms',
      }}
    >
      {playing ? '···' : '▶ Přehrát'}
    </button>
  )
}

function DemoShell({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', width: '100%' }}>
      <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label ?? 'Live demo'}
      </p>
      {children}
    </div>
  )
}

/* ── Individual demo components ── */

function MoveDieDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Pohyb kostky — live demo">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Zdrojový hex — kostka startuje odtud; zIndex: 1 zajistí překrytí cílového hexu při pohybu */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <div key={key}
              style={{ animation: key > 0 ? 'die-move 260ms ease-in-out both' : 'none' }}
              onAnimationEnd={() => setPlaying(false)}>
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </div>
          </div>
        </div>
        {/* Cílový hex */}
        <HexTile state="move" size="md" />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function MoveTowerDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Pohyb věže — live demo">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Zdrojový hex — věž startuje odtud; zIndex: 1 překryje cílový hex při pohybu */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state="selected" size="md" />
          {/* Animovaný wrapper = celá věž se přesune najednou */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            <div key={key}
              style={{
                position: 'relative', width: '100%', height: '100%', overflow: 'visible',
                animation: key > 0 ? 'die-move 320ms ease-in-out both' : 'none',
              }}
              onAnimationEnd={() => setPlaying(false)}>
              {/* Vrchní kostka (i=0, N=2): top = 20 - 1×16 = 4 */}
              <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
              </div>
              {/* Spodní kostka (i=1, N=2): top = 20 */}
              <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                <DieFace value={2} playerColor={p1.color} size="sm" />
              </div>
            </div>
          </div>
        </div>
        {/* Cílový hex */}
        <HexTile state="move" size="md" />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function CombatPhase1Demo() {
  const [key, setKey] = useState(0)
  const [value, setValue] = useState(5)
  const [showFeedback, setShowFeedback] = useState(false)
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setValue(5)
    setShowFeedback(false)
    setPlaying(true)
    setKey(k => k + 1)
  }

  function handleEnd() {
    setValue(v => Math.max(v - 1, 1))
    setShowFeedback(true)
    setPlaying(false)
  }

  return (
    <DemoShell label="Fáze 1 — impakt (shake + −1)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <div key={key}
              style={{ animation: key > 0 ? 'die-shake 180ms ease-in both' : 'none' }}
              onAnimationEnd={handleEnd}>
              <DieFace value={value} playerColor={p1.color} size="sm" />
            </div>
          </div>
          <FloatFeedback
            text="−1"
            variant="loss"
            visible={showFeedback}
            animKey={key}
            onDone={() => setShowFeedback(false)}
            style={{ top: 0 }}
          />
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function PushDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Push — formace odsunuta (bounce)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Útočník */}
        <HexWithDie hexState="selected" dieValue={5} dieColor={p1.color} />
        <Arrow />
        {/* Obránce — odsunut */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="base" owner={p2.color} size="md" />
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <div key={key}
              style={{ animation: key > 0 ? 'formation-push 320ms ease-out both' : 'none' }}
              onAnimationEnd={() => setPlaying(false)}>
              <DieFace value={2} playerColor={p2.color} size="sm" />
            </div>
          </div>
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function OccupyDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [landed, setLanded] = useState(false)

  function play() {
    if (playing) return
    setLanded(false)
    setPlaying(true)
    setKey(k => k + 1)
  }

  function handleEnd() {
    setLanded(true)
    setPlaying(false)
  }

  return (
    <DemoShell label="Occupy — útočník přistane na obránci">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="base" owner={p2.color} size="md" />
          {/* Obránce — spodní kostka věže, střed na y=36 (top: 20), zIndex: 1 */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <DieFace value={2} playerColor={p2.color} size="sm" />
          </div>
          {/* Útočník — vrchní kostka věže, finální top: 4 (= top 20 - 16px krok), padá shora, zIndex: 2 */}
          <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
            <div key={key}
              style={{ animation: key > 0 ? 'die-drop 240ms ease-in-out both' : 'none' }}
              onAnimationEnd={handleEnd}>
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </div>
          </div>
        </div>
        {landed && <DonjonBadge variant="warning">Smíšená věž</DonjonBadge>}
        <DonjonBadge variant="default">Obránce nepřehazuje</DonjonBadge>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Akční reroll — hodnota může jen růst nebo zůstat */
function RerollActionDemo() {
  const [key, setKey] = useState(0)
  const [value, setValue] = useState(3)
  const [showFeedback, setShowFeedback] = useState(false)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef(null)

  function play() {
    if (playing) return
    setValue(3)
    setShowFeedback(false)
    setPlaying(true)
    setKey(k => k + 1)
    timerRef.current = setTimeout(() => setValue(5), 200)
  }

  function handleEnd() {
    setShowFeedback(true)
    setPlaying(false)
  }

  const diff = value - 3
  const feedbackText = diff > 0 ? `+${diff}` : '='
  const feedbackVariant = diff > 0 ? 'gain' : 'neutral'

  return (
    <DemoShell label="Akční reroll — stejná nebo vyšší">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', perspective: 200 }}>
            <div key={key}
              style={{ animation: key > 0 ? 'die-reroll-spin 500ms ease-in-out both' : 'none' }}
              onAnimationEnd={handleEnd}>
              <DieFace value={value} playerColor={p1.color} size="sm" />
            </div>
          </div>
          <FloatFeedback text={feedbackText} variant={feedbackVariant}
            visible={showFeedback} animKey={key}
            onDone={() => setShowFeedback(false)} style={{ top: 0 }} />
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Ohniskový reroll — hodnota může jen klesnout: min(hod, původní − 1) */
function RerollFocalDemo() {
  const [key, setKey] = useState(0)
  const [value, setValue] = useState(4)
  const [showFeedback, setShowFeedback] = useState(false)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef(null)

  function play() {
    if (playing) return
    setValue(4)
    setShowFeedback(false)
    setPlaying(true)
    setKey(k => k + 1)
    // Výsledek = min(hod, 3) → ukážeme 2
    timerRef.current = setTimeout(() => setValue(2), 200)
  }

  function handleEnd() {
    setShowFeedback(true)
    setPlaying(false)
  }

  const diff = value - 4
  const feedbackText = diff < 0 ? `${diff}` : '='
  const feedbackVariant = diff < 0 ? 'loss' : 'neutral'

  return (
    <DemoShell label="Ohniskový reroll — min(hod, původní−1)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="focal-active" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', perspective: 200 }}>
            <div key={key}
              style={{ animation: key > 0 ? 'die-reroll-spin 500ms ease-in-out both' : 'none' }}
              onAnimationEnd={handleEnd}>
              <DieFace value={value} playerColor={p1.color} size="sm" />
            </div>
          </div>
          <FloatFeedback text={feedbackText} variant={feedbackVariant}
            visible={showFeedback} animKey={key}
            onDone={() => setShowFeedback(false)} style={{ top: 0 }} />
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function CollapseDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [showVP, setShowVP] = useState(false)

  function play() {
    if (playing) return
    setCollapsed(false)
    setShowVP(false)
    setPlaying(true)
    setKey(k => k + 1)
  }

  function handleEnd() {
    setCollapsed(true)
    setShowVP(true)
    setPlaying(false)
  }

  // 3-kostkova věž: top=20-2×16=-12, mid=20-1×16=4, bot=20
  // 2-kostkova věž po kolapsu: top=20-1×16=4, bot=20
  return (
    <DemoShell label="Kolaps věže — spodní kostka zmizí">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="base" owner={p1.color} size="md" />
          {collapsed ? (
            // Po kolapsu — 2-kostkova věž, spodní kostka na středu
            <>
              <div style={{ position: 'absolute', top: 4,  left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
              </div>
              <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                <DieFace value={3} playerColor={p1.color} size="sm" />
              </div>
            </>
          ) : (
            // 3-kostkova věž — spodní (damaged) se animuje ven
            <>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
              </div>
              <div style={{ position: 'absolute', top: 4,  left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                <DieFace value={3} playerColor={p1.color} size="sm" />
              </div>
              <div key={key} style={{
                position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1,
                animation: key > 0 ? 'die-collapse 300ms ease-in forwards' : 'none',
              }}
              onAnimationEnd={handleEnd}>
                <DieFace value={1} playerColor={p2.color} size="sm" state="damaged" />
              </div>
            </>
          )}
          {/* VP feedback — zlatý, při kolapsu spodní kostky */}
          <FloatFeedback text="+1 VP" variant="vp" visible={showVP} animKey={key}
            onDone={() => setShowVP(false)} style={{ top: 0 }} />
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function FocalDemo() {
  const [hexKey, setHexKey] = useState(0)
  const [dieKey, setDieKey] = useState(0)
  const [dieValue, setDieValue] = useState(4)
  const [playing, setPlaying] = useState(false)
  const [phase, setPhase] = useState('idle') // 'idle' | 'pulsing' | 'rerolling' | 'done'
  const [showVP, setShowVP] = useState(false)
  const [showLoss, setShowLoss] = useState(false)
  const focalTimerRef = useRef(null)

  function play() {
    if (playing) return
    clearTimeout(focalTimerRef.current)
    setDieValue(4)
    setShowVP(false)
    setShowLoss(false)
    setPhase('pulsing')
    setPlaying(true)
    setHexKey(k => k + 1)
    // VP feedback appears shortly into the pulse
    focalTimerRef.current = setTimeout(() => setShowVP(true), 80)
  }

  function handlePulseEnd() {
    if (phase !== 'pulsing') return
    setPhase('rerolling')
    setDieKey(k => {
      const next = k + 1
      // Switch die value at 40% of 500ms (when rotateY = 90° and die is invisible)
      focalTimerRef.current = setTimeout(() => setDieValue(2), 200)
      return next
    })
  }

  function handleRerollEnd() {
    setShowLoss(true)
    setPhase('done')
    setPlaying(false)
  }

  const focalState = phase === 'done' ? 'focal-passive' : 'focal-active'

  return (
    <DemoShell label="Ohnisko — záblesk + VP + ohniskový reroll">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Ohniskový hex s kostkou — obě vrstvy v position:relative containeru */}
        <div style={{ position: 'relative', width: 62, height: 72, overflow: 'visible' }}>
          {/* Hex vrstva — pulsuje */}
          <div key={hexKey}
            style={{
              position: 'absolute', inset: 0, overflow: 'visible',
              animation: hexKey > 0 ? 'hex-focal-pulse 500ms ease-out both' : 'none',
            }}
            onAnimationEnd={() => handlePulseEnd()}>
            <HexTile state={focalState} size="md" />
          </div>
          {/* Kostka na ohnisku — ohniskový reroll spin */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', perspective: 200, zIndex: 2 }}>
            <div key={dieKey}
              style={{ animation: dieKey > 0 ? 'die-reroll-spin 500ms ease-in-out both' : 'none' }}
              onAnimationEnd={handleRerollEnd}>
              <DieFace value={dieValue} playerColor={p1.color} size="sm" />
            </div>
          </div>
          {/* VP feedback — zlatý, při pulsu */}
          <FloatFeedback text="+1 VP" variant="vp" visible={showVP} animKey={hexKey}
            onDone={() => setShowVP(false)} style={{ top: 0 }} />
          {/* Loss feedback — červený, po ohniskovém rerollu */}
          <FloatFeedback text="−2" variant="loss" visible={showLoss} animKey={dieKey}
            onDone={() => setShowLoss(false)} style={{ top: 0 }} />
        </div>
        {phase === 'done' && (
          <>
            <Arrow />
            <HexTile state="focal-active" size="md" />
          </>
        )}
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* ── Move variant demos ── */

function MoveTwoHexDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Pohyb o dvě políčka">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <div key={key}
              style={{ animation: key > 0 ? 'die-move-2 380ms ease-in-out both' : 'none' }}
              onAnimationEnd={() => setPlaying(false)}>
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </div>
          </div>
        </div>
        <HexTile state="move" size="md" />
        <HexTile state="move" size="md" />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function JumpOntoDieDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [landed, setLanded] = useState(false)

  function play() {
    if (playing) return
    setLanded(false)
    setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Naskočení na kostku">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Levý hex — skákající kostka; zIndex:1 překryje pravý hex při pohybu */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state={landed ? 'empty' : 'selected'} size="md" />
          {!landed && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <div key={key}
                style={{ animation: key > 0 ? 'die-move-onto 280ms ease-in-out both' : 'none' }}
                onAnimationEnd={() => { setLanded(true); setPlaying(false) }}>
                <DieFace value={4} playerColor={p1.color} size="sm" />
              </div>
            </div>
          )}
        </div>
        {/* Pravý hex — cílová kostka + přistání */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="base" owner={p2.color} size="md" />
          {/* Spodní kostka věže (vždy viditelná) */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <DieFace value={2} playerColor={p2.color} size="sm" />
          </div>
          {/* Vrchní kostka po přistání */}
          {landed && (
            <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </div>
          )}
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function JumpOffTowerDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [moved, setMoved] = useState(false)

  function play() {
    if (playing) return
    setMoved(false)
    setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Seskočení z vrcholu věže">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Levý hex — věž, vrchní kostka odskočí; zIndex:1 */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state="base" owner={p1.color} size="md" />
          {/* Spodní kostka — vždy zůstává */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <DieFace value={2} playerColor={p1.color} size="sm" />
          </div>
          {/* Vrchní kostka — animuje pryč */}
          {!moved && (
            <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <div key={key}
                style={{ animation: key > 0 ? 'die-move-off-tower 280ms ease-in-out both' : 'none' }}
                onAnimationEnd={() => { setMoved(true); setPlaying(false) }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
              </div>
            </div>
          )}
        </div>
        {/* Pravý hex — prázdný cíl */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="move" size="md" />
          {moved && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <DieFace value={5} playerColor={p1.color} size="sm" />
            </div>
          )}
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* ── Nice To Have demos ── */

/* Highlight vrchní kostky věže — záblesk před akcí (shake) */
function TopDieHighlightDemo() {
  const [highlightKey, setHighlightKey] = useState(0)
  const [shakeKey,     setShakeKey]     = useState(0)
  const [topValue,     setTopValue]     = useState(5)
  const [showFeedback, setShowFeedback] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setTopValue(5); setShowFeedback(false)
    setPhase('highlight'); setPlaying(true)
    setHighlightKey(k => k + 1)
  }

  function handleHighlightEnd(e) {
    // Animationend bubbluje — reaguj jen na vlastní animaci
    if (e.target !== e.currentTarget) return
    if (phase !== 'highlight') return
    setPhase('action')
    setShakeKey(k => k + 1)
  }

  function handleShakeEnd() {
    setTopValue(4); setShowFeedback(true)
    setPhase('done'); setPlaying(false)
  }

  return (
    <DemoShell label="Highlight vrchní kostky — signál před akcí">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 2 }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <DieFace value={2} playerColor={p1.color} size="sm" />
          </div>
          <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
            <div key={highlightKey}
              style={{ animation: highlightKey > 0 ? 'die-top-highlight 300ms ease-out' : 'none' }}
              onAnimationEnd={handleHighlightEnd}>
              <div key={shakeKey}
                style={{ animation: shakeKey > 0 ? 'die-shake 180ms ease-in both' : 'none' }}
                onAnimationEnd={handleShakeEnd}>
                <DieFace value={topValue} playerColor={p1.color} size="sm" />
              </div>
            </div>
          </div>
          <FloatFeedback text="−1" variant="loss" visible={showFeedback} animKey={shakeKey}
            onDone={() => setShowFeedback(false)} style={{ top: 0 }} />
        </div>
        <HexWithDie hexState="base" owner={p2.color} dieValue={3} dieColor={p2.color} />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Kolaps věže — vlastní kostka, bez VP */
function CollapseNoVPDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  function play() {
    if (playing) return
    setCollapsed(false); setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Kolaps věže — vlastní kostka (bez VP)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="base" owner={p1.color} size="md" />
          {collapsed ? (
            <>
              <div style={{ position: 'absolute', top: 4,  left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
              </div>
              <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                <DieFace value={3} playerColor={p1.color} size="sm" />
              </div>
            </>
          ) : (
            <>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
              </div>
              <div style={{ position: 'absolute', top: 4,  left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                <DieFace value={3} playerColor={p1.color} size="sm" />
              </div>
              <div key={key} style={{
                position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1,
                animation: key > 0 ? 'die-collapse 300ms ease-in forwards' : 'none',
              }}
              onAnimationEnd={() => { setCollapsed(true); setPlaying(false) }}>
                <DieFace value={1} playerColor={p1.color} size="sm" />
              </div>
            </>
          )}
        </div>
        {!playing && key > 0 && (
          <DonjonBadge variant="default">Vlastní kostka — bez VP</DonjonBadge>
        )}
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Nelegální akce — reject animace */
function RejectDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Nelegální akce — reject">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <div key={key}
              style={{ animation: key > 0 ? 'die-reject 320ms ease-in-out both' : 'none' }}
              onAnimationEnd={() => setPlaying(false)}>
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </div>
          </div>
        </div>
        <HexTile state="blocked" size="md" />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Ohnisko — plný chain: VP + reroll + přepnutí active/passive */
function FocalChainDemo() {
  const [hexAKey,  setHexAKey]  = useState(0)
  const [dieKey,   setDieKey]   = useState(0)
  const [hexBKey,  setHexBKey]  = useState(0)
  const [dieValue, setDieValue] = useState(4)
  const [phase, setPhase] = useState('idle')
  const [showVP,   setShowVP]   = useState(false)
  const [showLoss, setShowLoss] = useState(false)
  const [playing, setPlaying] = useState(false)
  const chainRef = useRef(null)

  function play() {
    if (playing) return
    clearTimeout(chainRef.current)
    setDieValue(4); setShowVP(false); setShowLoss(false)
    setPhase('pulsing'); setPlaying(true)
    setHexAKey(k => k + 1)
    chainRef.current = setTimeout(() => setShowVP(true), 80)
  }

  function handleHexAPulseEnd(e) {
    if (e.target !== e.currentTarget) return
    if (phase !== 'pulsing') return
    setPhase('rerolling')
    setDieKey(k => {
      const next = k + 1
      chainRef.current = setTimeout(() => setDieValue(2), 200)
      return next
    })
  }

  function handleRerollEnd() {
    setShowLoss(true)
    chainRef.current = setTimeout(() => {
      setPhase('activating')
      setHexBKey(k => k + 1)
    }, 420)
  }

  function handleHexBActivateEnd() {
    setPhase('done'); setPlaying(false)
  }

  const hexAState = (phase === 'activating' || phase === 'done') ? 'focal-passive' : 'focal-active'
  const hexBState = phase === 'done' ? 'focal-active' : 'focal-passive'

  return (
    <DemoShell label="Ohnisko — plný chain (VP → reroll → aktivace dalšího)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Hex A — vyhodnocované ohnisko */}
        <div style={{ position: 'relative', width: 62, height: 72, overflow: 'visible' }}>
          <div key={hexAKey}
            style={{
              position: 'absolute', inset: 0, overflow: 'visible',
              animation: hexAKey > 0 && phase === 'pulsing' ? 'hex-focal-pulse 500ms ease-out both' : 'none',
            }}
            onAnimationEnd={handleHexAPulseEnd}>
            <HexTile state={hexAState} size="md" />
          </div>
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', perspective: 200, zIndex: 2 }}>
            <div key={dieKey}
              style={{ animation: dieKey > 0 ? 'die-reroll-spin 500ms ease-in-out both' : 'none' }}
              onAnimationEnd={handleRerollEnd}>
              <DieFace value={dieValue} playerColor={p1.color} size="sm" />
            </div>
          </div>
          <FloatFeedback text="+1 VP" variant="vp"   visible={showVP}   animKey={hexAKey}
            onDone={() => setShowVP(false)}   style={{ top: 0 }} />
          <FloatFeedback text="−2"    variant="loss"  visible={showLoss} animKey={dieKey}
            onDone={() => setShowLoss(false)} style={{ top: 0 }} />
        </div>
        {/* Hex B — aktivuje se po vyhodnocení */}
        <div style={{ position: 'relative', width: 62, height: 72, overflow: 'visible' }}>
          <div key={hexBKey}
            style={{
              position: 'absolute', inset: 0, overflow: 'visible',
              animation: hexBKey > 0 ? 'focal-activate 400ms ease-out' : 'none',
            }}
            onAnimationEnd={handleHexBActivateEnd}>
            <HexTile state={hexBState} size="md" />
          </div>
        </div>
        {/* Hex C — passive, nezměněno */}
        <HexTile state="focal-passive" size="md" />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* ── Bent move + friendly pass-through + tower combat demos ── */

/* Lomený pohyb — kostka mění směr: A (vlevo dole) → B (vpravo dole) → C (vpravo nahoře) */
function BentMoveDemo() {
  const [hop1Key, setHop1Key] = useState(0)
  const [hop2Key, setHop2Key] = useState(0)
  const [phase, setPhase] = useState('idle') // 'idle' | 'hop1' | 'hop2' | 'done'
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setPhase('hop1')
    setPlaying(true)
    setHop1Key(k => k + 1)
  }

  function handleHop1End() {
    setPhase('hop2')
    setHop2Key(k => k + 1)
  }

  function handleHop2End() {
    setPhase('done')
    setPlaying(false)
  }

  return (
    <DemoShell label="Lomený pohyb — změna směru">
      {/* L-tvar: A vlevo dole, B vpravo dole, C vpravo nahoře — výška kontejneru 84 + 72 = 156px */}
      <div style={{ position: 'relative', width: 136, height: 156 }}>
        {/* Hex C — nahoře vpravo (zIndex: 1, nejníže) */}
        <div style={{ position: 'absolute', left: 74, top: 0, zIndex: 1, overflow: 'visible' }}>
          <HexTile state={phase === 'done' ? 'base' : 'move'} owner={phase === 'done' ? p1.color : undefined} size="md" />
          {phase === 'done' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <DieFace value={3} playerColor={p1.color} size="sm" />
            </div>
          )}
        </div>
        {/* Hex B — dole vpravo (zIndex: 2) */}
        <div style={{ position: 'absolute', left: 74, top: 84, zIndex: 2, overflow: 'visible' }}>
          <HexTile state="move" size="md" />
          {/* Costka při hop2: pohybuje se nahoru z B do C */}
          {phase === 'hop2' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <div key={hop2Key}
                style={{ animation: 'die-move-up 260ms ease-in-out both' }}
                onAnimationEnd={handleHop2End}>
                <DieFace value={3} playerColor={p1.color} size="sm" />
              </div>
            </div>
          )}
        </div>
        {/* Hex A — dole vlevo (zIndex: 3, nejvyšší — pro překrytí při hop1) */}
        <div style={{ position: 'absolute', left: 0, top: 84, zIndex: 3, overflow: 'visible' }}>
          <HexTile state={phase === 'done' ? 'empty' : 'selected'} size="md" />
          {/* Kostka při idle a hop1 */}
          {(phase === 'idle' || phase === 'hop1') && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              {phase === 'hop1' ? (
                <div key={hop1Key}
                  style={{ animation: 'die-move 260ms ease-in-out both' }}
                  onAnimationEnd={handleHop1End}>
                  <DieFace value={3} playerColor={p1.color} size="sm" />
                </div>
              ) : (
                <DieFace value={3} playerColor={p1.color} size="sm" />
              )}
            </div>
          )}
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Průchod přes vlastní kostku — dočasná věž při pohybu přes přátelskou kostku */
function FriendlyPassthroughDemo() {
  const [hop1Key, setHop1Key] = useState(0)
  const [hop2Key, setHop2Key] = useState(0)
  const [phase, setPhase] = useState('idle') // 'idle' | 'hop1' | 'tower' | 'hop2' | 'done'
  const [playing, setPlaying] = useState(false)
  const passTimerRef = useRef(null)

  function play() {
    if (playing) return
    clearTimeout(passTimerRef.current)
    setPhase('hop1')
    setPlaying(true)
    setHop1Key(k => k + 1)
  }

  function handleHop1End() {
    setPhase('tower')
    // Krátká pauza — ukáže dočasnou věž
    passTimerRef.current = setTimeout(() => {
      setPhase('hop2')
      setHop2Key(k => k + 1)
    }, 280)
  }

  function handleHop2End() {
    setPhase('done')
    setPlaying(false)
  }

  return (
    <DemoShell label="Průchod přes vlastní kostku">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Hex A — zdrojový hex */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 2 }}>
          <HexTile state={phase === 'done' ? 'empty' : 'selected'} size="md" />
          {/* Pohybující se kostka — viditelná v idle + hop1 */}
          {(phase === 'idle' || phase === 'hop1') && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              {phase === 'hop1' ? (
                <div key={hop1Key}
                  style={{ animation: 'die-move-onto 280ms ease-in-out both' }}
                  onAnimationEnd={handleHop1End}>
                  <DieFace value={4} playerColor={p1.color} size="sm" />
                </div>
              ) : (
                <DieFace value={4} playerColor={p1.color} size="sm" />
              )}
            </div>
          )}
        </div>

        {/* Hex B — přátelská kostka, dočasná věž */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state="base" owner={p1.color} size="md" />
          {/* Spodní kostka — vždy přítomna */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <DieFace value={2} playerColor={p1.color} size="sm" />
          </div>
          {/* Vrchní kostka — dočasná věž (tower fáze) */}
          {phase === 'tower' && (
            <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </div>
          )}
          {/* Kostka odskakuje z věže (hop2 fáze) */}
          {phase === 'hop2' && (
            <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <div key={hop2Key}
                style={{ animation: 'die-move-off-tower 280ms ease-in-out both' }}
                onAnimationEnd={handleHop2End}>
                <DieFace value={4} playerColor={p1.color} size="sm" />
              </div>
            </div>
          )}
        </div>

        {/* Hex C — cílový hex */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state={phase === 'done' ? 'base' : 'move'} owner={phase === 'done' ? p1.color : undefined} size="md" />
          {phase === 'done' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </div>
          )}
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Tower combat — věž útočí: top die shake, pak Push; Occupy nedostupné */
function TowerCombatDemo() {
  const [shakeKey,  setShakeKey]  = useState(0)
  const [slideKey,  setSlideKey]  = useState(0)
  const [topValue,  setTopValue]  = useState(5)
  const [showFeedback, setShowFeedback] = useState(false)
  const [phase, setPhase] = useState('idle') // 'idle' | 'shake' | 'push' | 'done'
  const [playing, setPlaying] = useState(false)
  const towerCombatTimer = useRef(null)

  function play() {
    if (playing) return
    clearTimeout(towerCombatTimer.current)
    setTopValue(5); setShowFeedback(false)
    setPhase('shake')
    setPlaying(true)
    setShakeKey(k => k + 1)
  }

  function handleShakeEnd() {
    setTopValue(4)
    setShowFeedback(true)
    towerCombatTimer.current = setTimeout(() => {
      setPhase('push')
      setSlideKey(k => k + 1)
    }, 350)
  }

  function handlePushEnd() {
    setPhase('done')
    setPlaying(false)
  }

  return (
    <DemoShell label="Tower combat — Push only">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Útočná věž */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 2 }}>
          <HexTile state="selected" size="md" />
          {/* Spodní kostka věže */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <DieFace value={2} playerColor={p1.color} size="sm" />
          </div>
          {/* Vrchní kostka — třese se při útoku */}
          <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
            <div key={shakeKey}
              style={{ animation: shakeKey > 0 ? 'die-shake 180ms ease-in both' : 'none' }}
              onAnimationEnd={handleShakeEnd}>
              <DieFace value={topValue} playerColor={p1.color} size="sm" />
            </div>
          </div>
          <FloatFeedback text="−1" variant="loss" visible={showFeedback} animKey={shakeKey}
            onDone={() => setShowFeedback(false)} style={{ top: 0 }} />
        </div>
        {/* Obránce — odsune se */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state={phase === 'done' ? 'empty' : 'base'} owner={phase === 'done' ? undefined : p2.color} size="md" />
          {phase !== 'done' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <div key={slideKey}
                style={{ animation: slideKey > 0 ? 'formation-push 320ms ease-out both' : 'none' }}
                onAnimationEnd={phase === 'push' ? handlePushEnd : undefined}>
                <DieFace value={3} playerColor={p2.color} size="sm" />
              </div>
            </div>
          )}
        </div>
        {/* Cílový hex */}
        <HexTile state={phase === 'done' ? 'base' : 'move'} owner={phase === 'done' ? p2.color : undefined} size="md" />
      </div>
      {/* Constraint badge */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <DonjonBadge variant="success">Push ✓</DonjonBadge>
        <DonjonBadge variant="default">Occupy — nedostupné pro věž</DonjonBadge>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* ── Push variant demos ── */

/* Push — kompletní sekvence: Fáze 1 shake −1 → Fáze 2a obránce reroll → Fáze 2b slide */
function PushFullDemo() {
  const [attackKey, setAttackKey] = useState(0)
  const [rerollKey, setRerollKey] = useState(0)
  const [slideKey,  setSlideKey]  = useState(0)
  const [attackValue, setAttackValue] = useState(5)
  const [defValue,    setDefValue]    = useState(2)
  const [defPhase, setDefPhase] = useState('static') // 'static' | 'reroll' | 'slide' | 'done'
  const [showAtkFeedback, setShowAtkFeedback] = useState(false)
  const [showDefFeedback, setShowDefFeedback] = useState(false)
  const [playing, setPlaying] = useState(false)
  const pushTimerRef = useRef(null)

  function play() {
    if (playing) return
    clearTimeout(pushTimerRef.current)
    setAttackValue(5); setDefValue(2)
    setShowAtkFeedback(false); setShowDefFeedback(false)
    setDefPhase('static')
    setPlaying(true)
    setAttackKey(k => k + 1)
  }

  function handleShakeEnd() {
    setAttackValue(4)
    setShowAtkFeedback(true)
    // krátká pauza → začne reroll obránce
    pushTimerRef.current = setTimeout(() => {
      setDefPhase('reroll')
      setRerollKey(k => k + 1)
      pushTimerRef.current = setTimeout(() => setDefValue(4), 200) // hodnota se přepne v 40%
    }, 320)
  }

  function handleRerollEnd() {
    setShowDefFeedback(true)
    // krátká pauza → obránce se odsune
    pushTimerRef.current = setTimeout(() => {
      setDefPhase('slide')
      setSlideKey(k => k + 1)
    }, 320)
  }

  function handleSlideEnd() {
    setDefPhase('done')
    setPlaying(false)
  }

  return (
    <DemoShell label="Push — kompletní sekvence (Fáze 1 + 2)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Útočník — třes */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 2 }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <div key={attackKey}
              style={{ animation: attackKey > 0 ? 'die-shake 180ms ease-in both' : 'none' }}
              onAnimationEnd={handleShakeEnd}>
              <DieFace value={attackValue} playerColor={p1.color} size="sm" />
            </div>
          </div>
          <FloatFeedback text="−1" variant="loss" visible={showAtkFeedback} animKey={attackKey}
            onDone={() => setShowAtkFeedback(false)} style={{ top: 0 }} />
        </div>
        {/* Obránce — reroll pak slide */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state="base" owner={p2.color} size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', perspective: 200 }}>
            {defPhase === 'reroll' ? (
              <div key={rerollKey}
                style={{ animation: 'die-reroll-spin 500ms ease-in-out both' }}
                onAnimationEnd={handleRerollEnd}>
                <DieFace value={defValue} playerColor={p2.color} size="sm" />
              </div>
            ) : (defPhase === 'slide' || defPhase === 'done') ? (
              <div key={slideKey}
                style={{ animation: slideKey > 0 ? 'formation-push-full 360ms ease-out both' : 'none' }}
                onAnimationEnd={defPhase === 'slide' ? handleSlideEnd : undefined}>
                <DieFace value={defValue} playerColor={p2.color} size="sm" />
              </div>
            ) : (
              <DieFace value={defValue} playerColor={p2.color} size="sm" />
            )}
          </div>
          <FloatFeedback text="+2" variant="gain" visible={showDefFeedback} animKey={rerollKey}
            onDone={() => setShowDefFeedback(false)} style={{ top: 0 }} />
        </div>
        {/* Cílový hex */}
        <HexTile state={defPhase === 'done' ? 'base' : 'move'} owner={defPhase === 'done' ? p2.color : undefined} size="md" />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Push — okraj mapy: slide → die-collapse (sjednocený destrukční jazyk) → +1 VP */
function PushOffMapDemo() {
  const [slideKey,    setSlideKey]    = useState(0)
  const [collapseKey, setCollapseKey] = useState(0)
  const [playing,  setPlaying]  = useState(false)
  const [phase,    setPhase]    = useState('idle') // 'idle' | 'slide' | 'collapse' | 'done'
  const [showVP,   setShowVP]   = useState(false)

  function play() {
    if (playing) return
    setPhase('slide'); setShowVP(false)
    setPlaying(true)
    setSlideKey(k => k + 1)
  }

  function handleSlideEnd() {
    setPhase('collapse')
    setCollapseKey(k => k + 1)
  }

  function handleCollapseEnd() {
    setShowVP(true); setPhase('done'); setPlaying(false)
  }

  return (
    <DemoShell label="Push — okraj mapy (+1 VP)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <HexWithDie hexState="selected" dieValue={5} dieColor={p1.color} />
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state={phase === 'done' ? 'empty' : 'base'} owner={phase === 'done' ? undefined : p2.color} size="md" />
          {phase === 'slide' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <div key={slideKey}
                style={{ animation: 'formation-push 320ms ease-out both' }}
                onAnimationEnd={handleSlideEnd}>
                <DieFace value={2} playerColor={p2.color} size="sm" />
              </div>
            </div>
          )}
          {/* Collapse — kostka na okraji mapy padá dolů (sjednocený destrukční vizuál) */}
          {phase === 'collapse' && (
            <div style={{ position: 'absolute', top: 20, left: 'calc(50% + 42px)', transform: 'translateX(-50%)' }}>
              <div key={collapseKey}
                style={{ animation: 'die-collapse 300ms ease-in forwards' }}
                onAnimationEnd={handleCollapseEnd}>
                <DieFace value={2} playerColor={p2.color} size="sm" />
              </div>
            </div>
          )}
          <FloatFeedback text="+1 VP" variant="vp" visible={showVP} animKey={collapseKey}
            onDone={() => setShowVP(false)} style={{ top: 0 }} />
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* Push — obklíčení: kostka odsunuta na obsazené pole → collapse → +1 VP */
function PushEncircledDemo() {
  const [slideKey,    setSlideKey]    = useState(0)
  const [collapseKey, setCollapseKey] = useState(0)
  const [playing,  setPlaying]  = useState(false)
  const [phase,    setPhase]    = useState('idle') // 'idle' | 'slide' | 'collapse' | 'done'
  const [showVP,   setShowVP]   = useState(false)

  function play() {
    if (playing) return
    setPhase('slide'); setShowVP(false)
    setPlaying(true)
    setSlideKey(k => k + 1)
  }

  function handleSlideEnd() {
    setPhase('collapse')
    setCollapseKey(k => k + 1)
  }

  function handleCollapseEnd() {
    setShowVP(true)
    setPhase('done')
    setPlaying(false)
  }

  return (
    <DemoShell label="Push — obklíčení (+1 VP)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <HexWithDie hexState="selected" dieValue={5} dieColor={p1.color} />
        {/* Obránce hex — kostka odsunutá, pak zničená */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state={phase === 'done' ? 'empty' : 'base'} owner={phase !== 'done' ? p2.color : undefined} size="md" />
          {phase === 'slide' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <div key={slideKey}
                style={{ animation: 'formation-push-full 360ms ease-out both' }}
                onAnimationEnd={handleSlideEnd}>
                <DieFace value={2} playerColor={p2.color} size="sm" />
              </div>
            </div>
          )}
          {/* Po slide — kostka visually na pravém hexu, collapse ji zničí */}
          {phase === 'collapse' && (
            <div style={{ position: 'absolute', top: 20, left: 'calc(50% + 74px)', transform: 'translateX(-50%)' }}>
              <div key={collapseKey}
                style={{ animation: 'die-collapse 300ms ease-in forwards' }}
                onAnimationEnd={handleCollapseEnd}>
                <DieFace value={2} playerColor={p2.color} size="sm" />
              </div>
            </div>
          )}
        </div>
        {/* Obklíčující hex */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="attack" size="md" />
          <FloatFeedback text="+1 VP" variant="vp" visible={showVP} animKey={collapseKey}
            onDone={() => setShowVP(false)} style={{ top: 0 }} />
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* ── Później demos ── */

/* Sudden death — kostka bez legální akce pulzuje červeně dokola; toggle tlačítko */
function SuddenDeathDemo() {
  const [active, setActive] = useState(false)

  return (
    <DemoShell label="Sudden death — kostka uvízlá bez legální akce">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Uvízlá kostka — pulzuje červeně */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="selected" size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ animation: active ? 'die-stuck-pulse 1200ms ease-in-out infinite' : 'none' }}>
              <DieFace value={3} playerColor={p1.color} size="sm" />
            </div>
          </div>
        </div>
        {/* Okolní zablokované hexesy */}
        <HexTile state="blocked" size="md" />
        <HexTile state="blocked" size="md" />
      </div>
      {/* Toggle — stav je nekonečný, PlayButton nedává smysl */}
      <button
        onClick={() => setActive(a => !a)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: active ? '#2A1A1A' : '#2A2948',
          border: `1px solid ${active ? '#E05C5C66' : '#5A5878'}`,
          borderRadius: 4, padding: '5px 14px',
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em',
          color: active ? '#E05C5C' : '#D4C5A9',
          cursor: 'pointer', transition: 'background 150ms, color 150ms',
        }}
      >
        {active ? '⏹ Zastavit' : '▶ Spustit'}
      </button>
    </DemoShell>
  )
}

/* Signal travel — focal-activate se šíří po trojici ohnisku v pořadí */
function SignalTravelDemo() {
  const [keys, setKeys]   = useState([0, 0, 0])
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef(null)

  function play() {
    if (playing) return
    clearTimeout(timerRef.current)
    setPlaying(true)
    const t = Date.now()
    setKeys([t, 0, 0])
    timerRef.current = setTimeout(() => {
      setKeys([t, t + 1, 0])
      timerRef.current = setTimeout(() => {
        setKeys([t, t + 1, t + 2])
        timerRef.current = setTimeout(() => setPlaying(false), 450)
      }, 320)
    }, 320)
  }

  return (
    <DemoShell label="Signal travel — šíření aktivace přes skupinu ohnisek">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
            {/* Wrapper s animací focal-activate — drop-shadow záblesk */}
            <div
              key={keys[i]}
              style={{
                position: 'absolute', inset: 0, overflow: 'visible',
                animation: keys[i] > 0 ? 'focal-activate 400ms ease-out forwards' : 'none',
              }}
            >
              <HexTile state="focal-passive" size="md" />
            </div>
          </div>
        ))}
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* JumpOff rozšíření — dosah útoku věže viditelný jako badge během skoku */
function JumpOffCombatPowerDemo() {
  const [key,     setKey]     = useState(0)
  const [playing, setPlaying] = useState(false)
  const [moved,   setMoved]   = useState(false)

  function play() {
    if (playing) return
    setMoved(false); setPlaying(true)
    setKey(k => k + 1)
  }

  return (
    <DemoShell label="Seskočení — dosah útoku věže">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Levá věž — vrchní kostka seskočí */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile state="base" owner={p1.color} size="md" />
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <DieFace value={2} playerColor={p1.color} size="sm" />
          </div>
          {!moved && (
            <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <div key={key}
                style={{ animation: key > 0 ? 'die-move-off-tower 280ms ease-in-out both' : 'none' }}
                onAnimationEnd={() => { setMoved(true); setPlaying(false) }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
              </div>
            </div>
          )}
        </div>
        {/* Cílový hex */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state="move" size="md" />
          {moved && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <DieFace value={5} playerColor={p1.color} size="sm" />
            </div>
          )}
        </div>
      </div>
      {/* Dosah věže badge — viditelný jen během skoku */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {playing && <DonjonBadge variant="warning">Dosah věže: výška + 1</DonjonBadge>}
        <PlayButton onClick={play} playing={playing} />
      </div>
    </DemoShell>
  )
}

/* PushChain — celá formace 3 obránců odtlačena simultánně */
function PushChainDemo() {
  const [slideKey, setSlideKey] = useState(0)
  const [phase, setPhase]       = useState('idle') // 'idle' | 'slide' | 'done'
  const [playing, setPlaying]   = useState(false)

  function play() {
    if (playing) return
    setPhase('slide'); setPlaying(true)
    setSlideKey(k => k + 1)
  }

  const defenders = [{ v: 3 }, { v: 2 }, { v: 4 }]

  return (
    <DemoShell label="Push — celá formace odtlačena simultánně">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Útočník */}
        <HexWithDie hexState="selected" dieValue={5} dieColor={p1.color} />
        <Arrow />
        {/* Formace 3 obránců — stejný slideKey = simultánní start */}
        {defenders.map((d, i) => (
          <div key={i} style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
            <HexTile state={phase === 'done' ? 'empty' : 'base'} owner={phase === 'done' ? undefined : p2.color} size="md" />
            {phase !== 'done' && (
              <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
                {phase === 'slide' ? (
                  <div key={slideKey}
                    style={{ animation: 'formation-push-full 360ms ease-out both' }}
                    onAnimationEnd={i === 0 ? () => { setPhase('done'); setPlaying(false) } : undefined}>
                    <DieFace value={d.v} playerColor={p2.color} size="sm" />
                  </div>
                ) : (
                  <DieFace value={d.v} playerColor={p2.color} size="sm" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* AttackerRemains — klasický výsledek Push: útočník přijde, obránce odejde */
function AttackerRemainsDemo() {
  const [moveKey,     setMoveKey]     = useState(0)
  const [shakeKey,    setShakeKey]    = useState(0)
  const [pushKey,     setPushKey]     = useState(0)
  const [phase,       setPhase]       = useState('idle')
  const [atkValue,    setAtkValue]    = useState(4)
  const [showLoss,    setShowLoss]    = useState(false)
  const [playing,     setPlaying]     = useState(false)
  const timerRef = useRef(null)

  function play() {
    if (playing) return
    clearTimeout(timerRef.current)
    setAtkValue(4); setShowLoss(false)
    setPhase('move'); setPlaying(true)
    setMoveKey(k => k + 1)
  }

  function handleMoveEnd() {
    setPhase('shake')
    setShakeKey(k => k + 1)
  }

  function handleShakeEnd() {
    setAtkValue(3); setShowLoss(true)
    timerRef.current = setTimeout(() => {
      setPhase('push')
      setPushKey(k => k + 1)
    }, 220)
  }

  function handlePushEnd() {
    setPhase('done'); setPlaying(false)
  }

  return (
    <DemoShell label="Útočník zůstane — A prázdný, B=útočník, C=obránce">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Hex A — útočník startuje; po skoku prázdný */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 2 }}>
          <HexTile state={phase === 'idle' || phase === 'move' ? 'selected' : 'empty'} size="md" />
          {phase === 'idle' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <DieFace value={atkValue} playerColor={p1.color} size="sm" />
            </div>
          )}
          {phase === 'move' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <div key={moveKey}
                style={{ animation: 'die-move 260ms ease-in-out both' }}
                onAnimationEnd={handleMoveEnd}>
                <DieFace value={atkValue} playerColor={p1.color} size="sm" />
              </div>
            </div>
          )}
        </div>

        {/* Hex B — souboj; obránce odchází, útočník zůstává */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible', zIndex: 1 }}>
          <HexTile
            state="base"
            owner={phase === 'done' ? p1.color : p2.color}
            size="md"
          />
          {/* Obránce (spodní vrstva) — viditelný od idle do konce push */}
          {(phase === 'idle' || phase === 'move' || phase === 'shake' || phase === 'push') && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
              {phase === 'push' ? (
                <div key={pushKey}
                  style={{ animation: 'formation-push-full 360ms ease-out both' }}
                  onAnimationEnd={handlePushEnd}>
                  <DieFace value={3} playerColor={p2.color} size="sm" />
                </div>
              ) : (
                <DieFace value={3} playerColor={p2.color} size="sm" />
              )}
            </div>
          )}
          {/* Útočník na B (horní vrstva) — od shake dál */}
          {(phase === 'shake' || phase === 'push' || phase === 'done') && (
            <div style={{ position: 'absolute', top: phase === 'done' ? 20 : 4, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <div key={shakeKey}
                style={{ animation: phase === 'shake' ? 'die-shake 180ms ease-in both' : 'none' }}
                onAnimationEnd={phase === 'shake' ? handleShakeEnd : undefined}>
                <DieFace value={atkValue} playerColor={p1.color} size="sm" />
              </div>
            </div>
          )}
          <FloatFeedback text="−1" variant="loss" visible={showLoss} animKey={shakeKey}
            onDone={() => setShowLoss(false)} style={{ top: 0 }} />
        </div>

        {/* Hex C — cíl push; prázdný → obránce */}
        <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
          <HexTile state={phase === 'done' ? 'base' : 'empty'} owner={phase === 'done' ? p2.color : undefined} size="md" />
          {phase === 'done' && (
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
              <DieFace value={3} playerColor={p2.color} size="sm" />
            </div>
          )}
        </div>
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

/* ── Page ── */

const p1 = players[0]
const p2 = players[1]

export default function AnimacePage() {
  return (
    <ShowcasePage
      title="Animace"
      description="Specifikace herních animací — trigger, trvání, easing a popis efektu. Každá sekce obsahuje statické klíčové snímky a živé demo."
    >
      <Section
        id="pohyb-kostky"
        title="Pohyb kostky"
        description="Move die — kostka se přesune z jednoho hexu na druhý. Může jít o přímý pohyb, pohyb přes více políček, změnu směru nebo průchod přes vlastní kostku."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="260 ms"
              easing="ease-in-out"
              trigger="Výběr cílového hexu — přímý pohyb"
              description="Kostka se přesune po malém oblouku z výchozího hexu na cílový. Pohyb naznačuje taktický záměr — ne přímá lineární trajektorie."
            >
              <FrameRow>
                <HexWithDie hexState="selected" dieValue={4} dieColor={p1.color} />
                <Arrow />
                <HexWithDie hexState="move" dieValue={4} dieColor={p1.color} />
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="2 × 260 ms"
              easing="ease-in-out"
              trigger="Pohyb se změnou směru"
              description="Kostka může v jednom tahu změnit směr. Každý hop je samostatná animace — kostka se krátce dotkne středového hexu a pokračuje jiným směrem."
            >
              <FrameRow>
                <HexWithDie hexState="selected" dieValue={3} dieColor={p1.color} />
                <Arrow />
                <HexTile state="move" size="md" />
                <Arrow />
                <HexWithDie hexState="move" dieValue={3} dieColor={p1.color} />
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="280 ms + 280 ms"
              easing="ease-in-out"
              trigger="Průchod přes vlastní kostku"
              description="Kostka prochází přes přátelskou kostku nebo věž — dočasně tvoří věž. Získá tím pohybový dosah věže. Po průchodu pokračuje dál jako samostatná kostka."
            >
              <FrameRow>
                <HexWithDie hexState="selected" dieValue={4} dieColor={p1.color} />
                <Arrow />
                <HexWithTower hexState="base" owner={p1.color} dice={[
                  { value: 4, color: p1.color },
                  { value: 2, color: p1.color },
                ]} />
                <span style={{ fontSize: '0.75rem', color: '#FFC183', fontWeight: 700 }}>dočasná věž</span>
                <Arrow />
                <HexWithDie hexState="move" dieValue={4} dieColor={p1.color} />
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <MoveTwoHexDemo />
            <JumpOntoDieDemo />
            <JumpOffTowerDemo />
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <BentMoveDemo />
            <FriendlyPassthroughDemo />
            <JumpOffCombatPowerDemo />
          </div>
        </Preview>
      </Section>

      <Section
        id="pohyb-veze"
        title="Pohyb věže"
        description="Move tower — celá věž (2+ kostek) se přesune jako celek."
      >
        <Preview>
          <AnimSpec
            duration="320 ms"
            easing="ease-in-out"
            trigger="Výběr cílového hexu pro věž"
            description="Věž se přesune jako celek — pomalejší než solo kostka. Vizuálně naznačuje váhu stohovaných kostek. Věž nemůže procházet jinými kostkami."
          >
            <FrameRow>
              <HexWithTower hexState="selected" dice={[
                { value: 5, color: p1.color },
                { value: 2, color: p1.color },
              ]} />
              <Arrow />
              <HexWithTower hexState="move" dice={[
                { value: 5, color: p1.color },
                { value: 2, color: p1.color },
              ]} />
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <MoveTowerDemo />
        </Preview>
      </Section>

      <Section
        id="souboj-push"
        title="Souboj — Push"
        description="Útočník vstoupí na nepřátelské pole. Fáze 1: útočník ztratí 1. Fáze 2: obránce přehodí, pak je odtlačen — tři možné výsledky."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="180 ms"
              easing="ease-in"
              trigger="Fáze 1 — útočník vstoupí na pole"
              description="Útočná kostka se zatřese a sníží hodnotu o 1. Shake efekt naznačuje impakt při vstupu na nepřátelské pole."
            >
              <FrameRow>
                <HexWithDie hexState="selected" dieValue={5} dieColor={p1.color} />
                <Arrow />
                <HexWithDie hexState="selected" dieValue={4} dieColor={p1.color} />
                <span style={{ fontSize: '0.75rem', color: '#E05C5C', fontWeight: 700 }}>−1</span>
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="500 ms"
              easing="ease-in-out"
              trigger="Fáze 2a — obránce přehodí první kostku formace"
              description="První obranná kostka ve formaci provede akční reroll — může posílit nebo zůstat. Rotace kolem osy Y, hodnota se přepne v polovině animace."
            >
              <FrameRow>
                <HexWithDie hexState="base" owner={p2.color} dieValue={2} dieColor={p2.color} dieState="rerolled" />
                <Arrow />
                <HexWithDie hexState="base" owner={p2.color} dieValue={4} dieColor={p2.color} />
                <DonjonBadge variant="success">+2</DonjonBadge>
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="360 ms"
              easing="ease-out"
              trigger="Fáze 2b — formace odtlačena (Push)"
              description="Celá obranná formace se posune o jeden hex ve směru útoku s mírným bounce efektem."
            >
              <FrameRow>
                <HexWithDie hexState="base" owner={p2.color} dieValue={4} dieColor={p2.color} />
                <Arrow />
                <HexTile state="empty" size="md" />
                <HexWithDie hexState="base" owner={p2.color} dieValue={4} dieColor={p2.color} />
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <PushFullDemo />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="—"
              easing="—"
              trigger="Výsledek A — volný hex"
              description="Formace se přesune na prázdné pole. Obránce zůstává ve hře, nic se nezničí."
            >
              <FrameRow>
                <HexWithDie hexState="base" owner={p2.color} dieValue={4} dieColor={p2.color} />
                <Arrow />
                <HexTile state="empty" size="md" />
                <HexWithDie hexState="base" owner={p2.color} dieValue={4} dieColor={p2.color} />
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="380 ms"
              easing="ease-in"
              trigger="Výsledek B — okraj mapy"
              description="Formace nemá kam jít — kostka vypadne z hrací plochy a je zničena. +1 VP pro útočníka."
            >
              <FrameRow>
                <HexWithDie hexState="base" owner={p2.color} dieValue={4} dieColor={p2.color} />
                <Arrow />
                <HexTile state="empty" size="md" />
                <DonjonBadge variant="danger">+1 VP</DonjonBadge>
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="360 + 300 ms"
              easing="ease-out + ease-in"
              trigger="Výsledek C — obklíčení"
              description="Formace je odtlačena na pole obklíčené nepřáteli — bez úniku. Kostka je zničena. +1 VP pro útočníka."
            >
              <FrameRow>
                <HexWithDie hexState="base" owner={p2.color} dieValue={4} dieColor={p2.color} />
                <Arrow />
                <HexWithDie hexState="attack" dieValue={3} dieColor={p1.color} />
                <DonjonBadge variant="danger">+1 VP</DonjonBadge>
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <CombatPhase1Demo />
            <PushOffMapDemo />
            <PushEncircledDemo />
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="360 ms"
              easing="ease-out"
              trigger="Push formace — simultánní odsun všech obránců"
              description="Celá obranná formace (2–3 kostky) se posune najednou o jeden hex. Všechny kostky sdílejí stejný časový klíč animace — simultánní start, simultánní přistání."
            />
            <AnimSpec
              duration="260 + 180 + 360 ms"
              easing="ease-in-out / ease-in / ease-out"
              trigger="Útočník zůstane — klasický Push (A→B, shake, defender→C)"
              description="Útočník vstoupí na pole (die-move, −1), obránce přehodí a je odtlačen (formation-push-full). Výsledek: A prázdný, B=útočník, C=obránce."
            />
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <PushChainDemo />
            <AttackerRemainsDemo />
          </div>
        </Preview>
      </Section>

      <Section
        id="souboj-occupy"
        title="Souboj — Occupy"
        description="Solo útočná kostka naskočí na vrchol nepřátelské kostky/věže."
      >
        <Preview>
          <AnimSpec
            duration="240 ms"
            easing="ease-in-out"
            trigger="Výběr Occupy (Fáze 2)"
            description="Útočná kostka se přesune na vrchol obráncovy pozice — plynulý drop efekt shora dolů. Vytvoří smíšenou věž."
          >
            <FrameRow>
              <HexWithDie hexState="base" owner={p2.color} dieValue={2} dieColor={p2.color} />
              <Arrow />
              <HexWithTower hexState="base" owner={p2.color} dice={[
                { value: 4, color: p1.color },
                { value: 2, color: p2.color },
              ]} />
              <DonjonBadge variant="warning">Smíšená věž</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <OccupyDemo />
        </Preview>
      </Section>

      <Section
        id="souboj-tower"
        title="Souboj — Tower combat"
        description="Věž útočí vždy jako Push — Occupy není dostupné. Útok provádí horní kostka věže."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="180 ms + 320 ms"
              easing="ease-in + ease-out"
              trigger="Věž vstoupí na nepřátelské pole"
              description="Horní kostka věže se zatřese a sníží hodnotu o 1 (Fáze 1). Obránce přehodí a formace je odtlačena (Fáze 2). Occupy vůbec není na výběr."
            >
              <FrameRow>
                <HexWithTower hexState="selected" dice={[
                  { value: 5, color: p1.color },
                  { value: 2, color: p1.color },
                ]} />
                <Arrow />
                <HexWithTower hexState="selected" dice={[
                  { value: 4, color: p1.color },
                  { value: 2, color: p1.color },
                ]} />
                <span style={{ fontSize: '0.75rem', color: '#E05C5C', fontWeight: 700 }}>−1</span>
                <Arrow />
                <HexWithDie hexState="base" owner={p2.color} dieValue={3} dieColor={p2.color} />
                <DonjonBadge variant="default">Push only</DonjonBadge>
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <TowerCombatDemo />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="300 ms"
              easing="ease-out"
              trigger="Před akcí věže — highlight vrchní kostky"
              description="Krátký záblesk (drop-shadow) na vrchní kostce věže před akcí naznačuje, která kostka je aktivní. Zvyšuje čitelnost v situacích kde hráč neví, která kostka provede akci."
            >
              <FrameRow>
                <HexWithTower hexState="selected" dice={[
                  { value: 5, color: p1.color },
                  { value: 2, color: p1.color },
                ]} />
                <Arrow />
                <HexWithTower hexState="selected" dice={[
                  { value: 5, color: p1.color, state: 'rerolled' },
                  { value: 2, color: p1.color },
                ]} />
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <TopDieHighlightDemo />
        </Preview>
      </Section>

      <Section
        id="prehazovani"
        title="Přehazování"
        description="Reroll — kostka se přehodí. Akční reroll: stejná nebo vyšší. Ohniskový reroll: stejná nebo nižší."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="500 ms"
              easing="ease-in-out"
              trigger="Akční reroll — hod nová ≥ původní"
              description="Kostka rotuje kolem osy Y (3D rotace). Hodnota se přepne v okamžiku kdy je kostka kolmo (neviditelná). Nová hodnota je stejná nebo vyšší — akce posílí nebo zachová kostku."
            >
              <FrameRow>
                <HexWithDie hexState="selected" dieValue={3} dieColor={p1.color} dieState="rerolled" />
                <Arrow />
                <HexWithDie hexState="selected" dieValue={5} dieColor={p1.color} />
                <DonjonBadge variant="success">+2</DonjonBadge>
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="500 ms"
              easing="ease-in-out"
              trigger="Ohniskový reroll — hod nová ≤ původní − 1"
              description="Kostka na ohnisku rotuje kolem osy Y. Výsledek = min(hod, původní − 1) — kostka nemůže posílit. Navazuje na +1 VP z ohniska. Nová hodnota je stejná nebo nižší."
            >
              <FrameRow>
                <HexWithDie hexState="focal-active" dieValue={4} dieColor={p1.color} />
                <Arrow />
                <HexWithDie hexState="focal-passive" dieValue={2} dieColor={p1.color} dieState="rerolled" />
                <DonjonBadge variant="danger">−2</DonjonBadge>
                <DonjonBadge variant="warning">+1 VP</DonjonBadge>
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="500 ms"
              easing="ease-in-out"
              trigger="Neutrální výsledek — hodnota zůstává"
              description="Nový hod je nižší než původní — akční reroll zachová původní hodnotu. Neutrální FloatFeedback '=' sděluje výsledek bez barvy výhry ani prohry."
            >
              <FrameRow>
                <HexWithDie hexState="selected" dieValue={3} dieColor={p1.color} dieState="rerolled" />
                <Arrow />
                <HexWithDie hexState="selected" dieValue={3} dieColor={p1.color} />
                <span style={{ fontSize: '0.75rem', color: '#8F7458', fontWeight: 700 }}>= zachováno</span>
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <RerollActionDemo />
            <RerollFocalDemo />
          </div>
        </Preview>
      </Section>

      <Section
        id="kolaps-veze"
        title="Kolaps věže"
        description="Tower collapse — spodní kostka je odebrána ze hry."
      >
        <Preview>
          <AnimSpec
            duration="300 ms"
            easing="ease-in"
            trigger="Kolaps věže — nepřátelská kostka na dně → +1 VP"
            description="Spodní kostka (nepřátelská) klesne dolů a zmizí — obránce ji ztratí, útočník získá VP. Zbylé kostky se posunou dolů."
          >
            <FrameRow>
              <HexWithTower hexState="base" owner={p1.color} dice={[
                { value: 5, color: p1.color },
                { value: 3, color: p1.color },
                { value: 1, color: p2.color, state: 'damaged' },
              ]} />
              <Arrow />
              <HexWithTower hexState="base" owner={p1.color} dice={[
                { value: 5, color: p1.color },
                { value: 3, color: p1.color },
              ]} />
              <DonjonBadge variant="danger">+1 VP</DonjonBadge>
            </FrameRow>
          </AnimSpec>
          <AnimSpec
            duration="300 ms"
            easing="ease-in"
            trigger="Kolaps věže — vlastní kostka na dně (bez VP)"
            description="Hráč dobrovolně odebere spodní vlastní kostku ze své věže. Kostka klesne dolů. Věž se zkrátí. Žádné VP — jde o strategické oslabení vlastní věže."
          >
            <FrameRow>
              <HexWithTower hexState="base" owner={p1.color} dice={[
                { value: 5, color: p1.color },
                { value: 3, color: p1.color },
                { value: 1, color: p1.color },
              ]} />
              <Arrow />
              <HexWithTower hexState="base" owner={p1.color} dice={[
                { value: 5, color: p1.color },
                { value: 3, color: p1.color },
              ]} />
              <DonjonBadge variant="default">Vlastní kostka — bez VP</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <CollapseDemo />
            <CollapseNoVPDemo />
          </div>
        </Preview>
      </Section>

      <Section
        id="ohnisko"
        title="Ohnisko"
        description="Focal point — vizuální zpětná vazba při zisku VP z aktivního ohniska a přepnutí stavu."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="500 ms"
              easing="ease-out"
              trigger="Vyhodnocení ohniska — zisk VP + reroll kostky"
              description="Aktivní ohnisko pulzuje zlatou záři, zobrazí +1 VP text. Kostka na ohnisku se přehodí: nová hodnota = min(hod, původní − 1) — nemůže posílit. Poté ohnisko přejde do pasivního stavu a jiné ze skupiny se aktivuje."
            >
              <FrameRow>
                <HexWithDie hexState="focal-active" dieValue={4} dieColor={p1.color} />
                <DonjonBadge variant="warning">+1 VP</DonjonBadge>
                <Arrow />
                <HexWithDie hexState="focal-passive" dieValue={3} dieColor={p1.color} dieState="rerolled" />
                <DonjonBadge variant="default">min(hod, 3)</DonjonBadge>
                <Arrow />
                <HexTile state="focal-passive" size="md" />
                <span style={{ color: '#4A4560', fontSize: '0.75rem' }}>+</span>
                <HexTile state="focal-active" size="md" />
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <FocalDemo />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="500 + 500 + 400 ms"
              easing="ease-out / ease-in-out / ease-out"
              trigger="Plný chain — vyhodnocení a přepnutí skupiny ohnisek"
              description="Aktivní ohnisko pulzuje (+1 VP, reroll kostky) → přejde do pasivního stavu → jiné ohnisko ze skupiny se aktivuje (focal-activate záblesk). Tři navazující animace — jeden herní beat."
            >
              <FrameRow>
                <HexWithDie hexState="focal-active" dieValue={4} dieColor={p1.color} />
                <HexTile state="focal-passive" size="md" />
                <Arrow />
                <HexWithDie hexState="focal-passive" dieValue={2} dieColor={p1.color} dieState="rerolled" />
                <HexTile state="focal-active" size="md" />
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <FocalChainDemo />
        </Preview>
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="3 × 400 ms (offset +320 ms)"
              easing="ease-out"
              trigger="Signal travel — aktivace se šíří skupinou ohnisek"
              description="Po vyhodnocení jednoho ohniska se aktivace šíří na sousední ohniska ve skupině. Každé ohnisko aktivuje focal-activate záblesk s 320ms odstupem — vizuální vlna procházející řadou."
            />
          </div>
        </Preview>
        <Preview>
          <SignalTravelDemo />
        </Preview>
      </Section>

      <Section
        id="nelegalni-akce"
        title="Nelegální akce"
        description="Reject — vizuální zpětná vazba při pokusu o nelegální tah nebo útok."
      >
        <Preview>
          <AnimSpec
            duration="320 ms"
            easing="ease-in-out"
            trigger="Pokus o nelegální akci"
            description="Kostka se rychle zatřese horizontálně (bez změny hodnoty) a zůstane na místě. Navazuje na zablokovaný hex nebo nedostupnou akci. Žádná hodnota se nemění."
          >
            <FrameRow>
              <HexWithDie hexState="selected" dieValue={4} dieColor={p1.color} />
              <Arrow />
              <HexTile state="blocked" size="md" />
              <HexWithDie hexState="selected" dieValue={4} dieColor={p1.color} />
              <span style={{ fontSize: '0.75rem', color: '#4A4560' }}>— zůstane</span>
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <RejectDemo />
        </Preview>
      </Section>

      <Section
        id="sudden-death"
        title="Sudden death"
        description="Kostka bez legální akce v tahu — červená pulzující záře signalizuje uvíznutí. Stav trvá dokud se situace nezmění."
      >
        <Preview>
          <AnimSpec
            duration="1200 ms (infinite)"
            easing="ease-in-out"
            trigger="Konec tahu — žádný legální pohyb ani akce"
            description="Kostka, která nemůže provést žádnou akci, pulzuje červenou září v nekonečné smyčce. Upozorňuje hráče na uvíznutou kostku. Stav se zruší jakmile kostka akci získá (sousední kostkka se odstraní apod.)."
          >
            <FrameRow>
              <div style={{ position: 'relative', width: 62, height: 72, flexShrink: 0, overflow: 'visible' }}>
                <HexTile state="selected" size="md" />
                <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}>
                  <div style={{ animation: 'die-stuck-pulse 1200ms ease-in-out infinite' }}>
                    <DieFace value={3} playerColor={p1.color} size="sm" />
                  </div>
                </div>
              </div>
              <HexTile state="blocked" size="md" />
              <HexTile state="blocked" size="md" />
              <DonjonBadge variant="danger">Uvízlá kostka</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <SuddenDeathDemo />
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
