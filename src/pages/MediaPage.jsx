import { useState } from 'react'
import HeroImage from '../lib/tkajui/HeroImage'
import Backdrop from '../lib/tkajui/Backdrop'
import Thumbnail from '../lib/tkajui/Thumbnail'
import Avatar from '../lib/tkajui/Avatar'
import FramedImage from '../lib/donjon/FramedImage'
import Button from '../lib/tkajui/Button'
import Badge from '../lib/tkajui/Badge'
import DonjonHeroImage from '../lib/donjon/DonjonHeroImage'
import DonjonThumbnail from '../lib/donjon/DonjonThumbnail'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { Stack, Inline, Cluster } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow } from '../lib/tkajui/tokens'
import { red, blue, green, yellow, purple, orange } from '../lib/donjon/playerColors'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

const SIZE_KEYS = ['xs', 'sm', 'md', 'lg', 'xl']
const PLAYER_COLORS = [red, blue, green, yellow, purple, orange]

function HeroImageDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const HeroC = isDonjon ? DonjonHeroImage : HeroImage
  const Btn = isDonjon ? DonjonButton : Button
  // Preview wraps children with `flex flex-wrap items-start` — that doesn't
  // stretch a flex child to 100% on its own. Force the demo column to fill
  // the preview width so the heroes get their intended full-width look,
  // not the natural max-content width of their inner text.
  return (
    <Stack gap="lg" style={{ width: '100%', flexBasis: '100%' }}>
      <HeroC
        src="https://picsum.photos/seed/hero1/1200/520"
        height="md"
        title="The Hollow Crown"
        subtitle="A turn-based dungeon crawler. Your campaign awaits."
        actions={
          <>
            <Btn variant="success">Continue</Btn>
            <Btn variant="default">New game</Btn>
          </>
        }
      />
      <HeroC
        src="https://picsum.photos/seed/hero2/1200/360"
        height="sm"
        overlay="full"
        align="center"
        title="Game Over"
        subtitle="The party has fallen. Restart from last checkpoint?"
      />
    </Stack>
  )
}

function BackdropDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Stack gap="md">
      <Inline gap="sm">
        <Button onClick={() => setOpen(true)}>Show backdrop</Button>
        <span style={{ fontSize: '0.75rem', color: textLow, alignSelf: 'center' }}>
          (klikni kamkoli pro zavření)
        </span>
      </Inline>
      <Backdrop open={open} onClick={() => setOpen(false)} blur />
    </Stack>
  )
}

function ThumbnailDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const ThumbC = isDonjon ? DonjonThumbnail : Thumbnail
  const BadgeC = isDonjon ? DonjonBadge : Badge
  const [selected, setSelected] = useState(1)
  return (
    <Stack gap="lg">
      <Inline gap="md">
        {[0, 1, 2, 3].map(i => (
          <ThumbC
            key={i}
            src={`https://picsum.photos/seed/thumb${i}/200/200`}
            alt={`Save slot ${i + 1}`}
            size="md"
            selected={selected === i}
            caption={`Save ${i + 1}`}
            badge={i === 0 ? <BadgeC variant="success" size="sm">NEW</BadgeC> : null}
            onClick={() => setSelected(i)}
          />
        ))}
      </Inline>
      <Inline gap="md" align="end">
        {['xs', 'sm', 'md', 'lg', 'xl'].map(sz => (
          <ThumbC key={sz} src={`https://picsum.photos/seed/${sz}/200/200`} size={sz} caption={sz} />
        ))}
      </Inline>
    </Stack>
  )
}

function AvatarDemo() {
  return (
    <Stack gap="lg">
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>circle (default)</p>
        <Inline gap="md">
          {SIZE_KEYS.map(sz => (<Avatar key={sz} name="Aragorn Strider" size={sz} />))}
        </Inline>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>octagon</p>
        <Inline gap="md">
          {SIZE_KEYS.map(sz => (<Avatar key={sz} name="Aragorn Strider" size={sz} shape="octagon" />))}
        </Inline>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>iniciály fallback (no src / image fail)</p>
        <Inline gap="md" align="center">
          <Avatar size="lg" />
          <Avatar name="A" size="lg" />
          <Avatar name="Frodo" size="lg" />
          <Avatar name="Frodo Baggins" size="lg" />
          <Avatar name="Aragorn" src="/not-found.jpg" size="lg" />
        </Inline>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>player identity (color tint) · octagon</p>
        <Inline gap="sm">
          {PLAYER_COLORS.map((c, i) => (<Avatar key={c} name={`P${i + 1}`} size="lg" shape="octagon" color={c} />))}
        </Inline>
      </div>
    </Stack>
  )
}

function FramedImageDemo() {
  return (
    <Stack gap="lg">
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>decorated (default) · 5 velikostí</p>
        <Inline gap="lg" align="end">
          {SIZE_KEYS.map(sz => (
            <FramedImage key={sz} src="https://picsum.photos/seed/donjon/256/256" alt="" size={sz} />
          ))}
        </Inline>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>plain</p>
        <Inline gap="lg" align="end">
          {SIZE_KEYS.map(sz => (
            <FramedImage key={sz} src="https://picsum.photos/seed/donjon/256/256" alt="" size={sz} ornament="plain" />
          ))}
        </Inline>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>color override · player identity</p>
        <Cluster gap="md">
          {PLAYER_COLORS.map((c, i) => (
            <FramedImage key={c} src={`https://picsum.photos/seed/p${i}/200/200`} alt="" size="md" color={c} />
          ))}
        </Cluster>
      </div>
    </Stack>
  )
}

export default function MediaPage() {
  return (
    <ShowcasePage
      title="Media"
      description="Avatar + Thumbnail + FramedImage + HeroImage + Backdrop — kompletní rodina media tiles uspořádaná od nejmenší (identita) po nejvíc plnou (full-screen feature). (IconButton se přestěhoval pod /buttons#icon-button.)"
      componentSlugs={['avatar', 'thumbnail', 'donjon-thumbnail', 'framed-image', 'hero-image', 'donjon-hero-image', 'backdrop']}
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section
        id="avatar"
        title="Avatar — identity portrait"
        description="Circle (default) nebo octagon, fallback iniciály z `name` když chybí src nebo image fail. `color` prop pro player identity."
      >
        <Preview>
          <AvatarDemo />
        </Preview>
        <CodeBlock code={`<Avatar name="Aragorn" size="md" />
<Avatar name="Frodo Baggins" size="lg" shape="octagon" />

// Player identity
import { red, blue } from 'donjon-fall-ui'
<Avatar name="P1" size="lg" shape="octagon" color={red} />`} />
      </Section>

      <Section
        id="thumbnail"
        title="Thumbnail — media tile s caption"
        description="Klikatelný media tile s volitelným accent ringem (selected), caption pod obrázkem a slot pro badge (count, NEW, status). `aspect` prop pro 16:9 / portrét / square."
      >
        <Preview>
          <ThumbnailDemo />
        </Preview>
        <CodeBlock code={`<Thumbnail
  src="/save1.jpg"
  caption="Save 1"
  badge={<Badge variant="success" size="sm">NEW</Badge>}
  selected={current === 1}
  onClick={() => setCurrent(1)}
/>

{/* 16:9 */}
<Thumbnail src="/screenshot.jpg" size="lg" aspect={16/9} />`} />
      </Section>

      <Section
        id="framed-image"
        title="FramedImage — heraldický rám (donjon)"
        description="Octagon silueta + zlatý border + (volitelné) RohOrnament v rozích. Image fillne cover. Pro NPC portréty, hero artwork, character sheets."
      >
        <Preview>
          <FramedImageDemo />
        </Preview>
        <CodeBlock code={`<FramedImage src="/aragorn.jpg" alt="Aragorn" size="lg" />
<FramedImage src="/icon.png" size="sm" ornament="plain" />
<FramedImage src="/p1.jpg" size="md" color={red} />`} />
      </Section>

      <Section
        id="hero-image"
        title="HeroImage — featured banner"
        description="Velký obrázek s gradient scrim + vrstva pro title/subtitle/actions. `overlay`: bottom (default) / full / none. `align` určuje vertikální pozici contentu."
      >
        <Preview>
          <HeroImageDemo />
        </Preview>
        <CodeBlock code={`<HeroImage
  src="/hero.jpg"
  height="md"
  title="The Hollow Crown"
  subtitle="A turn-based dungeon crawler."
  actions={<Button variant="success">Continue</Button>}
/>

{/* Centered, full dim */}
<HeroImage src="/end.jpg" height="sm" overlay="full" align="center"
  title="Game Over" />`} />
      </Section>

      <Section
        id="backdrop"
        title="Backdrop — dim overlay"
        description="Full-viewport tmavá vrstva. Pro custom floating panely (Drawer, popovery). Reálné modaly mají vlastní backdrop přes native <dialog> ::backdrop."
      >
        <Preview>
          <BackdropDemo />
        </Preview>
        <CodeBlock code={`<Backdrop open={isOpen} onClick={close} />

{/* With blur */}
<Backdrop open={isOpen} blur opacity={0.7} onClick={close} />`} />
      </Section>

      <Section id="legacy-routes" title="Legacy URL → anchor map">
        <Stack gap="xs" style={{ fontSize: '0.8125rem', color: textMid }}>
          <p style={{ margin: 0 }}><code>/avatar</code> → <code>/media#avatar</code> (FramedImage → #framed-image)</p>
          <p style={{ margin: 0 }}><code>/buttons-media</code> → <code>/media</code> (IconButton → /buttons#icon-button)</p>
          <p style={{ margin: 0, color: textLow }}>Staré routes jsou Navigate redirects.</p>
        </Stack>
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>Avatar</strong> pro inline portréty (chat, scoreboard, leaderboard).</p>
          <p style={{ margin: 0 }}>✓ <strong>Thumbnail</strong> jako {'`<button>`'} (s onClick) automaticky dostane `aria-pressed`.</p>
          <p style={{ margin: 0 }}>✓ <strong>FramedImage</strong> pro hero artwork (NPC dialog, character sheet, win screen). Donjon-only.</p>
          <p style={{ margin: 0 }}>✓ <strong>HeroImage</strong> nepoužívej pro avatary nebo malé media (max ~600 px), na to je Thumbnail / FramedImage.</p>
          <p style={{ margin: 0 }}>✓ <strong>Backdrop</strong> pouze pro non-modal floating panely — Modal má svůj přes ::backdrop.</p>
          <p style={{ margin: 0 }}>✗ Nepoužívej Avatar pro hero artwork (max 96 px) — použij FramedImage.</p>
          <p style={{ margin: 0 }}>✗ FramedImage nemá circle variantu — to je doménou Avataru.</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie media tiles: Avatar (identita, kruh) → Thumbnail (media pick) → FramedImage (game ornament) → HeroImage (full-width feature).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
