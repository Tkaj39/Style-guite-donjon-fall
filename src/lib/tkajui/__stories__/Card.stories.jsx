import Card from '../Card'
import Button from '../Button'

export default {
  title: 'TkajUI/Basic/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger', 'success'] },
    title:       { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    variant: 'default',
    title: 'Card title',
    description: 'A short description that explains the panel.',
    children: 'Card body content goes here.',
  },
}

export const Default = {}

export const WithFooter = {
  args: {
    title: 'Confirm action',
    description: 'This will permanently delete the selected items.',
    footer: <Button variant="danger" size="sm">Delete</Button>,
  },
}

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Card variant="default" title="Default" description="Standard surface card.">Body</Card>
      <Card variant="success" title="Success" description="Operation succeeded.">Body</Card>
      <Card variant="danger"  title="Danger"  description="Destructive context.">Body</Card>
    </div>
  ),
}
