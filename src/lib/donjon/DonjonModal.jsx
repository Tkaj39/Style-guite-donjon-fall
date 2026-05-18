import Modal from '../tkajui/Modal'
import { SideOrnament, HexOrnament } from '../tkajui/Ornaments'

const cx = 16

export default function DonjonModal({ title, ...props }) {
  return (
    <Modal
      title={title}
      {...props}
      renderPanelOrnaments={(uid) => title ? (
        <>
          <SideOrnament h={66} uid={`${uid}l`} />
          <SideOrnament h={66} uid={`${uid}r`} flip />
        </>
      ) : null}
      renderHeaderOrnaments={(uid) => (
        <HexOrnament uid={`${uid}ht`} edgePadL={cx} />
      )}
      renderBodyOrnaments={(uid) => !title ? (
        <HexOrnament uid={`${uid}ht`} edgePadL={cx} />
      ) : null}
      renderFooterOrnaments={(uid) => (
        <HexOrnament uid={`${uid}hb`} flip edgePadL={cx} />
      )}
    />
  )
}
