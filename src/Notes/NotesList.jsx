import React from "react";
import pencilLight from "../assets/pencilLight.svg"
import pencilDark from "../assets/pencilDark.svg"
import trashBucketDark from "../assets/trashBucketDark.svg"
import trashBucketLight from "../assets/trashBucketLight.svg";
import { useTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";
function Note(props) {
    const isDarkTheme = useTheme()
    const noteStyles = {
        borderColor: isDarkTheme? "#2E2E2E" : "#CCCCCC",
        backgroundColor: isDarkTheme? "#1E1E1E" : "#F5F5F5"
    }
    const headerStyles = {
        color: isDarkTheme? "#FFD700" : "#000000"
    }
    const paragraphStyles = {
        color: isDarkTheme? "#FFFFFF" : "#7f7d7d"
    }
    function handleHover(event) {
        event.target.style.color = isDarkTheme? "#2e0b6b" : "#da4e03" 
    }
    function handleOut(event) {
        event.target.style.color = isDarkTheme? "#FFD700" : "#000000"
    }
    return (
        <div  style={noteStyles} className="note">
            <h3 onClick={() => {
                props.previewNote({
                    text: props.text,
                    id: props.id,
                    noteText: props.noteText,
                    name: props.name,
                    lastDate: props.lastDate})
            }} onMouseOver={e => {
                    handleHover(e)
                }} onMouseLeave={e => {
                    handleOut(e)
                }} style={headerStyles}>{props.name}</h3>
            <p style={paragraphStyles}>{props.text}</p>
            <div className="options">
                <img className="deleteBtn" onClick={(e) => { e.stopPropagation(); props.deleteNote(props.id)}} src={isDarkTheme? trashBucketDark : trashBucketLight} alt="delete"/>
                <img className="changeBtn" onClick={(e) => {e.stopPropagation();props.handleChooseNote({
                    text: props.text,
                    id: props.id,
                    noteText: props.noteText,
                    name: props.name,
                    lastDate: props.lastDate
                });}} src={isDarkTheme? pencilDark : pencilLight} alt="change"/>
            </div>
        </div>
        )
}


export default function NotesList(props) {
    const isDarkTheme = useTheme()
    const createStyles = {
        backgroundColor: isDarkTheme? "#1459a2" : "#01853c"
    }
    return (
        <div className="notesList">
            <button onClick={() => {props.dispatch({type: "create-empty-note"})}} style={createStyles} className="createButton">{useLanguage()? "Create new note" : "Створити нову нотатку"} <span className="plus">+</span></button>
            {props.notes.length > 0 && props.notes.map((element) => {
                return <Note previewNote={viewedNote => {props.dispatch({type: "preview-note", newNote: viewedNote})}} key={element.id} lastDate={element.lastDate} noteText={element.noteText} id={element.id} name={element.name}
                text={element.text} deleteNote={props.deleteNote} handleChooseNote={viewedNote => {props.dispatch({type: "handle-choose-of-note", newNote: viewedNote})}} />
            })}
        </div>
    )
}