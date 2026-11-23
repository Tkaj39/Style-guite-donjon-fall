/* ── AdminDieEditorBar ─────────────────────────────────────────────────────
   Slot-in replacement for MiniActionRow inside the game-admin DeviceFrame.
   Shown while a die is selected: row of 1-6 value chips + Position toggle
   + Clear selection. Wrapped in the donjon octagonal shell to match the
   other HUD panels (EventLog, DieChipPicker groups, DonjonCard).
   ────────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import DieFace from '../../lib/donjon/DieFace'
import { gold, goldDim, bg2, bgDeep, textHigh, textLow } from '../../lib/donjon/tokens'
import { octagon, octagonInner } from '../../lib/shared/octagon'
import { RohOrnament, ornamentHForCx } from '../../lib/donjon/Ornaments'

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

  const cx   = 10
  const rohH = ornamentHForCx(cx, 'roh')
  const rawId = useId()
  const uid   = rawId.replace(/:/g, '')

  return (
    <div style={{
      /* Shell is centered horizontally so it keeps the bottom-bar vibe
         without stretching across the full frame width. */
      display: 'flex',
      justifyContent: 'center',
      padding: '6px 8px 8px',
    }}>
      {/* Outer octagonal border shell — gold rim via border-trick. */}
      <div style={{
        clipPath: octagon(cx),
        background: goldDim,
        padding: 1,
      }}>
        {/* Inner panel — deep-blue fill + the actual controls. */}
        <div style={{
          position: 'relative',
          clipPath: octagonInner(cx, 1),
          background: bgDeep,
          padding: '10px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          {/* Die identifier */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: textLow, whiteSpace: 'nowrap',
            position: 'relative', zIndex: 1,
          }}>
            <span style={{ color: textHigh }}>Kostka</span>
            <span>r{die.row}·c{die.col}</span>
          </div>

          {/* Values 1–6 */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, position: 'relative', zIndex: 1 }}>
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1 }}>
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

          {/* Corner ornaments — match EventLog / DieChipPicker treatment. */}
          <RohOrnament h={rohH} uid={`${uid}l`} />
          <RohOrnament h={rohH} uid={`${uid}r`} flip />
          <RohOrnament h={rohH} uid={`${uid}lb`} bottom />
          <RohOrnament h={rohH} uid={`${uid}rb`} bottom flip />
        </div>
      </div>
    </div>
  )
}
