/* ── Erb — heraldic player identity ─────────────────────────────────────
   Shield:              heraldic shield/banner with the player's color and symbol
   PlayerIdentityBadge: compact badge for the scoreboard / HUD

   Shapes:
     • shape="erb"    — square top, tapered bottom (default, from /design-sources/erb.svg)
                        Fixed proportions: aspect ratio ~1:1, tip = 28.9% of width.
     • shape="prapor" — banner with a fixed tip, variable length.
                        Tip = 28.9% of width (fixed). Body of arbitrary length.
   ─────────────────────────────────────────────────────────────────────── */
import { cloneElement, isValidElement } from 'react'
import {
  bg2, gold, goldDim, neutralColor, textHighest,
  SHIELD_SIZES, SHIELD_ASPECT_RATIO, SHIELD_ORNAMENT_MIN_WIDTH,
  PRAPOR_DEFAULT_WIDTH, PRAPOR_DEFAULT_HEIGHT, PRAPOR_TIP_RATIO,
} from './tokens'
import { HexOrnament, HrotErbu } from './Ornaments'

// Erb — fixed proportions, polygon from /design-sources/erb.svg:
// 116.22×116.21 viewBox, points 116.22,0 → 116.22,82.66 → 58.11,116.21 → 0,82.66 → 0,0
// In percent: 0% 0% → 100% 0% → 100% 71.13% → 50% 100% → 0% 71.13%
// Tip height = 116.21 - 82.66 = 33.55 = 28.87% of width.
const ERB_CLIP = 'polygon(0% 0%, 100% 0%, 100% 71.13%, 50% 100%, 0% 71.13%)'

/**
 * Clip-path for the banner — the tip is fixed relative to width, the
 * straight section scales with height.
 *
 * For a banner of width=w, height=h: tip protrusion = w * TIP_RATIO px,
 * straight section from 0 to (h - tip) px = (h-tip)/h % in the polygon.
 */
function getPraporClip(width, height) {
  const tipPx = width * PRAPOR_TIP_RATIO
  const straightPct = ((height - tipPx) / height) * 100
  return `polygon(0% 0%, 100% 0%, 100% ${straightPct.toFixed(2)}%, 50% 100%, 0% ${straightPct.toFixed(2)}%)`
}

// Roman numeral symbol per player index (1-based id)
const symbols = ['I', 'II', 'III', 'IV', 'V', 'VI']

/**
 * Heraldic shield or banner with the player's color and (optional) symbol.
 *
 * Shapes:
 *   - shape="erb"    (default) — fixed 1:1 proportions + tapered tip at the bottom.
 *                                Sized via `size` ('xs|sm|md|lg' / px).
 *   - shape="prapor" — banner with a fixed tip, of arbitrary length.
 *                      Sized via `width` (defaults to PRAPOR_DEFAULT_WIDTH)
 *                      + `height` (defaults to PRAPOR_DEFAULT_HEIGHT).
 *                      Use `PRAPOR_WIDTHS.sm|md|lg` from tokens for consistent widths.
 *
 * Decoration (opt-in):
 *   - ornament="plain"     (default) — no ornaments, back-compat
 *   - ornament="decorated"  — HexOrnament on top + HrotErbu at the bottom
 *   - ornamentColor="gold" (default) | "player"  — ornament color
 *
 * Ornaments are not rendered on very small shields (< 30px width).
 *
 * Supports two color APIs:
 *   - Legacy: player={{ color, label, id }}
 *   - Flat:   playerColor="#E05C5C"
 *
 * @param {{ color: string, label: string, id?: number }} [player]
 * @param {string} [playerColor] - Direct color (alternative to player.color)
 * @param {'erb'|'prapor'} [shape='erb']
 * @param {'xs'|'sm'|'md'|'lg'|number} [size='md'] - Size for shape='erb'
 * @param {number} [width=PRAPOR_DEFAULT_WIDTH]  - Width for shape='prapor'
 * @param {number} [height=PRAPOR_DEFAULT_HEIGHT] - Length for shape='prapor'
 * @param {boolean} [showSymbol=true]
 * @param {'plain'|'decorated'} [ornament='plain'] - Decorative chevron + HexOrnament
 * @param {'gold'|'player'} [ornamentColor='gold'] - Ornament color
 * @example
 * // Erb (classic shield):
 * <Shield player={{ id: 1, color: '#E05C5C' }} size="sm" />
 * <Shield playerColor="#4D8FE0" size={32} showSymbol={false} />
 * // Prapor (banner):
 * <Shield shape="prapor" playerColor="#E05C5C" width={32} height={120} />
 * <Shield shape="prapor" playerColor="#4D8FE0" width={40} height={200} />
 * // Decorated:
 * <Shield player={{ id: 1, color: '#E05C5C' }} size="lg" ornament="decorated" />
 * <Shield playerColor="#4D8FE0" size="md" ornament="decorated" ornamentColor="player" />
 */
export function Shield({
  player,
  playerColor,
  shape = 'erb',
  size = 'md',
  width,
  height,
  showSymbol = true,
  icon,                       // optional ReactNode — renders inside the shield
                              // instead of the Roman numeral (when provided)
  ornament = 'plain',
  ornamentColor = 'gold',
}) {
  // Color: the flat prop wins over the player object
  const color = playerColor ?? player?.color ?? neutralColor
  const isPrapor = shape === 'prapor'

  // Dimensions by shape
  let s
  if (isPrapor) {
    s = { w: width ?? PRAPOR_DEFAULT_WIDTH, h: height ?? PRAPOR_DEFAULT_HEIGHT }
  } else if (typeof size === 'number') {
    s = { w: size, h: Math.round(size * SHIELD_ASPECT_RATIO) }
  } else {
    s = SHIELD_SIZES[size] ?? SHIELD_SIZES.md
  }

  // Clip-path: erb = fixed, prapor = computed from dimensions
  const clip = isPrapor ? getPraporClip(s.w, s.h) : ERB_CLIP

  // Symbol: Roman numeral based on player.id (when present)
  const sym = player?.id != null ? symbols[(player.id - 1) % symbols.length] : null

  // Symbol size and position: on a prapor smaller + aligned to the top
  const symFontSize = isPrapor ? s.w * 0.42 : s.w * 0.28
  const symAlign = isPrapor ? 'flex-start' : 'center'
  const symPadTop = isPrapor ? Math.max(4, s.w * 0.18) : 0

  // Decoration — visible only on larger shields (xs/smaller is skipped)
  const isDecorated = ornament === 'decorated' && s.w >= SHIELD_ORNAMENT_MIN_WIDTH
  const ornMain = ornamentColor === 'player' ? color : gold
  const ornDim  = ornamentColor === 'player' ? `${color}88` : goldDim
  // HrotErbu = 50% of erb width (plan item 5)
  const hrotWidth = s.w * 0.5
  const hrotHeight = hrotWidth * 14 / 48
  // HexOrnament edgePadL proportional — also fits inside a narrow prapor
  const hexPad = Math.max(4, Math.round(s.w * 0.15))
  // Inset of the ornaments from the erb edges (visual breathing room) —
  // proportional to size, min 2px to stay visible on smaller shields too.
  const hexEdgeInset  = Math.max(2, Math.round(s.w * 0.06))
  const hrotEdgeInset = Math.max(2, Math.round(s.w * 0.06))
  // Ring thickness scales with shield size: min 2 px, ~8 % of width otherwise.
  const ring = Math.max(2, Math.round(s.w * 0.08))

  return (
    <div style={{
      display: 'inline-block',
      position: 'relative',  // for absolute ornament positioning
      filter: `drop-shadow(0 0 8px ${color}55)`,
      flexShrink: 0,
    }}>
      {/* Gold outer frame — full size, clipped to erb shape. Renders as
          a visible gold ring around the player-color middle ring. Ring
          thickness scales with shield size: min 2 px, ~8 % of width otherwise. */}
      <div style={{
        width: s.w, height: s.h,
        clipPath: clip,
        background: gold,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* Player-color middle ring — sits inside the gold frame. */}
      <div style={{
        width: s.w - ring * 2, height: s.h - ring * 2,
        clipPath: isPrapor ? getPraporClip(s.w - ring * 2, s.h - ring * 2) : clip,
        background: color,
        display: 'flex',
        alignItems: symAlign,
        justifyContent: 'center',
        position: 'relative',  // for the HexOrnament inside
      }}>
        {/* HexOrnament — top edge (inside the outer border, above the inner fill).
            Inset from the erb edges for visual breathing — aligns with the inner
            border trick (outer 3px border) and the overall composition. */}
        {isDecorated && (
          <div style={{
            position: 'absolute',
            top: hexEdgeInset,
            left: hexEdgeInset,
            right: hexEdgeInset,
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <HexOrnament
              edgePadL={hexPad}
              color={ornMain}
              colorDim={ornDim}
              bgFill={color + '22'}
            />
          </div>
        )}

        {/* Inner fill — sits inside the player-color middle ring */}
        <div style={{
          width: s.w - ring * 4, height: s.h - ring * 4,
          // For the prapor we recompute the clip for the inner dimensions so the tip aligns with outer.
          clipPath: isPrapor ? getPraporClip(s.w - ring * 4, s.h - ring * 4) : clip,
          background: color + '22',
          display: 'flex',
          alignItems: symAlign,
          justifyContent: 'center',
          paddingTop: symPadTop,
        }}>
          {showSymbol && icon && (() => {
            // Icon rendered bigger than the Roman numeral (60 % of shield width)
            // and recoloured with high contrast (textHighest) so the pictogram
            // pops against the faint color@22 shield interior. cloneElement
            // overrides the icon's own width/height attributes.
            const iconSize = Math.round(s.w * 0.6)
            const sized = isValidElement(icon)
              ? cloneElement(icon, { width: iconSize, height: iconSize })
              : icon
            return (
              <span style={{
                color: textHighest,
                lineHeight: 1,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                filter: `drop-shadow(0 0 4px ${color})`,
              }}>
                {sized}
              </span>
            )
          })()}
          {showSymbol && !icon && sym && (
            <span style={{
              color: color,
              fontWeight: 900,
              fontSize: symFontSize,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              userSelect: 'none',
              textShadow: `0 0 8px ${color}88`,
            }}>
              {sym}
            </span>
          )}
        </div>
      </div>
      </div>

      {/* HrotErbu — under the bottom tip (outside the outer, so it isn't clipped
          by clip-path). Shifted up by (hrotHeight + edgeInset) — the chevron
          sits above the tip with an inset from the actual bottom point. */}
      {isDecorated && (
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: hrotEdgeInset,
          height: hrotHeight,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          lineHeight: 0,  // removes the baseline gap around the inline-svg
        }}>
          <HrotErbu width={hrotWidth} color={ornMain} colorDim={ornDim} />
        </div>
      )}
    </div>
  )
}

/**
 * Compact identity badge — small shield + player name.
 * Intended for scoreboards, the HUD and the win dialog.
 *
 * Supports two APIs:
 *   - Legacy: player={{ color, label, id }}
 *   - Flat:   name="Player 1" color="#E05C5C" vp={7}
 *
 * @param {{ color: string, label: string, id?: number }} [player]
 * @param {string} [name] - Player name (flat API)
 * @param {string} [color] - Player color (flat API)
 */
export function PlayerIdentityBadge({ player, name, color: colorProp }) {
  const color = colorProp ?? player?.color ?? neutralColor
  const label = name ?? player?.label ?? ''

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: bg2, borderRadius: 4,
      border: `1px solid ${color}44`,
      padding: '6px 12px',
    }}>
      <Shield playerColor={color} size="xs" showSymbol={false} />
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        background: `linear-gradient(180deg,${textHighest} 0%,${color} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{label}</span>
    </div>
  )
}

export default Shield
