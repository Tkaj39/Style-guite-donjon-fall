import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

const inter     = '"Inter", sans-serif'
const cormorant = '"Cormorant Garamond", serif'

const goldGrad = {
  background: 'linear-gradient(180deg,#FFC183 0%,#8F7458 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function Label({ children }) {
  return (
    <p style={{
      margin: 0,
      fontFamily: inter,
      fontSize: '0.625rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#3A3A52',
    }}>
      {children}
    </p>
  )
}

function TypeRow({ sample, font, size, weight, tracking, transform, role, note }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 16,
      alignItems: 'end',
      padding: '14px 0',
      borderBottom: '1px solid #1E1C30',
    }}>
      <p style={{
        margin: 0,
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: tracking,
        textTransform: transform,
        color: '#E8DDD0',
        lineHeight: 1.2,
      }}>
        {sample}
      </p>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <p style={{ margin: 0, fontSize: '0.6875rem', color: '#6B6A82', fontFamily: inter }}>{role}</p>
        {note && <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#3A3A52', fontFamily: inter }}>{note}</p>}
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#3A3A52', fontFamily: inter, fontStyle: 'italic' }}>{size} / {weight}</p>
      </div>
    </div>
  )
}

export default function TypographyPage() {
  return (
    <ShowcasePage
      title="Typography"
      description="Dva fonty, jasné role — Cormorant Garamond pro dramatické momenty, Inter pro vše ostatní."
    >

      {/* Rodiny fontů */}
      <Section title="Rodiny fontů">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

          {/* Cormorant */}
          <div style={{
            background: 'linear-gradient(150deg,#1E1C30 0%,#141324 100%)',
            border: '1px solid #353751',
            borderRadius: 2,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            <div>
              <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFC183' }}>Display</p>
              <p style={{ margin: 0, fontFamily: cormorant, fontSize: '1.5rem', fontWeight: 700, color: '#E8DDD0', letterSpacing: '0.04em' }}>Cormorant Garamond</p>
            </div>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82', lineHeight: 1.6 }}>
              Pro jednoslovné nadpisy, výsledkové obrazovky, titulky dialogů a velké dramatické momenty. Pouze velká písmena. Nikdy pro tělo ani labely.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[400, 600, 700].map(w => (
                <div key={w}>
                  <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.5625rem', color: '#3A3A52' }}>{w}</p>
                  <p style={{ margin: 0, fontFamily: cormorant, fontWeight: w, fontSize: '1.125rem', color: '#B8956A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Donjon</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inter */}
          <div style={{
            background: 'linear-gradient(150deg,#1E1C30 0%,#141324 100%)',
            border: '1px solid #353751',
            borderRadius: 2,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            <div>
              <p style={{ margin: '0 0 2px', fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B6A82' }}>UI & Tělo</p>
              <p style={{ margin: 0, fontFamily: inter, fontSize: '1.5rem', fontWeight: 700, color: '#E8DDD0', letterSpacing: '-0.01em' }}>Inter</p>
            </div>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82', lineHeight: 1.6 }}>
              Vše ostatní — labely, tlačítka, popisky, tělo textu, herní informace. Výborně čitelný i v nejmenších velikostech pod tlakem hry.
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
      </Section>

      {/* Display škála — Cormorant */}
      <Section
        title="Display škála — Cormorant Garamond"
        description="Pro velké dramatické momenty. Vždy uppercase, vždy gold gradient."
      >
        <div style={{ background: '#0F0E1A', borderRadius: 2, border: '1px solid #1E1C30', padding: '0 24px' }}>
          {[
            { size: '3.5rem',   weight: 700, sample: 'Vítězí',           role: 'Výsledek hry',     note: 'Výsledková obrazovka' },
            { size: '2.5rem',   weight: 700, sample: 'Donjon Fall',      role: 'Název hry',        note: 'Titulní obrazovka' },
            { size: '1.75rem',  weight: 700, sample: 'Souboj zahájen',   role: 'Dialog heading',   note: 'Herní momenty' },
            { size: '1.25rem',  weight: 700, sample: 'Ohnisko obsazeno', role: 'Titulek karty',    note: 'DonjonCard title' },
          ].map(r => (
            <div key={r.size} style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 16,
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: '1px solid #1E1C30',
            }}>
              <p style={{
                margin: 0,
                fontFamily: cormorant,
                fontSize: r.size,
                fontWeight: r.weight,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.15,
                ...goldGrad,
              }}>
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
      </Section>

      {/* UI škála — Inter */}
      <Section
        title="UI škála — Inter"
        description="Pevná škála velikostí používaných v komponentách. Uppercase + letter-spacing vytváří středověký charakter bez změny fontu."
      >
        <div style={{ background: '#0F0E1A', borderRadius: 2, border: '1px solid #1E1C30', padding: '0 24px' }}>
          {[
            { size: '0.6875rem', weight: 700, tracking: '0.14em', transform: 'uppercase', sample: 'Extra Small Button', role: 'Tlačítka, labely', note: '11px uppercase' },
            { size: '0.75rem',   weight: 400, tracking: '0',      transform: 'none',      sample: 'Popis karty a nápověda k poli', role: 'Popisky, hints', note: '12px regular' },
            { size: '0.8125rem', weight: 600, tracking: '0.1em',  transform: 'uppercase', sample: 'Medium Button',      role: 'Tlačítka md, nav', note: '13px uppercase' },
            { size: '0.875rem',  weight: 400, tracking: '0',      transform: 'none',      sample: 'Herní informace a stav tahu', role: 'UI text', note: '14px regular' },
            { size: '1rem',      weight: 400, tracking: '0',      transform: 'none',      sample: 'Tělo textu a pravidla hry', role: 'Body', note: '16px regular' },
            { size: '1.25rem',   weight: 700, tracking: '-0.01em',transform: 'none',      sample: 'Nadpis sekce',       role: 'Section heading', note: '20px bold' },
          ].map(r => (
            <TypeRow key={r.size + r.weight} font={inter} {...r} />
          ))}
        </div>
      </Section>

      {/* Kombinace v kontextu */}
      <Section
        title="Kombinace v kontextu"
        description="Jak oba fonty fungují společně v reálných herních situacích."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>

          {/* Victory */}
          <div style={{
            background: 'linear-gradient(150deg,#252340 0%,#1A1830 100%)',
            border: '1px solid #FFC18344',
            borderRadius: 2,
            padding: '28px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
          }}>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A52' }}>Výsledková obrazovka</p>
            <p style={{ margin: '8px 0 0', fontFamily: cormorant, fontSize: '2.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.1, ...goldGrad }}>
              Červený vítězí
            </p>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.8125rem', color: '#6B6A82' }}>5 vítězných bodů · 8 min 34 s</p>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#3A3A52' }}>12 tahů odehráno</p>
          </div>

          {/* Card */}
          <div style={{
            background: 'linear-gradient(150deg,#353751 0%,#2A2948 70%)',
            border: '1px solid #8F7458',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <div style={{ background: 'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)', borderBottom: '1px solid #8F745844', padding: '12px 20px' }}>
              <p style={{ margin: 0, fontFamily: cormorant, fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', ...goldGrad }}>Souboj na poli D4</p>
              <p style={{ margin: '4px 0 0', fontFamily: inter, fontSize: '0.6875rem', color: '#8F7458' }}>Červený útočí · Modrý brání</p>
            </div>
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82' }}>Útočník</p>
                <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', fontWeight: 600, color: '#F0E6D3' }}>Síla 3</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82' }}>Obránce</p>
                <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', fontWeight: 600, color: '#F0E6D3' }}>Síla 2</p>
              </div>
            </div>
          </div>

          {/* Dialog */}
          <div style={{
            background: '#1A1928',
            border: '1px solid #8F7458',
            borderRadius: 2,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A52' }}>Herní dialog</p>
            <p style={{ margin: 0, fontFamily: cormorant, fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2, ...goldGrad }}>
              Přehodit kostku?
            </p>
            <p style={{ margin: 0, fontFamily: inter, fontSize: '0.8125rem', color: '#8F7458', lineHeight: 1.5 }}>
              Vzdáš se aktuální pozice a přehodíš kostku. Nová hodnota může být nižší.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {['Přehodit', 'Zůstat'].map((l, i) => (
                <div key={l} style={{
                  flex: 1,
                  padding: '8px',
                  textAlign: 'center',
                  border: `1px solid ${i === 0 ? '#8F7458' : '#353751'}`,
                  borderRadius: 1,
                  fontFamily: inter,
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: i === 0 ? '#B8956A' : '#3A3A52',
                }}>
                  {l}
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

    </ShowcasePage>
  )
}
