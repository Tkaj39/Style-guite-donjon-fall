/* ── DicePanel ────────────────────────────────────────────────────────────
   Right in-frame sidebar for the game admin: "Kostky na plánu" title plus
   a grouped-by-colour DieChipPicker. Keeps all the sidebar styling in one
   place so GameAdminPage only wires the data in. */
import DieChipPicker from './DieChipPicker'

export default function DicePanel({
  dice,
  selectedDieId,
  onSelectDie,
  title     = 'Kostky na plánu',
  width     = 125,
  maxHeight = 270,
}) {
  return (
    <div style={{
      flex: '0 0 auto',
      width,
      maxHeight,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '4px 2px',
      overflow: 'auto',
    }}>
      <p style={{
        margin: 0, padding: '2px 4px',
        fontSize: '0.5625rem', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: '#fff',
        textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)',
      }}>
        {title}
      </p>
      <DieChipPicker
        dice={dice}
        selectedDieId={selectedDieId}
        onSelectDie={onSelectDie}
        groupByColor
      />
    </div>
  )
}
