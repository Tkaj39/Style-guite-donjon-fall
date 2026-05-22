/* ── PhaseIndicator ────────────────────────────────────────────────────────
   Ukazatel fáze hry — kroky hráčova tahu nebo globální fáze hry.
   Lepší než generický Tabs: sekvenciální logika, vizuální progress,
   splněné fáze → checkmark, budoucí → faint.
   ─────────────────────────────────────────────────────────────────────── */
import {
  gold, goldDim, goldMid,
  bg2, bg3,
  borderDefault,
  textHigh, textMid, textLow, textFaint,
  gainColor,
} from './tokens'

/* ── Check ikona pro splněné fáze ── */
function CheckIcon({ color, size = 9 }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" width={size} height={size}>
      <path
        d="M2 5.5l2.5 2.5L8 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const SIZES = {
  sm: {
    dotD: 20, lineH: 1, gap: 0,
    labelSize: '0.625rem', dotIconSize: 8,
    connectorH: 24,  // vertikální mód
  },
  md: {
    dotD: 26, lineH: 2, gap: 0,
    labelSize: '0.6875rem', dotIconSize: 10,
    connectorH: 32,
  },
}

export default function PhaseIndicator({
  phases       = [],
  currentPhase,
  orientation  = 'horizontal',   // 'horizontal' | 'vertical'
  size         = 'md',
  onPhaseClick,
  style,
  className,
}) {
  const s = SIZES[size] ?? SIZES.md

  const currentIdx = phases.findIndex(p => p.id === currentPhase)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        alignItems: orientation === 'vertical' ? 'flex-start' : 'center',
        gap: 0,
        ...style,
      }}
      className={className}
    >
      {phases.map((phase, i) => {
        const isDone    = i < currentIdx
        const isCurrent = i === currentIdx
        const isFuture  = i > currentIdx
        const isLast    = i === phases.length - 1
        const isClickable = !!onPhaseClick && !isFuture

        /* Barvy */
        const dotBg      = isDone ? gainColor : isCurrent ? gold : bg2
        const dotBorder  = isDone ? gainColor : isCurrent ? gold : borderDefault
        const dotColor   = isDone ? '#0d0d1a' : isCurrent ? '#0d0d1a' : textFaint
        const labelColor = isDone ? textLow : isCurrent ? gold : textFaint
        const labelW     = isCurrent ? 600 : 400

        /* Connector (linka mezi fázemi) */
        const connectorColor = isDone ? `${gainColor}66` : `${borderDefault}66`

        const dotEl = (
          <div
            title={phase.label}
            onClick={() => isClickable && onPhaseClick?.(phase.id)}
            style={{
              width: s.dotD, height: s.dotD, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: dotBg,
              border: `${isCurrent ? 2 : 1}px solid ${dotBorder}`,
              boxShadow: isCurrent ? `0 0 10px ${gold}55, 0 0 4px ${gold}33` : 'none',
              transition: 'all 0.2s',
              cursor: isClickable ? 'pointer' : 'default',
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            {isDone
              ? <CheckIcon color={dotColor} size={s.dotIconSize} />
              : phase.icon
                ? <span style={{ fontSize: s.dotIconSize, color: dotColor, display: 'flex' }}>{phase.icon}</span>
                : <span style={{ fontSize: '0.625rem', fontWeight: 700, color: dotColor }}>{i + 1}</span>
            }
          </div>
        )

        if (orientation === 'vertical') {
          return (
            <div key={phase.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%' }}>
              {/* Levý sloupec: dot + connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                {dotEl}
                {!isLast && (
                  <div style={{
                    width: s.lineH,
                    height: s.connectorH,
                    background: connectorColor,
                    transition: 'background 0.3s',
                    marginTop: 2,
                  }} />
                )}
              </div>

              {/* Label */}
              <div style={{
                paddingTop: (s.dotD - parseFloat(s.labelSize) * 16 * 1.3) / 2,
                paddingBottom: isLast ? 0 : s.connectorH + 4,
              }}>
                <span style={{ fontSize: s.labelSize, fontWeight: labelW, color: labelColor, lineHeight: 1.3 }}>
                  {phase.label}
                </span>
                {phase.description && isCurrent && (
                  <p style={{ margin: '2px 0 0', fontSize: '0.625rem', color: textFaint, lineHeight: 1.4 }}>
                    {phase.description}
                  </p>
                )}
              </div>
            </div>
          )
        }

        /* Horizontální */
        return (
          <div key={phase.id} style={{ display: 'flex', alignItems: 'center', flex: isLast ? 'none' : 1 }}>
            {/* Dot + label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              {dotEl}
              <span style={{
                fontSize: s.labelSize,
                fontWeight: labelW,
                color: labelColor,
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {phase.label}
              </span>
            </div>

            {/* Connector (ne za posledním) */}
            {!isLast && (
              <div style={{
                flex: 1,
                height: s.lineH,
                background: connectorColor,
                marginBottom: parseFloat(s.labelSize) * 16 * 1.2 + 5,  // zarovnání s dotem
                marginLeft: 4, marginRight: 4,
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
