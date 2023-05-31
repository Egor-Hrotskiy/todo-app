import React, {useState} from "react";
import "./FAQ.css"
import { useTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";
function QuestAndAnswer ({question, answer}) {
    const isDarkTheme = useTheme() 
    const [isShowed, showAnswer] =  useState(false)
    const arrowStyles = isShowed? 
    {
        borderColor: `transparent transparent ${isDarkTheme? "white" : "#000"} transparent`
    } : 
    {
        borderColor: `${isDarkTheme? "white" : "#000"} transparent transparent transparent`
    }
    const questStyles = {
        color: isDarkTheme?"white" : "#13014b",
        fontWeight: isShowed? 700 : 500
    }
    const answerStyles = {
        color: isDarkTheme? "#e9efef" : "#6A6868"
    }
    function handleHover(event) {
        event.target.style.color = isDarkTheme?  "#da4e03" : "#2e0b6b"  
    }
    function handleOut (event) {
        event.target.style.color = isDarkTheme? "white" : "#13014b"
    }
    function handleClick() {
        showAnswer(prevShowed => !prevShowed)
    }
    return (
        <div className="qanda-container">
            <div className="qanda-question" onClick={handleClick}>
                <span onMouseOver={handleHover} onMouseLeave={handleOut} style={questStyles}>{question}</span>
                <span style={arrowStyles} className={`qanda-arrow ${isShowed ? "up" : "down"}`} />
            </div>
            {isShowed && <><div style={answerStyles} className="qanda-answer">{answer}</div> <hr/></>}
        </div>
    )
}
    
export default function FAQ() {
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme()
        
    const mainStyles = {
        backgroundColor: isDarkTheme? "black" : "white"
    }
    return (
        <main style={mainStyles}>
            <div className="answersBlock">
                <QuestAndAnswer question={isEnglish? "How many developers is in your team?" : "Скільки людей в вашій команді"}
                answer={isEnglish? "It is funny to say that i am only one, but if you want to join me or help with project go to my social media :)" : "Смішно казати що я лише один, але якщо ти хочеш прииєднатися або допомогти мені, пиши"}
                />
                <QuestAndAnswer question={isEnglish? "What is purpose of this project?" : "Яка ціль цього проекту?"}
                answer={isEnglish? "This project was built to practice React HTML and CSS, to get some imporevement in problem solving" : "Цей проект був побудований для практики React HTML та CSS, покращення навичок вирішення проблем"} 
                />
                <QuestAndAnswer question={isEnglish? "Can i use code of this project?" : "Чи можу я використати код цього проекту?"}
                answer={isEnglish? "Yes you can use any part of this project anywhere you want, i would be happy if you credit me )" : "Так ти можеш використовувати будь-яку його частину будь-де, я буду вдячим якщо ти відмітиш мене )"} 
                />
                <QuestAndAnswer question={isEnglish? "Is this FAQ fully serious?" : "Чи ці відповіді та запитання серйозні?"}
                answer={isEnglish? "No, it is just for practise for this type of pages" : "Ні, вони лише для практики цього типу сторінок"} 
                />
            </div>
        </main>
        )
    }