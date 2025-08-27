import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import s from "./Modal.module.scss"

const Modal = () => {
    const {content, modalIsOpen, closeModal } = useContext(ModalContext)
    if (!modalIsOpen) {
        return null
    }

    return (
        <div className={s.modal} onClick={closeModal}>
            <div className={s.content}>
                <button className={s.close} onClick={closeModal}>
                    ×
                </button>
                {content}
            </div>
        </div>
    )
}

export default Modal
