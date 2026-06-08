import { useState } from 'react'
import Dialogue from '../lib/donjon/Dialogue'
import ChoicePanel from '../lib/donjon/ChoicePanel'
import RewardPopup from '../lib/donjon/RewardPopup'
import AchievementToast from '../lib/donjon/AchievementToast'
import LevelUp from '../lib/donjon/LevelUp'
import Button from '../lib/tkajui/Button'
import { Stack, Inline } from '../lib/tkajui/Layout'
import { bg2, borderDefault, textMid, textLow } from '../lib/donjon/tokens'
import { SwordIcon, ShieldIcon, PotionIcon, KeyIcon, GemIcon, ScrollIcon, CrownIcon, MagicIcon } from '../lib/donjon'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'

function DialogueDemo() {
  const [step, setStep] = useState(0)
  const lines = [
    { name: 'Old Wizard', text: 'You stand at the threshold, young one. The path you choose will echo through the ages.' },
    { name: 'Old Wizard', text: 'Behind you lies safety. Before you, only shadow. What is your will?' },
  ]
  const line = lines[step]
  return (
    <Stack gap="md">
      <Dialogue
        portraitSrc="https://picsum.photos/seed/wizard/200/200"
        name={line.name}
        text={line.text}
        footer={
          step < lines.length - 1
            ? <Dialogue.Continue onClick={() => setStep(s => s + 1)} />
            : (
              <Inline gap="sm">
                <Button onClick={() => setStep(0)}>Restart</Button>
                <Button variant="success">Continue journey</Button>
              </Inline>
            )
        }
      />
      <Dialogue
        portraitSrc="https://picsum.photos/seed/innkeeper/200/200"
        name="Innkeeper"
        portraitSide="right"
        text="Welcome, traveler. Room and board, two coppers a night. What'll it be?"
        choices={[
          { id: 'rent',   label: 'Rent a room',         hint: '−2 copper, +25 HP',    onClick: () => {} },
          { id: 'meal',   label: 'Just a meal',          hint: '−1 copper, +10 HP',    onClick: () => {} },
          { id: 'leave',  label: 'Leave quietly',        onClick: () => {} },
          { id: 'rob',    label: 'Rob the innkeeper',    hint: 'Alignment shift',     disabled: true },
        ]}
      />
    </Stack>
  )
}

function ChoicePanelDemo() {
  const [sel, setSel] = useState('blade')
  return (
    <ChoicePanel
      title="Choose your discipline"
      prompt="This selection is permanent and shapes the rest of your campaign."
      selected={sel}
      onSelect={setSel}
      options={[
        {
          id: 'blade',
          icon: <SwordIcon width={28} height={28} />,
          title: 'The Blade',
          description: 'Master of melee combat. High HP, high damage, low magic.',
          consequences: [
            { label: '+4 STR',          type: 'gain' },
            { label: '−2 INT',          type: 'cost' },
            { label: 'Heavy armor only', type: 'info' },
          ],
        },
        {
          id: 'sage',
          icon: <ScrollIcon width={28} height={28} />,
          title: 'The Sage',
          description: 'Master of arcane arts. Devastating spells, fragile body.',
          consequences: [
            { label: '+5 INT',           type: 'gain' },
            { label: '−3 STR',           type: 'cost' },
            { label: 'Cannot wear plate', type: 'danger' },
          ],
        },
        {
          id: 'rogue',
          icon: <ShieldIcon width={28} height={28} />,
          title: 'The Rogue',
          description: 'Balance of stealth and skill. Backstab, lockpick, traps.',
          consequences: [
            { label: '+3 DEX',          type: 'gain' },
            { label: '+1 LUCK',          type: 'gain' },
            { label: 'Faction infamy',   type: 'danger' },
          ],
        },
        {
          id: 'monk',
          icon: <MagicIcon width={28} height={28} />,
          title: 'The Monk',
          description: 'Locked behind expansion content.',
          disabled: true,
          disabledReason: 'Requires the Mountain Path DLC.',
        },
      ]}
    />
  )
}

function RewardPopupDemo() {
  const [items, setItems] = useState([])
  const POOL = [
    { icon: <SwordIcon  width={24} height={24} />, name: 'Iron Sword',     quantity: 1 },
    { icon: <PotionIcon width={24} height={24} />, name: 'Health Potion',  quantity: 3 },
    { icon: <GemIcon    width={24} height={24} />, name: 'Ruby',           quantity: 1 },
    { icon: <KeyIcon    width={24} height={24} />, name: 'Brass Key',      quantity: 1 },
    { icon: <CrownIcon  width={24} height={24} />, name: 'Crown of Kings', quantity: 1 },
  ]
  const trigger = () => {
    const pick = POOL[Math.floor(Math.random() * POOL.length)]
    const id = Date.now() + Math.random()
    setItems(arr => [...arr, { id, ...pick }])
  }
  return (
    <Stack gap="md">
      <Inline gap="sm">
        <Button onClick={trigger}>Drop random item</Button>
        <Button onClick={() => setItems([])}>Clear</Button>
      </Inline>
      <div style={{
        position: 'relative', minHeight: 80,
        padding: 12,
        background: bg2,
        border: `1px dashed ${borderDefault}`,
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'flex-start',
      }}>
        {items.length === 0 && (
          <span style={{ color: textLow, fontSize: '0.75rem' }}>(klikni Drop pro spawn)</span>
        )}
        {items.map(it => (
          <RewardPopup
            key={it.id}
            open
            icon={it.icon}
            name={it.name}
            quantity={it.quantity}
            onDismiss={() => setItems(arr => arr.filter(x => x.id !== it.id))}
          />
        ))}
      </div>
    </Stack>
  )
}

function AchievementToastDemo() {
  const [active, setActive] = useState([])
  const spawn = (tier) => {
    const id = Date.now()
    const payload = {
      gold:   { title: 'Slayer of Dragons', description: 'Defeat 100 dragons in a single run.' },
      silver: { title: 'Dungeon Crawler',   description: 'Clear 50 dungeons.' },
      bronze: { title: 'First Steps',       description: 'Complete the tutorial.' },
    }[tier]
    setActive(arr => [...arr, { id, tier, ...payload }])
  }
  return (
    <Stack gap="md">
      <Inline gap="sm">
        <Button onClick={() => spawn('gold')}>Gold</Button>
        <Button onClick={() => spawn('silver')}>Silver</Button>
        <Button onClick={() => spawn('bronze')}>Bronze</Button>
      </Inline>
      <div style={{
        position: 'relative', minHeight: 80,
        padding: 12,
        background: bg2,
        border: `1px dashed ${borderDefault}`,
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
      }}>
        {active.length === 0 && (
          <span style={{ color: textLow, fontSize: '0.75rem', alignSelf: 'flex-start' }}>(klikni tier pro spawn)</span>
        )}
        {active.map(a => (
          <AchievementToast
            key={a.id}
            open
            tier={a.tier}
            title={a.title}
            description={a.description}
            onDismiss={() => setActive(arr => arr.filter(x => x.id !== a.id))}
          />
        ))}
      </div>
    </Stack>
  )
}

function LevelUpDemo() {
  const [level, setLevel] = useState(7)
  const [key, setKey] = useState(0)
  return (
    <Stack gap="md" align="start">
      <Inline gap="sm">
        <Button onClick={() => { setLevel(l => l + 1); setKey(k => k + 1) }}>Level up!</Button>
        <Button onClick={() => { setLevel(7); setKey(k => k + 1) }}>Reset</Button>
      </Inline>
      <LevelUp
        key={key}
        level={level}
        subtitle="A new chapter begins. Your power grows."
        stats={[
          { label: 'Max HP', value: 8,  icon: '❤️' },
          { label: 'Max MP', value: 4,  icon: '✦' },
          { label: 'STR',    value: 2,  icon: '💪' },
          { label: 'INT',    value: 1,  icon: '🧠' },
        ]}
        actions={<Button variant="success">Continue</Button>}
      />
    </Stack>
  )
}

export default function GameplayPage() {
  return (
    <ShowcasePage
      title="Gameplay"
      description="Dialogue + ChoicePanel + RewardPopup + AchievementToast + LevelUp — donjon-themed komponenty pro vyprávění, volby, drop notifikace, unlocky a level-up celebrations."
      componentSlugs={['dialogue', 'choice-panel', 'reward-popup', 'achievement-toast', 'level-up']}
    >
      <Section
        id="dialogue"
        title="Dialogue — NPC speech panel"
        description="Portrait + name + body text + (volitelně) choices nebo Continue. `portraitSide` flipne layout. `Dialogue.Continue` je connection helper Button."
      >
        <Preview><DialogueDemo /></Preview>
        <CodeBlock code={`<Dialogue
  portraitSrc="/wizard.jpg"
  name="Old Wizard"
  text="You stand at the threshold…"
  footer={<Dialogue.Continue onClick={next} />}
/>

<Dialogue name="Innkeeper" text="What'll it be?" choices={[
  { id: 'rent', label: 'Rent a room', hint: '−2 copper, +25 HP', onClick: rent },
  { id: 'rob',  label: 'Rob the innkeeper', disabled: true },
]} />`} />
      </Section>

      <Section
        id="choice-panel"
        title="ChoicePanel — branch picker"
        description="Sister of Dialogue bez portrait/speech bubble. Pro permanentní volby (class, route, alignment). Consequences badge (cost/gain/danger/info) pro preview side-effects."
      >
        <Preview><ChoicePanelDemo /></Preview>
        <CodeBlock code={`<ChoicePanel
  title="Choose your discipline"
  prompt="This is permanent."
  selected={sel}
  onSelect={setSel}
  options={[
    { id: 'blade', icon: '⚔️', title: 'The Blade', description: '…',
      consequences: [
        { label: '+4 STR', type: 'gain' },
        { label: '−2 INT', type: 'cost' },
      ] },
    { id: 'monk', title: 'The Monk', disabled: true,
      disabledReason: 'Requires DLC.' },
  ]}
/>`} />
      </Section>

      <Section
        id="reward-popup"
        title="RewardPopup — item drop"
        description="Pop-in + hold + fade-out. `duration` (ms) řídí celý cyklus. Auto-stack v parent containeru. `onDismiss` se volá na konci animace pro cleanup."
      >
        <Preview><RewardPopupDemo /></Preview>
        <CodeBlock code={`<RewardPopup
  open
  icon="⚔️"
  name="Iron Sword"
  quantity={1}
  duration={2400}
  onDismiss={() => removeFromQueue(id)}
/>`} />
      </Section>

      <Section
        id="achievement-toast"
        title="AchievementToast — unlock notification"
        description="Větší vizuální weight než generic Toast. Tier (gold/silver/bronze) řídí barvu prstence + glow. Pair s top-right containerem na okraji obrazovky."
      >
        <Preview><AchievementToastDemo /></Preview>
        <CodeBlock code={`<AchievementToast
  open
  tier="gold"
  icon="🏆"
  title="Slayer of Dragons"
  description="Defeat 100 dragons in a single run."
  onDismiss={removeFromQueue}
/>`} />
      </Section>

      <Section
        id="level-up"
        title="LevelUp — celebration"
        description="Pop animation pro level + glow ring. Stats list (HP/MP/STR/…) s + delta. Inline render — pro full-screen takeover obal v portal + Backdrop."
      >
        <Preview><LevelUpDemo /></Preview>
        <CodeBlock code={`<LevelUp
  level={8}
  subtitle="A new chapter begins."
  stats={[
    { label: 'Max HP', value: 8, icon: '❤️' },
    { label: 'STR',    value: 2 },
  ]}
  actions={<Button variant="success">Continue</Button>}
/>`} />
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <Stack gap="xs" style={{ fontSize: '0.875rem', color: textMid, background: bg2, padding: 16, border: `1px solid ${borderDefault}`, borderRadius: 6 }}>
          <p style={{ margin: 0 }}>✓ <strong>Dialogue</strong> pro NPC mluvící — speech bubble feeling.</p>
          <p style={{ margin: 0 }}>✓ <strong>ChoicePanel</strong> pro permanentní rozhodnutí mimo conversation (class, alignment, route).</p>
          <p style={{ margin: 0 }}>✓ <strong>RewardPopup</strong> pro item drops během gameplay — nepřerušuje akci.</p>
          <p style={{ margin: 0 }}>✓ <strong>AchievementToast</strong> jen pro milníky — gold pro hard achievements, bronze pro tutorial.</p>
          <p style={{ margin: 0 }}>✓ <strong>LevelUp</strong> = moment k pauze. Voláním z portal + Backdrop ho přepneš na full-screen takeover.</p>
          <p style={{ margin: 0, color: textLow }}>Hierarchie: RewardPopup (passive) → AchievementToast (mid-weight, side) → LevelUp (full pause-moment).</p>
        </Stack>
      </Section>
    </ShowcasePage>
  )
}
