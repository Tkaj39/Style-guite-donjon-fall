import { useState, useId } from 'react'
import { octagon } from '../utils/octagon'

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

  const borderColor = error ? '#C04040' : isFocused ? '#FFC183' : '#8F7458'
  const glowColor   = error ? 'rgba(192,64,64,0.3)' : 'rgba(255,193,131,0.2)'
  const innerBg     = disabled
    ? 'linear-gradient(150deg,#1A1928 0%,#141322 70%)'
    : 'linear-gradient(150deg,#232238 0%,#1B1A30 70%)'

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

      {/* Outer border shell — clip-path + border color as background */}
      <div
        style={{
          position: 'relative',
          height: s.h,
          clipPath: octagon(s.cx),
          background: borderColor,
          transition: 'background 150ms ease, filter 150ms ease',
          filter: (isFocused || error) ? `drop-shadow(0 0 6px ${glowColor})` : undefined,
          opacity: disabled ? 0.5 : 1,
          flexShrink: 0,
        }}
      >
        {/* Inner fill */}
        <div
          style={{
            position: 'absolute',
            inset: 1,
            clipPath: octagon(Math.max(s.cx - 1, 0)),
            background: innerBg,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {leadingIcon && (
            <span
              style={{
                position: 'absolute',
                left: s.px,
                display: 'flex',
                alignItems: 'center',
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
              paddingLeft:  leadingIcon  ? s.px + 24 : s.px,
              paddingRight: trailingIcon ? s.px + 24 : s.px,
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
      </div>

      {(error || hint) && (
        <p style={{ fontSize: '0.6875rem', lineHeight: 1.4, color: error ? '#F9C0C0' : '#8F7458', margin: 0 }}>
          {error || hint}
        </p>
      )}

      <style>{`input::placeholder { color: #8F7458; }`}</style>
    </div>
  )
}
