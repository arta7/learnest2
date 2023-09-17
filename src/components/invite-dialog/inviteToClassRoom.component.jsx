import React, { useState, useEffect } from "react";
import { Button, DialogActions, Drawer, IconButton } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextInput } from "../formik-input/formikInput";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { apiCaller } from "../../core/custom-hooks/useApi";
import { buyCourse_apiCalls } from "../../core/services/agent";
import { useBuyCourseState } from "../../core/contexts/buyCourseContext/buyCourseContext";
import { useClassRoomStateContext } from "../../core/contexts/classRoom/classRoom";
import { useCaculateLeftPixels } from "../../core/custom-hooks/useDrawerStyles";
import { useMemo } from "react";

const loginFormSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .test(
      "len",
      "شماره وارد شده باید 11 رقم باشد",
      (val) => val && val.toString().length === 11
    ),
});

function InvitationDialog({ onClose, open, getAllInvites }) {
  const { classRoomInfo } = useClassRoomStateContext();
  const { handleOpen, handleClose } = useLoadingContext();

  ///////////

  ///////////
  const handleSubmit_login = async (values) => {
    const getBody = () => {
      return {
        classRoomId: classRoomInfo?.classroomId,
        phone: values.phoneNumber,
      };
    };

    handleOpen();
    await apiCaller({
      api: buyCourse_apiCalls.apiCall_invitetoclassroom,
      apiArguments: getBody(),
      toastMessage: true,
      onErrorMessage: "دعوت با خطا مواجه شد .",
      onSuccessMessage: "دعوت با موفقیت انجام شد",
      onSuccess: getAllInvites,
    });
    onClose();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-3 ">
        <h4 className="fs-6">شماره‌ی شخص مورد نظر را وارد کنید</h4>
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

const InviteToClassRoom = ({ getAllInvites }) => {
  const left = useCaculateLeftPixels();
  ////// ========> handle dialog
  const [open, setOpen] = React.useState(false);
  // useEffect(() => {
  //   if (!localStorage.getItem("inviteModalStatus")) {
  //     localStorage.setItem("inviteModalStatus", "close");
  //   }
  // }, []);
  const handleToggle = () => {
    // alert("handleToggle");
    setOpen(!open);
    // if (localStorage.getItem("inviteModalStatus") === "close") {
    //   localStorage.setItem("inviteModalStatus", "open");
    // }
    // if (localStorage.getItem("inviteModalStatus") === "open") {
    //   localStorage.setItem("inviteModalStatus", "close");
    // }
  };

  // const isModalOpen = () => {
  //   if (localStorage.getItem("inviteModalStatus") === "close") {
  //     return false;
  //   }
  //   if (localStorage.getItem("inviteModalStatus") === "open") {
  //     return true;
  //   }

  //   return false;
  // };

  return (
    <div
      dir="rtl"
      className=" mt-5 d-flex flex-row justify-content-between align-items-baseline"
    >
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
      <InvitationDialog
        open={open}
        onClose={handleToggle}
        getAllInvites={getAllInvites}
      />
    </div>
  );
};

export default InviteToClassRoom;
