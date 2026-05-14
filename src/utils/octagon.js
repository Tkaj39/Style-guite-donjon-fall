export function octagon(cx) {
  return `polygon(${cx}px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

export function clipLeft(cx) {
  return `polygon(${cx}px 0px,100% 0px,100% 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

export function clipRight(cx) {
  return `polygon(0px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,0px 100%)`
}

/**
 * octagonWithNotch — octagon s V-zářezem na jedné straně.
 * Zářez jde dovnitř tvaru (odebrání materiálu).
 *
 * @param {number} cx   - rohové zkosení (stejné jako octagon)
 * @param {number} nw   - šířka zářezu v px (default 28)
 * @param {number} nh   - hloubka zářezu v px (default 12)
 * @param {'bottom'|'top'|'left'|'right'} side - strana zářezu
 */
export function octagonWithNotch(cx, nw = 28, nh = 12, side = 'bottom') {
  const hw = nw / 2
  switch (side) {
    case 'bottom':
      return `polygon(
        ${cx}px 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        calc(50% + ${hw}px) 100%,
        50% calc(100% - ${nh}px),
        calc(50% - ${hw}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px ${cx}px
      )`
    case 'top':
      return `polygon(
        ${cx}px 0px,
        calc(50% - ${hw}px) 0px,
        50% ${nh}px,
        calc(50% + ${hw}px) 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px ${cx}px
      )`
    case 'left':
      return `polygon(
        ${cx}px 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px calc(50% + ${hw}px),
        ${nh}px 50%,
        0px calc(50% - ${hw}px),
        0px ${cx}px
      )`
    case 'right':
      return `polygon(
        ${cx}px 0px,
        calc(100% - ${cx}px) 0px,
        100% ${cx}px,
        100% calc(50% - ${hw}px),
        calc(100% - ${nh}px) 50%,
        100% calc(50% + ${hw}px),
        100% calc(100% - ${cx}px),
        calc(100% - ${cx}px) 100%,
        ${cx}px 100%,
        0px calc(100% - ${cx}px),
        0px ${cx}px
      )`
    default:
      return octagon(cx)
  }
}
