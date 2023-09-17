import React, { useState, useEffect } from "react";
import { useLoadingContext } from "../contexts/loading/loading";
import { authentication_apiCalls } from "../services/agent";
import http from "../services/http";
import { apiCaller } from "./useApi";
/////
const useRefreshToken = () => {
  const { handleOpen, handleClose } = useLoadingContext();
  ///////
  const refreshToken = async () => {
    apiCaller({
      api: authentication_apiCalls.apiCall_refreshToken,
      onStart: handleOpen,
      onEnd: handleClose,
      onSuccess: (resp) => {
        if (resp.status == 200 && resp.data?.status == 1) {
          http.setToken(resp.data.data);
        }
      },
    });
  };
  ///////
  return { refreshToken };
};

export default useRefreshToken;
