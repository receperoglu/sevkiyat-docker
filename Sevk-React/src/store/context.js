import React, { createContext, useReducer, useEffect, useCallback, useContext } from "react";
import { FetchFunc } from "./FetchFunc";
import {
  getArticelsUrl, ProductTypeUrl, DeleteArticelUrl, SalesTypeUrl, getFilesUrl,
  WayBillPhoto, waybillphotosave, MultiMotionUrl, DocumentUploadUrl, SaveUrl, NoteUrl,
  GetOrderUrl, OneMotionUrl, UpdateOrderUrl, SaveNoteUrl, RotateUrl, apiBase
} from "./../components/Tools/Urls";
import {
  greenTheme, opaqorangeTheme, orangeTheme, blueTheme, opaqblueTheme, navyTheme, purpleTheme
} from "./../components/Tools/ThemeColors";
import LocalStore from "./../components/Tools/LocalStore";
import {
  NoInternetConnection, NotWaybillPhoto, FileDeleteInfo, DeleteOk, UpdateOk, ArticelDeleteInfo
} from "../components/Tools/InfoWords";

const initialState = {
  File: [], Corps: [], Order: [], Files: [], Orders: [], OutOrders: [], Waybill: [],
  Articel: [], Articels: [], OneWaybill: [], SalesTypes: [], ProductTypes: [],
  FilteredArticels: [], Menu: false, Vtype: false, isError: false, Loading: false,
  isMobile: false, Rotating: false, showOrder: false, ShowTopBar: false, ChangeView: false,
  ShowConfirm: false, ShowCallOut: false, DetailActive: false, ShowProductOut: false,
  NewProductShow: false, ShowLayoutTheme: false, ShowLayoutNote: false, ShowProductEdit: false,
  ShowShippmentModal: false, ShowLayoutRight: false, NewArticelCreate: false, CreateArticelShow: false,
  ShowPicturePreview: false, ShowDocumentPreview: false, FileId: 0, Piece: 0, Weight: 0, CorpId: 0,
  OrderId: 0, WayBillId: 0, LoopCount: 0, SaleTypeId: 0, waybillPiece: 0, waybillWeight: 0,
  ActiveArticel: 0, ProductTypeId: 0, x: "", y: "", Path: "", Color: "", RawPath: "", FileType: "",
  CorpName: "", Dimensions: "", ArticelName: "", ArticelNotes: "", ConfirmType: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ConfirmAccept":
      return { ...state, ...action.payload };
    case "ConfirmToggle":
      return { ...state, ShowConfirm: !state.ShowConfirm, ConfirmType: "Articel", Error: ArticelDeleteInfo };
    case "cancelDocument":
      return { ...state, ShowDocumentPreview: false, File: [] };
    case "Get_Order":
      return { ...state, Orders: action.payload };
    case "Mouse_Position":
      return { ...state, x: action.payload.x, y: action.payload.y, Loading: true };
    case "WayBill_Data":
      return { ...state, Waybill: action.payload };
    case "openCallOut":
      return { ...state, Order: action.payload.Order, ShowCallOut: true, Loading: false, OneWaybill: action.payload.OneWaybill, waybillPiece: action.payload.waybillPiece, waybillWeight: action.payload.waybillWeight, LoopCount: action.payload.LoopCount };
    case "GetWayBillPhoto":
      return { ...state, File: action.payload.file, ShowPicturePreview: true, ShowShippmentModal: false };
    case "hidePicturePreview":
      return { ...state, ShowPicturePreview: false, File: [] };
    case "CancelCallOut":
      return { ...state, ShowCallOut: false, Order: [] };
    case "closeTopBar":
      return { ...state, ShowTopBar: false, DetailActive: false, showOrder: false, ActiveArticel: 0 };
    case "openTopBar":
      return { ...state, ShowTopBar: true, DetailActive: true, showOrder: true, ChangeView: false, Loading: false, ActiveArticel: action.payload };
    case "chooseFile":
      return { ...state, FileType: action.payload };
    case "SaveNotes":
      return { ...state, ArticelNotes: action.payload };
    case "saveWayBill":
      return { ...state, Waybill: action.payload };
    case "SaveArticel":
      return { ...state, Articel: action.payload };
    case "SaveOrder":
      return { ...state, Orders: action.payload };
    case "setOrders":
      return { ...state, OutOrders: [], Orders: action.payload.Orders, Articel: action.payload.Articel, CorpId: action.payload.CorpId, ArticelName: action.payload.ArticelName, CorpName: action.payload.CorpName, ShowCallOut: false };
    case "uploadFile":
      return { ...state, File: action.payload };
    case "UpdateArticelNote":
      return { ...state, ArticelNotes: action.payload };
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
    case "ChangeArticelName":
      return { ...state, ArticelName: action.payload };
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
    case "showDocumentPreview":
      return { ...state, ShowDocumentPreview: true, File: action.payload };
    case "showPicturePreview":
      return { ...state, ShowPicturePreview: true, File: action.payload };
    case "toggleOut":
      return { ...state, ShowProductOut: action.payload.statu, File: action.payload };
    case "closeOutModal":
      return { ...state, ShowProductOut: false };
    case "toggleAddProduct":
      return { ...state, NewProductShow: action.payload };
    case "toggleVtype":
      return { ...state, Vtype: !state.Vtype };
    case "setFiles":
      return { ...state, Files: action.payload };
    case "toggleEdit":
      return { ...state, ShowProductEdit: !state.ShowProductEdit, Order: action.payload };
    case "setProductTypes":
      return { ...state, ProductTypes: action.payload };
    case "toggleTheme":
      return { ...state, ShowLayoutTheme: !state.ShowLayoutTheme };

    case "Search":
      return { ...state, Articels: action.payload };
    case "setArticels":
      return { ...state, Articels: action.payload };

    case "DeleteFile":
      return { ...state, FileId: action.payload, ShowConfirm: true, ConfirmType: "File", Error: FileDeleteInfo };
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

  const fetchNotes = useCallback(async (ArticelId) => {
    const response = await fetch(NoteUrl + ArticelId);
    dispatch({ type: "SaveNotes", payload: await response.text() });
  }, []);

  const fetchWaybill = useCallback(async (ArticelId) => {
    dispatch({ type: "WayBill_Data", payload: [] });
    dispatch({ type: "Loading", payload: true });
    const response = await fetchData(MultiMotionUrl + ArticelId);
    dispatch({ type: "WayBill_Data", payload: response });
    dispatch({ type: "Loading", payload: false });
    fetchNotes(ArticelId);
  }, [fetchData]);

  const fetchFiles = useCallback(async (ArticelId) => {
    const response = await fetchData(getFilesUrl + ArticelId);
    dispatch({ type: "openTopBar", payload: ArticelId });
    dispatch({ type: "setFiles", payload: response });
    fetchWaybill(ArticelId);
  }, [fetchData]);

  const fetchCorps = useCallback(async () => {
    const response = await fetchData(apiBase + "corps");
    localStorage.setItem("Corps", JSON.stringify(response));
    dispatch({ type: "WayBill_Data", payload: response });
  }, [fetchData]);

  const fetchArticels = useCallback(async () => {

    const response = await fetchData(getArticelsUrl);
    if (!response.error) {
      dispatch({ type: "setArticels", payload: response });
      localStorage.setItem("Articels", JSON.stringify(response));
    } else {
      dispatch({ type: "isError", payload: { isError: true, Error: NoInternetConnection } });
    }
  }, [fetchData]);

  const fetchProductTypes = useCallback(async () => {
    const response = await fetchData(ProductTypeUrl);
    localStorage.setItem("ProductTypes", JSON.stringify(response));
    dispatch({ type: "setProductTypes", payload: response });
  }, [fetchData]);

  const fetchSalesTypes = useCallback(async () => {
    const response = await fetchData(SalesTypeUrl);
    localStorage.setItem("SalesTypes", JSON.stringify(response));
    dispatch({ type: "WayBill_Data", payload: response });
  }, [fetchData]);

  const fetchOrders = useCallback(async (Articel) => {
    dispatch({ type: "Loading", payload: true });
    const response = await fetchData(GetOrderUrl + Articel.id);
    dispatch({ type: "setOrders", payload: { Orders: response, CorpId: Articel.CorpId, ArticelName: Articel.ArticelName, CorpName: Articel.CustomerName, Articel: Articel } });
    localStorage.setItem("Orders", JSON.stringify(response));
    removeActiveRow();
    try {
      var FirstClicked = "Articel" + Articel.id;
      document.getElementById(FirstClicked).classList.add("ActiveArticelRow");
    } catch (error) { }


    fetchFiles(Articel.id)
  }, [fetchData]);

  useEffect(() => {
    if (!state.ShowTopBar) {
      removeActiveRow()
    }
  },
    [state.ShowTopBar]
  )

  const CallOutonMouseMove = useCallback(async (Order) => {

    var element = "Order" + Order.id;
    document.getElementById(element).classList.add("OrderProccessing");
    if (Order.id !== 0) {
      var url = OneMotionUrl + Order.id;
      var data = await FetchFunc(url);
      var totalpiece = 0;
      var totalweight = 0;
      data.map((w) => (totalpiece += parseInt(w.SendEdPiece, 10)));
      data.map((w) => (totalweight += parseInt(w.Weight, 10)));
      dispatch({ type: "openCallOut", payload: { OneWaybill: data, waybillPiece: totalpiece, waybillWeight: totalweight, LoopCount: data.length, Order: Order } });

    }

    document.getElementById(element).classList.remove("OrderProccessing");
  })

  const removeActiveRow = () => {
    document.querySelectorAll(".ArticelRow").forEach((el) => {
      if (el.classList.contains("ActiveArticelRow")) {
        el.classList.remove("ActiveArticelRow");
      }
    });
  }

  const SaveProductOut = useCallback(async () => {
    dispatch({ type: "Loading", payload: true });
    await fetch(apiBase + "ShipmentSave", {
      method: "POST",
      body: JSON.stringify({
        "waybillid": state.WayBillId,
        "CorpId": state.CorpId,
        "ArticelId": state.Articel.id,
        data: state.OutOrders
      }),
    })
      .then((response) => {
        dispatch({ type: "Loading", payload: false });
        dispatch({ type: "closeOutModal" });

        fetchOrders(state.Articel);


      })
      .then((data) => console.log(data));
  })
  const hideLoading = () => {
    dispatch({ type: "Loading", payload: false });

  }
  const showLoading = () => {
    dispatch({ type: "Loading", payload: true });

  }

  const ConfirmAccept = useCallback(async () => {

    showLoading();
    if (state.ConfirmType === "Articel") {
      setTimeout(() => {
        showLoading();
        this.setState({ ShowConfirm: false });
        var data = FetchFunc(DeleteArticelUrl + state.ActiveArticel);
        console.log(data);
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

  const PostOrderUpdate = useCallback(async () => {

    showLoading();
    var url =
      UpdateOrderUrl +
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
  const uploadFile = useCallback(async () => {

    try {

      showLoading();
      var FilesCollection = document.getElementById("FileNew");
      var fileList = FilesCollection.files;
      var formData = new FormData();
      formData.append("ArticelId", state.ActiveArticel);
      formData.append("FileType", state.FileType);
      formData.append("file", fileList[0], fileList[0].name);
      await fetch(DocumentUploadUrl, {
        method: "POST",
        contentType: "application/json",
        processData: false,
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.GetOrders(state.Articel);
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
  const RotatePicture = useCallback(async () => {

    this.setState({ Rotating: true });
    var formData = new FormData();
    formData.append("Rotate", "Left");
    formData.append("Path", "/dosyalar/" + state.RawPath);
    formData.append("PictureName", state.Path);
    formData.append("PictureId", 0);
    await FetchFunc(RotateUrl, {
      method: "POST",
      processData: false,
      body: formData,
    })
      .then((response) => {
        this.setState({ Path: response });
        console.log(response);
      })
      .then((data) => console.log(data));
    this.setState({ Rotating: false });
  })
  const SaveNotes = useCallback(async () => {

    showLoading();
    var formData = new FormData();
    formData.append("ArticelId", state.ActiveArticel);
    formData.append("Notes", state.ArticelNotes);
    await fetch(SaveNoteUrl, {
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
  const GetWayBillPhoto = useCallback(async (WayBillId) => {

    console.log("burda")

    await FetchFunc(WayBillPhoto + WayBillId)
      .then(
        (response) => {
          try {
            var file = { Path: response.path, RawPath: response.path };
            console.log(file);
            this.setState({ File: file, ShowPicturePreview: true, ShowShippmentModal: false });
          } catch (error) {
            this.setState({

              ShowShippmentModal: true, WayBillId: WayBillId
            });

          }
        },
        (error) => {
          console.log(error)
          this.setState({

            ShowShippmentModal: true, WayBillId: WayBillId
          });
          this.closeError();
        }
      );



  })

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
    console.log(state.ConfirmType);
  })
  const saveWayBill = useCallback(async () => {

    try {


      showLoading();
      var FilesCollection = document.getElementById("FileWayBill");
      var fileList = FilesCollection.files;
      var formData = new FormData();
      formData.append("ArticelId", state.ActiveArticel);
      formData.append("WayBillId", state.WayBillId)
      formData.append("file", fileList[0], fileList[0].name);
      await fetch(waybillphotosave, {
        method: "POST",
        contentType: "application/json",
        processData: false,
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {

          try {
            var file = { Path: response.path, RawPath: response.path };
            console.log(file);
            this.setState({ File: file, ShowPicturePreview: true, ShowShippmentModal: false });
          } catch (error) {
            this.setState({
              isError: true,
              Error: NotWaybillPhoto,
            });
            this.closeError();
          }
          hideLoading();
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
  const SaveArticel = useCallback(async () => {

    this.setState({ CreateArticelShow: true });
    var url =
      SaveUrl +
      state.CorpId +
      "&Articel=" +
      state.ArticelName +
      "&SaleType=" +
      state.SaleTypeId;
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

  useEffect(() => {

    fetchCorps();
    fetchProductTypes();
    fetchSalesTypes();

  }, [fetchCorps, fetchProductTypes, fetchSalesTypes]);

  return (
    <SevkContext.Provider value={{ state, dispatch, fetchArticels, fetchOrders, CallOutonMouseMove, SaveProductOut, changeTheme }}>
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