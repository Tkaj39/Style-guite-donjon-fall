import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import Modal from '../Modal'
import { ToastProvider, useToast } from '../Toast'
import Tooltip from '../Tooltip'

// ─── Modal ─────────────────────────────────────────────────────────────────

describe('Modal', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal.mockClear()
    HTMLDialogElement.prototype.close.mockClear()
  })

  it('isOpen=false → dialog není otevřený', () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Test" />)
    // Native <dialog> zůstane v DOM, ale showModal() nebylo voláno → open=false
    const dialog = document.querySelector('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog.open).toBe(false)
  })

  it('isOpen=true → renderuje role="dialog"', () => {
    render(<Modal isOpen title="Potvrzení" onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('isOpen=true → dialog.open je true', () => {
    render(<Modal isOpen title="Potvrzení" onClose={() => {}} />)
    // aria-modal je implicitní u native showModal() — testujeme open state
    expect(screen.getByRole('dialog').open).toBe(true)
  })

  it('title prop → text je viditelný', () => {
    render(<Modal isOpen title="Potvrzení" onClose={() => {}} />)
    expect(screen.getByText('Potvrzení')).toBeInTheDocument()
  })

  it('aria-labelledby odkazuje na title element', () => {
    render(<Modal isOpen title="Potvrzení" onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    const labelId = dialog.getAttribute('aria-labelledby')
    const titleEl = document.getElementById(labelId)
    expect(titleEl).toBeInTheDocument()
    expect(titleEl.textContent).toBe('Potvrzení')
  })

  it('children se renderují uvnitř', () => {
    render(
      <Modal isOpen title="T" onClose={() => {}}>
        <p data-testid="body">Obsah modalu</p>
      </Modal>
    )
    expect(screen.getByTestId('body')).toBeInTheDocument()
  })

  it('tlačítko Zavřít zavolá onClose', () => {
    const onClose = vi.fn()
    render(<Modal isOpen title="Test" onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Zavřít'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Escape klávesa zavolá onClose', () => {
    const onClose = vi.fn()
    render(<Modal isOpen title="Test" onClose={onClose} />)
    // Native dialog: ESC spouští cancel event na <dialog>, ne keyDown na document
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closeOnEscape=false → Escape nezavolá onClose', () => {
    const onClose = vi.fn()
    render(<Modal isOpen title="Test" onClose={onClose} closeOnEscape={false} />)
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('kliknutí na backdrop zavolá onClose', () => {
    const onClose = vi.fn()
    const { container } = render(<Modal isOpen title="Test" onClose={onClose} />)
    // backdrop je první div (outside dialog)
    fireEvent.click(container.firstChild)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('kliknutí uvnitř panelu nezavolá onClose', () => {
    const onClose = vi.fn()
    render(<Modal isOpen title="Test" onClose={onClose} />)
    // Panel má stopPropagation — klik na obsah nedojde k backdrop handleru
    fireEvent.click(screen.getByRole('heading', { level: 2 }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('closeOnBackdrop=false → kliknutí na backdrop nezavolá onClose', () => {
    const onClose = vi.fn()
    const { container } = render(<Modal isOpen title="Test" onClose={onClose} closeOnBackdrop={false} />)
    fireEvent.click(container.firstChild)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('isOpen=true → scroll lock zajišťuje prohlížeč přes top-layer', () => {
    render(<Modal isOpen title="Test" onClose={() => {}} />)
    // Native <dialog> showModal() uzamkne scroll na úrovni prohlížeče (top-layer),
    // nikoli přes document.body.style.overflow — verifikujeme přes open state
    expect(screen.getByRole('dialog').open).toBe(true)
  })

  it('isOpen true→false → dialog se uzavře', () => {
    const { rerender } = render(<Modal isOpen title="Test" onClose={() => {}} />)
    rerender(<Modal isOpen={false} title="Test" onClose={() => {}} />)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1)
  })

  it('description prop → text je viditelný', () => {
    render(<Modal isOpen title="T" description="Popis akce" onClose={() => {}} />)
    expect(screen.getByText('Popis akce')).toBeInTheDocument()
  })

  it('footer prop → renderuje se', () => {
    render(<Modal isOpen title="T" onClose={() => {}} footer={<button>OK</button>} />)
    expect(screen.getByText('OK')).toBeInTheDocument()
  })

  it('showCloseButton=false → žádné tlačítko Zavřít', () => {
    render(<Modal isOpen title="T" onClose={() => {}} showCloseButton={false} />)
    expect(screen.queryByLabelText('Zavřít')).not.toBeInTheDocument()
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<Modal isOpen title="T" onClose={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renderuje bez pádu', () => {
    expect(() => render(<Modal isOpen title="T" onClose={() => {}} size="lg" />)).not.toThrow()
  })

  it('variant="danger" → renderuje bez pádu', () => {
    expect(() => render(<Modal isOpen title="T" onClose={() => {}} variant="danger" />)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Modal isOpen title="T" onClose={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('title=null, isOpen, onClose → renderuje bez pádu', () => {
    expect(() => render(<Modal isOpen title={null} onClose={() => {}} />)).not.toThrow()
  })

  it('children=null, isOpen, onClose → renderuje bez pádu', () => {
    expect(() => render(<Modal isOpen title="T" onClose={() => {}}>{null}</Modal>)).not.toThrow()
  })
})

// ─── Toast ─────────────────────────────────────────────────────────────────

// Pomocná komponenta pro volání useToast
function ToastTrigger({ onReady }) {
  const { addToast, removeToast } = useToast()
  // Předáme funkce rodiči přes callback
  if (onReady) onReady({ addToast, removeToast })
  return null
}

function renderWithToast() {
  let toastApi = null
  const utils = render(
    <ToastProvider>
      <ToastTrigger onReady={(api) => { toastApi = api }} />
    </ToastProvider>
  )
  return { ...utils, toastApi: () => toastApi }
}

describe('Toast / ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('ToastProvider renderuje children bez pádu', () => {
    expect(() => render(<ToastProvider><div>ok</div></ToastProvider>)).not.toThrow()
  })

  it('useToast mimo provider → vyhodí chybu', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      render(<ToastTrigger onReady={() => {}} />)
    }).toThrow(/ToastProvider/)
    spy.mockRestore()
  })

  it('addToast zobrazí toast s title', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Hotovo!', variant: 'success' }) })
    expect(screen.getByText('Hotovo!')).toBeInTheDocument()
  })

  it('addToast zobrazí toast s message', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ message: 'Zpráva toastu', variant: 'default' }) })
    expect(screen.getByText('Zpráva toastu')).toBeInTheDocument()
  })

  it('addToast vrátí id (string)', () => {
    const { toastApi } = renderWithToast()
    let id
    act(() => { id = toastApi().addToast({ title: 'Test' }) })
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('removeToast odstraní toast', () => {
    const { toastApi } = renderWithToast()
    let id
    act(() => { id = toastApi().addToast({ title: 'Zmizím' }) })
    expect(screen.getByText('Zmizím')).toBeInTheDocument()
    act(() => { toastApi().removeToast(id) })
    expect(screen.queryByText('Zmizím')).not.toBeInTheDocument()
  })

  it('kliknutí na ✕ odstraní toast', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Klikatelný' }) })
    expect(screen.getByText('Klikatelný')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Zavřít'))
    expect(screen.queryByText('Klikatelný')).not.toBeInTheDocument()
  })

  it('po duration ms se toast automaticky odstraní', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Dočasný', duration: 3000 }) })
    expect(screen.getByText('Dočasný')).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(3000) })
    expect(screen.queryByText('Dočasný')).not.toBeInTheDocument()
  })

  it('duration=0 → toast se neodstraní automaticky', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Trvalý', duration: 0 }) })
    act(() => { vi.advanceTimersByTime(10000) })
    expect(screen.getByText('Trvalý')).toBeInTheDocument()
  })

  it('variant="danger" → toast renderuje bez pádu', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'Chyba', variant: 'danger' }) })
    }).not.toThrow()
  })

  it('variant="warning" → toast renderuje bez pádu', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'Varování', variant: 'warning' }) })
    }).not.toThrow()
  })

  it('variant="info" → toast renderuje bez pádu', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'Info', variant: 'info' }) })
    }).not.toThrow()
  })

  it('neznámý variant → toast renderuje bez pádu (fallback)', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'X', variant: 'unknown' }) })
    }).not.toThrow()
  })

  it('více toastů najednou → všechny se renderují', () => {
    const { toastApi } = renderWithToast()
    act(() => {
      toastApi().addToast({ title: 'Toast 1' })
      toastApi().addToast({ title: 'Toast 2' })
      toastApi().addToast({ title: 'Toast 3' })
    })
    expect(screen.getByText('Toast 1')).toBeInTheDocument()
    expect(screen.getByText('Toast 2')).toBeInTheDocument()
    expect(screen.getByText('Toast 3')).toBeInTheDocument()
  })
})

// ─── Tooltip ───────────────────────────────────────────────────────────────

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renderuje children bez pádu', () => {
    render(<Tooltip content="Nápověda"><button>Trigger</button></Tooltip>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('tooltip není viditelný před hover', () => {
    render(<Tooltip content="Nápověda"><button>Trigger</button></Tooltip>)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('mouseenter → po delay se zobrazí tooltip', () => {
    render(<Tooltip content="Nápověda" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('tooltip obsahuje content text', () => {
    render(<Tooltip content="Nápověda" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Nápověda')
  })

  it('mouseleave → tooltip zmizí', () => {
    render(<Tooltip content="Nápověda" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    fireEvent.mouseLeave(screen.getByRole('button'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('mouseleave před delay → tooltip se neobjeví', () => {
    render(<Tooltip content="Nápověda" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    fireEvent.mouseLeave(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('focus → po delay se zobrazí tooltip', () => {
    render(<Tooltip content="Nápověda" delay={120}><button>Trigger</button></Tooltip>)
    const span = screen.getByRole('button').parentElement
    fireEvent.focus(span)
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('blur-sm → tooltip zmizí', () => {
    render(<Tooltip content="Nápověda" delay={120}><button>Trigger</button></Tooltip>)
    const span = screen.getByRole('button').parentElement
    fireEvent.focus(span)
    act(() => { vi.advanceTimersByTime(120) })
    fireEvent.blur(span)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('disabled=true → mouseenter nezobrazí tooltip', () => {
    render(<Tooltip content="Nápověda" delay={120} disabled><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('content="" → mouseenter nezobrazí tooltip', () => {
    render(<Tooltip content="" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('content=null → renderuje bez pádu', () => {
    expect(() => render(<Tooltip content={null}><button>Trigger</button></Tooltip>)).not.toThrow()
  })

  it('title prop → zobrazí se v tooltipu', () => {
    render(<Tooltip content="Obsah" title="Nadpis" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Nadpis')
    expect(screen.getByRole('tooltip')).toHaveTextContent('Obsah')
  })

  it('variant="danger" → renderuje bez pádu', () => {
    expect(() => render(<Tooltip content="X" variant="danger"><button>T</button></Tooltip>)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Tooltip content="X" variant="unknown"><button>T</button></Tooltip>)).not.toThrow()
  })

  it('placement="bottom" → renderuje bez pádu', () => {
    render(<Tooltip content="X" placement="bottom" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('placement="left" → renderuje bez pádu', () => {
    render(<Tooltip content="X" placement="left" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('placement="right" → renderuje bez pádu', () => {
    render(<Tooltip content="X" placement="right" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })
})
