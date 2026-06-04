import Alert from '../Alert'
import Button from '../Button'

export default {
  title: 'TkajUI/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'danger', 'warning', 'info'] },
    title:   { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'Your save file is from v1.4 — it will be auto-upgraded.',
  },
}

export const Default  = {}
export const Success  = { args: { variant: 'success', title: undefined, children: 'Settings saved.' } }
export const Danger   = { args: { variant: 'danger',  title: 'Login failed', children: 'Wrong password.' } }
export const Warning  = { args: { variant: 'warning', title: 'Storage almost full', children: 'You\'ve used 92 % of your cloud save quota.' } }
export const WithAction = {
  args: { action: <Button size="sm" variant="link">Manage</Button> },
}
export const Dismissible = {
  args: { onDismiss: () => {} },
}
