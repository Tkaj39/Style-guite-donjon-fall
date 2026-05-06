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
  return (
    <div
      role="group"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: 4,
        background: 'linear-gradient(150deg,#2E2D4A 0%,#232238 70%)',
        border: '1px solid #8F7458',
        borderRadius: 10,
      }}
    >
      {items.map((item, i) => {
        const isActive = item.value === value
        return (
          <div key={item.value} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && dividers && (
              <span
                aria-hidden="true"
                style={{
                  width: 1,
                  alignSelf: 'stretch',
                  margin: '4px 3px',
                  background: '#8F7458',
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
            )}
            <button
              type="button"
              onClick={() => onChange?.(item.value)}
              aria-pressed={isActive}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: variant === 'tabs' && isActive ? '8px 18px' : '6px 14px',
                borderRadius: 7,
                border: 'none',
                cursor: 'pointer',
                fontSize: variant === 'tabs' && isActive ? '0.8125rem' : '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 200ms ease',
                background: isActive
                  ? 'linear-gradient(150deg,#353751 0%,#2A2948 70%)'
                  : 'transparent',
                boxShadow: isActive ? 'inset 0 0 0 1px #8F7458' : 'none',
                color: isActive ? undefined : '#8F7458',
                ...(isActive ? {
                  backgroundClip: 'text',
                  WebkitBackgroundClip: undefined,
                } : {}),
              }}
              className={[
                'focus-visible:outline-none',
                isActive
                  ? ''
                  : 'hover:!text-[#FFC183]',
              ].join(' ')}
            >
              {/* gradient text for active state */}
              {isActive ? (
                <>
                  {item.icon && (
                    <span style={{
                      width: 14, height: 14,
                      display: 'flex', alignItems: 'center', flexShrink: 0,
                      color: '#FFC183',
                      filter: 'drop-shadow(0 0 3px #FFC18366)',
                    }}>
                      {item.icon}
                    </span>
                  )}
                  <span style={{
                    background: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {item.label}
                  </span>
                </>
              ) : (
                <>
                  {item.icon && (
                    <span style={{
                      width: 14, height: 14,
                      display: 'flex', alignItems: 'center', flexShrink: 0,
                    }}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
