import { useState } from 'react'
import InventorySlot from '../lib/tkajui/InventorySlot'
import InventoryGrid from '../lib/tkajui/InventoryGrid'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { surface2, borderDefault, textMid, textLow, warningColor, infoColor, successColor, dangerColor } from '../lib/tkajui/tokens'
import { SwordIcon, ShieldIcon, PotionIcon, KeyIcon, GemIcon, ScrollIcon, CrownIcon } from '../lib/donjon'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

const RARITY = {
  common:    borderDefault,
  uncommon:  successColor,
  rare:      infoColor,
  epic:      dangerColor,
  legendary: warningColor,
}

const SAMPLE_ITEMS = [
  { icon: <SwordIcon />,  name: 'Iron Sword',     count: 1,  rarity: RARITY.common },
  { icon: <ShieldIcon />, name: 'Wooden Shield',  count: 1,  rarity: RARITY.common },
  { icon: <PotionIcon />, name: 'Health Potion',  count: 12, rarity: RARITY.uncommon },
  { icon: <KeyIcon />,    name: 'Brass Key',      count: 3,  rarity: RARITY.uncommon },
  { icon: <GemIcon />,    name: 'Ruby',           count: 1,  rarity: RARITY.rare },
  { icon: <ScrollIcon />, name: 'Ancient Scroll', count: 1,  rarity: RARITY.epic },
  { icon: <CrownIcon />,  name: 'Crown of Kings', count: 1,  rarity: RARITY.legendary },
  null,
  null,
]

function SlotDemo() {
  const [count, setCount] = useState(5)
  return (
    <Stack gap="lg">
      <Inline gap="md" align="center">
        {['xs', 'sm', 'md', 'lg', 'xl'].map(sz => (
          <Stack key={sz} gap="xs" align="center">
            <InventorySlot icon={<SwordIcon />} name="Sword" count={1} size={sz} />
            <span style={{ fontSize: '0.7rem', color: textLow }}>{sz}</span>
          </Stack>
        ))}
      </Inline>
      <Inline gap="sm">
        <InventorySlot icon={<SwordIcon />}  name="Common"    rarity={RARITY.common}    />
        <InventorySlot icon={<ShieldIcon />} name="Uncommon"  rarity={RARITY.uncommon}  />
        <InventorySlot icon={<GemIcon />}    name="Rare"      rarity={RARITY.rare}      />
        <InventorySlot icon={<ScrollIcon />} name="Epic"      rarity={RARITY.epic}      />
        <InventorySlot icon={<CrownIcon />}  name="Legendary" rarity={RARITY.legendary} />
      </Inline>
      <Inline gap="sm" align="center">
        <InventorySlot icon={<PotionIcon />} name="Counter"  count={count} onClick={() => setCount(c => c + 1)} />
        <InventorySlot icon={<KeyIcon />}    name="Selected" selected />
        <InventorySlot icon={<GemIcon />}    name="Locked"   locked />
        <InventorySlot icon={<ScrollIcon />} name="Disabled" disabled onClick={() => {}} />
        <InventorySlot name="Empty slot" />
      </Inline>
    </Stack>
  )
}

function GridDemo() {
  const [selected, setSelected] = useState(0)
  return (
    <Stack gap="md">
      <span style={{ fontSize: '0.75rem', color: textLow }}>3 × 3 fixed-capacity backpack (klikni pro výběr)</span>
      <InventoryGrid
        items={SAMPLE_ITEMS}
        columns={3}
        rows={3}
        selectedIndex={selected}
        onSelect={(i) => setSelected(i)}
      />
      <span style={{ fontSize: '0.75rem', color: textMid }}>
        Selected: {SAMPLE_ITEMS[selected]?.name ?? 'Empty slot'}
      </span>
    </Stack>
  )
}

export default function InventoryPage() {
  return (
    <ShowcasePage
      title="Inventory"
      description="InventorySlot + InventoryGrid — sada pro item gridy s fixní kapacitou. Rarity border, count badge, selected/locked/disabled stavy. Pro open-ended scrolling list použij plain Grid + InventorySlot."
      componentSlugs={['inventory-slot', 'inventory-grid']}
    >
      <Section
        id="inventory-slot"
        title="InventorySlot — single cell"
        description="Square buňka s icon + count badge + rarity border. Prázdná = `icon` neuveden. Stavy: selected (ring), locked (lock overlay), disabled (opacity)."
      >
        <Preview>
          <SlotDemo />
        </Preview>
        <CodeBlock code={`import { SwordIcon, PotionIcon } from 'donjon-fall-ui'

<InventorySlot icon={<SwordIcon />} name="Sword" count={1} rarity={legendaryColor} />

<InventorySlot icon={<PotionIcon />} count={12} selected onClick={pick} />

{/* Empty slot */}
<InventorySlot />`} />
      </Section>

      <Section
        id="inventory-grid"
        title="InventoryGrid — N × M layout"
        description="Padne items na fixní grid; chybějící sloty se vyplní prázdnými. `onSelect(index, item)` pro klikání. `selectedIndex` řídí accent ring."
      >
        <Preview>
          <GridDemo />
        </Preview>
        <CodeBlock code={`import { SwordIcon, PotionIcon } from 'donjon-fall-ui'

const items = [
  { icon: <SwordIcon />,  name: 'Sword',  count: 1,  rarity: rare },
  { icon: <PotionIcon />, name: 'Potion', count: 12 },
  null,  // empty
  // …
]

<InventoryGrid
  items={items}
  columns={3}
  rows={3}
  selectedIndex={sel}
  onSelect={(i, item) => setSel(i)}
/>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: surface2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>InventoryGrid</strong> pro fixní kapacitu (batoh, hotbar). Pro otevřený list použij Grid + InventorySlot.</p>
          <p style={{ margin: 0 }}>✓ Rarity = barva borderu — předej hex string (tokens nebo z palette).</p>
          <p style={{ margin: 0 }}>✓ Count badge se zobrazí jen pro `count {'>'} 1`.</p>
          <p style={{ margin: 0 }}>✓ `locked` = item viditelný, ale nedá se kliknout (slot s 🔒 overlay). `disabled` = klikatelný, ale šedý.</p>
          <p style={{ margin: 0, color: textLow }}>Doporučená velikost: sm (44 px) pro hotbar, md (56 px) pro inventory, lg (72 px) pro shop/loot screen.</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
