import { useState } from 'react'
import StickyBar from '../lib/tkajui/StickyBar'
import SidebarLayout from '../lib/tkajui/SidebarLayout'
import Button from '../lib/tkajui/Button'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { surface1, surface2, surface3, borderDefault, textMid, textHigh, textLow } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { SettingsIcon } from '../lib/tkajui'
import { SwordIcon, GemIcon, HexIcon, BaseIcon } from '../lib/donjon'

function StickyBarDemo() {
  return (
    <div style={{
      position: 'relative', height: 240, overflowY: 'auto',
      background: surface1, border: `1px solid ${borderDefault}`, borderRadius: 6,
    }}>
      <StickyBar position="top">
        <Inline justify="between" align="center">
          <strong style={{ color: textHigh }}>Settings</strong>
          <Inline gap="xs">
            <Button variant="default" size="sm">Cancel</Button>
            <Button variant="success" size="sm">Save</Button>
          </Inline>
        </Inline>
      </StickyBar>
      <div style={{ padding: 20, color: textMid, fontSize: '0.875rem', lineHeight: 1.6 }}>
        {Array.from({ length: 18 }, (_, i) => (
          <p key={i} style={{ margin: '8px 0' }}>Scroll down — top bar zůstává viditelný. Row #{i + 1}.</p>
        ))}
      </div>
      <StickyBar position="bottom">
        <Inline justify="end">
          <span style={{ fontSize: '0.75rem', color: textLow, alignSelf: 'center', marginRight: 12 }}>3 of 12 selected</span>
          <Button variant="danger" size="sm">Delete</Button>
        </Inline>
      </StickyBar>
    </div>
  )
}

function SidebarLayoutDemo() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Stack gap="md">
      <Inline gap="sm">
        <Button size="sm" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        </Button>
      </Inline>
      <div style={{
        height: 320, border: `1px solid ${borderDefault}`, borderRadius: 6, overflow: 'hidden',
        background: surface1,
      }}>
        <SidebarLayout
          collapsed={collapsed}
          sidebar={
            <Stack gap="xs" style={{ padding: 12 }}>
              {[
                { icon: <BaseIcon width={16} height={16} />,     label: 'Home' },
                { icon: <SwordIcon width={16} height={16} />,    label: 'Combat' },
                { icon: <GemIcon width={16} height={16} />,      label: 'Inventory' },
                { icon: <HexIcon width={16} height={16} />,      label: 'Map' },
                { icon: <SettingsIcon width={16} height={16} />, label: 'Settings' },
              ].map((it, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: collapsed ? '8px 6px' : '8px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  background: i === 0 ? surface3 : 'transparent',
                  color: i === 0 ? textHigh : textMid,
                  borderRadius: 4,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}>
                  {it.icon}
                  {!collapsed && <span>{it.label}</span>}
                </div>
              ))}
            </Stack>
          }
        >
          <div style={{ padding: 24, color: textMid }}>
            <h3 style={{ marginTop: 0, color: textHigh }}>Main content</h3>
            <p>Sidebar má width 240 px (collapsed = 56). Klikni "Collapse" pro animovaný přechod.</p>
            <p style={{ fontSize: '0.75rem', color: textLow }}>Border-right (left side) / border-left (right side) automaticky.</p>
          </div>
        </SidebarLayout>
      </div>
    </Stack>
  )
}

export default function LayoutStructuresPage() {
  return (
    <ShowcasePage
      title="Layout structures"
      description="StickyBar + SidebarLayout — strukturální stavební bloky pro page-level layouty. Sticky save bar, persistent navigation sidebar s collapse."
      componentSlugs={['sticky-bar', 'sidebar-layout']}
    >
      <Section
        id="sticky-bar"
        title="StickyBar — persistent action bar"
        description="`position: sticky` ke scroll containeru. Top = pro headery, bottom = pro action bary / mobile tab bary. Border na vnitřní straně automaticky."
      >
        <Preview>
          <StickyBarDemo />
        </Preview>
        <CodeBlock code={`<div style={{ overflowY: 'auto', height: 600 }}>
  <StickyBar position="top">
    <h2>Settings</h2>
    <Button variant="success">Save</Button>
  </StickyBar>

  {content}

  <StickyBar position="bottom">
    <Button variant="danger">Delete selected</Button>
  </StickyBar>
</div>`} />
      </Section>

      <Section
        id="sidebar-layout"
        title="SidebarLayout — sidebar + main column"
        description="Flex row se sidebar slotem (240 px default) + main column. `collapsed` prop pro 56 px collapsed width (smooth flex-basis transition). `side='right'` flipne pořadí."
      >
        <Preview>
          <SidebarLayoutDemo />
        </Preview>
        <CodeBlock code={`<SidebarLayout
  collapsed={collapsed}
  sidebar={<Nav items={navItems} />}
>
  <main>{routes}</main>
</SidebarLayout>

{/* Right-side sidebar (chat, properties panel) */}
<SidebarLayout side="right" sidebarWidth={320} sidebar={<ChatPanel />}>
  {document}
</SidebarLayout>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>StickyBar</strong> potřebuje scroll container s `overflow: auto/scroll` — jinak sticky nepřilne.</p>
          <p style={{ margin: 0 }}>✓ `position="bottom"` zachovává contextová akce viditelná během scrollu (Save, Delete selected).</p>
          <p style={{ margin: 0 }}>✓ <strong>SidebarLayout</strong> nemá vlastní responsive breakpointy — `collapsed` prop přijímá tvůj state z `useMediaQuery` / breakpoint provideru.</p>
          <p style={{ margin: 0 }}>✓ Pro full-page layout obal SidebarLayout do `height: 100vh` rodiče + StickyBar do main columny.</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie: SidebarLayout (page shell) → StickyBar (uvnitř main) → Stack/Inline (content blocks).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
