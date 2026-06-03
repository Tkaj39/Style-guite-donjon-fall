import { useState } from 'react'
import IconButton from '../lib/tkajui/IconButton'
import HeroImage from '../lib/tkajui/HeroImage'
import Backdrop from '../lib/tkajui/Backdrop'
import Thumbnail from '../lib/tkajui/Thumbnail'
import Button from '../lib/tkajui/Button'
import Badge from '../lib/tkajui/Badge'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

function IconButtonDemo() {
  const [muted, setMuted] = useState(false)
  return (
    <Stack gap="lg">
      <Inline gap="md" align="center">
        {['xs', 'sm', 'md', 'lg'].map(sz => (
          <Stack key={sz} gap="xs" align="center">
            <IconButton size={sz} ariaLabel="Settings">⚙</IconButton>
            <span style={{ fontSize: '0.7rem', color: textLow }}>{sz}</span>
          </Stack>
        ))}
      </Inline>
      <Inline gap="sm" align="center">
        <IconButton ariaLabel="Confirm" variant="success">✓</IconButton>
        <IconButton ariaLabel="Delete"  variant="danger">×</IconButton>
        <IconButton ariaLabel="Warning" variant="warning">!</IconButton>
        <IconButton ariaLabel="Info"    variant="info">ⓘ</IconButton>
        <IconButton ariaLabel="Disabled" disabled>↻</IconButton>
        <IconButton ariaLabel="Mute" active={muted} onClick={() => setMuted(m => !m)}>{muted ? '🔇' : '🔊'}</IconButton>
      </Inline>
    </Stack>
  )
}

function HeroImageDemo() {
  return (
    <Stack gap="lg">
      <HeroImage
        src="https://picsum.photos/seed/hero1/1200/520"
        height="md"
        title="The Hollow Crown"
        subtitle="A turn-based dungeon crawler. Your campaign awaits."
        actions={
          <>
            <Button variant="success">Continue</Button>
            <Button variant="default">New game</Button>
          </>
        }
      />
      <HeroImage
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
  const [selected, setSelected] = useState(1)
  return (
    <Stack gap="lg">
      <Inline gap="md">
        {[0, 1, 2, 3].map(i => (
          <Thumbnail
            key={i}
            src={`https://picsum.photos/seed/thumb${i}/200/200`}
            alt={`Save slot ${i + 1}`}
            size="md"
            selected={selected === i}
            caption={`Save ${i + 1}`}
            badge={i === 0 ? <Badge variant="success" size="sm">NEW</Badge> : null}
            onClick={() => setSelected(i)}
          />
        ))}
      </Inline>
      <Inline gap="md" align="end">
        {['xs', 'sm', 'md', 'lg', 'xl'].map(sz => (
          <Thumbnail key={sz} src={`https://picsum.photos/seed/${sz}/200/200`} size={sz} caption={sz} />
        ))}
      </Inline>
    </Stack>
  )
}

export default function ButtonsMediaPage() {
  return (
    <ShowcasePage
      title="Buttons & media"
      description="IconButton + HeroImage + Backdrop + Thumbnail — primitiva pro akční pruhy, splash obrazovky, media pickery a dim overlay vrstvy."
      componentSlugs={['icon-button', 'hero-image', 'backdrop', 'thumbnail']}
    >
      <Section
        id="icon-button"
        title="IconButton — square icon-only action"
        description="Stejný octagonální silhouette jako Button, ale width=height. Always vyžaduje `ariaLabel`. `active` prop pro toggle (mute, pin)."
      >
        <Preview>
          <IconButtonDemo />
        </Preview>
        <CodeBlock code={`<IconButton ariaLabel="Settings">⚙</IconButton>
<IconButton ariaLabel="Confirm" variant="success">✓</IconButton>
<IconButton ariaLabel="Mute" active={muted} onClick={toggle}>🔇</IconButton>`} />
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

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>IconButton</strong> vždy s `ariaLabel` — bez něj screen reader uvidí jen "button".</p>
          <p style={{ margin: 0 }}>✓ <strong>HeroImage</strong> nepoužívej pro avatary nebo malé media (max ~600 px), na to je Thumbnail / FramedImage.</p>
          <p style={{ margin: 0 }}>✓ <strong>Backdrop</strong> pouze pro non-modal floating panely — Modal má svůj přes ::backdrop.</p>
          <p style={{ margin: 0 }}>✓ <strong>Thumbnail</strong> jako {'`<button>`'} (s onClick) automaticky dostane `aria-pressed`.</p>
          <p style={{ margin: 0 }}>✗ Nepoužívej IconButton pro důležité akce v primary CTA — používá ho jen jako sekundární action (close, settings, more).</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie media tiles: Avatar (identita, kruh) → Thumbnail (media pick) → FramedImage (game ornament) → HeroImage (full-width feature).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
