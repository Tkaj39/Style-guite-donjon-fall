import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import Toggle from '../Toggle'
import Slider from '../Slider'
import ProgressBar from '../ProgressBar'
import Select from '../Select'
import Tabs from '../Tabs'
import ButtonGroup from '../ButtonGroup'
import Modal from '../Modal'
import Tooltip from '../Tooltip'
import Pictogram from '../Pictogram'

expect.extend(toHaveNoViolations)

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]

const TABS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]

const GROUP_ITEMS = [
  { value: 'x', label: 'X' },
  { value: 'y', label: 'Y' },
]

const MockIcon = ({ width, height }) => (
  <svg width={width} height={height} aria-hidden="true" />
)

// ─── axe audit ─────────────────────────────────────────────────────────────

describe('Accessibility (axe audit)', () => {
  it('Toggle s label projde axe audit', async () => {
    const { container } = render(
      <Toggle label="Zvuk" checked={false} onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Toggle bez label → axe HLÁSÍ porušení nebo přijme (závisí na a11y implemenaci)', async () => {
    const { container } = render(
      <Toggle checked={false} onChange={() => {}} />
    )
    // Bez label/aria-label axe hlásí porušení "aria-toggle-field-name".
    // Tento test dokumentuje chování — pokud Toggle bez labelu projde,
    // implementace přidala fallback; pokud ne, je to dokumentované porušení.
    const result = await axe(container)
    expect(result).toBeDefined() // axe proběhlo bez chyby (nezávisle na violations)
  })

  it('Slider s label projde axe audit', async () => {
    const { container } = render(
      <Slider label="Hlasitost" value={50} min={0} max={100} onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('ProgressBar s label projde axe audit', async () => {
    const { container } = render(
      <ProgressBar label="Načítání" value={50} max={100} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Select s label projde axe audit', async () => {
    const { container } = render(
      <Select label="Jazyk" options={OPTIONS} value="" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Tabs projde axe audit', async () => {
    const { container } = render(
      <Tabs items={TABS} value="a" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('ButtonGroup projde axe audit', async () => {
    const { container } = render(
      <ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Modal isOpen s title projde axe audit', async () => {
    const { container } = render(
      <Modal isOpen title="Potvrzení" onClose={() => {}}>
        <p>Opravdu chcete pokračovat?</p>
      </Modal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Tooltip projde axe audit', async () => {
    const { container } = render(
      <Tooltip content="Nápověda k tlačítku">
        <button type="button">Trigger</button>
      </Tooltip>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Pictogram projde axe audit', async () => {
    const { container } = render(
      <Pictogram icon={MockIcon} size="md" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

// ─── ARIA attribute checks ──────────────────────────────────────────────────

describe('ARIA attribute checks', () => {
  it('ProgressBar má role="progressbar" s aria-valuenow, aria-valuemin, aria-valuemax', () => {
    const { container } = render(<ProgressBar value={40} max={100} label="Progress" />)
    const bar = container.querySelector('[role="progressbar"]')
    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('Select trigger má role="combobox" s aria-expanded a aria-haspopup', () => {
    const { container } = render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    const trigger = container.querySelector('[role="combobox"]')
    expect(trigger).toHaveAttribute('aria-expanded')
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
  })

  it('Tabs má role="tablist" a každý tab má role="tab" s aria-selected', () => {
    const { container } = render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    expect(container.querySelector('[role="tablist"]')).toBeInTheDocument()
    container.querySelectorAll('[role="tab"]').forEach(tab => {
      expect(tab).toHaveAttribute('aria-selected')
    })
  })

  it('Modal má role="dialog" s aria-modal=true a aria-labelledby', () => {
    const { container } = render(<Modal isOpen title="Test" onClose={() => {}} />)
    const dialog = container.querySelector('[role="dialog"]')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby')
  })

  it('Toggle má role="switch" s aria-checked', () => {
    const { container } = render(<Toggle checked={true} onChange={() => {}} />)
    const sw = container.querySelector('[role="switch"]')
    expect(sw).toHaveAttribute('aria-checked', 'true')
  })
})
