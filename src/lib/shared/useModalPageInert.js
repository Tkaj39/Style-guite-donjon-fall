import { useEffect } from 'react'

let openModalCount = 0

/**
 * Marks #root inert while a modal is open so background content is
 * unreachable to focus, clicks, and screen readers (React 19 inert prop).
 * Ref-counted for nested/unmount edge cases; modals render via portal to body.
 */
export function useModalPageInert(isOpen) {
  useEffect(() => {
    if (!isOpen) return

    const root = document.getElementById('root')
    if (!root) return

    openModalCount += 1
    if (openModalCount === 1) root.inert = true

    return () => {
      openModalCount = Math.max(0, openModalCount - 1)
      if (openModalCount === 0) root.inert = false
    }
  }, [isOpen])
}
