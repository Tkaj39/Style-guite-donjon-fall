import {
  gold, textFaint, bgDeep, gainColor, dangerColor, borderMid, borderMuted,
  focalActiveBg, focalPassiveBg, focalPassiveBorder,
  HEX_TILE_SIZES, HEX_TILE_BORDER_WIDTH, HEX_TILE_ICON_SIZES, HEX_TILE_DOT_SIZES,
} from './tokens'
import { hexPointyTop } from '../shared/polygon'

const HEX_CLIP = hexPointyTop()

/* ── Three orthogonal axes ───────────────────────────────────────────────
   property : what the cell IS on the board (its role / kind)
   focal    : sub-state for `property='focal'` — driven by GAME LOGIC,
              independent of player interaction. Ignored otherwise.
   state    : how the PLAYER is currently interacting with the cell.

   property : 'empty' | 'focal' | 'base'
   focal    : 'active' | 'passive'  (only relevant when property='focal')
   state    : 'default' | 'selected' | 'move' | 'attack' | 'blocked'

   The three axes compose: e.g. property='focal' focal='active' state='selected'
   = the active focal point currently picked by the player.
   ─────────────────────────────────────────────────────────────────────── */

// Note: the public enum arrays (HEX_TILE_PROPERTY_VALUES, HEX_TILE_FOCAL_VALUES,
// HEX_TILE_STATE_VALUES, HEX_TILE_SIZE_VALUES) live in `./enums` so this file
// can export ONLY the component — required for React Fast Refresh.

// Legacy single-string API → triple (property, focal, state). Kept for
// backward compat so existing showcase pages and consumers don't change.
const LEGACY_STATE_TO_TRIPLE = {
  empty:           ['empty', 'passive', 'default'],
  base:            ['base',  'passive', 'default'],
  'focal-active':  ['focal', 'active',  'default'],
  'focal-passive': ['focal', 'passive', 'default'],
  selected:        ['empty', 'passive', 'selected'],
  move:            ['empty', 'passive', 'move'],
  attack:          ['empty', 'passive', 'attack'],
  blocked:         ['empty', 'passive', 'blocked'],
}

// Base look per (property, focal) — applied when state='default'.
// `marker` values: null (none) | 'dot' (passive focal) | 'flame' (active focal).
const EMPTY_LOOK = { border: borderMuted, fill: bgDeep, marker: null,  glow: null, opacity: 1 }

/* Borders unified to borderMuted (same as empty) — fill + marker + glow
   carry the focal semantics, so the honeycomb seam stays crisp at gap=0. */
const FOCAL_PASSIVE_LOOK = { border: borderMuted, fill: focalPassiveBg, marker: 'dot',   glow: null, opacity: 1 }
const FOCAL_ACTIVE_LOOK  = { border: borderMuted, fill: focalActiveBg,  marker: 'flame', glow: `0 0 14px ${gold}66`, opacity: 1 }

// `base` derives border + fill from the `owner` color (see resolveLook).
const BASE_LOOK = { border: null, fill: null, marker: null, glow: null, opacity: 1 }

// State overlay applied ON TOP of the (property, focal) base. By design the
// overlay touches only the border + glow (and opacity for `blocked`) so that
// property visuals (fill, marker icon, owner color) remain VISIBLE underneath
// — you can tell a focal cell from a base cell from an empty cell at a glance
// regardless of the current interaction state.
/* Each interaction state carries BOTH a colored border AND a tint that
   gets layered over the texture/fill — the colored fill keeps the state
   readable even when the 1 px border collides with a neighbour's border. */
/* selected uses gold (warm, saturated) rather than textActive (cool cream)
   so it pops off the green move tints — gold-vs-green sits on opposite
   sides of the wheel, much higher contrast than textActive-vs-green.
   The glow is doubled (inner sharp + outer halo) to draw the eye. */
const STATE_OVERLAY = {
  default:  {},
  selected: { border: gold,        tint: `${gold}66`,        glow: `0 0 8px ${gold}, 0 0 18px ${gold}99` },
  move:     { border: gainColor,   tint: `${gainColor}55`,   glow: `0 0 10px ${gainColor}55`   },
  attack:   { border: dangerColor, tint: `${dangerColor}55`, glow: `0 0 10px ${dangerColor}55` },
  blocked:  { border: borderMid,   glow: null, opacity: 0.45 },
}

function getBaseLook(property, focal) {
  if (property === 'focal') {
    return focal === 'active' ? FOCAL_ACTIVE_LOOK : FOCAL_PASSIVE_LOOK
  }
  if (property === 'base') return BASE_LOOK
  return EMPTY_LOOK
}

function normalize({ property, focal, state }) {
  // New API: explicit `property` given
  if (property !== undefined) {
    return [property, focal ?? 'passive', state ?? 'default']
  }
  // Legacy: `state` carries combined info
  if (state && LEGACY_STATE_TO_TRIPLE[state]) {
    return LEGACY_STATE_TO_TRIPLE[state]
  }
  // New state-only API: implicit property='empty'
  return ['empty', focal ?? 'passive', state ?? 'default']
}

function resolveLook(property, focal, state, owner) {
  const base    = getBaseLook(property, focal)
  const overlay = STATE_OVERLAY[state] ?? STATE_OVERLAY.default

  // Resolve border/fill — overlay wins; for property='base', owner provides
  // a per-player default when the overlay does not override.
  let border = overlay.border ?? base.border
  let fill   = overlay.fill   ?? base.fill
  if (property === 'base' && owner) {
    /* Base hex: dark outline (parity with empty hexes) so neighbouring
       bases stay visible as separate tiles, not a single colored blob.
       Owner color drives the fill instead of the border. */
    border = overlay.border ?? borderMuted
    fill   = overlay.fill   ?? owner
  }

  // Marker: explicit `null` in the overlay (move/attack/blocked) clears the
  // base's marker; otherwise the base keeps its own marker.
  const marker = 'marker' in overlay ? overlay.marker : base.marker

  return {
    border:  border ?? borderMuted,
    fill:    fill   ?? bgDeep,
    tint:    overlay.tint    ?? null,
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
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} style={{ color: focalPassiveBorder }}>
      <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" opacity={0.7} />
    </svg>
  )
}

/**
 * HexTile — pointy-top hexagonal board cell.
 *
 * Three orthogonal axes describe a cell:
 *   property : what the cell IS — 'empty' | 'focal' | 'base'
 *   focal    : sub-state for focal cells — 'active' | 'passive'
 *              (game logic, independent of player interaction)
 *   state    : current player interaction — 'default' | 'selected' | 'move' | 'attack' | 'blocked'
 *
 * Backward compat: passing the legacy combined `state` enum
 * ('focal-active' | 'focal-passive' | 'empty' | 'base' | ...) still works.
 *
 * @param {'empty'|'focal'|'base'} [property='empty']
 * @param {'active'|'passive'} [focal='passive']  Only used when property='focal'.
 * @param {'default'|'selected'|'move'|'attack'|'blocked'} [state='default']
 * @param {string} [owner]   Player color (#hex); used when property='base'.
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {string} [label]
 * @param {boolean} [showLabel=false]
 *
 * @example
 * // Active focal point (game-state: currently scoring VP)
 * <HexTile property="focal" focal="active" />
 *
 * @example
 * // Passive focal point (waiting in the group)
 * <HexTile property="focal" focal="passive" />
 *
 * @example
 * // Active focal that the player has currently selected
 * <HexTile property="focal" focal="active" state="selected" />
 *
 * @example
 * // Player's base
 * <HexTile property="base" owner={player.color} />
 *
 * @example
 * // Cell marked as a move target
 * <HexTile state="move" />
 *
 * @example
 * // Legacy single-enum API still works
 * <HexTile state="focal-active" />
 */
export default function HexTile({
  property,
  focal,
  state,
  owner = null,
  size = 'md',
  label,
  showLabel = false,
  texture,
}) {
  const s = HEX_TILE_SIZES[size] ?? HEX_TILE_SIZES.md
  const [resolvedProperty, resolvedFocal, resolvedState] = normalize({ property, focal, state })
  const look = resolveLook(resolvedProperty, resolvedFocal, resolvedState, owner)

  const iconSize = HEX_TILE_ICON_SIZES[size] ?? HEX_TILE_ICON_SIZES.md
  const dotSize  = HEX_TILE_DOT_SIZES[size]  ?? HEX_TILE_DOT_SIZES.md

  // Texture covers empty AND base cells (so player bases visually sit ON
  // the terrain). For base cells the player color shows as a semi-transparent
  // tint LAYERED OVER the texture (instead of a solid fill blocking it).
  // focal cells keep their semantic gold fill.
  // When an interaction state carries a `tint`, it layers ON TOP of the
  // texture/fill via a flat linear-gradient — keeps the colored state
  // unmistakable even when 1 px borders collide between neighbours.
  const useTexture = texture && (resolvedProperty === 'empty' || resolvedProperty === 'base')
  // Vignette: subtle radial darkening near the edges, color matched to the
  // cell's natural fill — empty+grass fades to dark green, base fades to a
  // dark version of the player color (computed with CSS color-mix), focal
  // fades to a dark amber. Tile reads as gently recessed in its own palette.
  let vignetteEdge
  if (resolvedProperty === 'base' && owner) {
    vignetteEdge = `color-mix(in srgb, ${owner} 30%, black)`
  } else if (resolvedProperty === 'focal') {
    // eslint-disable-next-line donjon/no-hardcoded-hex -- dark amber edge for focal vignette
    vignetteEdge = '#2A1C0A'
  } else if (useTexture) {
    // eslint-disable-next-line donjon/no-hardcoded-hex -- dark green edge matched to grass
    vignetteEdge = '#0E1A0A'
  } else {
    vignetteEdge = 'rgba(0, 0, 0, 0.85)'
  }
  const VIGNETTE = `radial-gradient(ellipse at center, transparent 65%, ${vignetteEdge} 100%)`
  // tintLayer: state overlay (selected / move / attack) OR base owner color.
  // Base tint uses MULTIPLY blend with the grass texture so the player color
  // shifts the terrain's hue/brightness instead of just overlaying with alpha
  // — gives a richer, more integrated look than a flat semi-transparent layer.
  let tintLayer = look.tint ? `linear-gradient(${look.tint}, ${look.tint})` : null
  let tintBlend = 'normal'
  if (!tintLayer && resolvedProperty === 'base' && owner && useTexture) {
    tintLayer = `linear-gradient(${owner}, ${owner})`
    tintBlend = 'multiply'
  }
  const layers = [VIGNETTE, tintLayer, useTexture ? `url(${texture})` : null].filter(Boolean)
  const blendModes = ['normal', tintLayer ? tintBlend : null, useTexture ? 'normal' : null].filter(Boolean).join(', ')
  const innerFillStyle = useTexture
    ? {
        backgroundImage: layers.join(', '),
        backgroundSize:  layers.map(l => l.startsWith('url') ? 'cover' : 'auto').join(', '),
        backgroundPosition: 'center',
        backgroundBlendMode: blendModes,
      }
    : {
        backgroundImage: layers.join(', '),
        background: look.fill,
        backgroundBlendMode: blendModes,
      }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        /* Base drop-shadow strongly pushed down (Y offset) — gives each hex
           visual depth above the textured field. Combined with the look glow
           when a state demands it (selected / move / attack / focal active). */
        filter: [
          'drop-shadow(0 6px 5px rgba(0, 0, 0, 0.55))',
          look.glow ? `drop-shadow(${look.glow})` : null,
        ].filter(Boolean).join(' '),
        opacity: look.opacity,
      }}>
        {/* Border-trick — outer hex clipped to full shape and filled with
           the border color; inner hex inset by HEX_TILE_BORDER_WIDTH and
           clipped again, filled with the actual cell content. The clip
           ensures the border follows the hex shape exactly. */}
        <div style={{ position: 'relative', width: s.w, height: s.h, clipPath: HEX_CLIP, background: look.border }}>
          <div style={{
            position: 'absolute',
            top: HEX_TILE_BORDER_WIDTH, left: HEX_TILE_BORDER_WIDTH,
            right: HEX_TILE_BORDER_WIDTH, bottom: HEX_TILE_BORDER_WIDTH,
            clipPath: HEX_CLIP,
            ...innerFillStyle,
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

