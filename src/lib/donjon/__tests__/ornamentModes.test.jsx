import { render } from '@testing-library/react'

import DonjonButton from '../DonjonButton'
import DonjonButtonGroup from '../DonjonButtonGroup'
import DonjonCard from '../DonjonCard'
import DonjonModal from '../DonjonModal'

const GROUP_ITEMS = [
  { value: 'x', label: 'Sword' },
  { value: 'y', label: 'Shield' },
]

describe('donjon ornament modes', () => {
  it('DonjonButton plain mode removes decorative nodes', () => {
    const { container, rerender } = render(
      <DonjonButton>Attack</DonjonButton>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DonjonButton ornament="plain">Attack</DonjonButton>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(0)

    // Plain mode uses the outer-wrapper octagon trick instead of a CSS border:
    // a .dj-clip-focus div with padding:1 and a background in the border color wraps the button.
    // A CSS border would be clipped by clip-path on the diagonal edges of the octagon.
    const wrapper = container.querySelector('.dj-clip-focus')
    expect(wrapper).toBeTruthy()
    expect(wrapper.style.padding).toBe('1px')
    expect(wrapper.style.background).toBe('rgb(143, 116, 88)')  // goldDim
    expect(wrapper.style.boxSizing).toBe('border-box')

    // The inner button must not carry its own border (clip-path would clip it).
    // jsdom: border: 'none' sets borderStyle: 'none' (borderWidth stays default 'medium').
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
      <DonjonCard title="Inventory" description="Player items" footer={<button type="button">Close</button>}>
        <p>Content</p>
      </DonjonCard>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DonjonCard ornament="plain" title="Inventory" description="Player items" footer={<button type="button">Close</button>}>
        <p>Content</p>
      </DonjonCard>
    )

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(0)
  })

  it('DonjonModal plain mode removes decorative nodes', () => {
    const { rerender } = render(
      <DonjonModal
        open
        onClose={() => {}}
        title="Confirmation"
        description="Are you sure you want to leave the game?"
        footer={<button type="button">Close</button>}
      >
        <p>Content</p>
      </DonjonModal>
    )

    expect(document.body.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DonjonModal
        open
        onClose={() => {}}
        ornament="plain"
        title="Confirmation"
        description="Are you sure you want to leave the game?"
        footer={<button type="button">Close</button>}
      >
        <p>Content</p>
      </DonjonModal>
    )

    expect(document.body.querySelectorAll('[aria-hidden="true"]').length).toBe(0)
  })
})
