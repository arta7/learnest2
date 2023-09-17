import React, { useState, useEffect } from "react";

import colors from "../../assets/styles/variables/_colors.module.scss";
import Logo from "../../assets/img/app-logo.png";

const ServerUpdate = () => {
  return (
    <section
      style={{ backgroundColor: colors?.["main-color-1"] ?? "#fff" }}
      className="w-100 h-100-vh flex-grow-1 d-flex flex-column justify-content-center align-items-center"
    >
      <img alt="..." src={Logo} style={{ maxWidth: "200px" }} />
      <h4 className="mt-3 text-white">درحال بروزرسانی ...</h4>
      <p className="mt-2 text-white">
        با عرض پوزش از صبر و شکیبایی شما سپاسگذاریم .
      </p>
    </section>
  );
};

export default ServerUpdate;
