import { useState } from 'react'
import ButtonGroup from '../components/ButtonGroup'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Icons ── */
const GridIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3ZM8.5 1A1.5 1.5 0 0 0 7 2.5v3A1.5 1.5 0 0 0 8.5 7h3A1.5 1.5 0 0 0 13 5.5v-3A1.5 1.5 0 0 0 11.5 1h-3ZM1 8.5A1.5 1.5 0 0 1 2.5 7h3A1.5 1.5 0 0 1 7 8.5v3A1.5 1.5 0 0 1 5.5 13h-3A1.5 1.5 0 0 1 1 11.5v-3ZM8.5 7A1.5 1.5 0 0 0 7 8.5v3A1.5 1.5 0 0 0 8.5 13h3A1.5 1.5 0 0 0 13 11.5v-3A1.5 1.5 0 0 0 11.5 7h-3Z" />
  </svg>
)
const ListIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 4h12v1.5H2V4Zm0 3.5h12V9H2V7.5Zm0 3.5h12v1.5H2V11Z" />
  </svg>
)
const BarChartIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 11h2.5v3H1v-3ZM6 7h2.5v7H6V7ZM11 2h2.5v12H11V2Z" />
  </svg>
)
const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3A2 2 0 0 1 14 5v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM3.5 7v5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7h-9Z" />
  </svg>
)
const SettingsIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M6.955 1.45A.5.5 0 0 1 7.443 1h1.114a.5.5 0 0 1 .488.45l.15 1.495a5.02 5.02 0 0 1 1.343.773l1.373-.584a.5.5 0 0 1 .6.183l.557.964a.5.5 0 0 1-.107.645l-1.158.98a5.065 5.065 0 0 1 0 1.588l1.158.98a.5.5 0 0 1 .107.645l-.557.964a.5.5 0 0 1-.6.183l-1.373-.584a5.02 5.02 0 0 1-1.343.773l-.15 1.495a.5.5 0 0 1-.488.45H7.443a.5.5 0 0 1-.488-.45l-.15-1.495a5.02 5.02 0 0 1-1.343-.773l-1.373.584a.5.5 0 0 1-.6-.183l-.557-.964a.5.5 0 0 1 .107-.645l1.158-.98a5.065 5.065 0 0 1 0-1.588l-1.158-.98a.5.5 0 0 1-.107-.645l.557-.964a.5.5 0 0 1 .6-.183l1.373.584A5.02 5.02 0 0 1 6.805 2.945L6.955 1.45ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
)

/* ── Menu items ── */
const viewItems = [
  { value: 'grid', label: 'Grid', icon: <GridIcon /> },
  { value: 'list', label: 'List', icon: <ListIcon /> },
  { value: 'chart', label: 'Chart', icon: <BarChartIcon /> },
]

const navItems = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports' },
  { value: 'settings', label: 'Settings' },
]

const periodItems = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
]

const tabItems = [
  { value: 'design', label: 'Design' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'code', label: 'Code' },
]

const tabsWithIcons = [
  { value: 'calendar', label: 'Calendar', icon: <CalendarIcon /> },
  { value: 'list', label: 'List', icon: <ListIcon /> },
  { value: 'settings', label: 'Settings', icon: <SettingsIcon /> },
]

export default function ButtonGroupsPage() {
  const [menuView, setMenuView] = useState('grid')
  const [menuNav, setMenuNav] = useState('overview')
  const [menuNavDivider, setMenuNavDivider] = useState('overview')
  const [tabActive, setTabActive] = useState('design')
  const [tabPeriod, setTabPeriod] = useState('week')
  const [tabWithIcon, setTabWithIcon] = useState('calendar')
  const [tabDivider, setTabDivider] = useState('design')
  const [sizeActive, setSizeActive] = useState('grid')

  return (
    <ShowcasePage
      title="Button Groups"
      description="Skupiny tlačítek pro přepínání pohledů, navigaci nebo filtrování. Vždy jedno tlačítko je aktivní."
      componentSlug="button-group"
    >

      {/* ── MENU variant ── */}
      <Section
        title="Menu — bez oddělovačů"
        description="Decentní varianta — aktivní tlačítko má jen lehké zvýraznění pozadím. Všechna tlačítka stejně velká."
      >
        <Preview>
          <ButtonGroup
            variant="menu"
            items={viewItems}
            value={menuView}
            onChange={setMenuView}
          />
          <ButtonGroup
            variant="menu"
            items={navItems}
            value={menuNav}
            onChange={setMenuNav}
          />
        </Preview>
        <CodeBlock code={`<ButtonGroup
  variant="menu"
  items={[
    { value: 'grid', label: 'Grid', icon: <GridIcon /> },
    { value: 'list', label: 'List', icon: <ListIcon /> },
    { value: 'chart', label: 'Chart', icon: <BarChartIcon /> },
  ]}
  value={active}
  onChange={setActive}
/>`} />
      </Section>

      <Section
        title="Menu — se svislými oddělovači"
        description="Oddělovač dividers={true} — tenká čára mezi tlačítky."
      >
        <Preview>
          <ButtonGroup
            variant="menu"
            dividers
            items={navItems}
            value={menuNavDivider}
            onChange={setMenuNavDivider}
          />
          <ButtonGroup
            variant="menu"
            dividers
            items={viewItems}
            value={menuView}
            onChange={setMenuView}
          />
        </Preview>
        <CodeBlock code={`<ButtonGroup
  variant="menu"
  dividers
  items={navItems}
  value={active}
  onChange={setActive}
/>`} />
      </Section>

      {/* ── TABS variant ── */}
      <Section
        title="Záložky — bez oddělovačů"
        description="Aktivní záložka je viditelně větší — větší padding a text. Přechod je plynulý (200 ms)."
      >
        <Preview>
          <ButtonGroup
            variant="tabs"
            items={tabItems}
            value={tabActive}
            onChange={setTabActive}
          />
          <ButtonGroup
            variant="tabs"
            items={periodItems}
            value={tabPeriod}
            onChange={setTabPeriod}
          />
        </Preview>
        <CodeBlock code={`<ButtonGroup
  variant="tabs"
  items={[
    { value: 'design', label: 'Design' },
    { value: 'prototype', label: 'Prototype' },
    { value: 'code', label: 'Code' },
  ]}
  value={active}
  onChange={setActive}
/>`} />
      </Section>

      <Section
        title="Záložky — se svislými oddělovači"
        description="Oddělovač se zobrazuje pouze mezi neaktivními záložkami, aby nerušil aktivní zvýraznění."
      >
        <Preview>
          <ButtonGroup
            variant="tabs"
            dividers
            items={tabItems}
            value={tabDivider}
            onChange={setTabDivider}
          />
        </Preview>
        <CodeBlock code={`<ButtonGroup
  variant="tabs"
  dividers
  items={tabItems}
  value={active}
  onChange={setActive}
/>`} />
      </Section>

      <Section
        title="Záložky — s ikonami"
        description="Ikony fungují stejně jako u Button komponenty — vlevo před textem."
      >
        <Preview>
          <ButtonGroup
            variant="tabs"
            items={tabsWithIcons}
            value={tabWithIcon}
            onChange={setTabWithIcon}
          />
        </Preview>
        <CodeBlock code={`<ButtonGroup
  variant="tabs"
  items={[
    { value: 'calendar', label: 'Calendar', icon: <CalendarIcon /> },
    { value: 'list', label: 'List', icon: <ListIcon /> },
    { value: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ]}
  value={active}
  onChange={setActive}
/>`} />
      </Section>

      <Section
        title="Velikosti"
        description="Výšky odpovídají Button komponentě — xs=32px, sm=40px, md=52px, lg=64px."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            {['xs', 'sm', 'md', 'lg'].map(sz => (
              <div key={sz} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '0.65rem', color: '#4A4560', letterSpacing: '0.08em', textTransform: 'uppercase', width: 24 }}>{sz}</span>
                <ButtonGroup variant="tabs" size={sz} items={viewItems} value={sizeActive} onChange={setSizeActive} />
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<ButtonGroup variant="tabs" size="xs" … />  {/* 32px */}
<ButtonGroup variant="tabs" size="sm" … />  {/* 40px */}
<ButtonGroup variant="tabs" size="md" … />  {/* 52px — výchozí */}
<ButtonGroup variant="tabs" size="lg" … />  {/* 64px */}`} />
      </Section>

    </ShowcasePage>
  )
}
