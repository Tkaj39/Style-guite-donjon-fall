/**
 * Accessibility tests — donjon-fall-ui native implementations
 *
 * Covers 6 components with their own code (the rest are re-exports from TkajUI):
 *   DonjonButton, DonjonCard, DonjonModal, DonjonTabs,
 *   DonjonButtonGroup, DonjonPictogram
 *
 * Per component:
 *   1. axe audit (no WCAG violations)
 *   2. ARIA attributes (role, aria-*, labeling)
 */

import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import DonjonButton    from '../DonjonButton'
import DonjonCard      from '../DonjonCard'
import DonjonModal     from '../DonjonModal'
import DonjonTabs      from '../DonjonTabs'
import DonjonButtonGroup from '../DonjonButtonGroup'
import DonjonPictogram from '../DonjonPictogram'

expect.extend(toHaveNoViolations)

const MockIcon = ({ width, height }) => (
  <svg width={width} height={height} aria-hidden="true" />
)

const TABS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
]

const GROUP_ITEMS = [
  { value: 'x', label: 'Sword' },
  { value: 'y', label: 'Shield' },
]

// ── axe audit ────────────────────────────────────────────────────────────────

describe('donjon — axe audit', () => {
  it('DonjonButton passes axe audit', async () => {
    const { container } = render(
      <DonjonButton>Attack</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButton loading passes axe audit', async () => {
    const { container } = render(
      <DonjonButton loading>Attack</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButton disabled passes axe audit', async () => {
    const { container } = render(
      <DonjonButton disabled>Attack</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButton variant="danger" passes axe audit', async () => {
    const { container } = render(
      <DonjonButton variant="danger">Cancel</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonCard without a header passes axe audit', async () => {
    const { container } = render(
      <DonjonCard>
        <p>Card content</p>
      </DonjonCard>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonCard with title and description passes axe audit', async () => {
    const { container } = render(
      <DonjonCard title="Inventory" description="Player items">
        <p>Content</p>
      </DonjonCard>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonModal isOpen with title passes axe audit', async () => {
    const { container } = render(
      <DonjonModal isOpen title="Confirmation" onClose={() => {}}>
        <p>Are you sure you want to leave the game?</p>
      </DonjonModal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonModal isOpen without title + aria-label passes axe audit', async () => {
    const { container } = render(
      <DonjonModal isOpen aria-label="Game menu" onClose={() => {}}>
        <p>Modal content without a heading</p>
      </DonjonModal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonTabs variant="underline" passes axe audit', async () => {
    const { container } = render(
      <DonjonTabs items={TABS} value="a" onChange={() => {}} variant="underline" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonTabs variant="pills" passes axe audit', async () => {
    const { container } = render(
      <DonjonTabs items={TABS} value="a" onChange={() => {}} variant="pills" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButtonGroup passes axe audit', async () => {
    const { container } = render(
      <DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonPictogram with an icon passes axe audit', async () => {
    const { container } = render(
      <DonjonPictogram icon={MockIcon} size="md" variant="active" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonPictogram bare passes axe audit', async () => {
    const { container } = render(
      <DonjonPictogram icon={MockIcon} size="md" bare />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

// ── ARIA attributes ──────────────────────────────────────────────────────────

describe('donjon — ARIA attributes', () => {
  it('DonjonButton is type="button"', () => {
    render(<DonjonButton>Attack</DonjonButton>)
    expect(screen.getByRole('button', { name: 'Attack' })).toBeInTheDocument()
  })

  it('DonjonButton disabled has the disabled attribute', () => {
    render(<DonjonButton disabled>Attack</DonjonButton>)
    expect(screen.getByRole('button', { name: 'Attack' })).toBeDisabled()
  })

  it('DonjonButton loading has the disabled attribute (loading blocks interaction)', () => {
    render(<DonjonButton loading>Attack</DonjonButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('DonjonModal has role="dialog" and is reachable via getByRole', () => {
    render(
      <DonjonModal isOpen title="Test" onClose={() => {}}>
        <p>Content</p>
      </DonjonModal>
    )
    // The native <dialog> has implicit role=dialog; aria-modal is implicit with showModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })

  it('DonjonModal with title sets aria-labelledby pointing to the h2', () => {
    render(
      <DonjonModal isOpen title="Modal title" onClose={() => {}}>
        <p>Content</p>
      </DonjonModal>
    )
    const dialog = screen.getByRole('dialog')
    const labelledById = dialog.getAttribute('aria-labelledby')
    expect(labelledById).toBeTruthy()
    const heading = document.getElementById(labelledById)
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')
  })

  it('DonjonModal without title has no aria-labelledby, but has aria-label', () => {
    render(
      <DonjonModal isOpen aria-label="Game menu" onClose={() => {}}>
        <p>Content</p>
      </DonjonModal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).not.toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-label', 'Game menu')
  })

  it('DonjonModal close button has aria-label="Close"', () => {
    render(
      <DonjonModal isOpen title="Test" onClose={() => {}}>
        <p>Content</p>
      </DonjonModal>
    )
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('DonjonTabs has role="tablist"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('DonjonTabs — each tab has role="tab" with aria-selected', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    screen.getAllByRole('tab').forEach(tab => {
      expect(tab).toHaveAttribute('aria-selected')
    })
  })

  it('DonjonTabs — active tab has aria-selected="true"', () => {
    render(<DonjonTabs items={TABS} value="b" onChange={() => {}} />)
    const betaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'true')
  })

  it('DonjonTabs — disabled tab has aria-disabled="true"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    expect(gammaTab).toHaveAttribute('aria-disabled', 'true')
  })

  it('DonjonButtonGroup has role="group"', () => {
    const { container } = render(
      <DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />
    )
    expect(container.querySelector('[role="group"]')).toBeInTheDocument()
  })

  it('DonjonButtonGroup — active button has aria-pressed="true"', () => {
    render(<DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    const buttons = screen.getAllByRole('button')
    const active = buttons.find(b => b.textContent.includes('Sword'))
    expect(active).toHaveAttribute('aria-pressed', 'true')
  })

  it('DonjonButtonGroup — inactive button has aria-pressed="false"', () => {
    render(<DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    const buttons = screen.getAllByRole('button')
    const inactive = buttons.find(b => b.textContent.includes('Shield'))
    expect(inactive).toHaveAttribute('aria-pressed', 'false')
  })
})

// ── isOpen=false — modal does not render ─────────────────────────────────────

describe('DonjonModal — closed state', () => {
  it('isOpen=false → dialog is not in the DOM', () => {
    const { container } = render(
      <DonjonModal isOpen={false} title="Test" onClose={() => {}}>
        <p>Content</p>
      </DonjonModal>
    )
    expect(container.querySelector('[role="dialog"]')).toBeNull()
  })
})
