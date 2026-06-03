/* ── AchievementToast (donjon-fall-ui) ───────────────────────────────
   Special unlock notification — more visually weighted than a generic
   Toast. Bigger badge slot, "Achievement unlocked" header, name and
   description. Stays for `duration` ms then fades out via parent.

   Pair with a side-of-screen container (top-right is canonical).
   ─────────────────────────────────────────────────────────────────── */
import { useEffect, useState } from 'react'
import { octagon } from '../../utils/octagon'
import { bg2, bgDeep, gold, textHigh, textMid, warningColor } from './tokens'

/**
 * @param {boolean} open
 * @param {React.ReactNode} icon          Trophy / badge graphic.
 * @param {React.ReactNode} title         Achievement name.
 * @param {React.ReactNode} [description]
 * @param {string} [tier='gold']          Visual rarity ring. Predefined: gold/silver/bronze.
 * @param {string} [tierColor]            Override the tier ring color.
 * @param {number} [duration=4500]
 * @param {() => void} [onDismiss]
 */
// Tier rings — gold reuses the donjon palette token; silver/bronze are
// achievement-only colors with no broader token equivalent.
const TIER_COLOR = {
  gold,
  // eslint-disable-next-line donjon/no-hardcoded-hex -- achievement tier color, no token analog
  silver: '#C0C0CC',
  // eslint-disable-next-line donjon/no-hardcoded-hex -- achievement tier color, no token analog
  bronze: '#B87333',
}

export default function AchievementToast({
  open,
  icon = '🏆',
  title,
  description,
  tier = 'gold',
  tierColor,
  duration = 4500,
  onDismiss,
  className,
  style,
  ...rest
}) {
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    if (!open) return undefined
    setPhase('in')
    const fadeAt = Math.max(800, duration - 500)
    const fadeT = setTimeout(() => setPhase('out'), fadeAt)
    const doneT = setTimeout(() => onDismiss?.(), duration)
    return () => { clearTimeout(fadeT); clearTimeout(doneT) }
  }, [open, duration, onDismiss])

  if (!open) return null

  const ring = tierColor ?? TIER_COLOR[tier] ?? TIER_COLOR.gold
  const cx = 12
  const animation = phase === 'in'
    ? 'achievementSlideIn 420ms ease-out'
    : 'rewardFadeOut 500ms ease-in forwards'

  return (
    <div
      role="status"
      aria-live="polite"
      className={className}
      style={{
        background: ring,
        clipPath: octagon(cx),
        padding: 2,
        boxSizing: 'border-box',
        animation,
        boxShadow: `0 0 24px ${ring}55`,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          background: bgDeep,
          clipPath: octagon(cx),
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          minWidth: 280,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            flex: '0 0 auto',
            width: 56, height: 56,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            background: bg2,
            border: `2px solid ${ring}`,
            borderRadius: '50%',
            color: ring,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '0.7rem',
            color: warningColor,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            fontWeight: 700,
            marginBottom: 2,
          }}>
            Achievement unlocked
          </div>
          <div style={{ color: textHigh, fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
            {title}
          </div>
          {description && (
            <div style={{ color: textMid, fontSize: '0.8125rem', marginTop: 4, lineHeight: 1.4 }}>
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

