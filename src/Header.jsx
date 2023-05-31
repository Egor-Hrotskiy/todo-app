import React from "react";
import "./Css/Header.css";
import brainDark from "./assets/brain-dark.png"
import brainLight from "./assets/brain-light.png"
import HamburgerMenu from "./HamburgerMenu";
import { useTheme } from "./ThemeProvider";
import calculateDisplayedLinks from "./calculateDisplayedLinks";
import { useLanguage, useToggleLanguage } from "./LanguageProvider";

export default function Header() {
    const isEnglish  = useLanguage()
    const toggleLanguage = useToggleLanguage()
    const isDarkTheme = useTheme()
    const displayedLinks = calculateDisplayedLinks()
    
    const menu = window.screen.width <= 700? <HamburgerMenu /> : (
        <div className="menu">
            <button className="switch-theme language" onClick={toggleLanguage}>{isEnglish? "Ukrainian" : "Англійська"}</button>
            {displayedLinks}
            <a href="https://github.com/Egor-Hrotskiy" target="_blank" onMouseOver={event => {event.target.style.color = "#A37C40"}} onMouseLeave={event => {event.target.style.color = "white"}}>Github</a>
        </div>) 
    const styles = {
        background: isDarkTheme? "#5403b1" : "#380EB0"
    }
    return (
        <nav style={styles}>
            <div className="logotype">
                <img alt="our logo" src={isDarkTheme? brainLight : brainDark}/>
                <h1>NotForget</h1>
            </div>
            {menu}
        </nav>
    )
}