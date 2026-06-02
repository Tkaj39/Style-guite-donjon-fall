import Avatar from '../lib/tkajui/Avatar'
import FramedImage from '../lib/donjon/FramedImage'
import { Stack, Inline, Cluster } from '../lib/tkajui/Layout'
import { textLow, textMid } from '../lib/tkajui/tokens'
import { red, blue, green, yellow, purple, orange } from '../lib/donjon/playerColors'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

const SIZE_KEYS = ['xs', 'sm', 'md', 'lg', 'xl']
const PLAYER_COLORS = [red, blue, green, yellow, purple, orange]

export default function AvatarPage() {
  return (
    <ShowcasePage
      title="Avatar & FramedImage"
      description="Avatar — portrét hráče/NPC s circle nebo octagon rámem a fallback iniciálami. FramedImage — donjon-only ornamentální heraldický rám pro NPC portréty, hero artwork, character sheets."
      componentSlugs={['avatar', 'framed-image']}
    >
      <Section
        id="avatar-shapes"
        title="Avatar — circle & octagon"
        description="Dva tvary, fallback iniciály když chybí src nebo image fail. Color tint pro player identity."
      >
        <Preview>
          <Stack gap="lg">
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>circle (default)</p>
              <Inline gap="md">
                {SIZE_KEYS.map(sz => (
                  <Avatar key={sz} name="Aragorn Strider" size={sz} />
                ))}
              </Inline>
            </div>
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>octagon</p>
              <Inline gap="md">
                {SIZE_KEYS.map(sz => (
                  <Avatar key={sz} name="Aragorn Strider" size={sz} shape="octagon" />
                ))}
              </Inline>
            </div>
          </Stack>
        </Preview>
        <CodeBlock code={`<Avatar name="Aragorn" size="md" />
<Avatar name="Aragorn Strider" size="lg" shape="octagon" />`} />
      </Section>

      <Section
        id="avatar-fallback"
        title="Iniciály fallback"
        description="Bez src se vykreslí 1–2 písmena z `name` (první písmeno prvního + posledního slova). Když image fail loadne (404), automatický fallback."
      >
        <Preview>
          <Inline gap="md" align="center">
            <Avatar size="lg" />
            <Avatar name="A" size="lg" />
            <Avatar name="Frodo" size="lg" />
            <Avatar name="Frodo Baggins" size="lg" />
            <Avatar name="Peregrin Took" size="lg" />
            <Avatar name="Aragorn" src="/not-found.jpg" size="lg" />
          </Inline>
        </Preview>
        <CodeBlock code={`<Avatar name="Frodo Baggins" size="lg" />     // → "FB"
<Avatar src="/portrait.jpg" name="Aragorn" /> // → image, fallback "A"
<Avatar />                                     // → "?"`} />
      </Section>

      <Section
        id="avatar-player-colors"
        title="Player identity (color tint)"
        description="Prop `color` zabarví okraj (octagon) i fallback bg (oba tvary). Užitečné pro multiplayer scoreboard, mini-mapy, tah indikátory."
      >
        <Preview>
          <Stack gap="lg">
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>octagon · 6 hráčů</p>
              <Inline gap="sm">
                {PLAYER_COLORS.map((c, i) => (
                  <Avatar key={c} name={`P${i + 1}`} size="lg" shape="octagon" color={c} />
                ))}
              </Inline>
            </div>
            <div>
              <p style={{ margin: '0 0 8px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>circle · same set</p>
              <Inline gap="sm">
                {PLAYER_COLORS.map((c, i) => (
                  <Avatar key={c} name={`P${i + 1}`} size="lg" color={c} />
                ))}
              </Inline>
            </div>
          </Stack>
        </Preview>
        <CodeBlock code={`import { red, blue } from 'donjon-fall-ui'

<Avatar name="P1" size="lg" shape="octagon" color={red} />
<Avatar name="P2" size="lg" color={blue} />`} />
      </Section>

      <Section
        id="framed-image"
        title="FramedImage — heraldický rám (donjon)"
        description="Octagon silueta + zlatý border + (volitelné) SideOrnament po stranách + RohOrnament v rozích. Image fillne cover. Pro NPC portréty, hero artwork, character sheets."
      >
        <Preview>
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
        </Preview>
        <CodeBlock code={`<FramedImage src="/aragorn.jpg" alt="Aragorn" size="lg" />
<FramedImage src="/icon.png" size="sm" ornament="plain" />
<FramedImage src="/p1.jpg" size="md" color={red} />`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid }}>
          <p style={{ margin: 0 }}>✓ Avatar pro inline portréty (chat, scoreboard, leaderboard, mini-mapy).</p>
          <p style={{ margin: 0 }}>✓ FramedImage pro hero artwork (NPC dialog, character sheet, win screen).</p>
          <p style={{ margin: 0 }}>✓ Vždy předej `name` — i s `src` (alt text + fallback při image fail).</p>
          <p style={{ margin: 0 }}>✓ `color` prop = player identity. V multiplayer UI použij konzistentně.</p>
          <p style={{ margin: 0 }}>✗ Nepoužívej Avatar pro hero artwork (max 96 px) — použij FramedImage.</p>
          <p style={{ margin: 0 }}>✗ FramedImage nemá circle variantu — to je doménou Avataru.</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
