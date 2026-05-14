import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Shadow demo box ── */
function ShadowBox({ label, shadow, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', minWidth: 130 }}>
      <div style={{
        width: 80, height: 50,
        background: '#1E1C3A',
        border: '1px solid #8F745430',
        borderRadius: 4,
        boxShadow: shadow,
      }} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#B8956A' }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#4A4870', lineHeight: 1.4 }}>{desc}</p>
      </div>
    </div>
  )
}

/* ── Glow demo ── */
function GlowBox({ label, color, glow, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', minWidth: 130 }}>
      <div style={{
        width: 80, height: 50,
        background: color + '22',
        border: `1px solid ${color}66`,
        borderRadius: 4,
        boxShadow: glow,
      }} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#4A4870', lineHeight: 1.4, maxWidth: 120 }}>{desc}</p>
      </div>
    </div>
  )
}

/* ── Příklady aplikace ── */
function AppExample({ label, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{
        padding: '10px 20px',
        background: '#1E1C3A',
        border: '1px solid #8F745440',
        borderRadius: 3,
        fontSize: '0.875rem',
        color: '#F0E6D3',
        ...style,
      }}>
        {label}
      </div>
    </div>
  )
}

const SHADOWS = {
  none:   'none',
  xs:     '0 1px 2px rgba(0,0,0,0.4)',
  sm:     '0 2px 6px rgba(0,0,0,0.5)',
  md:     '0 4px 12px rgba(0,0,0,0.6)',
  lg:     '0 8px 24px rgba(0,0,0,0.7)',
  xl:     '0 16px 40px rgba(0,0,0,0.8)',
  inset:  'inset 0 2px 4px rgba(0,0,0,0.5)',
}

const GLOWS = {
  gold:    '0 0 12px rgba(184,149,106,0.4)',
  success: '0 0 12px rgba(64,160,85,0.4)',
  danger:  '0 0 12px rgba(192,64,64,0.4)',
  info:    '0 0 12px rgba(64,128,192,0.4)',
  strong:  '0 0 24px rgba(184,149,106,0.6), 0 0 48px rgba(184,149,106,0.2)',
}

export default function GlowShadowPage() {
  return (
    <ShowcasePage
      title="Glow & Shadow systém"
      description="Vizuální hloubka a atmosféra — stíny pro elevaci, záře pro herní akcenty a interaktivní stavy. Donjon Fall používá tmavé pozadí, kde záře funguje výrazněji než stíny."
    >

      {/* Stínová škála */}
      <Section
        id="stiny"
        title="Stínová škála"
        description="7 úrovní stínů — od žádného po extra velký. Stíny simulují výšku prvku nad povrchem."
      >
        <Preview>
          <ShadowBox label="none"  shadow={SHADOWS.none}  desc="Žádná elevace" />
          <ShadowBox label="xs"    shadow={SHADOWS.xs}    desc="Jemné oddělení" />
          <ShadowBox label="sm"    shadow={SHADOWS.sm}    desc="Karta, input" />
          <ShadowBox label="md"    shadow={SHADOWS.md}    desc="Dropdown, panel" />
          <ShadowBox label="lg"    shadow={SHADOWS.lg}    desc="Modal backdrop" />
          <ShadowBox label="xl"    shadow={SHADOWS.xl}    desc="Velký overlay" />
          <ShadowBox label="inset" shadow={SHADOWS.inset} desc="Zapuštění, hloubka" />
        </Preview>
        <CodeBlock code={`/* Stínová škála — CSS proměnné */
:root {
  --shadow-xs:    0 1px  2px  rgba(0,0,0,0.40);
  --shadow-sm:    0 2px  6px  rgba(0,0,0,0.50);
  --shadow-md:    0 4px  12px rgba(0,0,0,0.60);
  --shadow-lg:    0 8px  24px rgba(0,0,0,0.70);
  --shadow-xl:    0 16px 40px rgba(0,0,0,0.80);
  --shadow-inset: inset 0 2px 4px rgba(0,0,0,0.50);
}

/* Použití */
.card        { box-shadow: var(--shadow-sm); }
.dropdown    { box-shadow: var(--shadow-md); }
.modal       { box-shadow: var(--shadow-xl); }`} />
      </Section>

      {/* Glow škála */}
      <Section
        id="glow"
        title="Záře (glow) škála"
        description="Záře komunikuje aktivitu, výběr a herní akcenty. Na tmavém pozadí je výrazně efektivnější než stín."
      >
        <Preview>
          <GlowBox label="Gold"    color="#B8956A" glow={GLOWS.gold}    desc="Aktivní výběr, hover" />
          <GlowBox label="Success" color="#40A055" glow={GLOWS.success} desc="Správná akce, VP" />
          <GlowBox label="Danger"  color="#C04040" glow={GLOWS.danger}  desc="Chyba, destruktivní" />
          <GlowBox label="Info"    color="#4080C0" glow={GLOWS.info}    desc="Info, vysvětlení" />
          <GlowBox label="Strong"  color="#B8956A" glow={GLOWS.strong}  desc="Zvýraznění, pulse" />
        </Preview>
        <CodeBlock code={`/* Glow škála */
:root {
  --glow-gold:    0 0 12px rgba(184,149,106,0.40);
  --glow-success: 0 0 12px rgba( 64,160, 85,0.40);
  --glow-danger:  0 0 12px rgba(192, 64, 64,0.40);
  --glow-info:    0 0 12px rgba( 64,128,192,0.40);
  --glow-strong:  0 0 24px rgba(184,149,106,0.60),
                  0 0 48px rgba(184,149,106,0.20);
}

/* Hover + glow kombinace */
.hex:hover {
  border-color: #B8956A;
  box-shadow: var(--glow-gold);
  transition: box-shadow 0.15s ease;
}`} />
      </Section>

      {/* Příklady použití */}
      <Section
        id="pouziti"
        title="Příklady v komponentách"
        description="Jak se stíny a záře aplikují na konkrétní prvky."
      >
        <Preview>
          {/* Karta */}
          <AppExample
            label="Karta — výchozí"
            style={{ boxShadow: SHADOWS.sm }}
          />
          <AppExample
            label="Karta — hover gold"
            style={{ boxShadow: `${SHADOWS.sm}, ${GLOWS.gold}`, border: '1px solid #B8956A66' }}
          />
          <AppExample
            label="Tlačítko — success glow"
            style={{
              background: '#40A05520', border: '1px solid #40A055',
              boxShadow: GLOWS.success, color: '#40A055',
            }}
          />
          <AppExample
            label="Error stav"
            style={{
              background: '#C0404018', border: '1px solid #C04040',
              boxShadow: GLOWS.danger, color: '#C04040',
            }}
          />
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 580 }}>
            {[
              { component: 'Karta — default',     shadow: '--shadow-sm',    glow: 'žádná',           note: 'Jemná elevace pro oddělení od bg' },
              { component: 'Karta — hover',       shadow: '--shadow-sm',    glow: '--glow-gold',      note: 'Hover přidá záři pro aktivní feedback' },
              { component: 'Vybraná karta/hex',   shadow: 'none',           glow: '--glow-gold',      note: 'Selekce = záře bez stínu' },
              { component: 'Dropdown / panel',    shadow: '--shadow-md',    glow: 'žádná',            note: 'Elevated UI panel' },
              { component: 'Modal',               shadow: '--shadow-xl',    glow: 'žádná',            note: 'Nejvyšší elevace' },
              { component: 'Toast — success',     shadow: '--shadow-md',    glow: '--glow-success',   note: 'Zpráva přitáhne pozornost' },
              { component: 'Toast — danger',      shadow: '--shadow-md',    glow: '--glow-danger',    note: 'Červená záře pro chybu' },
              { component: 'Input — focus',       shadow: 'none',           glow: 'gold 8px',         note: 'Jemná záře při fokusu (doplněk outline)' },
              { component: 'VP získáno',          shadow: 'none',           glow: '--glow-strong',    note: 'Herní akcent — silná pulzující záře' },
            ].map(({ component, shadow, glow, note }) => (
              <div key={component} style={{ display: 'grid', gridTemplateColumns: '180px 100px 120px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{component}</span>
                <code style={{ fontSize: '0.6875rem', color: '#4080C0', lineHeight: 1.4 }}>{shadow}</code>
                <code style={{ fontSize: '0.6875rem', color: '#B8956A', lineHeight: 1.4 }}>{glow}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Animovaná záře */}
      <Section
        id="animovana-glow"
        title="Animovaná záře"
        description="Pro herní eventy (VP získáno, ohnisko aktivní) se záře animuje pulzem."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{
              width: 60, height: 60,
              background: '#B8956A22',
              border: '2px solid #B8956A',
              borderRadius: 4,
              animation: 'glowPulse 2s ease-in-out infinite',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              ⭐
            </div>
            <div style={{
              width: 60, height: 60,
              background: '#40A05522',
              border: '2px solid #40A055',
              borderRadius: 4,
              animation: 'glowPulseGreen 2s ease-in-out infinite',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              ✓
            </div>
          </div>
          <style>{`
            @keyframes glowPulse {
              0%, 100% { box-shadow: 0 0 8px rgba(184,149,106,0.3); }
              50%       { box-shadow: 0 0 24px rgba(184,149,106,0.7), 0 0 48px rgba(184,149,106,0.3); }
            }
            @keyframes glowPulseGreen {
              0%, 100% { box-shadow: 0 0 8px rgba(64,160,85,0.3); }
              50%       { box-shadow: 0 0 24px rgba(64,160,85,0.7), 0 0 48px rgba(64,160,85,0.3); }
            }
          `}</style>
        </Preview>
        <CodeBlock code={`@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0  8px rgba(184,149,106,0.30); }
  50%       { box-shadow: 0 0 24px rgba(184,149,106,0.70),
                          0 0 48px rgba(184,149,106,0.30); }
}

/* Použití na herním prvku */
.vp-orb {
  animation: glowPulse 2s ease-in-out infinite;
}

/* Respektuj prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .vp-orb { animation: none; box-shadow: var(--glow-gold); }
}`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Stíny = elevace v prostoru. Záře = aktivita, výběr, herní akcent.</p>
          <p>✓ Záře na tmavém pozadí funguje výrazněji — nepřehánět, jinak ztratí efekt.</p>
          <p>✓ Hover stav: přidej záři místo změny barvy — méně agresivní, atmosféričtější.</p>
          <p>✓ Animovaná záře jen pro herní eventy (VP, ohnisko) — ne pro UI elementy.</p>
          <p>✓ Respektuj <code className="text-neutral-300">prefers-reduced-motion</code> — animace vypni, statickou záři nech.</p>
          <p>✗ Nepoužívej záři a stín zároveň na stejném prvku — volí jeden nebo druhý.</p>
          <p>✗ Nepoužívej záři na světlých pozadích — ztrácí efekt a vypadá neelegantně.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
