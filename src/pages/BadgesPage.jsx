import Badge from '../lib/tkajui/Badge'
import { goldDim, bg4, textActive } from '../lib/donjon/tokens'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

/* ── Sdílené ikony ── */
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
const MagicIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M2 10L7 5M7 5L9 2L10 3L7 5M7 5L5 7"/>
    <path d="M4 8L2 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    <circle cx="9" cy="3" r="1" fill="currentColor"/>
  </svg>
)

/* ── TkajUI sekce ── */
function TkajuiContent() {
  return (
    <>
      <Section
        id="tkajui-variants"
        title="Variants"
        description="Pět sémantických variant: default, primary, success, danger, warning, info."
      >
        <Preview>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </Preview>
        <CodeBlock code={`<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>`} />
      </Section>

      <Section
        id="tkajui-sizes"
        title="Sizes"
        description="Dvě velikosti: sm a md (výchozí)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: goldDim, width: 28 }}>md</span>
              {['default','primary','success','danger','warning','info'].map(v => (
                <Badge key={v} size="md" variant={v}>{v}</Badge>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: goldDim, width: 28 }}>sm</span>
              {['default','primary','success','danger','warning','info'].map(v => (
                <Badge key={v} size="sm" variant={v}>{v}</Badge>
              ))}
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<Badge size="md" variant="success">Success</Badge>
<Badge size="sm" variant="success">Success</Badge>`} />
      </Section>

      <Section
        id="tkajui-dot"
        title="Se status tečkou"
        description="dot=true zobrazí barevný kroužek vlevo — pro live stavové indikátory."
      >
        <Preview>
          <Badge variant="default" dot>Idle</Badge>
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="danger" dot>Critical</Badge>
          <Badge variant="warning" dot>Caution</Badge>
          <Badge variant="info" dot>Scouting</Badge>
        </Preview>
        <CodeBlock code={`<Badge variant="success" dot>Active</Badge>
<Badge variant="danger" dot>Critical</Badge>`} />
      </Section>

      <Section
        id="tkajui-icon"
        title="S ikonou"
        description="Libovolný 12px ReactNode jako icon. Ikona dědí barvu textu varianty."
      >
        <Preview>
          <Badge variant="default" icon={<StarIcon />}>Legendary</Badge>
          <Badge variant="success" icon={<ShieldIcon />}>Protected</Badge>
          <Badge variant="danger" icon={<SkullIcon />}>Defeated</Badge>
          <Badge variant="warning" icon={<FlameIcon />}>Burning</Badge>
          <Badge variant="info" icon={<SwordIcon />}>In Combat</Badge>
        </Preview>
        <CodeBlock code={`<Badge variant="success" icon={<ShieldIcon />}>Protected</Badge>
<Badge variant="danger" icon={<SkullIcon />}>Defeated</Badge>`} />
      </Section>
    </>
  )
}

/* ── DonjonBadge sekce ── */
function DonjonContent() {
  return (
    <>
      {/* Nativní herní varianty */}
      <Section
        id="donjon-variants"
        title="Herní varianty"
        description="Šest nativních herních variant s hexagonálním tvarem a glow efektem. Každá varianta nese sémantický herní význam — není to jen barva."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <DonjonBadge variant="default">Default</DonjonBadge>
            <DonjonBadge variant="gain">Gain</DonjonBadge>
            <DonjonBadge variant="loss">Loss</DonjonBadge>
            <DonjonBadge variant="event">Event</DonjonBadge>
            <DonjonBadge variant="warning">Warning</DonjonBadge>
            <DonjonBadge variant="magic">Magic</DonjonBadge>
            <DonjonBadge variant="muted">Muted</DonjonBadge>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonBadge variant="default">Default</DonjonBadge>
<DonjonBadge variant="gain">Gain</DonjonBadge>
<DonjonBadge variant="loss">Loss</DonjonBadge>
<DonjonBadge variant="event">Event</DonjonBadge>
<DonjonBadge variant="warning">Warning</DonjonBadge>
<DonjonBadge variant="magic">Magic</DonjonBadge>
<DonjonBadge variant="muted">Muted</DonjonBadge>`} />
      </Section>

      {/* Velikosti */}
      <Section
        id="donjon-sizes"
        title="Sizes"
        description="Dvě velikosti: sm a md (výchozí)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: goldDim, width: 28 }}>md</span>
              {['default','gain','loss','event','warning','magic','muted'].map(v => (
                <DonjonBadge key={v} size="md" variant={v}>{v}</DonjonBadge>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: goldDim, width: 28 }}>sm</span>
              {['default','gain','loss','event','warning','magic','muted'].map(v => (
                <DonjonBadge key={v} size="sm" variant={v}>{v}</DonjonBadge>
              ))}
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonBadge size="md" variant="gain">Gain</DonjonBadge>
<DonjonBadge size="sm" variant="gain">Gain</DonjonBadge>`} />
      </Section>

      {/* Diamantový indikátor */}
      <Section
        id="donjon-dot"
        title="Diamantový indikátor"
        description="dot=true zobrazí heraldický diamant vlevo — záměrně odlišný od kruhu v TkajUI."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <DonjonBadge variant="default" dot>Idle</DonjonBadge>
            <DonjonBadge variant="gain" dot>Active</DonjonBadge>
            <DonjonBadge variant="loss" dot>Critical</DonjonBadge>
            <DonjonBadge variant="warning" dot>Caution</DonjonBadge>
            <DonjonBadge variant="event" dot>Event</DonjonBadge>
            <DonjonBadge variant="magic" dot>Casting</DonjonBadge>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <DonjonBadge size="sm" variant="gain" dot>Active</DonjonBadge>
            <DonjonBadge size="sm" variant="loss" dot>Critical</DonjonBadge>
            <DonjonBadge size="sm" variant="warning" dot>Caution</DonjonBadge>
            <DonjonBadge size="sm" variant="event" dot>Event</DonjonBadge>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonBadge variant="gain" dot>Active</DonjonBadge>
<DonjonBadge variant="loss" dot>Critical</DonjonBadge>
<DonjonBadge size="sm" variant="warning" dot>Caution</DonjonBadge>`} />
      </Section>

      {/* Ikona */}
      <Section
        id="donjon-icon"
        title="S ikonou"
        description="Ikona dědí barvu textu varianty — funguje stejně jako v TkajUI."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <DonjonBadge variant="event"   icon={<StarIcon />}>Legendary</DonjonBadge>
            <DonjonBadge variant="gain"    icon={<ShieldIcon />}>Protected</DonjonBadge>
            <DonjonBadge variant="loss"    icon={<SkullIcon />}>Defeated</DonjonBadge>
            <DonjonBadge variant="warning" icon={<FlameIcon />}>Burning</DonjonBadge>
            <DonjonBadge variant="default" icon={<SwordIcon />}>In Combat</DonjonBadge>
            <DonjonBadge variant="magic"   icon={<MagicIcon />}>Casting</DonjonBadge>
          </div>
        </Preview>
        <CodeBlock code={`<DonjonBadge variant="event"   icon={<StarIcon />}>Legendary</DonjonBadge>
<DonjonBadge variant="gain"    icon={<ShieldIcon />}>Protected</DonjonBadge>
<DonjonBadge variant="loss"    icon={<SkullIcon />}>Defeated</DonjonBadge>
<DonjonBadge variant="magic"   icon={<MagicIcon />}>Casting</DonjonBadge>`} />
      </Section>

      {/* Backward compat */}
      <Section
        id="donjon-compat"
        title="Backward-compat aliasy"
        description="Kód používající TkajUI variantové názvy funguje bez změny — success → gain, danger → loss, info → infoColor, primary → event."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <DonjonBadge variant="success">success → gain</DonjonBadge>
            <DonjonBadge variant="danger">danger → loss</DonjonBadge>
            <DonjonBadge variant="info">info → infoColor</DonjonBadge>
            <DonjonBadge variant="primary">primary → event</DonjonBadge>
          </div>
        </Preview>
        <CodeBlock code={`// Starý kód funguje bez migrace:
<DonjonBadge variant="success">success</DonjonBadge>
<DonjonBadge variant="danger">danger</DonjonBadge>

// Doporučená donjon-nativní forma:
<DonjonBadge variant="gain">gain</DonjonBadge>
<DonjonBadge variant="loss">loss</DonjonBadge>`} />
      </Section>

      {/* V kontextu */}
      <Section
        id="donjon-kontext"
        title="V herním kontextu"
        description="Příklad odznaku v herním přehledu party — herní varianty s diamantovým indikátorem."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {[
              { name: 'Aldric Ironveil',  role: 'Warrior', status: 'Active',    variant: 'gain'    },
              { name: 'Seraphine Ash',    role: 'Mage',    status: 'Low HP',    variant: 'warning' },
              { name: 'Dusk Blackmantle', role: 'Rogue',   status: 'Poisoned',  variant: 'loss'    },
              { name: 'Miravel',          role: 'Cleric',  status: 'Casting',   variant: 'magic'   },
              { name: 'Theron Grey',      role: 'Scout',   status: 'Scouting',  variant: 'event'   },
            ].map(member => (
              <div key={member.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: `1px solid ${bg4}`,
              }}>
                <div>
                  <div style={{ color: textActive, fontSize: '0.875rem', fontWeight: 600 }}>{member.name}</div>
                  <div style={{ color: goldDim, fontSize: '0.75rem', marginTop: 2 }}>{member.role}</div>
                </div>
                <DonjonBadge size="sm" variant={member.variant} dot>{member.status}</DonjonBadge>
              </div>
            ))}
          </div>
        </Preview>
      </Section>
    </>
  )
}

/* ── Pravidla ── */
function Pravidla({ isDonjon }) {
  return (
    <Section id="pravidla" title="Pravidla použití">
      <div className="flex flex-col gap-2 text-sm text-neutral-400">
        <p>✓ Používej pro stavové štítky — stav úkolu, herní role, výsledek akce.</p>
        {isDonjon
          ? <p>✓ Volí herní variantu podle sémantiky: <code className="text-brand-300">gain</code> pro zisk, <code className="text-brand-300">loss</code> pro ztrátu/nebezpečí, <code className="text-brand-300">event</code> pro zlaté eventy, <code className="text-brand-300">magic</code> pro magické stavy.</p>
          : <p>✓ Volí variantu podle sémantiky: <code className="text-brand-300">success</code> pro pozitivní, <code className="text-brand-300">danger</code> pro kritické, <code className="text-brand-300">warning</code> pro výzvy.</p>
        }
        <p>✓ Kombinuj s <code className="text-brand-300">dot</code> pro "živý" stav (hráč online, aktivní ohnisko).</p>
        <p>✓ Drž text krátký — 1–3 slova, badge není místo pro věty.</p>
        <p>✗ Nepoužívej badge jako náhradu tlačítka — badge není klikatelný prvek.</p>
        <p>✗ Nepřeplňuj kartu víc než 2–3 badge najednou — ztrácí se kontext.</p>
        <p>✗ Nepoužívej <code className="text-brand-300">icon</code> a <code className="text-brand-300">dot</code> zároveň — jsou vzájemně alternativní.</p>
      </div>
    </Section>
  )
}

/* ── Přepínač obsahu ── */
function BadgeContent() {
  const lib     = useLibVariant()
  const isDonjon = lib !== 'tkajui'

  return isDonjon
    ? <><DonjonContent /><Pravidla isDonjon /></>
    : <><TkajuiContent /><Pravidla isDonjon={false} /></>
}

export default function BadgesPage() {
  return (
    <ShowcasePage
      title="Badges"
      description="Status odznaky. TkajUI Badge — oktagonální tvar, generická UI paleta. DonjonBadge — hexagonální tvar, herní varianty (gain/loss/event/warning/magic) s glow efektem."
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
