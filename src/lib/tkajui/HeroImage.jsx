/* ── HeroImage (tkajui) ──────────────────────────────────────────────
   Large featured image with an optional gradient scrim and overlaid
   title / subtitle / actions. Used for screen headers (main menu,
   campaign select, victory screen).

   Composition: background <img>, optional gradient overlay (bottom or
   full), a flex-flow content slot. Shell itself is the flex container
   so the content participates in `align` without being yanked out of
   flow by absolute positioning.

   Responsive: `height` token resolves to (aspectRatio, maxHeight,
   minHeight) so the box scales with viewport width. A numeric `height`
   is a fixed-pixel escape hatch.
   ─────────────────────────────────────────────────────────────────── */
import { surface2, surface3, surface4, textHigh, textMid } from './tokens'

const HEIGHTS = {
  sm: { max: 180, ratio: 16 / 5 },   // 3.2 : 1
  md: { max: 280, ratio: 21 / 9 },   // ≈ 2.33 : 1
  lg: { max: 380, ratio: 16 / 8 },   // 2 : 1
  xl: { max: 520, ratio: 16 / 9 },   // ≈ 1.78 : 1
}

/**
 * @param {string} src                 Background image URL.
 * @param {string} [alt='']            Background-image alt.
 * @param {'sm'|'md'|'lg'|'xl'|number} [height='md']  Token (responsive)
 *                                     or raw px (fixed).
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
  const isNumeric = typeof height === 'number'
  const cfg = HEIGHTS[height] ?? HEIGHTS.md
  const sizing = isNumeric
    ? { height }
    : {
        aspectRatio: cfg.ratio,
        maxHeight: cfg.max,
        minHeight: Math.round(cfg.max * 0.55),
      }

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
        ...sizing,
        overflow: 'hidden',
        borderRadius: 6,
        // Fallback gradient so the framed area stays visible even when the
        // image is still loading or blocked.
        background: `linear-gradient(135deg, ${surface3} 0%, ${surface2} 60%, ${surface4} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: flexAlign,
        padding: '24px 28px',
        boxSizing: 'border-box',
        color: textHigh,
        ...style,
      }}
      {...rest}
    >
      {/* ── Media stack — absolutely positioned, out of flex flow ── */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
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

      {/* ── Content slot — relative so it stacks above the media. */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {children ?? (
          <>
            {title && (
              <h2 style={{
                margin: 0,
                fontSize: 'clamp(1.125rem, 0.9rem + 1.5vw, 1.75rem)',
                lineHeight: 1.15,
                fontWeight: 700,
              }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{
                margin: '6px 0 0',
                fontSize: 'clamp(0.8125rem, 0.7rem + 0.5vw, 0.95rem)',
                color: textMid,
                maxWidth: '60ch',
              }}>
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
