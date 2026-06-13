/* ── CommandPalette ───────────────────────────────────────────────────────
   ⌘K / Ctrl+K modal s fuzzy search přes:
     • Všechny navigační položky ze Sidebar (sections)
     • Komponenty z componentRegistry (popisy, related slugs)
   Klávesy: ↑↓ navigace, Enter potvrzení, Esc zavření.
   ─────────────────────────────────────────────────────────────────────── */
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { sections } from './Sidebar'
import { registry } from '../data/componentRegistry'
import { gold, goldMid, goldDim, bgDeep, bg2, borderDefault, borderMid, textHigh, textMid, textLow } from '../lib/donjon/tokens'

/* ── Flatten nav data do jednoho searchable seznamu ── */
function buildIndex() {
  const items = []

  // Nav items ze Sidebaru
  for (const section of sections) {
    for (const item of section.items) {
      items.push({
        kind: 'page',
        label: item.label.replace(/^[^\w\s]+\s*/, ''), // strip leading emoji
        to: item.to,
        group: section.label,
        keywords: [item.label, section.label].join(' '),
      })
      if (item.children) {
        for (const c of item.children) {
          items.push({
            kind: 'page',
            label: c.label,
            to: c.to,
            group: `${section.label} › ${item.label}`,
            keywords: [c.label, item.label, section.label].join(' '),
          })
        }
      }
    }
  }

  // Komponenty z registru (description + props)
  if (registry && Array.isArray(registry)) {
    for (const c of registry) {
      if (!c.showcaseRoute) continue
      items.push({
        kind: 'component',
        label: c.name,
        to: c.showcaseRoute,
        group: c.category || 'Components',
        keywords: [c.name, c.slug, c.description || '', (c.props || []).map(p => p.name).join(' ')].join(' '),
      })
    }
  }

  return items
}

/* ── Fuzzy match scoring ──
   Vrací 0 = no match, vyšší číslo = lepší match.
   - exact substring na začátku label: 100
   - exact substring kdekoli v label: 70
   - všechna písmena query v pořadí (subsequence) v label: 40
   - exact substring v keywords: 20 */
function score(query, item) {
  if (!query) return 1
  const q = query.toLowerCase().trim()
  const label = item.label.toLowerCase()
  const kw = item.keywords.toLowerCase()

  if (label.startsWith(q)) return 100 + (50 - Math.min(label.length, 50))
  const labelIdx = label.indexOf(q)
  if (labelIdx >= 0) return 70 - labelIdx
  if (kw.includes(q)) return 20

  // Subsequence (každé písmeno query je v label v pořadí)
  let li = 0
  for (let i = 0; i < q.length; i++) {
    li = label.indexOf(q[i], li)
    if (li < 0) return 0
    li++
  }
  return 40
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const dialogRef = useRef(null)

  const index = useMemo(() => buildIndex(), [])

  const results = useMemo(() => {
    const scored = index
      .map(it => ({ it, s: score(query, it) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 50)
    return scored.map(x => x.it)
  }, [query, index])

  /* Reset při otevření */
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIdx(0)
      // focus input po render
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  /* Reset activeIdx při změně query */
  useEffect(() => { setActiveIdx(0) }, [query])

  /* Scroll do view aktivního itemu */
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  /* Klávesy v paletě */
  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[activeIdx]
      if (item) {
        navigate(item.to)
        onClose?.()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose?.()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hledat"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2200,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        animation: 'fadeIn 120ms ease-out',
      }}
    >
      <div
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
        onKeyDown={onKeyDown}
        style={{
          width: '100%',
          maxWidth: 580,
          margin: '0 16px',
          background: bgDeep,
          border: `1px solid ${borderDefault}`,
          borderRadius: 8,
          boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${goldDim}22`,
          overflow: 'hidden',
        }}
      >
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px',
          borderBottom: `1px solid ${borderMid}`,
          color: textLow,
        }}>
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Hledat stránky a komponenty…"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: textHigh,
              fontSize: '0.9375rem',
              fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            color: textLow,
            border: `1px solid ${borderDefault}`,
            borderRadius: 3,
            padding: '2px 6px',
            fontFamily: 'inherit',
          }}>
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          role="listbox"
          style={{
            maxHeight: '52vh',
            overflowY: 'auto',
            padding: 6,
          }}
        >
          {results.length === 0 ? (
            <div style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: textLow,
              fontSize: '0.875rem',
            }}>
              Žádné výsledky pro <strong style={{ color: textMid }}>"{query}"</strong>
            </div>
          ) : (
            results.map((item, i) => {
              const active = i === activeIdx
              return (
                <div
                  key={`${item.kind}-${item.to}-${i}`}
                  role="option"
                  aria-selected={active}
                  data-idx={i}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => { navigate(item.to); onClose?.() }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    padding: '8px 12px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    background: active ? `${gold}14` : 'transparent',
                    border: `1px solid ${active ? `${gold}33` : 'transparent'}`,
                    transition: 'background 80ms',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                    <span style={{
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: item.kind === 'component' ? gold : goldMid,
                      width: 76,
                      flexShrink: 0,
                    }}>
                      {item.kind === 'component' ? 'Komponenta' : 'Stránka'}
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: active ? textHigh : textMid,
                      fontWeight: active ? 600 : 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {item.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem',
                    color: textLow,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {item.group}
                  </span>
                </div>
              )
            })
          )}
        </div>

        {/* Footer s hotkeys */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '8px 16px',
          borderTop: `1px solid ${borderMid}`,
          background: bg2,
          fontSize: '0.6875rem',
          color: textLow,
        }}>
          <span><strong style={{ color: textMid }}>↑↓</strong> navigace</span>
          <span><strong style={{ color: textMid }}>Enter</strong> otevřít</span>
          <span style={{ marginLeft: 'auto', color: goldDim }}>{results.length} výsledků</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
