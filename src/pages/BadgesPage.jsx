import Badge from '../lib/tkajui/Badge'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

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

function BadgeContent() {
  const lib = useLibVariant()
  const B   = lib === 'tkajui' ? Badge : DonjonBadge
  const cmp = lib === 'tkajui' ? 'Badge' : 'DonjonBadge'

  return (
    <>
      <Section
        title="Variants"
        description="Pět sémantických variant: default, success, danger, warning, info."
      >
        <Preview>
          <B variant="default">Default</B>
          <B variant="success">Success</B>
          <B variant="danger">Danger</B>
          <B variant="warning">Warning</B>
          <B variant="info">Info</B>
        </Preview>
        <CodeBlock code={`<${cmp} variant="default">Default</${cmp}>
<${cmp} variant="success">Success</${cmp}>
<${cmp} variant="danger">Danger</${cmp}>
<${cmp} variant="warning">Warning</${cmp}>
<${cmp} variant="info">Info</${cmp}>`} />
      </Section>

      <Section
        title="Sizes"
        description="Dvě velikosti: sm a md (výchozí)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#8F7458', width: 28 }}>md</span>
              {['default','success','danger','warning','info'].map(v => <B key={v} size="md" variant={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</B>)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#8F7458', width: 28 }}>sm</span>
              {['default','success','danger','warning','info'].map(v => <B key={v} size="sm" variant={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</B>)}
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} size="md" variant="success">Success</${cmp}>
<${cmp} size="sm" variant="success">Success</${cmp}>`} />
      </Section>

      <Section
        title="Se status tečkou"
        description="dot=true zobrazí barevný kroužek vlevo — pro live stavové indikátory."
      >
        <Preview>
          <B variant="default" dot>Idle</B>
          <B variant="success" dot>Active</B>
          <B variant="danger" dot>Critical</B>
          <B variant="warning" dot>Caution</B>
          <B variant="info" dot>Scouting</B>
        </Preview>
        <Preview>
          <B size="sm" variant="default" dot>Idle</B>
          <B size="sm" variant="success" dot>Active</B>
          <B size="sm" variant="danger" dot>Critical</B>
          <B size="sm" variant="warning" dot>Caution</B>
          <B size="sm" variant="info" dot>Scouting</B>
        </Preview>
        <CodeBlock code={`<${cmp} variant="success" dot>Active</${cmp}>
<${cmp} variant="danger" dot>Critical</${cmp}>
<${cmp} size="sm" variant="warning" dot>Caution</${cmp}>`} />
      </Section>

      <Section
        title="S ikonou"
        description="Libovolný 12px ReactNode jako icon. Ikona dědí barvu textu varianty."
      >
        <Preview>
          <B variant="default" icon={<StarIcon />}>Legendary</B>
          <B variant="success" icon={<ShieldIcon />}>Protected</B>
          <B variant="danger" icon={<SkullIcon />}>Defeated</B>
          <B variant="warning" icon={<FlameIcon />}>Burning</B>
          <B variant="info" icon={<SwordIcon />}>In Combat</B>
        </Preview>
        <Preview>
          <B size="sm" variant="success" icon={<ShieldIcon />}>Protected</B>
          <B size="sm" variant="danger" icon={<SkullIcon />}>Defeated</B>
          <B size="sm" variant="warning" icon={<FlameIcon />}>Burning</B>
        </Preview>
        <CodeBlock code={`<${cmp} variant="success" icon={<ShieldIcon />}>Protected</${cmp}>
<${cmp} variant="danger" icon={<SkullIcon />}>Defeated</${cmp}>
<${cmp} size="sm" variant="warning" icon={<FlameIcon />}>Burning</${cmp}>`} />
      </Section>

      <Section
        title="V kontextu"
        description="Příklad odznaků v herním seznamu členů party."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {[
              { name: 'Aldric Ironveil', role: 'Warrior', status: 'Active',   statusVariant: 'success' },
              { name: 'Seraphine Ash',   role: 'Mage',    status: 'Low HP',   statusVariant: 'warning' },
              { name: 'Dusk Blackmantle',role: 'Rogue',   status: 'Poisoned', statusVariant: 'danger'  },
              { name: 'Miravel',         role: 'Cleric',  status: 'Scouting', statusVariant: 'info'    },
            ].map(member => (
              <div key={member.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2A2948' }}>
                <div>
                  <div style={{ color: '#F0E6D3', fontSize: '0.875rem', fontWeight: 600 }}>{member.name}</div>
                  <div style={{ color: '#8F7458', fontSize: '0.75rem', marginTop: 2 }}>{member.role}</div>
                </div>
                <B size="sm" variant={member.statusVariant} dot>{member.status}</B>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Používej pro stavové štítky — stav úkolu, herní role, výsledek akce.</p>
          <p>✓ Kombinuj s <code className="text-brand-300">dot</code> pro "živý" stav (hráč online, aktivní ohnisko).</p>
          <p>✓ Drž text krátký — 1–3 slova, badge není místo pro věty.</p>
          <p>✗ Nepoužívej badge jako náhradu tlačítka — badge není klikatelný prvek.</p>
          <p>✗ Nepřeplňuj kartu víc než 2–3 badge najednou — ztrácí se kontext.</p>
          <p>✗ Nepoužívej <code className="text-brand-300">icon</code> a <code className="text-brand-300">dot</code> zároveň — jsou vzájemně alternativní.</p>
        </div>
      </Section>
    </>
  )
}

export default function BadgesPage() {
  return (
    <ShowcasePage
      title="Badges"
      description="Status odznaky — lehce oktagonální tvar, sémantické barevné varianty, volitelná tečka a ikona."
      componentSlugs={['donjon-badge', 'badge']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <BadgeContent />
    </ShowcasePage>
  )
}
