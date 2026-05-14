import { useEffect, useRef, useId } from 'react'
import { octagon } from '../../utils/octagon'
import { SideOrnament, HexOrnament } from '../../components/Ornaments'

/* ── Varianty ── */
const VARIANTS = {
  default: {
    bg:        'linear-gradient(150deg,#353751 0%,#2A2948 70%)',
    border:    '#8F7458',
    headerBg:  'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)',
    titleGrad: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
  },
  danger: {
    bg:        'linear-gradient(150deg,#3D1818 0%,#250A0A 70%)',
    border:    '#C04040',
    headerBg:  'linear-gradient(150deg,#4A1A1A 0%,#2E0C0C 70%)',
    titleGrad: 'linear-gradient(180deg,#F9C0C0 0%,#C04040 100%)',
  },
  success: {
    bg:        'linear-gradient(150deg,#183D20 0%,#0A250E 70%)',
    border:    '#40A055',
    headerBg:  'linear-gradient(150deg,#1E4A28 0%,#0D2E12 70%)',
    titleGrad: 'linear-gradient(180deg,#C0F0C8 0%,#40A055 100%)',
  },
  warning: {
    bg:        'linear-gradient(150deg,#3D2E10 0%,#250E04 70%)',
    border:    '#C08040',
    headerBg:  'linear-gradient(150deg,#4A3412 0%,#2E1006 70%)',
    titleGrad: 'linear-gradient(180deg,#FFD580 0%,#C08040 100%)',
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

/* ── Modal ── */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  variant = 'default',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
}) {
  const uid = useId().replace(/:/g, '')
  const titleId = `modal-title-${uid}`
  const v = VARIANTS[variant] ?? VARIANTS.default
  const w = SIZES[size] ?? SIZES.md
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)

  /* Escape key + focus management */
  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement

    const handle = (e) => {
      if (closeOnEscape && e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handle)

    /* Focus první focusovatelný element */
    const frame = requestAnimationFrame(() => {
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      focusable?.[0]?.focus()
    })

    return () => {
      document.removeEventListener('keydown', handle)
      cancelAnimationFrame(frame)
      previousFocusRef.current?.focus()
    }
  }, [isOpen, closeOnEscape, onClose])

  /* Zamknutí scrollu */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      onClick={closeOnBackdrop ? onClose : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(10, 8, 20, 0.80)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        backdropFilter: 'blur(2px)',
        animation: 'modalBackdropIn 0.15s ease',
      }}
    >
      {/* Modal panel */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: w,
          animation: 'modalPanelIn 0.18s ease',
        }}
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
            {/* Side ornaments */}
            {title && <SideOrnament h={66} uid={`${uid}l`} />}
            {title && <SideOrnament h={66} uid={`${uid}r`} flip />}

            {/* Header */}
            {title && (
              <div style={{
                position: 'relative',
                background: v.headerBg,
                borderBottom: `1px solid ${v.border}44`,
                padding: '14px 48px 12px 40px',
              }}>
                <HexOrnament uid={`${uid}ht`} edgePadL={cx} />

                <h2
                  id={titleId}
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
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#8F7458', lineHeight: 1.4 }}>
                    {description}
                  </p>
                )}

                {/* Close button */}
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
                      color: '#8F7458',
                      cursor: 'pointer',
                      transition: 'background 0.12s, color 0.12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${v.border}22`; e.currentTarget.style.color = '#F0E6D3' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8F7458' }}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div style={{ position: 'relative', padding: '20px 28px', flex: 1 }}>
              {!title && <HexOrnament uid={`${uid}ht`} edgePadL={cx} />}
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
                    color: '#8F7458',
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
                padding: '12px 28px 14px',
              }}>
                <HexOrnament uid={`${uid}hb`} flip edgePadL={cx} />
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  {footer}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animace */}
      <style>{`
        @keyframes modalBackdropIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes modalPanelIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0)     scale(1) }
        }
      `}</style>
    </div>
  )
}
