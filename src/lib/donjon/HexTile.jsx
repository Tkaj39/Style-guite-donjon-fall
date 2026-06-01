import {
  gold, textActive, textFaint, bgDeep, gainColor, dangerColor, borderMid, borderMuted,
  HEX_TILE_SIZES, HEX_TILE_BORDER_WIDTH, HEX_TILE_ICON_SIZES, HEX_TILE_DOT_SIZES,
} from './tokens'
import { hexPointyTop } from '../../utils/polygon'

const HEX_CLIP = hexPointyTop()

/* ── Property + state — two orthogonal axes ──────────────────────────────
   `property` describes what the cell IS on the board (its role / kind).
   `state`    describes what the player has done with it / its current status.

   property : 'empty' | 'focal' | 'base'
   state    : 'default' | 'selected' | 'move' | 'attack' | 'blocked'

   Special composition: property='focal' + state='selected' → the prominent
   "active focal" look (gold border, flame icon, glow). Other focal cells
   render with the muted "passive focal" marker (olive border, diamond dot).
   ─────────────────────────────────────────────────────────────────────── */

const PROPERTIES = ['empty', 'focal', 'base']
const STATES     = ['default', 'selected', 'move', 'attack', 'blocked']

// Legacy single-string API → (property, state) pair. Kept for backward compat
// so existing showcase pages and consumers don't need to change.
const LEGACY_STATE_TO_PAIR = {
  empty:           ['empty', 'default'],
  base:            ['base',  'default'],
  'focal-active':  ['focal', 'selected'],
  'focal-passive': ['focal', 'default'],
  selected:        ['empty', 'selected'],
  move:            ['empty', 'move'],
  attack:          ['empty', 'attack'],
  blocked:         ['empty', 'blocked'],
}

// Base look per property (used when state='default'; provides the marker too).
// `marker` values: null (none) | 'dot' (passive focal) | 'flame' (active focal).
const PROPERTY_BASE = {
  empty: { border: borderMuted, fill: bgDeep, marker: null,  glow: null, opacity: 1 },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #6A6040/#1C1A0E: passive focal marker (olive border, warm-dark fill)
  focal: { border: '#6A6040',   fill: '#1C1A0E', marker: 'dot', glow: null, opacity: 1 },
  // `base` derives border + fill from the `owner` color (see resolveLook).
  base:  { border: null,        fill: null,    marker: null,  glow: null, opacity: 1 },
}

// State overlay applied on top of the property base. `null`/`undefined` keeps
// the property's value; an explicit value overrides it.
const STATE_OVERLAY = {
  default:  {},
  selected: { border: textActive,  glow: `0 0 12px ${textActive}66` },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #0E231A: unique fill for the move state (dark green)
  move:     { border: gainColor,   fill: '#0E231A', glow: `0 0 10px ${gainColor}55`,   marker: null },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #230E0E: unique fill for the attack state (dark red)
  attack:   { border: dangerColor, fill: '#230E0E', glow: `0 0 10px ${dangerColor}55`, marker: null },
  // eslint-disable-next-line donjon/no-hardcoded-hex -- #141320: unique fill for the blocked state (ultra-dark)
  blocked:  { border: borderMid,   fill: '#141320', glow: null, opacity: 0.45, marker: null },
}

// Special-case look for property='focal' + state='selected' — the "active
// focal point" highlight (gold + flame + glow), historically `focal-active`.
// eslint-disable-next-line donjon/no-hardcoded-hex -- #201D0E: unique warm-dark fill for the focal-active hex (amber-tinted)
const FOCAL_ACTIVE_LOOK = { border: gold, fill: '#201D0E', glow: `0 0 14px ${gold}66`, marker: 'flame', opacity: 1 }

function normalize({ property, state }) {
  // New API: explicit `property` given (state may be omitted → 'default')
  if (property !== undefined) {
    return [property, state ?? 'default']
  }
  // Legacy: `state` carries combined property+state info
  if (state && LEGACY_STATE_TO_PAIR[state]) {
    return LEGACY_STATE_TO_PAIR[state]
  }
  // New state-only API: implicit property='empty'
  return ['empty', state ?? 'default']
}

function resolveLook(property, state, owner) {
  // Focal + selected = the prominent "active focal" look
  if (property === 'focal' && state === 'selected') {
    return FOCAL_ACTIVE_LOOK
  }

  const base    = PROPERTY_BASE[property] ?? PROPERTY_BASE.empty
  const overlay = STATE_OVERLAY[state]    ?? STATE_OVERLAY.default

  // Resolve border/fill — overlay wins; for property='base', owner provides
  // a per-player default when overlay does not override.
  let border = overlay.border ?? base.border
  let fill   = overlay.fill   ?? base.fill
  if (property === 'base' && owner) {
    border = overlay.border ?? owner
    fill   = overlay.fill   ?? (owner + '33')
  }

  // Marker: explicit `null` in the overlay (move/attack/blocked) clears the
  // property's marker; otherwise the property keeps its own marker.
  const marker = 'marker' in overlay ? overlay.marker : base.marker

  return {
    border:  border ?? borderMuted,
    fill:    fill   ?? bgDeep,
    glow:    overlay.glow    ?? base.glow,
    opacity: overlay.opacity ?? base.opacity,
    marker,
  }
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

/**
 * HexTile — pointy-top hexagonal board cell.
 *
 * Two orthogonal axes describe the cell:
 *   property : what the cell IS  — 'empty' | 'focal' | 'base'
 *   state    : how the cell IS   — 'default' | 'selected' | 'move' | 'attack' | 'blocked'
 *
 * Backward compat: passing the old combined `state` enum
 * ('focal-active' | 'focal-passive' | etc.) still works and is normalized
 * internally to the new (property, state) pair.
 *
 * @param {'empty'|'focal'|'base'} [property='empty']
 * @param {'default'|'selected'|'move'|'attack'|'blocked'} [state='default']
 * @param {string} [owner]   Player color (#hex); used when property='base'.
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {string} [label]
 * @param {boolean} [showLabel=false]
 *
 * @example
 * // Active focal point (the prominent objective)
 * <HexTile property="focal" state="selected" />
 *
 * @example
 * // Passive focal marker on the board
 * <HexTile property="focal" />
 *
 * @example
 * // Player's base
 * <HexTile property="base" owner={player.color} />
 *
 * @example
 * // Cell in a move-target highlight
 * <HexTile state="move" />
 *
 * @example
 * // Legacy single-enum API still works
 * <HexTile state="focal-active" />
 */
export default function HexTile({ property, state, owner = null, size = 'md', label, showLabel = false }) {
  const s = HEX_TILE_SIZES[size] ?? HEX_TILE_SIZES.md
  const [resolvedProperty, resolvedState] = normalize({ property, state })
  const look = resolveLook(resolvedProperty, resolvedState, owner)

  const iconSize = HEX_TILE_ICON_SIZES[size] ?? HEX_TILE_ICON_SIZES.md
  const dotSize  = HEX_TILE_DOT_SIZES[size]  ?? HEX_TILE_DOT_SIZES.md

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        filter: look.glow ? `drop-shadow(${look.glow})` : undefined,
        opacity: look.opacity,
      }}>
        {/* Outer border layer */}
        <div style={{ position: 'relative', width: s.w, height: s.h, clipPath: HEX_CLIP, background: look.border }}>
          {/* Inner fill layer — HEX_TILE_BORDER_WIDTH inset via absolute positioning */}
          <div style={{
            position: 'absolute',
            top: HEX_TILE_BORDER_WIDTH, left: HEX_TILE_BORDER_WIDTH,
            right: HEX_TILE_BORDER_WIDTH, bottom: HEX_TILE_BORDER_WIDTH,
            clipPath: HEX_CLIP,
            background: look.fill,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {look.marker === 'flame' && <FlameIcon size={iconSize} />}
            {look.marker === 'dot'   && <DiamondDot size={dotSize} />}
          </div>
        </div>
      </div>

      {showLabel && (
        <p style={{
          margin: 0, fontSize: '0.5rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', color: textFaint, textAlign: 'center',
          maxWidth: s.w + 8,
        }}>
          {label ?? state ?? resolvedState}
        </p>
      )}
    </div>
  )
}

// Public enums for consumers that want to iterate or validate property/state.
export const HEX_TILE_PROPERTIES = PROPERTIES
export const HEX_TILE_STATES     = STATES
