import { useState, useEffect } from 'react'
import { BREAKPOINTS } from './tokens'

/**
 * Hook for responsive behavior — returns the current viewport width and breakpoint flags.
 *
 * @returns {{ width: number, isMobile: boolean, isTablet: boolean, isDesktop: boolean, isWide: boolean, isTouch: boolean }}
 *
 * @example
 * const { isMobile, isDesktop } = useBreakpoint()
 * // Responsive layout:
 * <div style={{ flexDirection: isMobile ? 'column' : 'row' }}>...</div>
 *
 * @example
 * // Conditional rendering:
 * const { isTouch } = useBreakpoint()
 * <ActionTile size={isTouch ? 'lg' : 'md'} />
 */
export default function useBreakpoint() {
  const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.desktop)
  const [width, setWidth] = useState(getWidth)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  /** < 768 px */
  const isMobile  = width < BREAKPOINTS.tablet
  /** 768–1023 px */
  const isTablet  = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop
  /** ≥ 1024 px */
  const isDesktop = width >= BREAKPOINTS.desktop
  /** ≥ 1280 px */
  const isWide    = width >= BREAKPOINTS.wide
  /** mobile or tablet (touch-first, smaller hit targets) */
  const isTouch   = width < BREAKPOINTS.desktop

  return { width, isMobile, isTablet, isDesktop, isWide, isTouch }
}
