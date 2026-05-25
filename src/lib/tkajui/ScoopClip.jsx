import { useId } from 'react'
import { scoopBBPath } from '../../utils/octagon'

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
export default function ScoopClip({ r = 0.25, children, style = {}, className, borderColor, borderWidth = 1 }) {
  const id    = useId().replace(/:/g, '')
  const clipId = `scoop-${id}`

  return (
    <>
      {/* Inline SVG clipPath — musí být v DOM */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={scoopBBPath(r)} />
          </clipPath>
        </defs>
      </svg>

      {borderColor ? (
        /* Outer = border barva + clip, inner = fill + clip
           objectBoundingBox se přizpůsobí velikosti každého divu → rohy sedí */
        <div style={{ clipPath: `url(#${clipId})`, background: borderColor }}>
          <div className={className} style={{ clipPath: `url(#${clipId})`, margin: borderWidth, ...style }}>
            {children}
          </div>
        </div>
      ) : (
        <div className={className} style={{ clipPath: `url(#${clipId})`, ...style }}>
          {children}
        </div>
      )}
    </>
  )
}
