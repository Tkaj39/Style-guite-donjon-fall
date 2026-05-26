import { useId } from 'react'
import { scoopBBPath, scoopCirclePath, SHAPE_SIZES } from '../../utils/octagon'

/**
 * ScoopClip — obal pro elementy s konkávně vyřezanými rohy.
 *
 * Dva režimy přes `shape` prop:
 *
 *  **shape="bezier"** (default) — RESPONZIVNÍ
 *    SVG clipPath s objectBoundingBox a Q bezier křivkou. Tvar se
 *    automaticky přizpůsobí libovolným rozměrům elementu (0–1 souřadnice).
 *    Při výrazné změně poměru stran se prohnutí mírně deformuje.
 *    `r` je v rozsahu 0–1 (podíl).
 *
 *  **shape="circle"** — PEVNÝ VÝŘEZ KRUHU
 *    SVG clipPath s absolutními px a A arc command (matematicky přesný
 *    kruh). Element MUSÍ mít explicitní width/height — ScoopClip je
 *    auto-nastaví podle `size` presetu, pokud není ve style override.
 *    `r` je v PIXELECH (poloměr kruhu).
 *
 * Velikost:
 *   - `size` — 'xs' | 'sm' | 'md' | 'lg' (stejný systém jako octagon cx).
 *              V bezier módu mapuje na SHAPE_SIZES[size].bb (relativní).
 *              V circle módu mapuje na SHAPE_SIZES[size].scoop (absolutní px)
 *              a default container width/height z SHAPE_SIZES[size].w/h.
 *   - `r`    — přímá hodnota (0–1 v bezier, px v circle). Přednost před size.
 *
 * @example
 * // Responzivní bezier — přizpůsobí se containeru
 * <ScoopClip size="md" style={{ width: 200, height: 60 }}>...</ScoopClip>
 *
 * // Pevný kruhový výřez — kruh 13px na všech rozích
 * <ScoopClip shape="circle" size="md">...</ScoopClip>
 *
 * // Vlastní velikost přes r
 * <ScoopClip shape="circle" r={20} style={{ width: 250, height: 80 }}>...</ScoopClip>
 */
export default function ScoopClip({
  shape = 'bezier',
  size,
  r,
  children,
  style = {},
  className,
  borderColor,
  borderWidth = 1,
}) {
  const id     = useId().replace(/:/g, '')
  const clipId = `scoop-${id}`

  const isCircle = shape === 'circle'

  if (isCircle) {
    /* ── Circle mode: absolutní px, pevný kruhový výřez ────────────── */
    const preset = size && SHAPE_SIZES[size]
    const w = pxValue(style.width)  ?? preset?.w ?? 170
    const h = pxValue(style.height) ?? preset?.h ?? 52
    const rPx = r ?? preset?.scoop ?? 13

    // CSS clip-path: path() — funguje s absolutními px
    const clip = `path('${scoopCirclePath(w, h, rPx)}')`

    // Auto-set width/height pokud nejsou ve style
    const baseStyle = {
      width: w,
      height: h,
      ...style,
    }

    if (borderColor) {
      // Border trick: outer s clip-path o (r + bw) px (větší kruh, větší arc)
      const outerClip = `path('${scoopCirclePath(w + 2 * borderWidth, h + 2 * borderWidth, rPx + borderWidth)}')`
      return (
        <div style={{ position: 'relative', display: 'inline-block', width: w, height: h }}>
          <div style={{
            position: 'absolute', inset: -borderWidth,
            clipPath: outerClip,
            background: borderColor,
          }} />
          <div className={className} style={{
            ...baseStyle,
            position: 'relative',
            clipPath: clip,
          }}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className={className} style={{ ...baseStyle, clipPath: clip }}>
        {children}
      </div>
    )
  }

  /* ── Bezier mode: responsive, SVG clipPath objectBoundingBox ──── */
  const finalR = r != null
    ? r
    : (size && SHAPE_SIZES[size]?.bb) ?? 0.25

  return (
    <>
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

function pxValue(v) {
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const m = v.match(/^(\d+(?:\.\d+)?)px$/)
    if (m) return parseFloat(m[1])
  }
  return null
}
