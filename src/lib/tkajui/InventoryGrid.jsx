/* ── InventoryGrid (tkajui) ──────────────────────────────────────────
   Pads an array of items into a fixed N×M grid of <InventorySlot>s.
   Missing items render as empty slots. Useful when the inventory has
   a maximum capacity (backpack slots, hotbar).

   For an open-ended/scrolling list use a plain <Grid> with
   <InventorySlot>s instead.
   ─────────────────────────────────────────────────────────────────── */
import InventorySlot from './InventorySlot'
import { resolveSpace } from '../shared/tokens'

/**
 * @param {Array<object|null>} items   Item descriptors. Each: {icon, count, name, rarity, ...}.
 *                                     `null` / undefined → empty slot.
 * @param {number} columns             Grid width in cells.
 * @param {number} [rows]              Grid height in cells. Inferred from items
 *                                     length / columns if omitted.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|number} [size='md']
 * @param {string|number} [gap='xs']   Space between cells (token or px).
 * @param {number} [selectedIndex]     Index of the selected slot.
 * @param {(index: number, item: object|null) => void} [onSelect]
 *                                     Click handler. Receives slot index + item (or null).
 */
export default function InventoryGrid({
  items = [],
  columns,
  rows,
  size = 'md',
  gap = 'xs',
  selectedIndex,
  onSelect,
  className,
  style,
  ...rest
}) {
  const totalRows = rows ?? Math.max(1, Math.ceil(items.length / columns))
  const total = columns * totalRows
  const padded = Array.from({ length: total }, (_, i) => items[i] ?? null)
  const gapPx = typeof gap === 'number' ? gap : resolveSpace(gap)

  return (
    <div
      role="grid"
      aria-rowcount={totalRows}
      aria-colcount={columns}
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, max-content)`,
        gap: gapPx,
        ...style,
      }}
      {...rest}
    >
      {padded.map((item, i) => (
        <div key={i} role="gridcell">
          <InventorySlot
            {...(item ?? {})}
            size={size}
            selected={selectedIndex === i}
            onClick={onSelect ? () => onSelect(i, item) : undefined}
          />
        </div>
      ))}
    </div>
  )
}
