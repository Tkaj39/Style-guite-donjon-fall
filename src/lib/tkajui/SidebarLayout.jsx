/* ── SidebarLayout (tkajui) ──────────────────────────────────────────
   Two-column page layout: persistent sidebar (left or right) + main
   content area. Sidebar can collapse to a fixed narrow width or fully
   hide on narrow viewports.

   Self-contained CSS — uses a CSS container query via inline `width`
   media check is *not* possible without runtime sniffing, so the
   responsive collapse is driven by a `collapsed` prop you pass from
   your own breakpoint state.
   ─────────────────────────────────────────────────────────────────── */
import { surface2, borderDefault } from './tokens'

/**
 * @param {React.ReactNode} sidebar       Sidebar contents (nav, filters).
 * @param {React.ReactNode} children      Main column.
 * @param {number|string} [sidebarWidth=240]
 * @param {number|string} [collapsedWidth=56]
 * @param {'left'|'right'} [side='left']
 * @param {boolean} [collapsed=false]     When true, sidebar shrinks to collapsedWidth.
 * @param {boolean} [bordered=true]       Border between sidebar and main.
 * @param {number|string} [gap=0]
 * @param {string} [background]           Sidebar background (defaults to surface2).
 * @param {string|number} [height='100%']
 */
export default function SidebarLayout({
  sidebar,
  children,
  sidebarWidth = 240,
  collapsedWidth = 56,
  side = 'left',
  collapsed = false,
  bordered = true,
  gap = 0,
  background,
  height = '100%',
  className,
  style,
  ...rest
}) {
  const w = collapsed ? collapsedWidth : sidebarWidth
  const borderSide = side === 'left' ? 'borderRight' : 'borderLeft'

  const sidebarPanel = (
    <aside
      style={{
        flex: `0 0 ${typeof w === 'number' ? `${w}px` : w}`,
        background: background ?? surface2,
        [borderSide]: bordered ? `1px solid ${borderDefault}` : undefined,
        overflowY: 'auto',
        transition: 'flex-basis 200ms ease',
        boxSizing: 'border-box',
      }}
    >
      {sidebar}
    </aside>
  )
  const mainPanel = (
    <main style={{ flex: '1 1 auto', minWidth: 0, overflowY: 'auto', boxSizing: 'border-box' }}>
      {children}
    </main>
  )

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: side === 'right' ? 'row-reverse' : 'row',
        width: '100%',
        height,
        gap,
        ...style,
      }}
      {...rest}
    >
      {sidebarPanel}
      {mainPanel}
    </div>
  )
}
