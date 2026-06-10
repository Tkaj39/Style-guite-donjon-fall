/* ── DonjonHeroImage (donjon-fall-ui) ────────────────────────────────
   Game variant of HeroImage. Same height / overlay / title / subtitle /
   actions / align API as the TkajUI version — visuals swap to the
   parchment palette + octagonal silhouette:
     • Border-trick gold octagon shell (outer = gold + clipPath, inner =
       gradient + clipPath via octagonInner). The CSS `border` shortcut
       breaks at the 45° diagonals of the octagon — the rectangle's
       border edges don't run along the diagonals so the clipPath shows
       bg through. The two-clipPath sandwich paints the gold edge along
       all 8 sides instead.
     • aspectRatio + min/maxHeight clamp so the panel scales with the
       viewport width (a flat fixed pixel height made the box look very
       tall on mobile and squashed on ultrawide).
     • Gold uppercase title, donjon-tinted scrim, parchment gradient
       fallback so the framed area stays visible even before the image
       loads.
   ─────────────────────────────────────────────────────────────────── */
import { octagon, octagonInner } from '../shared/octagon'
import { bg2, bg3, bgDeep, gold, goldDim, textHigh, textMid } from './tokens'

// Token → (maxHeight px, aspectRatio).
// Aspect ratios picked so the box reads as a banner / hero on typical
// desktop widths and shrinks proportionally on phones.
const HEIGHTS = {
  sm: { max: 180, ratio: 16 / 5 },   // 3.2 : 1
  md: { max: 280, ratio: 21 / 9 },   // ≈ 2.33 : 1
  lg: { max: 380, ratio: 16 / 8 },   // 2 : 1
  xl: { max: 520, ratio: 16 / 9 },   // ≈ 1.78 : 1
}

const SHELL_CX = 16

/**
 * @param {string} src
 * @param {string} [alt='']
 * @param {'sm'|'md'|'lg'|'xl'|number} [height='md']
 * @param {'bottom'|'full'|'none'} [overlay='bottom']
 * @param {string} [title]
 * @param {string} [subtitle]
 * @param {React.ReactNode} [actions]
 * @param {'start'|'center'|'end'} [align='end']
 * @param {React.ReactNode} [children]
 */
export default function DonjonHeroImage({
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
  // Numeric height → fixed (legacy escape hatch). Token height → responsive
  // box that uses an aspect ratio with a maxHeight cap.
  const isNumeric = typeof height === 'number'
  const cfg = HEIGHTS[height] ?? HEIGHTS.md
  const sizing = isNumeric
    ? { height }
    : {
        aspectRatio: cfg.ratio,
        maxHeight: cfg.max,
        // Don't collapse on very narrow viewports — keep enough room for
        // the title and a button row.
        minHeight: Math.round(cfg.max * 0.55),
      }

  const overlayStyle = overlay === 'full'
    ? { background: 'linear-gradient(rgba(15, 13, 30, 0.65), rgba(15, 13, 30, 0.65))' }
    : overlay === 'bottom'
      ? { background: 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(15, 13, 30, 0.65) 80%, rgba(15, 13, 30, 0.92) 100%)' }
      : null

  const flexAlign = align === 'start' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end'
  const textAlign = align === 'center' ? 'center' : 'left'

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        ...sizing,
        // Outer = gold edge. Border-trick: padding: 1 reveals 1 px of
        // outer gold along all 8 sides through the inner clip.
        background: gold,
        clipPath: octagon(SHELL_CX),
        padding: 1,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        // Parchment-shading gradient — visible even when the image fails.
        background: `linear-gradient(135deg, ${bg3} 0%, ${bgDeep} 60%, ${bg2} 100%)`,
        // octagonInner = octagon(SHELL_CX - 1) so the inner clip sits 1 px
        // inside the outer along every edge, producing a uniform gold ring.
        clipPath: octagonInner(SHELL_CX),
        overflow: 'hidden',
        // Inner is the flex parent for the content slot.
        display: 'flex',
        flexDirection: 'column',
        justifyContent: flexAlign,
        alignItems: align === 'center' ? 'center' : 'flex-start',
        padding: '28px 32px',
        boxSizing: 'border-box',
        color: textHigh,
        textAlign,
      }}>
        {/* ── Media stack — absolute, behind the content ── */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, transparent 0 12px, ${goldDim}11 12px 13px)`,
          pointerEvents: 'none',
        }} />
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

        {/* ── Content slot — relative + zIndex over the media siblings,
              still a flex child so align/justify positions it. */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'inherit' }}>
          {children ?? (
            <>
              {title && (
                <h2 style={{
                  margin: 0,
                  fontSize: 'clamp(1.25rem, 1rem + 1.8vw, 1.875rem)',
                  lineHeight: 1.15,
                  fontWeight: 700,
                  color: gold,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                }}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p style={{
                  margin: '8px 0 0',
                  fontSize: 'clamp(0.8125rem, 0.7rem + 0.5vw, 0.95rem)',
                  color: textMid,
                  maxWidth: '60ch',
                  lineHeight: 1.55,
                  textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                }}>
                  {subtitle}
                </p>
              )}
              {actions && (
                <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {actions}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
