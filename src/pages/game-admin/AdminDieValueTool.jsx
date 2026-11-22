/* ── AdminDieValueTool ─────────────────────────────────────────────────── */
import Button from '../../lib/tkajui/Button'
import DieChipPicker from './DieChipPicker'
import { textMid, textLow } from '../../lib/tkajui/tokens'

export default function AdminDieValueTool({
  dice,
  selectedDieId,
  onSelectDie,
  onChangeValue,
}) {
  const disabled = selectedDieId == null
  const selected = dice.find(d => d.id === selectedDieId)

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

      <div>
        <label style={{
          display: 'block', margin: '0 0 6px',
          fontSize: '0.6875rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: textMid,
        }}>
          Nová hodnota
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {[1, 2, 3, 4, 5, 6].map(v => {
            const isCurrent = selected && selected.value === v
            return (
              <Button
                key={v}
                size="sm"
                variant={isCurrent ? 'primary' : 'default'}
                disabled={disabled}
                onClick={() => !disabled && onChangeValue(selectedDieId, v)}
              >
                {v}
              </Button>
            )
          })}
        </div>
        {disabled && (
          <p style={{ margin: '8px 0 0', fontSize: '0.6875rem', color: textLow }}>
            Vyber kostku nahoře.
          </p>
        )}
      </div>
    </div>
  )
}
