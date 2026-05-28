/* ── DonjonSelect ──────────────────────────────────────────────────────────
   Herní dropdown — zlatý border, tmavé pozadí, zlatá šipka.
   Oktagonální tvar triggeru (outer/inner clip-path trick jako DonjonInput).
   Klávesnicová navigace, click-outside, Escape.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useEffect, useId } from 'react'
import { octagon } from '../../utils/octagon'
import {
  gold, goldDim, goldMid,
  bg2, bg3, bgDeep,
  textHigh, textMid, textLow, textFaint,
  dangerColor, successColor, warningColor, infoColor,
} from './tokens'

/* Variant lookup — parita s TkajUI Select.
   Pro každou variantu: active border (focus/open), idle border, label. */
const VARIANTS = {
  default: { active: gold,         idle: goldDim,            label: goldMid      },
  danger:  { active: dangerColor,  idle: `${dangerColor}88`, label: dangerColor  },
  success: { active: successColor, idle: `${successColor}88`, label: successColor },
  warning: { active: warningColor, idle: `${warningColor}88`, label: warningColor },
  info:    { active: infoColor,    idle: `${infoColor}88`,    label: infoColor    },
}

const SIZES = {
  xs: { h: 24, cx: 6,  fontSize: '0.6875rem', px: 8  },
  sm: { h: 30, cx: 8,  fontSize: '0.75rem',   px: 10 },
  md: { h: 36, cx: 10, fontSize: '0.8125rem', px: 12 },
  lg: { h: 44, cx: 12, fontSize: '0.875rem',  px: 14 },
}

const Z_DROPDOWN = 900

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      width="12"
      height="12"
      style={{
        transition: 'transform 0.15s',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke={gold}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
      <path
        d="M3.5 8l3 3L12.5 5"
        stroke={goldDim}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function DonjonSelect({
  value,
  onChange,
  options     = [],
  placeholder = 'Vyber možnost…',
  label,
  size        = 'md',
  variant     = 'default',   // 'default'|'danger'|'success'|'warning'|'info' — parita s TkajUI Select
  disabled    = false,
  id: externalId,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.default
  const [open, setOpen]           = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const [focused, setFocused]     = useState(false)
  const uid       = useId()
  const triggerId = externalId ?? `donjon-select-${uid}`
  const listId    = `donjon-select-list-${uid}`

  const triggerRef = useRef(null)
  const listRef    = useRef(null)
  const s          = SIZES[size] ?? SIZES.md

  const safeOptions = options ?? []
  const selected    = safeOptions.find(o => o.value === value)

  /* Close on outside click */
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  /* Reset highlight on open */
  useEffect(() => {
    if (open) {
      const idx = safeOptions.findIndex(o => o.value === value)
      setHighlighted(idx >= 0 ? idx : 0)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (e) => {
    if (disabled) return
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault(); setOpen(true); return
    }
    if (!open) return
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); triggerRef.current?.focus(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(i => Math.min(i + 1, safeOptions.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (safeOptions[highlighted]) { onChange?.(safeOptions[highlighted].value); setOpen(false) }
    }
    if (e.key === 'Tab') setOpen(false)
  }

  const handleSelect = (opt) => {
    if (opt.disabled) return
    onChange?.(opt.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const active       = open || focused
  const borderColor  = active ? v.active : v.idle
  const glowColor    = `${v.active}40`

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>

      {/* Label */}
      {label && (
        <label
          htmlFor={triggerId}
          style={{
            display: 'block',
            marginBottom: 5,
            fontSize: '0.6875rem',
            color: active ? goldMid : textMid,
            letterSpacing: '0.1em',
            fontWeight: 600,
            textTransform: 'uppercase',
            transition: 'color 150ms',
          }}
        >
          {label}
        </label>
      )}

      {/* Trigger — outer border layer */}
      <div
        className="dj-clip-focus"
        style={{
          position:   'relative',
          height:     s.h,
          clipPath:   octagon(s.cx),
          background: borderColor,
          transition: 'background 150ms ease, filter 150ms ease',
          filter:     active ? `drop-shadow(0 0 6px ${gold}40)` : undefined,
          opacity:    disabled ? 0.45 : 1,
        }}
      >
        {/* Inner fill */}
        <div style={{ position: 'absolute', inset: 1, clipPath: octagon(Math.max(s.cx - 1, 0)), background: bgDeep }}>
          <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listId}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={() => !disabled && setOpen(o => !o)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              width: '100%',
              height: s.h - 2,
              padding: `0 ${s.px}px`,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: s.fontSize,
              color: selected ? textHigh : textFaint,
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'left',
            }}
          >
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selected ? selected.label : placeholder}
            </span>
            <ChevronIcon open={open} />
          </button>
        </div>
      </div>

      {/* Dropdown list */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: Z_DROPDOWN,
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.7))',
        }}>
          {/* Outer border layer */}
          <div style={{
            clipPath: octagon(s.cx),
            background: goldDim,
            padding: 1,
          }}>
            {/* Inner content layer */}
            <div
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={label}
              style={{
                clipPath: octagon(Math.max(s.cx - 1, 0)),
                background: bgDeep,
                overflow: 'hidden',
              }}
            >
              {safeOptions.map((opt, i) => {
                const isHighlighted = i === highlighted && !opt.disabled
                const isSelected    = opt.value === value
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    onMouseEnter={() => !opt.disabled && setHighlighted(i)}
                    onClick={() => handleSelect(opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: `8px ${s.px}px`,
                      fontSize: s.fontSize,
                      color: opt.disabled ? textLow : (isHighlighted ? textHigh : textMid),
                      background: isHighlighted ? bg3 : 'transparent',
                      cursor: opt.disabled ? 'not-allowed' : 'pointer',
                      transition: 'background 0.1s, color 0.1s',
                      borderBottom: i < safeOptions.length - 1 ? `1px solid ${goldDim}33` : 'none',
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <CheckIcon />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
