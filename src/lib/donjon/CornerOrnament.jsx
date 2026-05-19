/**
 * CornerOrnament — dekorativní rohová ozdoba
 *
 * Vždy se umisťuje do rohu absolutně pozicovaného kontejneru.
 * Pro ostatní rohy použij CSS transform: scaleX(-1), scaleY(-1), scale(-1).
 *
 * Props:
 *   size       {number}                        px — výchozí 16
 *   color      {string}                        barva fill — výchozí 'currentColor' (dědí z rodiče)
 *   variant    {'bracket'|'dot'|'diamond'|'cross'}  tvar ornamentu
 *   cornerType {'cut'|'round'|'scoop'}         geometrie rohu, na kterém ornament sedí (výchozí 'cut')
 *   style      {object}                        extra inline styly (position, top, left…)
 */
export default function CornerOrnament({
  size       = 16,
  color      = 'currentColor',
  variant    = 'bracket',
  cornerType = 'cut',
  style      = {},
}) {
  const s = size

  // ── bracket ────────────────────────────────────────────────────────────────
  if (variant === 'bracket') {
    const t   = Math.max(1, Math.round(s * 0.15))   // tloušťka čáry
    const len = Math.round(s * 0.55)                  // délka ramene
    const r   = Math.round(s * 0.22)                  // poloměr oblouku (round / scoop)

    // round — hladký konvexní oblouk v lokti (odpovídá zaoblenému rohu)
    if (cornerType === 'round') {
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
          <path
            d={`M 0,${len} L 0,${r} A ${r},${r} 0 0 1 ${r},0 L ${len},0`}
            stroke={color}
            strokeWidth={t}
            strokeLinecap="square"
          />
        </svg>
      )
    }

    // scoop — konkávní oblouk v lokti (odpovídá konkávně zaoblenému rohu)
    if (cornerType === 'scoop') {
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
          <path
            d={`M 0,${len} L 0,${r} A ${r},${r} 0 0 0 ${r},0 L ${len},0`}
            stroke={color}
            strokeWidth={t}
            strokeLinecap="square"
          />
        </svg>
      )
    }

    // cut (výchozí) — ostrý L-bracket (dva obdélníky)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <rect x={0} y={0} width={t}   height={len} fill={color} />
        <rect x={0} y={0} width={len} height={t}   fill={color} />
      </svg>
    )
  }

  // ── dot ────────────────────────────────────────────────────────────────────
  if (variant === 'dot') {
    const r      = Math.round(s * 0.14)
    const gap    = Math.round(s * 0.28)
    const lineL  = Math.round(s * 0.40)
    const t      = Math.max(1, Math.round(s * 0.10))
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <circle cx={r} cy={r} r={r} fill={color} />
        <rect x={gap} y={0}   width={lineL} height={t} fill={color} opacity="0.55" />
        <rect x={0}   y={gap} width={t}     height={lineL} fill={color} opacity="0.55" />
      </svg>
    )
  }

  // ── diamond ────────────────────────────────────────────────────────────────
  if (variant === 'diamond') {
    const d = Math.round(s * 0.24)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <polygon points={`${d},0 ${d * 2},${d} ${d},${d * 2} 0,${d}`} fill={color} />
      </svg>
    )
  }

  // ── cross ──────────────────────────────────────────────────────────────────
  if (variant === 'cross') {
    const t   = Math.max(1, Math.round(s * 0.13))
    const arm = Math.round(s * 0.50)
    const dot = Math.round(s * 0.09)
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style} aria-hidden="true">
        <rect x={0} y={0} width={arm} height={t}   fill={color} />
        <rect x={0} y={0} width={t}   height={arm} fill={color} />
        <circle cx={arm - dot * 1.5} cy={dot * 1.8} r={dot} fill={color} opacity="0.5" />
      </svg>
    )
  }

  return null
}