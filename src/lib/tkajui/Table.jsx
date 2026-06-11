/* ── Table (tkajui) ──────────────────────────────────────────────────
   Tabular data with optional column sort. Pass a `columns` schema
   describing each column (key, label, render, sortable, align), plus
   a `data` array of rows.

   Sort is controlled internally (uncontrolled). For server-side sort
   pass `sortBy` + `onSortChange`.
   ─────────────────────────────────────────────────────────────────── */
import { useMemo, useState } from 'react'
import { octagon, octagonInner } from '../shared/octagon'
import { surface2, surface3, surface4, borderDefault, textHigh, textMid, textLow } from './tokens'

const SHELL_CX = 8

const SIZE_PADDING = {
  sm: '6px 10px',
  md: '10px 14px',
  lg: '14px 18px',
}

/**
 * @typedef {object} TableColumn
 * @prop {string} key             Property in each row to read.
 * @prop {React.ReactNode} label  Header text.
 * @prop {(value: any, row: object) => React.ReactNode} [render]  Cell renderer.
 * @prop {boolean} [sortable=false]
 * @prop {'left'|'right'|'center'} [align='left']
 * @prop {string|number} [width]  CSS width (e.g. '20%', 120).
 */

/**
 * @param {TableColumn[]} columns
 * @param {object[]} data
 * @param {string} [rowKey='id']        Property used as React key for rows.
 * @param {'sm'|'md'|'lg'} [size='md']  Cell padding scale.
 * @param {boolean} [striped=false]
 * @param {boolean} [hoverable=true]
 * @param {boolean} [bordered=true]
 * @param {{ key: string, dir: 'asc'|'desc' } | null} [sortBy]
 *                                       Controlled sort state.
 * @param {(next: { key, dir } | null) => void} [onSortChange]
 * @param {React.ReactNode} [empty='No data']
 * @param {(row, index) => void} [onRowClick]
 */
export default function Table({
  columns = [],
  data = [],
  rowKey = 'id',
  size = 'md',
  striped = false,
  hoverable = true,
  bordered = true,
  sortBy: sortByProp,
  onSortChange,
  empty = 'No data',
  onRowClick,
  className,
  style,
  ...rest
}) {
  const [internalSort, setInternalSort] = useState(null)
  const sortBy = sortByProp !== undefined ? sortByProp : internalSort
  const setSort = (next) => {
    if (sortByProp === undefined) setInternalSort(next)
    onSortChange?.(next)
  }

  const sorted = useMemo(() => {
    if (!sortBy) return data
    const col = columns.find(c => c.key === sortBy.key)
    if (!col) return data
    const mul = sortBy.dir === 'asc' ? 1 : -1
    return [...data].sort((a, b) => {
      const av = a[sortBy.key], bv = b[sortBy.key]
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * mul
      return String(av).localeCompare(String(bv)) * mul
    })
  }, [data, columns, sortBy])

  const toggleSort = (key) => {
    if (sortBy?.key !== key) setSort({ key, dir: 'asc' })
    else if (sortBy.dir === 'asc') setSort({ key, dir: 'desc' })
    else setSort(null)
  }

  const padding = SIZE_PADDING[size] ?? SIZE_PADDING.md
  const borderStyle = bordered ? `1px solid ${borderDefault}` : 'none'

  const tableEl = (
    <div
      className={bordered ? undefined : className}
      style={{
        width: '100%',
        overflowX: 'auto',
        background: surface2,
        ...(bordered ? { clipPath: octagonInner(SHELL_CX) } : {}),
        ...(bordered ? {} : style),
      }}
      {...(bordered ? {} : rest)}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: surface3, color: textMid, textAlign: 'left' }}>
            {columns.map(col => {
              const isSorted = sortBy?.key === col.key
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={isSorted ? (sortBy.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  style={{
                    padding,
                    textAlign: col.align ?? 'left',
                    width: col.width,
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    borderBottom: borderStyle,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {col.label}
                    {col.sortable && (
                      <span aria-hidden="true" style={{ fontSize: '0.7rem', color: isSorted ? textHigh : textLow }}>
                        {isSorted ? (sortBy.dir === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '24px', textAlign: 'center', color: textLow }}>
                {empty}
              </td>
            </tr>
          ) : sorted.map((row, i) => (
            <tr
              key={row[rowKey] ?? i}
              onClick={onRowClick ? () => onRowClick(row, i) : undefined}
              style={{
                background: striped && i % 2 === 1 ? surface3 : 'transparent',
                color: textHigh,
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 80ms',
              }}
              onMouseEnter={hoverable ? (e) => { e.currentTarget.style.background = surface4 } : undefined}
              onMouseLeave={hoverable ? (e) => {
                e.currentTarget.style.background = striped && i % 2 === 1 ? surface3 : 'transparent'
              } : undefined}
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  style={{
                    padding,
                    textAlign: col.align ?? 'left',
                    borderTop: i > 0 ? borderStyle : 'none',
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  if (!bordered) return tableEl

  // Octagon shell via border-trick — matches Button / Card / List corners.
  return (
    <div
      className={className}
      style={{
        background: borderDefault,
        clipPath: octagon(SHELL_CX),
        padding: 1,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {tableEl}
    </div>
  )
}
