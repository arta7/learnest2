import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { ArrowCircleRight } from "@mui/icons-material";
import { FiberManualRecord } from "@mui/icons-material";

//////////////
const CourseDetailsSkeleton = () => {
  return (
    <>
      {/* Header */}
      <div className="w-100  m-0 p-3 mt-2 d-flex flex-column justify-content-center align-items-center">
        <div className="img-holder skeleton-wave-effect">
          <div className="m-0 p-0 px-1 d-flex justify-content-around align-items-center btn-holder">
            <div className="m-0 p-0 d-flex justify-content-center align-items-center icon-holder">
              <ArrowCircleRight htmlColor="#fff" />
            </div>
            <span className="text-white ms-2 font-small btn-text">
              شروع کلاس
            </span>
          </div>
        </div>
        <div
          id="progress-container"
          className="p-0 m-0 pt-2 d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "20px", direction: "ltr" }}
        >
          <Skeleton sx={{ width: "100%" }} height={13} variant="text" />
        </div>
      </div>
      {/* Cards */}
      <div
        dir="ltr"
        className="mt-3 w-100 d-flex flex-wrap justify-content-between align-items-center"
      >
        {[0, 1, 2, 3, 4].map((item, cardIndex) => (
          <div
            key={item}
            className={
              (cardIndex % 2 === 0 ? "pe-3 ps-1" : "ps-3 pe-1") +
              " py-1 p-0 m-0 col-6 d-flex flex-column justify-content-center align-items-center"
            }
          >
            <div
              dir="rtl"
              className={
                " w-100 p-3 ps-2 py-2  position-relative d-flex flex-column justify-content-start align-items-stretch rounded-20 detail-card"
              }
              
            >
              <div
                style={{ maxHeight: "90px" }}
                className="m-0 p-0 d-flex flex-row justify-content-start align-items-stretch"
              >
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{
                    fontSize: "60px",
                    color: "rgb(169 169 169 / 25%)",
                    fontWeight: "600",
                  }}
                >
                  {cardIndex + 1}
                </div>
                {/* **************** */}
                <div className="m-0 p-0 ps-2 flex-grow-1 d-flex flex-column justify-content-center align-items-start">
                  <Skeleton variant="text" width={50} height={20} />
                  <div className="w-100 mt-1 d-flex flex-row justify-content-between align-items-center">
                    <div className="m-0 p-0 ms-auto d-flex justify-content-center align-items-center">
                      <FiberManualRecord
                        className="me-1 mb-1"
                        htmlColor="#157DBC"
                        fontSize="5"
                      />
                      <Skeleton variant="text" width={20} height={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseDetailsSkeleton;
