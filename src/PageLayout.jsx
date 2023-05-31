import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useTheme } from "./ThemeProvider";

export default function PageLayout() {
    const mainStyles = {
        backgroundColor: useTheme()? "black" : "white"
    }
    return (
        <div style={mainStyles} className="top-div">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}