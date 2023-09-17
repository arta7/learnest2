import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { fileBaseUrl } from "../../core/services/baseUrl";
import buttonShareIcon from "../../assets/img/icons/safari-share.png";
import safariAddToHomeScreen from "../../assets/img/icons/safari-addToHomeScreen.png";
import { Button } from "@mui/material";
import { Directions, Google } from "@mui/icons-material";

//// direct d icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const IosInstallationGuide = () => {
  return (
    <section
      style={{ minHeight: "100vh" }}
      className="m-0 p-3 w-100 bg-white d-flex flex-column justify-content-center align-items-stretch"
    >
      {/* Text */}
      <div className="m-0 p-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <h3 className="fs-3  text-center">دانلود اپلیکشن لرنست </h3>
        {/*  */}
        <Button
          color="primary"
          variant="contained"
          className="rounded rounded-pill my-3 mt-5"
          startIcon={<Google className="me-2" />}
          size="large"
          href="https://play.google.com/store/apps/details?id=com.niknetco.learnest"
          LinkComponent={(props) => (
            <a
              href={
                "https://play.google.com/store/apps/details?id=com.niknetco.learnest"
              }
              {...props}
              className={props?.className + " text-white"}
            />
          )}
        >
          دانلود از گوگل پلی
        </Button>
        <Button
          color="primary"
          variant="contained"
          className="rounded rounded-pill my-3"
          startIcon={<CloudDownloadIcon className="me-2" />}
          size="large"
          href="https://dl.learnest.app/android.apk"
          LinkComponent={(props) => (
            <a
              href={"https://dl.learnest.app/android.apk"}
              {...props}
              className={props?.className + " text-white"}
            />
          )}
        >
          دانلود مستقیم
        </Button>
      </div>
    </section>
  );
};

export default IosInstallationGuide;
