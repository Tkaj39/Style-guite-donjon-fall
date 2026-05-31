import * as TkajUI from '../index'

// ─── Barrel export ─────────────────────────────────────────────────────────

describe('barrel export (index.js)', () => {
  // Components — base (Badge, Button, Card, Input)
  it('Badge is exported as a function', () => {
    expect(TkajUI.Badge).toBeDefined()
    expect(typeof TkajUI.Badge).toBe('function')
  })

  it('Button is exported as a function', () => {
    expect(TkajUI.Button).toBeDefined()
    expect(typeof TkajUI.Button).toBe('function')
  })

  it('Card is exported as a function', () => {
    expect(TkajUI.Card).toBeDefined()
    expect(typeof TkajUI.Card).toBe('function')
  })

  it('Input is exported as a function', () => {
    expect(TkajUI.Input).toBeDefined()
    expect(typeof TkajUI.Input).toBe('function')
  })

  // Components
  it('Pictogram is exported as a function', () => {
    expect(TkajUI.Pictogram).toBeDefined()
    expect(typeof TkajUI.Pictogram).toBe('function')
  })

  it('ProgressBar is exported as a function', () => {
    expect(TkajUI.ProgressBar).toBeDefined()
    expect(typeof TkajUI.ProgressBar).toBe('function')
  })

  it('Toggle is exported as a function', () => {
    expect(TkajUI.Toggle).toBeDefined()
    expect(typeof TkajUI.Toggle).toBe('function')
  })

  it('Slider is exported as a function', () => {
    expect(TkajUI.Slider).toBeDefined()
    expect(typeof TkajUI.Slider).toBe('function')
  })

  it('Select is exported as a function', () => {
    expect(TkajUI.Select).toBeDefined()
    expect(typeof TkajUI.Select).toBe('function')
  })

  it('Tabs is exported as a function', () => {
    expect(TkajUI.Tabs).toBeDefined()
    expect(typeof TkajUI.Tabs).toBe('function')
  })

  it('ButtonGroup is exported as a function', () => {
    expect(TkajUI.ButtonGroup).toBeDefined()
    expect(typeof TkajUI.ButtonGroup).toBe('function')
  })

  it('Modal is exported as a function', () => {
    expect(TkajUI.Modal).toBeDefined()
    expect(typeof TkajUI.Modal).toBe('function')
  })

  it('ToastProvider is exported as a function', () => {
    expect(TkajUI.ToastProvider).toBeDefined()
    expect(typeof TkajUI.ToastProvider).toBe('function')
  })

  it('useToast is exported as a function', () => {
    expect(TkajUI.useToast).toBeDefined()
    expect(typeof TkajUI.useToast).toBe('function')
  })

  it('Tooltip is exported as a function', () => {
    expect(TkajUI.Tooltip).toBeDefined()
    expect(typeof TkajUI.Tooltip).toBe('function')
  })

  it('ScoopClip is exported as a function', () => {
    expect(TkajUI.ScoopClip).toBeDefined()
    expect(typeof TkajUI.ScoopClip).toBe('function')
  })

  it('NotchedBox is exported as a function', () => {
    expect(TkajUI.NotchedBox).toBeDefined()
    expect(typeof TkajUI.NotchedBox).toBe('function')
  })

  // Note: CornerOrnament, SideOrnament, HexOrnament belong to donjon-fall-ui
  // (game-themed decorations) and are NOT re-exported from tkajui. Tkajui is
  // the base library and does not know about donjon. Import these components
  // directly from 'donjon-fall-ui'.
  it('does NOT export game ornaments (architectural contract)', () => {
    expect(TkajUI.CornerOrnament).toBeUndefined()
    expect(TkajUI.SideOrnament).toBeUndefined()
    expect(TkajUI.HexOrnament).toBeUndefined()
  })

  // Utils re-exported from octagon
  it('octagon is exported as a function', () => {
    expect(TkajUI.octagon).toBeDefined()
    expect(typeof TkajUI.octagon).toBe('function')
  })

  it('scoopPath is exported as a function', () => {
    expect(TkajUI.scoopPath).toBeDefined()
    expect(typeof TkajUI.scoopPath).toBe('function')
  })

  it('SHAPE_SIZES is exported as an object', () => {
    expect(TkajUI.SHAPE_SIZES).toBeDefined()
    expect(typeof TkajUI.SHAPE_SIZES).toBe('object')
  })

  it('clipLeft is exported as a function', () => {
    expect(TkajUI.clipLeft).toBeDefined()
    expect(typeof TkajUI.clipLeft).toBe('function')
  })

  it('clipRight is exported as a function', () => {
    expect(TkajUI.clipRight).toBeDefined()
    expect(typeof TkajUI.clipRight).toBe('function')
  })
})
