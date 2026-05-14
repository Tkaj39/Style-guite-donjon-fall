/* ── Select / Dropdown ──────────────────────────────────────────────────
   Vlastní dropdown (ne nativní <select>). Oktagonální trigger navazuje
   na DonjonInput. Klávesnicová navigace, Escape zavírání, click-outside.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useEffect, useId } from 'react'
import { octagon } from '../../utils/octagon'

const VARIANTS = {
  default: { border: '#8F7458', bg: '#8F745818', focus: '#8F745866' },
  success: { border: '#40A055', bg: '#40A05518', focus: '#40A05566' },
  danger:  { border: '#C04040', bg: '#C0404018', focus: '#C0404066' },
  warning: { border: '#C08040', bg: '#C0804018', focus: '#C0804066' },
}

const SIZES = {
  sm: { h: 30, fontSize: '0.75rem',   px: 10, cx: 5  },
  md: { h: 36, fontSize: '0.8125rem', px: 12, cx: 7  },
  lg: { h: 44, fontSize: '0.875rem',  px: 14, cx: 9  },
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
  placeholder = 'Vyber možnost…',
  label,
  size = 'md',
  variant = 'default',
  disabled = false,
  id: externalId,
}) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const uid = useId()
  const triggerId = externalId ?? `select-${uid}`
  const listId = `select-list-${uid}`

  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const v = VARIANTS[variant] ?? VARIANTS.default
  const s = SIZES[size] ?? SIZES.md

  const selected = options.find(o => o.value === value)

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
      const idx = options.findIndex(o => o.value === value)
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
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(i => Math.min(i + 1, options.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (options[highlighted]) { onChange?.(options[highlighted].value); setOpen(false) }
    }
    if (e.key === 'Tab') { setOpen(false) }
  }

  const handleSelect = (opt) => {
    if (opt.disabled) return
    onChange?.(opt.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>

      {/* Label */}
      {label && (
        <label
          htmlFor={triggerId}
          style={{ display: 'block', marginBottom: 5, fontSize: '0.75rem', color: '#8F9CB3', letterSpacing: '0.04em' }}
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <div style={{ clipPath: octagon(s.cx), background: open ? v.border : `${v.border}55`, padding: 1 }}>
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
          style={{
            clipPath: octagon(s.cx - 1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            width: '100%',
            height: s.h,
            padding: `0 ${s.px}px`,
            background: open ? v.bg : 'linear-gradient(135deg,#1A1830 0%,#12102A 100%)',
            border: 'none',
            fontSize: s.fontSize,
            color: selected ? '#F0E6D3' : '#4A4870',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.45 : 1,
            transition: 'background 0.15s',
            textAlign: 'left',
            outline: 'none',
          }}
          onFocus={e => { e.currentTarget.parentElement.style.background = v.focus }}
          onBlur={e => { if (!open) e.currentTarget.parentElement.style.background = open ? v.border : `${v.border}55` }}
        >
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selected ? selected.label : placeholder}
          </span>
          <span style={{ color: '#8F7458' }}>
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
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 900,
            background: 'linear-gradient(150deg,#252340 0%,#1A1830 100%)',
            border: `1px solid ${v.border}66`,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${v.border}22`,
            animation: 'selectOpen 0.12s ease',
          }}
        >
          <style>{`@keyframes selectOpen { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:translateY(0) } }`}</style>
          {options.map((opt, i) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              aria-disabled={opt.disabled}
              onMouseEnter={() => !opt.disabled && setHighlighted(i)}
              onClick={() => handleSelect(opt)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `8px ${s.px}px`,
                fontSize: s.fontSize,
                color: opt.disabled ? '#4A4870' : (i === highlighted ? '#F0E6D3' : '#B8956A'),
                background: i === highlighted && !opt.disabled ? `${v.border}18` : 'transparent',
                cursor: opt.disabled ? 'not-allowed' : 'pointer',
                transition: 'background 0.1s, color 0.1s',
                borderBottom: i < options.length - 1 ? `1px solid ${v.border}18` : 'none',
              }}
            >
              <span>{opt.label}</span>
              {opt.value === value && (
                <span style={{ color: v.border }}><CheckIcon /></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
