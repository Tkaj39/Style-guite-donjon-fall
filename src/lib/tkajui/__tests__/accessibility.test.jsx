import { render, screen } from '@testing-library/react'
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
  it('Toggle with label passes axe audit', async () => {
    const { container } = render(
      <Toggle label="Sound" checked={false} onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Toggle with aria-label (no label prop) passes axe audit', async () => {
    const { container } = render(
      <Toggle aria-label="Sound toggle" checked={false} onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Slider with label passes axe audit', async () => {
    const { container } = render(
      <Slider label="Volume" value={50} min={0} max={100} onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('ProgressBar with label passes axe audit', async () => {
    const { container } = render(
      <ProgressBar label="Loading" value={50} max={100} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Select with label passes axe audit', async () => {
    const { container } = render(
      <Select label="Language" options={OPTIONS} value="" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Tabs passes axe audit', async () => {
    const { container } = render(
      <Tabs items={TABS} value="a" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('ButtonGroup passes axe audit', async () => {
    const { container } = render(
      <ButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Modal open with title passes axe audit', async () => {
    const { container } = render(
      <Modal open title="Confirmation" onClose={() => {}}>
        <p>Do you really want to continue?</p>
      </Modal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Modal open without title + aria-label passes axe audit', async () => {
    const { container } = render(
      <Modal open aria-label="Settings menu" onClose={() => {}}>
        <p>Configure your options.</p>
      </Modal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Modal without title has no aria-labelledby, but has aria-label', () => {
    render(
      <Modal open aria-label="Settings menu" onClose={() => {}}>
        <p>Configure your options.</p>
      </Modal>
    )
    const dialog = document.querySelector('dialog')
    expect(dialog).not.toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-label', 'Settings menu')
  })

  it('Tooltip passes axe audit', async () => {
    const { container } = render(
      <Tooltip content="Button hint">
        <button type="button">Trigger</button>
      </Tooltip>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Pictogram passes axe audit', async () => {
    const { container } = render(
      <Pictogram icon={MockIcon} size="md" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

// ─── ARIA attribute checks ──────────────────────────────────────────────────

describe('ARIA attribute checks', () => {
  it('ProgressBar has role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax', () => {
    const { container } = render(<ProgressBar value={40} max={100} label="Progress" />)
    const bar = container.querySelector('[role="progressbar"]')
    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('Select trigger has role="combobox" with aria-expanded and aria-haspopup', () => {
    const { container } = render(<Select options={OPTIONS} value="" onChange={() => {}} />)
    const trigger = container.querySelector('[role="combobox"]')
    expect(trigger).toHaveAttribute('aria-expanded')
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
  })

  it('Tabs has role="tablist" and each tab has role="tab" with aria-selected', () => {
    const { container } = render(<Tabs items={TABS} value="a" onChange={() => {}} />)
    expect(container.querySelector('[role="tablist"]')).toBeInTheDocument()
    container.querySelectorAll('[role="tab"]').forEach(tab => {
      expect(tab).toHaveAttribute('aria-selected')
    })
  })

  it('Modal has role="dialog" with aria-labelledby', () => {
    render(<Modal open title="Test" onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    // aria-modal is implicit with native showModal() — we don't test the explicit attribute
    expect(dialog).toHaveAttribute('aria-labelledby')
  })

  it('Toggle has role="switch" with aria-checked', () => {
    const { container } = render(<Toggle checked={true} onChange={() => {}} />)
    const sw = container.querySelector('[role="switch"]')
    expect(sw).toHaveAttribute('aria-checked', 'true')
  })
})
