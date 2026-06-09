/* ── DonjonSubmitButton (donjon-fall-ui) ─────────────────────────────
   Game variant of SubmitButton. Same React 19 `useFormStatus` wiring
   as the TkajUI version — must live inside a <form>; when the form
   submits, pending=true flips the spinner and disables the button.
   Difference is purely the underlying button: this one renders a
   DonjonButton so it picks up the donjon octagon silhouette, gold
   gradient and ornament shell instead of the tkajui surface chip.
   ─────────────────────────────────────────────────────────────────── */
import { useFormStatus } from 'react-dom'
import DonjonButton from './DonjonButton'

/**
 * @param {string}  [loadingLabel]  Text shown while pending (default: children).
 * @param {object}  [props]         Everything DonjonButton accepts (size, variant,
 *                                  ornament, leadingIcon, fullWidth, …).
 */
export default function DonjonSubmitButton({ children = 'Submit', loadingLabel, ...props }) {
  const { pending } = useFormStatus()

  return (
    <DonjonButton
      type="submit"
      loading={pending}
      {...props}
    >
      {pending && loadingLabel ? loadingLabel : children}
    </DonjonButton>
  )
}
