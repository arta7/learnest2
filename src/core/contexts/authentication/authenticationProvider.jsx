// import React, { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";
// import { authentication_apiCalls } from "../../services/agent";
// import http from "../../services/http";
// import { deleteAllCookies } from "../../utils/utils";

// const UserLoginContext = createContext();

// export const UserLoginProvider = ({ children }) => {
//   const [status, setStatus] = useState("process");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [token, setToken] = useState(http?.getToken() || "");

//   return (
//     <UserLoginContext.Provider
//       value={{
//         status,
//         phoneNumber,
//         token,
//         setStatus,
//         setPhoneNumber,
//         setToken,
//       }}
//     >
//       {children}
//     </UserLoginContext.Provider>
//   );
// };

// function useLoginContext() {
//   return useContext(UserLoginContext);
// }

// function useAuthenticationActions() {
//   const { setToken } = useLoginContext();

//   const login = async (phoneNumber1) => {
//     return authentication_apiCalls.apiCall_login(phoneNumber1);
//   };

//   const register = async ({ phoneNumber, firstName, lastName, gender }) => {
//     return authentication_apiCalls.apiCall_signup({
//       phoneNumber,
//       firstName,
//       lastName,
//       gender,
//     });
//   };

//   const verify = async (verifyCode, phoneNumber) => {
//     return authentication_apiCalls.apiCall_verify({ verifyCode, phoneNumber });
//   };

//   const logout = () => {
//     try {
//       if ("serviceWorker" in navigator) {
//         caches.keys().then(function (cacheNames) {
//           cacheNames.forEach(function (cacheName) {
//             caches.delete(cacheName);
//           });
//         });
//       }
//       deleteAllCookies();
//     } catch {}

//     setToken(null);
//     http.removeToken();
//     localStorage.removeItem("__use_local_storage_state_hook__value__appTour");
//   };

//   const handle_setToken = (token) => {
//     setToken(token);
//     http.setToken(token);
//   };

//   return { login, verify, register, handle_setToken, logout };
// }

// export { useLoginContext, useAuthenticationActions };
// export default UserLoginProvider;

import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { authentication_apiCalls } from "../../services/agent";
import http from "../../services/http";
import { deleteAllCookies } from "../../utils/utils";

const UserLoginContext = createContext();

export const UserLoginProvider = ({ children }) => {
  const [status, setStatus] = useState("process");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState(http?.getToken() || "");
  const [address, setaddress] = useState("1");

  return (
    <UserLoginContext.Provider
      value={{
        status,
        phoneNumber,
        token,
        address,
        setStatus,
        setPhoneNumber,
        setToken,
        setaddress,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};

function useLoginContext() {
  return useContext(UserLoginContext);
}

function useLoginContext2() {
  return useContext(UserLoginContext);
}

function useAuthenticationActions() {
  const { setToken } = useLoginContext();
  const { setaddress } = useLoginContext2();

  const login = async (phoneNumber1,IsPhone) => {
    return authentication_apiCalls.apiCall_login(phoneNumber1,IsPhone);
  };

  const loginevano = async (id) => {
    return authentication_apiCalls.apiCall_loginfromEvano(id);
  };

  const register = async ({ phoneNumber, firstName, lastName,IsPhone, gender }) => {
    return authentication_apiCalls.apiCall_signup({
      phoneNumber,
      firstName,
      lastName,
      IsPhone,
      gender,
    });
  };

  const verify = async (verifyCode, phoneNumber,IsPhone) => {
    return authentication_apiCalls.apiCall_verify({ verifyCode, phoneNumber,IsPhone });
  };

  const logout = () => {
    try {
      if ("serviceWorker" in navigator) {
        caches.keys().then(function (cacheNames) {
          cacheNames.forEach(function (cacheName) {
            caches.delete(cacheName);
          });
        });
      }
      deleteAllCookies();
    } catch {}

    setToken(null);
    http.removeToken();
    localStorage.removeItem("__use_local_storage_state_hook__value__appTour");
  };

  const handle_setToken = (token) => {
    setToken(token);
    http.setToken(token);
  };

  const handle_setaddress = (addres) => {
    setaddress(addres);
  };

  return { login, verify, register, handle_setToken, logout,loginevano,handle_setaddress };
}

export { useLoginContext, useAuthenticationActions,useLoginContext2 };
export default UserLoginProvider;

