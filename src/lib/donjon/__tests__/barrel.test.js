import * as Donjon from '../index'

// ─── Donjon barrel export ──────────────────────────────────────────────────

describe('donjon barrel export (index.js)', () => {

  // ── Self-contained components (own implementation with ornaments)
  it('DonjonButton is exported as a function', () => {
    expect(Donjon.DonjonButton).toBeDefined()
    expect(typeof Donjon.DonjonButton).toBe('function')
  })

  it('DonjonCard is exported as a function', () => {
    expect(Donjon.DonjonCard).toBeDefined()
    expect(typeof Donjon.DonjonCard).toBe('function')
  })

  it('DonjonModal is exported as a function', () => {
    expect(Donjon.DonjonModal).toBeDefined()
    expect(typeof Donjon.DonjonModal).toBe('function')
  })

  it('DonjonTabs is exported as a function', () => {
    expect(Donjon.DonjonTabs).toBeDefined()
    expect(typeof Donjon.DonjonTabs).toBe('function')
  })

  it('DonjonButtonGroup is exported as a function', () => {
    expect(Donjon.DonjonButtonGroup).toBeDefined()
    expect(typeof Donjon.DonjonButtonGroup).toBe('function')
  })

  // ── Re-exports from TkajUI (visually identical)
  it('DonjonBadge is exported as a function', () => {
    expect(Donjon.DonjonBadge).toBeDefined()
    expect(typeof Donjon.DonjonBadge).toBe('function')
  })

  it('DonjonInput is exported as a function', () => {
    expect(Donjon.DonjonInput).toBeDefined()
    expect(typeof Donjon.DonjonInput).toBe('function')
  })

  it('DonjonSelect is exported as a function', () => {
    expect(Donjon.DonjonSelect).toBeDefined()
    expect(typeof Donjon.DonjonSelect).toBe('function')
  })

  it('DonjonSlider is exported as a function', () => {
    expect(Donjon.DonjonSlider).toBeDefined()
    expect(typeof Donjon.DonjonSlider).toBe('function')
  })

  it('DonjonToggle is exported as a function', () => {
    expect(Donjon.DonjonToggle).toBeDefined()
    expect(typeof Donjon.DonjonToggle).toBe('function')
  })

  it('DonjonProgressBar is exported as a function', () => {
    expect(Donjon.DonjonProgressBar).toBeDefined()
    expect(typeof Donjon.DonjonProgressBar).toBe('function')
  })

  it('DonjonTooltip is exported as a function', () => {
    expect(Donjon.DonjonTooltip).toBeDefined()
    expect(typeof Donjon.DonjonTooltip).toBe('function')
  })

  it('DonjonPictogram is exported as a function', () => {
    expect(Donjon.DonjonPictogram).toBeDefined()
    expect(typeof Donjon.DonjonPictogram).toBe('function')
  })

  // ── Toast (named exports)
  it('DonjonToastProvider is exported as a function', () => {
    expect(Donjon.DonjonToastProvider).toBeDefined()
    expect(typeof Donjon.DonjonToastProvider).toBe('function')
  })

  it('useDonjonToast is exported as a function', () => {
    expect(Donjon.useDonjonToast).toBeDefined()
    expect(typeof Donjon.useDonjonToast).toBe('function')
  })

  // ── Game assets
  it('HexTile is exported as a function', () => {
    expect(Donjon.HexTile).toBeDefined()
    expect(typeof Donjon.HexTile).toBe('function')
  })

  it('DieFace is exported as a function', () => {
    expect(Donjon.DieFace).toBeDefined()
    expect(typeof Donjon.DieFace).toBe('function')
  })

  it('FloatFeedback is exported as a function', () => {
    expect(Donjon.FloatFeedback).toBeDefined()
    expect(typeof Donjon.FloatFeedback).toBe('function')
  })

  // ── Erb
  it('Shield is exported as a function', () => {
    expect(Donjon.Shield).toBeDefined()
    expect(typeof Donjon.Shield).toBe('function')
  })

  it('PlayerIdentityBadge is exported as a function', () => {
    expect(Donjon.PlayerIdentityBadge).toBeDefined()
    expect(typeof Donjon.PlayerIdentityBadge).toBe('function')
  })

  // ── Icons
  it('SwordIcon is exported as a function', () => {
    expect(Donjon.SwordIcon).toBeDefined()
    expect(typeof Donjon.SwordIcon).toBe('function')
  })

  it('ShieldIcon is exported as a function', () => {
    expect(Donjon.ShieldIcon).toBeDefined()
    expect(typeof Donjon.ShieldIcon).toBe('function')
  })

  it('TowerIcon is exported as a function', () => {
    expect(Donjon.TowerIcon).toBeDefined()
    expect(typeof Donjon.TowerIcon).toBe('function')
  })
})
