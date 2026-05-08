const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const sizeMap = {
  sm: { w: 42,  h: 48  },
  md: { w: 62,  h: 72  },
  lg: { w: 83,  h: 96  },
}

const stateMap = {
  empty:          { border: '#3A3858', fill: '#1B1A30', glow: null },
  base:           { border: null,      fill: null,      glow: null },
  'focal-active': { border: '#FFC183', fill: '#201D0E', glow: '0 0 14px #FFC18366' },
  'focal-passive':{ border: '#6A6040', fill: '#1C1A0E', glow: null },
  selected:       { border: '#F0E6D3', fill: '#252342', glow: '0 0 12px #F0E6D366' },
  move:           { border: '#50B86C', fill: '#0E231A', glow: '0 0 10px #50B86C55' },
  attack:         { border: '#E05C5C', fill: '#230E0E', glow: '0 0 10px #E05C5C55' },
  blocked:        { border: '#2A2840', fill: '#141320', glow: null, opacity: 0.45 },
}

function FlameIcon({ size = 10 }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width={size} height={size} style={{ color: '#FFC183', filter: 'drop-shadow(0 0 3px #FFC18388)' }}>
      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Z" />
    </svg>
  )
}

function DiamondDot({ size = 6 }) {
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} style={{ color: '#6A6040' }}>
      <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" opacity={0.7} />
    </svg>
  )
}

export default function HexTile({ state = 'empty', owner = null, size = 'md', label, showLabel = false }) {
  const s = sizeMap[size] ?? sizeMap.md
  const cfg = stateMap[state] ?? stateMap.empty

  const borderColor = state === 'base' && owner ? owner : cfg.border ?? '#3A3858'
  const fillColor   = state === 'base' && owner ? owner + '33' : cfg.fill ?? '#1B1A30'

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        filter: cfg.glow ? `drop-shadow(${cfg.glow})` : undefined,
        opacity: cfg.opacity ?? 1,
      }}>
        {/* Outer border layer */}
        <div style={{ position: 'relative', width: s.w, height: s.h, clipPath: HEX_CLIP, background: borderColor }}>
          {/* Inner fill layer — 2px inset via absolute positioning */}
          <div style={{
            position: 'absolute',
            top: 2, left: 2, right: 2, bottom: 2,
            clipPath: HEX_CLIP,
            background: fillColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {state === 'focal-active'  && <FlameIcon size={size === 'sm' ? 8 : size === 'lg' ? 14 : 10} />}
            {state === 'focal-passive' && <DiamondDot size={size === 'sm' ? 5 : size === 'lg' ? 9 : 6} />}
          </div>
        </div>
      </div>

      {showLabel && (
        <p style={{
          margin: 0, fontSize: '0.5rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#4A4560', textAlign: 'center',
          maxWidth: s.w + 8,
        }}>
          {label ?? state}
        </p>
      )}
    </div>
  )
}
