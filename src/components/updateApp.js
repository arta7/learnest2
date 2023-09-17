import React, { useEffect } from "react";
import { Snackbar, Button, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";
import { checkWebview, deleteAllCookies } from "../core/utils/utils";
import { useLocation } from "react-router";

const ServiceWorkerWrapper = () => {
  const location = useLocation();
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState();
  const handleCloseSnackbar = () => {
    setShowReload(false);
  };
  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };
  useEffect(() => {
    // if (!checkWebview(location.search))
    //    serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
    serviceWorkerRegistration.register({ onUpdate: reloadPage1 });
  }, []);
  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    if ("serviceWorker" in navigator) {
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    deleteAllCookies();
    window.location.reload(true);
  };
  const reloadPage1 = () => {
    if ("serviceWorker" in navigator) {
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    deleteAllCookies();
    window.location.reload(true);
  };
  return (
    <Snackbar
      open={showReload}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      action={
        <div className="d-flex flex-row justify-content-start align-items-center">
          <IconButton className="m-0 p-0 me-3" onClick={handleCloseSnackbar}>
            <HighlightOffIcon color="error" fontSize="medium" />
          </IconButton>
          <span>نسخه جدیدی موجود است .</span>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={reloadPage}
            className="ms-3"
          >
            بروزرسانی
          </Button>
        </div>
      }
    />
  );
};

export default ServiceWorkerWrapper;
