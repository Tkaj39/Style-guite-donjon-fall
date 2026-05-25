import * as Donjon from '../index'

// ─── Donjon barrel export ──────────────────────────────────────────────────

describe('donjon barrel export (index.js)', () => {

  // ── Self-contained komponenty (mají vlastní implementaci s ornamenty)
  it('DonjonButton je exportován jako funkce', () => {
    expect(Donjon.DonjonButton).toBeDefined()
    expect(typeof Donjon.DonjonButton).toBe('function')
  })

  it('DonjonCard je exportován jako funkce', () => {
    expect(Donjon.DonjonCard).toBeDefined()
    expect(typeof Donjon.DonjonCard).toBe('function')
  })

  it('DonjonModal je exportován jako funkce', () => {
    expect(Donjon.DonjonModal).toBeDefined()
    expect(typeof Donjon.DonjonModal).toBe('function')
  })

  it('DonjonTabs je exportován jako funkce', () => {
    expect(Donjon.DonjonTabs).toBeDefined()
    expect(typeof Donjon.DonjonTabs).toBe('function')
  })

  it('DonjonButtonGroup je exportován jako funkce', () => {
    expect(Donjon.DonjonButtonGroup).toBeDefined()
    expect(typeof Donjon.DonjonButtonGroup).toBe('function')
  })

  // ── Re-exporty z TkajUI (vizuálně identické)
  it('DonjonBadge je exportován jako funkce', () => {
    expect(Donjon.DonjonBadge).toBeDefined()
    expect(typeof Donjon.DonjonBadge).toBe('function')
  })

  it('DonjonInput je exportován jako funkce', () => {
    expect(Donjon.DonjonInput).toBeDefined()
    expect(typeof Donjon.DonjonInput).toBe('function')
  })

  it('DonjonSelect je exportován jako funkce', () => {
    expect(Donjon.DonjonSelect).toBeDefined()
    expect(typeof Donjon.DonjonSelect).toBe('function')
  })

  it('DonjonSlider je exportován jako funkce', () => {
    expect(Donjon.DonjonSlider).toBeDefined()
    expect(typeof Donjon.DonjonSlider).toBe('function')
  })

  it('DonjonToggle je exportován jako funkce', () => {
    expect(Donjon.DonjonToggle).toBeDefined()
    expect(typeof Donjon.DonjonToggle).toBe('function')
  })

  it('DonjonProgressBar je exportován jako funkce', () => {
    expect(Donjon.DonjonProgressBar).toBeDefined()
    expect(typeof Donjon.DonjonProgressBar).toBe('function')
  })

  it('DonjonTooltip je exportován jako funkce', () => {
    expect(Donjon.DonjonTooltip).toBeDefined()
    expect(typeof Donjon.DonjonTooltip).toBe('function')
  })

  it('DonjonPictogram je exportován jako funkce', () => {
    expect(Donjon.DonjonPictogram).toBeDefined()
    expect(typeof Donjon.DonjonPictogram).toBe('function')
  })

  // ── Toast (pojmenované exporty)
  it('DonjonToastProvider je exportován jako funkce', () => {
    expect(Donjon.DonjonToastProvider).toBeDefined()
    expect(typeof Donjon.DonjonToastProvider).toBe('function')
  })

  it('useDonjonToast je exportován jako funkce', () => {
    expect(Donjon.useDonjonToast).toBeDefined()
    expect(typeof Donjon.useDonjonToast).toBe('function')
  })

  // ── Herní assety
  it('HexTile je exportován jako funkce', () => {
    expect(Donjon.HexTile).toBeDefined()
    expect(typeof Donjon.HexTile).toBe('function')
  })

  it('DieFace je exportován jako funkce', () => {
    expect(Donjon.DieFace).toBeDefined()
    expect(typeof Donjon.DieFace).toBe('function')
  })

  it('FloatFeedback je exportován jako funkce', () => {
    expect(Donjon.FloatFeedback).toBeDefined()
    expect(typeof Donjon.FloatFeedback).toBe('function')
  })

  // ── Erb
  it('Shield je exportován jako funkce', () => {
    expect(Donjon.Shield).toBeDefined()
    expect(typeof Donjon.Shield).toBe('function')
  })

  it('PlayerIdentityBadge je exportován jako funkce', () => {
    expect(Donjon.PlayerIdentityBadge).toBeDefined()
    expect(typeof Donjon.PlayerIdentityBadge).toBe('function')
  })

  // ── Ikony
  it('SwordIcon je exportován jako funkce', () => {
    expect(Donjon.SwordIcon).toBeDefined()
    expect(typeof Donjon.SwordIcon).toBe('function')
  })

  it('ShieldIcon je exportován jako funkce', () => {
    expect(Donjon.ShieldIcon).toBeDefined()
    expect(typeof Donjon.ShieldIcon).toBe('function')
  })

  it('TowerIcon je exportován jako funkce', () => {
    expect(Donjon.TowerIcon).toBeDefined()
    expect(typeof Donjon.TowerIcon).toBe('function')
  })
})
