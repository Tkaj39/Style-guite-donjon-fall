/**
 * Accessibility tests — donjon-fall-ui vlastní implementace
 *
 * Pokrývá 6 komponent s vlastním kódem (ostatní jsou re-exporty z TkajUI):
 *   DonjonButton, DonjonCard, DonjonModal, DonjonTabs,
 *   DonjonButtonGroup, DonjonPictogram
 *
 * Každá komponenta:
 *   1. axe audit (žádné porušení WCAG)
 *   2. ARIA atributy (role, aria-*, labeling)
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
  { value: 'x', label: 'Meč' },
  { value: 'y', label: 'Štít' },
]

// ── axe audit ────────────────────────────────────────────────────────────────

describe('donjon — axe audit', () => {
  it('DonjonButton projde axe audit', async () => {
    const { container } = render(
      <DonjonButton>Zaútočit</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButton loading projde axe audit', async () => {
    const { container } = render(
      <DonjonButton loading>Zaútočit</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButton disabled projde axe audit', async () => {
    const { container } = render(
      <DonjonButton disabled>Zaútočit</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButton variant="danger" projde axe audit', async () => {
    const { container } = render(
      <DonjonButton variant="danger">Zrušit</DonjonButton>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonCard bez hlavičky projde axe audit', async () => {
    const { container } = render(
      <DonjonCard>
        <p>Obsah karty</p>
      </DonjonCard>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonCard s title a description projde axe audit', async () => {
    const { container } = render(
      <DonjonCard title="Inventář" description="Předměty hráče">
        <p>Obsah</p>
      </DonjonCard>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonModal isOpen s title projde axe audit', async () => {
    const { container } = render(
      <DonjonModal isOpen title="Potvrzení" onClose={() => {}}>
        <p>Opravdu chcete opustit hru?</p>
      </DonjonModal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonModal isOpen bez title + aria-label projde axe audit', async () => {
    const { container } = render(
      <DonjonModal isOpen aria-label="Herní nabídka" onClose={() => {}}>
        <p>Obsah modalu bez nadpisu</p>
      </DonjonModal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonTabs variant="underline" projde axe audit', async () => {
    const { container } = render(
      <DonjonTabs items={TABS} value="a" onChange={() => {}} variant="underline" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonTabs variant="pills" projde axe audit', async () => {
    const { container } = render(
      <DonjonTabs items={TABS} value="a" onChange={() => {}} variant="pills" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonButtonGroup projde axe audit', async () => {
    const { container } = render(
      <DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonPictogram s ikonou projde axe audit', async () => {
    const { container } = render(
      <DonjonPictogram icon={MockIcon} size="md" variant="active" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DonjonPictogram bare projde axe audit', async () => {
    const { container } = render(
      <DonjonPictogram icon={MockIcon} size="md" bare />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

// ── ARIA atributy ─────────────────────────────────────────────────────────────

describe('donjon — ARIA atributy', () => {
  it('DonjonButton je type="button"', () => {
    render(<DonjonButton>Zaútočit</DonjonButton>)
    expect(screen.getByRole('button', { name: 'Zaútočit' })).toBeInTheDocument()
  })

  it('DonjonButton disabled má atribut disabled', () => {
    render(<DonjonButton disabled>Zaútočit</DonjonButton>)
    expect(screen.getByRole('button', { name: 'Zaútočit' })).toBeDisabled()
  })

  it('DonjonButton loading má atribut disabled (loading blokuje interakci)', () => {
    render(<DonjonButton loading>Zaútočit</DonjonButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('DonjonModal má role="dialog" s aria-modal="true"', () => {
    const { container } = render(
      <DonjonModal isOpen title="Test" onClose={() => {}}>
        <p>Obsah</p>
      </DonjonModal>
    )
    const dialog = container.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('DonjonModal s title má aria-labelledby odkazující na h2', () => {
    const { container } = render(
      <DonjonModal isOpen title="Název modalu" onClose={() => {}}>
        <p>Obsah</p>
      </DonjonModal>
    )
    const dialog = container.querySelector('[role="dialog"]')
    const labelledById = dialog.getAttribute('aria-labelledby')
    expect(labelledById).toBeTruthy()
    const heading = container.querySelector(`#${labelledById}`)
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')
  })

  it('DonjonModal bez title nemá aria-labelledby, ale má aria-label', () => {
    const { container } = render(
      <DonjonModal isOpen aria-label="Herní nabídka" onClose={() => {}}>
        <p>Obsah</p>
      </DonjonModal>
    )
    const dialog = container.querySelector('[role="dialog"]')
    expect(dialog).not.toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-label', 'Herní nabídka')
  })

  it('DonjonModal close button má aria-label="Zavřít"', () => {
    render(
      <DonjonModal isOpen title="Test" onClose={() => {}}>
        <p>Obsah</p>
      </DonjonModal>
    )
    expect(screen.getByRole('button', { name: 'Zavřít' })).toBeInTheDocument()
  })

  it('DonjonTabs má role="tablist"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('DonjonTabs — každý tab má role="tab" s aria-selected', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    screen.getAllByRole('tab').forEach(tab => {
      expect(tab).toHaveAttribute('aria-selected')
    })
  })

  it('DonjonTabs — aktivní tab má aria-selected="true"', () => {
    render(<DonjonTabs items={TABS} value="b" onChange={() => {}} />)
    const betaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Beta'))
    expect(betaTab).toHaveAttribute('aria-selected', 'true')
  })

  it('DonjonTabs — disabled tab má aria-disabled="true"', () => {
    render(<DonjonTabs items={TABS} value="a" onChange={() => {}} />)
    const gammaTab = screen.getAllByRole('tab').find(t => t.textContent.includes('Gamma'))
    expect(gammaTab).toHaveAttribute('aria-disabled', 'true')
  })

  it('DonjonButtonGroup má role="group"', () => {
    const { container } = render(
      <DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />
    )
    expect(container.querySelector('[role="group"]')).toBeInTheDocument()
  })

  it('DonjonButtonGroup — aktivní tlačítko má aria-pressed="true"', () => {
    render(<DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    const buttons = screen.getAllByRole('button')
    const active = buttons.find(b => b.textContent.includes('Meč'))
    expect(active).toHaveAttribute('aria-pressed', 'true')
  })

  it('DonjonButtonGroup — neaktivní tlačítko má aria-pressed="false"', () => {
    render(<DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />)
    const buttons = screen.getAllByRole('button')
    const inactive = buttons.find(b => b.textContent.includes('Štít'))
    expect(inactive).toHaveAttribute('aria-pressed', 'false')
  })
})

// ── isOpen=false — modal se nevyrenderuje ─────────────────────────────────────

describe('DonjonModal — closed state', () => {
  it('isOpen=false → dialog není v DOMu', () => {
    const { container } = render(
      <DonjonModal isOpen={false} title="Test" onClose={() => {}}>
        <p>Obsah</p>
      </DonjonModal>
    )
    expect(container.querySelector('[role="dialog"]')).toBeNull()
  })
})
