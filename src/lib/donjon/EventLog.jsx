/* ── EventLog ──────────────────────────────────────────────────────────────
   Seznam herních eventů s automatickým scrollem na nejnovější.
   Typy: gain · loss · event · warning · system
   ─────────────────────────────────────────────────────────────────────── */
import { useRef, useEffect } from 'react'
import {
  gold, goldDim,
  bg2, bg3, bgDeep,
  borderDefault, borderMid,
  textHigh, textMid, textLow, textFaint,
  gainColor, dangerColor, warningColor,
} from './tokens'

/* ── Konfigurace typů ── */
const TYPE_CFG = {
  gain:    { color: gainColor,    dot: gainColor,    bg: `${gainColor}0E`    },
  loss:    { color: dangerColor,  dot: dangerColor,  bg: `${dangerColor}0E`  },
  event:   { color: gold,         dot: gold,         bg: `${gold}0A`         },
  warning: { color: warningColor, dot: warningColor, bg: `${warningColor}0E` },
  system:  { color: textMid,      dot: textFaint,    bg: 'transparent'       },
}

/* ── Ikony jednotlivých typů ── */
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

export default function EventLog({
  events       = [],
  maxHeight    = 280,
  title        = 'Herní log',
  showTitle    = true,
  showRound    = true,
  autoScroll   = true,
  emptyMessage = 'Zatím žádné události.',
  style,
  className,
}) {
  const scrollRef = useRef(null)

  /* Auto-scroll na nejnovější záznam */
  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [events, autoScroll])

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
      {/* Hlavička */}
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
            fontSize: '0.625rem', color: textFaint,
            letterSpacing: '0.06em',
          }}>
            {events.length} záznamů
          </span>
        </div>
      )}

      {/* Scroll kontejner */}
      <div
        ref={scrollRef}
        style={{
          maxHeight,
          overflowY: 'auto',
          overflowX: 'hidden',
          /* Scrollbar styling */
          scrollbarWidth: 'thin',
          scrollbarColor: `${borderDefault} transparent`,
        }}
      >
        {events.length === 0 ? (
          <div style={{
            padding: '20px 12px',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: textFaint,
          }}>
            {emptyMessage}
          </div>
        ) : (
          <div>
            {events.map((entry, i) => {
              const cfg = TYPE_CFG[entry.type] ?? TYPE_CFG.system
              const isLast = i === events.length - 1
              return (
                <div
                  key={entry.id ?? i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: '7px 12px',
                    background: cfg.bg,
                    borderBottom: isLast ? 'none' : `1px solid ${borderMid}`,
                  }}
                >
                  {/* Ikona */}
                  <div style={{ paddingTop: 3, flexShrink: 0 }}>
                    <TypeIcon type={entry.type} size={9} />
                  </div>

                  {/* Text */}
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
                        color: textFaint,
                        marginTop: 1,
                        lineHeight: 1.3,
                      }}>
                        {entry.detail}
                      </span>
                    )}
                  </div>

                  {/* Kolo */}
                  {showRound && entry.round != null && (
                    <span style={{
                      fontSize: '0.625rem',
                      color: textFaint,
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
            })}
          </div>
        )}
      </div>
    </div>
  )
}
