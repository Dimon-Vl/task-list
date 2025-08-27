import { useContext, useRef } from "react"
import { TaskListContext } from "../../context/TaskListContext"
import { ModalContext } from "../../context/ModalContext"
import s from "./TaskForm.module.scss"
import sModal from "../modal/Modal.module.scss"

const TaskForm = () => {
  const inputRef = useRef(null)

  const { addTask } = useContext(TaskListContext)
  const { openModal } = useContext(ModalContext)

  function handleSubmit(e) {
    e.preventDefault()
    const value = inputRef.current.value.trim()
    if (!value) {
      openModal(
        <>
          <p className={sModal.textCenter}>Поле не може бути пустим чи</p>
          <p className={sModal.textCenter}>складатися лише з пробілів</p>
        </>
      )
      return
    }
    addTask(value)
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
