/* ── EventLog ──────────────────────────────────────────────────────────────
   Seznam herních eventů s automatickým scrollem na nejnovější.
   Typy: gain · loss · event · warning · system
   ─────────────────────────────────────────────────────────────────────── */
import { useRef, useEffect } from 'react'
import { useId } from 'react'
import { octagon, octagonInner } from '../../utils/octagon'
import { RohOrnament, HexOrnament, ornamentHForCx } from './Ornaments'
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
  ornament     = 'decorated',
  emptyMessage = 'Zatím žádné události.',
  style,
  className,
}) {
  const scrollRef = useRef(null)
  const uid = useId().replace(/:/g, '')
  const hasOrnaments = ornament === 'decorated'
  const cx = 14

  /* Auto-scroll na nejnovější záznam */
  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [events, autoScroll])

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

      {events.length === 0 ? (
        <div style={{
          padding: '20px 12px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: textLow,
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
          })}
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
              {events.length} záznamů
            </span>
          </div>
        )}

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
              {events.length} záznamů
            </span>
          </div>
        )}

        {scrollContent}

        <HexOrnament uid={`${uid}hb`} flip edgePadL={cx} />

        {/* RohOrnament — za ostatním obsahem, aby se vykreslil nad hlavičkou */}
        <RohOrnament h={ornamentHForCx(cx, 'roh')} uid={`${uid}l`} />
        <RohOrnament h={ornamentHForCx(cx, 'roh')} uid={`${uid}r`} flip />
      </div>
    </div>
  )
}
