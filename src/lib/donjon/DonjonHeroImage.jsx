/* ── DonjonHeroImage (donjon-fall-ui) ────────────────────────────────
   Game variant of HeroImage. Same height / overlay / title / subtitle /
   actions / align API as the TkajUI version — visuals swap to the
   parchment palette + octagonal silhouette:
     • Single-layer octagon shell: gold border + clipPath: octagon(16)
     • Parchment-shading gradient fallback so the framed area stays
       visible even when the image is stalling / blocked
     • Gold uppercase title with letter-spacing + text-shadow
     • Donjon-tinted scrim (deep purple-blue) instead of pure black

   The shell is intentionally NOT the outer/inner border-trick used by
   DonjonCard etc. The double-clipPath pattern eats the title slot
   inside a position:absolute content layer — the inner clip was
   overriding the outer one at the corners and leaving most of the
   frame invisible. One container + border + clipPath does the same
   gold-edge job and keeps the absolute children rendering correctly.
   ─────────────────────────────────────────────────────────────────── */
import { octagon } from '../shared/octagon'
import { bg2, bg3, bgDeep, gold, goldDim, textHigh, textMid } from './tokens'

const HEIGHTS = {
  sm: 180,
  md: 280,
  lg: 380,
  xl: 520,
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
  const h = typeof height === 'number' ? height : (HEIGHTS[height] ?? HEIGHTS.md)

  const overlayStyle = overlay === 'full'
    ? { background: 'linear-gradient(rgba(15, 13, 30, 0.65), rgba(15, 13, 30, 0.65))' }
    : overlay === 'bottom'
      ? { background: 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(15, 13, 30, 0.65) 80%, rgba(15, 13, 30, 0.92) 100%)' }
      : null

  const flexAlign = align === 'start' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end'
  const textAlign = align === 'center' ? 'center' : 'left'

  // Hero shell is the flex container itself; absolute-positioned media
  // layers (hatch / img / scrim) sit behind a single relatively-positioned
  // content slot. Earlier versions had the content layer as a 4th absolute
  // child — that left it visually empty in some browsers because the
  // stacking context interacted oddly with `clipPath` + `overflow: hidden`
  // on a small parent. Using `position: relative` + `zIndex: 1` on the
  // content slot keeps it above the media siblings without taking it out
  // of the flex flow that drives `align` / `justifyContent`.
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: h,
        // Parchment-shading gradient so the framed area stays visible
        // even when the image is stalling / blocked.
        background: `linear-gradient(135deg, ${bg3} 0%, ${bgDeep} 60%, ${bg2} 100%)`,
        border: `1px solid ${gold}`,
        clipPath: octagon(SHELL_CX),
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: flexAlign,
        alignItems: align === 'center' ? 'center' : 'flex-start',
        padding: '28px 32px',
        boxSizing: 'border-box',
        color: textHigh,
        textAlign,
        ...style,
      }}
      {...rest}
    >
      {/* ── Media stack — absolutely positioned, out of flex flow ── */}
      {/* Subtle goldDim diagonal hatch behind the image so the empty
          frame looks intentional rather than blank. */}
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
        // Hide the broken-image icon if the URL fails / is blocked so the
        // gradient + hatch fallback stays clean.
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

      {/* ── Content slot — relative so it stacks above media siblings,
            still a flex child so align/justify on the shell positions it. */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'inherit' }}>
        {children ?? (
          <>
            {title && (
              <h2 style={{
                margin: 0,
                fontSize: '1.875rem',
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
                fontSize: '0.95rem',
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
  )
}
