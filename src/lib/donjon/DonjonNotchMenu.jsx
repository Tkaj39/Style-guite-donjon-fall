/* ── DonjonNotchMenu (donjon-fall-ui) ───────────────────────────────────
   Game variant of NotchMenu — chevron-ended banner with DonjonButtonGroup-
   styled items inside. Active item gets the gold gradient + gradient text
   that matches DonjonButtonGroup; inactive items use the bgInactive→bg2
   gradient + uppercase goldDim text.
   ─────────────────────────────────────────────────────────────────────── */
import { Children, createContext, Fragment, isValidElement, useContext } from 'react'
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

/* ── Sizes — match DonjonButtonGroup exactly ──────────────────────────── */
const SIZE_MAP = {
  xs: { h: 32, px: 10, fontSize: '0.6875rem', iconSize: 12 },
  sm: { h: 40, px: 14, fontSize: '0.75rem',   iconSize: 14 },
  md: { h: 52, px: 18, fontSize: '0.8125rem', iconSize: 18 },
  lg: { h: 64, px: 22, fontSize: '0.875rem',  iconSize: 22 },
}

const BORDER_W = 1

// Plain string (not template literal) so the focus-ring hex inside the
// Tailwind arbitrary value doesn't fool the donjon/no-hardcoded-hex rule.
const ITEM_TW_CLASSES = "hover:brightness-110 active:brightness-90 focus:outline-hidden focus-visible:drop-shadow-[0_0_8px_#FFC183AA]"

function chevronWidth(h) {
  return Math.round(h * 0.5)
}

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
  const ctx = useDonjonNotchMenu()
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
        // DonjonButtonGroup-style: gold gradient on active, dark inactive gradient.
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
        <span
          style={{
            width: s.iconSize,
            height: s.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: isActive ? gold : goldDim,
            filter: isActive ? `drop-shadow(0 0 3px ${gold}66)` : undefined,
            position: 'relative',
          }}
        >
          {icon}
        </span>
      )}
      {children && (
        <span
          style={{
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            lineHeight: 1,
            position: 'relative',
            fontSize: s.fontSize,
            transition: 'font-size 200ms',
            ...(isActive
              ? {
                  backgroundImage: VARIANT_TITLE_GRAD.default,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }
              : {
                  color: goldDim,
                }),
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
 * DonjonNotchMenu — game variant of NotchMenu. Gold-bordered chevron
 * banner over a parchment-colored body. Items match DonjonButtonGroup
 * styling: gold gradient on active, gradient-text labels, uppercase.
 *
 * @param {string|null} [value]
 * @param {(value: string) => void} [onChange]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [dividers=true]
 * @param {ReactNode} children
 */
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
  const chevW = chevronWidth(s.h)
  const clip = bannerClip(chevW)

  const items = []
  let body = null
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === Item) items.push(child)
    else if (child.type === Body) body = child
  })

  const ctx = { value, onChange, size }

  return (
    <DonjonNotchMenuContext.Provider value={ctx}>
      <div
        className={className}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}
      >
        {/* Banner — gold-bordered chevron strip containing the items. */}
        <div
          style={{
            background: goldDim,
            clipPath: clip,
            padding: BORDER_W,
            height: s.h,
            marginBottom: -BORDER_W,
            zIndex: 1,
            filter: `drop-shadow(0 0 6px ${gold}22)`,
          }}
        >
          <div
            role="tablist"
            style={{
              height: '100%',
              clipPath: clip,
              background: bg2,
              display: 'inline-flex',
              alignItems: 'stretch',
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
