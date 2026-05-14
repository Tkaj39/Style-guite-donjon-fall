import { render, screen, fireEvent } from '@testing-library/react'
import Toggle from '../Toggle'
import Slider from '../Slider'
import Select from '../Select'
import Tabs from '../Tabs'
import ButtonGroup from '../ButtonGroup'

// ─── Toggle ────────────────────────────────────────────────────────────────

describe('Toggle', () => {
  it('renderuje element s role="switch"', () => {
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

  it('kliknutí zavolá onChange s opačnou hodnotou', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('kliknutí z checked=true zavolá onChange(false)', () => {
    const onChange = vi.fn()
    render(<Toggle checked={true} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('disabled=true → kliknutí nezavolá onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} disabled />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disabled=true → aria-disabled="true"', () => {
    render(<Toggle disabled />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true')
  })

  it('Enter klávesa zavolá onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} />)
    fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('Space klávesa zavolá onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} />)
    fireEvent.keyDown(screen.getByRole('switch'), { key: ' ' })
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('disabled=true → Enter nezavolá onChange', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} disabled />)
    fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('label prop → text je v dokumentu', () => {
    render(<Toggle label="Zvuk" />)
    expect(screen.getByText('Zvuk')).toBeInTheDocument()
  })

  it('bez label → žádný extra text', () => {
    render(<Toggle />)
    expect(screen.queryByText('Zvuk')).not.toBeInTheDocument()
  })

  it('onChange={undefined} → kliknutí necrashne', () => {
    expect(() => {
      render(<Toggle checked={false} />)
      fireEvent.click(screen.getByRole('switch'))
    }).not.toThrow()
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<Toggle size="sm" />)).not.toThrow()
  })

  it('size="md" → renderuje bez pádu', () => {
    expect(() => render(<Toggle size="md" />)).not.toThrow()
  })

  it('neznámý size → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Toggle size="xl" />)).not.toThrow()
  })

  it('variant="danger" → renderuje bez pádu', () => {
    expect(() => render(<Toggle variant="danger" />)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Toggle variant="unknown" />)).not.toThrow()
  })
})

// ─── Slider ────────────────────────────────────────────────────────────────

describe('Slider', () => {
  it('renderuje <input type="range">', () => {
    render(<Slider value={50} onChange={() => {}} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('value=50 → input má value="50"', () => {
    render(<Slider value={50} onChange={() => {}} />)
    expect(screen.getByRole('slider')).toHaveAttribute('value', '50')
  })

  it('min a max props → aria-valuemin, aria-valuemax', () => {
    render(<Slider value={5} min={0} max={10} onChange={() => {}} />)
    const input = screen.getByRole('slider')
    expect(input).toHaveAttribute('aria-valuemin', '0')
    expect(input).toHaveAttribute('aria-valuemax', '10')
  })

  it('onChange dostane číslo (ne event)', () => {
    const onChange = vi.fn()
    render(<Slider value={50} onChange={onChange} min={0} max={100} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
    expect(onChange).toHaveBeenCalledWith(75)
    expect(typeof onChange.mock.calls[0][0]).toBe('number')
  })

  it('disabled=true → input je disabled', () => {
    render(<Slider value={50} onChange={() => {}} disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('label="Hlasitost" → text je v dokumentu', () => {
    render(<Slider value={50} label="Hlasitost" onChange={() => {}} />)
    expect(screen.getByText('Hlasitost')).toBeInTheDocument()
  })

  it('showValue=true → aktuální hodnota je viditelná', () => {
    render(<Slider value={42} showValue onChange={() => {}} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('formatValue → zobrazí formátovanou hodnotu', () => {
    render(<Slider value={50} showValue formatValue={v => `${v}%`} onChange={() => {}} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<Slider value={0} size="sm" onChange={() => {}} />)).not.toThrow()
  })

  it('size="lg" → renderuje bez pádu', () => {
    expect(() => render(<Slider value={0} size="lg" onChange={() => {}} />)).not.toThrow()
  })

  it('neznámý size → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Slider value={0} size="xl" onChange={() => {}} />)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Slider value={0} variant="unknown" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={null} → pohyb slideru necrashne', () => {
    expect(() => {
      render(<Slider value={50} onChange={null} />)
      fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } })
    }).not.toThrow()
  })

  it('step prop se předá na input', () => {
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
  it('renderuje trigger button s role="combobox"', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('aria-expanded=false v zavřeném stavu', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('kliknutí otevře dropdown (aria-expanded=true)', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
  })

  it('otevřený dropdown zobrazí options jako role="option"', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length)
  })

  it('kliknutí na option zavolá onChange se stringem', () => {
    const onChange = vi.fn()
    render(<Select options={OPTIONS} value="" onChange={onChange} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith('b')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('kliknutí na option zavře dropdown', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('Alpha'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('selected option má aria-selected=true', () => {
    render(<Select options={OPTIONS} value="b" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    const opts = screen.getAllByRole('option')
    const betaOpt = opts.find(o => o.textContent.includes('Beta'))
    expect(betaOpt).toHaveAttribute('aria-selected', 'true')
  })

  it('disabled=true → kliknutí neotevře dropdown', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} disabled />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('disabled=true → aria-disabled="true" na trigger', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} disabled />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
  })

  it('Escape zavře dropdown', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' })
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('label prop → text je v dokumentu', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} label="Jazyk" />)
    expect(screen.getByText('Jazyk')).toBeInTheDocument()
  })

  it('placeholder se zobrazí když nic není vybráno', () => {
    render(<Select options={OPTIONS} value="" onChange={() => {}} placeholder="Vyberte..." />)
    expect(screen.getByText('Vyberte...')).toBeInTheDocument()
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<Select options={OPTIONS} value="" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renderuje bez pádu', () => {
    expect(() => render(<Select options={OPTIONS} value="" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Select options={OPTIONS} value="" onChange={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('options=[] → renderuje bez pádu', () => {
    expect(() => render(<Select options={[]} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={undefined} → kliknutí na option necrashne', () => {
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
  it('renderuje role="tablist"', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renderuje správný počet tabů', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getAllByRole('tab')).toHaveLength(TABS.length)
  })

  it('aktivní tab má aria-selected="true"', () => {
    render(<Tabs items={TABS} value="b" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'true')
  })

  it('neaktivní tab má aria-selected="false"', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    const betaTab = tabs.find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'false')
  })

  it('kliknutí zavolá onChange se string hodnotou', () => {
    const onChange = vi.fn()
    render(<Tabs items={TABS} value="a" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('tab')[1]) // Beta
    expect(onChange).toHaveBeenCalledWith('b')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('disabled tab nezavolá onChange', () => {
    const onChange = vi.fn()
    render(<Tabs items={TABS} value="a" onChange={onChange} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    fireEvent.click(gammaTab)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disabled tab má aria-disabled="true"', () => {
    render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    expect(gammaTab).toHaveAttribute('aria-disabled', 'true')
  })

  it('variant="pills" → renderuje bez pádu', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} variant="pills" />)).not.toThrow()
  })

  it('neznámý variant → renderuje bez pádu (fallback)', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} variant="unknown" />)).not.toThrow()
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renderuje bez pádu', () => {
    expect(() => render(<Tabs items={TABS} value="a" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('items=[] → renderuje prázdný tablist bez pádu', () => {
    expect(() => render(<Tabs items={[]} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={undefined} → kliknutí necrashne', () => {
    expect(() => {
      render(<Tabs items={TABS} value="a" />)
      fireEvent.click(screen.getAllByRole('tab')[0])
    }).not.toThrow()
  })

  it('tab badge se zobrazí', () => {
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
  it('renderuje role="group"', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renderuje správný počet buttonů', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(GROUP_ITEMS.length)
  })

  it('kliknutí zavolá onChange se string hodnotou', () => {
    const onChange = vi.fn()
    render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('button')[1]) // Y
    expect(onChange).toHaveBeenCalledWith('y')
    expect(typeof onChange.mock.calls[0][0]).toBe('string')
  })

  it('aktivní item má aria-pressed=true', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="y" onChange={() => {}} />)
    const btns = screen.getAllByRole('button')
    // Y je druhý (index 1)
    expect(btns[1]).toHaveAttribute('aria-pressed', 'true')
  })

  it('neaktivní item má aria-pressed=false', () => {
    render(<ButtonGroup items={GROUP_ITEMS} value="y" onChange={() => {}} />)
    const btns = screen.getAllByRole('button')
    expect(btns[0]).toHaveAttribute('aria-pressed', 'false')
  })

  it('size="xs" → renderuje bez pádu', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="xs" />)).not.toThrow()
  })

  it('size="sm" → renderuje bez pádu', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="sm" />)).not.toThrow()
  })

  it('size="lg" → renderuje bez pádu', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="lg" />)).not.toThrow()
  })

  it('neznámý size → renderuje bez pádu (fallback)', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} size="xxl" />)).not.toThrow()
  })

  it('variant="tabs" → renderuje bez pádu', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} variant="tabs" />)).not.toThrow()
  })

  it('dividers=true → renderuje bez pádu', () => {
    expect(() => render(<ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} dividers />)).not.toThrow()
  })

  it('items=[] → renderuje prázdnou skupinu bez pádu', () => {
    expect(() => render(<ButtonGroup items={[]} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={undefined} → kliknutí necrashne', () => {
    expect(() => {
      render(<ButtonGroup items={GROUP_ITEMS} value="x" />)
      fireEvent.click(screen.getAllByRole('button')[0])
    }).not.toThrow()
  })

  it('jeden item → renderuje bez pádu (only button = octagon clip)', () => {
    expect(() => render(<ButtonGroup items={[{ value: 'solo', label: 'Solo' }]} value="solo" onChange={() => {}} />)).not.toThrow()
  })
})
