import { describe, it, expect } from 'vitest'
import { hexFlatTop, hexPointyTop, regularPolygon } from '../polygon'

describe('hexFlatTop', () => {
  it('vrátí 6-bodový polygon string', () => {
    const out = hexFlatTop(8)
    expect(out.startsWith('polygon(')).toBe(true)
    expect(out.endsWith(')')).toBe(true)
    const commas = out.match(/,/g)?.length ?? 0
    expect(commas).toBe(5)  // 6 vrcholů = 5 čárek
  })

  it('používá indent v px pro horizontal points', () => {
    const out = hexFlatTop(12)
    expect(out).toContain('12px 0%')
    expect(out).toContain('calc(100% - 12px) 0%')
  })

  it('má plochý vrch a spodek (0% a 100% y na 4 vrcholech)', () => {
    const out = hexFlatTop(8)
    expect(out).toContain('0%')
    expect(out).toContain('100%')
  })
})

describe('hexPointyTop', () => {
  it('vrátí fixní 6-bodový polygon', () => {
    const out = hexPointyTop()
    expect(out.startsWith('polygon(')).toBe(true)
    expect(out).toContain('50% 0%')   // top point
    expect(out).toContain('50% 100%') // bottom point
  })

  it('vrací stejný string napříč voláními', () => {
    expect(hexPointyTop()).toBe(hexPointyTop())
  })
})

describe('regularPolygon', () => {
  it('hexagon = 6 stran', () => {
    const out = regularPolygon(6)
    const commas = out.match(/,/g)?.length ?? 0
    expect(commas).toBe(5)
  })

  it('triangle = 3 strany', () => {
    const out = regularPolygon(3)
    const commas = out.match(/,/g)?.length ?? 0
    expect(commas).toBe(2)
  })

  it('octagon = 8 stran', () => {
    const out = regularPolygon(8)
    const commas = out.match(/,/g)?.length ?? 0
    expect(commas).toBe(7)
  })

  it('první vrchol nahoře (default rotation 0)', () => {
    const out = regularPolygon(6)
    expect(out).toContain('50.00% 0.00%')  // vrchol nahoře
  })

  it('rotace π/6 dá flat-top hex', () => {
    const out = regularPolygon(6, { rotation: Math.PI / 6 })
    // Flat-top hex má první vrchol vpravo nahoře (ne přímo nahoře)
    expect(out).not.toMatch(/^polygon\(50\.00% 0\.00%/)
  })

  it('méně než 3 strany hodí chybu', () => {
    expect(() => regularPolygon(2)).toThrow()
  })
})
