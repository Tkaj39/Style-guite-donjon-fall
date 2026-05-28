import { useState } from 'react'
import {
  bg0, goldMid, textCool, textDeep,
} from '../lib/donjon/tokens'
import Tabs from '../lib/tkajui/Tabs'
import DonjonTabs from '../lib/donjon/DonjonTabs'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

/* ── Ikony ── */
const SoundIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
    <path d="M9.5 2.5a.5.5 0 0 0-.8-.4L5.5 5H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.5l3.2 2.9a.5.5 0 0 0 .8-.4V2.5ZM11.5 5.5a.75.75 0 0 1 1.06 0 4.75 4.75 0 0 1 0 5 .75.75 0 0 1-1.06-1 3.25 3.25 0 0 0 0-3 .75.75 0 0 1 0-1Z" />
  </svg>
)
const GlobeIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM2.5 8a5.5 5.5 0 0 1 5.5-5.5c.3 0 .6 0 .9.06C8.4 3.4 8 4.9 8 6.5H2.52A5.5 5.5 0 0 1 2.5 8Zm0 1.5H8v.5c0 1.6.4 3.1.9 4A5.5 5.5 0 0 1 2.5 9.5Zm7 4A5.5 5.5 0 0 1 9.1 9.5H13.5a5.5 5.5 0 0 1-4 4Zm4-5.5H9.5c0-1.6-.4-3.1-.9-4a5.5 5.5 0 0 1 4 4Z" />
  </svg>
)
const KeyboardIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
    <path d="M1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm2 1v1h1V5H3Zm3 0v1h1V5H6Zm3 0v1h1V5H9Zm3 0v1h1V5h-1ZM3 8v1h1V8H3Zm3 0v1h1V8H6Zm3 0v1h1V8H9Zm3 0v1h1V8h-1ZM5 11v1h6v-1H5Z" />
  </svg>
)
const MonitorIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9.5l.5 1.5h1a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1h1L6.5 12H2a1 1 0 0 1-1-1V3Zm1.5 1v6h11V4h-11Z" />
  </svg>
)

const SETTINGS_TABS = [
  { value: 'sound',    label: 'Zvuk',     icon: <SoundIcon /> },
  { value: 'language', label: 'Jazyk',    icon: <GlobeIcon /> },
  { value: 'controls', label: 'Ovládání', icon: <KeyboardIcon /> },
  { value: 'graphics', label: 'Grafika',  icon: <MonitorIcon /> },
]

const GAME_TABS = [
  { value: 'map',     label: 'Mapa',    badge: 3 },
  { value: 'history', label: 'Historie' },
  { value: 'stats',   label: 'Statistiky', badge: 1 },
  { value: 'log',     label: 'Log', disabled: true },
]

/* TabsDemo mimo render funkci — TabsCmp se předává jako prop */
function TabsDemo({ TabsCmp, items, variant, size }) {
  const [tab, setTab] = useState(items.find(i => !i.disabled)?.value ?? items[0]?.value)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabsCmp items={items} value={tab} onChange={setTab} variant={variant} size={size} />
      <div style={{
        padding: '14px 16px',
        background: bg0,
        border: '1px solid #8F745430',
        borderRadius: 4,
        fontSize: '0.8125rem',
        color: textCool,
        lineHeight: 1.5,
      }}>
        Obsah záložky: <span style={{ color: goldMid, fontWeight: 600 }}>
          {items.find(i => i.value === tab)?.label}
        </span>
      </div>
    </div>
  )
}

function TabsContent() {
  const lib = useLibVariant()
  const T   = lib === 'tkajui' ? Tabs : DonjonTabs
  const cmp = lib === 'tkajui' ? 'Tabs' : 'DonjonTabs'
  const demoProps = lib === 'donjon' ? { ornament: 'plain' } : undefined

  return (
    <>
      {/* Underline */}
      <Section
        id="underline"
        title="Underline (výchozí)"
        description="Indikátor aktivní záložky je dole — zlatá mezera s hexagonem v dolní čáře."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <TabsDemo TabsCmp={T}
              items={[
                { value: 'overview', label: 'Přehled' },
                { value: 'details',  label: 'Detail' },
                { value: 'history',  label: 'Historie' },
                { value: 'settings', label: 'Nastavení' },
              ]}
              variant="underline"
            />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} variant="underline" value={tab} onChange={setTab} items={items} />`} />
      </Section>

      {lib === 'donjon' && (
        <Section
          id="ornament"
          title="Decorated vs Plain"
          description="DonjonTabs může používat ornamentové linky s hex motivem nebo čistší plain track bez dekoru."
        >
          <Preview>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
              <div>
                <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: textDeep, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Decorated</p>
                <TabsDemo TabsCmp={T}
                  items={[
                    { value: 'overview', label: 'Přehled' },
                    { value: 'details',  label: 'Detail' },
                    { value: 'history',  label: 'Historie' },
                  ]}
                  variant="underline"
                />
              </div>
              <div>
                <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: textDeep, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Plain</p>
                <TabsDemo TabsCmp={T}
                  items={[
                    { value: 'overview', label: 'Přehled' },
                    { value: 'details',  label: 'Detail' },
                    { value: 'history',  label: 'Historie' },
                  ]}
                  variant="underline"
                  {...demoProps}
                />
              </div>
            </div>
          </Preview>
          <CodeBlock code={`<DonjonTabs items={items} value={tab} onChange={setTab} variant="underline" />

<DonjonTabs items={items} value={tab} onChange={setTab} variant="underline" ornament="plain" />`} />
        </Section>
      )}

      {/* Topline */}
      <Section
        id="topline"
        title="Topline"
        description="Indikátor aktivní záložky je nahoře — zlatá mezera s hexagonem v horní čáře."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <TabsDemo TabsCmp={T}
              items={[
                { value: 'overview', label: 'Přehled' },
                { value: 'details',  label: 'Detail' },
                { value: 'history',  label: 'Historie' },
                { value: 'settings', label: 'Nastavení' },
              ]}
              variant="topline"
            />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} variant="topline" value={tab} onChange={setTab} items={items} />`} />
      </Section>

      {/* Pills */}
      <Section
        id="pills"
        title="Pills"
        description="Aktivní záložka má tmavé vyplněné pozadí — vhodné pro in-panel navigaci."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <TabsDemo TabsCmp={T}
              items={[
                { value: 'overview', label: 'Přehled' },
                { value: 'details',  label: 'Detail' },
                { value: 'history',  label: 'Historie' },
                { value: 'settings', label: 'Nastavení' },
              ]}
              variant="pills"
            />
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} variant="pills" value={tab} onChange={setTab} items={items} />`} />
      </Section>

      {/* S ikonami */}
      <Section
        id="icons"
        title="S ikonami"
        description="Volitelná ikona vlevo od popisku — vhodné pro settings navigaci."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <TabsDemo TabsCmp={T} items={SETTINGS_TABS} variant="underline" />
          </div>
        </Preview>
        <Preview>
          <div style={{ width: '100%' }}>
            <TabsDemo TabsCmp={T} items={SETTINGS_TABS} variant="pills" />
          </div>
        </Preview>
        <CodeBlock code={`const items = [
  { value: 'sound',    label: 'Zvuk',    icon: <SoundIcon /> },
  { value: 'language', label: 'Jazyk',   icon: <GlobeIcon /> },
  { value: 'controls', label: 'Ovládání',icon: <KeyboardIcon /> },
]

<${cmp} items={items} value={tab} onChange={setTab} />`} />
      </Section>

      {/* Badge */}
      <Section
        id="badge"
        title="S badge počtem"
        description="Prop badge zobrazí číselný štítek — vhodné pro počet notifikací nebo nových záznamů."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <TabsDemo TabsCmp={T} items={GAME_TABS} variant="underline" />
          </div>
        </Preview>
        <CodeBlock code={`const items = [
  { value: 'map',     label: 'Mapa',    badge: 3 },
  { value: 'history', label: 'Historie' },
  { value: 'stats',   label: 'Statistiky', badge: 1 },
  { value: 'log',     label: 'Log', disabled: true },
]`} />
      </Section>

      {/* Velikosti */}
      <Section
        id="sizes"
        title="Velikosti"
        description="Tři velikosti — sm, md (výchozí), lg."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            {(['sm', 'md', 'lg']).map(size => (
              <div key={size}>
                <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: textDeep, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{size}</p>
                <TabsDemo TabsCmp={T}
                  items={[
                    { value: 'a', label: 'Přehled' },
                    { value: 'b', label: 'Detail' },
                    { value: 'c', label: 'Nastavení' },
                  ]}
                  variant="underline"
                  size={size}
                />
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} size="sm" items={items} value={tab} onChange={setTab} />
<${cmp} size="md" items={items} value={tab} onChange={setTab} />
<${cmp} size="lg" items={items} value={tab} onChange={setTab} />`} />
      </Section>

      {/* Orientation — horizontal vs vertical (parita s TkajUI Tabs) */}
      <Section id="orientation" title="Orientace — horizontal vs vertical" description="Vertikální tablist se hodí pro postranní navigaci. Klávesnice: ArrowUp/Down ve vertikální, ArrowLeft/Right v horizontální.">
        <Preview>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <TabsDemo TabsCmp={cmp === 'Tabs' ? Tabs : DonjonTabs} items={GAME_TABS} variant="underline" size="md" />
            <div style={{ display: 'flex', gap: 12 }}>
              {(() => {
                const Comp = cmp === 'Tabs' ? Tabs : DonjonTabs
                return (
                  <Comp
                    items={GAME_TABS}
                    value={GAME_TABS[0].value}
                    onChange={() => {}}
                    orientation="vertical"
                    variant="underline"
                    size="md"
                  />
                )
              })()}
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} orientation="vertical" items={items} value={tab} onChange={setTab} />`} />
      </Section>

      {/* Closable tabs — onClose */}
      <Section id="closable" title="Zavíratelné taby (onClose)" description="Položky s `closable: true` zobrazí × ikonu, pokud je předán `onClose` handler. Vhodné pro dynamicky vytvářené taby (otevřené dokumenty, herní okna).">
        <Preview>
          {(() => {
            const Comp = cmp === 'Tabs' ? Tabs : DonjonTabs
            const items = [
              { value: 'a', label: 'Karta 1', closable: true },
              { value: 'b', label: 'Karta 2', closable: true },
              { value: 'c', label: 'Karta 3', closable: true },
            ]
            return (
              <Comp
                items={items}
                value="a"
                onChange={() => {}}
                onClose={(v) => alert(`Zavřít: ${v}`)}
                variant="pills"
                size="md"
              />
            )
          })()}
        </Preview>
        <CodeBlock code={`<${cmp}
  items={[{ value: 'a', label: 'Karta', closable: true }]}
  value="a"
  onChange={setTab}
  onClose={(v) => closeTab(v)}
/>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Underline pro hlavní navigaci stránky, Pills pro navigaci uvnitř panelu (karty, modálu).</p>
          <p>✓ Ikony přidávej konzistentně — buď u všech záložek, nebo u žádné.</p>
          <p>✓ Klávesnicová navigace je zabudovaná — šipky pohybují mezi záložkami, Enter/Space aktivuje.</p>
          <p>✓ Badge používej jen pro dynamicky se měnící počty (notifikace, nové záznamy).</p>
          <p>✗ Nepoužívej Tabs pro hierarchickou navigaci (breadcrumb) ani kroky procesu (Stepper).</p>
          <p>✗ Maximálně 5–6 záložek — více patří do Select nebo do jiné struktury.</p>
        </div>
      </Section>
    </>
  )
}

export default function TabsPage() {
  return (
    <ShowcasePage
      title="Tabs"
      description="Horizontální záložková navigace. Dvě varianty vizuálu — underline (čárka pod aktivní záložkou) a pills (vyplněné pozadí). Klávesnicová navigace šipkami. DonjonTabs nově umí i plain režim bez ornamentových linek."
      componentSlugs={['donjon-tabs', 'tabs']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <TabsContent />
    </ShowcasePage>
  )
}
