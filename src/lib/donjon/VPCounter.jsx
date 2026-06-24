/* ── VPCounter ─────────────────────────────────────────────────────────────
   Donjon HUD panel showing per-player Victory Point progress.
   Composition: octagonal shell with 4 corner RohOrnaments + a row per
   player (Erb shield with pictogram + chamfered VP pips + VP number).
   ────────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { Shield } from './Erb'
import { RohOrnament, ornamentHForCx } from './Ornaments'
import { bgDeep, borderSubtle, goldDim, textActive, textDeep } from './tokens'

/**
 * @param {object} props
 * @param {Array<{ id?: number|string, color: string, vp: number, icon?: React.ReactNode }>} props.players
 *   List of players. Each renders one row.
 * @param {number} [props.max=5]      Target VP count (number of pips per row).
 * @param {string} [props.title='Vítězné body']  Panel title (set to '' to hide).
 * @param {number} [props.minWidth=200] Minimum panel width in px.
 *
 * @example
 * <VPCounter players={[
 *   { id: 1, color: infoColor, vp: 3, icon: <SwordIcon /> },
 *   { id: 2, color: failColor, vp: 1, icon: <ShieldIcon /> },
 * ]} max={5} />
 */
export default function VPCounter({
  players,
  max = 5,
  title = 'Vítězné body',
  minWidth = 200,
}) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const ornH = ornamentHForCx(8, 'roh')

  return (
    <div style={{ position: 'relative', minWidth }}>
      {/* Octagonal shell — two-layer border-trick (parity with DonjonCard) */}
      <div style={{ clipPath: octagon(8), background: `${goldDim}55`, padding: 1 }}>
        <div style={{
          clipPath: octagonInner(8),
          display: 'flex', flexDirection: 'column', gap: 6,
          padding: '12px 16px',
          background: bgDeep,
        }}>
          {title && (
            <span style={{
              fontSize: '0.625rem', color: textDeep,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>{title}</span>
          )}
          {players.map((p, idx) => (
            <PlayerRow key={p.id ?? idx} player={p} max={max} />
          ))}
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

function PlayerRow({ player, max }) {
  const { color, vp, icon } = player
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Shield playerColor={color} size="xs" icon={icon} />
      <VPPips color={color} vp={vp} max={max} />
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, color: textActive,
        width: 20, textAlign: 'right', fontVariantNumeric: 'tabular-nums',
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
