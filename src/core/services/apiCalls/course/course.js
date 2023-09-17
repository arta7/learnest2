import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const course_apis = API_URLs.course;

export const apiCall_getInvitedsByUser = (courseId) => {
  return http.post(course_apis.getInvitedsByUser + "?courseId=" + courseId);
};
