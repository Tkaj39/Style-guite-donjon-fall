import { useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { useModalPageInert } from '../shared/useModalPageInert'
import { octagon } from '../shared/octagon'
import { surface2, surface3, borderDefault, borderMid, textHigh, textMid, successColor, successBg, successBorder, successText, successHeaderBg, successDescColor, dangerColor, dangerBg, dangerBorder, dangerText, dangerHeaderBg, dangerDescColor, warningColor, warningBg, warningBorder, warningHeaderBg, warningDescColor } from './tokens'

/* ── Varianty ── */
const VARIANTS = {
  default: {
    bg:       surface2,
    border:   borderMid,
    headerBg: surface3,
    title:    textHigh,
    desc:     textMid,
    closeBg:  borderDefault,
    closeColor: textMid,
  },
  danger: {
    bg:         dangerBg,
    border:     dangerBorder,
    headerBg:   dangerHeaderBg,
    title:      dangerText,
    desc:       dangerDescColor,
    closeBg:    dangerBorder,
    closeColor: dangerColor,
  },
  success: {
    bg:         successBg,
    border:     successBorder,
    headerBg:   successHeaderBg,
    title:      successText,
    desc:       successDescColor,
    closeBg:    successBorder,
    closeColor: successColor,
  },
  warning: {
    bg:         warningBg,
    border:     warningBorder,
    headerBg:   warningHeaderBg,
    title:      warningColor,
    desc:       warningDescColor,
    closeBg:    warningBorder,
    closeColor: warningColor,
  },
}

const SIZES = {
  sm: 360,
  md: 480,
  lg: 640,
}

const cx = 16

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

export default function Modal({
  open,
  onClose,
  title,
  'aria-label': ariaLabel,
  description,
  children,
  footer,
  size = 'md',
  variant = 'default',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
}) {
  const uid      = useId().replace(/:/g, '')
  const titleId  = `modal-title-${uid}`
  const v        = VARIANTS[variant] ?? VARIANTS.default
  const w        = SIZES[size] ?? SIZES.md
  const dialogRef = useRef(null)

  useModalPageInert(open)

  /* ── Open / close via the native <dialog> API ── */
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) el.showModal()
    else if (el.open) el.close()
  }, [open])

  /* ESC key — the cancel event precedes close, can be prevented */
  function handleCancel(e) {
    e.preventDefault()               // always prevent native close
    if (closeOnEscape) onClose?.()   // delegate the decision to the parent
  }

  /* Backdrop click — the dialog element outside the panel content */
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
      className="modal-dialog"
    >
      {/* Panel — direct child, targeted by @starting-style animations */}
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: w }}
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
                borderBottom: `1px solid ${v.border}`,
                padding: '14px 28px 12px',
              }}>
                <h2
                  id={titleId}
                  style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textWrap: 'balance',
                    color: v.title,
                  }}
                >
                  {title}
                </h2>
                {description && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: v.desc, lineHeight: 1.4 }}>
                    {description}
                  </p>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    aria-label="Close"
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
                      border: `1px solid ${v.border}`,
                      borderRadius: 4,
                      color: v.closeColor,
                      cursor: 'pointer',
                      transition: 'background 0.12s, color 0.12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = v.closeBg; e.currentTarget.style.color = textHigh }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = v.closeColor }}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div style={{ position: 'relative', padding: `20px ${!title && showCloseButton ? 52 : 28}px 20px 28px`, flex: 1 }}>
              {!title && showCloseButton && (
                <button
                  onClick={onClose}
                  aria-label="Close"
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
                    border: `1px solid ${borderDefault}`,
                    borderRadius: 4,
                    color: textMid,
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = borderDefault }}
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
                borderTop: `1px solid ${v.border}`,
                padding: '12px 28px 14px',
              }}>
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
