import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import CommandPalette from './CommandPalette'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const location = useLocation()

  /* ⌘K / Ctrl+K otevře command palette */
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Zavři drawer při změně route (záchytný mechanismus —
     NavItem už volá onClose při kliku, ale kdyby uživatel navigoval z URL baru) */
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname, location.hash])

  /* Escape klávesa zavře drawer + vrať focus na hamburger */
  useEffect(() => {
    if (!sidebarOpen) return
    function onKey(e) {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  /* Body scroll lock — když je drawer otevřený na mobile (lg breakpoint = 1024px),
     uzamkne se scrolování stránky pod ním */
  useEffect(() => {
    if (!sidebarOpen) return
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    if (!isMobile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [sidebarOpen])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip-link — first focusable element. Visually hidden until
          keyboard focus pulls it onscreen, lets users bypass the 30+
          sidebar items and land directly on the main content. */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          focus:absolute focus:top-2 focus:left-2 focus:z-[1000]
          focus:rounded focus:bg-indigo-600 focus:px-3 focus:py-1.5
          focus:text-sm focus:font-medium focus:text-white
          focus:outline-2 focus:outline-white focus:outline-offset-2
        "
      >
        Přeskočit na obsah
      </a>

      {/* Top navigation — sticky, viditelná na všech breakpointech */}
      <TopNav
        showMenuToggle
        onMenuToggle={() => setSidebarOpen(v => !v)}
        menuButtonRef={menuButtonRef}
        menuOpen={sidebarOpen}
        onSearchOpen={() => setPaletteOpen(true)}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <div className="flex flex-1 min-h-0">
        {/* Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content — id matches the skip-link href above so keyboard
            users land in this scroll container. tabIndex=-1 lets the link
            move focus here even though <main> isn't natively focusable. */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto outline-none"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
