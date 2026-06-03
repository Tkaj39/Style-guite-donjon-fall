/* ── Backdrop (tkajui) ───────────────────────────────────────────────
   Full-viewport dim overlay. Used behind floating panels that don't
   render in the native <dialog> top-layer (Drawer, custom popovers,
   tour highlights).

   For real modals — use <Modal>, which gets its own backdrop via the
   native dialog ::backdrop pseudo-element.
   ─────────────────────────────────────────────────────────────────── */
import { zNotification } from '../shared/tokens'

/**
 * @param {boolean} open               When false the backdrop is unmounted.
 * @param {() => void} [onClick]       Click handler (usually closes the host).
 * @param {number} [opacity=0.55]      Alpha of the black scrim, 0–1.
 * @param {boolean} [blur=false]       Add 4px backdrop-filter blur (where supported).
 * @param {number} [zIndex]            Override the default z-index.
 *                                     Defaults to zNotification - 100 (sits under toasts).
 */
export default function Backdrop({
  open,
  onClick,
  opacity = 0.55,
  blur = false,
  zIndex,
  className,
  style,
  ...rest
}) {
  if (!open) return null
  const z = zIndex ?? (zNotification - 100)

  return (
    <div
      role="presentation"
      onClick={onClick}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        background: `rgba(0, 0, 0, ${opacity})`,
        backdropFilter: blur ? 'blur(4px)' : undefined,
        WebkitBackdropFilter: blur ? 'blur(4px)' : undefined,
        zIndex: z,
        animation: 'fadeIn 160ms ease-out',
        ...style,
      }}
      {...rest}
    />
  )
}
