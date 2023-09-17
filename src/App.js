import React, { useEffect } from "react";
import RouterConfig from "./core/navigation/routeConfig";
import UserLoginProvider from "./core/contexts/authentication/authenticationProvider";
import UserProfileProvider from "./core/contexts/profile/profileProvider";
import { LoadingProvider } from "./core/contexts/loading/loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialTheme from "./core/material-theme/materialTheme";
import AppTourProvider from "./core/contexts/appTour/tour.context";
import { useWindowDimensions } from "./core/custom-hooks/getWindowDimensions";
import { Slide } from "react-toastify";
import AppInitializeWrapper from "./core/appInit/appInit";
import NotificationsProvider from "./core/contexts/notifications/notificationsCTX";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/errorBoundry.component";
import queryString from "query-string"

const safeAreaInsets = require("safe-area-insets");

function App() {
  const { width: windowInnerWidth } = useWindowDimensions();
  useEffect(()=>{
    window.ewano.onWebAppReady();
    const queryParams = new URLSearchParams("https://ewano.learnest.app/?id=")
    const term = queryParams.get("id")
    console.log('term : ',term)
  },[])
  // useEffect(() => {
  //   alert(JSON.stringify(safeAreaInsets));
  // }, [safeAreaInsets]);
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

export default App;
