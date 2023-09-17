import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { fileBaseUrl } from "../../core/services/baseUrl";
import buttonShareIcon from "../../assets/img/icons/safari-share.png";
import safariAddToHomeScreen from "../../assets/img/icons/safari-addToHomeScreen.png";

//url={fileBaseUrl + "tutorials/pwa.mp4"

const IosInstallationGuide = () => {
  return (
    <section
      style={{ minHeight: "100vh" }}
      className="m-0 p-3 w-100 bg-white d-flex flex-column justify-content-start align-items-stretch"
    >
      {/* Text */}
      <div className="m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
        <h3 className="fs-5 text-center"> افزودن به صفحه اصلی </h3>
        <small className="fs-7 mt-2 text-muted">
          با افزودن این وب اپلیکیشین به صفحه اصلی میتوانید به صورت تمام صفحه به
          این وب اپلیکیشین دسترسی داشته باشید . برای افزودن به صفحه اصلی طبق
          موارد زیر یا طبق ویدیوی عمل کنید
        </small>
        <div className="d-flex flex-row justify-content-start align-items-start mt-2">
          <img
            alt="button-share-icon"
            style={{ width: "28px" }}
            src={buttonShareIcon}
          />
          <span className="ms-2">
            1) این دکمه را در قسمت منو بار پایین بفشارید
          </span>
        </div>
        <div className="mt-3 d-flex flex-row justify-content-start align-items-start">
          <img
            style={{ width: "25px" }}
            src={safariAddToHomeScreen}
            alt="..."
          />
          <span className="ms-2">
            2) پنجره‌ی باز شده را به بالا بکشید و این دکمه را بفشارید
          </span>
        </div>
      </div>
      {/* Gif */}
      <div className="mt-5">
        <ReactPlayer
          className="w-100 shadow"
          url={fileBaseUrl + "tutorials/pwa.mp4"}
          controls
        />
      </div>
    </section>
  );
};

export default IosInstallationGuide;
