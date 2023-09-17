import React, { useState, useEffect } from "react";
import {
  baseUrl,
  fileBaseUrl,
  imagesBaseUrl,
} from "../../core/services/baseUrl";
import { weekdaysEnum } from "../../core/enums";
import { useBuyCourseDispatch } from "../../core/contexts/buyCourseContext/buyCourseContext";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import * as actions from "../../core/contexts/buyCourseContext/actions";
import axios from "axios";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { apiCaller } from "../../core/custom-hooks/useApi";
import { buyCourse_apiCalls } from "../../core/services/agent";
import { toast } from "react-toastify";
/*
callerAvatarUrl
callerName
callerPhone
classRoomId
courseId
courseTitle
inviteDate
weekDays
*/
const Invitement = ({
  className = "",
  classRoomId,
  weekDays,
  callerName,
  callerPhone,
  callerAvatarUrl,
  inviteDate,
  inviteCode,
  courseId,
  startDateString,
  startDate,
  courseTitle,
  onRejected,
}) => {
  /////////
  const getCourseDetail = baseUrl + "/courses/details";
  const navigate = useNavigate();
  const {
    openLoading: isLoading,
    handleOpen,
    handleClose,
  } = useLoadingContext();

  /////////
  const handleAcceptInvitation = async () => {
    apiCaller({
      api: async () => {
        return axios.post(getCourseDetail + "?courseId=" + courseId);
      },
      onStart: handleOpen,
      onEnd: handleClose,
      onSuccess: (resp) => {
        navigate("/buyCourseFourthPage", {
          state: {
            invitementInfo: {
              classRoomId: classRoomId,
              courseId: courseId,
              inviteCode: inviteCode,
              priceInformation: resp?.data?.data?.priceInformation,
              startDate: startDate,
            },
          },
        });
      },
    });
  };
  /////////
  const handleRejectInvitement = () => {
    apiCaller({
      api: buyCourse_apiCalls.apiCall_rejectInvitement,
      apiArguments: {
        inviteCode: inviteCode,
        classRoomId: classRoomId,
      },
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onSuccess: (resp) => {
        if (resp?.status === 200 && parseInt(resp?.data?.status) === 1) {
          onRejected(inviteCode);
        } else if (parseInt(resp?.data?.status) === 0) {
          toast.error(resp?.data?.message);
        }
      },
      onError: () => {
        toast.error("رد کردن دعوتنامه با خطا مواجه شد .");
      },
    });
  };
  /////////
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
            src={fileBaseUrl + callerAvatarUrl}
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
          <div className="m-0 p-2 d-flex flex-row justify-content-between align-items-baseline">
            <span>{callerName}</span>
            <span className="fw-bold fs-5">{courseTitle}</span>
          </div>
          <span className="text-muted p-2">{callerPhone}</span>
        </div>
      </div>
      {/*  */}
      <div
        dir="rtl"
        className="m-0 p-2 d-flex flex-row justify-content-between align-items-center"
      >
        <div className="m-0 d-flex flex-row justify-content-start align-items-stretch">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptInvitation}
            className="py-2 "
          >
            قبول کردن
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRejectInvitement}
            className="py-2 ms-2"
          >
            رد کردن
          </Button>
        </div>
      </div>
      {/*  */}

      {/*  */}
      <div className=" m-0 p-2 d-flex flex-row justify-content-between align-items-baseline">
        <span>{`تاریخ دعوت : ${[inviteDate]}`}</span>
      </div>
      {/*  */}
      <span dir="rtl" className="p-2 pt-0">
        {" "}
        تاریخ شروع کلاس : {startDateString}
      </span>
      {/*  */}
    </div>
  );
};

export default Invitement;

/*
<div className=" text-muted m-0 p-2 d-flex flex-row justify-content-between align-items-baseline">
          <span className="text-muted">{callerPhone}</span>
          <span></span>
        </div>
*/
