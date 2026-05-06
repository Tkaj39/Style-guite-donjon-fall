const styles = {
  menu: {
    container: 'inline-flex items-center gap-0.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl',
    button: {
      base: 'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
      active: 'bg-neutral-800 text-white shadow-sm',
      inactive: 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50',
    },
    divider: 'w-px h-5 bg-neutral-700/60 mx-0.5 shrink-0',
  },
  tabs: {
    container: 'inline-flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl',
    button: {
      base: 'flex items-center gap-2 rounded-lg font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
      active: 'px-5 py-2.5 text-sm text-white bg-neutral-700 shadow-md',
      inactive: 'px-3.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-300',
    },
    divider: 'w-px h-4 bg-neutral-700/60 mx-0.5 shrink-0',
  },
}

/**
 * @param {'menu'|'tabs'} variant
 * @param {boolean} dividers - show vertical dividers between items
 * @param {{ value: string, label: string, icon?: React.ReactNode }[]} items
 * @param {string} value - controlled active value
 * @param {(value: string) => void} onChange
 */
export default function ButtonGroup({
  variant = 'menu',
  dividers = false,
  items = [],
  value,
  onChange,
}) {
  const s = styles[variant] ?? styles.menu

  return (
    <div className={s.container} role="group">
      {items.map((item, i) => {
        const isActive = item.value === value
        return (
          <div key={item.value} className="flex items-center">
            {i > 0 && dividers && (
              <span className={s.divider} aria-hidden="true" />
            )}
            <button
              type="button"
              onClick={() => onChange?.(item.value)}
              aria-pressed={isActive}
              className={[
                s.button.base,
                isActive ? s.button.active : s.button.inactive,
              ].join(' ')}
            >
              {item.icon && (
                <span className="w-4 h-4 flex items-center shrink-0">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}
