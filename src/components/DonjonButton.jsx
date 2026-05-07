import { forwardRef, useId } from 'react'
import { octagon } from '../utils/octagon'
import { buttonSizes as sizes } from '../utils/sizes'
import { SideOrnament, HexOrnament } from './Ornaments'

function Spinner({ size }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 1s linear infinite', flexShrink: 0, position: 'relative' }}
      aria-hidden="true"
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="#8F7458" strokeWidth="3" opacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#FFC183" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const variants = {
  default: {
    bg:   'linear-gradient(150deg,#353751 0%,#2A2948 70%)',
    text: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
  },
  danger: {
    bg:   'linear-gradient(150deg,#3D1818 0%,#250A0A 70%)',
    text: 'linear-gradient(180deg,#F9C0C0 0%,#C04040 100%)',
  },
  success: {
    bg:   'linear-gradient(150deg,#183D20 0%,#0A250E 70%)',
    text: 'linear-gradient(180deg,#C0F0C8 0%,#40A055 100%)',
  },
}


const iconSize = { xs: 14, sm: 16, md: 20, lg: 24 }

const DonjonButton = forwardRef(function DonjonButton(
  {
    children,
    size = 'md',
    variant = 'default',
    leadingIcon,
    trailingIcon,
    iconOnly = false,
    fullWidth = false,
    loading = false,
    disabled,
    className = '',
    ...props
  },
  ref,
) {
  const rawId = useId()
  const uid   = rawId.replace(/:/g, '')
  const s     = sizes[size] ?? sizes.md
  const v     = variants[variant] ?? variants.default
  const ornW  = Math.round(24 * (s.h / 66) * 10) / 10
  const iSize = iconSize[size] ?? iconSize.md

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
          color: '#FFC183',
          textDecoration: 'underline',
          textDecorationColor: 'transparent',
          textUnderlineOffset: '3px',
          transition: 'text-decoration-color 150ms',
        }}
        className={[
          'hover:[text-decoration-color:#FFC183]',
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
    color: '#FFC183',
    filter: 'drop-shadow(0 0 3px #FFC18388)',
  }

  const textStyle = {
    background: v.text,
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
        position: 'relative',
        height: s.h,
        width: iconOnly ? s.h : (fullWidth ? '100%' : undefined),
        padding: iconOnly ? 0 : `0 ${s.px + ornW}px`,
        clipPath: octagon(s.cx),
        background: v.bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.px * 0.4,
      }}
      className={[
        'cursor-pointer select-none',
        'transition-[filter] duration-150',
        'hover:brightness-110 active:brightness-90',
        'focus:outline-none focus-visible:brightness-110',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <SideOrnament h={s.h} uid={`${uid}l`} />
      <SideOrnament h={s.h} uid={`${uid}r`} flip />
      <HexOrnament uid={`${uid}t`} edgePadL={iconOnly ? s.cx : s.cx + 8} textPadL={iconOnly ? s.cx : s.px + ornW} textPadR={iconOnly ? s.cx : s.px + ornW} />
      <HexOrnament uid={`${uid}b`} flip edgePadL={iconOnly ? s.cx : s.cx + 8} textPadL={iconOnly ? s.cx : s.px + ornW} textPadR={iconOnly ? s.cx : s.px + ornW} />

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
})

export default DonjonButton
