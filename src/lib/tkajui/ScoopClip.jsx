import { useId } from 'react'
import { scoopBBPath, SHAPE_SIZES } from '../../utils/octagon'

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
 * Velikost:
 *   - `size` — 'xs' | 'sm' | 'md' | 'lg' | 'card' (stejný systém jako octagon cx).
 *              Mapuje na SHAPE_SIZES[size].bb hodnotu, kalibrovanou tak aby scoop
 *              vypadal proporcionálně k octagon cutu při stejné velikosti.
 *   - `r`   — přímá relativní hodnota 0–1 (override pro custom velikost).
 *
 * @example
 * <ScoopClip size="md" style={{ height: 52, padding: '0 18px' }}>
 *   Obsah tlačítka — stejná vizuální váha jako octagon(cx=15.62)
 * </ScoopClip>
 *
 * <ScoopClip r={0.30} style={{ height: 80 }}>
 *   Hluboký scoop přes přímý r
 * </ScoopClip>
 */
export default function ScoopClip({ r, size, children, style = {}, className, borderColor, borderWidth = 1 }) {
  // Priorita: explicit r > size mapping > default 0.25
  const finalR = r != null
    ? r
    : size != null
      ? (SHAPE_SIZES[size]?.bb ?? 0.25)
      : 0.25
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
            <path d={scoopBBPath(finalR)} />
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
