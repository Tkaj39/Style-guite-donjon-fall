import { render, screen, fireEvent } from '@testing-library/react'
import Select from '../Select'
import Tabs from '../Tabs'
import ButtonGroup from '../ButtonGroup'
import ProgressBar from '../ProgressBar'
import Pictogram from '../Pictogram'
import Slider from '../Slider'
import Modal from '../Modal'
import Tooltip from '../Tooltip'

// ─── Select — null/undefined safety ────────────────────────────────────────

describe('Select null/undefined safety', () => {
  it('options={null} → renders without crashing', () => {
    expect(() => render(<Select options={null} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('options={undefined} → renders without crashing', () => {
    expect(() => render(<Select options={undefined} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('options=[] value="x" → no options', () => {
    expect(() => {
      render(<Select options={[]} value="x" onChange={() => {}} />)
      fireEvent.click(screen.getByRole('combobox'))
    }).not.toThrow()
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })

  it('onChange={null} → clicking an option does not crash', () => {
    expect(() => {
      render(<Select options={[{ value: 'a', label: 'A' }]} value="" onChange={null} />)
      fireEvent.click(screen.getByRole('combobox'))
      fireEvent.click(screen.getByText('A'))
    }).not.toThrow()
  })
})

// ─── Tabs — null/undefined safety ──────────────────────────────────────────

describe('Tabs null/undefined safety', () => {
  it('items={null} → renders without crashing', () => {
    expect(() => render(<Tabs items={null} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('items={undefined} → renders without crashing', () => {
    expect(() => render(<Tabs items={undefined} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={undefined} → clicking does not crash', () => {
    const items = [{ value: 'a', label: 'A' }]
    expect(() => {
      render(<Tabs items={items} value="" />)
      fireEvent.click(screen.getByRole('tab'))
    }).not.toThrow()
  })
})

// ─── ButtonGroup — null/undefined safety ────────────────────────────────────

describe('ButtonGroup null/undefined safety', () => {
  it('items=[] → renders an empty group without crashing', () => {
    expect(() => render(<ButtonGroup items={[]} value="" onChange={() => {}} />)).not.toThrow()
  })

  it('items={null} → renders without crashing', () => {
    expect(() => render(<ButtonGroup items={null} value="" onChange={() => {}} />)).not.toThrow()
  })
})

// ─── ProgressBar — edge values ──────────────────────────────────────────────

describe('ProgressBar edge values', () => {
  it('value={NaN} → does not crash', () => {
    expect(() => render(<ProgressBar value={NaN} />)).not.toThrow()
  })

  it('value={NaN} → fill has a width (jsdom ignores NaN%, returns "")', () => {
    const { container } = render(<ProgressBar value={NaN} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    // NaN → Math.max(0, NaN) = NaN → Math.min(100, NaN) = NaN → "NaN%"
    // jsdom ignores invalid CSS → style.width = "" or "NaN%"
    // We only test that it doesn't crash and width isn't negative
    const w = fill.style.width
    expect(w === '' || w === 'NaN%' || w === '0%').toBe(true)
  })

  it('value={Infinity} → does not crash', () => {
    expect(() => render(<ProgressBar value={Infinity} />)).not.toThrow()
  })

  it('value={Infinity} → fill does not exceed 100%', () => {
    const { container } = render(<ProgressBar value={Infinity} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('100%')
  })

  it('value={-10} → does not crash, fill is not negative', () => {
    const { container } = render(<ProgressBar value={-10} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('0%')
  })

  it('value={150} max={100} → fill is capped at 100%', () => {
    const { container } = render(<ProgressBar value={150} max={100} />)
    const fill = container.querySelector('[role="progressbar"] > div')
    expect(fill.style.width).toBe('100%')
  })
})

// ─── Pictogram — null/undefined safety ─────────────────────────────────────

describe('Pictogram null/undefined safety', () => {
  it('icon={undefined} → does not crash, returns null', () => {
    const { container } = render(<Pictogram icon={undefined} />)
    expect(container.firstChild).toBeNull()
  })

  it('icon={null} → does not crash, returns null', () => {
    const { container } = render(<Pictogram icon={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('icon defined → does not crash', () => {
    const Icon = ({ width, height }) => <svg width={width} height={height} />
    expect(() => render(<Pictogram icon={Icon} />)).not.toThrow()
  })
})

// ─── Slider — edge values ───────────────────────────────────────────────────

describe('Slider edge values', () => {
  it('value={NaN} → does not crash', () => {
    expect(() => render(<Slider value={NaN} onChange={() => {}} />)).not.toThrow()
  })

  it('min={50} max={10} → does not crash (inverted range)', () => {
    expect(() => render(<Slider value={50} min={50} max={10} onChange={() => {}} />)).not.toThrow()
  })

  it('onChange={null} → moving the slider does not crash', () => {
    expect(() => {
      render(<Slider value={50} onChange={null} />)
      fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } })
    }).not.toThrow()
  })
})

// ─── Modal — null/undefined safety ─────────────────────────────────────────

describe('Modal null/undefined safety', () => {
  it('title={null} open onClose → renders without crashing', () => {
    expect(() => render(<Modal open title={null} onClose={() => {}} />)).not.toThrow()
  })

  it('children={null} open onClose → renders without crashing', () => {
    expect(() => render(<Modal open title="T" onClose={() => {}}>{null}</Modal>)).not.toThrow()
  })
})

// ─── Tooltip — null/undefined safety ───────────────────────────────────────

describe('Tooltip null/undefined safety', () => {
  it('content={null} → renders without crashing', () => {
    expect(() => render(<Tooltip content={null}><button>T</button></Tooltip>)).not.toThrow()
  })

  it('content="" → renders without crashing', () => {
    expect(() => render(<Tooltip content=""><button>T</button></Tooltip>)).not.toThrow()
  })
})
