import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseDetailCards from "./components/CourseDetailCards/CourseDetailCards";
import CourseDetailHeader from "./components/CourseDetailHeader/CourseDetailHeader";
import { useClassRoomStateContext } from "../../../core/contexts/classRoom/classRoom";
// import { parse } from 'query-string';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./style/style.scss";
import { baseUrl } from "../../../core/services/baseUrl";
import { Skeleton } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import CourseDetailsSkeleton from "./components/courseDetailsSkeleton.componen";

const CourseDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("learnestToken");
  const [courseDetail, setCourseDetail] = useState();
  const { classRoomInfo } = useClassRoomStateContext();

  const sessionUrl = baseUrl + "/courses/session?sessionId=";
  const [isFetching, set_isFetching] = useState(false);
  const getSessions = async () => {
    set_isFetching(true);
    await axios
      .post(`${sessionUrl}${id}`, null, {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => {
        setCourseDetail(resp?.data?.data);
      })
      .catch((exp) => {
        console.log(exp);
      })
      .finally(() => {
        set_isFetching(false);
      });
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <section className="d-flex flex-column  justify-content-center align-items-center">
      <div className=" w-100 m-0 p-0 px-3 d-flex flex-column justify-content-center align-items-stretch">
        {!isFetching && courseDetail && courseDetail.hasVideo && (
          <CourseDetailHeader headerData={courseDetail} />
        )}
      </div>
      {!isFetching &&
        courseDetail?.sessionParts?.length > 0 &&
        courseDetail?.sessionParts?.filter((item) => item?.isLocked === true)
          ?.length === courseDetail?.sessionParts?.length && (
          <p class="fs-7 px-3 mt-2 mb-0 p-0 text-muted">
            بعد از فشردن آیکن "شروع کلاس" در بالا و دیدن فیلم های آموزشی و
            <strong> پاسخ به همه سوالات </strong>
            قفل باکس های زیر باز میشود .
          </p>
        )}
      {isFetching && <CourseDetailsSkeleton />}
      {!isFetching && <CourseDetailCards sessionsData={courseDetail} />}
      {!isFetching &&
        courseDetail?.learningProgressPercent === 1 &&
        courseDetail?.sessionParts?.filter((item) => item.isCompleted)
          ?.length === courseDetail?.sessionParts?.length && (
          <div className="p-3 w-100">
            <div className="my-3 p-3 py-4 box-rounded-1 w-100 bg-success text-white text-center">
              شما این جلسه را با موفقیت به اتمام رسانده اید
            </div>
          </div>
        )}
      {classRoomInfo?.length > 0 && (
        <Link
          to={"/chat/gcr" + classRoomInfo?.classroomId}
          className="text-decoration-none text-white d-flex justify-content-center align-items-center chat-button"
        >
          چت
        </Link>
      )}
    </section>
  );
};

export default CourseDetail;
