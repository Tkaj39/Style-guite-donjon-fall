/* ── HistoryPanel ─────────────────────────────────────────────────────────
   Left in-frame sidebar for the game admin. Thin wrapper around the lib
   <EventLog> that fixes the sidebar footprint (width + maxHeight) and
   the decorated ornamental treatment used across the admin HUD. */
import EventLog from '../../lib/donjon/EventLog'

export default function HistoryPanel({
  events,
  title       = 'Game log',
  width       = 160,
  maxHeight   = 270,
}) {
  return (
    <div style={{
      flex: '0 0 auto',
      width,
      maxHeight,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    }}>
      <EventLog
        events={events}
        title={title}
        ornament="decorated"
        showRound
        autoScroll
        maxHeight={maxHeight}
      />
    </div>
  )
}
