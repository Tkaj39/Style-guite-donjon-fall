/* ── DonjonNotchMenu (donjon-fall-ui) ───────────────────────────────────
   Game-themed variant of TkajUI NotchMenu — banner with chevron ends
   (◁…▷) sitting on top of a parchment-colored panel. Warm gold palette
   replaces the cool tkajui surfaces. Same compound API.

   <DonjonNotchMenu value={tab} onChange={setTab}>
     <DonjonNotchMenu.Item value="quest">Quest</DonjonNotchMenu.Item>
     <DonjonNotchMenu.Item value="inventory">Inventář</DonjonNotchMenu.Item>
     <DonjonNotchMenu.Item onClick={close} aria-label="Close">✕</DonjonNotchMenu.Item>
     <DonjonNotchMenu.Body>...</DonjonNotchMenu.Body>
   </DonjonNotchMenu>
   ─────────────────────────────────────────────────────────────────────── */
import { Children, createContext, Fragment, isValidElement, useContext } from 'react'
import {
  bg3, bg4, bgDeep,
  gold, goldDim, goldMid,
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

/* ── Geometry — wider chevron tips for a more dramatic banner ─────────── */
const CHEVRON_W  = 28
const BANNER_H   = 42
const BORDER_W   = 1
const ITEM_PAD_X = 18

const BANNER_CLIP = `polygon(
  0 50%,
  ${CHEVRON_W}px 0,
  calc(100% - ${CHEVRON_W}px) 0,
  100% 50%,
  calc(100% - ${CHEVRON_W}px) 100%,
  ${CHEVRON_W}px 100%
)`

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
  const ctx = useDonjonNotchMenu()
  const isTab = value !== undefined
  const isActive = isTab && ctx.value === value

  const handleClick = (e) => {
    if (disabled) return
    if (isTab) {
      ctx.onChange?.(value)
    } else {
      onClick?.(e)
    }
  }

  const bg = isActive ? bg4 : 'transparent'
  const fg = isActive ? gold : disabled ? textMid : goldMid

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
        height: '100%',
        minWidth: BANNER_H,
        padding: `0 ${ITEM_PAD_X}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        font: 'inherit',
        fontSize: '0.8125rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: fg,
        background: bg,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: `background ${animFast}ms, color ${animFast}ms`,
        // Active tab gets a gold accent line at the top and a soft glow
        boxShadow: isActive ? `inset 0 2px 0 ${gold}, 0 0 14px ${gold}22` : 'none',
        flexShrink: 0,
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isActive) e.currentTarget.style.background = bg4
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isActive) e.currentTarget.style.background = bg
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
        border: `${BORDER_W}px solid ${goldDim}`,
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
 * DonjonNotchMenu — game variant of NotchMenu. Gold-bordered banner with
 * chevron ends, uppercase item labels, gold accent on the active tab.
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
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        {/* Banner — gold-bordered chevron strip containing the items */}
        <div
          style={{
            background: goldDim,
            clipPath: BANNER_CLIP,
            padding: BORDER_W,
            height: BANNER_H,
            marginBottom: -BORDER_W,
            zIndex: 1,
            // Subtle gold glow so the banner reads as a foreground element
            filter: `drop-shadow(0 0 6px ${gold}22)`,
          }}
        >
          <div
            role="tablist"
            style={{
              height: '100%',
              clipPath: BANNER_CLIP,
              background: bg3,
              display: 'inline-flex',
              alignItems: 'stretch',
              paddingLeft: CHEVRON_W,
              paddingRight: CHEVRON_W,
            }}
          >
            {items.map((it, idx) => (
              <Fragment key={it.props.value ?? `action-${idx}`}>
                {idx > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: BORDER_W,
                      alignSelf: 'stretch',
                      background: goldDim,
                      flexShrink: 0,
                    }}
                  />
                )}
                {it}
              </Fragment>
            ))}
          </div>
        </div>

        {body && <div style={{ alignSelf: 'stretch' }}>{body}</div>}
      </div>
    </DonjonNotchMenuContext.Provider>
  )
}

DonjonNotchMenu.Item = Item
DonjonNotchMenu.Body = Body
