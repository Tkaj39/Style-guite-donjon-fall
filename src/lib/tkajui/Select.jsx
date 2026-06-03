/* ── Select / Dropdown ──────────────────────────────────────────────────
   Custom dropdown (not the native <select>). Octagonal trigger.
   Keyboard navigation, Escape closes, click-outside closes.
   Clean TkajUI palette.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useEffect, useId } from 'react'
import { octagon } from '../shared/octagon'
import {
  surface2, surface4,
  borderDefault, borderMid,
  accent, accentBg, accentBorder,
  textHigh, textMid, textLow,
  successColor, successBg, successBorder,
  dangerColor, dangerBg, dangerBorder,
  warningColor, warningBg, warningBorder,
  zDropdown,
} from './tokens'

const VARIANTS = {
  default: { border: borderDefault, bg: accentBg,    focus: `${accent}44`        },
  success: { border: successBorder, bg: successBg,   focus: `${successColor}44`  },
  danger:  { border: dangerBorder,  bg: dangerBg,    focus: `${dangerColor}44`   },
  warning: { border: warningBorder, bg: warningBg,   focus: `${warningColor}44`  },
}

const SIZES = {
  xs: { h: 24, fontSize: '0.6875rem', px: 8,  cx: 3 },
  sm: { h: 30, fontSize: '0.75rem',   px: 10, cx: 5 },
  md: { h: 36, fontSize: '0.8125rem', px: 12, cx: 7 },
  lg: { h: 44, fontSize: '0.875rem',  px: 14, cx: 9 },
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      width="12"
      height="12"
      style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
    >
      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 9.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  )
}

export default function Select({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option…',
  label,
  size = 'md',
  variant = 'default',
  disabled = false,
  id: externalId,
}) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const [focused, setFocused] = useState(false)
  const uid = useId()
  const triggerId = externalId ?? `select-${uid}`
  const listId = `select-list-${uid}`

  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const v = VARIANTS[variant] ?? VARIANTS.default
  const s = SIZES[size] ?? SIZES.md

  const safeOptions = options ?? []
  const selected = safeOptions.find(o => o.value === value)

  /* Close on outside click */
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!triggerRef.current?.contains(e.target) && !listRef.current?.contains(e.target)) {
        setOpen(false)
      }
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
    if (e.key === 'Tab') { setOpen(false) }
  }

  const handleSelect = (opt) => {
    if (opt.disabled) return
    onChange?.(opt.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  // Dynamic border: open or keyboard-focused → accent, else default
  const outerBorder = (open || focused) ? accent : borderDefault

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>

      {/* Label */}
      {label && (
        <label
          htmlFor={triggerId}
          style={{ display: 'block', marginBottom: 5, fontSize: '0.75rem', color: textMid, letterSpacing: '0.04em', fontWeight: 500 }}
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <div style={{ clipPath: octagon(s.cx), background: outerBorder, padding: 1, transition: 'background 150ms' }}>
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
            clipPath: octagon(s.cx - 1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            width: '100%',
            height: s.h,
            padding: `0 ${s.px}px`,
            background: surface2,
            border: 'none',
            fontSize: s.fontSize,
            color: selected ? textHigh : textLow,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.45 : 1,
            transition: 'background 0.15s',
            textAlign: 'left',
            outline: 'none',
          }}
        >
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selected ? selected.label : placeholder}
          </span>
          <span style={{ color: textMid, transition: 'color 150ms' }}>
            <ChevronIcon open={open} />
          </span>
        </button>
      </div>

      {/* Dropdown list */}
      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          /* Tailwind v4 starting: variant — @starting-style bez inline <style> tagu */
          className="starting:opacity-0 starting:-translate-y-1 transition-[opacity,transform] duration-[120ms] ease"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: zDropdown,
            background: surface2,
            border: `1px solid ${borderMid}`,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22`,
          }}
        >
          {safeOptions.map((opt, i) => {
            const isHighlighted = i === highlighted && !opt.disabled
            const isSelected = opt.value === value
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
                  background: isHighlighted ? surface4 : 'transparent',
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 0.1s, color 0.1s',
                  borderBottom: i < safeOptions.length - 1 ? `1px solid ${borderDefault}` : 'none',
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span style={{ color: accent }}><CheckIcon /></span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
