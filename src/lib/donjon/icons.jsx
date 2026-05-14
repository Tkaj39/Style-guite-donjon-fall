/**
 * Herní ikony pro donjon-fall-ui
 * Každá ikona je čistá SVG komponenta (přijímá width, height — color přes currentColor)
 */

export function SwordIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M4 20L14 10M14 10L18 4L20 6L14 10M14 10L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 12L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function ShieldIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <path d="M12 3L4 7V12C4 16.4 7.4 20.5 12 21C16.6 20.5 20 16.4 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function TowerIcon({ width = 24, height = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <rect x="6" y="11" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 11V7H8V9H10V7H14V9H16V7H18V11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 21V17H14V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}
