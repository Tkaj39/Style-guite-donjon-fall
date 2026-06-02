import { Stack, Inline, Cluster, Grid, Container, Box, Spacer, Split, Center } from '../lib/tkajui/Layout'
import { surface2, surface3, surface4, borderDefault, borderMid, textHigh, textMid, textLow, accent } from '../lib/tkajui/tokens'
import { SPACE, SPACE_VALUES } from '../lib/shared/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

/* ── Tiny demo blocks so the layout shape is visible ─────────────────── */
function DemoBox({ children, color = surface3, w, h }) {
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
      componentSlugs={['stack', 'inline', 'cluster', 'grid', 'container', 'box', 'spacer', 'split', 'center']}
    >
      <Section
        id="stack"
        title="Stack — vertikální sloupec"
        description="Děti se vyskládají top-to-bottom s konzistentním gap. Cross-axis ve výchozím stavu stretch — všechny děti zaberou plnou šířku."
      >
        <Preview>
          <Stack gap="md">
            <DemoBox>First</DemoBox>
            <DemoBox>Second</DemoBox>
            <DemoBox>Third</DemoBox>
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
            <DemoBox>One</DemoBox>
            <DemoBox>Two</DemoBox>
            <DemoBox>Three</DemoBox>
            <DemoBox>Four</DemoBox>
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
                  <DemoBox>A</DemoBox>
                  <DemoBox>B</DemoBox>
                  <DemoBox>C</DemoBox>
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
                <DemoBox color={accent}>L</DemoBox>
                <DemoBox>M</DemoBox>
                <DemoBox color={accent}>R</DemoBox>
              </Inline>
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Stack · align=&quot;center&quot;
              </p>
              <Stack gap="sm" align="center" style={{ border: `1px dashed ${borderDefault}`, padding: 8 }}>
                <DemoBox w={60}>A</DemoBox>
                <DemoBox w={120}>BB</DemoBox>
                <DemoBox w={80}>CC</DemoBox>
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

      <Section
        id="grid"
        title="Grid — CSS Grid wrapper"
        description="N stejných sloupců s tokenizovaným gap. Pro responzivní cols předej objekt: `cols={{ base: 1, md: 2, lg: 3 }}`."
      >
        <Preview>
          <Stack gap="md">
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>cols={3}</p>
              <Grid cols={3} gap="md">
                {[1, 2, 3, 4, 5, 6].map(n => <Box key={n} bg={surface3} borderColor={borderDefault} padding="md">{n}</Box>)}
              </Grid>
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>responzivní · base=1 · md=3</p>
              <Grid cols={{ base: 1, md: 3 }} gap="sm">
                {['A', 'B', 'C'].map(t => <Box key={t} bg={surface3} borderColor={borderDefault} padding="md">{t}</Box>)}
              </Grid>
            </div>
          </Stack>
        </Preview>
        <CodeBlock code={`<Grid cols={3} gap="md">
  {items.map(item => <Card key={item.id} />)}
</Grid>

{/* Responzivní cols */}
<Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
  ...
</Grid>`} />
      </Section>

      <Section
        id="container"
        title="Container — centered page wrapper"
        description="Max-width + horizontal padding. Předdefinované breakpoints (sm=640, md=768, lg=1024, xl=1280, full=100%)."
      >
        <Preview>
          <Stack gap="md">
            <Container maxWidth="sm" padding="md" style={{ background: surface2, border: `1px dashed ${borderMid}` }}>
              <span style={{ fontSize: '0.75rem', color: textMid }}>maxWidth=&quot;sm&quot; (640 px)</span>
            </Container>
            <Container maxWidth="md" padding="md" style={{ background: surface2, border: `1px dashed ${borderMid}` }}>
              <span style={{ fontSize: '0.75rem', color: textMid }}>maxWidth=&quot;md&quot; (768 px)</span>
            </Container>
            <Container maxWidth="lg" padding="md" style={{ background: surface2, border: `1px dashed ${borderMid}` }}>
              <span style={{ fontSize: '0.75rem', color: textMid }}>maxWidth=&quot;lg&quot; (1024 px, default)</span>
            </Container>
          </Stack>
        </Preview>
        <CodeBlock code={`<Container maxWidth="lg" padding="md">
  <Stack gap="lg">
    <Header />
    <Content />
  </Stack>
</Container>`} />
      </Section>

      <Section
        id="box"
        title="Box — surface primitive"
        description="Background + border + padding + radius. Color tokeny jsou předávané callerem (Box neví o lib-specifických surface tokenech), tak `bg` / `borderColor` přijímají jakýkoliv CSS color string."
      >
        <Preview>
          <Inline gap="md" wrap>
            <Box bg={surface2} borderColor={borderDefault} padding="md" radius={4}>
              <span style={{ color: textHigh, fontSize: '0.8125rem' }}>Default Box</span>
            </Box>
            <Box bg={surface4} borderColor={accent} padding="lg" radius={8}>
              <span style={{ color: textHigh, fontSize: '0.8125rem' }}>Accent Box · radius 8</span>
            </Box>
            <Box bg={surface3} padding="md" paddingX="xl">
              <span style={{ color: textMid, fontSize: '0.8125rem' }}>paddingX=&quot;xl&quot; override</span>
            </Box>
          </Inline>
        </Preview>
        <CodeBlock code={`import { Box, surface2, borderDefault } from 'tkajui'

<Box bg={surface2} borderColor={borderDefault} padding="md" radius={4}>
  Card content
</Box>

<Box padding="md" paddingX="xl">    {/* Override jednou stranou */}
  Wider horizontal padding
</Box>`} />
      </Section>

      <Section
        id="spacer"
        title="Spacer — vyplní available space"
        description="Vloží flexibilní prostor mezi sourozence ve flex containeru. Užitečné pro left-/right-aligned grupování bez počítání marginů."
      >
        <Preview>
          <Inline gap="sm" style={{ width: 360, padding: 8, border: `1px dashed ${borderMid}` }}>
            <Box bg={surface3} borderColor={borderDefault} padding="sm">A</Box>
            <Box bg={surface3} borderColor={borderDefault} padding="sm">B</Box>
            <Spacer />
            <Box bg={surface4} borderColor={accent} padding="sm">→</Box>
          </Inline>
        </Preview>
        <CodeBlock code={`<Inline>
  <BackButton />
  <Title />
  <Spacer />            {/* push the close button to the right */}
  <CloseButton />
</Inline>`} />
      </Section>

      <Section
        id="split"
        title="Split — 2-column with divider"
        description="Dva sloty s volitelnou divider linkou. `ratio` zkosí poměr (např. `[1, 3]` = 25/75 sidebar:content)."
      >
        <Preview>
          <Stack gap="md">
            <Split gap="md" dividerColor={borderDefault} style={{ minHeight: 80, border: `1px dashed ${borderMid}`, padding: 8 }}>
              <Box bg={surface2} padding="md"><span style={{ color: textMid, fontSize: '0.75rem' }}>Left slot</span></Box>
              <Box bg={surface2} padding="md"><span style={{ color: textMid, fontSize: '0.75rem' }}>Right slot</span></Box>
            </Split>
            <Split ratio={[1, 3]} gap="md" dividerColor={borderDefault} style={{ minHeight: 80, border: `1px dashed ${borderMid}`, padding: 8 }}>
              <Box bg={surface3} padding="md"><span style={{ color: textMid, fontSize: '0.75rem' }}>Sidebar (1)</span></Box>
              <Box bg={surface2} padding="md"><span style={{ color: textMid, fontSize: '0.75rem' }}>Content (3)</span></Box>
            </Split>
          </Stack>
        </Preview>
        <CodeBlock code={`<Split dividerColor={borderDefault}>
  <Left />
  <Right />
</Split>

{/* Sidebar layout — 25/75 */}
<Split ratio={[1, 3]} dividerColor={borderDefault}>
  <Sidebar />
  <MainContent />
</Split>`} />
      </Section>

      <Section
        id="center"
        title="Center — full centering"
        description={'Centruje content horizontálně i vertikálně. Pro full-viewport použij `minHeight="100vh"` (login, loading screens, empty states).'}
      >
        <Preview>
          <Center minHeight={140} style={{ background: surface2, border: `1px dashed ${borderMid}` }}>
            <Stack gap="xs" align="center">
              <span style={{ color: textHigh, fontSize: '0.875rem', fontWeight: 600 }}>Welcome back</span>
              <span style={{ color: textMid, fontSize: '0.75rem' }}>Sign in to continue</span>
            </Stack>
          </Center>
        </Preview>
        <CodeBlock code={`<Center minHeight="100vh">
  <LoginForm />
</Center>`} />
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
