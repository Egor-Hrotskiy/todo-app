import React, {useState} from "react";
import "./Css/HamburgerMenu.css"
import { useTheme } from "./ThemeProvider";
import calculateDisplayedLinks  from "./calculateDisplayedLinks";
import { useLanguage, useToggleLanguage } from "./LanguageProvider";

export default function HamburgerMenu() {
    const toggleLanguage = useToggleLanguage()
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme()
    const aStyles = {
        color: isDarkTheme? "white" : 'black'
    }
    const displayedLinks = calculateDisplayedLinks(aStyles)
    const menuStyles = {
        backgroundColor: isDarkTheme? "black" : "white",
    }
    
    const [isClicked, setClicked] = useState(false)
    isClicked? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll"

    function handleClick() {
        setClicked(prevClicked => !prevClicked)
    }
    return (
        <div className="hamburger-menu" onClick={handleClick}>
        <div className={`line ${isClicked ? 'open' : ''}`}></div>
        <div className={`line ${isClicked ? 'cross' : ''}`}></div>
        <div className={`line ${isClicked ? 'open last' : ''}`}></div>
        {isClicked && (
        <div className="menu-list" style={menuStyles}>
            <button className="switch-theme language" onClick={toggleLanguage}>{isEnglish? "Українська" : "English"}</button>
            {displayedLinks}
            <a style={aStyles} href="https://github.com/Egor-Hrotskiy" target="_blank">Github</a>
        </div>
    )}
    </div>
    );
}