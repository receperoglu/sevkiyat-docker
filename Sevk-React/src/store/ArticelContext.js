import React, { createContext, useReducer, useCallback, useContext } from "react";
import {
    NotWaybillPhoto
} from "../components/Tools/InfoWords";
import { FetchFunc } from "./FetchFunc";
import * as ApiUrl from "./../components/Tools/Urls";
import { useSevk } from "../store/context";

const initialArticelState = {
    Articels: [],

    ActiveArticel: 0,
};

const articelReducer = (state, action) => {
    switch (action.type) {
        case "SaveArticel":
            return { ...state, Articel: action.payload };
        case "setArticels":
            return { ...state, Articels: action.payload };
        case "Search":
            return { ...state, Articels: action.payload };
        case "DeleteArticel":
            return state;
        default:
            return state;
    }
};

// Context oluşturma
const ArticelContext = createContext();

export const ArticelProvider = ({ children }) => {
    const [articelState, articelDispatch] = useReducer(articelReducer, initialArticelState);
    const { showLoading, hideLoading, state } = useSevk();
    const { Articel, FileType } = state;


    const fetchData = useCallback(async (url, options = {}) => {
        showLoading();
        const response = await FetchFunc(url, options);
        hideLoading();
        return response;
    }, []);

    const fetchArticels = useCallback(async () => {
        try {
            const response = await fetchData(ApiUrl.getArticelsUrl);
            if (!response.error) {
                articelDispatch({ type: "setArticels", payload: response });
                localStorage.setItem("Articels", JSON.stringify(response));
            } else {
                console.error("Articels fetch error:", response.error);
                // dispatch({ type: "fetchError", payload: { error: response.error } });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            // dispatch({ type: "fetchError", payload: { error } });
        } finally {
            hideLoading();
        }

    }, [fetchData]);

    const saveArticel = useCallback(async (articelData) => {
        try {
            const response = await FetchFunc(ApiUrl.SaveUrl, {
                method: "POST",
                body: JSON.stringify(articelData),
            });
            articelDispatch({ type: "SaveArticel", payload: response });
        } catch (error) {
            console.error("Save articel error:", error);
            // dispatch({ type: "saveError", payload: { error } });
        }
    }, []);



    const getArticelInLocal = () => {
        var allArticels = JSON.parse(localStorage.getItem("Articels"));
        return allArticels;
    }

    const searchArticel = useCallback((searchTxt) => {
        searchTxt = searchTxt.toLowerCase()
        if (searchTxt.trim() === "") {
            articelDispatch({ type: "setArticels", payload: [...getArticelInLocal()] });
        } else {
            const filteredArticels = articelState.Articels.filter(
                (articel) =>
                    articel.ArticelName.toLowerCase().includes(searchTxt) ||
                    articel.CustomerName.toLowerCase().includes(searchTxt) ||
                    articel.id.toString().includes(searchTxt)
            );
            articelDispatch({ type: "setArticels", payload: filteredArticels });
        }
        hideLoading();
    }, [articelState.Articels]);

    const SaveArticel = useCallback(async () => {

        this.setState({ CreateArticelShow: true });
        var url =
            ApiUrl.SaveUrl +
            articelState.CorpId +
            "&Articel=" +
            articelState.ArticelName +
            "&SaleType=" +
            articelState.SaleTypeId;
        const response = await FetchFunc(url, {
            method: "POST",
            cache: "no-cache",
            mode: "cors",
        });
        let articelid = response.json();
        this.setState({
            ArticelId: articelid,
            NewProductShow: true,
            CreateArticelShow: false,
        });
    })

    const uploadFile = useCallback(async () => {

        try {

            showLoading();
            var FilesCollection = document.getElementById("FileNew");
            var fileList = FilesCollection.files;
            var formData = new FormData();
            formData.append("ArticelId", Articel.id);
            formData.append("FileType", FileType);
            formData.append("file", fileList[0], fileList[0].name);
            await fetch(ApiUrl.DocumentUploadUrl, {
                method: "POST",
                contentType: "application/json",
                processData: false,
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    this.GetOrders(Articel);
                    hideLoading();
                })
                .catch((error) => {
                    this.setState({
                        isError: true,
                        Error: NotWaybillPhoto + error,
                    });
                    hideLoading()
                    this.closeError();
                });
        } catch (e) { }
    })


    return (
        <ArticelContext.Provider value={{ articelState, articelDispatch, searchArticel, fetchArticels, saveArticel, uploadFile, SaveArticel }}>
            {children}
        </ArticelContext.Provider>
    );
};

export const useArticel = () => {
    const context = useContext(ArticelContext);
    if (context === undefined) {
        throw new Error("useArticel must be used within a ArticelProvider");
    }
    return context;
};