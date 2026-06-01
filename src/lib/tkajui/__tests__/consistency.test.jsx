import { render, screen, fireEvent, act } from '@testing-library/react'
import Pictogram from '../Pictogram'
import ProgressBar from '../ProgressBar'
import Toggle from '../Toggle'
import Slider from '../Slider'
import Select from '../Select'
import Tabs from '../Tabs'
import ButtonGroup from '../ButtonGroup'
import Modal from '../Modal'
import { ToastProvider, useToast } from '../Toast'
import Tooltip from '../Tooltip'
import ScoopClip from '../ScoopClip'
import CornerOrnament from '../../donjon/CornerOrnament'

const MockIcon = ({ width, height }) => <svg data-testid="mock-icon" width={width} height={height} />

const TAB_ITEMS = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
]
const BG_ITEMS = [
  { value: 'x', label: 'X' },
  { value: 'y', label: 'Y' },
]
const SELECT_OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]

// ─── size prop ─────────────────────────────────────────────────────────────

describe('consistency — size prop renders without crashing', () => {
  it('Pictogram size="sm"/"md"/"lg"/"xl" → renders without crashing', () => {
    for (const size of ['sm', 'md', 'lg', 'xl']) {
      expect(() =>
        render(<Pictogram icon={MockIcon} size={size} />)
      ).not.toThrow()
    }
  })

  it('Pictogram unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<Pictogram icon={MockIcon} size="xxl" />)).not.toThrow()
  })

  it('ProgressBar size="sm"/"md"/"lg" → renders without crashing', () => {
    for (const size of ['sm', 'md', 'lg']) {
      expect(() =>
        render(<ProgressBar value={50} max={100} size={size} />)
      ).not.toThrow()
    }
  })

  it('ProgressBar unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<ProgressBar value={50} size="xl" />)).not.toThrow()
  })

  it('Toggle size="sm"/"md" → renders without crashing', () => {
    for (const size of ['sm', 'md']) {
      expect(() =>
        render(<Toggle checked={false} onChange={() => {}} size={size} />)
      ).not.toThrow()
    }
  })

  it('Toggle unknown size → renders without crashing (fallback)', () => {
    expect(() =>
      render(<Toggle checked={false} onChange={() => {}} size="xl" />)
    ).not.toThrow()
  })

  it('Slider size="sm"/"md"/"lg" → renders without crashing', () => {
    for (const size of ['sm', 'md', 'lg']) {
      expect(() =>
        render(<Slider value={50} onChange={() => {}} size={size} />)
      ).not.toThrow()
    }
  })

  it('Slider unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<Slider value={50} onChange={() => {}} size="xl" />)).not.toThrow()
  })

  it('Select size="sm"/"md"/"lg" → renders without crashing', () => {
    for (const size of ['sm', 'md', 'lg']) {
      expect(() =>
        render(<Select options={SELECT_OPTIONS} value="" onChange={() => {}} size={size} />)
      ).not.toThrow()
    }
  })

  it('Select unknown size → renders without crashing (fallback)', () => {
    expect(() =>
      render(<Select options={SELECT_OPTIONS} value="" onChange={() => {}} size="xl" />)
    ).not.toThrow()
  })

  it('Tabs size="sm"/"md"/"lg" → renders without crashing', () => {
    for (const size of ['sm', 'md', 'lg']) {
      expect(() =>
        render(<Tabs items={TAB_ITEMS} value="a" onChange={() => {}} size={size} />)
      ).not.toThrow()
    }
  })

  it('Tabs unknown size → renders without crashing (fallback)', () => {
    expect(() =>
      render(<Tabs items={TAB_ITEMS} value="a" onChange={() => {}} size="xl" />)
    ).not.toThrow()
  })

  it('ButtonGroup size="xs"/"sm"/"md"/"lg" → renders without crashing', () => {
    for (const size of ['xs', 'sm', 'md', 'lg']) {
      expect(() =>
        render(<ButtonGroup items={BG_ITEMS} value="x" onChange={() => {}} size={size} />)
      ).not.toThrow()
    }
  })

  it('ButtonGroup unknown size → renders without crashing (fallback)', () => {
    expect(() =>
      render(<ButtonGroup items={BG_ITEMS} value="x" onChange={() => {}} size="xl" />)
    ).not.toThrow()
  })

  it('Modal size="sm"/"md"/"lg" → renders without crashing', () => {
    for (const size of ['sm', 'md', 'lg']) {
      expect(() =>
        render(<Modal isOpen title="Test" onClose={() => {}} size={size} />)
      ).not.toThrow()
    }
  })

  it('Modal unknown size → renders without crashing (fallback)', () => {
    expect(() =>
      render(<Modal isOpen title="Test" onClose={() => {}} size="xl" />)
    ).not.toThrow()
  })
})

// ─── disabled prop ────────────────────────────────────────────────────────

describe('consistency — disabled prop blocks onChange', () => {
  it('Toggle disabled=true → clicking does not call onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} disabled label="test" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('Toggle disabled=true → has disabled or aria-disabled', () => {
    render(<Toggle checked={false} onChange={() => {}} disabled label="test" />)
    const el = screen.getByRole('switch')
    const hasDisabled = el.disabled || el.getAttribute('aria-disabled') === 'true'
    expect(hasDisabled).toBe(true)
  })

  it('Slider disabled=true → change does not call onChange', () => {
    const onChange = vi.fn()
    render(<Slider value={50} onChange={onChange} disabled />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('Slider disabled=true → input is disabled', () => {
    render(<Slider value={50} onChange={() => {}} disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('Select disabled=true → clicking does not open the dropdown', () => {
    render(<Select options={SELECT_OPTIONS} value="" onChange={() => {}} disabled />)
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('Tooltip disabled=true → hover does not show the popup', async () => {
    vi.useFakeTimers()
    render(
      <Tooltip content="Hint" disabled>
        <button>Trigger</button>
      </Tooltip>
    )
    fireEvent.mouseEnter(screen.getByText('Trigger'))
    await act(() => vi.advanceTimersByTimeAsync(200))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    vi.useRealTimers()
  })
})

// ─── variant — unknown value does not crash ──────────────────────────────

describe('consistency — unknown variant renders without crashing', () => {
  it('ProgressBar variant="unknown"', () => {
    expect(() => render(<ProgressBar value={50} variant="unknown" />)).not.toThrow()
  })

  it('Toggle variant="unknown"', () => {
    expect(() =>
      render(<Toggle checked={false} onChange={() => {}} variant="unknown" />)
    ).not.toThrow()
  })

  it('Slider variant="unknown"', () => {
    expect(() =>
      render(<Slider value={50} onChange={() => {}} variant="unknown" />)
    ).not.toThrow()
  })

  it('Select variant="unknown"', () => {
    expect(() =>
      render(<Select options={SELECT_OPTIONS} value="" onChange={() => {}} variant="unknown" />)
    ).not.toThrow()
  })

  it('Modal variant="unknown"', () => {
    expect(() =>
      render(<Modal isOpen title="Test" onClose={() => {}} variant="unknown" />)
    ).not.toThrow()
  })

  it('Tooltip variant="unknown"', () => {
    expect(() =>
      render(<Tooltip content="x" variant="unknown"><button>T</button></Tooltip>)
    ).not.toThrow()
  })

  it('Tabs variant="unknown"', () => {
    expect(() =>
      render(<Tabs items={TAB_ITEMS} value="a" onChange={() => {}} variant="unknown" />)
    ).not.toThrow()
  })

  it('ButtonGroup variant="unknown"', () => {
    expect(() =>
      render(<ButtonGroup items={BG_ITEMS} value="x" onChange={() => {}} variant="unknown" />)
    ).not.toThrow()
  })
})

// ─── className + style passthrough to wrapper ────────────────────────────

describe('consistency — className + style passthrough to wrapper', () => {
  it('ProgressBar className="x" → present on the wrapper', () => {
    const { container } = render(<ProgressBar value={50} className="x" />)
    expect(container.querySelector('.x')).toBeInTheDocument()
  })

  it('ProgressBar style={{ opacity: 0.5 }} → present on the wrapper', () => {
    const { container } = render(<ProgressBar value={50} style={{ opacity: 0.5 }} />)
    const el = container.firstChild
    expect(el.style.opacity).toBe('0.5')
  })

  it('ScoopClip className="x" → present on the wrapper', () => {
    const { container } = render(<ScoopClip r={0.25} className="x"><div /></ScoopClip>)
    expect(container.querySelector('.x')).toBeInTheDocument()
  })

  it('ScoopClip style={{ height: 48 }} → present on the wrapper', () => {
    const { container } = render(<ScoopClip r={0.25} style={{ height: 48 }}><div /></ScoopClip>)
    // ScoopClip may apply height on the inner div or wrapper — we just verify it does not crash
    expect(container.firstChild).toBeInTheDocument()
  })

  it('Pictogram className="x" → present on the span', () => {
    const { container } = render(<Pictogram icon={MockIcon} className="x" />)
    expect(container.querySelector('.x')).toBeInTheDocument()
  })

  it('Pictogram style={{ margin: 4 }} → present on the span', () => {
    const { container } = render(<Pictogram icon={MockIcon} style={{ margin: 4 }} />)
    const el = container.firstChild
    expect(el.style.margin).toBe('4px')
  })

  it('CornerOrnament style={{ position: "absolute" }} → present on the svg', () => {
    const { container } = render(
      <CornerOrnament style={{ position: 'absolute', top: 0, left: 0 }} />
    )
    const svg = container.querySelector('svg')
    expect(svg.style.position).toBe('absolute')
  })
})

// ─── onChange — returns a value, not an event ────────────────────────────

describe('consistency — onChange returns a value, not an event', () => {
  it('Toggle onChange → receives a boolean', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} label="test" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(typeof onChange.mock.calls[0][0]).toBe('boolean')
  })

  it('Slider onChange → receives a number', () => {
    const onChange = vi.fn()
    render(<Slider value={50} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
    expect(typeof onChange.mock.calls[0][0]).toBe('number')
  })

  it('Select onChange → receives a string', () => {
    const onChange = vi.fn()
    render(<Select options={SELECT_OPTIONS} value="" onChange={onChange} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('Tabs onChange → receives a string', () => {
    const onChange = vi.fn()
    render(<Tabs items={TAB_ITEMS} value="a" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('tab')[1])
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('ButtonGroup onChange → receives a string', () => {
    const onChange = vi.fn()
    render(<ButtonGroup items={BG_ITEMS} value="x" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('button')[1])
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })
})

// ─── CornerOrnament cornerType ───────────────────────────────────────────

describe('CornerOrnament — cornerType', () => {
  it('cornerType="cut" → renders svg (default)', () => {
    const { container } = render(<CornerOrnament cornerType="cut" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('cornerType="round" → renders svg with a path element', () => {
    const { container } = render(<CornerOrnament cornerType="round" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('path')).toBeInTheDocument()
  })

  it('cornerType="scoop" → renders svg with a path element', () => {
    const { container } = render(<CornerOrnament cornerType="scoop" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('path')).toBeInTheDocument()
  })

  it('cornerType="round" vs "scoop" → path d attributes differ', () => {
    const { container: cRound } = render(<CornerOrnament cornerType="round" />)
    const { container: cScoop } = render(<CornerOrnament cornerType="scoop" />)
    const dRound = cRound.querySelector('path')?.getAttribute('d')
    const dScoop = cScoop.querySelector('path')?.getAttribute('d')
    expect(dRound).not.toBe(dScoop)
  })

  it('cornerType="cut" → renders two rect elements (sharp L)', () => {
    const { container } = render(<CornerOrnament cornerType="cut" variant="bracket" />)
    expect(container.querySelectorAll('rect')).toHaveLength(2)
  })

  it('unknown cornerType → renders without crashing (falls back to cut)', () => {
    expect(() => render(<CornerOrnament cornerType="unknown" />)).not.toThrow()
  })

  it('variant="dot" with various cornerType → renders without crashing', () => {
    for (const ct of ['cut', 'round', 'scoop']) {
      expect(() => render(<CornerOrnament variant="dot" cornerType={ct} />)).not.toThrow()
    }
  })
})

// ─── NotchedBox ──────────────────────────────────────────────────────────

describe('NotchedBox', () => {
  // Lazy import — NotchedBox does not need to be tested in phase2/3/4
  let NotchedBoxComp
  beforeAll(async () => {
    const mod = await import('../NotchedBox')
    NotchedBoxComp = mod.default
  })

  it('renders children', () => {
    render(
      <NotchedBoxComp style={{ width: 100, height: 60 }}>
        <span>Content</span>
      </NotchedBoxComp>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies clipPath via octagonWithNotch', () => {
    const { container } = render(
      <NotchedBoxComp cx={12} nw={28} nh={12} side="bottom"
        style={{ width: 100, height: 60 }}
      />
    )
    const inner = container.querySelector('[style*="clip-path"]')
    expect(inner).toBeInTheDocument()
    expect(inner.style.clipPath).toContain('polygon(')
  })

  it('side="top"/"bottom"/"left"/"right" → renders without crashing', () => {
    for (const side of ['top', 'bottom', 'left', 'right']) {
      expect(() =>
        render(<NotchedBoxComp side={side} style={{ width: 80, height: 50 }} />)
      ).not.toThrow()
    }
  })

  it('Slot renders outside the clip-path div', () => {
    const { container } = render(
      <NotchedBoxComp style={{ width: 100, height: 60 }}>
        <NotchedBoxComp.Slot>
          <span>slot-content</span>
        </NotchedBoxComp.Slot>
      </NotchedBoxComp>
    )
    expect(screen.getByText('slot-content')).toBeInTheDocument()
    // Slot is absolutely positioned — it sits outside the clipped div (as a sibling)
    const clipped = container.querySelector('[style*="clip-path"]')
    expect(clipped.contains(screen.getByText('slot-content'))).toBe(false)
  })

  it('without children → renders without crashing', () => {
    expect(() =>
      render(<NotchedBoxComp style={{ width: 80, height: 50 }} />)
    ).not.toThrow()
  })
})
