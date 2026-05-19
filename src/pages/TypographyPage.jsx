import { useLibVariant, ShowcasePage, Section, CodeBlock } from '../styleguide/ShowcasePage'

const inter     = '"Inter", sans-serif'
const cormorant = '"Cormorant Garamond", serif'

/* ── TkajUI typografie ─────────────────────────────────────────────────── */

function TkajuiTypeScale() {
  const scale = [
    { label: 'Display',   size: '3rem',    weight: 700, tracking: '-0.03em', sample: '2 048',               role: 'Statistiky, velká čísla',     note: '48px / 700' },
    { label: 'Heading 1', size: '2rem',    weight: 700, tracking: '-0.02em', sample: 'Přehled projektů',     role: 'Stránkový nadpis',            note: '32px / 700' },
    { label: 'Heading 2', size: '1.5rem',  weight: 600, tracking: '-0.01em', sample: 'Aktivní komponenty',   role: 'Sekce, panel title',          note: '24px / 600' },
    { label: 'Heading 3', size: '1.125rem',weight: 600, tracking: '0',       sample: 'Nastavení účtu',       role: 'Karta, dialog heading',       note: '18px / 600' },
    { label: 'Body lg',   size: '1rem',    weight: 400, tracking: '0',       sample: 'Edituj komponenty a sleduj změny v reálném čase.', role: 'Hlavní tělo textu', note: '16px / 400' },
    { label: 'Body',      size: '0.875rem',weight: 400, tracking: '0',       sample: 'Popis pole, nápověda a doplňující kontext k hodnotě.', role: 'Popisky, hints', note: '14px / 400' },
    { label: 'Label',     size: '0.75rem', weight: 500, tracking: '0',       sample: 'Název pole',           role: 'Form label, sub-label',       note: '12px / 500' },
    { label: 'Small',     size: '0.6875rem',weight: 400,tracking: '0',       sample: 'Naposledy upraveno včera',role: 'Meta, caption, timestamp', note: '11px / 400' },
  ]

  return (
    <div style={{ background: '#0d0d14', borderRadius: 8, border: '1px solid #35354a', overflow: 'hidden' }}>
      {scale.map((r, i) => (
        <div
          key={r.label}
          style={{
            display: 'grid',
            gridTemplateColumns: '90px 1fr auto',
            gap: 12,
            alignItems: 'center',
            padding: '14px 20px',
            borderBottom: i < scale.length - 1 ? '1px solid #1b1b27' : 'none',
          }}
        >
          <span style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#35354a', fontFamily: inter }}>
            {r.label}
          </span>
          <p style={{
            margin: 0,
            fontFamily: inter,
            fontSize: r.size,
            fontWeight: r.weight,
            letterSpacing: r.tracking,
            color: '#eeeef8',
            lineHeight: 1.2,
          }}>
            {r.sample}
          </p>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#4c4c68', fontFamily: inter }}>{r.role}</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.5625rem', color: '#35354a', fontFamily: inter, fontStyle: 'italic' }}>{r.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TkajuiWeightScale() {
  return (
    <div style={{ background: '#13131c', borderRadius: 8, border: '1px solid #35354a', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#35354a', fontFamily: inter }}>
        Inter — přehled vah
      </p>
      {[
        { weight: 400, label: 'Regular', usage: 'Tělo textu, popisky, nápověda' },
        { weight: 500, label: 'Medium',  usage: 'Labely, sub-headings, zvýraznění' },
        { weight: 600, label: 'SemiBold',usage: 'Nadpisy karet, sekční tituly' },
        { weight: 700, label: 'Bold',    usage: 'Stránkové nadpisy, display čísla' },
      ].map(r => (
        <div key={r.weight} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 16, alignItems: 'baseline' }}>
          <span style={{ fontSize: '0.625rem', color: '#4c4c68', fontFamily: inter }}>{r.weight} — {r.label}</span>
          <p style={{ margin: 0, fontFamily: inter, fontSize: '1.25rem', fontWeight: r.weight, color: '#eeeef8', letterSpacing: '-0.01em' }}>
            Přehled komponent
          </p>
          <p style={{ margin: 0, fontSize: '0.6875rem', color: '#4c4c68', fontFamily: inter }}>{r.usage}</p>
        </div>
      ))}
    </div>
  )
}

function TkajuiKontext() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>

      {/* Karta */}
      <div style={{ background: '#1b1b27', border: '1px solid #35354a', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ background: '#232332', borderBottom: '1px solid #35354a', padding: '12px 16px' }}>
          <p style={{ margin: 0, fontFamily: inter, fontSize: '0.875rem', fontWeight: 600, color: '#eeeef8', letterSpacing: '-0.01em' }}>
            Nastavení účtu
          </p>
          <p style={{ margin: '2px 0 0', fontFamily: inter, fontSize: '0.75rem', color: '#4c4c68' }}>Profil a zabezpečení</p>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Jméno', value: 'Jan Novák' },
            { label: 'E-mail', value: 'jan@novak.cz' },
          ].map(f => (
            <div key={f.label}>
              <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.75rem', fontWeight: 500, color: '#8888a8' }}>{f.label}</p>
              <p style={{ margin: 0, fontFamily: inter, fontSize: '0.875rem', color: '#eeeef8' }}>{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiky */}
      <div style={{ background: '#1b1b27', border: '1px solid #35354a', borderRadius: 8, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', fontWeight: 500, color: '#8888a8' }}>
          Celkem komponent
        </p>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#6576ff', lineHeight: 1 }}>
          247
        </p>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#4c4c68' }}>
          ↑ 12 přidáno tento měsíc
        </p>
      </div>

      {/* Alert */}
      <div style={{ background: '#071424', border: '1px solid #4fa3f544', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 10 }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #4fa3f5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
          <span style={{ fontSize: '0.5rem', color: '#4fa3f5', fontWeight: 700 }}>i</span>
        </div>
        <div>
          <p style={{ margin: '0 0 3px', fontFamily: inter, fontSize: '0.8125rem', fontWeight: 600, color: '#93c5fd' }}>
            Nová verze dostupná
          </p>
          <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#8888a8', lineHeight: 1.4 }}>
            Aktualizace přináší opravy a nové komponenty.
          </p>
        </div>
      </div>

    </div>
  )
}

function TkajuiContent() {
  return (
    <>
      <Section title="Rodina fontů">
        <div style={{ background: '#1b1b27', border: '1px solid #35354a', borderRadius: 8, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6576ff' }}>Jediný font</p>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '2rem', fontWeight: 700, color: '#eeeef8', letterSpacing: '-0.02em' }}>Inter</p>
          </div>
          <p style={{ margin: 0, fontFamily: inter, fontSize: '0.875rem', color: '#8888a8', lineHeight: 1.6 }}>
            Čistý sans-serif pro vše — nadpisy, tělo, labely, kód. Kontrast skrze váhu (400 → 700) a velikost,
            ne skrze druhý display font. Žádné serifové ornamenty, žádná středověká stylizace.
          </p>
          <div style={{ display: 'flex', gap: 16, paddingTop: 4, borderTop: '1px solid #35354a' }}>
            {[400, 500, 600, 700].map(w => (
              <div key={w}>
                <p style={{ margin: '0 0 3px', fontFamily: inter, fontSize: '0.5625rem', color: '#35354a' }}>{w}</p>
                <p style={{ margin: 0, fontFamily: inter, fontWeight: w, fontSize: '1.25rem', color: '#eeeef8', letterSpacing: '-0.01em' }}>Aa</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="tkajui-skala"
        title="Typografická škála"
        description="Osmistupňová škála řízená váhou a velikostí. Tracking záporný nebo nulový — moderní sans-serif rytmus."
      >
        <TkajuiTypeScale />
      </Section>

      <Section
        id="tkajui-vahy"
        title="Váhy v praxi"
        description="Čtyři váhy dělají veškerou hierarchii — bez uppercase, bez dekorativních font-family."
      >
        <TkajuiWeightScale />
      </Section>

      <Section
        id="tkajui-kontext"
        title="Typografie v kontextu"
        description="Ukázky v reálných UI situacích — karta, statistika, alert."
      >
        <TkajuiKontext />
      </Section>

      <Section id="tkajui-pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Jediný font: Inter ve všech situacích — žádný display/serif font.</p>
          <p>✓ Hierarchie váhou: 700 (nadpisy) → 600 (sekce) → 500 (labely) → 400 (tělo).</p>
          <p>✓ Tracking: záporný pro velká písma (−0.02em až −0.03em), nulový pro text. Nikdy kladný tracking pro "atmosféru".</p>
          <p>✓ Labely nejsou uppercase — rozlišuje je velikost + váha, ne textTransform.</p>
          <p>✓ Accent barva (<code className="text-neutral-300">#6576ff</code>) pro interaktivní text a zvýrazněná čísla.</p>
          <p>✗ Žádný Cormorant Garamond — patří výhradně do donjon-fall-ui.</p>
          <p>✗ Žádný uppercase + heavy letter-spacing — to je donjon stylizace, ne obecná UI knihovna.</p>
        </div>
      </Section>
    </>
  )
}

/* ── donjon typografie ─────────────────────────────────────────────────── */

const goldGrad = {
  background: 'linear-gradient(180deg,#FFC183 0%,#8F7458 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function DonjonRodiny() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div style={{ background: 'linear-gradient(150deg,#1E1C30 0%,#141324 100%)', border: '1px solid #353751', borderRadius: 4, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFC183' }}>Display</p>
          <p style={{ margin: 0, fontFamily: cormorant, fontSize: '1.5rem', fontWeight: 700, color: '#E8DDD0', letterSpacing: '0.04em' }}>Cormorant Garamond</p>
        </div>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82', lineHeight: 1.6 }}>
          Jednoslovné nadpisy, výsledkové obrazovky, titulky dialogů. Vždy uppercase, vždy gold gradient. Nikdy pro tělo ani labely.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          {[400, 600, 700].map(w => (
            <div key={w}>
              <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.5625rem', color: '#3A3A52' }}>{w}</p>
              <p style={{ margin: 0, fontFamily: cormorant, fontWeight: w, fontSize: '1.125rem', letterSpacing: '0.04em', textTransform: 'uppercase', ...goldGrad }}>Donjon</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'linear-gradient(150deg,#1E1C30 0%,#141324 100%)', border: '1px solid #353751', borderRadius: 4, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B6A82' }}>UI & Tělo</p>
          <p style={{ margin: 0, fontFamily: inter, fontSize: '1.5rem', fontWeight: 700, color: '#E8DDD0', letterSpacing: '-0.01em' }}>Inter</p>
        </div>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82', lineHeight: 1.6 }}>
          Vše ostatní — labely, tlačítka, popisky, tělo textu, herní informace. Uppercase + letter-spacing vytváří herní charakter.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          {[400, 500, 600, 700].map(w => (
            <div key={w}>
              <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.5625rem', color: '#3A3A52' }}>{w}</p>
              <p style={{ margin: 0, fontFamily: inter, fontWeight: w, fontSize: '1rem', color: '#B8956A' }}>Aa</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DonjonDisplaySkala() {
  return (
    <div style={{ background: '#0F0E1A', borderRadius: 4, border: '1px solid #1E1C30', padding: '0 24px' }}>
      {[
        { size: '3.5rem',  weight: 700, sample: 'Vítězí',           role: 'Výsledek hry',   note: 'Výsledková obrazovka' },
        { size: '2.5rem',  weight: 700, sample: 'Donjon Fall',      role: 'Název hry',      note: 'Titulní obrazovka' },
        { size: '1.75rem', weight: 700, sample: 'Souboj zahájen',   role: 'Dialog heading', note: 'Herní momenty' },
        { size: '1.25rem', weight: 700, sample: 'Ohnisko obsazeno', role: 'Titulek karty',  note: 'DonjonCard title' },
      ].map(r => (
        <div key={r.size} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #1E1C30' }}>
          <p style={{ margin: 0, fontFamily: cormorant, fontSize: r.size, fontWeight: r.weight, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.15, ...goldGrad }}>
            {r.sample}
          </p>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#6B6A82', fontFamily: inter }}>{r.role}</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#3A3A52', fontFamily: inter }}>{r.note}</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#3A3A52', fontFamily: inter, fontStyle: 'italic' }}>{r.size} / {r.weight}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function DonjonUISkala() {
  return (
    <div style={{ background: '#0F0E1A', borderRadius: 4, border: '1px solid #1E1C30', padding: '0 24px' }}>
      {[
        { size: '0.6875rem', weight: 700, tracking: '0.14em', transform: 'uppercase', sample: 'Extra Small Button',                   role: 'Tlačítka, labely',   note: '11px uppercase' },
        { size: '0.75rem',   weight: 400, tracking: '0',      transform: 'none',      sample: 'Popis karty a nápověda k poli',         role: 'Popisky, hints',     note: '12px regular' },
        { size: '0.8125rem', weight: 600, tracking: '0.1em',  transform: 'uppercase', sample: 'Medium Button',                         role: 'Tlačítka md, nav',   note: '13px uppercase' },
        { size: '0.875rem',  weight: 400, tracking: '0',      transform: 'none',      sample: 'Herní informace a stav tahu',           role: 'UI text',            note: '14px regular' },
        { size: '1rem',      weight: 400, tracking: '0',      transform: 'none',      sample: 'Tělo textu a pravidla hry',             role: 'Body',               note: '16px regular' },
        { size: '1.25rem',   weight: 700, tracking: '-0.01em',transform: 'none',      sample: 'Nadpis sekce',                          role: 'Section heading',    note: '20px bold' },
      ].map(r => (
        <div key={r.size + r.weight} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'end', padding: '14px 0', borderBottom: '1px solid #1E1C30' }}>
          <p style={{ margin: 0, fontFamily: inter, fontSize: r.size, fontWeight: r.weight, letterSpacing: r.tracking, textTransform: r.transform, color: '#E8DDD0', lineHeight: 1.2 }}>
            {r.sample}
          </p>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#6B6A82', fontFamily: inter }}>{r.role}</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#3A3A52', fontFamily: inter, fontStyle: 'italic' }}>{r.size} / {r.weight}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function DonjonKontext() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>

      <div style={{ background: 'linear-gradient(150deg,#252340 0%,#1A1830 100%)', border: '1px solid #FFC18344', borderRadius: 4, padding: '28px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A52' }}>Výsledková obrazovka</p>
        <p style={{ margin: '8px 0 0', fontFamily: cormorant, fontSize: '2.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.1, ...goldGrad }}>Červený vítězí</p>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.8125rem', color: '#6B6A82' }}>5 vítězných bodů · 8 min 34 s</p>
      </div>

      <div style={{ background: 'linear-gradient(150deg,#353751 0%,#2A2948 70%)', border: '1px solid #8F7458', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)', borderBottom: '1px solid #8F745844', padding: '12px 20px' }}>
          <p style={{ margin: 0, fontFamily: cormorant, fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', ...goldGrad }}>Souboj na poli D4</p>
          <p style={{ margin: '4px 0 0', fontFamily: inter, fontSize: '0.6875rem', color: '#8F7458' }}>Červený útočí · Modrý brání</p>
        </div>
        <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Útočník', 'Síla 3'], ['Obránce', 'Síla 2']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82' }}>{k}</p>
              <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', fontWeight: 600, color: '#F0E6D3' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#1A1928', border: '1px solid #8F7458', borderRadius: 4, padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A52' }}>Herní dialog</p>
        <p style={{ margin: 0, fontFamily: cormorant, fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2, ...goldGrad }}>Přehodit kostku?</p>
        <p style={{ margin: 0, fontFamily: inter, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.5 }}>
          Vzdáš se aktuální pozice a přehodíš kostku.
        </p>
      </div>

    </div>
  )
}

function DonjonContent() {
  return (
    <>
      <Section title="Rodiny fontů">
        <DonjonRodiny />
      </Section>

      <Section
        id="donjon-display"
        title="Display škála — Cormorant Garamond"
        description="Pro velké dramatické momenty. Vždy uppercase, vždy gold gradient."
      >
        <DonjonDisplaySkala />
      </Section>

      <Section
        id="donjon-ui"
        title="UI škála — Inter"
        description="Uppercase + letter-spacing vytváří herní charakter bez změny fontu."
      >
        <DonjonUISkala />
      </Section>

      <Section id="donjon-kontext" title="Typografie v kontextu">
        <DonjonKontext />
      </Section>

      <Section id="donjon-pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Cormorant Garamond: vždy uppercase, vždy gold gradient, max 3–4 slova, jen pro dramatické herní momenty.</p>
          <p>✓ Inter: vše ostatní — UI, tělo, labely, errory. Uppercase + tracking = herní atmosféra.</p>
          <p>✗ Nikdy Cormorant v lowercase — ztrácí charakter.</p>
          <p>✗ Nikdy Cormorant pro tělo textu, labely nebo chybové zprávy.</p>
        </div>
      </Section>
    </>
  )
}

/* ── Router ────────────────────────────────────────────────────────────── */

function TypographyContent() {
  const lib = useLibVariant()
  return lib === 'donjon' ? <DonjonContent /> : <TkajuiContent />
}

export default function TypographyPage() {
  return (
    <ShowcasePage
      title="Typography"
      description="Každá knihovna má vlastní typografický systém — TkajUI čistý sans-serif, donjon-fall-ui dramatický serif + Inter."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <TypographyContent />
    </ShowcasePage>
  )
}
