import React, { createContext, useReducer, useCallback, useContext, useEffect } from "react";

import { FetchFunc } from "./FetchFunc";
import * as ApiUrl from "../components/Tools/Urls";
import { useSevk } from "./context";
import {
    FileDeleteInfo, ArticelDeleteInfo
} from "../components/Tools/InfoWords";
const initialFilesState = {
    Files: [],
    File: [],
    OneFiles: [],
    FilesId: 0,
    FilesPiece: 0, FilesWeight: 0, FileId: 0, ShowConfirm: false, Vtype: false,

};

const FilesReducer = (state, action) => {
    switch (action.type) {
        case "setFilesData":
            return { ...state, Files: action.payload };
        case "DeleteFile":
            return { ...state, FileId: action.payload, ShowConfirm: true, ConfirmType: "File", Error: FileDeleteInfo };
        case "ConfirmToggle":
            return { ...state, ShowConfirm: !state.ShowConfirm, ConfirmType: "Articel", Error: ArticelDeleteInfo };
        case "showDocumentPreview":
            return { ...state, ShowDocumentPreview: true, File: action.payload };
        case "showPicturePreview":
            return { ...state, ShowPicturePreview: true, File: action.payload };
        case "toggleVtype":
            return { ...state, Vtype: !state.Vtype };
        case "DeleteFiles":
            return state;
        default:
            return state;
    }
};

const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
    const [FilesState, FilesDispatch] = useReducer(FilesReducer, initialFilesState);
    const { showLoading, hideLoading, state } = useSevk();
    const { Articel } = state;


    const fetchData = useCallback(async (url, options = {}) => {
        showLoading();
        const response = await FetchFunc(url, options);
        hideLoading();
        return response;
    }, []);

    const fetchFiles = useCallback(async () => {
        if (Articel && Articel.id) {
            const response = await fetchData(ApiUrl.getFilesUrl + Articel.id);
            FilesDispatch({ type: "setFilesData", payload: response });
        }
    }, [fetchData, Articel]);

    useEffect(() => {
        fetchFiles();
    }, [Articel])


    const DeleteFile = useCallback(async (FileId) => {

        this.setState({
            ShowProductEdit: false,
            FileId: FileId,
            ConfirmType: "File",
            NewProductShow: false,
            ShowConfirm: true,
            Error: FileDeleteInfo,
        });
        hideLoading();
    })

    return (
        <FilesContext.Provider value={{ FilesState, FilesDispatch, fetchFiles, DeleteFile }}>
            {children}
        </FilesContext.Provider>
    );
};

export const useFiles = () => {
    const context = useContext(FilesContext);
    if (context === undefined) {
        throw new Error("useFiles must be used within a FilesProvider");
    }
    return context;
};