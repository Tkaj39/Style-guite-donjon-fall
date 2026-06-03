/* ── HUDLayout (donjon-fall-ui) ──────────────────────────────────────
   Game HUD scaffold: optional top bar + bottom bar + corner slots
   (topLeft, topRight, bottomLeft, bottomRight) + center action area.
   The center slot is where gameplay happens; everything else floats
   above it via absolute positioning.

   Use this once at the screen root — for sub-panels use SidebarLayout
   / Stack / Inline.
   ─────────────────────────────────────────────────────────────────── */
import { bg2, borderDefault } from './tokens'

/**
 * @param {React.ReactNode} [top]
 * @param {React.ReactNode} [bottom]
 * @param {React.ReactNode} [topLeft]
 * @param {React.ReactNode} [topRight]
 * @param {React.ReactNode} [bottomLeft]
 * @param {React.ReactNode} [bottomRight]
 * @param {React.ReactNode} children   Center gameplay area.
 * @param {string|number} [height='100vh']
 * @param {boolean} [bordered=true]    Top/bottom dividers.
 */
export default function HUDLayout({
  top,
  bottom,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
  height = '100vh',
  bordered = true,
  className,
  style,
  ...rest
}) {
  const barBorder = bordered ? `1px solid ${borderDefault}` : 'none'
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height,
        width: '100%',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {top && (
        <header style={{
          flex: '0 0 auto',
          background: bg2,
          borderBottom: barBorder,
          padding: '8px 16px',
          boxSizing: 'border-box',
          zIndex: 2,
        }}>
          {top}
        </header>
      )}
      <div style={{ position: 'relative', flex: '1 1 auto', minHeight: 0, overflow: 'hidden' }}>
        {children}
        {topLeft     && <div style={cornerStyle('top',    'left')}>{topLeft}</div>}
        {topRight    && <div style={cornerStyle('top',    'right')}>{topRight}</div>}
        {bottomLeft  && <div style={cornerStyle('bottom', 'left')}>{bottomLeft}</div>}
        {bottomRight && <div style={cornerStyle('bottom', 'right')}>{bottomRight}</div>}
      </div>
      {bottom && (
        <footer style={{
          flex: '0 0 auto',
          background: bg2,
          borderTop: barBorder,
          padding: '8px 16px',
          boxSizing: 'border-box',
          zIndex: 2,
        }}>
          {bottom}
        </footer>
      )}
    </div>
  )
}

function cornerStyle(v, h) {
  return {
    position: 'absolute',
    [v]: 12,
    [h]: 12,
    zIndex: 3,
    pointerEvents: 'auto',
  }
}
