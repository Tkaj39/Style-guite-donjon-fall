/* ── DonjonTabs ──────────────────────────────────────────────────────────
   Herní varianta Tabs.
   - underline: dvě full-width čáry (top + bottom), na hover mezera v horní
                čáře u dané položky + hexagon v mezeře
   - pills:     HexOrnament nahoře i dole kolem tracku (nezměněno)
   ─────────────────────────────────────────────────────────────────────── */
import { useId, useState, useRef, useLayoutEffect } from 'react'
import { HexOrnament } from './Ornaments'
import { octagon } from '../../utils/octagon'
import { gold, goldMid, goldDim, bg0, bg3, bg4, textActive, textDisabled, VARIANT_BG, VARIANT_BORDER, VARIANT_TITLE_GRAD } from './tokens'

const SIZES = {
  xs: { fontSize: '0.6875rem', px: 8,  py: 4,  gap: 2, cx: 3 },
  sm: { fontSize: '0.75rem',   px: 10, py: 5,  gap: 2, cx: 5 },
  md: { fontSize: '0.8125rem', px: 14, py: 7,  gap: 4, cx: 7 },
  lg: { fontSize: '0.875rem',  px: 18, py: 9,  gap: 6, cx: 9 },
}

const ACTIVE_TAB = {
  underline: { color: textActive },
  topline:   { color: textActive },
  pills:     {},
}
const INACTIVE_TAB = {
  underline: { color: textDisabled },
  topline:   { color: textDisabled },
  pills:     { color: textDisabled },
}

const LINE_GRAD = `linear-gradient(90deg,${goldDim} 0%,${gold} 50%,${goldDim} 100%)`

/* Inline hexagon SVG — stejný tvar jako v HexOrnament */
function HexSvg({ uid }) {
  const g = `url(#${uid}-hg)`
  return (
    <svg width="10.14" height="7" viewBox="18.65 0 5.07 7" fill="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`${uid}-hg`} x1="21.1848" y1="0" x2="21.1848" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor={gold} />
          <stop offset="1" stopColor={goldDim} />
        </linearGradient>
      </defs>
      <path
        d="M20.9348 0.72168C21.0895 0.632366 21.2801 0.632366 21.4348 0.72168L23.4661 1.89453C23.6206 1.98384 23.716 2.14867 23.7161 2.32715V4.67285C23.716 4.85133 23.6206 5.01616 23.4661 5.10547L21.4348 6.27832C21.2801 6.36763 21.0895 6.36763 20.9348 6.27832L18.9036 5.10547C18.749 5.01616 18.6536 4.85133 18.6536 4.67285V2.32715C18.6536 2.14867 18.749 1.98384 18.9036 1.89453L20.9348 0.72168Z"
        fill={bg4}
        stroke={g}
      />
    </svg>
  )
}

export default function DonjonTabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  ornament = 'decorated',
  onClose,             // (itemValue) => void — closable taby s × ikonou (items.closable: true)
}) {
  const rawId = useId()
  const uid   = rawId.replace(/:/g, '')
  const s     = SIZES[size] ?? SIZES.md
  const safeItems = items ?? []
  const hasOrnaments = ornament !== 'plain'

  /* ── Hover tracking pro underline hex ── */
  const [hoveredValue, setHoveredValue] = useState(null)
  const [activeGap, setActiveGap] = useState(null)
  const [hoverGap,  setHoverGap]  = useState(null)
  const containerRef = useRef(null)
  const tabRefs = useRef({})

  const measureTab = (tabValue) => {
    const container = containerRef.current
    const tab = tabRefs.current[tabValue]
    if (!container || !tab) return null
    const cr = container.getBoundingClientRect()
    const tr = tab.getBoundingClientRect()
    return { left: tr.left - cr.left, rightEdge: tr.right - cr.left, centerX: tr.left - cr.left + tr.width / 2 }
  }

  useLayoutEffect(() => {
    if (!value) { setActiveGap(null); return }
    setActiveGap(measureTab(value))
  }, [value])

  useLayoutEffect(() => {
    if (!hoveredValue || hoveredValue === value) { setHoverGap(null); return }
    setHoverGap(measureTab(hoveredValue))
  }, [hoveredValue, value])

  /* ── Keyboard navigation ── */
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

  /* ── Tab list ── */
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
        const isPillsActive = isActive && variant === 'pills'
        /* active pill in plain mode: border goes on outer wrapper, not button */
        const needsPillBorder = isPillsActive && !hasOrnaments
        const plainUnderlineStyle = !hasOrnaments && variant !== 'pills'
          ? variant === 'topline'
            ? {
                color: isActive ? textActive : textDisabled,
                borderTop: `1px solid ${isActive ? gold : 'transparent'}`,
                marginTop: -1,
              }
            : {
                color: isActive ? textActive : textDisabled,
                borderBottom: `1px solid ${isActive ? gold : 'transparent'}`,
                marginBottom: -1,
              }
          : null
        const tabStyle = isPillsActive
          ? needsPillBorder
            ? { background: VARIANT_BG.default }                          // clip-path on wrapper
            : { clipPath: octagon(s.cx), background: VARIANT_BG.default } // decorated pills
          : plainUnderlineStyle
            ? plainUnderlineStyle
          : isActive ? ACTIVE_TAB[variant] : INACTIVE_TAB[variant]

        const labelNode = isPillsActive
          ? <span style={{
              backgroundImage: VARIANT_TITLE_GRAD.default,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{item.label}</span>
          : item.label

        /* Shared button props/children — key is added at render site */
        const btnProps = {
          id: `dtab-${item.value}`,
          ref: el => { tabRefs.current[item.value] = el },
          role: 'tab',
          'aria-selected': isActive,
          'aria-disabled': item.disabled,
          tabIndex: item.disabled ? -1 : (isActive ? 0 : -1),
          onClick: () => !item.disabled && onChange?.(item.value),
          onKeyDown: e => handleKeyDown(e, item, i),
          onMouseEnter: () => { if (!item.disabled) setHoveredValue(item.value) },
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: `${s.py}px ${s.px}px`,
            fontSize: s.fontSize,
            fontWeight: isActive ? 600 : 400,
            letterSpacing: isPillsActive ? '0.08em' : isActive ? '0.04em' : '0.02em',
            textTransform: isPillsActive ? 'uppercase' : undefined,
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            opacity: item.disabled ? 0.35 : 1,
            background: 'transparent',
            border: 'none',
            transition: 'color 0.12s',
            outline: 'none',
            ...tabStyle,
          },
          onFocus: e => { if (e.currentTarget.matches(':focus-visible')) { e.currentTarget.style.outline = `2px solid ${gold}99`; e.currentTarget.style.outlineOffset = '3px' } },
          onBlur: e => { e.currentTarget.style.outline = 'none' },
        }
        const btnChildren = (
          <>
            {item.icon && <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>}
            {labelNode}
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
            {onClose && item.closable && (
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
                  color: goldDim, cursor: 'pointer', opacity: 0.6,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${goldDim}33`; e.currentTarget.style.opacity = 1 }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = 0.6 }}
              >
                ×
              </span>
            )}
          </>
        )

        if (needsPillBorder) {
          return (
            <div key={item.value} style={{
              display: 'inline-flex',
              clipPath: octagon(s.cx),
              background: VARIANT_BORDER.default,
              padding: 1,
            }}>
              <button {...btnProps}>{btnChildren}</button>
            </div>
          )
        }
        return <button key={item.value} {...btnProps}>{btnChildren}</button>
      })}
    </div>
  )

  /* ── Sdílený ornament: čáry s mezerami a hexagonem ── */
  const GappedLines = ({ hexUid }) => {
    const sorted = [activeGap, hoverGap].filter(Boolean).sort((a, b) => a.left - b.left)
    /* Merguj sousední/překrývající se mezery — zabrání drobné čárečce mezi tabu */
    const gaps = sorted.reduce((acc, g) => {
      const prev = acc[acc.length - 1]
      if (prev && g.left <= prev.rightEdge + 8) {
        acc[acc.length - 1] = { ...prev, rightEdge: Math.max(prev.rightEdge, g.rightEdge) }
      } else {
        acc.push(g)
      }
      return acc
    }, [])
    const segs = []
    let cursor = 0
    for (const g of gaps) {
      segs.push({ from: cursor, to: Math.max(cursor, g.left) })
      cursor = g.rightEdge
    }
    return <>
      {gaps.length === 0
        ? <div style={{ position: 'absolute', left: 0, right: 0, top: 2, height: 1, background: LINE_GRAD }} />
        : <>
            {segs.map((seg, i) => (
              <div key={i} style={{ position: 'absolute', left: seg.from, width: Math.max(0, seg.to - seg.from), top: 2, height: 1, background: LINE_GRAD }} />
            ))}
            <div style={{ position: 'absolute', left: cursor, right: 0, top: 2, height: 1, background: LINE_GRAD }} />
          </>
      }
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 1, height: 1, background: LINE_GRAD, opacity: 0.4 }} />
      <div style={{
        position: 'absolute', top: 0,
        left: (hoverGap ?? activeGap)?.centerX ?? 0,
        transform: 'translateX(-50%)',
        opacity: activeGap !== null ? 1 : 0,
        pointerEvents: 'none',
      }}>
        <HexSvg uid={hexUid} />
      </div>
    </>
  }

  /* ── Pills variant — čáry s efekty nahoře i dole ── */
  if (variant === 'pills') {
    if (!hasOrnaments) {
      return (
        <div
          ref={containerRef}
          onMouseLeave={() => setHoveredValue(null)}
        >
          {tabList}
        </div>
      )
    }

    return (
      <div
        ref={containerRef}
        style={{ position: 'relative', paddingTop: 10, paddingBottom: 10 }}
        onMouseLeave={() => setHoveredValue(null)}
      >
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7, pointerEvents: 'none' }}>
          <GappedLines hexUid={`${uid}th`} />
        </div>
        {tabList}
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 7, pointerEvents: 'none', transform: 'scaleY(-1)' }}>
          <GappedLines hexUid={`${uid}bh`} />
        </div>
      </div>
    )
  }

  /* ── Underline / Topline variant ──
     underline: indikátor (mezera + hex) dole
     topline:   indikátor nahoře
  ── */
  const indicatorAtBottom = variant === 'underline'

  if (!hasOrnaments) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          borderTop: indicatorAtBottom ? 'none' : `1px solid ${goldDim}55`,
          borderBottom: indicatorAtBottom ? `1px solid ${goldDim}55` : 'none',
        }}
        onMouseLeave={() => setHoveredValue(null)}
      >
        {tabList}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', paddingTop: 10, paddingBottom: 10 }}
      onMouseLeave={() => setHoveredValue(null)}
    >
      {!indicatorAtBottom && (
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7, pointerEvents: 'none' }}>
          <GappedLines hexUid={`${uid}th`} />
        </div>
      )}

      {tabList}

      {indicatorAtBottom && (
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 7, pointerEvents: 'none', transform: 'scaleY(-1)' }}>
          <GappedLines hexUid={`${uid}bh`} />
        </div>
      )}
    </div>
  )
}
