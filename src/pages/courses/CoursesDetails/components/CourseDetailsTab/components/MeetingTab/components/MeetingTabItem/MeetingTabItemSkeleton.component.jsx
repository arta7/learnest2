import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
const MeetingTabItemSkeleton = () => {
  return (
    <div className="position-relative w-100 my-3 m-0 p-3 d-flex flex-column meeting-tab-item-holder shadow rounded-20">
      <div class="m-0 p-0 d-flex align-items-center justify-content-start">
        <Skeleton variant="text" height={40} width={100} />
      </div>
      <div className="m-0 mt-2 p-0 d-flex flex-row justify-content-between align-items-center">
        <Skeleton variant="text" height={30} width={150} />
        <Skeleton variant="text" height={30} width={90} />
      </div>
      <div className="m-0 mt-3 p-0 d-flex flex-row justify-content-center align-items-center">
        <Skeleton
          variant="rectangular"
          height={16}
          sx={{ width: "100%", borderRadius: "4px" }}
        />
      </div>
    </div>
  );
};

export default MeetingTabItemSkeleton;
