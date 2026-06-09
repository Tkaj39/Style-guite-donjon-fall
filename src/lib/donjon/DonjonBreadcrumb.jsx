/* ── DonjonBreadcrumb (donjon-fall-ui) ───────────────────────────────
   Game variant of Breadcrumb. Same item / separator / linkComponent
   API as TkajUI Breadcrumb — visuals shift to the warm donjon palette
   (gold current, textMid links, goldDim separators).

   No octagon shell — breadcrumbs are inline navigation text, no card
   surface to clip. The donjon flair lives in the gold default
   separator (›) and the gold current page label.
   ─────────────────────────────────────────────────────────────────── */
import { gold, goldDim, textHigh, textMid } from './tokens'

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
export default function DonjonBreadcrumb({
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
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    color: isLast ? gold : textMid,
                    fontWeight: isLast ? 700 : 400,
                    letterSpacing: isLast ? 0.4 : undefined,
                  }}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" style={{ color: goldDim }}>{separator}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
