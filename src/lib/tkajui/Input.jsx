import { useState, useId } from 'react'
import { octagon } from '../../utils/octagon'
import {
  surface2, borderDefault, borderMid,
  accent, accentBorder,
  textHigh, textMid, textLow,
  dangerColor, dangerBorder, dangerText,
} from './tokens'

const sizes = {
  sm: { h: 36, cx: 8, px: 12, fontSize: '0.75rem' },
  md: { h: 44, cx: 8, px: 14, fontSize: '0.8125rem' },
  lg: { h: 52, cx: 8, px: 16, fontSize: '0.875rem' },
}

/**
 * Input — TkajUI základní textové pole.
 * Oktagonální tvar, čistá UI paleta.
 */
export default function Input({
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
    ? dangerColor
    : isFocused ? accent : borderDefault

  const glowColor = error
    ? 'rgba(240,85,85,0.18)'
    : 'rgba(101,118,255,0.15)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: error ? dangerText : textMid,
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
          background: borderColor,
          transition: 'background 150ms ease, filter 150ms ease',
          filter: (isFocused || error) ? `drop-shadow(0 0 5px ${glowColor})` : undefined,
          opacity: disabled ? 0.45 : 1,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 1,
            clipPath: octagon(Math.max(s.cx - 1, 0)),
            background: surface2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {leadingIcon && (
            <span style={{
              position: 'absolute', left: s.px,
              display: 'flex', alignItems: 'center',
              width: 16, height: 16,
              color: isFocused ? accent : textMid,
              flexShrink: 0, pointerEvents: 'none',
              transition: 'color 150ms',
            }}>
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
              color: textHigh,
              caretColor: accent,
            }}
            {...props}
          />
          {trailingIcon && (
            <span style={{
              position: 'absolute', right: s.px,
              display: 'flex', alignItems: 'center',
              width: 16, height: 16,
              color: isFocused ? accent : textMid,
              flexShrink: 0, pointerEvents: 'none',
              transition: 'color 150ms',
            }}>
              {trailingIcon}
            </span>
          )}
        </div>
      </div>

      {(error || hint) && (
        <p style={{ fontSize: '0.6875rem', lineHeight: 1.4, color: error ? dangerText : textMid, margin: 0 }}>
          {error || hint}
        </p>
      )}

      <style>{`input::placeholder { color: ${textLow}; }`}</style>
    </div>
  )
}
