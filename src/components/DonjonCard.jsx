import { useId } from 'react'
import { octagon } from '../utils/octagon'

const variants = {
  default: {
    bg: 'linear-gradient(150deg,#353751 0%,#2A2948 70%)',
    border: '#8F7458',
    headerBg: 'linear-gradient(150deg,#3D3A5C 0%,#2E2B50 70%)',
    titleGrad: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
  },
  danger: {
    bg: 'linear-gradient(150deg,#3D1818 0%,#250A0A 70%)',
    border: '#C04040',
    headerBg: 'linear-gradient(150deg,#4A1A1A 0%,#2E0C0C 70%)',
    titleGrad: 'linear-gradient(180deg,#F9C0C0 0%,#C04040 100%)',
  },
  success: {
    bg: 'linear-gradient(150deg,#183D20 0%,#0A250E 70%)',
    border: '#40A055',
    headerBg: 'linear-gradient(150deg,#1E4A28 0%,#0D2E12 70%)',
    titleGrad: 'linear-gradient(180deg,#C0F0C8 0%,#40A055 100%)',
  },
}

function HexOrnament({ uid, flip, edgePad = 16 }) {
  const g = `url(#${uid}-hg)`
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 0, right: 0,
        [flip ? 'bottom' : 'top']: 0,
        height: 7,
        pointerEvents: 'none',
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <div style={{
        position: 'absolute',
        left: edgePad + 1, right: edgePad + 1,
        top: 2,
        height: 1,
        background: 'linear-gradient(90deg,#8F7458 0%,#FFC183 50%,#8F7458 100%)',
      }} />
      <div style={{
        position: 'absolute',
        left: '18%',
        right: '18%',
        bottom: 1,
        height: 1,
        background: 'linear-gradient(90deg,#8F7458 0%,#FFC183 50%,#8F7458 100%)',
      }} />
      <svg
        style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)' }}
        width="10.14" height="7"
        viewBox="18.65 0 5.07 7"
        fill="none"
      >
        <defs>
          <linearGradient id={`${uid}-hg`} x1="21.1848" y1="0" x2="21.1848" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC183" />
            <stop offset="1" stopColor="#8F7458" />
          </linearGradient>
        </defs>
        <path
          d="M20.9348 0.72168C21.0895 0.632366 21.2801 0.632366 21.4348 0.72168L23.4661 1.89453C23.6206 1.98384 23.716 2.14867 23.7161 2.32715V4.67285C23.716 4.85133 23.6206 5.01616 23.4661 5.10547L21.4348 6.27832C21.2801 6.36763 21.0895 6.36763 20.9348 6.27832L18.9036 5.10547C18.749 5.01616 18.6536 4.85133 18.6536 4.67285V2.32715C18.6536 2.14867 18.749 1.98384 18.9036 1.89453L20.9348 0.72168Z"
          fill="#2A2948"
          stroke={g}
        />
      </svg>
    </div>
  )
}

function SideOrnament({ h, uid, flip }) {
  const w  = Math.round(24 * (h / 66) * 10) / 10 - 2
  const g  = `url(#${uid}-v)`
  const gh = `url(#${uid}-h)`

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 24 66"
      fill="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        [flip ? 'right' : 'left']: 1,
        transform: flip ? 'scaleX(-1)' : undefined,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <linearGradient id={`${uid}-v`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#FFC183" />
          <stop offset="1" stopColor="#8F7458" />
        </linearGradient>
        <linearGradient id={`${uid}-h`} x1="1" y1="0" x2="0" y2="0" gradientUnits="objectBoundingBox">
          <stop stopColor="#FFC183" />
          <stop offset="1" stopColor="#8F7458" />
        </linearGradient>
      </defs>

      <path d="M9.625 22.2652C9.63126 22.1721 9.67626 22.0828 9.74648 22.017C9.81691 21.9512 9.90681 21.9142 10 21.9142C10.0932 21.9142 10.1831 21.9512 10.2535 22.017C10.3237 22.0828 10.3687 22.1721 10.375 22.2652C10.3854 22.4221 10.3958 22.579 10.4062 22.7359C10.5729 25.2456 10.7395 27.7554 10.9061 30.2652L10.6407 29.6244C10.8779 29.8321 11.115 30.0397 11.3522 30.2473C11.4705 30.3509 11.5888 30.4545 11.7071 30.558C11.9073 30.733 12.0237 30.9763 12.0235 31.2417C12.0237 31.5067 11.9073 31.7721 11.7071 31.9723C11.5069 32.1724 11.2415 32.2888 10.9765 32.2886C10.7111 32.2888 10.4678 32.1724 10.2929 31.9723C10.1893 31.854 10.0857 31.7356 9.98215 31.6173C9.77453 31.3802 9.5669 31.143 9.35928 30.9059C9.24116 30.771 9.08201 30.4441 9.09389 30.2652C9.26051 27.7554 9.42713 25.2456 9.59375 22.7359C9.60417 22.579 9.61458 22.4221 9.625 22.2652Z" fill={g} />
      <path d="M9.62501 44.3853C9.6312 44.4784 9.67614 44.5678 9.74636 44.6336C9.81679 44.6995 9.90675 44.7365 10 44.7365C10.0933 44.7365 10.1832 44.6995 10.2537 44.6336C10.3239 44.5678 10.3688 44.4784 10.375 44.3853C10.3854 44.2264 10.3958 44.0675 10.4063 43.9086C10.5733 41.3608 10.7403 38.813 10.9073 36.2652L10.6416 36.9067C10.877 36.7002 11.1125 36.4937 11.3479 36.2873C11.4676 36.1823 11.5874 36.0773 11.7071 35.9723C11.9071 35.7972 12.0234 35.5538 12.0232 35.2883C12.0234 35.0233 11.9071 34.7581 11.7071 34.5581C11.5071 34.3581 11.2418 34.2418 10.9768 34.242C10.7114 34.2418 10.468 34.3581 10.2929 34.5581C10.1879 34.6778 10.0829 34.7975 9.9779 34.9172C9.77142 35.1527 9.56493 35.3882 9.35845 35.6236C9.24006 35.7586 9.08096 36.086 9.09271 36.2652C9.25972 38.813 9.42674 41.3608 9.59376 43.9086C9.60418 44.0675 9.61459 44.2264 9.62501 44.3853Z" fill={g} />
      <path d="M21.2652 0.53033C21.0884 0.353554 20.9116 0.176777 20.7348 2.98023e-07C19.7526 0.923326 18.7718 1.84812 17.7925 2.7744C12.2622 8.0052 6.7789 13.283 1.34257 18.6077L1.07435 18.8705L1.07026 19.2652C1.02342 23.7829 1 28.3007 1 32.8185C1 37.4207 1.0243 42.0229 1.07291 46.6252L1.0689 47.0045L1.35075 47.287C6.77788 52.4999 12.2505 57.6665 17.7686 62.7867C18.7568 63.7036 19.7463 64.619 20.7374 65.5329C20.9125 65.3544 21.0875 65.1759 21.2626 64.9975C20.3299 64.0241 19.3958 63.0522 18.4602 62.0818C13.2354 56.6626 7.96507 51.2898 2.64925 45.9634L2.92709 46.6252C2.9757 42.0229 3 37.4207 3 32.8185C3 28.3007 2.97658 23.7829 2.92974 19.2652L2.65743 19.9226C7.98219 14.4863 13.26 9.00295 18.4908 3.47266C19.417 2.49336 20.3418 1.51258 21.2652 0.53033Z" fill={g} />
      <path d="M23.2658 4.5297C23.3323 4.458 23.3702 4.36342 23.3693 4.26505C23.3685 4.1667 23.3293 4.07291 23.26 4.00399C23.1908 3.93506 23.0968 3.8963 22.9984 3.89591C22.9001 3.8955 22.8057 3.93377 22.7343 4.0006C21.8663 4.81353 20.9998 5.62794 20.1348 6.44381C15.0848 11.2071 10.085 16.0204 5.13558 20.8838L4.86693 21.1478L4.86253 21.5452C4.82088 25.3029 4.80005 29.0606 4.80005 32.8183C4.80005 36.6606 4.82182 40.5029 4.86538 44.3452L4.86106 44.7262L5.14458 45.0115C10.0852 49.7627 15.0743 54.4644 20.1121 59.1168C20.9856 59.9235 21.8606 60.7287 22.7371 61.5325C22.8092 61.5986 22.904 61.6358 23.0023 61.6344C23.1007 61.633 23.1942 61.5932 23.2627 61.5236C23.3313 61.4539 23.3695 61.3597 23.3693 61.2614C23.3691 61.163 23.3303 61.0688 23.263 60.9978C22.445 60.1347 21.6255 59.273 20.8046 58.4128C16.0701 53.4521 11.2871 48.5408 6.45552 43.6789L6.73472 44.3452C6.77827 40.5029 6.80005 36.6606 6.80005 32.8183C6.80005 29.0606 6.77922 25.3029 6.73757 21.5452L6.46451 22.2066C11.3049 17.2347 16.095 12.2126 20.8347 7.14045C21.6466 6.27167 22.4569 5.40142 23.2658 4.5297Z" fill={g} />
      <path d="M7.27832 33.0152C7.36763 33.1699 7.36763 33.3605 7.27832 33.5152L5.85547 35.979C5.76619 36.1337 5.60141 36.229 5.42285 36.229L2.57715 36.229C2.39859 36.229 2.23381 36.1337 2.14453 35.979L0.72168 33.5152C0.643532 33.3798 0.633775 33.217 0.692383 33.0747L0.72168 33.0152L2.14453 30.5513C2.23381 30.3967 2.39859 30.3014 2.57715 30.3013L5.42285 30.3013C5.60141 30.3014 5.76619 30.3967 5.85547 30.5513L7.27832 33.0152Z" fill="#2A2948" stroke={gh} />
      <rect x="15.1799" y="12.1652" width="2.04" height="2.04" rx="0.5" transform="rotate(90 15.1799 12.1652)" fill={g} stroke={g} />
      <rect x="15.1799" y="51.6853" width="2.04" height="2.04" rx="0.5" transform="rotate(90 15.1799 51.6853)" fill={g} stroke={g} />
    </svg>
  )
}

const cx = 16

export default function DonjonCard({
  children,
  title,
  description,
  footer,
  variant = 'default',
}) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, '')
  const v = variants[variant] ?? variants.default
  const ornH = 66

  return (
    /* Outer border shell */
    <div style={{ clipPath: octagon(cx), background: v.border, padding: 1, display: 'inline-block', minWidth: 240 }}>
    {/* Inner fill */}
    <div
      style={{
        position: 'relative',
        clipPath: octagon(Math.max(cx - 1, 0)),
        background: v.bg,
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100%',
      }}
    >
      {/* Side ornaments */}
      <SideOrnament h={ornH} uid={`${uid}l`} />
      <SideOrnament h={ornH} uid={`${uid}r`} flip />

      {/* Header */}
      {(title || description) && (
        <div
          style={{
            position: 'relative',
            background: v.headerBg,
            borderBottom: `1px solid ${v.border}44`,
            padding: '14px 40px 12px',
          }}
        >
          <HexOrnament uid={`${uid}ht`} edgePad={cx} />

          {title && (
            <h3
              style={{
                margin: 0,
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
                background: v.titleGrad,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              style={{
                margin: '4px 0 0',
                fontSize: '0.75rem',
                color: '#8F7458',
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '16px 28px', flex: 1 }}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            position: 'relative',
            borderTop: `1px solid ${v.border}44`,
            padding: '12px 28px 14px',
          }}
        >
          <HexOrnament uid={`${uid}hb`} flip edgePad={cx} />
          {footer}
        </div>
      )}
    </div>
    </div>
  )
}
