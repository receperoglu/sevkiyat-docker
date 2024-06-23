import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";
import { SevkProvider } from "./store/context";
import { ThemeProvider } from "./store/themeContext";
import { ArticelProvider } from "./store/ArticelContext";
import { OrderProvider } from "./store/OrderContext";
import { WayBillProvider } from "./store/WayBillContext";
import { FilesProvider } from "./store/FilesContext";
import { NotesProvider } from "./store/NoteContext";


ReactDOM.render(
  <ThemeProvider>
    <SevkProvider>
      <ArticelProvider>
        <OrderProvider>
          <WayBillProvider>
            <FilesProvider>
              <NotesProvider>
                <MainPage />
              </NotesProvider>
            </FilesProvider>
          </WayBillProvider>
        </OrderProvider>
      </ArticelProvider>
    </SevkProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
