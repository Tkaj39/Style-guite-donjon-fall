import { describe, it, expect } from 'vitest'
import {
  parseHex,
  relativeLuminance,
  contrastRatio,
  isLightBg,
  meetsContrast,
  pickContrastText,
  bestContrast,
} from '../contrast'

describe('parseHex', () => {
  it('parsuje 6-znakový hex', () => {
    expect(parseHex('#FF8040')).toEqual({ r: 255, g: 128, b: 64 })
  })
  it('parsuje 3-znakový zkrácený hex', () => {
    expect(parseHex('#F84')).toEqual({ r: 255, g: 136, b: 68 })
  })
  it('parsuje 8-znakový hex (ignoruje alpha)', () => {
    expect(parseHex('#FF8040AA')).toEqual({ r: 255, g: 128, b: 64 })
  })
  it('parsuje bez # prefixu', () => {
    expect(parseHex('FF8040')).toEqual({ r: 255, g: 128, b: 64 })
  })
  it('vrátí null pro neplatný vstup', () => {
    expect(parseHex('xyz')).toBeNull()
    expect(parseHex(null)).toBeNull()
    expect(parseHex(undefined)).toBeNull()
    expect(parseHex('#12345')).toBeNull()
  })
})

describe('relativeLuminance', () => {
  it('černá má luminance 0', () => {
    expect(relativeLuminance('#000000')).toBe(0)
  })
  it('bílá má luminance 1', () => {
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 5)
  })
  it('luminance roste s jasem', () => {
    const dark  = relativeLuminance('#222222')
    const mid   = relativeLuminance('#808080')
    const light = relativeLuminance('#DDDDDD')
    expect(dark).toBeLessThan(mid)
    expect(mid).toBeLessThan(light)
  })
})

describe('contrastRatio', () => {
  it('bílá na černé = 21:1 (max)', () => {
    expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 0)
  })
  it('shodné barvy = 1:1 (min)', () => {
    expect(contrastRatio('#888888', '#888888')).toBe(1)
  })
  it('symetrický (poměr nezávisí na pořadí)', () => {
    expect(contrastRatio('#AAAAAA', '#333333'))
      .toBe(contrastRatio('#333333', '#AAAAAA'))
  })
})

describe('isLightBg', () => {
  it('bílá je světlá', () => {
    expect(isLightBg('#FFFFFF')).toBe(true)
  })
  it('černá není světlá', () => {
    expect(isLightBg('#000000')).toBe(false)
  })
  it('textHigh tkajui (#eeeef8) je světlé', () => {
    expect(isLightBg('#eeeef8')).toBe(true)
  })
  it('surface0 tkajui (#0d0d14) je tmavé', () => {
    expect(isLightBg('#0d0d14')).toBe(false)
  })
  it('donjon textHigh (#E8DDD0) je světlé', () => {
    expect(isLightBg('#E8DDD0')).toBe(true)
  })
})

describe('meetsContrast', () => {
  it('bílá na černé splňuje AAA', () => {
    expect(meetsContrast('#FFFFFF', '#000000', 'AAA')).toBe(true)
  })
  it('shodné barvy nesplňují AA', () => {
    expect(meetsContrast('#888', '#888', 'AA')).toBe(false)
  })
  it('large text má nižší práh', () => {
    // light grey na bílé — nesplní normal, splní large
    const fg = '#7A7A7A', bg = '#FFFFFF'
    const ratio = contrastRatio(fg, bg)
    expect(ratio).toBeGreaterThan(3.0)
    expect(ratio).toBeLessThan(4.5)
    expect(meetsContrast(fg, bg, 'AA', 'large')).toBe(true)
    expect(meetsContrast(fg, bg, 'AA', 'normal')).toBe(false)
  })
})

describe('pickContrastText', () => {
  it('vrátí onDark pro tmavé pozadí', () => {
    expect(pickContrastText('#111111', { onLight: '#000', onDark: '#FFF' }))
      .toBe('#FFF')
  })
  it('vrátí onLight pro světlé pozadí', () => {
    expect(pickContrastText('#EEEEEE', { onLight: '#000', onDark: '#FFF' }))
      .toBe('#000')
  })
  it('default fallback funguje bez options', () => {
    const onDark  = pickContrastText('#000000')
    const onLight = pickContrastText('#FFFFFF')
    expect(onDark).not.toBe(onLight)
  })
  it('textHigh tkajui jako pozadí → vrátí onLight (tmavý text)', () => {
    const res = pickContrastText('#eeeef8', {
      onDark: '#FFF', onLight: '#111',
    })
    expect(res).toBe('#111')
  })
})

describe('bestContrast', () => {
  it('vybere barvu s vyšším kontrastem', () => {
    // Na bílém pozadí: bílá vs. černá → černá vyhraje
    expect(bestContrast('#FFFFFF', '#FFFFFF', '#000000')).toBe('#000000')
    expect(bestContrast('#000000', '#FFFFFF', '#000000')).toBe('#FFFFFF')
  })
})
