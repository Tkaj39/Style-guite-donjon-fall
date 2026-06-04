import Stat from '../Stat'

export default {
  title: 'TkajUI/DataDisplay/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    size:  { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    label: { control: 'text' },
    value: { control: 'text' },
    delta: { control: 'number' },
    invertDelta: { control: 'boolean' },
  },
  args: {
    size:  'md',
    align: 'left',
    label: 'Score',
    value: '12 450',
    delta: 320,
    hint:  'vs last run',
  },
}

export const Default   = {}
export const Negative  = { args: { label: 'Turns', value: '84', delta: -3 } }
export const Inverted  = { args: { label: 'Errors', value: '2', delta: -1, invertDelta: true, hint: 'lower is better' } }
export const NoDelta   = { args: { label: 'Players', value: '84', delta: undefined, hint: undefined } }

export const Dashboard = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <Stat label="Score"  value="12 450" delta={320} hint="vs last" />
      <Stat label="Turns"  value="84"     delta={-3}  hint="vs avg" />
      <Stat label="Errors" value="2"      delta={-1}  invertDelta hint="lower is better" />
      <Stat label="Streak" value="7"      delta={0}   hint="this week" />
    </div>
  ),
}
