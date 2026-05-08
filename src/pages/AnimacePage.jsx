import { useState, useRef } from 'react'
import DonjonCard from '../components/DonjonCard'
import DonjonBadge from '../components/DonjonBadge'
import DieFace from '../components/game-assets/DieFace'
import HexTile from '../components/game-assets/HexTile'
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
        <HexTile state="selected" size="sm" />
        <div key={key} style={{ animation: key > 0 ? 'die-move 280ms ease-out both' : 'none' }}
          onAnimationEnd={() => setPlaying(false)}>
          <DieFace value={4} playerColor={p1.color} size="md" />
        </div>
        <HexTile state="move" size="sm" />
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
        <HexTile state="selected" size="sm" />
        <div key={key}
          style={{ display: 'flex', flexDirection: 'column', gap: 2, animation: key > 0 ? 'die-move 360ms ease-in-out both' : 'none' }}
          onAnimationEnd={() => setPlaying(false)}>
          <DieFace value={5} playerColor={p1.color} size="md" />
          <DieFace value={2} playerColor={p1.color} size="md" />
        </div>
        <HexTile state="move" size="sm" />
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function CombatPhase1Demo() {
  const [key, setKey] = useState(0)
  const [value, setValue] = useState(5)
  const [playing, setPlaying] = useState(false)

  function play() {
    if (playing) return
    setValue(5)
    setPlaying(true)
    setKey(k => k + 1)
  }

  function handleEnd() {
    setValue(v => Math.max(v - 1, 1))
    setPlaying(false)
  }

  return (
    <DemoShell label="Fáze 1 — impakt (shake + −1)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div key={key}
          style={{ animation: key > 0 ? 'die-shake 180ms ease-in both' : 'none' }}
          onAnimationEnd={handleEnd}>
          <DieFace value={value} playerColor={p1.color} size="md" />
        </div>
        {!playing && key > 0 && (
          <span style={{ fontSize: '1rem', color: '#E05C5C', fontWeight: 700 }}>−1</span>
        )}
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
        <DieFace value={5} playerColor={p1.color} size="md" />
        <Arrow />
        <div key={key}
          style={{ animation: key > 0 ? 'formation-push 320ms ease-out both' : 'none' }}
          onAnimationEnd={() => setPlaying(false)}>
          <DieFace value={2} playerColor={p2.color} size="md" />
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
      <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <div key={key}
          style={{ animation: key > 0 ? 'die-drop 240ms ease-in-out both' : 'none' }}
          onAnimationEnd={handleEnd}>
          <DieFace value={4} playerColor={p1.color} size="md" />
        </div>
        <DieFace value={2} playerColor={p2.color} size="md" />
        {landed && (
          <DonjonBadge variant="warning" style={{ marginTop: 4 }}>Smíšená věž</DonjonBadge>
        )}
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function RerollDemo() {
  const [key, setKey] = useState(0)
  const [value, setValue] = useState(3)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef(null)

  function play() {
    if (playing) return
    setValue(3)
    setPlaying(true)
    setKey(k => k + 1)
    timerRef.current = setTimeout(() => setValue(5), 200)
  }

  function handleEnd() {
    setPlaying(false)
  }

  return (
    <DemoShell label="Přehazování — flip + nová hodnota">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div key={key}
          style={{ animation: key > 0 ? 'die-reroll 400ms ease-out both' : 'none' }}
          onAnimationEnd={handleEnd}>
          <DieFace value={value} playerColor={p1.color} size="md" />
        </div>
        {!playing && key > 0 && (
          <DonjonBadge variant="success">+2</DonjonBadge>
        )}
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function CollapseDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [bottomVisible, setBottomVisible] = useState(true)

  function play() {
    if (playing) return
    setBottomVisible(true)
    setPlaying(true)
    setKey(k => k + 1)
  }

  function handleEnd() {
    setBottomVisible(false)
    setPlaying(false)
  }

  return (
    <DemoShell label="Kolaps věže — spodní kostka zmizí">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DieFace value={5} playerColor={p1.color} size="md" />
          <DieFace value={3} playerColor={p1.color} size="md" />
          {bottomVisible ? (
            <div key={key}
              style={{ animation: key > 0 ? 'die-collapse 300ms ease-in forwards' : 'none' }}
              onAnimationEnd={handleEnd}>
              <DieFace value={1} playerColor={p2.color} size="md" state="damaged" />
            </div>
          ) : (
            <div style={{ height: 48 }} />
          )}
        </div>
        {!playing && key > 0 && (
          <DonjonBadge variant="danger">+1 VP</DonjonBadge>
        )}
      </div>
      <PlayButton onClick={play} playing={playing} />
    </DemoShell>
  )
}

function FocalDemo() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [focalState, setFocalState] = useState('focal-active')
  const [showVP, setShowVP] = useState(false)

  function play() {
    if (playing) return
    setFocalState('focal-active')
    setShowVP(false)
    setPlaying(true)
    setKey(k => k + 1)
    setTimeout(() => setShowVP(true), 100)
  }

  function handlePulseEnd() {
    setFocalState('focal-passive')
    setShowVP(false)
    setPlaying(false)
  }

  return (
    <DemoShell label="Ohnisko — zlatý záblesk + VP + přepnutí stavu">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <div key={key}
            style={{ animation: key > 0 ? 'hex-focal-pulse 500ms ease-out' : 'none' }}
            onAnimationEnd={handlePulseEnd}>
            <HexTile state={focalState} size="md" />
          </div>
          {showVP && (
            <div key={`vp-${key}`}
              style={{
                position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                animation: 'vp-pop 500ms ease-out forwards',
                fontSize: '0.6875rem', fontWeight: 700, color: '#FFC183',
                whiteSpace: 'nowrap', pointerEvents: 'none',
              }}>
              +1 VP
            </div>
          )}
        </div>
        {!playing && key > 0 && (
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
        description="Move die — kostka se přesune z jednoho hexu na druhý."
      >
        <Preview>
          <AnimSpec
            duration="280 ms"
            easing="ease-out"
            trigger="Výběr cílového hexu"
            description="Kostka se přesune po oblouku nad herní plochou z výchozího hexu na cílový. Pohyb naznačuje taktický záměr — ne přímá lineární trajektorie."
          >
            <FrameRow>
              <HexTile state="selected" size="sm" />
              <DieFace value={4} playerColor={p1.color} size="sm" />
              <Arrow />
              <HexTile state="move" size="sm" />
              <DieFace value={4} playerColor={p1.color} size="sm" />
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <MoveDieDemo />
        </Preview>
      </Section>

      <Section
        id="pohyb-veze"
        title="Pohyb věže"
        description="Move tower — celá věž (2+ kostek) se přesune jako celek."
      >
        <Preview>
          <AnimSpec
            duration="360 ms"
            easing="ease-in-out"
            trigger="Výběr cílového hexu pro věž"
            description="Věž se přesune jako celek — pomalejší než solo kostka. Vizuálně naznačuje váhu stohovaných kostek. Věž nemůže procházet jinými kostkami."
          >
            <FrameRow>
              <HexTile state="selected" size="sm" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={2} playerColor={p1.color} size="sm" />
              </div>
              <Arrow />
              <HexTile state="move" size="sm" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={2} playerColor={p1.color} size="sm" />
              </div>
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
        description="Útočník vstoupí na nepřátelské pole, fáze 1 proběhne, nepřátelská formace je odtlačena."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimSpec
              duration="180 ms"
              easing="ease-in"
              trigger="Pohyb na nepřátelské pole (Fáze 1)"
              description="Útočná kostka blikne a sníží hodnotu o 1. Krátký shake efekt naznačuje impakt."
            >
              <FrameRow>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <Arrow />
                <DieFace value={4} playerColor={p1.color} size="sm" />
                <span style={{ fontSize: '0.75rem', color: '#E05C5C', fontWeight: 700 }}>−1</span>
              </FrameRow>
            </AnimSpec>
            <AnimSpec
              duration="320 ms"
              easing="ease-out"
              trigger="Výběr Push (Fáze 2)"
              description="Nepřátelská formace se posune o jeden hex ve směru útoku. Slide animace s mírným bounce na konci."
            >
              <FrameRow>
                <DieFace value={2} playerColor={p2.color} size="sm" />
                <span style={{ fontSize: '0.75rem', color: '#4A4560' }}>na hex</span>
                <Arrow />
                <HexTile state="empty" size="sm" />
                <span style={{ fontSize: '0.75rem', color: '#4A4560' }}>/ zničení</span>
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <CombatPhase1Demo />
            <PushDemo />
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
              <DieFace value={4} playerColor={p1.color} size="sm" />
              <Arrow />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={4} playerColor={p1.color} size="sm" />
                <DieFace value={2} playerColor={p2.color} size="sm" />
              </div>
              <DonjonBadge variant="warning">Smíšená věž</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <OccupyDemo />
        </Preview>
      </Section>

      <Section
        id="prehazovani"
        title="Přehazování"
        description="Reroll — kostka se přehodí, hodnota může jen crescendo."
      >
        <Preview>
          <AnimSpec
            duration="400 ms"
            easing="ease-out"
            trigger="Akce Přehazování — úspěch (nová hodnota vyšší)"
            description="Kostka rotuje kolem vlastní osy (3D flip efekt) a zobrazí novou hodnotu. Nová hodnota je vyšší než původní — kostka posílí."
          >
            <FrameRow>
              <DieFace value={3} playerColor={p1.color} size="sm" state="rerolled" />
              <Arrow />
              <DieFace value={5} playerColor={p1.color} size="sm" />
              <DonjonBadge variant="success">+2</DonjonBadge>
            </FrameRow>
          </AnimSpec>
          <AnimSpec
            duration="400 ms"
            easing="ease-out"
            trigger="Akce Přehazování — neúspěch (hod nižší než původní)"
            description="Kostka provede flip animaci. Nový hod je nižší než původní — původní hodnota se zachová. Krátký pulse signalizuje zachování hodnoty."
          >
            <FrameRow>
              <DieFace value={3} playerColor={p1.color} size="sm" state="rerolled" />
              <Arrow />
              <DieFace value={3} playerColor={p1.color} size="sm" />
              <DonjonBadge variant="default">zůstane původní</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <RerollDemo />
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
            trigger="Akce Kolaps věže"
            description="Spodní kostka fade-out a klesne dolů pod hrací plochu. Zbylé kostky se plynule posunou dolů a věž se vizuálně zkrátí."
          >
            <FrameRow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={3} playerColor={p1.color} size="sm" />
                <DieFace value={1} playerColor={p2.color} size="sm" state="damaged" />
              </div>
              <Arrow />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DieFace value={5} playerColor={p1.color} size="sm" />
                <DieFace value={3} playerColor={p1.color} size="sm" />
              </div>
              <DonjonBadge variant="danger">+1 VP</DonjonBadge>
            </FrameRow>
          </AnimSpec>
        </Preview>
        <Preview>
          <CollapseDemo />
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
                <HexTile state="focal-active" size="sm" />
                <DieFace value={4} playerColor={p1.color} size="sm" />
                <DonjonBadge variant="warning">+1 VP</DonjonBadge>
                <Arrow />
                <DieFace value={3} playerColor={p1.color} size="sm" state="rerolled" />
                <DonjonBadge variant="default">min(hod, 3)</DonjonBadge>
                <Arrow />
                <HexTile state="focal-passive" size="sm" />
                <span style={{ color: '#4A4560', fontSize: '0.75rem' }}>+</span>
                <HexTile state="focal-active" size="sm" />
              </FrameRow>
            </AnimSpec>
          </div>
        </Preview>
        <Preview>
          <FocalDemo />
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
