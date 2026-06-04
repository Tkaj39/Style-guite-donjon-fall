import Button from '../Button'

export default {
  title: 'TkajUI/Basic/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger', 'success', 'warning', 'link'] },
    size:    { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    variant: 'default',
    size:    'md',
    children: 'Click me',
  },
}

export const Default     = {}
export const Success     = { args: { variant: 'success', children: 'Save' } }
export const Danger      = { args: { variant: 'danger',  children: 'Delete' } }
export const Warning     = { args: { variant: 'warning', children: 'Proceed?' } }
export const Link        = { args: { variant: 'link',    children: 'Read more' } }
export const Disabled    = { args: { disabled: true,     children: 'Disabled' } }

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
    </div>
  ),
}
