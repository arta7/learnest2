import React, { useState, useEffect, useRef } from "react";
// import {
//   useBuyCourseState,
//   useBuyCourseDispatch,
// } from "../../../../core/contexts/buyCourseContext/buyCourseContext";
// import { useLoadingContext } from "../../../../core/contexts/loading/loading";
// import * as actions from "../../../../core/contexts/buyCourseContext/actions";
// import { Button, Dialog, IconButton } from "@mui/material";
// import colors from "../../../../assets/styles/variables/_colors.module.scss";
// import AddIcon from "@mui/icons-material/Add";
// import { buyCourse_apiCalls } from "../../../../core/services/agent";
// import { apiCaller } from "../../../../core/custom-hooks/useApi";
// import { toast } from "react-toastify";
// import { initialState } from "../../../../core/contexts/buyCourseContext/initialState";
// import { useLocation, useNavigate } from "react-router";
// import { formatNumber } from "../../../../core/utils/formatPrice";
// import InfoIcon from "@mui/icons-material/Info";
// import { CheckCircle } from "@mui/icons-material";
import { useFactor } from "./../../../../core/contexts/authentication/authenticationProvider";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { buyCourse_apiCalls } from "../../../../core/services/agent";
import { useLoadingContext } from "../../../../core/contexts/loading/loading";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const BuyCourceReturn = (props) => {
  const [Status, setStatus] = useState(false)
  // const { factorId } = useFactor();
  const navigate = useNavigate();
  const {
    handleOpen,
    handleClose,
    openLoading: isLoading,
  } = useLoadingContext();

  useEffect(() => {
    var factorId =   localStorage.getItem("factorId")
     console.log('factorId : > ',factorId)
    window.ewano.onWebAppReady();

    // apiCaller({
    //   api: buyCourse_apiCalls.apiCall_verifycoursefactor,
    //   apiArguments: factorId,
    //   onError: (ex) => {
    //     localStorage.removeItem("factorId");
    //     console.log('ex',ex)
    //     if (ex?.data?.message) {
    //       toast.error(ex?.data?.message);
    //     }

    //     handleClose();
    //   },
    //   onSuccess: (resp) => {
    //     setStatus(true)
    //     console.log('resp?.response?.data',resp?.data?.message)
    // toast.success(
    //   <div className="text-wrap">
    //     {resp?.data?.message}
    //   </div>
    // );
    // localStorage.removeItem("factorId");
    //     navigate('/allcourses')

    //   },
    //   onEnd: handleClose,
    // })

    window.ewano.paymentResult = (status) => {
      console.log('status : ', status)
      // alert('status : ', status)
      setStatus(status)
      if (status == true) {
        apiCaller({
          api: buyCourse_apiCalls.apiCall_verifycoursefactor,
          apiArguments: factorId,
          onError: (ex) => {
            localStorage.removeItem("factorId");
            console.log('ex',ex)
            if (ex?.data?.message) {
              toast.error(ex?.data?.message);
            }

            handleClose();
          },
          onSuccess: (resp) => {
            setStatus(true)
            console.log('resp?.response?.data',resp?.data?.message)
        toast.success(
          <div className="text-wrap">
            {resp?.data?.message}
          </div>
        );
        localStorage.removeItem("factorId");
            navigate('/allcourses')

          },
          onEnd: handleClose,
        })
      }
      else {
        toast.success(
          <div className="text-wrap">
            {"پرداخت شما  با مشکل مواجه شده در صورت نیاز به راهنمایی با پشتیانی تماس بگیرید."}
          </div>
        );
        navigate('/allcourses')

      }
      
    }



  }, [])

  ////////
  return (
    <div
      dir="rtl"
      className="w-100 h-100-vh p-xxl-4 flex-grow-1 p-3 m-0 d-flex flex-column justify-content-center align-items-stretch"
    >

      <h1
        className="fs-5 fw-bold mt-4 text-justify"
        style={{
          lineHeight: "1.7",
        }}
      >
       
      </h1>
    </div>
  );
};

export default BuyCourceReturn;
