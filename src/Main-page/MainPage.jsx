import React from "react";
import "./MainPage.css"
import firstPicture from "../assets/advPicture1.png"
import secondPicture from "../assets/advPicture2.png"
import thirdPicture from "../assets/advPicture3.png"
import { useTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";


function Advantage({imageSource, alternativeText, headerLink, title, description}) {
    const isDarkTheme = useTheme()
    function handleHover(event) {
        event.target.style.color = isDarkTheme? "#2e0b6b" : "#da4e03" 
    }   
    function handleOut(event) {
        event.target.style.color = isDarkTheme? "white" : "#000000"
    }
    const paragraphStyles = {
        color: isDarkTheme? "#e9efef" : "#6A6868"
    }
    const headerStyles = {
        color: isDarkTheme? "rgb(228, 226, 224)" : "#000000"
    }
    
    return (
        <div  className="advantage">
            <img src={imageSource} alt={alternativeText} />
            <div className="description">
                <a href={headerLink} onMouseOver={handleHover} onMouseLeave={handleOut} style={headerStyles}>{title}</a>
                <p style={paragraphStyles}>{description}</p>
            </div>
        </div>
    )
}
export default  function MainPage() {
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme()
    
        const mainStyle = {
            backgroundColor: isDarkTheme? "black": "white"
        }
        return (
            <div style={mainStyle} className="advantages">
                <Advantage imageSource={firstPicture} alternativeText="taking notes" 
                title={ isEnglish? "Take notes when you want,how you want" : "Роби нотатки коли ти хочеш, як ти хочеш" }
                description ={ isEnglish? "NotForget offers range of tools to help you remember everything you need." : "NotForget пропонує діапазон інструментів, щоб допомогти тобі запам'ятати все що потрібно" }
                headerLink = "/Notes"/> 
                <Advantage  imageSource={secondPicture} alternativeText="everything saved" 
                title={ isEnglish? "Sign up to save your notes" : "Зареєструйся для зберігання нотаток" }
                description ={ isEnglish? "Our computer brain will remember everything" : "Наш комп'ютерний мозок запам'ятає все" }
                headerLink = ""/> 
                <Advantage imageSource={thirdPicture} alternativeText="browsing in dark" 
                title={ isEnglish? "Browse in night!" : "Працюй навіть уночі!" }
                description ={ isEnglish? "Our app offers amazing dark theme ;)" : "Наш додаток пропонує чудову темну тему ;)" }
                headerLink="/#footer"/>
            </div>
    )
}