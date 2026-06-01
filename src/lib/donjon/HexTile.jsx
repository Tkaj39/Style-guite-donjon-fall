import {
  gold, textActive, textFaint, bgDeep, gainColor, dangerColor, borderMid, borderMuted,
  HEX_TILE_SIZES, HEX_TILE_BORDER_WIDTH, HEX_TILE_ICON_SIZES, HEX_TILE_DOT_SIZES,
} from './tokens'
import { hexPointyTop } from '../../utils/polygon'

const HEX_CLIP = hexPointyTop()

const stateMap = {
  empty:          { border: borderMuted, fill: bgDeep,    glow: null },
  base:           { border: null,      fill: null,        glow: null },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #201D0E: unique warm-dark fill for the focal hex (amber-tinted)
  'focal-active': { border: gold,      fill: '#201D0E',   glow: `0 0 14px ${gold}66` },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #6A6040/#1C1A0E: unique colors for the passive focal hex (olive / warm-dark)
  'focal-passive':{ border: '#6A6040', fill: '#1C1A0E',   glow: null },
  selected:       { border: textActive,fill: bgDeep,      glow: `0 0 12px ${textActive}66` },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #0E231A: unique fill for the move hex (dark green — game move state)
  move:           { border: gainColor,   fill: '#0E231A',   glow: `0 0 10px ${gainColor}55`   },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #230E0E: unique fill for the attack hex (dark red — game attack state)
  attack:         { border: dangerColor, fill: '#230E0E',   glow: `0 0 10px ${dangerColor}55` },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #141320: unique fill for the blocked hex (ultra-dark — signals unavailability)
  blocked:        { border: borderMid, fill: '#141320',   glow: null, opacity: 0.45 },
}

function FlameIcon({ size = 10 }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width={size} height={size} style={{ color: gold, filter: `drop-shadow(0 0 3px ${gold}88)` }}>
      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Z" />
    </svg>
  )
}

function DiamondDot({ size = 6 }) {
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #6A6040: unique olive color for the passive focal marker (olive-dark, no palette equivalent)
  const dotColor = '#6A6040'
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} style={{ color: dotColor }}>
      <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" opacity={0.7} />
    </svg>
  )
}

export default function HexTile({ state = 'empty', owner = null, size = 'md', label, showLabel = false }) {
  const s = HEX_TILE_SIZES[size] ?? HEX_TILE_SIZES.md
  const cfg = stateMap[state] ?? stateMap.empty

  const borderColor = state === 'base' && owner ? owner : cfg.border ?? borderMuted
  const fillColor   = state === 'base' && owner ? owner + '33' : cfg.fill ?? bgDeep

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        filter: cfg.glow ? `drop-shadow(${cfg.glow})` : undefined,
        opacity: cfg.opacity ?? 1,
      }}>
        {/* Outer border layer */}
        <div style={{ position: 'relative', width: s.w, height: s.h, clipPath: HEX_CLIP, background: borderColor }}>
          {/* Inner fill layer — HEX_TILE_BORDER_WIDTH inset via absolute positioning */}
          <div style={{
            position: 'absolute',
            top: HEX_TILE_BORDER_WIDTH, left: HEX_TILE_BORDER_WIDTH,
            right: HEX_TILE_BORDER_WIDTH, bottom: HEX_TILE_BORDER_WIDTH,
            clipPath: HEX_CLIP,
            background: fillColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {state === 'focal-active'  && <FlameIcon size={HEX_TILE_ICON_SIZES[size] ?? HEX_TILE_ICON_SIZES.md} />}
            {state === 'focal-passive' && <DiamondDot size={HEX_TILE_DOT_SIZES[size] ?? HEX_TILE_DOT_SIZES.md} />}
          </div>
        </div>
      </div>

      {showLabel && (
        <p style={{
          margin: 0, fontSize: '0.5rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', color: textFaint, textAlign: 'center',
          maxWidth: s.w + 8,
        }}>
          {label ?? state}
        </p>
      )}
    </div>
  )
}
