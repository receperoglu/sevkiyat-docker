import React, { createContext, useReducer, useCallback, useContext, useEffect } from "react";
import { FetchFunc } from "./FetchFunc";
import * as ApiUrl from "./../components/Tools/Urls";
import { useSevk } from "../store/context";

const initialOrderState = {
    Order: [],
    Orders: [],
    OutOrders: [],
};

const OrderReducer = (state, action) => {
    switch (action.type) {
        case "setOrders":
            return { ...state, OutOrders: [], Orders: action.payload.Orders };
        case "SaveOrder":
            return { ...state, Orders: action.payload };
        default:
            return state;
    }
};

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { state, showLoading, hideLoading, openDetail } = useSevk();
    const { Articel } = state;

    const [OrderState, OrderDispatch] = useReducer(OrderReducer, initialOrderState);
    useEffect(() => {
        if (!state.ShowTopBar) {
            removeActiveRow()
        }
    },
        [state.ShowTopBar]
    )

    const fetchData = useCallback(async (url, options = {}) => {
        showLoading();
        const response = await FetchFunc(url, options);
        hideLoading();
        return response;
    }, []);

    const removeActiveRow = () => {
        document.querySelectorAll(".ArticelRow").forEach((el) => {
            if (el.classList.contains("ActiveArticelRow")) {
                el.classList.remove("ActiveArticelRow");
            }
        });
    }

    const fetchOrders = useCallback(async () => {
        if (Articel && Articel.id) {
            const response = await fetchData(ApiUrl.GetOrderUrl + Articel.id);
            OrderDispatch({ type: "setOrders", payload: { Orders: response } });
            localStorage.setItem("Orders", JSON.stringify(response));
            removeActiveRow();
            openDetail();
            try {
                var FirstClicked = "Articel" + Articel.id;
                document.getElementById(FirstClicked).classList.add("ActiveArticelRow");
            } catch (error) { }
        }
    }, [fetchData, Articel]);

    useEffect(() => {
        fetchOrders();
    }, [Articel])


    return (
        <OrderContext.Provider value={{ OrderState, OrderDispatch, fetchOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error("useOrder must be used within a OrderProvider");
    }
    return context;
};