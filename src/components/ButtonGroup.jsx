import { useId } from 'react'

function clipLeft(cx) {
  return `polygon(${cx}px 0px,100% 0px,100% 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}
function clipRight(cx) {
  return `polygon(0px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,0px 100%)`
}
function clipBoth(cx) {
  return `polygon(${cx}px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
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
        position: 'absolute', top: 0,
        [flip ? 'right' : 'left']: 1,
        transform: flip ? 'scaleX(-1)' : undefined,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <linearGradient id={`${uid}-v`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#FFC183" /><stop offset="1" stopColor="#8F7458" />
        </linearGradient>
        <linearGradient id={`${uid}-h`} x1="1" y1="0" x2="0" y2="0" gradientUnits="objectBoundingBox">
          <stop stopColor="#FFC183" /><stop offset="1" stopColor="#8F7458" />
        </linearGradient>
      </defs>
      <path transform="translate(1.4 0)" d="M21.2652 0.53033C21.0884 0.353554 20.9116 0.176777 20.7348 2.98023e-07C19.7526 0.923326 18.7718 1.84812 17.7925 2.7744C12.2622 8.0052 6.7789 13.283 1.34257 18.6077L1.07435 18.8705L1.07026 19.2652C1.02342 23.7829 1 28.3007 1 32.8185C1 37.4207 1.0243 42.0229 1.07291 46.6252L1.0689 47.0045L1.35075 47.287C6.77788 52.4999 12.2505 57.6665 17.7686 62.7867C18.7568 63.7036 19.7463 64.619 20.7374 65.5329C20.9125 65.3544 21.0875 65.1759 21.2626 64.9975C20.3299 64.0241 19.3958 63.0522 18.4602 62.0818C13.2354 56.6626 7.96507 51.2898 2.64925 45.9634L2.92709 46.6252C2.9757 42.0229 3 37.4207 3 32.8185C3 28.3007 2.97658 23.7829 2.92974 19.2652L2.65743 19.9226C7.98219 14.4863 13.26 9.00295 18.4908 3.47266C19.417 2.49336 20.3418 1.51258 21.2652 0.53033Z" fill={g} />
      <path d="M23.2658 4.5297C23.3323 4.458 23.3702 4.36342 23.3693 4.26505C23.3685 4.1667 23.3293 4.07291 23.26 4.00399C23.1908 3.93506 23.0968 3.8963 22.9984 3.89591C22.9001 3.8955 22.8057 3.93377 22.7343 4.0006C21.8663 4.81353 20.9998 5.62794 20.1348 6.44381C15.0848 11.2071 10.085 16.0204 5.13558 20.8838L4.86693 21.1478L4.86253 21.5452C4.82088 25.3029 4.80005 29.0606 4.80005 32.8183C4.80005 36.6606 4.82182 40.5029 4.86538 44.3452L4.86106 44.7262L5.14458 45.0115C10.0852 49.7627 15.0743 54.4644 20.1121 59.1168C20.9856 59.9235 21.8606 60.7287 22.7371 61.5325C22.8092 61.5986 22.904 61.6358 23.0023 61.6344C23.1007 61.633 23.1942 61.5932 23.2627 61.5236C23.3313 61.4539 23.3695 61.3597 23.3693 61.2614C23.3691 61.163 23.3303 61.0688 23.263 60.9978C22.445 60.1347 21.6255 59.273 20.8046 58.4128C16.0701 53.4521 11.2871 48.5408 6.45552 43.6789L6.73472 44.3452C6.77827 40.5029 6.80005 36.6606 6.80005 32.8183C6.80005 29.0606 6.77922 25.3029 6.73757 21.5452L6.46451 22.2066C11.3049 17.2347 16.095 12.2126 20.8347 7.14045C21.6466 6.27167 22.4569 5.40142 23.2658 4.5297Z" fill={g} />
      <path d="M7.27832 33.0152C7.36763 33.1699 7.36763 33.3605 7.27832 33.5152L5.85547 35.979C5.76619 36.1337 5.60141 36.229 5.42285 36.229L2.57715 36.229C2.39859 36.229 2.23381 36.1337 2.14453 35.979L0.72168 33.5152C0.643532 33.3798 0.633775 33.217 0.692383 33.0747L0.72168 33.0152L2.14453 30.5513C2.23381 30.3967 2.39859 30.3014 2.57715 30.3013L5.42285 30.3013C5.60141 30.3014 5.76619 30.3967 5.85547 30.5513L7.27832 33.0152Z" fill="#2A2948" stroke={gh} />
      <rect x="15.1799" y="12.1652" width="2.04" height="2.04" rx="0.5" transform="rotate(90 15.1799 12.1652)" fill={g} stroke={g} />
      <rect x="15.1799" y="51.6853" width="2.04" height="2.04" rx="0.5" transform="rotate(90 15.1799 51.6853)" fill={g} stroke={g} />
    </svg>
  )
}

function HexOrnament({ uid, flip, edgePadL = 0, edgePadR = 0, textPadL, textPadR }) {
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
      {/* outer line — inset by edgePad on each side */}
      <div style={{
        position: 'absolute',
        left: edgePadL + 1,
        right: edgePadR + 1,
        top: 2,
        height: 1,
        background: 'linear-gradient(90deg,#8F7458 0%,#FFC183 50%,#8F7458 100%)',
      }} />
      {/* inner line — inset by textPad on each side */}
      <div style={{
        position: 'absolute',
        left: textPadL + 2,
        right: textPadR + 2,
        bottom: 1,
        height: 1,
        background: 'linear-gradient(90deg,#8F7458 0%,#FFC183 50%,#8F7458 100%)',
      }} />
      <svg
        style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)' }}
        width="10.14" height="7" viewBox="18.65 0 5.07 7" fill="none"
      >
        <defs>
          <linearGradient id={`${uid}-hg`} x1="21.1848" y1="0" x2="21.1848" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC183" /><stop offset="1" stopColor="#8F7458" />
          </linearGradient>
        </defs>
        <path d="M20.9348 0.72168C21.0895 0.632366 21.2801 0.632366 21.4348 0.72168L23.4661 1.89453C23.6206 1.98384 23.716 2.14867 23.7161 2.32715V4.67285C23.716 4.85133 23.6206 5.01616 23.4661 5.10547L21.4348 6.27832C21.2801 6.36763 21.0895 6.36763 20.9348 6.27832L18.9036 5.10547C18.749 5.01616 18.6536 4.85133 18.6536 4.67285V2.32715C18.6536 2.14867 18.749 1.98384 18.9036 1.89453L20.9348 0.72168Z" fill="#2A2948" stroke={g} />
      </svg>
    </div>
  )
}

const s = { h: 32, cx: 9.61, px: 10 }
const ornW = Math.round(24 * (s.h / 66) * 10) / 10

/**
 * @param {'menu'|'tabs'} variant
 * @param {boolean} dividers
 * @param {{ value: string, label: string, icon?: React.ReactNode }[]} items
 * @param {string} value
 * @param {(value: string) => void} onChange
 */
export default function ButtonGroup({
  variant = 'menu',
  dividers = false,
  items = [],
  value,
  onChange,
}) {
  const rawId = useId()
  const gid   = rawId.replace(/:/g, '')
  const last  = items.length - 1

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }} role="group">
      {items.map((item, i) => {
        const isActive = item.value === value
        const isFirst  = i === 0
        const isLast   = i === last
        const isOnly   = isFirst && isLast
        const uid      = `${gid}-${i}`

        const clipPath = isOnly  ? clipBoth(s.cx)
                       : isFirst ? clipLeft(s.cx)
                       : isLast  ? clipRight(s.cx)
                       : undefined

        const padL = isFirst || isOnly ? s.px + ornW : s.px
        const padR = isLast  || isOnly ? s.px + ornW : s.px

        // edgePad clears the clipped corner area; only apply where clipping exists
        const edgePadL = isFirst || isOnly ? s.cx + 8 : 0
        const edgePadR = isLast  || isOnly ? s.cx + 8 : 0

        return (
          <div key={item.value} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && dividers && (
              <span
                aria-hidden="true"
                style={{
                  width: 1, height: 20,
                  background: '#8F7458',
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
            )}
            <button
              type="button"
              onClick={() => onChange?.(item.value)}
              aria-pressed={isActive}
              style={{
                position: 'relative',
                height: s.h,
                paddingLeft: padL,
                paddingRight: padR,
                clipPath,
                background: isActive
                  ? 'linear-gradient(150deg,#353751 0%,#2A2948 70%)'
                  : 'linear-gradient(150deg,#232238 0%,#1B1A30 70%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 150ms',
              }}
              className="hover:brightness-110 active:brightness-90 focus:outline-none focus-visible:brightness-110"
            >
              {(isFirst || isOnly) && <SideOrnament h={s.h} uid={`${uid}l`} />}
              {(isLast  || isOnly) && <SideOrnament h={s.h} uid={`${uid}r`} flip />}

              <HexOrnament uid={`${uid}t`} edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} />
              <HexOrnament uid={`${uid}b`} flip edgePadL={edgePadL} edgePadR={edgePadR} textPadL={padL} textPadR={padR} />

              {item.icon && (
                <span style={{
                  width: 14, height: 14,
                  display: 'flex', alignItems: 'center', flexShrink: 0,
                  color: isActive ? '#FFC183' : '#8F7458',
                  filter: isActive ? 'drop-shadow(0 0 3px #FFC18366)' : undefined,
                  position: 'relative',
                }}>
                  {item.icon}
                </span>
              )}

              <span style={{
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: 1,
                position: 'relative',
                fontSize: variant === 'tabs' && isActive ? '0.8125rem' : '0.6875rem',
                transition: 'font-size 200ms',
                ...(isActive ? {
                  background: 'linear-gradient(180deg,#F9F9F9 0%,#B8956A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : {
                  color: '#8F7458',
                }),
              }}>
                {item.label}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
