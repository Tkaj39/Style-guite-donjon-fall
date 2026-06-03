/* ── Pagination (tkajui) ─────────────────────────────────────────────
   Page navigator. Renders ‹prev | 1 2 … 12 13 14 … 87 88 | next›. The
   first and last page are always shown; the current page is bracketed
   by `siblingCount` neighbors; ellipses fill the gaps.

   Controlled — pass page (1-indexed) + total + onChange.
   ─────────────────────────────────────────────────────────────────── */
import { surface3, surface4, accent, borderDefault, textHigh, textMid, textLow, primaryText } from './tokens'

const SIZE_PX = { sm: 28, md: 34, lg: 42 }

/**
 * Build the page window: [1, 2, '…', 7, 8, 9, '…', 49, 50]
 */
function range(page, total, sibling) {
  if (total <= 1) return [1]
  const pages = new Set([1, total, page])
  for (let i = 1; i <= sibling; i++) {
    if (page - i >= 1)     pages.add(page - i)
    if (page + i <= total) pages.add(page + i)
  }
  const sorted = [...pages].filter(n => n >= 1 && n <= total).sort((a, b) => a - b)
  const out = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push('…')
    out.push(sorted[i])
  }
  return out
}

/**
 * @param {number} page          Current page (1-indexed).
 * @param {number} total         Total pages.
 * @param {(page: number) => void} onChange
 * @param {number} [siblingCount=1]
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [showEdges=true]  Show prev/next chevrons.
 */
export default function Pagination({
  page,
  total,
  onChange,
  siblingCount = 1,
  size = 'md',
  showEdges = true,
  className,
  style,
  ...rest
}) {
  if (total <= 1) return null
  const items = range(page, total, siblingCount)
  const px = SIZE_PX[size] ?? SIZE_PX.md

  const baseBtn = {
    minWidth: px, height: px, padding: '0 8px',
    background: surface3, color: textHigh,
    border: `1px solid ${borderDefault}`,
    borderRadius: 4,
    cursor: 'pointer', fontSize: '0.875rem',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 80ms, color 80ms, border-color 80ms',
    fontVariantNumeric: 'tabular-nums',
  }

  const goto = (p) => { if (p !== page && p >= 1 && p <= total) onChange?.(p) }

  return (
    <nav
      aria-label="Pagination"
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}
      {...rest}
    >
      {showEdges && (
        <button
          type="button"
          onClick={() => goto(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          style={{ ...baseBtn, opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
        >‹</button>
      )}

      {items.map((item, i) => {
        if (item === '…') {
          return (
            <span key={`gap-${i}`} aria-hidden="true" style={{ color: textLow, padding: '0 4px', fontSize: '0.875rem' }}>
              …
            </span>
          )
        }
        const isCurrent = item === page
        return (
          <button
            key={item}
            type="button"
            onClick={() => goto(item)}
            aria-current={isCurrent ? 'page' : undefined}
            style={{
              ...baseBtn,
              background: isCurrent ? accent : surface3,
              color: isCurrent ? primaryText : textHigh,
              borderColor: isCurrent ? accent : borderDefault,
              fontWeight: isCurrent ? 600 : 400,
            }}
            onMouseEnter={(e) => { if (!isCurrent) { e.currentTarget.style.background = surface4 } }}
            onMouseLeave={(e) => { if (!isCurrent) { e.currentTarget.style.background = surface3 } }}
          >
            {item}
          </button>
        )
      })}

      {showEdges && (
        <button
          type="button"
          onClick={() => goto(page + 1)}
          disabled={page >= total}
          aria-label="Next page"
          style={{ ...baseBtn, opacity: page >= total ? 0.4 : 1, cursor: page >= total ? 'not-allowed' : 'pointer' }}
        >›</button>
      )}

      <span style={{ marginLeft: 8, fontSize: '0.75rem', color: textMid, fontVariantNumeric: 'tabular-nums' }}>
        {page} / {total}
      </span>
    </nav>
  )
}
