import { createContext, useEffect, useState, useRef} from "react"
import s from "../components/listItem/ListItem.module.scss"

export const DragContext = createContext()

export const DragProvider = ({ children }) => {
    const dragItem = useRef(null)
    const timerID = useRef(null)
    const [isDrag, setIsDrag] = useState(false)
    const startRef = useRef({ x: 0, y: 0 })
    const startTopRef = useRef(0)

    const dragStart = (e) => {
        const item = e.target
        const listItem = item.closest('li')
        if (item.tagName === "UL" || item.tagName === "BUTTON" || item.type === "checkbox") return
        startRef.current = { x: e.clientX, y: e.clientY }
        startTopRef.current = listItem.offsetTop
        timerID.current = setTimeout(() => {
            setIsDrag(true)
            dragItem.current = listItem
            dragItem.current.classList.add(s.dragging)
            dragging(e)
        }, 2000)
    }

    const dragEnd = () => {
        clearTimeout(timerID.current)
        setIsDrag(false)
        dragItem.current = null
        if (!isDrag || !dragItem.current) {
            return
        }
        dragItem.current.classList.remove(s.dragging)
        dragItem.current.style.transform = ""
    }

    const dragging = (e) => {
        if (!isDrag) return
        const dx = e.clientX - startRef.current.x
        const dy = e.clientY - startRef.current.y
        dragItem.current.style.transform = `translate(${dx}px, ${dy}px)`
    }

    useEffect(() => {
        if (!isDrag) return
        const onMove = (e) => dragging(e)
        const onUp = () => dragEnd()
        document.addEventListener("pointermove", onMove)
        document.addEventListener("pointerup", onUp)
        document.addEventListener("pointercancel", onUp)
        return () => {
            document.removeEventListener("pointermove", onMove)
            document.removeEventListener("pointerup", onUp)
            document.removeEventListener("pointercancel", onUp)
        }
    }, [isDrag])

    return (
        <DragContext.Provider value={{ dragStart, dragEnd }}>
            {children}
        </DragContext.Provider>
    )
}