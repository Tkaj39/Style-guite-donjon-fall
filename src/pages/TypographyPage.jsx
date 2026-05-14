import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

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

      {/* Volba fontu — rozhodovací strom */}
      <Section
        id="volba"
        title="Volba fontu — rozhodovací strom"
        description="Cormorant Garamond nebo Inter? Odpověz na tři otázky."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600 }}>
            {[
              { q: 'Je to dramatický herní moment (výhra, výsledek, dialog)?', a: '→ Cormorant Garamond, uppercase, gold gradient', color: '#B8956A' },
              { q: 'Je to velký nadpis tabulky / karty s herní tematikou?',   a: '→ Cormorant Garamond, uppercase', color: '#B8956A' },
              { q: 'Je to UI element — tlačítko, label, badge, input?',       a: '→ Inter, uppercase + tracking', color: '#4080C0' },
              { q: 'Je to tělo textu, popis, nápověda, chyba?',              a: '→ Inter, regular, no uppercase', color: '#4080C0' },
              { q: 'Je to kód, příkaz, hodnota (hex, číslo)?',               a: '→ Monospace (system-ui fallback)', color: '#40A055' },
            ].map(({ q, a, color }) => (
              <div key={q} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3', flex: 1 }}>{q}</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color, whiteSpace: 'nowrap', flexShrink: 0 }}>{a}</span>
              </div>
            ))}
          </div>
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 560 }}>
            <div style={{ padding: '14px', border: '1px solid #C0404040', borderRadius: 4, background: '#3D181818' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#C04040', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Nikdy Cormorant pro</p>
              {['Tělo textu — nečitelné v malých velikostech', 'Labely a badges — nedostatečná čitelnost', 'Chybové zprávy — dramatický font zvyšuje úzkost', 'Kód a hodnoty — čitelnost', 'Jakýkoli lowercase — ztrácí charakter'].map(t => (
                <p key={t} style={{ margin: '0 0 3px', fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.3 }}>· {t}</p>
              ))}
            </div>
            <div style={{ padding: '14px', border: '1px solid #40A05540', borderRadius: 4, background: '#183D2018' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#40A055', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ Cormorant pouze pro</p>
              {['Výsledkové obrazovky (výhra/prohra)', 'Název hry / titulní obrazovka', 'Nadpisy herních dialogů', 'Nadpisy karet (DonjonCard title)', 'Herní eventy — maximálně 3–4 slova'].map(t => (
                <p key={t} style={{ margin: '0 0 3px', fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.3 }}>· {t}</p>
              ))}
            </div>
          </div>
        </Preview>
      </Section>

      {/* Line-height */}
      <Section
        id="line-height"
        title="Výška řádků (line-height)"
        description="Line-height závisí na kontextu — tělo textu potřebuje větší výšku než UI labely."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { ctx: 'Velký display (Cormorant)',      lh: '1.1–1.15', usage: 'Výsledkové tituly, nadpisy hry — těsné pro dramatičnost' },
              { ctx: 'Nadpis (Inter bold, 20px+)',     lh: '1.2–1.3',  usage: 'Nadpisy sekcí, stránkový heading' },
              { ctx: 'UI text (tlačítka, labely)',     lh: '1.0–1.2',  usage: 'Jednořádkové elementy — line-height pro zarovnání' },
              { ctx: 'Tělo textu (Inter, 14–16px)',    lh: '1.5–1.6',  usage: 'Odstavce, popisky, pravidla hry — čitelnost' },
              { ctx: 'Malý text (12px a méně)',        lh: '1.4–1.5',  usage: 'Captions, micro text, hints' },
              { ctx: 'Kód (monospace)',                lh: '1.6–1.7',  usage: 'Code block — extra prostory mezi řádky kódu' },
            ].map(({ ctx, lh, usage }) => (
              <div key={ctx} style={{ display: 'grid', gridTemplateColumns: '220px 80px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{ctx}</span>
                <code style={{ fontSize: '0.875rem', fontWeight: 700, color: '#B8956A' }}>{lh}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{usage}</span>
              </div>
            ))}
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 24, maxWidth: 560 }}>
            {[
              { lh: 1.2, label: 'line-height: 1.2', ctx: 'UI heading' },
              { lh: 1.5, label: 'line-height: 1.5', ctx: 'Tělo textu' },
              { lh: 1.7, label: 'line-height: 1.7', ctx: 'Code block' },
            ].map(({ lh, label, ctx }) => (
              <div key={lh} style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.625rem', color: '#4A4870' }}>{label}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#F0E6D3', lineHeight: lh, background: '#1A1830', padding: '8px', borderRadius: 3, border: '1px solid #8F745420' }}>
                  Donjon Fall je strategická hra o věžích a kostkách na hexagonální mapě.
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '0.625rem', color: '#4A4870' }}>{ctx}</p>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Fluid typografie */}
      <Section
        id="fluid"
        title="Fluid typografie"
        description="Nadpisy se plynule škálují mezi mobilní a desktop velikostí pomocí clamp() — bez ostrých breakpointů."
      >
        <CodeBlock code={`/* Fluid typography — clamp(min, preferred, max) */

/* Název hry — titulní obrazovka */
.game-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  /* mobil: 32px → desktop: 56px, plynule */
}

/* Page heading */
.page-heading {
  font-size: clamp(1.375rem, 3vw, 1.75rem);
  /* mobil: 22px → desktop: 28px */
}

/* Section heading */
.section-heading {
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  /* mobil: 17px → desktop: 20px */
}

/* Tělo textu — nescaluj pod 14px nebo nad 16px */
.body-text {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
}

/* Výsledkový titulek — dramatický fluid */
.victory-title {
  font-size: clamp(1.75rem, 8vw, 3.5rem);
  line-height: 1.1;
}`} />
      </Section>

      {/* Font loading */}
      <Section
        id="loading"
        title="Font loading"
        description="Google Fonts přes @import s font-display: swap — text je ihned čitelný, font se dosadí po načtení."
      >
        <CodeBlock code={`/* index.html — preconnect pro rychlejší načtení */
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?
  family=Cormorant+Garamond:wght@400;600;700
  &family=Inter:wght@400;500;600;700
  &display=swap" rel="stylesheet">

/* CSS — fallback stack */
:root {
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-ui:      'Inter', 'system-ui', sans-serif;
  --font-mono:    'ui-monospace', 'Cascadia Code', 'Consolas', monospace;
}

/* font-display: swap — zabraňuje neviditelnému textu (FOIT)
   Zobrazí fallback font okamžitě, dosadí Cormorant/Inter po načtení.
   Přijatelný FOUT (Flash of Unstyled Text) je lepší než prázdná stránka. */`} />
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { phase: 'Před načtením fontu',   text: 'Georgia / system-ui (fallback)',     color: '#C08040', note: 'FOUT — krátce viditelný, přijatelný' },
              { phase: 'Po načtení (< 1–3s)',    text: 'Cormorant Garamond / Inter',         color: '#40A055', note: 'Cílový stav — font nahrán' },
              { phase: 'Chybí síť (offline)',    text: 'Georgia / system-ui (trvalý fallback)', color: '#8F9CB3', note: 'Fallback stack zajišťuje čitelnost' },
            ].map(({ phase, text, color, note }) => (
              <div key={phase} style={{ display: 'grid', gridTemplateColumns: '180px 200px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <span style={{ fontSize: '0.8125rem', color: '#8F9CB3' }}>{phase}</span>
                <span style={{ fontSize: '0.8125rem', color }}>{text}</span>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Typografická hierarchie — kompletní */}
      <Section
        id="hierarchie"
        title="Kompletní typografická hierarchie"
        description="Všechny úrovně od display po micro — živá ukázka celé škály na jednom místě."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', maxWidth: 560, background: '#0F0E1A', borderRadius: 4, border: '1px solid #1E1C30', overflow: 'hidden' }}>
            {[
              { text: 'Červený vítězí',     font: cormorant, size: '2.5rem',   weight: 700, transform: 'uppercase', tracking: '0.04em', color: null,      role: 'display / 40px', gradient: true },
              { text: 'Souboj zahájen',     font: cormorant, size: '1.5rem',   weight: 700, transform: 'uppercase', tracking: '0.04em', color: null,      role: 'dialog title / 24px', gradient: true },
              { text: 'Výběr mapy',         font: cormorant, size: '1.125rem', weight: 700, transform: 'uppercase', tracking: '0.04em', color: null,      role: 'card title / 18px', gradient: true },
              { text: 'Nadpis sekce',       font: inter,     size: '1.125rem', weight: 700, transform: 'none',      tracking: '-0.01em', color: '#F0E6D3', role: 'section heading / 18px' },
              { text: 'Herní informace a stav tahu hráče', font: inter, size: '0.875rem', weight: 400, transform: 'none', tracking: '0', color: '#F0E6D3', role: 'body / 14px' },
              { text: 'Popis karty a nápověda k poli',     font: inter, size: '0.75rem',  weight: 400, transform: 'none', tracking: '0', color: '#8F9CB3', role: 'caption / 12px' },
              { text: 'LABEL · BADGE · TLAČÍTKO',          font: inter, size: '0.6875rem', weight: 700, transform: 'uppercase', tracking: '0.12em', color: '#8F9CB3', role: 'label / 11px' },
              { text: 'MICRO · KOLO · FÁZE',               font: inter, size: '0.625rem', weight: 700, transform: 'uppercase', tracking: '0.14em', color: '#4A4870', role: 'micro / 10px' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12, padding: '10px 20px', borderBottom: '1px solid #1E1C30' }}>
                <p style={{
                  margin: 0,
                  fontFamily: r.font,
                  fontSize: r.size,
                  fontWeight: r.weight,
                  textTransform: r.transform,
                  letterSpacing: r.tracking,
                  lineHeight: 1.2,
                  color: r.gradient ? undefined : r.color,
                  ...(r.gradient ? goldGrad : {}),
                }}>
                  {r.text}
                </p>
                <code style={{ fontSize: '0.5625rem', color: '#3A3A52', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: inter }}>{r.role}</code>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Cormorant Garamond: vždy uppercase, vždy gold gradient, max 3–4 slova, jen pro dramatické herní momenty.</p>
          <p>✓ Inter: vše ostatní — UI, tělo, labely, errory, kód.</p>
          <p>✓ Line-height: 1.1–1.2 pro display, 1.5–1.6 pro tělo textu, 1.0 pro jednořádkové UI prvky.</p>
          <p>✓ Fluid typografie: <code className="text-neutral-300">clamp()</code> pro nadpisy — přizpůsobí se viewportu bez breakpointů.</p>
          <p>✓ Font loading: <code className="text-neutral-300">font-display: swap</code> + fallback stack — žádný FOIT.</p>
          <p>✗ Nikdy Cormorant v lowercase — ztrácí charakter a je hůře čitelný.</p>
          <p>✗ Nikdy Cormorant pro tělo textu, labely nebo chybové zprávy.</p>
          <p>✗ Nepřidávej nové webové fonty — stávající duo pokrývá vše co projekt potřebuje.</p>
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
