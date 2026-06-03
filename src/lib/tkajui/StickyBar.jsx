/* ── StickyBar (tkajui) ──────────────────────────────────────────────
   Persistent action bar sticking to the top or bottom of its scroll
   parent. Used for form save bars, list filter bars, mobile-style
   bottom tab bars.

   Sticky positioning: requires the scroll container to have *any*
   intentional overflow + a non-static position. Top: 0 / bottom: 0
   only work inside that container; if you want page-level sticky,
   place the StickyBar directly under <body>.
   ─────────────────────────────────────────────────────────────────── */
import { surface2, borderDefault } from './tokens'

/**
 * @param {React.ReactNode} children
 * @param {'top'|'bottom'} [position='bottom']
 * @param {string|number} [padding='12px 20px']
 * @param {number} [offset=0]   Px offset from the edge (e.g. for a sub-header).
 * @param {string} [background]
 * @param {boolean} [bordered=true]   Show a divider on the inside edge.
 * @param {number} [zIndex=10]
 */
export default function StickyBar({
  children,
  position = 'bottom',
  padding = '12px 20px',
  offset = 0,
  background,
  bordered = true,
  zIndex = 10,
  className,
  style,
  ...rest
}) {
  const borderSide = position === 'top' ? 'borderBottom' : 'borderTop'
  return (
    <div
      className={className}
      style={{
        position: 'sticky',
        [position]: offset,
        zIndex,
        background: background ?? surface2,
        padding,
        boxSizing: 'border-box',
        [borderSide]: bordered ? `1px solid ${borderDefault}` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
