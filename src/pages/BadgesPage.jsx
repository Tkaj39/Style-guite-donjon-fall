import DonjonBadge from '../components/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

const SwordIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M10.5 1.5 1.5 10.5M2 2l8 .5-.5 8M3 6l3-3 3 3-3 3-3-3Z"/>
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M6 1 1 3v4c0 2 2 3.5 5 4 3-.5 5-2 5-4V3L6 1Z"/>
  </svg>
)

const FlameIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M6 1c0 2-2 2.5-2 5a2 2 0 0 0 4 0c0-1-.5-1.5-1-2 0 1-1 1.5-1 2.5a1 1 0 0 1-2 0C4 5 6 4 6 1Z"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 3 10.5l.5-3.5L1 4.5 4.5 4 6 1Z"/>
  </svg>
)

const SkullIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M6 1a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V10h4V8.5A4 4 0 0 0 10 5a4 4 0 0 0-4-4ZM4.5 9.5v1h3v-1H4.5ZM4 5.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm3.5 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
  </svg>
)

export default function BadgesPage() {
  return (
    <ShowcasePage
      title="Badges"
      description="Donjon Fall status badges — slight octagon clip, semantic color variants, optional dot and icon."
      componentSlug="donjon-badge"
    >
      {/* Variants */}
      <Section
        title="Variants"
        description="Five semantic variants: default, success, danger, warning, info."
      >
        <Preview>
          <DonjonBadge variant="default">Default</DonjonBadge>
          <DonjonBadge variant="success">Success</DonjonBadge>
          <DonjonBadge variant="danger">Danger</DonjonBadge>
          <DonjonBadge variant="warning">Warning</DonjonBadge>
          <DonjonBadge variant="info">Info</DonjonBadge>
        </Preview>
        <CodeBlock code={`<DonjonBadge variant="default">Default</DonjonBadge>
<DonjonBadge variant="success">Success</DonjonBadge>
<DonjonBadge variant="danger">Danger</DonjonBadge>
<DonjonBadge variant="warning">Warning</DonjonBadge>
<DonjonBadge variant="info">Info</DonjonBadge>`} />
      </Section>

      {/* Sizes */}
      <Section
        title="Sizes"
        description="Two sizes: sm and md (default)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#8F7458', width: 28 }}>md</span>
              <DonjonBadge size="md" variant="default">Default</DonjonBadge>
              <DonjonBadge size="md" variant="success">Success</DonjonBadge>
              <DonjonBadge size="md" variant="danger">Danger</DonjonBadge>
              <DonjonBadge size="md" variant="warning">Warning</DonjonBadge>
              <DonjonBadge size="md" variant="info">Info</DonjonBadge>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#8F7458', width: 28 }}>sm</span>
              <DonjonBadge size="sm" variant="default">Default</DonjonBadge>
              <DonjonBadge size="sm" variant="success">Success</DonjonBadge>
              <DonjonBadge size="sm" variant="danger">Danger</DonjonBadge>
              <DonjonBadge size="sm" variant="warning">Warning</DonjonBadge>
              <DonjonBadge size="sm" variant="info">Info</DonjonBadge>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonBadge size="md" variant="success">Success</DonjonBadge>
<DonjonBadge size="sm" variant="success">Success</DonjonBadge>`} />
      </Section>

      {/* With dot */}
      <Section
        title="With Status Dot"
        description="dot=true shows a glowing colored circle on the left — useful for live status indicators."
      >
        <Preview>
          <DonjonBadge variant="default" dot>Idle</DonjonBadge>
          <DonjonBadge variant="success" dot>Active</DonjonBadge>
          <DonjonBadge variant="danger" dot>Critical</DonjonBadge>
          <DonjonBadge variant="warning" dot>Caution</DonjonBadge>
          <DonjonBadge variant="info" dot>Scouting</DonjonBadge>
        </Preview>
        <Preview>
          <DonjonBadge size="sm" variant="default" dot>Idle</DonjonBadge>
          <DonjonBadge size="sm" variant="success" dot>Active</DonjonBadge>
          <DonjonBadge size="sm" variant="danger" dot>Critical</DonjonBadge>
          <DonjonBadge size="sm" variant="warning" dot>Caution</DonjonBadge>
          <DonjonBadge size="sm" variant="info" dot>Scouting</DonjonBadge>
        </Preview>
        <CodeBlock code={`<DonjonBadge variant="success" dot>Active</DonjonBadge>
<DonjonBadge variant="danger" dot>Critical</DonjonBadge>
<DonjonBadge size="sm" variant="warning" dot>Caution</DonjonBadge>`} />
      </Section>

      {/* With icon */}
      <Section
        title="With Icon"
        description="Pass any 12px React node as icon. The icon renders before text and inherits the variant text color."
      >
        <Preview>
          <DonjonBadge variant="default" icon={<StarIcon />}>Legendary</DonjonBadge>
          <DonjonBadge variant="success" icon={<ShieldIcon />}>Protected</DonjonBadge>
          <DonjonBadge variant="danger" icon={<SkullIcon />}>Defeated</DonjonBadge>
          <DonjonBadge variant="warning" icon={<FlameIcon />}>Burning</DonjonBadge>
          <DonjonBadge variant="info" icon={<SwordIcon />}>In Combat</DonjonBadge>
        </Preview>
        <Preview>
          <DonjonBadge size="sm" variant="success" icon={<ShieldIcon />}>Protected</DonjonBadge>
          <DonjonBadge size="sm" variant="danger" icon={<SkullIcon />}>Defeated</DonjonBadge>
          <DonjonBadge size="sm" variant="warning" icon={<FlameIcon />}>Burning</DonjonBadge>
        </Preview>
        <CodeBlock code={`<DonjonBadge variant="success" icon={<ShieldIcon />}>Protected</DonjonBadge>
<DonjonBadge variant="danger" icon={<SkullIcon />}>Defeated</DonjonBadge>
<DonjonBadge size="sm" variant="warning" icon={<FlameIcon />}>Burning</DonjonBadge>`} />
      </Section>

      {/* Practical usage */}
      <Section
        title="In Context"
        description="Example of badges used together in a game-UI party member list."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {[
              { name: 'Aldric Ironveil', role: 'Warrior', status: 'Active', statusVariant: 'success' },
              { name: 'Seraphine Ash', role: 'Mage', status: 'Low HP', statusVariant: 'warning' },
              { name: 'Dusk Blackmantle', role: 'Rogue', status: 'Poisoned', statusVariant: 'danger' },
              { name: 'Miravel', role: 'Cleric', status: 'Scouting', statusVariant: 'info' },
            ].map(member => (
              <div
                key={member.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid #2A2948',
                }}
              >
                <div>
                  <div style={{ color: '#F0E6D3', fontSize: '0.875rem', fontWeight: 600 }}>{member.name}</div>
                  <div style={{ color: '#8F7458', fontSize: '0.75rem', marginTop: 2 }}>{member.role}</div>
                </div>
                <DonjonBadge size="sm" variant={member.statusVariant} dot>{member.status}</DonjonBadge>
              </div>
            ))}
          </div>
        </Preview>
      </Section>
    </ShowcasePage>
  )
}
