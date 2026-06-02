/* ── DonjonNotchMenu (donjon-fall-ui) ───────────────────────────────────
   Game variant of NotchMenu — same ButtonGroup-style octagon-cut shape on
   the outermost items, plus DonjonButtonGroup colors (gold gradient on
   active, gradient-text uppercase labels, gold border).
   ─────────────────────────────────────────────────────────────────────── */
import { Children, cloneElement, createContext, Fragment, isValidElement, useContext, useId, useLayoutEffect, useRef, useState } from 'react'
import { octagon, clipLeft, clipRight } from '../../utils/octagon'
import { SideOrnament, HexOrnament } from './Ornaments'
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

  // Ornaments: 'decorated' = SideOrnament + HexOrnament on every item;
  // 'plain' = no ornaments.
  const ornament     = ctx.ornament ?? 'decorated'
  const hasOrnaments = ornament !== 'plain'

  const rawId = useId()
  const uid   = rawId.replace(/:/g, '')

  // Ornaments need extra horizontal room past the diagonal corner (otherwise
  // the side ornament collides with the label). ornW scales with item height.
  const ornW = hasOrnaments
    ? Math.round(24 * (s.h / 66) * 10) / 10
    : 0
  const padL = hasOrnaments && (isFirst || isOnly) ? s.px + ornW : s.px
  const padR = hasOrnaments && (isLast  || isOnly) ? s.px + ornW : s.px
  const edgePadL = hasOrnaments && (isFirst || isOnly) ? s.cx + 8 : 0
  const edgePadR = hasOrnaments && (isLast  || isOnly) ? s.cx + 8 : 0

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
        paddingLeft: padL,
        paddingRight: padR,
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
      {/* Side ornament — only on the leftmost / rightmost item. */}
      {hasOrnaments && (isFirst || isOnly) && <SideOrnament h={s.h} uid={`${uid}l`} />}
      {hasOrnaments && (isLast  || isOnly) && <SideOrnament h={s.h} uid={`${uid}r`} flip />}

      {/* Hex ornaments — line decoration on top and bottom of every item. */}
      {hasOrnaments && <HexOrnament uid={`${uid}t`} edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} hexOffsetX={(padL - padR) / 2} />}
      {hasOrnaments && <HexOrnament uid={`${uid}b`} flip edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} hexOffsetX={(padL - padR) / 2} />}

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

/** Extra bevel on the cutout's diagonal corners — on top of the items' cx. */
const CUTOUT_BEVEL_EXTRA = 1

function makeBodyClipPath(bannerWidth, s, expandHalfW = 0, side = 'top') {
  const cutoutHalfW = bannerWidth / 2 + CUTOUT_BUFFER + expandHalfW
  const cutoutDepth = Math.round(s.h / 2) + CUTOUT_BUFFER
  const cx = s.cx + CUTOUT_BEVEL_EXTRA
  const innerHalfW = Math.max(cutoutHalfW - cx, 0)
  const innerDepth = Math.max(cutoutDepth - cx, 0)
  if (side === 'bottom') {
    return `polygon(
      0 0,
      100% 0,
      100% 100%,
      calc(50% + ${cutoutHalfW}px) 100%,
      calc(50% + ${cutoutHalfW}px) calc(100% - ${innerDepth}px),
      calc(50% + ${innerHalfW}px) calc(100% - ${cutoutDepth}px),
      calc(50% - ${innerHalfW}px) calc(100% - ${cutoutDepth}px),
      calc(50% - ${cutoutHalfW}px) calc(100% - ${innerDepth}px),
      calc(50% - ${cutoutHalfW}px) 100%,
      0 100%
    )`
  }
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
  const onTop = ctx.itemsPosition === 'top'
  const cutoutSide = onTop ? 'top' : 'bottom'
  const extraTop    = onTop  ? cutoutDepth : 0
  const extraBottom = !onTop ? cutoutDepth : 0

  if (ctx.bannerWidth <= 0) {
    return (
      <div
        className={className}
        style={{
          background: bgDeep,
          border: `${BORDER_W}px solid ${goldDim}`,
          padding: 18,
          paddingTop: 18 + extraTop,
          paddingBottom: 18 + extraBottom,
          color: textHigh,
          ...style,
        }}
      >
        {children}
      </div>
    )
  }

  const outerClip = makeBodyClipPath(ctx.bannerWidth, s, 0, cutoutSide)
  const innerClip = makeBodyClipPath(ctx.bannerWidth, s, BORDER_W, cutoutSide)

  const cx = s.cx + CUTOUT_BEVEL_EXTRA
  const minWidth = ctx.bannerWidth + 2 * (CUTOUT_BUFFER + cx + 8)

  return (
    <div
      className={className}
      style={{
        background: goldDim,
        clipPath: outerClip,
        padding: BORDER_W,
        minWidth,
        ...style,
      }}
    >
      <div
        style={{
          background: bgDeep,
          clipPath: innerClip,
          padding: 18,
          paddingTop: 18 + (onTop ? extraTop - BORDER_W : 0),
          paddingBottom: 18 + (!onTop ? extraBottom - BORDER_W : 0),
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
 * DonjonNotchMenu — game variant of NotchMenu with optional decorative
 * ornaments on the items.
 *
 * @param {'decorated'|'plain'} [ornament='decorated']
 * @param {'top'|'bottom'} [itemsPosition='top']  Where items sit relative
 *   to Body — 'top' (default) or 'bottom' (items live below body).
 */
export default function DonjonNotchMenu({
  value = null,
  onChange,
  size = 'md',
  dividers = true,
  ornament = 'decorated',
  itemsPosition = 'top',
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

  const ctx = { value, onChange, size, ornament, bannerWidth, itemsPosition }
  const onTop = itemsPosition === 'top'

  const banner = (
    <div
      ref={bannerRef}
      style={{
        // content-box so total height = s.h + 2*BORDER_W and the inner row
        // matches the items' explicit height (avoids 2 px overflow that would
        // shift SVG ornaments vertically).
        boxSizing: 'content-box',
        display: 'inline-flex',
        background: goldDim,
        clipPath: outerClip,
        padding: BORDER_W,
        height: s.h,
        [onTop ? 'marginBottom' : 'marginTop']: -Math.round(s.h / 2),
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
  )

  return (
    <DonjonNotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        {onTop ? banner : body}
        {onTop ? body : banner}
      </div>
    </DonjonNotchMenuContext.Provider>
  )
}

DonjonNotchMenu.Item = Item
DonjonNotchMenu.Body = Body
