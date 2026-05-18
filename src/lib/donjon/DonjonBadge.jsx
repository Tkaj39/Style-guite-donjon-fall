// DonjonBadge — re-export Badge z TkajUI.
// Badge nemá Ornaments, takže tkajui/Badge a donjon/DonjonBadge jsou vizuálně identické.
// Správná závislost: donjon → tkajui (nikdy naopak).
export { default } from '../tkajui/Badge'
