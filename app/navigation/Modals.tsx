import { ModalNameType } from '../../store/useModalStore/types'
import useModalStore from '../../store/useModalStore/useModalStore'
import FeedbackModal from '../components/Modals/FeedbackModal/FeedbackModal'
import RateOutAppModal from '../components/Modals/RateOutAppModal/RateOutAppModal'

const Modals = () => {
	const { modals, closeModal, openModal } = useModalStore()

	const getModalComponent = (modalName: ModalNameType) => {
		switch (modalName) {
			case 'RateOurApp':
				return RateOutAppModal

			case 'Feedback':
				return FeedbackModal
		}
	}

	return Object.entries(modals).map(([modalName, modal]) => {
		const ModalComponent = getModalComponent(modalName as ModalNameType)
		if (ModalComponent) {
			return (
				<ModalComponent
					key={modalName}
					visible={modal.isVisible}
					onClose={() => closeModal(modalName as ModalNameType)}
				/>
			)
		}
		return null
	})
}

export default Modals
