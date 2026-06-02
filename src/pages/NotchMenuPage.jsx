import { useState } from 'react'
import NotchMenu from '../lib/tkajui/NotchMenu'
import DonjonNotchMenu from '../lib/donjon/DonjonNotchMenu'
import { textHigh as tkHigh, textMid as tkMid } from '../lib/tkajui/tokens'
import { textHigh, textMid, textLow } from '../lib/donjon/tokens'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

const TAB_CONTENT = {
  info:  { title: 'Info',       body: 'Základní informace o hráči a kontextu hry.' },
  stats: { title: 'Statistiky', body: 'Vítězné body, kostky, ovládaná pole.' },
  log:   { title: 'Log',        body: 'Poslední akce a události.' },
}

function TabBody({ tabKey, lib }) {
  const c = TAB_CONTENT[tabKey] ?? TAB_CONTENT.info
  const color = lib === 'donjon' ? textHigh : tkHigh
  const mutedColor = lib === 'donjon' ? textMid : tkMid
  return (
    <div style={{ minHeight: 90 }}>
      <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color, marginBottom: 6 }}>{c.title}</p>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: mutedColor }}>{c.body}</p>
    </div>
  )
}

function DemoTkajui() {
  const [tab, setTab] = useState('info')
  return (
    <NotchMenu value={tab} onChange={setTab}>
      <NotchMenu.Item value="info">Info</NotchMenu.Item>
      <NotchMenu.Item value="stats">Statistiky</NotchMenu.Item>
      <NotchMenu.Item value="log">Log</NotchMenu.Item>
      <NotchMenu.Item onClick={() => alert('zavřeno')} aria-label="Zavřít">✕</NotchMenu.Item>
      <NotchMenu.Body>
        <TabBody tabKey={tab} lib="tkajui" />
      </NotchMenu.Body>
    </NotchMenu>
  )
}

function DemoDonjon() {
  const [tab, setTab] = useState('info')
  return (
    <DonjonNotchMenu value={tab} onChange={setTab}>
      <DonjonNotchMenu.Item value="info">Info</DonjonNotchMenu.Item>
      <DonjonNotchMenu.Item value="stats">Statistiky</DonjonNotchMenu.Item>
      <DonjonNotchMenu.Item value="log">Log</DonjonNotchMenu.Item>
      <DonjonNotchMenu.Item onClick={() => alert('zavřeno')} aria-label="Zavřít">✕</DonjonNotchMenu.Item>
      <DonjonNotchMenu.Body>
        <TabBody tabKey={tab} lib="donjon" />
      </DonjonNotchMenu.Body>
    </DonjonNotchMenu>
  )
}

function ActiveDemo() {
  const lib = useLibVariant()
  return lib === 'donjon' ? <DemoDonjon /> : <DemoTkajui />
}

function ActionsOnlyDemo() {
  const lib = useLibVariant()
  const Menu = lib === 'donjon' ? DonjonNotchMenu : NotchMenu
  return (
    <Menu>
      <Menu.Item onClick={() => alert('Nová hra')}>Nová hra</Menu.Item>
      <Menu.Item onClick={() => alert('Načíst')}>Načíst</Menu.Item>
      <Menu.Item onClick={() => alert('Nastavení')}>Nastavení</Menu.Item>
      <Menu.Item onClick={() => alert('Konec')}>Konec</Menu.Item>
      <Menu.Body>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: lib === 'donjon' ? textLow : tkMid }}>
          Položky jsou samostatné akce — nemají active stav, jen onClick.
        </p>
      </Menu.Body>
    </Menu>
  )
}

function OrnamentsDemo() {
  const [tab, setTab] = useState('info')
  const ornaments = ['decorated', 'plain']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
      {ornaments.map((orn) => (
        <div key={orn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ornament=&quot;{orn}&quot;
          </span>
          <DonjonNotchMenu value={tab} onChange={setTab} ornament={orn}>
            <DonjonNotchMenu.Item value="info">Info</DonjonNotchMenu.Item>
            <DonjonNotchMenu.Item value="stats">Statistiky</DonjonNotchMenu.Item>
            <DonjonNotchMenu.Item value="log">Log</DonjonNotchMenu.Item>
            <DonjonNotchMenu.Body>
              <span style={{ fontSize: '0.75rem', color: textMid }}>Aktivní záložka: {tab}</span>
            </DonjonNotchMenu.Body>
          </DonjonNotchMenu>
        </div>
      ))}
    </div>
  )
}

function SizesDemo() {
  const [tab, setTab] = useState('info')
  const lib = useLibVariant()
  const Menu = lib === 'donjon' ? DonjonNotchMenu : NotchMenu
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
      {['xs', 'sm', 'md', 'lg'].map((sz) => (
        <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>size={sz}</span>
          <Menu value={tab} onChange={setTab} size={sz}>
            <Menu.Item value="info">Info</Menu.Item>
            <Menu.Item value="stats">Statistiky</Menu.Item>
            <Menu.Item value="log">Log</Menu.Item>
            <Menu.Item onClick={() => {}} aria-label="Zavřít">✕</Menu.Item>
            <Menu.Body>
              <span style={{ fontSize: '0.75rem', color: lib === 'donjon' ? textMid : tkMid }}>
                Aktivní záložka: {tab}
              </span>
            </Menu.Body>
          </Menu>
        </div>
      ))}
    </div>
  )
}

function BodyCornersDemo() {
  const [tab, setTab] = useState('info')
  const lib = useLibVariant()
  const Menu = lib === 'donjon' ? DonjonNotchMenu : NotchMenu
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
      {['octagon', 'sharp'].map((corners) => (
        <div key={corners} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>bodyCorners=&quot;{corners}&quot;</span>
          <Menu value={tab} onChange={setTab} bodyCorners={corners}>
            <Menu.Item value="info">Info</Menu.Item>
            <Menu.Item value="stats">Statistiky</Menu.Item>
            <Menu.Item value="log">Log</Menu.Item>
            <Menu.Body>
              <span style={{ fontSize: '0.75rem', color: lib === 'donjon' ? textMid : tkMid }}>
                Aktivní záložka: {tab}
              </span>
            </Menu.Body>
          </Menu>
        </div>
      ))}
    </div>
  )
}

function ItemsPositionDemo() {
  const [tab, setTab] = useState('info')
  const lib = useLibVariant()
  const Menu = lib === 'donjon' ? DonjonNotchMenu : NotchMenu
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      {['top', 'bottom'].map((pos) => (
        <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.625rem', color: textLow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>itemsPosition=&quot;{pos}&quot;</span>
          <Menu value={tab} onChange={setTab} itemsPosition={pos}>
            <Menu.Item value="info">Info</Menu.Item>
            <Menu.Item value="stats">Statistiky</Menu.Item>
            <Menu.Item value="log">Log</Menu.Item>
            <Menu.Body>
              <span style={{ fontSize: '0.75rem', color: lib === 'donjon' ? textMid : tkMid }}>
                Items {pos === 'top' ? 'nahoře' : 'dole'} · aktivní záložka: {tab}
              </span>
            </Menu.Body>
          </Menu>
        </div>
      ))}
    </div>
  )
}

function HybridDemo() {
  const [tab, setTab] = useState('quest')
  const lib = useLibVariant()
  const Menu = lib === 'donjon' ? DonjonNotchMenu : NotchMenu
  return (
    <Menu value={tab} onChange={setTab}>
      <Menu.Item value="quest">Quest</Menu.Item>
      <Menu.Item value="inventory">Inventář</Menu.Item>
      <Menu.Item value="map">Mapa</Menu.Item>
      <Menu.Item onClick={() => alert('uloženo')}>Uložit</Menu.Item>
      <Menu.Item onClick={() => alert('zavřeno')} aria-label="Zavřít">✕</Menu.Item>
      <Menu.Body>
        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, marginBottom: 6, color: lib === 'donjon' ? textHigh : tkHigh }}>
          Aktivní záložka: {tab}
        </p>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: lib === 'donjon' ? textMid : tkMid }}>
          Prvé tři položky jsou taby (active state), poslední dvě jsou akce (jen onClick, žádný active state).
        </p>
      </Menu.Body>
    </Menu>
  )
}

export default function NotchMenuPage() {
  return (
    <ShowcasePage
      title="NotchMenu"
      description="Panel s V-výřezy na horní hraně. Každý výřez obsahuje položku — buď taby (s active stavem) nebo samostatné akce. Compound API: NotchMenu + Item + Body."
      componentSlug="notch-menu"
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section
        id="zakladni"
        title="Základní použití — taby + akce"
        description="Hybrid: položky s `value` jsou taby řízené přes parent value/onChange. Položky bez `value` jsou samostatné akce (onClick). Žádný state hack — typ chování odvozený z přítomnosti propy value."
      >
        <Preview>
          <ActiveDemo />
        </Preview>
        <CodeBlock code={`const [tab, setTab] = useState('info')

<NotchMenu value={tab} onChange={setTab} size="md">
  <NotchMenu.Item value="info">Info</NotchMenu.Item>
  <NotchMenu.Item value="stats">Statistiky</NotchMenu.Item>
  <NotchMenu.Item value="log">Log</NotchMenu.Item>
  <NotchMenu.Item onClick={onClose} aria-label="Zavřít">✕</NotchMenu.Item>
  <NotchMenu.Body>
    {tab === 'info'  && <Info />}
    {tab === 'stats' && <Stats />}
    {tab === 'log'   && <Log />}
  </NotchMenu.Body>
</NotchMenu>`} />
      </Section>

      <Section
        id="ornamenty"
        title="Ornamenty (jen donjon)"
        description="DonjonNotchMenu má prop `ornament` (decorated / plain). Decorated = SideOrnament na vnějších koncích nejlevější + nejpravější položky + HexOrnament linka přes top a bottom každé položky. Plain = bez ornamentů. tkajui ornamenty nepoužívá."
      >
        <Preview>
          <OrnamentsDemo />
        </Preview>
        <CodeBlock code={`<DonjonNotchMenu ornament="decorated" value={tab} onChange={setTab}>
  ...
</DonjonNotchMenu>

<DonjonNotchMenu ornament="plain" ...>...</DonjonNotchMenu>  // bez ornamentů`} />
      </Section>

      <Section
        id="velikosti"
        title="Velikosti — xs / sm / md / lg"
        description="Stejný size systém jako ButtonGroup. Výška, padding a fontSize škálují konzistentně mezi knihovnami."
      >
        <Preview>
          <SizesDemo />
        </Preview>
        <CodeBlock code={`<NotchMenu size="xs" value={tab} onChange={setTab}>...</NotchMenu>
<NotchMenu size="sm" value={tab} onChange={setTab}>...</NotchMenu>
<NotchMenu size="md" value={tab} onChange={setTab}>...</NotchMenu>
<NotchMenu size="lg" value={tab} onChange={setTab}>...</NotchMenu>`} />
      </Section>

      <Section
        id="body-corners"
        title="Zkosené rohy body"
        description="Prop `bodyCorners` (default 'octagon') určuje, zda body má octagon-cut diagonálně zkosené rohy (stejné cx jako items, takže silueta navazuje na banner) nebo plain rectangle ('sharp')."
      >
        <Preview>
          <BodyCornersDemo />
        </Preview>
        <CodeBlock code={`<NotchMenu value={tab} onChange={setTab} bodyCorners="octagon">
  ...                                       ← default — zkosené rohy
</NotchMenu>

<NotchMenu value={tab} onChange={setTab} bodyCorners="sharp">
  ...                                       ← rovné rohy
</NotchMenu>`} />
      </Section>

      <Section
        id="items-position"
        title="Items nahoře / dole"
        description="Prop `itemsPosition` (default 'top') určuje, zda items sedí na horní hraně body (klasika) nebo na spodní hraně. Body cutout se otočí na opačnou stranu, banner přesah z opačného směru."
      >
        <Preview>
          <ItemsPositionDemo />
        </Preview>
        <CodeBlock code={`<NotchMenu value={tab} onChange={setTab} itemsPosition="top">
  ...                                          ← items nahoře (default)
</NotchMenu>

<NotchMenu value={tab} onChange={setTab} itemsPosition="bottom">
  ...                                          ← items dole
</NotchMenu>`} />
      </Section>

      <Section
        id="hybrid"
        title="Více tabů + více akcí"
        description="Taby a akce se mohou libovolně střídat v řadě. Pořadí v JSX = pořadí v UI."
      >
        <Preview>
          <HybridDemo />
        </Preview>
        <CodeBlock code={`<NotchMenu value={tab} onChange={setTab}>
  <NotchMenu.Item value="quest">Quest</NotchMenu.Item>
  <NotchMenu.Item value="inventory">Inventář</NotchMenu.Item>
  <NotchMenu.Item value="map">Mapa</NotchMenu.Item>
  <NotchMenu.Item onClick={onSave}>Uložit</NotchMenu.Item>
  <NotchMenu.Item onClick={onClose} aria-label="Zavřít">✕</NotchMenu.Item>
  <NotchMenu.Body>...</NotchMenu.Body>
</NotchMenu>`} />
      </Section>

      <Section
        id="akce"
        title="Pouze akce (žádné taby)"
        description="Když všechny položky jsou onClick akce, value/onChange na rootu nejsou potřeba. Menu funguje jako toolbar."
      >
        <Preview>
          <ActionsOnlyDemo />
        </Preview>
        <CodeBlock code={`<NotchMenu>
  <NotchMenu.Item onClick={() => newGame()}>Nová hra</NotchMenu.Item>
  <NotchMenu.Item onClick={() => load()}>Načíst</NotchMenu.Item>
  <NotchMenu.Item onClick={() => settings()}>Nastavení</NotchMenu.Item>
  <NotchMenu.Item onClick={() => quit()}>Konec</NotchMenu.Item>
  <NotchMenu.Body>...</NotchMenu.Body>
</NotchMenu>`} />
      </Section>

      <Section id="api" title="API">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.8125rem', color: textMid }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: textHigh }}>NotchMenu / DonjonNotchMenu</strong> — root container.
            Props: <code>value</code> (active tab) · <code>onChange</code> (tab-change callback) · <code>children</code> (mix of Item + Body).
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: textHigh }}>NotchMenu.Item / DonjonNotchMenu.Item</strong> — položka menu.
            Props: <code>value</code> (přítomné = tab; chybí = akce) · <code>onClick</code> (jen pro akce) · <code>icon</code> · <code>disabled</code> · <code>aria-label</code> · <code>children</code>.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: textHigh }}>NotchMenu.Body / DonjonNotchMenu.Body</strong> — tělo panelu pod menu.
            Sem patří obsah aktivní záložky (consumer si renderuje conditionally podle tab hodnoty).
          </p>
        </div>
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Položky s `value` jsou taby — vyžadují parent `value` + `onChange`.</p>
          <p>✓ Položky bez `value` jsou samostatné akce — vyžadují `onClick`.</p>
          <p>✓ Ikonu-only akci doplň `aria-label` (přístupnost).</p>
          <p>✓ Pořadí položek v JSX = pořadí zleva doprava v UI.</p>
          <p>✗ Nemíchej Body více než jednou — výsledek je nedefinovaný.</p>
          <p>✗ Nepoužívej Item mimo NotchMenu — vyhodí explicit error.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
