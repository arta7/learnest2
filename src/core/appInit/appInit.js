import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ServerUpdate from "../../pages/server-error(application-on-update)";
import useSetDeviceID from "./hooks/useSetDeviceID";
import CheckAppInstallationWrapper from "./wrappers/checkInstalledWrapper";
import PlatformCodes from "./wrappers/platformCodes";
// import SafeArea from "react-safe-area-component";
// const safeAreaInsets = require("safe-area-insets");
////////////////
const AppInitializeWrapper = ({ children }) => {
  useSetDeviceID();
  /////////
  useEffect(() => {
    if (!document.body.classList.contains("safe-area-styles"))
      document.body.classList.add("safe-area-styles");
  }, []);
  return (
    // <SafeArea top bottom>
    <>
      {/* <CheckAppInstallationWrapper> */}
      {/* <ServerUpdate /> */}
      <PlatformCodes>{children}</PlatformCodes>
      {/* </CheckAppInstallationWrapper> */}
    </>
    // </SafeArea>
  );
};

export default AppInitializeWrapper;
