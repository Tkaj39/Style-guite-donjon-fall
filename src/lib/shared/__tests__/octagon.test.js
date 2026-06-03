import { describe, it, expect } from 'vitest'
import {
  octagon,
  clipLeft,
  clipRight,
  roundRect,
  pill,
  scoopPath,
  scoopBBPath,
  octagonWithNotch,
  SHAPE_SIZES,
} from '../octagon'

// ─── octagon ───────────────────────────────────────────────────────────────

describe('octagon', () => {
  it('vrací string začínající polygon(', () => {
    expect(octagon(10)).toMatch(/^polygon\(/)
  })

  it('obsahuje správnou cx hodnotu', () => {
    expect(octagon(9.61)).toContain('9.61px')
  })

  it('cx=0 necrashne', () => {
    expect(() => octagon(0)).not.toThrow()
  })

  it('výsledek má přesně 8 bodů (7 čárek)', () => {
    const result = octagon(10)
    // polygon(a b, c d, ...) — 8 bodů = 7 čárek
    const commas = (result.match(/,/g) || []).length
    expect(commas).toBe(7)
  })

  it('octagon(15.62) odpovídá SHAPE_SIZES md.cut', () => {
    expect(octagon(SHAPE_SIZES.md.cut)).toBe(octagon(15.62))
  })
})

// ─── clipLeft / clipRight ───────────────────────────────────────────────────

describe('clipLeft', () => {
  it('levý horní roh je zkosený (začíná cx hodnotou)', () => {
    expect(clipLeft(9)).toContain('9px 0px')
  })

  it('pravý horní roh NENÍ zkosený (obsahuje 100% 0px)', () => {
    expect(clipLeft(9)).toContain('100% 0px')
  })

  it('cx=0 necrashne', () => {
    expect(() => clipLeft(0)).not.toThrow()
  })
})

describe('clipRight', () => {
  it('levý horní roh NENÍ zkosený (začíná 0px 0px)', () => {
    expect(clipRight(9)).toContain('0px 0px')
  })

  it('pravý horní roh je zkosený (obsahuje calc(100% - cx))', () => {
    expect(clipRight(9)).toContain('calc(100% - 9px) 0px')
  })
})

describe('clipLeft vs clipRight', () => {
  it('jsou různé stringy', () => {
    expect(clipLeft(9)).not.toBe(clipRight(9))
  })
})

// ─── roundRect ─────────────────────────────────────────────────────────────

describe('roundRect', () => {
  it('vrací správný inset formát', () => {
    expect(roundRect(8)).toBe('inset(0 round 8px)')
  })

  it('r=0 → inset(0 round 0px)', () => {
    expect(roundRect(0)).toBe('inset(0 round 0px)')
  })
})

// ─── pill ──────────────────────────────────────────────────────────────────

describe('pill', () => {
  it('vrací inset(0 round 9999px)', () => {
    expect(pill()).toBe('inset(0 round 9999px)')
  })

  it('volání bez argumentů necrashne', () => {
    expect(() => pill()).not.toThrow()
  })
})

// ─── scoopPath ─────────────────────────────────────────────────────────────

describe('scoopPath', () => {
  it('vrací string začínající path(\'', () => {
    expect(scoopPath(170, 52, 13)).toMatch(/^path\('/)
  })

  it("vrací string končící Z')", () => {
    expect(scoopPath(170, 52, 13)).toMatch(/Z'\)$/)
  })

  it('path data začínají M r,0', () => {
    expect(scoopPath(170, 52, 13)).toContain('M 13,0')
  })

  it('obsahuje w-r a h-r hodnoty', () => {
    const result = scoopPath(170, 52, 13)
    expect(result).toContain('157') // w - r = 170 - 13
    expect(result).toContain('39')  // h - r = 52 - 13
  })

  it('referenční snapshot pro SHAPE_SIZES md', () => {
    const { w, h, scoop } = SHAPE_SIZES.md
    expect(scoopPath(w, h, scoop)).toBe(scoopPath(170, 52, 13))
  })

  it('r=0 necrashne', () => {
    expect(() => scoopPath(170, 52, 0)).not.toThrow()
  })

  it('r > w/2 necrashne (extrémní případ)', () => {
    expect(() => scoopPath(100, 50, 80)).not.toThrow()
  })
})

// ─── scoopBBPath ───────────────────────────────────────────────────────────

describe('scoopBBPath', () => {
  it('vrací string BEZ path( prefixu', () => {
    expect(scoopBBPath(0.25)).not.toContain("path('")
  })

  it('začíná M r,0', () => {
    expect(scoopBBPath(0.25)).toMatch(/^M 0\.25,0/)
  })

  it('končí Z', () => {
    expect(scoopBBPath(0.25)).toMatch(/Z$/)
  })

  it('r=0.25 → souřadnice jsou v rozsahu 0–1', () => {
    const result = scoopBBPath(0.25)
    const numbers = result.match(/[\d.]+/g).map(Number)
    numbers.forEach(n => {
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThanOrEqual(1)
    })
  })

  it('r=0 necrashne', () => {
    expect(() => scoopBBPath(0)).not.toThrow()
  })

  it('r=0.5 necrashne (krajní hodnota)', () => {
    expect(() => scoopBBPath(0.5)).not.toThrow()
  })
})

// ─── octagonWithNotch ──────────────────────────────────────────────────────

describe('octagonWithNotch', () => {
  it('bottom — obsahuje špičku notche', () => {
    const result = octagonWithNotch(12, 28, 14, 'bottom')
    expect(result).toContain('calc(100% - 14px)')
    expect(result).toContain('50%')
  })

  it('top — obsahuje špičku notche', () => {
    const result = octagonWithNotch(12, 28, 14, 'top')
    expect(result).toContain('14px')
    expect(result).toContain('50%')
  })

  it('left — obsahuje špičku notche', () => {
    const result = octagonWithNotch(12, 28, 14, 'left')
    expect(result).toContain('14px 50%')
  })

  it('right — obsahuje špičku notche', () => {
    const result = octagonWithNotch(12, 28, 14, 'right')
    expect(result).toContain('calc(100% - 14px) 50%')
  })

  it('notch je symetrický (nw/2 na obě strany)', () => {
    const result = octagonWithNotch(12, 28, 14, 'bottom')
    expect(result).toContain('calc(50% - 14px)')
    expect(result).toContain('calc(50% + 14px)')
  })

  it('neznámý side → fallback na octagon', () => {
    const result = octagonWithNotch(12, 28, 14, 'diagonal')
    expect(result).toBe(octagon(12))
  })

  it('výchozí parametry (jen cx) necrashne', () => {
    expect(() => octagonWithNotch(12)).not.toThrow()
  })

  it('nw=0 necrashne', () => {
    expect(() => octagonWithNotch(12, 0, 14, 'bottom')).not.toThrow()
  })
})

// ─── SHAPE_SIZES ───────────────────────────────────────────────────────────

describe('SHAPE_SIZES', () => {
  const keys = ['xs', 'sm', 'md', 'lg', 'card']
  const props = ['w', 'h', 'cut', 'round', 'scoop', 'bb']

  it('obsahuje všechny očekávané klíče', () => {
    keys.forEach(k => expect(SHAPE_SIZES).toHaveProperty(k))
  })

  it('každá velikost má všechny požadované vlastnosti', () => {
    keys.forEach(k => {
      props.forEach(p => {
        expect(SHAPE_SIZES[k]).toHaveProperty(p)
      })
    })
  })

  it('všechny hodnoty jsou kladná čísla', () => {
    keys.forEach(k => {
      props.forEach(p => {
        expect(typeof SHAPE_SIZES[k][p]).toBe('number')
        expect(SHAPE_SIZES[k][p]).toBeGreaterThan(0)
      })
    })
  })

  it('poměr cut/h ≈ 0.30 pro xs/sm/md/lg (±0.015)', () => {
    ;['xs', 'sm', 'md', 'lg'].forEach(k => {
      const ratio = SHAPE_SIZES[k].cut / SHAPE_SIZES[k].h
      expect(ratio).toBeGreaterThan(0.285)
      expect(ratio).toBeLessThan(0.315)
    })
  })

  it('poměr scoop/h ≈ 0.24 pro xs/sm/md/lg (±0.02)', () => {
    ;['xs', 'sm', 'md', 'lg'].forEach(k => {
      const ratio = SHAPE_SIZES[k].scoop / SHAPE_SIZES[k].h
      expect(ratio).toBeGreaterThan(0.22)
      expect(ratio).toBeLessThan(0.26)
    })
  })

  it('bb = 0.25 pro xs/sm/md/lg, 0.23 pro card', () => {
    ;['xs', 'sm', 'md', 'lg'].forEach(k => {
      expect(SHAPE_SIZES[k].bb).toBe(0.25)
    })
    expect(SHAPE_SIZES.card.bb).toBe(0.23)
  })

  it('w > h pro všechny velikosti', () => {
    keys.forEach(k => {
      expect(SHAPE_SIZES[k].w).toBeGreaterThan(SHAPE_SIZES[k].h)
    })
  })
})
