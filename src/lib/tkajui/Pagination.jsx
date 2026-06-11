/* ── Pagination (tkajui) ─────────────────────────────────────────────
   Page navigator. Renders ‹prev | 1 2 … 12 13 14 … 87 88 | next›. The
   first and last page are always shown; the current page is bracketed
   by `siblingCount` neighbors; ellipses fill the gaps.

   Controlled — pass page (1-indexed) + total + onChange.

   Chips are octagonal (border-trick clip) to match the TkajUI corner
   language used by Button / Input / Card. Current page = accent-filled
   octagon.
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../shared/octagon'
import { surface3, surface4, accent, borderDefault, textHigh, textMid, textLow, primaryText } from './tokens'

const SIZE_PX = { sm: 28, md: 34, lg: 42 }
// Octagon corner-cut per chip size — proportional to the tile.
const SIZE_CX = { sm: 4, md: 5, lg: 6 }

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
  const cx = SIZE_CX[size] ?? SIZE_CX.md

  const goto = (p) => { if (p !== page && p >= 1 && p <= total) onChange?.(p) }

  // Octagonal chip — border-trick wrapper (outer = border color + clip,
  // inner = fill + clip). `tone` picks the color set.
  function Chip({ tone = 'default', disabled, onClick, ariaLabel, ariaCurrent, children }) {
    const isCurrent = tone === 'current'
    const border = isCurrent ? accent : borderDefault
    const fill   = isCurrent ? accent : surface3
    const color  = isCurrent ? primaryText : textHigh
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        className="tkajui-clip-focus"
        style={{
          minWidth: px, height: px,
          background: border,
          clipPath: octagon(cx),
          padding: 1,
          boxSizing: 'border-box',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          fontSize: '0.875rem',
          fontVariantNumeric: 'tabular-nums',
          transition: 'opacity 80ms',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%', height: '100%',
            background: fill,
            clipPath: octagon(cx),
            color,
            fontWeight: isCurrent ? 600 : 400,
            padding: '0 8px',
            boxSizing: 'border-box',
            transition: 'background 80ms, color 80ms',
          }}
          onMouseEnter={(e) => { if (!isCurrent && !disabled) e.currentTarget.style.background = surface4 }}
          onMouseLeave={(e) => { if (!isCurrent && !disabled) e.currentTarget.style.background = surface3 }}
        >
          {children}
        </span>
      </button>
    )
  }

  return (
    <nav
      aria-label="Pagination"
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}
      {...rest}
    >
      {showEdges && (
        <Chip
          onClick={() => goto(page - 1)}
          disabled={page <= 1}
          ariaLabel="Previous page"
        >‹</Chip>
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
          <Chip
            key={item}
            tone={isCurrent ? 'current' : 'default'}
            onClick={() => goto(item)}
            ariaCurrent={isCurrent ? 'page' : undefined}
          >
            {item}
          </Chip>
        )
      })}

      {showEdges && (
        <Chip
          onClick={() => goto(page + 1)}
          disabled={page >= total}
          ariaLabel="Next page"
        >›</Chip>
      )}

      <span style={{ marginLeft: 8, fontSize: '0.75rem', color: textMid, fontVariantNumeric: 'tabular-nums' }}>
        {page} / {total}
      </span>
    </nav>
  )
}
