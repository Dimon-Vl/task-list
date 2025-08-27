import { useState, useEffect, useRef, useContext } from "react"
import s from "./ListItem.module.scss"
import classNames from "classnames"
import { TaskListContext } from "../../context/TaskListContext"

const ListItem = ({ item: { id, text, onFinished, date } }) => {
  const { editTask, toggleTask, deleteTask } = useContext(TaskListContext)
  const [isEditing, setIsEditing] = useState(false)
  const [tempText, setTempText] = useState(text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) inputRef.current.focus()
  }, [isEditing])

  const save = () => {

    const trimText = tempText.trim()
    setIsEditing(false)

    if (!trimText) {
      setTempText(text)
      return
    }

    if (trimText !== text) {
      editTask(id, trimText)
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
    <li className={classNames(s.item, { [s.itemCompleted]: onFinished })}>
      <div className={s.content}>
        <input
          type="checkbox"
          className={s.checkbox}
          checked={onFinished}
          onChange={() => toggleTask(id)}
        />
        <input
          ref={inputRef}
          type="text"
          className={classNames(
            s.text,
            { [s.completed]: onFinished },
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
        {isEditing ? (<button
          className={s.changeTask}
          onClick={save}
          onMouseDown={(e) => e.preventDefault()}
        >
          💾
        </button>) : (<button
          className={s.changeTask}
          onClick={() => setIsEditing(true)}
        >
          ✏️
        </button>)
        }
        <button className={s.delete} onClick={() => deleteTask(id)}>
          🗙
        </button>
      </div>
    </li>
  )
}

export default ListItem
