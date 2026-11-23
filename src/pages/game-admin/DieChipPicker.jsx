/* ── DieChipPicker ───────────────────────────────────────────────────────
   Chip picker used by the admin dice panel. Layout modes:
     - omit both → horizontal scrollable row of individual chips
     - columns={N} → N-column grid of individual chips
     - groupByColor → one dark block per player colour, each a vertical
       stack of borderless dice; selected die itself glows instead of
       getting a frame.
   Page-local. */
import DieFace from '../../lib/donjon/DieFace'
import { accent, borderDefault, surface2, surface3, textMid, textLow } from '../../lib/tkajui/tokens'
import { gold, goldDim, bgDeep } from '../../lib/donjon/tokens'
import { octagon, octagonInner } from '../../lib/shared/octagon'
import { RohOrnament, ornamentHForCx } from '../../lib/donjon/Ornaments'
import { useId } from 'react'

function GroupedByColor({ dice, selectedDieId, onSelectDie }) {
  // Preserve first-seen order per playerColor so the groups show up
  // in the order the dice sit on the board.
  const groups = []
  const byColor = new Map()
  for (const d of dice) {
    if (!byColor.has(d.playerColor)) {
      const g = { color: d.playerColor, items: [] }
      byColor.set(d.playerColor, g)
      groups.push(g)
    }
    byColor.get(d.playerColor).items.push(d)
  }

  // Octagonal shell geometry — same pattern as DonjonCard / EventLog.
  const cx   = 8
  const rohH = ornamentHForCx(cx, 'roh')
  const rawId = useId()
  const uidBase = rawId.replace(/:/g, '')

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))`,
      gap: 6,
      alignItems: 'start',
    }}>
      {groups.map((g, gi) => {
        const uid = `${uidBase}g${gi}`
        return (
          /* Outer border shell — gold rim around the clip-path octagon. */
          <div key={gi} style={{
            clipPath: octagon(cx),
            background: goldDim,
            padding: 1,
          }}>
            {/* Inner panel — donjon dark bg + the actual dice stack. */}
            <div style={{
              position: 'relative',
              clipPath: octagonInner(cx, 1),
              background: bgDeep,
              padding: '10px 4px 10px',
              display: 'flex', flexDirection: 'column',
              gap: 4,
            }}>
              {g.items.map(d => {
                const isSelected = d.id === selectedDieId
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => onSelectDie(d.id)}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 1,
                      padding: 0,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      opacity: selectedDieId && !isSelected ? 0.45 : 1,
                      transition: 'opacity 0.12s',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span style={{
                      display: 'inline-flex',
                      filter: isSelected ? `drop-shadow(0 0 6px ${gold}) drop-shadow(0 0 2px ${gold})` : 'none',
                      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.12s, filter 0.12s',
                    }}>
                      <DieFace value={d.value} playerColor={d.playerColor} size="xs" />
                    </span>
                    <span style={{
                      fontSize: '0.5rem',
                      color: isSelected ? gold : textMid,
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '0.02em',
                    }}>
                      r{d.row}c{d.col}
                    </span>
                  </button>
                )
              })}

              {/* Corner ornaments — match EventLog / DonjonCard treatment. */}
              <RohOrnament h={rohH} uid={`${uid}l`} />
              <RohOrnament h={rohH} uid={`${uid}r`} flip />
              <RohOrnament h={rohH} uid={`${uid}lb`} bottom />
              <RohOrnament h={rohH} uid={`${uid}rb`} bottom flip />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function DieChipPicker({ dice, selectedDieId, onSelectDie, columns, groupByColor }) {
  if (!dice.length) {
    return (
      <p style={{ margin: 0, fontSize: '0.75rem', color: textLow }}>
        Žádná kostka na plánu.
      </p>
    )
  }

  if (groupByColor) {
    return <GroupedByColor dice={dice} selectedDieId={selectedDieId} onSelectDie={onSelectDie} />
  }

  const containerStyle = columns
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 3,
        padding: 1,
      }
    : {
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        padding: '4px 2px 10px',
        scrollbarWidth: 'thin',
      }

  const chipPadding = columns ? '2px 4px 2px' : '6px 8px 4px'
  const chipGap     = columns ? 1 : 4

  return (
    <div style={containerStyle}>
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
              gap: chipGap,
              padding: chipPadding,
              background: isSelected ? surface3 : surface2,
              border: `1px solid ${isSelected ? accent : borderDefault}`,
              borderRadius: 4,
              cursor: 'pointer',
              boxShadow: isSelected ? `0 0 0 1px ${accent}55` : 'none',
              transition: 'all 0.12s',
            }}
          >
            <DieFace value={d.value} playerColor={d.playerColor} size="xs" />
            <span style={{
              fontSize: '0.5rem', color: isSelected ? accent : textMid,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.02em',
            }}>
              r{d.row}c{d.col}
            </span>
          </button>
        )
      })}
    </div>
  )
}
