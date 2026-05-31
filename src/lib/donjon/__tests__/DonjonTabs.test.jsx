import { render, screen, fireEvent } from '@testing-library/react'
import DonjonTabs from '../DonjonTabs'

const TABS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
]

const TABS_ALL_ENABLED = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]

// ─── Render ────────────────────────────────────────────────────────────────

describe('DonjonTabs — render', () => {
  it('renders role="tablist"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders the correct number of tabs', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getAllByRole('tab')).toHaveLength(TABS.length)
  })

  it('active tab has aria-selected="true"', () => {
    render(<DonjonTabs items={TABS} value="b" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'true')
  })

  it('inactive tab has aria-selected="false"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'false')
  })

  it('disabled tab has aria-disabled="true"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    expect(gammaTab).toHaveAttribute('aria-disabled', 'true')
  })

  it('tab badge is shown', () => {
    const itemsWithBadge = [{ value: 'a', label: 'Alpha', badge: 5 }]
    render(<DonjonTabs items={itemsWithBadge} value="a" onChange={() => {}} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})

// ─── Clicking ──────────────────────────────────────────────────────────────

describe('DonjonTabs — clicking', () => {
  it('click calls onChange with a string value', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('tab')[1]) // Beta
    expect(onChange).toHaveBeenCalledWith('b')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('disabled tab does not call onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.click(gammaTab)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('onChange={undefined} → click does not crash', () => {
    expect(() => {
      render(<DonjonTabs items={TABS} value="a" />)
      fireEvent.click(screen.getAllByRole('tab')[0])
    }).not.toThrow()
  })
})

// ─── Keyboard ──────────────────────────────────────────────────────────────

describe('DonjonTabs — keyboard', () => {
  it('Enter on the active tab calls onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('Space on the active tab calls onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: ' ' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('ArrowRight moves to the next enabled tab', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('ArrowLeft moves to the previous enabled tab', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const betaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Beta'))
    fireEvent.keyDown(betaTab, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('ArrowRight skips a disabled tab', () => {
    const onChange = vi.fn()
    // a, b, c(disabled), d — ArrowRight from b skips c and goes to d
    const items = [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta' },
      { value: 'c', label: 'Gamma', disabled: true },
      { value: 'd', label: 'Delta' },
    ]
    render(<DonjonTabs items={items} value="a" onChange={onChange} />)
    const betaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Beta'))
    fireEvent.keyDown(betaTab, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('d')
  })

  it('ArrowRight from the last tab wraps around to the first', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS_ALL_ENABLED} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.keyDown(gammaTab, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('ArrowLeft from the first tab wraps around to the last', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS_ALL_ENABLED} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenCalledWith('c')
  })

  it('keyDown on a disabled tab does not call onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.keyDown(gammaTab, { key: 'ArrowRight' })
    expect(onChange).not.toHaveBeenCalled()
  })
})

// ─── Variants and sizes ────────────────────────────────────────────────────

describe('DonjonTabs — variants and sizes', () => {
  it('variant="pills" → renders without crashing', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} variant="pills" />)).not.toThrow()
  })

  it('ornament="plain" → renders without decorative overlay nodes and keeps the tablist', () => {
    const { container } = render(<DonjonTabs items={TABS} value="a" onChange={() => {}} ornament="plain" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(0)
  })

  it('variant="underline" → renders without crashing', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} variant="underline" />)).not.toThrow()
  })

  it('unknown variant → renders without crashing (fallback)', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('size="sm" → renders without crashing', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renders without crashing', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('unknown size → renders without crashing (fallback)', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} size="xl" />)).not.toThrow()
  })
})

// ─── Null / undefined safety ───────────────────────────────────────────────

describe('DonjonTabs — null/undefined safety', () => {
  it('items={null} → renders without crashing', () => {
    expect(() => render(<DonjonTabs items={null} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('items={undefined} → renders without crashing', () => {
    expect(() => render(<DonjonTabs items={undefined} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('items=[] → renders an empty tablist without crashing', () => {
    expect(() => render(<DonjonTabs items={[]} value="" onChange={() => {}} />)).not.toThrow()
  })
})
