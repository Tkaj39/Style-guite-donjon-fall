/* ── DonjonInput ─────────────────────────────────────────────────────────────
   Herní varianta textového pole.

   Vizuálně odlišné od TkajUI Input:
     TkajUI Input    → cx=8, modrá/fialová focus, surface2 bg, accent caret
     DonjonInput     → cx=12, zlatá focus glow, bg2 tmavé pozadí, gold caret
   ─────────────────────────────────────────────────────────────────────────── */
import { useState, useId } from 'react'
import { octagon, octagonInner } from '../../utils/octagon'
import {
  gold, goldDim, goldMid,
  bg2, bgDeep,
  textHigh, textMid, textLow,
  dangerColor,
} from './tokens'

const sizes = {
  xs: { h: 28, cx: 8,  px: 10, fontSize: '0.6875rem' },
  sm: { h: 36, cx: 10, px: 12, fontSize: '0.75rem'   },
  md: { h: 44, cx: 12, px: 14, fontSize: '0.8125rem' },
  lg: { h: 52, cx: 14, px: 16, fontSize: '0.875rem'  },
}

/**
 * DonjonInput — herní textové pole se zlatou focus paletou.
 *
 * @param {'sm'|'md'|'lg'} size
 * @param {string} label
 * @param {string} error   — chybový text (přepíše hint)
 * @param {string} hint    — pomocný text pod polem
 * @param {ReactNode} leadingIcon
 * @param {ReactNode} trailingIcon
 * @param {boolean} multiline — přepne na <textarea> s field-sizing:content
 * @param {number}  rows      — minimální počet řádků u multiline (výchozí 3)
 */
export default function DonjonInput({
  label,
  value,
  onChange,
  placeholder,
  leadingIcon,
  trailingIcon,
  size       = 'md',
  cornerSize,                 // override pro custom cx (jinak z size presetu)
  error,
  disabled,
  hint,
  multiline  = false,
  rows       = 3,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)
  const id = useId()
  const s  = sizes[size] ?? sizes.md
  const cx = cornerSize ?? s.cx   // explicit cornerSize má přednost

  const borderColor = error
    ? dangerColor
    : isFocused ? gold : goldDim

  const glowColor = error
    ? `${dangerColor}33`
    : `${gold}40`

  const iconColor = isFocused ? gold : goldDim

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize:      '0.6875rem',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:   error ? dangerColor : isFocused ? goldMid : textMid,
            lineHeight:    1,
            userSelect:    'none',
            transition:    'color 150ms',
          }}
        >
          {label}
        </label>
      )}

      {/* Outer obal — border barva (1 px clip trick) */}
      <div
        className="dj-clip-focus"
        style={{
          position:   'relative',
          height:     multiline ? undefined : s.h,
          clipPath:   octagon(cx),
          background: borderColor,
          transition: 'background 150ms ease, filter 150ms ease',
          filter:     (isFocused || error) ? `drop-shadow(0 0 6px ${glowColor})` : undefined,
          opacity:    disabled ? 0.45 : 1,
          flexShrink: 0,
        }}
      >
        {/* Inner fill */}
        <div
          style={{
            position:   multiline ? 'relative' : 'absolute',
            inset:      multiline ? undefined   : 1,
            margin:     multiline ? 1           : undefined,
            clipPath:   octagonInner(cx),
            background: bgDeep,
            display:    'flex',
            alignItems: multiline ? 'flex-start' : 'center',
          }}
        >
          {leadingIcon && (
            <span style={{
              position:      'absolute',
              left:          s.px,
              top:           multiline ? s.px / 2 : undefined,
              display:       'flex',
              alignItems:    'center',
              width:         16,
              height:        16,
              color:         iconColor,
              flexShrink:    0,
              pointerEvents: 'none',
              transition:    'color 150ms',
            }}>
              {leadingIcon}
            </span>
          )}

          {multiline ? (
            <textarea
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="field-sizing-content"
              style={{
                flex:          1,
                width:         '100%',
                resize:        'none',
                background:    'transparent',
                border:        'none',
                outline:       'none',
                paddingTop:    s.px / 2,
                paddingBottom: s.px / 2,
                paddingLeft:   leadingIcon  ? s.px + 24 : s.px,
                paddingRight:  trailingIcon ? s.px + 24 : s.px,
                fontSize:      s.fontSize,
                color:         textHigh,
                caretColor:    gold,
                lineHeight:    1.5,
                fontFamily:    'inherit',
              }}
              {...props}
            />
          ) : (
            <input
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                flex:         1,
                height:       '100%',
                background:   'transparent',
                border:       'none',
                outline:      'none',
                paddingLeft:  leadingIcon  ? s.px + 24 : s.px,
                paddingRight: trailingIcon ? s.px + 24 : s.px,
                fontSize:     s.fontSize,
                color:        textHigh,
                caretColor:   gold,
              }}
              {...props}
            />
          )}

          {trailingIcon && (
            <span style={{
              position:      'absolute',
              right:         s.px,
              top:           multiline ? s.px / 2 : undefined,
              display:       'flex',
              alignItems:    'center',
              width:         16,
              height:        16,
              color:         iconColor,
              flexShrink:    0,
              pointerEvents: 'none',
              transition:    'color 150ms',
            }}>
              {trailingIcon}
            </span>
          )}
        </div>
      </div>

      {(error || hint) && (
        <p style={{
          fontSize:   '0.6875rem',
          lineHeight: 1.4,
          color:      error ? dangerColor : textLow,
          margin:     0,
        }}>
          {error || hint}
        </p>
      )}

      <style href="donjon-input-placeholder" precedence="low">{`
        input::placeholder, textarea::placeholder { color: ${textLow}; }
      `}</style>
    </div>
  )
}
