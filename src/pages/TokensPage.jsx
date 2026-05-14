import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonBadge from '../components/DonjonBadge'

/* ── Token row ── */
function TokenRow({ name, value, computed, usage, category }) {
  const catColors = {
    color:   '#B8956A',
    spacing: '#4080C0',
    radius:  '#40A055',
    shadow:  '#8F7458',
    z:       '#C08040',
    duration:'#C04040',
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 160px 100px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'center' }}>
      <code style={{ fontSize: '0.75rem', color: catColors[category] ?? '#B8956A' }}>{name}</code>
      <code style={{ fontSize: '0.75rem', color: '#8F9CB3', wordBreak: 'break-all' }}>{value}</code>
      {computed
        ? <div style={{ width: computed.w ?? 24, height: computed.h ?? 24, background: computed.bg, borderRadius: computed.r ?? 0, boxShadow: computed.shadow }} />
        : <span style={{ fontSize: '0.75rem', color: '#4A4870' }}>—</span>
      }
      <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{usage}</span>
    </div>
  )
}

export default function TokensPage() {
  return (
    <ShowcasePage
      title="Design Tokens"
      description="Sada pojmenovaných hodnot pro konzistentní vzhled celého systému. Tokeny jsou jediný zdroj pravdy — komponenty se na ně odkazují, nikdy nepoužívají magic numbers."
    >

      {/* Co jsou tokeny */}
      <Section
        id="co-jsou"
        title="Co jsou design tokeny"
        description="Token = pojmenovaná hodnota pro vizuální vlastnost. Změna tokenu se propaguje všude kde se používá."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 520 }}>
            <div style={{ padding: '14px', border: '1px solid #C0404040', borderRadius: 4, background: '#3D181818' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#C04040', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Bez tokenů</p>
              <code style={{ fontSize: '0.75rem', color: '#8F9CB3', display: 'block', lineHeight: 1.8 }}>
                {'color: #B8956A'}<br />
                {'border: 1px solid #B8956A'}<br />
                {'box-shadow: 0 0 12px #B8956A40'}<br />
                {'/* 47× v kódu — oprav všechny */'}<br />
              </code>
            </div>
            <div style={{ padding: '14px', border: '1px solid #40A05540', borderRadius: 4, background: '#183D2018' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.5625rem', fontWeight: 700, color: '#40A055', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ S tokeny</p>
              <code style={{ fontSize: '0.75rem', color: '#8F9CB3', display: 'block', lineHeight: 1.8 }}>
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
              { name: '--color-bg',          value: '#12102A', computed: { bg: '#12102A', w: 24, h: 24, r: 2 }, usage: 'Hlavní pozadí aplikace', category: 'color' },
              { name: '--color-bg-raised',   value: '#1A1830', computed: { bg: '#1A1830', w: 24, h: 24, r: 2 }, usage: 'Karta, skeleton, raised surface', category: 'color' },
              { name: '--color-bg-panel',    value: '#1E1C3A', computed: { bg: '#1E1C3A', w: 24, h: 24, r: 2 }, usage: 'Panel, modal, overlay', category: 'color' },
              { name: '--color-gold',        value: '#B8956A', computed: { bg: '#B8956A', w: 24, h: 24, r: 2 }, usage: 'Primární akcent, zlato', category: 'color' },
              { name: '--color-gold-dark',   value: '#8F7458', computed: { bg: '#8F7458', w: 24, h: 24, r: 2 }, usage: 'Border, dekorativní, sekundární', category: 'color' },
              { name: '--color-gold-light',  value: '#FFC183', computed: { bg: '#FFC183', w: 24, h: 24, r: 2 }, usage: 'Gradient start, highlight', category: 'color' },
              { name: '--color-text',        value: '#F0E6D3', computed: { bg: '#F0E6D3', w: 24, h: 24, r: 2 }, usage: 'Hlavní text', category: 'color' },
              { name: '--color-text-muted',  value: '#8F9CB3', computed: { bg: '#8F9CB3', w: 24, h: 24, r: 2 }, usage: 'Sekundární text, popis', category: 'color' },
              { name: '--color-text-faint',  value: '#4A4870', computed: { bg: '#4A4870', w: 24, h: 24, r: 2 }, usage: 'Placeholder, micro text', category: 'color' },
              { name: '--color-success',     value: '#40A055', computed: { bg: '#40A055', w: 24, h: 24, r: 2 }, usage: 'Úspěch, VP, ok stav', category: 'color' },
              { name: '--color-danger',      value: '#C04040', computed: { bg: '#C04040', w: 24, h: 24, r: 2 }, usage: 'Chyba, destruktivní akce', category: 'color' },
              { name: '--color-warning',     value: '#C08040', computed: { bg: '#C08040', w: 24, h: 24, r: 2 }, usage: 'Varování, upozornění', category: 'color' },
              { name: '--color-info',        value: '#4080C0', computed: { bg: '#4080C0', w: 24, h: 24, r: 2 }, usage: 'Informace, nápověda', category: 'color' },
            ].map(t => <TokenRow key={t.name} {...t} />)}
          </div>
        </Preview>
        <CodeBlock code={`/* src/index.css — kořenové tokeny */
:root {
  /* Pozadí */
  --color-bg:         #12102A;
  --color-bg-raised:  #1A1830;
  --color-bg-panel:   #1E1C3A;

  /* Zlatá paleta */
  --color-gold:       #B8956A;
  --color-gold-dark:  #8F7458;
  --color-gold-light: #FFC183;

  /* Text */
  --color-text:       #F0E6D3;
  --color-text-muted: #8F9CB3;
  --color-text-faint: #4A4870;

  /* Sémantické barvy */
  --color-success:    #40A055;
  --color-danger:     #C04040;
  --color-warning:    #C08040;
  --color-info:       #4080C0;
}`} />
      </Section>

      {/* Spacing tokeny */}
      <Section
        id="spacing"
        title="Spacing tokeny"
        description="Škála mezer — 4px základ. Vždy používej tokenovou hodnotu, ne px přímo."
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
              <div key={name} style={{ display: 'grid', gridTemplateColumns: '130px 60px 1fr', gap: 10, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'center' }}>
                <code style={{ fontSize: '0.75rem', color: '#4080C0' }}>{name}</code>
                <code style={{ fontSize: '0.875rem', fontWeight: 700, color: '#B8956A' }}>{value}</code>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', lineHeight: 1.4 }}>{usage}</span>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Border radius tokeny */}
      <Section
        id="radius"
        title="Border radius tokeny"
        description="Zaoblení rohů — konzistentní napříč komponentami."
      >
        <Preview>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {[
              { name: '--radius-none', value: '0px',  r: 0  },
              { name: '--radius-xs',   value: '2px',  r: 2  },
              { name: '--radius-sm',   value: '3px',  r: 3  },
              { name: '--radius-md',   value: '4px',  r: 4  },
              { name: '--radius-lg',   value: '6px',  r: 6  },
              { name: '--radius-xl',   value: '8px',  r: 8  },
              { name: '--radius-full', value: '9999px', r: 9999 },
            ].map(({ name, value, r }) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <div style={{ width: 48, height: 36, background: '#1E1C3A', border: '1px solid #8F745440', borderRadius: r }} />
                <code style={{ fontSize: '0.625rem', color: '#B8956A', textAlign: 'center' }}>{value}</code>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Jak přidat token */}
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
              <div key={step} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3 }}>
                <div style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                  background: '#8F745420', border: '1px solid #8F7458',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, color: '#B8956A',
                }}>{step}</div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '0.8125rem', fontWeight: 700, color: '#F0E6D3' }}>{title}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Tailwind integrace */}
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
          300: '#FFC183',  // --color-gold-light
          400: '#B8956A',  // --color-gold        (brand-400)
          500: '#8F7458',  // --color-gold-dark
        },
        neutral: {
          950: '#12102A',  // --color-bg
          900: '#1A1830',  // --color-bg-raised
          800: '#1E1C3A',  // --color-bg-panel
        },
      },
    },
  },
}

/* Použití — Tailwind třída nebo CSS var */
className="text-brand-400"       // ← preferuj Tailwind
style={{ color: 'var(--color-gold)' }} // ← pro inline nebo non-Tailwind`} />
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

    </ShowcasePage>
  )
}
