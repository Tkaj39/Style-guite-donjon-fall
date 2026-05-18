/* ── Erb — heraldická identita hráče ────────────────────────────────────
   Shield:              hexagonální štít s barvou a symbolem hráče
   PlayerIdentityBadge: kompaktní badge pro scoreboard / HUD
   ─────────────────────────────────────────────────────────────────────── */

const SHIELD_CLIP = 'polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%)'

const sizeMap = {
  xs: { w: 24,  h: 28  },
  sm: { w: 40,  h: 47  },
  md: { w: 64,  h: 75  },
  lg: { w: 96,  h: 112 },
}

// Roman numeral symbol per player index (1-based id)
const symbols = ['I', 'II', 'III', 'IV', 'V', 'VI']

/**
 * Heraldický štít s barvou a (volitelným) symbolem hráče.
 *
 * @param {{ color: string, label: string, id: number }} player
 * @param {'xs'|'sm'|'md'|'lg'} size
 * @param {boolean} showSymbol
 */
export function Shield({ player, size = 'md', showSymbol = true }) {
  const s = sizeMap[size]
  return (
    <div style={{
      display: 'inline-block',
      filter: `drop-shadow(0 0 8px ${player.color}55)`,
    }}>
      {/* Outer border */}
      <div style={{
        width: s.w, height: s.h,
        clipPath: SHIELD_CLIP,
        background: player.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Inner fill */}
        <div style={{
          width: s.w - 3, height: s.h - 3,
          clipPath: SHIELD_CLIP,
          background: player.color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {showSymbol && (
            <span style={{
              color: player.color,
              fontWeight: 900,
              fontSize: s.w * 0.28,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              userSelect: 'none',
              textShadow: `0 0 8px ${player.color}88`,
            }}>
              {symbols[player.id - 1]}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Kompaktní identitní badge — malý štít + jméno hráče.
 * Určen pro scoreboard, HUD a win dialog.
 *
 * @param {{ color: string, label: string, id: number }} player
 */
export function PlayerIdentityBadge({ player }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: '#1B1A30', borderRadius: 4,
      border: `1px solid ${player.color}44`,
      padding: '6px 12px',
    }}>
      <Shield player={player} size="xs" showSymbol={false} />
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        background: `linear-gradient(180deg,#F9F9F9 0%,${player.color} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{player.label}</span>
    </div>
  )
}

export default Shield
