import { describe, it, expect } from 'vitest'
import {
  gameAnimationPresets,
  animationStyle,
  resolveGameAnimation,
  GAME_PIECE_HEX,
} from '../gameAnimations'
import { GAME_ANIMATION_PRESET_VALUES } from '../enums'
import * as Donjon from '../index'

describe('gameAnimationPresets', () => {
  it('covers every GAME_ANIMATION_PRESET_VALUES key', () => {
    for (const key of GAME_ANIMATION_PRESET_VALUES) {
      expect(gameAnimationPresets[key], key).toBeDefined()
      expect(gameAnimationPresets[key].name).toMatch(/^[a-z0-9-]+$/)
      expect(gameAnimationPresets[key].duration).toBeGreaterThan(0)
    }
  })

  it('exposes GAME_PIECE_HEX geometry matching md HexTile defaults', () => {
    expect(GAME_PIECE_HEX.stepX).toBe(74)
    expect(GAME_PIECE_HEX.stepY).toBe(84)
    expect(GAME_PIECE_HEX.towerStack).toBe(16)
  })
})

describe('animationStyle', () => {
  it('builds a CSS shorthand from a preset key', () => {
    expect(animationStyle('dieMove')).toBe('die-move 320ms ease-in-out both')
  })

  it('applies duration / fill overrides', () => {
    expect(animationStyle('dieMove', { duration: 260 })).toBe('die-move 260ms ease-in-out both')
    expect(animationStyle('focalActivate', { fill: 'forwards' })).toBe(
      'focal-activate 400ms ease-out forwards',
    )
  })

  it('omits fill when fill is none and includes infinite iteration', () => {
    expect(animationStyle('dieStuckPulse')).toBe('die-stuck-pulse 1200ms ease-in-out infinite')
    expect(animationStyle('dieTopHighlight')).toBe('die-top-highlight 300ms ease-out')
  })

  it('returns none for unknown presets', () => {
    expect(animationStyle('notARealPreset')).toBe('none')
    expect(animationStyle(null)).toBe('none')
  })

  it('accepts an inline config object', () => {
    expect(animationStyle({ name: 'custom', duration: 100, easing: 'linear', fill: 'both' }))
      .toBe('custom 100ms linear both')
  })
})

describe('resolveGameAnimation', () => {
  it('resolves keys and passes through objects', () => {
    expect(resolveGameAnimation('dieShake').name).toBe('die-shake')
    const custom = { name: 'x', duration: 1, easing: 'linear' }
    expect(resolveGameAnimation(custom)).toBe(custom)
  })
})

describe('barrel exports', () => {
  it('exports animation helpers and useCssAnimation', () => {
    expect(Donjon.gameAnimationPresets).toBe(gameAnimationPresets)
    expect(Donjon.animationStyle).toBe(animationStyle)
    expect(Donjon.GAME_PIECE_HEX).toBe(GAME_PIECE_HEX)
    expect(Donjon.GAME_ANIMATION_PRESET_VALUES).toEqual(GAME_ANIMATION_PRESET_VALUES)
    expect(typeof Donjon.useCssAnimation).toBe('function')
  })
})
