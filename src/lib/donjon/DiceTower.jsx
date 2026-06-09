/* ── DiceTower (donjon-fall-ui) ──────────────────────────────────────
   Stacked dice forming a "tower" — the core game piece of Donjon Fall.
   Each die has its own value (1–6) and playerColor, so a tower can
   represent a single-owner stack, a captured tower (top owner controls
   it), or a contested tower with mixed colors.

   Bottom die in the `dice` array is the foundation; the last die is on
   top. The top die owner controls the tower. Dice are overlapped so
   ~peek px of each lower die is still visible — matches the in-game
   look where you can see the colors stacked through.

   Built on DieFace — sizing, state and color logic stay in the single
   die. DiceTower only handles stacking, ground shadow, optional label.
   ─────────────────────────────────────────────────────────────────── */
import DieFace from './DieFace'
import { goldDim, textHigh, textMid, borderDefault } from './tokens'

/**
 * @typedef {object} DiceTowerEntry
 * @prop {number} value           Die value 1–6.
 * @prop {string} [playerColor]   Hex color (from playerColors). Defaults to goldDim.
 * @prop {'default'|'selected'|'rerolled'|'damaged'} [state]
 *                                Per-die DieFace state override.
 */

// Tower geometry per size — `box` mirrors DieFace.sizeMap.box, `peek`
// is how many px of each lower die remain visible after overlap. Tuned
// so a 3-die tower fits cleanly on the corresponding hex (see HexTile
// sizeMap), with comfortable readability.
const SIZE = {
  xs: { box: 24, peek: 10 },
  sm: { box: 32, peek: 16 },
  md: { box: 48, peek: 20 },
  lg: { box: 64, peek: 26 },
}

/**
 * @param {DiceTowerEntry[]} dice            Stack bottom → top.
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']  Die size (tower height = N × peek + box).
 * @param {boolean} [selected]               Highlights the top (owning) die.
 * @param {React.ReactNode} [label]          Rendered under the tower (player name, "Vez 1", …).
 * @param {boolean} [showBase=false]         Draws a faint ground plate under the tower.
 * @param {string} [emptyHint='—']           Glyph shown when dice is empty (lost tower).
 */
export default function DiceTower({
  dice = [],
  size = 'md',
  selected = false,
  label,
  showBase = false,
  emptyHint = '—',
  className,
  style,
  ...rest
}) {
  const s = SIZE[size] ?? SIZE.md
  const isEmpty = dice.length === 0
  const topIndex = dice.length - 1

  // Reverse for rendering — visually the top die must paint last so it
  // wins z-stack and we keep the natural DOM order (top in the array =
  // top of the tower). We use flex-direction: column-reverse instead so
  // the bottom die in the array stays at the bottom of the screen.
  return (
    <div
      className={className}
      role={dice.length > 0 ? 'group' : undefined}
      aria-label={typeof label === 'string'
        ? `Dice tower — ${label} — ${dice.length} dice`
        : (dice.length > 0 ? `Dice tower — ${dice.length} dice` : 'Empty dice tower')}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        ...style,
      }}
      {...rest}
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column-reverse',  // dice[0] at the bottom visually
        alignItems: 'center',
        // Reserve full height so layout doesn't jitter as the tower shrinks
        minHeight: s.box,
      }}>
        {isEmpty ? (
          <span aria-hidden="true" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: s.box,
            height: s.box,
            color: goldDim,
            fontSize: '0.875rem',
            opacity: 0.6,
          }}>
            {emptyHint}
          </span>
        ) : (
          dice.map((die, i) => (
            <div key={i} style={{
              position: 'relative',
              zIndex: i + 1,  // bottom-to-top, top wins
              // i === 0 (bottom) = no overlap; all others pulled up by (box-peek)
              marginTop: i === 0 ? 0 : -(s.box - s.peek),
            }}>
              <DieFace
                value={die.value}
                playerColor={die.playerColor ?? goldDim}
                size={size}
                state={die.state ?? (i === topIndex && selected ? 'selected' : 'default')}
              />
            </div>
          ))
        )}
        {showBase && !isEmpty && (
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: '50%',
            bottom: -4,
            transform: 'translateX(-50%)',
            width: Math.round(s.box * 0.85),
            height: 3,
            background: `radial-gradient(ellipse, ${borderDefault} 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.7,
            zIndex: 0,
          }} />
        )}
      </div>
      {label != null && (
        <span style={{
          fontSize: '0.6875rem',
          color: textMid,
          letterSpacing: '0.04em',
        }}>
          {label}
        </span>
      )}
      {dice.length > 0 && (
        // Visually-hidden roster for screen readers
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', color: textHigh }}>
          {dice.map((d, i) => `Die ${i + 1}: ${d.value}`).join(', ')}
        </span>
      )}
    </div>
  )
}
