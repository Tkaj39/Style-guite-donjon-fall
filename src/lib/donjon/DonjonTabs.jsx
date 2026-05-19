/* ── DonjonTabs ──────────────────────────────────────────────────────────
   Herní varianta Tabs. Stejná funkce jako TkajUI Tabs, ale:
   - underline: HexOrnament nahrazuje spodní linku
   - pills:     HexOrnament nahoře i dole kolem tracku
   ─────────────────────────────────────────────────────────────────────── */
import { useId } from 'react'
import { HexOrnament } from './Ornaments'
import { gold, goldMid, goldDim, bg0, bg3, bg4, textActive, textDisabled } from './tokens'

const SIZES = {
  sm: { fontSize: '0.75rem',   px: 10, py: 5,  gap: 2  },
  md: { fontSize: '0.8125rem', px: 14, py: 7,  gap: 4  },
  lg: { fontSize: '0.875rem',  px: 18, py: 9,  gap: 6  },
}

const ACTIVE_TAB = {
  underline: { color: textActive, borderBottom: `2px solid ${goldMid}` },
  pills:     { color: textActive, background: `linear-gradient(135deg,${bg4} 0%,${bg3} 100%)`, border: `1px solid ${goldDim}66`, borderRadius: 4 },
}
const INACTIVE_TAB = {
  underline: { color: textDisabled, borderBottom: '2px solid transparent' },
  pills:     { color: textDisabled, background: 'transparent', border: '1px solid transparent', borderRadius: 4 },
}

export default function DonjonTabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  size = 'md',
}) {
  const rawId = useId()
  const uid   = rawId.replace(/:/g, '')
  const s     = SIZES[size] ?? SIZES.md
  const safeItems = items ?? []

  const handleKeyDown = (e, item, i) => {
    if (item.disabled) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange?.(item.value); return }
    const enabled = safeItems.map((it, idx) => ({ it, idx })).filter(x => !x.it.disabled)
    const cur = enabled.findIndex(x => x.idx === i)
    if (e.key === 'ArrowRight') {
      const next = enabled[(cur + 1) % enabled.length]
      if (next) { onChange?.(next.it.value); document.getElementById(`dtab-${next.it.value}`)?.focus() }
    }
    if (e.key === 'ArrowLeft') {
      const prev = enabled[(cur - 1 + enabled.length) % enabled.length]
      if (prev) { onChange?.(prev.it.value); document.getElementById(`dtab-${prev.it.value}`)?.focus() }
    }
  }

  const tabList = (
    <div
      role="tablist"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: s.gap,
        ...(variant === 'pills' ? {
          background: bg0,
          border: `1px solid ${goldDim}30`,
          borderRadius: 6,
          padding: 3,
        } : {}),
      }}
    >
      {safeItems.map((item, i) => {
        const isActive = item.value === value
        const tabStyle = isActive ? ACTIVE_TAB[variant] : INACTIVE_TAB[variant]

        return (
          <button
            key={item.value}
            id={`dtab-${item.value}`}
            role="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled}
            tabIndex={item.disabled ? -1 : (isActive ? 0 : -1)}
            onClick={() => !item.disabled && onChange?.(item.value)}
            onKeyDown={e => handleKeyDown(e, item, i)}
            onMouseEnter={e => { if (!isActive && !item.disabled) e.currentTarget.style.color = goldMid }}
            onMouseLeave={e => { if (!isActive && !item.disabled) e.currentTarget.style.color = INACTIVE_TAB[variant].color }}
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
            onFocus={e => { e.currentTarget.style.outline = `2px solid ${goldDim}55`; e.currentTarget.style.outlineOffset = '2px' }}
            onBlur={e => { e.currentTarget.style.outline = 'none' }}
          >
            {item.icon && <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>}
            {item.label}
            {item.badge != null && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 16, height: 16, padding: '0 4px',
                fontSize: '0.625rem', fontWeight: 700,
                background: isActive ? `${goldDim}66` : `${goldDim}33`,
                color: goldMid,
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

  if (variant === 'pills') {
    /* Pills: HexOrnament nahoře i dole kolem celého tracku */
    return (
      <div style={{ position: 'relative', paddingTop: 8, paddingBottom: 8 }}>
        <HexOrnament uid={`${uid}t`} edgePadL={4} />
        {tabList}
        <HexOrnament uid={`${uid}b`} flip edgePadL={4} />
      </div>
    )
  }

  /* Underline: HexOrnament místo spodní linky */
  return (
    <div style={{ position: 'relative', paddingBottom: 8 }}>
      {tabList}
      <HexOrnament uid={`${uid}b`} flip edgePadL={0} />
    </div>
  )
}
