import { Stack, Inline, Cluster } from '../lib/tkajui/Layout'
import { surface3, surface4, borderDefault, textHigh, textMid, textLow, accent } from '../lib/tkajui/tokens'
import { SPACE, SPACE_VALUES } from '../lib/shared/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

/* ── Tiny demo blocks so the layout shape is visible ─────────────────── */
function Box({ children, color = surface3, w, h }) {
  return (
    <div style={{
      background: color,
      border: `1px solid ${borderDefault}`,
      padding: '8px 12px',
      borderRadius: 4,
      color: textHigh,
      fontSize: '0.8125rem',
      whiteSpace: 'nowrap',
      width: w,
      height: h,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {children}
    </div>
  )
}

function Chip({ children }) {
  return (
    <span style={{
      background: surface4,
      border: `1px solid ${borderDefault}`,
      borderRadius: 999,
      padding: '4px 10px',
      fontSize: '0.6875rem',
      color: textHigh,
      letterSpacing: '0.04em',
    }}>{children}</span>
  )
}

export default function LayoutPage() {
  return (
    <ShowcasePage
      title="Layout primitives"
      description="Tři malé flex wrappery — Stack (vertikální), Inline (horizontální bez wrap), Cluster (horizontální s wrap). Sdílejí stejnou spacing škálu (xs–xxl) napříč TkajUI i donjon-fall-ui."
      componentSlugs={['stack', 'inline', 'cluster']}
    >
      <Section
        id="stack"
        title="Stack — vertikální sloupec"
        description="Děti se vyskládají top-to-bottom s konzistentním gap. Cross-axis ve výchozím stavu stretch — všechny děti zaberou plnou šířku."
      >
        <Preview>
          <Stack gap="md">
            <Box>First</Box>
            <Box>Second</Box>
            <Box>Third</Box>
          </Stack>
        </Preview>
        <CodeBlock code={`<Stack gap="md">
  <Card>First</Card>
  <Card>Second</Card>
  <Card>Third</Card>
</Stack>`} />
      </Section>

      <Section
        id="inline"
        title="Inline — horizontální řada"
        description="Děti vedle sebe v řádku. Bez `wrap` přetečou (overflow scrolls); pro automatický wrap použij Cluster."
      >
        <Preview>
          <Inline gap="md">
            <Box>One</Box>
            <Box>Two</Box>
            <Box>Three</Box>
            <Box>Four</Box>
          </Inline>
        </Preview>
        <CodeBlock code={`<Inline gap="md" align="center">
  <Avatar />
  <Stack gap="xs">
    <Title />
    <Subtitle />
  </Stack>
</Inline>`} />
      </Section>

      <Section
        id="cluster"
        title="Cluster — auto-wrap collection"
        description="Horizontální řada která se sama zalamuje. Built pro chip/tag/badge collections kde počet prvků varíruje."
      >
        <Preview>
          <Cluster gap="xs" style={{ maxWidth: 400 }}>
            {['Fantasy', 'RPG', 'Turn-based', 'Strategy', 'Multiplayer', 'Hex grid', 'Procedural', 'Difficulty: Hard', 'PvP', 'Permadeath'].map(t => (
              <Chip key={t}>{t}</Chip>
            ))}
          </Cluster>
        </Preview>
        <CodeBlock code={`<Cluster gap="xs">
  {tags.map(t => <Chip key={t}>{t}</Chip>)}
</Cluster>`} />
      </Section>

      <Section
        id="gap-tokens"
        title="Sdílená spacing škála"
        description="Všechny tři komponenty (a kdokoli další) akceptují named token nebo raw px číslo. Tokeny: xs=4 · sm=8 · md=16 · lg=24 · xl=32 · xxl=48."
      >
        <Preview>
          <Stack gap="lg">
            {SPACE_VALUES.map(key => (
              <div key={key}>
                <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  gap=&quot;{key}&quot; · {SPACE[key]} px
                </p>
                <Inline gap={key}>
                  <Box>A</Box>
                  <Box>B</Box>
                  <Box>C</Box>
                </Inline>
              </div>
            ))}
          </Stack>
        </Preview>
        <CodeBlock code={`<Stack  gap="md" />     // 16 px
<Inline gap="xs" />     //  4 px
<Cluster gap={20} />    // raw px (escape hatch)

import { SPACE, SPACE_VALUES } from 'tkajui'
SPACE.md          // → 16
SPACE_VALUES      // → ['none','xs','sm','md','lg','xl','xxl']`} />
      </Section>

      <Section
        id="align-justify"
        title="align + justify"
        description="Cross-axis (align) a main-axis (justify) jako klasický flexbox, jen s krátkými alias hodnotami (start/center/end/stretch/baseline; start/center/end/between/around/evenly)."
      >
        <Preview>
          <Stack gap="lg">
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Inline · justify=&quot;between&quot;
              </p>
              <Inline gap="sm" justify="between" style={{ width: 320, border: `1px dashed ${borderDefault}`, padding: 8 }}>
                <Box color={accent}>L</Box>
                <Box>M</Box>
                <Box color={accent}>R</Box>
              </Inline>
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Stack · align=&quot;center&quot;
              </p>
              <Stack gap="sm" align="center" style={{ border: `1px dashed ${borderDefault}`, padding: 8 }}>
                <Box w={60}>A</Box>
                <Box w={120}>BB</Box>
                <Box w={80}>CC</Box>
              </Stack>
            </div>
          </Stack>
        </Preview>
        <CodeBlock code={`<Inline gap="sm" justify="between">
  <BackButton />
  <Title />
  <CloseButton />
</Inline>

<Stack gap="md" align="center">
  <Avatar />
  <Username />
</Stack>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid }}>
          <p style={{ margin: 0 }}>✓ Stack pro vertikální skupiny (formuláře, karty pod sebou, sidebar sekce).</p>
          <p style={{ margin: 0 }}>✓ Inline pro horizontální řady s pevným počtem (toolbar, ikona+text, header).</p>
          <p style={{ margin: 0 }}>✓ Cluster pro proměnný počet chips/tagů/badgů kde wrap je vítaný.</p>
          <p style={{ margin: 0 }}>✓ Gap vždy přes token (xs–xxl) — raw px jen v escape hatch případech.</p>
          <p style={{ margin: 0 }}>✗ Nepoužívej Inline když potřebuješ wrap — vznikne overflow. Použij Cluster.</p>
          <p style={{ margin: 0 }}>✗ Neřeš spacing inline-stylem (style=&#123;&#123; gap: 16 &#125;&#125;) — porušuje tokenovou škálu.</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
