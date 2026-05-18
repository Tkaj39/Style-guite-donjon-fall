import { ShowcasePage, Section, Preview, useLibVariant } from '../styleguide/ShowcasePage'
import Pictogram from '../lib/tkajui/Pictogram'
import DonjonPictogram from '../lib/donjon/DonjonPictogram'
import { SwordIcon, ShieldIcon, TowerIcon } from '../lib/donjon/icons'

const ICONS   = [
  { icon: SwordIcon,  label: 'SwordIcon',  note: 'Útok / souboj' },
  { icon: ShieldIcon, label: 'ShieldIcon', note: 'Obrana / základna' },
  { icon: TowerIcon,  label: 'TowerIcon',  note: 'Donjon / pevnost' },
]
const SIZES    = ['sm', 'md', 'lg', 'xl']
const VARIANTS = ['active', 'passive', 'disabled', 'danger', 'success']

const subLabel = {
  fontSize: '0.625rem', color: '#4A4560', fontWeight: 600,
  letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px',
}
const nano = { fontSize: '0.5rem', color: '#4A4560', fontFamily: 'monospace' }

/* ── TkajUI obsah ── */
function TkajuiContent() {
  return (
    <>
      <Section
        id="tkajui-sizes"
        title="Velikosti"
        description="Generický wrapper — přijme libovolnou SVG komponentu. Bez pozadí, bez dekorace."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <p style={subLabel}>Velikosti — size prop</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
                {SIZES.map(s => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <Pictogram icon={SwordIcon} size={s} color="#8F7458" />
                    <span style={nano}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={subLabel}>Barva — color prop (nebo CSS currentColor)</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {[
                  { color: '#FFC183', label: '#FFC183' },
                  { color: '#8F7458', label: '#8F7458' },
                  { color: '#D4C5A9', label: '#D4C5A9' },
                  { color: '#4A4560', label: '#4A4560' },
                  { color: '#C04040', label: 'danger'  },
                  { color: '#40A055', label: 'success' },
                ].map(c => (
                  <div key={c.color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Pictogram icon={ShieldIcon} size="md" color={c.color} />
                    <span style={{ ...nano, fontSize: '0.4375rem' }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={subLabel}>Dostupné ikony</p>
              <div style={{ display: 'flex', gap: 20 }}>
                {ICONS.map(({ icon, label, note }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Pictogram icon={icon} size="lg" color="#8F7458" />
                    <span style={{ ...nano, color: '#D4C5A9' }}>{label}</span>
                    <span style={{ fontSize: '0.4375rem', color: '#4A4560' }}>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Preview>
        <Preview label="Použití">
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.7, background: '#0F0E1A', padding: '16px 20px', borderRadius: 4 }}>
{`import Pictogram from 'src/lib/tkajui/Pictogram'
import { SwordIcon } from 'src/lib/donjon/icons'

<Pictogram icon={SwordIcon} size="lg" color="#FFC183" />`}
          </pre>
        </Preview>
      </Section>
    </>
  )
}

/* ── donjon-fall-ui obsah ── */
function DonjonContent() {
  return (
    <>
      <Section
        id="donjon-variants"
        title="Varianty"
        description="Herní varianta — tmavé oktagonální pozadí, barevná schémata podle variant. Volitelný bare mód."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <p style={subLabel}>Varianty — variant prop (s pozadím)</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {VARIANTS.map(v => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={SwordIcon} size="lg" variant={v} />
                    <span style={{ ...nano, fontSize: '0.4375rem' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={subLabel}>bare — jen ikona s herní barvou, bez pozadí</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {VARIANTS.map(v => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={ShieldIcon} size="lg" variant={v} bare />
                    <span style={{ ...nano, fontSize: '0.4375rem' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={subLabel}>Velikosti — size prop</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
                {SIZES.map(s => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={TowerIcon} size={s} variant="active" />
                    <span style={nano}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={subLabel}>Herní ikony × active variant</p>
              <div style={{ display: 'flex', gap: 20 }}>
                {ICONS.map(({ icon, label, note }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={icon} size="xl" variant="active" />
                    <span style={{ ...nano, color: '#D4C5A9' }}>{label}</span>
                    <span style={{ fontSize: '0.4375rem', color: '#4A4560' }}>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Preview>
        <Preview label="Použití">
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.7, background: '#0F0E1A', padding: '16px 20px', borderRadius: 4 }}>
{`import DonjonPictogram from 'src/lib/donjon/DonjonPictogram'
import { SwordIcon } from 'src/lib/donjon/icons'

// S herním pozadím (oktagonální clip)
<DonjonPictogram icon={SwordIcon} size="lg" variant="active" />

// Jen barevná ikona, bez pozadí
<DonjonPictogram icon={SwordIcon} size="md" variant="passive" bare />`}
          </pre>
        </Preview>
      </Section>
    </>
  )
}

/* ── Přepínač obsahu ── */
function PictogramContent() {
  const lib = useLibVariant()
  return lib === 'tkajui' ? <TkajuiContent /> : <DonjonContent />
}

/* ── Page ── */
export default function PictogramsPage() {
  return (
    <ShowcasePage
      title="Pictograms"
      description="Ikonový systém — TkajUI definuje generický wrapper (Pictogram), donjon-fall-ui přepisuje vizuální styl (DonjonPictogram) a dodává herní ikony."
      componentSlugs={['pictogram', 'donjon-pictogram']}
      variants={[
        { id: 'donjon', label: 'donjon-fall-ui' },
        { id: 'tkajui', label: 'TkajUI' },
      ]}
    >
      <PictogramContent />
    </ShowcasePage>
  )
}
