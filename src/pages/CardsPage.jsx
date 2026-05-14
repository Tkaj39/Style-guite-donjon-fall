import DonjonCard from '../lib/donjon/DonjonCard'
import DonjonButton from '../lib/donjon/DonjonButton'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const SwordIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M14.5 1.5a.5.5 0 0 0-.707 0L9 6.293 7.5 4.793a.5.5 0 0 0-.707 0l-5 5a.5.5 0 0 0 .707.707L7.5 6 9 7.5 2.5 14h3l9-9a.5.5 0 0 0 0-.707l-3.5-3.5a.5.5 0 0 0 .5-.293Z"/>
  </svg>
)

const SkullIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M8 1a5 5 0 0 0-5 5c0 2 1 3.5 2.5 4.5V13h5v-2.5A5 5 0 0 0 13 6a5 5 0 0 0-5-5ZM5.5 12.5v1h5v-1h-5ZM5 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path d="M8 1 2 4v5c0 3 2.5 4.5 6 5.5 3.5-1 6-2.5 6-5.5V4L8 1Z"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" />
  </svg>
)

const statStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 0',
  borderBottom: '1px solid #2A2948',
  fontSize: '0.8125rem',
}

const labelStyle = { color: '#8F7458' }
const valueStyle = { color: '#F0E6D3', fontWeight: 600 }

export default function CardsPage() {
  return (
    <ShowcasePage
      title="Cards"
      description="Donjon Fall panel cards — octagon clip-path with SideOrnament and HexOrnament, variant-coloured headers."
      componentSlug="donjon-card"
    >
      {/* Basic card */}
      <Section
        title="Basic Card"
        description="A card with title, description, and body content."
      >
        <Preview>
          <DonjonCard
            title="The Sunken Vault"
            description="Ancient treasure chamber, level 7."
          >
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Legends speak of a vault buried beneath the Ashwood forest, sealed by a dragon's binding
              curse. Only those bearing the Sigil of Embers may pass the threshold.
            </p>
          </DonjonCard>
        </Preview>
        <CodeBlock code={`<DonjonCard
  title="The Sunken Vault"
  description="Ancient treasure chamber, level 7."
>
  <p>Body content goes here.</p>
</DonjonCard>`} />
      </Section>

      {/* Variants */}
      <Section
        title="Variants"
        description="default, danger, and success — matching DonjonButton variant colours."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: '100%' }}>
            <div style={{ flex: '1 1 220px' }}>
              <DonjonCard title="Quest Active" description="Variant: default" variant="default">
                <div style={statStyle}>
                  <span style={labelStyle}>Status</span>
                  <DonjonBadge size="sm" variant="info">In Progress</DonjonBadge>
                </div>
                <div style={statStyle}>
                  <span style={labelStyle}>Difficulty</span>
                  <span style={valueStyle}>★★★☆☆</span>
                </div>
              </DonjonCard>
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <DonjonCard title="Mission Failed" description="Variant: danger" variant="danger">
                <div style={statStyle}>
                  <span style={labelStyle}>Status</span>
                  <DonjonBadge size="sm" variant="danger">Failed</DonjonBadge>
                </div>
                <div style={statStyle}>
                  <span style={labelStyle}>Penalty</span>
                  <span style={{ color: '#F9C0C0', fontWeight: 600, fontSize: '0.8125rem' }}>−500 XP</span>
                </div>
              </DonjonCard>
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <DonjonCard title="Victory!" description="Variant: success" variant="success">
                <div style={statStyle}>
                  <span style={labelStyle}>Status</span>
                  <DonjonBadge size="sm" variant="success">Complete</DonjonBadge>
                </div>
                <div style={statStyle}>
                  <span style={labelStyle}>Reward</span>
                  <span style={{ color: '#C0F0C8', fontWeight: 600, fontSize: '0.8125rem' }}>+1200 XP</span>
                </div>
              </DonjonCard>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonCard title="Quest Active" variant="default">…</DonjonCard>
<DonjonCard title="Mission Failed" variant="danger">…</DonjonCard>
<DonjonCard title="Victory!" variant="success">…</DonjonCard>`} />
      </Section>

      {/* With footer */}
      <Section
        title="With Footer"
        description="Pass a React node as footer — rendered at the bottom with a HexOrnament separator line."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: '100%' }}>
            <div style={{ flex: '1 1 260px' }}>
              <DonjonCard
                title="Dragon's Keep"
                description="Boss encounter — recommended party of 4."
                footer={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <DonjonBadge variant="warning" dot size="sm">Active Threat</DonjonBadge>
                    <DonjonButton size="sm" trailingIcon={<ArrowRightIcon />}>Enter</DonjonButton>
                  </div>
                }
              >
                <div style={statStyle}>
                  <span style={labelStyle}>Enemy HP</span>
                  <span style={valueStyle}>12,400</span>
                </div>
                <div style={statStyle}>
                  <span style={labelStyle}>Reward</span>
                  <span style={valueStyle}>4,800 XP</span>
                </div>
                <div style={{ ...statStyle, borderBottom: 'none' }}>
                  <span style={labelStyle}>Level req.</span>
                  <span style={valueStyle}>25+</span>
                </div>
              </DonjonCard>
            </div>
            <div style={{ flex: '1 1 260px' }}>
              <DonjonCard
                title="Wanted: The Pale Wraith"
                description="Bounty issued by the Crown"
                variant="danger"
                footer={
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <DonjonButton size="sm" variant="danger" leadingIcon={<SkullIcon />}>Accept Bounty</DonjonButton>
                  </div>
                }
              >
                <p style={{ color: '#F9C0C0', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>
                  Last seen near the Ashwood Hollow. Armed and extremely dangerous. Approach
                  only with a full party.
                </p>
              </DonjonCard>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonCard
  title="Dragon's Keep"
  description="Boss encounter"
  footer={
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <DonjonBadge variant="warning" dot size="sm">Active Threat</DonjonBadge>
      <DonjonButton size="sm">Enter</DonjonButton>
    </div>
  }
>
  {/* body */}
</DonjonCard>`} />
      </Section>

      {/* Compositions */}
      <Section
        title="Compositions"
        description="Example compositions — hero stat block and loot panel."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: '100%' }}>
            {/* Stat block */}
            <div style={{ flex: '1 1 220px' }}>
              <DonjonCard
                title="Aldric Ironveil"
                description="Warrior · Level 24"
                footer={
                  <div style={{ display: 'flex', gap: 6 }}>
                    <DonjonButton size="sm" variant="default" leadingIcon={<SwordIcon />}>Attack</DonjonButton>
                    <DonjonButton size="sm" variant="success" leadingIcon={<ShieldIcon />}>Defend</DonjonButton>
                  </div>
                }
              >
                {[
                  { stat: 'HP', value: '340 / 420' },
                  { stat: 'Mana', value: '80 / 120' },
                  { stat: 'Armor', value: '68' },
                  { stat: 'Attack', value: '142' },
                ].map(({ stat, value }) => (
                  <div key={stat} style={statStyle}>
                    <span style={labelStyle}>{stat}</span>
                    <span style={valueStyle}>{value}</span>
                  </div>
                ))}
              </DonjonCard>
            </div>

            {/* Loot panel */}
            <div style={{ flex: '1 1 220px' }}>
              <DonjonCard
                title="Loot Acquired"
                description="From: The Sunken Vault"
                variant="success"
                footer={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#C0F0C8', fontSize: '0.75rem' }}>3 items found</span>
                    <DonjonButton size="sm" variant="success">Collect All</DonjonButton>
                  </div>
                }
              >
                {[
                  { name: 'Ember Sigil', rarity: 'Rare' },
                  { name: 'Vault Key Fragment', rarity: 'Uncommon' },
                  { name: 'Ancient Gold Coin ×12', rarity: 'Common' },
                ].map(({ name, rarity }) => (
                  <div key={name} style={{ ...statStyle, borderBottom: '1px solid #183D20' }}>
                    <span style={{ color: '#C0F0C8', fontSize: '0.8125rem' }}>{name}</span>
                    <DonjonBadge
                      size="sm"
                      variant={rarity === 'Rare' ? 'warning' : rarity === 'Uncommon' ? 'info' : 'default'}
                    >
                      {rarity}
                    </DonjonBadge>
                  </div>
                ))}
              </DonjonCard>
            </div>
          </div>
        </Preview>
      </Section>

      {/* No header */}
      <Section
        title="Body Only (No Header)"
        description="Omit title and description for a plain panel with just body content."
      >
        <Preview>
          <DonjonCard>
            <p style={{ color: '#B8956A', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              A headerless card renders as a pure panel — useful for wrapping arbitrary UI sections
              in the Donjon Fall aesthetic without imposing a title hierarchy.
            </p>
          </DonjonCard>
        </Preview>
        <CodeBlock code={`<DonjonCard>
  <p>Headerless body content.</p>
</DonjonCard>`} />
      </Section>
    </ShowcasePage>
  )
}
