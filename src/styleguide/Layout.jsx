import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function HamburgerIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
      <rect y="3" width="20" height="2" rx="1" />
      <rect y="9" width="20" height="2" rx="1" />
      <rect y="15" width="20" height="2" rx="1" />
    </svg>
  )
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-neutral-950 border-b border-neutral-800 flex items-center px-4 gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Otevřít menu"
        >
          <HamburgerIcon />
        </button>
        <div>
          <span className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">Donjon Fall</span>
          <span className="text-neutral-600 mx-2">/</span>
          <span className="text-sm font-semibold text-white">Style Guide</span>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto lg:ml-0 mt-14 lg:mt-0">
        <Outlet />
      </main>
    </div>
  )
}
