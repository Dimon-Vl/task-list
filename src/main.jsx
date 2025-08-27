import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { TaskListProvider } from './context/TaskListContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <TaskListProvider>
            <App />
        </TaskListProvider>
    </ThemeProvider>
)
