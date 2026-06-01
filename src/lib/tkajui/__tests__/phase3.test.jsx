import { render, screen, fireEvent } from '@testing-library/react'
import Toggle from '../Toggle'
import Slider from '../Slider'
import Select from '../Select'
import Tabs from '../Tabs'
import ButtonGroup from '../ButtonGroup'

// ─── Toggle ────────────────────────────────────────────────────────────────

describe('Toggle', () => {
  it('renders an element with role="switch"', () => {
    render(<Toggle />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('checked=false → aria-checked="false"', () => {
    render(<Toggle checked={false} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('checked=true → aria-checked="true"', () => {
    render(<Toggle checked={true} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('click calls onChange with the opposite value', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('click from checked=true calls onChange(false)', () => {
    const onChange = vi.fn()
    render(<Toggle checked={true} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('disabled=true → click does not call onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} disabled />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disabled=true → aria-disabled="true"', () => {
    render(<Toggle disabled />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true')
  })

  it('Enter key calls onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} />)
    fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('Space key calls onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} />)
    fireEvent.keyDown(screen.getByRole('switch'), { key: ' ' })
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('disabled=true → Enter does not call onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} disabled />)
    fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('label prop → text is in the document', () => {
    render(<Toggle label="Sound" />)
    expect(screen.getByText('Sound')).toBeInTheDocument()
  })

  it('without label → no extra text', () => {
    render(<Toggle />)
    expect(screen.queryByText('Sound')).not.toBeInTheDocument()
  })

  it('onChange={undefined} → click does not crash', () => {
    expect(() => {
      render(<Toggle checked={false} />)
      fireEvent.click(screen.getByRole('switch'))
    }).not.toThrow()
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<Toggle size="sm" />)).not.toThrow()
  })

  it('size="md" → renders without crashing', () => {
    expect(() => render(<Toggle size="md" />)).not.toThrow()
  })

  it('unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<Toggle size="xl" />)).not.toThrow()
  })

  it('variant="danger" → renders without crashing', () => {
    expect(() => render(<Toggle variant="danger" />)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<Toggle variant="unknown" />)).not.toThrow()
  })
})

// ─── Slider ────────────────────────────────────────────────────────────────

describe('Slider', () => {
  it('renders <input type="range">', () => {
    render(<Slider value={50} onChange={() => {}} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('value=50 → input has value="50"', () => {
    render(<Slider value={50} onChange={() => {}} />)
    expect(screen.getByRole('slider')).toHaveAttribute('value', '50')
  })

  it('min and max props → aria-valuemin, aria-valuemax', () => {
    render(<Slider value={5} min={0} max={10} onChange={() => {}} />)
    const input = screen.getByRole('slider')
    expect(input).toHaveAttribute('aria-valuemin', '0')
    expect(input).toHaveAttribute('aria-valuemax', '10')
  })

  it('onChange receives a number (not an event)', () => {
    const onChange = vi.fn()
    render(<Slider value={50} onChange={onChange} min={0} max={100} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
    expect(onChange).toHaveBeenCalledWith(75)
    expect(typeof onChange.mock.calls[0][0]).toBe('number')
  })

  it('disabled=true → input is disabled', () => {
    render(<Slider value={50} onChange={() => {}} disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('label="Volume" → text is in the document', () => {
    render(<Slider value={50} label="Volume" onChange={() => {}} />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('showValue=true → the current value is visible', () => {
    render(<Slider value={42} showValue onChange={() => {}} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('formatValue → shows the formatted value', () => {
    render(<Slider value={50} showValue formatValue={v => `${v}%`} onChange={() => {}} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<Slider value={0} size="sm" onChange={() => {}} />)).not.toThrow()
  })

  it('size="lg" → renders without crashing', () => {
    expect(() => render(<Slider value={0} size="lg" onChange={() => {}} />)).not.toThrow()
  })

  it('unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<Slider value={0} size="xl" onChange={() => {}} />)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<Slider value={0} variant="unknown" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={null} → moving the slider does not crash', () => {
    expect(() => {
      render(<Slider value={50} onChange={null} />)
      fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } })
    }).not.toThrow()
  })

  it('step prop is forwarded to the input', () => {
    render(<Slider value={0} step={5} onChange={() => {}} />)
    expect(screen.getByRole('slider')).toHaveAttribute('step', '5')
  })
})

// ─── Select ────────────────────────────────────────────────────────────────

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]

describe('Select', () => {
  it('renders a trigger button with role="combobox"', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('aria-expanded=false in the closed state', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('click opens the dropdown (aria-expanded=true)', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
  })

  it('open dropdown shows options with role="option"', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length)
  })

  it('clicking an option calls onChange with a string', () => {
    const onChange = vi.fn()
    render(<Select options={OPTIONS} value="" onChange={onChange} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith('b')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('clicking an option closes the dropdown', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('Alpha'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('selected option has aria-selected=true', () => {
    render(<Select options={OPTIONS} value="b" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    const opts = screen.getAllByRole('option')
    const betaOpt = opts.find(o => o.textContent.includes('Beta'))
    expect(betaOpt).toHaveAttribute('aria-selected', 'true')
  })

  it('disabled=true → click does not open the dropdown', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} disabled />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('disabled=true → aria-disabled="true" on the trigger', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} disabled />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
  })

  it('Escape closes the dropdown', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' })
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('label prop → text is in the document', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} label="Language" />)
    expect(screen.getByText('Language')).toBeInTheDocument()
  })

  it('placeholder is shown when nothing is selected', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} placeholder="Select..." />)
    expect(screen.getByText('Select...')).toBeInTheDocument()
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<Select options={OPTIONS} value="" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renders without crashing', () => {
    expect(() => render(<Select options={OPTIONS} value="" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<Select options={OPTIONS} value="" onChange={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('options=[] → renders without crashing', () => {
    expect(() => render(<Select options={[]} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={undefined} → clicking an option does not crash', () => {
    expect(() => {
      render(<Select options={OPTIONS} value="" />)
      fireEvent.click(screen.getByRole('combobox'))
      fireEvent.click(screen.getByText('Alpha'))
    }).not.toThrow()
  })
})

// ─── Tabs ──────────────────────────────────────────────────────────────────

const TABS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
]

describe('Tabs', () => {
  it('renders role="tablist"', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders the correct number of tabs', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getAllByRole('tab')).toHaveLength(TABS.length)
  })

  it('active tab has aria-selected="true"', () => {
    render(<Tabs items={TABS} value="b" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'true')
  })

  it('inactive tab has aria-selected="false"', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'false')
  })

  it('click calls onChange with a string value', () => {
    const onChange = vi.fn()
    render(<Tabs items={TABS} value="a" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('tab')[1]) // Beta
    expect(onChange).toHaveBeenCalledWith('b')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('disabled tab does not call onChange', () => {
    const onChange = vi.fn()
    render(<Tabs items={TABS} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.click(gammaTab)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disabled tab has aria-disabled="true"', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    expect(gammaTab).toHaveAttribute('aria-disabled', 'true')
  })

  it('variant="pills" → renders without crashing', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} variant="pills" />)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renders without crashing', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('items=[] → renders an empty tablist without crashing', () => {
    expect(() => render(<Tabs items={[]} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={undefined} → click does not crash', () => {
    expect(() => {
      render(<Tabs items={TABS} value="a" />)
      fireEvent.click(screen.getAllByRole('tab')[0])
    }).not.toThrow()
  })

  it('tab badge is rendered', () => {
    const itemsWithBadge = [{ value: 'a', label: 'Alpha', badge: 3 }]
    render(<Tabs items={itemsWithBadge} value="a" onChange={() => {}} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})

// ─── ButtonGroup ───────────────────────────────────────────────────────────

const GROUP_ITEMS = [
  { value: 'x', label: 'X' },
  { value: 'y', label: 'Y' },
  { value: 'z', label: 'Z' },
]

describe('ButtonGroup', () => {
  it('renders role="group"', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders the correct number of buttons', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(GROUP_ITEMS.length)
  })

  it('click calls onChange with a string value', () => {
    const onChange = vi.fn()
    render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('button')[1]) // Y
    expect(onChange).toHaveBeenCalledWith('y')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('active item has aria-pressed=true', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="y" onChange={() => {}} />)
    const btns = screen.getAllByRole('button')
    // Y is the second one (index 1)
    expect(btns[1]).toHaveAttribute('aria-pressed', 'true')
  })

  it('inactive item has aria-pressed=false', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="y" onChange={() => {}} />)
    const btns = screen.getAllByRole('button')
    expect(btns[0]).toHaveAttribute('aria-pressed', 'false')
  })

  it('size="xs" → renders without crashing', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="xs" />)).not.toThrow()
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renders without crashing', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="xxl" />)).not.toThrow()
  })

  it('variant="tabs" → renders without crashing', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} variant="tabs" />)).not.toThrow()
  })

  it('dividers=true → renders without crashing', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} dividers />)).not.toThrow()
  })

  it('items=[] → renders an empty group without crashing', () => {
    expect(() => render(<ButtonGroup items={[]} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={undefined} → click does not crash', () => {
    expect(() => {
      render(<ButtonGroup items={GROUP_ITEMS} value="x" />)
      fireEvent.click(screen.getAllByRole('button')[0])
    }).not.toThrow()
  })

  it('single item → renders without crashing (only button = octagon clip)', () => {
    expect(() => render(<ButtonGroup items={[{ value: 'solo', label: 'Solo' }]} value="solo" onChange={() => {}} />)).not.toThrow()
  })
})
