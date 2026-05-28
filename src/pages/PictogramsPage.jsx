import { ShowcasePage, Section, Preview, CodeBlock, useLibVariant } from '../styleguide/ShowcasePage'
import { textFaint, textParchment, gold, goldDim, successColor, failColor } from '../lib/donjon/tokens'
import Pictogram from '../lib/tkajui/Pictogram'
import DonjonPictogram from '../lib/donjon/DonjonPictogram'
import {
  SwordIcon, ShieldIcon, TowerIcon,
  HeartIcon, DropIcon, BoltIcon,
  MoveIcon, TargetIcon, MagicIcon,
  StarIcon, CrownIcon, DiceIcon, HourglassIcon,
} from '../lib/donjon/icons'

const ICON_GROUPS = [
  {
    label: 'Zdroje (Resources)',
    icons: [
      { icon: HeartIcon,  label: 'HeartIcon',  note: 'HP / zdraví' },
      { icon: DropIcon,   label: 'DropIcon',   note: 'Mana / magická energie' },
      { icon: BoltIcon,   label: 'BoltIcon',   note: 'Stamina / energie akce' },
    ],
  },
  {
    label: 'Akce (Actions)',
    icons: [
      { icon: SwordIcon,  label: 'SwordIcon',  note: 'Útok / souboj' },
      { icon: ShieldIcon, label: 'ShieldIcon', note: 'Obrana / základna hráče' },
      { icon: MoveIcon,   label: 'MoveIcon',   note: 'Pohyb / přesun kostky' },
      { icon: TargetIcon, label: 'TargetIcon', note: 'Cíl / dosah útoku' },
      { icon: MagicIcon,  label: 'MagicIcon',  note: 'Magie / speciální schopnost' },
    ],
  },
  {
    label: 'Herní stav (Game State)',
    icons: [
      { icon: StarIcon,        label: 'StarIcon',        note: 'Vítězné body (VP)' },
      { icon: CrownIcon,       label: 'CrownIcon',       note: 'Vítěz / lídr skóre' },
      { icon: DiceIcon,        label: 'DiceIcon',        note: 'Kostka / přehazování' },
      { icon: HourglassIcon,   label: 'HourglassIcon',   note: 'Konec tahu / čas' },
      { icon: TowerIcon,       label: 'TowerIcon',       note: 'Věž / donjon' },
    ],
  },
]

// Flat list for size/variant demos — use first icon from each group
const SIZES    = ['sm', 'md', 'lg', 'xl']
const VARIANTS = ['active', 'passive', 'disabled', 'danger', 'success']

const subLabel = {
  fontSize: '0.625rem', color: textFaint, fontWeight: 600,
  letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px',
}
const nano = { fontSize: '0.5rem', color: textFaint, fontFamily: 'monospace' }

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
                    <Pictogram icon={SwordIcon} size={s} color={goldDim} />
                    <span style={nano}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={subLabel}>Barva — color prop (nebo CSS currentColor)</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {[
                  { color: gold, label: gold },
                  { color: goldDim, label: goldDim },
                  { color: textParchment, label: textParchment },
                  { color: textFaint, label: textFaint },
                  { color: failColor, label: 'danger'  },
                  { color: successColor, label: 'success' },
                ].map(c => (
                  <div key={c.color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Pictogram icon={ShieldIcon} size="md" color={c.color} />
                    <span style={{ ...nano, fontSize: '0.4375rem' }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={subLabel}>Dostupné ikony — 13 herních ikon ve 3 kategoriích</p>
              {ICON_GROUPS.map(group => (
                <div key={group.label} style={{ marginBottom: 20 }}>
                  <p style={{ ...nano, color: goldDim, marginBottom: 10, fontSize: '0.5rem' }}>{group.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {group.icons.map(({ icon, label, note }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, minWidth: 60 }}>
                        <Pictogram icon={icon} size="lg" color={goldDim} />
                        <span style={{ ...nano, color: textParchment, fontSize: '0.4375rem', textAlign: 'center' }}>{label}</span>
                        <span style={{ fontSize: '0.375rem', color: textFaint, textAlign: 'center', lineHeight: 1.3 }}>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Preview>
        <Preview label="Použití">
          <CodeBlock code={`import Pictogram from 'src/lib/tkajui/Pictogram'
import { SwordIcon } from 'src/lib/donjon/icons'

<Pictogram icon={SwordIcon} size="lg" color={gold} />`} />
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
              <p style={subLabel}>Default — jen ikona s herní barvou (bare=true)</p>
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
              <p style={subLabel}>bare={'{false}'} — s oktagonálním pozadím a rámečkem</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {VARIANTS.map(v => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <DonjonPictogram icon={ShieldIcon} size="lg" variant={v} bare={false} />
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
              <p style={subLabel}>Všechny herní ikony — 13 ikon ve 3 kategoriích</p>
              {ICON_GROUPS.map(group => (
                <div key={group.label} style={{ marginBottom: 24 }}>
                  <p style={{ ...nano, color: goldDim, marginBottom: 12, fontSize: '0.5rem' }}>{group.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                    {group.icons.map(({ icon, label, note }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, minWidth: 64 }}>
                        <DonjonPictogram icon={icon} size="lg" variant="active" />
                        <span style={{ ...nano, color: textParchment, fontSize: '0.4375rem', textAlign: 'center' }}>{label}</span>
                        <span style={{ fontSize: '0.375rem', color: textFaint, textAlign: 'center', lineHeight: 1.3 }}>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Preview>
        <Preview label="Použití">
          <CodeBlock code={`import DonjonPictogram from 'src/lib/donjon/DonjonPictogram'
import { SwordIcon } from 'src/lib/donjon/icons'

// Default — jen barevná ikona, bez pozadí (bare=true)
<DonjonPictogram icon={SwordIcon} size="lg" variant="active" />

// S oktagonálním pozadím a rámečkem
<DonjonPictogram icon={SwordIcon} size="md" variant="active" bare={false} />`} />
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

      {/* Raw SVG icons — width/height props */}
      <Section
        id="raw-icons"
        title="Raw ikony — width a height"
        description="Ikony z `donjon/icons` jsou čisté SVG komponenty. Lze je použít přímo s `width` a `height` props, nebo přes Pictogram/DonjonPictogram wrapper (doporučeno)."
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: gold }}>
          <SwordIcon width={16} height={16} />
          <SwordIcon width={24} height={24} />
          <SwordIcon width={32} height={32} />
          <SwordIcon width={48} height={48} />
        </div>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={`import { SwordIcon } from 'donjon-fall-ui'

<SwordIcon width={24} height={24} />        {/* default — 24×24 */}
<SwordIcon width={48} height={48} />        {/* HUD/title screen */}

{/* Doporučeno: Pictogram wrapper pro konzistentní velikosti */}
      <DonjonPictogram icon={SwordIcon} size="lg" />`} />
        </div>
      </Section>

      <Section id="pravidla" title="Pravidla použití">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Piktogram vždy doplň textem (label nebo tooltip) — ikonový jazyk sám o sobě nestačí pro nové hráče.</p>
          <p>✓ Konzistentní mapování: stejná akce vždy stejný piktogram — nikdy neměň ikonu pro stejnou akci.</p>
          <p>✓ Varianta piktogramu musí odpovídat sémantice akce (danger pro destruktivní, success pro pozitivní).</p>
          <p>✓ Pro klávesové zkratky a HUD použij size="sm" nebo "xs" — větší ikony v herní ploše jsou rušivé.</p>
          <p>✗ Nepoužívej piktogram bez aria-label nebo viditelného textu v interaktivních prvcích.</p>
          <p>✗ Nepřidávej nové piktogramy bez záznamu v systému — nekonzistentní iconografie matou hráče.</p>
        </div>
      </Section>
    </ShowcasePage>
  )
}
