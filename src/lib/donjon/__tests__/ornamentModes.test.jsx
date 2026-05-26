import { render } from '@testing-library/react'

import DonjonButton from '../DonjonButton'
import DonjonButtonGroup from '../DonjonButtonGroup'
import DonjonCard from '../DonjonCard'
import DonjonModal from '../DonjonModal'

const GROUP_ITEMS = [
  { value: 'x', label: 'Meč' },
  { value: 'y', label: 'Štít' },
]

describe('donjon ornament modes', () => {
  it('DonjonButton plain mode removes decorative nodes', () => {
    const { container, rerender } = render(
      <DonjonButton>Zaútočit</DonjonButton>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DonjonButton ornament="plain">Zaútočit</DonjonButton>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(0)

    // Plain mode používá outer-wrapper octagon trick místo CSS border:
    // .dj-clip-focus div s padding:1 a background v border barvě obklopuje button.
    // CSS border by byl ořezán clip-pathem na diagonálních hranách oktagonu.
    const wrapper = container.querySelector('.dj-clip-focus')
    expect(wrapper).toBeTruthy()
    expect(wrapper.style.padding).toBe('1px')
    expect(wrapper.style.background).toBe('rgb(143, 116, 88)')  // goldDim
    expect(wrapper.style.boxSizing).toBe('border-box')

    // Inner button by neměl mít vlastní border (clip-path by ho ořezal).
    // jsdom: border: 'none' nastaví borderStyle: 'none' (borderWidth zůstane default 'medium').
    const button = container.querySelector('button')
    expect(button.style.borderStyle).toBe('none')
  })

  it('DonjonButtonGroup plain mode removes decorative nodes', () => {
    const { container, rerender } = render(
      <DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} />
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DonjonButtonGroup items={GROUP_ITEMS} value="x" onChange={() => {}} ornament="plain" />
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(0)
  })

  it('DonjonCard plain mode removes decorative nodes', () => {
    const { container, rerender } = render(
      <DonjonCard title="Inventář" description="Předměty hráče" footer={<button type="button">Zavřít</button>}>
        <p>Obsah</p>
      </DonjonCard>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DonjonCard ornament="plain" title="Inventář" description="Předměty hráče" footer={<button type="button">Zavřít</button>}>
        <p>Obsah</p>
      </DonjonCard>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(0)
  })

  it('DonjonModal plain mode removes decorative nodes', () => {
    const { rerender } = render(
      <DonjonModal
        isOpen
        onClose={() => {}}
        title="Potvrzení"
        description="Opravdu chcete opustit hru?"
        footer={<button type="button">Zavřít</button>}
      >
        <p>Obsah</p>
      </DonjonModal>
    )

    expect(document.body.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DonjonModal
        isOpen
        onClose={() => {}}
        ornament="plain"
        title="Potvrzení"
        description="Opravdu chcete opustit hru?"
        footer={<button type="button">Zavřít</button>}
      >
        <p>Obsah</p>
      </DonjonModal>
    )

    expect(document.body.querySelectorAll('[aria-hidden="true"]').length).toBe(0)
  })
})