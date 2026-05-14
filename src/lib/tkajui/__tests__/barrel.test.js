import * as TkajUI from '../index'

// ─── Barrel export ─────────────────────────────────────────────────────────

describe('barrel export (index.js)', () => {
  // Komponenty
  it('Pictogram je exportován jako funkce', () => {
    expect(TkajUI.Pictogram).toBeDefined()
    expect(typeof TkajUI.Pictogram).toBe('function')
  })

  it('ProgressBar je exportován jako funkce', () => {
    expect(TkajUI.ProgressBar).toBeDefined()
    expect(typeof TkajUI.ProgressBar).toBe('function')
  })

  it('Toggle je exportován jako funkce', () => {
    expect(TkajUI.Toggle).toBeDefined()
    expect(typeof TkajUI.Toggle).toBe('function')
  })

  it('Slider je exportován jako funkce', () => {
    expect(TkajUI.Slider).toBeDefined()
    expect(typeof TkajUI.Slider).toBe('function')
  })

  it('Select je exportován jako funkce', () => {
    expect(TkajUI.Select).toBeDefined()
    expect(typeof TkajUI.Select).toBe('function')
  })

  it('Tabs je exportován jako funkce', () => {
    expect(TkajUI.Tabs).toBeDefined()
    expect(typeof TkajUI.Tabs).toBe('function')
  })

  it('ButtonGroup je exportován jako funkce', () => {
    expect(TkajUI.ButtonGroup).toBeDefined()
    expect(typeof TkajUI.ButtonGroup).toBe('function')
  })

  it('Modal je exportován jako funkce', () => {
    expect(TkajUI.Modal).toBeDefined()
    expect(typeof TkajUI.Modal).toBe('function')
  })

  it('ToastProvider je exportován jako funkce', () => {
    expect(TkajUI.ToastProvider).toBeDefined()
    expect(typeof TkajUI.ToastProvider).toBe('function')
  })

  it('useToast je exportován jako funkce', () => {
    expect(TkajUI.useToast).toBeDefined()
    expect(typeof TkajUI.useToast).toBe('function')
  })

  it('Tooltip je exportován jako funkce', () => {
    expect(TkajUI.Tooltip).toBeDefined()
    expect(typeof TkajUI.Tooltip).toBe('function')
  })

  it('ScoopClip je exportován jako funkce', () => {
    expect(TkajUI.ScoopClip).toBeDefined()
    expect(typeof TkajUI.ScoopClip).toBe('function')
  })

  it('CornerOrnament je exportován jako funkce', () => {
    expect(TkajUI.CornerOrnament).toBeDefined()
    expect(typeof TkajUI.CornerOrnament).toBe('function')
  })

  it('SideOrnament je exportován jako funkce', () => {
    expect(TkajUI.SideOrnament).toBeDefined()
    expect(typeof TkajUI.SideOrnament).toBe('function')
  })

  it('HexOrnament je exportován jako funkce', () => {
    expect(TkajUI.HexOrnament).toBeDefined()
    expect(typeof TkajUI.HexOrnament).toBe('function')
  })

  // Utils re-exporty z octagon
  it('octagon je exportován jako funkce', () => {
    expect(TkajUI.octagon).toBeDefined()
    expect(typeof TkajUI.octagon).toBe('function')
  })

  it('scoopPath je exportován jako funkce', () => {
    expect(TkajUI.scoopPath).toBeDefined()
    expect(typeof TkajUI.scoopPath).toBe('function')
  })

  it('SHAPE_SIZES je exportován jako objekt', () => {
    expect(TkajUI.SHAPE_SIZES).toBeDefined()
    expect(typeof TkajUI.SHAPE_SIZES).toBe('object')
  })

  it('clipLeft je exportován jako funkce', () => {
    expect(TkajUI.clipLeft).toBeDefined()
    expect(typeof TkajUI.clipLeft).toBe('function')
  })

  it('clipRight je exportován jako funkce', () => {
    expect(TkajUI.clipRight).toBeDefined()
    expect(typeof TkajUI.clipRight).toBe('function')
  })
})
