import http from "../http";
import { API_URLs } from "../CONSTANTS";

const refferer_apis = API_URLs.refferer;

export const apiCall_getReffererDashboard = () => {
  return http.post(refferer_apis.refferdashboard);
};

export const apiCall_getWithdrawdashboard = () => {
  return http.post(refferer_apis.withdrawdashboard);
};

export const apiCall_requestwithdraw = ({ amount, description }) => {
  return http.post(
    refferer_apis.requestwithdraw +
      "?Amount=" +
      amount +
      "&Description=" +
      description
  );
};

export const apiCall_cancelwithdraw = () => {
  return http.post(refferer_apis.cancelwithdraw);
};
