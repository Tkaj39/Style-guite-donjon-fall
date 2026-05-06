import { useState, useId } from 'react'

function octagon(cx) {
  return `polygon(${cx}px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

const sizes = {
  sm: { h: 36, cx: 8, px: 12, fontSize: '0.75rem' },
  md: { h: 44, cx: 8, px: 14, fontSize: '0.8125rem' },
  lg: { h: 52, cx: 8, px: 16, fontSize: '0.875rem' },
}

export default function DonjonInput({
  label,
  value,
  onChange,
  placeholder,
  leadingIcon,
  trailingIcon,
  size = 'md',
  error,
  disabled,
  hint,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)
  const id = useId()
  const s = sizes[size] ?? sizes.md

  const borderColor = error
    ? '#C04040'
    : isFocused
    ? '#FFC183'
    : '#8F7458'

  const glowColor = error
    ? 'rgba(192,64,64,0.25)'
    : isFocused
    ? 'rgba(255,193,131,0.18)'
    : 'transparent'

  const boxShadow = `inset 0 0 0 1px ${borderColor}, 0 0 0 ${isFocused || error ? '3px' : '0px'} ${glowColor}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: error ? '#F9C0C0' : '#B8956A',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          position: 'relative',
          height: s.h,
          clipPath: octagon(s.cx),
          background: disabled
            ? 'linear-gradient(150deg,#1A1928 0%,#141322 70%)'
            : 'linear-gradient(150deg,#232238 0%,#1B1A30 70%)',
          boxShadow,
          transition: 'box-shadow 150ms ease',
          display: 'flex',
          alignItems: 'center',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {leadingIcon && (
          <span
            style={{
              position: 'absolute',
              left: s.px,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 16,
              height: 16,
              color: '#FFC183',
              flexShrink: 0,
              pointerEvents: 'none',
            }}
          >
            {leadingIcon}
          </span>
        )}

        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            height: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            paddingLeft: leadingIcon ? s.px + 16 + 8 : s.px,
            paddingRight: trailingIcon ? s.px + 16 + 8 : s.px,
            fontSize: s.fontSize,
            color: '#F0E6D3',
            caretColor: '#FFC183',
          }}
          {...props}
        />

        {trailingIcon && (
          <span
            style={{
              position: 'absolute',
              right: s.px,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 16,
              height: 16,
              color: '#FFC183',
              flexShrink: 0,
              pointerEvents: 'none',
            }}
          >
            {trailingIcon}
          </span>
        )}
      </div>

      {(error || hint) && (
        <p
          style={{
            fontSize: '0.6875rem',
            lineHeight: 1.4,
            color: error ? '#F9C0C0' : '#8F7458',
            margin: 0,
          }}
        >
          {error || hint}
        </p>
      )}

      <style>{`
        input::placeholder { color: #8F7458; }
      `}</style>
    </div>
  )
}
