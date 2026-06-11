/* ── InventorySlot (tkajui) ──────────────────────────────────────────
   Square cell representing an item in an inventory grid — icon + count
   badge + optional rarity-colored border + selected ring.

   Octagonal silhouette via the border-trick (ring = 2 px), matching
   the TkajUI corner language (Button / Card / Thumbnail).

   Empty slot = no `icon` prop (renders a plus-style placeholder).
   Pair with InventoryGrid for a full N×M layout.
   ─────────────────────────────────────────────────────────────────── */
import { octagon, octagonInner } from '../shared/octagon'
import { surface2, surface3, surface4, borderDefault, accent, textHigh, textMid, textLow } from './tokens'
import { LockIcon } from './Icons'

const SIZES = {
  xs: { box: 32, icon: 18, count: 9,  cx: 5  },
  sm: { box: 44, icon: 24, count: 10, cx: 6  },
  md: { box: 56, icon: 32, count: 11, cx: 8  },
  lg: { box: 72, icon: 40, count: 12, cx: 10 },
  xl: { box: 96, icon: 56, count: 13, cx: 13 },
}

/**
 * @param {React.ReactNode} [icon]      Item glyph (emoji, <svg>, <img>).
 *                                      Omit for an empty slot.
 * @param {number} [count]              When > 1, shows a count badge bottom-right.
 * @param {string} [name]               Item name (used for the tooltip-style title attr).
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|number} [size='md']  Cell size.
 * @param {string} [rarity]             Border color override (rarity tint).
 *                                      e.g. legendary='#f0a030', rare='#4fa3f5'.
 * @param {boolean} [selected=false]    Accent ring + lift.
 * @param {boolean} [disabled=false]
 * @param {boolean} [locked=false]      Greys out + lock icon overlay.
 * @param {() => void} [onClick]        When set, slot becomes a button.
 */
export default function InventorySlot({
  icon,
  count,
  name,
  size = 'md',
  rarity,
  selected = false,
  disabled = false,
  locked = false,
  onClick,
  className,
  style,
  ...rest
}) {
  const s = typeof size === 'number'
    ? { box: size, icon: Math.round(size * 0.55), count: Math.max(9, Math.round(size * 0.18)), cx: Math.round(size * 0.14) }
    : (SIZES[size] ?? SIZES.md)

  const isInteractive = !!onClick && !disabled && !locked
  const ringColor = selected ? accent : (rarity ?? borderDefault)
  const empty = icon == null
  const fillBg = empty ? surface2 : surface3
  const Tag = isInteractive ? 'button' : 'div'

  return (
    <Tag
      type={isInteractive ? 'button' : undefined}
      onClick={isInteractive ? onClick : undefined}
      title={name}
      aria-label={name ?? (empty ? 'Empty slot' : undefined)}
      aria-pressed={isInteractive && selected ? true : undefined}
      disabled={isInteractive && (disabled || locked) ? true : undefined}
      className={[isInteractive ? 'tkajui-clip-focus' : null, className].filter(Boolean).join(' ') || undefined}
      style={{
        position: 'relative',
        width: s.box,
        height: s.box,
        padding: 0,
        // Octagon ring via border-trick — outer = ring color + clip.
        background: ringColor,
        clipPath: octagon(s.cx),
        border: 'none',
        cursor: isInteractive ? 'pointer' : 'default',
        opacity: disabled ? 0.45 : 1,
        transition: 'background 120ms, transform 120ms, filter 120ms',
        transform: selected ? 'translateY(-1px)' : 'none',
        filter: selected ? `drop-shadow(0 0 4px ${accent}55)` : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: empty ? textLow : textHigh,
        fontSize: s.icon,
        lineHeight: 1,
        ...style,
      }}
      onMouseEnter={isInteractive ? (e) => { const inner = e.currentTarget.querySelector('[data-slot-fill]'); if (inner) inner.style.background = surface4 } : undefined}
      onMouseLeave={isInteractive ? (e) => { const inner = e.currentTarget.querySelector('[data-slot-fill]'); if (inner) inner.style.background = fillBg } : undefined}
      {...rest}
    >
      {/* Inner fill — 2 px inset reveals the ring along all 8 edges. */}
      <span
        aria-hidden="true"
        data-slot-fill
        style={{
          position: 'absolute',
          inset: 2,
          clipPath: octagonInner(s.cx, 2),
          background: fillBg,
          transition: 'background 120ms',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {empty ? <span aria-hidden="true" style={{ fontSize: s.icon * 0.5, color: textLow }}>＋</span> : icon}
      </span>

      {count > 1 && (
        <span
          aria-label={`Count: ${count}`}
          style={{
            position: 'absolute',
            bottom: 2,
            right: 4,
            zIndex: 2,
            fontSize: s.count,
            fontWeight: 700,
            color: textHigh,
            textShadow: '0 0 3px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
          }}
        >
          {count}
        </span>
      )}

      {locked && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 2,
            zIndex: 2,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: textMid,
            clipPath: octagonInner(s.cx, 2),
          }}
        >
          <LockIcon width={Math.round(s.icon * 0.6)} height={Math.round(s.icon * 0.6)} />
        </span>
      )}
    </Tag>
  )
}
