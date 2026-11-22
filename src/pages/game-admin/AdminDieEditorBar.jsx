/* ── AdminDieEditorBar ─────────────────────────────────────────────────────
   Slot-in replacement for MiniActionRow inside the game-admin DeviceFrame.
   Shown while a die is selected: row of 1-6 value chips + Position toggle
   + Clear selection.
   ────────────────────────────────────────────────────────────────────── */
import DieFace from '../../lib/donjon/DieFace'
import { gold, goldDim, bg2, textHigh, textLow } from '../../lib/donjon/tokens'

function ValueChip({ v, color, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        padding: 0,
        border: `1px solid ${active ? gold : goldDim}`,
        background: active ? bg2 : 'transparent',
        boxShadow: active ? `0 0 6px ${gold}55` : 'none',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'all 120ms',
      }}
    >
      <DieFace value={v} size="xs" playerColor={color} />
    </button>
  )
}

export default function AdminDieEditorBar({
  die,                 // currently selected die { id, playerColor, value, row, col }
  isPlacing,
  onChangeValue,       // (value) => void
  onStartPlacing,      // () => void
  onCancelPlacing,     // () => void
  onDeselect,          // () => void
}) {
  if (!die) return null

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '6px 12px',
      flexWrap: 'wrap',
    }}>
      {/* Die identifier */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: textLow, whiteSpace: 'nowrap',
      }}>
        <span style={{ color: textHigh }}>Kostka</span>
        <span>r{die.row}·c{die.col}</span>
      </div>

      {/* Values 1–6 */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {[1, 2, 3, 4, 5, 6].map(v => (
          <ValueChip
            key={v}
            v={v}
            color={die.playerColor}
            active={v === die.value}
            onClick={() => onChangeValue(v)}
          />
        ))}
      </div>

      {/* Position + Deselect */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <button
          type="button"
          onClick={isPlacing ? onCancelPlacing : onStartPlacing}
          style={{
            padding: '6px 12px',
            background: isPlacing ? gold : 'transparent',
            color: isPlacing ? bg2 : gold,
            border: `1px solid ${gold}`,
            borderRadius: 4,
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {isPlacing ? 'Zruš umístění' : 'Změnit pozici'}
        </button>
        <button
          type="button"
          onClick={onDeselect}
          title="Zruš výběr"
          style={{
            padding: '6px 10px',
            background: 'transparent',
            color: textLow,
            border: `1px solid ${goldDim}`,
            borderRadius: 4,
            fontSize: '0.6875rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
