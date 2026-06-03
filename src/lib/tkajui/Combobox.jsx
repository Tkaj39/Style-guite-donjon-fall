/* ── Combobox (tkajui) ───────────────────────────────────────────────
   Searchable single-select. Input field with a typeahead filter +
   dropdown of matching options. Click an option or press Enter on the
   highlighted row to select. Esc closes.

   Compared to Select: Combobox lets the user type to filter and shows
   the typed query in the input. Use for >10 options where scrolling
   the list is slower than typing.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useMemo, useRef, useState } from 'react'
import { surface2, surface3, surface4, borderDefault, accent, textHigh, textMid, textLow, shadowMd } from './tokens'
import { zDropdown } from '../shared/tokens'

const SIZE = {
  xs: { h: 28, font: '0.75rem',  pad: '4px 8px'  },
  sm: { h: 32, font: '0.8125rem', pad: '6px 10px' },
  md: { h: 38, font: '0.875rem',  pad: '8px 12px' },
  lg: { h: 46, font: '1rem',      pad: '10px 14px' },
}

/**
 * @typedef {object} ComboboxOption
 * @prop {string|number} value
 * @prop {string} label
 * @prop {boolean} [disabled]
 * @prop {string} [hint]    Secondary text shown right-aligned.
 */

/**
 * @param {ComboboxOption[]} options
 * @param {string|number|null} value
 * @param {(value: string|number|null) => void} onChange
 * @param {string} [placeholder='Search…']
 * @param {(query: string, option: ComboboxOption) => boolean} [filter]
 *   Custom filter predicate. Default = case-insensitive label substring.
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled=false]
 * @param {boolean} [clearable=true]
 * @param {string} [emptyLabel='No matches']
 */
export default function Combobox({
  options = [],
  value,
  onChange,
  placeholder = 'Search…',
  filter,
  size = 'md',
  disabled = false,
  clearable = true,
  emptyLabel = 'No matches',
  className,
  style,
  ...rest
}) {
  const s = SIZE[size] ?? SIZE.md
  const selected = options.find(o => o.value === value) ?? null
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const wrapRef = useRef(null)
  const inputRef = useRef(null)

  // Sync query with the selected label when the popover is closed
  useEffect(() => { if (!open) setQuery('') }, [open])

  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter(o =>
      filter ? filter(query, o) : o.label.toLowerCase().includes(q)
    )
  }, [options, query, filter])

  useEffect(() => { setHighlight(0) }, [query, open])

  // Outside click closes
  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const pick = (opt) => {
    if (opt.disabled) return
    onChange?.(opt.value)
    setOpen(false)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setHighlight(h => Math.min(filtered.length - 1, h + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(0, h - 1)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const opt = filtered[highlight]
      if (opt && !opt.disabled) pick(opt)
    } else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur() }
    else if (e.key === 'Backspace' && !query && selected) { onChange?.(null) }
  }

  const displayValue = open ? query : (selected?.label ?? '')

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', minWidth: 220, ...style }}
      {...rest}
    >
      <span
        style={{
          position: 'relative',
          display: 'flex', alignItems: 'center',
          height: s.h,
          background: surface3,
          border: `1px solid ${open ? accent : borderDefault}`,
          borderRadius: 4,
          padding: s.pad,
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 80ms',
        }}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          placeholder={selected && !open ? '' : placeholder}
          onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          disabled={disabled}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="combobox-list"
          role="combobox"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: textHigh,
            fontSize: s.font,
            fontFamily: 'inherit',
            minWidth: 0,
          }}
        />
        {clearable && selected && !disabled && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange?.(null); inputRef.current?.focus() }}
            aria-label="Clear"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: textMid, fontSize: '0.9rem', lineHeight: 1, padding: '0 4px',
            }}
          >×</button>
        )}
        <span aria-hidden="true" style={{ color: textMid, fontSize: '0.7rem', marginLeft: 4 }}>▾</span>
      </span>
      {open && (
        <div
          id="combobox-list"
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0, right: 0,
            background: surface2,
            border: `1px solid ${borderDefault}`,
            borderRadius: 4,
            boxShadow: shadowMd,
            maxHeight: 280,
            overflowY: 'auto',
            padding: 4,
            zIndex: zDropdown,
            animation: 'fadeIn 100ms ease-out',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '12px 10px', color: textLow, fontSize: s.font, textAlign: 'center' }}>
              {emptyLabel}
            </div>
          ) : filtered.map((opt, i) => {
            const isSelected = selected?.value === opt.value
            const isHighlighted = i === highlight
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled || undefined}
                onMouseDown={(e) => { e.preventDefault(); pick(opt) }}
                onMouseEnter={() => setHighlight(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 10px',
                  borderRadius: 3,
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  background: isHighlighted ? surface4 : (isSelected ? `${accent}22` : 'transparent'),
                  color: opt.disabled ? textLow : textHigh,
                  fontSize: s.font,
                  opacity: opt.disabled ? 0.55 : 1,
                }}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {opt.label}
                </span>
                {opt.hint && (
                  <span style={{ fontSize: '0.75rem', color: textMid }}>{opt.hint}</span>
                )}
                {isSelected && (
                  <span aria-hidden="true" style={{ color: accent, fontSize: '0.8rem' }}>✓</span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </span>
  )
}
