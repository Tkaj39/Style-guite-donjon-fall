/* ── EventLog ──────────────────────────────────────────────────────────────
   List of game events with automatic scroll to the newest entry.
   Types: gain · loss · event · warning · system
   ─────────────────────────────────────────────────────────────────────── */
import { useRef, useEffect, useState, useMemo } from 'react'
import { useId } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { RohOrnament, HexOrnament, ornamentHForCx } from './Ornaments'
import {
  gold, goldDim,
  bg2, bg3, bgDeep,
  borderDefault, borderMid,
  textHigh, textMid, textLow, textFaint,
  gainColor, dangerColor, warningColor,
} from './tokens'

/* ── Type configuration ── */
const TYPE_CFG = {
  gain:    { color: gainColor,    dot: gainColor,    bg: `${gainColor}0E`    },
  loss:    { color: dangerColor,  dot: dangerColor,  bg: `${dangerColor}0E`  },
  event:   { color: gold,         dot: gold,         bg: `${gold}0A`         },
  warning: { color: warningColor, dot: warningColor, bg: `${warningColor}0E` },
  system:  { color: textMid,      dot: textFaint,    bg: 'transparent'       },
}

/* ── Icons for each type ── */
function TypeIcon({ type, size = 8 }) {
  const c = TYPE_CFG[type]?.color ?? textMid
  if (type === 'gain') return (
    <svg viewBox="0 0 10 10" fill="none" width={size} height={size} style={{ flexShrink: 0 }}>
      <path d="M5 8V2M2 5l3-3 3 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (type === 'loss') return (
    <svg viewBox="0 0 10 10" fill="none" width={size} height={size} style={{ flexShrink: 0 }}>
      <path d="M5 2v6M2 5l3 3 3-3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (type === 'warning') return (
    <svg viewBox="0 0 10 10" fill="none" width={size} height={size} style={{ flexShrink: 0 }}>
      <path d="M5 1.5L9 8.5H1L5 1.5Z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
  if (type === 'event') return (
    <svg viewBox="0 0 10 10" fill={c} width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx="5" cy="5" r="2.5" />
    </svg>
  )
  /* system */
  return (
    <svg viewBox="0 0 10 10" fill={c} opacity=".4" width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx="5" cy="5" r="2" />
    </svg>
  )
}

/* ── Default event row renderer ── */
function DefaultEventRow({ entry, showRound, isLast }) {
  const cfg = TYPE_CFG[entry.type] ?? TYPE_CFG.system
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        padding: '7px 12px',
        background: cfg.bg,
        borderBottom: isLast ? 'none' : `1px solid ${borderMid}`,
      }}
    >
      <div style={{ paddingTop: 3, flexShrink: 0 }}>
        <TypeIcon type={entry.type} size={9} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontSize: '0.75rem',
          color: entry.type === 'system' ? textLow : cfg.color,
          lineHeight: 1.4,
        }}>
          {entry.text}
        </span>
        {entry.detail && (
          <span style={{
            display: 'block',
            fontSize: '0.6875rem',
            color: textLow,
            marginTop: 1,
            lineHeight: 1.3,
          }}>
            {entry.detail}
          </span>
        )}
      </div>

      {showRound && entry.round != null && (
        <span style={{
          fontSize: '0.625rem',
          color: textLow,
          whiteSpace: 'nowrap',
          paddingTop: 2,
          flexShrink: 0,
          letterSpacing: '0.04em',
        }}>
          K{entry.round}
        </span>
      )}
    </div>
  )
}

/* ── Render seznamu — s/bez groupByRound + custom renderEvent ── */
function renderEventList({ events, showRound, groupByRound, renderEvent }) {
  const renderOne = (entry, isLast) => {
    const def = <DefaultEventRow entry={entry} showRound={showRound} isLast={isLast} />
    return renderEvent ? renderEvent(entry, def) : def
  }

  if (!groupByRound) {
    return events.map((entry, i) => (
      <div key={entry.id ?? i}>
        {renderOne(entry, i === events.length - 1)}
      </div>
    ))
  }

  // Group by round (null/undefined = "No round")
  const groups = []
  const groupMap = new Map()
  for (const e of events) {
    const key = e.round ?? '_none'
    if (!groupMap.has(key)) {
      groupMap.set(key, [])
      groups.push(key)
    }
    groupMap.get(key).push(e)
  }

  return groups.map(round => {
    const items = groupMap.get(round)
    return (
      <div key={round}>
        <div style={{
          padding: '5px 12px',
          background: bgDeep,
          fontSize: '0.625rem',
          fontWeight: 700,
          color: textLow,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderBottom: `1px solid ${borderMid}`,
        }}>
          {round === '_none' ? 'Bez kola' : `Kolo ${round}`}
        </div>
        {items.map((entry, i) => (
          <div key={entry.id ?? i}>
            {renderOne(entry, i === items.length - 1)}
          </div>
        ))}
      </div>
    )
  })
}

/* ── Filter chip pro type ── */
function FilterChip({ type, active, count, onClick }) {
  const cfg = TYPE_CFG[type] ?? TYPE_CFG.system
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '2px 7px',
        background: active ? `${cfg.color}22` : 'transparent',
        border: `1px solid ${active ? cfg.color : borderMid}`,
        borderRadius: 3,
        color: active ? cfg.color : textLow,
        fontSize: '0.625rem', fontWeight: 600,
        letterSpacing: '0.04em',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      <TypeIcon type={type} size={7} />
      {type}
      {count != null && <span style={{ opacity: 0.7 }}>({count})</span>}
    </button>
  )
}

export default function EventLog({
  events       = [],
  maxHeight    = 280,
  title        = 'Game log',
  showTitle    = true,
  showRound    = true,
  autoScroll   = true,
  ornament     = 'decorated',
  emptyMessage = 'No events yet.',
  // ── Filter / search props ────────────────────────────────────────
  showFilters  = false,   // shows type-filter chips in the header
  showSearch   = false,   // shows the search input in the header
  groupByRound = false,   // groups events by round
  renderEvent,            // (entry, defaultRender) => ReactNode — custom renderer
  style,
  className,
}) {
  const scrollRef = useRef(null)
  const uid = useId().replace(/:/g, '')
  const hasOrnaments = ornament === 'decorated'
  const cx = 14

  // Filter state — null = all types, otherwise a Set of types to render
  const allTypes = useMemo(() => {
    const set = new Set()
    events.forEach(e => e.type && set.add(e.type))
    return Array.from(set)
  }, [events])
  const [activeTypes, setActiveTypes] = useState(null)  // null = all
  const [query, setQuery] = useState('')

  const filteredEvents = useMemo(() => {
    let out = events
    if (activeTypes && activeTypes.size > 0) {
      out = out.filter(e => activeTypes.has(e.type ?? 'system'))
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      out = out.filter(e => {
        const text = (e.text ?? '').toLowerCase()
        const detail = (e.detail ?? '').toLowerCase()
        return text.includes(q) || detail.includes(q)
      })
    }
    return out
  }, [events, activeTypes, query])

  const toggleType = (t) => {
    setActiveTypes(prev => {
      if (!prev) return new Set(allTypes.filter(x => x !== t))
      const next = new Set(prev)
      if (next.has(t)) next.delete(t); else next.add(t)
      return next.size === 0 ? null : next
    })
  }

  /* Auto-scroll to the newest entry */
  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [filteredEvents, autoScroll])

  /* Bar with filter chips + search input — rendered below the header */
  const filterBar = (showFilters || showSearch) && (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      borderBottom: `1px solid ${borderMid}`,
      background: bgDeep,
    }}>
      {showSearch && (
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Hledat…"
          style={{
            flex: '1 1 120px',
            background: bg3,
            border: `1px solid ${borderMid}`,
            borderRadius: 3,
            padding: '3px 7px',
            color: textHigh,
            fontSize: '0.6875rem',
            fontFamily: 'inherit',
            outline: 'none',
            minWidth: 80,
          }}
        />
      )}
      {showFilters && allTypes.map(t => (
        <FilterChip
          key={t}
          type={t}
          active={!activeTypes || activeTypes.has(t)}
          count={events.filter(e => (e.type ?? 'system') === t).length}
          onClick={() => toggleType(t)}
        />
      ))}
    </div>
  )

  const scrollContent = (
    <div
      ref={scrollRef}
      style={{
        position: 'relative',
        maxHeight,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: hasOrnaments && !showTitle ? 8 : 0,
        paddingBottom: hasOrnaments ? 8 : 0,
        scrollbarWidth: 'thin',
        scrollbarColor: `${borderDefault} transparent`,
      }}
    >
      {hasOrnaments && !showTitle && <HexOrnament uid={`${uid}ht`} edgePadL={cx} />}

      {filteredEvents.length === 0 ? (
        <div style={{
          padding: '20px 12px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: textLow,
        }}>
          {query.trim() ? `No results for "${query}".` : emptyMessage}
        </div>
      ) : (
        <div>
          {renderEventList({ events: filteredEvents, showRound, groupByRound, renderEvent })}
        </div>
      )}
    </div>
  )

  if (!hasOrnaments) {
    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column',
          background: bg3,
          border: `1px solid ${borderDefault}`,
          borderRadius: 4,
          overflow: 'hidden',
          ...style,
        }}
        className={className}
      >
        {showTitle && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px',
            borderBottom: `1px solid ${borderMid}`,
            background: bgDeep,
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: '0.6875rem', fontWeight: 700,
              color: textMid, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {title}
            </span>
            <span style={{
              fontSize: '0.625rem', color: textLow,
              letterSpacing: '0.06em',
            }}>
              {filteredEvents.length === events.length ? events.length : filteredEvents.length + " of " + events.length} entries
            </span>
          </div>
        )}
        {filterBar}

        {scrollContent}
      </div>
    )
  }

  return (
    <div
      style={{
        clipPath: octagon(cx),
        background: borderDefault,
        padding: 1,
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          position: 'relative',
          clipPath: octagonInner(cx),
          background: bg3,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {showTitle && (
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 28px 8px',
            borderBottom: `1px solid ${borderMid}`,
            background: bgDeep,
            flexShrink: 0,
            overflow: 'hidden',
          }}>
            <HexOrnament uid={`${uid}hh`} edgePadL={cx} />

            <span style={{
              fontSize: '0.6875rem', fontWeight: 700,
              color: textMid, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {title}
            </span>
            <span style={{
              fontSize: '0.625rem', color: textLow,
              letterSpacing: '0.06em',
            }}>
              {filteredEvents.length === events.length ? events.length : filteredEvents.length + " of " + events.length} entries
            </span>
          </div>
        )}
        {filterBar}

        {scrollContent}

        <HexOrnament uid={`${uid}hb`} flip edgePadL={cx} />

        {/* RohOrnament — placed after other content so it renders above the header */}
        <RohOrnament h={ornamentHForCx(cx, 'roh')} uid={`${uid}l`} />
        <RohOrnament h={ornamentHForCx(cx, 'roh')} uid={`${uid}r`} flip />
      </div>
    </div>
  )
}
