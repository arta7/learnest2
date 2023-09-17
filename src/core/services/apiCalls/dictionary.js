import http from "../http";
import { API_URLs } from "../CONSTANTS";

const dictionary_apis = API_URLs.dictionary;

export const apiCall_searchForSelectedText = (txt) => {
  return http.post(dictionary_apis.search + "?search=" + txt);
};
