/* ── ActionTile ────────────────────────────────────────────────────────────
   Klikatelná akční dlaždice — ikona, název, popis, cena.
   Jiná než Button: tile tvar, ikona-forward, cost badge v rohu, lock stav.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useId } from 'react'
import { octagon, octagonInner } from '../../utils/octagon'
import { RohOrnament, HexOrnament, ornamentHForCx, ORNAMENT_BASE_WIDTH } from './Ornaments'
import {
  gold, goldDim, goldMid,
  bg2, bg3, bg4,
  borderDefault, borderMid,
  textHigh, textMid, textLow, textFaint,
  dangerColor, warningColor, gainColor, magicColor,
  infoColor, infoDark,
} from './tokens'

const SIZES = {
  sm: { w: 80,  h: 72,  cx: 14, iconArea: 28, titleSize: '0.6875rem', descSize: '0.6rem',    costSize: '0.6875rem', radius: 3 },
  md: { w: 110, h: 96,  cx: 18, iconArea: 36, titleSize: '0.75rem',   descSize: '0.6875rem', costSize: '0.75rem',   radius: 4 },
  lg: { w: 148, h: 130, cx: 22, iconArea: 48, titleSize: '0.875rem',  descSize: '0.75rem',   costSize: '0.8125rem', radius: 4 },
}

/* VARIANTS:
 *  - border, activeBorder, selBorder: barva 1px rámečku v daném stavu
 *  - selBg: jemné tinted pozadí ve vybraném stavu
 *  - selOrn: barva ornamentů ve vybraném stavu (jasnější než selBorder
 *    pro vizuální pop — default goldDim → gold, special magicDark → magicColor)
 */
/* Selected stav unified pattern napříč variantami:
 *   selBg     = `${variantColor}22` — jemný tinted bg (alpha ~13%, blue/red/green/purple cast)
 *   selBorder = variant color (full bright 1px rámeček — signalizuje variant)
 *   selOrn    = infoDark UNIVERSAL (#1E3A6B tmavá navy — konzistentní accent
 *               napříč všemi variantami, kontrast lightness proti tinted bg)
 *
 * Vizuální hierarchie: variant identity přes border + bg tint,
 * ornamenty jako konzistentní navy accent přes všechny varianty.
 */
const VARIANTS = {
  default: { border: borderDefault, activeBorder: infoColor,    selBg: `${infoColor}22`,    selBorder: infoColor,    selOrn: infoDark },
  attack:  { border: borderDefault, activeBorder: dangerColor,  selBg: `${dangerColor}22`,  selBorder: dangerColor,  selOrn: infoDark },
  move:    { border: borderDefault, activeBorder: gainColor,    selBg: `${gainColor}22`,    selBorder: gainColor,    selOrn: infoDark },
  special: { border: borderDefault, activeBorder: magicColor,   selBg: `${magicColor}22`,   selBorder: magicColor,   selOrn: infoDark },
}

/* ── Lock ikona ── */
function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="4" y="7" width="8" height="7" rx="1.5" stroke={textLow} strokeWidth="1.3" />
      <path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke={textLow} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export default function ActionTile({
  icon,
  title,
  description,
  cost,
  selected   = false,
  disabled   = false,
  locked     = false,
  onClick,
  size       = 'md',
  variant    = 'default',
  ornament   = 'decorated',
  style,
  className,
}) {
  const uid  = useId().replace(/:/g, '')
  const s = SIZES[size] ?? SIZES.md
  const v = VARIANTS[variant] ?? VARIANTS.default
  const [hovered, setHovered] = useState(false)

  const isBlocked     = disabled || locked
  const hasOrnaments  = ornament === 'decorated'
  // Corner ornament výška škálovaná z cx (ne z výšky tile — to byla magic formule)
  const ornH          = hasOrnaments ? ornamentHForCx(s.cx, 'roh') : 0
  // Šířka ornamentu pro výpočet horizontálního paddingu (≈ cx pro roh)
  const ornW          = hasOrnaments ? Math.round(ORNAMENT_BASE_WIDTH.roh * ornH / 66 * 10) / 10 : 0
  const padH          = 6 + ornW

  /* Barvy závislé na stavu — border (rámeček) je tmavý v idle, ornament je vždy viditelný */
  const effectiveBorder = isBlocked ? borderMid
                        : hovered   ? v.activeBorder
                        : selected  ? v.selBorder
                        : v.border
  /* Ornament barva: idle = goldDim (viditelná na bg), selected = v.selOrn
     (jasnější varianta — gold/dangerColor/gainColor/magicColor pro pop) */
  const ornamentColor   = isBlocked ? borderMid
                        : hovered   ? v.activeBorder
                        : selected  ? v.selOrn
                        : goldDim
  /* Hex výplň uvnitř ornamentů: matchne aktuální button bg → hex splývá
     s povrchem tlačítka místo aby dělal kontrastní dot.
     Pro hover/selected: 'transparent' aby button bg projel přes hex bez
     double-alpha-blend (selBg má alpha → blendlo by se 2×). */
  const ornamentBgFill  = isBlocked ? undefined        // default bg4
                        : hovered   ? 'transparent'    // button bg projde
                        : selected  ? 'transparent'    // button bg projde (no double-blend)
                        : undefined                    // idle = default bg4
  const effectiveBg     = isBlocked ? 'transparent'
                        : hovered   ? bg3
                        : selected  ? v.selBg
                        : 'transparent'

  const buttonEl = (
    <button
      type="button"
      disabled={disabled}
      onClick={!locked && !disabled ? onClick : undefined}
      aria-pressed={selected}
      aria-label={title}
      onMouseEnter={() => { if (!isBlocked) setHovered(true)  }}
      onMouseLeave={() => { if (!isBlocked) setHovered(false) }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        width: hasOrnaments ? '100%' : s.w,
        height: s.h,
        background: effectiveBg,
        ...(hasOrnaments ? {
          clipPath: octagonInner(s.cx),
          padding: `8px ${padH}px 10px`,
        } : {
          border: `1px solid ${effectiveBorder}`,
          borderRadius: s.radius,
          boxShadow: selected ? `0 0 10px ${v.selBorder}33, inset 0 0 0 1px ${v.selBorder}22` : 'none',
          padding: '8px 6px 10px',
        }),
        cursor: disabled ? 'not-allowed' : locked ? 'default' : 'pointer',
        opacity: disabled ? 0.35 : locked ? 0.6 : 1,
        transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
        ...(!hasOrnaments ? style : {}),
      }}
      className={['focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC183]/60', className].filter(Boolean).join(' ')}
    >
      {/* Ornamenty: 4 rohové RohOrnament závorky + HexOrnament nahoře a dole.
          Variant-aware: barva ornamentů sleduje stav. bgFill = aktuální button
          bg → hexagon výplň ladí s pozadím tlačítka:
            selected → v.selBg (variant tint)
            hover    → bg3 (stejné jako effective hover bg)
            idle     → undefined (default bg4 v ornamentu) */}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}tl`} color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}tr`} flip color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}bl`} bottom color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}br`} flip bottom color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <HexOrnament uid={`${uid}ht`} edgePadL={s.cx + 4} color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <HexOrnament uid={`${uid}hb`} flip edgePadL={s.cx + 4} color={ornamentColor} bgFill={ornamentBgFill} />}

      {/* Ikona */}
      <div style={{
        width: s.iconArea, height: s.iconArea,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: disabled ? textFaint : selected ? gold : textMid,
        transition: 'color 0.15s',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Název */}
      <span style={{
        fontSize: s.titleSize,
        fontWeight: 600,
        color: disabled ? textFaint : selected ? textHigh : textMid,
        letterSpacing: '0.04em',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.15s',
      }}>
        {title}
      </span>

      {/* Popis — volitelný */}
      {description && (
        <span style={{
          fontSize: s.descSize,
          color: textFaint,
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          {description}
        </span>
      )}

      {/* Cost badge — pravý dolní roh */}
      {cost != null && !locked && (
        <span style={{
          position: 'absolute',
          bottom: 5, right: 6,
          fontSize: s.costSize,
          fontWeight: 700,
          color: disabled ? textFaint : goldMid,
          letterSpacing: '0.02em',
        }}>
          {cost}
        </span>
      )}

      {/* Lock overlay */}
      {locked && (
        <div style={{
          position: 'absolute', top: 5, right: 5,
        }}>
          <LockIcon />
        </div>
      )}

      {/* Selected checkmark — levý horní roh */}
      {selected && (
        <div style={{
          position: 'absolute', top: 4, left: hasOrnaments ? padH : 5,
          width: 8, height: 8, borderRadius: '50%',
          background: v.selBorder,
          boxShadow: `0 0 4px ${v.selBorder}88`,
        }} />
      )}
    </button>
  )

  if (hasOrnaments) {
    return (
      <div
        style={{
          display: 'inline-flex',
          width: s.w,
          clipPath: octagon(s.cx),
          background: effectiveBorder,
          padding: 1,
          boxSizing: 'border-box',
          boxShadow: selected ? `0 0 10px ${v.selBorder}33` : 'none',
          transition: 'background 0.15s, box-shadow 0.15s',
          ...style,
        }}
      >
        {buttonEl}
      </div>
    )
  }

  return buttonEl
}
