import React, { useState, useEffect } from "react";
import CustomizedTabPanel from "./components/customTabpanel.component";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../core/contexts/buyCourseContext/buyCourseContext";
import "./styles/styles.scss";
import * as actions from "../../../../core/contexts/buyCourseContext/actions";
import { Button, Dialog } from "@mui/material";
import { useNavigate } from "react-router";
import { initialState } from "../../../../core/contexts/buyCourseContext/initialState";
import useToolbarPosition from "../../../../components/toolbar/useToolbarPosition.hook";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ReactPlayer from "react-player";
import { fileBaseUrl } from "../../../../core/services/baseUrl";

const BuyCourseThirdPage = (props) => {
  //// Video Play Icon
  const { right, top } = useToolbarPosition();
  /// handle how to use video
  const [openHowToUseCrossword, set_openHowToUseCrossword] = useState(false);
  const handle_openHowToUseCrossword = () => {
    set_openHowToUseCrossword(!openHowToUseCrossword);
  };
  //////
  const { factor } = useBuyCourseState();
  const { dispatchFactor } = useBuyCourseDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (factor.courseId === 0) {
      navigate(-2);
    }
    dispatchFactor({ type: actions.SETSTEP, payload: 2 });
  }, []);

  const gotoNextStep = () => {
    dispatchFactor({ type: actions.SETSTEP, payload: 3 });
    navigate("/buyCourseFourthPage");
  };

  return (
    <div className="m-0 p-0" dir="ltr">
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
      {/*  */}
      <CustomizedTabPanel />
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
        }}
        className=" py-3 mx-auto d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          style={{
            width: "calc(100% - 2rem)",
          }}
          variant="contained"
          color="primary"
          onClick={gotoNextStep}
        >
          مرحله بعد
        </Button>
      </div>
    </div>
  );
};

export default BuyCourseThirdPage;
