/* ── Minimap (donjon-fall-ui) ────────────────────────────────────────
   Compact map view with a viewport overlay rectangle showing the
   visible region. Render a static background (image or canvas) plus
   children markers positioned via percent coordinates.

   Click the map to recenter; the component reports normalized (x, y)
   in [0, 1].
   ─────────────────────────────────────────────────────────────────── */
import { useRef } from 'react'
import { bg2, gold, goldDim, borderDefault } from './tokens'

/**
 * @typedef {object} MinimapMarker
 * @prop {number} x         0–1 normalized.
 * @prop {number} y         0–1 normalized.
 * @prop {string} [color]
 * @prop {React.ReactNode} [label]
 */

/**
 * @param {string} [src]            Optional background image.
 * @param {string} [background]     Solid bg if no src.
 * @param {{x, y, w, h}} [viewport] Visible area (all 0–1 normalized).
 * @param {MinimapMarker[]} [markers]
 * @param {number|string} [size=180]  Container width.
 * @param {number} [aspect=1]         w / h ratio.
 * @param {(x: number, y: number) => void} [onClick]
 */
export default function Minimap({
  src,
  background,
  viewport,
  markers = [],
  size = 180,
  aspect = 1,
  onClick,
  className,
  style,
  ...rest
}) {
  const ref = useRef(null)
  const w = typeof size === 'number' ? size : size
  const h = typeof size === 'number' ? Math.round(size / aspect) : `calc(${size} / ${aspect})`

  const handle = (e) => {
    if (!onClick || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    onClick(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)))
  }

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Minimap"
      onClick={handle}
      className={className}
      style={{
        position: 'relative',
        width: w,
        height: h,
        background: background ?? bg2,
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: `2px solid ${gold}`,
        cursor: onClick ? 'crosshair' : 'default',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {viewport && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left:   `${viewport.x * 100}%`,
            top:    `${viewport.y * 100}%`,
            width:  `${viewport.w * 100}%`,
            height: `${viewport.h * 100}%`,
            border: `1px solid ${gold}`,
            background: `${gold}22`,
            boxShadow: `0 0 0 1px ${borderDefault}`,
            pointerEvents: 'none',
          }}
        />
      )}
      {markers.map((m, i) => (
        <span
          key={i}
          aria-label={typeof m.label === 'string' ? m.label : undefined}
          style={{
            position: 'absolute',
            left: `${m.x * 100}%`,
            top:  `${m.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: 8, height: 8,
            background: m.color ?? goldDim,
            border: `1px solid ${gold}`,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        >
          {m.label && typeof m.label !== 'string' && m.label}
        </span>
      ))}
    </div>
  )
}
