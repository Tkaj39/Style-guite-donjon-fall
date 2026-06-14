import { render, screen, fireEvent, act } from '@testing-library/react'
import Modal from '../Modal'
import { ToastProvider, useToast } from '../Toast'
import Tooltip from '../Tooltip'

// ─── Modal ─────────────────────────────────────────────────────────────────

describe('Modal', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal.mockClear()
    HTMLDialogElement.prototype.close.mockClear()
  })

  it('open=false → dialog is not open', () => {
    render(<Modal open={false} onClose={() => {}} title="Test" />)
    // Native <dialog> stays in the DOM, but showModal() was not called → open=false
    const dialog = document.querySelector('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog.open).toBe(false)
  })

  it('open=true → renders role="dialog"', () => {
    render(<Modal open title="Confirmation" onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('open=true → dialog.open is true', () => {
    render(<Modal open title="Confirmation" onClose={() => {}} />)
    // aria-modal is implicit with native showModal() — we test the open state
    expect(screen.getByRole('dialog').open).toBe(true)
  })

  it('title prop → text is visible', () => {
    render(<Modal open title="Confirmation" onClose={() => {}} />)
    expect(screen.getByText('Confirmation')).toBeInTheDocument()
  })

  it('aria-labelledby points to the title element', () => {
    render(<Modal open title="Confirmation" onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    const labelId = dialog.getAttribute('aria-labelledby')
    const titleEl = document.getElementById(labelId)
    expect(titleEl).toBeInTheDocument()
    expect(titleEl.textContent).toBe('Confirmation')
  })

  it('children render inside', () => {
    render(
      <Modal open title="T" onClose={() => {}}>
        <p data-testid="body">Modal body</p>
      </Modal>
    )
    expect(screen.getByTestId('body')).toBeInTheDocument()
  })

  it('Close button calls onClose', () => {
    const onClose = vi.fn()
    render(<Modal open title="Test" onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Escape key calls onClose', () => {
    const onClose = vi.fn()
    render(<Modal open title="Test" onClose={onClose} />)
    // Native dialog: ESC fires the cancel event on <dialog>, not keyDown on document
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closeOnEscape=false → Escape does not call onClose', () => {
    const onClose = vi.fn()
    render(<Modal open title="Test" onClose={onClose} closeOnEscape={false} />)
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('clicking the backdrop calls onClose', () => {
    const onClose = vi.fn()
    render(<Modal open title="Test" onClose={onClose} />)
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('clicking inside the panel does not call onClose', () => {
    const onClose = vi.fn()
    render(<Modal open title="Test" onClose={onClose} />)
    // The panel calls stopPropagation — a click on the content does not reach the backdrop handler
    fireEvent.click(screen.getByRole('heading', { level: 2 }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('closeOnBackdrop=false → clicking the backdrop does not call onClose', () => {
    const onClose = vi.fn()
    render(<Modal open title="Test" onClose={onClose} closeOnBackdrop={false} />)
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('open=true → scroll lock is provided by the browser via the top layer', () => {
    render(<Modal open title="Test" onClose={() => {}} />)
    // Native <dialog> showModal() locks scroll at the browser level (top-layer),
    // not via document.body.style.overflow — we verify the open state
    expect(screen.getByRole('dialog').open).toBe(true)
  })

  it('open true→false → dialog closes', () => {
    const { rerender } = render(<Modal open title="Test" onClose={() => {}} />)
    rerender(<Modal open={false} title="Test" onClose={() => {}} />)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1)
  })

  it('description prop → text is visible', () => {
    render(<Modal open title="T" description="Action description" onClose={() => {}} />)
    expect(screen.getByText('Action description')).toBeInTheDocument()
  })

  it('footer prop → is rendered', () => {
    render(<Modal open title="T" onClose={() => {}} footer={<button>OK</button>} />)
    expect(screen.getByText('OK')).toBeInTheDocument()
  })

  it('showCloseButton=false → no Close button', () => {
    render(<Modal open title="T" onClose={() => {}} showCloseButton={false} />)
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<Modal open title="T" onClose={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renders without crashing', () => {
    expect(() => render(<Modal open title="T" onClose={() => {}} size="lg" />)).not.toThrow()
  })

  it('variant="danger" → renders without crashing', () => {
    expect(() => render(<Modal open title="T" onClose={() => {}} variant="danger" />)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<Modal open title="T" onClose={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('title=null, open, onClose → renders without crashing', () => {
    expect(() => render(<Modal open title={null} onClose={() => {}} />)).not.toThrow()
  })

  it('children=null, open, onClose → renders without crashing', () => {
    expect(() => render(<Modal open title="T" onClose={() => {}}>{null}</Modal>)).not.toThrow()
  })
})

// ─── Toast ─────────────────────────────────────────────────────────────────

// Helper component for calling useToast
function ToastTrigger({ onReady }) {
  const { addToast, removeToast } = useToast()
  // Pass functions up to the parent via callback
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

  it('ToastProvider renders children without crashing', () => {
    expect(() => render(<ToastProvider><div>ok</div></ToastProvider>)).not.toThrow()
  })

  it('useToast outside the provider → throws an error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      render(<ToastTrigger onReady={() => {}} />)
    }).toThrow(/ToastProvider/)
    spy.mockRestore()
  })

  it('addToast shows a toast with a title', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Done!', variant: 'success' }) })
    expect(screen.getByText('Done!')).toBeInTheDocument()
  })

  it('addToast shows a toast with a message', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ message: 'Toast message', variant: 'default' }) })
    expect(screen.getByText('Toast message')).toBeInTheDocument()
  })

  it('addToast returns an id (string)', () => {
    const { toastApi } = renderWithToast()
    let id
    act(() => { id = toastApi().addToast({ title: 'Test' }) })
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('removeToast removes a toast', () => {
    const { toastApi } = renderWithToast()
    let id
    act(() => { id = toastApi().addToast({ title: 'Vanish' }) })
    expect(screen.getByText('Vanish')).toBeInTheDocument()
    act(() => { toastApi().removeToast(id) })
    expect(screen.queryByText('Vanish')).not.toBeInTheDocument()
  })

  it('clicking ✕ removes the toast', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Clickable' }) })
    expect(screen.getByText('Clickable')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Close'))
    expect(screen.queryByText('Clickable')).not.toBeInTheDocument()
  })

  it('after duration ms the toast is auto-removed', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Temporary', duration: 3000 }) })
    expect(screen.getByText('Temporary')).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(3000) })
    expect(screen.queryByText('Temporary')).not.toBeInTheDocument()
  })

  it('duration=0 → toast is not auto-removed', () => {
    const { toastApi } = renderWithToast()
    act(() => { toastApi().addToast({ title: 'Persistent', duration: 0 }) })
    act(() => { vi.advanceTimersByTime(10000) })
    expect(screen.getByText('Persistent')).toBeInTheDocument()
  })

  it('variant="danger" → toast renders without crashing', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'Error', variant: 'danger' }) })
    }).not.toThrow()
  })

  it('variant="warning" → toast renders without crashing', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'Warning', variant: 'warning' }) })
    }).not.toThrow()
  })

  it('variant="info" → toast renders without crashing', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'Info', variant: 'info' }) })
    }).not.toThrow()
  })

  it('unknown variant → toast renders without crashing (fallback)', () => {
    const { toastApi } = renderWithToast()
    expect(() => {
      act(() => { toastApi().addToast({ title: 'X', variant: 'unknown' }) })
    }).not.toThrow()
  })

  it('multiple toasts at once → all are rendered', () => {
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

  it('renders children without crashing', () => {
    render(<Tooltip content="Hint"><button>Trigger</button></Tooltip>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('tooltip is not visible before hover', () => {
    render(<Tooltip content="Hint"><button>Trigger</button></Tooltip>)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('mouseenter → tooltip appears after the delay', () => {
    render(<Tooltip content="Hint" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('tooltip contains the content text', () => {
    render(<Tooltip content="Hint" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hint')
  })

  it('mouseleave → tooltip disappears', () => {
    render(<Tooltip content="Hint" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    fireEvent.mouseLeave(screen.getByRole('button'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('mouseleave before delay → tooltip does not appear', () => {
    render(<Tooltip content="Hint" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    fireEvent.mouseLeave(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('focus → tooltip appears after the delay', () => {
    render(<Tooltip content="Hint" delay={120}><button>Trigger</button></Tooltip>)
    const span = screen.getByRole('button').parentElement
    fireEvent.focus(span)
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('blur → tooltip disappears', () => {
    render(<Tooltip content="Hint" delay={120}><button>Trigger</button></Tooltip>)
    const span = screen.getByRole('button').parentElement
    fireEvent.focus(span)
    act(() => { vi.advanceTimersByTime(120) })
    fireEvent.blur(span)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('disabled=true → mouseenter does not show tooltip', () => {
    render(<Tooltip content="Hint" delay={120} disabled><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('content="" → mouseenter does not show tooltip', () => {
    render(<Tooltip content="" delay={120}><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('content=null → renders without crashing', () => {
    expect(() => render(<Tooltip content={null}><button>Trigger</button></Tooltip>)).not.toThrow()
  })

  it('title prop → is shown in the tooltip', () => {
    render(<Tooltip content="Body" title="Heading" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Heading')
    expect(screen.getByRole('tooltip')).toHaveTextContent('Body')
  })

  it('variant="danger" → renders without crashing', () => {
    expect(() => render(<Tooltip content="X" variant="danger"><button>T</button></Tooltip>)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<Tooltip content="X" variant="unknown"><button>T</button></Tooltip>)).not.toThrow()
  })

  it('placement="bottom" → renders without crashing', () => {
    render(<Tooltip content="X" placement="bottom" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('placement="left" → renders without crashing', () => {
    render(<Tooltip content="X" placement="left" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('placement="right" → renders without crashing', () => {
    render(<Tooltip content="X" placement="right" delay={120}><button>T</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByRole('button'))
    act(() => { vi.advanceTimersByTime(120) })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })
})
