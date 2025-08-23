import { useEffect, useState } from "react"
import Header from "./components/header/Header"
import ListItem from "./components/listItem/ListItem"
import TaskForm from "./components/taskForm/TaskForm"
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = "defaultItems"

function App() {
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
      items.map(item => item.id === id ? { ...item, text } : item)
    )
  }

  return (
    <div className="content">
      <Header unfinishedTask={unfinishedTaskQuantity} />
      <TaskForm onAdd={addTask} />
      {items.length ? (
        <ul>
          {items.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              text={item.text}
              date={item.date}
              done={item.onFinished}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onEdit={editTask}
            />
          ))}
        </ul>
      ) : (
        "Немає завдань"
      )}

    </div>
  )
}

export default App
