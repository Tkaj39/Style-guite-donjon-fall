/* ── DiceTower (donjon-fall-ui) ──────────────────────────────────────
   Stacked dice forming a "tower" — the core game piece of Donjon Fall.
   Each die has its own value (1–6) and playerColor, so a tower can
   represent a single-owner stack, a captured tower (top owner controls
   it), or a contested tower with mixed colors.

   Bottom die in the `dice` array is the foundation; the last die is on
   top. The top die owner controls the tower. Dice are overlapped so
   ~peek px of each lower die is still visible — matches the in-game
   look where you can see the colors stacked through.

   Hover regions
   ─────────────
   The tower exposes TWO independent hover targets:
     • the TOP die (controlling die) — fires `onTopHover`
     • the REST of the stack (peeks of all lower dice) — fires
       `onTowerHover`
   The HOVER SIGNALS are mutually exclusive — hovering the top die
   does NOT register as a tower hover. But the VISUAL glow follows
   game semantics: hovering the top region lights up the top die only
   (strong gold), hovering the tower region lights up the WHOLE tower
   (top + lower peeks, softer gold) because the dice belong to the
   same physical piece. The same split applies to click — `onTopClick`
   vs `onTowerClick`.

   `splitHover` (default true) is a desktop-only contract. On touch
   devices the game UI typically picks "move die" vs "move tower" via
   visible buttons instead — pass `splitHover={false}` and the whole
   tower becomes a single hover/click target firing `onTowerHover` /
   `onTowerClick`. `onTopHover` / `onTopClick` become inert. Glow
   collapses to the unified tower glow.
   ─────────────────────────────────────────────────────────────────── */
import { useRef, useState } from 'react'
import DieFace from './DieFace'
import { gold, goldDim, textHigh, textMid, borderDefault } from './tokens'

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
 *
 * @param {(hovered: boolean) => void} [onTopHover]    Fires when cursor enters / leaves the top die. (splitHover only)
 * @param {(hovered: boolean) => void} [onTowerHover]  Fires when cursor enters / leaves the tower region.
 *                                                     With splitHover=true this is the peeks only; with
 *                                                     splitHover=false it's the entire tower.
 * @param {(e: MouseEvent) => void}    [onTopClick]    Click on the top die. (splitHover only)
 * @param {(e: MouseEvent) => void}    [onTowerClick]  Click anywhere on the tower region.
 * @param {boolean} [splitHover=true]                  When false, top die and lower peeks merge into one
 *                                                     hover/click target — useful on touch where the
 *                                                     "die vs. tower" choice is exposed via buttons.
 */
export default function DiceTower({
  dice = [],
  size = 'md',
  selected = false,
  label,
  showBase = false,
  emptyHint = '—',
  onTopHover,
  onTowerHover,
  onTopClick,
  onTowerClick,
  splitHover = true,
  className,
  style,
  ...rest
}) {
  const s = SIZE[size] ?? SIZE.md
  const isEmpty = dice.length === 0
  const topIndex = dice.length - 1

  // Local hover state — drives the visual glow only. Parents that also
  // want the signal pass `onTopHover` / `onTowerHover` callbacks.
  const [hoverTop, setHoverTop] = useState(false)
  const [hoverTower, setHoverTower] = useState(false)

  // For the tower region (multiple separate die wrappers, one per
  // lower die), we use a ref-counted enter/leave so moving the cursor
  // between two adjacent peek strips doesn't blink the hover state.
  const towerEnterCount = useRef(0)

  const enterTop = () => {
    setHoverTop(true)
    onTopHover?.(true)
  }
  const leaveTop = () => {
    setHoverTop(false)
    onTopHover?.(false)
  }
  const enterTower = () => {
    towerEnterCount.current += 1
    if (towerEnterCount.current === 1) {
      setHoverTower(true)
      onTowerHover?.(true)
    }
  }
  const leaveTower = () => {
    towerEnterCount.current = Math.max(0, towerEnterCount.current - 1)
    if (towerEnterCount.current === 0) {
      setHoverTower(false)
      onTowerHover?.(false)
    }
  }

  // Render TOP-to-BOTTOM (column flex, dice array reversed).
  // ordered[0] = top of tower → paints first, sits at the top of the
  // visual stack and wins z-stack; ordered[last] = bottom of tower →
  // most overlapped. See the comment in fix/dice-tower-overlap for
  // why we don't use column-reverse.
  const ordered = [...dice].reverse()

  // Glow rules:
  //   • top die hover  → strong glow on TOP only
  //   • tower hover    → softer glow on WHOLE tower (lower peeks + the top
  //                      die above them) — the lower dice belong to the
  //                      same physical structure as the top die, so a
  //                      "tower" hover lights up the whole piece
  //   • selected (no hover handlers wired) → fall back to a top-die glow
  const TOP_HOVER_GLOW   = `drop-shadow(0 0 6px ${gold}AA)`
  const TOWER_HOVER_GLOW = `drop-shadow(0 0 5px ${gold}66)`

  // Selected falls back to the top-die glow only when no hover handlers
  // are wired — otherwise hover wins and we don't want the static glow
  // competing with cursor feedback.
  const selectedFallbackOnTop = selected && !onTopHover && !onTowerHover
  const topFilter   = hoverTop   ? TOP_HOVER_GLOW
                   : hoverTower ? TOWER_HOVER_GLOW
                   : (selectedFallbackOnTop ? TOP_HOVER_GLOW : undefined)
  const lowerFilter = hoverTower ? TOWER_HOVER_GLOW : undefined

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
        flexDirection: 'column',
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
          ordered.map((die, i) => {
            // i runs 0..N-1 over `ordered`. Matching index in the caller's
            // `dice` array (for state precedence below) is:
            const origIndex = dice.length - 1 - i
            const isTop = i === 0
            // When splitHover is on, the top die has its own region; when
            // off, EVERY die belongs to the shared "tower" region. That
            // single switch covers handlers, glow, cursor and the data
            // attribute used for testing.
            const belongsToTopRegion = splitHover && isTop
            const hoverProps = belongsToTopRegion
              ? {
                  onMouseEnter: enterTop,
                  onMouseLeave: leaveTop,
                  onClick: onTopClick,
                }
              : {
                  onMouseEnter: enterTower,
                  onMouseLeave: leaveTower,
                  onClick: onTowerClick,
                }
            const interactive = belongsToTopRegion
              ? Boolean(onTopHover || onTopClick)
              : Boolean(onTowerHover || onTowerClick)
            return (
              <div
                key={origIndex}
                data-hover-target={belongsToTopRegion ? 'top' : 'tower'}
                {...hoverProps}
                style={{
                  position: 'relative',
                  zIndex: dice.length - i,  // top die (i=0) wins
                  marginTop: isTop ? 0 : -(s.box - s.peek),
                  cursor: interactive ? 'pointer' : undefined,
                  filter: belongsToTopRegion ? topFilter : lowerFilter,
                  transition: 'filter 120ms ease',
                }}
              >
                <DieFace
                  value={die.value}
                  playerColor={die.playerColor ?? goldDim}
                  size={size}
                  state={die.state ?? (origIndex === topIndex && selected ? 'selected' : 'default')}
                />
              </div>
            )
          })
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
