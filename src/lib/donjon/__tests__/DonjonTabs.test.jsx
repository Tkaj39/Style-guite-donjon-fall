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
  it('renderuje role="tablist"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renderuje správný počet tabů', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getAllByRole('tab')).toHaveLength(TABS.length)
  })

  it('aktivní tab má aria-selected="true"', () => {
    render(<DonjonTabs items={TABS} value="b" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'true')
  })

  it('neaktivní tab má aria-selected="false"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'false')
  })

  it('disabled tab má aria-disabled="true"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    expect(gammaTab).toHaveAttribute('aria-disabled', 'true')
  })

  it('tab badge se zobrazí', () => {
    const itemsWithBadge = [{ value: 'a', label: 'Alpha', badge: 5 }]
    render(<DonjonTabs items={itemsWithBadge} value="a" onChange={() => {}} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})

// ─── Klikání ───────────────────────────────────────────────────────────────

describe('DonjonTabs — klikání', () => {
  it('kliknutí zavolá onChange se string hodnotou', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('tab')[1]) // Beta
    expect(onChange).toHaveBeenCalledWith('b')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('disabled tab nezavolá onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.click(gammaTab)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('onChange={undefined} → kliknutí necrashne', () => {
    expect(() => {
      render(<DonjonTabs items={TABS} value="a" />)
      fireEvent.click(screen.getAllByRole('tab')[0])
    }).not.toThrow()
  })
})

// ─── Klávesnice ────────────────────────────────────────────────────────────

describe('DonjonTabs — klávesnice', () => {
  it('Enter na aktivním tabu zavolá onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('Space na aktivním tabu zavolá onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: ' ' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('ArrowRight přepne na další povolený tab', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('ArrowLeft přepne na předchozí povolený tab', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const betaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Beta'))
    fireEvent.keyDown(betaTab, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('ArrowRight přeskočí disabled tab', () => {
    const onChange = vi.fn()
    // a, b, c(disabled), d — ArrowRight z b přeskočí c a jde na d
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

  it('ArrowRight z posledního tabu se wraparound na první', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS_ALL_ENABLED} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.keyDown(gammaTab, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('ArrowLeft z prvního tabu se wraparound na poslední', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS_ALL_ENABLED} value="a" onChange={onChange} />)
    const alphaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Alpha'))
    fireEvent.keyDown(alphaTab, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenCalledWith('c')
  })

  it('keyDown na disabled tabu nezavolá onChange', () => {
    const onChange = vi.fn()
    render(<DonjonTabs items={TABS} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.keyDown(gammaTab, { key: 'ArrowRight' })
    expect(onChange).not.toHaveBeenCalled()
  })
})

// ─── Varianty a velikosti ──────────────────────────────────────────────────

describe('DonjonTabs — varianty a velikosti', () => {
  it('variant="pills" → renderuje bez pádu', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} variant="pills" />)).not.toThrow()
  })

  it('variant="underline" → renderuje bez pádu', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} variant="underline" />)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renderuje bez pádu', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('neznámý size → renderuje bez pádu (fallback)', () => {
    expect(() => render(<DonjonTabs items={TABS} value="a" onChange={() => {}} size="xl" />)).not.toThrow()
  })
})

// ─── Null / undefined safety ───────────────────────────────────────────────

describe('DonjonTabs — null/undefined safety', () => {
  it('items={null} → renderuje bez pádu', () => {
    expect(() => render(<DonjonTabs items={null} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('items={undefined} → renderuje bez pádu', () => {
    expect(() => render(<DonjonTabs items={undefined} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('items=[] → renderuje prázdný tablist bez pádu', () => {
    expect(() => render(<DonjonTabs items={[]} value="" onChange={() => {}} />)).not.toThrow()
  })
})
