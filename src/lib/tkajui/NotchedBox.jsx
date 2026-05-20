import { Children, isValidElement } from 'react'
import { octagonWithNotch } from '../../utils/octagon'

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

// ─── Pozice slotu ──────────────────────────────────────────────────────────
function slotPos(side) {
  switch (side) {
    case 'top':    return { top: 0,    left: '50%', transform: 'translate(-50%, -50%)' }
    case 'bottom': return { bottom: 0, left: '50%', transform: 'translate(-50%,  50%)' }
    case 'left':   return { left: 0,   top:  '50%', transform: 'translate(-50%, -50%)' }
    case 'right':  return { right: 0,  top:  '50%', transform: 'translate( 50%, -50%)' }
    default:       return { bottom: 0, left: '50%', transform: 'translate(-50%,  50%)' }
  }
}

// ─── NotchedBox ────────────────────────────────────────────────────────────
/**
 * NotchedBox — kontejner s V-zářezem na jedné straně.
 *
 * Aplikuje `octagonWithNotch` clip-path. Volitelný `<NotchedBox.Slot>` umístí
 * obsah do středu zářezu — slot se renderuje vně clip-path a není ořezáván.
 *
 * Props:
 *   cx       {number}                          rohové zkosení v px (výchozí 15)
 *   nw       {number}                          šířka zářezu v px (výchozí 28)
 *   nh       {number}                          hloubka zářezu v px (výchozí 12)
 *   side     {'top'|'bottom'|'left'|'right'}   strana zářezu (výchozí 'bottom')
 *   children {ReactNode}                       obsah + volitelný NotchedBox.Slot
 *   style    {object}                          styly aplikované na clipped div
 *   className {string}
 *
 * Příklad:
 *   <NotchedBox cx={12} nw={28} nh={12} side="bottom"
 *     style={{ width: 160, height: 80, background: '#1E1C3A' }}
 *   >
 *     Obsah
 *     <NotchedBox.Slot>
 *       <Badge>5 VP</Badge>
 *     </NotchedBox.Slot>
 *   </NotchedBox>
 */
function NotchedBox({ ref, cx = 15, nw = 28, nh = 12, side = 'bottom', children, style, className, ...props }) {
  const slots = []
  const content = []

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Slot) {
      slots.push(child)
    } else {
      content.push(child)
    }
  })

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        ref={ref}
        style={{ clipPath: octagonWithNotch(cx, nw, nh, side), ...style }}
        className={className}
        {...props}
      >
        {content}
      </div>

      {slots.map((slot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...slotPos(side),
            ...(slot.props.style ?? {}),
          }}
          className={slot.props.className}
        >
          {slot.props.children}
        </div>
      ))}
    </div>
  )
}

NotchedBox.Slot = Slot

export default NotchedBox
