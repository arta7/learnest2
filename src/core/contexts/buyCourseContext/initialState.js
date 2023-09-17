import { getDataFromLocalStorage } from "./dataCache";

export const initialState = getDataFromLocalStorage() || {
  step: 1,
  courseId: 0,
  giftCode: "",
  refferCode: "",
  weekDays: 0,
  isTemp: true,
  isWithTeacher: false,
  classRoomConfig: {
    startDate: "",
    classRoomId: 0,
    useSystemSearch: true,
    device: "web",
    gender: 0,
    minAge: 0,
    maxAge: 0,
    inviteCode: 0,
  },
};
// hasNotif: false,
