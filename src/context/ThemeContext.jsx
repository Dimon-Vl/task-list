import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const themeList = ['light', 'blue', 'dark']
    const [theme, setTheme] = useState(themeList[0])

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => themeList[(themeList.indexOf(prev) + 1) % themeList.length])
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>)
}
