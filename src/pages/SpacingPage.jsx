import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

const inter = '"Inter", sans-serif'

const scale = [
  { token: '1',  px: 4,   usage: 'Border offsets, drobné mezery' },
  { token: '2',  px: 8,   usage: 'Gap uvnitř badge, icon padding' },
  { token: '3',  px: 12,  usage: 'Padding badge, gap v button' },
  { token: '4',  px: 16,  usage: 'Základní gap, card body padding vertikální' },
  { token: '5',  px: 20,  usage: 'Card header padding horizontální' },
  { token: '6',  px: 24,  usage: 'Card body padding horizontální, ornament offset' },
  { token: '7',  px: 28,  usage: 'Card footer padding horizontální' },
  { token: '8',  px: 32,  usage: 'Dialog padding, section gap' },
  { token: '10', px: 40,  usage: 'Card header padding horizontální (lg)' },
  { token: '12', px: 48,  usage: 'Sekce mezery na stránce' },
  { token: '16', px: 64,  usage: 'Velké mezery mezi sekcemi' },
]

export default function SpacingPage() {
  return (
    <ShowcasePage
      title="Spacing"
      description="Škála postavená na základní jednotce 4px. Všechny mezery, padding a gap v komponentách jsou násobky této hodnoty."
    >
      <Section
        title="Škála"
        description="Token odpovídá Tailwind konvenci (space-1 = 4px). Používej vždy jen hodnoty z této škály."
      >
        <div style={{
          background: '#0F0E1A',
          border: '1px solid #1E1C30',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '48px 56px 1fr 2fr',
            gap: 0,
            padding: '8px 20px',
            background: '#141324',
            borderBottom: '1px solid #1E1C30',
          }}>
            {['Token', 'px', 'Vizuál', 'Kde se používá'].map(h => (
              <p key={h} style={{ margin: 0, fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A52' }}>
                {h}
              </p>
            ))}
          </div>

          {scale.map((s, i) => (
            <div
              key={s.token}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 56px 1fr 2fr',
                gap: 0,
                padding: '10px 20px',
                borderBottom: i < scale.length - 1 ? '1px solid #1A1830' : 'none',
                alignItems: 'center',
              }}
            >
              <p style={{ margin: 0, fontFamily: inter, fontSize: '0.8125rem', fontWeight: 600, color: '#FFC183', fontMono: true }}>
                {s.token}
              </p>
              <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82', fontStyle: 'italic' }}>
                {s.px}px
              </p>
              <div style={{ paddingRight: 16 }}>
                <div style={{
                  height: 8,
                  width: s.px,
                  maxWidth: '100%',
                  background: 'linear-gradient(90deg, #FFC183, #8F7458)',
                  borderRadius: 1,
                }} />
              </div>
              <p style={{ margin: 0, fontFamily: inter, fontSize: '0.75rem', color: '#6B6A82' }}>
                {s.usage}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Základní jednotka"
        description="Proč 4px? Dělí se beze zbytku na 2, 4, 8 — umožňuje přesné půlení a zdvojení bez zlomkových hodnot."
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
        }}>
          {[
            { label: 'Micro',  tokens: ['1', '2'],          note: '4–8px — drobné detaily, bordery' },
            { label: 'Small',  tokens: ['3', '4'],          note: '12–16px — vnitřní padding komponent' },
            { label: 'Medium', tokens: ['5', '6', '7'],     note: '20–28px — hlavní padding, gap' },
            { label: 'Large',  tokens: ['8', '10', '12', '16'], note: '32–64px — sekce, layout' },
          ].map(group => (
            <div key={group.label} style={{
              background: '#141324',
              border: '1px solid #1E1C30',
              borderRadius: 2,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
              <div>
                <p style={{ margin: 0, fontFamily: inter, fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFC183' }}>
                  {group.label}
                </p>
                <p style={{ margin: '3px 0 0', fontFamily: inter, fontSize: '0.6875rem', color: '#3A3A52' }}>
                  {group.note}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                {group.tokens.map(t => {
                  const px = scale.find(s => s.token === t)?.px ?? 4
                  return (
                    <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        width: 8,
                        height: Math.min(px, 48),
                        background: 'linear-gradient(180deg, #FFC183, #8F7458)',
                        borderRadius: 1,
                      }} />
                      <p style={{ margin: 0, fontFamily: inter, fontSize: '0.5625rem', color: '#6B6A82' }}>{t}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

    </ShowcasePage>
  )
}
