/**
 * Shared decorative ornaments used across DonjonButton, DonjonCard, ButtonGroup.
 *
 * SideOrnament   — full-height vertical bracket (left/right edge). viewBox 24×66.
 *   Props: h, uid?, flip, color?, colorDim?, style?
 *
 * ZkosenOrnament — corner-only diagonal bracket + diamond. viewBox 22×22. ornament='zkosen'
 *   Props: h, uid?, flip (right corner), bottom (bottom corner), color?, colorDim?, style?
 *
 * RohOrnament    — corner bracket + partial vertical descent. viewBox 25×46. ornament='roh'
 *   Props: h, uid?, flip (right corner), bottom (bottom corner), color?, colorDim?, style?
 *
 * HexOrnament    — horizontal bar with two lines + centered hexagon (top/bottom).
 *   Props: uid?, flip, edgePadL/R, textPadL/R, hexOffsetX, color?, colorDim?, style?
 *
 * All ornaments scale proportionally: reference height = 66px (same as SideOrnament).
 * Ornament widths at 100% scale: SideOrnament≈22, ZkosenOrnament=22, RohOrnament=25.
 *
 * The `uid` prop is OPTIONAL — pokud chybí, useId() vygeneruje unikátní hodnotu.
 *
 * Variant colors — `color` (a optional `colorDim`) prop překryje výchozí zlatou
 * gradient. Pokud je předáno jen `color`, dim varianta se derivuje jako
 * `${color}88` (přibližně 53% alpha). Pro plnou kontrolu předej oba propu.
 *
 *   <RohOrnament color={dangerColor} />            // červené brackety
 *   <HexOrnament color={infoColor} colorDim="#2A4060" />  // modré s explicit dim
 */
import { useId } from 'react'
import { gold, goldDim, bg4 } from './tokens'

/* ── Auto-uid helper ────────────────────────────────────────────────────────
   Pokud caller nepředá `uid`, useId() vygeneruje unikátní fallback.
   `:` z React id se odstraní — invalidní v SVG ID. */
function useOrnamentUid(uid) {
  const auto = useId()
  return uid ?? `orn-${auto.replace(/:/g, '')}`
}

/* ── Centrální mapování typ ornamentu → základní šířka (při h=66) ────────────
   Jediný zdroj pravdy pro škálování. Pokud upravíš viewBox ornamentu, oprav
   sem — všechny call sites se přepočítají automaticky. */
export const ORNAMENT_BASE_WIDTH = {
  side:   22,   // SideOrnament — efektivní šířka po -2 odsazení
  zkosen: 22,   // ZkosenOrnament — viewBox 22×22
  roh:    25,   // RohOrnament — viewBox 25×46
}

/**
 * Spočítá výšku side-ornament SVG tak, aby jeho vykreslená šířka odpovídala
 * zadanému zkosení rohu (cx z octagon clip-pathu).
 *
 * Použití místo magic čísel `h={66}` ve voláních ornamentů:
 *
 *   <ZkosenOrnament h={ornamentHForCx(cx, 'zkosen')} uid={...} />
 *   <RohOrnament    h={ornamentHForCx(cx, 'roh')}    uid={...} />
 *
 * @param {number} cx   Hodnota corner-cut (px) — typicky 10–22.
 * @param {'side'|'zkosen'|'roh'} type
 * @returns {number} Výška ornamentu v px, zaokrouhlená.
 */
export function ornamentHForCx(cx, type = 'zkosen') {
  const baseW = ORNAMENT_BASE_WIDTH[type] ?? ORNAMENT_BASE_WIDTH.zkosen
  return Math.round(cx * 66 / baseW)
}

export function SideOrnament({ h, uid: uidProp, flip, color, colorDim, bgFill, style: styleProp }) {
  const stopMain = color ?? gold
  // Když je předán jen 'color', oba stopy mají stejnou barvu → solid fill.
  // Alpha-fade by na tmavém bg dělala spodek ornamentu skoro neviditelný
  // (zejm. u už tmavých barev jako goldDim). Explicit 'colorDim' override
  // umožňuje vlastní gradient kdyby caller chtěl.
  const stopDim  = colorDim ?? (color ?? goldDim)
  const hexFill  = bgFill ?? bg4
  const uid = useOrnamentUid(uidProp)
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
        ...styleProp,
      }}
    >
      <defs>
        <linearGradient id={`${uid}-v`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
        <linearGradient id={`${uid}-h`} x1="1" y1="0" x2="0" y2="0" gradientUnits="objectBoundingBox">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
      </defs>

      {/* upper tick */}
      <path d="M9.625 22.2652C9.63126 22.1721 9.67626 22.0828 9.74648 22.017C9.81691 21.9512 9.90681 21.9142 10 21.9142C10.0932 21.9142 10.1831 21.9512 10.2535 22.017C10.3237 22.0828 10.3687 22.1721 10.375 22.2652C10.3854 22.4221 10.3958 22.579 10.4062 22.7359C10.5729 25.2456 10.7395 27.7554 10.9061 30.2652L10.6407 29.6244C10.8779 29.8321 11.115 30.0397 11.3522 30.2473C11.4705 30.3509 11.5888 30.4545 11.7071 30.558C11.9073 30.733 12.0237 30.9763 12.0235 31.2417C12.0237 31.5067 11.9073 31.7721 11.7071 31.9723C11.5069 32.1724 11.2415 32.2888 10.9765 32.2886C10.7111 32.2888 10.4678 32.1724 10.2929 31.9723C10.1893 31.854 10.0857 31.7356 9.98215 31.6173C9.77453 31.3802 9.5669 31.143 9.35928 30.9059C9.24116 30.771 9.08201 30.4441 9.09389 30.2652C9.26051 27.7554 9.42713 25.2456 9.59375 22.7359C9.60417 22.579 9.61458 22.4221 9.625 22.2652Z" fill={g} />

      {/* lower tick */}
      <path d="M9.62501 44.3853C9.6312 44.4784 9.67614 44.5678 9.74636 44.6336C9.81679 44.6995 9.90675 44.7365 10 44.7365C10.0933 44.7365 10.1832 44.6995 10.2537 44.6336C10.3239 44.5678 10.3688 44.4784 10.375 44.3853C10.3854 44.2264 10.3958 44.0675 10.4063 43.9086C10.5733 41.3608 10.7403 38.813 10.9073 36.2652L10.6416 36.9067C10.877 36.7002 11.1125 36.4937 11.3479 36.2873C11.4676 36.1823 11.5874 36.0773 11.7071 35.9723C11.9071 35.7972 12.0234 35.5538 12.0232 35.2883C12.0234 35.0233 11.9071 34.7581 11.7071 34.5581C11.5071 34.3581 11.2418 34.2418 10.9768 34.242C10.7114 34.2418 10.468 34.3581 10.2929 34.5581C10.1879 34.6778 10.0829 34.7975 9.9779 34.9172C9.77142 35.1527 9.56493 35.3882 9.35845 35.6236C9.24006 35.7586 9.08096 36.086 9.09271 36.2652C9.25972 38.813 9.42674 41.3608 9.59376 43.9086C9.60418 44.0675 9.61459 44.2264 9.62501 44.3853Z" fill={g} />

      {/* outer bracket */}
      <path d="M21.2652 0.53033C21.0884 0.353554 20.9116 0.176777 20.7348 2.98023e-07C19.7526 0.923326 18.7718 1.84812 17.7925 2.7744C12.2622 8.0052 6.7789 13.283 1.34257 18.6077L1.07435 18.8705L1.07026 19.2652C1.02342 23.7829 1 28.3007 1 32.8185C1 37.4207 1.0243 42.0229 1.07291 46.6252L1.0689 47.0045L1.35075 47.287C6.77788 52.4999 12.2505 57.6665 17.7686 62.7867C18.7568 63.7036 19.7463 64.619 20.7374 65.5329C20.9125 65.3544 21.0875 65.1759 21.2626 64.9975C20.3299 64.0241 19.3958 63.0522 18.4602 62.0818C13.2354 56.6626 7.96507 51.2898 2.64925 45.9634L2.92709 46.6252C2.9757 42.0229 3 37.4207 3 32.8185C3 28.3007 2.97658 23.7829 2.92974 19.2652L2.65743 19.9226C7.98219 14.4863 13.26 9.00295 18.4908 3.47266C19.417 2.49336 20.3418 1.51258 21.2652 0.53033Z" fill={g} />

      {/* inner bracket */}
      <path d="M23.2658 4.5297C23.3323 4.458 23.3702 4.36342 23.3693 4.26505C23.3685 4.1667 23.3293 4.07291 23.26 4.00399C23.1908 3.93506 23.0968 3.8963 22.9984 3.89591C22.9001 3.8955 22.8057 3.93377 22.7343 4.0006C21.8663 4.81353 20.9998 5.62794 20.1348 6.44381C15.0848 11.2071 10.085 16.0204 5.13558 20.8838L4.86693 21.1478L4.86253 21.5452C4.82088 25.3029 4.80005 29.0606 4.80005 32.8183C4.80005 36.6606 4.82182 40.5029 4.86538 44.3452L4.86106 44.7262L5.14458 45.0115C10.0852 49.7627 15.0743 54.4644 20.1121 59.1168C20.9856 59.9235 21.8606 60.7287 22.7371 61.5325C22.8092 61.5986 22.904 61.6358 23.0023 61.6344C23.1007 61.633 23.1942 61.5932 23.2627 61.5236C23.3313 61.4539 23.3695 61.3597 23.3693 61.2614C23.3691 61.163 23.3303 61.0688 23.263 60.9978C22.445 60.1347 21.6255 59.273 20.8046 58.4128C16.0701 53.4521 11.2871 48.5408 6.45552 43.6789L6.73472 44.3452C6.77827 40.5029 6.80005 36.6606 6.80005 32.8183C6.80005 29.0606 6.77922 25.3029 6.73757 21.5452L6.46451 22.2066C11.3049 17.2347 16.095 12.2126 20.8347 7.14045C21.6466 6.27167 22.4569 5.40142 23.2658 4.5297Z" fill={g} />

      {/* diamond */}
      <path d="M7.27832 33.0152C7.36763 33.1699 7.36763 33.3605 7.27832 33.5152L5.85547 35.979C5.76619 36.1337 5.60141 36.229 5.42285 36.229L2.57715 36.229C2.39859 36.229 2.23381 36.1337 2.14453 35.979L0.72168 33.5152C0.643532 33.3798 0.633775 33.217 0.692383 33.0747L0.72168 33.0152L2.14453 30.5513C2.23381 30.3967 2.39859 30.3014 2.57715 30.3013L5.42285 30.3013C5.60141 30.3014 5.76619 30.3967 5.85547 30.5513L7.27832 33.0152Z" fill={hexFill} stroke={gh} />

      {/* top small rect */}
      <rect x="15.1799" y="12.1652" width="2.04" height="2.04" rx="0.5" transform="rotate(90 15.1799 12.1652)" fill={g} stroke={g} />

      {/* bottom small rect */}
      <rect x="15.1799" y="51.6853" width="2.04" height="2.04" rx="0.5" transform="rotate(90 15.1799 51.6853)" fill={g} stroke={g} />
    </svg>
  )
}

/* ── ZkosenOrnament ────────────────────────────────────────────────────────
   Rohový ornament — dvě diagonální závorky + diamant. viewBox 22×22.
   Varianta ornament='zkosen' na DonjonButton, DonjonCard, DonjonModal.
   ──────────────────────────────────────────────────────────────────────── */
export function ZkosenOrnament({ h, uid: uidProp, flip, bottom, color, colorDim, bgFill, style: styleProp }) {
  const stopMain = color ?? gold
  // Když je předán jen 'color', oba stopy mají stejnou barvu → solid fill.
  // Alpha-fade by na tmavém bg dělala spodek ornamentu skoro neviditelný
  // (zejm. u už tmavých barev jako goldDim). Explicit 'colorDim' override
  // umožňuje vlastní gradient kdyby caller chtěl.
  const stopDim  = colorDim ?? (color ?? goldDim)
  const hexFill  = bgFill ?? bg4
  const uid = useOrnamentUid(uidProp)
  const size = Math.round(22 * (h / 66) * 10) / 10
  const gv   = `url(#${uid}-v)`
  const gd   = `url(#${uid}-d)`

  /* Transform kombinuje horizontální (flip) a vertikální (bottom) zrcadlení */
  const sx = flip ? -1 : 1
  const sy = bottom ? -1 : 1
  const transform = (flip || bottom) ? `scale(${sx}, ${sy})` : undefined

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        [bottom ? 'bottom' : 'top']: 0,
        [flip ? 'right' : 'left']: 1,
        transform,
        pointerEvents: 'none',
        ...styleProp,
      }}
    >
      <defs>
        <linearGradient id={`${uid}-v`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
        <linearGradient id={`${uid}-d`} x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
      </defs>

      {/* outer bracket diagonal */}
      <path d="M19.5303 0.530302C19.3535 0.353525 19.1767 0.176748 19 -2.83122e-05C18.6538 0.287176 18.3092 0.575852 17.966 0.866003C14.8774 3.47735 11.908 6.20803 9.05803 9.05803C6.20803 11.908 3.47736 14.8774 0.866002 17.966C0.575854 18.3092 0.287177 18.6538 -2.83122e-05 19C0.176748 19.1767 0.353525 19.3535 0.530302 19.5303C0.876433 19.2431 1.22109 18.9544 1.56427 18.6643C4.65292 16.0529 7.62224 13.3222 10.4722 10.4722C13.3222 7.62224 16.0529 4.65292 18.6643 1.56427C18.9544 1.22109 19.2431 0.876431 19.5303 0.530302Z" fill={gv} />

      {/* inner bracket diagonal */}
      <path d="M21.5307 4.52969C21.5905 4.45583 21.6255 4.3628 21.6234 4.26652C21.6215 4.17027 21.5833 4.0793 21.5163 4.01263C21.4493 3.94597 21.3582 3.9082 21.2619 3.90666C21.1656 3.90509 21.0728 3.94051 20.9992 4.00059C20.683 4.2592 20.3683 4.51927 20.055 4.78082C17.2358 7.13474 14.5362 9.6077 11.9562 12.1997C9.3762 14.7917 6.9158 17.5028 4.575 20.3329C4.31491 20.6473 4.0563 20.9633 3.79916 21.2807C3.73942 21.3545 3.70443 21.4476 3.70646 21.5438C3.70844 21.6401 3.74663 21.7311 3.81361 21.7977C3.88059 21.8644 3.97173 21.9022 4.06799 21.9037C4.16428 21.9053 4.25714 21.8698 4.33072 21.8098C4.64692 21.5512 4.96164 21.2911 5.27489 21.0295C8.09409 18.6756 10.7937 16.2027 13.3737 13.6106C15.9537 11.0186 18.4141 8.30757 20.7549 5.47746C21.015 5.16301 21.2736 4.84708 21.5307 4.52969Z" fill={gv} />

      {/* diamond */}
      <path d="M13.563 14.0803C13.5019 14.2481 13.3559 14.3706 13.1799 14.4016L10.3778 14.8949C10.202 14.9259 10.0231 14.8609 9.90828 14.7241L8.07947 12.5439C7.96478 12.407 7.93189 12.2196 7.99299 12.0518L8.96629 9.37822C9.02742 9.21038 9.17345 9.08788 9.34937 9.05689L12.1515 8.5636C12.3273 8.53263 12.5062 8.59764 12.621 8.73439L14.4498 10.9146C14.5645 11.0515 14.5974 11.239 14.5363 11.4068L13.563 14.0803Z" fill={hexFill} stroke={gd} />
    </svg>
  )
}

/* ── RohOrnament ────────────────────────────────────────────────────────────
   Rohový ornament + vertikální sestup — závorka v rohu + část SideOrnamant.
   viewBox 25×46. Varianta ornament='roh' na DonjonButton, DonjonCard, DonjonModal.
   ──────────────────────────────────────────────────────────────────────── */
export function RohOrnament({ h, uid: uidProp, flip, bottom, color, colorDim, bgFill, style: styleProp }) {
  const uid = useOrnamentUid(uidProp)
  const w  = Math.round(25 * (h / 66) * 10) / 10
  const rh = Math.round(46 * (h / 66) * 10) / 10
  const gv = `url(#${uid}-v)`
  const gh = `url(#${uid}-h)`
  const hexFill = bgFill ?? bg4

  /* Variant-aware barvy: color override default zlaté.
     colorDim derivuje z color přes alpha pokud není explicit. */
  const stopMain = color ?? gold
  // Když je předán jen 'color', oba stopy mají stejnou barvu → solid fill.
  // Alpha-fade by na tmavém bg dělala spodek ornamentu skoro neviditelný
  // (zejm. u už tmavých barev jako goldDim). Explicit 'colorDim' override
  // umožňuje vlastní gradient kdyby caller chtěl.
  const stopDim  = colorDim ?? (color ?? goldDim)

  /* Transform kombinuje horizontální (flip) a vertikální (bottom) zrcadlení */
  const sx = flip ? -1 : 1
  const sy = bottom ? -1 : 1
  const baseTransform = (flip || bottom) ? `scale(${sx}, ${sy})` : undefined
  const gd = `url(#${uid}-d)`

  return (
    <svg
      width={w} height={rh}
      viewBox="0 0 25 46"
      fill="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        /* Offset škáluje s h — větší cx (= větší diagonální řez octagonu)
           potřebuje větší offset, aby ornament seděl na hraně.
             cx ≤ 12 (h ≤ 32) → 2
             cx 14–18 (h 37–48) → 3
             cx ≥ 20 (h ≥ 53)  → 4+ */
        [bottom ? 'bottom' : 'top']: Math.max(1, Math.round(h / 14)),
        [flip ? 'right' : 'left']: 1,
        transform: baseTransform,
        pointerEvents: 'none',
        ...styleProp,
      }}
    >
      <defs>
        {/* vertical main→dim top to bottom */}
        <linearGradient id={`${uid}-v`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
        {/* horizontal for diamond stroke (bottom-right to top-left) */}
        <linearGradient id={`${uid}-h`} x1="1" y1="1" x2="0" y2="0" gradientUnits="objectBoundingBox">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
        {/* diagonal for corner accent (top-right to bottom-left) */}
        <linearGradient id={`${uid}-d`} x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
      </defs>

      {/* corner accent — diagonal lines at top */}
      <path d="M19.5634 14.9999C19.6336 14.9385 19.7285 14.9072 19.8247 14.9103C19.9211 14.9136 20.0108 14.951 20.0767 15.0169C20.1426 15.0828 20.18 15.1725 20.1833 15.2689C20.1864 15.365 20.1551 15.46 20.0937 15.5302C19.9901 15.6485 19.8865 15.7669 19.783 15.8852C18.1261 17.7777 16.4693 19.6701 14.8124 21.5626L15.0778 20.9219C15.0987 21.2364 15.1196 21.5509 15.1404 21.8654C15.1509 22.0223 15.1613 22.1792 15.1717 22.3361C15.1895 22.6013 15.0998 22.8557 14.912 23.0432C14.7247 23.2308 14.4548 23.3361 14.1717 23.3361C13.8886 23.3361 13.6186 23.2308 13.4314 23.0432C13.2435 22.8557 13.1538 22.6013 13.1717 22.3361C13.1821 22.1792 13.1925 22.0223 13.2029 21.8654C13.2238 21.5509 13.2447 21.2364 13.2656 20.9219C13.2774 20.743 13.396 20.3993 13.531 20.2812C15.4235 18.6243 17.3159 16.9675 19.2084 15.3106C19.3267 15.2071 19.4451 15.1035 19.5634 14.9999Z" fill={gd} />

      {/* lower tick */}
      <path d="M11.0894 35.3853C11.0956 35.4784 11.1405 35.5677 11.2107 35.6336C11.2811 35.6995 11.3711 35.7365 11.4644 35.7365C11.5576 35.7365 11.6476 35.6995 11.718 35.6336C11.7882 35.5677 11.8332 35.4784 11.8394 35.3853C11.8498 35.2263 11.8602 35.0674 11.8706 34.9085C12.0376 32.3607 12.2046 29.8129 12.3717 27.2651L12.1059 27.9067C12.3414 27.7002 12.5768 27.4937 12.8123 27.2872C12.932 27.1822 13.0517 27.0772 13.1715 26.9722C13.3715 26.7972 13.4877 26.5537 13.4875 26.2883C13.4877 26.0233 13.3715 25.758 13.1715 25.558C12.9715 25.358 12.7062 25.2418 12.4412 25.242C12.1758 25.2418 11.9323 25.358 11.7572 25.558C11.6523 25.6778 11.5473 25.7975 11.4423 25.9172C11.2358 26.1527 11.0293 26.3881 10.8228 26.6236C10.7044 26.7586 10.5453 27.086 10.5571 27.2651C10.7241 29.8129 10.8911 32.3607 11.0581 34.9085C11.0685 35.0674 11.0789 35.2264 11.0894 35.3853Z" fill={gv} />

      {/* outer bracket */}
      <path d="M22.7295 0.530302C22.5527 0.353525 22.376 0.176748 22.1992 -2.83122e-05C21.5424 0.597831 20.8871 1.19716 20.2333 1.79797C14.3487 7.20522 8.58348 12.7318 2.93758 18.3777C2.87747 18.4378 2.81737 18.4979 2.75729 18.5581L2.4646 18.8505L2.46441 19.2651C2.46797 27.1646 2.6367 35.0641 2.97061 42.9636C3.00811 43.8508 3.04769 44.738 3.08936 45.6251C3.33936 45.6251 3.58936 45.6251 3.83936 45.6251C3.88102 44.738 3.92061 43.8508 3.95811 42.9636C4.29201 35.0641 4.46074 27.1646 4.4643 19.2651L4.17142 19.9722C4.23156 19.9121 4.29168 19.852 4.35179 19.7919C9.99769 14.146 15.5243 8.38079 20.9315 2.49624C21.5323 1.8424 22.1317 1.18709 22.7295 0.530302Z" fill={gv} />

      {/* inner bracket */}
      <path d="M24.7304 4.52969C24.7952 4.45743 24.8323 4.36325 24.8312 4.26541C24.83 4.1676 24.7911 4.07452 24.7224 4.00617C24.6538 3.93783 24.5605 3.89932 24.4627 3.89863C24.3648 3.89792 24.2708 3.93548 24.1989 4.00059C23.6038 4.53939 23.0102 5.07965 22.418 5.62139C17.0888 10.497 11.8792 15.4917 6.78915 20.6054C6.7114 20.6835 6.63368 20.7617 6.55599 20.8398L6.26506 21.1317L6.26477 21.5452C6.26984 28.6502 6.43855 35.7551 6.7709 42.8601C6.8084 43.6618 6.84798 44.4635 6.88965 45.2651C6.89472 45.362 6.93484 45.455 7.00469 45.5235C7.07451 45.592 7.16777 45.6305 7.26465 45.6305C7.36153 45.6305 7.45479 45.592 7.52461 45.5235C7.59445 45.455 7.63458 45.362 7.63965 45.2651C7.68132 44.4635 7.7209 43.6618 7.7584 42.8601C8.09074 35.7551 8.25945 28.6502 8.26453 21.5452L7.97331 22.2506C8.05112 22.1725 8.12889 22.0945 8.20664 22.0163C13.2967 16.9026 18.2671 11.6699 23.1179 6.31803C23.6569 5.72339 24.1944 5.12727 24.7304 4.52969Z" fill={gv} />

      {/* diamond */}
      <path d="M8.42823 21.6878C8.42823 21.8664 8.33293 22.0315 8.17823 22.1208L5.71407 23.5431C5.55943 23.6324 5.36908 23.6326 5.21441 23.5433L2.74996 22.1205C2.59536 22.0311 2.5003 21.8662 2.5003 21.6877L2.50001 18.8425C2.50001 18.6638 2.59532 18.4988 2.75001 18.4095L5.21417 16.9871C5.36881 16.8978 5.55916 16.8977 5.71383 16.9869L8.17828 18.4098C8.33288 18.4991 8.42794 18.664 8.42794 18.8426L8.42823 21.6878Z" fill={hexFill} stroke={gh} />

      {/* top small rect */}
      <rect x="16.6445" y="12.1652" width="2.04" height="2.04" rx="0.5" transform="rotate(90 16.6445 12.1652)" fill={gv} stroke={gv} />

      {/* bottom small rect (rotated 135°) */}
      <rect x="8.85637" y="33.7852" width="2.04" height="2.04" rx="0.5" transform="rotate(135 8.85637 33.7852)" fill={gv} stroke={gv} />
    </svg>
  )
}

export function HexOrnament({
  uid: uidProp,
  flip,
  edgePadL = 16,
  edgePadR,
  textPadL,
  textPadR,
  hexOffsetX = 0,
  color,
  colorDim,
  bgFill,        // barva výplně hexagonu — default bg4 (tmavá). Pro selected
                 // stavy s tinted bg by měla odpovídat efektivnímu bg komponenty.
  style: styleProp,
}) {
  const uid   = useOrnamentUid(uidProp)
  const g     = `url(#${uid}-hg)`
  const padR  = edgePadR  ?? edgePadL
  const innerL = textPadL != null ? textPadL + 2 : '23%'
  const innerR = textPadR != null ? textPadR + 2 : '23%'
  const hexFill  = bgFill ?? bg4
  const stopMain = color ?? gold
  // Když je předán jen 'color', oba stopy mají stejnou barvu → solid fill.
  // Alpha-fade by na tmavém bg dělala spodek ornamentu skoro neviditelný
  // (zejm. u už tmavých barev jako goldDim). Explicit 'colorDim' override
  // umožňuje vlastní gradient kdyby caller chtěl.
  const stopDim  = colorDim ?? (color ?? goldDim)

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
        ...styleProp,
      }}
    >
      {/* outer line */}
      <div style={{
        position: 'absolute',
        left: edgePadL + 1,
        right: padR + 1,
        top: 2,
        height: 1,
        background: `linear-gradient(90deg,${stopDim} 0%,${stopMain} 50%,${stopDim} 100%)`,
      }} />
      {/* inner line */}
      <div style={{
        position: 'absolute',
        left: innerL,
        right: innerR,
        bottom: 1,
        height: 1,
        background: `linear-gradient(90deg,${stopDim} 0%,${stopMain} 50%,${stopDim} 100%)`,
      }} />
      {/* hexagon */}
      <svg
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: `translateX(calc(-50% + ${hexOffsetX}px))`,
        }}
        width="10.14" height="7"
        viewBox="18.65 0 5.07 7"
        fill="none"
      >
        <defs>
          <linearGradient id={`${uid}-hg`} x1="21.1848" y1="0" x2="21.1848" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor={stopMain} />
            <stop offset="1" stopColor={stopDim} />
          </linearGradient>
        </defs>
        <path
          d="M20.9348 0.72168C21.0895 0.632366 21.2801 0.632366 21.4348 0.72168L23.4661 1.89453C23.6206 1.98384 23.716 2.14867 23.7161 2.32715V4.67285C23.716 4.85133 23.6206 5.01616 23.4661 5.10547L21.4348 6.27832C21.2801 6.36763 21.0895 6.36763 20.9348 6.27832L18.9036 5.10547C18.749 5.01616 18.6536 4.85133 18.6536 4.67285V2.32715C18.6536 2.14867 18.749 1.98384 18.9036 1.89453L20.9348 0.72168Z"
          fill={hexFill}
          stroke={g}
        />
      </svg>
    </div>
  )
}

/* ── ScoopOrnament ──────────────────────────────────────────────────────────
   Dekorativní ornament pro konkávní (scoop) rohy z ScoopClip.
   Kopíruje tvar výřezu — paralelní zlatý oblouk uvnitř shape s diamond
   na vrcholu a krátkými ticky na koncích.

   Geometrie: scoop je čtvrtkruh poloměru `r` vystřižený z rohu.
   Ornament je SVG `r × r` umístěné absolutně do daného rohu shape.
   Oblouk uvnitř SVG má poloměr `r - inset` (default inset=4) → leží
   uvnitř viditelné plochy, blízko hrany výřezu.

   Vykreslení je vždy ve „top-left" orientaci v lokálních SVG souřadnicích;
   rotace pro ostatní rohy se aplikuje přes CSS `transform: rotate()`
   se středem otáčení na střed SVG (default).

   Props:
     r         - poloměr scoop výřezu v px (= cornerSize ScoopClip v circle módu)
     corner    - 'tl' | 'tr' | 'bl' | 'br' (default 'tl')
     color     - barva ornamentu (override default gold)
     colorDim  - solidní druhá stop gradientu (default = color ?? goldDim)
     bgFill    - výplň diamond (default bg4)
     inset     - vzdálenost oblouku od scoop hrany v px (default 4)
     uid       - explicitní ID prefix (default useId)
     style     - merge styling pro absolute pozici
   ─────────────────────────────────────────────────────────────────────── */
/**
 * Hand-designed SVG paths (originál: /public/ScoopClip-ornament.svg, 11×11 viewBox).
 *
 * Originální orientace: corner='tl' — carved (parent) corner v SVG (0,0),
 * scoop center v SVG (11,11) (uvnitř shape). Curve bracket trace scoop
 * boundary, diamond sedí blíže k carved rohu.
 *
 * Pro ostatní rohy: scaleX/Y flip přes inner <g>. Design 'tl' se zrcadlí
 * tak, aby carved corner zůstal vůči SVG layoutu na správné straně:
 *   tr: horizontal flip — design (0,0) → SVG (11,0)
 *   bl: vertical flip   — design (0,0) → SVG (0,11)
 *   br: both (180° rot) — design (0,0) → SVG (11,11)
 */
const SCOOP_TRANSFORMS = {
  tl: '',                               // originál
  tr: 'translate(11 0) scale(-1 1)',    // horizontal flip
  bl: 'translate(0 11) scale(1 -1)',    // vertical flip
  br: 'translate(11 11) scale(-1 -1)',  // both = 180° rotation
}

/**
 * Maximální velikost SVG ornamentu v pixelech.
 *
 * Ornament je dekorativní akcent — nemá růst lineárně s r. Pro r=10
 * je `r` (= 10 px) ideální, ale při r=40 by ornament byl 4× větší a
 * vizuálně dominoval rohu. Cap udrží ornament v subtle range.
 *
 * Pro r ≤ MAX_SIZE se použije r (ornament „sedí" v rohu).
 * Pro r > MAX_SIZE se použije MAX_SIZE (ornament je drobný akcent).
 */
const SCOOP_ORNAMENT_MAX_SIZE = 14

export function ScoopOrnament({
  r,
  corner = 'tl',
  color,
  colorDim,
  bgFill,
  // `inset` deprecated — hand-designed paths mají vlastní inset
  // eslint-disable-next-line no-unused-vars
  inset,
  /** Override pro maximální velikost ornamentu (default 14px) */
  maxSize = SCOOP_ORNAMENT_MAX_SIZE,
  uid: uidProp,
  style: styleProp,
}) {
  const uid      = useOrnamentUid(uidProp)
  const stopMain = color    ?? gold       // #FFC183 default
  const stopDim  = colorDim ?? (color ?? goldDim)  // #8F7458 default
  const hexFill  = bgFill   ?? '#2A2948'  // borderMid — originál SVG default

  const transform = SCOOP_TRANSFORMS[corner] ?? ''

  // Velikost SVG cappnutá maxSize — ornament zůstane drobný akcent
  // pro velké r místo aby rostl proporcionálně s rohem.
  const svgSize  = Math.min(r, maxSize)

  // Pozice SVG v parentu — odsazení škáluje s r aby ornament zůstal
  // v carved region pro velké r (parent musí mít position: relative).
  //   r=10 → 3px (30% — uživatel chce zachovat)
  //   r=16 → 5px, r=22 → 7px, r=30 → 9px, r=40 → 12px
  // Bez tohoto škálování byl ornament při r ≥ 16 částečně oříznut scoop
  // curvou (3px ze 16/22/40 = jen 19/14/8 % rohu → ornament v carved zóně).
  const edgeInset = Math.max(3, Math.round(r * 0.3))
  const posStyle = {
    [corner.startsWith('t') ? 'top'  : 'bottom']: edgeInset,
    [corner.endsWith('l')   ? 'left' : 'right' ]: edgeInset,
  }

  // 2 unikátní IDs pro 2 gradient defy
  const g0 = `${uid}-g0`
  const g1 = `${uid}-g1`

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...posStyle,
        pointerEvents: 'none',
        ...styleProp,
      }}
    >
      <defs>
        <linearGradient id={g0} x1="5.345" y1="0.345" x2="5.345" y2="9.345" gradientUnits="userSpaceOnUse">
          <stop stopColor={stopDim} />
          <stop offset="1" stopColor={stopMain} />
        </linearGradient>
        <linearGradient id={g1} x1="8.928" y1="8.678" x2="5.547" y2="5.296" gradientUnits="userSpaceOnUse">
          <stop stopColor={stopMain} />
          <stop offset="1" stopColor={stopDim} />
        </linearGradient>
      </defs>

      <g transform={transform}>
        {/* Hlavní bracket curve — paralelní se scoop hranou */}
        <path
          d="M10.72 0.34491C10.7045 0.253431 10.6626 0.165698 10.5939 0.101013C10.5253 0.0363275 10.4366 -1.24574e-05 10.345 -1.24574e-05C10.2534 -1.24574e-05 10.1646 0.0363275 10.096 0.101013C10.0273 0.165698 9.98542 0.253431 9.96997 0.34491C9.92828 0.583968 9.87799 0.816198 9.81938 1.04631C9.28999 3.11577 8.10258 4.80917 6.57885 6.11309C5.04895 7.41643 3.17185 8.34728 1.05911 8.82752C0.82281 8.88077 0.58745 8.92821 0.344971 8.96991C0.253492 8.98536 0.165759 9.02723 0.101074 9.09594C0.0363886 9.16459 4.87566e-05 9.25329 4.87566e-05 9.34491C4.87566e-05 9.43652 0.0363886 9.52523 0.101074 9.59387C0.165759 9.66259 0.253492 9.70446 0.344971 9.71991C0.604024 9.76154 0.861255 9.79273 1.12458 9.81285C3.47841 10.0046 5.99787 9.24895 7.87795 7.63373C9.76831 6.04805 10.946 3.54754 10.8028 1.13599C10.7895 0.869043 10.7616 0.606662 10.72 0.34491Z"
          fill={`url(#${g0})`}
        />
        {/* Diamond/oktagon v rohu — kompaktní verze */}
        <path
          d="M8.5947 7.99041C8.54849 8.16284 8.41353 8.29764 8.24114 8.34396L7.04652 8.66437C6.87415 8.71049 6.6901 8.6613 6.56384 8.53524L5.68962 7.66102C5.56333 7.53473 5.5136 7.35017 5.5598 7.17765L5.88021 5.98302C5.92655 5.81068 6.06136 5.67567 6.23376 5.62947L7.42769 5.30975C7.60024 5.26352 7.78476 5.31326 7.91107 5.43957L8.78528 6.31379C8.91138 6.44009 8.96061 6.62406 8.91441 6.79647L8.5947 7.99041Z"
          fill={hexFill}
          stroke={`url(#${g1})`}
        />
      </g>
    </svg>
  )
}
