import React from "react";
import "./About-Us.css"
import { useTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";

export default function AboutUs() {
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme()
    const paragraphStyles = {
        color: isDarkTheme? "#e9efef" : "#6A6868"
    }
    const headerStyles = {
        color: isDarkTheme? "rgb(228, 226, 224)" : "#000000"
    }
    const mainStyles = {
        backgroundColor: isDarkTheme? "black" : "white"
    }
    return (
        <div style={mainStyles} className="aboutUs">
            <div className="aboutText">
                <h1 style={headerStyles}>{isEnglish? "About Us" : "Про нас"}</h1>
                <p style={paragraphStyles}>{isEnglish? "We or me is 15 years old School student, i still don't sure what part of CS i wanna study so right now building this project to get some practice in web development.I will be very happy recieving feedback and / or help from you. My contacts you can find on Github" : "Ми або я 15 річний учень школи, який все ще не впевнений, яку частину CS я хочу вивчати, тому зараз створюю цей проект, щоб отримати деяку практику у веб-розробці. Я буду дуже радий отримати від вас відгуки та / або допомогу. Мої контакти ви можете знайти на Github"}</p>
            </div>
        </div>
    )
}