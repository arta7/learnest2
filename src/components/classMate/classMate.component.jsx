import React, { useState, useEffect } from "react";
import { fileBaseUrl } from "../../core/services/baseUrl";

const ClassMate = ({
  className = "",
  inviteDate = "2022/09/20",
  name,
  phone,
  avatarUrl,
}) => {
  return (
    <div
      dir="rtl"
      style={{
        // border: "1px solid #ebebeb",
        boxShadow: "0px 13px 25px 0px #0000001F",
        background: "#fff",
      }}
      className={
        className +
        " box-rounded-1 m-0 p-0 d-flex flex-column justify-content-start align-items-stretch"
      }
    >
      <div className="m-0 p-0 d-flex flex-row justify-content-start align-items-stretch">
        <div className="m-0 p-2 d-flex flex-row justify-content-center align-items-center">
          <img
            src={fileBaseUrl + avatarUrl}
            alt="..."
            className=""
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
          <div className="m-0 p-2 d-flex flex-row justify-content-starti align-items-baseline">
            <span>{name}</span>
          </div>
          <div className=" text-muted m-0 p-2 d-flex flex-row justify-content-start align-items-baseline">
            <span className="text-muted">{phone}</span>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default ClassMate;
