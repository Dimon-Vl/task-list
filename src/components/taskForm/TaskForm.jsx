import { useRef } from "react"
import s from "./TaskForm.module.scss"

const TaskForm = ({ onAdd }) => {
  const inputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    const value = inputRef.current.value.trim()
    if (!value) {
        return
    }
    onAdd(value)
    inputRef.current.value = ""
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.row}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Напишіть завдання"
          className={s.taskInput}
          maxLength={50}
        />
        <button type="submit" className={s.addBtn}>
          Додати завдання
        </button>
      </div>
    </form>
  )
}

export default TaskForm
