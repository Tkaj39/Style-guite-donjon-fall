/* ── TurnHistoryList ──────────────────────────────────────────────────────
   Scrollable history list of past turns for the game admin. Each entry
   shows turn number, active player (color dot), the phases that ran
   (with completion state) and a short action log. */
import { accent, borderDefault, surface2, surface3, textHigh, textMid, textLow } from '../../lib/tkajui/tokens'

function PhaseChip({ label, state }) {
  // state: 'done' | 'current' | 'future' | 'skipped'
  const color = state === 'done'    ? '#50B86C'
              : state === 'current' ? accent
              : state === 'skipped' ? textLow
              : textLow
  const bg    = state === 'done'    ? '#1f3326'
              : state === 'current' ? `${accent}22`
              : surface2
  return (
    <span style={{
      display: 'inline-block',
      padding: '1px 6px',
      fontSize: '0.5625rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color,
      background: bg,
      border: `1px solid ${state === 'current' ? accent : borderDefault}`,
      borderRadius: 3,
      lineHeight: 1.4,
    }}>
      {label}
    </span>
  )
}

function TurnRow({ entry, isCurrent }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 4,
      padding: '8px 10px',
      background: isCurrent ? surface3 : surface2,
      border: `1px solid ${isCurrent ? accent : borderDefault}`,
      borderRadius: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 10, height: 10, borderRadius: '50%',
          background: entry.playerColor,
          boxShadow: `0 0 4px ${entry.playerColor}88`,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: isCurrent ? accent : textHigh,
          flex: 1,
        }}>
          Tah {entry.turn}
        </span>
        <span style={{
          fontSize: '0.5625rem', color: textMid, letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          {entry.playerLabel}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {entry.phases.map(p => (
          <PhaseChip key={p.label} label={p.label} state={p.state} />
        ))}
      </div>
      {entry.actions?.length > 0 && (
        <ul style={{
          margin: '2px 0 0', paddingLeft: 14, listStyle: 'disc',
          fontSize: '0.6875rem', color: textMid, lineHeight: 1.4,
        }}>
          {entry.actions.map((a, i) => (<li key={i}>{a}</li>))}
        </ul>
      )}
    </div>
  )
}

export default function TurnHistoryList({ entries, currentTurn }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 6,
      maxHeight: 520, overflowY: 'auto',
      padding: 4,
    }}>
      {entries.length === 0 && (
        <p style={{ margin: 0, fontSize: '0.75rem', color: textLow }}>
          Zatím žádné tahy.
        </p>
      )}
      {entries.map(e => (
        <TurnRow key={e.turn} entry={e} isCurrent={e.turn === currentTurn} />
      ))}
    </div>
  )
}
