import { useState } from 'react'
import Table from '../lib/tkajui/Table'
import List from '../lib/tkajui/List'
import DescriptionList from '../lib/tkajui/DescriptionList'
import Stat from '../lib/tkajui/Stat'
import Badge from '../lib/tkajui/Badge'
import Card from '../lib/tkajui/Card'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import DonjonCard from '../lib/donjon/DonjonCard'
import {
  SwordIcon, ShieldIcon, PotionIcon, KeyIcon, GemIcon, LockIcon,
  DonjonTable, DonjonList, DonjonDescriptionList, DonjonStat, DonjonButton,
} from '../lib/donjon'
import Button from '../lib/tkajui/Button'
import { Stack, Inline, Grid } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow, dangerColor } from '../lib/tkajui/tokens'
import { dangerColor as donjonDanger, goldMid } from '../lib/donjon/tokens'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

const PLAYERS = [
  { id: 1, name: 'Aragorn',  class: 'Ranger',   hp: 84,  level: 12, gold: 1240 },
  { id: 2, name: 'Gandalf',  class: 'Wizard',   hp: 62,  level: 18, gold: 890  },
  { id: 3, name: 'Legolas',  class: 'Archer',   hp: 78,  level: 11, gold: 1450 },
  { id: 4, name: 'Gimli',    class: 'Warrior',  hp: 95,  level: 10, gold: 2050 },
  { id: 5, name: 'Frodo',    class: 'Rogue',    hp: 48,  level: 9,  gold: 320  },
]

function TableDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const TableC = isDonjon ? DonjonTable : Table
  const BadgeC = isDonjon ? DonjonBadge : Badge
  const hpDanger = isDonjon ? donjonDanger : dangerColor
  const labelColor = isDonjon ? goldMid : textMid
  const [selected, setSelected] = useState(null)
  return (
    <Stack gap="md">
      <TableC
        columns={[
          { key: 'name',  label: 'Name',  sortable: true },
          { key: 'class', label: 'Class', sortable: true },
          { key: 'level', label: 'Lvl',   sortable: true, align: 'right', width: 60 },
          { key: 'hp',    label: 'HP',    sortable: true, align: 'right', width: 80,
            render: (v) => <span style={{ color: v < 60 ? hpDanger : 'inherit' }}>{v}</span> },
          { key: 'gold',  label: 'Gold',  sortable: true, align: 'right',
            render: (v) => <BadgeC variant="warning" size="sm">{v} g</BadgeC> },
        ]}
        data={PLAYERS}
        striped
        onRowClick={(row) => setSelected(row.name)}
      />
      <span style={{ fontSize: '0.75rem', color: labelColor }}>
        Selected row: {selected ?? '(none — click a row)'}
      </span>
    </Stack>
  )
}

function ListDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const ListC = isDonjon ? DonjonList : List
  const BadgeC = isDonjon ? DonjonBadge : Badge
  return (
    <Stack gap="lg">
      <ListC
        items={[
          { id: 1, icon: <SwordIcon  width={18} height={18} />, title: 'Iron Sword',     description: '+5 ATK', trailing: <BadgeC size="sm">x1</BadgeC> },
          { id: 2, icon: <ShieldIcon width={18} height={18} />, title: 'Wooden Shield', description: '+3 DEF', trailing: <BadgeC size="sm">x1</BadgeC> },
          { id: 3, icon: <PotionIcon width={18} height={18} />, title: 'Health Potion', description: 'Restores 50 HP', trailing: <BadgeC size="sm">x12</BadgeC>, onClick: () => {} },
          { id: 4, icon: <KeyIcon    width={18} height={18} />, title: 'Brass Key',     description: 'Opens the East Gate', selected: true, onClick: () => {} },
          { id: 5, icon: <GemIcon    width={18} height={18} />, title: 'Cursed Gem',    description: 'Cannot be sold', disabled: true, trailing: <LockIcon width={14} height={14} /> },
        ]}
      />
    </Stack>
  )
}

function DescriptionListDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const DLC = isDonjon ? DonjonDescriptionList : DescriptionList
  const labelColor = isDonjon ? goldMid : textLow
  return (
    <Grid columns={2} gap="lg">
      <Stack gap="xs">
        <span style={{ fontSize: '0.75rem', color: labelColor }}>Inline layout (default)</span>
        <DLC
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
        <span style={{ fontSize: '0.75rem', color: labelColor }}>Stacked layout</span>
        <DLC
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
  const lib = useLibVariant()
  const StatC = lib === 'donjon' ? DonjonStat : Stat
  return (
    <Stack gap="lg">
      <Inline gap="lg">
        <StatC label="Score"      value="12 450" delta={320} hint="vs last run" />
        <StatC label="Turns"      value="84"     delta={-3}  hint="vs avg"      />
        <StatC label="Errors"     value="2"      delta={-1}  invertDelta hint="lower is better" />
        <StatC label="Streak"     value="7"      delta={0}   hint="this week" />
      </Inline>
      <Inline gap="lg" align="end">
        {['sm', 'md', 'lg', 'xl'].map(sz => (
          <StatC key={sz} size={sz} label={`Size ${sz}`} value="42" delta={5} />
        ))}
      </Inline>
    </Stack>
  )
}

function BadgeDemo() {
  const lib = useLibVariant()
  const B = lib === 'donjon' ? DonjonBadge : Badge
  return (
    <Stack gap="md">
      <Inline gap="sm">
        <B variant="default">Default</B>
        <B variant="success">Success</B>
        <B variant="danger">Danger</B>
        <B variant="warning">Warning</B>
        <B variant="info">Info</B>
      </Inline>
      <Inline gap="sm" align="center">
        <B size="sm" variant="success">sm</B>
        <B size="md" variant="success">md</B>
      </Inline>
    </Stack>
  )
}

function CardDemo() {
  const lib = useLibVariant()
  const isDonjon = lib === 'donjon'
  const C = isDonjon ? DonjonCard : Card
  const Btn = isDonjon ? DonjonButton : Button
  return (
    <Stack gap="md" style={{ maxWidth: 420 }}>
      <C title="Default card" description="A short description that explains the panel.">
        Body content goes here.
      </C>
      <C title="Confirm action" description="This will permanently delete the items." variant="danger"
         footer={<Btn variant="danger" size="sm">Delete</Btn>}>
        Body
      </C>
      <C title="Success" variant="success" description="Operation succeeded.">Body</C>
    </Stack>
  )
}

export default function DataDisplayPage() {
  return (
    <ShowcasePage
      title="Data display"
      description="Table + List + DescriptionList + Stat + Card + Badge — kompletní sada pro zobrazení strukturovaných dat. Sortable tabulky, item listy, key-value páry, KPI tiles, info kartičky, label badge."
      componentSlugs={['table', 'donjon-table', 'list', 'donjon-list', 'description-list', 'donjon-description-list', 'stat', 'donjon-stat', 'card', 'donjon-card', 'badge', 'donjon-badge']}
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
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
        <CodeBlock code={`import { SwordIcon, PotionIcon, GemIcon } from 'donjon-fall-ui'

<List items={[
  { id: 1, icon: <SwordIcon />,  title: 'Iron Sword',
    description: '+5 ATK', trailing: <Badge>x1</Badge> },
  { id: 2, icon: <PotionIcon />, title: 'Health Potion',
    description: 'Restores 50 HP', onClick: usePotion },
  { id: 3, icon: <GemIcon />,    title: 'Cursed Gem', disabled: true },
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

      <Section
        id="card"
        title="Card — info panel"
        description="Bordered panel s title / description / body / footer slotem. 3 variants (default / success / danger). Donjon variant má gold border + ornamenty."
      >
        <Preview>
          <CardDemo />
        </Preview>
        <CodeBlock code={`<Card title="Confirm action" description="…" variant="danger"
      footer={<Button variant="danger">Delete</Button>}>
  Body
</Card>`} />
      </Section>

      <Section
        id="badge"
        title="Badge — small label / tag"
        description="Inline label pro status, count, kategorii. 5 variants + 2 sizes. Donjon variant = hex polygon, tkajui = pill."
      >
        <Preview>
          <BadgeDemo />
        </Preview>
        <CodeBlock code={`<Badge variant="success">NEW</Badge>
<Badge variant="danger" size="sm">3</Badge>`} />
      </Section>

      <Section id="legacy-routes" title="Legacy URL → anchor map">
        <Stack gap="xs" style={{ fontSize: '0.8125rem', color: textMid }}>
          <p style={{ margin: 0 }}><code>/cards</code>  → <code>/data-display#card</code></p>
          <p style={{ margin: 0 }}><code>/badges</code> → <code>/data-display#badge</code></p>
          <p style={{ margin: 0, color: textLow }}>Staré routes jsou Navigate redirects.</p>
        </Stack>
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
