/* ── MiniScoreHeader ─────────────────────────────────────────────────────
   Top-of-frame score header for the game admin — thin wrapper around the
   lib <VPCounter> that fixes the "row" layout + central turn hex for
   this context. Mirrors the inline helper previously in ScreensPage. */
import VPCounter from '../../lib/donjon/VPCounter'

const MAX_VP = 5

export default function MiniScoreHeader({ players, turn, phaseLabel, activeIdx, minWidth = 260 }) {
  return (
    <div style={{ padding: '8px 8px 0', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
      <VPCounter
        players={players}
        max={MAX_VP}
        title={`Tah ${turn} · ${phaseLabel}\nHráč ${activeIdx + 1} na tahu`}
        layout="row"
        minWidth={minWidth}
        centerValue={turn}
      />
    </div>
  )
}
