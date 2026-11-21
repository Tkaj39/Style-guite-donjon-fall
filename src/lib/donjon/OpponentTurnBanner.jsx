/* ── OpponentTurnBanner ────────────────────────────────────────────────────
   HUD banner shown in place of the ActionBar when it is not this player's
   turn. Octagonal shell with a gold border; the body is painted in the
   on-turn player's DARK variant, the "<Name> turn" message in the PRIMARY
   variant — so the banner reads unmistakably as that player's color
   throughout.

   Drop-in for <ActionBar>: heights per size match ActionTile heights
   (xs 44, sm 72, md 96 px).
   ────────────────────────────────────────────────────────────────────── */
import { octagon, octagonInner } from '../shared/octagon'
import { gold } from './tokens'

/* Heights mirror ActionTile heights per size so the banner can swap in
   for <ActionBar> without resizing the HUD strip. */
const SIZE_DIMS = {
  xs: { h: 44, cx: 8,  padX: 18, fontSize: '0.75rem',  letterSpacing: '0.12em' },
  sm: { h: 72, cx: 10, padX: 28, fontSize: '1rem',     letterSpacing: '0.14em' },
  md: { h: 96, cx: 14, padX: 36, fontSize: '1.25rem',  letterSpacing: '0.16em' },
}

/**
 * @param {object} props
 * @param {{ primary: string, dark: string, name: string }} props.player
 *   Player currently on turn. From `playerColors[i]` or any object with
 *   `primary` (message color), `dark` (fill) and `name` (default message).
 * @param {'xs'|'sm'|'md'} [props.size='sm']
 *   Matches ActionBar's size scale so the banner is a drop-in replacement.
 * @param {string} [props.message]
 *   Override the default "<player.name> turn" text. Pass the full string.
 * @param {React.CSSProperties} [props.style]
 * @param {string} [props.className]
 *
 * @example
 * import { playerColors } from 'donjon-fall-ui'
 *
 * {isMyTurn
 *   ? <ActionBar actions={myActions} size="sm" />
 *   : <OpponentTurnBanner player={playerColors[activePlayerIdx]} size="sm" />}
 */
export default function OpponentTurnBanner({
  player,
  size = 'sm',
  message,
  style,
  className,
}) {
  if (!player) return null
  const s = SIZE_DIMS[size] ?? SIZE_DIMS.sm
  const primary = player.primary ?? player.color
  const dark    = player.dark ?? player.darkColor
  const text    = message ?? `${player.name} turn`

  return (
    /* Outer border shell — clip-path octagon painted in gold = the border */
    <div
      role="status"
      aria-live="polite"
      className={className}
      style={{
        height: s.h,
        clipPath: octagon(s.cx),
        background: gold,
        padding: 1,
        boxShadow: `0 2px 8px rgba(0,0,0,0.45)`,
        ...style,
      }}
    >
      {/* Inner fill — player's dark variant, slightly smaller clip so the
          gold peeks through as a 1 px border on every edge. */}
      <div
        style={{
          height: '100%',
          clipPath: octagonInner(s.cx, 1),
          background: dark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `0 ${s.padX}px`,
        }}
      >
        <span
          style={{
            fontSize: s.fontSize,
            fontWeight: 700,
            letterSpacing: s.letterSpacing,
            textTransform: 'uppercase',
            color: primary,
            textShadow: `0 0 8px ${primary}66, 0 1px 2px rgba(0,0,0,0.75)`,
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
