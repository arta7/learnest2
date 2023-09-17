import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./core/navigation/routeConfig";
import UserLoginProvider from "./core/contexts/authentication/authenticationProvider";
import UserProfileProvider from "./core/contexts/profile/profileProvider";
import { LoadingProvider } from "./core/contexts/loading/loading";
import { ToastContainer } from "react-toastify";
import MaterialTheme from "./core/material-theme/materialTheme";
import AppTourProvider from "./core/contexts/appTour/tour.context";
import { useWindowDimensions } from "./core/custom-hooks/getWindowDimensions";
import { Slide } from "react-toastify";
import AppInitializeWrapper from "./core/appInit/appInit";
import NotificationsProvider from "./core/contexts/notifications/notificationsCTX";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/errorBoundry.component";
import ServiceWorkerWrapper from "./components/updateApp";
import "bootstrap/dist/css/bootstrap.rtl.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/base.scss";
const safeAreaInsets = require("safe-area-insets");

function App() {
  const { width: windowInnerWidth } = useWindowDimensions();
  //////////////
  return (
    <div className="App">
      <ToastContainer
        rtl={true}
        style={{
          zIndex: "1000000000",
          width: windowInnerWidth >= 800 ? "800px" : "100vw",
          fontFamily: "iransans",
          top: safeAreaInsets?.top + "px" || "0",
        }}
        className="font-iransans text-nowrap p-0"
        position="top-center"
        transition={(props) => <Slide {...props} />}
        autoClose="2000"
        hideProgressBar={true}
      />
      <LoadingProvider>
        <UserLoginProvider>
          <UserProfileProvider>
            <NotificationsProvider>
              <MaterialTheme>
                <AppTourProvider>
                  <AppInitializeWrapper>
                    <ErrorBoundary fallbackRender={ErrorFallback}>
                      <RouterConfig />
                    </ErrorBoundary>
                  </AppInitializeWrapper>
                </AppTourProvider>
              </MaterialTheme>
            </NotificationsProvider>
          </UserProfileProvider>
        </UserLoginProvider>
      </LoadingProvider>
    </div>
  );
}

function RenderApp() {
  ReactDOM.render(
    <BrowserRouter>
      <>
        {/* {checkIosVersion() >= 11 && <ServiceWorkerWrapper />} */}
        <ServiceWorkerWrapper />
        <App />
      </>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

RenderApp();

export default RenderApp;
