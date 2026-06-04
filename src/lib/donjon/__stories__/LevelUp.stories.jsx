import LevelUp from '../LevelUp'
import Button from '../../tkajui/Button'

export default {
  title: 'donjon-fall-ui/Gameplay/LevelUp',
  component: LevelUp,
  tags: ['autodocs'],
  argTypes: {
    level:    { control: 'number' },
    title:    { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    level: 8,
    subtitle: 'A new chapter begins. Your power grows.',
  },
}

export const Default = {}

export const WithStats = {
  args: {
    stats: [
      { label: 'Max HP', value: 8, icon: '❤️' },
      { label: 'Max MP', value: 4, icon: '✦' },
      { label: 'STR',    value: 2, icon: '💪' },
      { label: 'INT',    value: 1, icon: '🧠' },
    ],
    actions: <Button variant="success">Continue</Button>,
  },
}
