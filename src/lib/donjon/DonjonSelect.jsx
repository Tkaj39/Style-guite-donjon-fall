/* ── DonjonSelect ──────────────────────────────────────────────────────────
   Herní dropdown — zlatý border, tmavé pozadí, zlatá šipka.
   Bez oktagonálního tvaru. Klávesnicová navigace, click-outside, Escape.
   API identické s TkajUI Select, jiná vizuální estetika.
   ─────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useEffect, useId } from 'react'
import {
  gold, goldDim, goldMid,
  bg2, bg3, bg4,
  borderDefault, borderMid,
  textHigh, textMid, textLow, textFaint,
} from './tokens'

const SIZES = {
  sm: { h: 30, fontSize: '0.75rem',   px: 10, radius: 3 },
  md: { h: 36, fontSize: '0.8125rem', px: 12, radius: 3 },
  lg: { h: 44, fontSize: '0.875rem',  px: 14, radius: 4 },
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
  disabled    = false,
  id: externalId,
}) {
  const [open, setOpen]           = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
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

  const triggerBorder = open ? goldDim : borderDefault

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>

      {/* Label */}
      {label && (
        <label
          htmlFor={triggerId}
          style={{
            display: 'block',
            marginBottom: 5,
            fontSize: '0.75rem',
            color: textMid,
            letterSpacing: '0.06em',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </label>
      )}

      {/* Trigger */}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          width: '100%',
          height: s.h,
          padding: `0 ${s.px}px`,
          background: bg2,
          border: `1px solid ${triggerBorder}`,
          borderRadius: s.radius,
          fontSize: s.fontSize,
          color: selected ? textHigh : textLow,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.45 : 1,
          transition: 'border-color 0.15s',
          textAlign: 'left',
          outline: 'none',
          boxShadow: open ? `0 0 0 1px ${goldDim}33` : 'none',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected ? selected.label : (
            <span style={{ color: textFaint }}>{placeholder}</span>
          )}
        </span>
        <ChevronIcon open={open} />
      </button>

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
            zIndex: Z_DROPDOWN,
            background: bg2,
            border: `1px solid ${borderDefault}`,
            borderRadius: s.radius,
            overflow: 'hidden',
            boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px ${goldDim}22`,
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
                  borderBottom: i < safeOptions.length - 1 ? `1px solid ${borderDefault}` : 'none',
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <CheckIcon />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
