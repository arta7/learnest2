import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const OperatingSystemProblem = () => {
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
      <h1>این نسخه از اپلیکیشن لرنست مختص سیستم عامل های IOS میباشد</h1>
      <h3 className="mt-3">
        نسخه اندروید را میتوانید از لینک زیر دانلود نمایید .
      </h3>
    </div>
  );
};

export default OperatingSystemProblem;
