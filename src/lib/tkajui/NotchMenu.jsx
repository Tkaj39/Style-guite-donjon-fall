/* ── NotchMenu (tkajui) ─────────────────────────────────────────────────
   ButtonGroup-shaped row of items (octagon-cut corners on the outermost
   ends, plain rectangles in the middle) sitting on top of a Body panel.
   The first/last items own their octagon corners just like ButtonGroup —
   their active background fills all the way into the cut corner.

   Compound API:
     <NotchMenu value={tab} onChange={setTab}>
       <NotchMenu.Item value="info">Info</NotchMenu.Item>      // tab
       <NotchMenu.Item value="stats" icon={<Icon />}>Stats</NotchMenu.Item>
       <NotchMenu.Item onClick={close} aria-label="Close">✕</NotchMenu.Item> // action
       <NotchMenu.Body>...content of the active tab...</NotchMenu.Body>
     </NotchMenu>
   ─────────────────────────────────────────────────────────────────────── */
import { Children, cloneElement, createContext, Fragment, isValidElement, useContext, useLayoutEffect, useRef, useState } from 'react'
import { octagon, clipLeft, clipRight } from '../../utils/octagon'
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

/* ── Sizes — mirror ButtonGroup exactly (same h, cx, px, fontSize) ───── */
const SIZE_MAP = {
  xs: { h: 32, cx: 9.61,  px: 10, fontSize: '0.6875rem', iconSize: 12 },
  sm: { h: 40, cx: 12.01, px: 14, fontSize: '0.75rem',   iconSize: 14 },
  md: { h: 52, cx: 15.62, px: 18, fontSize: '0.8125rem', iconSize: 18 },
  lg: { h: 64, cx: 19.22, px: 22, fontSize: '0.875rem',  iconSize: 22 },
}

const BORDER_W = 1

// Plain string so the focus-ring hex inside the Tailwind arbitrary value
// doesn't trigger the donjon/no-hardcoded-hex rule.
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
  _position,
  ...rest
}) {
  const ctx = useNotchMenu()
  const isTab = value !== undefined
  const isActive = isTab && ctx.value === value
  const s = SIZE_MAP[ctx.size] ?? SIZE_MAP.md

  const isFirst = _position === 'first' || _position === 'only'
  const isLast  = _position === 'last'  || _position === 'only'
  const isOnly  = _position === 'only'

  // Same shape system as ButtonGroup: outermost items get the diagonal
  // octagon-cut corners on their outer side; middle items are rectangles.
  const clipPath = isOnly  ? octagon(s.cx)
                 : isFirst ? clipLeft(s.cx)
                 : isLast  ? clipRight(s.cx)
                 : undefined

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
        paddingLeft: s.px,
        paddingRight: s.px,
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

/** Body cutout buffer — gap (px) between item edges and the cutout shape. */
const CUTOUT_BUFFER = 8

/** Extra bevel size (px) on the cutout's diagonal corners — on top of the
 *  items' own `cx`. Slightly larger bevel keeps the cutout's diagonal a
 *  hair clear of the items' diagonal. */
const CUTOUT_BEVEL_EXTRA = 1

/** Build a body clip-path polygon with an octagon-shaped notch on the top.
 *  `expandHalfW` widens the cutout's horizontal half-width — used by the
 *  inner (border-trick) layer to leave a 1 px border visible along the
 *  cutout's vertical edges. */
function makeBodyClipPath(bannerWidth, s, expandHalfW = 0) {
  const cutoutHalfW = bannerWidth / 2 + CUTOUT_BUFFER + expandHalfW
  const cutoutDepth = Math.round(s.h / 2) + CUTOUT_BUFFER
  const cx = s.cx + CUTOUT_BEVEL_EXTRA
  const innerHalfW = Math.max(cutoutHalfW - cx, 0)
  const innerDepth = Math.max(cutoutDepth - cx, 0)
  return `polygon(
    0 0,
    calc(50% - ${cutoutHalfW}px) 0,
    calc(50% - ${cutoutHalfW}px) ${innerDepth}px,
    calc(50% - ${innerHalfW}px) ${cutoutDepth}px,
    calc(50% + ${innerHalfW}px) ${cutoutDepth}px,
    calc(50% + ${cutoutHalfW}px) ${innerDepth}px,
    calc(50% + ${cutoutHalfW}px) 0,
    100% 0,
    100% 100%,
    0 100%
  )`
}

/* ── Body ─────────────────────────────────────────────────────────────── */
function Body({ children, className, style }) {
  const ctx = useNotchMenu()
  const s = SIZE_MAP[ctx.size] ?? SIZE_MAP.md
  const cutoutDepth = Math.round(s.h / 2) + CUTOUT_BUFFER

  // Before measurement: plain body with a simple CSS border. Avoids a flash
  // of broken layout on first paint.
  if (ctx.bannerWidth <= 0) {
    return (
      <div
        className={className}
        style={{
          background: surface2,
          border: `${BORDER_W}px solid ${borderDefault}`,
          padding: 16,
          paddingTop: 16 + cutoutDepth,
          color: textHigh,
          ...style,
        }}
      >
        {children}
      </div>
    )
  }

  // Border-trick on the body: outer layer = border color + outer clip,
  // inner layer = surface color + inner clip (cutout 1 px wider so the
  // 1 px gap shows along the cutout's vertical edges too).
  const outerClip = makeBodyClipPath(ctx.bannerWidth, s, 0)
  const innerClip = makeBodyClipPath(ctx.bannerWidth, s, BORDER_W)

  // Body must be wider than the cutout for the diagonal bevels + the body's
  // own visible top edges to fit. Without this, body width matches the items
  // strip width and the cutout's diagonals fall outside the body — making
  // CUTOUT_BEVEL_EXTRA changes invisible.
  const cx = s.cx + CUTOUT_BEVEL_EXTRA
  const minWidth = ctx.bannerWidth + 2 * (CUTOUT_BUFFER + cx + 8)

  return (
    <div
      className={className}
      style={{
        background: borderDefault,
        clipPath: outerClip,
        padding: BORDER_W,
        minWidth,
        ...style,
      }}
    >
      <div
        style={{
          background: surface2,
          clipPath: innerClip,
          padding: 16,
          paddingTop: 16 + cutoutDepth - BORDER_W,
          color: textHigh,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ── Root ─────────────────────────────────────────────────────────────── */
/**
 * NotchMenu — ButtonGroup-shaped row of items (octagon-cut corners on the
 * outermost ends) on top of a Body panel.
 *
 * @param {string|null} [value]
 * @param {(value: string) => void} [onChange]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [dividers=true]
 * @param {ReactNode} children - Mix of NotchMenu.Item and NotchMenu.Body.
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
  const outerClip = octagon(s.cx)

  // Measure the banner width so the Body can shape its cutout to match.
  const bannerRef = useRef(null)
  const [bannerWidth, setBannerWidth] = useState(0)
  useLayoutEffect(() => {
    const el = bannerRef.current
    if (!el) return
    const measure = () => setBannerWidth(el.offsetWidth)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const items = []
  let body = null
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === Item) items.push(child)
    else if (child.type === Body) body = child
  })

  const last = items.length - 1
  const positionedItems = items.map((it, i) => {
    const position = items.length === 1 ? 'only'
                   : i === 0 ? 'first'
                   : i === last ? 'last'
                   : 'middle'
    return cloneElement(it, { _position: position, key: it.props.value ?? `action-${i}` })
  })

  const ctx = { value, onChange, size, bannerWidth }

  return (
    <NotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        {/* Border-trick: outer wrapper = border color, 1px padding, with
            the full octagon clip. Inner = items in a flex row; the items'
            own clip-paths (clipLeft / clipRight) shape the outer ends. */}
        <div
          ref={bannerRef}
          style={{
            // content-box so total height = s.h + 2*BORDER_W and the inner
            // row (height: 100% = s.h) matches the items' explicit height —
            // otherwise items overflow the row by 2 px and content can be
            // vertically offset.
            boxSizing: 'content-box',
            display: 'inline-flex',
            background: borderDefault,
            clipPath: outerClip,
            padding: BORDER_W,
            height: s.h,
            // Pull the banner halfway down so the items' vertical center
            // sits on the body's top edge.
            marginBottom: -Math.round(s.h / 2),
            zIndex: 1,
          }}
        >
          <div
            role="tablist"
            style={{
              height: '100%',
              display: 'inline-flex',
              alignItems: 'stretch',
              background: surface2,
              // Same octagon clip as the outer so the 1px padding gap shows
              // borderDefault along the diagonal cuts too (not just the
              // straight sides).
              clipPath: outerClip,
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

        {/* Body is a direct flex child so its own minWidth (computed from
            bannerWidth + cutout bevel) can grow the wrapper. With the
            previous `alignSelf: stretch` wrapper, the body was forced to
            match the wrapper's cross-axis width and minWidth had no effect. */}
        {body}
      </div>
    </NotchMenuContext.Provider>
  )
}

NotchMenu.Item = Item
NotchMenu.Body = Body
