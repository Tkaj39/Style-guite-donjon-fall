/* ── AdminPhaseTool ──────────────────────────────────────────────────────
   QA/debug control over the current turn number + game phase. Uses TkajUI
   NumberInput for the turn, donjon PhaseIndicator for the phases, and
   two TkajUI buttons to step previous / next.
   Page-local — not a library component. */
import NumberInput from '../../lib/tkajui/NumberInput'
import Button from '../../lib/tkajui/Button'
import PhaseIndicator from '../../lib/donjon/PhaseIndicator'
import { textMid, textHigh } from '../../lib/tkajui/tokens'

export default function AdminPhaseTool({
  phases,
  currentPhase,
  onPhaseChange,
  turn,
  onTurnChange,
}) {
  const idx = phases.findIndex(p => p.id === currentPhase)
  const canPrev = idx > 0
  const canNext = idx >= 0 && idx < phases.length - 1

  const prev = () => canPrev && onPhaseChange(phases[idx - 1].id)
  const next = () => canNext && onPhaseChange(phases[idx + 1].id)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={{
          display: 'block', margin: '0 0 6px',
          fontSize: '0.6875rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: textMid,
        }}>
          Posloupnost tahů
        </label>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: textMid }}>
          Číslo aktuálního tahu.
        </p>
        <NumberInput
          value={turn}
          onChange={onTurnChange}
          min={1}
          step={1}
          size="sm"
        />
      </div>

      <div>
        <label style={{
          display: 'block', margin: '0 0 8px',
          fontSize: '0.6875rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: textMid,
        }}>
          Fáze tahu
        </label>
        <div style={{ padding: '4px 8px' }}>
          <PhaseIndicator
            phases={phases}
            currentPhase={currentPhase}
            onPhaseClick={onPhaseChange}
            size="sm"
          />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button size="sm" variant="default" onClick={prev} disabled={!canPrev}>
            ← Předchozí fáze
          </Button>
          <Button size="sm" variant="default" onClick={next} disabled={!canNext}>
            Další fáze →
          </Button>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: '0.6875rem', color: textHigh, opacity: 0.6 }}>
          Fáze lze přepnout i klikem na puntík v indikátoru nahoře.
        </p>
      </div>
    </div>
  )
}
