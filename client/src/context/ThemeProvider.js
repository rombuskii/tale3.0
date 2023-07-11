import {createContext, useContext, useState} from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(true)

    const toggle = () => {
        setDarkMode(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{darkMode, toggle}}>
            {children}
        </ThemeContext.Provider>
    )
}