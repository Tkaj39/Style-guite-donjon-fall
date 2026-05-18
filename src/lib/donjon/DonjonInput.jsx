// DonjonInput — re-export Input z TkajUI.
// Input nemá Ornaments, takže tkajui/Input a donjon/DonjonInput jsou vizuálně identické.
// Správná závislost: donjon → tkajui (nikdy naopak).
export { default } from '../tkajui/Input'
