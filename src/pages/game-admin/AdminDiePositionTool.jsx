/* ── AdminDiePositionTool ──────────────────────────────────────────────── */
import Button from '../../lib/tkajui/Button'
import DieChipPicker from './DieChipPicker'
import { textMid, textLow, accent } from '../../lib/tkajui/tokens'

export default function AdminDiePositionTool({
  dice,
  selectedDieId,
  onSelectDie,
  isPlacing,
  onStartPlacing,
  onCancelPlacing,
}) {
  const hasSelection = selectedDieId != null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={{
          display: 'block', margin: '0 0 6px',
          fontSize: '0.6875rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: textMid,
        }}>
          Výběr kostky
        </label>
        <DieChipPicker
          dice={dice}
          selectedDieId={selectedDieId}
          onSelectDie={onSelectDie}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {!isPlacing ? (
          <Button
            size="sm"
            variant="default"
            disabled={!hasSelection}
            onClick={onStartPlacing}
          >
            Vybrat novou pozici
          </Button>
        ) : (
          <>
            <Button size="sm" variant="danger" onClick={onCancelPlacing}>
              Zruš umístění
            </Button>
            <p style={{
              margin: 0, fontSize: '0.75rem', color: accent,
              padding: '6px 2px',
            }}>
              Klikni na hex v mapě.
            </p>
          </>
        )}
        {!hasSelection && !isPlacing && (
          <p style={{ margin: 0, fontSize: '0.6875rem', color: textLow }}>
            Vyber kostku nahoře.
          </p>
        )}
      </div>
    </div>
  )
}
