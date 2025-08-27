import { useContext } from "react"
import Header from "./components/header/Header"
import ListItem from "./components/listItem/ListItem"
import TaskForm from "./components/taskForm/TaskForm"
import { TaskListContext } from "./context/TaskListContext"

function App() {
  const { items} = useContext(TaskListContext)
  return (
    <div className="content">
      <Header />
      <TaskForm />
      {items.length ? (
        <ul>
          {items.map((item) => (
            <ListItem
              key={item.id} item={item}
            />
          ))}
        </ul>
      ) : (
        <div className="noTask">Немає завдань</div>
      )}
    </div>
  )
}

export default App
