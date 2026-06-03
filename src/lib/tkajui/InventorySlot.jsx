/* ── InventorySlot (tkajui) ──────────────────────────────────────────
   Square cell representing an item in an inventory grid — icon + count
   badge + optional rarity-colored border + selected ring.

   Empty slot = no `icon` prop (renders a plus-style placeholder).
   Pair with InventoryGrid for a full N×M layout.
   ─────────────────────────────────────────────────────────────────── */
import { surface2, surface3, surface4, borderDefault, accent, textHigh, textMid, textLow } from './tokens'

const SIZES = {
  xs: { box: 32, icon: 18, count: 9  },
  sm: { box: 44, icon: 24, count: 10 },
  md: { box: 56, icon: 32, count: 11 },
  lg: { box: 72, icon: 40, count: 12 },
  xl: { box: 96, icon: 56, count: 13 },
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
    ? { box: size, icon: Math.round(size * 0.55), count: Math.max(9, Math.round(size * 0.18)) }
    : (SIZES[size] ?? SIZES.md)

  const isInteractive = !!onClick && !disabled && !locked
  const ringColor = selected ? accent : (rarity ?? borderDefault)
  const empty = icon == null
  const Tag = isInteractive ? 'button' : 'div'

  return (
    <Tag
      type={isInteractive ? 'button' : undefined}
      onClick={isInteractive ? onClick : undefined}
      title={name}
      aria-label={name ?? (empty ? 'Empty slot' : undefined)}
      aria-pressed={isInteractive && selected ? true : undefined}
      disabled={isInteractive && (disabled || locked) ? true : undefined}
      className={className}
      style={{
        position: 'relative',
        width: s.box,
        height: s.box,
        padding: 0,
        background: empty ? surface2 : surface3,
        border: `2px solid ${ringColor}`,
        borderRadius: 6,
        cursor: isInteractive ? 'pointer' : 'default',
        opacity: disabled ? 0.45 : 1,
        transition: 'border-color 120ms, transform 120ms, background 120ms',
        transform: selected ? 'translateY(-1px)' : 'none',
        boxShadow: selected ? `0 0 0 1px ${accent}33` : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: empty ? textLow : textHigh,
        fontSize: s.icon,
        lineHeight: 1,
        ...style,
      }}
      onMouseEnter={isInteractive ? (e) => { e.currentTarget.style.background = surface4 } : undefined}
      onMouseLeave={isInteractive ? (e) => { e.currentTarget.style.background = empty ? surface2 : surface3 } : undefined}
      {...rest}
    >
      {empty ? <span aria-hidden="true" style={{ fontSize: s.icon * 0.5, color: textLow }}>＋</span> : icon}

      {count > 1 && (
        <span
          aria-label={`Count: ${count}`}
          style={{
            position: 'absolute',
            bottom: 2,
            right: 4,
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
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: s.icon * 0.6,
            color: textMid,
            borderRadius: 4,
          }}
        >
          🔒
        </span>
      )}
    </Tag>
  )
}
