import LevelUp from '../LevelUp'
import { HeartIcon, SparkleIcon, StrengthIcon, IntelligenceIcon } from '../Icons'
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
      { label: 'Max HP', value: 8, icon: <HeartIcon        width={14} height={14} /> },
      { label: 'Max MP', value: 4, icon: <SparkleIcon      width={14} height={14} /> },
      { label: 'STR',    value: 2, icon: <StrengthIcon     width={14} height={14} /> },
      { label: 'INT',    value: 1, icon: <IntelligenceIcon width={14} height={14} /> },
    ],
    actions: <Button variant="success">Continue</Button>,
  },
}
