import { createContext, useEffect, useState, useContext } from "react"
import { v4 as uuidv4 } from 'uuid'
import { ModalContext } from "./ModalContext"
import s from "../components/modal/Modal.module.scss"

export const TaskListContext = createContext()

export const TaskListProvider = ({ children }) => {
    const STORAGE_KEY = "defaultItems"
    const { openModal, closeModal } = useContext(ModalContext)
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    )

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items])

    const unfinishedTaskQuantity = items.filter(el => !el.onFinished).length

    const addTask = (text) => {
        const addItem = () => {
            setItems((prev) => [
                ...prev,
                {
                    id: uuidv4(),
                    text,
                    onFinished: false,
                    date: new Date().toISOString(),
                },
            ])
        }
        const existTask = items.filter(el => el.text.toLowerCase() === text.toLowerCase())
        if (existTask.length) {
            openModal(
                <>
                    <p>Така задача вже існує.<br />Точно додати дубль?</p>
                    <div className={s.ctaBtn}>
                        <button className={s.btn} onClick={() => {
                                addItem()
                                closeModal()
                            }}
                        >
                            Так
                        </button>
                        <button className={s.btn} onClick={closeModal}>Ні</button>
                    </div>
                </>
            )
            return
        }
        addItem()
    }

    const deleteTask = (id) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const toggleTask = (id) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, onFinished: !item.onFinished } : item
            )
        )
    }

    const editTask = (id, newText) => {
        const text = newText.trim()
        setItems(items =>
            items.map(item => item.id === id ? { ...item, text, date: new Date().toISOString() } : item)
        )
    }

    return (
        <TaskListContext.Provider value={{ items, unfinishedTaskQuantity, addTask, deleteTask, toggleTask, editTask }}>
            {children}
        </TaskListContext.Provider>
    )
}