import { useFormStatus } from 'react-dom'
import Button from './Button'

/**
 * SubmitButton — button with an automatic loading state.
 *
 * Uses the React 19 `useFormStatus` hook — must be a direct descendant
 * of a <form>. When the form submits (pending=true) it automatically
 * shows a spinner and prevents repeated submission with no manual state.
 *
 * @param {string}  [loadingLabel]  - Text shown while pending (default: children)
 * @param {object}  [props]         - Everything Button accepts (size, variant, …)
 */
export default function SubmitButton({ children = 'Submit', loadingLabel, ...props }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      loading={pending}
      {...props}
    >
      {pending && loadingLabel ? loadingLabel : children}
    </Button>
  )
}
