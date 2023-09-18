// import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
// import { useNavigate, Link } from "react-router-dom";

// // CONTEXTS
// import {
//   useLoginContext,
//   useAuthenticationActions,
// } from "../../core/contexts/authentication/authenticationProvider";
// import { useLoadingContext } from "../../core/contexts/loading/loading";

// // FORMIK
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { TextInput } from "../../components/formik-input/formikInput";

// import { toast } from "react-toastify";
// import queryString from "query-string";
// import { FirstPageCarousel } from "../../components/carousel/carousel";

// // MUI
// import { Drawer, Button, Dialog, LinearProgress } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// // images
// /*
// 1 : دوره-های-متنوع
// 2 : تعیین-سطح-رایگان
// 3 : لایتنر-باکس
// */
// import sliderImg1 from "../../assets/img/sliders/intro/slider1.jpg";
// import sliderImg2 from "../../assets/img/sliders/intro/slider2.jpg";
// import sliderImg3 from "../../assets/img/sliders/intro/slider3.jpg";

// import "./styles/styles.css";

// import ReactCodeInput from "react-verification-code-input";
// import Countdown from "react-countdown";
// import { SiteRules } from "../../components/siteRules.component";
// import { autoReadSMS } from "../../core/utils/autoSmsReader";
// import { deleteCookie, getCookie } from "../../core/utils/cookie";
// import useInterval from "../../core/custom-hooks/useInterval.hook";
// import { authentication_apiCalls } from "../../core/services/agent";
// import { useCheckPlatform } from "../../core/appInit/wrappers/platformCodes";
// import { isIos, toEnglishDigit } from "../../core/utils/utils";
// import useRefreshToken from "../../core/custom-hooks/useRefreshToken";
// /// make mui styles for close button
// const useStyles = makeStyles({
//   root: {
//     "& .MuiPaper-root": {
//       maxWidth: "800px",
//       margin: "0 auto",
//       padding: "1rem",
//     },
//   },
// });

// const loginFormSchema = Yup.object().shape({
//   phoneNumber: Yup.string()
//     .required("پر کردن فیلد الزامیست")
//     .test(
//       "len",
//       "شماره وارد شده باید 11 رقم باشد",
//       (val) => val && val.toString().length === 11
//     ),
// });

// const SignupFormSchema = Yup.object().shape({
//   phoneNumber: Yup.string()
//     .required("پر کردن فیلد الزامیست")
//     .test(
//       "len",
//       "شماره وارد شده باید 11 رقم باشد",
//       (val) => val && val.toString().length === 11
//     ),
//   gender: Yup.string().required("پر کردن فیلد الزامیست"),
//   firstName: Yup.string()
//     .matches(/^[\u0600-\u06FF\s]+$/, "نام فارسی وارد کنید .")
//     .required("لطفا نام را وارد کنید"),
//   lastName: Yup.string()
//     .matches(/^[\u0600-\u06FF\s]+$/, "نام خانوادگی فارسی وارد کنید .")
//     .required("لطفا نام خانوادگی را وارد کنید"),
// });

// function Register() {
//   // DRAWERS STYLE
//   const classes = useStyles();
//   const [phoneNum, set_phoneNum] = useState("");
//   // LOADING METHODS
//   const { handleClose, handleOpen } = useLoadingContext();

//   // HISTORY NAVIGATION METHOD
//   const navigate = useNavigate();
//   let btnRef = useRef(null);

//   // AUTHENTICATION FUNCTIONS
//   const { login, register, verify } = useAuthenticationActions();

//   /////==============================////////////
//   ///////////   LOGIN CODES : START   ///////////
//   /////==============================////////////

//   const [show_loginDrawer, set__show_loginDrawer] = useState(false);
//   const toggle_loginDrawer = () => {
//     // if (!isPending)
//     set__show_loginDrawer(!show_loginDrawer);
//   };
//   const handleSubmit_login = async (values) => {
//     //start loading
//     handleOpen();

//     // login(phoneNum);
//     // authentication_apiCalls.apiCall_login(values.phoneNumber);
//     // await login(phoneNum)
//     //   .then((res) => res.json())
//     //   .then((data) => {
//     //     alert(9);
//     //     if (parseInt(data.status) === 0) {
//     //       toast.error(data.message);
//     //       handleClose();
//     //       return;
//     //     } else {
//     //       set_phoneNum(values.phoneNumber);
//     //       localStorage.setItem("tempPH", values.phoneNumber);
//     //       toast.success(data.message);
//     //       set_compeleted(false);
//     //       toggle_loginDrawer();
//     //       toggle_verifyDrawer();
//     //     }
//     //   })
//     //   .catch((ex) => {
//     //     btnRef.current.removeAttribute("disabled");
//     //     // toast.error("ارسال پیامک با خطا مواجه شد");
//     //     if (ex?.message) {
//     //       toast.error(ex?.message);
//     //     }
//     //     // alert(JSON.stringify(ex));
//     //     alert(JSON.stringify(ex));

//     //     if (ex?.response?.data?.message) {
//     //       toast.error(ex?.response?.data?.message);
//     //     }
//     //     return null;
//     //   });

//     //call api login
//     await login(toEnglishDigit(values.phoneNumber))
//       .then((resp) => {
//         if (resp.status === 200) {
//           if (parseInt(resp.data.status) === 0) {
//             toast.error(resp.data.message);
//             handleClose();
//             return;
//           } else {
//             set_phoneNum(toEnglishDigit(values.phoneNumber));
//             localStorage.setItem("tempPH", toEnglishDigit(values.phoneNumber));
//             toast.success(resp.data.message);
//             set_compeleted(false);
//             toggle_loginDrawer();
//             toggle_verifyDrawer();
//           }
//         } else {
//           if (resp?.data?.message) {
//             toast.error(resp?.data?.message);
//           }
//           // toast.error("ارسال پیامک با خطا مواجه شد");
//         }
//         return resp;
//       })
//       .catch((ex) => {
//         console.log(ex);
//         btnRef.current.removeAttribute("disabled");
//         // toast.error("ارسال پیامک با خطا مواجه شد");
//         if (ex?.message) {
//           toast.error(ex?.message);
//         }
//         // alert(JSON.stringify(ex));
//         // alert(JSON.stringify(ex));

//         if (ex?.response?.data?.message) {
//           toast.error(ex?.response?.data?.message);
//         }
//         return null;
//       });

//     //end loading
//     handleClose();
//   };

//   /////==============================////////////
//   ///////////   LOGIN CODES : END   /////////////
//   /////==============================////////////

//   /////==============================////////////
//   ///////////   SIGNUP CODES : START  ///////////
//   /////==============================////////////

//   //// rules acception codes
//   const [rulesAcceptedByUser, set_rulesAcceptedByUser] = useState(false);
//   const handle_rulesAcceptedByUser = () => {
//     set_rulesAcceptedByUser(!rulesAcceptedByUser);
//   };

//   const [openRulesModal, set_openRulesModal] = useState(false);
//   const handleToggleRulesDialog = () => {
//     set_openRulesModal(!openRulesModal);
//   };

//   const [show_signupDrawer, set__show_signupDrawer] = useState(false);
//   const [gender, set_gender] = useState(0);
//   const toggle_signupDrawer = () => {
//     set__show_signupDrawer(!show_signupDrawer);
//   };

//   const handleSubmit_signup = async (values) => {
//     // check rulesAcceptedByUser
//     if (!rulesAcceptedByUser) {
//       toast.warn(
//         <div className="text-wrap">
//           کاربر گرامی
//           <br />
//           برای ثبت نام در اپلیکیشن لرنست می بایست قوانین و مقررات را بپذیرید .
//         </div>,
//         { autoClose: "10000" }
//       );
//       return;
//     }

//     //start loading
//     handleOpen();

//     //call api login
//     await register({
//       phoneNumber: toEnglishDigit(values.phoneNumber),
//       firstName: values.firstName,
//       lastName: values.lastName,
//       gender: gender,
//     })
//       .then((resp) => {
//         if (resp.status === 200 && resp.data.status !== "0") {
//           set_phoneNum(toEnglishDigit(values.phoneNumber));
//           toast.success(
//             <div className="text-wrap">
//               ثبت نام با موفقیت انجام شد .{resp.data?.message}
//             </div>
//           );

//           setTimeout(() => {
//             toggle_signupDrawer();
//             set_compeleted(false);
//             toggle_verifyDrawer();
//             // navigate.push(`/verify/${values.phoneNumber}`);
//           }, 1000);
//         } else {
//           toast.error(<div className="">{resp.data?.message}</div>);
//         }
//         return resp;
//       })
//       .catch((ex) => {
//         toast.error("ثبت نام با خطا مواجه شد");
//         return null;
//       });

//     //end loading
//     handleClose();
//   };

//   const handle_genderChange = (e) => {
//     if (e.target.id === "male") {
//       set_gender(1);
//     }
//     if (e.target.id === "female") {
//       set_gender(0);
//     }
//   };
//   /////==============================////////////
//   ///////////   SIGNUP CODES : END  /////////////
//   ////======================================/////

//   /////==============================////////////
//   ///////////   VERIFY CODES : START   //////////
//   /////==============================////////////
//   const { refreshToken } = useRefreshToken();
//   const [show_veifyDrawer, set__show_veifyDrawer] = useState(false);
//   const [verifyCode, setVerifyCode] = useState("");
//   const { handle_setToken } = useAuthenticationActions();
//   const [compeleted, set_compeleted] = useState();
//   const countdownRef = useRef();

//   const toggle_verifyDrawer = () => {
//     if (show_veifyDrawer) {
//       set_compeleted(true);
//     }
//     set__show_veifyDrawer(!show_veifyDrawer);
//   };

//   const handleResendCode = async () => {
//     //start loading
//     handleOpen();

//     //call api login
//     await login(phoneNum)
//       .then((resp) => {
//         if (resp.status === 200) {
//           if (parseInt(resp.data.status) === 0) {
//             toast.error(resp.data.message);
//             handleClose();
//             return;
//           } else {
//             if (resp?.data?.message) {
//               toast.error(resp?.data?.message);
//             }
//             set_compeleted(false);
//           }
//         } else {
//           if (resp?.data?.message) {
//             toast.error(resp?.data?.message);
//           }
//         }
//         return resp;
//       })
//       .catch((ex) => {
//         // toast.error("ارسال پیامک با خطا مواجه شد");
//         if (ex?.response?.data?.message) {
//           toast.error(ex?.resp?.data?.message);
//         }
//         return null;
//       });

//     //end loading
//     handleClose();
//   };

//   const handleSubmit_verify = async (e) => {
//     e.preventDefault();
//     //start loading
//     handleOpen();

//     //call api login
//     await verify(verifyCode, phoneNum)
//       .then((resp) => {
//         if (resp.status === 200) {
//           if (parseInt(resp.data.status) !== 0) {
//             toast.success("به لرنست خوش آمدید .");
//             handle_setToken(resp.data?.data?.token);
//             refreshToken();
//             navigate("/", { replace: true });
//           } else {
//             // toast.error("کد وارد شده اشتباه میباشد .");
//             if (resp?.data?.message) {
//               toast.error(resp?.data?.message);
//             }
//           }
//         } else {
//           toast.error("ورود به حساب با خطا مواجه شد");
//         }
//       })
//       .catch((ex) => {
//         console.log(ex);
//         // btnRef.current.removeAttribute("disabled");
//         toast.error("ورود به حساب با خطا مواجه شد");
//         return null;
//       });

//     //end loading
//     handleClose();
//   };

//   const renderer = ({ hours, minutes, seconds, completed, ...rest }) => {
//     if (completed) {
//       return <></>;
//     } else {
//       // Render a countdown
//       return (
//         <span className="m-0 my-3 p-0 fs-6 fw-bold align-self-center">
//           {(minutes < 10 ? "0" + minutes : minutes) +
//             ":" +
//             (seconds < 10 ? "0" + seconds : seconds)}
//         </span>
//       );
//     }
//   };

//   const handleCountDownCompeleted = () => {
//     // setVerifyCode("");
//     // toggle_verifyDrawer();
//     // toggle_loginDrawer();
//     set_compeleted(true);
//   };

//   const renderCountDownWithMemo = useMemo(
//     () => (
//       <Countdown
//         onComplete={handleCountDownCompeleted}
//         ref={countdownRef}
//         date={Date.now() + 120000}
//         renderer={renderer}
//       />
//     ),
//     [compeleted]
//   );

//   const handleChange = (e) => {
//     setVerifyCode(toEnglishDigit(e));
//     // localStorage.setItem("vcode", e);
//   };
//   /////==============================/////////////
//   ///////////   VERIFY CODES : END   /////////////
//   ///=====================================////////

//   const { stopCounter } = useInterval({
//     period: 1000,
//     intervalCallback: () => {
//       if (getCookie("temp-otp-code")) {
//         stopCounter();
//         setVerifyCode(getCookie("temp-otp-code"));
//         verifyWithOtp(getCookie("temp-otp-code"));
//       }
//     },
//     onSecondsChangeCallback: (s) => {
//       // console.log(s);
//       // if (s === 15) {
//       //   stopCounter();
//       // }
//     },
//   });

//   const verifyWithOtp = async (code, phoneNumber) => {
//     handleOpen();
//     //call api login

//     await verify(code, localStorage.getItem("tempPH"))
//       .then((resp) => {
//         if (resp.status === 200) {
//           if (parseInt(resp.data.status) !== 0) {
//             toast.success("به لرنست خوش آمدید .");
//             handle_setToken(resp.data?.data?.token);
//             localStorage.removeItem("tempPH");
//             if (getCookie("temp-otp-code")) {
//               deleteCookie("temp-otp-code");
//             }
//             navigate("/", { replace: true });
//           } else {
//             toast.error("کد وارد شده اشتباه میباشد .");
//           }
//         } else {
//           toast.error("ورود به حساب با خطا مواجه شد");
//         }
//       })
//       .catch((ex) => {
//         // console.log(ex);
//         // btnRef.current.removeAttribute("disabled");
//         toast.error("ورود به حساب با خطا مواجه شد");
//         return null;
//       });

//     //end loading
//     handleClose();
//   };

//   useEffect(() => {
//     // if (process.env.PLATFORM_MODE !== "IOS") {
//     if ("OTPCredential" in window) {
//       const ac = new AbortController();
//       navigator.credentials
//         .get({
//           otp: { transport: ["sms"] },
//           signal: ac.signal,
//         })
//         .then((otp) => {
//           // this.setState({ otp: otp.code });
//           // alert(otp.code);
//           setVerifyCode(otp.code);
//           verifyWithOtp(otp.code, phoneNum);
//           ac.abort();
//         })
//         .catch((err) => {
//           ac.abort();
//           console.log(err);
//         });
//     }

//     // }
//   }, []);

//   ////////////// PLATFORM CODES

//   //////////////
//   // const [progressTimePassed, setProgressTimePassed] = useState(0);
//   // const progressInterval = useRef(null);
//   // const startProgress = () => {
//   //   progressInterval.current = setInterval(() => {
//   //     setProgressTimePassed((prevState) => prevState + 40);
//   //     if (progressTimePassed >= 4000) {
//   //       stopProgress();
//   //     }
//   //   }, 40);
//   // };
//   // const stopProgress = () => clearInterval(progressInterval.current);
//   // useEffect(() => {
//   //   startProgress();
//   //   return () => {
//   //     stopProgress();
//   //   };
//   // }, []);
//   ///////
//   // const { allowStayInApp, isPending } = useCheckPlatform({ delay: 5000 });

//   // useEffect(() => {
//   //   if (allowStayInApp === false && isPending === false) {
//   //     window.location.replace("https://learnest.app");
//   //   }
//   // }, [allowStayInApp, isPending]);
//   //////////////
//   //////////////

//   return (
//     <div
//       dir="rtl"
//       className="w-100 h-100-vh p-xxl-4 flex-grow-1 p-3 m-0 d-flex flex-column justify-content-start align-items-stretch"
//     >
//       <section className="m-0 mt-3 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
//         {useMemo(
//           () => (
//             <FirstPageCarousel
//               list={[
//                 { id: 0, src: sliderImg1, alt: "دوره-های-متنوع" },
//                 { id: 1, src: sliderImg2, alt: "تعیین-سطح-رایگان" },
//                 { id: 2, src: sliderImg3, alt: "لایتنر-باکس" },
//               ]}
//             />
//           ),
//           []
//         )}
//         {/* {isPending && (
//           <p className="my-3 text-center">
//             <LinearProgress
//               variant="determinate"
//               value={progressTimePassed / 40}
//             />
//             <div className="mt-2">لطفا چند لحظه صبر کنید ...</div>
//           </p>
//         )} */}
//         <div
//           style={{
//             position: "fixed",
//             bottom: "0",
//             right: "0",
//             left: "0",
//             margin: "0 auto",
//             width: "100%",
//             maxWidth: "800px",
//             backgroundColor: "#fff",
//           }}
//           className="p-3 "
//         >
//           <Button
//             onClick={toggle_loginDrawer}
//             color="primary"
//             variant="contained"
//             className="w-100 py-2"
//             // disabled={isPending === true || !allowStayInApp}
//           >
//             شروع
//           </Button>
//         </div>
//         {/*=============== signup drawer =============*/}
//         <Drawer
//           classes={classes}
//           anchor={"bottom"}
//           open={show_signupDrawer}
//           onClose={toggle_signupDrawer}
//         >
//           <Formik
//             initialValues={{
//               phoneNumber: "",
//               firstName: "",
//               lastName: "",
//               gender: 0,
//             }}
//             validationSchema={SignupFormSchema}
//             onSubmit={handleSubmit_signup}
//           >
//             <Form className="d-flex flex-column justify-content-center align-items-stretch">
//               <h1 className="fs-4 fw-bold text-center my-3 mt-2">ثبت نام</h1>
//               <TextInput
//                 focus={true}
//                 // onKeyPress={(e) => {
//                 //   if (e.which < 48 || e.which > 57) {
//                 //     e.preventDefault();
//                 //   }
//                 // }}
//                 dir="rtl"
//                 maxLength="11"
//                 placeholder="0911 111 1111"
//                 autocomplete="off"
//                 type="tel"
//                 inputclassname="box-rounded-1 auth-input "
//                 name="phoneNumber"
//                 id="phoneNumber"
//               />

//               <TextInput
//                 inputclassname="box-rounded-1 auth-input"
//                 placeholder="نام"
//                 name="firstName"
//                 id="firstName"
//               />

//               <TextInput
//                 inputclassname="box-rounded-1 auth-input"
//                 placeholder="نام خانوادگی"
//                 name="lastName"
//                 id="lastName"
//               />

//               <label
//                 dir="rtl"
//                 className=" m-0 mt-3 p-0 d-flex flex-row justify-content-start align-items-center"
//               >
//                 <span className="m-0 p-0 fs-6 fw-bold">جنسیت</span>
//               </label>
//               <div
//                 dir="rtl"
//                 className="m-0 mt-2 p-0 d-flex flex-row justify-content-start align-items-center"
//               >
//                 <label
//                   htmlFor="male"
//                   className="m-0 p-0 d-flex flex-row justify-content-start align-items-center"
//                 >
//                   <input
//                     onChange={handle_genderChange}
//                     type={"radio"}
//                     id="male"
//                     name="gender"
//                     defaultChecked
//                   />
//                   <span className="ms-1 ">مرد</span>
//                 </label>
//                 <label
//                   htmlFor="female"
//                   className="m-0 ms-2 p-0 d-flex flex-row justify-content-start align-items-center"
//                 >
//                   <input
//                     onChange={handle_genderChange}
//                     type={"radio"}
//                     id="female"
//                     name="gender"
//                   />
//                   <span className="ms-1 ">زن</span>
//                 </label>
//               </div>
//               <div className="accept-rules-box m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-center">
//                 <input
//                   checked={rulesAcceptedByUser}
//                   onChange={handle_rulesAcceptedByUser}
//                   type="checkbox"
//                 />
//                 <div
//                   style={{ textDecoration: "underline" }}
//                   onClick={handleToggleRulesDialog}
//                   className="cursor-pointer ms-1 link-hover-effect"
//                 >
//                   قوانین و مقررات را می‌ پذیرم .
//                 </div>
//                 <Dialog open={openRulesModal} onClose={handleToggleRulesDialog}>
//                   <div className="p-3">
//                     <SiteRules className="p-3" />
//                   </div>
//                 </Dialog>
//               </div>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 ref={btnRef}
//                 className="m-0  mt-4 py-2"
//               >
//                 ثبت نام
//               </Button>

//               <div className=" my-2 d-flex flex-row justify-content-center align-items-center">
//                 <div
//                   onClick={() => {
//                     toggle_signupDrawer();
//                     toggle_loginDrawer();
//                   }}
//                   className="fs-6 fw-bold cursor-pointer"
//                 >
//                   ورود
//                 </div>
//               </div>
//             </Form>
//           </Formik>
//         </Drawer>
//         {/*============== login drawer ===============*/}
//         <Drawer
//           classes={classes}
//           anchor={"bottom"}
//           open={show_loginDrawer}
//           onClose={toggle_loginDrawer}
//         >
//           <Formik
//             initialValues={{
//               phoneNumber: "",
//             }}
//             validationSchema={loginFormSchema}
//             onSubmit={handleSubmit_login}
//           >
//             <Form className="d-flex flex-column justify-content-center align-items-stretch">
//               <h1 className="fs-4 fw-bold text-center my-3 mt-2">ورود</h1>

//               <TextInput
//                 focus={true}
//                 // onKeyPress={(e) => {
//                 //   if (e.which < 48 || e.which > 57) {
//                 //     e.preventDefault();
//                 //   }
//                 // }}
//                 dir="ltr"
//                 maxLength="11"
//                 placeholder="0911 111 1111"
//                 autocomplete="off"
//                 type="tel"
//                 inputclassname="box-rounded-1 auth-input"
//                 name="phoneNumber"
//                 id="phoneNumber"
//               />

//               <Button
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 ref={btnRef}
//                 className="m-0 py-2 mt-4 "
//               >
//                 ورود
//               </Button>
//               <div className="  my-2 d-flex flex-row justify-content-center align-items-center">
//                 <div
//                   onClick={() => {
//                     toggle_loginDrawer();
//                     toggle_signupDrawer();
//                   }}
//                   className="fs-6 fw-bold cursor-pointer"
//                 >
//                   ثبت نام
//                 </div>
//               </div>
//             </Form>
//           </Formik>
//         </Drawer>
//         {/*============== verify drawer ==============*/}
//         <Drawer
//           classes={classes}
//           anchor={"bottom"}
//           open={show_veifyDrawer}
//           onClose={toggle_verifyDrawer}
//         >
//           {/* <form>
//             <input
//               type="text"
//               autocomplete="one-time-code"
//               inputmode="numeric"
//               name="verify"
//               className="w-100 verify-code direction-ltr error"
//               maxlength="4"
//               size="4"
//               min="0"
//               max="9"
//               pattern="[0-9]{4}"
//               placeholder="______"
//             />
//           </form> */}
//           <form
//             dir="ltr"
//             onSubmit={handleSubmit_verify}
//             className="d-flex flex-column justify-content-center align-items-stretch"
//           >
//             <ReactCodeInput
//               title="کد تایید را وارد کنید"
//               fieldWidth="23%"
//               className="w-100 "
//               // value={verifyCode}
//               values={verifyCode.toString() ? verifyCode.toString() : ""}
//               onChange={handleChange}
//               // onComplete={e => {
//               //   handleSubmitForm(e);
//               // }}
//               type="tel"
//               fields={4}
//             />
//             {!compeleted && (
//               <>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   className="m-0 px-3 py-2 mt-4 mb-1 input-button-box-height box-rounded-1"
//                 >
//                   ارسال
//                 </Button>
//               </>
//             )}
//             {compeleted && (
//               <>
//                 <Button
//                   onClick={handleResendCode}
//                   variant="contained"
//                   color="primary"
//                   type="button"
//                   className="m-0 px-3 py-2 mt-4 mb-1 input-button-box-height box-rounded-1 "
//                 >
//                   ارسال مجدد کد
//                 </Button>
//               </>
//             )}
//             {!compeleted && renderCountDownWithMemo}
//             <div className=" my-2 d-flex flex-row justify-content-center align-items-center">
//               <div
//                 onClick={() => {
//                   toggle_verifyDrawer();
//                   toggle_loginDrawer();
//                 }}
//                 className="fs-6 fw-bold cursor-pointer"
//               >
//                 تغییر شماره
//               </div>
//             </div>
//           </form>
//         </Drawer>
//       </section>
//     </div>
//   );
// }

// export default Register;


import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

// CONTEXTS
import {
  useLoginContext,
  useAuthenticationActions,
} from "../../core/contexts/authentication/authenticationProvider";
import { useLoadingContext } from "../../core/contexts/loading/loading";

// FORMIK
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../components/formik-input/formikInput";

import { toast } from "react-toastify";
import queryString from "query-string";
import { FirstPageCarousel } from "../../components/carousel/carousel";



// MUI
import { Drawer, Button, Dialog } from "@mui/material";
import { makeStyles } from "@mui/styles";

// images
/*
1 : دوره-های-متنوع
2 : تعیین-سطح-رایگان
3 : لایتنر-باکس
*/
import sliderImg1 from "../../assets/img/sliders/intro/slider1.jpg";
import sliderImg2 from "../../assets/img/sliders/intro/slider2.jpg";
import sliderImg3 from "../../assets/img/sliders/intro/slider3.jpg";

import "./styles/styles.css";

import ReactCodeInput from "react-verification-code-input";
import Countdown from "react-countdown";
import { SiteRules } from "../../components/siteRules.component";
import { autoReadSMS } from "../../core/utils/autoSmsReader";
/// make mui styles for close button
const useStyles = makeStyles({
  root: {
    "& .MuiPaper-root": {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "1rem",
    },
  },
});

const loginFormSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .test(
      "len",
      "شماره وارد شده باید 11 رقم باشد",
      (val) => val && val.toString().length === 11
    ),
});
const loginFormSchemaEmail = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
});

const SignupFormSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .test(
      "len",
      "شماره وارد شده باید 11 رقم باشد",
      (val) => val && val.toString().length === 11
    ),
  gender: Yup.string().required("پر کردن فیلد الزامیست"),
  firstName: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام فارسی وارد کنید .")
    .required("لطفا نام را وارد کنید"),
  lastName: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام خانوادگی فارسی وارد کنید .")
    .required("لطفا نام خانوادگی را وارد کنید"),
});

const SignupFormSchemaEmail = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست"),
  gender: Yup.string().required("پر کردن فیلد الزامیست"),
  firstName: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام فارسی وارد کنید .")
    .required("لطفا نام را وارد کنید"),
  lastName: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام خانوادگی فارسی وارد کنید .")
    .required("لطفا نام خانوادگی را وارد کنید"),
});

function Register() {
  // DRAWERS STYLE
  const classes = useStyles();
  const [phoneNum, set_phoneNum] = useState("");
  const[currentuuid,setcurrentuuid] = useState('')
  // LOADING METHODS
  const { handleClose, handleOpen } = useLoadingContext();

  // HISTORY NAVIGATION METHOD
  const navigate = useNavigate();
  let btnRef = useRef(null);

  const PhoneNumberRef = useRef(null);

  // AUTHENTICATION FUNCTIONS
  const { login, register, verify,loginevano } = useAuthenticationActions();

  /////==============================////////////
  ///////////   LOGIN CODES : START   ///////////
  /////==============================////////////

  const [show_loginDrawer, set__show_loginDrawer] = useState(false);
  const toggle_loginDrawer = () => {
    set__show_loginDrawer(!show_loginDrawer);
  };
  const handleSubmit_login = async (values) => {
    //start loading
    handleOpen();

    //call api login
    await login(values.phoneNumber,!emailAcceptUser)
      .then((resp) => {
        if (resp.status === 200) {
          if (parseInt(resp.data.status) === 0) {
            toast.error(resp.data.message);
            handleClose();
            return;
          } else {
            // autoReadSMS((vvcode) => {
            //   alert(vvcode);
            // });
            set_phoneNum(values.phoneNumber);

            if(emailAcceptUser)
            {
              toast.success(
                <div className="text-wrap">
                {"کد ارسال شده به ایمیل را وارد کنید،لطفا پوشه هرزنامه(Spam) را هم چک کنید."}
                </div>
                );
            }
            else
            toast.success(resp.data.message);
            set_compeleted(false);
            toggle_loginDrawer();
            toggle_verifyDrawer();
          }
        } else {
          toast.error("ارسال پیامک با خطا مواجه شد");
        }
        return resp;
      })
      .catch((ex) => {
        console.log(ex);
        btnRef.current.removeAttribute("disabled");
        toast.error("ارسال پیامک با خطا مواجه شد");
        return null;
      });

    //end loading
    handleClose();
  };


  useEffect(()=>{
    window.ewano.onWebAppReady();


     var myOldUrl = window.location.href;
     console.log('term 1 : ',myOldUrl)
    if(myOldUrl.split('id=').length>1)
    {
    setcurrentuuid(myOldUrl.split('id=')[1])
    }

  //    window.addEventListener('load', function(){

  //  console.log('term1 : ',myOldUrl)
  //      // window.history.pushState({}, null, myOldUrl);
  //    });
   

 },[])


  /////==============================////////////
  ///////////   LOGIN CODES : END   /////////////
  /////==============================////////////

  /////==============================////////////
  ///////////   SIGNUP CODES : START  ///////////
  /////==============================////////////

  //// rules acception codes
  const [rulesAcceptedByUser, set_rulesAcceptedByUser] = useState(false);

  const [emailAcceptUser, set_emailAcceptUser] = useState(false);
  const handle_rulesAcceptedByUser = () => {
    set_rulesAcceptedByUser(!rulesAcceptedByUser);
  };

  const [openRulesModal, set_openRulesModal] = useState(false);
  const handleToggleRulesDialog = () => {
    set_openRulesModal(!openRulesModal);
  };

  const [show_signupDrawer, set__show_signupDrawer] = useState(false);
  const [gender, set_gender] = useState(0);
  const toggle_signupDrawer = () => {
    set__show_signupDrawer(!show_signupDrawer);
  };

  const handleSubmit_signup = async (values) => {
    // check rulesAcceptedByUser
    if (!rulesAcceptedByUser) {
      toast.warn(
        <div className="text-wrap">
          کاربر گرامی
          <br />
          برای ثبت نام در اپلیکیشن لرنست می بایست قوانین و مقررات را بپذیرید .
        </div>,
        { autoClose: "10000" }
      );
      return;
    }

    //start loading
    handleOpen();

    //call api login
    await register({
      phoneNumber: values.phoneNumber,
      firstName: values.firstName,
      lastName: values.lastName,
      IsPhone:!emailAcceptUser,
      gender: gender,
    })
      .then((resp) => {
        if (resp.status === 200 && resp.data.status !== "0") {
          set_phoneNum(values.phoneNumber);
          if(emailAcceptUser)
            {
              toast.success(
                <div className="text-wrap">
              ثبت نام با موفقیت انجام شد .{ "کد ارسال شده به ایمیل را وارد کنید،لطفا پوشه هرزنامه(Spam) را هم چک کنید."}
            </div>
               );
            }
            else
          toast.success(
            <div className="text-wrap">
              ثبت نام با موفقیت انجام شد .{resp.data?.message}
            </div>
          );

          setTimeout(() => {
            toggle_signupDrawer();
            set_compeleted(false);
            toggle_verifyDrawer();
            // navigate.push(`/verify/${values.phoneNumber}`);
          }, 1000);
        } else {
          toast.error(<div className="">{resp.data?.message}</div>);
        }
        return resp;
      })
      .catch((ex) => {
        toast.error("ثبت نام با خطا مواجه شد");
        return null;
      });

    //end loading
    handleClose();
  };

  const handle_genderChange = (e) => {
    if (e.target.id === "male") {
      set_gender(1);
    }
    if (e.target.id === "female") {
      set_gender(0);
    }
  };
  /////==============================////////////
  ///////////   SIGNUP CODES : END  /////////////
  ////======================================/////

  /////==============================////////////
  ///////////   VERIFY CODES : START   //////////
  /////==============================////////////

  const [show_veifyDrawer, set__show_veifyDrawer] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const { handle_setToken } = useAuthenticationActions();
  const [compeleted, set_compeleted] = useState();
  const countdownRef = useRef();

  const toggle_verifyDrawer = () => {
    if (show_veifyDrawer) {
      set_compeleted(true);
    }
    set__show_veifyDrawer(!show_veifyDrawer);
  };

  

  const handleResendCode = async () => {
    //start loading
    handleOpen();

    //call api login
    await login(phoneNum,!emailAcceptUser)
      .then((resp) => {
        if (resp.status === 200) {
          if (parseInt(resp.data.status) === 0) {
            toast.error(resp.data.message);
            handleClose();
            return;
          } else {
            // autoReadSMS((vvcode) => {
            //   alert(vvcode);
            // });
           
            toast.success(resp.data.message );
            set_compeleted(false);
          }
        } else {
          toast.error("ارسال پیامک با خطا مواجه شد");
        }
        return resp;
      })
      .catch((ex) => {
        toast.error("ارسال پیامک با خطا مواجه شد");
        return null;
      });

    //end loading
    handleClose();
  };

  const handleSubmit_verify = async (e) => {
    e.preventDefault();
    //start loading
    handleOpen();

    //call api login
    await verify(verifyCode, phoneNum,!emailAcceptUser)
      .then((resp) => {
        if (resp.status === 200) {
          if (parseInt(resp.data.status) !== 0) {
            toast.success("به لرنست خوش آمدید .");
            handle_setToken(resp.data?.data?.token);
            navigate("/", { replace: true });
          } else {
            toast.error("کد وارد شده اشتباه میباشد .");
          }
        } else {
          toast.error("ورود به حساب با خطا مواجه شد");
        }
      })
      .catch((ex) => {
        console.log(ex);
        // btnRef.current.removeAttribute("disabled");
        toast.error("ورود به حساب با خطا مواجه شد");
        return null;
      });

    //end loading
    handleClose();
  };


  const handleSubmit_loginEvano = async (e) => {

    //start loading
    handleOpen();

    //call api login
    await loginevano(currentuuid)
      .then((resp) => {
        if (resp.status === 200) {
          
          if (resp.data?.data != null) {
            toast.success("به لرنست خوش آمدید .");
            handle_setToken(resp.data?.data?.token);
            
            navigate("/", { replace: true });
            console.log('Login :',resp)
          } else {
            toast.error(resp.data.message);
            console.log('Login :',resp)

          }
        } else {
          toast.error("ورود به حساب با خطا مواجه شد");
        }

        return resp;

      })
      .catch((ex) => {
        console.log(ex);
        // btnRef.current.removeAttribute("disabled");
        toast.error("ورود به حساب با خطا مواجه شد");
        return null;
      });

    //end loading
    handleClose();
  };

  const renderer = ({ hours, minutes, seconds, completed, ...rest }) => {
    if (completed) {
      return <></>;
    } else {
      // Render a countdown
      return (
        <span className="m-0 my-3 p-0 fs-6 fw-bold align-self-center">
          {(minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)}
        </span>
      );
    }
  };

  const handleCountDownCompeleted = () => {
    // setVerifyCode("");
    // toggle_verifyDrawer();
    // toggle_loginDrawer();
    set_compeleted(true);
  };

  const renderCountDownWithMemo = useMemo(
    () => (
      <Countdown
        onComplete={handleCountDownCompeleted}
        ref={countdownRef}
        date={Date.now() + 120000}
        renderer={renderer}
      />
    ),
    [compeleted]
  );

  const handleChange = (e) => {
    setVerifyCode(e);
    // localStorage.setItem("vcode", e);
  };
  /////==============================/////////////
  ///////////   VERIFY CODES : END   /////////////
  ///=====================================////////

  return (
    <div
      dir="rtl"
      className="w-100 h-100-vh p-xxl-4 flex-grow-1 p-3 m-0 d-flex flex-column justify-content-start align-items-stretch"
    >
      {/* 
          1 : دوره-های-متنوع
          2 : تعیین-سطح-رایگان
          3 : لایتنر-باکس
      */}
      <section className="m-0 mt-3 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
        <FirstPageCarousel
          list={[
            { id: 0, src: sliderImg1, alt: "دوره-های-متنوع" },
            { id: 1, src: sliderImg2, alt: "تعیین-سطح-رایگان" },
            { id: 2, src: sliderImg3, alt: "لایتنر-باکس" },
          ]}
        />
        <div
          style={{
            position: "fixed",
            bottom: "0",
            right: "0",
            left: "0",
            margin: "0 auto",
            width: "100%",
            maxWidth: "800px",
            backgroundColor: "#fff",
          }}
          className="p-3 "
        >
          <Button
            onClick={handleSubmit_loginEvano}
            color="primary"
            variant="contained"
            className="w-100 py-2"
          >
            شروع
          </Button>
        </div>
        {/*=============== signup drawer =============*/}
        <Drawer
          classes={classes}
          anchor={"bottom"}
          open={show_signupDrawer}
          onClose={toggle_signupDrawer}
        >
          { !emailAcceptUser ?
          <Formik
            initialValues={{
              phoneNumber: "",
              firstName: "",
              lastName: "",
              gender: 0,
            }}
            validationSchema={SignupFormSchema}
            onSubmit={handleSubmit_signup}
          >
            <Form className="d-flex flex-column justify-content-center align-items-stretch">
              <h1 className="fs-4 fw-bold text-center my-3 mt-2">ثبت نام</h1>
              <TextInput
                focus={true}
                onKeyPress={(e) => {
                  console.log(e);
                  if (e.which < 48 || e.which > 57) {
                    e.preventDefault();
                  }
                }}
                dir="rtl"
                maxLength="11"
                placeholder="0911 111 1111"
                autocomplete="off"
                type="tel"
                inputClassName="box-rounded-1 auth-input "
                name="phoneNumber"
                id="phoneNumber"
             
              />

<div className="accept-rules-box m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-center">
                <input
                  checked={emailAcceptUser}
                  onChange={()=>{
                   
                    set_emailAcceptUser(!emailAcceptUser)
                 
                  
                  }}
                  type="checkbox"
                />
                <div
                  style={{ textDecoration: "underline" }}
                  // onClick={handleToggleRulesDialog}
                  className="cursor-pointer ms-1 link-hover-effect"
                >
           ورود با ایمیل
                </div>
              </div>

              <TextInput
                inputClassName="box-rounded-1 auth-input"
                placeholder="نام"
                name="firstName"
                id="firstName"
              />

              <TextInput
                inputClassName="box-rounded-1 auth-input"
                placeholder="نام خانوادگی"
                name="lastName"
                id="lastName"
              />

              <label
                dir="rtl"
                className=" m-0 mt-3 p-0 d-flex flex-row justify-content-start align-items-center"
              >
                <span className="m-0 p-0 fs-6 fw-bold">جنسیت</span>
              </label>
              <div
                dir="rtl"
                className="m-0 mt-2 p-0 d-flex flex-row justify-content-start align-items-center"
              >
                <label
                  htmlFor="male"
                  className="m-0 p-0 d-flex flex-row justify-content-start align-items-center"
                >
                  <input
                    onChange={handle_genderChange}
                    type={"radio"}
                    id="male"
                    name="gender"
                    defaultChecked
                  />
                  <span className="ms-1 ">مرد</span>
                </label>
                <label
                  htmlFor="female"
                  className="m-0 ms-2 p-0 d-flex flex-row justify-content-start align-items-center"
                >
                  <input
                    onChange={handle_genderChange}
                    type={"radio"}
                    id="female"
                    name="gender"
                  />
                  <span className="ms-1 ">زن</span>
                </label>
              </div>
              <div className="accept-rules-box m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-center">
                <input
                  checked={rulesAcceptedByUser}
                  onChange={handle_rulesAcceptedByUser}
                  type="checkbox"
                />
                <div
                  style={{ textDecoration: "underline" }}
                  onClick={handleToggleRulesDialog}
                  className="cursor-pointer ms-1 link-hover-effect"
                >
                  قوانین و مقررات را می‌ پذیرم .
                </div>
                <Dialog open={openRulesModal} onClose={handleToggleRulesDialog}>
                  <div className="p-3">
                    <SiteRules className="p-3" />
                  </div>
                </Dialog>
              </div>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                ref={btnRef}
                className="m-0  mt-4 py-2"
              >
                ثبت نام
              </Button>

              

              <div className=" my-2 d-flex flex-row justify-content-center align-items-center">
                <div
                  onClick={() => {
                    toggle_signupDrawer();
                    toggle_loginDrawer();
                  }}
                  className="fs-6 fw-bold cursor-pointer"
                >
                  ورود
                </div>
              </div>
            </Form>
          </Formik>
          :
          <Formik
            initialValues={{
              phoneNumber: "",
              firstName: "",
              lastName: "",
              gender: 0,
            }}
            validationSchema={SignupFormSchemaEmail}
            onSubmit={handleSubmit_signup}
          >
            <Form className="d-flex flex-column justify-content-center align-items-stretch">
              <h1 className="fs-4 fw-bold text-center my-3 mt-2">ثبت نام</h1>
              <TextInput
                focus={true}
                dir="rtl"
                placeholder="learnest@gmail.com"
                autocomplete="on"
                type="email"
                inputClassName="box-rounded-1 auth-input "
                name="phoneNumber"
                id="phoneNumber"
                pattern=".+@gmail.com"
                title="لطفا فقط اکانت جیمیل ثبت کنید."
              
              />

<div className="accept-rules-box m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-center">
                <input
                  checked={emailAcceptUser}
                  onChange={()=>{
                   
                    set_emailAcceptUser(!emailAcceptUser)    
                  
                   
                  }}
                  type="checkbox"
                />
                <div
                  style={{ textDecoration: "underline" }}
                  // onClick={handleToggleRulesDialog}
                  className="cursor-pointer ms-1 link-hover-effect"
                >
            ورود با ایمیل
                </div>
              </div>

              <TextInput
                inputClassName="box-rounded-1 auth-input"
                placeholder="نام"
                name="firstName"
                id="firstName"
              />

              <TextInput
                inputClassName="box-rounded-1 auth-input"
                placeholder="نام خانوادگی"
                name="lastName"
                id="lastName"
              />

              <label
                dir="rtl"
                className=" m-0 mt-3 p-0 d-flex flex-row justify-content-start align-items-center"
              >
                <span className="m-0 p-0 fs-6 fw-bold">جنسیت</span>
              </label>
              <div
                dir="rtl"
                className="m-0 mt-2 p-0 d-flex flex-row justify-content-start align-items-center"
              >
                <label
                  htmlFor="male"
                  className="m-0 p-0 d-flex flex-row justify-content-start align-items-center"
                >
                  <input
                    onChange={handle_genderChange}
                    type={"radio"}
                    id="male"
                    name="gender"
                    defaultChecked
                  />
                  <span className="ms-1 ">مرد</span>
                </label>
                <label
                  htmlFor="female"
                  className="m-0 ms-2 p-0 d-flex flex-row justify-content-start align-items-center"
                >
                  <input
                    onChange={handle_genderChange}
                    type={"radio"}
                    id="female"
                    name="gender"
                  />
                  <span className="ms-1 ">زن</span>
                </label>
              </div>
              <div className="accept-rules-box m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-center">
                <input
                  checked={rulesAcceptedByUser}
                  onChange={handle_rulesAcceptedByUser}
                  type="checkbox"
                />
                <div
                  style={{ textDecoration: "underline" }}
                  onClick={handleToggleRulesDialog}
                  className="cursor-pointer ms-1 link-hover-effect"
                >
                  قوانین و مقررات را می‌ پذیرم .
                </div>
                <Dialog open={openRulesModal} onClose={handleToggleRulesDialog}>
                  <div className="p-3">
                    <SiteRules className="p-3" />
                  </div>
                </Dialog>
              </div>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                ref={btnRef}
                className="m-0  mt-4 py-2"
              >
                ثبت نام
              </Button>

              

              <div className=" my-2 d-flex flex-row justify-content-center align-items-center">
                <div
                  onClick={() => {
                    toggle_signupDrawer();
                    toggle_loginDrawer();
                  }}
                  className="fs-6 fw-bold cursor-pointer"
                >
                  ورود
                </div>
              </div>
            </Form>
          </Formik>
      }
        </Drawer>
        {/*============== login drawer ===============*/}
        <Drawer
          classes={classes}
          anchor={"bottom"}
          open={show_loginDrawer}
          onClose={toggle_loginDrawer}
        >
          { !emailAcceptUser?
          <Formik
            initialValues={{
              phoneNumber: "",
            }}
            validationSchema={loginFormSchema}
            onSubmit={handleSubmit_login}
          >
            <Form className="d-flex flex-column justify-content-center align-items-stretch">
              <h1 className="fs-4 fw-bold text-center my-3 mt-2">ورود</h1>

              
              <TextInput
                focus={true}
                onKeyPress={(e) => {
                  if (e.which < 48 || e.which > 57) {
                    e.preventDefault();
                  }
                }}
                dir="ltr"
                maxLength="11"
                placeholder="0911 111 1111"
                autocomplete="off"
                type="tel"
                inputClassName="box-rounded-1 auth-input"
                name="phoneNumber"
                id="phoneNumber"
              />
              
                <div className="accept-rules-box m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-center">
                <input
                  checked={emailAcceptUser}
                  onChange={()=>{
                    set_emailAcceptUser(!emailAcceptUser)
                    
                   
                  }}
                  type="checkbox"
                />
                <div
                  style={{ textDecoration: "underline" }}
                  // onClick={handleToggleRulesDialog}
                  className="cursor-pointer ms-1 link-hover-effect"
                >
             ورود با ایمیل
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                ref={btnRef}
                className="m-0 py-2 mt-4 "
              >
                ورود
              </Button>
              <div className="  my-2 d-flex flex-row justify-content-center align-items-center">
                <div
                  onClick={() => {
                    toggle_loginDrawer();
                    toggle_signupDrawer();
                  }}
                  className="fs-6 fw-bold cursor-pointer"
                >
                  ثبت نام
                </div>
              </div>

            </Form>
          </Formik>
      :
      <Formik
            initialValues={{
              phoneNumber: "",
            }}
            validationSchema={loginFormSchemaEmail}
            onSubmit={handleSubmit_login}
          >
            <Form className="d-flex flex-column justify-content-center align-items-stretch">
              <h1 className="fs-4 fw-bold text-center my-3 mt-2">ورود</h1>

              
              <TextInput
                focus={true}
                dir="ltr"
                placeholder="learnest@gmail.com"
                autocomplete="on"
                type="email"
                inputClassName="box-rounded-1 auth-input"
                name="phoneNumber"
                id="phoneNumber"
                pattern=".+@gmail.com"
                title="لطفا فقط اکانت جیمیل ثبت کنید."
              />
              
                <div className="accept-rules-box m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-center">
                <input
                  checked={emailAcceptUser}
                  onChange={()=>{
                  
                    set_emailAcceptUser(!emailAcceptUser)
                   
                  
                  }}
                  type="checkbox"
                />
                <div
                  style={{ textDecoration: "underline" }}
                  // onClick={handleToggleRulesDialog}
                  className="cursor-pointer ms-1 link-hover-effect"
                >
             ورود با ایمیل
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                ref={btnRef}
                className="m-0 py-2 mt-4 "
              >
                ورود
              </Button>
              <div className="  my-2 d-flex flex-row justify-content-center align-items-center">
                <div
                  onClick={() => {
                    toggle_loginDrawer();
                    toggle_signupDrawer();
                  }}
                  className="fs-6 fw-bold cursor-pointer"
                >
                  ثبت نام
                </div>
              </div>

            </Form>
          </Formik>

}
        </Drawer>
        {/*============== verify drawer ==============*/}
        <Drawer
          classes={classes}
          anchor={"bottom"}
          open={show_veifyDrawer}
          onClose={toggle_verifyDrawer}
        >
          <form
            dir="ltr"
            onSubmit={handleSubmit_verify}
            className="d-flex flex-column justify-content-center align-items-stretch"
          >
            <ReactCodeInput
              title="کد تایید را وارد کنید"
              fieldWidth="23%"
              className="w-100 "
              // value={verifyCode}
              values={verifyCode.toString() ? verifyCode.toString() : ""}
              onChange={handleChange}
              // onComplete={e => {
              //   handleSubmitForm(e);
              // }}
              type="number"
              fields={4}
            />
            {!compeleted && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="m-0 px-3 py-2 mt-4 mb-1 input-button-box-height box-rounded-1"
                >
                  ارسال
                </Button>
              </>
            )}
            {compeleted && (
              <>
                <Button
                  onClick={handleResendCode}
                  variant="contained"
                  color="primary"
                  type="button"
                  className="m-0 px-3 py-2 mt-4 mb-1 input-button-box-height box-rounded-1 "
                >
                  ارسال مجدد کد
                </Button>
              </>
            )}
            {!compeleted && renderCountDownWithMemo}
            <div className=" my-2 d-flex flex-row justify-content-center align-items-center">
              <div
                onClick={() => {
                  toggle_verifyDrawer();
                  toggle_loginDrawer();
                }}
                className="fs-6 fw-bold cursor-pointer"
              >
              { !emailAcceptUser ?' تغییر شماره' : 'تغییر ایمیل'} 
              </div>
            </div>
          </form>
        </Drawer>
      </section>
    </div>
  );
}

export default Register;

