import { ShowcasePage, Section, Preview } from '../components/layout/ShowcasePage'
import Pictogram from '../lib/tkajui/Pictogram'
import DonjonPictogram from '../lib/donjon/Pictogram'
import { SwordIcon, ShieldIcon, TowerIcon } from '../lib/donjon/icons'

const ICONS = [
  { icon: SwordIcon,  label: 'SwordIcon',  note: 'Útok / souboj' },
  { icon: ShieldIcon, label: 'ShieldIcon', note: 'Obrana / základna' },
  { icon: TowerIcon,  label: 'TowerIcon',  note: 'Donjon / pevnost' },
]

const SIZES   = ['sm', 'md', 'lg', 'xl']
const VARIANTS = ['active', 'passive', 'disabled', 'danger', 'success']

export default function PictogramsPage() {
  return (
    <ShowcasePage
      title="Pictograms"
      description="Ikonový systém — dvě úrovně: TkajUI definuje generický wrapper (Pictogram), donjon-fall-ui přepisuje vizuální styl (DonjonPictogram) a dodává herní ikony."
    >

      {/* ── TkajUI Pictogram ── */}
      <Section
        id="tkajui"
        title="TkajUI — Pictogram"
        description="Generický wrapper. Přijme libovolnou SVG komponentu, vykreslí ji ve správné velikosti. Bez pozadí, bez dekorace — barva přes prop color nebo CSS currentColor."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Velikosti */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Velikosti — size prop
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
                {SIZES.map(s => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <Pictogram icon={SwordIcon} size={s} color="#8F7458" />
                    <span style={{ fontSize: '0.5rem', color: '#4A4560', fontFamily: 'monospace' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Barva přes prop */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Barva — color prop (nebo CSS currentColor)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {[
                  { color: '#FFC183', label: '#FFC183' },
                  { color: '#8F7458', label: '#8F7458' },
                  { color: '#D4C5A9', label: '#D4C5A9' },
                  { color: '#4A4560', label: '#4A4560' },
                  { color: '#C04040', label: 'danger' },
                  { color: '#40A055', label: 'success' },
                ].map(c => (
                  <div key={c.color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Pictogram icon={ShieldIcon} size="md" color={c.color} />
                    <span style={{ fontSize: '0.4375rem', color: '#4A4560', fontFamily: 'monospace' }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Všechny ikony */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Dostupné ikony
              </p>
              <div style={{ display: 'flex', gap: 20 }}>
                {ICONS.map(({ icon, label, note }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Pictogram icon={icon} size="lg" color="#8F7458" />
                    <span style={{ fontSize: '0.5rem', color: '#D4C5A9', fontFamily: 'monospace' }}>{label}</span>
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

      {/* ── donjon-fall-ui DonjonPictogram ── */}
      <Section
        id="donjon"
        title="donjon-fall-ui — DonjonPictogram"
        description="Herní varianta. Přepisuje vizuální styl: tmavé oktagonální pozadí, zlatá / fantasy barevná schémata podle variant. Volitelný bare mód (jen ikona s herní barvou, bez bg)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Varianty */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Varianty — variant prop (s pozadím)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {VARIANTS.map(v => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={SwordIcon} size="lg" variant={v} />
                    <span style={{ fontSize: '0.4375rem', color: '#4A4560', fontFamily: 'monospace' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bare mód */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                bare — jen ikona s herní barvou, bez pozadí
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {VARIANTS.map(v => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={ShieldIcon} size="lg" variant={v} bare />
                    <span style={{ fontSize: '0.4375rem', color: '#4A4560', fontFamily: 'monospace' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Velikosti */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Velikosti — size prop
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
                {SIZES.map(s => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={TowerIcon} size={s} variant="active" />
                    <span style={{ fontSize: '0.5rem', color: '#4A4560', fontFamily: 'monospace' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Všechny ikony × active */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Herní ikony × active variant
              </p>
              <div style={{ display: 'flex', gap: 20 }}>
                {ICONS.map(({ icon, label, note }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={icon} size="xl" variant="active" />
                    <span style={{ fontSize: '0.5rem', color: '#D4C5A9', fontFamily: 'monospace' }}>{label}</span>
                    <span style={{ fontSize: '0.4375rem', color: '#4A4560' }}>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Preview>

        <Preview label="Použití">
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.7, background: '#0F0E1A', padding: '16px 20px', borderRadius: 4 }}>
{`import DonjonPictogram from 'src/lib/donjon/Pictogram'
import { SwordIcon } from 'src/lib/donjon/icons'

// S herním pozadím (oktagonální clip)
<DonjonPictogram icon={SwordIcon} size="lg" variant="active" />

// Jen barevná ikona, bez pozadí
<DonjonPictogram icon={SwordIcon} size="md" variant="passive" bare />`}
          </pre>
        </Preview>
      </Section>

      {/* ── Srovnání ── */}
      <Section
        id="srovnani"
        title="Srovnání TkajUI vs donjon-fall-ui"
        description="Stejná ikona, stejná velikost — výchozí neutrální styl vs herní estetika s pozadím."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>TkajUI</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {ICONS.map(({ icon, label }) => (
                  <Pictogram key={label} icon={icon} size="xl" color="#8F7458" />
                ))}
              </div>
              <p style={{ margin: 0, fontSize: '0.5rem', color: '#3A3858' }}>color="currentColor" — žádné pozadí</p>
            </div>
            <div style={{ width: 1, background: '#2A2948', alignSelf: 'stretch' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', color: '#4A4560', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>donjon-fall-ui</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {ICONS.map(({ icon, label }) => (
                  <DonjonPictogram key={label} icon={icon} size="xl" variant="active" />
                ))}
              </div>
              <p style={{ margin: 0, fontSize: '0.5rem', color: '#3A3858' }}>variant="active" — tmavé pozadí, glow, oktagon</p>
            </div>
          </div>
        </Preview>
      </Section>

    </ShowcasePage>
  )
}
