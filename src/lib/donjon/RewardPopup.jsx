/* ── RewardPopup (donjon-fall-ui) ────────────────────────────────────
   Animated drop notification — an item icon + name + quantity slides
   up + bounces in, holds for `duration` ms, then fades out.

   Controlled via `open`. Calls `onDismiss` when its lifecycle finishes
   so the parent can clean it up. Auto-stacks vertically when multiple
   are placed in the same container.
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useState } from 'react'
import { octagon } from '../shared/octagon'
import { bg2, gold, goldDim, textHigh, gainColor } from './tokens'

/**
 * @param {boolean} open
 * @param {React.ReactNode} icon         Item glyph / image.
 * @param {React.ReactNode} name
 * @param {number} [quantity=1]
 * @param {string} [rarityColor]         Border color override (overrides gold).
 * @param {number} [duration=2400]       Total visible time in ms (pop + hold + fade).
 * @param {() => void} [onDismiss]
 */
export default function RewardPopup({
  open,
  icon,
  name,
  quantity = 1,
  rarityColor,
  duration = 2400,
  onDismiss,
  className,
  style,
  ...rest
}) {
  const [phase, setPhase] = useState('in')   // 'in' | 'out'

  useEffect(() => {
    if (!open) return undefined
    setPhase('in')
    const fadeAt   = Math.max(800, duration - 500)
    const fadeT = setTimeout(() => setPhase('out'), fadeAt)
    const doneT = setTimeout(() => onDismiss?.(), duration)
    return () => { clearTimeout(fadeT); clearTimeout(doneT) }
  }, [open, duration, onDismiss])

  if (!open) return null

  const borderColor = rarityColor ?? gold
  const cx = 10
  const animation = phase === 'in'
    ? 'rewardPopIn 380ms ease-out'
    : 'rewardFadeOut 480ms ease-in forwards'

  return (
    <div
      role="status"
      aria-live="polite"
      className={className}
      style={{
        background: borderColor,
        clipPath: octagon(cx),
        padding: 1,
        boxSizing: 'border-box',
        animation,
        display: 'inline-block',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          background: bg2,
          clipPath: octagon(cx),
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minWidth: 200,
        }}
      >
        {icon != null && (
          <span aria-hidden="true" style={{ fontSize: '1.5rem', lineHeight: 1, color: gold }}>
            {icon}
          </span>
        )}
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: '0.7rem', color: goldDim, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            Received
          </span>
          <span style={{ display: 'block', color: textHigh, fontWeight: 600, fontSize: '0.9375rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {name}
          </span>
        </span>
        {quantity > 1 && (
          <span style={{ color: gainColor, fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontSize: '1rem' }}>
            +{quantity}
          </span>
        )}
      </div>
    </div>
  )
}
