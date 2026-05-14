import { useId } from 'react'
import { scoopBBPath } from '../utils/octagon'

/**
 * ScoopClip — obal pro elementy s responzivním konkávním rohováním
 *
 * Používá SVG clipPath s clipPathUnits="objectBoundingBox" — souřadnice
 * jsou 0–1 relativně k elementu, takže shape se přizpůsobí rozměrům.
 *
 * ⚠ Při výrazné změně poměru stran (úzký/velmi široký element) se
 *    prohnutí mírně deformuje — scoop vypadá nejlépe při konstantní výšce
 *    (tlačítka, panely se známou výškou).
 *
 * @example
 * <ScoopClip r={0.25} style={{ height: 52, padding: '0 18px' }}>
 *   Obsah tlačítka
 * </ScoopClip>
 */
export default function ScoopClip({ r = 0.25, children, style = {}, className }) {
  const id = useId().replace(/:/g, '')  // bezpečné ID pro SVG

  return (
    <>
      {/* Inline SVG clipPath — musí být v DOM */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <defs>
          <clipPath id={`scoop-${id}`} clipPathUnits="objectBoundingBox">
            <path d={scoopBBPath(r)} />
          </clipPath>
        </defs>
      </svg>

      <div
        className={className}
        style={{ clipPath: `url(#scoop-${id})`, ...style }}
      >
        {children}
      </div>
    </>
  )
}
