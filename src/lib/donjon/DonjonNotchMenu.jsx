/* ── DonjonNotchMenu (donjon-fall-ui) ───────────────────────────────────
   Game-themed variant of TkajUI NotchMenu — same compound API, donjon
   palette (warm gold + dark warm bg) and a deeper notch slope to fit the
   medieval/heraldic aesthetic.
   ─────────────────────────────────────────────────────────────────────── */
import { Children, createContext, isValidElement, useContext } from 'react'
import {
  bg2, bg3, bg4, bgDeep,
  gold, goldDim,
  borderMid,
  textHigh, textMid,
  animFast,
} from './tokens'

const DonjonNotchMenuContext = createContext(null)

function useDonjonNotchMenu() {
  const ctx = useContext(DonjonNotchMenuContext)
  if (!ctx) {
    throw new Error('DonjonNotchMenu.Item / DonjonNotchMenu.Body must be used inside a <DonjonNotchMenu> parent.')
  }
  return ctx
}

/* ── Geometry — sharper V-notches for the donjon look ────────────────── */
const SLOPE_PX = 14         // wider slope = sharper V-notch
const ITEM_HEIGHT = 40
const ITEM_PADDING_X = 20

// Trapezoid with notched bottom corners too — gives a more octagonal,
// game-banner silhouette. SLOPE_PX inset on top sides; bottom stays full.
const ITEM_CLIP = `polygon(${SLOPE_PX}px 0, calc(100% - ${SLOPE_PX}px) 0, 100% 100%, 0 100%)`

/* ── Item ─────────────────────────────────────────────────────────────── */
function Item({
  value,
  onClick,
  icon,
  disabled = false,
  children,
  className,
  style,
  'aria-label': ariaLabel,
  ...rest
}) {
  const ctx = useDonjonNotchMenu()
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

  // Color resolution — donjon palette
  const fillBg = isActive ? bg4 : isAction ? bg2 : bg3
  const borderColor = isActive ? gold : goldDim
  const fg = isActive ? gold : disabled ? textMid : textHigh

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
        height: ITEM_HEIGHT,
        minWidth: ITEM_HEIGHT,
        padding: `0 ${ITEM_PADDING_X}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        font: 'inherit',
        fontSize: '0.8125rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: fg,
        clipPath: ITEM_CLIP,
        background: fillBg,
        border: 'none',
        boxShadow: `inset 0 1px 0 ${borderColor}, inset 1px 0 0 ${borderColor}, inset -1px 0 0 ${borderColor}, ${isActive ? `0 0 12px ${gold}33` : 'none'}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: `background ${animFast}ms, color ${animFast}ms`,
        marginRight: -SLOPE_PX,
        flexShrink: 0,
        userSelect: 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isActive) e.currentTarget.style.background = bg4
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isActive) e.currentTarget.style.background = fillBg
      }}
      {...rest}
    >
      {icon && (
        <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, color: isActive ? gold : goldDim }}>
          {icon}
        </span>
      )}
      {children && <span>{children}</span>}
    </button>
  )
}

/* ── Body ─────────────────────────────────────────────────────────────── */
function Body({ children, className, style }) {
  useDonjonNotchMenu()
  return (
    <div
      className={className}
      style={{
        background: bgDeep,
        border: `1px solid ${goldDim}`,
        borderTop: `1px solid ${borderMid}`,
        padding: 18,
        color: textHigh,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Root ─────────────────────────────────────────────────────────────── */
/**
 * DonjonNotchMenu — game variant of NotchMenu. Warm gold palette,
 * uppercase item labels, gold border on the active tab.
 *
 * @param {string|null} [value] - Active tab value (controlled mode).
 * @param {(value: string) => void} [onChange] - Tab-change callback.
 * @param {ReactNode} children - Mix of DonjonNotchMenu.Item and DonjonNotchMenu.Body.
 *
 * @example
 * <DonjonNotchMenu value={tab} onChange={setTab}>
 *   <DonjonNotchMenu.Item value="quest">Quest</DonjonNotchMenu.Item>
 *   <DonjonNotchMenu.Item value="inv">Inventory</DonjonNotchMenu.Item>
 *   <DonjonNotchMenu.Item onClick={onClose} aria-label="Close">✕</DonjonNotchMenu.Item>
 *   <DonjonNotchMenu.Body>{tab === 'quest' ? <Quest /> : <Inv />}</DonjonNotchMenu.Body>
 * </DonjonNotchMenu>
 */
export default function DonjonNotchMenu({ value = null, onChange, children, className, style }) {
  const items = []
  let body = null
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === Item) items.push(child)
    else if (child.type === Body) body = child
  })

  const ctx = { value, onChange }

  return (
    <DonjonNotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'flex', flexDirection: 'column', ...style }}
      >
        <div
          role="tablist"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            paddingRight: SLOPE_PX,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {items}
        </div>
        {body}
      </div>
    </DonjonNotchMenuContext.Provider>
  )
}

DonjonNotchMenu.Item = Item
DonjonNotchMenu.Body = Body
