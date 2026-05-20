import { useFormStatus } from 'react-dom'
import Button from './Button'

/**
 * SubmitButton — tlačítko s automatickým loading stavem.
 *
 * Využívá React 19 `useFormStatus` hook — musí být přímý potomek <form>.
 * Při odeslání formuláře (pending=true) automaticky zobrazí spinner
 * a zabrání opakovanému odeslání bez jakéhokoliv ručního stavu.
 *
 * @param {string}  [loadingLabel]  - Text při pending (výchozí: children)
 * @param {object}  [props]         - Vše co přijímá Button (size, variant, …)
 */
export default function SubmitButton({ children = 'Odeslat', loadingLabel, ...props }) {
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
