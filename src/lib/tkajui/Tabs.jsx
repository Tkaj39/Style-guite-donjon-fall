/* ── Tabs ───────────────────────────────────────────────────────────────
   Horizontální záložková navigace. Dvě varianty vizuálu (underline / pills),
   dvě velikosti, podpora ikon, disabled záložky, plná klávesnicová přístupnost.
   ─────────────────────────────────────────────────────────────────────── */

const VARIANTS = {
  underline: {
    track:       { borderBottom: '1px solid #8F745430' },
    activeTab:   { color: '#F0E6D3', borderBottom: '2px solid #B8956A' },
    inactiveTab: { color: '#8F9CB3', borderBottom: '2px solid transparent' },
    hoverColor:  '#C8A87A',
  },
  pills: {
    track:       { background: '#12102A', border: '1px solid #8F745430', borderRadius: 6, padding: 3 },
    activeTab:   { color: '#F0E6D3', background: 'linear-gradient(135deg,#2E2B50 0%,#252340 100%)', border: '1px solid #8F745466', borderRadius: 4 },
    inactiveTab: { color: '#8F9CB3', background: 'transparent', border: '1px solid transparent', borderRadius: 4 },
    hoverColor:  '#C8A87A',
  },
}

const SIZES = {
  sm: { fontSize: '0.75rem',   px: 10, py: 5,  gap: 2  },
  md: { fontSize: '0.8125rem', px: 14, py: 7,  gap: 4  },
  lg: { fontSize: '0.875rem',  px: 18, py: 9,  gap: 6  },
}

export default function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  size = 'md',
}) {
  const v = VARIANTS[variant] ?? VARIANTS.underline
  const s = SIZES[size] ?? SIZES.md

  const handleKeyDown = (e, item, i) => {
    if (item.disabled) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange?.(item.value); return }
    const enabled = items.map((it, idx) => ({ it, idx })).filter(x => !x.it.disabled)
    const cur = enabled.findIndex(x => x.idx === i)
    if (e.key === 'ArrowRight') {
      const next = enabled[(cur + 1) % enabled.length]
      if (next) { onChange?.(next.it.value); document.getElementById(`tab-${next.it.value}`)?.focus() }
    }
    if (e.key === 'ArrowLeft') {
      const prev = enabled[(cur - 1 + enabled.length) % enabled.length]
      if (prev) { onChange?.(prev.it.value); document.getElementById(`tab-${prev.it.value}`)?.focus() }
    }
  }

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: s.gap,
        ...v.track,
      }}
    >
      {items.map((item, i) => {
        const isActive = item.value === value
        const tabStyle = isActive ? v.activeTab : v.inactiveTab

        return (
          <button
            key={item.value}
            id={`tab-${item.value}`}
            role="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled}
            tabIndex={item.disabled ? -1 : (isActive ? 0 : -1)}
            onClick={() => !item.disabled && onChange?.(item.value)}
            onKeyDown={e => handleKeyDown(e, item, i)}
            onMouseEnter={e => { if (!isActive && !item.disabled) e.currentTarget.style.color = v.hoverColor }}
            onMouseLeave={e => { if (!isActive && !item.disabled) e.currentTarget.style.color = v.inactiveTab.color }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: `${s.py}px ${s.px}px`,
              fontSize: s.fontSize,
              fontWeight: isActive ? 600 : 400,
              letterSpacing: isActive ? '0.04em' : '0.02em',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              opacity: item.disabled ? 0.35 : 1,
              background: 'transparent',
              border: 'none',
              transition: 'color 0.12s, background 0.12s, border-color 0.12s',
              outline: 'none',
              marginBottom: variant === 'underline' ? -1 : 0,
              ...tabStyle,
            }}
            onFocus={e => { e.currentTarget.style.outline = '2px solid #8F745566'; e.currentTarget.style.outlineOffset = '2px' }}
            onBlur={e => { e.currentTarget.style.outline = 'none' }}
          >
            {item.icon && <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>}
            {item.label}
            {item.badge != null && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 16, height: 16, padding: '0 4px',
                fontSize: '0.625rem', fontWeight: 700,
                background: isActive ? '#8F745466' : '#8F745433',
                color: '#B8956A',
                borderRadius: 8,
              }}>
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
