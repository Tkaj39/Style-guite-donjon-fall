/* ── DonjonTable (donjon-fall-ui) ────────────────────────────────────
   Game variant of Table. Same columns / data / sort / row-click API
   as TkajUI Table — visuals shift to the donjon palette:
     • octagonal gold shell when bordered (border-trick)
     • bgDeep header strip with gold uppercase column labels
     • gold-tinted sort arrow on the active column
     • goldDim row dividers
     • optional bgDeep striped rows
     • bg3 hover row highlight
   Sort behavior, aria-sort, controlled / uncontrolled paths are
   unchanged.
   ─────────────────────────────────────────────────────────────────── */
import { useMemo, useState } from 'react'
import { octagon } from '../shared/octagon'
import { bg2, bg3, bgDeep, gold, goldDim, goldMid, textHigh, textLow } from './tokens'

const SHELL_CX = 10

const SIZE_PADDING = {
  sm: '6px 10px',
  md: '10px 14px',
  lg: '14px 18px',
}

/**
 * @typedef {object} TableColumn
 * @prop {string} key
 * @prop {React.ReactNode} label
 * @prop {(value: any, row: object) => React.ReactNode} [render]
 * @prop {boolean} [sortable=false]
 * @prop {'left'|'right'|'center'} [align='left']
 * @prop {string|number} [width]
 */

/**
 * @param {TableColumn[]} columns
 * @param {object[]} data
 * @param {string} [rowKey='id']
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [striped=false]
 * @param {boolean} [hoverable=true]
 * @param {boolean} [bordered=true]
 * @param {{ key: string, dir: 'asc'|'desc' } | null} [sortBy]
 * @param {(next: { key, dir } | null) => void} [onSortChange]
 * @param {React.ReactNode} [empty='No data']
 * @param {(row, index) => void} [onRowClick]
 */
export default function DonjonTable({
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
  const rowBorder = `1px solid ${goldDim}55`

  const tableEl = (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      background: bg2,
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{
            background: bgDeep,
            color: goldMid,
            textAlign: 'left',
          }}>
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
                    borderBottom: `1px solid ${goldDim}`,
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    color: isSorted ? gold : goldMid,
                    transition: 'color 80ms',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {col.label}
                    {col.sortable && (
                      <span aria-hidden="true" style={{
                        fontSize: '0.7rem',
                        color: isSorted ? gold : textLow,
                      }}>
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
                background: striped && i % 2 === 1 ? bgDeep : 'transparent',
                color: textHigh,
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 80ms',
              }}
              onMouseEnter={hoverable ? (e) => { e.currentTarget.style.background = bg3 } : undefined}
              onMouseLeave={hoverable ? (e) => {
                e.currentTarget.style.background = striped && i % 2 === 1 ? bgDeep : 'transparent'
              } : undefined}
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  style={{
                    padding,
                    textAlign: col.align ?? 'left',
                    borderTop: i > 0 ? rowBorder : 'none',
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

  if (!bordered) {
    return (
      <div className={className} style={style} {...rest}>
        {tableEl}
      </div>
    )
  }

  // Octagon shell via border-trick. overflowX on the inner el handles
  // wide tables — the outer clip just paints the gold edge.
  return (
    <div
      className={className}
      style={{
        background: gold,
        clipPath: octagon(SHELL_CX),
        padding: 1,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div style={{ background: bg2, clipPath: octagon(SHELL_CX) }}>
        {tableEl}
      </div>
    </div>
  )
}
