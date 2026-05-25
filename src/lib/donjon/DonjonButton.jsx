import { useId } from 'react'
import { octagon } from '../../utils/octagon'
import { buttonSizes as sizes } from '../../utils/sizes'
import { SideOrnament, HexOrnament } from './Ornaments'
import { gold, goldDim, VARIANT_BG, VARIANT_TITLE_GRAD } from './tokens'

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
    bg:   VARIANT_BG.default,
    text: VARIANT_TITLE_GRAD.default,
  },
  danger: {
    bg:   VARIANT_BG.danger,
    text: VARIANT_TITLE_GRAD.danger,
  },
  success: {
    bg:   VARIANT_BG.success,
    text: VARIANT_TITLE_GRAD.success,
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
  const ornW  = Math.round(24 * (s.h / 66) * 10) / 10
  const iSize = iconSize[size] ?? iconSize.md
  const hasOrnaments = ornament !== 'plain'

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

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={{
        ...propStyle,            // uživatelský style první (marginTop, opacity…)
        position: 'relative',   // pak fixed layout props — nelze přepsat přes propStyle
        height: s.h,
        width: iconOnly ? s.h : (fullWidth ? '100%' : undefined),
        padding: iconOnly ? 0 : `0 ${hasOrnaments ? s.px + ornW : s.px}px`,
        clipPath: octagon(s.cx),
        background: v.bg,
        display: 'inline-flex',
        alignSelf: fullWidth ? undefined : 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.px * 0.4,
      }}
      className={[
        'cursor-pointer select-none',
        'transition-[filter] duration-150',
        'hover:brightness-110 active:brightness-90',
        'focus:outline-hidden focus-visible:drop-shadow-[0_0_8px_#FFC183AA]',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {hasOrnaments && <SideOrnament h={s.h} uid={`${uid}l`} />}
      {hasOrnaments && <SideOrnament h={s.h} uid={`${uid}r`} flip />}
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
}

export default DonjonButton
