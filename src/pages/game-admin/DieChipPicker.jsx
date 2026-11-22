/* ── DieChipPicker ───────────────────────────────────────────────────────
   Horizontal scrollable row of die chips used by the Value + Position
   admin tools. Each chip = small DieFace + "r{row}c{col}" label. Selected
   chip gets an accent outline. Page-local. */
import DieFace from '../../lib/donjon/DieFace'
import { accent, borderDefault, surface2, surface3, textMid, textLow } from '../../lib/tkajui/tokens'

export default function DieChipPicker({ dice, selectedDieId, onSelectDie }) {
  if (!dice.length) {
    return (
      <p style={{ margin: 0, fontSize: '0.75rem', color: textLow }}>
        Žádná kostka na plánu.
      </p>
    )
  }
  return (
    <div style={{
      display: 'flex', gap: 8, overflowX: 'auto',
      padding: '4px 2px 10px', scrollbarWidth: 'thin',
    }}>
      {dice.map(d => {
        const isSelected = d.id === selectedDieId
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => onSelectDie(d.id)}
            style={{
              flexShrink: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4,
              padding: '6px 8px 4px',
              background: isSelected ? surface3 : surface2,
              border: `1px solid ${isSelected ? accent : borderDefault}`,
              borderRadius: 6,
              cursor: 'pointer',
              boxShadow: isSelected ? `0 0 0 1px ${accent}55` : 'none',
              transition: 'all 0.12s',
            }}
          >
            <DieFace value={d.value} playerColor={d.playerColor} size="xs" />
            <span style={{
              fontSize: '0.5625rem', color: isSelected ? accent : textMid,
              fontVariantNumeric: 'tabular-nums',
            }}>
              r{d.row}c{d.col}
            </span>
          </button>
        )
      })}
    </div>
  )
}
