import { useState } from 'react'
import Table from '../lib/tkajui/Table'
import List from '../lib/tkajui/List'
import DescriptionList from '../lib/tkajui/DescriptionList'
import Stat from '../lib/tkajui/Stat'
import Badge from '../lib/tkajui/Badge'
import { Stack, Inline, Grid } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow, dangerColor } from '../lib/tkajui/tokens'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

const PLAYERS = [
  { id: 1, name: 'Aragorn',  class: 'Ranger',   hp: 84,  level: 12, gold: 1240 },
  { id: 2, name: 'Gandalf',  class: 'Wizard',   hp: 62,  level: 18, gold: 890  },
  { id: 3, name: 'Legolas',  class: 'Archer',   hp: 78,  level: 11, gold: 1450 },
  { id: 4, name: 'Gimli',    class: 'Warrior',  hp: 95,  level: 10, gold: 2050 },
  { id: 5, name: 'Frodo',    class: 'Rogue',    hp: 48,  level: 9,  gold: 320  },
]

function TableDemo() {
  const [selected, setSelected] = useState(null)
  return (
    <Stack gap="md">
      <Table
        columns={[
          { key: 'name',  label: 'Name',  sortable: true },
          { key: 'class', label: 'Class', sortable: true },
          { key: 'level', label: 'Lvl',   sortable: true, align: 'right', width: 60 },
          { key: 'hp',    label: 'HP',    sortable: true, align: 'right', width: 80,
            render: (v) => <span style={{ color: v < 60 ? dangerColor : 'inherit' }}>{v}</span> },
          { key: 'gold',  label: 'Gold',  sortable: true, align: 'right',
            render: (v) => <Badge variant="warning" size="sm">{v} g</Badge> },
        ]}
        data={PLAYERS}
        striped
        onRowClick={(row) => setSelected(row.name)}
      />
      <span style={{ fontSize: '0.75rem', color: textMid }}>
        Selected row: {selected ?? '(none — click a row)'}
      </span>
    </Stack>
  )
}

function ListDemo() {
  return (
    <Stack gap="lg">
      <List
        items={[
          { id: 1, icon: '⚔️', title: 'Iron Sword',     description: '+5 ATK', trailing: <Badge size="sm">x1</Badge> },
          { id: 2, icon: '🛡️', title: 'Wooden Shield', description: '+3 DEF', trailing: <Badge size="sm">x1</Badge> },
          { id: 3, icon: '🧪', title: 'Health Potion', description: 'Restores 50 HP', trailing: <Badge size="sm">x12</Badge>, onClick: () => {} },
          { id: 4, icon: '🗝️', title: 'Brass Key',     description: 'Opens the East Gate', selected: true, onClick: () => {} },
          { id: 5, icon: '💎', title: 'Cursed Gem',    description: 'Cannot be sold', disabled: true, trailing: '🔒' },
        ]}
      />
    </Stack>
  )
}

function DescriptionListDemo() {
  return (
    <Grid columns={2} gap="lg">
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Inline layout (default)</span>
        <DescriptionList
          items={[
            { term: 'Name',  description: 'Aragorn II Elessar' },
            { term: 'Class', description: 'Ranger / King' },
            { term: 'Level', description: '12' },
            { term: 'HP',    description: '84 / 100' },
            { term: 'Gold',  description: '1 240' },
          ]}
          dividers
        />
      </Stack>
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: textLow }}>Stacked layout</span>
        <DescriptionList
          layout="stacked"
          items={[
            { term: 'Difficulty',  description: 'Nightmare' },
            { term: 'Permadeath',  description: 'Enabled' },
            { term: 'Save slot',   description: 'Auto-save (Turn 84)' },
            { term: 'Playtime',    description: '14 h 23 min' },
          ]}
        />
      </Stack>
    </Grid>
  )
}

function StatDemo() {
  return (
    <Stack gap="lg">
      <Inline gap="lg">
        <Stat label="Score"      value="12 450" delta={320} hint="vs last run" />
        <Stat label="Turns"      value="84"     delta={-3}  hint="vs avg"      />
        <Stat label="Errors"     value="2"      delta={-1}  invertDelta hint="lower is better" />
        <Stat label="Streak"     value="7"      delta={0}   hint="this week" />
      </Inline>
      <Inline gap="lg" align="end">
        {['sm', 'md', 'lg', 'xl'].map(sz => (
          <Stat key={sz} size={sz} label={`Size ${sz}`} value="42" delta={5} />
        ))}
      </Inline>
    </Stack>
  )
}

export default function DataDisplayPage() {
  return (
    <ShowcasePage
      title="Data display"
      description="Table + List + DescriptionList + Stat — sada pro zobrazení strukturovaných dat. Sortable tabulky, item listy, key-value páry, KPI tiles."
      componentSlugs={['table', 'list', 'description-list', 'stat']}
    >
      <Section
        id="table"
        title="Table — sortable rows"
        description="Columns schema (key, label, render?, sortable?, align?, width?) + data array. Internal sort toggle (asc → desc → off). Controlled mode přes `sortBy` + `onSortChange`. striped / hoverable / row click."
      >
        <Preview>
          <TableDemo />
        </Preview>
        <CodeBlock code={`<Table
  columns={[
    { key: 'name',  label: 'Name',  sortable: true },
    { key: 'level', label: 'Lvl',   sortable: true, align: 'right' },
    { key: 'hp',    label: 'HP',    align: 'right',
      render: (v) => <span style={{ color: v < 60 ? red : 'inherit' }}>{v}</span> },
  ]}
  data={players}
  striped
  onRowClick={(row) => setSelected(row)}
/>`} />
      </Section>

      <Section
        id="list"
        title="List — item list s dividers"
        description="Vertical list s icon / title / description / trailing slotem. Per-item `onClick` (item se stane button), `selected` / `disabled` stavy. Pro item gridy použij Grid + Card."
      >
        <Preview>
          <ListDemo />
        </Preview>
        <CodeBlock code={`<List items={[
  { id: 1, icon: '⚔️', title: 'Iron Sword',
    description: '+5 ATK', trailing: <Badge>x1</Badge> },
  { id: 2, icon: '🧪', title: 'Health Potion',
    description: 'Restores 50 HP', onClick: usePotion },
  { id: 3, icon: '💎', title: 'Cursed Gem', disabled: true },
]} />`} />
      </Section>

      <Section
        id="description-list"
        title="DescriptionList — key-value pairs"
        description="Semantic <dl><dt><dd>. `layout='inline'` (default, 2 columns) nebo `'stacked'` (term nad description). Pro character sheety, settings recap, item details."
      >
        <Preview>
          <DescriptionListDemo />
        </Preview>
        <CodeBlock code={`<DescriptionList items={[
  { term: 'Name',  description: 'Aragorn' },
  { term: 'Class', description: 'Ranger' },
  { term: 'HP',    description: '84 / 100' },
]} dividers />

{/* Stacked — for narrow columns */}
<DescriptionList layout="stacked" items={[
  { term: 'Difficulty', description: 'Nightmare' },
]} />`} />
      </Section>

      <Section
        id="stat"
        title="Stat — label + big number + delta"
        description="KPI tile s tabular-nums (zarovnané číslice). `delta` zelená/červená šipka, `invertDelta` pro stats kde nižší = lepší (errors). Pro animované increment efekty z donjon-fall-ui použij NumericDisplay."
      >
        <Preview>
          <StatDemo />
        </Preview>
        <CodeBlock code={`<Stat label="Score" value="12 450" delta={320} hint="vs last run" />

{/* Negative is good (errors, latency) */}
<Stat label="Errors" value="2" delta={-1} invertDelta hint="lower is better" />

{/* No delta — static KPI */}
<Stat label="Players" value="84" size="lg" />`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>Table</strong> pro 5+ řádků s comparable atributy. Pro 1-3 entity → DescriptionList nebo Card.</p>
          <p style={{ margin: 0 }}>✓ <strong>List</strong> pro chronologické / categorizable itemy. Pro grid layout → Grid + Card.</p>
          <p style={{ margin: 0 }}>✓ <strong>DescriptionList</strong> sémanticky &lt;dl&gt; — screen readery to čtou jako "term/description pairs".</p>
          <p style={{ margin: 0 }}>✓ <strong>Stat</strong> má `tabular-nums` — číslice mají stejnou šířku, hodnoty se nehoupou při animaci.</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie data display: Stat (single value) → DescriptionList (key-value) → List (sequence) → Table (matrix).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
