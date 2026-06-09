import { useState } from 'react'
import Drawer from '../lib/tkajui/Drawer'
import DropdownMenu from '../lib/tkajui/DropdownMenu'
import Accordion from '../lib/tkajui/Accordion'
import Button from '../lib/tkajui/Button'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow, textHigh } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'
import {
  PlusIcon, UploadIcon, DownloadIcon, SettingsIcon, CloseIcon, ExternalLinkIcon,
} from '../lib/tkajui'
import {
  ShieldIcon, TurnOrderIcon, HourglassIcon,
  DonjonDrawer, DonjonDropdownMenu, DonjonAccordion, DonjonButton,
} from '../lib/donjon'

const ICON_SIZE = { width: 14, height: 14 }

const FAQ = [
  { id: 'a', title: 'How do I save the game?',
    content: 'Saves are automatic at the end of each turn. To make a manual save, open the pause menu and click "Save game".' },
  { id: 'b', title: 'Can I play offline?',
    content: 'Yes. Single-player and co-op via LAN run entirely offline. Cloud saves require a connection.' },
  { id: 'c', title: 'How do I report a bug?',
    content: 'Open Settings → Help → Report bug. A description plus a screenshot helps a lot.' },
  { id: 'd', title: 'Disabled section (locked)', content: 'Should not open.', disabled: true },
]

function DrawerDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const Btn = isDonjon ? DonjonButton : Button
  const DrawerC = isDonjon ? DonjonDrawer : Drawer
  const [side, setSide] = useState(null)
  return (
    <Stack gap="md">
      <Inline gap="sm">
        {['left', 'right', 'top', 'bottom'].map(s => (
          <Btn key={s} size="sm" onClick={() => setSide(s)}>Open {s}</Btn>
        ))}
      </Inline>
      <DrawerC
        open={side != null}
        onClose={() => setSide(null)}
        side={side ?? 'right'}
        title="Drawer panel"
      >
        <Stack gap="md">
          <p>Slide-in panel s vlastním Backdrop. Closes on ESC nebo na backdrop.</p>
          <Inline gap="sm">
            <Btn variant="success" onClick={() => setSide(null)}>OK</Btn>
            <Btn onClick={() => setSide(null)}>Cancel</Btn>
          </Inline>
        </Stack>
      </DrawerC>
    </Stack>
  )
}

function DropdownMenuDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const Btn = isDonjon ? DonjonButton : Button
  const DropdownC = isDonjon ? DonjonDropdownMenu : DropdownMenu
  return (
    <Inline gap="md">
      <DropdownC
        trigger="File ▾"
        items={[
          { label: 'New game',  icon: <PlusIcon {...ICON_SIZE} />,     shortcut: 'Ctrl+N', onClick: () => {} },
          { label: 'Open save', icon: <UploadIcon {...ICON_SIZE} />,   shortcut: 'Ctrl+O', onClick: () => {} },
          { label: 'Save',      icon: <DownloadIcon {...ICON_SIZE} />, shortcut: 'Ctrl+S', onClick: () => {} },
          { divider: true },
          { label: 'Settings',  icon: <SettingsIcon {...ICON_SIZE} />, onClick: () => {} },
          { label: 'Quit',      icon: <CloseIcon {...ICON_SIZE} />, danger: true, shortcut: 'Alt+F4', onClick: () => {} },
        ]}
      />
      <DropdownC
        align="right"
        trigger={({ open, toggle }) => (
          <Btn variant="default" onClick={toggle}>
            Profile {open ? '▴' : '▾'}
          </Btn>
        )}
        items={[
          { label: 'View profile',   icon: <ShieldIcon {...ICON_SIZE} /> },
          { label: 'Switch account', icon: <TurnOrderIcon {...ICON_SIZE} /> },
          { label: 'Coming soon',    icon: <HourglassIcon {...ICON_SIZE} />, disabled: true },
          { divider: true },
          { label: 'Sign out',       icon: <ExternalLinkIcon {...ICON_SIZE} />, danger: true },
        ]}
      />
    </Inline>
  )
}

function AccordionDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const AccordionC = isDonjon ? DonjonAccordion : Accordion
  const [multiValue, setMultiValue] = useState(['a'])
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Single-expand (default)</span>
        <AccordionC items={FAQ} defaultValue={['a']} />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Multi-expand (controlled)</span>
        <AccordionC items={FAQ} multi value={multiValue} onChange={setMultiValue} />
        <span style={{ fontSize: '0.75rem', color: textMid }}>
          Open: {multiValue.length === 0 ? '(none)' : multiValue.join(', ')}
        </span>
      </Stack>
    </Stack>
  )
}

export default function DisclosurePage() {
  return (
    <ShowcasePage
      title="Disclosure"
      description="Drawer + DropdownMenu + Accordion — sada pro progresivní odhalování obsahu. Slide-in panely, popover menu, collapsible sections."
      componentSlugs={['drawer', 'donjon-drawer', 'dropdown-menu', 'donjon-dropdown-menu', 'accordion', 'donjon-accordion']}
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <Section
        id="drawer"
        title="Drawer — slide-in panel"
        description="Boční (left/right) nebo top/bottom panel s vlastním Backdrop. ESC + click-outside close. Animovaný slide přes @keyframes."
      >
        <Preview>
          <DrawerDemo />
        </Preview>
        <CodeBlock code={`const [open, setOpen] = useState(false)

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="right"
  size={360}
  title="Settings"
>
  <SettingsForm />
</Drawer>`} />
      </Section>

      <Section
        id="dropdown-menu"
        title="DropdownMenu — popover menu"
        description="Trigger jako element nebo render prop, items s ikonou/shortcut/divider/danger/disabled. Outside-click + ESC close. `align` pro right-edge alignment."
      >
        <Preview>
          <DropdownMenuDemo />
        </Preview>
        <CodeBlock code={`import { PlusIcon, UploadIcon, CloseIcon } from 'tkajui'

<DropdownMenu
  trigger="File ▾"
  items={[
    { label: 'New', icon: <PlusIcon width={14} height={14} />, shortcut: 'Ctrl+N', onClick: newFile },
    { label: 'Open', icon: <UploadIcon width={14} height={14} />, onClick: open },
    { divider: true },
    { label: 'Quit', icon: <CloseIcon width={14} height={14} />, danger: true, onClick: quit },
  ]}
/>

{/* Render-prop trigger */}
<DropdownMenu
  align="right"
  trigger={({ open, toggle }) => (
    <Button onClick={toggle}>Profile {open ? '▴' : '▾'}</Button>
  )}
  items={profileItems}
/>`} />
      </Section>

      <Section
        id="accordion"
        title="Accordion — collapsible sections"
        description="Klikatelné headery, content roluje pod ně. `multi=false` (default) = jen jedna sekce naráz. Controlled (`value` + `onChange`) nebo uncontrolled (`defaultValue`)."
      >
        <Preview>
          <AccordionDemo />
        </Preview>
        <CodeBlock code={`const items = [
  { id: 'save', title: 'How do I save?', content: '…' },
  { id: 'lan',  title: 'Multiplayer?',  content: '…' },
  { id: 'bug',  title: 'Report bug',    content: '…', disabled: true },
]

{/* Uncontrolled single */}
<Accordion items={items} defaultValue={['save']} />

{/* Controlled multi */}
<Accordion items={items} multi value={open} onChange={setOpen} />`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>Drawer</strong> pro non-modal nebo modal panely mimo native &lt;dialog&gt; — settings, properties, mobile nav.</p>
          <p style={{ margin: 0 }}>✓ <strong>DropdownMenu</strong> pro 3–8 položek. Méně → Button group, víc → Select / Modal.</p>
          <p style={{ margin: 0 }}>✓ <strong>Accordion</strong> pro FAQ, sekce nastavení, dlouhé content tabs. Jednu sekci nech otevřenou by default.</p>
          <p style={{ margin: 0 }}>✓ Všechny tři: <span style={{ color: textHigh }}>ESC zavírá</span> Drawer + DropdownMenu (Accordion ne — ten reaguje jen na klik).</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie odhalování: Tooltip (hover hint) → DropdownMenu (klik menu) → Accordion (in-flow expand) → Drawer (side panel) → Modal (blocking).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
