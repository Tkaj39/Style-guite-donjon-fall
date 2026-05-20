import { useLibVariant, ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { textDeep, textCool, goldMid, bg0, successColor, textActive, failColor, goldDim } from '../lib/donjon/tokens'

/* ══════════════════════════════════════════════════════════════════════════
   Sdílené primitiva
   ══════════════════════════════════════════════════════════════════════════ */

function ShadowBox({ label, shadow, desc, bg = '#1E1C3A', border = `${goldDim}30` }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', minWidth: 130 }}>
      <div style={{ width: 80, height: 50, background: bg, border: `1px solid ${border}`, borderRadius: 4, boxShadow: shadow }} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: goldMid }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: textDeep, lineHeight: 1.4 }}>{desc}</p>
      </div>
    </div>
  )
}

function ShadowBoxTkaj({ label, shadow, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', minWidth: 130 }}>
      <div style={{ width: 80, height: 50, background: '#1b1b27', border: '1px solid #35354a', borderRadius: 4, boxShadow: shadow }} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#6576ff' }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: '#4c4c68', lineHeight: 1.4 }}>{desc}</p>
      </div>
    </div>
  )
}

function GlowBox({ label, color, glow, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', minWidth: 130 }}>
      <div style={{ width: 80, height: 50, background: color + '22', border: `1px solid ${color}66`, borderRadius: 4, boxShadow: glow }} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: textDeep, lineHeight: 1.4, maxWidth: 120 }}>{desc}</p>
      </div>
    </div>
  )
}

const SHADOWS = {
  none:  'none',
  xs:    '0 1px 2px rgba(0,0,0,0.4)',
  sm:    '0 2px 6px rgba(0,0,0,0.5)',
  md:    '0 4px 12px rgba(0,0,0,0.6)',
  lg:    '0 8px 24px rgba(0,0,0,0.7)',
  xl:    '0 16px 40px rgba(0,0,0,0.8)',
  inset: 'inset 0 2px 4px rgba(0,0,0,0.5)',
}

/* ══════════════════════════════════════════════════════════════════════════
   TkajUI — Glow & Shadow
   ══════════════════════════════════════════════════════════════════════════ */

const TKAJ_GLOWS = {
  accent:  '0 0 10px rgba(101,118,255,0.35)',
  success: '0 0 10px rgba(52,211,100,0.35)',
  danger:  '0 0 10px rgba(240,85,85,0.35)',
  info:    '0 0 10px rgba(79,163,245,0.35)',
}

function TkajAppExample({ label, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{
        padding: '10px 20px',
        background: '#1b1b27',
        border: '1px solid #35354a',
        borderRadius: 3,
        fontSize: '0.875rem',
        color: '#eeeef8',
        ...style,
      }}>
        {label}
      </div>
    </div>
  )
}

function TkajuiGlowContent() {
  return (
    <>
      {/* Stíny */}
      <Section
        id="stiny"
        title="Stínová škála"
        description="7 úrovní stínů — od žádného po extra velký. Stíny simulují výšku prvku nad povrchem. Shodná s donjon variantou — elevace je vizuálně neutrální."
      >
        <Preview>
          <ShadowBoxTkaj label="none"  shadow={SHADOWS.none}  desc="Žádná elevace" />
          <ShadowBoxTkaj label="xs"    shadow={SHADOWS.xs}    desc="Jemné oddělení" />
          <ShadowBoxTkaj label="sm"    shadow={SHADOWS.sm}    desc="Karta, input" />
          <ShadowBoxTkaj label="md"    shadow={SHADOWS.md}    desc="Dropdown, panel" />
          <ShadowBoxTkaj label="lg"    shadow={SHADOWS.lg}    desc="Modal backdrop" />
          <ShadowBoxTkaj label="xl"    shadow={SHADOWS.xl}    desc="Velký overlay" />
          <ShadowBoxTkaj label="inset" shadow={SHADOWS.inset} desc="Zapuštění, hloubka" />
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

.card     { box-shadow: var(--shadow-sm); }
.dropdown { box-shadow: var(--shadow-md); }
.modal    { box-shadow: var(--shadow-xl); }`} />
      </Section>

      {/* Glow — TkajUI */}
      <Section
        id="glow"
        title="Záře (glow) škála"
        description="TkajUI používá záři střídmě — jen pro focus stav a sémantické signály (success/danger). Záře není dekorativní — komunikuje stav."
      >
        <Preview>
          <GlowBox label="Accent"  color="#6576ff" glow={TKAJ_GLOWS.accent}  desc="Focus, aktivní výběr" />
          <GlowBox label="Success" color="#34d364" glow={TKAJ_GLOWS.success} desc="Validní, ok stav" />
          <GlowBox label="Danger"  color="#f05555" glow={TKAJ_GLOWS.danger}  desc="Chyba, varování" />
          <GlowBox label="Info"    color="#4fa3f5" glow={TKAJ_GLOWS.info}    desc="Informace" />
        </Preview>
        <CodeBlock code={`/* Glow — TkajUI (střídmé, sémantické) */
:root {
  --glow-accent:  0 0 10px rgba(101,118,255,0.35);
  --glow-success: 0 0 10px rgba( 52,211,100,0.35);
  --glow-danger:  0 0 10px rgba(240, 85, 85,0.35);
  --glow-info:    0 0 10px rgba( 79,163,245,0.35);
}

/* Focus + glow kombinace (Input) */
input:focus-visible {
  outline: 2px solid #6576ff;
  outline-offset: 2px;
  box-shadow: var(--glow-accent);
}`} />
      </Section>

      {/* Příklady */}
      <Section
        id="pouziti"
        title="Příklady v komponentách"
        description="Jak se stíny a záře aplikují na konkrétní prvky v TkajUI."
      >
        <Preview>
          <TkajAppExample label="Karta — výchozí"    style={{ boxShadow: SHADOWS.sm }} />
          <TkajAppExample label="Input — focus"      style={{ border: '1px solid #6576ff', boxShadow: `${TKAJ_GLOWS.accent}` }} />
          <TkajAppExample label="Toast — success"    style={{ background: '#34d36415', border: '1px solid #34d36440', boxShadow: TKAJ_GLOWS.success, color: '#34d364' }} />
          <TkajAppExample label="Toast — danger"     style={{ background: '#f0555515', border: '1px solid #f0555540', boxShadow: TKAJ_GLOWS.danger,  color: '#f05555' }} />
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 580 }}>
            {[
              { component: 'Karta — default',    shadow: '--shadow-sm',    glow: 'žádná',            note: 'Jemná elevace pro oddělení od bg' },
              { component: 'Karta — hover',      shadow: '--shadow-sm',    glow: '--glow-accent',    note: 'Hover přidá jemnou accent záři' },
              { component: 'Input — focus',      shadow: 'none',           glow: '--glow-accent',    note: 'Záře doplňuje outline ring' },
              { component: 'Dropdown / panel',   shadow: '--shadow-md',    glow: 'žádná',            note: 'Elevated UI panel' },
              { component: 'Modal',              shadow: '--shadow-xl',    glow: 'žádná',            note: 'Nejvyšší elevace' },
              { component: 'Toast — success',    shadow: '--shadow-md',    glow: '--glow-success',   note: 'Sémantická záře' },
              { component: 'Toast — danger',     shadow: '--shadow-md',    glow: '--glow-danger',    note: 'Červená záře pro chybu' },
            ].map(({ component, shadow, glow, note }) => (
              <div key={component} style={{ display: 'grid', gridTemplateColumns: '180px 100px 120px 1fr', gap: 10, padding: '8px 12px', background: '#1b1b27', border: '1px solid #35354a18', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8888a8' }}>{component}</span>
                <code style={{ fontSize: '0.6875rem', color: '#6576ff', lineHeight: 1.4 }}>{shadow}</code>
                <code style={{ fontSize: '0.6875rem', color: '#8888a8', lineHeight: 1.4 }}>{glow}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4c4c68', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Stíny = elevace v prostoru. Záře = sémantický stav (focus, success, danger).</p>
          <p>✓ TkajUI záře je střídmá — max 10px blur, 35 % opacity. Nepřehánět.</p>
          <p>✓ Záře jen pro interaktivní nebo sémantické stavy — ne pro dekoraci.</p>
          <p>✗ Nepoužívej záři a stín najednou na stejném prvku — volíš jeden nebo druhý.</p>
          <p>✗ Žádná animovaná záře v TkajUI — animace patří do donjon-fall-ui vrstvy.</p>
          <p>✗ Nepoužívej záři na světlých pozadích — ztrácí efekt.</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   donjon-fall-ui — Glow & Shadow
   ══════════════════════════════════════════════════════════════════════════ */

const DONJON_GLOWS = {
  gold:    '0 0 12px rgba(184,149,106,0.4)',
  success: '0 0 12px rgba(64,160,85,0.4)',
  danger:  '0 0 12px rgba(192,64,64,0.4)',
  info:    '0 0 12px rgba(64,128,192,0.4)',
  strong:  '0 0 24px rgba(184,149,106,0.6), 0 0 48px rgba(184,149,106,0.2)',
}

function DonjonAppExample({ label, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{
        padding: '10px 20px',
        background: '#1E1C3A',
        border: `1px solid ${goldDim}40`,
        borderRadius: 3,
        fontSize: '0.875rem',
        color: textActive,
        ...style,
      }}>
        {label}
      </div>
    </div>
  )
}

function DonjonGlowContent() {
  return (
    <>
      {/* Stíny */}
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

.card        { box-shadow: var(--shadow-sm); }
.dropdown    { box-shadow: var(--shadow-md); }
.modal       { box-shadow: var(--shadow-xl); }`} />
      </Section>

      {/* Glow — donjon */}
      <Section
        id="glow"
        title="Záře (glow) škála"
        description="Záře komunikuje aktivitu, výběr a herní akcenty. Na tmavém pozadí je výrazně efektivnější než stín."
      >
        <Preview>
          <GlowBox label="Gold"    color="goldMid" glow={DONJON_GLOWS.gold}    desc="Aktivní výběr, hover" />
          <GlowBox label="Success" color="successColor" glow={DONJON_GLOWS.success} desc="Správná akce, VP" />
          <GlowBox label="Danger"  color="failColor" glow={DONJON_GLOWS.danger}  desc="Chyba, destruktivní" />
          <GlowBox label="Info"    color="#4080C0" glow={DONJON_GLOWS.info}    desc="Info, vysvětlení" />
          <GlowBox label="Strong"  color="goldMid" glow={DONJON_GLOWS.strong}  desc="Zvýraznění, pulse" />
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

.hex:hover {
  border-color: goldMid;
  box-shadow: var(--glow-gold);
  transition: box-shadow 0.15s ease;
}`} />
      </Section>

      {/* Příklady */}
      <Section
        id="pouziti"
        title="Příklady v komponentách"
        description="Jak se stíny a záře aplikují na konkrétní prvky."
      >
        <Preview>
          <DonjonAppExample label="Karta — výchozí"    style={{ boxShadow: SHADOWS.sm }} />
          <DonjonAppExample label="Karta — hover gold" style={{ boxShadow: `${SHADOWS.sm}, ${DONJON_GLOWS.gold}`, border: '1px solid #B8956A66' }} />
          <DonjonAppExample label="Success glow"       style={{ background: '#40A05520', border: `1px solid ${successColor}`, boxShadow: DONJON_GLOWS.success, color: successColor }} />
          <DonjonAppExample label="Error stav"         style={{ background: '#C0404018', border: `1px solid ${failColor}`, boxShadow: DONJON_GLOWS.danger,  color: failColor }} />
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 580 }}>
            {[
              { component: 'Karta — default',   shadow: '--shadow-sm',  glow: 'žádná',           note: 'Jemná elevace pro oddělení od bg' },
              { component: 'Karta — hover',     shadow: '--shadow-sm',  glow: '--glow-gold',      note: 'Hover přidá záři pro aktivní feedback' },
              { component: 'Vybraná karta/hex', shadow: 'none',         glow: '--glow-gold',      note: 'Selekce = záře bez stínu' },
              { component: 'Dropdown / panel',  shadow: '--shadow-md',  glow: 'žádná',            note: 'Elevated UI panel' },
              { component: 'Modal',             shadow: '--shadow-xl',  glow: 'žádná',            note: 'Nejvyšší elevace' },
              { component: 'Toast — success',   shadow: '--shadow-md',  glow: '--glow-success',   note: 'Zpráva přitáhne pozornost' },
              { component: 'Toast — danger',    shadow: '--shadow-md',  glow: '--glow-danger',    note: 'Červená záře pro chybu' },
              { component: 'Input — focus',     shadow: 'none',         glow: 'gold 8px',         note: 'Jemná záře při fokusu (doplněk outline)' },
              { component: 'VP získáno',        shadow: 'none',         glow: '--glow-strong',    note: 'Herní akcent — silná pulzující záře' },
            ].map(({ component, shadow, glow, note }) => (
              <div key={component} style={{ display: 'grid', gridTemplateColumns: '180px 100px 120px 1fr', gap: 10, padding: '8px 12px', background: bg0, border: `1px solid ${goldDim}18`, borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: textCool }}>{component}</span>
                <code style={{ fontSize: '0.6875rem', color: '#4080C0', lineHeight: 1.4 }}>{shadow}</code>
                <code style={{ fontSize: '0.6875rem', color: goldMid, lineHeight: 1.4 }}>{glow}</code>
                <span style={{ fontSize: '0.6875rem', color: textDeep, lineHeight: 1.4 }}>{note}</span>
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
              border: `2px solid ${goldMid}`,
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
              border: `2px solid ${successColor}`,
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

.vp-orb { animation: glowPulse 2s ease-in-out infinite; }

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
          <p>✗ Nepoužívej záři a stín zároveň na stejném prvku — volíš jeden nebo druhý.</p>
          <p>✗ Nepoužívej záři na světlých pozadích — ztrácí efekt a vypadá neelegantně.</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Stránka
   ══════════════════════════════════════════════════════════════════════════ */

function GlowContent() {
  const lib = useLibVariant()
  return lib === 'donjon' ? <DonjonGlowContent /> : <TkajuiGlowContent />
}

export default function GlowShadowPage() {
  return (
    <ShowcasePage
      title="Glow & Shadow systém"
      description="Vizuální hloubka a atmosféra — stíny pro elevaci, záře pro interaktivní stavy a akcenty. Obě knihovny sdílejí stínovou škálu; záře se liší v rozsahu a účelu."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <GlowContent />
    </ShowcasePage>
  )
}
