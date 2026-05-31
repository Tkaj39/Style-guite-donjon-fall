import { Children, isValidElement } from 'react'
import { octagonWithNotch, octagonWithNotches, notchClamp } from '../../utils/octagon'

// ─── Slot ──────────────────────────────────────────────────────────────────
/**
 * NotchedBox.Slot — content positioned over the center of the notch.
 * Rendered OUTSIDE the clip-path (not clipped).
 */
function Slot({ children, className, style }) {
  return (
    <div data-notchedbox-slot className={className} style={style}>
      {children}
    </div>
  )
}

// ─── Slot position — respects notchOffset ──────────────────────────────────
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

// ─── Helper: extract numeric value from CSS shorthand (e.g. '160px' → 160) ──
function pxValue(v) {
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const m = v.match(/^(\d+(?:\.\d+)?)px$/)
    if (m) return parseFloat(m[1])
  }
  return null
}

/**
 * Border-aware adjustment of outer notches.
 *
 * V (diagonal walls):     outer = inner (border visible due to ~0.7·bw wall angle)
 * Square (axis-aligned):  outer.nw = inner.nw - 2·bw  → vertical walls separate
 * Trapezoid (mix):        outer = inner (plateau visible via vertical offset,
 *                                        diagonals visible via angle)
 *
 * Without this adjustment, a square notch would have invisible vertical walls —
 * outer & inner walls share the same axis-aligned coordinate, so the border
 * layer leaves no gap.
 */
function adjustNotchForBorder(notch, borderWidth) {
  if (notch.shape === 'square') {
    return { ...notch, nw: Math.max(0, notch.nw - 2 * borderWidth) }
  }
  return notch
}

// ─── NotchedBox ────────────────────────────────────────────────────────────
/**
 * NotchedBox — a container with a V-notch on one side.
 *
 * Applies an `octagonWithNotch` clip-path. The optional `<NotchedBox.Slot>`
 * places content over the center of the notch — the slot is rendered outside
 * the clip-path (not clipped) and follows `notchOffset` (when positioned off-center).
 *
 * ⚠ A CSS `border` on a clip-path element is clipped rectangularly — it does
 *   not follow the beveled corners or the notch. Pass `borderColor` instead;
 *   it renders an underlay layer with the correct shape.
 *
 * Auto-clamp: if you pass `style.width` / `style.height` in px, NotchedBox
 * automatically validates and clamps `nw`/`nh` so the notch does not exceed
 * the box (via the notchClamp helper). It logs a warning in dev mode.
 *
 * Props:
 *   cx           {number}                          corner bevel in px (default 15)
 *   nw           {number}                          notch width in px (default 28)
 *   nh           {number}                          notch depth in px (default 12)
 *   side         {'top'|'bottom'|'left'|'right'}  notch side (default 'bottom')
 *   notchOffset  {number}                          notch position along the side, 0–1 (default 0.5 = center)
 *   borderColor  {string}                          border color — renders the underlay layer
 *   borderWidth  {number}                          border width in px (default 1)
 *   children     {ReactNode}                       content + optional NotchedBox.Slot
 *   style        {object}                          styles applied to the clipped div
 *   className    {string}
 *
 * Example:
 *   <NotchedBox cx={12} nw={28} nh={12} side="bottom" notchOffset={0.25}
 *     borderColor="#8F745844"
 *     style={{ width: 160, height: 80, background: '#1E1C3A' }}
 *   >
 *     Content
 *     <NotchedBox.Slot>
 *       <Badge>5 VP</Badge>
 *     </NotchedBox.Slot>
 *   </NotchedBox>
 */
function NotchedBox({
  ref,
  cornerSize,        // preferred name (unified terminology with octagon/ScoopClip)
  cx,                // DEPRECATED alias for cornerSize
  nw = 28,
  nh = 12,
  side = 'bottom',
  notchOffset = 0.5,
  notchShape = 'v',
  notches,           // advanced API — array of notches, overrides single-notch props
  children,
  style,
  className,
  borderColor,
  borderWidth = 1,
  ...props
}) {
  // Unified terminology — cornerSize takes precedence, cx is an alias, default 15
  cx = cornerSize ?? cx ?? 15
  const slots = []
  const content = []

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Slot) {
      slots.push(child)
    } else {
      content.push(child)
    }
  })

  // Auto-clamp for single-notch mode
  const width  = pxValue(style?.width)
  const height = pxValue(style?.height)

  // Multi-notch mode: the notches array wins, single-notch props are ignored
  const isMulti = Array.isArray(notches) && notches.length > 0
  let clipPath, outerClipPath, slotInfos

  if (isMulti) {
    // Clamp each notch independently against the box dimensions
    const clampedAll = notches.map(n => notchClamp({
      cx, nw: n.nw, nh: n.nh, side: n.side, offset: n.offset, width, height,
    }))
    const warnings = clampedAll.map(c => c.warning).filter(Boolean)
    if (warnings.length && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {

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
      // Border-aware: a square notch needs outer.nw - 2·bw so vertical walls get a gap
      const outerNotches = finalNotches.map(n => adjustNotchForBorder(n, borderWidth))
      outerClipPath = octagonWithNotches(cx + borderWidth, outerNotches)
    }
    slotInfos = finalNotches.map(n => ({ side: n.side, offset: n.offset }))
  } else {
    const clamped = notchClamp({ cx, nw, nh, side, offset: notchOffset, width, height })
    if (clamped.warning && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {

      console.warn(`[NotchedBox] ${clamped.warning}`)
    }
    clipPath = octagonWithNotch(cx, clamped.nw, clamped.nh, side, clamped.offset, notchShape)
    if (borderColor) {
      // Border-aware: a square shape requires outer.nw - 2·bw for the vertical walls to be visible
      const outer = adjustNotchForBorder(
        { side, offset: clamped.offset, nw: clamped.nw, nh: clamped.nh, shape: notchShape },
        borderWidth,
      )
      outerClipPath = octagonWithNotch(cx + borderWidth, outer.nw, outer.nh, side, outer.offset, notchShape)
    }
    slotInfos = [{ side, offset: clamped.offset }]
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Underlay — border trick: same shape, larger by borderWidth, painted with the border color. */}
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

      {/* Slots — in multi-notch mode a Slot without a position identifier lands on the first notch.
          If the Slot has a 'notchIndex' prop, that specific notch is used. */}
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
