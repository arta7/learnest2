import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../../../core/custom-hooks/getWindowDimensions";

const CourseSkeleton = ({ className = "" }) => {
  const { width } = useWindowDimensions();
  return (
    <div
      className={
        className +
        " m-0 p-1 d-flex flex-column justify-content-start align-items-stretch"
      }
      style={{
        position: "relative",
        cursor: "pointer",
        boxShadow: "rgb(204 204 204) 0px 3px 6px 3px",
        border: "unset",
        borderRadius: "30px",
      }}
    >
      <div
        className="skeleton-wave-effect"
        style={{
          aspectRatio: "29/16",
          width: "100%",
          borderRadius: "30px",
        }}
      ></div>
      {/*  */}
      <div className="m-0  p-3 d-flex flex-row justify-content-between align-items-center">
        <Skeleton width={60} height={30} variant="text" />
        <Skeleton width={100} height={45} variant="text" />
      </div>
      {/*  */}
      <div className="m-0 mt-2 px-3 d-flex flex-row justify-content-between align-items-center">
        <Skeleton width={width >= 456 ? 266 : 150} height={45} variant="text" />
        <Skeleton width={74} height={30} variant="text" />
      </div>
      {/*  */}
      <div className="m-0 mt-1 mb-3 px-3 d-flex flex-row justify-content-start align-items-center">
        <Skeleton width={266} height={30} variant="text" />
      </div>
      {/*  */}
    </div>
  );
};

const CoursesSkeleton = () => {
  return (
    <div className="m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      <CourseSkeleton />
      <CourseSkeleton className="mt-3" />
    </div>
  );
};

export default CoursesSkeleton;
