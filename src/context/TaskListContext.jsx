import { createContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export const TaskListContext = createContext()

export const TaskListProvider = ({ children }) => {
    const STORAGE_KEY = "defaultItems"

    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    )

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items])

    const unfinishedTaskQuantity = items.filter(el => !el.onFinished).length

    const addTask = (text) => {
        setItems([
            ...items,
            {
                id: uuidv4(),
                text,
                onFinished: false,
                date: new Date().toISOString(),
            },
        ])
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
            items.map(item => item.id === id ? { ...item, text, date:new Date().toISOString()} : item)
        )
    }

    return (
        <TaskListContext.Provider value={{items, unfinishedTaskQuantity, addTask, deleteTask, toggleTask, editTask }}>
            {children}
        </TaskListContext.Provider>
    )
}