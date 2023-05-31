import React, {useContext, createContext, useState, useEffect} from "react"

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

export function useTheme() {
    return useContext(ThemeContext) 
}
export function useUpdateTheme() {
    return useContext(ThemeUpdateContext)
}
export default function ThemeProvider({children}) {

    const [isDarkTheme, setTheme] = useState(localStorage.getItem("isDarkTheme") === null? false : localStorage.getItem("isDarkTheme") === "true")

    useEffect(() => {
        localStorage.setItem("isDarkTheme", `${isDarkTheme}`)
    }, [isDarkTheme])

    function toggleTheme() {
        setTheme(prevMode => !prevMode)
    }

    return (
        <ThemeContext.Provider value={isDarkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}