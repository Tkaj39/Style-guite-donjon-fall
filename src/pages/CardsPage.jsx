import Card from '../lib/tkajui/Card'
import { goldMid, goldDim, bg4, textActive } from '../lib/donjon/tokens'
import DonjonCard from '../lib/donjon/DonjonCard'
import Button from '../lib/tkajui/Button'
import DonjonButton from '../lib/donjon/DonjonButton'
import Badge from '../lib/tkajui/Badge'
import DonjonBadge from '../lib/donjon/DonjonBadge'
import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'

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
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '6px 0', borderBottom: `1px solid ${bg4}`, fontSize: '0.8125rem',
}
const labelStyle = { color: goldDim }
const valueStyle = { color: textActive, fontWeight: 600 }

/* ── Obsah stránky — čte aktivní variantu přes hook ── */
function CardContent() {
  const lib = useLibVariant()                      // 'donjon' | 'tkajui'
  const C   = lib === 'tkajui' ? Card : DonjonCard
  const Btn = lib === 'tkajui' ? Button : DonjonButton
  const Bdg = lib === 'tkajui' ? Badge : DonjonBadge
  const cmp = lib === 'tkajui' ? 'Card' : 'DonjonCard'
  const btnCmp = lib === 'tkajui' ? 'Button' : 'DonjonButton'
  const bdgCmp = lib === 'tkajui' ? 'Badge' : 'DonjonBadge'

  return (
    <>
      {/* Basic card */}
      <Section
        title="Basic Card"
        description="Karta s title, description a body obsahem."
      >
        <Preview>
          <C title="The Sunken Vault" description="Ancient treasure chamber, level 7.">
            <p style={{ color: goldMid, fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Legends speak of a vault buried beneath the Ashwood forest, sealed by a dragon's binding
              curse. Only those bearing the Sigil of Embers may pass the threshold.
            </p>
          </C>
        </Preview>
        <CodeBlock code={`<${cmp}
  title="The Sunken Vault"
  description="Ancient treasure chamber, level 7."
>
  <p>Body content goes here.</p>
</${cmp}>`} />
      </Section>

      {/* Variants */}
      <Section
        title="Variants"
        description="default, danger a success — stejné barevné varianty jako DonjonButton."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: '100%' }}>
            <div style={{ flex: '1 1 220px' }}>
              <C title="Quest Active" description="Variant: default" variant="default">
                <div style={statStyle}>
                  <span style={labelStyle}>Status</span>
                  <Bdg size="sm" variant="info">In Progress</Bdg>
                </div>
                <div style={statStyle}>
                  <span style={labelStyle}>Difficulty</span>
                  <span style={valueStyle}>★★★☆☆</span>
                </div>
              </C>
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <C title="Mission Failed" description="Variant: danger" variant="danger">
                <div style={statStyle}>
                  <span style={labelStyle}>Status</span>
                  <Bdg size="sm" variant="danger">Failed</Bdg>
                </div>
                <div style={statStyle}>
                  <span style={labelStyle}>Penalty</span>
                  <span style={{ color: '#F9C0C0', fontWeight: 600, fontSize: '0.8125rem' }}>−500 XP</span>
                </div>
              </C>
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <C title="Victory!" description="Variant: success" variant="success">
                <div style={statStyle}>
                  <span style={labelStyle}>Status</span>
                  <Bdg size="sm" variant="success">Complete</Bdg>
                </div>
                <div style={statStyle}>
                  <span style={labelStyle}>Reward</span>
                  <span style={{ color: '#C0F0C8', fontWeight: 600, fontSize: '0.8125rem' }}>+1200 XP</span>
                </div>
              </C>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<${cmp} title="Quest Active" variant="default">…</${cmp}>
<${cmp} title="Mission Failed" variant="danger">…</${cmp}>
<${cmp} title="Victory!" variant="success">…</${cmp}>`} />
      </Section>

      {/* With footer */}
      <Section
        title="S patičkou"
        description="Prop footer přijímá ReactNode — typicky tlačítka akcí."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: '100%' }}>
            <div style={{ flex: '1 1 260px' }}>
              <C
                title="Dragon's Keep"
                description="Boss encounter — recommended party of 4."
                footer={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Bdg variant="warning" dot size="sm">Active Threat</Bdg>
                    <Btn size="sm" trailingIcon={<ArrowRightIcon />}>Enter</Btn>
                  </div>
                }
              >
                <div style={statStyle}><span style={labelStyle}>Enemy HP</span><span style={valueStyle}>12,400</span></div>
                <div style={statStyle}><span style={labelStyle}>Reward</span><span style={valueStyle}>4,800 XP</span></div>
                <div style={{ ...statStyle, borderBottom: 'none' }}><span style={labelStyle}>Level req.</span><span style={valueStyle}>25+</span></div>
              </C>
            </div>
            <div style={{ flex: '1 1 260px' }}>
              <C
                title="Wanted: The Pale Wraith"
                description="Bounty issued by the Crown"
                variant="danger"
                footer={
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Btn size="sm" variant="danger" leadingIcon={<SkullIcon />}>Accept Bounty</Btn>
                  </div>
                }
              >
                <p style={{ color: '#F9C0C0', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>
                  Last seen near the Ashwood Hollow. Armed and extremely dangerous.
                </p>
              </C>
            </div>
          </div>
        </Preview>
        <CodeBlock code={`<${cmp}
  title="Dragon's Keep"
  description="Boss encounter"
  footer={
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <${bdgCmp} variant="warning" dot size="sm">Active Threat</${bdgCmp}>
      <${btnCmp} size="sm">Enter</${btnCmp}>
    </div>
  }
>
  {/* body */}
</${cmp}>`} />
      </Section>

      {/* Compositions */}
      <Section
        title="Kompozice"
        description="Příklady složení — hero stat blok a loot panel."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: '100%' }}>
            <div style={{ flex: '1 1 220px' }}>
              <C
                title="Aldric Ironveil"
                description="Warrior · Level 24"
                footer={
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Btn size="sm" variant="default" leadingIcon={<SwordIcon />}>Attack</Btn>
                    <Btn size="sm" variant="success" leadingIcon={<ShieldIcon />}>Defend</Btn>
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
              </C>
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <C
                title="Loot Acquired"
                description="From: The Sunken Vault"
                variant="success"
                footer={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#C0F0C8', fontSize: '0.75rem' }}>3 items found</span>
                    <Btn size="sm" variant="success">Collect All</Btn>
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
                    <Bdg
                      size="sm"
                      variant={rarity === 'Rare' ? 'warning' : rarity === 'Uncommon' ? 'info' : 'default'}
                    >
                      {rarity}
                    </Bdg>
                  </div>
                ))}
              </C>
            </div>
          </div>
        </Preview>
      </Section>

      {/* No header */}
      <Section
        title="Jen tělo (bez hlavičky)"
        description="Vynecháním title a description dostaneš čistý panel bez hierarchie nadpisů."
      >
        <Preview>
          <C>
            <p style={{ color: goldMid, fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Karta bez hlavičky — vhodná pro obalení libovolné UI sekce ve stylu Donjon Fall
              bez vnucení titulkové hierarchie.
            </p>
          </C>
        </Preview>
        <CodeBlock code={`<${cmp}>
  <p>Tělo bez hlavičky.</p>
</${cmp}>`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Card = kontejner pro tematicky příbuzné informace — quest, hráč, lokace, herní entita.</p>
          <p>✓ Footer používej pro akční tlačítka vztahující se ke kartě, ne pro globální akce.</p>
          <p>✓ Variantu <code className="text-brand-300">danger</code> pro hrozby a nevratné stavy, <code className="text-brand-300">success</code> pro úspěchy a odměny.</p>
          <p>✓ Vynech <code className="text-brand-300">title</code> a <code className="text-brand-300">description</code> pokud chceš čistý panel bez titulkové hierarchie.</p>
          <p>✗ Nedávej do karty nekonečně scrollující obsah — pokud je obsah dlouhý, nastav explicitně <code className="text-brand-300">max-height</code> a <code className="text-brand-300">overflow-y: auto</code>.</p>
          <p>✗ Nehnízduj karty do karet — pro hierarchii obsahu použij sekce uvnitř jedné karty.</p>
        </div>
      </Section>
    </>
  )
}

/* ── Page ── */
export default function CardsPage() {
  return (
    <ShowcasePage
      title="Cards"
      description="Donjon Fall panel cards — oktagonální tvar. donjon-fall-ui varianta přidává SideOrnament + HexOrnament, TkajUI základ je čistý bez ornamentů."
      componentSlugs={['donjon-card', 'card']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <CardContent />
    </ShowcasePage>
  )
}
