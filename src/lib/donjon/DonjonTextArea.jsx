/* ── DonjonTextArea (donjon-fall-ui) ─────────────────────────────────
   Multi-line text input. Just a thin wrapper around DonjonInput with
   `multiline` forced on — picks up the donjon palette + octagon shell
   from DonjonInput, including the field-sizing:content auto-grow.

   Use DonjonTextArea when you want explicit "this is multi-line"
   intent. Use <DonjonInput multiline /> when you're toggling between
   single and multi-line conditionally.
   ─────────────────────────────────────────────────────────────────── */
import DonjonInput from './DonjonInput'

/**
 * @param {string} value
 * @param {(value: string) => void} onChange
 * @param {string} [placeholder]
 * @param {number} [rows=3]
 * @param {string} [label] [hint] [error]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled]
 */
export default function DonjonTextArea(props) {
  return <DonjonInput {...props} multiline />
}
