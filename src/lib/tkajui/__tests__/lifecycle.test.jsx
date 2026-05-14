import { render, screen, fireEvent, act } from '@testing-library/react'
import Modal from '../Modal'
import Tooltip from '../Tooltip'
import { ToastProvider, useToast } from '../Toast'
import Select from '../Select'

// ─── Modal — scroll lock ────────────────────────────────────────────────────

describe('Modal lifecycle', () => {
  afterEach(() => {
    // Cleanup body overflow po každém testu
    document.body.style.overflow = ''
  })

  it('isOpen=true → document.body.style.overflow = "hidden"', () => {
    render(<Modal isOpen title="T" onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('Modal unmount → document.body.style.overflow vráceno', () => {
    const { unmount } = render(<Modal isOpen title="T" onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('isOpen false→true→false → overflow se správně vrátí', () => {
    const { rerender } = render(<Modal isOpen={false} title="T" onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('')
    rerender(<Modal isOpen title="T" onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('hidden')
    rerender(<Modal isOpen={false} title="T" onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('')
  })
})

// ─── Tooltip — cleanup ─────────────────────────────────────────────────────

describe('Tooltip lifecycle', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.runOnlyPendingTimers(); vi.useRealTimers() })

  it('Tooltip unmount s aktivním timerem → žádná chyba', () => {
    const { unmount } = render(
      <Tooltip content="Tip" delay={120}><button>T</button></Tooltip>
    )
    fireEvent.mouseEnter(screen.getByRole('button'))
    // Timer běží — unmountujeme před vypršením
    expect(() => unmount()).not.toThrow()
  })

  it('Tooltip unmount s otevřeným popupem → žádná chyba', () => {
    const { unmount } = render(
      <Tooltip content="Tip" delay={120}><button>T</button></Tooltip>
    )
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(() => unmount()).not.toThrow()
  })
})

// ─── Toast — timers a cleanup ───────────────────────────────────────────────

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

  it('Toast unmount před vypršením duration → žádná chyba', () => {
    const { unmount, api } = renderWithToast()
    act(() => { api().addToast({ title: 'Test', duration: 5000 }) })
    expect(() => unmount()).not.toThrow()
  })

  it('removeToast(id) → toast zmizí ihned bez čekání na timer', () => {
    const { api } = renderWithToast()
    let id
    act(() => { id = api().addToast({ title: 'Zmizím', duration: 5000 }) })
    expect(screen.getByText('Zmizím')).toBeInTheDocument()
    act(() => { api().removeToast(id) })
    expect(screen.queryByText('Zmizím')).not.toBeInTheDocument()
    // Timer stále čeká — ale toast je pryč
    act(() => { vi.advanceTimersByTime(5000) })
    // Žádná chyba po vypršení timeru na již odstraněný toast
  })

  it('dva toasty — různé duration — každý zmizí ve správný čas', () => {
    const { api } = renderWithToast()
    act(() => {
      api().addToast({ title: 'Krátký', duration: 1000 })
      api().addToast({ title: 'Dlouhý', duration: 3000 })
    })
    expect(screen.getByText('Krátký')).toBeInTheDocument()
    expect(screen.getByText('Dlouhý')).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.queryByText('Krátký')).not.toBeInTheDocument()
    expect(screen.getByText('Dlouhý')).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(2000) })
    expect(screen.queryByText('Dlouhý')).not.toBeInTheDocument()
  })
})

// ─── Select — click-outside listener cleanup ────────────────────────────────

describe('Select lifecycle', () => {
  it('Select unmount s otevřeným dropdownem → žádná chyba', () => {
    const { unmount } = render(
      <Select options={[{ value: 'a', label: 'A' }]} value="" onChange={() => {}} />
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    expect(() => unmount()).not.toThrow()
  })

  it('click mimo Select zavře dropdown', () => {
    render(
      <div>
        <Select options={[{ value: 'a', label: 'A' }]} value="" onChange={() => {}} />
        <div data-testid="outside">Mimo</div>
      </div>
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })
})

// ─── Portály — renderování do document.body ─────────────────────────────────

describe('Portal rendering', () => {
  it('Modal isOpen=true → dialog je v document.body', () => {
    render(<Modal isOpen title="Portál" onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    // Modal renderuje přímo do stromu (ne přes portal), ale je v DOM
    expect(dialog).toBeInTheDocument()
  })

  it('Toast → toast je dostupný v document.body (portal)', () => {
    const { api } = renderWithToast()
    act(() => { api().addToast({ title: 'Portal toast' }) })
    // createPortal renderuje do document.body
    expect(document.body).toContainElement(screen.getByText('Portal toast'))
  })
})
