import { render, screen } from '@testing-library/react'

import EventLog from '../EventLog'

const EVENTS = [
  { id: '1', type: 'gain', text: '+1 VP pro Hráče 1', round: 1 },
  { id: '2', type: 'event', text: 'Hráč 2 zahájil tah', round: 1 },
]

describe('EventLog', () => {
  it('renderuje title a záznamy v plain režimu', () => {
    render(<EventLog events={EVENTS} title="Herní log" />)

    expect(screen.getByText('Herní log')).toBeInTheDocument()
    expect(screen.getByText('+1 VP pro Hráče 1')).toBeInTheDocument()
    expect(screen.getByText('Hráč 2 zahájil tah')).toBeInTheDocument()
  })

  it('ornament="decorated" přidá dekorativní overlay uzly', () => {
    const { container } = render(<EventLog events={EVENTS} ornament="decorated" />)

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)
  })
})