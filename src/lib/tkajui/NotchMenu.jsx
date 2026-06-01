/* ── NotchMenu (tkajui) ─────────────────────────────────────────────────
   Banner-shaped menu sitting on top of a content panel. The banner has
   chevron-pointed ends on both sides (◁ … ▷). Inside the flat middle
   are rectangular item slots separated by thin vertical dividers — each
   slot holds a tab or an action.

   Compound API:
     <NotchMenu value={tab} onChange={setTab}>
       <NotchMenu.Item value="info">Info</NotchMenu.Item>      // tab
       <NotchMenu.Item value="stats" icon={<Icon />}>Stats</NotchMenu.Item>
       <NotchMenu.Item onClick={close} aria-label="Close">✕</NotchMenu.Item> // action
       <NotchMenu.Body>...content of the active tab...</NotchMenu.Body>
     </NotchMenu>

   Silhouette:

       ◁ [Info | Stats | Log | ✕] ▷         ← banner with chevron ends
      ╔═════════════════════════════╗
      ║   <NotchMenu.Body>           ║       ← body panel below banner
      ╚═════════════════════════════╝
   ─────────────────────────────────────────────────────────────────────── */
import { Children, createContext, Fragment, isValidElement, useContext } from 'react'
import {
  surface2, surface3, surface4,
  borderDefault, borderMid,
  textHigh, textMid,
  accent,
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
   Banner is a horizontal hex polygon: chevron tip → flat middle → chevron tip.
   CHEVRON_W = horizontal length of each pointed tip in px. */
const CHEVRON_W   = 22
const BANNER_H    = 40
const BORDER_W    = 1
const ITEM_PAD_X  = 16

/** Chevron hex (◁=====▷) — outer banner silhouette. */
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
  const ctx = useNotchMenu()
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

  const bg = isActive ? surface4 : 'transparent'
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
        height: '100%',
        minWidth: BANNER_H,  // square min for icon-only items
        padding: `0 ${ITEM_PAD_X}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        font: 'inherit',
        fontSize: '0.8125rem',
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: fg,
        background: bg,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: `background ${animFast}ms, color ${animFast}ms`,
        // Active tab gets a top accent line (underline-tab style)
        boxShadow: isActive ? `inset 0 2px 0 ${accent}` : 'none',
        flexShrink: 0,
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
  useNotchMenu()
  return (
    <div
      className={className}
      style={{
        background: surface2,
        border: `${BORDER_W}px solid ${borderDefault}`,
        padding: 16,
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
 * NotchMenu — banner with chevron-pointed ends sitting on top of a body
 * panel. Items live inside the banner's flat middle; the Body panel below
 * holds the active tab's content.
 *
 * @param {string|null} [value] - Active tab value (controlled mode).
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
  // Split children: items live in the banner; one Body sits below.
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
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        {/* Banner — chevron-ended strip containing the items */}
        <div
          style={{
            // Outer wrapper acts as the border layer (border-trick).
            background: borderDefault,
            clipPath: BANNER_CLIP,
            padding: BORDER_W,
            height: BANNER_H,
            // Push banner down slightly so it visually sinks into the body's top edge.
            marginBottom: -BORDER_W,
            zIndex: 1,
            // Banner width adapts to content; tips overhang.
          }}
        >
          {/* Inner — same clip-path with banner background. Items are flex children. */}
          <div
            role="tablist"
            style={{
              height: '100%',
              clipPath: BANNER_CLIP,
              background: surface3,
              display: 'inline-flex',
              alignItems: 'stretch',
              // Reserve room for the chevron tips so items stay in the flat middle.
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
                      background: borderMid,
                      flexShrink: 0,
                    }}
                  />
                )}
                {it}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Body panel below the banner */}
        {body && <div style={{ alignSelf: 'stretch' }}>{body}</div>}
      </div>
    </NotchMenuContext.Provider>
  )
}

NotchMenu.Item = Item
NotchMenu.Body = Body
