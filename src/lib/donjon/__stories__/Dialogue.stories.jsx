import { useState } from 'react'
import Dialogue from '../Dialogue'
import { gold } from '../tokens'

export default {
  title: 'donjon-fall-ui/Gameplay/Dialogue',
  component: Dialogue,
  tags: ['autodocs'],
  argTypes: {
    portraitSide: { control: 'select', options: ['left', 'right'] },
    name: { control: 'text' },
    text: { control: 'text' },
  },
  args: {
    portraitSrc: 'https://picsum.photos/seed/wizard/200/200',
    name: 'Old Wizard',
    text: 'You stand at the threshold, young one. The path you choose will echo through the ages.',
  },
}

export const Default = {}

export const RightPortrait = {
  args: {
    portraitSrc: 'https://picsum.photos/seed/innkeeper/200/200',
    name: 'Innkeeper',
    text: 'Welcome, traveler. Room and board, two coppers a night.',
    portraitSide: 'right',
  },
}

export const WithChoices = {
  render: () => {
    const [picked, setPicked] = useState(null)
    return (
      <div>
        <Dialogue
          portraitSrc="https://picsum.photos/seed/innkeeper/200/200"
          name="Innkeeper"
          text="What'll it be, traveler?"
          choices={[
            { id: 'rent', label: 'Rent a room',  hint: '−2 copper, +25 HP',  onClick: () => setPicked('rent') },
            { id: 'meal', label: 'Just a meal',   hint: '−1 copper, +10 HP', onClick: () => setPicked('meal') },
            { id: 'leave', label: 'Leave quietly', onClick: () => setPicked('leave') },
            { id: 'rob',  label: 'Rob the innkeeper', hint: 'Alignment shift', disabled: true },
          ]}
        />
        {picked && (
          <div style={{ marginTop: 12, color: gold }}>
            You picked: <strong>{picked}</strong>
          </div>
        )}
      </div>
    )
  },
}
