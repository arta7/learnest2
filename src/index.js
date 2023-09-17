import "core-js/full";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.rtl.css";
import "./assets/styles/base.scss";
import ServiceWorkerWrapper from "./components/updateApp";

function RenderApp() {

  ReactDOM.render(
    <BrowserRouter>
      <>
        <ServiceWorkerWrapper />
        <App />
      </>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
RenderApp();
