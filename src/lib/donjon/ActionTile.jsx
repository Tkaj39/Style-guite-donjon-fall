/* ── ActionTile ────────────────────────────────────────────────────────────
   Clickable action tile — icon, title, description, cost.
   Different from Button: tile shape, icon-forward, cost badge in the corner,
   lock state.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useId } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { RohOrnament, HexOrnament, ornamentHForCx, ORNAMENT_BASE_WIDTH } from './Ornaments'
import { gold, goldDim, goldMid, bg3, borderDefault, borderMid, textHigh, textMid, textLow, textFaint, dangerColor, gainColor, magicColor, infoColor, infoDark, selBgInfo, selBgDanger, selBgGain, selBgMagic } from './tokens'

const SIZES = {
  xs: { w: 48,  h: 44,  cx: 8,  iconArea: 20, titleSize: '0.5rem',    descSize: '0.4375rem', costSize: '0.5rem',    radius: 2 },
  sm: { w: 80,  h: 72,  cx: 14, iconArea: 28, titleSize: '0.6875rem', descSize: '0.6rem',    costSize: '0.6875rem', radius: 3 },
  md: { w: 110, h: 96,  cx: 18, iconArea: 36, titleSize: '0.75rem',   descSize: '0.6875rem', costSize: '0.75rem',   radius: 4 },
  lg: { w: 148, h: 130, cx: 22, iconArea: 48, titleSize: '0.875rem',  descSize: '0.75rem',   costSize: '0.8125rem', radius: 4 },
}

/* VARIANTS:
 *  - border, activeBorder, selBorder: 1px frame color in the given state
 *  - selBg: subtle tinted background in the selected state
 *  - selOrn: ornament color in the selected state (brighter than selBorder
 *    for visual pop — default goldDim → gold, special magicDark → magicColor)
 */
/* Selected-state pattern unified across variants:
 *   selBg      = `${variantColor}22` — alpha tinted bg (visually pleasant, but alpha)
 *   selBgSolid = pre-computed SOLID equivalent of the tinted bg on bg2 (#1E1C30)
 *                — used as bgFill on hex SVG; matches the button surface
 *                  without double-blend issues.
 *   selBorder  = variant color (full bright 1px frame)
 *   selOrn     = infoDark UNIVERSAL (#1E3A6B navy accent)
 */
const VARIANTS = {
  default: { border: borderDefault, activeBorder: infoColor,    selBg: `${infoColor}22`,    selBgSolid: selBgInfo,   selBorder: infoColor,    selOrn: infoDark },
  attack:  { border: borderDefault, activeBorder: dangerColor,  selBg: `${dangerColor}22`,  selBgSolid: selBgDanger, selBorder: dangerColor,  selOrn: infoDark },
  move:    { border: borderDefault, activeBorder: gainColor,    selBg: `${gainColor}22`,    selBgSolid: selBgGain,   selBorder: gainColor,    selOrn: infoDark },
  special: { border: borderDefault, activeBorder: magicColor,   selBg: `${magicColor}22`,   selBgSolid: selBgMagic,  selBorder: magicColor,   selOrn: infoDark },
}

/* ── Lock icon ── */
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
  // Corner ornament height scaled from cx (not from tile height — that was a magic formula)
  const ornH          = hasOrnaments ? ornamentHForCx(s.cx, 'roh') : 0
  // Ornament width for the horizontal padding calc (≈ cx for roh)
  const ornW          = hasOrnaments ? Math.round(ORNAMENT_BASE_WIDTH.roh * ornH / 66 * 10) / 10 : 0
  const padH          = 6 + ornW

  /* State-dependent colors — border (frame) is dark when idle, the ornament is always visible */
  const effectiveBorder = isBlocked ? borderMid
                        : hovered   ? v.activeBorder
                        : selected  ? v.selBorder
                        : v.border
  /* Ornament color: idle = goldDim (visible on the bg), selected = v.selOrn
     (a brighter variant — gold/dangerColor/gainColor/magicColor for pop) */
  const ornamentColor   = isBlocked ? borderMid
                        : hovered   ? v.activeBorder
                        : selected  ? v.selOrn
                        : goldDim
  /* Hex fill inside the ornaments: matches the current button bg → the hex
     blends with the button surface. Solid values (no alpha) to avoid a
     double-blend (alpha overlay on alpha overlay → an oversaturated dot). */
  const ornamentBgFill  = isBlocked ? undefined        // default bg4
                        : hovered   ? bg3              // solid bg3 (= effective hover bg)
                        : selected  ? v.selBgSolid     // solid pre-computed tinted bg
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
      {/* Ornaments: 4 corner RohOrnament brackets + HexOrnament on top and bottom.
          Variant-aware: ornament color tracks state. bgFill = current button
          bg → the hexagon fill blends with the button background:
            selected → v.selBg (variant tint)
            hover    → bg3 (same as the effective hover bg)
            idle     → undefined (default bg4 inside the ornament) */}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}tl`} color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}tr`} flip color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}bl`} bottom color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <RohOrnament h={ornH} uid={`${uid}br`} flip bottom color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <HexOrnament uid={`${uid}ht`} edgePadL={s.cx + 4} color={ornamentColor} bgFill={ornamentBgFill} />}
      {hasOrnaments && <HexOrnament uid={`${uid}hb`} flip edgePadL={s.cx + 4} color={ornamentColor} bgFill={ornamentBgFill} />}

      {/* Icon */}
      <div style={{
        width: s.iconArea, height: s.iconArea,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: disabled ? textFaint : selected ? gold : textMid,
        transition: 'color 0.15s',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Title */}
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

      {/* Description — optional */}
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

      {/* Cost badge — in decorated mode BOTTOM-CENTER (outside the corner
          ornaments), in plain mode the classic bottom-right corner. */}
      {cost != null && !locked && (
        <span style={{
          position: 'absolute',
          ...(hasOrnaments ? {
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
          } : {
            bottom: 5,
            right: 6,
          }),
          fontSize: s.costSize,
          fontWeight: 700,
          color: disabled ? textFaint : goldMid,
          letterSpacing: '0.02em',
        }}>
          {cost}
        </span>
      )}

      {/* Lock overlay — in decorated mode a CENTER overlay (semantically: the
          lock blocks the action → covers the content), in plain mode the
          top-right corner. */}
      {locked && (
        <div style={{
          position: 'absolute',
          ...(hasOrnaments ? {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          } : {
            top: 5,
            right: 5,
          }),
        }}>
          <LockIcon />
        </div>
      )}

      {/* Selected checkmark — plain mode only (in decorated mode the
          'selected' signal is redundant: border + bg tint + ornament color
          already communicate it clearly enough). */}
      {selected && !hasOrnaments && (
        <div style={{
          position: 'absolute',
          top: 4,
          left: 5,
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
