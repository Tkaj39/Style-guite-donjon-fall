export function octagon(cx) {
  return `polygon(${cx}px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

export function clipLeft(cx) {
  return `polygon(${cx}px 0px,100% 0px,100% 100%,${cx}px 100%,0px calc(100% - ${cx}px),0px ${cx}px)`
}

export function clipRight(cx) {
  return `polygon(0px 0px,calc(100% - ${cx}px) 0px,100% ${cx}px,100% calc(100% - ${cx}px),calc(100% - ${cx}px) 100%,0px 100%)`
}
