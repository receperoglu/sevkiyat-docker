import React, { createContext, useReducer, useEffect, useCallback, useContext } from "react";
import { FetchFunc } from "./FetchFunc";
import * as ApiUrl from "./../components/Tools/Urls";

import LocalStore from "./../components/Tools/LocalStore";
import {
  DeleteOk
} from "../components/Tools/InfoWords";


const initialState = {
  Articel: {},
  File: [], Corps: [], SalesTypes: [], ProductTypes: [],
  Menu: false, isError: false, Loading: false,
  isMobile: false, Rotating: false, showOrder: false, ShowTopBar: false, ChangeView: false,
  ShowCallOut: false, DetailActive: false, ShowProductOut: false,
  NewProductShow: false, ShowLayoutNote: false, ShowProductEdit: false,
  ShowShippmentModal: false, ShowLayoutRight: false, NewArticelCreate: false, CreateArticelShow: false,
  ShowPicturePreview: false, ShowDocumentPreview: false, Piece: 0, Weight: 0, CorpId: 0,
  OrderId: 0, LoopCount: 0, SaleTypeId: 0,
  ActiveArticel: 0, ProductTypeId: 0, x: "", y: "", Path: "", Color: "", RawPath: "", FileType: "",
  CorpName: "", Dimensions: "", ConfirmType: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ConfirmAccept":
      return { ...state, ...action.payload };
    case "Get_Order":
      return { ...state, Orders: action.payload };
    case "Mouse_Position":
      return { ...state, x: action.payload.x, y: action.payload.y, Loading: true };
    case "setLoading":
      return { ...state, Loading: action.payload };
    case "openCallOut":
      return { ...state, Order: action.payload.Order, ShowCallOut: true, Loading: false, OneWaybill: action.payload.OneWaybill, waybillPiece: action.payload.waybillPiece, waybillWeight: action.payload.waybillWeight, LoopCount: action.payload.LoopCount };

    case "hidePicturePreview":
      return { ...state, ShowPicturePreview: false, File: [] };
    case "CancelCallOut":
      return { ...state, ShowCallOut: false, Order: [] };
    case "closeTopBar":
      return { ...state, ShowTopBar: false, DetailActive: false, showOrder: false, ActiveArticel: 0 };
    case "openTopBar":
      return { ...state, ShowTopBar: true, DetailActive: true, showOrder: true, ShowCallOut: false, ChangeView: false, Loading: false, ActiveArticel: action.payload };


    case "SaveArticel":
      return { ...state, Articel: action.payload };
    case "setArticel":
      return { ...state, Articel: action.payload };

    case "UpdateOrder":
      return { ...state, Orders: action.payload };
    case "toggleNote":
      return { ...state, ShowLayoutNote: action.payload };
    case "toggleShare":
      return { ...state, ShowLayoutRight: action.payload };
    case "toggleCreateArticel":
      return { ...state, CreateArticelShow: action.payload };
    case "toggleView":
      return { ...state, ChangeView: !state.ChangeView };
    case "ToggleMenu":
      return { ...state, Menu: !state.Menu };
    case "toggleShippment":
      return { ...state, ShowShippmentModal: action.payload };
    case "ChangeCorpId":
      return { ...state, CorpId: action.payload };
    case "ChangeSalesType":
      return { ...state, SaleTypeId: action.payload };
    case "ChangeProductType":
      return { ...state, ProductTypeId: action.payload };
    case "ChangePiece":
      return { ...state, Piece: action.payload };
    case "ChangeDimensions":
      return { ...state, Dimensions: action.payload };
    case "ChangeColor":
      return { ...state, Color: action.payload };
    case "ChangeWayBillId":
      return { ...state, WayBillId: action.payload };
    case "ChangeWeight":
      return { ...state, Weight: action.payload };
    case "handleOut":
      const existingItemIndex = state.OutOrders.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        const updatedOutOrders = state.OutOrders.map(item =>
          item.id === action.payload.id ? { ...item, [action.payload.name]: action.payload.value } : item
        );
        return { ...state, OutOrders: updatedOutOrders };
      } else {
        const newOutOrder = {
          id: action.payload.id,
          [action.payload.name]: action.payload.value
        };
        const updatedOutOrders = [...state.OutOrders, newOutOrder];
        return { ...state, OutOrders: updatedOutOrders };
      }

    case "toggleOut":
      return { ...state, ShowProductOut: action.payload.statu, File: action.payload };
    case "closeOutModal":
      return { ...state, ShowProductOut: false };
    case "toggleAddProduct":
      return { ...state, NewProductShow: action.payload };
    case "toggleEdit":
      return { ...state, ShowProductEdit: !state.ShowProductEdit, Order: action.payload };
    case "setProductTypes":
      return { ...state, ProductTypes: action.payload };


    default:
      return state;
  }
};

const SevkContext = createContext();

export const SevkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async (url, options = {}) => {
    const response = await FetchFunc(url, options);
    return response;
  }, []);





  const fetchCorps = useCallback(async () => {
    const response = await fetchData(ApiUrl.apiBase + "corps");
    localStorage.setItem("Corps", JSON.stringify(response));
    dispatch({ type: "WayBill_Data", payload: response });
  }, [fetchData]);

  const fetchProductTypes = useCallback(async () => {
    const response = await fetchData(ApiUrl.ProductTypeUrl);
    localStorage.setItem("ProductTypes", JSON.stringify(response));
    dispatch({ type: "setProductTypes", payload: response });
  }, [fetchData]);

  const fetchSalesTypes = useCallback(async () => {
    const response = await fetchData(ApiUrl.SalesTypeUrl);
    localStorage.setItem("SalesTypes", JSON.stringify(response));
    dispatch({ type: "WayBill_Data", payload: response });
  }, [fetchData]);

  const hideLoading = () => {
    dispatch({ type: "setLoading", payload: false });

  }
  const showLoading = () => {
    dispatch({ type: "setLoading", payload: true });
  }

  const ConfirmAccept = useCallback(async () => {

    showLoading();
    if (state.ConfirmType === "Articel") {
      setTimeout(() => {
        showLoading();
        this.setState({ ShowConfirm: false });
        FetchFunc(ApiUrl.DeleteArticelUrl + state.ActiveArticel);
        setTimeout(() => {
          this.setState({
            isError: true,
            Error: DeleteOk,
          });
          hideLoading();
          this.closeTopBar();
          LocalStore.remove("Articels");
          this.fetchArticels();
        }, 1300);
      }, 2500);
    } else if (state.ConfirmType === "File") {
      FetchFunc(state.FileId, {
        method: "GET",
      })
        .then((response) => {
          this.fetchFiles(state.ActiveArticel);
          this.setState({
            isError: true,
            Error: DeleteOk,
          });
          hideLoading();
          return true;
        })
        .catch((err) => {
          this.setState({ isError: true, Error: err });
        });
    }
  })

  const openDetail = () => {
    dispatch({ type: "openTopBar", payload: true });

  }

  const PostOrderUpdate = useCallback(async () => {

    showLoading();
    var url =
      ApiUrl.UpdateOrderUrl +
      state.Order.id +
      "&ProductType=" +
      state.ProductTypeId +
      "&Dimensions=" +
      state.Dimensions +
      "&Color=" +
      state.Color +
      "&Piece=" +
      state.Piece;
    await this.UpdateOrAddOrder(url);
  })


  const RotatePicture = useCallback(async () => {

    this.setState({ Rotating: true });
    var formData = new FormData();
    formData.append("Rotate", "Left");
    formData.append("Path", "/dosyalar/" + state.RawPath);
    formData.append("PictureName", state.Path);
    formData.append("PictureId", 0);
    await FetchFunc(ApiUrl.RotateUrl, {
      method: "POST",
      processData: false,
      body: formData,
    })
      .then((response) => {
        this.setState({ Path: response });
      })
      .then((data) => console.log(data));
    this.setState({ Rotating: false });
  })



  useEffect(() => {

    fetchCorps();
    fetchProductTypes();
    fetchSalesTypes();

  }, [fetchCorps, fetchProductTypes, fetchSalesTypes]);

  return (
    <SevkContext.Provider value={{ state, dispatch, showLoading, hideLoading, openDetail, ConfirmAccept, PostOrderUpdate, RotatePicture }}>
      {children}
    </SevkContext.Provider>
  );
};

export const useSevk = () => {
  const context = useContext(SevkContext);
  if (context === undefined) {
    throw new Error("useSevk must be used within a SevkProvider");
  }
  return context;
};