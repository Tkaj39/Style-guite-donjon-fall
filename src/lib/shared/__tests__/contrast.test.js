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
  it('parses 6-character hex', () => {
    expect(parseHex('#FF8040')).toEqual({ r: 255, g: 128, b: 64 })
  })
  it('parses shorthand 3-character hex', () => {
    expect(parseHex('#F84')).toEqual({ r: 255, g: 136, b: 68 })
  })
  it('parses 8-character hex (ignores alpha)', () => {
    expect(parseHex('#FF8040AA')).toEqual({ r: 255, g: 128, b: 64 })
  })
  it('parses without # prefix', () => {
    expect(parseHex('FF8040')).toEqual({ r: 255, g: 128, b: 64 })
  })
  it('returns null for invalid input', () => {
    expect(parseHex('xyz')).toBeNull()
    expect(parseHex(null)).toBeNull()
    expect(parseHex(undefined)).toBeNull()
    expect(parseHex('#12345')).toBeNull()
  })
})

describe('relativeLuminance', () => {
  it('black has luminance 0', () => {
    expect(relativeLuminance('#000000')).toBe(0)
  })
  it('white has luminance 1', () => {
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 5)
  })
  it('luminance increases with brightness', () => {
    const dark  = relativeLuminance('#222222')
    const mid   = relativeLuminance('#808080')
    const light = relativeLuminance('#DDDDDD')
    expect(dark).toBeLessThan(mid)
    expect(mid).toBeLessThan(light)
  })
})

describe('contrastRatio', () => {
  it('white on black = 21:1 (max)', () => {
    expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 0)
  })
  it('identical colors = 1:1 (min)', () => {
    expect(contrastRatio('#888888', '#888888')).toBe(1)
  })
  it('is symmetric (ratio does not depend on order)', () => {
    expect(contrastRatio('#AAAAAA', '#333333'))
      .toBe(contrastRatio('#333333', '#AAAAAA'))
  })
})

describe('isLightBg', () => {
  it('white is light', () => {
    expect(isLightBg('#FFFFFF')).toBe(true)
  })
  it('black is not light', () => {
    expect(isLightBg('#000000')).toBe(false)
  })
  it('tkajui textHigh (#eeeef8) is light', () => {
    expect(isLightBg('#eeeef8')).toBe(true)
  })
  it('tkajui surface0 (#0d0d14) is dark', () => {
    expect(isLightBg('#0d0d14')).toBe(false)
  })
  it('donjon textHigh (#E8DDD0) is light', () => {
    expect(isLightBg('#E8DDD0')).toBe(true)
  })
})

describe('meetsContrast', () => {
  it('white on black meets AAA', () => {
    expect(meetsContrast('#FFFFFF', '#000000', 'AAA')).toBe(true)
  })
  it('identical colors do not meet AA', () => {
    expect(meetsContrast('#888', '#888', 'AA')).toBe(false)
  })
  it('large text has a lower threshold', () => {
    // light grey on white — fails normal, passes large
    const fg = '#7A7A7A', bg = '#FFFFFF'
    const ratio = contrastRatio(fg, bg)
    expect(ratio).toBeGreaterThan(3.0)
    expect(ratio).toBeLessThan(4.5)
    expect(meetsContrast(fg, bg, 'AA', 'large')).toBe(true)
    expect(meetsContrast(fg, bg, 'AA', 'normal')).toBe(false)
  })
})

describe('pickContrastText', () => {
  it('returns onDark for a dark background', () => {
    expect(pickContrastText('#111111', { onLight: '#000', onDark: '#FFF' }))
      .toBe('#FFF')
  })
  it('returns onLight for a light background', () => {
    expect(pickContrastText('#EEEEEE', { onLight: '#000', onDark: '#FFF' }))
      .toBe('#000')
  })
  it('default fallback works without options', () => {
    const onDark  = pickContrastText('#000000')
    const onLight = pickContrastText('#FFFFFF')
    expect(onDark).not.toBe(onLight)
  })
  it('tkajui textHigh as background → returns onLight (dark text)', () => {
    const res = pickContrastText('#eeeef8', {
      onDark: '#FFF', onLight: '#111',
    })
    expect(res).toBe('#111')
  })
})

describe('bestContrast', () => {
  it('picks the color with the higher contrast', () => {
    // On a white background: white vs. black → black wins
    expect(bestContrast('#FFFFFF', '#FFFFFF', '#000000')).toBe('#000000')
    expect(bestContrast('#000000', '#FFFFFF', '#000000')).toBe('#FFFFFF')
  })
})
