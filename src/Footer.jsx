import React from "react";
import "./Css/Footer.css"
import {Link, useLocation} from "react-router-dom"
import { useTheme, useUpdateTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";


export default function Footer() {
    const isEnglish = useLanguage()
    const currentPathname = useLocation().pathname.slice(1)
    const currentPage = currentPathname === ""? "Main" : currentPathname
    const filteredLinks = ["About-Us", "Main", "Notes", "FAQ"].filter(element => element !== currentPage)
    const linkTranslations = {
        "About-Us": "Про нас",
        "Main" : "Головна",
        "Notes": "Нотатки",
        "FAQ" : "Запитання"
    }
    const isDarkTheme = useTheme()
    const toggleTheme = useUpdateTheme()

    const buttonStyles = {
        backgroundColor: isDarkTheme? "rgb(138, 12, 216)": "rgb(245, 82, 42)"
    }
    const footerStyles = {
        border: isDarkTheme? "2px solid grey" : "0px"
    }
    function onHover(event) {
        event.target.style.color= isDarkTheme? "rgb(138, 12, 216)": "rgb(245, 82, 42)",
        event.target.style.backgroundColor= "white"
    }
    function outHover(event) {
        event.target.style.color= "white"
        event.target.style.backgroundColor = isDarkTheme? "rgb(138, 12, 216)": "rgb(245, 82, 42)"
    }
    return (
        <footer style={footerStyles} id="footer">
            <div className="footer-links">
                <Link to={filteredLinks[0] === "Main"? "." : filteredLinks[0]}>{isEnglish? filteredLinks[0] : linkTranslations[filteredLinks[0]]}</Link>
                {document.body.clientWidth >= 550 && <Link to={filteredLinks[1] === "Main"? "." : filteredLinks[1]}>{isEnglish? filteredLinks[1] : linkTranslations[filteredLinks[1]]}</Link>}
                {document.body.clientWidth >= 900 && <Link to={filteredLinks[2] === "Main"? "." : filteredLinks[2]}>{isEnglish? filteredLinks[2] : linkTranslations[filteredLinks[2]]}</Link>}
            </div>
            <button onMouseLeave={outHover} onMouseOver={onHover} style={buttonStyles} onClick={toggleTheme} className="switch-theme">{isEnglish? isDarkTheme? "Light theme" : "Dark theme" : isDarkTheme? "Світла тема" : "Темна тема"}</button>
        </footer>
    )
}