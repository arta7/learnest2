import React, { useState, useEffect, useRef } from "react";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../core/contexts/buyCourseContext/buyCourseContext";
import { useLoadingContext } from "../../../../core/contexts/loading/loading";
import * as actions from "../../../../core/contexts/buyCourseContext/actions";
import { Button, Dialog, IconButton } from "@mui/material";
import colors from "../../../../assets/styles/variables/_colors.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { buyCourse_apiCalls } from "../../../../core/services/agent";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { toast } from "react-toastify";
import { initialState } from "../../../../core/contexts/buyCourseContext/initialState";
import { useLocation, useNavigate } from "react-router";
import { formatNumber } from "../../../../core/utils/formatPrice";
import InfoIcon from "@mui/icons-material/Info";
import { CheckCircle } from "@mui/icons-material";
import { useFactor,useAuthenticationActions } from "./../../../../core/contexts/authentication/authenticationProvider";


const BuyCourseFourthPage = (props) => {
  const paymentGateLink_ref = useRef();
  const location = useLocation();
  const { factor, priceInformation } = useBuyCourseState();
  const { dispatchFactor, set_priceInformation } = useBuyCourseDispatch();
  const {
    handleOpen,
    handleClose,
    openLoading: isLoading,
  } = useLoadingContext();
  const [finalAmount, set_finalAmount] = useState();
  const navigate = useNavigate();
  const { handle_setFactor } = useAuthenticationActions()

  const handlRefferCodeChange = (e) => {
    const { value } = e.target;
    dispatchFactor({ type: actions.SET_REFERCODE, payload: value });

    // dispatchFactor({ type: actions.SETGIFTCODE, payload: value });
  };

  useEffect(() => {
    console.log(factor);
  }, [factor]);


   let runWindow=(amount,id)=>{
      window.ewano.onWebAppReady();
              // 
              //  navigate('/shippment')
              window.ewano.pay(amount*10,id, '')
              window.ewano.paymentResult = (status) => { 
                var factorId =   localStorage.getItem("factorId")
                console.log('factorId2 : > ',factorId)
                console.log('status2 : ',status)
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
    }

  //2
  useEffect(() => {
    dispatchFactor({ type: actions.SETISTEMP, payload: true });
    dispatchFactor({ type: actions.SETSTEP, payload: 3 });

    if (location.state?.invitementInfo) {
      console.log(location.state?.invitementInfo);
      set_priceInformation(location.state?.invitementInfo?.priceInformation);
      dispatchFactor({
        type: actions.SETCOURSEID,
        payload: location.state?.invitementInfo?.courseId,
      });
      dispatchFactor({
        type: actions.SETCLASSROOMID,
        payload: location.state?.invitementInfo?.classRoomId,
      });
      dispatchFactor({
        type: actions.SETINVITECODE,
        payload: location.state?.invitementInfo?.inviteCode,
      });
      dispatchFactor({
        type: "SETSTARTDATE",
        payload: location.state?.invitementInfo?.startDate,
      });

      const tempFactor = {
        step: 3,
        courseId: location.state?.invitementInfo?.courseId,
        giftCode: "",
        weekDays: 0,
        refferCode: "",
        isTemp: true,
        isWithTeacher: false,
        classRoomConfig: {
          startDate: location.state?.invitementInfo?.startDate,
          classRoomId: location.state?.invitementInfo?.classRoomId,
          useSystemSearch: true,
          device: "web",
          gender: 0,
          minAge: 0,
          maxAge: 0,
          inviteCode: location.state?.invitementInfo?.inviteCode,
        },
      };
      setTimeout(() => {
        checkoutFactor(true, tempFactor);
      }, 1000);
    } else {
      checkoutFactor(true);
    }

    return () => {
      dispatchFactor({ type: actions.SETINVITECODE, payload: "" });
      dispatchFactor({ type: actions.SET_REFERCODE, payload: "" });
      dispatchFactor({
        type: actions.SETCOURSEID,
        payload: 0,
      });
      dispatchFactor({
        type: actions.SETCLASSROOMID,
        payload: "",
      });
      dispatchFactor({
        type: "SETSTARTDATE",
        payload: "",
      });
      set_priceInformation(null);
    };
  }, [location.state]);

  const [refferCodeDiscount, setRefferCodeDiscount] = useState(null);
  const handleAddInviteCode = () => {
    if (factor?.refferCode) {
      if (factor?.refferCode == refferCodeDiscount?.code) return;
      dispatchFactor({ type: actions.SETISTEMP, payload: true });
      apiCaller({
        api: buyCourse_apiCalls.apiCall_checkoutRefferCode,
        apiArguments: factor.refferCode,
        toastMessage: true,
        onErrorMessage: "بررسی کد با خطا مواجه شد .",
        onSuccess: (resp) => {
          if (resp?.status == 200) {
            if (resp.data.status == 0) {
              toast.error("کد تخفیف نامعتبر است .");
              dispatchFactor({ type: actions.SET_REFERCODE, payload: "" });
              setRefferCodeDiscount(null);
            } else {
              setRefferCodeDiscount(resp.data.data);
            }
          }

          console.log(resp.data);
        },
      });
      checkoutFactor(true);
    }
  };

  const checkoutFactor = async (isTemp, tempFactor = null) => {
    const factorClone = JSON.parse(JSON.stringify(factor));
    console.log("factorClone : ", factorClone);
    factorClone.isTemp = isTemp;
    delete factorClone.step;

    console.log(factorClone);
    handleOpen();
    await apiCaller({
      api: buyCourse_apiCalls.apiCall_buycourseCheckout,
      apiArguments: tempFactor ? { ...tempFactor } : { ...factorClone },
      toastMessage: true,
      onErrorMessage: "خطا . لطفا دوباره تلاش کنید",
      onSuccess: (response) => {
        if (response.data?.data === null) {
          handleClose();
          toast.error(
            <div className="text-wrap">{response?.data?.message}</div>
          );
          return;
        }
        if (!response?.data?.data?.factorId) {
          handleClose();
        }
        set_finalAmount(response?.data?.data?.finalAmount);

        if (!factorClone.isTemp) {
          handle_setFactor(response?.data?.data?.factorId)
          localStorage.setItem("factorId", response?.data?.data?.factorId)
          // console.log('response?.data?.data?.factorId',response?.data?.data?.factorId)
          apiCaller({
            api: buyCourse_apiCalls.apiCall_paycoursefactor,
            apiArguments: response?.data?.data?.factorId,
            onError: (ex) => {
              // if (ex?.response?.data?.message) {
              //   toast.error(ex?.response?.data?.message);
              // }
              handleClose();
            },
            onSuccess: (resp) => {
              console.log('response buy',resp?.data?.data)
              runWindow(resp?.data?.data?.amount, resp?.data?.data?.id)
              // paymentGateLink_ref.current.href = resp.data.data;
              // paymentGateLink_ref.current.click();
            },
            onEnd: handleClose,
          });
        } else {
          handleClose();
        }
      },
      onError: (ex) => {
        // if (ex?.response?.data?.message) {
        //   toast.error(ex?.response?.data?.message);
        // }
        handleClose();
      },
    });
  };

  const handlePay = () => {
    dispatchFactor({ type: actions.SETISTEMP, payload: false });
    checkoutFactor(false);
  };

  // notif
  // const [hasNotif, set_hasNotif] = useState(false);
  // const handle_hasNotif_change = (e) => {
  //   set_hasNotif(!hasNotif);
  // };
  // useEffect(() => {
  //   dispatchFactor({ type: "SETHASNOTIF", payload: hasNotif ? true : false });
  // }, [hasNotif]);

  ///// SUPPORT : START
  const [showExplanationsDialog, set_showExplanationsDialog] = useState(false);
  const handleShowExplanationsDialog = () => {
    set_showExplanationsDialog(!showExplanationsDialog);
  };

  const [withSupport, set_withSupport] = useState(false);
  const handle_withSupport_change = (e) => {
    set_withSupport(!withSupport);
  };
  useEffect(() => {
    if (withSupport) {
      dispatchFactor({ type: "ISWITHTEACHER", payload: true });
    } else {
      dispatchFactor({ type: "ISWITHTEACHER", payload: false });
    }
  }, [withSupport]);
   ///// SUPPORT : end

  //// reffer code
  // const [refferCode, set_refferCode] = useState();
  // const handle_refferCode_change = (e) => {
  //   set_refferCode(e.target.value);
  // };
  // const handleSetInviteCode= ()=>{
  //   dispatchFactor({ type: "SET_REFFERCODE", payload: refferCode });
  // }
  ////isWithTeacher
  useEffect(() => {
    if (finalAmount) {
      checkoutFactor(true);
    }
  }, [factor.isWithTeacher]);
  ////////

  ////////
  return (
    <div className="m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <div
        style={{
          border: `3px solid ${colors["main-color-1"]}`,
          borderRadius: ".5625rem",
        }}
        className="m-0 my-4 p-2 d-flex flex-column justify-content-start align-items-stretch"
      >
        <div className="m-0 my-2 p-0 d-flex flex-row justify-content-between align-items-baseline">
          <span className="fs-6 fw-bold">قیمت دوره</span>
          <span className="fs-6 fw-bold">
            {priceInformation?.formattedPrice}
          </span>
        </div>
        <div className="m-0 my-2 p-0 d-flex flex-row justify-content-between align-items-baseline">
          <span className="fs-6 fw-bold">تخفیف این دوره</span>
          <span className="fs-6 fw-bold">
            {" "}
            %{priceInformation?.discount ? priceInformation?.discount : 0}
          </span>
        </div>
        <div className="m-0 my-2 p-0 d-flex flex-row justify-content-between align-items-baseline">
          <span className="fs-6 fw-bold">جمع کل </span>
          <span className="fs-6 fw-bold">
            {priceInformation?.formattedDiscountPrice}
          </span>
        </div>

        {/******** WITH SUPPORT ********/}

        {/* <div className="m-0 mt-2 p-0 d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row justify-content-start align-items-center">
            <label
              className="fs-6 fw-bold m-0 p-0 d-flex flex-row justify-content-start align-items-center"
              htmlFor="withSupport"
            >
              <input
                type="checkbox"
                onChange={handle_withSupport_change}
                checked={withSupport}
                id="withSupport"
                className="me-2"
              />
              با پشتیبان
            </label>

            <Dialog
              open={showExplanationsDialog}
              onClose={handleShowExplanationsDialog}
            >
              <div
                style={{ minWidth: "300px", minHeight: "200px" }}
                className="m-0 p-3 text-justify d-flex flex-column justify-content-start align-items-start"
              >
                در صورت گذراندن دوره ی مورد نظر " با پشتیبان " پس از ثبت نام ،
                در داخل گروهی در واتساپ متناسب با دوره ی ثبت نام شده اضافه
                خواهید شد و در آن گروه میتوانید تمام سوالات و ابهامات اموزشی
                خودتان را به صورت روزانه از پشتیبان آموزشی مجموعه بپرسید و
                همچنین نکات آموزشی پاسخ داده شده به سوالات سایر هم‌ لول های خود
                را نیز در آن گروه مشاهده نمایید.
              </div>
            </Dialog>
          </div>

          <div className="m-0 mt-1 text-muted p-0 d-flex flex-column justify-content-start align-items-start">
            هزینه پشتیبان : {priceInformation?.formattedTeacherPrice}
          </div>
        </div>
        <small className="text-muted fs-8 mt-1 ps-0 m-0 p-0">
          <InfoIcon
            color="primary"
            className="m-0 me-1"
            sx={{ fontSize: "18px" }}
          />
          برای خواندن توضیحات گزینه "با پشتیبان"
          <strong
            className="text-main-color-1 mx-1"
            onClick={handleShowExplanationsDialog}
          >
            اینجا
          </strong>
          را کلیک کنید.
        </small> */}

        {/******** WITH SUPPORT ********/}
        {/******** WITH NOTIFICATIONS ********/}
        {/* <div className="m-0 my-2 mt-3 p-0 d-flex flex-row justify-content-start align-items-start">
          <label
            className="fs-6 fw-bold m-0 p-0 d-flex flex-row justify-content-start align-items-center"
            htmlFor="hasNotif"
          >
            <input
              type="checkbox"
              onChange={handle_hasNotif_change}
              checked={hasNotif}
              id="hasNotif"
              className="me-2"
            />
            یادآوری روزهای کلاس
          </label>
        </div> */}
        {/******** WITH NOTIFICATIONS ********/}
        <div className="m-0 my-2 mt-3 p-0 d-flex flex-row justify-content-between align-items-stretch">
          <input
            style={{
              background: `${colors["input-background"]}`,
              border: "none",
              outline: "none",
              height: "50px",
            }}
            dir="rtl"
            placeholder="کد دعوت"
            className=" flex-grow-1 py-2 px-3 box-rounded-1 auth-input"
            id="inviteCode"
            type={"text"}
            onChange={handlRefferCodeChange}
            // value={factor?.giftCode || ""}
            value={factor?.refferCode || ""}
          />
          <Button
            onClick={handleAddInviteCode}
            color="primary"
            variant="contained"
            className="ms-2 box-rounded-1 "
            sx={{
              minWidth: "50px",
              width: "70px",
              height: "50px",
            }}
          >
            {/* <AddIcon /> */}
            اعمال
          </Button>
        </div>
        {refferCodeDiscount?.discountPercent ? (
          <>
            <div className="my-1 fs-7 text-success d-flex flex-row justify-content-start align-items-center">
              <CheckCircle color="success" />
              <div className="ms-2 d-flex flex-row justify-content-start align-items-baseline">
                <span className=" ">کد تخفیف معتبر است .</span>
              </div>
            </div>
            <div className="w-100 d-flex flex-row justify-content-between align-items-baseline fw-bold fs-6">
              <span>درصد تخفیف کد :</span>
              <span>{` ${refferCodeDiscount?.discountPercent}%`}</span>
            </div>
          </>
        ) : (
          <></>
        )}
        {/******** Reffer Code ********/}
        {/* <div className="m-0 my-2 mt-3 p-0 d-flex flex-row justify-content-between align-items-stretch">
          <input
            style={{
              background: `${colors["input-background"]}`,
              border: "none",
              outline: "none",
              height: "50px",
            }}
            dir="rtl"
            placeholder="کد معرف"
            className=" flex-grow-1 py-2 px-3 box-rounded-1 auth-input"
            id="refferCode"
            type={"text"}
            onChange={handle_refferCode_change}
            value={refferCode}
          />
          <Button
            onClick={handleSetInviteCode}
            color="primary"
            variant="contained"
            className="ms-2 box-rounded-1 "
            sx={{
              minWidth: "50px",
              width: "100px",
              height: "50px",
            }}
          >
            اعمال
          </Button>
        </div> */}
      </div>
      <div className="my-3 mt-4 mb-6 d-flex flex-column justify-content-start aign-items-start">
        <div className="">قیمت با مالیات بر ارزش افزوده</div>
        <div
          style={{
            background: `${colors["input-background"]}`,
            border: "none",
            outline: "none",
            height: "50px",
          }}
          dir="rtl"
          className="m-0 py-2 mt-1 px-3 fs-5 d-flex flex-row justify-content-center align-items-center box-rounded-1"
        >
          {` ${formatNumber(finalAmount)} تومان`}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
        }}
        className=" mx-auto py-3 d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          style={{
            width: "calc(100% - 2rem)",
          }}
          variant="contained"
          color="primary"
          className="py-2"
          onClick={handlePay}
        >
          پرداخت
        </Button>
      </div>
      <a className="d-none" id="paymentGateLink" ref={paymentGateLink_ref}></a>
    </div>
  );
};

export default BuyCourseFourthPage;
