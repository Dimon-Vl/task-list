import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import s from './Header.module.scss'
import { TaskListContext } from '../../context/TaskListContext'
const date = new Date().toLocaleDateString()

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext)
  const { unfinishedTaskQuantity, deleteAllTask} = useContext(TaskListContext)

  return (
    <header className={s.header}>
      <h1 className={s.title}>Task list</h1>
      <p className={s.unfinishedTask}>Незавершені завдання: {unfinishedTaskQuantity}</p>
      <button className={s.themeBtn} onClick={toggleTheme}>Змінити тему</button>
      <button className={s.themeBtn} onClick={deleteAllTask}>Видалити всі завдання</button>
      <p className={s.date}>{date}</p>
    </header>
  )
}

export default Header
