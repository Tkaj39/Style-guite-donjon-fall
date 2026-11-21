import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useCssAnimation from '../useCssAnimation'

describe('useCssAnimation', () => {
  it('starts idle with animation none', () => {
    const { result } = renderHook(() => useCssAnimation('dieMove'))
    expect(result.current.playing).toBe(false)
    expect(result.current.animKey).toBe(0)
    expect(result.current.style.animation).toBe('none')
    expect(result.current.bind.style.animation).toBe('none')
  })

  it('play() bumps key, sets playing, and applies the preset style', () => {
    const { result } = renderHook(() => useCssAnimation('dieReject'))
    act(() => { result.current.play() })
    expect(result.current.playing).toBe(true)
    expect(result.current.animKey).toBe(1)
    expect(result.current.style.animation).toBe('die-reject 320ms ease-in-out both')
  })

  it('ignores play() while already playing', () => {
    const { result } = renderHook(() => useCssAnimation('dieMove'))
    act(() => { result.current.play() })
    act(() => { result.current.play() })
    expect(result.current.animKey).toBe(1)
  })

  it('onAnimationEnd clears playing and calls onEnd', () => {
    const onEnd = vi.fn()
    const { result } = renderHook(() => useCssAnimation('dieShake', { onEnd }))
    act(() => { result.current.play() })

    const target = {}
    act(() => {
      result.current.bind.onAnimationEnd({ target, currentTarget: target })
    })
    expect(result.current.playing).toBe(false)
    expect(onEnd).toHaveBeenCalledOnce()
  })

  it('ignores bubbled animationend from children', () => {
    const onEnd = vi.fn()
    const { result } = renderHook(() => useCssAnimation('dieShake', { onEnd }))
    act(() => { result.current.play() })
    act(() => {
      result.current.bind.onAnimationEnd({
        target: { id: 'child' },
        currentTarget: { id: 'parent' },
      })
    })
    expect(result.current.playing).toBe(true)
    expect(onEnd).not.toHaveBeenCalled()
  })
})
