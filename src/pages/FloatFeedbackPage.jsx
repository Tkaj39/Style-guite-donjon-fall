import { useState } from 'react'
import FloatFeedback from '../lib/donjon/FloatFeedback'
import { ShowcasePage, Section, Preview, CodeBlock } from '../styleguide/ShowcasePage'
import {
  bg4, bgDeep, dangerColor, gainColor, gold, goldDim,
} from '../lib/donjon/tokens'

/* ── Trigger tlačítko ── */
function TriggerButton({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: 4,
        border: `1px solid ${color}55`,
        background: `${color}18`,
        color: color,
        fontSize: '0.75rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.15s',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => e.currentTarget.style.background = `${color}30`}
      onMouseLeave={e => e.currentTarget.style.background = `${color}18`}
    >
      {label}
    </button>
  )
}

/* ── Demo box — simuluje herní hex container ── */
function HexContainer({ children, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          position: 'relative',
          width: 64,
          height: 64,
          background: `linear-gradient(135deg, ${bg4} 0%, ${bgDeep} 100%)`,
          border: `1.5px solid ${goldDim}44`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simulace hex ikony */}
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
          <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" stroke={goldDim} strokeWidth="1.5" fill={`${goldDim}18`} />
        </svg>
        {children}
      </div>
      {label && <span className="text-[10px] text-neutral-600 font-mono">{label}</span>}
    </div>
  )
}

/* ── Varianta demo ── */
const VARIANTS = [
  { variant: 'gain',    label: 'gain',    text: '+1',     color: gainColor, desc: 'Zisk jednotky nebo akce' },
  { variant: 'loss',    label: 'loss',    text: '−1',     color: dangerColor, desc: 'Ztráta jednotky nebo HP' },
  { variant: 'vp',      label: 'vp',      text: '+1 VP',  color: gold, desc: 'Získání vítězných bodů' },
  { variant: 'neutral', label: 'neutral', text: 'skip',   color: goldDim, desc: 'Neutrální herní event' },
]

function VariantDemo({ variant, text, color, desc }) {
  const [key, setKey] = useState(0)
  const [visible, setVisible] = useState(false)

  const trigger = () => {
    setVisible(false)
    setTimeout(() => {
      setKey(k => k + 1)
      setVisible(true)
    }, 20)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <HexContainer label={variant}>
        <FloatFeedback
          text={text}
          variant={variant}
          visible={visible}
          animKey={key}
          onDone={() => setVisible(false)}
        />
      </HexContainer>
      <TriggerButton label={text} color={color} onClick={trigger} />
      <span className="text-[10px] text-neutral-600 text-center max-w-[80px] leading-snug">{desc}</span>
    </div>
  )
}

/* ── Animační timeline ── */
function AnimTimeline() {
  const frames = [
    { t: '0 %',   y: 0,   opacity: 0,   scale: 0.75, label: 'start' },
    { t: '20 %',  y: -8,  opacity: 1,   scale: 1.1,  label: 'pop in' },
    { t: '60 %',  y: -16, opacity: 1,   scale: 1,    label: 'stoupá' },
    { t: '100 %', y: -28, opacity: 0,   scale: 0.9,  label: 'fade out' },
  ]

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-40 flex items-end justify-around px-4 bg-neutral-950 rounded-lg border border-neutral-800">
        {/* Osa y */}
        {[0, -8, -16, -28].map(y => (
          <div
            key={y}
            className="absolute left-0 right-0 border-t border-neutral-800/60"
            style={{ bottom: `${((Math.abs(y)) / 28) * 80 + 10}%` }}
          >
            <span className="text-[9px] text-neutral-700 font-mono ml-2">{y}px</span>
          </div>
        ))}

        {frames.map(({ t, y, opacity, scale, label }) => (
          <div key={t} className="flex flex-col items-center gap-1" style={{ position: 'relative', bottom: 8 }}>
            <div
              className="flex items-center justify-center"
              style={{
                marginBottom: `${(Math.abs(y) / 28) * 80}px`,
                opacity,
                transform: `scale(${scale})`,
                color: gold,
                fontWeight: 700,
                fontSize: '0.6875rem',
                textShadow: '0 0 8px #FFC18399',
                whiteSpace: 'nowrap',
                transition: 'none',
              }}
            >
              +1 VP
            </div>
            <div className="w-px h-4 bg-neutral-700" />
            <span className="text-[9px] font-mono text-neutral-500">{t}</span>
            <span className="text-[9px] text-neutral-700">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-neutral-500">
        Keyframe <code className="text-brand-400 text-[11px]">float-feedback</code> — 700 ms, ease-out forwards. Definováno v <code className="text-neutral-500 text-[11px]">src/index.css</code>.
      </p>
    </div>
  )
}

/* ── Main ── */
export default function FloatFeedbackPage() {
  return (
    <ShowcasePage
      title="FloatFeedback"
      description="Krátká plovoucí zpětná vazba zobrazující herní event — zisk/ztráta jednotky, VP, nebo neutrální akce. Animuje se nahoru a zmizí za 700 ms. Vždy se renderuje jako absolutně pozicovaný child uvnitř position: relative containeru."
      componentSlug="float-feedback"
      library="donjon"
    >

      {/* ── Varianty ── */}
      <Section
        id="varianty"
        description="Čtyři varianty odpovídají typům herních eventů. Klikni na tlačítko pro spuštění animace."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Varianty</h2>
        <Preview>
          <div className="flex flex-wrap gap-10 justify-center py-4">
            {VARIANTS.map(v => <VariantDemo key={v.variant} {...v} />)}
          </div>
        </Preview>
      </Section>

      {/* ── Animace ── */}
      <Section
        id="animace"
        description="Keyframe průběh — element stoupá o 28 px a přechází z opacity 0 → 1 → 0 za 700 ms."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Animační průběh</h2>
        <AnimTimeline />
      </Section>

      {/* ── Props ── */}
      <Section id="props">
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-neutral-800">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900">
                <th className="px-3 py-2.5 font-semibold text-neutral-400 w-4">·</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Prop</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Type</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400 hidden sm:table-cell">Default</th>
                <th className="px-3 py-2.5 font-semibold text-neutral-400">Popis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {[
                { name: 'text',    type: 'string',                                    req: true,  def: null,       desc: 'Zobrazovaný text, např. "+1", "−1 HP", "+1 VP".' },
                { name: 'variant', type: "'gain'|'loss'|'vp'|'neutral'",              req: false, def: "'gain'",   desc: 'Barevná varianta eventu.' },
                { name: 'visible', type: 'boolean',                                   req: true,  def: null,       desc: 'Pokud false, element není v DOM.' },
                { name: 'animKey', type: 'string | number',                           req: false, def: '0',        desc: 'Změna hodnoty vynutí remount a restartuje animaci.' },
                { name: 'onDone',  type: '() => void',                               req: false, def: null,       desc: 'Callback volaný po skončení animace (onAnimationEnd).' },
                { name: 'style',   type: 'CSSProperties',                             req: false, def: null,       desc: 'Override pozicování — výchozí je horizontálně centrovaný nad parentem.' },
              ].map(({ name, type, req, def, desc }) => (
                <tr key={name} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="px-3 py-2.5">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${req ? 'bg-brand-500' : 'bg-neutral-700'}`} title={req ? 'required' : 'optional'} />
                  </td>
                  <td className="px-3 py-2.5"><code className="font-mono text-brand-300 text-[11px]">{name}</code></td>
                  <td className="px-3 py-2.5 max-w-[160px]"><code className="font-mono text-neutral-400 text-[10px] wrap-break-word">{type}</code></td>
                  <td className="px-3 py-2.5 hidden sm:table-cell">
                    {def ? <code className="font-mono text-neutral-500 text-[10px]">{def}</code> : <span className="text-neutral-700">—</span>}
                  </td>
                  <td className="px-3 py-2.5 text-neutral-400 text-[11px] leading-relaxed">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-4 px-3 py-2 border-t border-neutral-800 bg-neutral-900/50">
            <span className="flex items-center gap-1.5 text-[10px] text-neutral-600"><span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />required</span>
            <span className="flex items-center gap-1.5 text-[10px] text-neutral-600"><span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-700" />optional</span>
          </div>
        </div>
      </Section>

      {/* ── Použití ── */}
      <Section id="pouziti" description="Správný způsob integrace do herního containeru.">
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Použití</h2>
        <CodeBlock code={`import { useState } from 'react'
import FloatFeedback from 'donjon-fall-ui/FloatFeedback'

function HexTileWithFeedback() {
  const [key, setKey] = useState(0)
  const [visible, setVisible] = useState(false)

  const handleGain = () => {
    setKey(k => k + 1)   // remount = restart animace
    setVisible(true)
  }

  return (
    // ⚠ parent musí mít position: relative
    <div style={{ position: 'relative' }}>
      <HexTile />
      <FloatFeedback
        text="+1"
        variant="gain"
        visible={visible}
        animKey={key}
        onDone={() => setVisible(false)}
      />
    </div>
  )
}`} />

        <div className="mt-4 flex flex-col gap-2 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-1">Pravidla</p>
          {[
            'Parent musí mít position: relative — FloatFeedback je position: absolute.',
            'Pro restart animace změň animKey (nejlépe inkrementální čítač).',
            'visible={false} odstraní element z DOM — nepoužívej CSS display: none.',
            'onDone callback nastav visible na false pro čistý stav po animaci.',
            'Nepoužívej pro trvalé UI prvky — pouze pro krátké herní eventy.',
          ].map((rule, i) => (
            <div key={i} className="flex gap-2 text-[12px] text-neutral-400 leading-relaxed">
              <span className="text-brand-600 shrink-0 mt-0.5">·</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </Section>

    </ShowcasePage>
  )
}
