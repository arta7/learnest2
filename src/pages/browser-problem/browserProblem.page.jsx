import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const BrowserProblem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  ///////
  useEffect(() => {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    if (isIos() && location.pathname === "/operating-system-error") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div
      dir="rtl"
      className="w-100 h-100-vh p-xxl-4 flex-grow-1 p-3 m-0 d-flex flex-column justify-content-center align-items-stretch"
    >
      <div className="align-self-center">
        <ReportProblemIcon color="error" sx={{ fontSize: "80px" }} />
      </div>
      <h1
        className="fs-5 fw-bold mt-4 text-justify"
        style={{
          lineHeight: "1.7",
        }}
      >
        برای استفاده از این وب اپلیکیشن باید از یکی از مرورگر های chrome و یا
        safari استفاده نمایید .
      </h1>
    </div>
  );
};

export default BrowserProblem;
