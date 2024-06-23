import React, { createContext, useReducer, useCallback, useContext, useEffect } from "react";

import * as ApiUrl from "../components/Tools/Urls";
import { useSevk } from "./context";
import {
    UpdateOk
} from "../components/Tools/InfoWords";
const initialNotesState = {
    ArticelNotes: ""

};

const NotesReducer = (state, action) => {
    switch (action.type) {
        case "setNotes":
            return { ...state, ArticelNotes: action.payload };
        default:
            return state;
    }
};

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const { showLoading, hideLoading, state } = useSevk();
    const { Articel } = state;

    const [NotesState, NotesDispatch] = useReducer(NotesReducer, initialNotesState);


    const fetchNotes = useCallback(async () => {
        showLoading();
        if (Articel && Articel.id) {
            const response = await fetch(ApiUrl.NoteUrl + Articel.id);
            NotesDispatch({ type: "setNotes", payload: await response.text() });
        }
        hideLoading();
    }, [Articel]);

    useEffect(() => {
        fetchNotes();
    }, [Articel])

    const SaveNotes = useCallback(async () => {

        showLoading();
        var formData = new FormData();
        formData.append("ArticelId", Articel.id);
        formData.append("Notes", NotesState.ArticelNotes);
        await fetch(ApiUrl.SaveNoteUrl, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                setTimeout(() => {
                    this.setState({
                        ShowLayoutNote: false,
                        isError: true,
                        Error: UpdateOk,
                    });
                    hideLoading();
                    setTimeout(() => {
                        this.setState({ ShowLayoutNote: true, isError: false });
                    }, 1500);
                }, 2500);
            })
            .then((data) => console.log(data));
    })


    return (
        <NotesContext.Provider value={{ NotesState, NotesDispatch, fetchNotes, SaveNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
};