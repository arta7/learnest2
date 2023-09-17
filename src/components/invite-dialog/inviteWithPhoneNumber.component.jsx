import React, { useState, useEffect } from "react";
import { Button, DialogActions, IconButton } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../formik-input/formikInput";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { apiCaller } from "../../core/custom-hooks/useApi";
import { buyCourse_apiCalls } from "../../core/services/agent";
import { useBuyCourseState } from "../../core/contexts/buyCourseContext/buyCourseContext";
import { useClassRoomStateContext } from "../../core/contexts/classRoom/classRoom";
import { useCaculateLeftPixels } from "../../core/custom-hooks/useDrawerStyles";

const loginFormSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .test(
      "len",
      "شماره وارد شده باید 11 رقم باشد",
      (val) => val && val.toString().length === 11
    ),
});

function InvitationDialog({
  onClose,
  open,
  inviteToClassRoom,
  inviteToCourse,
}) {
  const { factor } = useBuyCourseState();
  const { classRoomInfo } = useClassRoomStateContext();
  const { handleOpen, handleClose } = useLoadingContext();
  const handleCloseModal = () => {
    onClose();
  };
  ///////////
  ///////////
  const handleSubmit_login = async (values) => {
    const getBody = () => {
      if (inviteToClassRoom) {
        return {
          classRoomId: classRoomInfo?.classroomId,
          phone: values.phoneNumber,
        };
      }

      return {
        courseId: factor.courseId,
        invites: [values.phoneNumber],
      };
    };

    handleOpen();
    await apiCaller({
      api: inviteToCourse
        ? buyCourse_apiCalls.apiCall_invitetocourse
        : buyCourse_apiCalls.apiCall_invitetoclassroom,
      apiArguments: getBody(),
      toastMessage: true,
      onErrorMessage: "دعوت با خطا مواجه شد .",
      onSuccessMessage: "دعوت با موفقیت انجام شد",
    });
    onClose();
    handleClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <div className="p-3 ">
        <h4 className="fs-6">همکلاسی خود را انتخاب کنید</h4>
        <Formik
          initialValues={{
            phoneNumber: "",
          }}
          validationSchema={loginFormSchema}
          onSubmit={handleSubmit_login}
        >
          <Form
            style={{
              width: "263px",
            }}
            className="mt-3 d-flex flex-column justify-content-center align-items-stretch"
          >
            {/* <div className="m-0 p-0 w-100 d-flex flex-column justify-content-start align-items-stretch">
              <input
                autoFocus
                className="auth-input box-rounded-1 px-3 py-2"
                type="tel"
                dir="ltr"
                maxLength="11"
                placeholder="09xxxxxxxxx"
                name="phoneNumber"
                id="phoneNumber"
                onKeyPress={(e) => {
                  if (e.which < 48 || e.which > 57) {
                    e.preventDefault();
                  }
                }}
              />
            </div> */}
            <TextInput
              autoFocus
              onKeyPress={(e) => {
                if (e.which < 48 || e.which > 57) {
                  e.preventDefault();
                }
              }}
              type="tel"
              dir="ltr"
              maxLength="11"
              placeholder="شماره تلفن"
              inputclassname="box-rounded-1 auth-input"
              name="phoneNumber"
              id="phoneNumber"
            />
            <div className="m-0 mb-0 mt-4 p-0 w-100 d-flex flex-row justify-content-between align-items-stretch">
              <Button
                style={{
                  width: "70%",
                  height: "45px",
                }}
                variant="contained"
                color="primary"
                type="submit"
                className=" box-rounded-1 "
              >
                تایید
              </Button>
              <Button
                variant="contained"
                color="error"
                className=" box-rounded-1 ms-2"
                onClick={onClose}
              >
                انصراف
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </Dialog>
  );
}

const InviteWithPhoneNumber = ({ inviteToCourse, inviteToClassRoom }) => {
  const left = useCaculateLeftPixels();
  ////// ========> handle dialog
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      dir="rtl"
      className=" mt-5 d-flex flex-row justify-content-between align-items-baseline"
    >
      {inviteToCourse && (
        <>
          <p className="m-0 p-0 me-2 fs-6">
            برای دعوت از دوستانتان جهت شرکت در جلسات در کنار شما و در قالب
            همکلاسی گزینه‌ی دعوت کردن را انتخاب نمایید .
          </p>
          <Button
            style={{
              width: "175px",
              height: "41px",
            }}
            variant="contained"
            color={"grey"}
            className="text-nowrap"
            onClick={handleToggle}
          >
            دعوت کردن
          </Button>
        </>
      )}
      {inviteToClassRoom && (
        <IconButton
          style={{
            position: "fixed",
            left: `calc(${left}px + 0.5rem)`,
            bottom: "4rem",
            zIndex: "2",
          }}
          variant="contained"
          color={"primary"}
          onClick={handleToggle}
        >
          <AddCircleIcon sx={{ fontSize: "60px" }} />
        </IconButton>
      )}
      <InvitationDialog
        open={open}
        onClose={handleToggle}
        inviteToCourse={inviteToCourse}
        inviteToClassRoom={inviteToClassRoom}
      />
    </div>
  );
};

export default InviteWithPhoneNumber;
