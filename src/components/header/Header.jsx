import s from './Header.module.scss'
const date = new Date().toLocaleDateString()

const Header = ({unfinishedTask}) => {
  return (
    <header className={s.header}>
      <h1 className={s.title}>Task list</h1>
      <p className={s.unfinishedTask}>Незавершені завдання: {unfinishedTask}</p>
      <p className={s.date}>{date}</p>
    </header>
  )
}

export default Header
