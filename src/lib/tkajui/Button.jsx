import { octagon } from '../../utils/octagon'
import { buttonSizes as sizes } from '../../utils/sizes'
import {
  accent, accentLight, surface2, surface3, surface4,
  borderDefault, borderMid,
  textHigh, textMid,
  primaryText, primaryIcon,
  dangerColor, dangerBg, dangerBgHover, dangerBorder, dangerText,
  successColor, successBg, successBgHover, successBorder, successText,
  warningColor, warningBg, warningBgHover, warningBorder, warningText,
} from './tokens'

function Spinner({ size }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 1s linear infinite', flexShrink: 0, position: 'relative' }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke={borderMid} strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const variants = {
  default: {
    bg:          surface3,
    bgHover:     surface4,
    border:      borderDefault,
    borderHover: borderMid,
    text:        textHigh,
    icon:        textMid,
  },
  primary: {
    bg:          accent,
    bgHover:     accentLight,
    border:      accent,
    borderHover: accentLight,
    text:        primaryText,
    icon:        primaryIcon,
  },
  danger: {
    bg:          dangerBg,
    bgHover:     dangerBgHover,
    border:      dangerBorder,
    borderHover: dangerColor,
    text:        dangerText,
    icon:        dangerColor,
  },
  success: {
    bg:          successBg,
    bgHover:     successBgHover,
    border:      successBorder,
    borderHover: successColor,
    text:        successText,
    icon:        successColor,
  },
  warning: {
    bg:          warningBg,
    bgHover:     warningBgHover,
    border:      warningBorder,
    borderHover: warningColor,
    text:        warningText,
    icon:        warningColor,
  },
}

const iconSize = { xs: 14, sm: 16, md: 20, lg: 24 }

/**
 * Button — TkajUI základní tlačítko.
 * Oktagonální tvar, čistá UI paleta (bez herních gradientů).
 * Varianty: default | primary | danger | success | warning | link
 */
function Button({
  children,
  ref,
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
}) {
  const s     = sizes[size] ?? sizes.md
  const v     = variants[variant] ?? variants.default
  const iSize = iconSize[size] ?? iconSize.md

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
          fontWeight: 500,
          letterSpacing: '0.02em',
          cursor: 'pointer',
          color: accent,
          textDecoration: 'underline',
          textDecorationColor: 'transparent',
          textUnderlineOffset: '3px',
          transition: 'color 150ms, text-decoration-color 150ms',
        }}
        className={[
          `hover:[text-decoration-color:${accent}]`,
          'disabled:opacity-40 disabled:pointer-events-none',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </button>
    )
  }

  /* ── CSS custom property architektura (Tailwind v4 design) ────────────────
   * Všechny tokeny jsou vystaveny jako --btn-* vlastnosti na elementu.
   * Výhody: DevTools vidí hodnoty, CSS animace mohou tokeny animovat,
   *         nadřazený element může přebít variantu: --btn-bg: red.
   * ──────────────────────────────────────────────────────────────────────── */
  const octCx  = `polygon(var(--btn-cx) 0px,calc(100% - var(--btn-cx)) 0px,100% var(--btn-cx),100% calc(100% - var(--btn-cx)),calc(100% - var(--btn-cx)) 100%,var(--btn-cx) 100%,0px calc(100% - var(--btn-cx)),0px var(--btn-cx))`
  const octIn  = `polygon(calc(var(--btn-cx) - 1px) 0px,calc(100% - var(--btn-cx) + 1px) 0px,100% calc(var(--btn-cx) - 1px),100% calc(100% - var(--btn-cx) + 1px),calc(100% - var(--btn-cx) + 1px) 100%,calc(var(--btn-cx) - 1px) 100%,0px calc(100% - var(--btn-cx) + 1px),0px calc(var(--btn-cx) - 1px))`

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={{
        /* Tokeny — dostupné v DevTools a CSS */
        '--btn-h':      `${s.h}px`,
        '--btn-cx':     `${s.cx}px`,
        '--btn-px':     `${s.px}px`,
        '--btn-fs':     s.fontSize,
        '--btn-bg':     v.bg,
        '--btn-border': v.border,
        '--btn-text':   v.text,
        '--btn-icon':   v.icon,
        /* Layoutové vlastnosti přes var() */
        position:    'relative',
        height:      'var(--btn-h)',
        width:       iconOnly ? 'var(--btn-h)' : (fullWidth ? '100%' : undefined),
        padding:     iconOnly ? 0 : '0 var(--btn-px)',
        clipPath:    octCx,
        background:  'var(--btn-border)',   // outer 1px "border" via clip inset
        display:     'inline-flex',
        alignSelf:   fullWidth ? undefined : 'flex-start',
        alignItems:  'center',
        justifyContent: 'center',
      }}
      className={[
        'cursor-pointer select-none',
        'transition-[filter] duration-150',
        'hover:brightness-110 active:brightness-90',
        'focus:outline-hidden focus-visible:brightness-110',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {/* Inner fill */}
      <span
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      1,
          clipPath:   octIn,
          background: 'var(--btn-bg)',
          transition: 'background 120ms',
        }}
      />
      {/* Content */}
      {loading ? (
        <>
          <Spinner size={iSize} />
          {!iconOnly && (
            <span style={{ position: 'relative', fontSize: 'var(--btn-fs)', fontWeight: 500, letterSpacing: '0.04em', color: 'var(--btn-text)' }}>
              {children}
            </span>
          )}
        </>
      ) : (
        <>
          {leadingIcon && (
            <span style={{ position: 'relative', width: iSize, height: iSize, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--btn-icon)' }}>
              {leadingIcon}
            </span>
          )}
          {!iconOnly && (
            <span style={{ position: 'relative', fontSize: 'var(--btn-fs)', fontWeight: 500, letterSpacing: '0.04em', color: 'var(--btn-text)', lineHeight: 1 }}>
              {children}
            </span>
          )}
          {trailingIcon && (
            <span style={{ position: 'relative', width: iSize, height: iSize, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--btn-icon)' }}>
              {trailingIcon}
            </span>
          )}
          {iconOnly && (
            <span style={{ position: 'relative', width: iSize, height: iSize, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--btn-icon)' }}>
              {children}
            </span>
          )}
        </>
      )}
    </button>
  )
}

export default Button
