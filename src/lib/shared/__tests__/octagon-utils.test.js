import { describe, it, expect } from 'vitest'
import {
  octagon,
  octagonPerCorner,
  octagonInner,
  octagonInnerPerCorner,
  octagonWithNotch,
  octagonWithNotches,
  notchClamp,
  NOTCH_SHAPES,
  scoopBBPath,
  scoopCirclePath,
  scoopPath,
  SHAPE_SIZES,
} from '../octagon'

describe('octagon', () => {
  it('vrátí 8-bodový polygon s cx zkosením', () => {
    const out = octagon(12)
    expect(out.startsWith('polygon(')).toBe(true)
    expect(out).toContain('12px')
    expect(out).toContain('calc(100% - 12px)')
  })

  it('octagon(0) je v podstatě rectangle (4 rohy v 0px)', () => {
    const out = octagon(0)
    expect(out).toContain('0px 0px')
  })
})

describe('octagonPerCorner', () => {
  it('podporuje různé cx pro každý roh', () => {
    const out = octagonPerCorner({ tl: 20, tr: 10, br: 14, bl: 16 })
    expect(out).toContain('20px 0px')         // tl
    expect(out).toContain('calc(100% - 10px) 0px') // tr
    expect(out).toContain('calc(100% - 14px) 100%') // br
    expect(out).toContain('16px 100%')        // bl
  })

  it('chybějící rohy default na 0', () => {
    const out = octagonPerCorner({ tl: 10 })
    expect(out).toContain('10px 0px')
    expect(out).toContain('0px 100%')
  })
})

describe('octagonInner', () => {
  it('vrátí octagon o border tloušťku menší', () => {
    expect(octagonInner(16)).toBe(octagon(15))
    expect(octagonInner(16, 2)).toBe(octagon(14))
  })

  it('clampuje na 0 pro malé cx', () => {
    expect(octagonInner(0)).toBe(octagon(0))
    expect(octagonInner(1, 5)).toBe(octagon(0))
  })
})

describe('octagonInnerPerCorner', () => {
  it('zmenší všechny rohy o border', () => {
    const out = octagonInnerPerCorner({ tl: 20, tr: 10, br: 14, bl: 16 })
    expect(out).toBe(octagonPerCorner({ tl: 19, tr: 9, br: 13, bl: 15 }))
  })
})

describe('octagonWithNotch — V shape (default)', () => {
  it('vytváří validní polygon string', () => {
    const out = octagonWithNotch(12, 28, 14, 'bottom')
    expect(out.startsWith('polygon(')).toBe(true)
    expect(out.endsWith(')')).toBe(true)
  })

  it('respektuje notchOffset = 0.25', () => {
    const out = octagonWithNotch(12, 28, 14, 'bottom', 0.25)
    expect(out).toContain('25%')
  })

  it('clampuje notchOffset > 1 na 1', () => {
    const out = octagonWithNotch(12, 28, 14, 'bottom', 2)
    expect(out).toContain('100%')
  })

  it('clampuje notchOffset < 0 na 0', () => {
    const out = octagonWithNotch(12, 28, 14, 'bottom', -0.5)
    expect(out).toContain('0%')
  })

  it('všechny 4 strany generují validní polygon', () => {
    for (const side of ['top', 'bottom', 'left', 'right']) {
      const out = octagonWithNotch(12, 28, 14, side)
      expect(out.startsWith('polygon(')).toBe(true)
    }
  })
})

describe('octagonWithNotch — shape varianty', () => {
  it('V má 3 body navíc', () => {
    const base = octagon(12)
    const v = octagonWithNotch(12, 28, 14, 'bottom', 0.5, 'v')
    // V přidává 3 body do polygonu
    const basePoints = base.match(/,/g)?.length ?? 0
    const vPoints = v.match(/,/g)?.length ?? 0
    expect(vPoints - basePoints).toBe(3)
  })

  it('square má 4 body navíc', () => {
    const base = octagon(12)
    const sq = octagonWithNotch(12, 28, 14, 'bottom', 0.5, 'square')
    const basePoints = base.match(/,/g)?.length ?? 0
    const sqPoints = sq.match(/,/g)?.length ?? 0
    expect(sqPoints - basePoints).toBe(4)
  })

  it('trapezoid má 4 body navíc', () => {
    const base = octagon(12)
    const tr = octagonWithNotch(12, 28, 14, 'bottom', 0.5, 'trapezoid')
    const basePoints = base.match(/,/g)?.length ?? 0
    const trPoints = tr.match(/,/g)?.length ?? 0
    expect(trPoints - basePoints).toBe(4)
  })

  it('neznámý shape padá zpět na V', () => {
    const v = octagonWithNotch(12, 28, 14, 'bottom', 0.5, 'v')
    const unknown = octagonWithNotch(12, 28, 14, 'bottom', 0.5, 'kruh')
    expect(unknown).toBe(v)
  })

  it('NOTCH_SHAPES exportuje validní hodnoty', () => {
    expect(NOTCH_SHAPES).toEqual(['v', 'square', 'trapezoid'])
  })
})

describe('octagonWithNotches — multi-notch', () => {
  it('prázdné pole vrátí čistý octagon', () => {
    const out = octagonWithNotches(12, [])
    expect(out).toBe(octagon(12))
  })

  it('jeden notch = stejný výstup jako octagonWithNotch', () => {
    const single = octagonWithNotch(12, 28, 14, 'top', 0.5, 'v')
    const multi  = octagonWithNotches(12, [{ side: 'top', offset: 0.5, nw: 28, nh: 14, shape: 'v' }])
    expect(multi).toBe(single)
  })

  it('podporuje notche na všech 4 stranách najednou', () => {
    const out = octagonWithNotches(12, [
      { side: 'top',    offset: 0.5, nw: 20, nh: 10 },
      { side: 'right',  offset: 0.5, nw: 20, nh: 10 },
      { side: 'bottom', offset: 0.5, nw: 20, nh: 10 },
      { side: 'left',   offset: 0.5, nw: 20, nh: 10 },
    ])
    expect(out.startsWith('polygon(')).toBe(true)
    // 4 notche × 3 body (V) = 12 navíc oproti baseline 8
    const commas = out.match(/,/g)?.length ?? 0
    expect(commas).toBe(7 + 4 * 3)
  })

  it('dva notche na stejné straně se seřadí podle offsetu', () => {
    const out = octagonWithNotches(12, [
      { side: 'top', offset: 0.75, nw: 16, nh: 8 },
      { side: 'top', offset: 0.25, nw: 16, nh: 8 },
    ])
    const idx25 = out.indexOf('25%')
    const idx75 = out.indexOf('75%')
    expect(idx25).toBeGreaterThan(0)
    expect(idx75).toBeGreaterThan(idx25)  // 25% má přijít před 75% v CW order
  })

  it('ignoruje nevalidní strany', () => {
    const out = octagonWithNotches(12, [{ side: 'middle', offset: 0.5, nw: 20, nh: 10 }])
    expect(out).toBe(octagon(12))  // notch s nevalidní stranou se ignoruje
  })
})

describe('notchClamp', () => {
  it('beze rozměrů vrací původní hodnoty', () => {
    const r = notchClamp({ cx: 12, nw: 28, nh: 14 })
    expect(r.nw).toBe(28)
    expect(r.nh).toBe(14)
    expect(r.warning).toBeUndefined()
  })

  it('clampuje nh > thickness/2', () => {
    const r = notchClamp({ cx: 12, nw: 28, nh: 50, side: 'bottom', width: 200, height: 60 })
    expect(r.nh).toBe(30)  // floor(60/2)
    expect(r.warning).toContain('nh')
  })

  it('clampuje nw + 2cx > sideLen', () => {
    const r = notchClamp({ cx: 12, nw: 100, nh: 10, side: 'bottom', width: 100, height: 60 })
    expect(r.nw).toBe(76)  // 100 - 2*12
    expect(r.warning).toContain('nw')
  })

  it('clampuje offset do [0, 1]', () => {
    expect(notchClamp({ cx: 12, nw: 20, nh: 10, offset: 2 }).offset).toBe(1)
    expect(notchClamp({ cx: 12, nw: 20, nh: 10, offset: -1 }).offset).toBe(0)
  })

  it('vertikální strana používá height jako sideLen, width jako thickness', () => {
    const r = notchClamp({ cx: 12, nw: 100, nh: 30, side: 'left', width: 60, height: 100 })
    // sideLen (left) = height = 100, takže nw + 2cx = 124 > 100 → clamp na 76
    expect(r.nw).toBe(76)
    // thickness (left) = width = 60, nh = 30 = 60/2 → OK
    expect(r.nh).toBe(30)
  })
})

describe('scoopBBPath — bezier responsive', () => {
  it('vrací SVG path s Q (quadratic bezier) komandy', () => {
    const p = scoopBBPath(0.25)
    expect(p).toContain('Q')
    expect(p.startsWith('M ')).toBe(true)
    expect(p.endsWith('Z')).toBe(true)
  })

  it('používá souřadnice v 0–1 rozsahu (objectBoundingBox)', () => {
    const p = scoopBBPath(0.25)
    expect(p).toContain('0.25')
    expect(p).toContain('0.75')   // 1 - 0.25
    expect(p).not.toContain('25px')
  })
})

describe('scoopCirclePath — pevný kruhový výřez', () => {
  it('používá A (arc) command místo Q', () => {
    const p = scoopCirclePath(170, 52, 13)
    expect(p).toContain('A ')
    expect(p).not.toContain('Q ')
  })

  it('používá absolutní pixely', () => {
    const p = scoopCirclePath(170, 52, 13)
    expect(p).toContain('13')
    expect(p).toContain('170')
    expect(p).toContain('52')
  })

  it('arc command má sweep-flag 0 (konkávní = scoop směr)', () => {
    const p = scoopCirclePath(170, 52, 13)
    // A rx ry x-axis-rot large-arc-flag sweep-flag x y
    // hledáme pattern "A 13,13 0 0,0"
    expect(p).toContain('A 13,13 0 0,0')
  })

  it('rx == ry (kruh, ne elipsa)', () => {
    const p = scoopCirclePath(200, 100, 15)
    expect(p).toContain('A 15,15')
  })
})

describe('Sjednocená terminologie — cornerSize napříč API', () => {
  it('notchClamp přijímá cornerSize jako preferovaný parametr', () => {
    const r = notchClamp({ cornerSize: 12, nw: 100, nh: 10, side: 'bottom', width: 100, height: 60 })
    expect(r.cx).toBe(12)
    expect(r.nw).toBe(76)  // 100 - 2*12
  })

  it('notchClamp zachovává cx jako backward-compat alias', () => {
    const r = notchClamp({ cx: 12, nw: 100, nh: 10, side: 'bottom', width: 100, height: 60 })
    expect(r.cx).toBe(12)
    expect(r.nw).toBe(76)
  })

  it('notchClamp cornerSize má přednost před cx pokud oba předány', () => {
    const r = notchClamp({ cornerSize: 14, cx: 12, nw: 100, nh: 10, side: 'bottom', width: 100, height: 60 })
    expect(r.cx).toBe(14)
    expect(r.nw).toBe(72)  // 100 - 2*14
  })
})

describe('SHAPE_SIZES — kalibrované hodnoty pro velikostní systém', () => {
  it('obsahuje 4 button velikosti + card', () => {
    expect(Object.keys(SHAPE_SIZES)).toEqual(['xs', 'sm', 'md', 'lg', 'card'])
  })

  it('xs/sm/md/lg mají konzistentní cut/h poměr ~0.30', () => {
    for (const key of ['xs', 'sm', 'md', 'lg']) {
      const { cut, h } = SHAPE_SIZES[key]
      expect(cut / h).toBeCloseTo(0.30, 1)
    }
  })

  it('xs/sm/md/lg mají scoop/h poměr 0.25', () => {
    for (const key of ['xs', 'sm', 'md', 'lg']) {
      const { scoop, h } = SHAPE_SIZES[key]
      expect(scoop / h).toBeCloseTo(0.25, 2)
    }
  })
})

