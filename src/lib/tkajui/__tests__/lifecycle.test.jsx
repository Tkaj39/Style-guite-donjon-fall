import { render, screen, fireEvent, act } from '@testing-library/react'
import Modal from '../Modal'
import Tooltip from '../Tooltip'
import { ToastProvider, useToast } from '../Toast'
import Select from '../Select'

// ─── Modal — native <dialog> lifecycle ─────────────────────────────────────
// Scroll lock is now the browser's responsibility (top layer), not ours.
// We test showModal() / close() calls via the mock from setup.js.

describe('Modal lifecycle', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal.mockClear()
    HTMLDialogElement.prototype.close.mockClear()
  })

  it('isOpen=true → showModal() is called', () => {
    render(<Modal isOpen title="T" onClose={() => {}} />)
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1)
  })

  it('isOpen false→true → showModal() is called after the change', () => {
    const { rerender } = render(<Modal isOpen={false} title="T" onClose={() => {}} />)
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled()
    rerender(<Modal isOpen title="T" onClose={() => {}} />)
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1)
  })

  it('isOpen true→false → close() is called', () => {
    const { rerender } = render(<Modal isOpen title="T" onClose={() => {}} />)
    rerender(<Modal isOpen={false} title="T" onClose={() => {}} />)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1)
  })
})

// ─── Tooltip — cleanup ─────────────────────────────────────────────────────

describe('Tooltip lifecycle', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.runOnlyPendingTimers(); vi.useRealTimers() })

  it('Tooltip unmount with an active timer → no error', () => {
    const { unmount } = render(
      <Tooltip content="Tip" delay={120}><button>T</button></Tooltip>
    )
    fireEvent.mouseEnter(screen.getByRole('button'))
    // Timer is running — unmount before it fires
    expect(() => unmount()).not.toThrow()
  })

  it('Tooltip unmount with the popup open → no error', () => {
    const { unmount } = render(
      <Tooltip content="Tip" delay={120}><button>T</button></Tooltip>
    )
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(() => unmount()).not.toThrow()
  })
})

// ─── Toast — timers and cleanup ─────────────────────────────────────────────

function ToastTrigger({ onReady }) {
  const api = useToast()
  if (onReady) onReady(api)
  return null
}

function renderWithToast() {
  let api = null
  const utils = render(
    <ToastProvider>
      <ToastTrigger onReady={(a) => { api = a }} />
    </ToastProvider>
  )
  return { ...utils, api: () => api }
}

describe('Toast lifecycle', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.runOnlyPendingTimers(); vi.useRealTimers() })

  it('Toast unmount before duration elapses → no error', () => {
    const { unmount, api } = renderWithToast()
    act(() => { api().addToast({ title: 'Test', duration: 5000 }) })
    expect(() => unmount()).not.toThrow()
  })

  it('removeToast(id) → toast disappears immediately without waiting for the timer', () => {
    const { api } = renderWithToast()
    let id
    act(() => { id = api().addToast({ title: 'Vanish', duration: 5000 }) })
    expect(screen.getByText('Vanish')).toBeInTheDocument()
    act(() => { api().removeToast(id) })
    expect(screen.queryByText('Vanish')).not.toBeInTheDocument()
    // Timer is still pending — but the toast is gone
    act(() => { vi.advanceTimersByTime(5000) })
    // No error after the timer fires on an already-removed toast
  })

  it('two toasts — different durations — each disappears at the right time', () => {
    const { api } = renderWithToast()
    act(() => {
      api().addToast({ title: 'Short', duration: 1000 })
      api().addToast({ title: 'Long', duration: 3000 })
    })
    expect(screen.getByText('Short')).toBeInTheDocument()
    expect(screen.getByText('Long')).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.queryByText('Short')).not.toBeInTheDocument()
    expect(screen.getByText('Long')).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(2000) })
    expect(screen.queryByText('Long')).not.toBeInTheDocument()
  })
})

// ─── Select — click-outside listener cleanup ────────────────────────────────

describe('Select lifecycle', () => {
  it('Select unmount with the dropdown open → no error', () => {
    const { unmount } = render(
      <Select options={[{ value: 'a', label: 'A' }]} value="" onChange={() => {}} />
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    expect(() => unmount()).not.toThrow()
  })

  it('clicking outside Select closes the dropdown', () => {
    render(
      <div>
        <Select options={[{ value: 'a', label: 'A' }]} value="" onChange={() => {}} />
        <div data-testid="outside">Outside</div>
      </div>
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })
})

// ─── Portals — rendering into document.body ─────────────────────────────────

describe('Portal rendering', () => {
  it('Modal isOpen=true → dialog is in document.body', () => {
    render(<Modal isOpen title="Portal" onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    // Modal renders directly into the tree (not via portal), but is present in the DOM
    expect(dialog).toBeInTheDocument()
  })

  it('Toast → toast is available in document.body (portal)', () => {
    const { api } = renderWithToast()
    act(() => { api().addToast({ title: 'Portal toast' }) })
    // createPortal renders into document.body
    expect(document.body).toContainElement(screen.getByText('Portal toast'))
  })
})
