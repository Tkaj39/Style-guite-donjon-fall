import { useLibVariant, ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import { textDeep, textCool, gold, goldMid, goldDim, bg0, successColor, textActive, borderSubtle, failColor } from '../lib/donjon/tokens'
import * as T from '../lib/tkajui/tokens'
import * as D from '../lib/donjon/tokens'

/* ══════════════════════════════════════════════════════════════════════════
   Sdílené primitiva
   ══════════════════════════════════════════════════════════════════════════ */

function SpacingRow({ name, value, usage, nameColor, valuColor, rowBg, rowBorder, textColor }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '130px 60px 1fr', gap: 10, padding: '8px 12px', background: rowBg, border: `1px solid ${rowBorder}`, borderRadius: 3, alignItems: 'center' }}>
      <code style={{ fontSize: '0.75rem', color: nameColor }}>{name}</code>
      <code style={{ fontSize: '0.875rem', fontWeight: 700, color: valuColor }}>{value}</code>
      <span style={{ fontSize: '0.6875rem', color: textColor, lineHeight: 1.4 }}>{usage}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   TkajUI — Design Tokens
   ══════════════════════════════════════════════════════════════════════════ */

function TkajTokenRow({ name, value, swatch, usage, nameColor = T.textMid }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 160px 100px 1fr', gap: 10, padding: '8px 12px', background: T.surface2, border: `1px solid ${T.borderDefault}22`, borderRadius: 3, alignItems: 'center' }}>
      <code style={{ fontSize: '0.75rem', color: nameColor }}>{name}</code>
      <code style={{ fontSize: '0.75rem', color: T.textMid, wordBreak: 'break-all' }}>{value}</code>
      {swatch
        ? <div style={{ width: 24, height: 24, background: swatch, borderRadius: 2, border: '1px solid #ffffff10' }} />
        : <span style={{ fontSize: '0.75rem', color: T.textLow }}>—</span>
      }
      <span style={{ fontSize: '0.6875rem', color: T.textLow, lineHeight: 1.4 }}>{usage}</span>
    </div>
  )
}

function TkajuiTokensContent() {
  return (
    <>
      {/* Co jsou tokeny */}
      <Section
        id="co-jsou"
        title="Co jsou design tokeny"
        description="Token = pojmenovaná hodnota pro vizuální vlastnost. Změna tokenu se propaguje všude kde se používá."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 520 }}>
            <div style={{ padding: '14px', border: '1px solid #f0555540', borderRadius: 4, background: '#f0555510' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#f05555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Bez tokenů</p>
              <code style={{ fontSize: '0.75rem', color: '#8888a8', display: 'block', lineHeight: 1.8 }}>
                {'color: #6576ff'}<br />
                {'border: 1px solid #6576ff'}<br />
                {'outline: 2px solid #6576ff'}<br />
                {'/* 47× v kódu — oprav všechny */'}<br />
              </code>
            </div>
            <div style={{ padding: '14px', border: '1px solid #34d36440', borderRadius: 4, background: '#34d36410' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#34d364', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ S tokeny</p>
              <code style={{ fontSize: '0.75rem', color: '#8888a8', display: 'block', lineHeight: 1.8 }}>
                {'color: accent'}<br />
                {'border: 1px solid accentBorder'}<br />
                {'outline: 2px solid accent'}<br />
                {'/* Oprav 1 token = opraveno všude */'}<br />
              </code>
            </div>
          </div>
        </Preview>
      </Section>

      {/* Surfaces & borders */}
      <Section
        id="surfaces"
        title="Surface & Border tokeny"
        description="Škála tmavých pozadí — 5 úrovní surface + 4 úrovně borderů. Kontrast jen přes jas, bez barevné diference."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 640 }}>
            {[
              { name: 'surface0',      value: T.surface0,      swatch: T.surface0,      usage: 'Nejhlubší pozadí — stránka, modal overlay', nameColor: T.accent },
              { name: 'surface1',      value: T.surface1,      swatch: T.surface1,      usage: 'Hlavní pozadí aplikace',                     nameColor: T.accent },
              { name: 'surface2',      value: T.surface2,      swatch: T.surface2,      usage: 'Karta, panel, raised surface',                nameColor: T.accent },
              { name: 'surface3',      value: T.surface3,      swatch: T.surface3,      usage: 'Aktivní prvek, hover bg',                     nameColor: T.accent },
              { name: 'surface4',      value: T.surface4,      swatch: T.surface4,      usage: 'Elevated panel, tooltip bg',                  nameColor: T.accent },
              { name: 'borderSubtle',  value: T.borderSubtle,  swatch: T.borderSubtle,  usage: 'Jemná separace — neviditelná, struktura',     nameColor: T.textMid },
              { name: 'borderDefault', value: T.borderDefault, swatch: T.borderDefault, usage: 'Standardní border komponent',                 nameColor: T.textMid },
              { name: 'borderMid',     value: T.borderMid,     swatch: T.borderMid,     usage: 'Silnější border, focus-related kontext',      nameColor: T.textMid },
              { name: 'borderStrong',  value: T.borderStrong,  swatch: T.borderStrong,  usage: 'Výrazný border, outline, decorative',         nameColor: T.textMid },
            ].map(t => <TkajTokenRow key={t.name} {...t} />)}
          </div>
        </Preview>
        <CodeBlock code={`/* src/lib/tkajui/tokens.js */
export const surface0 = '#0d0d14'
export const surface1 = '#13131c'
export const surface2 = '#1b1b27'
export const surface3 = '#232332'
export const surface4 = '#2c2c3e'

export const borderSubtle  = '#22222e'
export const borderDefault = '#35354a'
export const borderMid     = '#484860'
export const borderStrong  = '#626280'`} />
      </Section>

      {/* Accent */}
      <Section
        id="akcent"
        title="Accent tokeny"
        description="Modrý akcent — 5 hodnot: solid barva, hover, active, průhledné bg a border verze."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 640 }}>
            {[
              { name: 'accent',       value: T.accent,       swatch: T.accent,       usage: 'Primární akcent, aktivní prvky, focus ring' },
              { name: 'accentLight',  value: T.accentLight,  swatch: T.accentLight,  usage: 'Hover stav, světlejší varianta' },
              { name: 'accentDim',    value: T.accentDim,    swatch: T.accentDim,    usage: 'Active / pressed stav' },
              { name: 'accentBg',     value: T.accentBg,     swatch: T.accentBg,     usage: 'Pozadí aktivního / vybraného prvku' },
              { name: 'accentBorder', value: T.accentBorder, swatch: T.accentBorder, usage: 'Border aktivního / focus prvku' },
            ].map(t => <TkajTokenRow key={t.name} nameColor={T.accent} {...t} />)}
          </div>
        </Preview>
        <CodeBlock code={`export const accent       = '#6576ff'
export const accentLight  = '#8591ff'
export const accentDim    = '#4455ee'
export const accentBg     = '#6576ff18'
export const accentBorder = '#6576ff55'`} />
      </Section>

      {/* Text hierarchy */}
      <Section
        id="text"
        title="Text tokeny"
        description="4 úrovně textu — kontrast skrze jas, ne barvu. Žádný token není warm nebo cool tinted."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 640 }}>
            {[
              { name: 'textHigh',     value: T.textHigh,     swatch: T.textHigh,     usage: 'Primární text, nadpisy, aktivní labels' },
              { name: 'textMid',      value: T.textMid,      swatch: T.textMid,      usage: 'Sekundární text, labely, ikony' },
              { name: 'textLow',      value: T.textLow,      swatch: T.textLow,      usage: 'Pomocný text, placeholder, captions' },
              { name: 'textDisabled', value: T.textDisabled, swatch: T.textDisabled, usage: 'Disabled stav — nepřístupná hodnota' },
            ].map(t => <TkajTokenRow key={t.name} nameColor={T.textHigh} {...t} />)}
          </div>
        </Preview>
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 420 }}>
            {[
              { level: 'High',     color: T.textHigh,     ex: 'Nadpis, aktivní prvek, primární tlačítko' },
              { level: 'Mid',      color: T.textMid,      ex: 'Popis, label, ikona v klidovém stavu' },
              { level: 'Low',      color: T.textLow,      ex: 'Placeholder, helper text, timestamp' },
              { level: 'Disabled', color: T.textDisabled, ex: 'Disabled input, frozen state' },
            ].map(({ level, color, ex }) => (
              <div key={level} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color, minWidth: 80 }}>{level}</span>
                <span style={{ fontSize: '0.75rem', color: T.textLow, lineHeight: 1.4 }}>{ex}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Semantic */}
      <Section
        id="semantic"
        title="Sémantické barvy"
        description="4 role: success, danger, warning, info. Každá má solid + bg (15 % opacity) + border (40 %) + text variantu."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 640 }}>
            {[
              { name: 'successColor', value: T.successColor, swatch: T.successColor, usage: 'Úspěch, validní, ok stav' },
              { name: 'dangerColor',  value: T.dangerColor,  swatch: T.dangerColor,  usage: 'Chyba, destruktivní akce' },
              { name: 'warningColor', value: T.warningColor, swatch: T.warningColor, usage: 'Varování, upozornění' },
              { name: 'infoColor',    value: T.infoColor,    swatch: T.infoColor,    usage: 'Informace, nápověda' },
            ].map(t => <TkajTokenRow key={t.name} nameColor={T.textMid} {...t} />)}
          </div>
        </Preview>
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { label: 'Success', c: T.successColor },
              { label: 'Danger',  c: T.dangerColor  },
              { label: 'Warning', c: T.warningColor  },
              { label: 'Info',    c: T.infoColor     },
            ].map(({ label, c }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <div style={{ width: 60, height: 36, background: c + '15', border: `1px solid ${c}40`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: c }}>{label}</span>
                </div>
                <code style={{ fontSize: '0.5625rem', color: T.textLow }}>{c}</code>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`export const successColor = '#34d364'
export const dangerColor  = '#f05555'
export const warningColor = '#f0a030'
export const infoColor    = '#4fa3f5'

/* Bg + border deriváty */
export const successBg     = '#34d36415'
export const successBorder = '#34d36440'
export const dangerBg      = '#f0555515'
export const dangerBorder  = '#f0555540'`} />
      </Section>

      {/* Spacing */}
      <Section
        id="spacing"
        title="Spacing tokeny"
        description="Škála mezer — 4px základ. Vždy tokenová hodnota, ne px přímo."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 540 }}>
            {[
              { name: '--space-1', value: '4px',   usage: 'Gap uvnitř komponenty (icon + text)' },
              { name: '--space-2', value: '8px',   usage: 'Malý gap, padding sm' },
              { name: '--space-3', value: '12px',  usage: 'Standardní gap' },
              { name: '--space-4', value: '16px',  usage: 'Padding karty, md padding' },
              { name: '--space-5', value: '20px',  usage: 'Velký padding, sekce gap' },
              { name: '--space-6', value: '24px',  usage: 'XL padding, between sections' },
              { name: '--space-8', value: '32px',  usage: 'Section margin, layout gap' },
              { name: '--space-10', value: '40px', usage: 'Page padding, hero spacing' },
            ].map(({ name, value, usage }) => (
              <SpacingRow key={name} name={name} value={value} usage={usage}
                nameColor={T.accent} valuColor={T.textMid} rowBg={T.surface2} rowBorder={`${T.borderDefault}22`} textColor={T.textLow} />
            ))}
          </div>
        </Preview>
      </Section>

      {/* Border radius */}
      <Section
        id="radius"
        title="Border radius tokeny"
        description="Zaoblení rohů — konzistentní napříč komponentami. TkajUI preferuje drobné zaoblení (2–4 px)."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {[
              { name: '--radius-none', value: '0px',    r: 0    },
              { name: '--radius-xs',   value: '2px',    r: 2    },
              { name: '--radius-sm',   value: '3px',    r: 3    },
              { name: '--radius-md',   value: '4px',    r: 4    },
              { name: '--radius-lg',   value: '6px',    r: 6    },
              { name: '--radius-xl',   value: '8px',    r: 8    },
              { name: '--radius-full', value: '9999px', r: 9999 },
            ].map(({ name, value, r }) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <div style={{ width: 48, height: 36, background: T.surface3, border: `1px solid ${T.borderDefault}`, borderRadius: r }} />
                <code style={{ fontSize: '0.5625rem', color: T.accent, textAlign: 'center' }}>{value}</code>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Governance */}
      <Section
        id="governance"
        title="Governance — jak přidat token"
        description="Proces pro přidání nového tokenu do systému."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 560 }}>
            {[
              { step: '1', title: 'Zkontroluj tokens.js', desc: 'Prohledej existující hodnoty — raději rozšíř škálu než přidej duplicitu.' },
              { step: '2', title: 'Pojmenuj sémanticky', desc: 'accent ✓, color6576ff ✗. Název popisuje účel, ne hodnotu.' },
              { step: '3', title: 'Přidej do tokens.js', desc: 'Centrální soubor src/lib/tkajui/tokens.js — nikdy přímo v komponentě.' },
              { step: '4', title: 'Zdokumentuj v /tokens', desc: 'Přidej řádek do tabulky — hodnota, swatch, usage.' },
              { step: '5', title: 'Odstraň magic numbers', desc: 'Nahraď všechna stávající použití novou hodnotou z tokens.js.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: T.surface2, border: `1px solid ${T.borderDefault}18`, borderRadius: 3 }}>
                <div style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                  background: T.accentBg, border: `1px solid ${T.accentBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, color: T.accent,
                }}>{step}</div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '0.8125rem', fontWeight: 600, color: T.textHigh }}>{title}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: T.textMid, lineHeight: 1.4 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Tailwind */}
      <Section
        id="tailwind"
        title="Integrace s Tailwind"
        description="Tokeny jsou mapovány do Tailwind konfigurace — preferuj utility třídy tam kde existují."
      >
        <CodeBlock code={`/* tailwind.config.js */
export default {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6576ff',
          light:   '#8591ff',
          dim:     '#4455ee',
        },
        surface: {
          0: '#0d0d14',
          1: '#13131c',
          2: '#1b1b27',
          3: '#232332',
          4: '#2c2c3e',
        },
      },
    },
  },
}

/* Použití */
className="text-accent"           // #6576ff
className="bg-surface-2"         // #1b1b27
style={{ color: accent }}         // import z tokens.js`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy importuj z <code className="text-neutral-300">tokens.js</code> — nikdy magic number přímo v komponentě.</p>
          <p>✓ Nové tokeny: sémantické jméno, definice v tokens.js, zapsáno v /tokens dokumentaci.</p>
          <p>✓ Tailwind utility kde existuje (<code className="text-neutral-300">text-accent</code>), import z tokens.js kde ne.</p>
          <p>✗ Nepřidávej token pro jedinou komponentu — generalizuj nebo použij local variable.</p>
          <p>✗ Nepojmenovávej token hodnotou (<code className="text-neutral-300">color6576ff</code>) — pojmenuj účelem (<code className="text-neutral-300">accent</code>).</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   donjon-fall-ui — Design Tokens
   ══════════════════════════════════════════════════════════════════════════ */

function DonjonTokenRow({ name, value, computed, usage, category }) {
  const catColors = {
    color:   goldMid,
    spacing: '#4080C0',
    radius: successColor,
    shadow: goldDim,
    z:       '#C08040',
    duration:'failColor',
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 160px 100px 1fr', gap: 10, padding: '8px 12px', background: bg0, border: `1px solid ${goldDim}18`, borderRadius: 3, alignItems: 'center' }}>
      <code style={{ fontSize: '0.75rem', color: catColors[category] ?? goldMid }}>{name}</code>
      <code style={{ fontSize: '0.75rem', color: textCool, wordBreak: 'break-all' }}>{value}</code>
      {computed
        ? <div style={{ width: computed.w ?? 24, height: computed.h ?? 24, background: computed.bg, borderRadius: computed.r ?? 0, boxShadow: computed.shadow }} />
        : <span style={{ fontSize: '0.75rem', color: textDeep }}>—</span>
      }
      <span style={{ fontSize: '0.6875rem', color: textDeep, lineHeight: 1.4 }}>{usage}</span>
    </div>
  )
}

function DonjonTokensContent() {
  return (
    <>
      {/* Co jsou tokeny */}
      <Section
        id="co-jsou"
        title="Co jsou design tokeny"
        description="Token = pojmenovaná hodnota pro vizuální vlastnost. Změna tokenu se propaguje všude kde se používá."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 520 }}>
            <div style={{ padding: '14px', border: '1px solid #C0404040', borderRadius: 4, background: '#3D181818' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: failColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Bez tokenů</p>
              <code style={{ fontSize: '0.75rem', color: textCool, display: 'block', lineHeight: 1.8 }}>
                {'color: goldMid'}<br />
                {'border: 1px solid goldMid'}<br />
                {'box-shadow: 0 0 12px #B8956A40'}<br />
                {'/* 47× v kódu — oprav všechny */'}<br />
              </code>
            </div>
            <div style={{ padding: '14px', border: '1px solid #40A05540', borderRadius: 4, background: '#183D2018' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: successColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ S tokeny</p>
              <code style={{ fontSize: '0.75rem', color: textCool, display: 'block', lineHeight: 1.8 }}>
                {'color: var(--color-gold)'}<br />
                {'border: 1px solid var(--color-gold)'}<br />
                {'box-shadow: var(--glow-gold)'}<br />
                {'/* Oprav 1 token = opraveno všude */'}<br />
              </code>
            </div>
          </div>
        </Preview>
      </Section>

      {/* Barevné tokeny */}
      <Section
        id="barvy"
        title="Barevné tokeny"
        description="Primární paleta definovaná jako CSS custom properties. Nikdy nepoužívej hex přímo — vždy token."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 620 }}>
            {[
              { name: '--color-bg',          value: bg0, computed: { bg: bg0, w: 24, h: 24, r: 2 }, usage: 'Hlavní pozadí aplikace', category: 'color' },
              { name: '--color-bg-raised',   value: borderSubtle, computed: { bg: borderSubtle, w: 24, h: 24, r: 2 }, usage: 'Karta, skeleton, raised surface', category: 'color' },
              { name: '--color-bg-panel',    value: '#1E1C3A', computed: { bg: '#1E1C3A', w: 24, h: 24, r: 2 }, usage: 'Panel, modal, overlay', category: 'color' },
              { name: '--color-gold',        value: goldMid, computed: { bg: goldMid, w: 24, h: 24, r: 2 }, usage: 'Primární akcent, zlato', category: 'color' },
              { name: '--color-gold-dark',   value: goldDim, computed: { bg: goldDim, w: 24, h: 24, r: 2 }, usage: 'Border, dekorativní, sekundární', category: 'color' },
              { name: '--color-gold-light',  value: gold, computed: { bg: gold, w: 24, h: 24, r: 2 }, usage: 'Gradient start, highlight', category: 'color' },
              { name: '--color-text',        value: textActive, computed: { bg: textActive, w: 24, h: 24, r: 2 }, usage: 'Hlavní text', category: 'color' },
              { name: '--color-text-muted',  value: textCool, computed: { bg: textCool, w: 24, h: 24, r: 2 }, usage: 'Sekundární text, popis', category: 'color' },
              { name: '--color-text-faint',  value: textDeep, computed: { bg: textDeep, w: 24, h: 24, r: 2 }, usage: 'Placeholder, micro text', category: 'color' },
              { name: '--color-success',     value: successColor, computed: { bg: successColor, w: 24, h: 24, r: 2 }, usage: 'Úspěch, VP, ok stav', category: 'color' },
              { name: '--color-danger',      value: failColor, computed: { bg: failColor, w: 24, h: 24, r: 2 }, usage: 'Chyba, destruktivní akce', category: 'color' },
              { name: '--color-warning',     value: '#C08040', computed: { bg: '#C08040', w: 24, h: 24, r: 2 }, usage: 'Varování, upozornění', category: 'color' },
              { name: '--color-info',        value: '#4080C0', computed: { bg: '#4080C0', w: 24, h: 24, r: 2 }, usage: 'Informace, nápověda', category: 'color' },
            ].map(t => <DonjonTokenRow key={t.name} {...t} />)}
          </div>
        </Preview>
        <CodeBlock code={`/* src/index.css — kořenové tokeny */
:root {
  --color-bg:         bg0;
  --color-bg-raised:  borderSubtle;
  --color-bg-panel:   #1E1C3A;

  --color-gold:       goldMid;
  --color-gold-dark:  goldDim;
  --color-gold-light: gold;

  --color-text:       textActive;
  --color-text-muted: textCool;
  --color-text-faint: textDeep;

  --color-success:    successColor;
  --color-danger:     failColor;
  --color-warning:    #C08040;
  --color-info:       #4080C0;
}`} />
      </Section>

      {/* Spacing */}
      <Section
        id="spacing"
        title="Spacing tokeny"
        description="Škála mezer — 4px základ. Vždy tokenová hodnota, ne px přímo."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 540 }}>
            {[
              { name: '--space-1',  value: '4px',  usage: 'Gap uvnitř komponenty (icon + text)' },
              { name: '--space-2',  value: '8px',  usage: 'Malý gap, padding sm' },
              { name: '--space-3',  value: '12px', usage: 'Standardní gap' },
              { name: '--space-4',  value: '16px', usage: 'Padding karty, md padding' },
              { name: '--space-5',  value: '20px', usage: 'Velký padding, sekce gap' },
              { name: '--space-6',  value: '24px', usage: 'XL padding, between sections' },
              { name: '--space-8',  value: '32px', usage: 'Section margin, layout gap' },
              { name: '--space-10', value: '40px', usage: 'Page padding, hero spacing' },
            ].map(({ name, value, usage }) => (
              <SpacingRow key={name} name={name} value={value} usage={usage}
                nameColor="#4080C0" valuColor={goldMid} rowBg={bg0} rowBorder={`${goldDim}18`} textColor={textDeep} />
            ))}
          </div>
        </Preview>
      </Section>

      {/* Border radius */}
      <Section
        id="radius"
        title="Border radius tokeny"
        description="Zaoblení rohů — konzistentní napříč komponentami."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {[
              { name: '--radius-none', value: '0px',    r: 0    },
              { name: '--radius-xs',   value: '2px',    r: 2    },
              { name: '--radius-sm',   value: '3px',    r: 3    },
              { name: '--radius-md',   value: '4px',    r: 4    },
              { name: '--radius-lg',   value: '6px',    r: 6    },
              { name: '--radius-xl',   value: '8px',    r: 8    },
              { name: '--radius-full', value: '9999px', r: 9999 },
            ].map(({ name, value, r }) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <div style={{ width: 48, height: 36, background: '#1E1C3A', border: `1px solid ${goldDim}40`, borderRadius: r }} />
                <code style={{ fontSize: '0.5625rem', color: goldMid, textAlign: 'center' }}>{value}</code>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Governance */}
      <Section
        id="governance"
        title="Governance — jak přidat token"
        description="Proces pro přidání nového tokenu do systému."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 560 }}>
            {[
              { step: '1', title: 'Zkontroluj existující tokeny', desc: 'Hledej nejbližší existující hodnotu — raději rozšíř škálu než přidej duplicitu.' },
              { step: '2', title: 'Pojmenuj sémanticky, ne hodnotou', desc: '--color-gold ✓, --color-B8956A ✗. Název popisuje účel, ne hodnotu.' },
              { step: '3', title: 'Přidej do :root v index.css', desc: 'Centrální definice — nikdy v souboru komponenty.' },
              { step: '4', title: 'Zdokumentuj na stránce /tokens', desc: 'Přidej řádek do TokenRow tabulky — usage, kde se používá.' },
              { step: '5', title: 'Odstraň magic numbers z komponent', desc: 'Nahraď všechna použití existujících hodnot novým tokenem.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: bg0, border: `1px solid ${goldDim}18`, borderRadius: 3 }}>
                <div style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                  background: `${goldDim}20`, border: `1px solid ${goldDim}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, color: goldMid,
                }}>{step}</div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '0.8125rem', fontWeight: 700, color: textActive }}>{title}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: textCool, lineHeight: 1.4 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Tailwind */}
      <Section
        id="tailwind"
        title="Integrace s Tailwind"
        description="CSS tokeny jsou propojeny s Tailwind konfigurací — používej Tailwind utility kde existují, CSS proměnné tam kde ne."
      >
        <CodeBlock code={`/* tailwind.config.js — tokeny v Tailwind */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          300: 'gold',  // --color-gold-light
          400: 'goldMid',  // --color-gold
          500: 'goldDim',  // --color-gold-dark
        },
        neutral: {
          950: 'bg0',
          900: 'borderSubtle',
          800: '#1E1C3A',
        },
      },
    },
  },
}

className="text-brand-400"
style={{ color: 'var(--color-gold)' }}`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Vždy token — nikdy magic number přímo v komponentě.</p>
          <p>✓ Nové tokeny: sémantické jméno, definice v :root, zapsáno v /tokens dokumentaci.</p>
          <p>✓ Barevné tokeny: Tailwind utility kde existuje (<code className="text-neutral-300">text-brand-400</code>), CSS var kde ne.</p>
          <p>✗ Nepřidávej token pro jedinou komponentu — generalizuj nebo použij local variable.</p>
          <p>✗ Nepojmenovávej token hodnotou (<code className="text-neutral-300">--color-b8956a</code>) — pojmenuj účelem (<code className="text-neutral-300">--color-gold</code>).</p>
        </div>
      </Section>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Stránka
   ══════════════════════════════════════════════════════════════════════════ */

function TokensContent() {
  const lib = useLibVariant()
  return lib === 'donjon' ? <DonjonTokensContent /> : <TkajuiTokensContent />
}

export default function TokensPage() {
  return (
    <ShowcasePage
      title="Design Tokens"
      description="Sada pojmenovaných hodnot pro konzistentní vzhled celého systému. Tokeny jsou jediný zdroj pravdy — komponenty se na ně odkazují, nikdy nepoužívají magic numbers."
      variants={[
        { id: 'tkajui', label: 'TkajUI' },
        { id: 'donjon', label: 'donjon-fall-ui' },
      ]}
    >
      <TokensContent />
    </ShowcasePage>
  )
}
