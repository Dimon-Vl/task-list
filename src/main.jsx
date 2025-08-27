import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { TaskListProvider } from './context/TaskListContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <ModalProvider>
            <TaskListProvider>
                <App />
            </TaskListProvider>
        </ModalProvider>
    </ThemeProvider>
)
