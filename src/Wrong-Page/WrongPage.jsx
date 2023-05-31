import React from "react";
import "./WrongPage.css";
import sadPenguin from "../assets/sadpenguin.gif"
import {Link} from "react-router-dom"
import { useTheme, useUpdateTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";

export default function WrongPage() {
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme()
    const toggleTheme = useUpdateTheme()
    const mainStyles = {
        backgroundColor: isDarkTheme? "black" : "white"
    }
    const textStyles = {
        color: isDarkTheme? "white" : "black"
    }
    const buttonStyles = {
        backgroundColor: isDarkTheme? "rgb(138, 12, 216)": "rgb(245, 82, 42)"
    }
    function onHover(event) {
        event.target.style.color= isDarkTheme? "rgb(138, 12, 216)": "rgb(245, 82, 42)",
        event.target.style.backgroundColor= "white"
    }
    function outHover(event) {
        event.target.style.color= "white"
        event.target.style.backgroundColor = isDarkTheme? "rgb(138, 12, 216)": "rgb(245, 82, 42)"
    }
    function handleHover(event) {
        event.target.style.color = isDarkTheme? "#2e0b6b" : "#da4e03" 
    }
    function handleOut(event) {
        event.target.style.color = isDarkTheme? "white" : "#000000"
    }
    return (
        <div style={mainStyles} className="not-the-page">
            <h1 style={textStyles}>{ isEnglish? "Looks like this is not the page that you looking for" : "Здається це не та сторінка яку ти шукаєш"}</h1>
            <img src={sadPenguin} alt="sad, really sad"/>
            <Link onMouseOver={handleHover} onMouseLeave={handleOut} style={textStyles} to="">{isEnglish? "Return to main page" : "Повернутися на головну"}</Link>
            <button className="wrongPage-btn" onMouseLeave={outHover} onMouseOver={onHover} style={buttonStyles} onClick={toggleTheme}>{isEnglish? isDarkTheme? "Light theme" : "Dark theme" : isDarkTheme? "Світла тема" : "Темна тема"}</button>
        </div>
    )
}
