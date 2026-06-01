/* ── NotchMenu (tkajui) ─────────────────────────────────────────────────
   ButtonGroup-shaped row of items, but with CHEVRON tips on the outermost
   ends (instead of ButtonGroup's octagon corners). The first item owns the
   left chevron tip (its background fills the tip area when active); the
   last item owns the right chevron tip the same way. Middle items are
   plain rectangles, dividers between items.

   Compound API:
     <NotchMenu value={tab} onChange={setTab}>
       <NotchMenu.Item value="info">Info</NotchMenu.Item>      // tab
       <NotchMenu.Item value="stats" icon={<Icon />}>Stats</NotchMenu.Item>
       <NotchMenu.Item onClick={close} aria-label="Close">✕</NotchMenu.Item> // action
       <NotchMenu.Body>...</NotchMenu.Body>
     </NotchMenu>
   ─────────────────────────────────────────────────────────────────────── */
import { Children, cloneElement, createContext, Fragment, isValidElement, useContext } from 'react'
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

/* ── Sizes — mirror ButtonGroup exactly ──────────────────────────────── */
const SIZE_MAP = {
  xs: { h: 32, px: 10, fontSize: '0.6875rem', iconSize: 12 },
  sm: { h: 40, px: 14, fontSize: '0.75rem',   iconSize: 14 },
  md: { h: 52, px: 18, fontSize: '0.8125rem', iconSize: 18 },
  lg: { h: 64, px: 22, fontSize: '0.875rem',  iconSize: 22 },
}

const BORDER_W = 1

/** Chevron tip width as a function of banner height — 0.5 ≈ 45° point. */
function chevronWidth(h) {
  return Math.round(h * 0.5)
}

/** Full banner silhouette (◁…▷) — chevron tips on both ends.
 *  Used on the outer border-trick wrapper + inner bg layer. */
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

/** Single-item clip-path with a chevron tip on the LEFT side only. */
function leftChevronClip(chevW) {
  return `polygon(
    0 50%,
    ${chevW}px 0,
    100% 0,
    100% 100%,
    ${chevW}px 100%
  )`
}

/** Single-item clip-path with a chevron tip on the RIGHT side only. */
function rightChevronClip(chevW) {
  return `polygon(
    0 0,
    calc(100% - ${chevW}px) 0,
    100% 50%,
    calc(100% - ${chevW}px) 100%,
    0 100%
  )`
}

const ITEM_TW_CLASSES = "hover:brightness-110 active:brightness-90 focus:outline-hidden focus-visible:drop-shadow-[0_0_8px_#6576ffAA]"

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
  // Injected by NotchMenu parent via cloneElement:
  _position,
  ...rest
}) {
  const ctx = useNotchMenu()
  const isTab = value !== undefined
  const isActive = isTab && ctx.value === value
  const s = SIZE_MAP[ctx.size] ?? SIZE_MAP.md
  const chevW = chevronWidth(s.h)

  const isFirst = _position === 'first' || _position === 'only'
  const isLast  = _position === 'last'  || _position === 'only'
  const isOnly  = _position === 'only'

  // Clip-path: outermost items carry the chevron tip on their outer side.
  const clipPath = isOnly  ? bannerClip(chevW)
                 : isFirst ? leftChevronClip(chevW)
                 : isLast  ? rightChevronClip(chevW)
                 : undefined

  // Extra horizontal padding so content stays clear of the chevron tip area.
  const extraPadL = isFirst ? chevW : 0
  const extraPadR = isLast  ? chevW : 0

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
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={[ITEM_TW_CLASSES, className].filter(Boolean).join(' ')}
      style={{
        position: 'relative',
        height: s.h,
        paddingLeft: s.px + extraPadL,
        paddingRight: s.px + extraPadR,
        clipPath,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
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
        <span style={{
          width: s.iconSize, height: s.iconSize,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          color: isActive ? accent : textMid,
          position: 'relative',
        }}>
          {icon}
        </span>
      )}
      {children && (
        <span style={{
          fontWeight: isActive ? 600 : 400,
          letterSpacing: '0.04em',
          lineHeight: 1,
          fontSize: s.fontSize,
          color: isActive ? textHigh : textMid,
          transition: 'color 150ms',
        }}>
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
 * NotchMenu — ButtonGroup-styled items where the outermost items have
 * chevron-pointed outer ends (◁ first … last ▷). The first/last items'
 * active backgrounds fill all the way into their chevron tips, just like
 * ButtonGroup's octagon corners.
 *
 * @param {string|null} [value]
 * @param {(value: string) => void} [onChange]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [dividers=true]
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

  const items = []
  let body = null
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === Item) items.push(child)
    else if (child.type === Body) body = child
  })

  // Inject _position into each item so it can pick the correct clip + padding.
  const last = items.length - 1
  const positionedItems = items.map((it, i) => {
    const position = items.length === 1 ? 'only'
                   : i === 0  ? 'first'
                   : i === last ? 'last'
                   : 'middle'
    return cloneElement(it, { _position: position, key: it.props.value ?? `action-${i}` })
  })

  const ctx = { value, onChange, size }

  return (
    <NotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        {/* Border-trick: outer = border color, padded 1px, with chevron clip.
            Inner = same chevron clip + items in a flex row (no horizontal
            padding — items extend to the chevron edges and their backgrounds
            fill the tips). */}
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
              display: 'inline-flex',
              alignItems: 'stretch',
            }}
          >
            {positionedItems.map((it, idx) => (
              <Fragment key={it.key ?? `frag-${idx}`}>
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
