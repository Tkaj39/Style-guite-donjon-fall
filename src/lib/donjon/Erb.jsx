/* ── Erb — heraldická identita hráče ────────────────────────────────────
   Shield:              heraldický štít/prapor s barvou a symbolem hráče
   PlayerIdentityBadge: kompaktní badge pro scoreboard / HUD

   Tvary:
     • shape="erb"    — square top, tapered bottom (default, ze src/erb.svg)
                        Fixní proporce: aspect ratio ~1:1, tip = 28.9 % šířky.
     • shape="prapor" — banner s fixní špičkou, variabilní délka.
                        Tip = 28.9 % šířky (fixní). Tělo libovolně dlouhé.
   ─────────────────────────────────────────────────────────────────────── */
import { bg2, neutralColor, textHighest } from './tokens'

// Erb — fixní proporce, polygon z src/erb.svg:
// 116.22×116.21 viewBox, body 116.22,0 → 116.22,82.66 → 58.11,116.21 → 0,82.66 → 0,0
// V procentech: 0% 0% → 100% 0% → 100% 71.13% → 50% 100% → 0% 71.13%
// Tip height = 116.21 - 82.66 = 33.55 = 28.87 % šířky.
const ERB_CLIP = 'polygon(0% 0%, 100% 0%, 100% 71.13%, 50% 100%, 0% 71.13%)'

// Poměr výšky tipu vůči šířce (z erb.svg i prapor.svg — obě 28.9 %).
const TIP_RATIO = 0.289

/**
 * Clip-path pro prapor — tip má fixní velikost relativně k width,
 * straight section flexibilní podle height.
 *
 * Pro prapor o width=w, height=h: tip protruz = w * TIP_RATIO px,
 * straight section od 0 do (h - tip) px = (h-tip)/h % v polygon.
 */
function getPraporClip(width, height) {
  const tipPx = width * TIP_RATIO
  const straightPct = ((height - tipPx) / height) * 100
  return `polygon(0% 0%, 100% 0%, 100% ${straightPct.toFixed(2)}%, 50% 100%, 0% ${straightPct.toFixed(2)}%)`
}

const sizeMap = {
  xs: { w: 24,  h: 28  },
  sm: { w: 40,  h: 47  },
  md: { w: 64,  h: 75  },
  lg: { w: 96,  h: 112 },
}

// Roman numeral symbol per player index (1-based id)
const symbols = ['I', 'II', 'III', 'IV', 'V', 'VI']

/**
 * Heraldický štít nebo prapor s barvou a (volitelným) symbolem hráče.
 *
 * Tvary:
 *   - shape="erb"    (default) — fixní proporce 1:1 + tapered tip dole.
 *                                Velikost přes `size` ('xs|sm|md|lg' / px).
 *   - shape="prapor" — banner s fixním tipem, libovolně dlouhý.
 *                      Velikost přes `width` (default 32) + `height` (default 120).
 *
 * Podporuje dvě API pro barvu:
 *   - Starší: player={{ color, label, id }}
 *   - Flat:   playerColor="#E05C5C"
 *
 * @param {{ color: string, label: string, id?: number }} [player]
 * @param {string} [playerColor] - Přímá barva (alternativa k player.color)
 * @param {'erb'|'prapor'} [shape='erb']
 * @param {'xs'|'sm'|'md'|'lg'|number} [size='md'] - Velikost pro shape='erb'
 * @param {number} [width=32]  - Šířka pro shape='prapor'
 * @param {number} [height=120] - Délka pro shape='prapor'
 * @param {boolean} [showSymbol=true]
 * @example
 * // Erb (klasický štít):
 * <Shield player={{ id: 1, color: '#E05C5C' }} size="sm" />
 * <Shield playerColor="#4A90E2" size={32} showSymbol={false} />
 * // Prapor (banner):
 * <Shield shape="prapor" playerColor="#E05C5C" width={32} height={120} />
 * <Shield shape="prapor" playerColor="#4A90E2" width={40} height={200} />
 */
export function Shield({
  player,
  playerColor,
  shape = 'erb',
  size = 'md',
  width,
  height,
  showSymbol = true,
}) {
  // Barva: flat prop má přednost před player objektem
  const color = playerColor ?? player?.color ?? neutralColor
  const isPrapor = shape === 'prapor'

  // Dimenze podle tvaru
  let s
  if (isPrapor) {
    s = { w: width ?? 32, h: height ?? 120 }
  } else if (typeof size === 'number') {
    s = { w: size, h: Math.round(size * 1.17) }
  } else {
    s = sizeMap[size] ?? sizeMap.md
  }

  // Clip-path: erb = fixní, prapor = vypočítaný z dimenzí
  const clip = isPrapor ? getPraporClip(s.w, s.h) : ERB_CLIP

  // Symbol: Římská číslice podle player.id (pokud existuje)
  const sym = player?.id != null ? symbols[(player.id - 1) % symbols.length] : null

  // Velikost a pozice symbolu: u prapor menší + zarovnaný k vrchu
  const symFontSize = isPrapor ? s.w * 0.42 : s.w * 0.28
  const symAlign = isPrapor ? 'flex-start' : 'center'
  const symPadTop = isPrapor ? Math.max(4, s.w * 0.18) : 0

  return (
    <div style={{
      display: 'inline-block',
      filter: `drop-shadow(0 0 8px ${color}55)`,
      flexShrink: 0,
    }}>
      {/* Outer border */}
      <div style={{
        width: s.w, height: s.h,
        clipPath: clip,
        background: color,
        display: 'flex',
        alignItems: symAlign,
        justifyContent: 'center',
      }}>
        {/* Inner fill */}
        <div style={{
          width: s.w - 3, height: s.h - 3,
          // Pro prapor přepočítáme clip pro vnitřní dimenze, aby tip splynul s outer.
          clipPath: isPrapor ? getPraporClip(s.w - 3, s.h - 3) : clip,
          background: color + '22',
          display: 'flex',
          alignItems: symAlign,
          justifyContent: 'center',
          paddingTop: symPadTop,
        }}>
          {showSymbol && sym && (
            <span style={{
              color: color,
              fontWeight: 900,
              fontSize: symFontSize,
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
