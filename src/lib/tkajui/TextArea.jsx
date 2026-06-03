/* ── TextArea (tkajui) ────────────────────────────────────────────────
   Thin wrapper around <Input multiline> that exposes a clear, dedicated
   API for multi-line text input. Internally renders a <textarea> with
   CSS `field-sizing: content` so the box auto-grows with the content.

   Use TextArea when you want explicit "this is multi-line" intent in the
   source. Use <Input multiline /> when you're toggling between single
   and multi-line conditionally.
   ─────────────────────────────────────────────────────────────────── */
import Input from './Input'

/**
 * @param {string} value
 * @param {(value: string) => void} onChange
 * @param {string} [placeholder]
 * @param {number} [rows=3]  Minimum visible rows.
 * @param {string} [label]
 * @param {string} [hint]
 * @param {string} [error]
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled]
 */
export default function TextArea(props) {
  return <Input {...props} multiline />
}
