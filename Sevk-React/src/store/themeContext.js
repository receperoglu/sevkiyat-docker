import React, { createContext, useReducer, useContext } from "react";

import {
    greenTheme, opaqorangeTheme, orangeTheme, blueTheme, opaqblueTheme, navyTheme, purpleTheme
} from "./../components/Tools/ThemeColors";

const initialState = {

    ShowLayoutTheme: false
};

const reducer = (stateTheme, action) => {
    switch (action.type) {
        case "toggleTheme":
            return { ...stateTheme, ShowLayoutTheme: !stateTheme.ShowLayoutTheme };
        default:
            return stateTheme;
    }
};
const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [stateTheme, dispatchTheme] = useReducer(reducer, initialState);

    const themeSet = (color) => {
        var page = document.getElementById("page");
        page.setAttribute("style", color);
        localStorage.setItem("Theme", color);
    }
    const changeTheme = (color) => {
        if (color === "purple") {
            themeSet(purpleTheme);
        } else if (color === "blue") {
            themeSet(blueTheme);
        } else if (color === "orange") {
            themeSet(orangeTheme);
        } else if (color === "opaqblue") {
            themeSet(opaqblueTheme);
        } else if (color === "navy") {
            themeSet(navyTheme);
        } else if (color === "opaqorange") {
            themeSet(opaqorangeTheme);
        } else if (color === "green") {
            themeSet(greenTheme);
        }
    }

    return (
        <themeContext.Provider value={{ stateTheme, dispatchTheme, changeTheme }}>
            {children}
        </themeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(themeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};