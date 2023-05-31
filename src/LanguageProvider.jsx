import React, {createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext()
const LanguageToggleContext = createContext()

export function useLanguage() {
    return useContext(LanguageContext)
}

export function useToggleLanguage() {
    return useContext(LanguageToggleContext)
}

export default function LanguageProvider({children}) {
    const [isEnglish, setLanguage] = useState(localStorage.getItem("isEnglish") === null? true : localStorage.getItem("isEnglish") === "true")

    useEffect(() => {
        localStorage.setItem("isEnglish", `${isEnglish}`)
    },[isEnglish])

    function toggleLanguage() {
        setLanguage(prevLanguage => !prevLanguage)
    }

    return (
        <LanguageContext.Provider value={isEnglish}> 
            <LanguageToggleContext.Provider value={toggleLanguage}>
                {children}
            </LanguageToggleContext.Provider>
        </LanguageContext.Provider>
    )
} 