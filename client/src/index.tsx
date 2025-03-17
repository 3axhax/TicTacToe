import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/store";
import "./App/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  /*<React.StrictMode>*/
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </Provider>,
  /*</React.StrictMode>,*/
);
