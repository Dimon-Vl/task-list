import { useState, useEffect, useRef } from "react"
import s from "./ListItem.module.scss"
import classNames from "classnames"

const ListItem = ({ id, text, date, done, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempText, setTempText] = useState(text)

  useEffect(() => {
    if (isEditing) inputRef.current.focus()
  }, [isEditing])

  const inputRef = useRef(null)

  const save = () => {
    const trimText = tempText.trim()
    setIsEditing(false)

    if (!trimText) {
      setTempText(text)
      return
    }

    if (trimText !== text) {
      onEdit(id, trimText)
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") save()
    if (e.key === "Escape" || tempText.trim().length === 0) {
      setTempText(text)
      setIsEditing(false)
    }
  }

  return (
    <li className={classNames(s.item, { [s.itemCompleted]: done })}>
      <div className={s.content}>
        <input
          type="checkbox"
          className={s.checkbox}
          checked={done}
          onChange={() => onToggle(id)}
        />

        <input
          ref={inputRef}
          type="text"
          className={classNames(
            s.text,
            { [s.completed]: done },
            { [s.editing]: isEditing }
          )}
          value={isEditing ? tempText : text}
          readOnly={!isEditing}
          size={(isEditing ? tempText : text).length || 1}
          onChange={(e) => setTempText(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          maxLength={50}
        />
      </div>

      <span className={s.date}>
        {new Date(date).toLocaleString("uk-UA")}
      </span>

      <div className={s.onChange}>
        <button
          className={s.changeTask}
          onClick={()=>setIsEditing(!isEditing)}
        >
          ✏️
        </button>
        <button className={s.delete} onClick={() => onDelete(id)}>
          ×
        </button>
      </div>
    </li>
  )
}

export default ListItem
