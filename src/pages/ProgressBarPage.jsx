import { useState, useEffect, useRef } from 'react'
import ProgressBar from '../lib/tkajui/ProgressBar'
import DonjonButton from '../lib/donjon/DonjonButton'
import { ShowcasePage, Section, Preview, CodeBlock } from '../components/layout/ShowcasePage'

/* ── Animovaný demo ── */
function AnimatedDemo() {
  const [value, setValue] = useState(0)
  const [running, setRunning] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (!running) { cancelAnimationFrame(rafRef.current); return }
    const duration = 3500
    startRef.current = performance.now() - (value / 100) * duration

    const tick = (now) => {
      const elapsed = now - startRef.current
      const next = Math.min(100, (elapsed / duration) * 100)
      setValue(next)
      if (next < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setRunning(false)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running])  // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => { setValue(0); setRunning(false) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400 }}>
      <ProgressBar value={value} label="Načítání herních dat…" showValue variant="default" size="md" />
      <div style={{ display: 'flex', gap: 8 }}>
        <DonjonButton size="sm" onClick={() => setRunning(true)} disabled={running || value === 100}>
          Spustit
        </DonjonButton>
        <DonjonButton size="sm" onClick={reset}>
          Reset
        </DonjonButton>
      </div>
    </div>
  )
}

/* ── HP bar demo (herní použití) ── */
function HpBar({ label, value, max, variant }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: '0.75rem', color: '#8F9CB3', width: 64, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1 }}>
        <ProgressBar value={value} max={max} size="sm" variant={variant} />
      </div>
      <span style={{ fontSize: '0.6875rem', color: '#8F9CB3', width: 42, textAlign: 'right', flexShrink: 0 }}>
        {value} / {max}
      </span>
    </div>
  )
}

export default function ProgressBarPage() {
  return (
    <ShowcasePage
      title="Progress Bar"
      description="Lineární ukazatel průběhu pro loading stavy, herní statistiky nebo vícekrokové procesy. Determinate i indeterminate (animovaný shimmer) mód."
      componentSlug="progress-bar"
    >

      {/* Hodnoty */}
      <Section
        id="values"
        title="Hodnoty"
        description="Determinate mód — value 0 až 100 (nebo vlastní max)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 400 }}>
            {[0, 25, 50, 75, 100].map(v => (
              <ProgressBar key={v} value={v} label={`${v} %`} showValue />
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<ProgressBar value={75} />
<ProgressBar value={3} max={10} label="Kolo" showValue />`} />
      </Section>

      {/* Varianty */}
      <Section
        id="variants"
        title="Varianty"
        description="Pět barevných variant — default (zlatá), success, danger, warning, info."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 400 }}>
            {[
              { variant: 'default', label: 'Default',  value: 70 },
              { variant: 'success', label: 'Success',  value: 85 },
              { variant: 'danger',  label: 'Danger',   value: 20 },
              { variant: 'warning', label: 'Warning',  value: 45 },
              { variant: 'info',    label: 'Info',     value: 60 },
            ].map(({ variant, label, value }) => (
              <ProgressBar key={variant} value={value} label={label} showValue variant={variant} />
            ))}
          </div>
        </Preview>
        <CodeBlock code={`<ProgressBar value={85} variant="success" label="HP" showValue />
<ProgressBar value={20} variant="danger"  label="Životy" showValue />
<ProgressBar value={45} variant="warning" label="Štít" showValue />`} />
      </Section>

      {/* Velikosti */}
      <Section
        id="sizes"
        title="Velikosti"
        description="Tři výšky — sm (4 px), md (8 px, výchozí), lg (14 px)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 400 }}>
            <ProgressBar value={65} size="sm" label="Small (4 px)" />
            <ProgressBar value={65} size="md" label="Medium (8 px)" />
            <ProgressBar value={65} size="lg" label="Large (14 px)" />
          </div>
        </Preview>
        <CodeBlock code={`<ProgressBar value={65} size="sm" />
<ProgressBar value={65} size="md" />
<ProgressBar value={65} size="lg" />`} />
      </Section>

      {/* Indeterminate */}
      <Section
        id="indeterminate"
        title="Indeterminate"
        description="Animovaný shimmer pro případy, kdy není znám konečný stav (čekání na server, inicializace)."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 400 }}>
            <ProgressBar indeterminate label="Připojování k serveru…" />
            <ProgressBar indeterminate label="Načítání dat…" variant="info" size="sm" />
            <ProgressBar indeterminate label="Generování mapy…" variant="success" size="lg" />
          </div>
        </Preview>
        <CodeBlock code={`<ProgressBar indeterminate label="Připojování…" />
<ProgressBar indeterminate variant="info" size="sm" />`} />
      </Section>

      {/* Animovaný demo */}
      <Section
        id="animated"
        title="Determinate s animací"
        description="Přechod šířky je plynulý (transition: width 0.35s ease) — stačí měnit value."
      >
        <Preview>
          <AnimatedDemo />
        </Preview>
        <CodeBlock code={`const [value, setValue] = useState(0)

// Stačí měnit value — přechod je automatický
<ProgressBar value={value} label="Načítání…" showValue />`} />
      </Section>

      {/* Herní použití */}
      <Section
        id="game-usage"
        title="Herní použití"
        description="Progress bar jako HP / štít / VP lišta — typická varianta v herním UI."
      >
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 360 }}>
            <HpBar label="HP"        value={34}  max={50}  variant="success" />
            <HpBar label="Štít"      value={12}  max={30}  variant="info" />
            <HpBar label="Útok"      value={8}   max={10}  variant="warning" />
            <HpBar label="Životy"    value={1}   max={5}   variant="danger" />
            <HpBar label="VP"        value={3}   max={5}   variant="default" />
          </div>
        </Preview>
        <CodeBlock code={`<ProgressBar value={34} max={50} size="sm" variant="success" />
<ProgressBar value={1}  max={5}  size="sm" variant="danger" />
<ProgressBar value={3}  max={5}  size="sm" variant="default" />`} />
      </Section>

      {/* Pravidla */}
      <Section
        id="pravidla"
        title="Pravidla použití"
      >
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>✓ Pro loading stavů delší než ~300 ms zobrazuj vždy indikátor — prázdná obrazovka působí jako zamrzlá.</p>
          <p>✓ Pokud neznáš délku operace, použij indeterminate. Jakmile máš data o průběhu, přepni na determinate.</p>
          <p>✓ Herní statistiky (HP, VP) preferuj v size="sm" — nezabírají zbytečně místo v herním UI.</p>
          <p>✓ Variant danger pro nízké hodnoty (HP pod 20 %), success pro plné nebo výborné stavy.</p>
          <p>✗ Nezobrazuj progress bar pro operace kratší než ~300 ms — způsobuje nepříjemné záblesky.</p>
          <p>✗ Nepřidávej interaktivitu na progress bar — to patří do Slideru (Range input).</p>
        </div>
      </Section>

    </ShowcasePage>
  )
}
