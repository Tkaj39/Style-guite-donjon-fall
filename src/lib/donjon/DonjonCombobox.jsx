/* ── DonjonCombobox (donjon-fall-ui) ─────────────────────────────────
   Game variant of Combobox. Same searchable single-select API and
   keyboard behavior (ArrowUp/Down, Enter, Esc, Backspace-clear) as
   the TkajUI version — visuals shift to the parchment palette:
     • Octagonal gold shell on the input via border-trick
     • bg2 inner fill, gold focus border
     • Parchment popover panel — bg2 on full gold border, octagon clip
     • Gold-tinted selected ✓ + bg3 highlight row
     • CloseIcon for the clear (×) button
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useMemo, useRef, useState } from 'react'
import { octagon } from '../shared/octagon'
import { bg2, bg3, gold, goldDim, goldMid, textHigh, textLow, textMid } from './tokens'
import { shadowMd, zDropdown } from '../shared/tokens'
import { CloseIcon } from '../tkajui/Icons'

const SIZE = {
  xs: { h: 28, cx: 6,  font: '0.75rem',  pad: '4px 8px'  },
  sm: { h: 32, cx: 8,  font: '0.8125rem', pad: '6px 10px' },
  md: { h: 38, cx: 10, font: '0.875rem',  pad: '8px 12px' },
  lg: { h: 46, cx: 12, font: '1rem',      pad: '10px 14px' },
}

const PANEL_CX = 8

/**
 * @typedef {object} ComboboxOption
 * @prop {string|number} value
 * @prop {string} label
 * @prop {boolean} [disabled]
 * @prop {string} [hint]
 */

/**
 * @param {ComboboxOption[]} options
 * @param {string|number|null} value
 * @param {(value: string|number|null) => void} onChange
 * @param {string} [placeholder='Search…']
 * @param {(query: string, option: ComboboxOption) => boolean} [filter]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled=false]
 * @param {boolean} [clearable=true]
 * @param {string} [emptyLabel='No matches']
 */
export default function DonjonCombobox({
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

  useEffect(() => { if (!open) setQuery('') }, [open])

  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter(o =>
      filter ? filter(query, o) : o.label.toLowerCase().includes(q)
    )
  }, [options, query, filter])

  useEffect(() => { setHighlight(0) }, [query, open])

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
  const borderColor = open ? gold : goldDim

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', minWidth: 220, ...style }}
      {...rest}
    >
      {/* Border-trick — outer = border color, inner = bg2 fill, octagon clip */}
      <span
        style={{
          position: 'relative',
          display: 'block',
          height: s.h,
          background: borderColor,
          clipPath: octagon(s.cx),
          padding: 1,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'background 80ms',
        }}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          width: '100%',
          height: '100%',
          padding: s.pad,
          boxSizing: 'border-box',
          background: bg2,
          clipPath: octagon(s.cx),
        }}>
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
            aria-controls="donjon-combobox-list"
            role="combobox"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: textHigh,
              caretColor: gold,
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
                color: goldMid,
                display: 'inline-flex', alignItems: 'center',
                lineHeight: 1, padding: '0 4px',
              }}
            >
              <CloseIcon width={12} height={12} />
            </button>
          )}
          <span aria-hidden="true" style={{ color: goldMid, fontSize: '0.7rem', marginLeft: 2 }}>▾</span>
        </span>
      </span>

      {open && (
        <div
          id="donjon-combobox-list"
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0, right: 0,
            // Parchment popover — outer gold border + bg2 inner + octagon clip
            background: gold,
            clipPath: octagon(PANEL_CX),
            padding: 1,
            boxShadow: shadowMd,
            zIndex: zDropdown,
            animation: 'fadeIn 100ms ease-out',
          }}
        >
          <div style={{
            background: bg2,
            clipPath: octagon(PANEL_CX),
            maxHeight: 280,
            overflowY: 'auto',
            padding: 4,
          }}>
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
                    borderRadius: 2,
                    cursor: opt.disabled ? 'not-allowed' : 'pointer',
                    background: isHighlighted ? bg3 : (isSelected ? `${gold}1A` : 'transparent'),
                    color: opt.disabled ? textLow : (isSelected ? gold : textHigh),
                    fontSize: s.font,
                    fontWeight: isSelected ? 600 : 400,
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
                    <span aria-hidden="true" style={{ color: gold, fontSize: '0.8rem' }}>✓</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </span>
  )
}
