import React, { useState, useEffect } from "react";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../core/contexts/buyCourseContext/buyCourseContext";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import * as actions from "../../../../core/contexts/buyCourseContext/actions";
import { buyCourse_apiCalls } from "../../../../core/services/agent";
import { useNavigate, useParams, useLocation } from "react-router";
import { makeStyles } from "@mui/styles";
import { Button, Dialog, Drawer, IconButton } from "@mui/material";
import fakeAvatar from "../../../../assets/img/babak-images/classmate-avatar.png";
import { useClassRoomStateContext } from "../../../../core/contexts/classRoom/classRoom";
import useToolbarPosition from "../../../../components/toolbar/useToolbarPosition.hook";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { fileBaseUrl } from "../../../../core/services/baseUrl";
import ReactPlayer from "react-player";
import Invitement from "../../../../components/Invitement-card/invitement.component";
import Invitements from "../../../../components/invitements-section/invitements.component";
import { Close } from "@mui/icons-material";

const useStyles = makeStyles(() => {
  return {
    root: {
      transition: ".3s",
      "& .MuiPaper-root": {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
        overflowY: "auto",
        minHeight: (props) => props.minHeight,
        // maxHeight: (props) => props.minHeight,
        // "*": {
        //   transition: ".3s",
        // },
        // transition: ".3s !important",
      },
    },
  };
});

const BuyCourseFirstPage = (props) => {
  ///
  const classes = useStyles({ minHeight: "100vh" });
  //// Video Play Icon
  const { right, top } = useToolbarPosition();
  ///////
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [invitements, set_invitements] = useState();
  const { dispatchFactor, set_priceInformation } = useBuyCourseDispatch();
  const { classRoomInfo } = useClassRoomStateContext();

  useEffect(() => {
    dispatchFactor({ type: actions.SETCOURSEID, payload: params.courseId });
    dispatchFactor({
      type: actions.SETCLASSROOMID,
      payload: classRoomInfo?.classroomId,
    });

    apiCaller({
      api: buyCourse_apiCalls.apiCall_getClassroominvites,
      apiArguments: params.courseId,
      onSuccess: (resp) => {
        if (resp?.data?.data?.length > 0) set_invitements(resp?.data?.data);
      },
    });
  }, []);

  useEffect(() => {
    if (location?.state) {
      set_priceInformation(location?.state);
    }
  }, [location?.state]);

  const handleGotoSecondPage = () => {
    navigate("/buyCourseSecondPage");
  };

  /// handle how to use video
  const [openHowToUseCrossword, set_openHowToUseCrossword] = useState(false);
  const handle_openHowToUseCrossword = () => {
    set_openHowToUseCrossword(!openHowToUseCrossword);
  };

  const [showExplanation, setShowExplanation] = useState(false);
  const toggleShowExplanation = () => setShowExplanation((o) => !o);

  return (
    <div className="m-0 pb-6 p-3 d-flex flex-column justify-content-start align-items-stretch">
      <span
        style={{
          position: "absolute",
          right,
          top,
          zIndex: "10",
        }}
        className="m-0 p-0 d-flex flex-column justify-content-start align-items-center"
      >
        <PlayCircleFilledIcon
          id="openHowToUseCrossword"
          onClick={handle_openHowToUseCrossword}
          color="primary"
          fontSize="large"
          className="cursor-pointer"
        />
        <span className="m-0 p-0 text-muted" style={{ fontSize: "0.5rem" }}>
          آموزش خرید دوره
        </span>
        {/* //////////////////  */}
        <Dialog
          open={openHowToUseCrossword}
          onClose={handle_openHowToUseCrossword}
        >
          <div
            className="m-0 p-3 d-flex flex-row justify-content-center align-items-center"
            style={{ minWidth: "calc(350px - 2rem)" }}
          >
            <ReactPlayer
              url={fileBaseUrl + "/tutorials/buy-course.mp4"}
              controls
            />
          </div>
        </Dialog>
      </span>
      {/* introduction */}
      <div className="m-0 mt-2 p-0 d-flex flex-column justify-content-start align-items-stretch">
        <p className="mb-3 text-justify">
          در صورت ارسال دعوتنامه از جانب دوستانتان برای شرکت در جلسات دوره ها به
          صورت مشترک و در قالب همکلاسی ، دعوتنامه ها را در این قسمت مشاهده
          میکنید. در صورت عدم وجود دعوتنامه و یا در صورت تمایل به شرکت در جلسات
          به صورت انفرادی ، دکمه ی ورود به کلاس بدون دعوتنامه در پایین صفحه را
          فشار دهید.
        </p>
      </div>
      {/* INVITEMENTS  */}
      <Invitements invitementsList={invitements} />
      {/* <div className="m-0 my-3 p-0 d-flex flex-column justify-content-start align-items-stretch">
        {invitements?.length > 0 &&
          invitements.map((item, index) => (
            <Invitement
              key={item?.callerName}
              className={
                (index === invitements?.length - 1 ? "mb-6" : "") + " my-2"
              }
              {...item}
            />
          ))}
      </div> */}
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          position: "fixed",
          bottom: "0",
          right: "0",
          left: "0",
        }}
        className="m-0 mx-auto py-3 d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={toggleShowExplanation}
          className="py-2 fs-6"
        >
          ثبت نام در کلاس بدون دعوتنامه
        </Button>
        <Drawer
          classes={classes}
          // className="hidden-scrollbar"
          anchor="bottom"
          open={showExplanation}
          onClose={toggleShowExplanation}
        >
          <div className="  w-100">
            <div
             
              className=" w-100 m-0 px-3 py-0 fs-6 d-flex flex-column justify-content-start align-items-stretch"
            >
              <div className="fs-5 d-flex flex-row justify-content-end align-items-center">
                <Button
                  onClick={toggleShowExplanation}
                  variant="outlined"
                  size="small"
                >
                  <Close color="primary" fontSize="small" />
                </Button>
              </div>
              <h3 className="fs-5 d-flex flex-row justify-content-between align-items-center">
                راهنمای ثبت نام :
              </h3>
              <ul
                style={{
                  lineHeight: "1.65rem",
                  maxHeight: "calc(75vh)",
                }}
                dir="rtl"
                className="tiny-scrollbar d-flex flex-column justify-content-start align-items-stretch list-unstyled"
              >
                <li className="mt-3">
                  ● با "انتخاب روزهای هفته" جلسات هر دوره در روزهای انتخاب شده
                  توسط شما باز خواهند شد و در روزهای دیگر هفته جلسات جدید قفل
                  خواهند بود.
                </li>
                <li className="mt-3">
                  ● در صورت تمایل به باز شدن هر جلسه به صورت روزانه ( هر روز یک
                  جلسه ی جدید ) گزینه ی "همه روزه" را انتخاب نمایید و در صورتی که
                  در روزهای مشخصی از هفته فرصت شرکت در جلسات را دارید ، یکی از
                  گزینه های دیگر را انتخاب نمایید.
                </li>
                <li className="mt-3">
                  ● توجه داشته باشید که بعد از پایان ثبت نام و تکمیل خرید ، دوره ی
                  خریداری شده به مدت زمان نامحدود در داخل اپلیکیشن در اختیار شما
                  خواهد بود و همیشه و حتی پس از پایان ان دوره امکان دسترسی به
                  جلسات اموزشی ان را خواهید داشت.
                </li>

                <li className="mt-3">
                  ● در صورتی که شما به هر دلیلی نتوانید جلسه ای را در زمان مشخص
                  شده توسط خودتان مشاهده کنید ، آن جلسه برای شما باز خواهد ماند و
                  در روزهای بعد و یا با جلسات بعدی میتوانید از مطالب آن جلسه نیز
                  استفاده نمایید.
                </li>
              </ul>
              <Button
                className="mt-auto fs-6"
                variant="contained"
                color="primary"
                onClick={handleGotoSecondPage}
              >
                ادامه
              </Button>
            </div>
          </div>

        </Drawer>
      </div>
    </div>
  );
};

export default BuyCourseFirstPage;
