import React, {useState, useReducer, useEffect} from "react";
import "./NotesPage.css"
import EditBar from "./EditBar";
import NotesList from "./NotesList";
import { useTheme } from "../ThemeProvider";
import { useLoaderData } from "react-router-dom";
import { useLanguage } from "../LanguageProvider";



function filterString(str) {
    const replaced = str.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄёЁ0-9]+/g, ' ').replace(/\s{2,}/g, ' ');
    return replaced;
}

function AlertMessage({messageType=null, alertText=null}) {
    if (!messageType) {
        return null
    }
    const [currentProgress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => prevProgress + 25)
        }, 25)
        return () => {clearInterval(interval)}
    }, [])
    let messageColor;
    switch(messageType) {
        case 3: {
            messageColor = "red"
        }
        break; 
        case 2: {
            messageColor = "orange"
        }
        break;
        case 1: {
            messageColor = "green"
        }
    }
    return (
        <div style={{backgroundColor: messageColor}} className="alertMessage">
            <div className="alertContent">
                <p className="alertText">{alertText}</p>
            </div>
            <progress value={currentProgress} max={800}></progress>
        </div>
    )
}

export function getNotesFromStorage() {
    
    if (!localStorage.getItem("notes")) {
        return []
    }
    const data = localStorage.getItem("notes")
    const dataArray = JSON.parse(data)
    const notes = dataArray.map(element => {
        return {
            ...element,
            lastDate: new Date(element.lastDate)
        }
    })
    return notes
}

export default function NotesPage() {
    const isEnglish = useLanguage()
    const isDarkTheme = useTheme() 
    const [isPreview, togglePreview] = useState(false)
    const [notes, setNotes] = useState(useLoaderData())

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const mainStyles = {
        backgroundColor: isDarkTheme? "black" : "white"
    } 
    const [alertText, setText] = useState(null)
    const [messageType, setType] = useState(null)
    const [currentTimer, setTimer] = useState(null)
    const [currentEdit, setCurrentEdit] = useState(false)
    const [currentEditedNote, dispatchCurrentNote] = useReducer(currentNoteReducer, {id: notes.length,
        name: "",
        text: "",
        noteText: "",
        lastDate: new Date()
    })
    
    

    function changeNote(id, newNote) {
        if (newNote.name === "") {
            const message =  isEnglish? "Need to provide name" : "Потрібно навести ім'я"
            displayMessage(2, message)
            return false
        }
        const message = isEnglish? "Note changed" : "Нотатка змінена"
        displayMessage(1, message)
        newNote.lastDate = new Date()
        newNote.text = filterString(newNote.noteText).length > 15 ? `${filterString(newNote.noteText).slice(0, 15)}...` : filterString(newNote.noteText)
        dispatchCurrentNote({type: "set-note", newNote: newNote})
        setNotes(prevNotes => prevNotes.map(element =>  element.id === id? newNote : element))
    }

    function displayMessage(type, text) {
        clearTimeout(currentTimer)
        setText(text)
        setType(type)
        setTimer(setTimeout(() => {
            setText(null)
            setType(null)
        }, 800))
    }
    
    function deleteNote(id) {
        if (id === currentEditedNote.id) {
            dispatchCurrentNote({
                type: "clear-note"
            })
            setCurrentEdit(false) 
            togglePreview(false)
        }
        const message = isEnglish? "Deleted note" : "Нотатка видалена"
        displayMessage(3, message)
        setNotes(prevNotes => prevNotes.filter(element => element.id !== id))
    }
    function createNote(newNote) {
        if (newNote.name === "") {
            const message = isEnglish? "Need to provide name" : "Потрібно навести ім'я"
            displayMessage(2, message)
            return false
        }
        const message = isEnglish? "Created new note" : "Створена нова нотатка"
        displayMessage(1, message)
        newNote.lastDate = new Date()
        newNote.text = filterString(newNote.noteText).length > 15 ? `${filterString(newNote.noteText).slice(0, 15)}...` : filterString(newNote.noteText)
        dispatchCurrentNote({type:"set-note", newNote: newNote})
        setNotes(prevNotes => [...prevNotes, newNote])
        setCurrentEdit(true)
    }
    function enablePreview() {
        togglePreview(true)
    }
    function disablePreview() {
        togglePreview(false)
    }
    function currentNoteReducer(state, action) {
        switch(action.type) {
            case "handle-choose-of-note": {
                togglePreview(false)
                setCurrentEdit(true)
                return action.newNote
            }
            case "set-note" : {
                return action.newNote
            }
            case "preview-note" : {
                togglePreview(true)
                setCurrentEdit(true)
                return action.newNote
            }
            case "handle-change": {
                return {
                    ...state,
                    [action.eTarget.name]: action.eTarget.value
                }
            }
            case "clear-note": {
                return {
                    ...state,
                    name: "",
                    noteText: "",
                    text: ""
                }
            }
            case "create-empty-note": {
                setCurrentEdit(false)
                togglePreview(false)
                return {
                    id: notes.length,
                    name: "",
                    text: "",
                    noteText: "",
                    lastDate: new Date()
                }
            }
            case "create-code-snippet": {
                return {
                    ...state,
                    noteText: state.noteText + "\n```\n \n ```"} 
            }
            case "create-header": {
                return {
                    ...state,
                    noteText: state.noteText + `\n${action.header} `
                }
            }
            case "create-list": {
                if (action.bulletsCount < 0) {
                    return {
                        ...state,
                        noteText: state.noteText + "\n### \n"
                    }
                }
                let numbers = [];
                for (let i = 1; i < action.bulletsCount; i++) {
                    numbers.push(`  ${i}. `);
                }
                numbers.push(`  ${action.bulletsCount}. `);
                const list = "\n### \n" + numbers.join('\n');
                return {
                    ...state,
                    noteText: state.noteText + list
                }
            }
        }
    }
    return (
        <div style={mainStyles} className="notesPart">
            <AlertMessage alertText={alertText} messageType={messageType} />
            <NotesList dispatch={dispatchCurrentNote} notes={notes} deleteNote={deleteNote}  />
            <EditBar dispatch={dispatchCurrentNote} disablePreview={disablePreview} enablePreview={enablePreview} isPreview={isPreview} handleSubmit={currentEdit? changeNote : createNote} currentEdit={currentEdit} currentNote={currentEditedNote} />
            </div>
        )
    }