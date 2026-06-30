/* ── VPCounter ─────────────────────────────────────────────────────────────
   Donjon HUD panel showing per-player Victory Point progress.
   Composition: octagonal shell with 4 corner RohOrnaments + a row per
   player (Erb shield with pictogram + chamfered VP pips + VP number).
   ────────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { Shield } from './Erb'
import { RohOrnament, ornamentHForCx } from './Ornaments'
import { bgDeep, borderSubtle, gold, goldDim, textDeep } from './tokens'

/**
 * @param {object} props
 * @param {Array<{ id?: number|string, color: string, vp: number, icon?: React.ReactNode }>} props.players
 *   List of players. Each renders one row in column layout, one cell in row layout.
 * @param {number} [props.max=5]      Target VP count (number of pips per row).
 * @param {string} [props.title='Vítězné body']  Panel title (set to '' to hide).
 *   In `layout='row'` the title sits between players instead of above them.
 * @param {'column'|'row'} [props.layout='column']
 *   'column' — vertical panel, players stacked under the title.
 *   'row'    — horizontal strip, player 1 ‖ title (info) ‖ player 2.
 * @param {number} [props.minWidth=200] Minimum panel width in px.
 *
 * @example
 * <VPCounter players={[
 *   { id: 1, color: infoColor, vp: 3, icon: <SwordIcon /> },
 *   { id: 2, color: failColor, vp: 1, icon: <ShieldIcon /> },
 * ]} max={5} />
 *
 * @example
 * // Row layout — score header strip with turn info between players
 * <VPCounter players={[p1, p2]} max={5}
 *   title="Tah 3 · Akce — Hráč 1 na tahu" layout="row" />
 */
export default function VPCounter({
  players,
  max = 5,
  title = 'Vítězné body',
  layout = 'column',
  minWidth = 200,
  compact = false,
  // Row layout only — content rendered inside the centered hex divider.
  // Any combination of the three slots is supported:
  //   centerValue alone    → single value centered in the hex
  //   centerLeft + Right   → "L  R" with the icon (or default HexIcon
  //     glyph kept as background) between them
  //   centerIcon overrides the default HexIcon glyph behind the values
  centerValue,
  centerLeft,
  centerRight,
  centerIcon,
}) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const ornH = ornamentHForCx(8, 'roh')
  const isRow = layout === 'row'

  return (
    <div style={{ position: 'relative', minWidth }}>
      {/* Octagonal shell — two-layer border-trick (parity with DonjonCard) */}
      <div style={{ clipPath: octagon(8), background: `${goldDim}55`, padding: 1 }}>
        <div style={{
          clipPath: octagonInner(8),
          display: 'flex',
          flexDirection: isRow ? 'row' : 'column',
          alignItems: isRow ? 'center' : 'stretch',
          gap: isRow ? 12 : 6,
          padding: isRow ? '8px 14px' : '12px 16px',
          background: bgDeep,
        }}>
          {isRow ? (
            <>
              <PlayerRow player={players[0]} max={max} compact={compact} />
              {/* Spacer keeps the absolute-positioned HexIcon centered between
                  the two flex children. minWidth ≈ hex width so the VP numbers
                  don't collide with the divider when the panel is narrow. */}
              <div style={{ flex: 1, minWidth: 48 }} />
              {players[1] && <PlayerRow player={players[1]} max={max} mirror compact={compact} />}
            </>
          ) : (
            <>
              {title && (
                <span style={{
                  fontSize: '0.625rem', color: textDeep,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>{title}</span>
              )}
              {players.map((p, idx) => (
                <PlayerRow key={p.id ?? idx} player={p} max={max} compact={compact} />
              ))}
            </>
          )}
        </div>
      </div>
      {/* 4 corner RohOrnaments */}
      <RohOrnament h={ornH} uid={`${uid}-tl`} />
      <RohOrnament h={ornH} uid={`${uid}-tr`} flip />
      <RohOrnament h={ornH} uid={`${uid}-bl`} bottom />
      <RohOrnament h={ornH} uid={`${uid}-br`} flip bottom />
      {/* Row layout: hex divider centered on the panel, overflowing top
          + bottom by 10 px so the hex visibly punches through the clipped
          shell as a prominent focal element. The hex outline (SVG) is the
          background; optional content (1 value or 2 values + icon) layers
          on top centered inside the hex. */}
      {isRow && (
        <div style={{
          position: 'absolute',
          top: -10, bottom: -10, left: '50%',
          transform: 'translateX(-50%)',
          aspectRatio: '1 / 1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: gold, filter: `drop-shadow(0 0 6px ${gold}66)`,
          pointerEvents: 'none',
        }}>
          {/* Hex outline */}
          <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%"
               style={{ position: 'absolute', inset: 0 }}>
            <path
              d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z"
              stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round"
            />
          </svg>
          {/* Inner content — overlay positioned dead center */}
          <CenterContent
            value={centerValue}
            left={centerLeft}
            right={centerRight}
            icon={centerIcon}
          />
        </div>
      )}
    </div>
  )
}

/* CenterContent — what shows inside the row layout's centered hex.
   Three modes:
     - `value` alone → single number centered in the hex
     - `left` + `right` → both numbers side-by-side with `icon` between
       (or no icon if `icon` is null)
     - none → nothing rendered (hex stays decorative outline) */
function CenterContent({ value, left, right, icon }) {
  // Single value mode
  if (value != null && left == null && right == null) {
    return (
      <span style={{
        position: 'relative',
        fontSize: '0.875rem', fontWeight: 800, color: gold,
        fontVariantNumeric: 'tabular-nums', lineHeight: 1,
      }}>{value}</span>
    )
  }
  // Two-value mode (with optional icon between)
  if (left != null || right != null) {
    return (
      <span style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', gap: 2,
        fontSize: '0.6875rem', fontWeight: 800, color: gold,
        fontVariantNumeric: 'tabular-nums', lineHeight: 1,
      }}>
        {left != null && <span>{left}</span>}
        {icon !== null && (
          <span style={{ display: 'inline-flex', lineHeight: 0, fontSize: '0.625rem' }}>
            {icon ?? '·'}
          </span>
        )}
        {right != null && <span>{right}</span>}
      </span>
    )
  }
  return null
}

function PlayerRow({ player, max, mirror = false, compact = false }) {
  const { color, vp, icon, active } = player
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      flexDirection: mirror ? 'row-reverse' : 'row',
      /* Active player: dim the inactive rows so the active one pops.
         No layout shift — pure visual contrast. */
      opacity: active === false ? 0.55 : 1,
    }}>
      {/* Erb wrapped in a glow halo when active — extra drop-shadow
          in the player color makes "whose turn it is" unmissable. */}
      <div style={{
        filter: active ? `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 14px ${color}88)` : undefined,
        transition: 'filter 0.2s',
        display: 'inline-flex',
      }}>
        <Shield playerColor={color} size="xs" icon={icon} />
      </div>
      {/* Compact mode skips the pip row — only Erb + VP number remain.
          Useful for narrow row layouts (mobile header strip). */}
      {!compact && <VPPips color={color} vp={vp} max={max} />}
      {/* VP number — the most important score on the screen.
          Glanceable: tabular-nums, bold, colored to match the player,
          slightly larger so it reads from across the room. Filter-glow
          on the active row to draw the eye to the on-turn score. */}
      <span style={{
        fontSize: '1.125rem', fontWeight: 800, color,
        width: 24, textAlign: mirror ? 'left' : 'right',
        fontVariantNumeric: 'tabular-nums', lineHeight: 1,
        filter: active ? `drop-shadow(0 0 6px ${color}aa)` : undefined,
      }}>{vp}</span>
    </div>
  )
}

/**
 * Row of chamfered VP pips — exported separately so smaller chip-style
 * VP indicators can reuse the exact same look.
 *
 * @param {object} props
 * @param {string} props.color   Player color used for filled pips.
 * @param {number} props.vp      Filled pip count.
 * @param {number} props.max     Total pip count.
 * @param {number} [props.height=8] Pip height in px.
 * @param {number} [props.gap=4]    Gap between pips in px.
 */
export function VPPips({ color, vp, max, height = 8, gap = 4 }) {
  return (
    <div style={{ flex: 1, display: 'flex', gap, alignItems: 'center' }}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < vp
        return (
          <div key={i} style={{
            flex: 1,
            clipPath: octagon(2),
            background: filled ? color : `${goldDim}55`,
            padding: 1,
            boxShadow: filled ? `0 0 4px ${color}80` : 'none',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}>
            <div style={{
              clipPath: octagonInner(2),
              height,
              background: filled ? color : borderSubtle,
            }} />
          </div>
        )
      })}
    </div>
  )
}
