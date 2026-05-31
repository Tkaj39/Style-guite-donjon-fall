import { render, screen } from '@testing-library/react'

import EventLog from '../EventLog'

const EVENTS = [
  { id: '1', type: 'gain', text: '+1 VP for Player 1', round: 1 },
  { id: '2', type: 'event', text: 'Player 2 started their turn', round: 1 },
]

describe('EventLog', () => {
  it('renders the title and entries in plain mode', () => {
    render(<EventLog events={EVENTS} title="Game log" />)

    expect(screen.getByText('Game log')).toBeInTheDocument()
    expect(screen.getByText('+1 VP for Player 1')).toBeInTheDocument()
    expect(screen.getByText('Player 2 started their turn')).toBeInTheDocument()
  })

  it('ornament="decorated" adds decorative overlay nodes', () => {
    const { container } = render(<EventLog events={EVENTS} ornament="decorated" />)

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)
  })
})
