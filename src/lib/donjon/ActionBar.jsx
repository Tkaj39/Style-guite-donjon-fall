/* ── ActionBar ─────────────────────────────────────────────────────────────
   Donjon HUD strip of action buttons. Each action renders as a lib
   <ActionTile>; the wrapper handles per-row layout (gap, scale), an
   optional octagonal border shell with 4 corner RohOrnaments, and the
   keycap / label / icon-only convention.

   - bordered=true (default):  octagonal shell + corner brackets — fits the
     standalone HUD panel context.
   - bordered=false:           transparent row — fits embedded contexts
     (e.g. ScreensPage bottom strip floating over the map).
   ────────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import ActionTile from './ActionTile'
import { RohOrnament, ornamentHForCx } from './Ornaments'
import { bgDeep, goldDim } from './tokens'

const SIZE_DIMS = {
  xs: { tileW: 48 },
  sm: { tileW: 80 },
  md: { tileW: 110 },
}

/**
 * @param {object} props
 * @param {Array<{
 *   id?: string|number,
 *   label: string,
 *   icon?: React.ReactNode,
 *   variant?: 'default'|'attack'|'move'|'special',
 *   keycap?: string,
 *   selected?: boolean,
 *   disabled?: boolean,
 *   onClick?: () => void,
 * }>} props.actions
 *   One ActionTile per entry.
 * @param {'xs'|'sm'|'md'} [props.size='sm']
 *   ActionTile size. Determines the tile dimensions (xs 48×44, sm 80×72,
 *   md 110×96) and the wrapper tile-width slot.
 * @param {boolean} [props.bordered=true]
 *   Render the donjon octagonal shell + 4 corner RohOrnament brackets.
 *   Set false for embedded floating contexts.
 * @param {boolean} [props.showLabel=true]
 *   Pass each action.label as the ActionTile title. Set false for
 *   icon-only tiles (compact HUD strips).
 * @param {boolean} [props.showKeycap=true]
 *   Pass `[ ${action.keycap} ]` as the ActionTile description. Independent
 *   from showLabel.
 * @param {number} [props.scale=1]
 *   CSS transform scale on the row. Useful for shrinking the strip inside
 *   narrow device-frame previews without re-tooling tile sizes.
 *
 * @example
 * // Standalone HUD panel
 * <ActionBar actions={[
 *   { label: 'Pohyb', icon: <MoveIcon />, variant: 'move', keycap: 'M' },
 *   { label: 'Útok',  icon: <SwordIcon />, variant: 'attack', keycap: 'A' },
 * ]} size="sm" />
 *
 * @example
 * // Compact icon-only strip on a game screen
 * <ActionBar actions={SCREEN_ACTIONS} size="xs"
 *   bordered={false} showLabel={false} showKeycap={false} scale={0.85} />
 */
export default function ActionBar({
  actions,
  size = 'sm',
  bordered = true,
  showLabel = true,
  showKeycap = true,
  scale = 1,
}) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const { tileW } = SIZE_DIMS[size] ?? SIZE_DIMS.sm
  const gap = Math.max(4, Math.round(8 * scale))
  const cx = 8     // chamfer size — two steps up from the previous cx=4
  const ornH = ornamentHForCx(cx, 'roh')

  const row = (
    <div style={{
      display: 'flex',
      gap,
      transform: scale !== 1 ? `scale(${scale})` : undefined,
      transformOrigin: 'center top',
    }}>
      {actions.map((a, i) => (
        <div
          key={a.id ?? a.label ?? i}
          style={{ width: tileW, flexShrink: 0 }}
          aria-label={!showLabel ? a.label : undefined}
        >
          <ActionTile
            icon={a.icon}
            title={showLabel ? a.label : ''}
            description={showKeycap && a.keycap ? `[ ${a.keycap} ]` : undefined}
            variant={a.variant ?? 'default'}
            selected={a.selected}
            disabled={a.disabled}
            onClick={a.onClick}
            size={size}
            ornament="decorated"
          />
        </div>
      ))}
    </div>
  )

  if (!bordered) return row

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Octagonal shell — two-layer border-trick (parity with DonjonCard) */}
      <div style={{ clipPath: octagon(cx), background: `${goldDim}55`, padding: 1 }}>
        <div style={{
          clipPath: octagonInner(cx),
          display: 'flex', gap: 8, padding: 8,
          background: bgDeep,
        }}>
          {row}
        </div>
      </div>
      {/* 4 corner RohOrnaments */}
      <RohOrnament h={ornH} uid={`${uid}-tl`} />
      <RohOrnament h={ornH} uid={`${uid}-tr`} flip />
      <RohOrnament h={ornH} uid={`${uid}-bl`} bottom />
      <RohOrnament h={ornH} uid={`${uid}-br`} flip bottom />
    </div>
  )
}
