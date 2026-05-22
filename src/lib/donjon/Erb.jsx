/* ── Erb — heraldická identita hráče ────────────────────────────────────
   Shield:              hexagonální štít s barvou a symbolem hráče
   PlayerIdentityBadge: kompaktní badge pro scoreboard / HUD
   ─────────────────────────────────────────────────────────────────────── */
import { bg2, neutralColor, textHighest } from './tokens'

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
 * Podporuje dvě API:
 *   - Starší: player={{ color, label, id }} size="xs|sm|md|lg"
 *   - Flat:   playerColor="#E05C5C" size={28} (pixel číslo)
 *
 * @param {{ color: string, label: string, id?: number }} [player]
 * @param {string} [playerColor] - Přímá barva (alternativa k player.color)
 * @param {'xs'|'sm'|'md'|'lg'|number} [size='md'] - Název nebo pixel šířka
 * @param {boolean} [showSymbol=true]
 * @example
 * // Starší API (ErbPage, HudPage):
 * <Shield player={{ id: 1, color: '#E05C5C', label: 'Hráč 1' }} size="sm" />
 * // Flat API (PlayerPanel, vlastní layouty):
 * <Shield playerColor="#4A90E2" size={32} showSymbol={false} />
 */
export function Shield({ player, playerColor, size = 'md', showSymbol = true }) {
  // Barva: flat prop má přednost před player objektem
  const color = playerColor ?? player?.color ?? neutralColor

  // Size: buď string klíč (xs/sm/md/lg) nebo pixel číslo
  const s = typeof size === 'number'
    ? { w: size, h: Math.round(size * 1.17) }
    : (sizeMap[size] ?? sizeMap.md)

  // Symbol: Římská číslice podle player.id (pokud existuje)
  const sym = player?.id != null ? symbols[(player.id - 1) % symbols.length] : null

  return (
    <div style={{
      display: 'inline-block',
      filter: `drop-shadow(0 0 8px ${color}55)`,
      flexShrink: 0,
    }}>
      {/* Outer border */}
      <div style={{
        width: s.w, height: s.h,
        clipPath: SHIELD_CLIP,
        background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Inner fill */}
        <div style={{
          width: s.w - 3, height: s.h - 3,
          clipPath: SHIELD_CLIP,
          background: color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {showSymbol && sym && (
            <span style={{
              color: color,
              fontWeight: 900,
              fontSize: s.w * 0.28,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              userSelect: 'none',
              textShadow: `0 0 8px ${color}88`,
            }}>
              {sym}
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
 * Podporuje dvě API:
 *   - Starší: player={{ color, label, id }}
 *   - Flat:   name="Hráč 1" color="#E05C5C" vp={7}
 *
 * @param {{ color: string, label: string, id?: number }} [player]
 * @param {string} [name] - Jméno hráče (flat API)
 * @param {string} [color] - Barva hráče (flat API)
 */
export function PlayerIdentityBadge({ player, name, color: colorProp }) {
  const color = colorProp ?? player?.color ?? neutralColor
  const label = name ?? player?.label ?? ''

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: bg2, borderRadius: 4,
      border: `1px solid ${color}44`,
      padding: '6px 12px',
    }}>
      <Shield playerColor={color} size="xs" showSymbol={false} />
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        background: `linear-gradient(180deg,${textHighest} 0%,${color} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{label}</span>
    </div>
  )
}

export default Shield
