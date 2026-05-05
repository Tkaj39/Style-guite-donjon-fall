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
      { to: '/inputs', label: 'Inputs' },
      { to: '/badges', label: 'Badges' },
      { to: '/cards', label: 'Cards' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-neutral-800 min-h-screen py-8 px-5 flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">Donjon Fall</p>
        <h1 className="text-lg font-bold text-white">Style Guide</h1>
      </div>

      <nav className="flex flex-col gap-6">
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
                    className={({ isActive }) =>
                      `block px-3 py-1.5 rounded-md text-sm transition-colors ${
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
