import React, {useMemo, useState} from "react";
import clearNoteDark from "../assets/clearNoteDark.svg"
import clearNoteLight from "../assets/clearNoteLight.svg"
import listLight from "../assets/listLight.svg"
import closeDark from "../assets/closeDark.svg"
import closeLight from "../assets/closeLight.svg"
import listDark from "../assets/listDark.svg"
import headerLight from "../assets/headerLight.svg"
import headerDark from "../assets/headerDark.svg"
import codeSnippetDark from "../assets/codeSnippetDark.svg"
import codeSnippetLight from "../assets/codeSnippetLight.svg"
import Select from "react-select";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";

function formatDate(date) {
    if (!date) {
        return ""
    }
    function addZeros(number) {
        return number >= 10? `${number}` : `0${number}` 
    }
    return `${date.getHours()} : ${addZeros(date.getMinutes())}`
}

function HeaderChange(props) {
    const isEnglish = useLanguage()
    const options = [
        {value: "#", label:isEnglish ? "Header 1 lvl" : "Заголовок 1 рівня", key: "header1"},
        {value: "##", label:isEnglish ? "Header 2 lvl" : "Заголовок 2 рівня", key: "header2"},
        {value: "###", label:isEnglish ? "Header 3 lvl" : "Заголовок 3 рівня", key: "header3"},
        {value: "####", label:isEnglish ? "Header 4 lvl" : "Заголовок 4 рівня", key: "header4"},
        {value: "#####", label:isEnglish ? "Header 5 lvl" : "Заголовок 5 рівня", key: "header5"},
        {value: "######", label:isEnglish ? "Header 6 lvl" : "Заголовок 6 рівня", key: "header6"}
    ]
    const [currentHeader, setHeader] = useState(null)
    const isDarkTheme = useTheme()
    return (
        <div className="adjustMenu">
            <div className="jad-1">
                <img height={20} width={20}  onClick={props.handleClick} src={isDarkTheme? closeDark : closeLight} alt="close button" className="closeBtn" />
                <Select maxMenuHeight={"100px"} isSearchable={false} options={options} value={currentHeader} onChange={setHeader}  />
            </div> 
            <button onClick={() => {props.createHeader(currentHeader.value);setHeader(null)}} className="headerBtn">{isEnglish? "Create Header": "Створити заголовок"}</button>
        </div>
        )
}
function AdjustMenuNumber(props) {
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme()
    const inputStyles = {
         backgroundColor: isDarkTheme? "black" : "white",
         color: isDarkTheme? "white" : "black"
                        }
    function handleBulletsCountChange(e) {
        e.target.value > 40? setBulletsCount(40) : setBulletsCount(e.target.value)
    }
    const [bulletsCount, setBulletsCount] = useState()

    return (
        <div className="adjustMenu">
            <div className="jad-1">
                <img height={20} width={20} onClick={props.handleClick} src={isDarkTheme? closeDark : closeLight} alt="close button" className="closeBtn" />
                <input style={inputStyles} type="number" value={bulletsCount} onChange={e => {handleBulletsCountChange(e)}} />
                </div>
            <button onClick={() => {props.handleListCreation(bulletsCount);setBulletsCount()}}>{isEnglish? "Create list" : "Створити список"}</button>
        </div>
        )
}

export default function EditBar(props) {
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme()
    
    function Preview(props) {
        const previewStyles = {
            borderColor: isDarkTheme? "#2E2E2E" : "#CCCCCC",
            color: isDarkTheme? "#FFFFFF" : "black"
        }
        return (
            <div style={previewStyles} className="markdownPreview">
                <ReactMarkdown>
                    {props.markUp}
                </ReactMarkdown>
            </div>
        )
    }

    const timeStyles = {
        color: isDarkTheme? "#e9efef" : "#6A6868"
    }

    const borderStyles = {
        borderColor: isDarkTheme? "#2E2E2E" : "#CCCCCC"
    }

    const btnStyles = {
        backgroundColor: isDarkTheme? "#1459a2" : "#01853c"
    }
    const editStyles =isDarkTheme?
        {
            backgroundColor: props.isPreview? "#1f1f1f" : "#52c41a",
            color: "white"
        } 
        :
        {
            backgroundColor: props.isPreview? "#f5f5f5" : "#fadb14",
            color: "black"
        } 
    const previewStyles = isDarkTheme?  {
        backgroundColor: props.isPreview? "#52c41a" : "#1f1f1f",
        color: "white"
        } : 
        {
        backgroundColor: props.isPreview? "#fadb14" : "#f5f5f5",
        color: "black"
        }
    const textStyles = {
        color: isDarkTheme? "#FFFFFF" : "black",
        backgroundColor: isDarkTheme? "black" : "white",
        ...borderStyles
        }
    const nameStyles = {
        backgroundColor: isDarkTheme? "black" : "white",
        color: isDarkTheme? "#FFFFFF" : "#000000",
        ...borderStyles
        }
    const toolIconStyles  = {
        ...timeStyles,
        border: document.body.clientWidth >= 1300? "2px solid" : "0px"
        }

    const [isListShowed, setListShowed] = useState(false)
    const [isHeaderShowed, setHeaderShowed] = useState(false)
    const randPromp = useMemo(getRandomPrompt, [])

    function closeListMenu() { 
        setListShowed(false)
    }

    function handleButtonHover(e) {
        e.target.style.backgroundColor = "#2e0b6b"
    }

    function handleButtonOut(e) {
        e.target.style.backgroundColor = isDarkTheme? "#1459a2" : "#01853c"
    }

    function getRandomPrompt() {
        const englishPrompts = ["Go to restaurant today", "Buy 1 liter of milk", "Take a hot bath", "Buy gift for daughter", "Finish project"]
        const ukrainianPrompts = ["Піти до ресьорану сьогодні", "Купити літр молока", "Прийняти теплу ванну", "Купити подарунок для дочки", "Закінчити проект"]
        return isEnglish? englishPrompts[Math.floor(Math.random() * 5)] : ukrainianPrompts[Math.floor(Math.random() * 5)]
    }

    

    function handleListCreation(bulletsCount) {
        props.dispatch({
            type: "create-list",
            bulletsCount: bulletsCount
        })
        setListShowed(false)
    }

    function createHeaderProp(header) {
        props.dispatch({
            type: "create-header",
            header: header
        })
        setHeaderShowed(false)
    }

    function handleFinishBtnClick() {
        props.currentEdit? props.handleSubmit(props.currentNote.id, props.currentNote): props.handleSubmit(props.currentNote)
    }

    return (
        <div className="editBar">
            <div className="editedNote">
                <div className="buttons">
                    <button onClick={props.disablePreview} style={editStyles} className="editBtn">{isEnglish? "Edit" : "Редагувати"}</button>
                    <button onClick={props.enablePreview} style={previewStyles} className="prevBtn">{isEnglish? "View" : "Прев'ю"}</button>
                </div>
                <p style={timeStyles} className="lastDate">{formatDate(props.currentNote.lastDate)}</p>
                {props.isPreview ? props.currentNote.noteText  && <Preview  markUp={props.currentNote.noteText} /> :  <form autoComplete="off" spellCheck="false" autoCapitalize="off"> 
                    <input maxLength={25} style={nameStyles} placeholder={isEnglish? "Enter name of note" : "Введіть ім'я нотатки"} className="nameInput" onChange={e => {props.dispatch({type: "handle-change", eTarget: e.target})}} value={props.currentNote.name} type="text" name="name" />
                    <textarea style={textStyles} placeholder={`${randPromp}...`} rows={10} cols={20} className="noteTextInput" onChange={e => {props.dispatch({type: "handle-change", eTarget: e.target})}}  value={props.currentNote.noteText} type="text" name="noteText" />
                </form>
                }
                <button onMouseOver={
                (e) => 
                    {
                        handleButtonHover(e)
                    }
                } 
                onMouseLeave={
                (e) => 
                    {
                        handleButtonOut(e)
                    }
                } 
                style={btnStyles} className="finishBtn" onClick={handleFinishBtnClick}
                >{isEnglish? props.currentEdit? "Submit" : "Create" : props.currentEdit? "Змінити" : "Створити"}</button>
            </div>
            <div className="toolBar">
                <p onClick={() => {props.dispatch({type: "clear-note"})}} style = {toolIconStyles} className = "toolIcon"><img height={32} width={32} src={isDarkTheme? clearNoteDark : clearNoteLight} alt="clear note"/> {document.body.clientWidth >= 1200 && (isEnglish? "Clear note" : "Очистити нотатку")}</p>
                <p onClick={() => {props.dispatch({type: "create-code-snippet"})}} style = {toolIconStyles} className="toolIcon"><img height={32} width={32} src={isDarkTheme? codeSnippetDark : codeSnippetLight} alt="create code snippet"/> {document.body.clientWidth >= 1200 && (isEnglish? "Create code snippet" : "Створити фрагмент коду")}</p>
                { isHeaderShowed? <HeaderChange createHeader={createHeaderProp} handleClick={() => {setHeaderShowed(false)}} /> : <p style={toolIconStyles} onClick={() => {setHeaderShowed(true); setListShowed(false)}} className="toolIcon"><img height={32} width={32}   src={isDarkTheme? headerDark : headerLight} alt="create header"/> {document.body.clientWidth >= 1200 && (isEnglish? "Create header" : "Створити заголовок")}</p>}
                { isListShowed? <AdjustMenuNumber handleListCreation={handleListCreation} handleClick = {closeListMenu} name="list" /> : <p onClick={() => {setListShowed(true) ; setHeaderShowed(false)}} style={toolIconStyles} className="toolIcon"><img height={32} width={32} src={isDarkTheme? listDark : listLight} alt="create list"/> {document.body.clientWidth >= 1200 && (isEnglish? "Create list" : "Створити список")}</p>}
            </div>
        </div>
    )
}