/* ── NotchMenu (tkajui) ─────────────────────────────────────────────────
   Panel with a row of notched cutouts along its top edge. Each cutout
   houses a clickable item — either a tab (with `value`, controlled via
   parent's value/onChange) or a standalone action (with `onClick`).

   Compound API:
     <NotchMenu value={tab} onChange={setTab}>
       <NotchMenu.Item value="info">Info</NotchMenu.Item>      // tab
       <NotchMenu.Item value="stats" icon={<Icon />}>Stats</NotchMenu.Item>
       <NotchMenu.Item onClick={close} aria-label="Close">✕</NotchMenu.Item> // action
       <NotchMenu.Body>...content of the active tab...</NotchMenu.Body>
     </NotchMenu>

   Visual:
     /‾‾‾‾\  /‾‾‾‾\  /‾‾\         ← items (trapezoid tabs)
    /  Info \/Stats \/ ✕ \
   |————————————————————————|    ← body panel (rectangle / shaped)
   |   <NotchMenu.Body>      |
   |————————————————————————|
   ─────────────────────────────────────────────────────────────────────── */
import { Children, createContext, isValidElement, useContext } from 'react'
import {
  surface2, surface3, surface4,
  borderDefault, borderMid,
  textHigh, textMid,
  accentBorder,
  animFast,
} from './tokens'

const NotchMenuContext = createContext(null)

function useNotchMenu() {
  const ctx = useContext(NotchMenuContext)
  if (!ctx) {
    throw new Error('NotchMenu.Item / NotchMenu.Body must be used inside a <NotchMenu> parent.')
  }
  return ctx
}

/* ── Geometry ──────────────────────────────────────────────────────────
   Each item is a trapezoid (narrower top, wider bottom). Adjacent items
   touch at the bottom; the slanted sides create a V-notch between them.

   slope = horizontal distance the top edge is inset from the bottom edge
   on each side. Bigger slope = sharper V between items. */
const SLOPE_PX = 10
const ITEM_HEIGHT = 38
const ITEM_PADDING_X = 18

// Trapezoid: top narrower, bottom wider. SLOPE_PX of inset on each top side.
const ITEM_CLIP = `polygon(${SLOPE_PX}px 0, calc(100% - ${SLOPE_PX}px) 0, 100% 100%, 0 100%)`

/* ── Item ─────────────────────────────────────────────────────────────── */
function Item({
  value,
  onClick,
  icon,
  disabled = false,
  children,
  className,
  style: _style,
  'aria-label': ariaLabel,
  ...rest
}) {
  const ctx = useNotchMenu()
  const isTab = value !== undefined
  const isActive = isTab && ctx.value === value
  const isAction = !isTab

  const handleClick = (e) => {
    if (disabled) return
    if (isTab) {
      ctx.onChange?.(value)
    } else {
      onClick?.(e)
    }
  }

  // Color resolution
  const bg = isActive ? surface4 : isAction ? surface2 : surface3
  const border = isActive ? accentBorder : borderDefault
  const fg = isActive ? textHigh : disabled ? textMid : textHigh

  return (
    <button
      type="button"
      role={isTab ? 'tab' : undefined}
      aria-selected={isTab ? isActive : undefined}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={className}
      style={{
        // Layout
        height: ITEM_HEIGHT,
        minWidth: ITEM_HEIGHT,
        padding: `0 ${ITEM_PADDING_X}px`,
        // Trapezoid silhouette via clip-path on a wrapper (the button itself
        // can't have both clip-path AND a clean inner border, so we use the
        // outer-bg-as-border trick: paint border color via outer wrapper,
        // fill color via inner content).
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        font: 'inherit',
        fontSize: '0.8125rem',
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: fg,
        // Border trick: outer wrapper is border-colored, inner pseudo via
        // box-shadow inset. Simpler: 2-layer divs would be cleaner. For v1
        // we use a single button with clip-path + plain background; the
        // "border" is achieved by a slightly darker outer ring through
        // a 2nd box-shadow. Acceptable for now.
        clipPath: ITEM_CLIP,
        background: bg,
        border: 'none',
        boxShadow: `inset 0 1px 0 ${border}, inset 1px 0 0 ${border}, inset -1px 0 0 ${border}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: `background ${animFast}ms, color ${animFast}ms`,
        // Negative right-margin so the trapezoid bottoms touch (sloped sides
        // create the V between items).
        marginRight: -SLOPE_PX,
        flexShrink: 0,
        // userSelect off for cleaner click behavior
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isActive) e.currentTarget.style.background = surface4
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isActive) e.currentTarget.style.background = bg
      }}
      {...rest}
    >
      {icon && (
        <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {children && <span>{children}</span>}
    </button>
  )
}

/* ── Body ─────────────────────────────────────────────────────────────── */
function Body({ children, className, style }) {
  useNotchMenu() // throw if outside <NotchMenu>
  return (
    <div
      className={className}
      style={{
        background: surface2,
        border: `1px solid ${borderDefault}`,
        borderTop: `1px solid ${borderMid}`,
        padding: 16,
        color: textHigh,
        // Visually merges with the items above (no top corner radius — items
        // sit flat on the top edge).
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Root ─────────────────────────────────────────────────────────────── */
/**
 * NotchMenu — panel with notched cutouts along the top edge.
 * Each cutout holds an Item (tab or action). The Body holds tab content.
 *
 * @param {string|null} [value] - Active tab value (for controlled tab mode).
 * @param {(value: string) => void} [onChange] - Tab-change callback.
 * @param {ReactNode} children - Mix of NotchMenu.Item and NotchMenu.Body.
 *
 * @example
 * <NotchMenu value={tab} onChange={setTab}>
 *   <NotchMenu.Item value="info">Info</NotchMenu.Item>
 *   <NotchMenu.Item value="stats">Stats</NotchMenu.Item>
 *   <NotchMenu.Item onClick={onClose} aria-label="Close">✕</NotchMenu.Item>
 *   <NotchMenu.Body>{tab === 'info' ? <Info /> : <Stats />}</NotchMenu.Body>
 * </NotchMenu>
 */
export default function NotchMenu({ value = null, onChange, children, className, style }) {
  // Split children into items vs body so we can render the row + panel layout.
  const items = []
  let body = null
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === Item) items.push(child)
    else if (child.type === Body) body = child
  })

  const ctx = { value, onChange }

  return (
    <NotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'flex', flexDirection: 'column', ...style }}
      >
        {/* Items row — flat-aligned with the body below */}
        <div
          role="tablist"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            // Items use negative right-margin to create V-notches; we add
            // the slope back here so the rightmost item ends flush.
            paddingRight: SLOPE_PX,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {items}
        </div>
        {body}
      </div>
    </NotchMenuContext.Provider>
  )
}

NotchMenu.Item = Item
NotchMenu.Body = Body
