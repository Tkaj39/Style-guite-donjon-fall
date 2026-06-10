/* ── HeroImage (tkajui) ──────────────────────────────────────────────
   Large featured image with an optional gradient scrim and overlaid
   title / subtitle / actions. Used for screen headers (main menu,
   campaign select, victory screen).

   Composition: background <img>, optional gradient overlay (bottom or
   full), an absolutely-positioned content slot.
   ─────────────────────────────────────────────────────────────────── */
import { surface3, textHigh, textMid } from './tokens'

const HEIGHTS = {
  sm: 180,
  md: 280,
  lg: 380,
  xl: 520,
}

/**
 * @param {string} src                 Background image URL.
 * @param {string} [alt='']            Background-image alt.
 * @param {'sm'|'md'|'lg'|'xl'|number} [height='md']  Container height token or raw px.
 * @param {'bottom'|'full'|'none'} [overlay='bottom']
 *   bottom = dark gradient bottom→middle, full = uniform dim, none = no scrim.
 * @param {string} [title]
 * @param {string} [subtitle]
 * @param {React.ReactNode} [actions]  Trailing slot (e.g. Button group).
 * @param {'start'|'center'|'end'} [align='end']  Vertical position of content.
 * @param {React.ReactNode} [children] Custom content (replaces title/subtitle/actions).
 */
export default function HeroImage({
  src,
  alt = '',
  height = 'md',
  overlay = 'bottom',
  title,
  subtitle,
  actions,
  align = 'end',
  children,
  className,
  style,
  ...rest
}) {
  const h = typeof height === 'number' ? height : (HEIGHTS[height] ?? HEIGHTS.md)

  const overlayStyle = overlay === 'full'
    ? { background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))' }
    : overlay === 'bottom'
      ? { background: 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 100%)' }
      : null

  const flexAlign = align === 'start' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end'

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: h,
        overflow: 'hidden',
        borderRadius: 6,
        // Fallback bg so a slow/blocked image still shows the framed area
        // (was invisible against the page surface — picsum etc. can stall).
        background: surface3,
        ...style,
      }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {overlayStyle && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...overlayStyle }} />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: flexAlign,
          padding: '24px 28px',
          color: textHigh,
        }}
      >
        {children ?? (
          <>
            {title && (
              <h2 style={{ margin: 0, fontSize: '1.75rem', lineHeight: 1.15, fontWeight: 700 }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{ margin: '6px 0 0', fontSize: '0.95rem', color: textMid, maxWidth: '60ch' }}>
                {subtitle}
              </p>
            )}
            {actions && (
              <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {actions}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
