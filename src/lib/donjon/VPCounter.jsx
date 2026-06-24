/* ── VPCounter ─────────────────────────────────────────────────────────────
   Donjon HUD panel showing per-player Victory Point progress.
   Composition: octagonal shell with 4 corner RohOrnaments + a row per
   player (Erb shield with pictogram + chamfered VP pips + VP number).
   ────────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { Shield } from './Erb'
import { RohOrnament, ornamentHForCx } from './Ornaments'
import { bgDeep, borderSubtle, gold, goldDim, textActive, textDeep } from './tokens'

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
              <PlayerRow player={players[0]} max={max} />
              {/* Spacer keeps the absolute-positioned HexIcon centered between
                  the two flex children. */}
              <div style={{ flex: 1 }} />
              {players[1] && <PlayerRow player={players[1]} max={max} mirror />}
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
                <PlayerRow key={p.id ?? idx} player={p} max={max} />
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
      {/* Row layout: HexIcon divider centered on the panel, overflowing
          top + bottom by 2 px so it visibly breaks the clipped shell. */}
      {isRow && (
        <div style={{
          position: 'absolute',
          top: -2, bottom: -2, left: '50%',
          transform: 'translateX(-50%)',
          aspectRatio: '1 / 1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: gold, filter: `drop-shadow(0 0 6px ${gold}66)`,
          pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
            <path
              d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

function PlayerRow({ player, max, mirror = false }) {
  const { color, vp, icon } = player
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      flexDirection: mirror ? 'row-reverse' : 'row',
    }}>
      <Shield playerColor={color} size="xs" icon={icon} />
      <VPPips color={color} vp={vp} max={max} />
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, color: textActive,
        width: 20, textAlign: mirror ? 'left' : 'right',
        fontVariantNumeric: 'tabular-nums',
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
