/* ── DonjonNotificationCenter ────────────────────────────────────────────────
   Game notification panel that slides out from a screen corner.
   Combines: EventLog (game entries) + GameTransition (panel animation) +
             DonjonBadge (entry type) + useModalPageInert (accessibility).

   Usage:
     <DonjonNotificationCenter
       events={[{ id, text, type, timestamp }]}
       maxVisible={5}
       position="bottom-right"
       onClear={() => setEvents([])}
     />

   Event types: gain · loss · event · warning · system
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import GameTransition from './GameTransition'
import DonjonBadge from './DonjonBadge'
import { RohOrnament, ornamentHForCx } from './Ornaments'
import { octagon, octagonInner } from '../shared/octagon'
import { useModalPageInert } from '../shared/useModalPageInert'
import { gold, goldDim, bg3, bg4, bgDeep, borderDefault, borderMid, textMid, textLow, textFaint, gainColor, dangerColor, warningColor } from './tokens'

const Z_NOTIF_CENTER = 1800

/* ── Event type configuration ── */
const TYPE_CFG = {
  gain:    { color: gainColor,    bg: `${gainColor}10`,    badge: 'gain'    },
  loss:    { color: dangerColor,  bg: `${dangerColor}10`,  badge: 'loss'    },
  event:   { color: gold,         bg: `${gold}0A`,         badge: 'event'   },
  warning: { color: warningColor, bg: `${warningColor}10`, badge: 'warning' },
  system:  { color: textLow,      bg: 'transparent',       badge: 'muted'   },
}

/* ── Position configuration ── */
const POSITIONS = {
  'bottom-right': { bottom: 20, right: 20, alignItems: 'flex-end',   panelPreset: 'slideUp'   },
  'bottom-left':  { bottom: 20, left: 20,  alignItems: 'flex-start', panelPreset: 'slideUp'   },
  'top-right':    { top: 20,    right: 20, alignItems: 'flex-end',   panelPreset: 'slideDown' },
  'top-left':     { top: 20,    left: 20,  alignItems: 'flex-start', panelPreset: 'slideDown' },
}

/* ── Icons ── */
function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="17" height="17">
      <path
        d="M10 2a6 6 0 0 1 6 6v2l2 3H2l2-3V8a6 6 0 0 1 6-6Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
      <path d="M8 16.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="currentColor" width="9" height="9">
      <path d="M2.22 2.22a.75.75 0 0 1 1.06 0L7 5.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L8.06 7l3.72 3.72a.75.75 0 1 1-1.06 1.06L7 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06L5.94 7 2.22 3.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

/* ── Time formatting ── */
function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

/* ── Event row ── */
function EventRow({ event }) {
  const cfg = TYPE_CFG[event.type] ?? TYPE_CFG.system
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      padding: '8px 12px',
      background: cfg.bg,
      borderBottom: `1px solid ${borderMid}`,
    }}>
      {/* Badge */}
      <div style={{ paddingTop: 1, flexShrink: 0 }}>
        <DonjonBadge variant={cfg.badge} size="sm">
          {event.type}
        </DonjonBadge>
      </div>

      {/* Text */}
      <p style={{
        flex: 1,
        margin: 0,
        fontSize: '0.8125rem',
        color: cfg.color,
        lineHeight: 1.4,
        minWidth: 0,
        wordBreak: 'break-word',
      }}>
        {event.text}
      </p>

      {/* Time */}
      {event.timestamp && (
        <span style={{
          fontSize: '0.625rem',
          color: textFaint,
          whiteSpace: 'nowrap',
          paddingTop: 3,
          flexShrink: 0,
          letterSpacing: '0.04em',
        }}>
          {formatTime(event.timestamp)}
        </span>
      )}
    </div>
  )
}

/**
 * DonjonNotificationCenter — game notification panel.
 *
 * @param {Array<{id, text, type, timestamp}>} events - Game events to display
 * @param {number} maxVisible - Number of most-recent entries to show (default: 5)
 * @param {'bottom-right'|'top-right'|'bottom-left'|'top-left'} position
 * @param {() => void} onClear - Callback to clear all events
 */
const CX = 14

export default function DonjonNotificationCenter({
  events     = [],
  maxVisible = 5,
  position   = 'bottom-right',
  ornament   = 'decorated', // 'plain' | 'decorated'
  onClear,
}) {
  const hasOrnaments = ornament === 'decorated'
  const [open, setOpen]   = useState(false)
  const [seen, setSeen]   = useState(0)
  const scrollRef         = useRef(null)

  const posConfig = POSITIONS[position] ?? POSITIONS['bottom-right']
  const { panelPreset, alignItems, ...anchorPos } = posConfig

  const unseen = Math.max(0, events.length - seen)
  const visible = events.slice(-maxVisible)
  const archived = events.length - maxVisible

  /* Accessibility — inert the background while the panel is open */
  useModalPageInert(open)

  /* Auto-scroll to the newest entry */
  useEffect(() => {
    if (!open || !scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [events, open])

  /* Mark as read on open */
  useEffect(() => {
    if (open) setSeen(events.length)
  }, [open, events.length])

  return createPortal(
    <div style={{
      position:  'fixed',
      zIndex:    Z_NOTIF_CENTER,
      display:   'flex',
      flexDirection: 'column',
      alignItems,
      ...anchorPos,
    }}>

      {/* ── Panel ── */}
      <GameTransition show={open} preset={panelPreset} duration={240}>
        {/* Outer wrapper — plain: border+radius, decorated: octagon border trick */}
        <div style={{
          width: 320,
          marginBottom: 8,
          ...(hasOrnaments ? {
            clipPath: octagon(CX),
            background: goldDim,
            padding: 1,
            filter: `drop-shadow(0 8px 32px rgba(0,0,0,0.6)) drop-shadow(0 0 1px ${goldDim}40)`,
          } : {
            border: `1px solid ${borderDefault}`,
            borderRadius: 4,
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${goldDim}20`,
          }),
        }}>
        {/* Inner fill */}
        <div style={{
          ...(hasOrnaments ? {
            position: 'relative',
            clipPath: octagonInner(CX),
          } : {}),
          background: bg3,
          overflow: 'hidden',
        }}>

          {/* Panel header */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '8px 12px',
            background:     bgDeep,
            borderBottom:   `1px solid ${borderMid}`,
          }}>
            <span style={{
              fontSize:      '0.6875rem',
              fontWeight:    700,
              color:         textMid,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Notifications
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.625rem', color: textFaint }}>
                {events.length} entries
              </span>

              {onClear && events.length > 0 && (
                <button
                  onClick={onClear}
                  style={{
                    background:    'transparent',
                    border:        `1px solid ${borderDefault}`,
                    borderRadius:  2,
                    color:         textFaint,
                    fontSize:      '0.5625rem',
                    padding:       '2px 6px',
                    cursor:        'pointer',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition:    'color 0.12s, border-color 0.12s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = textMid; e.currentTarget.style.borderColor = goldDim }}
                  onMouseLeave={e => { e.currentTarget.style.color = textFaint; e.currentTarget.style.borderColor = borderDefault }}
                >
                  Clear
                </button>
              )}

              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  width:           20,
                  height:          20,
                  background:      'transparent',
                  border:          `1px solid ${borderDefault}`,
                  borderRadius:    2,
                  color:           textFaint,
                  cursor:          'pointer',
                  transition:      'color 0.12s, border-color 0.12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = textMid; e.currentTarget.style.borderColor = goldDim }}
                onMouseLeave={e => { e.currentTarget.style.color = textFaint; e.currentTarget.style.borderColor = borderDefault }}
              >
                <XIcon />
              </button>
            </div>
          </div>

          {/* Event list */}
          <div
            ref={scrollRef}
            style={{
              maxHeight:     280,
              overflowY:     'auto',
              scrollbarWidth:'thin',
              scrollbarColor:`${borderDefault} transparent`,
            }}
          >
            {visible.length === 0 ? (
              <div style={{
                padding:   '28px 12px',
                textAlign: 'center',
                fontSize:  '0.75rem',
                color:     textFaint,
              }}>
                No notifications.
              </div>
            ) : (
              <>
                {archived > 0 && (
                  // eslint-disable-next-line donjon/contrast-check -- intentionally subdued archive separator (10px caps label), de-emphasized vs unread notifications above
                  <div style={{
                    padding:       '5px 12px',
                    fontSize:      '0.625rem',
                    color:         textFaint,
                    background:    bgDeep,
                    borderBottom:  `1px solid ${borderMid}`,
                    textAlign:     'center',
                    letterSpacing: '0.04em',
                  }}>
                    + {archived} older entries
                  </div>
                )}
                {visible.map(event => (
                  <EventRow key={event.id} event={event} />
                ))}
              </>
            )}
          </div>

          {/* RohOrnament brackets — only in decorated mode */}
          {hasOrnaments && <RohOrnament h={ornamentHForCx(CX, 'roh')} uid="ncl" />}
          {hasOrnaments && <RohOrnament h={ornamentHForCx(CX, 'roh')} uid="ncr" flip />}
        </div>
        </div>
      </GameTransition>

      {/* ── Toggle button ── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close notifications' : `Open notifications${unseen > 0 ? ` (${unseen} new)` : ''}`}
        style={{
          position:   'relative',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width:      40,
          height:     40,
          background: open ? bg4 : bg3,
          border:     `1px solid ${open ? goldDim : borderDefault}`,
          borderRadius: 4,
          color:      open ? gold : textMid,
          cursor:     'pointer',
          transition: 'background 0.15s, border-color 0.15s, color 0.15s',
          boxShadow:  '0 2px 12px rgba(0,0,0,0.4)',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          if (!open) {
            e.currentTarget.style.background   = bg4
            e.currentTarget.style.borderColor  = goldDim
            e.currentTarget.style.color        = gold
          }
        }}
        onMouseLeave={e => {
          if (!open) {
            e.currentTarget.style.background   = bg3
            e.currentTarget.style.borderColor  = borderDefault
            e.currentTarget.style.color        = textMid
          }
        }}
      >
        <BellIcon />

        {/* Unread badge */}
        {unseen > 0 && (
          <span style={{
            position:      'absolute',
            top:           -5,
            right:         -5,
            minWidth:      16,
            height:        16,
            borderRadius:  8,
            background:    dangerColor,
            border:        `2px solid ${bg3}`,
            fontSize:      '0.5rem',
            fontWeight:    700,
            // eslint-disable-next-line donjon/no-hardcoded-hex -- pure white badge text on dangerColor background (no contrast token fits)
            color:         '#fff',
            display:       'flex',
            alignItems:    'center',
            justifyContent:'center',
            padding:       '0 3px',
            lineHeight:    1,
            pointerEvents: 'none',
          }}>
            {unseen > 9 ? '9+' : unseen}
          </span>
        )}
      </button>
    </div>,
    document.body
  )
}
