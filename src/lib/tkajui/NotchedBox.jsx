import { Children, isValidElement } from 'react'
import { octagonWithNotch, octagonWithNotches, notchClamp } from '../../utils/octagon'

// ─── Slot ──────────────────────────────────────────────────────────────────
/**
 * NotchedBox.Slot — obsah pozicovaný do středu zářezu.
 * Renderuje se VNĚ clip-path (není ořezáván).
 */
function Slot({ children, className, style }) {
  return (
    <div data-notchedbox-slot className={className} style={style}>
      {children}
    </div>
  )
}

// ─── Pozice slotu — respektuje notchOffset ─────────────────────────────────
function slotPos(side, offset = 0.5) {
  const pct = `${(offset * 100).toFixed(3)}%`
  switch (side) {
    case 'top':    return { top: 0,    left: pct, transform: 'translate(-50%, -50%)' }
    case 'bottom': return { bottom: 0, left: pct, transform: 'translate(-50%,  50%)' }
    case 'left':   return { left: 0,   top:  pct, transform: 'translate(-50%, -50%)' }
    case 'right':  return { right: 0,  top:  pct, transform: 'translate( 50%, -50%)' }
    default:       return { bottom: 0, left: pct, transform: 'translate(-50%,  50%)' }
  }
}

// ─── Helper: extrahuj numerickou hodnotu z CSS shorthand (např. '160px' → 160) ──
function pxValue(v) {
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const m = v.match(/^(\d+(?:\.\d+)?)px$/)
    if (m) return parseFloat(m[1])
  }
  return null
}

// ─── NotchedBox ────────────────────────────────────────────────────────────
/**
 * NotchedBox — kontejner s V-zářezem na jedné straně.
 *
 * Aplikuje `octagonWithNotch` clip-path. Volitelný `<NotchedBox.Slot>` umístí
 * obsah do středu zářezu — slot se renderuje vně clip-path a není ořezáván
 * a sleduje `notchOffset` (pokud je nastaven mimo střed).
 *
 * ⚠ CSS `border` na clip-path elementu je ořezán pravoúhle — nesleduje
 *   zkosené rohy ani zářez. Místo toho předej `borderColor` prop, který
 *   vykreslí border přes podkladovou vrstvu se správným tvarem.
 *
 * Auto-clamp: pokud předáš `style.width` / `style.height` v px, NotchedBox
 * automaticky validuje a clampuje `nw`/`nh` aby zářez nepřesáhl rozměry
 * (přes notchClamp helper). V dev modu vypíše warning.
 *
 * Props:
 *   cx           {number}                          rohové zkosení v px (výchozí 15)
 *   nw           {number}                          šířka zářezu v px (výchozí 28)
 *   nh           {number}                          hloubka zářezu v px (výchozí 12)
 *   side         {'top'|'bottom'|'left'|'right'}  strana zářezu (výchozí 'bottom')
 *   notchOffset  {number}                          pozice zářezu podél strany 0–1 (výchozí 0.5 = střed)
 *   borderColor  {string}                          barva borderu — renderuje podkladovou vrstvu
 *   borderWidth  {number}                          šířka borderu v px (výchozí 1)
 *   children     {ReactNode}                       obsah + volitelný NotchedBox.Slot
 *   style        {object}                          styly aplikované na clipped div
 *   className    {string}
 *
 * Příklad:
 *   <NotchedBox cx={12} nw={28} nh={12} side="bottom" notchOffset={0.25}
 *     borderColor="#8F745844"
 *     style={{ width: 160, height: 80, background: '#1E1C3A' }}
 *   >
 *     Obsah
 *     <NotchedBox.Slot>
 *       <Badge>5 VP</Badge>
 *     </NotchedBox.Slot>
 *   </NotchedBox>
 */
function NotchedBox({
  ref,
  cx = 15,
  nw = 28,
  nh = 12,
  side = 'bottom',
  notchOffset = 0.5,
  notchShape = 'v',
  notches,           // advanced API — pole zářezů, přepisuje single-notch propsy
  children,
  style,
  className,
  borderColor,
  borderWidth = 1,
  ...props
}) {
  const slots = []
  const content = []

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Slot) {
      slots.push(child)
    } else {
      content.push(child)
    }
  })

  // Auto-clamp pro single-notch režim
  const width  = pxValue(style?.width)
  const height = pxValue(style?.height)

  // Multi-notch režim: pole notches má přednost, single-notch propsy se ignorují
  const isMulti = Array.isArray(notches) && notches.length > 0
  let clipPath, outerClipPath, slotInfos

  if (isMulti) {
    // Clamp každý notch zvlášť proti rozměrům
    const clampedAll = notches.map(n => notchClamp({
      cx, nw: n.nw, nh: n.nh, side: n.side, offset: n.offset, width, height,
    }))
    const warnings = clampedAll.map(c => c.warning).filter(Boolean)
    if (warnings.length && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[NotchedBox] ' + warnings.join('; '))
    }
    const finalNotches = notches.map((n, i) => ({
      side: n.side,
      offset: clampedAll[i].offset,
      nw: clampedAll[i].nw,
      nh: clampedAll[i].nh,
      shape: n.shape ?? 'v',
    }))
    clipPath = octagonWithNotches(cx, finalNotches)
    if (borderColor) {
      outerClipPath = octagonWithNotches(cx + borderWidth, finalNotches)
    }
    slotInfos = finalNotches.map(n => ({ side: n.side, offset: n.offset }))
  } else {
    const clamped = notchClamp({ cx, nw, nh, side, offset: notchOffset, width, height })
    if (clamped.warning && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[NotchedBox] ${clamped.warning}`)
    }
    clipPath = octagonWithNotch(cx, clamped.nw, clamped.nh, side, clamped.offset, notchShape)
    if (borderColor) {
      outerClipPath = octagonWithNotch(cx + borderWidth, clamped.nw, clamped.nh, side, clamped.offset, notchShape)
    }
    slotInfos = [{ side, offset: clamped.offset }]
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Podkladová vrstva — border trick: stejný tvar, o borderWidth větší, barva borderu. */}
      {borderColor && (
        <div style={{
          position: 'absolute',
          inset: -borderWidth,
          clipPath: outerClipPath,
          background: borderColor,
        }} />
      )}

      <div
        ref={ref}
        style={{
          clipPath,
          position: borderColor ? 'relative' : undefined,
          ...style,
        }}
        className={className}
        {...props}
      >
        {content}
      </div>

      {/* Sloty — v multi-notch režimu se Slot bez identifikace pozice umístí na první notch.
          Pokud má Slot prop 'notchIndex', použije se ten konkrétní zářez. */}
      {slots.map((slot, i) => {
        const idx = typeof slot.props.notchIndex === 'number'
          ? Math.max(0, Math.min(slotInfos.length - 1, slot.props.notchIndex))
          : Math.min(i, slotInfos.length - 1)
        const info = slotInfos[idx]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...slotPos(info.side, info.offset),
              ...(slot.props.style ?? {}),
            }}
            className={slot.props.className}
          >
            {slot.props.children}
          </div>
        )
      })}
    </div>
  )
}

NotchedBox.Slot = Slot

export default NotchedBox
