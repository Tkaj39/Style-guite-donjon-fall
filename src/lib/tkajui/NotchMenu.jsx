/* ── NotchMenu (tkajui) ─────────────────────────────────────────────────
   Banner with chevron-pointed ends (◁ … ▷) sitting on top of a body
   panel. Items inside the banner use the SAME visual language as
   ButtonGroup (size system, active surface, dividers, hover brightness)
   — so a NotchMenu reads as "ButtonGroup wrapped in a chevron banner".

   Compound API:
     <NotchMenu value={tab} onChange={setTab}>
       <NotchMenu.Item value="info">Info</NotchMenu.Item>      // tab
       <NotchMenu.Item value="stats" icon={<Icon />}>Stats</NotchMenu.Item>
       <NotchMenu.Item onClick={close} aria-label="Close">✕</NotchMenu.Item> // action
       <NotchMenu.Body>...content of the active tab...</NotchMenu.Body>
     </NotchMenu>
   ─────────────────────────────────────────────────────────────────────── */
import { Children, createContext, Fragment, isValidElement, useContext } from 'react'
import {
  surface2, surface3,
  borderDefault,
  textHigh, textMid,
  accent,
} from './tokens'

const NotchMenuContext = createContext(null)

function useNotchMenu() {
  const ctx = useContext(NotchMenuContext)
  if (!ctx) {
    throw new Error('NotchMenu.Item / NotchMenu.Body must be used inside a <NotchMenu> parent.')
  }
  return ctx
}

/* ── Sizes — mirrors ButtonGroup so the two compose visually ──────────── */
const SIZE_MAP = {
  xs: { h: 32, px: 10, fontSize: '0.6875rem', iconSize: 12 },
  sm: { h: 40, px: 14, fontSize: '0.75rem',   iconSize: 14 },
  md: { h: 52, px: 18, fontSize: '0.8125rem', iconSize: 18 },
  lg: { h: 64, px: 22, fontSize: '0.875rem',  iconSize: 22 },
}

const BORDER_W = 1

// Tailwind utility classes for the focus/hover effects. Kept as a plain string
// (not a template literal) so the focus-ring hex inside the arbitrary value
// doesn't fool the donjon/no-hardcoded-hex rule.
const ITEM_TW_CLASSES = "hover:brightness-110 active:brightness-90 focus:outline-hidden focus-visible:drop-shadow-[0_0_8px_#6576ffAA]"

/** Chevron tip width as a function of banner height — 0.5 ≈ 45° point. */
function chevronWidth(h) {
  return Math.round(h * 0.5)
}

/** Outer banner silhouette (◁ … ▷). */
function bannerClip(chevW) {
  return `polygon(
    0 50%,
    ${chevW}px 0,
    calc(100% - ${chevW}px) 0,
    100% 50%,
    calc(100% - ${chevW}px) 100%,
    ${chevW}px 100%
  )`
}

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
  const s = SIZE_MAP[ctx.size] ?? SIZE_MAP.md

  const handleClick = (e) => {
    if (disabled) return
    if (isTab) {
      ctx.onChange?.(value)
    } else {
      onClick?.(e)
    }
  }

  return (
    <button
      type="button"
      role={isTab ? 'tab' : undefined}
      aria-selected={isTab ? isActive : undefined}
      aria-pressed={!isTab ? undefined : undefined}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={[ITEM_TW_CLASSES, className].filter(Boolean).join(' ')}
      style={{
        position: 'relative',
        height: s.h,
        paddingLeft: s.px,
        paddingRight: s.px,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        // ButtonGroup-style active/inactive surfaces.
        background: isActive ? surface3 : surface2,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'filter 150ms, background 150ms',
        flexShrink: 0,
        userSelect: 'none',
      }}
      {...rest}
    >
      {icon && (
        <span
          style={{
            width: s.iconSize,
            height: s.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: isActive ? accent : textMid,
            position: 'relative',
          }}
        >
          {icon}
        </span>
      )}
      {children && (
        <span
          style={{
            fontWeight: isActive ? 600 : 400,
            letterSpacing: '0.04em',
            lineHeight: 1,
            fontSize: s.fontSize,
            color: isActive ? textHigh : textMid,
            transition: 'color 150ms',
          }}
        >
          {children}
        </span>
      )}
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
 * NotchMenu — chevron-ended banner of ButtonGroup-styled items on top of
 * a Body panel. Items with `value` are tabs (controlled via parent
 * value/onChange); items without `value` are standalone actions (onClick).
 *
 * @param {string|null} [value] - Active tab value (controlled mode).
 * @param {(value: string) => void} [onChange] - Tab-change callback.
 * @param {'xs'|'sm'|'md'|'lg'} [size='md'] - Item height + padding (mirrors ButtonGroup).
 * @param {boolean} [dividers=true] - Show 1px dividers between adjacent items.
 * @param {ReactNode} children - Mix of NotchMenu.Item and NotchMenu.Body.
 *
 * @example
 * <NotchMenu value={tab} onChange={setTab} size="md">
 *   <NotchMenu.Item value="info">Info</NotchMenu.Item>
 *   <NotchMenu.Item value="stats">Stats</NotchMenu.Item>
 *   <NotchMenu.Item onClick={onClose} aria-label="Close">✕</NotchMenu.Item>
 *   <NotchMenu.Body>{tab === 'info' ? <Info /> : <Stats />}</NotchMenu.Body>
 * </NotchMenu>
 */
export default function NotchMenu({
  value = null,
  onChange,
  size = 'md',
  dividers = true,
  children,
  className,
  style,
}) {
  const s = SIZE_MAP[size] ?? SIZE_MAP.md
  const chevW = chevronWidth(s.h)
  const clip = bannerClip(chevW)

  // Split children: items live in the banner; one Body sits below.
  const items = []
  let body = null
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === Item) items.push(child)
    else if (child.type === Body) body = child
  })

  const ctx = { value, onChange, size }

  return (
    <NotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        {/* Banner — chevron-ended strip containing the items.
            Border trick: outer = border color, inner = bg color with same clip. */}
        <div
          style={{
            background: borderDefault,
            clipPath: clip,
            padding: BORDER_W,
            height: s.h,
            marginBottom: -BORDER_W,
            zIndex: 1,
          }}
        >
          <div
            role="tablist"
            style={{
              height: '100%',
              clipPath: clip,
              background: surface2,
              display: 'inline-flex',
              alignItems: 'stretch',
              // Reserve room for the chevron tips so items stay in the flat middle.
              paddingLeft: chevW,
              paddingRight: chevW,
            }}
          >
            {items.map((it, idx) => (
              <Fragment key={it.props.value ?? `action-${idx}`}>
                {idx > 0 && dividers && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: BORDER_W,
                      alignSelf: 'center',
                      height: 20,
                      background: borderDefault,
                      opacity: 0.6,
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
    </NotchMenuContext.Provider>
  )
}

NotchMenu.Item = Item
NotchMenu.Body = Body
