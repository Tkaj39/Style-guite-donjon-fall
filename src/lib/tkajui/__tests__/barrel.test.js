import * as TkajUI from '../index'

// ─── Barrel export ─────────────────────────────────────────────────────────

describe('barrel export (index.js)', () => {
  // Komponenty — base (Badge, Button, Card, Input)
  it('Badge je exportován jako funkce', () => {
    expect(TkajUI.Badge).toBeDefined()
    expect(typeof TkajUI.Badge).toBe('function')
  })

  it('Button je exportován jako funkce', () => {
    expect(TkajUI.Button).toBeDefined()
    expect(typeof TkajUI.Button).toBe('function')
  })

  it('Card je exportován jako funkce', () => {
    expect(TkajUI.Card).toBeDefined()
    expect(typeof TkajUI.Card).toBe('function')
  })

  it('Input je exportován jako funkce', () => {
    expect(TkajUI.Input).toBeDefined()
    expect(typeof TkajUI.Input).toBe('function')
  })

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

  it('NotchedBox je exportován jako funkce', () => {
    expect(TkajUI.NotchedBox).toBeDefined()
    expect(typeof TkajUI.NotchedBox).toBe('function')
  })

  // Pozn.: CornerOrnament, SideOrnament, HexOrnament patří do donjon-fall-ui
  // (herní dekorace) a NEJSOU re-exportovány z tkajui. Tkajui je base library
  // a nezná donjon. Tyto komponenty importuj přímo z 'donjon-fall-ui'.
  it('NEexportuje herní ornamenty (architektonický kontrakt)', () => {
    expect(TkajUI.CornerOrnament).toBeUndefined()
    expect(TkajUI.SideOrnament).toBeUndefined()
    expect(TkajUI.HexOrnament).toBeUndefined()
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
