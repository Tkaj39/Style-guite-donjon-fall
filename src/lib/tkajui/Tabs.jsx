/* ── Tabs ───────────────────────────────────────────────────────────────
   Horizontální záložková navigace. Dvě varianty vizuálu (underline / pills),
   dvě velikosti, podpora ikon, disabled záložky, plná klávesnicová přístupnost.
   Čistá TkajUI paleta.
   ─────────────────────────────────────────────────────────────────────── */

import {
  accent,
  surface1, surface2, surface3,
  borderDefault, borderMid,
  textHigh, textMid, textLow,
} from './tokens'

const VARIANTS = {
  underline: {
    track:       { borderBottom: `1px solid ${borderDefault}` },
    activeTab:   { color: textHigh, borderBottom: `2px solid ${accent}` },
    inactiveTab: { color: textMid,  borderBottom: '2px solid transparent' },
    hoverColor:  textHigh,
  },
  pills: {
    track:       { background: surface1, border: `1px solid ${borderDefault}`, borderRadius: 6, padding: 3 },
    activeTab:   { color: textHigh, background: surface3, border: `1px solid ${borderMid}`, borderRadius: 4 },
    inactiveTab: { color: textMid,  background: 'transparent', border: '1px solid transparent', borderRadius: 4 },
    hoverColor:  textHigh,
  },
}

const SIZES = {
  sm: { fontSize: '0.75rem',   px: 10, py: 5,  gap: 2 },
  md: { fontSize: '0.8125rem', px: 14, py: 7,  gap: 4 },
  lg: { fontSize: '0.875rem',  px: 18, py: 9,  gap: 6 },
}

export default function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  orientation = 'horizontal',   // 'horizontal' | 'vertical'
  onClose,                       // (itemValue) => void — pokud předáno, items s closable: true zobrazí ×
}) {
  const v = VARIANTS[variant] ?? VARIANTS.underline
  const s = SIZES[size] ?? SIZES.md
  const safeItems = items ?? []
  const isVertical = orientation === 'vertical'

  const handleKeyDown = (e, item, i) => {
    if (item.disabled) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange?.(item.value); return }
    const enabled = safeItems.map((it, idx) => ({ it, idx })).filter(x => !x.it.disabled)
    const cur = enabled.findIndex(x => x.idx === i)
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'
    const prevKey = isVertical ? 'ArrowUp'   : 'ArrowLeft'
    if (e.key === nextKey) {
      const next = enabled[(cur + 1) % enabled.length]
      if (next) { onChange?.(next.it.value); document.getElementById(`tab-${next.it.value}`)?.focus() }
    }
    if (e.key === prevKey) {
      const prev = enabled[(cur - 1 + enabled.length) % enabled.length]
      if (prev) { onChange?.(prev.it.value); document.getElementById(`tab-${prev.it.value}`)?.focus() }
    }
  }

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        flexWrap: isVertical ? 'nowrap' : 'wrap',
        gap: s.gap,
        alignItems: isVertical ? 'stretch' : undefined,
        ...v.track,
        // Vertical underline → border na pravé straně místo spodní
        ...(isVertical && variant === 'underline' ? {
          borderBottom: 'none',
          borderRight: `1px solid ${borderDefault}`,
          alignItems: 'stretch',
        } : {}),
      }}
    >
      {safeItems.map((item, i) => {
        const isActive = item.value === value
        const tabStyle = isActive ? v.activeTab : v.inactiveTab
        const isClosable = onClose && item.closable

        // V vertikálním underline módu: aktivní border na pravé straně (ne spodní)
        const verticalActiveStyle = isVertical && variant === 'underline' && isActive
          ? { borderBottom: 'none', borderRight: `2px solid ${accent}`, marginRight: -1, marginBottom: 0 }
          : isVertical && variant === 'underline' && !isActive
            ? { borderBottom: 'none', borderRight: '2px solid transparent', marginRight: -1, marginBottom: 0 }
            : {}

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
              justifyContent: isVertical ? 'flex-start' : undefined,
              gap: 6,
              padding: `${s.py}px ${s.px}px`,
              fontSize: s.fontSize,
              fontWeight: isActive ? 600 : 400,
              letterSpacing: isActive ? '0.02em' : '0.01em',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              opacity: item.disabled ? 0.35 : 1,
              background: 'transparent',
              border: 'none',
              transition: 'color 0.12s, background 0.12s, border-color 0.12s',
              outline: 'none',
              marginBottom: variant === 'underline' && !isVertical ? -1 : 0,
              ...tabStyle,
              ...verticalActiveStyle,
            }}
            onFocus={e => { e.currentTarget.style.outline = `2px solid ${accent}99`; e.currentTarget.style.outlineOffset = '3px' }}
            onBlur={e => { e.currentTarget.style.outline = 'none' }}
          >
            {item.icon && <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>}
            {item.label}
            {item.badge != null && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 16, height: 16, padding: '0 4px',
                fontSize: '0.625rem', fontWeight: 700,
                background: isActive ? `${accent}33` : `${accent}18`,
                color: accent,
                borderRadius: 8,
              }}>
                {item.badge}
              </span>
            )}
            {isClosable && (
              <span
                role="button"
                aria-label={`Zavřít ${item.label}`}
                tabIndex={-1}
                onClick={e => { e.stopPropagation(); onClose(item.value) }}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 14, height: 14, marginLeft: 2,
                  borderRadius: 3,
                  fontSize: '0.75rem', lineHeight: 1,
                  color: textLow, cursor: 'pointer',
                  opacity: 0.6,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${textLow}22`; e.currentTarget.style.opacity = 1 }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = 0.6 }}
              >
                ×
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
