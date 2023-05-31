import React from "react";
import { NavLink} from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

export default function calculateDisplayedLinks(styles) {
    const isDarkTheme = useTheme()
    const isEnglish = useLanguage()
    const linkTranslations = {
        "Main" : "Головна",
        "Notes": "Нотатки",
        "FAQ" : "Запитання"
    }
    const finalColor = styles? "black" : "white"
    const displayedLinks = ["Main", "Notes", "FAQ"].map((element,index) => {
    return <NavLink className={({isActive}) => isActive ?  "current-link" : null
} key={index} style={styles} onMouseOver={event => {event.target.style.color = "#A37C40"}} onMouseLeave={event => {event.target.style.color = isDarkTheme? "white" : finalColor}} to={element==="Main"? "." : element}>{isEnglish? element : linkTranslations[element]}</NavLink>
})
    return displayedLinks
}

