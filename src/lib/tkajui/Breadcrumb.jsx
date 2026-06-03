/* ── Breadcrumb (tkajui) ─────────────────────────────────────────────
   Hierarchical path navigation — Home › Library › Item. Items can be
   plain text or render through a custom `linkComponent` (e.g. React
   Router <Link>). The last item is treated as the current page
   (aria-current="page", non-clickable, brighter color).

   No assumption on routing — pass href + optional linkComponent.
   ─────────────────────────────────────────────────────────────────── */
import { textHigh, textMid, textLow } from './tokens'

/**
 * @typedef {object} BreadcrumbItem
 * @prop {React.ReactNode} label
 * @prop {string} [href]
 * @prop {() => void} [onClick]
 */

/**
 * @param {BreadcrumbItem[]} items
 * @param {React.ReactNode} [separator='›']
 * @param {React.ElementType} [linkComponent='a']  Override for router Link.
 */
export default function Breadcrumb({
  items = [],
  separator = '›',
  linkComponent: Link = 'a',
  className,
  style,
  ...rest
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem', ...style }}
      {...rest}
    >
      <ol style={{ display: 'flex', alignItems: 'center', gap: 6, listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          const interactive = !isLast && (item.href || item.onClick)
          return (
            <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {interactive ? (
                <Link
                  href={item.href}
                  to={item.href}
                  onClick={item.onClick}
                  style={{
                    color: textMid,
                    textDecoration: 'none',
                    transition: 'color 80ms',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = textHigh }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = textMid }}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} style={{ color: isLast ? textHigh : textMid, fontWeight: isLast ? 600 : 400 }}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" style={{ color: textLow }}>{separator}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
