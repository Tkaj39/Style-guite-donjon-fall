/* ── EditableGameBoard ─────────────────────────────────────────────────────
   Editable copy of the ScreensPage HexGrid. Each cell is clickable; the
   selected die's current cell renders in `selected` state, and while
   `isPlacing` is true, empty cells render in `move` state as placement
   targets. Pointy-top layout, rows auto-centered. */
import HexTile from '../../lib/donjon/HexTile'
import DieFace from '../../lib/donjon/DieFace'

const GRASS_TEXTURE = '/textures/grass_tile_1024x1024.jpg'

export default function EditableGameBoard({
  board,
  selectedDieId,
  isPlacing,
  onCellClick,
  cellW = 42,
  cellH = 48,
  gap = 0,
}) {
  const dieTop = Math.round(cellH / 2) - 12
  const rowH   = Math.round(cellH * 0.75) + gap
  const colW   = cellW + gap

  const maxCols = Math.max(...board.map(r => r.length))
  const totalW  = maxCols * colW - gap
  const totalH  = (board.length - 1) * rowH + cellH

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      backgroundImage: `url(${GRASS_TEXTURE})`,
      backgroundSize: '256px 256px', backgroundRepeat: 'repeat',
    }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', width: totalW, height: totalH, flexShrink: 0 }}>
          {board.map((row, ri) =>
            row.map((h, ci) => {
              const baseX = (maxCols - row.length) * colW / 2
              const x = baseX + ci * colW
              const y = ri * rowH

              const isSelectedDieCell = h.die && h.die.id === selectedDieId
              const isEmpty = !h.die && h.property !== 'base'
              const showMoveTarget = isPlacing && isEmpty

              // Resolved state: placement highlighting wins; otherwise
              // selected die cell gets 'selected' state; otherwise keep
              // the cell's intrinsic state.
              let state = h.state
              if (showMoveTarget) state = 'move'
              else if (isSelectedDieCell) state = 'selected'

              return (
                <div
                  key={`${ri}-${ci}`}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    cursor: 'pointer',
                  }}
                  onClick={() => onCellClick(ri, ci)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onCellClick(ri, ci)
                    }
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: cellW, height: cellH,
                    overflow: 'visible',
                  }}>
                    <HexTile
                      property={h.property}
                      focal={h.focal}
                      state={state}
                      owner={h.owner}
                      size="sm"
                      texture={GRASS_TEXTURE}
                    />
                    {h.die && (
                      <div style={{
                        position: 'absolute',
                        top: dieTop,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        pointerEvents: 'none',
                      }}>
                        <DieFace
                          value={h.die.v}
                          playerColor={h.die.c}
                          size="xs"
                          state={isSelectedDieCell ? 'selected' : 'default'}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
