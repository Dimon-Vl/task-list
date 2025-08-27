import { createContext, useState } from "react"
import Modal from "../components/modal/Modal"

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
      const [content, setContent] = useState(null)
      
      const openModal = (content) => {
          setModalIsOpen(true)
          setContent(content)
      }

    const closeModal = () => {
        setModalIsOpen(false)
         setContent(null)
    }

    return (
        <ModalContext.Provider value={{ modalIsOpen, closeModal, openModal, content}}>
            {children}
            <Modal />
        </ModalContext.Provider>
    )
}