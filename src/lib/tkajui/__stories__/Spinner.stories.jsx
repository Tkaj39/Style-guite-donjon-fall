import Spinner from '../Spinner'

export default {
  title: 'TkajUI/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    label: { control: 'text' },
  },
  args: { size: 'md' },
}

export const Default     = {}
export const WithLabel   = { args: { label: 'Saving changes…' } }
export const Large       = { args: { size: 'xl', label: 'Loading game…' } }

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
}
