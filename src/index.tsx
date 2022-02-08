import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AppStore, AppStoreProvider } from "store/app-store";
import { RecoilRoot } from "recoil";

const appStore = new AppStore();

ReactDOM.render(
  <RecoilRoot>
    <AppStoreProvider value={appStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppStoreProvider>
  </RecoilRoot>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
