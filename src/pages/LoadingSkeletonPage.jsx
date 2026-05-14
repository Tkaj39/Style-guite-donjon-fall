import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Skeleton primitives ── */
const shimmer = {
  background: 'linear-gradient(90deg, #1A1830 25%, #22203E 50%, #1A1830 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeletonShimmer 1.4s ease-in-out infinite',
}

function SkeletonBox({ w = '100%', h = 16, radius = 3, style = {} }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      ...shimmer, ...style,
    }} />
  )
}

/* ── Skeleton komponenty ── */
function SkeletonText({ lines = 1, lastWidth = '60%' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox key={i} h={10} w={i === lines - 1 && lines > 1 ? lastWidth : '100%'} />
      ))}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={{
      padding: '16px', border: '1px solid #8F745418', borderRadius: 4,
      display: 'flex', flexDirection: 'column', gap: 12, width: 220,
    }}>
      <SkeletonBox h={100} radius={3} />
      <SkeletonBox h={14} w="70%" />
      <SkeletonText lines={2} lastWidth="45%" />
      <div style={{ display: 'flex', gap: 8 }}>
        <SkeletonBox h={28} w={80} radius={2} />
        <SkeletonBox h={28} w={60} radius={2} />
      </div>
    </div>
  )
}

function SkeletonListItem({ wide = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', borderBottom: '1px solid #8F745418',
    }}>
      <SkeletonBox w={36} h={36} radius={3} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <SkeletonBox h={10} w={wide ? '70%' : '50%'} />
        <SkeletonBox h={8}  w={wide ? '45%' : '30%'} />
      </div>
      <SkeletonBox w={48} h={20} radius={10} style={{ flexShrink: 0 }} />
    </div>
  )
}

function SkeletonPlayerCard() {
  return (
    <div style={{
      padding: '14px 16px', border: '1px solid #8F745430', borderRadius: 4,
      display: 'flex', gap: 12, alignItems: 'center', width: 280,
    }}>
      <SkeletonBox w={48} h={48} radius={24} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SkeletonBox h={12} w="60%" />
        <SkeletonBox h={8}  w="40%" />
        <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
          {[28, 22, 28].map((w, i) => (
            <SkeletonBox key={i} w={w} h={18} radius={10} />
          ))}
        </div>
      </div>
      <SkeletonBox w={36} h={36} radius={4} style={{ flexShrink: 0 }} />
    </div>
  )
}

function SkeletonTable({ rows = 4 }) {
  return (
    <div style={{ width: '100%', maxWidth: 480, border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 12, padding: '10px 14px', background: '#12102A',
        borderBottom: '1px solid #8F745430',
      }}>
        {[60, 40, 40, 40].map((w, i) => (
          <SkeletonBox key={i} h={8} w={`${w}%`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 12, padding: '10px 14px',
          borderBottom: i < rows - 1 ? '1px solid #8F745418' : 'none',
        }}>
          {[70, 50, 35, 45].map((w, j) => (
            <SkeletonBox key={j} h={8} w={`${w}%`} />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Inline CSS pro animaci ── */
const styleTag = (
  <style>{`
    @keyframes skeletonShimmer {
      0%   { background-position: 200% 0 }
      100% { background-position: -200% 0 }
    }
  `}</style>
)

export default function LoadingSkeletonPage() {
  return (
    <ShowcasePage
      title="Loading & Skeleton"
      description="Vizuální vzory pro stavy načítání — skeleton UI, progress indikátory a timeoutová pravidla. Skeleton zobrazuje strukturu obsahu před příchodem dat."
    >
      {styleTag}

      {/* Co je skeleton */}
      <Section
        id="co-je-skeleton"
        title="Co je skeleton"
        description="Skeleton UI zobrazuje strukturu stránky nebo komponenty ve stavu načítání — uživatel ví, co ho čeká, a vnímá nižší latenci."
      >
        <Preview dark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 540 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#40A055', letterSpacing: '0.08em', textTransform: 'uppercase' }}>✓ Skeleton</p>
              <SkeletonPlayerCard />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 700, color: '#C04040', letterSpacing: '0.08em', textTransform: 'uppercase' }}>✗ Spinner only</p>
              <div style={{
                width: 280, height: 76, border: '1px solid #8F745430', borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  border: '2px solid #8F745430', borderTopColor: '#B8956A',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            </div>
          </div>
        </Preview>
        <div className="flex flex-col gap-2 text-sm text-neutral-400 mt-2">
          <p>✓ Skeleton: uživatel vidí strukturu — odhady layoutu jsou přesnější, vnímané čekání kratší.</p>
          <p>✓ Spinner: vhodný pouze pro krátké operace (&lt;500ms) nebo tam kde nelze odhadnout strukturu.</p>
        </div>
      </Section>

      {/* Primitives */}
      <Section
        id="primitives"
        title="Skeleton primitives"
        description="Základní stavební bloky — SkeletonBox s shimmer animací. Vše ostatní je složeno z nich."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: '0.625rem', color: '#4A4870' }}>Řádek textu</span>
              <SkeletonBox h={10} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: '0.625rem', color: '#4A4870' }}>Nadpis</span>
              <SkeletonBox h={18} w="55%" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: '0.625rem', color: '#4A4870' }}>Obrázek / thumbnail</span>
              <SkeletonBox h={80} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: '0.625rem', color: '#4A4870' }}>Avatar (kruh)</span>
              <SkeletonBox w={48} h={48} radius={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: '0.625rem', color: '#4A4870' }}>Badge / chip</span>
              <SkeletonBox w={64} h={20} radius={10} />
            </div>
          </div>
        </Preview>
        <CodeBlock code={`/* SkeletonBox — základní primitivum */
const shimmer = {
  background: 'linear-gradient(90deg, #1A1830 25%, #22203E 50%, #1A1830 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeletonShimmer 1.4s ease-in-out infinite',
}

@keyframes skeletonShimmer {
  0%   { background-position: 200% 0 }
  100% { background-position: -200% 0 }
}

function SkeletonBox({ w = '100%', h = 16, radius = 3 }) {
  return <div style={{ width: w, height: h, borderRadius: radius, ...shimmer }} />
}`} />
      </Section>

      {/* Sestavené skeletony */}
      <Section
        id="sestavene"
        title="Sestavené skeletony"
        description="Složené skeletony odpovídají finálnímu layoutu 1:1 — stejné rozměry, stejná mřížka."
      >
        <Preview>
          <SkeletonCard />
          <SkeletonPlayerCard />
        </Preview>
        <Preview>
          <div style={{ width: '100%', maxWidth: 480, border: '1px solid #8F745430', borderRadius: 4, overflow: 'hidden' }}>
            <SkeletonListItem />
            <SkeletonListItem wide />
            <SkeletonListItem />
          </div>
        </Preview>
      </Section>

      {/* Tabulka */}
      <Section
        id="tabulka"
        title="Skeleton tabulky"
        description="Grid skeletonu kopíruje počet sloupců a přibližné proporce skutečné tabulky."
      >
        <Preview>
          <SkeletonTable rows={4} />
        </Preview>
        <CodeBlock code={`{/* Skeleton tabulky — stejný grid jako reálná tabulka */}
<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, padding: '10px 14px' }}>
  <SkeletonBox h={8} w="70%" />
  <SkeletonBox h={8} w="50%" />
  <SkeletonBox h={8} w="35%" />
  <SkeletonBox h={8} w="45%" />
</div>`} />
      </Section>

      {/* Kdy použít skeleton vs spinner */}
      <Section
        id="skeleton-vs-spinner"
        title="Skeleton vs spinner vs progress"
        description="Výběr závisí na době čekání, předvídatelnosti struktury a typu operace."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 600 }}>
            {[
              { pattern: 'Skeleton UI',         when: 'Načítání stránky, seznamu, karet, dat > 200ms', avoid: 'Krátké operace < 200ms, neznámá struktura' },
              { pattern: 'Spinner (inline)',     when: 'Tlačítko/akce čeká na odpověď serveru',         avoid: 'Celostránkové načítání — použij skeleton' },
              { pattern: 'Progress bar',         when: 'Operace s měřitelným postupem (upload, build)', avoid: 'Operace bez known progress (API fetch)' },
              { pattern: 'Progress indeterminate', when: 'Operace kde neznáme % — ale víme že běží',   avoid: 'Operace > 10s — raději ukaž odhad' },
            ].map(({ pattern, when, avoid }) => (
              <div key={pattern} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 10, padding: '9px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'start' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#B8956A' }}>{pattern}</span>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#40A055', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Použij kdy</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{when}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '0.5625rem', color: '#C04040', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Vyhni se</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{avoid}</p>
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      {/* Timeout pravidla */}
      <Section
        id="timeout"
        title="Timeoutová pravidla"
        description="Skeleton nesmí trvat neomezeně — po timeoutu přejdi na error stav."
      >
        <Preview dark={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 560 }}>
            {[
              { time: '0–200ms',   state: 'Žádný indikátor',     color: '#40A055', note: 'Optimistické UI — zobraz výsledek okamžitě (pro rychlé lokální operace).' },
              { time: '200–500ms', state: 'Skeleton nebo spinner', color: '#4080C0', note: 'Začni zobrazovat skeleton — uživatel začíná čekat.' },
              { time: '500ms+',    state: 'Skeleton pokračuje',   color: '#C08040', note: 'Skeleton je aktivní — struktura je viditelná.' },
              { time: '8–12s',     state: 'Timeout → Error',      color: '#C04040', note: 'Přejdi na error stav s Retry. Skeleton nesmí trvat věčně.' },
            ].map(({ time, state, color, note }) => (
              <div key={time} style={{ display: 'grid', gridTemplateColumns: '90px 160px 1fr', gap: 10, padding: '9px 12px', background: '#12102A', border: '1px solid #8F745418', borderRadius: 3, alignItems: 'start' }}>
                <code style={{ fontSize: '0.75rem', color, fontWeight: 700 }}>{time}</code>
                <span style={{ fontSize: '0.8125rem', color: '#F0E6D3' }}>{state}</span>
                <span style={{ fontSize: '0.75rem', color: '#8F9CB3', lineHeight: 1.4 }}>{note}</span>
              </div>
            ))}
          </div>
        </Preview>
        <CodeBlock code={`// Timeout vzor
const TIMEOUT_MS = 10_000

useEffect(() => {
  const timer = setTimeout(() => {
    if (isLoading) setHasTimedOut(true)
  }, TIMEOUT_MS)
  return () => clearTimeout(timer)
}, [isLoading])

return hasTimedOut ? (
  <ErrorState onRetry={reload} />
) : isLoading ? (
  <SkeletonCard />
) : (
  <Card data={data} />
)`} />
      </Section>

      {/* Pravidla */}
      <Section id="pravidla" title="Pravidla">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Skeleton musí kopírovat layout finálního obsahu — stejný počet řádků, stejné proporce.</p>
          <p>✓ Shimmer animace: 1.2–1.6s, ease-in-out, horizontální přechod. Příliš rychlý shimmer je rušivý.</p>
          <p>✓ Po timeoutu (8–12s) vždy přejdi na error stav s Retry — nikdy nenechej skeleton věčně.</p>
          <p>✓ Respektuj <code className="text-neutral-300">prefers-reduced-motion</code> — bez shimmer, statický skelet.</p>
          <p>✗ Nezobrazuj skeleton pro operace kratší než 200ms — bliknutí skeletonu je horší než nic.</p>
          <p>✗ Nepoužívej skeleton pro neznámou strukturu — tam patří spinner nebo loading text.</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
