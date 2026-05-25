import { useId } from 'react'
import { octagon } from '../../utils/octagon'
import { buttonSizes as sizes } from '../../utils/sizes'
import { SideOrnament, ZkosenOrnament, RohOrnament, HexOrnament } from './Ornaments'
import { bg2, bg3, gold, goldDim, dangerColor, successColor, VARIANT_BG, VARIANT_BORDER, VARIANT_TITLE_GRAD } from './tokens'

function Spinner({ size }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 1s linear infinite', flexShrink: 0, position: 'relative' }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke={goldDim} strokeWidth="3" opacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={gold} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const variants = {
  default: {
    bg:      VARIANT_BG.default,
    plainBg: `linear-gradient(150deg,${bg3} 0%,${bg2} 70%)`,
    border:  VARIANT_BORDER.default,
    text:    VARIANT_TITLE_GRAD.default,
  },
  danger: {
    bg:      VARIANT_BG.danger,
    plainBg: `linear-gradient(150deg,${dangerColor}22 0%,${bg2} 70%)`,
    border:  VARIANT_BORDER.danger,
    text:    VARIANT_TITLE_GRAD.danger,
  },
  success: {
    bg:      VARIANT_BG.success,
    plainBg: `linear-gradient(150deg,${successColor}22 0%,${bg2} 70%)`,
    border:  VARIANT_BORDER.success,
    text:    VARIANT_TITLE_GRAD.success,
  },
}


const iconSize = { xs: 14, sm: 16, md: 20, lg: 24 }

function DonjonButton({
  ref,
  children,
  size = 'md',
  variant = 'default',
  ornament = 'decorated',
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  fullWidth = false,
  loading = false,
  disabled,
  style: propStyle,   // extrahujeme style zvlášť, aby nepřepsal position:relative
  className = '',
  ...props
}) {
  const rawId = useId()
  const uid   = rawId.replace(/:/g, '')
  const s     = sizes[size] ?? sizes.md
  const v     = variants[variant] ?? variants.default
  /* ornW = šířka side ornametu pro výpočet paddingu (base / 66 * h)
     decorated=24, zkosen=22, roh=25 */
  const ORN_BASES = { decorated: 24, zkosen: 22, roh: 25 }
  const ornW  = Math.round((ORN_BASES[ornament] ?? 24) * (s.h / 66) * 10) / 10
  const iSize = iconSize[size] ?? iconSize.md
  const hasOrnaments = ornament !== 'plain'
  /* Výběr side ornamentu podle prop */
  const SideOrn = ornament === 'zkosen' ? ZkosenOrnament
                : ornament === 'roh'    ? RohOrnament
                : SideOrnament

  // --- link variant renders as plain inline button ---
  if (variant === 'link') {
    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontSize: s.fontSize,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          color: gold,
          textDecoration: 'underline',
          textDecorationColor: 'transparent',
          textUnderlineOffset: '3px',
          transition: 'text-decoration-color 150ms',
          '--db-gold': gold,
        }}
        className={[
          'hover:decoration-(--db-gold)',
          'disabled:opacity-40 disabled:pointer-events-none',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </button>
    )
  }

  const iconStyle = {
    width: iSize,
    height: iSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    color: gold,
    filter: `drop-shadow(0 0 3px ${gold}88)`,
  }

  const textStyle = {
    backgroundImage: v.text,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: s.fontSize,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    lineHeight: 1,
    position: 'relative',
  }

  /* ── Plain mode: outer/inner octagon border trick ──────────────────────
     CSS `border` gets clipped on diagonal octagon corners → unusable.
     Fix: outer div = border color + padding:1, inner button fills 100%.
  ─────────────────────────────────────────────────────────────────────── */
  const buttonEl = (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={{
        ...(hasOrnaments ? propStyle : {}),
        position: 'relative',
        boxSizing: 'border-box',
        height: hasOrnaments ? s.h : '100%',
        width: hasOrnaments ? (iconOnly ? s.h : (fullWidth ? '100%' : undefined)) : '100%',
        padding: iconOnly ? 0 : `0 ${hasOrnaments ? s.px + ornW : s.px}px`,
        clipPath: octagon(s.cx),
        background: hasOrnaments ? v.bg : v.plainBg,
        border: 'none',
        display: 'inline-flex',
        alignSelf: (fullWidth || !hasOrnaments) ? undefined : 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.px * 0.4,
      }}
      className={[
        'cursor-pointer select-none',
        'transition-[filter] duration-150',
        'hover:brightness-110 active:brightness-90',
        'focus:outline-hidden',
        hasOrnaments && 'focus-visible:drop-shadow-[0_0_8px_#FFC183AA]',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {hasOrnaments && <SideOrn h={s.h} uid={`${uid}l`} />}
      {hasOrnaments && <SideOrn h={s.h} uid={`${uid}r`} flip />}
      {hasOrnaments && <HexOrnament uid={`${uid}t`} edgePadL={iconOnly ? s.cx : s.cx + 8} textPadL={iconOnly ? s.cx : s.px + ornW} textPadR={iconOnly ? s.cx : s.px + ornW} />}
      {hasOrnaments && <HexOrnament uid={`${uid}b`} flip edgePadL={iconOnly ? s.cx : s.cx + 8} textPadL={iconOnly ? s.cx : s.px + ornW} textPadR={iconOnly ? s.cx : s.px + ornW} />}

      {loading ? (
        <>
          <Spinner size={iSize} />
          {!iconOnly && <span style={textStyle}>{children}</span>}
        </>
      ) : (
        <>
          {leadingIcon && <span style={iconStyle}>{leadingIcon}</span>}
          {!iconOnly && <span style={textStyle}>{children}</span>}
          {trailingIcon && <span style={iconStyle}>{trailingIcon}</span>}
          {iconOnly && <span style={iconStyle}>{children}</span>}
        </>
      )}
    </button>
  )

  if (!hasOrnaments) {
    return (
      <div
        className="dj-clip-focus"
        style={{
          ...propStyle,
          display: 'inline-flex',
          alignSelf: fullWidth ? undefined : 'flex-start',
          height: s.h,
          width: iconOnly ? s.h : (fullWidth ? '100%' : undefined),
          clipPath: octagon(s.cx),
          background: v.border,
          padding: 1,
          boxSizing: 'border-box',
        }}
      >
        {buttonEl}
      </div>
    )
  }

  return buttonEl
}

export default DonjonButton
