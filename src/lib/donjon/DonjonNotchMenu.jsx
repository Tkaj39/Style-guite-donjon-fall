/* ── DonjonNotchMenu (donjon-fall-ui) ───────────────────────────────────
   Game variant of NotchMenu — same ButtonGroup-style octagon-cut shape on
   the outermost items, plus DonjonButtonGroup colors (gold gradient on
   active, gradient-text uppercase labels, gold border).
   ─────────────────────────────────────────────────────────────────────── */
import { Children, cloneElement, createContext, Fragment, isValidElement, useContext, useLayoutEffect, useRef, useState } from 'react'
import { octagon, clipLeft, clipRight } from '../../utils/octagon'
import {
  bg2, bgInactive, bgDeep,
  gold, goldDim,
  textHigh,
  VARIANT_BG, VARIANT_TITLE_GRAD,
} from './tokens'

const DonjonNotchMenuContext = createContext(null)

function useDonjonNotchMenu() {
  const ctx = useContext(DonjonNotchMenuContext)
  if (!ctx) {
    throw new Error('DonjonNotchMenu.Item / DonjonNotchMenu.Body must be used inside a <DonjonNotchMenu> parent.')
  }
  return ctx
}

const SIZE_MAP = {
  xs: { h: 32, cx: 9.61,  px: 10, fontSize: '0.6875rem', iconSize: 12 },
  sm: { h: 40, cx: 12.01, px: 14, fontSize: '0.75rem',   iconSize: 14 },
  md: { h: 52, cx: 15.62, px: 18, fontSize: '0.8125rem', iconSize: 18 },
  lg: { h: 64, cx: 19.22, px: 22, fontSize: '0.875rem',  iconSize: 22 },
}

const BORDER_W = 1

const ITEM_TW_CLASSES = "hover:brightness-110 active:brightness-90 focus:outline-hidden focus-visible:drop-shadow-[0_0_8px_#FFC183AA]"

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
  const ctx = useDonjonNotchMenu()
  const isTab = value !== undefined
  const isActive = isTab && ctx.value === value
  const s = SIZE_MAP[ctx.size] ?? SIZE_MAP.md

  const isFirst = _position === 'first' || _position === 'only'
  const isLast  = _position === 'last'  || _position === 'only'
  const isOnly  = _position === 'only'

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
        background: isActive
          ? VARIANT_BG.default
          : `linear-gradient(150deg,${bgInactive} 0%,${bg2} 70%)`,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'filter 150ms',
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
          color: isActive ? gold : goldDim,
          filter: isActive ? `drop-shadow(0 0 3px ${gold}66)` : undefined,
          position: 'relative',
        }}>
          {icon}
        </span>
      )}
      {children && (
        <span style={{
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: 1,
          position: 'relative',
          fontSize: s.fontSize,
          transition: 'font-size 200ms',
          ...(isActive ? {
            backgroundImage: VARIANT_TITLE_GRAD.default,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } : {
            color: goldDim,
          }),
        }}>
          {children}
        </span>
      )}
    </button>
  )
}

const CUTOUT_BUFFER = 8

function makeBodyClipPath(bannerWidth, s, expandHalfW = 0) {
  const cutoutHalfW = bannerWidth / 2 + CUTOUT_BUFFER + expandHalfW
  const cutoutDepth = Math.round(s.h / 2) + CUTOUT_BUFFER
  const cx = s.cx
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
  const ctx = useDonjonNotchMenu()
  const s = SIZE_MAP[ctx.size] ?? SIZE_MAP.md
  const cutoutDepth = Math.round(s.h / 2) + CUTOUT_BUFFER

  if (ctx.bannerWidth <= 0) {
    return (
      <div
        className={className}
        style={{
          background: bgDeep,
          border: `${BORDER_W}px solid ${goldDim}`,
          padding: 18,
          paddingTop: 18 + cutoutDepth,
          color: textHigh,
          ...style,
        }}
      >
        {children}
      </div>
    )
  }

  const outerClip = makeBodyClipPath(ctx.bannerWidth, s, 0)
  const innerClip = makeBodyClipPath(ctx.bannerWidth, s, BORDER_W)

  return (
    <div
      className={className}
      style={{
        background: goldDim,
        clipPath: outerClip,
        padding: BORDER_W,
        ...style,
      }}
    >
      <div
        style={{
          background: bgDeep,
          clipPath: innerClip,
          padding: 18,
          paddingTop: 18 + cutoutDepth - BORDER_W,
          color: textHigh,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ── Root ─────────────────────────────────────────────────────────────── */
export default function DonjonNotchMenu({
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
    <DonjonNotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        <div
          ref={bannerRef}
          style={{
            display: 'inline-flex',
            background: goldDim,
            clipPath: outerClip,
            padding: BORDER_W,
            height: s.h,
            // Pull the banner halfway down so items center on body's top edge.
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
              background: bg2,
              // Same octagon clip as the outer so the 1px gold-border gap
              // is visible along the diagonal corner cuts too.
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
                      background: goldDim,
                      opacity: 0.4,
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
