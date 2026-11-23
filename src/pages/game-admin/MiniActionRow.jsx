/* ── MiniActionRow ───────────────────────────────────────────────────────
   Bottom-of-frame action strip shown when no die is selected. Thin wrapper
   around the lib <ActionBar> in icon-only, borderless mode. */
import ActionBar from '../../lib/donjon/ActionBar'

export default function MiniActionRow({ actions, scale = 1 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0, paddingBottom: 6 }}>
      <ActionBar
        actions={actions}
        size="xs"
        bordered={false}
        showLabel={false}
        showKeycap={false}
        scale={scale}
      />
    </div>
  )
}
