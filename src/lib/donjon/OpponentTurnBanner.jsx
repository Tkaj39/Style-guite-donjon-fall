/* ── OpponentTurnBanner ────────────────────────────────────────────────────
   HUD banner shown in place of the ActionBar when it is not this player's
   turn. A solid rectangle filled with the on-turn player's color plus a
   short "<Color> turn" message, so the waiting player instantly sees whose
   turn it is without scanning a greyed-out tile row.

   Drop-in for <ActionBar>: its height per size matches ActionTile heights
   (xs 44, sm 72, md 96 px), so the HUD footprint stays the same whether
   the player is on turn or waiting.
   ────────────────────────────────────────────────────────────────────── */
import { textHigh } from './tokens'

/* Heights mirror ActionTile heights per size so the banner can swap in
   for <ActionBar> without resizing the HUD strip. */
const SIZE_DIMS = {
  xs: { h: 44, fontSize: '0.75rem',  letterSpacing: '0.12em', padX: 18 },
  sm: { h: 72, fontSize: '1rem',     letterSpacing: '0.14em', padX: 28 },
  md: { h: 96, fontSize: '1.25rem',  letterSpacing: '0.16em', padX: 36 },
}

/**
 * @param {object} props
 * @param {{ color: string, name: string }} props.player
 *   Player currently on turn. `color` paints the banner fill. `name` is
 *   used in the default message ("<name> turn").
 * @param {'xs'|'sm'|'md'} [props.size='sm']
 *   Matches ActionBar's size scale so the banner is a drop-in replacement.
 * @param {string} [props.message]
 *   Override the default "<player.name> turn" text. Pass the full string.
 * @param {React.CSSProperties} [props.style]
 * @param {string} [props.className]
 *
 * @example
 * // Shown instead of ActionBar for the waiting player
 * {isMyTurn
 *   ? <ActionBar actions={myActions} size="sm" />
 *   : <OpponentTurnBanner player={activePlayer} size="sm" />}
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
  const text = message ?? `${player.name} turn`

  return (
    <div
      role="status"
      aria-live="polite"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: s.h,
        padding: `0 ${s.padX}px`,
        background: player.color,
        boxShadow: `inset 0 0 0 2px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.45)`,
        ...style,
      }}
    >
      <span
        style={{
          fontSize: s.fontSize,
          fontWeight: 700,
          letterSpacing: s.letterSpacing,
          textTransform: 'uppercase',
          color: textHigh,
          textShadow: '0 1px 2px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {text}
      </span>
    </div>
  )
}
