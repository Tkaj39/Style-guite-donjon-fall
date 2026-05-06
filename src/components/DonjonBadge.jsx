function octagon(cx) {
  return `polygon(${cx}px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

const variantMap = {
  default: { bg: '#2A2948', border: '#8F7458', text: '#B8956A', dot: '#FFC183' },
  success: { bg: '#183D20', border: '#40A055', text: '#C0F0C8', dot: '#40A055' },
  danger:  { bg: '#3D1818', border: '#C04040', text: '#F9C0C0', dot: '#C04040' },
  warning: { bg: '#3D2E10', border: '#C08040', text: '#FFD580', dot: '#C08040' },
  info:    { bg: '#102040', border: '#4080C0', text: '#A0C8F0', dot: '#4080C0' },
}

const sizeMap = {
  sm: { cx: 3, px: 7,  py: 2,  fontSize: '0.625rem',   gap: 4,  dotSize: 5,  iconSize: 10 },
  md: { cx: 4, px: 10, py: 3,  fontSize: '0.6875rem',  gap: 5,  dotSize: 6,  iconSize: 12 },
}

export default function DonjonBadge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
}) {
  const v = variantMap[variant] ?? variantMap.default
  const s = sizeMap[size] ?? sizeMap.md

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        clipPath: octagon(s.cx),
        background: v.bg,
        boxShadow: `inset 0 0 0 1px ${v.border}`,
        paddingLeft: s.px,
        paddingRight: s.px,
        paddingTop: s.py,
        paddingBottom: s.py,
        fontSize: s.fontSize,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: v.text,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {dot && !icon && (
        <span
          style={{
            display: 'inline-block',
            width: s.dotSize,
            height: s.dotSize,
            borderRadius: '50%',
            background: v.dot,
            flexShrink: 0,
            boxShadow: `0 0 4px ${v.dot}88`,
          }}
        />
      )}
      {icon && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: s.iconSize,
            height: s.iconSize,
            flexShrink: 0,
            color: v.text,
          }}
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}
