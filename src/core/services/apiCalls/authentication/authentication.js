// import http, { tokenKey } from "../../http";
// import { API_URLs } from "../../CONSTANTS";
// import { getCookie } from "../../../utils/cookie";
// import { getItem } from "../../../utils/storage";

// const auth_apis = API_URLs.authentincation;

// export const apiCall_signup = async ({
//   phoneNumber,
//   firstName,
//   lastName,
//   gender,
// }) => {
//   const formdata = new FormData();

//   formdata.append("Phone", phoneNumber);
//   formdata.append("FirstName", firstName);
//   formdata.append("LastName", lastName);
//   formdata.append("Gender", gender);
//   formdata.append(
//     "MacAddress",
//     getCookie("mac-address") ? getCookie("mac-address") : "web"
//   );

//   return http.post(auth_apis.signup, formdata);
// };

// export const apiCall_login = async (phoneNumber) => {
//   const formdata = new FormData();

//   formdata.append("Phone", phoneNumber);
//   formdata.append(
//     "MacAddress",
//     getCookie("mac-address") ? getCookie("mac-address") : "web"
//   );

//   // return fetch(auth_apis.login, {
//   //   method: "POST",
//   //   body: formdata,
//   //   headers: {
//   //     // Authorization: getItem(tokenKey),
//   //     "Content-Type": "multipart/form-data",
//   //   },
//   // });

//   // alert(1);
//   // let xhr = new XMLHttpRequest();
//   // xhr.open("POST", auth_apis.login, true);
//   // xhr.send(formdata);
//   // xhr.onload = function (d) {
//   //   if (xhr.status != 200) {
//   //     alert(`Error ${xhr.status}: ${xhr.statusText}`);
//   //     console.log(d);
//   //   } else {
//   //     alert(`Done, got ${xhr.response.length} bytes`);
//   //   }
//   // };
//   // xhr.onerror = function (err) {
//   //   alert(JSON.stringify(err));
//   // };

//   return http.post(auth_apis.login, formdata);
// };

// export const apiCall_verify = async ({ phoneNumber, verifyCode }) => {
//   const formdata = new FormData();

//   formdata.append("Phone", phoneNumber);
//   formdata.append("VerificationCode", verifyCode);
//   formdata.append(
//     "MacAddress",
//     getCookie("mac-address") ? getCookie("mac-address") : "web"
//   );

//   return http.post(auth_apis.verify, formdata);
// };



import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const auth_apis = API_URLs.authentincation;

export const apiCall_signup = async ({
  phoneNumber,
  firstName,
  lastName,
  IsPhone,
  gender,
}) => {
  const formdata = new FormData();

  formdata.append("Phone", phoneNumber);
  formdata.append("FirstName", firstName);
  formdata.append("LastName", lastName);
  formdata.append("IsPhone", IsPhone);
  formdata.append("Gender", gender);
  formdata.append("MacAddress", "web");

  return http.post(auth_apis.signup, formdata);
};

export const apiCall_login = async (phoneNumber,IsPhone) => {
  const formdata = new FormData();

  formdata.append("Phone", phoneNumber);
  formdata.append("IsPhone", IsPhone);
  formdata.append("MacAddress", "web");

  return http.post(auth_apis.login, formdata);
};

export const apiCall_loginfromEvano = async (id) => {
  const formdata = new FormData();

  formdata.append("", "");
    console.log('auth_apis.loginevano+id : ',auth_apis.loginevano+id)
  return http.post(auth_apis.loginevano+id);
};

export const apiCall_verify = async ({ phoneNumber, verifyCode,IsPhone }) => {
  const formdata = new FormData();

  formdata.append("Phone", phoneNumber);
  formdata.append("VerificationCode", verifyCode);
  formdata.append("IsPhone", IsPhone);
  formdata.append("MacAddress", "web");

  return http.post(auth_apis.verify, formdata);
};

export const apiCall_refreshToken = async () => {
  return http.post(auth_apis.refreshToken);
};

