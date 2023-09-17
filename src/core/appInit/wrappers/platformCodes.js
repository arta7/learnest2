import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getCookie } from "../../utils/cookie";
import {
  isIos,
  isInStandaloneMode,
  isChromeOrSafari,
  checkWebview,
} from "../../utils/utils";

//////////
const PlatformCodes = ({ children }) => {
  //////////
  const navigate = useNavigate();
  const location = useLocation();
  //////////
  useEffect(() => {
    if (checkWebview(location.search)) {
      if (isIos()) {
        if (!isChromeOrSafari()) {
          navigate("/browser-error", { replace: true });
        } else if (!isInStandaloneMode()) {
          navigate("/ios-installation-guide", { replace: true });
        }
      } else {
        navigate("/android-installation-guide", { replace: true });
      }
    }
  }, []);
  /////////////////////////
  return <>{children}</>;
};

export default PlatformCodes;

export const useCheckPlatform = ({ delay }) => {
  ////////////
  const [allowStayInApp, set_allowStayInApp] = useState();
  const [isPending, set_isPending] = useState(true);
  ////////////
  let timeout;
  useEffect(() => {
    if (isIos()) {
      set_allowStayInApp(true);
      set_isPending(false);
    } else {
      set_isPending(true);
      timeout = setTimeout(() => {
        if (!isIos() && !getCookie("mac-address")) {
          set_allowStayInApp(false);
          set_isPending(false);
        } else {
          set_allowStayInApp(true);
          set_isPending(false);
        }
      }, delay);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return { allowStayInApp, isPending };
};
