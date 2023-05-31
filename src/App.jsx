import React from "react";
import FAQ from "./FAQ/FAQ";
import WrongPage from "./Wrong-Page/WrongPage";
import AboutUs from "./About-Us/About-Us";
import NotesPage from "./Notes/NotesPage";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import ThemeProvider from "./ThemeProvider";
import Advantages from "./Main-page/MainPage";
import PageLayout from "./PageLayout";
import { getNotesFromStorage } from "./Notes/NotesPage";
import LanguageProvider from "./LanguageProvider";


export default function App() {
    const createdRouts = createRoutesFromElements(
    <>
        <Route path="/" element={<PageLayout />}>
            <Route index element = {<Advantages />}/>
            <Route path="FAQ" element = {<FAQ />}/>
            <Route loader={getNotesFromStorage} path="Notes" element = {<NotesPage />}/>
            <Route path="About-Us" element = {<AboutUs />}/>
        </Route>
        <Route path="*" element = {<WrongPage />}/>
    </>
    )
    const appRouter = createBrowserRouter(createdRouts)

    return (
        <ThemeProvider>
            <LanguageProvider>
                <RouterProvider router={appRouter} />
            </LanguageProvider>
        </ThemeProvider>
    )
}