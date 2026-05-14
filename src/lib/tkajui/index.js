// TkajUI — generické UI komponenty
// Fáze 1: re-exporty ze stávajících cest (žádné přesouvání souborů)

// Přesunuté — přímý import z lib/tkajui/
export { default as ButtonGroup }    from './ButtonGroup'
export { default as Modal }          from './Modal'
export { default as Toast }          from './Toast'
export { default as Tooltip }        from './Tooltip'

// Přesunuté — přímý import z lib/tkajui/
export { default as ProgressBar }    from './ProgressBar'
export { default as Select }         from './Select'
export { default as Slider }         from './Slider'
export { default as Tabs }           from './Tabs'
export { default as Toggle }         from './Toggle'

// Zatím v src/components/ — re-export (bude přesunuto v dalších krocích)
export { default as ScoopClip }      from '../../components/ScoopClip'
export { default as CornerOrnament } from '../../components/CornerOrnament'
export { default as Ornaments }      from '../../components/Ornaments'

// Utils
export * from '../../utils/octagon'
