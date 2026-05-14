import { useState } from 'react'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'
import DonjonButton from '../lib/donjon/DonjonButton'

/* ── Timing demo box ── */
function TimingDemo({ duration, label, easing = 'ease' }) {
  const [active, setActive] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 80, fontSize: '0.6875rem', color: '#8F9CB3', textAlign: 'right', flexShrink: 0 }}>
        <span style={{ color: '#B8956A', fontWeight: 700 }}>{duration}ms</span>
        <br />{label}
      </div>
      <div
        style={{
          flex: 1,
          height: 8,
          background: '#12102A',
          border: '1px solid #8F745430',
          borderRadius: 4,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => { setActive(false); setTimeout(() => setActive(true), 10) }}
      >
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg,#FFC183,#8F7458)',
          borderRadius: 4,
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: active ? `transform ${duration}ms ${easing}` : 'none',
        }} />
      </div>
      <span style={{ fontSize: '0.625rem', color: '#4A4870', width: 36, flexShrink: 0 }}>{easing}</span>
    </div>
  )
}

/* ── Easing curve SVG ── */
function EasingCurve({ d, label, css, color = '#B8956A' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg viewBox="0 0 60 60" width="60" height="60" style={{ overflow: 'visible' }}>
        <rect x="0" y="0" width="60" height="60" rx="3" fill="#12102A" stroke="#8F745430" strokeWidth="1" />
        <line x1="0" y1="60" x2="60" y2="0" stroke="#8F745420" strokeWidth="1" strokeDasharray="3,3" />
        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="0"  cy="60" r="2.5" fill={color} />
        <circle cx="60" cy="0"  r="2.5" fill={color} />
      </svg>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#F0E6D3', fontWeight: 600, textAlign: 'center' }}>{label}</p>
      <code style={{ fontSize: '0.625rem', color: '#8F9CB3', textAlign: 'center' }}>{css}</code>
    </div>
  )
}

/* ── State demo box ── */
function StateBox({ label, style: extraStyle }) {
  return (
    <div style={{
      padding: '10px 14px',
      background: '#1A1830',
      border: '1px solid #8F745430',
      borderRadius: 4,
      fontSize: '0.8125rem',
      color: '#8F9CB3',
      ...extraStyle,
    }}>
      {label}
    </div>
  )
}

export default function MotionPage() {
  return (
    <ShowcasePage
      title="Motion"
      description="Principy animací Donjon Fall — trvání, easing křivky a pravidla pro to co animovat a co ne. Cílem je dramatičnost bez chaosu."
    >

      {/* Filozofie */}
      <Section
        id="filozofie"
        title="Filozofie"
        description="Donjon Fall animace jsou vědomě pomalejší a těžší než typické webové UI — navozují pocit váhy a důsledků herních akcí."
      >
        <div className="flex flex-col gap-3 text-sm text-neutral-400 max-w-2xl">
          <p>
            <span style={{ color: '#B8956A', fontWeight: 600 }}>Váha a záměr</span> — každá animace má
            říkat „tato akce něco znamená". Herní pohyby jsou pomalejší než webové mikro-interakce.
          </p>
          <p>
            <span style={{ color: '#B8956A', fontWeight: 600 }}>Easing přes lineární</span> — lineární
            přechod vypadá mechanicky. Herní prvky zrychlují nebo zpomalují, ne jezdí konstantní rychlostí.
          </p>
          <p>
            <span style={{ color: '#B8956A', fontWeight: 600 }}>Úspora pozornosti</span> — animuj jen
            to co nese informaci. Dekorativní shimmer a parallax efekty odvedou pozornost od gameplay.
          </p>
          <p>
            <span style={{ color: '#B8956A', fontWeight: 600 }}>Reduced motion</span> — vždy respektuj
            <code style={{ color: '#8F9CB3', margin: '0 4px' }}>prefers-reduced-motion: reduce</code>.
            Herní animace (souboj, pohyb kostky) mají fallback na okamžitý přechod.
          </p>
        </div>
      </Section>

      {/* Škála trvání */}
      <Section
        id="duration"
        title="Škála trvání"
        description="Klikni na lištu pro náhled. Výchozí jsou mid — trvání 200–300 ms."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 480 }}>
            <TimingDemo duration={80}   label="instant" easing="ease-out" />
            <TimingDemo duration={150}  label="fast"    easing="ease-out" />
            <TimingDemo duration={200}  label="normal"  easing="ease-in-out" />
            <TimingDemo duration={300}  label="mid"     easing="ease-in-out" />
            <TimingDemo duration={500}  label="slow"    easing="cubic-bezier(0.4,0,0.2,1)" />
            <TimingDemo duration={800}  label="dramatic" easing="cubic-bezier(0.6,0,0.1,1)" />
            <TimingDemo duration={1400} label="cinematic" easing="cubic-bezier(0.6,0,0.1,1)" />
          </div>
        </Preview>
        <CodeBlock code={`/* Tokeny trvání */
--dur-instant:   80ms;   /* hover fill, color změna */
--dur-fast:     150ms;   /* tooltip, badge */
--dur-normal:   200ms;   /* button press, toggle */
--dur-mid:      300ms;   /* modal open, toast slide */
--dur-slow:     500ms;   /* panel přechod, collapse */
--dur-dramatic: 800ms;   /* výhra, turn start overlay */
--dur-cinematic:1400ms;  /* loading, opening cinematic */`} />
      </Section>

      {/* Easing křivky */}
      <Section
        id="easing"
        title="Easing křivky"
        description="Čtyři základní křivky. Donjon Fall preferuje ease-out pro vstupy a ease-in pro výstupy."
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            <EasingCurve
              label="Ease out"
              css="cubic-bezier(0,0,0.2,1)"
              d="M 0 60 C 0 60 10 2 60 0"
              color="#40A055"
            />
            <EasingCurve
              label="Ease in"
              css="cubic-bezier(0.4,0,1,1)"
              d="M 0 60 C 50 58 60 10 60 0"
              color="#C04040"
            />
            <EasingCurve
              label="Ease in-out"
              css="cubic-bezier(0.4,0,0.2,1)"
              d="M 0 60 C 24 60 36 0 60 0"
              color="#B8956A"
            />
            <EasingCurve
              label="Dramatic"
              css="cubic-bezier(0.6,0,0.1,1)"
              d="M 0 60 C 36 60 54 0 60 0"
              color="#C08040"
            />
          </div>
        </Preview>
        <CodeBlock code={`/* Easing tokeny */
--ease-out:      cubic-bezier(0, 0, 0.2, 1);     /* vstupy — prvek přilétá */
--ease-in:       cubic-bezier(0.4, 0, 1, 1);     /* výstupy — prvek odchází */
--ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);  /* přechody stavu */
--ease-dramatic: cubic-bezier(0.6, 0, 0.1, 1);  /* herní akce, dramatické momenty */`} />
      </Section>

      {/* Co animovat */}
      <Section
        id="what-to-animate"
        title="Co animovat"
        description="Animuj jen to co nese informaci nebo zlepšuje orientaci."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640 }}>
          {/* ✓ sloupec */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#40A055', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>✓ Animuj</p>
            {[
              'Vstupy a výstupy překryvných vrstev (modal, toast, tooltip)',
              'Přechody stavů UI (disabled → enabled, loading → done)',
              'Herní akce s fyzickým ekvivalentem (pohyb kostky, kolaps věže)',
              'Feedback úspěchu nebo chyby (success glow, shake)',
              'Turn transitions a highlight aktivního hráče',
              'Progress bar fill při načítání',
            ].map(t => (
              <p key={t} style={{ margin: 0, fontSize: '0.8125rem', color: '#8F9CB3', lineHeight: 1.5, paddingLeft: 12, borderLeft: '2px solid #40A05544' }}>{t}</p>
            ))}
          </div>
          {/* ✗ sloupec */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#C04040', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>✗ Neanimuj</p>
            {[
              'Pozadí a dekorativní elementy bez informační hodnoty',
              'Text (lineHeight, fontSize, letterSpacing) — způsobuje layout shift',
              'Hover efekty s trváním > 150 ms — zdají se pomalé',
              'Paralaxní scrolling a ambient pohyb — herní UI je funkční, ne filmový',
              'Z-index přechody — ztratí se v renderovacím pořadí',
              'Cokoli co interferuje s čitelností map y nebo herního plánu',
            ].map(t => (
              <p key={t} style={{ margin: 0, fontSize: '0.8125rem', color: '#8F9CB3', lineHeight: 1.5, paddingLeft: 12, borderLeft: '2px solid #C0404044' }}>{t}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Vstup vs výstup */}
      <Section
        id="enter-exit"
        title="Vstupní a výstupní vzory"
        description="Standardizované kombinace pro overlaye, panely a notifikace."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 480 }}>
            {[
              { label: 'Modal',    enter: 'opacity 0→1 + translateY(-12px)→0 + scale(0.97)→1', dur: '180ms ease-out' },
              { label: 'Toast',    enter: 'opacity 0→1 + translateX(20px)→0',                  dur: '200ms ease-out' },
              { label: 'Tooltip',  enter: 'opacity 0→1 + scale(0.94)→1',                       dur: '120ms ease-out' },
              { label: 'Dropdown', enter: 'opacity 0→1 + translateY(-4px)→0',                  dur: '120ms ease-out' },
              { label: 'Backdrop', enter: 'opacity 0→1',                                        dur: '150ms ease' },
            ].map(({ label, enter, dur }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '8px 12px', background: '#12102A', border: '1px solid #8F745422', borderRadius: 3 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B8956A', width: 72, flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: '0.75rem', color: '#8F9CB3', flex: 1 }}>{enter}</span>
                <span style={{ fontSize: '0.6875rem', color: '#4A4870', flexShrink: 0 }}>{dur}</span>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`/* Modal vstup */
@keyframes modalPanelIn {
  from { opacity: 0; transform: translateY(-12px) scale(0.97) }
  to   { opacity: 1; transform: translateY(0)     scale(1) }
}

/* Toast vstup */
@keyframes toastSlideIn {
  from { opacity: 0; transform: translateX(20px) }
  to   { opacity: 1; transform: translateX(0) }
}

/* Výstup: obrátit easing na ease-in, zkrátit o ~20 % */`} />
      </Section>

      {/* Reduced motion */}
      <Section
        id="reduced-motion"
        title="Reduced motion"
        description="Vždy respektuj prefers-reduced-motion. Herní animace mají fallback — vypnuté, ne odstraněné."
      >
        <CodeBlock code={`/* Globální fallback */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Specifické herní animace — zachovaj výsledný stav */
@media (prefers-reduced-motion: reduce) {
  .dice-roll { animation: none; /* kostka se přesto zobrazí */ }
  .tower-collapse { transition: none; opacity: 0; } /* zmizí okamžitě */
}

/* V Reactu */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const duration = prefersReduced ? 0 : 300`} />
      </Section>

    </ShowcasePage>
  )
}
