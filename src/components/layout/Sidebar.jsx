import { NavLink } from 'react-router-dom'

const sections = [
  {
    label: 'Foundations',
    items: [
      { to: '/colors', label: 'Colors' },
      { to: '/typography', label: 'Typography' },
      { to: '/spacing', label: 'Spacing' },
    ],
  },
  {
    label: 'Components',
    items: [
      { to: '/buttons', label: 'Buttons' },
      { to: '/button-groups', label: 'Button Groups' },
      { to: '/inputs', label: 'Inputs' },
      { to: '/badges', label: 'Badges' },
      { to: '/cards', label: 'Cards' },
    ],
  },
]

function CloseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={[
        // Base
        'fixed lg:sticky top-0 h-screen z-50',
        'w-64 shrink-0 border-r border-neutral-800',
        'bg-neutral-950 py-8 px-5 flex flex-col gap-8',
        'transition-transform duration-300 ease-in-out',
        // Mobile: slide in/out
        'lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
            Donjon Fall
          </p>
          <h1 className="text-lg font-bold text-white">Style Guide</h1>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-md text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Zavřít menu"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6 flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
              {section.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'bg-brand-500/20 text-brand-400 font-medium'
                          : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
