import { useState, useEffect } from 'react'
import HUDLayout from '../lib/donjon/HUDLayout'
import Scoreboard from '../lib/donjon/Scoreboard'
import Leaderboard from '../lib/donjon/Leaderboard'
import Cooldown from '../lib/donjon/Cooldown'
import Minimap from '../lib/donjon/Minimap'
import Timeline from '../lib/donjon/Timeline'
import Sprite from '../lib/donjon/Sprite'
import Button from '../lib/tkajui/Button'
import Badge from '../lib/tkajui/Badge'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { bg2, borderDefault, textMid, textLow, gold, gainColor, dangerColor, infoColor, magicColor } from '../lib/donjon/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

function HUDLayoutDemo() {
  return (
    <div style={{ border: `1px solid ${borderDefault}`, borderRadius: 6, overflow: 'hidden' }}>
      <HUDLayout
        height={360}
        top={<Inline justify="between" align="center"><strong style={{ color: gold }}>⚔ Donjon Fall</strong><span style={{ color: textMid, fontSize: '0.75rem' }}>Turn 14 · Spring 1304</span></Inline>}
        bottom={<Inline justify="between" align="center"><span style={{ color: textMid, fontSize: '0.75rem' }}>HP 84 / 100 · MP 32 / 50</span><Inline gap="xs"><Button size="sm">End turn</Button></Inline></Inline>}
        topLeft={<Badge variant="warning">Quest: Find the Crown</Badge>}
        topRight={<Badge variant="info">2 / 5 explored</Badge>}
        bottomRight={<Badge variant="danger">⚠ Low HP</Badge>}
      >
        <div style={{
          height: '100%',
          // eslint-disable-next-line donjon/no-hardcoded-hex -- gradient end stop, deeper than bg0 (#12102A) for vignette feel
          background: `radial-gradient(ellipse at center, ${bg2}, #060614)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: textLow, fontSize: '0.875rem',
        }}>
          (gameplay area — battlefield, map, dialog…)
        </div>
      </HUDLayout>
    </div>
  )
}

const PLAYERS = [
  { id: '1', name: 'Aragorn',   score: 84, color: gainColor, current: true, stats: [{ label: 'HP', value: 92 }, { label: 'Kills', value: 14 }] },
  { id: '2', name: 'Legolas',   score: 71, color: infoColor,                stats: [{ label: 'HP', value: 78 }, { label: 'Kills', value: 22 }] },
  { id: '3', name: 'Gimli',     score: 65, color: dangerColor,              stats: [{ label: 'HP', value: 88 }, { label: 'Kills', value: 18 }] },
  { id: '4', name: 'Boromir',   score: 0,  color: magicColor, eliminated: true, stats: [{ label: 'HP', value: 0 }, { label: 'Kills', value: 8 }] },
]

function ScoreboardDemo() {
  return (
    <Stack gap="lg">
      <Scoreboard title="Live scores" players={PLAYERS} />
      <Scoreboard title="Match table" players={PLAYERS} layout="table" />
    </Stack>
  )
}

const LEADERBOARD = [
  { id: '1',  name: 'Aragorn',   score: 12450, meta: '14:23',     avatar: 'https://picsum.photos/seed/a/40/40' },
  { id: '2',  name: 'Legolas',   score: 11200, meta: '15:01',     avatar: 'https://picsum.photos/seed/l/40/40' },
  { id: '3',  name: 'Gandalf',   score: 10840, meta: '12:55',     avatar: 'https://picsum.photos/seed/g/40/40' },
  { id: '4',  name: 'Gimli',     score: 9320,  meta: '18:14',     avatar: 'https://picsum.photos/seed/i/40/40', current: true },
  { id: '5',  name: 'Boromir',   score: 8150,  meta: '20:42',     avatar: 'https://picsum.photos/seed/b/40/40' },
  { id: '6',  name: 'Pippin',    score: 6100,  meta: '24:08',     avatar: 'https://picsum.photos/seed/p/40/40' },
]

function LeaderboardDemo() {
  return <Leaderboard title="All-time best" entries={LEADERBOARD} />
}

function CooldownDemo() {
  const [remaining, setRemaining] = useState(5000)
  useEffect(() => {
    if (remaining <= 0) return undefined
    const t = setInterval(() => setRemaining(r => Math.max(0, r - 100)), 100)
    return () => clearInterval(t)
  }, [remaining])
  return (
    <Stack gap="lg">
      <Inline gap="sm">
        <Button onClick={() => setRemaining(5000)}>Reset 5 s</Button>
        <Button onClick={() => setRemaining(0)}>Done</Button>
      </Inline>
      <Inline gap="lg" align="center">
        {['sm', 'md', 'lg', 'xl'].map(sz => (
          <Cooldown key={sz} size={sz} remaining={remaining} total={5000} />
        ))}
      </Inline>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Linear shape (no label)</span>
        <Cooldown shape="linear" remaining={remaining} total={5000} size={200} />
      </Stack>
    </Stack>
  )
}

function MinimapDemo() {
  const [vp, setVp] = useState({ x: 0.4, y: 0.3, w: 0.2, h: 0.2 })
  return (
    <Stack gap="md">
      <Minimap
        src="https://picsum.photos/seed/map/300/300"
        size={200}
        viewport={vp}
        markers={[
          { x: 0.5,  y: 0.4, color: gold,        label: 'You' },
          { x: 0.7,  y: 0.8, color: dangerColor, label: 'Enemy' },
          { x: 0.2,  y: 0.6, color: gainColor,   label: 'Healer' },
          { x: 0.85, y: 0.15, color: infoColor,  label: 'Goal' },
        ]}
        onClick={(x, y) => setVp(v => ({ ...v, x: x - v.w / 2, y: y - v.h / 2 }))}
      />
      <span style={{ fontSize: '0.75rem', color: textMid }}>Click the minimap to recenter viewport.</span>
    </Stack>
  )
}

function TimelineDemo() {
  return (
    <Timeline items={[
      { id: 't1', time: 'T 1', icon: '⚔', title: 'Battle of Westford',  description: 'Defeated 3 orc scouts.' },
      { id: 't2', time: 'T 2', icon: '🧪', title: 'Used Healing Potion', description: 'Restored 35 HP.', color: gainColor },
      { id: 't3', time: 'T 3', icon: '💀', title: 'Boromir fell',         description: 'Permadeath. Party reduced to 3.', color: dangerColor },
      { id: 't4', time: 'T 4', icon: '🗝',  title: 'Found Brass Key',     description: 'Opens the East Gate of the keep.' },
      { id: 't5', time: 'T 5', icon: '✦',  title: 'Level up — Lvl 8',    color: gold, current: true },
    ]} />
  )
}

// Inline data-URI placeholder strip — 4 frames of a pulsing dot at 24×24
// (gold tints → white). Lets the demo run without external assets. The
// hexes below are pixel fills inside an SVG data URI (not component
// styling) so they are flagged but legitimate; we silence the rule for
// this single literal.
/* eslint-disable donjon/no-hardcoded-hex -- pixel fills inside an inline SVG data URI for the demo sprite sheet */
const PIXEL_SPRITE = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="24" viewBox="0 0 96 24">
  <rect x="6"  y="6"  width="12" height="12" fill="#FFC183"/>
  <rect x="30" y="3"  width="18" height="18" fill="#FF9F50"/>
  <rect x="55" y="0"  width="24" height="24" fill="#FFE8B0"/>
  <rect x="79" y="3"  width="18" height="18" fill="#FFFFFF"/>
</svg>
`)
/* eslint-enable donjon/no-hardcoded-hex */

function SpriteDemo() {
  const [playing, setPlaying] = useState(true)
  const [fps, setFps] = useState(6)
  return (
    <Stack gap="md">
      <Inline gap="md" align="center">
        <Sprite src={PIXEL_SPRITE} frameWidth={24} frameHeight={24} frames={4} fps={fps} playing={playing} scale={3} />
        <Inline gap="sm">
          <Button size="sm" onClick={() => setPlaying(p => !p)}>{playing ? 'Pause' : 'Play'}</Button>
          <Button size="sm" onClick={() => setFps(f => Math.max(1, f - 2))}>− fps</Button>
          <Button size="sm" onClick={() => setFps(f => Math.min(60, f + 2))}>+ fps</Button>
          <span style={{ fontSize: '0.75rem', color: textMid, alignSelf: 'center' }}>{fps} fps</span>
        </Inline>
      </Inline>
      <Inline gap="md">
        <Sprite src={PIXEL_SPRITE} frameWidth={24} frameHeight={24} frames={4} fps={3}  scale={2} />
        <Sprite src={PIXEL_SPRITE} frameWidth={24} frameHeight={24} frames={4} fps={12} scale={2} />
        <Sprite src={PIXEL_SPRITE} frameWidth={24} frameHeight={24} frames={4} fps={24} scale={2} />
        <Sprite src={PIXEL_SPRITE} frameWidth={24} frameHeight={24} frames={4} fps={6}  scale={2} flip />
      </Inline>
    </Stack>
  )
}

export default function GameLayoutPage() {
  return (
    <ShowcasePage
      title="Game-specific layout"
      description="HUDLayout + Scoreboard + Leaderboard + Cooldown + Minimap + Timeline + Sprite — donjon-themed sada pro HUD shell, live scoring, post-match ranking, ability cooldowns, world overview, turn log a sprite-sheet animace."
      componentSlugs={['hud-layout', 'scoreboard', 'leaderboard', 'cooldown', 'minimap', 'timeline', 'sprite']}
    >
      <Section
        id="hud-layout"
        title="HUDLayout — full-screen HUD shell"
        description="Top bar + bottom bar + 4 corner sloty (topLeft / topRight / bottomLeft / bottomRight) + center gameplay area. Bars zachovají flex height, corner sloty se absolutně positionují nad gameplay."
      >
        <Preview><HUDLayoutDemo /></Preview>
        <CodeBlock code={`<HUDLayout
  top={<TurnIndicator />}
  bottom={<ActionBar />}
  topLeft={<QuestBadge />}
  topRight={<ExploredCounter />}
  bottomRight={<LowHPWarning />}
>
  <Battlefield />
</HUDLayout>`} />
      </Section>

      <Section
        id="scoreboard"
        title="Scoreboard — live in-game scores"
        description="Multi-player chip strip (compact) nebo full table. Player color jako levý border, current = highlight, eliminated = strikethrough + dim."
      >
        <Preview><ScoreboardDemo /></Preview>
        <CodeBlock code={`<Scoreboard title="Live scores" players={[
  { id: '1', name: 'Aragorn', score: 84, color: green, current: true },
  { id: '2', name: 'Legolas', score: 71, color: blue },
  { id: '3', name: 'Boromir', score: 0,  color: purple, eliminated: true },
]} />

<Scoreboard players={players} layout="table" />`} />
      </Section>

      <Section
        id="leaderboard"
        title="Leaderboard — ranked list"
        description="Pro post-match nebo all-time. Top 3 dostanou medaile (🥇 🥈 🥉) místo čísla. current zvýrazní hráče. avatar je optional kruh."
      >
        <Preview><LeaderboardDemo /></Preview>
        <CodeBlock code={`<Leaderboard title="All-time best" entries={[
  { id: '1', name: 'Aragorn',  score: 12450, meta: '14:23' },
  { id: '4', name: 'You',      score: 9320,  meta: '18:14', current: true },
]} />`} />
      </Section>

      <Section
        id="cooldown"
        title="Cooldown — countdown indicator"
        description="Circle (default) nebo linear shape. Owner = váš game loop — passněte updatovaný `remaining` (ms) + `total` (ms). Done state ukáže ✓ nebo `icon`."
      >
        <Preview><CooldownDemo /></Preview>
        <CodeBlock code={`<Cooldown remaining={3200} total={5000} size="md" />

{/* Linear bar */}
<Cooldown shape="linear" remaining={remaining} total={5000} size={200} />`} />
      </Section>

      <Section
        id="minimap"
        title="Minimap — compact world view"
        description="Background image (nebo solid bg) + viewport rectangle (visible region) + markery na normalizovaných (x, y) ∈ [0, 1]. Click pro recenter — vrátí normalizované coords."
      >
        <Preview><MinimapDemo /></Preview>
        <CodeBlock code={`<Minimap
  src="/map.png"
  size={200}
  viewport={{ x: 0.4, y: 0.3, w: 0.2, h: 0.2 }}
  markers={[
    { x: 0.5, y: 0.4, color: gold,        label: 'You' },
    { x: 0.7, y: 0.8, color: dangerColor, label: 'Enemy' },
  ]}
  onClick={(x, y) => recenter(x, y)}
/>`} />
      </Section>

      <Section
        id="timeline"
        title="Timeline — vertical event log"
        description="Items vertikálně s connecting line. Time (turn # / hodina) v levém railu, dot + icon uprostřed, title + description vpravo. `current` zvýrazní (gold + glow + tučně)."
      >
        <Preview><TimelineDemo /></Preview>
        <CodeBlock code={`<Timeline items={[
  { id: 't1', time: 'T 1', icon: '⚔', title: 'Battle of Westford' },
  { id: 't3', time: 'T 3', icon: '💀', title: 'Boromir fell', color: dangerColor },
  { id: 't5', time: 'T 5', icon: '✦', title: 'Level up', color: gold, current: true },
]} />`} />
      </Section>

      <Section
        id="sprite"
        title="Sprite — sprite-sheet animation"
        description="Horizontal strip s N stejně širokými framy. CSS steps() animation posouvá background-position. `pixelated` image rendering pro retro feel. `flip` mirror, `playing` ovládá play/pause."
      >
        <Preview><SpriteDemo /></Preview>
        <CodeBlock code={`<Sprite
  src="/orc-walk.png"
  frameWidth={32}
  frameHeight={48}
  frames={8}
  fps={12}
  scale={2}
  playing={isActive}
/>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: bg2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>HUDLayout</strong> jen na screen rootu — pro sub-panely SidebarLayout / Stack.</p>
          <p style={{ margin: 0 }}>✓ <strong>Scoreboard</strong> = live, <strong>Leaderboard</strong> = ranked / archived.</p>
          <p style={{ margin: 0 }}>✓ <strong>Cooldown</strong> komponenta nemá vlastní timer — owner je tvůj game loop.</p>
          <p style={{ margin: 0 }}>✓ <strong>Minimap</strong> coords jsou vždy normalizované (0–1) — žádné px.</p>
          <p style={{ margin: 0 }}>✓ <strong>Timeline</strong> renderuje v daném pořadí — chronological vs reverse-chrono řešíš ty.</p>
          <p style={{ margin: 0 }}>✓ <strong>Sprite</strong> = horizontal strip, retro pixel-art friendly (image-rendering: pixelated).</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie game layout: HUDLayout (root) → corner sloty (Minimap / Cooldown / Timeline) → gameplay center (Sprite, Scoreboard).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
