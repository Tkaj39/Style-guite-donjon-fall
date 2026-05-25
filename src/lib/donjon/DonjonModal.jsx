import { useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { useModalPageInert } from '../../hooks/useModalPageInert'
import { octagon } from '../../utils/octagon'
import { SideOrnament, ZkosenOrnament, RohOrnament, HexOrnament } from './Ornaments'
import {
  goldDim, textActive,
  VARIANT_BG, VARIANT_BORDER, VARIANT_HEADER_BG, VARIANT_TITLE_GRAD,
} from './tokens'

/* ── Varianty ── */
const VARIANTS = {
  default: {
    bg:        VARIANT_BG.default,
    border:    VARIANT_BORDER.default,
    headerBg:  VARIANT_HEADER_BG.default,
    titleGrad: VARIANT_TITLE_GRAD.default,
  },
  danger: {
    bg:        VARIANT_BG.danger,
    border:    VARIANT_BORDER.danger,
    headerBg:  VARIANT_HEADER_BG.danger,
    titleGrad: VARIANT_TITLE_GRAD.danger,
  },
  success: {
    bg:        VARIANT_BG.success,
    border:    VARIANT_BORDER.success,
    headerBg:  VARIANT_HEADER_BG.success,
    titleGrad: VARIANT_TITLE_GRAD.success,
  },
  warning: {
    bg:        VARIANT_BG.warning,
    border:    VARIANT_BORDER.warning,
    headerBg:  VARIANT_HEADER_BG.warning,
    titleGrad: VARIANT_TITLE_GRAD.warning,
  },
}

const SIZES = {
  sm: 360,
  md: 480,
  lg: 640,
}

const cx = 16

/* ── CloseIcon ── */
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

/* ── DonjonModal ── */
export default function DonjonModal({
  isOpen,
  onClose,
  title,
  'aria-label': ariaLabel,
  description,
  children,
  footer,
  size = 'md',
  variant = 'default',
  ornament = 'decorated',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
}) {
  const uid      = useId().replace(/:/g, '')
  const titleId  = `modal-title-${uid}`
  const v        = VARIANTS[variant] ?? VARIANTS.default
  const w        = SIZES[size] ?? SIZES.md
  const dialogRef = useRef(null)
  const hasOrnaments = ornament !== 'plain'
  const SideOrn = ornament === 'zkosen' ? ZkosenOrnament
                : ornament === 'roh'    ? RohOrnament
                : SideOrnament
  const headerPadding = `14px ${showCloseButton ? 48 : hasOrnaments ? 40 : 28}px 12px ${hasOrnaments ? 40 : 28}px`
  const bodyPadding = `20px ${!title && showCloseButton ? 52 : hasOrnaments ? 28 : 24}px 20px ${hasOrnaments ? 28 : 24}px`
  const footerPadding = hasOrnaments ? '12px 28px 14px' : '12px 24px 14px'

  useModalPageInert(isOpen)

  /* ── Otevření / zavření přes native <dialog> API ── */
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (isOpen) el.showModal()
    else if (el.open) el.close()
  }, [isOpen])

  /* ESC klávesa */
  function handleCancel(e) {
    e.preventDefault()
    if (closeOnEscape) onClose?.()
  }

  /* Klik na backdrop */
  function handleBackdropClick(e) {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose?.()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby={title ? titleId : undefined}
      aria-label={!title ? ariaLabel : undefined}
      className="modal-dialog modal-dialog-donjon"
    >
      {/* Panel */}
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: `min(${w}px, calc(100vw - 32px))` }}
      >
        {/* Outer border shell */}
        <div style={{ clipPath: octagon(cx), background: v.border, padding: 1 }}>
          {/* Inner fill */}
          <div style={{
            position: 'relative',
            clipPath: octagon(cx - 1),
            background: v.bg,
            display: 'flex',
            flexDirection: 'column',
          }}>
              {/* Header */}
            {title && (
              <div style={{
                position: 'relative',
                background: v.headerBg,
                borderBottom: `1px solid ${v.border}44`,
                padding: headerPadding,
                overflow: 'hidden',
              }}>
                {hasOrnaments && <SideOrn h={description ? 64 : 44} uid={`${uid}l`} />}
                {hasOrnaments && <SideOrn h={description ? 64 : 44} uid={`${uid}r`} flip />}
                {hasOrnaments && <HexOrnament uid={`${uid}ht`} edgePadL={cx} />}

                <h2
                  id={titleId}
                  className="text-balance"
                  style={{
                    margin: 0,
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    backgroundImage: v.titleGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {title}
                </h2>
                {description && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: goldDim, lineHeight: 1.4 }}>
                    {description}
                  </p>
                )}

                {showCloseButton && (
                  <button
                    onClick={onClose}
                    aria-label="Zavřít"
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      background: 'transparent',
                      border: `1px solid ${v.border}44`,
                      borderRadius: 3,
                      color: goldDim,
                      cursor: 'pointer',
                      transition: 'background 0.12s, color 0.12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${v.border}22`; e.currentTarget.style.color = textActive }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = goldDim }}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div style={{ position: 'relative', padding: bodyPadding, flex: 1 }}>
              {!title && hasOrnaments && <HexOrnament uid={`${uid}ht`} edgePadL={cx} />}
              {!title && showCloseButton && (
                <button
                  onClick={onClose}
                  aria-label="Zavřít"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    background: 'transparent',
                    border: `1px solid ${v.border}44`,
                    borderRadius: 3,
                    color: goldDim,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${v.border}22` }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <CloseIcon />
                </button>
              )}
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div style={{
                position: 'relative',
                borderTop: `1px solid ${v.border}44`,
                padding: footerPadding,
              }}>
                {hasOrnaments && <HexOrnament uid={`${uid}hb`} flip edgePadL={cx} />}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  {footer}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>,
    document.body,
  )
}
