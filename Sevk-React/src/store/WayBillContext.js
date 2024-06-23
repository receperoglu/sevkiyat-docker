import React, { createContext, useReducer, useCallback, useContext, useEffect } from "react";
import {
    NotWaybillPhoto
} from "../components/Tools/InfoWords";
import { FetchFunc } from "./FetchFunc";
import * as ApiUrl from "../components/Tools/Urls";
import { useSevk } from "./context";

const initialWayBillState = {
    WayBills: [],
    Waybill: [],
    OneWaybill: [],
    WayBillId: 0,
    waybillPiece: 0, waybillWeight: 0,
};

const WayBillReducer = (state, action) => {
    switch (action.type) {
        case "setWayBillData":
            return { ...state, WayBills: action.payload };
        case "GetWayBillPhoto":
            return { ...state, File: action.payload.file, ShowPicturePreview: true, ShowShippmentModal: false };
        case "chooseFile":
            return { ...state, FileType: action.payload };
        case "uploadFile":
            return { ...state, File: action.payload };
        case "DeleteWayBill":
            return state;
        default:
            return state;
    }
};

const WayBillContext = createContext();

export const WayBillProvider = ({ children }) => {
    const { showLoading, hideLoading, state, dispatch } = useSevk();
    const { Articel } = state;

    const [WayBillState, WayBillDispatch] = useReducer(WayBillReducer, initialWayBillState);

    const fetchData = useCallback(async (url, options = {}) => {
        showLoading();
        const response = await FetchFunc(url, options);
        hideLoading();
        return response;
    }, []);

    const fetchWaybills = useCallback(async () => {
        WayBillDispatch({ type: "setWayBillData", payload: [] });
        if (Articel && Articel.id) {
            const response = await fetchData(ApiUrl.MultiMotionUrl + Articel.id);
            WayBillDispatch({ type: "setWayBillData", payload: response });
        }
        hideLoading();
    }, [fetchData, Articel]);

    useEffect(() => {
        fetchWaybills();
    }, [Articel])

    const saveWayBill = useCallback(async () => {

        try {
            showLoading();
            var FilesCollection = document.getElementById("FileWayBill");
            var fileList = FilesCollection.files;
            var formData = new FormData();
            formData.append("ArticelId", state.Articel.id);
            formData.append("WayBillId", state.WayBillId)
            formData.append("file", fileList[0], fileList[0].name);
            await fetch(ApiUrl.waybillphotosave, {
                method: "POST",
                contentType: "application/json",
                processData: false,
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => {

                    try {
                        var file = { Path: response.path, RawPath: response.path };
                        this.setState({ File: file, ShowPicturePreview: true, ShowShippmentModal: false });
                    } catch (error) {
                        this.setState({
                            isError: true,
                            Error: NotWaybillPhoto,
                        });
                        this.closeError();
                    }
                    finally { hideLoading(); }
                })
                .catch((error) => {
                    this.setState({
                        isError: true,
                        Error: NotWaybillPhoto + error,
                    });
                    hideLoading();
                    this.closeError();
                });
        } catch (e) { }
    })

    const SaveProductOut = useCallback(async () => {
        showLoading();
        await fetch(ApiUrl.apiBase + "ShipmentSave", {
            method: "POST",
            body: JSON.stringify({
                "waybillid": state.WayBillId,
                "CorpId": state.CorpId,
                "ArticelId": state.Articel.id,
                data: state.OutOrders
            }),
        })
            .then((response) => {
                hideLoading();
                dispatch({ type: "closeOutModal" });

                //fetchOrders(state.Articel);

            })
            .then((data) => console.log(data));
    })

    const GetWayBillPhoto = useCallback(async (WayBillId) => {

        await FetchFunc(ApiUrl.WayBillPhoto + WayBillId)
            .then(
                (response) => {
                    try {
                        var file = { Path: response.path, RawPath: response.path };
                        this.setState({ File: file, ShowPicturePreview: true, ShowShippmentModal: false });
                    } catch (error) {
                        this.setState({

                            ShowShippmentModal: true, WayBillId: WayBillId
                        });

                    }
                },
                (error) => {
                    this.setState({
                        ShowShippmentModal: true, WayBillId: WayBillId
                    });
                    this.closeError();
                }
            );
    })

    const CallOutonMouseMove = useCallback(async (Order) => {
        var element = "Order" + Order.id;
        document.getElementById(element).classList.add("OrderProccessing");
        if (Order.id !== 0) {
            var data = await FetchFunc(ApiUrl.OneMotionUrl + Order.id);
            var totalpiece = 0;
            var totalweight = 0;
            data.map((w) => (totalpiece += parseInt(w.SendEdPiece, 10)));
            data.map((w) => (totalweight += parseInt(w.Weight, 10)));
            dispatch({ type: "openCallOut", payload: { OneWaybill: data, waybillPiece: totalpiece, waybillWeight: totalweight, LoopCount: data.length, Order: Order } });
        }
        document.getElementById(element).classList.remove("OrderProccessing");
    })

    return (
        <WayBillContext.Provider value={{ WayBillState, WayBillDispatch, fetchWaybills, CallOutonMouseMove, saveWayBill, SaveProductOut, GetWayBillPhoto }}>
            {children}
        </WayBillContext.Provider>
    );
};

export const useWayBill = () => {
    const context = useContext(WayBillContext);
    if (context === undefined) {
        throw new Error("useWayBill must be used within a WayBillProvider");
    }
    return context;
};