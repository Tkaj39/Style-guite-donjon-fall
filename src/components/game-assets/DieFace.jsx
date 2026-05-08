import { octagon } from '../../utils/octagon'

const sizeMap = {
  xs: { box: 24, dot: 3, cx: 3.5, fontSize: '0.5rem'    }, // fits sm hex (42×48), tower of 3 ≤ 44px
  sm: { box: 32, dot: 4, cx: 5,   fontSize: '0.625rem'  }, // fits md hex (62×72), tower of 3 ≤ 64px
  md: { box: 48, dot: 6, cx: 7.5, fontSize: '0.75rem'   }, // fits lg hex (83×96), tower of 3 ≤ 88px
  lg: { box: 64, dot: 8, cx: 10,  fontSize: '0.875rem'  },
}

// Standard D6 dot positions — [col, row] in 3×3 grid (0..2)
const dotPositions = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
  6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]],
}

const stateConfig = {
  default:  { bgMod: '22', borderMod: 'FF', opacity: 1    },
  selected: { bgMod: '44', borderMod: 'FF', opacity: 1,   glow: true },
  rerolled: { bgMod: '33', borderMod: 'CC', opacity: 1,   pulse: true },
  damaged:  { bgMod: '11', borderMod: '88', opacity: 0.6  },
}

export default function DieFace({ value = 1, playerColor = '#8F7458', size = 'md', state = 'default' }) {
  const s = sizeMap[size] ?? sizeMap.md
  const cfg = stateConfig[state] ?? stateConfig.default
  const dots = dotPositions[value] ?? dotPositions[1]

  const borderGrad  = `linear-gradient(145deg, ${playerColor} 0%, ${playerColor}99 100%)`
  const bgGrad      = `linear-gradient(145deg, ${playerColor}${cfg.bgMod} 0%, #0D0C1A 100%)`
  const dotColor    = '#E8D8C0'

  const innerPad = Math.round(s.box * 0.12)
  const gridSize = s.box - innerPad * 2 - 4 // area for dots
  const cellSize = gridSize / 3

  return (
    <div style={{
      display: 'inline-block',
      filter: cfg.glow ? `drop-shadow(0 0 6px ${playerColor}88)` : undefined,
      opacity: cfg.opacity,
    }}>
      {/* Outer octagon border */}
      <div style={{
        width: s.box, height: s.box,
        clipPath: octagon(s.cx),
        background: borderGrad,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Inner fill */}
        <div style={{
          width: s.box - 2, height: s.box - 2,
          clipPath: octagon(Math.max(s.cx - 1, 0)),
          background: bgGrad,
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Dot grid */}
          <div style={{
            position: 'relative',
            width: gridSize,
            height: gridSize,
          }}>
            {dots.map(([col, row], i) => (
              <div key={i} style={{
                position: 'absolute',
                left: col * cellSize + (cellSize - s.dot) / 2,
                top:  row * cellSize + (cellSize - s.dot) / 2,
                width: s.dot,
                height: s.dot,
                borderRadius: '50%',
                background: dotColor,
                boxShadow: `0 0 ${s.dot}px ${dotColor}88`,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
